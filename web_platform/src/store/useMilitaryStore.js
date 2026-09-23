/**
 * useMilitaryStore.js
 * State Management para el Sistema Vocacional y de Admisión Militar del Perú.
 * Implementa el patrón Zustand (con fallback nativo reactivo) para controlar el Stepper de 4 Fases:
 *
 * Fase 1: 'Esfuerzo Físico y Talla' (Hard Filter con 'investigacion_2.json')
 * Fase 2: 'Test Psicométrico' (IPIP-NEO 'Integral 120' o 'Rápido 50' + Distancia Euclidiana con 'psicometria.json')
 * Fase 3: 'Simulador de Conocimientos' (20 preguntas aleatorias sin repetir con LaTeX KaTeX con 'conocimientos.json')
 * Fase 4: 'Dictamen Consolidado' (Dashboard final con viabilidad de las 8 escuelas)
 */

import {
  evaluateHardFilter,
  samplePsychometricItems,
  calculatePsychometricEuclidean,
  sampleKnowledge20Questions,
  gradeKnowledgeExam,
  computeConsolidatedViability,
  ESCUELAS_MAP
} from './militaryStateLogic.js';

// Estado inicial por defecto
const initialState = {
  currentStep: 1, // 1: Físico, 2: Psicométrico, 3: Conocimientos, 4: Consolidado
  isLoading: false,
  error: null,

  // Bases de datos maestras cargadas
  databases: {
    investigacion: null, // investigacion_2.json
    psicometria: null,   // psicometria.json
    intereses: null,     // intereses.json
    conocimientos: null  // conocimientos.json
  },

  // 1. Datos de Esfuerzo Físico y Talla
  candidate: {
    nombre: 'Cadete Postulante',
    dni: '70001234',
    edad: 18,
    sexo: 'M',
    talla_cm: 172,
    peso_kg: 68,
    estado_civil: 'soltero',
    tiene_hijos: false,
    tiene_antecedentes: false,
    secundaria_completa: true,
    // Rendimiento físico militar
    flexiones_rep: 35,
    barras_rep: 10,
    carrera_tiempo_seg: 330, // 5 min 30 s para 1500m
    natacion_tiempo_seg: 50  // 50 s para 50m estilo crol
  },
  hardFilterResult: null,

  // 2. Datos del Test Psicométrico
  psychometric: {
    mode: 'rapido_50', // 'integral_120' | 'rapido_50'
    questions: [],
    answers: {}, // { [id_reactivo]: 1..5 }
    normalizedBigFive: {
      Neuroticismo: 20,
      Extraversión: 75,
      Apertura: 70,
      Amabilidad: 68,
      Responsabilidad: 90
    },
    compatibilityBySchool: {},
    isCompleted: false
  },

  // 3. Datos del Simulador de Conocimientos
  knowledge: {
    questions: [], // exactamente 20 sin repetir
    answers: {},   // { [id_pregunta]: 'A'|'B'|'C'|'D'|'E' }
    scoreResult: null,
    isCompleted: false
  },

  // 4. Datos del Dictamen Consolidado
  consolidated: {
    ranking: [],
    winningSchool: null,
    resumen: {}
  }
};

/**
 * Gestor de Estado Centralizado Compatible con Zustand y React Hooks
 */
class MilitaryStoreController {
  constructor() {
    this.state = { ...initialState };
    this.listeners = new Set();
  }

  getState = () => this.state;

  subscribe = (listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  setState = (updater) => {
    const nextState = typeof updater === 'function' ? updater(this.state) : updater;
    this.state = { ...this.state, ...nextState };
    this.listeners.forEach(listener => listener(this.state));
  };

  // =========================================================================
  // ACCIONES Y TRANSICIONES DE ESTADO
  // =========================================================================

  /**
   * Carga asíncrona de las 4 bases de datos maestras
   */
  loadDatabases = async () => {
    this.setState({ isLoading: true, error: null });
    try {
      const [invRes, psiRes, conRes] = await Promise.all([
        fetch('/api/data/investigacion_2').then(r => r.json()),
        fetch('/api/data/psicometria').then(r => r.json()),
        fetch('/api/data/conocimientos').then(r => r.json())
      ]);

      this.setState(prev => ({
        databases: {
          ...prev.databases,
          investigacion: invRes,
          psicometria: psiRes,
          conocimientos: conRes
        },
        isLoading: false
      }));

      // Inicializaciones dependientes de la base de datos
      this.evaluateHardFilterAction();
      this.setPsychometricMode(this.state.psychometric.mode);
      this.sampleKnowledgeQuestions();
    } catch (err) {
      console.warn('Cargando fallback de base de datos local:', err);
      this.setState({ isLoading: false, error: 'No se pudo conectar a la base de datos' });
    }
  };

  setStep = (step) => {
    const validStep = Math.max(1, Math.min(4, step));
    this.setState({ currentStep: validStep });

    // Si entra al dictamen consolidado, recalcular automáticamente
    if (validStep === 4) {
      this.computeConsolidatedVerdict();
    }
  };

  nextStep = () => {
    this.setStep(this.state.currentStep + 1);
  };

  prevStep = () => {
    this.setStep(this.state.currentStep - 1);
  };

  // -------------------------------------------------------------------------
  // FASE 1: ESFUERZO FÍSICO Y HARD FILTER
  // -------------------------------------------------------------------------
  updateCandidate = (fields) => {
    this.setState(prev => {
      const updatedCandidate = { ...prev.candidate, ...fields };
      const hardFilterResult = prev.databases.investigacion
        ? evaluateHardFilter(updatedCandidate, prev.databases.investigacion)
        : null;

      return {
        candidate: updatedCandidate,
        hardFilterResult
      };
    });
  };

  evaluateHardFilterAction = () => {
    const { candidate, databases } = this.state;
    if (!databases.investigacion) return;

    const result = evaluateHardFilter(candidate, databases.investigacion);
    this.setState({ hardFilterResult: result });
    return result;
  };

  // -------------------------------------------------------------------------
  // FASE 2: TEST PSICOMÉTRICO (MODO 120 / 50 Y DISTANCIA EUCLIDIANA)
  // -------------------------------------------------------------------------
  setPsychometricMode = (mode) => {
    const { databases } = this.state;
    const banco = databases.psicometria?.banco_reactivos_big_five || [];

    const sampledQuestions = samplePsychometricItems(banco, mode);

    this.setState(prev => ({
      psychometric: {
        ...prev.psychometric,
        mode,
        questions: sampledQuestions,
        answers: {},
        isCompleted: false
      }
    }));
  };

  answerPsychometricItem = (itemId, score) => {
    this.setState(prev => {
      const newAnswers = { ...prev.psychometric.answers, [itemId]: score };
      const isCompleted = prev.psychometric.questions.length > 0 &&
        Object.keys(newAnswers).length >= prev.psychometric.questions.length;

      return {
        psychometric: {
          ...prev.psychometric,
          answers: newAnswers,
          isCompleted
        }
      };
    });
  };

  computePsychometricResults = () => {
    const { psychometric, databases } = this.state;
    const perfilesIdeales = databases.psicometria?.perfiles_institucionales_esperados || {};

    const result = calculatePsychometricEuclidean(
      psychometric.answers,
      psychometric.questions,
      perfilesIdeales
    );

    this.setState(prev => ({
      psychometric: {
        ...prev.psychometric,
        normalizedBigFive: result.normalizedBigFive,
        compatibilityBySchool: result.compatibilityBySchool,
        isCompleted: true
      }
    }));

    return result;
  };

  // -------------------------------------------------------------------------
  // FASE 3: SIMULADOR DE CONOCIMIENTOS (20 PREGUNTAS SIN REPETIR)
  // -------------------------------------------------------------------------
  sampleKnowledgeQuestions = () => {
    const { databases } = this.state;
    const banco = databases.conocimientos?.banco_preguntas_conocimientos || [];

    const questions20 = sampleKnowledge20Questions(banco);

    this.setState(prev => ({
      knowledge: {
        ...prev.knowledge,
        questions: questions20,
        answers: {},
        scoreResult: null,
        isCompleted: false
      }
    }));
  };

  answerKnowledgeQuestion = (questionId, optionId) => {
    this.setState(prev => ({
      knowledge: {
        ...prev.knowledge,
        answers: {
          ...prev.knowledge.answers,
          [questionId]: optionId
        }
      }
    }));
  };

  gradeKnowledge = () => {
    const { knowledge } = this.state;
    const result = gradeKnowledgeExam(knowledge.answers, knowledge.questions);

    this.setState(prev => ({
      knowledge: {
        ...prev.knowledge,
        scoreResult: result,
        isCompleted: true
      }
    }));

    return result;
  };

  // -------------------------------------------------------------------------
  // FASE 4: DICTAMEN CONSOLIDADO (PONDERACIÓN GLOBAL Y HARD FILTER GATEKEEPER)
  // -------------------------------------------------------------------------
  computeConsolidatedVerdict = () => {
    // Asegurar que los pasos previos tengan resultados computados
    let hardFilterResult = this.state.hardFilterResult;
    if (!hardFilterResult && this.state.databases.investigacion) {
      hardFilterResult = this.evaluateHardFilterAction();
    }

    let psychoResult = null;
    if (Object.keys(this.state.psychometric.compatibilityBySchool).length > 0) {
      psychoResult = {
        normalizedBigFive: this.state.psychometric.normalizedBigFive,
        compatibilityBySchool: this.state.psychometric.compatibilityBySchool
      };
    } else {
      psychoResult = this.computePsychometricResults();
    }

    let knowledgeResult = this.state.knowledge.scoreResult;
    if (!knowledgeResult) {
      knowledgeResult = this.gradeKnowledge();
    }

    // Calcular nota física simple basada en flexiones y carrera
    const c = this.state.candidate;
    let physScore = 14.0;
    if (c.flexiones_rep >= 40 && c.carrera_tiempo_seg <= 320) physScore = 19.0;
    else if (c.flexiones_rep >= 30) physScore = 16.5;
    else if (c.flexiones_rep >= 20) physScore = 13.0;

    const consolidatedResult = computeConsolidatedViability({
      hardFilterResult,
      psychometricResult: psychoResult,
      knowledgeResult,
      physicalScore: physScore
    });

    this.setState({
      consolidated: consolidatedResult
    });

    return consolidatedResult;
  };
}

// Singleton de store para la aplicación
export const militaryStore = new MilitaryStoreController();

/**
 * Hook React para Zustand o React Componentes
 * Permite usar `const { currentStep, candidate, actions } = useMilitaryStore()`
 */
export function useMilitaryStore(selector = (state) => state) {
  // En entorno React, se conecta a los listeners del store
  const [state, setState] = React.useState(() => selector(militaryStore.getState()));

  React.useEffect(() => {
    const unsubscribe = militaryStore.subscribe((newState) => {
      setState(selector(newState));
    });
    return unsubscribe;
  }, [selector]);

  return {
    ...state,
    actions: {
      setStep: militaryStore.setStep,
      nextStep: militaryStore.nextStep,
      prevStep: militaryStore.prevStep,
      loadDatabases: militaryStore.loadDatabases,
      updateCandidate: militaryStore.updateCandidate,
      evaluateHardFilter: militaryStore.evaluateHardFilterAction,
      setPsychometricMode: militaryStore.setPsychometricMode,
      answerPsychometricItem: militaryStore.answerPsychometricItem,
      computePsychometricResults: militaryStore.computePsychometricResults,
      sampleKnowledgeQuestions: militaryStore.sampleKnowledgeQuestions,
      answerKnowledgeQuestion: militaryStore.answerKnowledgeQuestion,
      gradeKnowledge: militaryStore.gradeKnowledge,
      computeConsolidatedVerdict: militaryStore.computeConsolidatedVerdict
    }
  };
}

export default militaryStore;

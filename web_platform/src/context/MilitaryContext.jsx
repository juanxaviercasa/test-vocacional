/**
 * MilitaryContext.jsx
 * Implementación oficial de State Management con React Context API.
 * Provee Provider, Hook y Acciones con reductor para integrar el Stepper de 4 Fases.
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  evaluateHardFilter,
  samplePsychometricItems,
  calculatePsychometricEuclidean,
  sampleKnowledge20Questions,
  gradeKnowledgeExam,
  computeConsolidatedViability
} from '../store/militaryStateLogic.js';

const MilitaryContext = createContext(null);

const ACTION_TYPES = {
  SET_STEP: 'SET_STEP',
  LOAD_DATABASES_SUCCESS: 'LOAD_DATABASES_SUCCESS',
  UPDATE_CANDIDATE: 'UPDATE_CANDIDATE',
  SET_HARD_FILTER_RESULT: 'SET_HARD_FILTER_RESULT',
  SET_PSYCHOMETRIC_MODE: 'SET_PSYCHOMETRIC_MODE',
  ANSWER_PSYCHOMETRIC: 'ANSWER_PSYCHOMETRIC',
  SET_PSYCHOMETRIC_RESULT: 'SET_PSYCHOMETRIC_RESULT',
  SET_KNOWLEDGE_QUESTIONS: 'SET_KNOWLEDGE_QUESTIONS',
  ANSWER_KNOWLEDGE: 'ANSWER_KNOWLEDGE',
  SET_KNOWLEDGE_RESULT: 'SET_KNOWLEDGE_RESULT',
  SET_CONSOLIDATED_RESULT: 'SET_CONSOLIDATED_RESULT'
};

const initialContextState = {
  currentStep: 1, // 1: Físico, 2: Psico, 3: Conocimientos, 4: Consolidado
  databases: {
    investigacion: null,
    psicometria: null,
    conocimientos: null
  },
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
    flexiones_rep: 35,
    carrera_tiempo_seg: 330
  },
  hardFilterResult: null,
  psychometric: {
    mode: 'rapido_50',
    questions: [],
    answers: {},
    normalizedBigFive: { Neuroticismo: 20, Extraversión: 75, Apertura: 70, Amabilidad: 68, Responsabilidad: 90 },
    compatibilityBySchool: {},
    isCompleted: false
  },
  knowledge: {
    questions: [],
    answers: {},
    scoreResult: null,
    isCompleted: false
  },
  consolidated: {
    ranking: [],
    winningSchool: null,
    resumen: {}
  }
};

function militaryReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_STEP:
      return { ...state, currentStep: Math.max(1, Math.min(4, action.payload)) };

    case ACTION_TYPES.LOAD_DATABASES_SUCCESS:
      return {
        ...state,
        databases: action.payload
      };

    case ACTION_TYPES.UPDATE_CANDIDATE:
      return {
        ...state,
        candidate: { ...state.candidate, ...action.payload }
      };

    case ACTION_TYPES.SET_HARD_FILTER_RESULT:
      return {
        ...state,
        hardFilterResult: action.payload
      };

    case ACTION_TYPES.SET_PSYCHOMETRIC_MODE:
      return {
        ...state,
        psychometric: {
          ...state.psychometric,
          mode: action.payload.mode,
          questions: action.payload.questions,
          answers: {},
          isCompleted: false
        }
      };

    case ACTION_TYPES.ANSWER_PSYCHOMETRIC: {
      const newAnswers = {
        ...state.psychometric.answers,
        [action.payload.itemId]: action.payload.score
      };
      const isCompleted = state.psychometric.questions.length > 0 &&
        Object.keys(newAnswers).length >= state.psychometric.questions.length;
      return {
        ...state,
        psychometric: { ...state.psychometric, answers: newAnswers, isCompleted }
      };
    }

    case ACTION_TYPES.SET_PSYCHOMETRIC_RESULT:
      return {
        ...state,
        psychometric: {
          ...state.psychometric,
          normalizedBigFive: action.payload.normalizedBigFive,
          compatibilityBySchool: action.payload.compatibilityBySchool,
          isCompleted: true
        }
      };

    case ACTION_TYPES.SET_KNOWLEDGE_QUESTIONS:
      return {
        ...state,
        knowledge: {
          ...state.knowledge,
          questions: action.payload,
          answers: {},
          scoreResult: null,
          isCompleted: false
        }
      };

    case ACTION_TYPES.ANSWER_KNOWLEDGE:
      return {
        ...state,
        knowledge: {
          ...state.knowledge,
          answers: {
            ...state.knowledge.answers,
            [action.payload.questionId]: action.payload.optionId
          }
        }
      };

    case ACTION_TYPES.SET_KNOWLEDGE_RESULT:
      return {
        ...state,
        knowledge: {
          ...state.knowledge,
          scoreResult: action.payload,
          isCompleted: true
        }
      };

    case ACTION_TYPES.SET_CONSOLIDATED_RESULT:
      return {
        ...state,
        consolidated: action.payload
      };

    default:
      return state;
  }
}

export function MilitaryProvider({ children, initialDatabases = null }) {
  const [state, dispatch] = useReducer(militaryReducer, initialContextState);

  // Carga inicial de datos
  useEffect(() => {
    async function load() {
      try {
        const [inv, psi, con] = await Promise.all([
          fetch('/api/data/investigacion_2').then(r => r.json()),
          fetch('/api/data/psicometria').then(r => r.json()),
          fetch('/api/data/conocimientos').then(r => r.json())
        ]);

        dispatch({
          type: ACTION_TYPES.LOAD_DATABASES_SUCCESS,
          payload: { investigacion: inv, psicometria: psi, conocimientos: con }
        });

        // Inicializar preguntas
        const hf = evaluateHardFilter(state.candidate, inv);
        dispatch({ type: ACTION_TYPES.SET_HARD_FILTER_RESULT, payload: hf });

        const p2Items = samplePsychometricItems(psi.banco_reactivos_big_five, state.psychometric.mode);
        dispatch({
          type: ACTION_TYPES.SET_PSYCHOMETRIC_MODE,
          payload: { mode: state.psychometric.mode, questions: p2Items }
        });

        const p4Items = sampleKnowledge20Questions(con.banco_preguntas_conocimientos);
        dispatch({ type: ACTION_TYPES.SET_KNOWLEDGE_QUESTIONS, payload: p4Items });
      } catch (err) {
        console.warn('Error al cargar bases de datos en Context API:', err);
      }
    }
    load();
  }, []);

  // API de acciones simplificadas
  const actions = {
    setStep: (step) => dispatch({ type: ACTION_TYPES.SET_STEP, payload: step }),
    nextStep: () => dispatch({ type: ACTION_TYPES.SET_STEP, payload: state.currentStep + 1 }),
    prevStep: () => dispatch({ type: ACTION_TYPES.SET_STEP, payload: state.currentStep - 1 }),

    // 1. Esfuerzo Físico
    updateCandidate: (fields) => {
      dispatch({ type: ACTION_TYPES.UPDATE_CANDIDATE, payload: fields });
      if (state.databases.investigacion) {
        const hf = evaluateHardFilter({ ...state.candidate, ...fields }, state.databases.investigacion);
        dispatch({ type: ACTION_TYPES.SET_HARD_FILTER_RESULT, payload: hf });
      }
    },

    // 2. Psicometría
    setPsychometricMode: (mode) => {
      const items = samplePsychometricItems(
        state.databases.psicometria?.banco_reactivos_big_five || [],
        mode
      );
      dispatch({ type: ACTION_TYPES.SET_PSYCHOMETRIC_MODE, payload: { mode, questions: items } });
    },
    answerPsychometric: (itemId, score) => {
      dispatch({ type: ACTION_TYPES.ANSWER_PSYCHOMETRIC, payload: { itemId, score } });
    },
    computePsychometric: () => {
      const perfiles = state.databases.psicometria?.perfiles_institucionales_esperados || {};
      const res = calculatePsychometricEuclidean(state.psychometric.answers, state.psychometric.questions, perfiles);
      dispatch({ type: ACTION_TYPES.SET_PSYCHOMETRIC_RESULT, payload: res });
      return res;
    },

    // 3. Conocimientos
    sampleKnowledge20: () => {
      const banco = state.databases.conocimientos?.banco_preguntas_conocimientos || [];
      const qs = sampleKnowledge20Questions(banco);
      dispatch({ type: ACTION_TYPES.SET_KNOWLEDGE_QUESTIONS, payload: qs });
    },
    answerKnowledge: (questionId, optionId) => {
      dispatch({ type: ACTION_TYPES.ANSWER_KNOWLEDGE, payload: { questionId, optionId } });
    },
    gradeKnowledge: () => {
      const res = gradeKnowledgeExam(state.knowledge.answers, state.knowledge.questions);
      dispatch({ type: ACTION_TYPES.SET_KNOWLEDGE_RESULT, payload: res });
      return res;
    },

    // 4. Dictamen Consolidado
    computeConsolidated: () => {
      const hardFilterResult = state.hardFilterResult || evaluateHardFilter(state.candidate, state.databases.investigacion || []);
      const perfiles = state.databases.psicometria?.perfiles_institucionales_esperados || {};
      const psychoRes = calculatePsychometricEuclidean(state.psychometric.answers, state.psychometric.questions, perfiles);
      const knowRes = state.knowledge.scoreResult || gradeKnowledgeExam(state.knowledge.answers, state.knowledge.questions);

      const consolidated = computeConsolidatedViability({
        hardFilterResult,
        psychometricResult: psychoRes,
        knowledgeResult: knowRes,
        physicalScore: 16.0
      });

      dispatch({ type: ACTION_TYPES.SET_CONSOLIDATED_RESULT, payload: consolidated });
      return consolidated;
    }
  };

  return (
    <MilitaryContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </MilitaryContext.Provider>
  );
}

export function useMilitaryContext() {
  const context = useContext(MilitaryContext);
  if (!context) {
    throw new Error('useMilitaryContext debe ser usado dentro de un MilitaryProvider');
  }
  return context;
}

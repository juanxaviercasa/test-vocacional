import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PSICOMETRIC_QUESTIONS } from '../data/psychometricQuestions.js';
import { COGNITIVE_QUESTIONS } from '../data/cognitiveQuestions.js';
import { TACTICAL_DILEMMAS, getAdaptedDilemmas } from '../data/tacticalDilemmas.js';
import { KNOWLEDGE_QUESTIONS } from '../data/knowledgeQuestions.js';
import { computeConsolidatedViability, computeVocationalViability } from '../data/scoringEngine.js';

export const INITIAL_CANDIDATE = {
  nombre: '',
  dni: '',
  telefono: '',
  email: '',
  edad: 0,
  age: 0,
  sexo: '',
  talla_cm: 0,
  height: 0,
  peso_kg: 0,
  weight: 0,
  talla_sentado_cm: 0,
  estado_civil: '',
  tiene_hijos: null,
  tiene_antecedentes: null,
  tiene_tatuajes: null,
  secundaria_completa: null,
  agudeza_visual_20_20: null,
  hasGlasses: null,
  daltonismo: null,
  promedio_fisico: 15.0,
  carrera_1500m: '5m_30s',
  natacion_50m: 'apto',
  flexiones: 35,
};

export const DEMO_CANDIDATE = {
  nombre: 'Carlos Mendoza',
  dni: '73491820',
  telefono: '984512345',
  email: 'carlos.mendoza.cadete@gmail.com',
  edad: 19,
  age: 19,
  sexo: 'M',
  talla_cm: 172,
  height: 172,
  peso_kg: 70,
  weight: 70,
  talla_sentado_cm: 91,
  estado_civil: 'soltero',
  tiene_hijos: false,
  tiene_antecedentes: false,
  tiene_tatuajes: false,
  secundaria_completa: true,
  agudeza_visual_20_20: true,
  hasGlasses: false,
  daltonismo: false,
  promedio_fisico: 16.5,
  carrera_1500m: 'menos_5m',
  natacion_50m: 'apto',
  flexiones: 45,
};

export const useAssessmentStore = create(
  persist(
    (set, get) => {
      const urlPillar = typeof window !== 'undefined' ? parseInt(new URLSearchParams(window.location.search).get('pillar') || '1', 10) : 1;
      const initialPillar = Math.min(5, Math.max(1, urlPillar));

      return {
    // =========================================================================
    // ENRUTAMIENTO MODULAR (Módulo 1: Vocacional vs Módulo 2: Académico)
    // =========================================================================
    activeModule: 'vocational', // 'vocational' | 'academic'

    // =========================================================================
    // MÓDULO 1: WIZARD VOCACIONAL (5 PASOS)
    // =========================================================================
    currentPillar: initialPillar, // 1: Legal/Físico, 2: Psico/Clínico, 3: Cognitivo/Mecánica, 4: Intereses, 5: Dictamen 360°
    direction: 1, // 1: adelante, -1: atrás (para Framer Motion)

    // Sub-pantallas de Paso 1 (Filtro Legal / Divulgación Progresiva)
    pilar1SubStep: 1, // 1: Identidad, 2: Antropometría, 3: Filtro Médico/Legal, 4: Desbloqueando

    // Paso 1: Datos del Postulante Inicializados Vacíos (Empty State por defecto)
    candidate: { ...INITIAL_CANDIDATE },

    // Modo Entrenamiento / Guía Interactiva (Onboarding Tour)
    isTourOpen: false,
    tourStep: 0,

    // Paso 2: Psicométrico IPIP-NEO + Control Clínico & Escala L
    psychIndex: 0,
    psychAnswers: {}, // { [qId]: value }
    isPsychAdvancing: false,

    // Paso 3: Facultades Cognitivas Superiores (Raven + Bennett)
    cognitiveIndex: 0,
    cognitiveAnswers: {}, // { [qId]: optionId }
    isCognitiveAdvancing: false,

    // Paso 4: Intereses Operacionales (Dilemas Tácticos)
    interestsIndex: 0,
    interestsAnswers: {}, // { [dilemmaId]: optionId }

    // Paso 5: Veredicto Vocacional Integral 360°
    vocationalVerdict: null,

    // =========================================================================
    // MÓDULO 2: DIAGNÓSTICO ACADÉMICO Y REPORTE DE BRECHAS
    // =========================================================================
    academicSchool: 'EOFAP',
    highlightedSchool: null, // Si viene del resultado vocacional, resalta la escuela
    academicStep: 'catalog', // 'catalog' | 'exam' | 'strategy'
    academicResults: null,

    // Estado de Conocimientos heredado / compatibilidad
    knowledgeIndex: 0,
    knowledgeAnswers: {},
    knowledgeTimer: 72,
    finalVerdict: null,

    // =========================================================================
    // ACCIONES DE NAVEGACIÓN MODULAR
    // =========================================================================
    switchToModule: (module) => {
      set({ activeModule: module });
    },

    startAcademicDiagnostic: (schoolId) => {
      const target = schoolId || get().vocationalVerdict?.topSchool?.escuela?.id || 'EOFAP';
      set({
        activeModule: 'academic',
        academicSchool: target,
        highlightedSchool: target,
        academicStep: 'catalog',
      });
    },

    setAcademicSchool: (schoolId) => {
      set({ academicSchool: schoolId });
    },

    setAcademicStep: (step) => {
      set({ academicStep: step });
    },

    completeAcademicExam: (results) => {
      set({
        academicResults: results,
        academicStep: 'strategy',
      });
    },

    // =========================================================================
    // ACCIONES DEL WIZARD VOCACIONAL (MÓDULO 1)
    // =========================================================================
    goToPillar: (pillarNumber) => {
      const clamped = Math.min(5, Math.max(1, pillarNumber));
      const current = get().currentPillar;
      const dir = clamped >= current ? 1 : -1;
      set({ currentPillar: clamped, direction: dir });
      if (clamped === 5) {
        get().calculateVocationalResults();
      }
    },

    nextPillar: () => {
      const current = get().currentPillar;
      if (current < 5) {
        const next = current + 1;
        set({ currentPillar: next, direction: 1 });
        if (next === 5) {
          get().calculateVocationalResults();
        }
      }
    },

    prevPillar: () => {
      const current = get().currentPillar;
      if (current > 1) {
        set({ currentPillar: current - 1, direction: -1 });
      }
    },

    setPilar1SubStep: (step) => {
      const current = get().pilar1SubStep;
      const dir = step >= current ? 1 : -1;
      set({ pilar1SubStep: step, direction: dir });
    },

    updateCandidate: (field, value) => {
      set((state) => {
        const next = { ...state.candidate, [field]: value };
        // Sincronizaciones bidireccionales automáticas para restricciones físicas:
        if (field === 'agudeza_visual_20_20') {
          next.hasGlasses = !value;
        } else if (field === 'hasGlasses') {
          next.agudeza_visual_20_20 = !value;
        } else if (field === 'edad') {
          next.age = value;
        } else if (field === 'age') {
          next.edad = value;
        } else if (field === 'talla_cm') {
          next.height = value;
        } else if (field === 'height') {
          next.talla_cm = value;
        } else if (field === 'peso_kg') {
          next.weight = value;
        } else if (field === 'weight') {
          next.peso_kg = value;
        }
        return { candidate: next };
      });
    },

    // Inyección de Perfil de Prueba (Demo Mode) y Reseteo
    loadDemoCandidate: () => {
      set({
        candidate: { ...DEMO_CANDIDATE },
        psychAnswers: {
          IPIP_EST_01: 2, IPIP_EST_02: 1, IPIP_EST_03: 2,
          IPIP_EXT_01: 5, IPIP_EXT_02: 4, IPIP_EXT_03: 4,
          IPIP_APE_01: 4, IPIP_APE_02: 4, IPIP_APE_03: 4,
          IPIP_CON_01: 5, IPIP_CON_02: 5, IPIP_CON_03: 5,
          IPIP_AGR_01: 4, IPIP_AGR_02: 4, IPIP_AGR_03: 4,
          VAL_01: 2, VAL_02: 2, VAL_03: 2,
          CLI_ARM_01: 1, CLI_CLA_01: 1
        },
        cognitiveAnswers: {
          COG_RAV_01: 'A', COG_RAV_02: 'A', COG_RAV_03: 'A',
          COG_MEC_01: 'A', COG_MEC_02: 'A', COG_MEC_03: 'A'
        },
        interestsAnswers: {
          DIL_01: 'OPT_1A', DIL_02: 'OPT_2A', DIL_03: 'OPT_3A',
          DIL_04: 'OPT_4A', DIL_05: 'OPT_5A'
        }
      });
    },

    resetCandidate: () => {
      set({
        candidate: { ...INITIAL_CANDIDATE },
        pilar1SubStep: 1,
        psychIndex: 0,
        psychAnswers: {},
        cognitiveIndex: 0,
        cognitiveAnswers: {},
        interestsIndex: 0,
        interestsAnswers: {},
        vocationalVerdict: null,
      });
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('militar_assessment_storage');
        } catch (e) {
          console.error(e);
        }
      }
    },

    // Sistema de Onboarding Interactivo (Guía de Usuario)
    startTour: () => {
      set({
        activeModule: 'vocational',
        currentPillar: 1,
        direction: 1,
        isTourOpen: true,
        tourStep: 0,
      });
    },

    nextTourStep: () => {
      const current = get().tourStep;
      if (current < 2) {
        set({ tourStep: current + 1 });
      } else {
        set({ isTourOpen: false, tourStep: 0 });
      }
    },

    prevTourStep: () => {
      const current = get().tourStep;
      if (current > 0) {
        set({ tourStep: current - 1 });
      }
    },

    closeTour: () => {
      set({ isTourOpen: false, tourStep: 0 });
    },

    // Selector helper para obtener las restricciones físicas calculadas
    getPhysicalRestrictions: () => {
      const { candidate } = get();
      const hasGlasses = candidate.hasGlasses !== undefined && candidate.hasGlasses !== null
        ? Boolean(candidate.hasGlasses)
        : candidate.agudeza_visual_20_20 === null
        ? false
        : !candidate.agudeza_visual_20_20;
      const age = Number(candidate.age ?? candidate.edad ?? 0);
      const height = Number(candidate.height ?? candidate.talla_cm ?? 0);
      const weight = Number(candidate.weight ?? candidate.peso_kg ?? 0);
      const isMale = candidate.sexo === 'M';

      // Requisitos mínimos reglamentarios para Oficiales (EMCH, ENP, EOFAP, EO-PNP):
      // Varones: mín 167-168 cm (EO-PNP 167, FFAA 168 cm).
      // Damas: mín 158-160 cm (EMCH/EOFAP 158, EO-PNP 159, ENP 160 cm).
      // Edad máxima oficial: 21 años (FFAA) o 22 años (PNP).
      const minHeightOfficer = isMale ? 167 : 158;
      const maxAgeOfficer = 22;

      // Si aún no ha ingresado talla/edad, no marcamos exclusión anticipada
      const isHeightOfficerExcluded = height > 0 && height < minHeightOfficer;
      const isAgeOfficerExcluded = age > 0 && age > maxAgeOfficer;
      const isOfficerExcluded = isHeightOfficerExcluded || isAgeOfficerExcluded;
      const isSubofficerOnly = isOfficerExcluded;

      // Exclusión específica de especialidades de vuelo de combate (EOFAP Piloto)
      const isPilotExcluded = Boolean(hasGlasses) ||
                              Boolean(candidate.daltonismo) ||
                              (Number(candidate.talla_sentado_cm) > 0 &&
                               (Number(candidate.talla_sentado_cm) < 85 || Number(candidate.talla_sentado_cm) > 98)) ||
                              isOfficerExcluded;

      return {
        hasGlasses,
        age,
        height,
        weight,
        isOfficerExcluded,
        isSubofficerOnly,
        isHeightOfficerExcluded,
        isAgeOfficerExcluded,
        isPilotExcluded,
        isMale,
        minHeightOfficer,
        maxAgeOfficer
      };
    },

    // Acciones Paso 2 (Psicometría con auto-avance táctico)
    answerPsychQuestion: (questionId, value) => {
      set((state) => ({
        psychAnswers: { ...state.psychAnswers, [questionId]: value },
        isPsychAdvancing: true
      }));

      setTimeout(() => {
        const { psychIndex } = get();
        if (psychIndex < PSICOMETRIC_QUESTIONS.length - 1) {
          set({ psychIndex: psychIndex + 1, direction: 1, isPsychAdvancing: false });
        } else {
          // Fin de Paso 2 -> pasar al Paso 3 (Cognitivo Superior)
          set({ isPsychAdvancing: false });
          get().nextPillar();
        }
      }, 300);
    },

    goToPsychQuestion: (index) => {
      const current = get().psychIndex;
      set({ psychIndex: index, direction: index >= current ? 1 : -1 });
    },

    // Acciones Paso 3 (Facultades Cognitivas Superiores: Raven & Bennett)
    answerCognitiveQuestion: (questionId, optionId) => {
      set((state) => ({
        cognitiveAnswers: { ...state.cognitiveAnswers, [questionId]: optionId },
        isCognitiveAdvancing: true
      }));

      setTimeout(() => {
        const { cognitiveIndex } = get();
        if (cognitiveIndex < COGNITIVE_QUESTIONS.length - 1) {
          set({ cognitiveIndex: cognitiveIndex + 1, direction: 1, isCognitiveAdvancing: false });
        } else {
          set({ isCognitiveAdvancing: false });
          get().nextPillar(); // Pasa a Paso 4 (Intereses)
        }
      }, 350);
    },

    goToCognitiveQuestion: (index) => {
      const current = get().cognitiveIndex;
      set({ cognitiveIndex: index, direction: index >= current ? 1 : -1 });
    },

    nextCognitiveQuestion: () => {
      const { cognitiveIndex } = get();
      if (cognitiveIndex < COGNITIVE_QUESTIONS.length - 1) {
        set({ cognitiveIndex: cognitiveIndex + 1, direction: 1 });
      } else {
        get().nextPillar();
      }
    },

    prevCognitiveQuestion: () => {
      const { cognitiveIndex } = get();
      if (cognitiveIndex > 0) {
        set({ cognitiveIndex: cognitiveIndex - 1, direction: -1 });
      }
    },

    // Acciones Paso 4 (Intereses Operacionales)
    answerInterestDilemma: (dilemmaId, optionId) => {
      set((state) => ({
        interestsAnswers: { ...state.interestsAnswers, [dilemmaId]: optionId }
      }));
    },

    nextInterestDilemma: () => {
      const { interestsIndex } = get();
      if (interestsIndex < TACTICAL_DILEMMAS.length - 1) {
        set({ interestsIndex: interestsIndex + 1, direction: 1 });
      } else {
        get().nextPillar(); // Pasa a Paso 5 (Dictamen Vocacional 360°)
      }
    },

    prevInterestDilemma: () => {
      const { interestsIndex } = get();
      if (interestsIndex > 0) {
        set({ interestsIndex: interestsIndex - 1, direction: -1 });
      }
    },

    // =========================================================================
    // CÁLCULO DE RESULTADOS
    // =========================================================================
    calculateVocationalResults: () => {
      const { candidate, psychAnswers, interestsAnswers, cognitiveAnswers, getPhysicalRestrictions } = get();
      const restrictions = getPhysicalRestrictions();
      const adaptedDilemmas = getAdaptedDilemmas(TACTICAL_DILEMMAS, restrictions);
      const verdict = computeVocationalViability(
        candidate,
        psychAnswers,
        interestsAnswers,
        adaptedDilemmas,
        cognitiveAnswers,
        { promedio_fisico: candidate.promedio_fisico || 15.0 }
      );
      set({ vocationalVerdict: verdict });
      return verdict;
    },

    calculateFinalResults: () => {
      const { candidate, psychAnswers, interestsAnswers, cognitiveAnswers, knowledgeAnswers, getPhysicalRestrictions } = get();
      const restrictions = getPhysicalRestrictions();
      const adaptedDilemmas = getAdaptedDilemmas(TACTICAL_DILEMMAS, restrictions);
      const verdict = computeConsolidatedViability(
        candidate,
        psychAnswers,
        interestsAnswers,
        knowledgeAnswers,
        adaptedDilemmas,
        KNOWLEDGE_QUESTIONS
      );
      set({ finalVerdict: verdict });
      return verdict;
    },

    resetAll: () => {
      set({
        candidate: { ...INITIAL_CANDIDATE },
        activeModule: 'vocational',
        currentPillar: 1,
        direction: 1,
        pilar1SubStep: 1,
        psychIndex: 0,
        psychAnswers: {},
        cognitiveIndex: 0,
        cognitiveAnswers: {},
        interestsIndex: 0,
        interestsAnswers: {},
        vocationalVerdict: null,
        academicSchool: 'EOFAP',
        highlightedSchool: null,
        academicStep: 'catalog',
        academicResults: null,
        knowledgeIndex: 0,
        knowledgeAnswers: {},
        knowledgeTimer: 72,
        finalVerdict: null,
      });
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('militar_assessment_storage');
        } catch (e) {
          console.error(e);
        }
      }
    }
  };
},
{
  name: 'militar_assessment_storage',
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({
    candidate: state.candidate,
    psychAnswers: state.psychAnswers,
    cognitiveAnswers: state.cognitiveAnswers,
    interestsAnswers: state.interestsAnswers,
    vocationalVerdict: state.vocationalVerdict,
    currentPillar: state.currentPillar,
  }),
}
));


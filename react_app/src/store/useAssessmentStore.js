import { create } from 'zustand';
import { PSICOMETRIC_QUESTIONS } from '../data/psychometricQuestions.js';
import { TACTICAL_DILEMMAS, getAdaptedDilemmas } from '../data/tacticalDilemmas.js';
import { KNOWLEDGE_QUESTIONS } from '../data/knowledgeQuestions.js';
import { computeConsolidatedViability, computeVocationalViability } from '../data/scoringEngine.js';

export const INITIAL_CANDIDATE = {
  nombre: '',
  dni: '',
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
};

export const DEMO_CANDIDATE = {
  nombre: 'Carlos Mendoza',
  dni: '73491820',
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
};

export const useAssessmentStore = create((set, get) => {
  const urlPillar = typeof window !== 'undefined' ? parseInt(new URLSearchParams(window.location.search).get('pillar') || '1', 10) : 1;
  const initialPillar = Math.min(4, Math.max(1, urlPillar));

  return {
    // =========================================================================
    // ENRUTAMIENTO MODULAR (Módulo 1: Vocacional vs Módulo 2: Académico)
    // =========================================================================
    activeModule: 'vocational', // 'vocational' | 'academic'

    // =========================================================================
    // MÓDULO 1: WIZARD VOCACIONAL (4 PASOS)
    // =========================================================================
    currentPillar: initialPillar, // 1: Legal, 2: Psico, 3: Intereses, 4: Resultado Vocacional
    direction: 1, // 1: adelante, -1: atrás (para Framer Motion)

    // Sub-pantallas de Paso 1 (Filtro Legal / Divulgación Progresiva)
    pilar1SubStep: 1, // 1: Identidad, 2: Antropometría, 3: Filtro Médico/Legal, 4: Desbloqueando

    // Paso 1: Datos del Postulante Inicializados Vacíos (Empty State por defecto)
    candidate: { ...INITIAL_CANDIDATE },

    // Modo Entrenamiento / Guía Interactiva (Onboarding Tour)
    isTourOpen: false,
    tourStep: 0,

    // Paso 2: Psicométrico IPIP-NEO (Modo Enfoque)
    psychIndex: 0,
    psychAnswers: {}, // { [qId]: value }
    isPsychAdvancing: false,

    // Paso 3: Intereses Operacionales (Dilemas Tácticos)
    interestsIndex: 0,
    interestsAnswers: {}, // { [dilemmaId]: optionId }

    // Paso 4: Veredicto Vocacional Puro (Compatibilidad con 8 escuelas)
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
      const clamped = Math.min(4, Math.max(1, pillarNumber));
      const current = get().currentPillar;
      const dir = clamped >= current ? 1 : -1;
      set({ currentPillar: clamped, direction: dir });
      if (clamped === 4) {
        get().calculateVocationalResults();
      }
    },

    nextPillar: () => {
      const current = get().currentPillar;
      if (current < 4) {
        const next = current + 1;
        set({ currentPillar: next, direction: 1 });
        if (next === 4) {
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
      set({ candidate: { ...DEMO_CANDIDATE } });
    },

    resetCandidate: () => {
      set({ candidate: { ...INITIAL_CANDIDATE } });
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
          // Fin de Paso 2 -> pasar al Paso 3 (Intereses)
          set({ isPsychAdvancing: false });
          get().nextPillar();
        }
      }, 300);
    },

    goToPsychQuestion: (index) => {
      const current = get().psychIndex;
      set({ psychIndex: index, direction: index >= current ? 1 : -1 });
    },

    // Acciones Paso 3 (Intereses)
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
        get().nextPillar(); // Pasa a Paso 4 (Resultado Vocacional)
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
      const { candidate, psychAnswers, interestsAnswers, getPhysicalRestrictions } = get();
      const restrictions = getPhysicalRestrictions();
      const adaptedDilemmas = getAdaptedDilemmas(TACTICAL_DILEMMAS, restrictions);
      const verdict = computeVocationalViability(
        candidate,
        psychAnswers,
        interestsAnswers,
        adaptedDilemmas
      );
      set({ vocationalVerdict: verdict });
      return verdict;
    },

    calculateFinalResults: () => {
      const { candidate, psychAnswers, interestsAnswers, knowledgeAnswers, getPhysicalRestrictions } = get();
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
        activeModule: 'vocational',
        currentPillar: 1,
        direction: 1,
        pilar1SubStep: 1,
        psychIndex: 0,
        psychAnswers: {},
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
    }
  };
});

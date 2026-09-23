import { create } from 'zustand';
import { PSICOMETRIC_QUESTIONS } from '../data/psychometricQuestions.js';
import { TACTICAL_DILEMMAS } from '../data/tacticalDilemmas.js';
import { KNOWLEDGE_QUESTIONS } from '../data/knowledgeQuestions.js';
import { computeConsolidatedViability } from '../data/scoringEngine.js';

export const useAssessmentStore = create((set, get) => {
  const urlPillar = typeof window !== 'undefined' ? parseInt(new URLSearchParams(window.location.search).get('pillar') || '1', 10) : 1;

  return {
    // Navegación Global
    currentPillar: urlPillar, // 1 a 5 (5 es Dashboard Final)
    direction: 1, // 1: adelante, -1: atrás (para Framer Motion slide)

  // Sub-pantallas de Pilar 1 (Divulgación Progresiva)
  pilar1SubStep: 1, // 1: Identidad, 2: Antropometría, 3: Filtro Médico/Legal, 4: Desbloqueando

  // Pilar 1: Datos del Postulante
  candidate: {
    nombre: 'Carlos Mendoza',
    dni: '73491820',
    edad: 19,
    sexo: 'M',
    talla_cm: 172,
    peso_kg: 70,
    talla_sentado_cm: 91,
    estado_civil: 'soltero',
    tiene_hijos: false,
    tiene_antecedentes: false,
    tiene_tatuajes: false,
    secundaria_completa: true,
    agudeza_visual_20_20: true,
    daltonismo: false,
  },

  // Pilar 2: Psicométrico IPIP-NEO (Modo Enfoque)
  psychIndex: 0,
  psychAnswers: {}, // { [qId]: value }
  isPsychAdvancing: false,

  // Pilar 3: Intereses Operacionales (Dilemas)
  interestsIndex: 0,
  interestsAnswers: {}, // { [dilemmaId]: optionId }

  // Pilar 4: Conocimientos con KaTeX y Temporizador Militar
  knowledgeIndex: 0,
  knowledgeAnswers: {}, // { [qId]: optionId }
  knowledgeTimer: 90, // 90 segundos por pregunta (01:30s)

  // Pilar 5: Dictamen Consolidado
  finalVerdict: null,

  // Acciones de Navegación
  goToPillar: (pillarNumber) => {
    const current = get().currentPillar;
    const dir = pillarNumber >= current ? 1 : -1;
    set({ currentPillar: pillarNumber, direction: dir });
    if (pillarNumber === 5) {
      get().calculateFinalResults();
    }
  },

  nextPillar: () => {
    const current = get().currentPillar;
    if (current < 5) {
      set({ currentPillar: current + 1, direction: 1 });
      if (current + 1 === 5) {
        get().calculateFinalResults();
      }
    }
  },

  prevPillar: () => {
    const current = get().currentPillar;
    if (current > 1) {
      set({ currentPillar: current - 1, direction: -1 });
    }
  },

  // Acciones Pilar 1
  setPilar1SubStep: (step) => {
    const current = get().pilar1SubStep;
    const dir = step >= current ? 1 : -1;
    set({ pilar1SubStep: step, direction: dir });
  },

  updateCandidate: (field, value) => {
    set((state) => ({
      candidate: { ...state.candidate, [field]: value }
    }));
  },

  // Acciones Pilar 2 (Auto-avance a 300ms)
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
        // Fin de Pilar 2 -> pasar a Pilar 3
        set({ isPsychAdvancing: false });
        get().nextPillar();
      }
    }, 300);
  },

  goToPsychQuestion: (index) => {
    const current = get().psychIndex;
    set({ psychIndex: index, direction: index >= current ? 1 : -1 });
  },

  // Acciones Pilar 3
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
      get().nextPillar();
    }
  },

  prevInterestDilemma: () => {
    const { interestsIndex } = get();
    if (interestsIndex > 0) {
      set({ interestsIndex: interestsIndex - 1, direction: -1 });
    }
  },

  // Acciones Pilar 4
  answerKnowledgeQuestion: (questionId, optionId) => {
    set((state) => ({
      knowledgeAnswers: { ...state.knowledgeAnswers, [questionId]: optionId }
    }));
  },

  nextKnowledgeQuestion: () => {
    const { knowledgeIndex } = get();
    if (knowledgeIndex < KNOWLEDGE_QUESTIONS.length - 1) {
      set({ knowledgeIndex: knowledgeIndex + 1, direction: 1, knowledgeTimer: 90 });
    } else {
      get().nextPillar();
    }
  },

  prevKnowledgeQuestion: () => {
    const { knowledgeIndex } = get();
    if (knowledgeIndex > 0) {
      set({ knowledgeIndex: knowledgeIndex - 1, direction: -1, knowledgeTimer: 90 });
    }
  },

  tickKnowledgeTimer: () => {
    const current = get().knowledgeTimer;
    if (current > 1) {
      set({ knowledgeTimer: current - 1 });
    } else if (current === 1) {
      // Auto-avance forzoso al llegar a 0
      set({ knowledgeTimer: 0 });
      get().nextKnowledgeQuestion();
    }
  },

  resetKnowledgeTimer: (seconds = 90) => {
    set({ knowledgeTimer: seconds });
  },

  // Cálculo de Resultados Consolidado
  calculateFinalResults: () => {
    const { candidate, psychAnswers, interestsAnswers, knowledgeAnswers } = get();
    const verdict = computeConsolidatedViability(
      candidate,
      psychAnswers,
      interestsAnswers,
      knowledgeAnswers,
      TACTICAL_DILEMMAS,
      KNOWLEDGE_QUESTIONS
    );
    set({ finalVerdict: verdict });
  },

    resetAll: () => {
      set({
        currentPillar: 1,
        direction: 1,
        pilar1SubStep: 1,
        psychIndex: 0,
        psychAnswers: {},
        interestsIndex: 0,
        interestsAnswers: {},
        knowledgeIndex: 0,
        knowledgeAnswers: {},
        knowledgeTimer: 90,
        finalVerdict: null,
      });
    }
  };
});

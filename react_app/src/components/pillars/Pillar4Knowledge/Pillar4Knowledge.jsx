import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '../../../store/useAssessmentStore';
import { useKnowledgeTest } from '../../../hooks/useKnowledgeTest';
import EnunciadoMatematico from '../../common/EnunciadoMatematico';
import TopoProgressBar from '../../common/TopoProgressBar';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  Zap,
  Shield,
  HelpCircle,
  Flame,
  BarChart3
} from 'lucide-react';

const MILITARY_SCHOOLS = [
  { id: 'EOFAP', name: 'Escuela de Oficiales FAP', rama: 'Fuerza Aérea', badge: '✈️ EOFAP' },
  { id: 'EMCH', name: 'Escuela Militar de Chorrillos', rama: 'Ejército', badge: '⚔️ EMCH' },
  { id: 'ENP', name: 'Escuela Naval del Perú', rama: 'Marina de Guerra', badge: '⚓ ENP' },
  { id: 'CITEN', name: 'Instituto Tecnológico Naval', rama: 'Marina de Guerra', badge: '🚢 CITEN' },
  { id: 'ESOFA', name: 'Escuela de Suboficiales FAP', rama: 'Fuerza Aérea', badge: '🚀 ESOFA' },
  { id: 'ETE', name: 'Escuela Técnica del Ejército', rama: 'Ejército', badge: '🛡️ ETE' },
  { id: 'EO_PNP', name: 'Escuela de Oficiales PNP', rama: 'Policía Nacional', badge: '👮 EO-PNP' },
  { id: 'EESTP_PNP', name: 'Escuela Técnica Superior PNP', rama: 'Policía Nacional', badge: '🚓 EESTP-PNP' },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Pillar4Knowledge() {
  const { candidate, nextPillar, prevPillar, answerKnowledgeQuestion } = useAssessmentStore();
  const [selectedSchool, setSelectedSchool] = useState('EOFAP');
  const [slideDirection, setSlideDirection] = useState(1);
  const [isAdvancing, setIsAdvancing] = useState(false);

  // Hook Maestro de Evaluación Académica (Pilar 4)
  const {
    schoolId,
    isLoading,
    error,
    questions,
    totalQuestions,
    currentIndex,
    currentQuestion,
    answers,
    currentAnswer,
    isCompleted,
    timeRemaining,
    score,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    restartTest,
    changeSchool,
  } = useKnowledgeTest(selectedSchool);

  const handleSchoolChange = (newId) => {
    setSelectedSchool(newId);
    changeSchool(newId);
  };

  const handleAnswerClick = (optionId) => {
    if (isAdvancing || isCompleted) return;
    selectAnswer(optionId);
    if (currentQuestion && answerKnowledgeQuestion) {
      answerKnowledgeQuestion(currentQuestion.id_pregunta, optionId);
    }
    setIsAdvancing(true);
    setTimeout(() => {
      setSlideDirection(1);
      nextQuestion();
      setIsAdvancing(false);
    }, 350);
  };

  const handleNext = () => {
    if (isAdvancing) return;
    setSlideDirection(1);
    nextQuestion();
  };

  const handlePrev = () => {
    if (isAdvancing) return;
    setSlideDirection(-1);
    prevQuestion();
  };

  // Temporizador de Estrés: formato y cálculo de porcentaje
  const timerPercentage = Math.max(0, Math.min(100, (timeRemaining / 72) * 100));
  let timerTheme = {
    color: 'text-neon-cyan',
    border: 'border-neon-cyan/40',
    bg: 'bg-cyan-950/30',
    glow: 'shadow-cyan-glow',
    barColor: 'bg-neon-cyan',
  };

  if (timeRemaining <= 12) {
    timerTheme = {
      color: 'text-alert-red animate-pulse',
      border: 'border-alert-red/70',
      bg: 'bg-red-950/50',
      glow: 'shadow-red-glow',
      barColor: 'bg-alert-red animate-pulse',
    };
  } else if (timeRemaining <= 25) {
    timerTheme = {
      color: 'text-alert-amber',
      border: 'border-alert-amber/50',
      bg: 'bg-amber-950/30',
      glow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]',
      barColor: 'bg-alert-amber',
    };
  }

  // Estado de carga inicial
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="glass-panel p-10 rounded-3xl border border-white/10 shadow-tactical-card max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full border-4 border-neon-cyan border-t-transparent animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-rajdhani font-bold text-white uppercase tracking-wider">
            CARGANDO BANCO OFICIAL DE PREGUNTAS...
          </h3>
          <p className="text-xs text-slate-400 font-inter mt-2">
            Verificando sintaxis LaTeX y distribuyendo 20 reactivos equitativos para {selectedSchool}.
          </p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error || !currentQuestion) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="glass-panel p-8 rounded-3xl border border-alert-red/40 shadow-tactical-card max-w-md mx-auto">
          <AlertTriangle className="w-10 h-10 text-alert-red mx-auto mb-3" />
          <h3 className="text-lg font-rajdhani font-bold text-white uppercase">
            Error al Cargar Preguntas
          </h3>
          <p className="text-xs text-slate-400 my-2">{error || "No se encontraron preguntas disponibles."}</p>
          <button
            type="button"
            onClick={restartTest}
            className="mt-4 px-6 py-2.5 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-bold text-xs uppercase"
          >
            Reintentar Carga
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-4">
      
      {/* ------------------------------------------------------------------
          1. HEADER TÁCTICO: SELECTOR DE ESCUELA Y ESTADO GENERAL
          ------------------------------------------------------------------ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-xs font-rajdhani font-bold text-neon-cyan tracking-widest uppercase">
              PILAR 4 // SIMULADOR DE CONOCIMIENTOS ACADÉMICOS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-rajdhani font-extrabold text-white uppercase tracking-wide flex items-center gap-2">
            <span>BATERÍA DE ADMISIÓN:</span>
            <span className="text-neon-cyan">{selectedSchool}</span>
          </h2>
        </div>

        {/* Selector Rápido de Escuela Matriz */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {MILITARY_SCHOOLS.map((esc) => {
            const isEscActive = selectedSchool === esc.id;
            return (
              <button
                key={esc.id}
                type="button"
                onClick={() => handleSchoolChange(esc.id)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-rajdhani font-bold whitespace-nowrap transition-all duration-200 ${
                  isEscActive
                    ? "bg-cyan-950/80 border-neon-cyan text-white shadow-cyan-glow-sm scale-105"
                    : "bg-graphite/60 border-white/10 text-slate-400 hover:text-white hover:border-white/25"
                }`}
              >
                {esc.badge}
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------------
          2. PANTALLA DE RESULTADOS (CUANDO SE COMPLETAN LAS 20 PREGUNTAS)
          ------------------------------------------------------------------ */}
      {isCompleted ? (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-neon-cyan/30 shadow-tactical-card">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan mx-auto mb-4 shadow-cyan-glow">
              <Award className="w-8 h-8" />
            </div>
            <span className="text-xs font-rajdhani font-bold text-neon-cyan tracking-widest uppercase">
              EVALUACIÓN CONOCIMIENTOS CONCLUIDA // {selectedSchool}
            </span>
            <h3 className="text-3xl sm:text-4xl font-rajdhani font-extrabold text-white uppercase tracking-wider mt-1">
              DICTAMEN DE RENDIMIENTO ACADÉMICO
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-inter mt-2">
              Puntaje calculado con baremo oficial de admisión: aciertos bonificados (+20 pts) y errores penalizados (-1.25 pts).
            </p>
          </div>

          {/* Tarjetas HUD de Puntaje */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-night-deep/80 border border-white/10 text-center">
              <span className="text-xs font-rajdhani font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Nota Vigesimal (0 - 20)
              </span>
              <div className="text-4xl sm:text-5xl font-rajdhani font-extrabold text-neon-cyan leading-tight">
                {score.vigesimalScore.toFixed(2)}
              </div>
              <span className={`inline-block px-2.5 py-0.5 mt-2 rounded text-[11px] font-rajdhani font-bold uppercase tracking-wider ${
                score.isApproved
                  ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-400"
                  : "bg-red-950/60 border border-alert-red/40 text-alert-red"
              }`}>
                {score.isApproved ? "APTO ACADÉMICO" : "EN OBSERVACIÓN"}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-night-deep/80 border border-white/10 text-center">
              <span className="text-xs font-rajdhani font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Puntaje Bruto Acumulado
              </span>
              <div className="text-4xl sm:text-5xl font-rajdhani font-extrabold text-white leading-tight">
                {score.rawScore} <span className="text-xs text-slate-500 font-bold">/ {score.maxPossibleScore}</span>
              </div>
              <span className="text-[11px] text-slate-400 block mt-2">
                Eficacia: <strong className="text-neon-cyan">{score.accuracy}%</strong> de precisión
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-night-deep/80 border border-white/10 text-center">
              <span className="text-xs font-rajdhani font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Desglose de Reactivos (20 P)
              </span>
              <div className="flex justify-center items-baseline gap-4 mt-2">
                <div>
                  <span className="text-2xl font-rajdhani font-extrabold text-emerald-400 block">{score.correctCount}</span>
                  <span className="text-[10px] text-slate-400 uppercase">Aciertos</span>
                </div>
                <div className="text-slate-600 font-bold">/</div>
                <div>
                  <span className="text-2xl font-rajdhani font-extrabold text-alert-red block">{score.incorrectCount}</span>
                  <span className="text-[10px] text-slate-400 uppercase">Errores</span>
                </div>
                <div className="text-slate-600 font-bold">/</div>
                <div>
                  <span className="text-2xl font-rajdhani font-extrabold text-slate-400 block">{score.blankCount}</span>
                  <span className="text-[10px] text-slate-400 uppercase">En Blanco</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 block mt-2">Penalización aplicada: -1.25 pts c/u</span>
            </div>
          </div>

          {/* Desglose por Cursos Académicos */}
          <div className="p-5 rounded-2xl bg-night-deep/60 border border-white/10 mb-8">
            <h4 className="text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-neon-cyan" />
              <span>RENDIMIENTO POR CURSO EN EL BANCO DE {selectedSchool}:</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(score.courseStats).map(([course, st]) => (
                <div key={course} className="p-3 rounded-xl bg-graphite/40 border border-white/5">
                  <span className="text-xs font-rajdhani font-bold text-slate-200 block truncate" title={course}>
                    {course}
                  </span>
                  <div className="flex items-center justify-between mt-1 text-xs">
                    <span className="text-slate-400">{st.correct}/{st.total} correctas</span>
                    <span className="font-bold text-neon-cyan">{st.pts > 0 ? `+${st.pts}` : st.pts} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones Finales */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={restartTest}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-slate-300 hover:text-white font-rajdhani font-bold text-xs uppercase tracking-wider hover:bg-white/5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Repetir Simulacro (Nuevas 20 Preguntas)</span>
            </button>

            <button
              type="button"
              onClick={nextPillar}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-extrabold text-sm uppercase tracking-wider shadow-cyan-glow-lg hover:bg-cyan-300 transition-all duration-300"
            >
              <span>CONTINUAR AL DASHBOARD FINAL (PILAR 5)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* ------------------------------------------------------------------
            3. VISTA INTERACTIVA DEL SIMULADOR: PREGUNTA Y TEMPORIZADOR HUD
            ------------------------------------------------------------------ */
        <div className="space-y-4">
          
          {/* Barra Superior con TopoProgressBar y Temporizador de Estrés Regresivo (72s) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl glass-panel border border-white/10">
            <div className="flex-1">
              <TopoProgressBar
                current={currentIndex + 1}
                total={totalQuestions}
                label={`PILAR 4 // PREGUNTA ${currentIndex + 1} DE ${totalQuestions}: ${currentQuestion.curso?.toUpperCase() || 'GENERAL'}`}
              />
            </div>

            {/* Temporizador de Estrés Regresivo Visual (Regla 3) */}
            <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border backdrop-blur-md transition-all duration-300 ${timerTheme.border} ${timerTheme.bg} ${timerTheme.glow}`}>
              <div className="flex items-center gap-2">
                <Clock className={`w-4 h-4 ${timerTheme.color}`} />
                <div>
                  <div className="text-[10px] font-rajdhani font-bold text-slate-400 uppercase tracking-widest leading-none">
                    TIEMPO LÍMITE
                  </div>
                  <div className={`text-xl font-rajdhani font-extrabold tracking-wider leading-none mt-0.5 ${timerTheme.color}`}>
                    00:{String(timeRemaining).padStart(2, '0')}s
                  </div>
                </div>
              </div>

              {/* Minibarra de Progreso de Estrés */}
              <div className="w-16 h-2 rounded-full bg-night-deep/80 overflow-hidden border border-white/10">
                <div
                  className={`h-full transition-all duration-1000 ${timerTheme.barColor}`}
                  style={{ width: `${timerPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Tarjeta de Pregunta con Animación Deslizante Framer Motion (Regla 4) */}
          <div className="relative min-h-[420px] overflow-hidden">
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={`question-${currentQuestion.id_pregunta}-${currentIndex}`}
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <div className="glass-panel p-6 sm:p-9 rounded-3xl border border-white/15 shadow-tactical-card relative">
                  
                  {/* Encabezado del Reactivo */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 mb-6">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="px-3 py-1 rounded-lg bg-cyan-950/70 border border-neon-cyan/40 text-neon-cyan text-xs font-rajdhani font-bold uppercase tracking-wider shadow-cyan-glow-sm">
                        {currentQuestion.curso}
                      </span>
                      <span className="text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider">
                        TEMA: {currentQuestion.tema}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-rajdhani">
                      <span className="px-2.5 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 font-bold">
                        +{currentQuestion.metricas?.pts_correcta ?? 20} PTS
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-red-950/40 text-alert-red border border-alert-red/30 font-bold">
                        {currentQuestion.metricas?.pts_incorrecta ?? -1.25} PTS
                      </span>
                    </div>
                  </div>

                  {/* Enunciado con KaTeX (Regla 2: <EnunciadoMatematico />) */}
                  <div className="text-base sm:text-lg font-inter text-slate-100 leading-relaxed mb-8">
                    <EnunciadoMatematico text={currentQuestion.enunciado} />
                  </div>

                  {/* Opciones de Respuesta A, B, C, D, E (Regla 3: Radio Buttons Tácticos) */}
                  <div className="space-y-3">
                    {currentQuestion.opciones?.map((opt) => {
                      const isSelected = currentAnswer?.selectedOptionId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          disabled={isAdvancing}
                          onClick={() => handleAnswerClick(opt.id)}
                          className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-4 group cursor-pointer ${
                            isSelected
                              ? "bg-cyan-950/80 border-neon-cyan shadow-cyan-glow"
                              : "bg-graphite/40 border-white/10 hover:border-neon-cyan/40 hover:bg-cyan-950/20 hover:shadow-cyan-glow-sm"
                          } ${isAdvancing ? 'cursor-default' : ''}`}
                        >
                          <div className="flex items-center gap-4 flex-1">
                            {/* Chip con la Letra Táctica */}
                            <span className={`w-8 h-8 rounded-xl border font-rajdhani font-extrabold text-sm flex items-center justify-center transition-all flex-shrink-0 ${
                              isSelected
                                ? "border-neon-cyan bg-neon-cyan text-night-deep shadow-cyan-glow-sm"
                                : "border-white/15 bg-night-deep text-slate-300 group-hover:border-neon-cyan/50 group-hover:text-neon-cyan"
                            }`}>
                              {opt.id}
                            </span>

                            {/* Texto de la Opción Procesado con KaTeX */}
                            <div className={`text-sm sm:text-base font-inter transition-colors leading-snug ${
                              isSelected ? "text-white font-medium" : "text-slate-200 group-hover:text-white"
                            }`}>
                              <EnunciadoMatematico text={opt.texto} />
                            </div>
                          </div>

                          {/* Indicador de Selección */}
                          <div className="flex-shrink-0">
                            {isSelected ? (
                              <CheckCircle2 className="w-5 h-5 text-neon-cyan" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border border-white/20 group-hover:border-neon-cyan/40" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Aviso de Alerta si el tiempo es menor a 15 segundos */}
                  {timeRemaining <= 15 && (
                    <div className="mt-6 p-3 rounded-xl bg-alert-red/10 border border-alert-red/30 flex items-center gap-2 text-alert-red text-xs font-rajdhani font-bold tracking-wider uppercase animate-pulse">
                      <Flame className="w-4 h-4 flex-shrink-0" />
                      <span>¡ATENCIÓN TÁCTICA! MENOS DE 15 SEGUNDOS PARA RESPONDER ANTES DEL BLOQUEO EN BLANCO.</span>
                    </div>
                  )}

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ------------------------------------------------------------------
              4. NAVEGACIÓN Y CONTROLES INFERIORES
              ------------------------------------------------------------------ */}
          <div className="flex justify-between items-center pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                if (currentIndex > 0) {
                  handlePrev();
                } else {
                  prevPillar();
                }
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-slate-400 hover:text-white font-rajdhani font-bold text-xs tracking-wider uppercase transition-all hover:bg-white/5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{currentIndex > 0 ? "Pregunta Anterior" : "Volver a Pilar 3"}</span>
            </button>

            <div className="flex items-center gap-3">
              {/* Opción Dejar en Blanco voluntariamente */}
              <button
                type="button"
                onClick={() => {
                  handleNext();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-rajdhani font-bold uppercase tracking-wider"
              >
                <span>Omitir Reactivo (0 Pts)</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-7 py-3 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-extrabold text-sm tracking-wider uppercase shadow-cyan-glow hover:bg-cyan-300 transition-all duration-300"
              >
                <span>{currentIndex < totalQuestions - 1 ? "Siguiente Pregunta" : "Finalizar Evaluación"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

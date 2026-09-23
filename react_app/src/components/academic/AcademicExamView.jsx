import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKnowledgeTest } from '../../hooks/useKnowledgeTest';
import EnunciadoMatematico from '../common/EnunciadoMatematico';
import TopoProgressBar from '../common/TopoProgressBar';
import { MILITARY_SCHOOLS } from './SchoolSelector';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Flame,
  Shield
} from 'lucide-react';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function AcademicExamView({ schoolId, onComplete, onCancel }) {
  const [slideDirection, setSlideDirection] = useState(1);
  const [isAdvancing, setIsAdvancing] = useState(false);

  const {
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
  } = useKnowledgeTest(schoolId);

  // Metadatos de la escuela
  const schoolMeta = MILITARY_SCHOOLS.find(s => s.id === schoolId || s.sigla === schoolId) || MILITARY_SCHOOLS[0];

  // Identificar temas fuertes y temas a reforzar al finalizar
  const topicAnalysis = useMemo(() => {
    if (!questions || questions.length === 0) {
      return { strongTopics: [], weakTopics: [] };
    }

    const byTopic = {};
    questions.forEach(q => {
      const topicName = q.tema || q.curso || 'Materia General';
      if (!byTopic[topicName]) {
        byTopic[topicName] = { total: 0, correct: 0, incorrect: 0, course: q.curso };
      }
      byTopic[topicName].total += 1;

      const ans = answers[q.id_pregunta];
      if (ans && ans.isCorrect) {
        byTopic[topicName].correct += 1;
      } else {
        byTopic[topicName].incorrect += 1;
      }
    });

    const strongTopics = [];
    const weakTopics = [];

    Object.entries(byTopic).forEach(([topic, stat]) => {
      const accuracy = (stat.correct / stat.total) * 100;
      if (accuracy >= 66) {
        strongTopics.push({ topic, course: stat.course, accuracy, correct: stat.correct, total: stat.total });
      } else {
        weakTopics.push({ topic, course: stat.course, accuracy, correct: stat.correct, total: stat.total });
      }
    });

    return { strongTopics, weakTopics, byTopic };
  }, [questions, answers]);

  // Si se completa, notificar al módulo superior para activar el Dashboard Estratégico
  React.useEffect(() => {
    if (isCompleted && score) {
      onComplete({
        score,
        schoolMeta,
        strongTopics: topicAnalysis.strongTopics,
        weakTopics: topicAnalysis.weakTopics,
        questions,
        answers
      });
    }
  }, [isCompleted, score, topicAnalysis, onComplete, schoolMeta, questions, answers]);

  // Manejar respuesta
  const handleAnswerClick = (optionId) => {
    if (isAdvancing || isCompleted) return;
    selectAnswer(optionId);
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

  // Cálculo del Temporizador
  const timerPercentage = Math.max(0, Math.min(100, (timeRemaining / 72) * 100));
  let timerTheme = {
    color: 'text-cyan-400',
    border: 'border-cyan-500/40',
    bg: 'bg-cyan-950/40',
    barColor: 'bg-neon-cyan',
  };

  if (timeRemaining <= 12) {
    timerTheme = {
      color: 'text-alert-red animate-pulse',
      border: 'border-alert-red/70',
      bg: 'bg-red-950/60',
      barColor: 'bg-alert-red animate-pulse',
    };
  } else if (timeRemaining <= 25) {
    timerTheme = {
      color: 'text-alert-amber',
      border: 'border-alert-amber/50',
      bg: 'bg-amber-950/40',
      barColor: 'bg-alert-amber',
    };
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-[#141518] p-10 rounded-2xl border border-gray-700 shadow-2xl">
          <div className="w-12 h-12 rounded-full border-4 border-neon-cyan border-t-transparent animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-sans font-black text-white uppercase tracking-tight">
            DESPLEGANDO BALOTARIO MILITAR...
          </h3>
          <p className="text-xs text-gray-300 font-inter mt-2">
            Distribuyendo 20 reactivos académicos equitativos para <strong className="text-white">{schoolMeta.sigla}</strong>.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-[#141518] p-8 rounded-2xl border border-alert-red shadow-2xl">
          <AlertTriangle className="w-10 h-10 text-alert-red mx-auto mb-3" />
          <h3 className="text-lg font-rajdhani font-bold text-white uppercase">Error al Cargar Preguntas</h3>
          <p className="text-xs text-gray-300 my-2">{error}</p>
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={onCancel}
              className="px-5 py-2 rounded-xl border border-gray-600 text-gray-300 hover:text-white font-rajdhani font-bold text-xs uppercase"
            >
              Volver al Catálogo
            </button>
            <button
              onClick={restartTest}
              className="px-5 py-2 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-bold text-xs uppercase"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-4">
      
      {/* Barra Superior del Examen: Escuela + Progreso + Cronómetro */}
      <div className="bg-[#141518] border border-gray-700 rounded-2xl p-4 mb-4 shadow-xl">
        
        {/* Fila 1: Escuela Matriz Activa y Cancelar */}
        <div className="flex items-center justify-between gap-3 border-b border-gray-800 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xl select-none">{schoolMeta.icono}</span>
            <div>
              <span className="text-[10px] font-teko uppercase font-bold text-peru-red tracking-widest block leading-none">
                SIMULACRO OFICIAL EN CURSO
              </span>
              <h2 className="font-sans font-black text-base sm:text-lg text-white uppercase tracking-tight leading-none mt-0.5">
                {schoolMeta.sigla} · <span className="text-gray-400 font-rajdhani text-xs">{schoolMeta.rama}</span>
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            title="Salir del examen y regresar al catálogo de escuelas"
            className="px-3 py-1.5 rounded-lg border border-gray-700 bg-black/40 text-gray-400 hover:text-alert-red hover:border-alert-red/50 text-[11px] font-rajdhani font-bold uppercase transition-colors cursor-pointer"
          >
            Cancelar Examen
          </button>
        </div>

        {/* Fila 2: Progreso Topológico y Temporizador */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1">
            <TopoProgressBar
              current={currentIndex + 1}
              total={totalQuestions}
              label={`PREGUNTA ${currentIndex + 1} DE ${totalQuestions} // ${currentQuestion?.curso?.toUpperCase() || 'GENERAL'}`}
            />
          </div>

          {/* Temporizador Regresivo */}
          <div className={`flex items-center gap-3 px-3.5 py-1.5 rounded-xl border transition-all duration-300 ${timerTheme.border} ${timerTheme.bg}`}>
            <Clock className={`w-4 h-4 ${timerTheme.color}`} />
            <div>
              <div className="text-[9px] font-rajdhani font-bold text-gray-400 uppercase tracking-widest leading-none">
                TIEMPO LÍMITE
              </div>
              <div className={`text-lg font-mono font-bold tracking-wider leading-none mt-0.5 ${timerTheme.color}`}>
                00:{String(timeRemaining).padStart(2, '0')}s
              </div>
            </div>
            <div className="w-12 h-1.5 rounded-full bg-night-deep overflow-hidden border border-white/10">
              <div className={`h-full transition-all duration-1000 ${timerTheme.barColor}`} style={{ width: `${timerPercentage}%` }} />
            </div>
          </div>
        </div>

      </div>

      {/* Contenedor Sólido de la Pregunta */}
      <div className="relative min-h-[380px]">
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={`q-${currentQuestion?.id_pregunta}-${currentIndex}`}
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            <div className="bg-[#141518] border border-gray-700 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              
              {/* Encabezado del Reactivo */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800 pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-black/60 border border-gray-700 text-neon-cyan text-xs font-rajdhani font-bold uppercase tracking-wider">
                    {currentQuestion?.curso}
                  </span>
                  <span className="text-xs font-rajdhani font-bold text-gray-300 uppercase tracking-wider">
                    TEMA: {currentQuestion?.tema}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-rajdhani font-bold">
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                    +{currentQuestion?.metricas?.pts_correcta ?? 20} PTS
                  </span>
                  <span className="px-2 py-0.5 rounded bg-red-950/60 text-alert-red border border-alert-red/30">
                    {currentQuestion?.metricas?.pts_incorrecta ?? -1.25} PTS
                  </span>
                </div>
              </div>

              {/* Enunciado con KaTeX */}
              <div className="text-white text-base sm:text-lg font-inter leading-relaxed mb-6 font-normal">
                <EnunciadoMatematico text={currentQuestion?.enunciado} />
              </div>

              {/* Opciones */}
              <div className="space-y-3">
                {currentQuestion?.opciones?.map((opt) => {
                  const isSelected = currentAnswer?.selectedOptionId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isAdvancing}
                      onClick={() => handleAnswerClick(opt.id)}
                      className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer ${
                        isSelected
                          ? "bg-cyan-950/60 border-neon-cyan text-white shadow-cyan-glow-sm"
                          : "bg-[#1a1b20] border-gray-700 text-gray-200 hover:border-neon-cyan hover:bg-[#22252e] hover:text-white"
                      } ${isAdvancing ? 'cursor-default' : ''}`}
                    >
                      <div className="flex items-center gap-3.5 flex-1 min-w-0">
                        <span className={`w-8 h-8 rounded-lg border font-rajdhani font-bold text-sm flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected
                            ? "border-neon-cyan bg-neon-cyan text-night-deep font-black"
                            : "border-gray-600 bg-black/60 text-gray-300"
                        }`}>
                          {opt.id}
                        </span>

                        <div className="text-sm sm:text-base font-inter leading-snug break-words flex-1">
                          <EnunciadoMatematico text={opt.texto} />
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        {isSelected ? (
                          <CheckCircle2 className="w-5 h-5 text-neon-cyan" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-gray-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Alerta de Menos de 15 Segundos */}
              {timeRemaining <= 15 && (
                <div className="mt-5 p-2.5 rounded-xl bg-alert-red/10 border border-alert-red/40 flex items-center gap-2 text-alert-red text-xs font-rajdhani font-bold tracking-wider uppercase animate-pulse">
                  <Flame className="w-4 h-4 flex-shrink-0" />
                  <span>TIEMPO CRÍTICO: MENOS DE 15 SEGUNDOS PARA RESPONDER ANTES DEL BLOQUEO EN BLANCO.</span>
                </div>
              )}

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navegación Inferior */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-800 mt-4">
        <button
          type="button"
          onClick={() => {
            if (currentIndex > 0) handlePrev();
            else onCancel();
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white font-rajdhani font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{currentIndex > 0 ? "Pregunta Anterior" : "Cambiar de Escuela"}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleNext}
            className="hidden sm:inline-flex items-center px-3.5 py-2 text-gray-400 hover:text-gray-200 text-xs font-rajdhani font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Omitir Reactivo (0 Pts)
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-black text-xs sm:text-sm tracking-wider uppercase shadow-cyan-glow hover:bg-cyan-300 transition-all cursor-pointer"
          >
            <span>{currentIndex < totalQuestions - 1 ? "Siguiente Pregunta" : "Finalizar Examen"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}

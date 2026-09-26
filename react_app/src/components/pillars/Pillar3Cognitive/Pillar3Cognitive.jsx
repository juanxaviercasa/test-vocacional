import React, { useState, useEffect } from 'react';
import { useAssessmentStore } from '../../../store/useAssessmentStore';
import { COGNITIVE_QUESTIONS } from '../../../data/cognitiveQuestions';
import TopoProgressBar from '../../common/TopoProgressBar';
import AnimatePillarContainer from '../../layout/AnimatePillarContainer';
import Tooltip from '../../common/Tooltip';
import { ArrowLeft, ArrowRight, Brain, Cpu, Wrench, Clock, CheckCircle2, Zap } from 'lucide-react';

export default function Pillar3Cognitive() {
  const {
    cognitiveIndex,
    cognitiveAnswers,
    answerCognitiveQuestion,
    goToCognitiveQuestion,
    nextCognitiveQuestion,
    prevCognitiveQuestion,
    direction,
    prevPillar,
    isCognitiveAdvancing
  } = useAssessmentStore();

  const total = COGNITIVE_QUESTIONS.length;
  const currentQ = COGNITIVE_QUESTIONS[cognitiveIndex] || COGNITIVE_QUESTIONS[0];
  const selectedOptId = cognitiveAnswers[currentQ.id];

  // Temporizador táctico por reactivo
  const [secondsLeft, setSecondsLeft] = useState(currentQ.tiempoSegundos || 40);

  useEffect(() => {
    setSecondsLeft(currentQ.tiempoSegundos || 40);
  }, [cognitiveIndex, currentQ]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const isRaven = currentQ.tipo === 'RAVEN_MATRIZ';

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      
      {/* Barra Topológica Táctica */}
      <TopoProgressBar
        current={cognitiveIndex + 1}
        total={total}
        label={`Pilar 3 // Facultades Cognitivas Superiores: Ítem ${cognitiveIndex + 1} de ${total}`}
      />

      {/* Contenedor con Animación Deslizante */}
      <AnimatePillarContainer animationKey={`cog-q-${cognitiveIndex}`} direction={direction}>
        
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/15 shadow-tactical-card relative overflow-hidden">
          
          {/* Fondo Inmersivo de Razonamiento Cognitivo y Matrices Progresivas */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src="/assets/general/cognitive-matrices-tactical.jpg"
              alt="Evaluación de Razonamiento Abstracto y Matrices Progresivas Militares"
              className="w-full h-full object-cover object-center opacity-15 dark:opacity-25 blur-[1px] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B101E]/95 via-[#0B101E]/85 to-[#0B101E]/95" />
          </div>

          <div className="relative z-10 space-y-6">
            
            {/* Header del Reactivo: Tipo y Cronómetro */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              
              <div className="flex items-center gap-2">
                {isRaven ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-neon-cyan/50 text-neon-cyan text-xs font-rajdhani font-bold uppercase tracking-wider">
                    <Cpu className="w-4 h-4" />
                    <span>Factor "g" // Matrices Abstractas de Raven</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-400 text-xs font-rajdhani font-bold uppercase tracking-wider">
                    <Wrench className="w-4 h-4" />
                    <span>Aptitud Mecánica y Técnica // Test Bennett</span>
                  </div>
                )}

                <span className="text-xs font-rajdhani font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">
                  • {currentQ.categoria}
                </span>
              </div>

              {/* Cronómetro de Respuesta */}
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-rajdhani font-bold tracking-wider ${
                secondsLeft <= 10
                  ? "border-red-500 text-red-400 bg-red-950/40 animate-pulse"
                  : "border-white/15 text-slate-300 bg-black/40"
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{secondsLeft}s RESTANTES</span>
              </div>

            </div>

            {/* Enunciado del Problema */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-rajdhani font-bold text-white leading-snug tracking-wide">
                {currentQ.enunciado}
              </h2>

              {currentQ.subtexto && (
                <div className="p-4 rounded-xl bg-night-deep/80 border border-white/10 text-sm sm:text-base text-cyan-200/90 font-inter leading-relaxed">
                  <span className="text-[11px] font-rajdhani font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    DATOS DE SITUACIÓN // VECTOR EVALUADO:
                  </span>
                  {currentQ.subtexto}
                </div>
              )}
            </div>

            {/* Opciones de Respuesta Táctica (A, B, C, D) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentQ.opciones.map((opt) => {
                const isSelected = selectedOptId === opt.id;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={isCognitiveAdvancing}
                    onClick={() => answerCognitiveQuestion(currentQ.id, opt.id)}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-cyan-950/90 border-neon-cyan shadow-cyan-glow scale-[1.01]"
                        : "bg-graphite-surface border-white/10 hover:border-white/30 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-rajdhani font-black text-sm flex-shrink-0 transition-colors ${
                      isSelected
                        ? "bg-neon-cyan text-night-deep"
                        : "bg-white/10 text-slate-300 group-hover:bg-white/20 group-hover:text-white"
                    }`}>
                      {opt.id}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className={`text-sm sm:text-base font-inter block leading-snug ${
                        isSelected ? "text-white font-medium" : "text-slate-200"
                      }`}>
                        {opt.texto}
                      </span>
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-neon-cyan flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Barra de Navegación Inferior */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={cognitiveIndex > 0 ? prevCognitiveQuestion : prevPillar}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 text-slate-300 hover:text-white hover:bg-white/5 font-rajdhani font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{cognitiveIndex > 0 ? "Ítem Anterior" : "Pilar 2: Psicológico"}</span>
              </button>

              <div className="flex items-center gap-2">
                {COGNITIVE_QUESTIONS.map((q, idx) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => goToCognitiveQuestion(idx)}
                    className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                      idx === cognitiveIndex
                        ? "bg-neon-cyan scale-125"
                        : cognitiveAnswers[q.id]
                        ? "bg-emerald-400"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                    title={`Ítem ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextCognitiveQuestion}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-bold text-xs uppercase tracking-wider shadow-cyan-glow hover:bg-cyan-300 transition-all cursor-pointer"
              >
                <span>{cognitiveIndex < total - 1 ? "Siguiente" : "Pilar 4: Intereses"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </AnimatePillarContainer>

    </div>
  );
}

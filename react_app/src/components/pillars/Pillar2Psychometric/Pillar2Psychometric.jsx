import React from 'react';
import { useAssessmentStore } from '../../../store/useAssessmentStore';
import { PSICOMETRIC_QUESTIONS, LIKERT_OPTIONS } from '../../../data/psychometricQuestions';
import TopoProgressBar from '../../common/TopoProgressBar';
import AnimatePillarContainer from '../../layout/AnimatePillarContainer';
import Tooltip from '../../common/Tooltip';
import { ArrowLeft, Brain, Sparkles } from 'lucide-react';

export default function Pillar2Psychometric() {
  const {
    psychIndex,
    psychAnswers,
    answerPsychQuestion,
    goToPsychQuestion,
    direction,
    prevPillar,
    isPsychAdvancing
  } = useAssessmentStore();

  const currentQ = PSICOMETRIC_QUESTIONS[psychIndex] || PSICOMETRIC_QUESTIONS[0];
  const selectedVal = psychAnswers[currentQ.id];
  const total = PSICOMETRIC_QUESTIONS.length;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      
      {/* Barra Topológica Ultra Fina */}
      <TopoProgressBar
        current={psychIndex + 1}
        total={total}
        label={`Pilar 2 // Evaluación Psicométrica IPIP-NEO: Reactivo ${psychIndex + 1} de ${total}`}
      />

      {/* Contenedor con Animación Deslizante de la Pregunta */}
      <AnimatePillarContainer animationKey={`psy-q-${psychIndex}`} direction={direction}>
        
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/15 shadow-tactical-card relative overflow-hidden text-center">
          
          {/* Fondo Inmersivo de Sala de Operaciones Tácticas CCFFAA Perú */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src="/assets/general/tactical-command-room.jpg"
              alt="Sala de Operaciones del Comando Conjunto de las FFAA del Perú"
              className="w-full h-full object-cover object-center opacity-15 dark:opacity-25 blur-[1px] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B101E]/90 via-[#0B101E]/80 to-[#0B101E]/95" />
          </div>

          <div className="relative z-10">
            {/* Luz sutil de fondo según dominio */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />

            {/* Badge del Dominio Psicológico */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-neon-cyan/40 text-neon-cyan text-xs sm:text-sm font-rajdhani font-bold uppercase tracking-widest mb-6 shadow-sm">
              <Brain className="w-4 h-4" />
              <span>Dimensión <Tooltip termino="Big Five">Big Five</Tooltip>: {currentQ.dominio}</span>
            </div>

            {/* Afirmación Central en Modo Enfoque con Escala Accesible AAA */}
            <h2 className="text-2xl sm:text-4xl font-rajdhani font-bold text-white leading-relaxed tracking-wide max-w-3xl mx-auto my-6 min-h-[90px] flex items-center justify-center">
              "{currentQ.enunciado}"
            </h2>

            <p className="text-sm sm:text-base text-slate-200 font-inter max-w-xl mx-auto mb-10 leading-relaxed">
              Responde con espontaneidad según el inventario <Tooltip termino="IPIP-NEO">IPIP-NEO</Tooltip>. El sistema computa tu consistencia conductual bajo el <Tooltip termino="Baremo">Baremo</Tooltip> institucional.
            </p>

            {/* Opciones Likert Horizontales Estilizadas con Alto Contraste */}
            <div className="grid grid-cols-5 gap-2 sm:gap-4 max-w-2xl mx-auto">
              {LIKERT_OPTIONS.map((opt) => {
                const isSelected = selectedVal === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    disabled={isPsychAdvancing}
                    onClick={() => answerPsychQuestion(currentQ.id, opt.value)}
                    className={`group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? "bg-cyan-950/80 border-neon-cyan shadow-cyan-glow scale-105 z-10"
                        : "bg-graphite-surface border-white/10 hover:border-white/30 hover:bg-white/[0.06] hover:scale-102"
                    }`}
                  >
                    <span className={`text-xl sm:text-2xl font-rajdhani font-bold mb-1 transition-colors ${
                      isSelected ? "text-neon-cyan" : "text-slate-200 group-hover:text-white"
                    }`}>
                      {opt.short}
                    </span>
                    <span className={`text-xs sm:text-sm font-inter text-center leading-tight line-clamp-2 transition-colors ${
                      isSelected ? "text-cyan-200 font-semibold" : "text-slate-300 group-hover:text-white"
                    }`}>
                      {opt.label}
                    </span>

                    {/* Resplandor inferior */}
                    {isSelected && (
                      <div className="absolute -bottom-1 left-3 right-3 h-1 bg-neon-cyan rounded-full shadow-cyan-glow" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Indicador de Auto-avance */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs sm:text-sm font-rajdhani text-slate-300 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
              <span>Auto-avance instantáneo activado (300ms)</span>
            </div>

          </div>

        </div>

      </AnimatePillarContainer>

      {/* Barra de Control y Regreso */}
      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          onClick={() => {
            if (psychIndex > 0) {
              goToPsychQuestion(psychIndex - 1);
            } else {
              prevPillar();
            }
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 text-slate-400 hover:text-white hover:bg-white/5 font-rajdhani font-bold text-xs tracking-wider uppercase transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{psychIndex > 0 ? "Pregunta Anterior" : "Volver a Pilar 1"}</span>
        </button>

        <span className="text-xs font-rajdhani text-slate-400 uppercase tracking-wider">
          Pilar 2 · Matriz Psicométrica Militar
        </span>
      </div>

    </div>
  );
}

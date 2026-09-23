import React from 'react';
import { useAssessmentStore } from '../../../store/useAssessmentStore';
import { TACTICAL_DILEMMAS } from '../../../data/tacticalDilemmas';
import TopoProgressBar from '../../common/TopoProgressBar';
import AnimatePillarContainer from '../../layout/AnimatePillarContainer';
import { Compass, ArrowLeft, ArrowRight, ShieldCheck, Crosshair } from 'lucide-react';

export default function Pillar3Interests() {
  const {
    interestsIndex,
    interestsAnswers,
    answerInterestDilemma,
    nextInterestDilemma,
    prevInterestDilemma,
    direction,
    prevPillar
  } = useAssessmentStore();

  const currentDilemma = TACTICAL_DILEMMAS[interestsIndex] || TACTICAL_DILEMMAS[0];
  const selectedOptionId = interestsAnswers[currentDilemma.id];
  const total = TACTICAL_DILEMMAS.length;

  const handleSelectOption = (optId) => {
    answerInterestDilemma(currentDilemma.id, optId);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      
      {/* Barra Topológica */}
      <TopoProgressBar
        current={interestsIndex + 1}
        total={total}
        label={`Pilar 3 // Intereses Operacionales: Dilema Táctico ${interestsIndex + 1} de ${total}`}
      />

      <AnimatePillarContainer animationKey={`dil-q-${interestsIndex}`} direction={direction}>
        
        {/* Tarjeta de Escenario Inmersivo */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 shadow-tactical-card mb-6 relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-950/50 border border-alert-amber/40 flex items-center justify-center text-alert-amber">
                <Crosshair className="w-4 h-4" />
              </div>
              <span className="text-xs font-rajdhani font-bold text-alert-amber tracking-widest uppercase">
                ESCENARIO OPERATIVO CLASIFICADO // {currentDilemma.id}
              </span>
            </div>
            <span className="text-xs font-rajdhani text-slate-400 uppercase tracking-wider">
              Baremos Operacionales FFAA & PNP
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-rajdhani font-bold text-white uppercase tracking-wide mb-3">
            {currentDilemma.titulo}
          </h2>

          <p className="text-sm sm:text-base text-slate-200 font-inter leading-relaxed bg-night-deep/60 p-4 rounded-xl border border-white/5">
            {currentDilemma.escenario}
          </p>

        </div>

        {/* 4 Tarjetas de Decisión con Hover Glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentDilemma.opciones.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                className={`relative p-5 rounded-2xl border text-left transition-all duration-300 group overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? "bg-cyan-950/40 border-neon-cyan shadow-cyan-glow scale-[1.01]"
                    : "bg-graphite-surface border-white/10 hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:bg-white/[0.05]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-xs font-rajdhani font-bold px-2.5 py-1 rounded-md border uppercase tracking-wider transition-colors ${
                      isSelected
                        ? "border-neon-cyan text-neon-cyan bg-neon-cyan/10"
                        : "border-slate-700 text-slate-400 group-hover:border-neon-cyan/40 group-hover:text-neon-cyan"
                    }`}>
                      Opción {opt.id} // {opt.rama}
                    </span>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected ? "border-neon-cyan bg-neon-cyan" : "border-slate-600 bg-transparent"
                    }`}>
                      {isSelected && <ShieldCheck className="w-3.5 h-3.5 text-night-deep" />}
                    </div>
                  </div>

                  <h3 className={`text-base font-rajdhani font-bold uppercase tracking-wide transition-colors ${
                    isSelected ? "text-white" : "text-slate-200 group-hover:text-white"
                  }`}>
                    {opt.titulo}
                  </h3>

                  <p className="text-xs text-slate-300 font-inter mt-2 leading-relaxed">
                    {opt.texto}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-rajdhani font-bold text-slate-400 uppercase tracking-wider">
                  <span>Afinidad Institucional:</span>
                  <span className="text-neon-cyan">{opt.escuelas.join(" · ")}</span>
                </div>
              </button>
            );
          })}
        </div>

      </AnimatePillarContainer>

      {/* Navegación Inferior */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={() => {
            if (interestsIndex > 0) {
              prevInterestDilemma();
            } else {
              prevPillar();
            }
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-slate-400 hover:text-white hover:bg-white/5 font-rajdhani font-bold text-xs tracking-wider uppercase transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{interestsIndex > 0 ? "Dilema Anterior" : "Volver a Pilar 2"}</span>
        </button>

        <button
          type="button"
          disabled={!selectedOptionId}
          onClick={nextInterestDilemma}
          className={`flex items-center gap-2 px-7 py-3 rounded-xl font-rajdhani font-bold text-sm tracking-wider uppercase transition-all duration-300 ${
            selectedOptionId
              ? "bg-neon-cyan text-night-deep shadow-cyan-glow hover:bg-cyan-300"
              : "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5"
          }`}
        >
          <span>{interestsIndex < total - 1 ? "Siguiente Dilema" : "VER MI RESULTADO VOCACIONAL"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

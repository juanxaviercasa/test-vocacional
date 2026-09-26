import React from 'react';
import { useAssessmentStore } from '../../../store/useAssessmentStore';
import { TACTICAL_DILEMMAS, resolveDilemmaOptions } from '../../../data/tacticalDilemmas';
import TopoProgressBar from '../../common/TopoProgressBar';
import AnimatePillarContainer from '../../layout/AnimatePillarContainer';
import { Compass, ArrowLeft, ArrowRight, ShieldCheck, Crosshair, Sparkles, AlertCircle } from 'lucide-react';

export default function Pillar3Interests() {
  const {
    interestsIndex,
    interestsAnswers,
    answerInterestDilemma,
    nextInterestDilemma,
    prevInterestDilemma,
    direction,
    prevPillar,
    getPhysicalRestrictions
  } = useAssessmentStore();

  const restrictions = getPhysicalRestrictions ? getPhysicalRestrictions() : {};
  const currentDilemma = TACTICAL_DILEMMAS[interestsIndex] || TACTICAL_DILEMMAS[0];
  const selectedOptionId = interestsAnswers[currentDilemma.id];
  const total = TACTICAL_DILEMMAS.length;

  // Renderizado condicional adaptativo según restricciones físicas del Pilar 1
  const adaptedOptions = resolveDilemmaOptions(currentDilemma, restrictions);

  const handleSelectOption = (optId) => {
    answerInterestDilemma(currentDilemma.id, optId);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      
      {/* Barra Topológica */}
      <TopoProgressBar
        current={interestsIndex + 1}
        total={total}
        label={`Pilar 4 // Intereses Operacionales: Dilema Táctico ${interestsIndex + 1} de ${total}`}
      />

      {/* Indicador de Calibración Biométrica Activa (Contexto Pilar 1) */}
      {(restrictions.hasGlasses || restrictions.isSubofficerOnly) && (
        <div className="mb-4 p-3 rounded-2xl bg-white dark:bg-[#0B101E]/90 border border-slate-200 dark:border-cyan-500/30 flex flex-wrap items-center justify-between gap-3 text-xs font-inter shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-neon-cyan animate-pulse" />
            <span className="font-rajdhani font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Calibración Biométrica Activa (Pilar 1):
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {restrictions.hasGlasses && (
              <span className="px-2.5 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-400/40 text-cyan-800 dark:text-cyan-300 font-rajdhani font-bold text-[11px] uppercase tracking-wider">
                👓 Perfil Visual Adaptado (Roles en Tierra & Servicios)
              </span>
            )}
            {restrictions.isSubofficerOnly && (
              <span className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/80 border border-amber-300 dark:border-alert-amber/40 text-amber-800 dark:text-amber-300 font-rajdhani font-bold text-[11px] uppercase tracking-wider">
                🛡️ Escalafón Técnico (Escuelas de Suboficiales)
              </span>
            )}
          </div>
        </div>
      )}

      <AnimatePillarContainer animationKey={`dil-q-${interestsIndex}`} direction={direction}>
        
        {/* Tarjeta de Escenario Inmersivo con Imagen Táctica Auténtica en Proporción 16:9 */}
        <div className="relative rounded-3xl border border-slate-200 dark:border-white/20 shadow-tactical-card mb-6 overflow-hidden bg-white dark:bg-night-deep/90 transition-colors">
          
          {/* Contenedor de Imagen Panorámica en 16:9 Natural */}
          <div className="relative w-full aspect-video overflow-hidden">
            <img
              src={currentDilemma.bgImage}
              alt={currentDilemma.titulo}
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            {/* Gradientes para máxima legibilidad táctica */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            {/* Badge de Teatro de Operaciones Flotante */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex flex-wrap items-center gap-2 z-10">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-alert-amber/60 text-alert-amber text-xs font-rajdhani font-bold tracking-widest uppercase shadow-lg">
                <Crosshair className="w-3.5 h-3.5 animate-pulse" />
                <span>ESCENARIO // {currentDilemma.id}</span>
              </div>
              {currentDilemma.teatro && (
                <div className="px-3 py-1.5 rounded-xl bg-cyan-950/80 backdrop-blur-md border border-neon-cyan/50 text-neon-cyan text-xs font-rajdhani font-bold tracking-wider uppercase shadow-lg">
                  <span>TEATRO: {currentDilemma.teatro}</span>
                </div>
              )}
            </div>

            {/* Título integrado sobre el degradado inferior */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-6 sm:right-6 z-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-rajdhani font-extrabold text-white uppercase tracking-wide drop-shadow-md">
                {currentDilemma.titulo}
              </h2>
            </div>
          </div>

          {/* Cuerpo del Escenario y Misión */}
          <div className="p-5 sm:p-6 bg-slate-50 dark:bg-[#0B101E]/95 border-t border-slate-200 dark:border-white/10 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-alert-amber animate-ping" />
              <span className="text-[11px] font-rajdhani font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                DIRECTIVA OPERATIVA DEL COMANDO CONJUNTO // ELECCIÓN DE RUTA TÁCTICA:
              </span>
            </div>
            <p className="text-base sm:text-lg text-slate-800 dark:text-slate-100 font-inter leading-relaxed">
              {currentDilemma.escenario}
            </p>
          </div>

        </div>

        {/* 4 Tarjetas de Decisión con Renderizado Condicional Adaptativo y Contraste Total */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adaptedOptions.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                className={`relative p-5 sm:p-6 rounded-2xl border text-left transition-all duration-300 group overflow-hidden flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? "bg-cyan-50 dark:bg-cyan-950/50 border-cyan-500 dark:border-neon-cyan ring-2 ring-cyan-500/20 dark:ring-neon-cyan/30 shadow-md scale-[1.01]"
                    : "bg-white dark:bg-[#141824] border-slate-200 dark:border-white/10 hover:border-cyan-400 dark:hover:border-neon-cyan/50 hover:bg-slate-50 dark:hover:bg-[#182032] shadow-sm hover:shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs sm:text-sm font-rajdhani font-bold px-2.5 py-1 rounded-md border uppercase tracking-wider transition-colors ${
                        isSelected
                          ? "border-cyan-500 text-cyan-700 dark:text-neon-cyan bg-cyan-100/70 dark:bg-neon-cyan/10"
                          : "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-black/30 group-hover:border-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-neon-cyan"
                      }`}>
                        Opción {opt.id} // {opt.rama}
                      </span>

                      {/* Badge Táctico de Adaptación por Perfil Físico */}
                      {opt.isAdapted && opt.adaptationBadge && (
                        <span className="text-[10px] sm:text-xs font-rajdhani font-extrabold px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/90 border border-cyan-400/60 dark:border-cyan-400/50 text-cyan-800 dark:text-cyan-300 uppercase tracking-wider shadow-sm flex items-center gap-1">
                          <span>⚡</span>
                          <span>{opt.adaptationBadge}</span>
                        </span>
                      )}
                    </div>

                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-cyan-600 dark:border-neon-cyan bg-cyan-600 dark:bg-neon-cyan text-white dark:text-night-deep shadow-sm"
                        : "border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-transparent group-hover:border-cyan-400"
                    }`}>
                      {isSelected && <ShieldCheck className="w-4 h-4" />}
                    </div>
                  </div>

                  <h3 className={`text-xl md:text-2xl font-rajdhani font-bold uppercase tracking-wide transition-colors ${
                    isSelected
                      ? "text-cyan-950 dark:text-white"
                      : "text-slate-900 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-neon-cyan"
                  }`}>
                    {opt.titulo}
                  </h3>

                  <p className={`text-sm sm:text-base font-inter mt-3 leading-relaxed transition-colors ${
                    isSelected
                      ? "text-slate-800 dark:text-slate-200"
                      : "text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-100"
                  }`}>
                    {opt.texto}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs sm:text-sm font-rajdhani font-bold uppercase tracking-wider">
                  <span className="text-slate-500 dark:text-slate-400">Afinidad Institucional:</span>
                  <span className="text-cyan-600 dark:text-neon-cyan font-black">{opt.escuelas.join(" · ")}</span>
                </div>
              </button>
            );
          })}
        </div>

      </AnimatePillarContainer>

      {/* Navegación Inferior */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-200 dark:border-white/10">
        <button
          type="button"
          onClick={() => {
            if (interestsIndex > 0) {
              prevInterestDilemma();
            } else {
              prevPillar();
            }
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 font-rajdhani font-bold text-xs tracking-wider uppercase transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{interestsIndex > 0 ? "Dilema Anterior" : "Volver a Pilar 3 (Cognitivo)"}</span>
        </button>

        <button
          type="button"
          disabled={!selectedOptionId}
          onClick={nextInterestDilemma}
          className={`flex items-center gap-2 px-7 py-3 rounded-xl font-rajdhani font-black text-sm tracking-wider uppercase transition-all duration-300 ${
            selectedOptionId
              ? "bg-neon-cyan text-night-deep shadow-cyan-glow hover:bg-cyan-300 hover:scale-[1.02] cursor-pointer"
              : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-300 dark:border-white/5"
          }`}
        >
          <span>{interestsIndex < total - 1 ? "Siguiente Dilema" : "VER DICTAMEN INTEGRAL 360°"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

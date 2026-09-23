import React from 'react';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import { Shield, Brain, Compass, BookOpen, Award } from 'lucide-react';

const PILLARS_METADATA = [
  { id: 1, name: "Filtro Legal y Físico", icon: Shield, code: "01. LEGAL" },
  { id: 2, name: "Psicometría IPIP-NEO", icon: Brain, code: "02. PSICO" },
  { id: 3, name: "Intereses Operacionales", icon: Compass, code: "03. INTERESES" },
  { id: 4, name: "Simulador Conocimientos", icon: BookOpen, code: "04. CONOCIMIENTOS" },
  { id: 5, name: "Dictamen Consolidado", icon: Award, code: "05. DICTAMEN" }
];

export default function MinimalStepper() {
  const { currentPillar, goToPillar } = useAssessmentStore();
  const activeMeta = PILLARS_METADATA.find(p => p.id === currentPillar) || PILLARS_METADATA[0];

  return (
    <div className="w-full bg-combat-sand/80 dark:bg-night-deep/90 border-b border-stone-300 dark:border-white/10 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        
        {/* Identificador Táctico Activo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-peru-red/10 dark:bg-peru-red/20 border border-peru-red/40 flex items-center justify-center text-peru-red dark:text-peru-red-light shadow-sm flex-shrink-0">
            <activeMeta.icon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-teko text-xs uppercase font-bold text-peru-red dark:text-peru-red-light tracking-widest leading-none">
                FASE {activeMeta.id} DE 5
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-peru-red animate-pulse" />
            </div>
            <h2 className="font-rajdhani text-sm sm:text-base font-bold text-charcoal dark:text-white tracking-wide uppercase truncate max-w-[190px] sm:max-w-none leading-none mt-0.5">
              {activeMeta.name}
            </h2>
          </div>
        </div>

        {/* Indicadores Tácticos de Pasos */}
        <div className="flex items-center gap-1 sm:gap-2">
          {PILLARS_METADATA.map((p) => {
            const isActive = p.id === currentPillar;
            const isCompleted = p.id < currentPillar;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => goToPillar(p.id)}
                className={`relative px-2.5 sm:px-3 py-1 rounded-lg font-rajdhani font-bold text-xs tracking-wider transition-all duration-200 flex items-center gap-1.5 select-none ${
                  isActive
                    ? "bg-peru-red dark:bg-peru-red text-white shadow-tactical-red scale-105"
                    : isCompleted
                    ? "bg-military-olive/20 dark:bg-emerald-950/60 text-military-olive dark:text-emerald-400 border border-military-olive/30 dark:border-emerald-500/40 hover:scale-102"
                    : "bg-white/60 dark:bg-white/5 text-stone-500 dark:text-slate-400 border border-stone-300 dark:border-white/10 hover:border-stone-400 dark:hover:border-white/20"
                }`}
              >
                <span>{p.id}</span>
                <span className="hidden md:inline font-teko text-xs tracking-widest">{p.code.split('.')[1]}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Barra de Progreso Patriótica Tricolor */}
      <div className="w-full h-1 bg-stone-200 dark:bg-slate-900 relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-peru-red via-yellow-400 to-peru-red transition-all duration-500 shadow-sm"
          style={{ width: `${(currentPillar / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}

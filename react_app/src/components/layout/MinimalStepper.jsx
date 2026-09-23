import React from 'react';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import { Shield, Brain, Compass, Award } from 'lucide-react';

const PILLARS_METADATA = [
  { id: 1, name: "Filtro Legal y Físico", icon: Shield, code: "01. LEGAL" },
  { id: 2, name: "Psicometría IPIP-NEO", icon: Brain, code: "02. PSICO" },
  { id: 3, name: "Intereses Operacionales", icon: Compass, code: "03. INTERESES" },
  { id: 4, name: "Resultado Vocacional", icon: Award, code: "04. RESULTADO" }
];

export default function MinimalStepper() {
  const { currentPillar, goToPillar } = useAssessmentStore();
  const activeMeta = PILLARS_METADATA.find(p => p.id === currentPillar) || PILLARS_METADATA[0];

  return (
    <div className="w-full bg-transparent">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        
        {/* Identificador Táctico Activo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-peru-red/10 border border-peru-red/40 flex items-center justify-center text-peru-red shadow-sm flex-shrink-0">
            <activeMeta.icon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-teko text-xs uppercase font-bold text-peru-red tracking-widest leading-none">
                FASE {activeMeta.id} DE 4 · ORIENTACIÓN VOCACIONAL
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-peru-red animate-pulse" />
            </div>
            <h2 className="font-rajdhani text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-wide uppercase truncate max-w-[190px] sm:max-w-none leading-none mt-0.5">
              {activeMeta.name}
            </h2>
          </div>
        </div>

        {/* Indicadores Tácticos de Pasos (1 a 4) */}
        <div className="flex items-center gap-1 sm:gap-2">
          {PILLARS_METADATA.map((p) => {
            const isActive = p.id === currentPillar;
            const isCompleted = p.id < currentPillar;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => goToPillar(p.id)}
                className={`relative px-2.5 sm:px-3 py-1 rounded-lg font-rajdhani font-bold text-xs tracking-wider transition-all duration-200 flex items-center gap-1.5 select-none cursor-pointer ${
                  isActive
                    ? "bg-peru-red text-white shadow-tactical-red scale-105"
                    : isCompleted
                    ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/40 hover:scale-102"
                    : "bg-white/80 dark:bg-[#141518]/80 text-slate-600 dark:text-gray-400 border border-slate-300 dark:border-gray-800 hover:border-slate-400 dark:hover:border-gray-700 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span>{p.id}</span>
                <span className="hidden md:inline font-teko text-xs tracking-widest">{p.code.split('.')[1]}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}

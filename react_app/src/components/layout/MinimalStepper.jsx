import React from 'react';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import Tooltip from '../common/Tooltip';
import { Shield, Brain, Cpu, Compass, Award } from 'lucide-react';

const PILLARS_METADATA = [
  { id: 1, name: "Filtro Legal y Físico", icon: Shield, code: "01. LEGAL" },
  { id: 2, name: "Psicometría y Control Clínico", icon: Brain, code: "02. PSICOLÓGICO" },
  { id: 3, name: "Cognitivo y Mecánica Táctica", icon: Cpu, code: "03. COGNITIVO" },
  { id: 4, name: "Intereses Operacionales", icon: Compass, code: "04. INTERESES" },
  { id: 5, name: "Dictamen Integral 360°", icon: Award, code: "05. DICTAMEN" }
];

const PHASE_SUBTITLES = {
  1: "FASE 1: DESCUBRIMIENTO VOCACIONAL Y PERFILADO TÁCTICO",
  2: "FASE 2: EVALUACIÓN PSICOMÉTRICA & CONTROL CLÍNICO",
  3: "FASE 3: FACULTADES COGNITIVAS SUPERIORES & TEST MECÁNICO",
  4: "FASE 4: DILEMAS TÁCTICOS E INTERESES OPERACIONALES",
  5: "FASE 5: DICTAMEN VOCACIONAL OFICIAL 360°",
};

export default function MinimalStepper() {
  const { currentPillar, goToPillar } = useAssessmentStore();
  const activeMeta = PILLARS_METADATA.find(p => p.id === currentPillar) || PILLARS_METADATA[0];

  return (
    <div className="w-full bg-transparent">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        
        {/* Identificador Táctico Activo */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-peru-red/10 border border-peru-red/40 flex items-center justify-center text-peru-red shadow-sm flex-shrink-0">
            <activeMeta.icon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-teko text-[11px] sm:text-xs uppercase font-bold text-peru-red tracking-widest leading-none truncate">
                {PHASE_SUBTITLES[activeMeta.id] || `FASE ${activeMeta.id}: EVALUACIÓN TÁCTICA`}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-peru-red animate-pulse flex-shrink-0" />
            </div>
            <h2 className="font-rajdhani text-xs sm:text-sm md:text-base font-bold text-slate-900 dark:text-white tracking-wide uppercase truncate max-w-[180px] sm:max-w-[260px] lg:max-w-none leading-none mt-0.5">
              {activeMeta.id === 2 ? (
                <>Psicometría & Control Clínico</>
              ) : activeMeta.id === 3 ? (
                <>Cognitivo Superior (Raven & Bennett)</>
              ) : (
                activeMeta.name
              )}
            </h2>
          </div>
        </div>

        {/* Indicadores Tácticos de Pasos (1 a 5) - Adaptables sin romper el ancho en tablet */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
          {PILLARS_METADATA.map((p) => {
            const isActive = p.id === currentPillar;
            const isCompleted = p.id < currentPillar;
            const labelText = p.code.split('.')[1].trim();

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => goToPillar(p.id)}
                className={`relative px-2 sm:px-2.5 lg:px-3 py-1 rounded-lg font-rajdhani font-bold text-xs tracking-wider transition-all duration-200 flex items-center gap-1 sm:gap-1.5 select-none cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-peru-red text-white shadow-tactical-red scale-105"
                    : isCompleted
                    ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/40 hover:scale-102"
                    : "bg-white/80 dark:bg-[#141518]/80 text-slate-600 dark:text-gray-400 border border-slate-300 dark:border-gray-800 hover:border-slate-400 dark:hover:border-gray-700 hover:text-slate-900 dark:hover:text-white"
                }`}
                title={`Paso ${p.id}: ${p.name}`}
              >
                <span>{p.id}</span>
                {/* En móvil y tablet solo se muestra el texto en el botón activo, en desktop en todos */}
                <span className={`${isActive ? 'inline' : 'hidden lg:inline'} font-teko text-xs tracking-widest`}>
                  {labelText}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}

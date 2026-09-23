import React from 'react';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import { Shield, Brain, Compass, BookOpen, Award } from 'lucide-react';

const PILLARS_METADATA = [
  { id: 1, name: "Filtro Legal y Físico", icon: Shield, code: "01. LEGAL" },
  { id: 2, name: "Psicometría IPIP-NEO", icon: Brain, code: "02. PSICO" },
  { id: 3, name: "Intereses Operacionales", icon: Compass, code: "03. INTERESES" },
  { id: 4, name: "Simulador Conocimientos", icon: BookOpen, code: "04. CONOCIMIENTOS" },
  { id: 5, name: "Dictamen Consolidado", icon: Award, code: "05. DASHBOARD" }
];

export default function MinimalStepper() {
  const { currentPillar, goToPillar } = useAssessmentStore();
  const activeMeta = PILLARS_METADATA.find(p => p.id === currentPillar) || PILLARS_METADATA[0];

  return (
    <div className="w-full bg-night-deep/90 border-b border-white/10 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Identificador Táctico Activo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-950/40 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan shadow-cyan-glow">
            <activeMeta.icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-rajdhani font-bold text-neon-cyan tracking-widest uppercase">
                FASE {activeMeta.id} DE 5
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></span>
            </div>
            <h2 className="text-base sm:text-lg font-rajdhani font-bold text-white tracking-wider uppercase truncate max-w-[200px] sm:max-w-none">
              {activeMeta.name}
            </h2>
          </div>
        </div>

        {/* Indicadores Tácticos de Pasos (Minimalistas) */}
        <div className="flex items-center gap-1 sm:gap-2">
          {PILLARS_METADATA.map((p) => {
            const isActive = p.id === currentPillar;
            const isCompleted = p.id < currentPillar;
            return (
              <button
                key={p.id}
                onClick={() => goToPillar(p.id)}
                className={`relative px-2.5 sm:px-3.5 py-1.5 rounded-md font-rajdhani font-bold text-xs tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-neon-cyan text-night-deep shadow-cyan-glow scale-105"
                    : isCompleted
                    ? "bg-emerald-950/50 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500"
                    : "bg-white/5 text-slate-400 border border-white/5 hover:border-white/20"
                }`}
              >
                <span>{p.id}</span>
                <span className="hidden md:inline">{p.code.split('.')[1]}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Línea de Progreso Táctico con Resplandor */}
      <div className="w-full h-0.5 bg-slate-800 relative">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-neon-cyan shadow-cyan-glow transition-all duration-500"
          style={{ width: `${(currentPillar / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}

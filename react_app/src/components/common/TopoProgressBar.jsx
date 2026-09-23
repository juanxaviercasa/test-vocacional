import React from 'react';

export default function TopoProgressBar({ current, total, label = '' }) {
  const percentage = Math.min(100, Math.max(0, Math.round((current / total) * 100)));

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center text-xs font-rajdhani uppercase tracking-widest text-slate-400 mb-1.5">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping"></span>
          {label || `Progreso Táctico: Reactivo ${current} de ${total}`}
        </span>
        <span className="font-bold text-neon-cyan">{percentage}%</span>
      </div>
      
      {/* Barra ultra-fina con resplandor cian */}
      <div className="w-full h-1 bg-slate-800/80 rounded-full overflow-hidden relative shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-neon-cyan rounded-full transition-all duration-300 ease-out shadow-cyan-glow"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function MilitaryTimer({ seconds, onTick }) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (onTick) onTick();
    }, 1000);
    return () => clearInterval(interval);
  }, [onTick]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}s`;

  // Color dinámico según tiempo restante
  let statusColor = "border-neon-cyan/40 text-neon-cyan shadow-cyan-glow";
  let bgGradient = "bg-night-deep/80";

  if (seconds <= 15) {
    statusColor = "border-alert-red text-alert-red shadow-red-glow animate-pulse";
    bgGradient = "bg-alert-red/10";
  } else if (seconds <= 30) {
    statusColor = "border-alert-amber text-alert-amber";
    bgGradient = "bg-alert-amber/10";
  }

  return (
    <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border backdrop-blur-md transition-all duration-300 font-rajdhani font-bold ${statusColor} ${bgGradient}`}>
      <Clock className="w-4 h-4" />
      <span className="text-xs tracking-wider uppercase text-slate-400">Tiempo:</span>
      <span className="text-base tracking-widest">{formatted}</span>
    </div>
  );
}

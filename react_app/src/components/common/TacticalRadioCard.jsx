import React from 'react';

export default function TacticalRadioCard({
  selected,
  onClick,
  title,
  subtitle,
  icon,
  badge,
  className = ""
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full text-left p-4 sm:p-4.5 rounded-2xl border-2 transition-all duration-200 flex items-start gap-3.5 overflow-hidden group cursor-pointer ${
        selected
          ? "bg-cyan-950/80 border-cyan-400 dark:border-neon-cyan shadow-[0_0_20px_rgba(0,240,255,0.35)] ring-2 ring-cyan-400/40"
          : "bg-slate-900/90 dark:bg-[#101626] border-slate-700 hover:border-cyan-400/70 hover:bg-slate-800/90 shadow-sm"
      } ${className}`}
    >
      {/* Indicador de radio en esquina */}
      <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
        selected ? "border-cyan-400 dark:border-neon-cyan bg-cyan-950" : "border-slate-500 bg-black/40 group-hover:border-cyan-400"
      }`}>
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 dark:bg-neon-cyan shadow-cyan-glow" />}
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            {icon && (
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-lg font-black shrink-0 shadow-sm transition-transform group-hover:scale-110 ${
                icon === '♂'
                  ? 'bg-blue-600/30 border-2 border-blue-400 text-blue-300'
                  : icon === '♀'
                  ? 'bg-pink-600/30 border-2 border-pink-400 text-pink-300'
                  : 'bg-cyan-900/40 border border-cyan-500/50 text-cyan-300'
              }`}>
                {icon}
              </span>
            )}
            <h4 className={`font-rajdhani font-black text-base sm:text-lg tracking-wide uppercase transition-colors leading-tight ${
              selected ? "text-cyan-300 dark:text-neon-cyan" : "text-white group-hover:text-cyan-200"
            }`}>
              {title}
            </h4>
          </div>
          {badge && (
            <span className={`text-[10px] font-rajdhani font-black px-2 py-0.5 rounded border uppercase tracking-wider shrink-0 ${
              selected ? "border-cyan-400/60 text-cyan-300 bg-cyan-950/80" : "border-slate-600 text-slate-300 bg-black/40"
            }`}>
              {badge}
            </span>
          )}
        </div>

        {subtitle && (
          <p className={`text-xs mt-1.5 font-inter leading-relaxed transition-colors ${
            selected ? "text-cyan-100" : "text-slate-300 group-hover:text-white"
          }`}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Línea sutil de acento al fondo */}
      {selected && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-cyan-glow" />
      )}
    </button>
  );
}

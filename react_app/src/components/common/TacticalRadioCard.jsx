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
      className={`relative w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 overflow-hidden group ${
        selected
          ? "bg-cyan-950/30 border-neon-cyan shadow-cyan-glow"
          : "bg-graphite-surface border-white/10 hover:border-white/30 hover:bg-white/[0.04]"
      } ${className}`}
    >
      {/* Indicador de radio en esquina */}
      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
        selected ? "border-neon-cyan bg-neon-cyan/20" : "border-slate-500 bg-transparent"
      }`}>
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-neon-cyan shadow-cyan-glow" />}
      </div>

      {/* Contenido */}
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {icon && <span className="text-xl">{icon}</span>}
            <h4 className={`font-rajdhani font-bold text-base tracking-wide uppercase transition-colors ${
              selected ? "text-neon-cyan" : "text-slate-200 group-hover:text-white"
            }`}>
              {title}
            </h4>
          </div>
          {badge && (
            <span className={`text-[10px] font-rajdhani font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
              selected ? "border-neon-cyan/50 text-neon-cyan bg-neon-cyan/10" : "border-slate-600 text-slate-400"
            }`}>
              {badge}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="text-xs text-slate-400 mt-1 font-inter leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Línea sutil de acento al fondo */}
      {selected && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
      )}
    </button>
  );
}

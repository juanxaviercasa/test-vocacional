import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ThemeToggle táctico con retícula militar y transición de Sol / Luna
 * Conecta directamente con next-themes y gestiona los modos 'dark' (Night Ops) y 'light' (Day Ops).
 */
export default function ThemeToggle({ className = "" }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evitar desajustes de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-28 h-9 rounded-xl border border-white/10 bg-graphite/40 animate-pulse ${className}`} />
    );
  }

  const isDark = resolvedTheme === 'dark' || theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a Modo Día (Day Ops)" : "Cambiar a Modo Noche (Night Ops)"}
      title={isDark ? "Modo Activo: NIGHT OPS · Clic para DAY OPS" : "Modo Activo: DAY OPS · Clic para NIGHT OPS"}
      className={`relative group flex items-center justify-between px-2.5 py-1.5 rounded-xl border transition-all duration-300 cursor-pointer select-none ${
        isDark
          ? "bg-night-deep/90 border-white/20 hover:border-peru-red/60 text-slate-200 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          : "bg-white border-stone-400 hover:border-military-olive text-charcoal shadow-tactical-brutal-sm"
      } ${className}`}
    >
      {/* Retícula Táctica de Fondo (Crosshairs en las 4 esquinas) */}
      <span className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l border-peru-red/50 pointer-events-none" />
      <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-t border-r border-peru-red/50 pointer-events-none" />
      <span className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-b border-l border-peru-red/50 pointer-events-none" />
      <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b border-r border-peru-red/50 pointer-events-none" />

      {/* Contenedor del Ícono SVG animado */}
      <div className="relative w-6 h-6 flex items-center justify-center flex-shrink-0 mr-2">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              {/* Luna Táctica con retícula */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 text-peru-red group-hover:text-peru-red-light transition-colors"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                {/* Mirilla central */}
                <circle cx="12" cy="12" r="1" fill="#D91023" stroke="none" />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              {/* Sol Táctico con retícula de 8 puntos */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 text-military-olive group-hover:text-amber-600 transition-colors"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
                {/* Retícula militar interna */}
                <circle cx="12" cy="12" r="1.5" fill="#4B5320" stroke="none" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Etiqueta Táctica de Estado Operacional */}
      <div className="flex flex-col text-left font-rajdhani leading-tight">
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-400">
          OPERACIÓN
        </span>
        <span
          className={`text-xs uppercase font-extrabold tracking-wider ${
            isDark ? "text-peru-red group-hover:text-peru-red-light" : "text-military-olive"
          }`}
        >
          {isDark ? "NIGHT OPS" : "DAY OPS"}
        </span>
      </div>
    </button>
  );
}

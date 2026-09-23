import React from 'react';
import MinimalStepper from './MinimalStepper';

export default function TacticalHUDLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-night-deep text-slate-100 scanline overflow-x-hidden">
      
      {/* Cinta tricolor peruana */}
      <div className="peru-ribbon" />

      {/* Cabecera Táctica Superior */}
      <header className="bg-night-deep/95 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(245,158,11,0.4)] border border-white/20 flex-shrink-0">
              🇵🇪
            </div>
            <div>
              <h1 className="font-rajdhani font-bold text-base sm:text-lg text-white uppercase tracking-wider leading-none">
                SISTEMA INTEGRAL DE EVALUACIÓN MILITAR
              </h1>
              <p className="text-[11px] text-yellow-400/90 font-inter tracking-wide mt-1">
                Fuerzas Armadas y Policía Nacional del Perú
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-neon-cyan/40 text-neon-cyan font-rajdhani text-xs tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
            <span>TERMINAL TÁCTICA // V.2026.4</span>
          </div>

        </div>
      </header>

      {/* Stepper Minimalista Lineal */}
      <MinimalStepper />

      {/* Contenedor Principal Fluido */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-6 py-6 flex flex-col justify-center">
        {children}
      </main>

      {/* Pie de Página Institucional */}
      <footer className="border-t border-white/10 bg-graphite/80 py-4 text-center text-xs text-slate-500 font-inter px-4 no-print">
        <p>
          Sistema Integral de Admisión y Evaluación Militar del Perú · Desarrollado con base en IPIP-NEO y Prospectos Oficiales de Admisión 2026/2027.
        </p>
        <p className="text-[10px] text-slate-600 mt-1">
          EMCH · ETE · ENP · CITEN · EOFAP · ESOFA · EO-PNP · EESTP-PNP
        </p>
      </footer>

    </div>
  );
}

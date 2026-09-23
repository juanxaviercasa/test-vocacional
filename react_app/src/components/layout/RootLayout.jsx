import React from 'react';
import InsigniaConjunta from '../common/InsigniaConjunta';
import ThemeToggle from '../common/ThemeToggle';
import MinimalStepper from './MinimalStepper';

/**
 * RootLayout Global:
 * Componente envolvente que persiste el Header Institucional (Logo Insignia Conjunta + ThemeToggle + Stepper)
 * y el Footer Técnico con atribución oficial a través de todos los pilares sin recargas.
 */
export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B101E] text-white scanline overflow-x-hidden">
      
      {/* 1. Cinta Patriótica Nacional (Rojo - Blanco - Rojo) */}
      <div className="peru-ribbon" />

      {/* 2. Header Institucional Conjunto */}
      <header className="bg-[#0B101E]/90 border-b border-gray-800 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Logo Oficial + Títulos Institucionales */}
          <div className="flex items-center gap-3 sm:gap-4">
            <InsigniaConjunta className="w-11 h-11 sm:w-12 sm:h-12" glow={true} />

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="hidden xs:inline-block px-1.5 py-0.2 rounded bg-peru-red text-white text-[9px] font-military font-bold uppercase tracking-wider">
                  FFAA & PNP
                </span>
                <h1 className="font-military text-base sm:text-xl text-white uppercase tracking-wider leading-none">
                  COMANDO DE ADMISIÓN
                </h1>
              </div>

              <p className="font-teko text-xs sm:text-sm text-yellow-400 font-semibold tracking-wider uppercase leading-none mt-1">
                FUERZAS ARMADAS Y POLICÍA NACIONAL DEL PERÚ
              </p>
            </div>
          </div>

          {/* Acciones del Header: Estado Táctico + Conmutador de Tema */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Terminal Status (Desktop) */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-800 bg-[#141518]/90 text-xs font-rajdhani font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-peru-red animate-ping" />
              <span className="text-gray-300">ESTADO: ACTIVO</span>
              <span className="text-gray-700">|</span>
              <span className="text-[#00F0FF]">BAREMO 2026/2027</span>
            </div>

            {/* Toggle de Modo Claro / Oscuro (Day Ops / Night Ops) */}
            <ThemeToggle />

          </div>

        </div>
      </header>

      {/* 3. Stepper de Progresión Táctica (Persistente) */}
      <div className="w-full bg-[#0B101E]/80 border-b border-gray-800 backdrop-blur-sm">
        <MinimalStepper />
      </div>

      {/* 4. Lienzo Principal de los Pilares */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-6 py-6 flex flex-col justify-center">
        {children}
      </main>

      {/* 5. Pie de Página Técnico con Atribución Obligatoria */}
      <footer className="border-t border-gray-800 bg-[#0B101E]/90 backdrop-blur-md py-5 text-center px-4 no-print">
        <div className="max-w-4xl mx-auto space-y-2">
          
          {/* Identificación de Escuelas Matrices */}
          <p className="font-rajdhani text-[11px] sm:text-xs text-gray-400 font-bold uppercase tracking-widest">
            SISTEMA INTEGRAL DE EVALUACIÓN MILITAR · 8 ESCUELAS MATRICES
          </p>

          <p className="text-[10px] text-gray-500 font-inter tracking-wide">
            EMCH · ETE · ENP · CITEN · EOFAP · ESOFA · EO-PNP · EESTP-PNP
          </p>

          {/* Atribución Central */}
          <div className="pt-2 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs text-gray-300 font-inter">
            <span>Desarrollado por</span>
            <a
              href="#"
              title="Portafolio de Xavier Cabello"
              className="font-bold underline decoration-dotted underline-offset-4 transition-all duration-200 text-white hover:text-peru-red hover:decoration-solid"
            >
              Xavier Cabello
            </a>
            <span className="hidden sm:inline text-gray-600">•</span>
            <span className="text-[11px] text-gray-500 font-mono">
              PROTOCOLO TÁCTICO MIL-STD-2026
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}

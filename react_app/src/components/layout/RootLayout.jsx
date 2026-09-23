import React, { useState } from 'react';
import InsigniaConjunta from '../common/InsigniaConjunta';
import ThemeToggle from '../common/ThemeToggle';
import MinimalStepper from './MinimalStepper';
import CentroDeTransparencia from '../common/CentroDeTransparencia';
import Tooltip from '../common/Tooltip';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import { GraduationCap, ArrowLeft, BookOpen, BarChart3, CheckCircle, FileText, ShieldCheck } from 'lucide-react';

/**
 * RootLayout Global:
 * Envolvente institucional persistente con soporte dinámico para Módulo 1 (Vocacional) y Módulo 2 (Académico).
 */
export default function RootLayout({ children }) {
  const { activeModule, switchToModule, academicStep, academicSchool } = useAssessmentStore();
  const [isTransparencyOpen, setIsTransparencyOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B101E] text-slate-900 dark:text-slate-100 text-base md:text-lg overflow-x-hidden transition-colors duration-300">
      
      {/* 1. Cinta Patriótica Nacional (Rojo - Blanco - Rojo) */}
      <div className="peru-ribbon" />

      {/* 2. Header Institucional Conjunto */}
      <header className="bg-white/90 dark:bg-[#0B101E]/90 border-b border-slate-200 dark:border-gray-800 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Logo Oficial + Títulos Institucionales */}
          <div className="flex items-center gap-3 sm:gap-4">
            <InsigniaConjunta className="w-11 h-11 sm:w-12 sm:h-12" glow={true} />

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="hidden xs:inline-block px-1.5 py-0.2 rounded bg-peru-red text-white text-[9px] font-sans font-black uppercase tracking-wider">
                  FFAA & PNP
                </span>
                <h1 className="font-sans font-black text-base sm:text-xl text-slate-900 dark:text-white uppercase tracking-tight leading-none">
                  COMANDO DE ADMISIÓN
                </h1>
              </div>

              <p className="font-teko text-xs sm:text-sm text-military-olive dark:text-yellow-400 font-semibold tracking-wider uppercase leading-none mt-1">
                FUERZAS ARMADAS Y POLICÍA NACIONAL DEL PERÚ
              </p>
            </div>
          </div>

          {/* Acciones del Header: Transparencia + Estado Táctico + Conmutador de Tema */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Botón Acceso Rápido al Centro de Transparencia */}
            <button
              type="button"
              onClick={() => setIsTransparencyOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#141518] text-xs font-rajdhani font-bold tracking-wider uppercase text-slate-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-neon-cyan hover:border-cyan-500/50 transition-all cursor-pointer shadow-sm"
              title="Abrir Centro de Transparencia y Prospectos Oficiales"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-500" />
              <span className="hidden md:inline">Fuentes y</span>
              <span>Prospectos</span>
            </button>

            {/* Terminal Status (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-gray-800 bg-white/80 dark:bg-[#141518]/90 text-xs font-rajdhani font-bold tracking-widest uppercase transition-colors">
              <span className="w-2 h-2 rounded-full bg-peru-red animate-ping" />
              <span className="text-slate-700 dark:text-gray-300">ESTADO: ACTIVO</span>
              <span className="text-slate-300 dark:text-gray-700">|</span>
              <span className="text-military-olive dark:text-[#00F0FF]">
                <Tooltip termino="Baremo">BAREMO 2026/2027</Tooltip>
              </span>
            </div>

            {/* Toggle de Modo Claro / Oscuro (Day Ops / Night Ops) */}
            <ThemeToggle />

          </div>

        </div>
      </header>

      {/* 3. Barra de Progresión Táctica (Dinámica según Módulo) */}
      <div className="w-full bg-slate-100/90 dark:bg-[#0B101E]/80 border-b border-slate-200 dark:border-gray-800 backdrop-blur-sm transition-colors duration-300">
        {activeModule === 'vocational' ? (
          <MinimalStepper />
        ) : (
          /* HUD Stepper para Módulo 2: Diagnóstico Académico */
          <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-600 dark:text-[#00F0FF] shadow-sm flex-shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-teko text-xs uppercase font-bold text-cyan-600 dark:text-[#00F0FF] tracking-widest leading-none">
                    MÓDULO 2 · DIAGNÓSTICO ACADÉMICO
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                </div>
                <h2 className="font-rajdhani text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-wide uppercase truncate max-w-[200px] sm:max-w-none leading-none mt-0.5">
                  {academicStep === 'catalog' && "Catálogo de 8 Escuelas Matrices"}
                  {academicStep === 'exam' && `Simulacro Oficial en Curso · ${academicSchool}`}
                  {academicStep === 'strategy' && `Dashboard Estratégico · Reporte de Brechas (${academicSchool})`}
                </h2>
              </div>
            </div>

            {/* Botón Puente de Retorno al Test Vocacional */}
            <button
              type="button"
              onClick={() => switchToModule('vocational')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#141518] text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 font-rajdhani font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Volver a</span>
              <span>Test Vocacional</span>
            </button>
          </div>
        )}
      </div>

      {/* 4. Lienzo Principal */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-6 py-6 flex flex-col justify-center">
        {children}
      </main>

      {/* 5. Pie de Página Técnico con Atribución Obligatoria y Centro de Transparencia */}
      <footer className="border-t border-slate-200 dark:border-gray-800 bg-white/90 dark:bg-[#0B101E]/90 backdrop-blur-md py-6 text-center px-4 no-print transition-colors duration-300">
        <div className="max-w-4xl mx-auto space-y-3">
          
          {/* Botón Central Destacado: Fuentes y Validez Oficial */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setIsTransparencyOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/50 text-cyan-300 dark:text-neon-cyan font-rajdhani font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.15)] hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:scale-[1.02]"
            >
              <ShieldCheck className="w-4 h-4 text-neon-cyan" />
              <span>100% Basado en Prospectos Oficiales de Admisión · Ver Fuentes y Baremos</span>
            </button>
          </div>

          {/* Identificación de Escuelas Matrices */}
          <p className="font-rajdhani text-xs text-slate-600 dark:text-slate-300 font-bold uppercase tracking-widest pt-1">
            SISTEMA INTEGRAL DE EVALUACIÓN MILITAR · 8 ESCUELAS MATRICES
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-inter tracking-wide">
            EMCH · ETE · ENP · CITEN · EOFAP · ESOFA · EO-PNP · EESTP-PNP
          </p>

          {/* Atribución Central */}
          <div className="pt-2 border-t border-slate-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-inter">
            <span>Desarrollado por</span>
            <a
              href="https://xavier.cabellosalirrosas.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Portafolio de Xavier Cabello"
              className="font-bold underline decoration-dotted underline-offset-4 transition-all duration-200 text-slate-900 dark:text-white hover:text-peru-red hover:decoration-solid"
            >
              Xavier Cabello
            </a>
            <span className="hidden sm:inline text-slate-300 dark:text-gray-600">•</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              PROTOCOLO TÁCTICO <Tooltip termino="Protocolo MIL-STD">MIL-STD-2026</Tooltip>
            </span>
          </div>

        </div>
      </footer>

      {/* Centro de Transparencia y Bibliografía Oficial (Modal Flotante) */}
      <CentroDeTransparencia
        isOpen={isTransparencyOpen}
        onClose={() => setIsTransparencyOpen(false)}
      />

    </div>
  );
}

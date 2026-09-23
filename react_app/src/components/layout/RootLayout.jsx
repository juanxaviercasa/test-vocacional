import React, { useState } from 'react';
import InsigniaConjunta from '../common/InsigniaConjunta';
import ThemeToggle from '../common/ThemeToggle';
import TacticalOnboardingTour from '../common/TacticalOnboardingTour';
import MinimalStepper from './MinimalStepper';
import Tooltip from '../common/Tooltip';
import { Link, useAppRouter } from '../../router/AppRouter';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import {
  GraduationCap,
  ArrowLeft,
  BookOpen,
  ShieldCheck,
  Compass,
  Menu,
  X,
  Target,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

/**
 * RootLayout Global:
 * Envolvente institucional con diseño responsive perfecto para móvil, tablet y desktop.
 * Erradica desbordamientos, rupturas de texto y sobrecargas en la barra superior.
 */
export default function RootLayout({ children }) {
  const { activeModule, switchToModule, academicStep, academicSchool, startTour } = useAssessmentStore();
  const { currentPath } = useAppRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NAV_ITEMS = [
    { href: '/', label: 'Evaluación', sub: 'Test y Diagnóstico', icon: Target },
    { href: '/transparencia', label: 'Organigrama & PDFs', sub: 'Fuentes Oficiales', icon: Layers },
    { href: '/entrenamiento', label: 'Hub Entrenamiento', sub: 'Preparación 360°', icon: Compass },
    { href: '/glosario', label: 'Glosario', sub: 'Términos Militares', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B101E] text-slate-900 dark:text-slate-100 text-base md:text-lg overflow-x-hidden transition-colors duration-300">
      
      {/* 1. Cinta Patriótica Nacional (Rojo - Blanco - Rojo) */}
      <div className="peru-ribbon" />

      {/* 2. Header Institucional Conjunto con Navegación Global Responsiva */}
      <header className="bg-white/95 dark:bg-[#0B101E]/95 border-b border-slate-200 dark:border-gray-800 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo Oficial + Títulos Institucionales */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
            <InsigniaConjunta className="w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0" glow={true} />

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="px-1.5 py-0.2 rounded bg-peru-red text-white text-[9px] font-sans font-black uppercase tracking-wider flex-shrink-0">
                  FFAA & PNP
                </span>
                <h1 className="font-sans font-black text-sm sm:text-lg md:text-xl text-slate-900 dark:text-white uppercase tracking-tight leading-none group-hover:text-cyan-600 dark:group-hover:text-neon-cyan transition-colors whitespace-nowrap">
                  COMANDO DE ADMISIÓN
                </h1>
              </div>

              <p className="hidden sm:block font-teko text-[11px] sm:text-xs text-military-olive dark:text-yellow-400 font-semibold tracking-wider uppercase leading-none mt-0.5">
                FUERZAS ARMADAS Y POLICÍA NACIONAL DEL PERÚ
              </p>
            </div>
          </Link>

          {/* Navegación Principal en Desktop (> 1024px) (Enfocable en Tour) */}
          <nav
            id="tour-navigation"
            className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-black/40 p-1 rounded-2xl border border-slate-200 dark:border-gray-800"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-rajdhani font-bold text-xs uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-white dark:bg-[#151b2c] text-cyan-600 dark:text-neon-cyan border border-slate-200 dark:border-cyan-500/50 shadow-sm'
                      : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Acciones del Header: Estado Táctico + Conmutador de Tema + Guía + Menú Móvil/Tablet */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            
            {/* Terminal Status (Visible en pantallas extra grandes) */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-gray-800 bg-white/80 dark:bg-[#141518]/90 text-xs font-rajdhani font-bold tracking-widest uppercase transition-colors">
              <span className="w-2 h-2 rounded-full bg-peru-red animate-ping" />
              <span className="text-slate-700 dark:text-gray-300">ESTADO: ACTIVO</span>
              <span className="text-slate-300 dark:text-gray-700">|</span>
              <span className="text-military-olive dark:text-[#00F0FF]">
                <Tooltip termino="Baremo">BAREMO 2026</Tooltip>
              </span>
            </div>

            {/* Botón Iniciar Modo Entrenamiento (Guía Interactiva) */}
            <button
              type="button"
              onClick={startTour}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-cyan-500/40 bg-cyan-950/20 text-cyan-600 dark:text-[#00F0FF] hover:bg-cyan-500/20 hover:border-[#00F0FF] text-xs font-rajdhani font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm hover:shadow-cyan-glow"
              title="Iniciar Modo Entrenamiento (Guía de Usuario Interactiva)"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-500 dark:text-[#00F0FF]" />
              <span className="hidden sm:inline">INICIAR MODO ENTRENAMIENTO (GUÍA)</span>
              <span className="sm:hidden">GUÍA</span>
            </button>

            {/* Toggle de Modo Claro / Oscuro (Day Ops / Night Ops) */}
            <ThemeToggle />

            {/* Botón Hamburguesa Móvil/Tablet (< 1024px) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#141518] text-slate-700 dark:text-gray-300 hover:text-cyan-500 hover:border-cyan-500/50 transition-colors cursor-pointer shadow-sm"
              aria-label="Alternar menú de navegación"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-peru-red" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Menú Desplegable Táctico en Móvil y Tablet (< 1024px) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-gray-800 bg-white dark:bg-[#0B101E] px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="text-[10px] font-rajdhani font-black text-slate-500 dark:text-gray-400 uppercase tracking-widest px-2 mb-1">
              NAVEGACIÓN PRINCIPAL DEL SISTEMA
            </div>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-2xl font-rajdhani font-bold text-sm uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-600 dark:text-neon-cyan border border-cyan-500/40 shadow-sm'
                      : 'text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-cyan-500/20 text-cyan-500' : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-sans font-black text-sm">{item.label}</div>
                      <div className="text-[11px] font-inter text-slate-500 dark:text-slate-400 font-normal lowercase first-letter:uppercase">
                        {item.sub}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-neon-cyan' : 'text-slate-400'}`} />
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* 3. Barra de Progresión Táctica (Visible en Ruta Principal '/') (Enfocable en Tour) */}
      {currentPath === '/' ? (
        <div
          id="tour-stepper"
          className="w-full bg-slate-100/90 dark:bg-[#0B101E]/80 border-b border-slate-200 dark:border-gray-800 backdrop-blur-sm transition-colors duration-300"
        >
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
                  <h2 className="font-rajdhani text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-wide uppercase truncate max-w-[190px] sm:max-w-none leading-none mt-0.5">
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
      ) : (
        /* Barra de Navegación Secundaria / Breadcrumb Táctico */
        <div className="w-full bg-slate-100/90 dark:bg-[#0B101E]/80 border-b border-slate-200 dark:border-gray-800 backdrop-blur-sm transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between text-xs font-rajdhani font-bold uppercase tracking-wider">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Link href="/" className="hover:text-cyan-500 transition-colors">Comando de Admisión</Link>
              <span className="text-slate-400">/</span>
              <span className="text-cyan-600 dark:text-neon-cyan truncate max-w-[200px] sm:max-w-none">
                {currentPath === '/transparencia' && 'Organigrama & Centro de Transparencia'}
                {currentPath === '/entrenamiento' && 'Hub Estratégico de Entrenamiento'}
                {currentPath === '/glosario' && 'Glosario Técnico de Términos Militares'}
              </span>
            </div>

            <Link
              href="/"
              className="text-xs font-rajdhani font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Ir al Test</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* 4. Lienzo Principal */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-6 py-6 flex flex-col justify-center">
        {children}
      </main>

      {/* 5. Pie de Página Técnico con Atribución Obligatoria y Enlaces Directos */}
      <footer className="border-t border-slate-200 dark:border-gray-800 bg-white/90 dark:bg-[#0B101E]/90 backdrop-blur-md py-8 text-center px-4 no-print transition-colors duration-300">
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Botón Central Destacado: Enlace Directo a la Página de Transparencia */}
          <div className="flex justify-center">
            <Link
              href="/transparencia"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/50 text-cyan-300 dark:text-neon-cyan font-rajdhani font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(0,240,255,0.15)] hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:scale-[1.02]"
            >
              <ShieldCheck className="w-4 h-4 text-neon-cyan flex-shrink-0" />
              <span>100% Basado en Prospectos Oficiales de Admisión · Ver Organigrama y PDFs</span>
            </Link>
          </div>

          {/* Menú de Enlaces Rápidos del Pie de Página */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-rajdhani font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400">
            <Link href="/" className="hover:text-cyan-500 transition-colors">Test Vocacional</Link>
            <span className="hidden sm:inline text-slate-300 dark:text-gray-700">•</span>
            <Link href="/transparencia" className="hover:text-cyan-500 transition-colors">Centro de Transparencia & PDFs</Link>
            <span className="hidden sm:inline text-slate-300 dark:text-gray-700">•</span>
            <Link href="/entrenamiento" className="hover:text-cyan-500 transition-colors">Hub de Entrenamiento</Link>
            <span className="hidden sm:inline text-slate-300 dark:text-gray-700">•</span>
            <Link href="/glosario" className="hover:text-cyan-500 transition-colors">Glosario Técnico</Link>
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

      {/* Sistema de Onboarding Interactivo (Guía de Usuario con Overlay y Foco Secuencial) */}
      <TacticalOnboardingTour />

    </div>
  );
}

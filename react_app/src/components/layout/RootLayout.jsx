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
  ArrowRight,
  Home,
  BookOpen,
  ShieldCheck,
  Compass,
  Menu,
  X,
  Target,
  Layers,
  ChevronRight,
  ExternalLink,
  Download
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
    { href: '/transparencia', label: 'Descarga Prospectos', sub: '8 Escuelas Matrices', icon: Download },
    { href: '/entrenamiento', label: 'Entrenamiento', sub: 'Preparación Táctica', icon: Compass },
    { href: '/glosario', label: 'Glosario', sub: 'Términos Militares', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B101E] text-slate-900 dark:text-slate-100 text-base md:text-lg overflow-x-hidden transition-colors duration-300">
      
      {/* 1. Cinta Patriótica Nacional (Rojo - Blanco - Rojo) */}
      <div className="peru-ribbon" />

      {/* 2. Header Institucional Conjunto con Navegación Global Responsiva */}
      <header className="bg-white/95 dark:bg-[#0B101E]/95 border-b border-slate-200 dark:border-gray-800 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300 shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo Oficial + Títulos Institucionales Reestructurados y Legibles */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink min-w-0 select-none">
            <InsigniaConjunta className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 shrink-0" glow={true} />

            <div className="flex flex-col min-w-0">
              <span className="text-[10px] sm:text-xs font-rajdhani font-black tracking-wider text-peru-red dark:text-peru-red-light uppercase leading-none truncate max-w-[200px] sm:max-w-[320px] md:max-w-none">
                FUERZAS ARMADAS Y PNP
              </span>

              <span className="font-sans font-black text-sm sm:text-base lg:text-xl text-slate-900 dark:text-white uppercase tracking-tight leading-tight group-hover:text-cyan-600 dark:group-hover:text-neon-cyan transition-colors whitespace-nowrap mt-0.5">
                COMANDO DE ADMISIÓN
              </span>

              <span className="text-[10px] sm:text-xs font-rajdhani font-bold text-cyan-600 dark:text-[#00F0FF] uppercase tracking-wider leading-none whitespace-nowrap mt-0.5">
                TEST VOCACIONAL & SIMULADOR ACADÉMICO
              </span>
            </div>
          </Link>

          {/* Badge Distintivo de las 8 Escuelas Matrices (Espacio Propio, Destacado y Legible) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#141d30] border border-slate-300 dark:border-cyan-500/30 shadow-sm shrink-0">
            <ShieldCheck className="w-4 h-4 text-military-olive dark:text-yellow-400 shrink-0" />
            <div className="flex flex-col text-left">
              <span className="font-rajdhani font-black text-xs uppercase tracking-wider text-slate-900 dark:text-yellow-400 leading-none">
                8 ESCUELAS MATRICES
              </span>
              <span className="text-[10px] font-rajdhani font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mt-0.5">
                OFICIALES & SUBOFICIALES
              </span>
            </div>
          </div>

          {/* Navegación Principal en Pantallas Grandes (>= 1280px / xl) */}
          <nav
            id="tour-navigation"
            className="hidden xl:flex items-center gap-1 bg-slate-100 dark:bg-black/40 p-1 rounded-2xl border border-slate-200 dark:border-gray-800 shrink-0"
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

          {/* Acciones del Header: Guía Rápida + Menú Móvil/Tablet */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Botón Guía Táctica del Sistema (Conciso, Resumido y Elegante) */}
            <button
              type="button"
              onClick={startTour}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl border border-cyan-500/40 bg-cyan-950/20 text-cyan-600 dark:text-[#00F0FF] hover:bg-cyan-500/20 hover:border-[#00F0FF] text-xs font-rajdhani font-black tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm hover:shadow-cyan-glow shrink-0 whitespace-nowrap"
              title="Iniciar Guía Interactiva del Sistema"
            >
              <Compass className="w-4 h-4 text-cyan-500 dark:text-[#00F0FF] shrink-0" />
              <span>GUÍA</span>
            </button>

            {/* Botón Hamburguesa Móvil/Tablet (< 1280px) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#141518] text-slate-700 dark:text-gray-300 hover:text-cyan-500 hover:border-cyan-500/50 transition-colors cursor-pointer shadow-sm shrink-0"
              aria-label="Alternar menú de navegación"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-peru-red" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Menú Desplegable Táctico en Móvil y Tablet (< 1280px) */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 dark:border-gray-800 bg-white dark:bg-[#0B101E] px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
            
            {/* Distintivo 8 Escuelas Matrices en Móvil */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-[#141d30] border border-slate-200 dark:border-cyan-500/30 mb-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-military-olive dark:text-yellow-400" />
                <span className="font-rajdhani font-black text-xs uppercase tracking-wider text-slate-900 dark:text-yellow-400">
                  8 ESCUELAS MATRICES OFICIALES
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-peru-red/10 text-peru-red border border-peru-red/30 font-bold uppercase">
                BAREMOS 2026
              </span>
            </div>

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

            {/* Control de Tema Táctico en Menú Móvil/Tablet */}
            <div className="pt-3 border-t border-slate-200 dark:border-gray-800 flex items-center justify-between px-2">
              <span className="text-xs font-rajdhani font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider">
                MODO VISUAL TÁCTICO:
              </span>
              <ThemeToggle />
            </div>
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
        <div className="w-full bg-slate-100/90 dark:bg-[#0B101E]/90 border-b border-slate-200 dark:border-gray-800/80 backdrop-blur-md transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-2 text-xs font-rajdhani font-bold uppercase tracking-wider overflow-hidden">
            
            {/* Lado Izquierdo: Ruta Jerárquica con Truncado Elástico */}
            <div className="min-w-0 flex-1 flex items-center gap-1.5 sm:gap-2 text-slate-600 dark:text-slate-400 overflow-hidden">
              <Link
                href="/"
                className="shrink-0 inline-flex items-center gap-1 sm:gap-1.5 text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-neon-cyan transition-colors"
                title="Volver al Comando de Admisión y Evaluación"
              >
                <Home className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Comando de Admisión</span>
                <span className="sm:hidden font-mono text-[10px]">INICIO</span>
              </Link>

              <ChevronRight className="w-3 h-3 text-slate-400/60 dark:text-gray-600 shrink-0" />

              {/* Indicador de Sección Activa (Adaptativo por Dispositivo) */}
              <div className="min-w-0 flex-1 flex items-center overflow-hidden">
                <span className="text-cyan-600 dark:text-neon-cyan font-bold truncate text-[11px] sm:text-xs tracking-wider">
                  {currentPath === '/transparencia' && (
                    <>
                      <span className="hidden md:inline">Descarga de Prospectos Oficiales 2026</span>
                      <span className="hidden sm:inline md:hidden">Prospectos Oficiales 2026</span>
                      <span className="sm:hidden">Prospectos Oficiales</span>
                    </>
                  )}
                  {currentPath === '/entrenamiento' && (
                    <>
                      <span className="hidden md:inline">Centro de Entrenamiento Táctico</span>
                      <span className="hidden sm:inline md:hidden">Entrenamiento Táctico 2026</span>
                      <span className="sm:hidden">Entrenamiento Táctico</span>
                    </>
                  )}
                  {currentPath === '/glosario' && (
                    <>
                      <span className="hidden md:inline">Glosario Técnico de Términos Militares</span>
                      <span className="hidden sm:inline md:hidden">Glosario Técnico Militar</span>
                      <span className="sm:hidden">Glosario Militar</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Lado Derecho: Botón Táctico "Ir al Test" Estilizado y Ultra-Resiliente */}
            <Link
              href="/"
              className="shrink-0 inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-cyan-500/10 hover:from-cyan-500/25 hover:to-blue-500/25 border border-cyan-500/40 hover:border-cyan-400 text-cyan-600 dark:text-cyan-300 text-[11px] sm:text-xs font-rajdhani font-black tracking-wider uppercase transition-all duration-200 shadow-sm active:scale-95"
              title="Iniciar o Continuar la Evaluación Vocacional Militar"
            >
              <Target className="w-3 h-3 text-cyan-500 dark:text-neon-cyan shrink-0" />
              <span>Ir al Test</span>
              <ArrowRight className="w-3 h-3 text-cyan-500 dark:text-neon-cyan shrink-0" />
            </Link>

          </div>
        </div>
      )}

      {/* 4. Lienzo Principal */}
      <main className="flex-1 w-full max-w-7xl 2xl:max-w-[1400px] mx-auto px-3 sm:px-6 py-6 flex flex-col justify-center">
        {children}
      </main>

      {/* 5. Pie de Página Técnico con Atribución Obligatoria y Enlaces Directos */}
      <footer className="border-t border-slate-200 dark:border-gray-800 bg-white/90 dark:bg-[#0B101E]/90 backdrop-blur-md py-8 text-center px-4 no-print transition-colors duration-300">
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Botón Central Destacado: Enlace Directo a la Descarga de Prospectos */}
          <div className="flex justify-center">
            <Link
              href="/transparencia"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-950 text-cyan-300 hover:text-cyan-200 dark:bg-[#10192e] dark:hover:bg-[#15223e] dark:text-neon-cyan border-2 border-cyan-500/60 dark:border-neon-cyan/50 font-rajdhani font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-cyan-glow hover:scale-[1.02] cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 dark:text-neon-cyan flex-shrink-0" />
              <span>100% Basado en Prospectos Oficiales de Admisión · Descargar PDFs</span>
            </Link>
          </div>

          {/* Menú de Enlaces Rápidos del Pie de Página */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-rajdhani font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400">
            <Link href="/" className="hover:text-cyan-500 transition-colors">Test Vocacional</Link>
            <span className="hidden sm:inline text-slate-300 dark:text-gray-700">•</span>
            <Link href="/transparencia" className="hover:text-cyan-500 transition-colors">Descarga de Prospectos</Link>
            <span className="hidden sm:inline text-slate-300 dark:text-gray-700">•</span>
            <Link href="/entrenamiento" className="hover:text-cyan-500 transition-colors">Entrenamiento Militar</Link>
            <span className="hidden sm:inline text-slate-300 dark:text-gray-700">•</span>
            <Link href="/glosario" className="hover:text-cyan-500 transition-colors">Glosario Técnico</Link>
          </div>

          {/* Selector de Modo Táctico (Day Ops / Night Ops) Reubicado en la Parte Baja con Espacio Holgado */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-3 pb-1">
            <span className="text-xs font-rajdhani font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <span>MODO OPERATIVO:</span>
            </span>
            <ThemeToggle />
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

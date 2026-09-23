import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '../../../store/useAssessmentStore';
import { evaluateLegalCandidate } from '../../../data/legalRequirements';
import TacticalRadioCard from '../../common/TacticalRadioCard';
import Tooltip from '../../common/Tooltip';
import {
  ShieldCheck,
  Shield,
  Brain,
  Compass,
  BookOpen,
  User,
  Activity,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir) => ({
    x: dir > 0 ? -100 : 100,
    opacity: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Pillar1Legal() {
  const { candidate, updateCandidate, nextPillar, loadDemoCandidate } = useAssessmentStore();
  
  // Regla 2: Estado currentStep
  // 0: Hero Banner, 1: Biometría, 2: Aptitud Médica y Legal, 3: Dictamen de Elegibilidad
  const urlParamStep = typeof window !== 'undefined' ? parseInt(new URLSearchParams(window.location.search).get('step') || '0', 10) : 0;
  const [currentStep, setCurrentStep] = useState(urlParamStep);
  const [direction, setDirection] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [demoLoadedNotification, setDemoLoadedNotification] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(() => urlParamStep === 3 ? evaluateLegalCandidate(candidate) : null);

  // Validación en tiempo real Fase A (Parámetros Biométricos)
  const isStep1Valid = Boolean(
    candidate.nombre?.trim() &&
    (candidate.sexo === 'M' || candidate.sexo === 'F') &&
    Number(candidate.talla_cm) >= 120 &&
    Number(candidate.peso_kg) >= 30 &&
    Number(candidate.edad) >= 14 &&
    Number(candidate.talla_sentado_cm || 90) >= 60
  );

  // Validación en tiempo real Fase B (Aptitud Médica y Requisitos Legales)
  const isStep2Valid = Boolean(
    candidate.agudeza_visual_20_20 !== null &&
    candidate.daltonismo !== null &&
    candidate.estado_civil &&
    candidate.tiene_hijos !== null &&
    candidate.tiene_antecedentes !== null &&
    candidate.tiene_tatuajes !== null &&
    candidate.secundaria_completa !== null
  );

  // Validación integral del Pilar 1
  const isPilar1Complete = isStep1Valid && isStep2Valid;

  const goToStep = (step) => {
    setDirection(step >= currentStep ? 1 : -1);
    setCurrentStep(step);
  };

  // Manejador del botón Auto-Llenado Táctico (Demo Mode)
  const handleLoadDemo = () => {
    loadDemoCandidate();
    setDemoLoadedNotification(true);
    setTimeout(() => {
      setDemoLoadedNotification(false);
    }, 2500);
  };

  // Regla 3: Procesar elegibilidad al hacer clic en el botón
  const handleProcessEligibility = () => {
    setIsProcessing(true);
    const result = evaluateLegalCandidate(candidate);
    setEvaluationResult(result);

    setTimeout(() => {
      setIsProcessing(false);
      setDirection(1);
      setCurrentStep(3); // Desbloquea y muestra el grid
    }, 600);
  };

  // Cálculo en vivo de IMC para la vista biométrica (Solo si hay datos numéricos válidos)
  const hasValidBiometrics = Number(candidate.talla_cm) >= 100 && Number(candidate.peso_kg) >= 30;
  const h_m = hasValidBiometrics
    ? (candidate.talla_cm > 3 ? candidate.talla_cm / 100 : candidate.talla_cm)
    : 0;
  const imc = hasValidBiometrics && h_m > 0
    ? parseFloat((candidate.peso_kg / (h_m * h_m)).toFixed(1))
    : 0;

  let imcStatus = "Pendiente de datos";
  let imcColor = "text-slate-400 border-slate-700 bg-slate-900/40";
  if (hasValidBiometrics && imc > 0) {
    if (imc < 18.5) {
      imcStatus = "Bajo Peso";
      imcColor = "text-amber-400 border-amber-500/40 bg-amber-950/40";
    } else if (imc <= 25) {
      imcStatus = "Óptimo Militar";
      imcColor = "text-emerald-400 border-emerald-500/40 bg-emerald-950/40";
    } else if (imc <= 27.5) {
      imcStatus = "Límite Máximo";
      imcColor = "text-amber-400 border-amber-500/40 bg-amber-950/40";
    } else {
      imcStatus = "Sobrepeso";
      imcColor = "text-alert-red border-alert-red/40 bg-red-950/40";
    }
  }

  return (
    <div className="w-full max-w-7xl 2xl:max-w-[1400px] mx-auto px-2 sm:px-4 py-4">
      
      {/* Indicador de Sub-Paso Minimalista */}
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
          <span className="text-xs font-rajdhani font-bold text-slate-400 tracking-widest uppercase">
            PASO {currentStep + 1} DE 4 // {
              currentStep === 0 ? "INTRODUCCIÓN Y MISIÓN" :
              currentStep === 1 ? "PARÁMETROS BIOMÉTRICOS" :
              currentStep === 2 ? "APTITUD MÉDICA Y LEGAL" :
              "DICTAMEN DE ELEGIBILIDAD"
            }
          </span>
        </div>
        
        {/* Puntos de navegación sutiles */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3].map((stepIdx) => (
            <div
              key={stepIdx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                stepIdx === currentStep
                  ? "w-6 bg-neon-cyan shadow-cyan-glow"
                  : stepIdx < currentStep
                  ? "w-2 bg-emerald-400"
                  : "w-2 bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Regla 4: AnimatePresence de Framer Motion para que las vistas entren deslizándose */}
      <div className="relative overflow-hidden min-h-[460px]">
        <AnimatePresence mode="wait" custom={direction}>
          
          {/* =========================================================================
              STEP 0: HERO BANNER CINEMATOGRÁFICO
              ========================================================================= */}
          {currentStep === 0 && (
            <motion.div
              key="step-hero"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <div className="relative rounded-3xl overflow-hidden border border-neon-cyan/25 shadow-tactical-card p-6 sm:p-8 lg:p-10 text-center bg-night-deep/90 min-h-[460px] flex items-center justify-center">
                
                {/* Fondo Fotográfico Auténtico FFAA y PNP del Perú */}
                <img
                  src="/assets/general/hero-joint-forces.jpg"
                  alt="Cadetes Conjuntos de las Fuerzas Armadas del Perú"
                  className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-transform duration-1000 scale-105"
                />

                {/* Overlay Degradado Táctico de Alto Contraste */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B101E] via-[#0B101E]/85 to-[#0B101E]/50 z-10" />
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none z-10" />

                <div className="relative z-20 w-full max-w-[1360px] mx-auto">
                  {/* Badge de Orientación Vocacional con Tipografía Grande, Legible y Destacada */}
                  <div className="inline-flex items-center gap-2.5 px-5 sm:px-7 py-2.5 rounded-full bg-[#0B101E]/95 border-2 border-neon-cyan text-neon-cyan text-xs sm:text-sm md:text-base font-rajdhani font-black tracking-widest uppercase mb-4 shadow-[0_0_25px_rgba(0,240,255,0.4)]">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-neon-cyan shrink-0 animate-pulse" />
                    <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      SISTEMA TÁCTICO DE ORIENTACIÓN VOCACIONAL · FUERZAS ARMADAS DEL PERÚ
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-rajdhani font-black text-white uppercase tracking-wider mb-2 leading-tight drop-shadow-md">
                    ¿PARA QUÉ ESCUELA MILITAR NACISTE?
                  </h1>

                  {/* Subtítulo Breve de Alto Impacto */}
                  <p className="text-base sm:text-lg md:text-xl text-slate-200 font-inter leading-relaxed max-w-3xl mx-auto mb-8 font-medium">
                    Simulador algorítmico de alta precisión para perfilamiento militar y policial.
                  </p>

                  {/* Cuadrícula de 4 Pilares Monumentales Clásicos (Capitel, Fuste Acanalado y Basa de Pedestal) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6 w-full mx-auto mb-10 text-left items-stretch">
                    
                    {/* COLUMNA / PILAR I: FILTRO LEGAL Y BIOMÉTRICO */}
                    <div className="relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#101728] via-[#090d18] to-[#0e1424] border-2 border-slate-700/80 dark:border-cyan-500/40 hover:border-[#00F0FF] shadow-[0_12px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300 group overflow-hidden">
                      
                      {/* Capitel Monumental (Corona Superior con Triglifos Arquitectónicos y Medallón) */}
                      <div className="relative bg-gradient-to-r from-slate-900 via-[#151f38] to-slate-900 border-b-2 border-cyan-500/40 p-3 sm:p-3.5 flex items-center justify-between shadow-sm">
                        {/* Triglifos clásicos decorativos (ranuras de columna clásica) */}
                        <div className="flex gap-1 opacity-70">
                          <span className="w-1 h-5 bg-cyan-400/60 rounded-full" />
                          <span className="w-1 h-5 bg-cyan-400/60 rounded-full" />
                          <span className="w-1 h-5 bg-cyan-400/60 rounded-full" />
                        </div>

                        {/* Medallón central en relieve con el escudo */}
                        <div className="w-11 h-11 rounded-xl bg-cyan-950/90 border-2 border-neon-cyan flex items-center justify-center text-[#00F0FF] shadow-cyan-glow group-hover:scale-110 transition-transform">
                          <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>

                        {/* Placa de Numeración Clásica */}
                        <div className="flex items-center gap-1.5">
                          <span className="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-neon-cyan/50 text-neon-cyan font-mono font-black text-xs tracking-wider shadow-sm">
                            PILAR I
                          </span>
                        </div>
                      </div>

                      {/* Fuste Acanalado (Cuerpo de la Columna) */}
                      <div className="relative px-5 py-5 sm:px-6 sm:py-6 flex-1 flex flex-col justify-between">
                        {/* Estrías arquitectónicas laterales sutiles */}
                        <div className="absolute top-0 bottom-0 left-1 w-0.5 bg-gradient-to-b from-cyan-500/30 via-white/5 to-cyan-500/30 pointer-events-none" />
                        <div className="absolute top-0 bottom-0 right-1 w-0.5 bg-gradient-to-b from-cyan-500/30 via-white/5 to-cyan-500/30 pointer-events-none" />

                        <div>
                          <div className="text-[10px] font-mono font-bold text-slate-400 dark:text-cyan-400/80 uppercase tracking-widest mb-1">
                            COLUMNA DE APTITUD FÍSICA
                          </div>
                          <h3 className="font-rajdhani font-black text-xl sm:text-2xl text-white uppercase tracking-wider group-hover:text-[#00F0FF] transition-colors leading-tight mb-3">
                            Filtro Legal y Físico
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-300 font-inter leading-relaxed">
                            Auditoría biométrica oficial: estatura mínima descalzo, rango de peso militar (IMC), agudeza visual y requisitos legales de aptitud.
                          </p>
                        </div>
                      </div>

                      {/* Basa y Plinto Monumental (Pedestal Escalonado con Sello Oficial) */}
                      <div className="bg-gradient-to-r from-slate-900 via-[#12192c] to-slate-900 border-t-2 border-cyan-500/40 px-4 py-3 flex items-center justify-between text-[11px] font-rajdhani font-bold uppercase tracking-wider shadow-inner">
                        <span className="text-cyan-300 flex items-center gap-1.5">
                          <span>⚖️ Baremos 2026</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-peru-red/20 border border-peru-red/60 text-peru-red font-mono text-[10px] font-bold">
                          Excluyente
                        </span>
                      </div>
                    </div>

                    {/* COLUMNA / PILAR II: TEST PSICOLÓGICO */}
                    <div className="relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#101728] via-[#090d18] to-[#0e1424] border-2 border-slate-700/80 dark:border-cyan-500/40 hover:border-[#00F0FF] shadow-[0_12px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300 group overflow-hidden">
                      
                      {/* Capitel Monumental */}
                      <div className="relative bg-gradient-to-r from-slate-900 via-[#151f38] to-slate-900 border-b-2 border-cyan-500/40 p-3 sm:p-3.5 flex items-center justify-between shadow-sm">
                        <div className="flex gap-1 opacity-70">
                          <span className="w-1 h-5 bg-cyan-400/60 rounded-full" />
                          <span className="w-1 h-5 bg-cyan-400/60 rounded-full" />
                          <span className="w-1 h-5 bg-cyan-400/60 rounded-full" />
                        </div>

                        <div className="w-11 h-11 rounded-xl bg-cyan-950/90 border-2 border-neon-cyan flex items-center justify-center text-[#00F0FF] shadow-cyan-glow group-hover:scale-110 transition-transform">
                          <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-neon-cyan/50 text-neon-cyan font-mono font-black text-xs tracking-wider shadow-sm">
                            PILAR II
                          </span>
                        </div>
                      </div>

                      {/* Fuste Acanalado */}
                      <div className="relative px-5 py-5 sm:px-6 sm:py-6 flex-1 flex flex-col justify-between">
                        <div className="absolute top-0 bottom-0 left-1 w-0.5 bg-gradient-to-b from-cyan-500/30 via-white/5 to-cyan-500/30 pointer-events-none" />
                        <div className="absolute top-0 bottom-0 right-1 w-0.5 bg-gradient-to-b from-cyan-500/30 via-white/5 to-cyan-500/30 pointer-events-none" />

                        <div>
                          <div className="text-[10px] font-mono font-bold text-slate-400 dark:text-cyan-400/80 uppercase tracking-widest mb-1">
                            COLUMNA DE TEMPLE MARCIAL
                          </div>
                          <h3 className="font-rajdhani font-black text-xl sm:text-2xl text-white uppercase tracking-wider group-hover:text-[#00F0FF] transition-colors leading-tight mb-3">
                            Test Psicológico
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-300 font-inter leading-relaxed">
                            Evaluación psicométrica Big Five militar: temple marcial bajo presión, estabilidad emocional, disciplina y liderazgo operativo.
                          </p>
                        </div>
                      </div>

                      {/* Basa y Plinto Monumental */}
                      <div className="bg-gradient-to-r from-slate-900 via-[#12192c] to-slate-900 border-t-2 border-cyan-500/40 px-4 py-3 flex items-center justify-between text-[11px] font-rajdhani font-bold uppercase tracking-wider shadow-inner">
                        <span className="text-cyan-300 flex items-center gap-1.5">
                          <span>🧠 Big Five Militar</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/60 text-emerald-400 font-mono text-[10px] font-bold">
                          Psicometría
                        </span>
                      </div>
                    </div>

                    {/* COLUMNA / PILAR III: INTERESES TÁCTICOS */}
                    <div className="relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#101728] via-[#090d18] to-[#0e1424] border-2 border-slate-700/80 dark:border-cyan-500/40 hover:border-[#00F0FF] shadow-[0_12px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300 group overflow-hidden">
                      
                      {/* Capitel Monumental */}
                      <div className="relative bg-gradient-to-r from-slate-900 via-[#151f38] to-slate-900 border-b-2 border-cyan-500/40 p-3 sm:p-3.5 flex items-center justify-between shadow-sm">
                        <div className="flex gap-1 opacity-70">
                          <span className="w-1 h-5 bg-cyan-400/60 rounded-full" />
                          <span className="w-1 h-5 bg-cyan-400/60 rounded-full" />
                          <span className="w-1 h-5 bg-cyan-400/60 rounded-full" />
                        </div>

                        <div className="w-11 h-11 rounded-xl bg-cyan-950/90 border-2 border-neon-cyan flex items-center justify-center text-[#00F0FF] shadow-cyan-glow group-hover:scale-110 transition-transform">
                          <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-neon-cyan/50 text-neon-cyan font-mono font-black text-xs tracking-wider shadow-sm">
                            PILAR III
                          </span>
                        </div>
                      </div>

                      {/* Fuste Acanalado */}
                      <div className="relative px-5 py-5 sm:px-6 sm:py-6 flex-1 flex flex-col justify-between">
                        <div className="absolute top-0 bottom-0 left-1 w-0.5 bg-gradient-to-b from-cyan-500/30 via-white/5 to-cyan-500/30 pointer-events-none" />
                        <div className="absolute top-0 bottom-0 right-1 w-0.5 bg-gradient-to-b from-cyan-500/30 via-white/5 to-cyan-500/30 pointer-events-none" />

                        <div>
                          <div className="text-[10px] font-mono font-bold text-slate-400 dark:text-cyan-400/80 uppercase tracking-widest mb-1">
                            COLUMNA DE APTITUD TÁCTICA
                          </div>
                          <h3 className="font-rajdhani font-black text-xl sm:text-2xl text-white uppercase tracking-wider group-hover:text-[#00F0FF] transition-colors leading-tight mb-3">
                            Intereses Tácticos
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-300 font-inter leading-relaxed">
                            Dilemas operacionales situacionales condicionados por aptitud: combate terrestre, naval, aviación o pacificación policial.
                          </p>
                        </div>
                      </div>

                      {/* Basa y Plinto Monumental */}
                      <div className="bg-gradient-to-r from-slate-900 via-[#12192c] to-slate-900 border-t-2 border-cyan-500/40 px-4 py-3 flex items-center justify-between text-[11px] font-rajdhani font-bold uppercase tracking-wider shadow-inner">
                        <span className="text-cyan-300 flex items-center gap-1.5">
                          <span>🎯 Simulación Real</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-yellow-950/40 border border-yellow-500/60 text-yellow-400 font-mono text-[10px] font-bold">
                          Vocación
                        </span>
                      </div>
                    </div>

                    {/* COLUMNA / PILAR IV: SIMULADOR ACADÉMICO */}
                    <div className="relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#101728] via-[#090d18] to-[#0e1424] border-2 border-slate-700/80 dark:border-cyan-500/40 hover:border-[#00F0FF] shadow-[0_12px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300 group overflow-hidden">
                      
                      {/* Capitel Monumental */}
                      <div className="relative bg-gradient-to-r from-slate-900 via-[#151f38] to-slate-900 border-b-2 border-cyan-500/40 p-3 sm:p-3.5 flex items-center justify-between shadow-sm">
                        <div className="flex gap-1 opacity-70">
                          <span className="w-1 h-5 bg-cyan-400/60 rounded-full" />
                          <span className="w-1 h-5 bg-cyan-400/60 rounded-full" />
                          <span className="w-1 h-5 bg-cyan-400/60 rounded-full" />
                        </div>

                        <div className="w-11 h-11 rounded-xl bg-cyan-950/90 border-2 border-neon-cyan flex items-center justify-center text-[#00F0FF] shadow-cyan-glow group-hover:scale-110 transition-transform">
                          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-neon-cyan/50 text-neon-cyan font-mono font-black text-xs tracking-wider shadow-sm">
                            PILAR IV
                          </span>
                        </div>
                      </div>

                      {/* Fuste Acanalado */}
                      <div className="relative px-5 py-5 sm:px-6 sm:py-6 flex-1 flex flex-col justify-between">
                        <div className="absolute top-0 bottom-0 left-1 w-0.5 bg-gradient-to-b from-cyan-500/30 via-white/5 to-cyan-500/30 pointer-events-none" />
                        <div className="absolute top-0 bottom-0 right-1 w-0.5 bg-gradient-to-b from-cyan-500/30 via-white/5 to-cyan-500/30 pointer-events-none" />

                        <div>
                          <div className="text-[10px] font-mono font-bold text-slate-400 dark:text-cyan-400/80 uppercase tracking-widest mb-1">
                            COLUMNA DE BRECHAS COGNITIVAS
                          </div>
                          <h3 className="font-rajdhani font-black text-xl sm:text-2xl text-white uppercase tracking-wider group-hover:text-[#00F0FF] transition-colors leading-tight mb-3">
                            Simulador Académico
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-300 font-inter leading-relaxed">
                            Simulacro oficial tipo admisión con fórmulas en LaTeX: matemática, física, letras y cálculo de brechas cognitivas por escuela.
                          </p>
                        </div>
                      </div>

                      {/* Basa y Plinto Monumental */}
                      <div className="bg-gradient-to-r from-slate-900 via-[#12192c] to-slate-900 border-t-2 border-cyan-500/40 px-4 py-3 flex items-center justify-between text-[11px] font-rajdhani font-bold uppercase tracking-wider shadow-inner">
                        <span className="text-cyan-300 flex items-center gap-1.5">
                          <span>📊 Banco Oficial</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/60 text-neon-cyan font-mono text-[10px] font-bold">
                          Diagnóstico
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Acciones de Despliegue Operativo */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      id="tour-start-cta"
                      type="button"
                      onClick={() => goToStep(1)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-black text-sm sm:text-base tracking-wider uppercase shadow-cyan-glow-lg hover:bg-cyan-300 hover:scale-105 transition-all duration-300 cursor-pointer text-center shrink-0"
                    >
                      <span>INICIAR EVALUACIÓN LEGAL Y FÍSICA</span>
                      <ArrowRight className="w-5 h-5 flex-shrink-0" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleLoadDemo();
                        goToStep(1);
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-transparent border border-gray-700 text-gray-300 hover:text-white hover:border-[#00F0FF] hover:bg-cyan-950/20 text-xs font-rajdhani font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm shrink-0"
                      title="Cargar automáticamente datos de prueba válidos"
                    >
                      <span>⚡ CARGAR PERFIL DE PRUEBA</span>
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* =========================================================================
              STEP 1: TARJETA DE PARÁMETROS BIOMÉTRICOS (Deslizable)
              ========================================================================= */}
          {currentStep === 1 && (
            <motion.div
              key="step-biometric"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Panel de Formulario Biométrico */}
                <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 shadow-tactical-card relative">
                  
                  {/* Notificación de carga de perfil de prueba */}
                  {demoLoadedNotification && (
                    <div className="absolute top-3 right-4 px-3 py-1 rounded-lg bg-emerald-950/90 border border-emerald-500/60 text-emerald-400 text-xs font-rajdhani font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-green-glow animate-in fade-in slide-in-from-top duration-200 z-30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>PERFIL DE PRUEBA MILITAR CARGADO</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
                    <div>
                      <span className="text-xs font-rajdhani font-bold text-neon-cyan tracking-widest uppercase">
                        PILAR 1 // FASE A
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-rajdhani font-bold text-white uppercase tracking-wide">
                        Parámetros Biométricos y <Tooltip termino="Antropometría">Antropometría</Tooltip>
                      </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {/* Botón Auto-Llenado Táctico (Demo Mode) */}
                      <button
                        type="button"
                        onClick={handleLoadDemo}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent border border-gray-700 text-gray-400 hover:text-white hover:border-[#00F0FF] hover:bg-cyan-950/20 text-xs font-rajdhani font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
                        title="Cargar automáticamente un set de datos de prueba completo"
                      >
                        <span>⚡ CARGAR PERFIL DE PRUEBA</span>
                      </button>

                      <div className={`px-3 py-1.5 rounded-xl border text-xs font-rajdhani font-bold tracking-wider uppercase flex items-center gap-2 ${imcColor}`}>
                        <Activity className="w-4 h-4" />
                        <span><Tooltip termino="IMC">IMC</Tooltip>: {hasValidBiometrics ? imc : '--'} ({imcStatus})</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nombre Completo */}
                    <div>
                      <label className="block text-sm font-rajdhani font-bold text-slate-200 uppercase tracking-wider mb-2">
                        Nombre y Apellidos del Postulante <span className="text-peru-red">*</span>
                      </label>
                      <input
                        type="text"
                        value={candidate.nombre || ''}
                        onChange={(e) => updateCandidate('nombre', e.target.value)}
                        placeholder="Ej. Carlos Mendoza"
                        className="w-full px-4 py-3 rounded-xl bg-night-deep/80 border border-white/15 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan text-white text-base outline-none transition-all placeholder:text-slate-600"
                      />
                    </div>

                    {/* Sexo Biológico */}
                    <div>
                      <label className="block text-sm font-rajdhani font-bold text-slate-200 uppercase tracking-wider mb-2">
                        Sexo Biológico (Según DNI) <span className="text-peru-red">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <TacticalRadioCard
                          selected={candidate.sexo === 'M'}
                          onClick={() => updateCandidate('sexo', 'M')}
                          title="Varón"
                          subtitle="Baremo masculino"
                          icon="♂"
                        />
                        <TacticalRadioCard
                          selected={candidate.sexo === 'F'}
                          onClick={() => updateCandidate('sexo', 'F')}
                          title="Dama"
                          subtitle="Baremo femenino"
                          icon="♀"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3 Cajas Numéricas Destacadas */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                    
                    <div className="p-4 rounded-xl bg-night-deep/80 border border-white/10">
                      <span className="text-[11px] font-rajdhani font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Estatura Descalzo <span className="text-peru-red">*</span>
                      </span>
                      <div className="flex items-baseline gap-2">
                        <input
                          type="number"
                          min="120"
                          max="220"
                          value={candidate.talla_cm > 0 ? candidate.talla_cm : ''}
                          placeholder="172"
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            updateCandidate('talla_cm', isNaN(val) ? 0 : val);
                          }}
                          className="w-full bg-transparent text-neon-cyan font-rajdhani font-bold text-3xl outline-none placeholder:text-slate-600"
                        />
                        <span className="text-xs text-slate-500 font-bold">CM</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Mínimo: 168 cm (M) / 158 cm (F)</span>
                    </div>

                    <div className="p-4 rounded-xl bg-night-deep/80 border border-white/10">
                      <span className="text-[11px] font-rajdhani font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Peso Corporal <span className="text-peru-red">*</span>
                      </span>
                      <div className="flex items-baseline gap-2">
                        <input
                          type="number"
                          min="30"
                          max="150"
                          value={candidate.peso_kg > 0 ? candidate.peso_kg : ''}
                          placeholder="70"
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            updateCandidate('peso_kg', isNaN(val) ? 0 : val);
                          }}
                          className="w-full bg-transparent text-neon-cyan font-rajdhani font-bold text-3xl outline-none placeholder:text-slate-600"
                        />
                        <span className="text-xs text-slate-500 font-bold">KG</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Verificado contra tabla IMC</span>
                    </div>

                    <div className="p-4 rounded-xl bg-night-deep/80 border border-white/10">
                      <span className="text-[11px] font-rajdhani font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Edad Cumplida <span className="text-peru-red">*</span>
                      </span>
                      <div className="flex items-baseline gap-2">
                        <input
                          type="number"
                          min="14"
                          max="30"
                          value={candidate.edad > 0 ? candidate.edad : ''}
                          placeholder="19"
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            updateCandidate('edad', isNaN(val) ? 0 : val);
                          }}
                          className="w-full bg-transparent text-neon-cyan font-rajdhani font-bold text-3xl outline-none placeholder:text-slate-600"
                        />
                        <span className="text-xs text-slate-500 font-bold">AÑOS</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Rango oficial: 15 a 21-24 años</span>
                    </div>

                  </div>

                  {/* Talla Sentado */}
                  <div className="p-4 rounded-xl bg-night-deep/80 border border-white/10 mb-6">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider">
                        Talla Sentado (Tronco y Cabeza)
                      </span>
                      <span className="text-sm font-rajdhani font-bold text-neon-cyan">
                        {candidate.talla_sentado_cm > 0 ? `${candidate.talla_sentado_cm} CM` : "90 CM (Estándar)"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="75"
                      max="110"
                      value={candidate.talla_sentado_cm > 0 ? candidate.talla_sentado_cm : 90}
                      onChange={(e) => updateCandidate('talla_sentado_cm', parseFloat(e.target.value))}
                      className="w-full accent-neon-cyan cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Exigido para cabinas de caza EOFAP y vehículos blindados (Rango óptimo: 85 - 98 cm).
                    </span>
                  </div>

                  {/* Botones de Navegación y Validación en Tiempo Real */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => goToStep(0)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-slate-400 hover:text-white font-rajdhani font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Volver a Inicio</span>
                    </button>

                    <div className="w-full sm:w-auto flex items-center gap-3">
                      {!isStep1Valid && (
                        <span className="hidden sm:inline text-xs text-amber-400 font-inter">
                          ⚠️ Completa los campos obligatorios (*)
                        </span>
                      )}
                      <button
                        type="button"
                        disabled={!isStep1Valid}
                        onClick={isStep1Valid ? () => goToStep(2) : undefined}
                        className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-rajdhani font-bold text-sm uppercase tracking-wider transition-all ${
                          isStep1Valid
                            ? "bg-neon-cyan text-night-deep shadow-cyan-glow hover:bg-cyan-300 cursor-pointer"
                            : "bg-slate-800 text-slate-500 border border-slate-700 opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <span>Siguiente: Aptitud Médica y Legal</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>

                {/* Columna Lateral Fotográfica (Acompañamiento Visual Inmersivo) */}
                <div className="hidden lg:flex lg:col-span-4 flex-col rounded-3xl overflow-hidden border border-white/15 bg-night-deep/80 shadow-tactical-card">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                    <img
                      src="/assets/general/biometric-check.jpg"
                      alt="Evaluación de Estatura y Peso en Admisión Militar EMCH"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-4">
                      <div>
                        <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-[10px] font-rajdhani font-bold uppercase tracking-wider block mb-1">
                          CENTRO MÉDICO MILITAR
                        </span>
                        <h4 className="text-sm font-rajdhani font-bold text-white uppercase leading-tight">
                          Estación de Antropometría Oficial
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="font-rajdhani text-slate-400 uppercase">Estatura Actual:</span>
                        <span className="font-mono font-bold text-white">
                          {candidate.talla_cm > 0 ? `${candidate.talla_cm} cm` : "--"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="font-rajdhani text-slate-400 uppercase">Masa Corporal:</span>
                        <span className="font-mono font-bold text-white">
                          {candidate.peso_kg > 0 ? `${candidate.peso_kg} kg` : "--"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="font-rajdhani text-slate-400 uppercase">Índice IMC:</span>
                        <span className="font-mono font-bold text-neon-cyan">
                          {hasValidBiometrics ? `${imc} (${imcStatus})` : "--"}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 font-inter leading-relaxed">
                      El examen biométrico evalúa la aptitud física del postulante para soportar las exigencias de instrucción en campamento y combate.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* =========================================================================
              STEP 2: TARJETA DE APTITUD MÉDICA Y LEGAL (Deslizable)
              ========================================================================= */}
          {currentStep === 2 && (
            <motion.div
              key="step-medical"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 shadow-tactical-card relative">
                  
                  {/* Notificación de carga de perfil de prueba */}
                  {demoLoadedNotification && (
                    <div className="absolute top-3 right-4 px-3 py-1 rounded-lg bg-emerald-950/90 border border-emerald-500/60 text-emerald-400 text-xs font-rajdhani font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-green-glow animate-in fade-in slide-in-from-top duration-200 z-30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>PERFIL DE PRUEBA MILITAR CARGADO</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
                    <div>
                      <span className="text-xs font-rajdhani font-bold text-neon-cyan tracking-widest uppercase">
                        PILAR 1 // FASE B
                      </span>
                      <h2 className="text-2xl font-rajdhani font-bold text-white uppercase tracking-wide">
                        Aptitud Médica y Requisitos Legales
                      </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {/* Botón Auto-Llenado Táctico (Demo Mode) */}
                      <button
                        type="button"
                        onClick={handleLoadDemo}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent border border-gray-700 text-gray-400 hover:text-white hover:border-[#00F0FF] hover:bg-cyan-950/20 text-xs font-rajdhani font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
                        title="Cargar automáticamente un set de datos de prueba completo"
                      >
                        <span>⚡ CARGAR PERFIL DE PRUEBA</span>
                      </button>

                      <div className="px-3 py-1 rounded-lg bg-amber-950/40 border border-alert-amber/40 text-alert-amber text-xs font-rajdhani font-bold uppercase tracking-wider">
                        FILTROS EXCLUYENTES
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    
                    {/* 1. Agudeza Visual */}
                    <div>
                      <label className="block text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider mb-2">
                        1. Agudeza Visual (Ambos Ojos) <span className="text-peru-red">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <TacticalRadioCard
                          selected={candidate.agudeza_visual_20_20 === true}
                          onClick={() => {
                            updateCandidate('agudeza_visual_20_20', true);
                            updateCandidate('hasGlasses', false);
                          }}
                          title="20/20 Natural Sin Lentes"
                          subtitle="Exigido para pilotos de combate EOFAP y Oficiales de Armas"
                          badge="PILOTO OK"
                        />
                        <TacticalRadioCard
                          selected={candidate.agudeza_visual_20_20 === false}
                          onClick={() => {
                            updateCandidate('agudeza_visual_20_20', false);
                            updateCandidate('hasGlasses', true);
                          }}
                          title="Uso Lentes Correctores"
                          subtitle="Apto para especialidades técnicas, logísticas y servicios en tierra"
                          badge="SERVICIOS / TIERRA"
                        />
                      </div>
                    </div>

                    {/* 2. Percepción de Colores (Test de Ishihara) */}
                    <div>
                      <label className="block text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider mb-2">
                        2. Percepción Cromática (Test de Ishihara) <span className="text-peru-red">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <TacticalRadioCard
                          selected={candidate.daltonismo === false}
                          onClick={() => updateCandidate('daltonismo', false)}
                          title="Visión Cromática Normal"
                          subtitle="Distingue con total claridad luces tácticas y cartas de navegación"
                          badge="NORMAL"
                        />
                        <TacticalRadioCard
                          selected={candidate.daltonismo === true}
                          onClick={() => updateCandidate('daltonismo', true)}
                          title="Dificultad de Colores (Daltonismo)"
                          subtitle="Confusión de tonos o alteración en discriminación visual"
                          badge="OBSERVADO"
                        />
                      </div>
                    </div>

                    {/* 3. Estado Civil y Dependientes */}
                    <div>
                      <label className="block text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider mb-2">
                        3. Estado Civil y Cargas Familiares <span className="text-peru-red">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <TacticalRadioCard
                          selected={candidate.estado_civil === 'soltero' && candidate.tiene_hijos === false}
                          onClick={() => {
                            updateCandidate('estado_civil', 'soltero');
                            updateCandidate('tiene_hijos', false);
                          }}
                          title="Soltero(a) Sin Hijos"
                          subtitle="Cumple requisito de dedicación exclusiva en régimen de internado"
                          badge="APTO"
                        />
                        <TacticalRadioCard
                          selected={candidate.estado_civil === 'casado' || candidate.tiene_hijos === true}
                          onClick={() => {
                            updateCandidate('estado_civil', 'casado');
                            updateCandidate('tiene_hijos', true);
                          }}
                          title="Casado(a) o Con Hijos"
                          subtitle="Incompatible con régimen de internado militar oficial"
                          badge="EXCLUYENTE"
                        />
                      </div>
                    </div>

                    {/* 4. Tatuajes Visibles */}
                    <div>
                      <label className="block text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider mb-2">
                        4. Tatuajes en Zonas Visibles con Uniforme de Verano <span className="text-peru-red">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <TacticalRadioCard
                          selected={candidate.tiene_tatuajes === false}
                          onClick={() => updateCandidate('tiene_tatuajes', false)}
                          title="Sin Tatuajes Visibles"
                          subtitle="Cumple la normativa de presentación reglamentaria"
                          badge="APTO"
                        />
                        <TacticalRadioCard
                          selected={candidate.tiene_tatuajes === true}
                          onClick={() => updateCandidate('tiene_tatuajes', true)}
                          title="Poseo Tatuajes Visibles"
                          subtitle="En cuello, antebrazos o piernas visibles en formación"
                          badge="OBSERVADO"
                        />
                      </div>
                    </div>

                    {/* 5. Antecedentes Penales / Policiales */}
                    <div>
                      <label className="block text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider mb-2">
                        5. Antecedentes Penales, Judiciales o Policiales <span className="text-peru-red">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <TacticalRadioCard
                          selected={candidate.tiene_antecedentes === false}
                          onClick={() => updateCandidate('tiene_antecedentes', false)}
                          title="Carezco de Antecedentes"
                          subtitle="Hoja de vida intachable / Sin registros judiciales"
                          badge="APTO"
                        />
                        <TacticalRadioCard
                          selected={candidate.tiene_antecedentes === true}
                          onClick={() => updateCandidate('tiene_antecedentes', true)}
                          title="Registro Antecedentes"
                          subtitle="Causal directa de descalificación por ley de admisión"
                          badge="EXCLUYENTE"
                        />
                      </div>
                    </div>

                    {/* 6. Secundaria Regular */}
                    <div>
                      <label className="block text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider mb-2">
                        6. Educación Secundaria Regular <span className="text-peru-red">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <TacticalRadioCard
                          selected={candidate.secundaria_completa === true}
                          onClick={() => updateCandidate('secundaria_completa', true)}
                          title="Culminada / Cursando 5to"
                          subtitle="Certificado oficial de estudios visado"
                          badge="APTO"
                        />
                        <TacticalRadioCard
                          selected={candidate.secundaria_completa === false}
                          onClick={() => updateCandidate('secundaria_completa', false)}
                          title="Incompleta"
                          subtitle="No cumple requisito académico reglamentario mínimo"
                          badge="NO APTO"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Botones de Navegación y Botón Procesar Elegibilidad */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/10 mt-6">
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-slate-400 hover:text-white font-rajdhani font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Volver a Biometría</span>
                    </button>

                    <div className="w-full sm:w-auto flex items-center gap-3">
                      {!isStep2Valid && (
                        <span className="hidden sm:inline text-xs text-amber-400 font-inter">
                          ⚠️ Responde los 6 filtros obligatorios (*)
                        </span>
                      )}

                      {/* Regla 3: Botón de "Procesar Elegibilidad" con Validación en Tiempo Real */}
                      <button
                        type="button"
                        disabled={isProcessing || !isStep2Valid}
                        onClick={!isProcessing && isStep2Valid ? handleProcessEligibility : undefined}
                        className={`w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-rajdhani font-extrabold text-sm uppercase tracking-wider transition-all duration-300 ${
                          isStep2Valid && !isProcessing
                            ? "bg-neon-cyan text-night-deep shadow-cyan-glow-lg hover:bg-cyan-300 cursor-pointer"
                            : "bg-slate-800 text-slate-500 border border-slate-700 opacity-50 cursor-not-allowed"
                        }`}
                      >
                        {isProcessing ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-night-deep border-t-transparent animate-spin"></span>
                            <span>PROCESANDO BAREMOS...</span>
                          </>
                        ) : (
                          <>
                            <span>PROCESAR ELEGIBILIDAD</span>
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Columna Lateral Fotográfica (Acompañamiento Visual Inmersivo) */}
                <div className="hidden lg:flex lg:col-span-4 flex-col rounded-3xl overflow-hidden border border-white/15 bg-night-deep/80 shadow-tactical-card">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                    <img
                      src="/assets/general/hero-joint-forces.jpg"
                      alt="Cadetes de las Fuerzas Armadas del Perú en Formación de Honor"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-4">
                      <div>
                        <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/50 text-amber-300 text-[10px] font-rajdhani font-bold uppercase tracking-wider block mb-1">
                          DISCIPLINA MARCIAL
                        </span>
                        <h4 className="text-sm font-rajdhani font-bold text-white uppercase leading-tight">
                          Código de Honor Institucional
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="font-rajdhani text-slate-400 uppercase">Visión 20/20:</span>
                        <span className={`font-bold ${candidate.agudeza_visual_20_20 === null ? "text-slate-500" : candidate.agudeza_visual_20_20 ? "text-emerald-400" : "text-amber-400"}`}>
                          {candidate.agudeza_visual_20_20 === null ? "Pendiente" : candidate.agudeza_visual_20_20 ? "Normal" : "Uso de Lentes"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="font-rajdhani text-slate-400 uppercase">Estado Civil:</span>
                        <span className={`font-bold ${!candidate.estado_civil ? "text-slate-500" : candidate.estado_civil === "soltero" && !candidate.tiene_hijos ? "text-emerald-400" : "text-alert-red"}`}>
                          {!candidate.estado_civil ? "Pendiente" : candidate.estado_civil === "soltero" && !candidate.tiene_hijos ? "Soltero/Sin Hijos" : "Con Cargas"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="font-rajdhani text-slate-400 uppercase">Sin Antecedentes:</span>
                        <span className={`font-bold ${candidate.tiene_antecedentes === null ? "text-slate-500" : !candidate.tiene_antecedentes ? "text-emerald-400" : "text-alert-red"}`}>
                          {candidate.tiene_antecedentes === null ? "Pendiente" : !candidate.tiene_antecedentes ? "Conforme" : "Registrado"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="font-rajdhani text-slate-400 uppercase">Secundaria:</span>
                        <span className={`font-bold ${candidate.secundaria_completa === null ? "text-slate-500" : candidate.secundaria_completa ? "text-emerald-400" : "text-alert-red"}`}>
                          {candidate.secundaria_completa === null ? "Pendiente" : candidate.secundaria_completa ? "Completa" : "Incompleta"}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 font-inter leading-relaxed">
                      La Ley de Admisión Militar del Perú exige estricta honorabilidad, antecedentes limpios y salud integral para asegurar la defensa y seguridad de la Nación.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* =========================================================================
              STEP 3: CUADRÍCULA DE DICTAMEN DE LAS 8 ESCUELAS (SOLO RENDERIZA TRAS CLIC)
              ========================================================================= */}
          {currentStep === 3 && evaluationResult && (
            <motion.div
              key="step-eligibility-grid"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/40 shadow-tactical-card">
                
                {/* Header del Dictamen */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
                  <div>
                    <span className="text-xs font-rajdhani font-bold text-emerald-400 tracking-widest uppercase flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ELEGIBILIDAD PRELIMINAR BAREMADA EN VIVO
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-rajdhani font-bold text-white uppercase tracking-wide mt-1">
                      Dictamen de Elegibilidad por Escuela Matriz
                    </h2>
                    <p className="text-xs text-slate-400 font-inter mt-0.5">
                      Resultado antropométrico y legal: <strong className="text-emerald-400">{evaluationResult.totalAptas} de 8 escuelas militares aptas</strong>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => goToStep(2)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 text-slate-400 hover:text-white text-xs font-rajdhani font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Modificar Datos</span>
                  </button>
                </div>

                {/* Las 8 Tarjetas de las Escuelas Matrices (Cuadrícula 4 Columnas) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {evaluationResult.results.map((item) => {
                    const esc = item.escuela;
                    return (
                      <div
                        key={esc.id}
                        className={`p-4 rounded-2xl border relative overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                          item.esApto
                            ? "bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-400 hover:shadow-green-glow"
                            : "bg-red-950/20 border-red-500/30 opacity-75"
                        }`}
                      >
                        {/* Marca de agua institucional */}
                        <div className="absolute right-1 bottom-0 text-4xl font-rajdhani font-black text-white/[0.04] pointer-events-none select-none">
                          {esc.id}
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{esc.icon}</span>
                            <span className={`text-[11px] font-rajdhani font-bold px-2 py-0.5 rounded border uppercase ${
                              item.esApto
                                ? "border-emerald-500/50 text-emerald-400 bg-emerald-950/60"
                                : "border-red-500/50 text-red-400 bg-red-950/60"
                            }`}>
                              {item.esApto ? "✓ APTO" : "✕ OBSERVADO"}
                            </span>
                          </div>

                          <h4 className="font-rajdhani font-bold text-sm text-white uppercase line-clamp-2 leading-tight">
                            {esc.nombre}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-inter mt-0.5">
                            {esc.rama} · {esc.rango}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/10 text-xs">
                          <div className="flex justify-between text-slate-400 mb-1">
                            <span>Talla Mín:</span>
                            <strong className="text-white">{item.minTalla} cm</strong>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>Rango Edad:</span>
                            <strong className="text-white">{esc.edadMin}-{esc.edadMax} años</strong>
                          </div>

                          {!item.esApto && item.motivo && (
                            <p className="text-[10px] text-red-400 font-inter mt-2 line-clamp-2 font-medium">
                              ⚠️ {item.motivo}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Botón CTA para avanzar al Pilar 2 con Validación en Tiempo Real */}
                <div className="text-center pt-4 border-t border-white/10">
                  <button
                    type="button"
                    disabled={!isPilar1Complete}
                    onClick={isPilar1Complete ? nextPillar : undefined}
                    className={`inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-rajdhani font-extrabold text-base tracking-widest uppercase transition-all duration-300 ${
                      isPilar1Complete
                        ? "bg-neon-cyan text-night-deep shadow-cyan-glow-lg hover:bg-cyan-300 hover:scale-105 cursor-pointer"
                        : "bg-slate-800 text-slate-500 border border-slate-700 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <span>INICIAR SIMULACIÓN TÁCTICA (PILAR 2: PSICOMETRÍA)</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  {!isPilar1Complete && (
                    <p className="text-xs text-amber-400 font-inter mt-3 flex items-center justify-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Faltan campos obligatorios en el perfil para avanzar al Pilar 2.</span>
                    </p>
                  )}
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}

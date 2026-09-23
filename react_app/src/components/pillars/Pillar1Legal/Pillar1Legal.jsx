import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '../../../store/useAssessmentStore';
import { evaluateLegalCandidate } from '../../../data/legalRequirements';
import TacticalRadioCard from '../../common/TacticalRadioCard';
import Tooltip from '../../common/Tooltip';
import {
  ShieldCheck,
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
  const { candidate, updateCandidate, nextPillar } = useAssessmentStore();
  
  // Regla 2: Estado currentStep
  // 0: Hero Banner, 1: Biometría, 2: Aptitud Médica y Legal, 3: Dictamen de Elegibilidad
  const urlParamStep = typeof window !== 'undefined' ? parseInt(new URLSearchParams(window.location.search).get('step') || '0', 10) : 0;
  const [currentStep, setCurrentStep] = useState(urlParamStep);
  const [direction, setDirection] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(() => urlParamStep === 3 ? evaluateLegalCandidate(candidate) : null);

  const goToStep = (step) => {
    setDirection(step >= currentStep ? 1 : -1);
    setCurrentStep(step);
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

  // Cálculo en vivo de IMC para la vista biométrica
  const h_m = candidate.talla_cm > 3 ? candidate.talla_cm / 100 : candidate.talla_cm;
  const imc = h_m > 0 ? parseFloat((candidate.peso_kg / (h_m * h_m)).toFixed(1)) : 22.0;

  let imcStatus = "Óptimo Militar";
  let imcColor = "text-emerald-400 border-emerald-500/40 bg-emerald-950/40";
  if (imc < 18.5) {
    imcStatus = "Bajo Peso";
    imcColor = "text-amber-400 border-amber-500/40 bg-amber-950/40";
  } else if (imc > 25 && imc <= 27.5) {
    imcStatus = "Límite Máximo";
    imcColor = "text-amber-400 border-amber-500/40 bg-amber-950/40";
  } else if (imc > 27.5) {
    imcStatus = "Sobrepeso";
    imcColor = "text-alert-red border-alert-red/40 bg-red-950/40";
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4">
      
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
              <div className="relative rounded-3xl overflow-hidden border border-neon-cyan/25 shadow-tactical-card p-8 sm:p-12 text-center bg-night-deep/90 min-h-[460px] flex items-center justify-center">
                
                {/* Fondo Fotográfico Auténtico FFAA y PNP del Perú */}
                <img
                  src="/assets/general/hero-joint-forces.jpg"
                  alt="Cadetes Conjuntos de las Fuerzas Armadas del Perú"
                  className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-transform duration-1000 scale-105"
                />

                {/* Overlay Degradado Táctico de Alto Contraste */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B101E] via-[#0B101E]/85 to-[#0B101E]/50 z-10" />
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none z-10" />

                <div className="relative z-20 max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-neon-cyan/40 text-neon-cyan text-xs font-rajdhani font-bold tracking-widest uppercase mb-4 shadow-cyan-glow">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>SISTEMA TÁCTICO DE ORIENTACIÓN VOCACIONAL · FUERZAS ARMADAS DEL PERÚ</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-rajdhani font-extrabold text-white uppercase tracking-wider mb-4 leading-tight">
                    ¿PARA QUÉ ESCUELA MILITAR NACISTE?
                  </h1>

                  <p className="text-base sm:text-lg text-slate-100 font-inter leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
                    Simulador algorítmico de alta precisión matemática. Evalúa tu aptitud legal y <Tooltip termino="Antropometría">antropométrica</Tooltip> (Pilar 1), tu perfil de personalidad <Tooltip termino="Big Five">Big Five</Tooltip> (Pilar 2), tus intereses operacionales (Pilar 3) y tu rendimiento académico (Pilar 4) contra las exigencias oficiales de las 8 escuelas matrices del Perú.
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    <span className="px-3 py-1 rounded-lg border border-neon-cyan/30 text-neon-cyan text-xs font-rajdhani font-bold uppercase tracking-wider bg-cyan-950/30">
                      🎯 <Tooltip termino="Baremos">Baremación Multi-Pilar 100% Oficial</Tooltip>
                    </span>
                    <span className="px-3 py-1 rounded-lg border border-gold-primary/30 text-yellow-400 text-xs font-rajdhani font-bold uppercase tracking-wider bg-yellow-950/30">
                      🔒 Terminal de Admisión Clasificada
                    </span>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-extrabold text-base tracking-widest uppercase shadow-cyan-glow-lg hover:bg-cyan-300 hover:scale-105 transition-all duration-300"
                    >
                      <span>INICIAR EVALUACIÓN LEGAL Y FÍSICA</span>
                      <ArrowRight className="w-5 h-5" />
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
                <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 shadow-tactical-card">
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
                    <div>
                      <span className="text-xs font-rajdhani font-bold text-neon-cyan tracking-widest uppercase">
                        PILAR 1 // FASE A
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-rajdhani font-bold text-white uppercase tracking-wide">
                        Parámetros Biométricos y <Tooltip termino="Antropometría">Antropometría</Tooltip>
                      </h2>
                    </div>
                    <div className={`px-3 py-1.5 rounded-xl border text-xs font-rajdhani font-bold tracking-wider uppercase flex items-center gap-2 ${imcColor}`}>
                      <Activity className="w-4 h-4" />
                      <span><Tooltip termino="IMC">IMC</Tooltip>: {imc} ({imcStatus})</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nombre Completo */}
                    <div>
                      <label className="block text-sm font-rajdhani font-bold text-slate-200 uppercase tracking-wider mb-2">
                        Nombre y Apellidos del Postulante
                      </label>
                      <input
                        type="text"
                        value={candidate.nombre}
                        onChange={(e) => updateCandidate('nombre', e.target.value)}
                        placeholder="Ej. Carlos Mendoza"
                        className="w-full px-4 py-3 rounded-xl bg-night-deep/80 border border-white/15 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan text-white text-base outline-none transition-all"
                      />
                    </div>

                    {/* Sexo Biológico */}
                    <div>
                      <label className="block text-sm font-rajdhani font-bold text-slate-200 uppercase tracking-wider mb-2">
                        Sexo Biológico (Según DNI)
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
                        Estatura Descalzo
                      </span>
                      <div className="flex items-baseline gap-2">
                        <input
                          type="number"
                          min="140"
                          max="210"
                          value={candidate.talla_cm}
                          onChange={(e) => updateCandidate('talla_cm', parseFloat(e.target.value) || 160)}
                          className="w-full bg-transparent text-neon-cyan font-rajdhani font-bold text-3xl outline-none"
                        />
                        <span className="text-xs text-slate-500 font-bold">CM</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Mínimo: 168 cm (M) / 158 cm (F)</span>
                    </div>

                    <div className="p-4 rounded-xl bg-night-deep/80 border border-white/10">
                      <span className="text-[11px] font-rajdhani font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Peso Corporal
                      </span>
                      <div className="flex items-baseline gap-2">
                        <input
                          type="number"
                          min="40"
                          max="140"
                          value={candidate.peso_kg}
                          onChange={(e) => updateCandidate('peso_kg', parseFloat(e.target.value) || 60)}
                          className="w-full bg-transparent text-neon-cyan font-rajdhani font-bold text-3xl outline-none"
                        />
                        <span className="text-xs text-slate-500 font-bold">KG</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Verificado contra tabla IMC</span>
                    </div>

                    <div className="p-4 rounded-xl bg-night-deep/80 border border-white/10">
                      <span className="text-[11px] font-rajdhani font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Edad Cumplida
                      </span>
                      <div className="flex items-baseline gap-2">
                        <input
                          type="number"
                          min="15"
                          max="26"
                          value={candidate.edad}
                          onChange={(e) => updateCandidate('edad', parseInt(e.target.value, 10) || 18)}
                          className="w-full bg-transparent text-neon-cyan font-rajdhani font-bold text-3xl outline-none"
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
                      <span className="text-sm font-rajdhani font-bold text-neon-cyan">{candidate.talla_sentado_cm} CM</span>
                    </div>
                    <input
                      type="range"
                      min="75"
                      max="110"
                      value={candidate.talla_sentado_cm}
                      onChange={(e) => updateCandidate('talla_sentado_cm', parseFloat(e.target.value))}
                      className="w-full accent-neon-cyan cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Exigido para cabinas de caza EOFAP y vehículos blindados (Rango: 85 - 98 cm).
                    </span>
                  </div>

                  {/* Botones de Navegación */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => goToStep(0)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-slate-400 hover:text-white font-rajdhani font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Volver a Inicio</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => goToStep(2)}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-bold text-sm uppercase tracking-wider shadow-cyan-glow hover:bg-cyan-300 transition-all cursor-pointer"
                    >
                      <span>Siguiente: Aptitud Médica y Legal</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
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
                        <span className="font-mono font-bold text-white">{candidate.talla_cm} cm</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="font-rajdhani text-slate-400 uppercase">Masa Corporal:</span>
                        <span className="font-mono font-bold text-white">{candidate.peso_kg} kg</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="font-rajdhani text-slate-400 uppercase">Índice IMC:</span>
                        <span className="font-mono font-bold text-neon-cyan">{imc} ({imcStatus})</span>
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
                <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 shadow-tactical-card">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div>
                    <span className="text-xs font-rajdhani font-bold text-neon-cyan tracking-widest uppercase">
                      PILAR 1 // FASE B
                    </span>
                    <h2 className="text-2xl font-rajdhani font-bold text-white uppercase tracking-wide">
                      Aptitud Médica y Requisitos Legales
                    </h2>
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-amber-950/40 border border-alert-amber/40 text-alert-amber text-xs font-rajdhani font-bold uppercase tracking-wider">
                    FILTROS EXCLUYENTES
                  </div>
                </div>

                <div className="space-y-6">
                  
                  {/* Agudeza Visual */}
                  <div>
                    <label className="block text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Agudeza Visual (Ambos Ojos)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <TacticalRadioCard
                        selected={candidate.agudeza_visual_20_20 && !candidate.hasGlasses}
                        onClick={() => {
                          updateCandidate('agudeza_visual_20_20', true);
                          updateCandidate('hasGlasses', false);
                        }}
                        title="20/20 Natural Sin Lentes"
                        subtitle="Exigido para pilotos de combate EOFAP y Oficiales de Armas"
                        badge="PILOTO OK"
                      />
                      <TacticalRadioCard
                        selected={!candidate.agudeza_visual_20_20 || candidate.hasGlasses}
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

                  {/* Tatuajes Visibles */}
                  <div>
                    <label className="block text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Tatuajes en Zonas Visibles con Uniforme de Verano
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <TacticalRadioCard
                        selected={!candidate.tiene_tatuajes}
                        onClick={() => updateCandidate('tiene_tatuajes', false)}
                        title="Sin Tatuajes Visibles"
                        subtitle="Cumple la normativa de presentación reglamentaria"
                        badge="APTO"
                      />
                      <TacticalRadioCard
                        selected={candidate.tiene_tatuajes}
                        onClick={() => updateCandidate('tiene_tatuajes', true)}
                        title="Poseo Tatuajes Visibles"
                        subtitle="En cuello, brazos o piernas visibles en formación"
                        badge="OBSERVADO"
                      />
                    </div>
                  </div>

                  {/* Antecedentes */}
                  <div>
                    <label className="block text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Antecedentes Penales, Judiciales o Policiales
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <TacticalRadioCard
                        selected={!candidate.tiene_antecedentes}
                        onClick={() => updateCandidate('tiene_antecedentes', false)}
                        title="Carezco de Antecedentes"
                        subtitle="Hoja de vida intachable / Sin registros judiciales"
                        badge="APTO"
                      />
                      <TacticalRadioCard
                        selected={candidate.tiene_antecedentes}
                        onClick={() => updateCandidate('tiene_antecedentes', true)}
                        title="Registro Antecedentes"
                        subtitle="Causal directa de descalificación por ley de admisión"
                        badge="EXCLUYENTE"
                      />
                    </div>
                  </div>

                  {/* Secundaria */}
                  <div>
                    <label className="block text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Educación Secundaria Regular
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <TacticalRadioCard
                        selected={candidate.secundaria_completa}
                        onClick={() => updateCandidate('secundaria_completa', true)}
                        title="Culminada / Cursando 5to"
                        subtitle="Certificado oficial de estudios visado"
                        badge="APTO"
                      />
                      <TacticalRadioCard
                        selected={!candidate.secundaria_completa}
                        onClick={() => updateCandidate('secundaria_completa', false)}
                        title="Incompleta"
                        subtitle="No cumple requisito académico mínimo"
                        badge="NO APTO"
                      />
                    </div>
                  </div>

                </div>

                {/* Botones de Navegación y Botón Procesar Elegibilidad */}
                <div className="flex justify-between items-center pt-6 border-t border-white/10 mt-6">
                  <button
                    type="button"
                    onClick={() => goToStep(1)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-slate-400 hover:text-white font-rajdhani font-bold text-xs uppercase tracking-wider"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Volver a Biometría</span>
                  </button>

                  {/* Regla 3: Botón de "Procesar Elegibilidad" */}
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleProcessEligibility}
                    className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-extrabold text-sm uppercase tracking-wider shadow-cyan-glow-lg hover:bg-cyan-300 transition-all duration-300"
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
                        <span className={`font-bold ${candidate.agudeza_visual_20_20 ? "text-emerald-400" : "text-amber-400"}`}>
                          {candidate.agudeza_visual_20_20 ? "Normal" : "Uso de Lentes"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="font-rajdhani text-slate-400 uppercase">Sin Antecedentes:</span>
                        <span className={`font-bold ${!candidate.tiene_antecedentes ? "text-emerald-400" : "text-alert-red"}`}>
                          {!candidate.tiene_antecedentes ? "Conforme" : "Registrado"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="font-rajdhani text-slate-400 uppercase">Secundaria:</span>
                        <span className={`font-bold ${candidate.secundaria_completa ? "text-emerald-400" : "text-alert-red"}`}>
                          {candidate.secundaria_completa ? "Completa" : "Incompleta"}
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
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 text-slate-400 hover:text-white text-xs font-rajdhani font-bold uppercase tracking-wider"
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

                {/* Botón CTA para avanzar al Pilar 2 */}
                <div className="text-center pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={nextPillar}
                    className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-extrabold text-base tracking-widest uppercase shadow-cyan-glow-lg hover:bg-cyan-300 hover:scale-105 transition-all duration-300"
                  >
                    <span>INICIAR SIMULACIÓN TÁCTICA (PILAR 2: PSICOMETRÍA)</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  X,
  Target,
  BookOpen,
  Zap,
  CheckCircle2
} from 'lucide-react';

const TOUR_STEPS = [
  {
    stepIndex: 0,
    targetSelector: '#tour-stepper',
    badge: 'PASO 1 DE 3 // RUTA VOCACIONAL',
    title: 'ARQUITECTURA DE EVALUACIÓN',
    icon: Target,
    message: 'TU MISIÓN: Supera el Filtro Legal, la evaluación Psicológica y el análisis de Intereses para descubrir a qué escuela perteneces.',
    highlightLabel: 'HUD TÁCTICO · 4 FASES',
    tip: 'Visualiza en tiempo real tu avance por los 4 pilares algorítmicos.'
  },
  {
    stepIndex: 1,
    targetSelector: '#tour-navigation',
    badge: 'PASO 2 DE 3 // INTELIGENCIA ESTRATÉGICA',
    title: 'CENTRO DE INTELIGENCIA MILITAR',
    icon: BookOpen,
    message: 'INTELIGENCIA: Accede al Glosario técnico y a los PDFs originales de admisión en cualquier momento.',
    highlightLabel: 'BARRA ESTRATÉGICA',
    tip: 'Consulta las bases legales oficiales del Ejército, Marina, Fuerza Aérea y Policía.'
  },
  {
    stepIndex: 2,
    targetSelector: '#tour-start-cta',
    badge: 'PASO 3 DE 3 // DESPLIEGUE OPERATIVO',
    title: 'INICIO DE LA SIMULACIÓN',
    icon: Zap,
    message: 'ACCIÓN: Inicia tu perfilamiento aquí.',
    highlightLabel: 'DESPLIEGUE TÁCTICO',
    tip: 'Haz clic para desbloquear los parámetros antropométricos y baremos oficiales.'
  }
];

export default function TacticalOnboardingTour() {
  const { isTourOpen, tourStep, nextTourStep, prevTourStep, closeTour } = useAssessmentStore();
  const [targetRect, setTargetRect] = useState(null);

  const currentStepData = TOUR_STEPS[tourStep] || TOUR_STEPS[0];

  const updateTargetPosition = useCallback(() => {
    if (!isTourOpen) return;
    const el = document.querySelector(currentStepData.targetSelector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Dar un breve tiempo para completar el scroll suave
      setTimeout(() => {
        const rect = el.getBoundingClientRect();
        setTargetRect({
          top: rect.top - 8,
          left: rect.left - 8,
          width: rect.width + 16,
          height: rect.height + 16,
        });
      }, 200);
    } else {
      // Fallback si no encuentra el selector exacto
      setTargetRect({
        top: window.innerHeight / 2 - 60,
        left: window.innerWidth / 2 - 160,
        width: 320,
        height: 120,
      });
    }
  }, [isTourOpen, currentStepData.targetSelector]);

  useEffect(() => {
    updateTargetPosition();
    window.addEventListener('resize', updateTargetPosition);
    window.addEventListener('scroll', updateTargetPosition, true);

    const handleKeyDown = (e) => {
      if (!isTourOpen) return;
      if (e.key === 'Escape') closeTour();
      if (e.key === 'ArrowRight') nextTourStep();
      if (e.key === 'ArrowLeft') prevTourStep();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', updateTargetPosition);
      window.removeEventListener('scroll', updateTargetPosition, true);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTourOpen, tourStep, updateTargetPosition, closeTour, nextTourStep, prevTourStep]);

  if (!isTourOpen) return null;

  const handleFinishTour = () => {
    closeTour();
    // Si estamos en el último paso (botón de inicio), ejecutar el clic automáticamente
    if (tourStep === 2) {
      const ctaBtn = document.querySelector('#tour-start-cta');
      if (ctaBtn) {
        ctaBtn.click();
      }
    }
  };

  // Posicionamiento inteligente del diálogo táctico (arriba o abajo del target)
  const isBottomSpaceEnough = targetRect && targetRect.top + targetRect.height + 260 < window.innerHeight;
  const dialogTop = targetRect
    ? isBottomSpaceEnough
      ? targetRect.top + targetRect.height + 16
      : Math.max(16, targetRect.top - 240)
    : window.innerHeight / 2 - 100;

  const dialogLeft = targetRect
    ? Math.max(16, Math.min(window.innerWidth - 380, targetRect.left))
    : 16;

  const StepIcon = currentStepData.icon;

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">
      {/* 1. Máscara SVG con recorte exacto iluminado (Spotlight Cutout) */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none">
        <defs>
          <mask id="tour-spotlight-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect
                x={targetRect.left}
                y={targetRect.top}
                width={targetRect.width}
                height={targetRect.height}
                rx="16"
                ry="16"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="#0B101E"
          opacity="0.88"
          mask="url(#tour-spotlight-mask)"
        />
      </svg>

      {/* 2. Recuadro Iluminado Táctico con Pulso Neón Cian */}
      {targetRect && (
        <motion.div
          className="fixed pointer-events-none rounded-2xl border-2 border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.7)]"
          initial={false}
          animate={{
            top: targetRect.top,
            left: targetRect.left,
            width: targetRect.width,
            height: targetRect.height,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        >
          {/* Etiquetas en las cuatro esquinas estilo militar */}
          <span className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-white" />
          <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-white" />
          <span className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-white" />
          <span className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-white" />

          {/* Badge flotante sobre el elemento resaltado */}
          <div className="absolute -top-6 left-2 px-2 py-0.5 rounded bg-black/90 border border-[#00F0FF]/60 text-[#00F0FF] text-[9px] font-rajdhani font-black tracking-widest uppercase">
            {currentStepData.highlightLabel}
          </div>
        </motion.div>
      )}

      {/* 3. Tarjeta de Diálogo Táctica Flotante */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`step-${tourStep}`}
          initial={{ opacity: 0, y: 15, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          style={{
            top: `${dialogTop}px`,
            left: `${dialogLeft}px`,
          }}
          className="fixed z-50 w-[92vw] sm:w-[380px] max-w-[420px] rounded-2xl bg-[#0B101E]/95 border border-[#00F0FF]/40 backdrop-blur-xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(0,240,255,0.25)] text-white"
        >
          {/* Cabecera del Diálogo */}
          <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-[#00F0FF]/50 flex items-center justify-center text-[#00F0FF] shadow-sm">
                <StepIcon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-rajdhani font-black text-[#00F0FF] tracking-widest uppercase">
                {currentStepData.badge}
              </span>
            </div>

            <button
              type="button"
              onClick={closeTour}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/60 transition-colors cursor-pointer"
              title="Saltar Guía (ESC)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Título y Mensaje Principal */}
          <h3 className="font-rajdhani font-black text-lg text-white uppercase tracking-wider mb-2 flex items-center gap-2">
            <span>{currentStepData.title}</span>
          </h3>

          <p className="font-inter text-sm text-slate-100 font-medium leading-relaxed mb-3">
            {currentStepData.message}
          </p>

          <div className="p-2.5 rounded-xl bg-black/40 border border-gray-800/80 mb-4">
            <p className="text-[11px] font-inter text-gray-400 leading-normal">
              💡 {currentStepData.tip}
            </p>
          </div>

          {/* Footer del Diálogo: Indicadores de paso + Botones de Acción */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-800/80">
            {/* Puntos de estado */}
            <div className="flex items-center gap-1.5">
              {TOUR_STEPS.map((step) => (
                <div
                  key={step.stepIndex}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step.stepIndex === tourStep
                      ? 'w-6 bg-[#00F0FF] shadow-cyan-glow'
                      : step.stepIndex < tourStep
                      ? 'w-2 bg-emerald-400'
                      : 'w-2 bg-gray-700'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeTour}
                className="px-2.5 py-1.5 rounded-lg text-gray-400 hover:text-slate-200 text-xs font-rajdhani font-bold uppercase tracking-wider cursor-pointer"
              >
                Saltar
              </button>

              {tourStep > 0 && (
                <button
                  type="button"
                  onClick={prevTourStep}
                  className="px-3 py-1.5 rounded-lg border border-gray-700 bg-gray-900/60 text-gray-300 hover:text-white text-xs font-rajdhani font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Atrás</span>
                </button>
              )}

              {tourStep < TOUR_STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={nextTourStep}
                  className="px-3.5 py-1.5 rounded-lg bg-[#00F0FF] text-[#0B101E] font-rajdhani font-black text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all cursor-pointer shadow-cyan-glow flex items-center gap-1"
                >
                  <span>Siguiente</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinishTour}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-400 text-[#0B101E] font-rajdhani font-black text-xs uppercase tracking-wider hover:bg-emerald-300 transition-all cursor-pointer shadow-green-glow flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>¡Iniciar Misión!</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

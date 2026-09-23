import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Sparkles } from 'lucide-react';

export const TACTICAL_GLOSSARY = {
  'IPIP-NEO': {
    term: 'IPIP-NEO',
    category: 'Psicometría Científica',
    definition: 'Inventario de Personalidad de 120 ítems respaldado científicamente para evaluar los 5 grandes rasgos (Big Five): Neuroticismo, Extraversión, Apertura, Amabilidad y Responsabilidad.',
  },
  'Baremo': {
    term: 'Baremo Oficial',
    category: 'Normativa de Admisión',
    definition: 'Tabla de puntuaciones oficiales que establece el peso exacto de aciertos (+20 pts) y penalización de errores (-1.25 pts) según la institución militar.',
  },
  'Baremos': {
    term: 'Baremos Oficiales',
    category: 'Normativa de Admisión',
    definition: 'Tablas de puntuaciones oficiales que establecen la ponderación exacta de aciertos y la penalización de errores reglamentaria.',
  },
  'DECO': {
    term: 'Modelo DECO',
    category: 'Diseño Curricular',
    definition: 'Diseño de Evaluación de Competencias y Habilidades aplicado en exámenes de admisión para medir razonamiento contextualizado en situaciones operacionales reales.',
  },
  'Protocolo MIL-STD': {
    term: 'Protocolo MIL-STD',
    category: 'Estándar Militar',
    definition: 'Estándar militar unificado de requisitos físicos, psicológicos y biométricos reglamentarios de las Fuerzas Armadas del Perú.',
  },
  'MIL-STD': {
    term: 'Norma MIL-STD',
    category: 'Estándar Militar',
    definition: 'Norma militar técnica estandarizada para garantizar rigor, repetibilidad y fiabilidad en procesos de evaluación y selección castrense.',
  },
  'Big Five': {
    term: 'Big Five (Cinco Grandes)',
    category: 'Psicometría Militar',
    definition: 'Modelo de los Cinco Grandes Factores de la Personalidad reconocido internacionalmente para predecir liderazgo, templanza y resiliencia bajo presión de combate.',
  },
  'Antropometría': {
    term: 'Antropometría Militar',
    category: 'Sanidad y Aptitud',
    definition: 'Medición técnica de proporciones corporales (talla de pie, talla sentado, peso e IMC) requerida para la operación segura de aeronaves y blindados.',
  },
  'IMC': {
    term: 'IMC (Índice de Masa Corporal)',
    category: 'Biometría',
    definition: 'Relación peso/talla² calculada en el examen médico de admisión. El rango reglamentario apto en las FFAA y PNP es estrictamente de 18.5 a 27.5.',
  },
  'Nota Vigesimal': {
    term: 'Nota Vigesimal (0-20)',
    category: 'Evaluación Académica',
    definition: 'Sistema de calificación oficial de 0 a 20 puntos exigido por la Ley de Admisión Militar del Perú, con nota mínima aprobatoria de 12.00.',
  },
  'Test de Cooper': {
    term: 'Test de Cooper (2,400m)',
    category: 'Aptitud Física',
    definition: 'Prueba de resistencia aeróbica continua de 2,400 metros para medir el consumo máximo de oxígeno (VO2 máx) y la capacidad cardiopulmonar.',
  },
  'Salto de Valor': {
    term: 'Salto de Valor (5m)',
    category: 'Prueba de Temple',
    definition: 'Lanzamiento controlado desde una plataforma de 5 metros a una fosa de agua reglamentaria para medir la superación del pánico y el reflejo instantáneo de mando.',
  },
  'Pomodoro Militar': {
    term: 'Pomodoro Militar (50/10)',
    category: 'Disciplina Intelectual',
    definition: 'Técnica de enfoque extremo en bloques de 50 minutos ininterrumpidos de estudio sin pantallas, seguidos de 10 minutos de recuperación activa.',
  },
};

/**
 * Componente reutilizable de Glosario Interactivo con Tooltip táctico
 * Props:
 * - termino: string (el término a buscar o mostrar)
 * - definicion: string (opcional si existe en TACTICAL_GLOSSARY)
 * - categoria: string (opcional)
 * - children: ReactNode (opcional si se desea envolver un texto específico)
 * - className: string
 */
export default function Tooltip({
  termino = 'Baremo',
  definicion,
  categoria,
  children,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const matched = TACTICAL_GLOSSARY[termino] || {};
  const displayTerm = children || termino;
  const finalDef = definicion || matched.definition || 'Término reglamentario del sistema de admisión militar.';
  const finalCategory = categoria || matched.category || 'Glosario Táctico';

  // Cerrar al hacer clic fuera (en dispositivos móviles/táctiles)
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <span
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      {/* Texto activador con subrayado punteado táctico */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(prev => !prev);
        }}
        className="inline-flex items-center gap-0.5 underline decoration-dotted decoration-cyan-500/80 hover:decoration-solid underline-offset-4 cursor-help font-inherit text-inherit transition-all focus:outline-none focus:ring-1 focus:ring-neon-cyan/50 rounded-sm"
        title="Toca o pasa el cursor para ver la definición técnica"
        aria-expanded={isOpen}
      >
        <span>{displayTerm}</span>
        <HelpCircle className="w-3.5 h-3.5 text-cyan-400/80 inline-block ml-0.5 flex-shrink-0" />
      </button>

      {/* Globo flotante (Tooltip) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2.5 w-72 sm:w-80 p-3.5 rounded-2xl bg-[#0B101E]/95 backdrop-blur-xl border border-neon-cyan/50 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(0,240,255,0.25)] text-left z-50 pointer-events-auto"
            role="tooltip"
          >
            {/* Header del Tooltip */}
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
              <span className="text-[10px] font-teko uppercase font-bold text-neon-cyan tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-current" />
                <span>{finalCategory}</span>
              </span>
              <span className="text-[9px] font-mono text-slate-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
                GLOSARIO OFICIAL
              </span>
            </div>

            {/* Término */}
            <div className="text-sm font-rajdhani font-bold text-white uppercase tracking-wide mb-1">
              {matched.term || termino}
            </div>

            {/* Definición */}
            <p className="text-xs text-slate-200 font-inter leading-relaxed">
              {finalDef}
            </p>

            {/* Flecha indicadora inferior */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-solid border-t-[#0B101E] border-t-8 border-x-transparent border-x-8 border-b-0 filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

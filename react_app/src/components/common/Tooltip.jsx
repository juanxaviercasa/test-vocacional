import React from 'react';
import { Link } from '../../router/AppRouter';

/**
 * Diccionario centralizado de jerga técnica y militar
 */
export const TACTICAL_GLOSSARY = {
  'IPIP-NEO': {
    id: 'ipip-neo',
    termino: 'IPIP-NEO',
    categoria: 'Psicometría',
    definicion: 'Inventario de Personalidad de 120 ítems respaldado científicamente para evaluar los 5 grandes rasgos (Big Five) y calibrar la templanza del cadete ante el combate.',
    referencia: 'Goldberg, L. R. (1999) / International Personality Item Pool.'
  },
  'Baremo': {
    id: 'baremo',
    termino: 'Baremo',
    categoria: 'Admisión',
    definicion: 'Tabla de puntuaciones y ponderaciones oficiales que establece el peso exacto de aciertos (+20), errores (-1.25) y marcas físicas mínimas según la institución.',
    referencia: 'Reglamento General de Admisión a las Fuerzas Armadas del Perú (CCFFAA).'
  },
  'Baremos': {
    id: 'baremo',
    termino: 'Baremos',
    categoria: 'Admisión',
    definicion: 'Tablas de puntuaciones y ponderaciones oficiales que establecen el peso exacto de aciertos (+20), errores (-1.25) y marcas físicas mínimas según la institución.',
    referencia: 'Reglamento General de Admisión a las Fuerzas Armadas del Perú (CCFFAA).'
  },
  'DECO': {
    id: 'deco',
    termino: 'DECO',
    categoria: 'Evaluación Cognitiva',
    definicion: 'Metodología de Destrezas Cognitivas que evalúa el razonamiento crítico, contextualizado y resolución de problemas bajo estrés, en lugar de la simple memorización.',
    referencia: 'Estándar de Evaluación de Conocimientos para Academias y Escuelas Matrices.'
  },
  'Protocolo MIL-STD': {
    id: 'protocolo-mil-std',
    termino: 'Protocolo MIL-STD',
    categoria: 'Estándar Militar',
    definicion: 'Estándar de rigurosidad militar que determina umbrales estrictos de tolerancia fisiológica, disciplina operativa, estabilidad psicológica y resistencia al esfuerzo.',
    referencia: 'Military Standard Protocols / Doctrina Conjunta de las Fuerzas Armadas del Perú.'
  },
  'Big Five': {
    id: 'big-five',
    termino: 'Big Five',
    categoria: 'Psicología Militar',
    definicion: 'Modelo de los Cinco Grandes Factores de la personalidad: Neuroticismo (estabilidad), Extraversión (liderazgo), Apertura (estrategia), Amabilidad (cohesión) y Responsabilidad (disciplina).',
    referencia: 'Costa & McCrae (1992) / Adaptación para Escuelas de Oficiales y Suboficiales.'
  },
  'Antropometría': {
    id: 'antropometria',
    termino: 'Antropometría',
    categoria: 'Evaluación Médica',
    definicion: 'Medición sistemática del cuerpo humano (estatura descalzo, longitud de tronco en posición sentado, masa corporal y perímetro torácico) exigida en el examen médico.',
    referencia: 'Tabla Antropométrica Oficial MINDEF - Comando Conjunto de las FFAA.'
  },
  'IMC': {
    id: 'imc',
    termino: 'IMC (Índice de Masa Corporal)',
    categoria: 'Biometría',
    definicion: 'Razón matemática entre peso y talla al cuadrado (kg/m²). En las FFAA y PNP se exige un rango estricto entre 18.5 y 27.5 (Oficiales) o 28.0 (Suboficiales) para ser declarado Apto.',
    referencia: 'Directiva Médica General de Selección de Personal Militar y Policial.'
  },
  'Nota Vigesimal': {
    id: 'nota-vigesimal',
    termino: 'Nota Vigesimal',
    categoria: 'Calificación Académica',
    definicion: 'Escala oficial de evaluación de 0 a 20 puntos utilizada en el sistema educativo peruano y en los exámenes de conocimientos de las 8 escuelas matrices.',
    referencia: 'Nota mínima aprobatoria institucional: 12.00 puntos.'
  },
  'Test de Cooper': {
    id: 'test-de-cooper',
    termino: 'Test de Cooper (2,400 Metros)',
    categoria: 'Capacidad Física',
    definicion: 'Prueba de resistencia aeróbica y capacidad cardiopulmonar en la que el postulante debe cubrir 2,400 metros planos en pista atlética en un tiempo inferior a 9:30 - 10:30 minutos.',
    referencia: 'Directiva de Esfuerzo Físico de Admisión a Escuelas de las FFAA y PNP.'
  },
  'Salto de Valor': {
    id: 'salto-de-valor',
    termino: 'Salto de Valor',
    categoria: 'Aptitud Militar',
    definicion: 'Prueba eliminatoria de temple y ausencia de acrofobia que consiste en lanzarse desde una plataforma de 5 metros a una fosa olímpica de natación, manteniendo posición de atención.',
    referencia: 'Manual de Pruebas Físicas de la Escuela Naval del Perú y Fuerza Aérea.'
  },
  'Pomodoro Militar': {
    id: 'pomodoro-militar',
    termino: 'Pomodoro Militar (50/10)',
    categoria: 'Hábitos Tácticos',
    definicion: 'Técnica de alta concentración que consiste en 50 minutos de estudio intensivo de reactivos tipo examen con cero distracciones, seguidos de 10 minutos de calistenia o descanso activo.',
    referencia: 'Protocolo de Rendimiento Cognitivo para Cadetes de Alta Exigencia.'
  }
};

/**
 * Convierte un término a slug URL amigable
 */
export function getTermSlug(termino) {
  if (!termino) return 'glosario';
  const clean = termino.trim();
  if (TACTICAL_GLOSSARY[clean]) {
    return TACTICAL_GLOSSARY[clean].id;
  }
  return clean
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Componente <Tooltip /> refactorizado a enlace sutil con redirección y scroll suave hacia /glosario#termino
 * Elimina ventanas emergentes y modales flotantes que dañaban la legibilidad de la interfaz.
 */
export default function Tooltip({ termino, definicion, children, className = '' }) {
  const displayLabel = children || termino;
  const termSlug = getTermSlug(termino || (typeof children === 'string' ? children : ''));

  return (
    <Link
      href={`/glosario#${termSlug}`}
      title={`Ver definición oficial de "${termino || displayLabel}" en el Glosario Táctico`}
      className={`inline-flex items-center gap-0.5 text-cyan-400 dark:text-neon-cyan font-medium underline decoration-dotted decoration-cyan-500/70 underline-offset-4 hover:decoration-solid hover:text-white hover:bg-cyan-950/40 px-1 py-0.5 rounded transition-all cursor-pointer ${className}`}
    >
      <span>{displayLabel}</span>
      <span className="text-[10px] text-cyan-500/80 font-mono no-underline select-none">↗</span>
    </Link>
  );
}

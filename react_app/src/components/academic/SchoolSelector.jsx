import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import {
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';

export const MILITARY_SCHOOLS = [
  {
    id: 'EOFAP',
    sigla: 'EOFAP',
    name: 'Escuela de Oficiales de la Fuerza Aérea del Perú',
    rama: 'Fuerza Aérea del Perú',
    fuerza: 'FUERZA AÉREA',
    rango: 'Oficial',
    icono: '✈️',
    bgImage: '/assets/schools/eofap-bg.jpg',
    descripcion: 'Formación de oficiales pilotos de caza, transporte, helicópteros y defensa aérea. Evaluación rigurosa en Matemáticas (Álgebra, Geometría, Trigonometría), Física aplicada, Lenguaje, Historia del Perú y Geografía nacional.'
  },
  {
    id: 'EMCH',
    sigla: 'EMCH',
    name: 'Escuela Militar de Chorrillos',
    rama: 'Ejército del Perú',
    fuerza: 'EJÉRCITO',
    rango: 'Oficial',
    icono: '⚔️',
    bgImage: '/assets/schools/emch-bg.jpg',
    descripcion: 'Alma mater del Ejército del Perú. Forma oficiales de comando en Infantería, Caballería, Artillería, Blindados e Ingeniería. Balotario oficial en Ciencias Exactas, Historia Militar del Perú, Realidad Nacional y Aptitud Académica.'
  },
  {
    id: 'ENP',
    sigla: 'ENP',
    name: 'Escuela Naval del Perú',
    rama: 'Marina de Guerra del Perú',
    fuerza: 'MARINA',
    rango: 'Oficial',
    icono: '⚓',
    bgImage: '/assets/schools/enp-bg.jpg',
    descripcion: 'Formación de oficiales navales de comando, propulsión y maniobra en altamar. Balotario con fuerte ponderación en Cálculo, Física Clásica, Navegación, Inglés Técnico y Ciencias Marítimas para las fuerzas de superficie y submarinos.'
  },
  {
    id: 'CITEN',
    sigla: 'CITEN',
    name: 'Instituto Tecnológico Naval',
    rama: 'Marina de Guerra del Perú',
    fuerza: 'MARINA',
    rango: 'Suboficial',
    icono: '🚢',
    bgImage: '/assets/schools/citen-bg.jpg',
    descripcion: 'Centro de instrucción técnica de la Marina de Guerra del Perú. Especialidades en control de tiro, electrónica marina, sistemas de combate y telemática naval. Evaluación en Aritmética, Geometría, Física y Razonamiento Lógico.'
  },
  {
    id: 'ESOFA',
    sigla: 'ESOFA',
    name: 'Escuela de Suboficiales de la FAP',
    rama: 'Fuerza Aérea del Perú',
    fuerza: 'FUERZA AÉREA',
    rango: 'Suboficial',
    icono: '🚀',
    bgImage: '/assets/schools/esofa-bg.jpg',
    descripcion: 'Formación de suboficiales técnicos de la Fuerza Aérea del Perú. Especialistas en mantenimiento de aeronaves de combate, aviónica digital, radares y telemetría aeroespacial. Balotario en Ciencias, Electricidad y Mecánica.'
  },
  {
    id: 'ETE',
    sigla: 'ETE',
    name: 'Escuela Técnica del Ejército',
    rama: 'Ejército del Perú',
    fuerza: 'EJÉRCITO',
    rango: 'Suboficial',
    icono: '🛡️',
    bgImage: '/assets/schools/ete-bg.jpg',
    descripcion: 'Suboficiales técnicos del Ejército del Perú en armamento pesado, telecomunicaciones tácticas, mecatrónica de blindados y geomática. Examen en Matemáticas Básicas, Física, Comunicación y Cultura General.'
  },
  {
    id: 'EO_PNP',
    sigla: 'EO-PNP',
    name: 'Escuela de Oficiales PNP',
    rama: 'Policía Nacional del Perú',
    fuerza: 'POLICÍA',
    rango: 'Oficial',
    icono: '👮',
    bgImage: '/assets/schools/eo_pnp-bg.jpg',
    descripcion: 'Formación de oficiales de la Policía Nacional del Perú para el comando de unidades policiales, investigación criminalística, orden público y seguridad ciudadana. Balotario en Derecho Constitucional, DD.HH. y Realidad Nacional.'
  },
  {
    id: 'EESTP_PNP',
    sigla: 'EESTP-PNP',
    name: 'Escuela Técnico Superior PNP',
    rama: 'Policía Nacional del Perú',
    fuerza: 'POLICÍA',
    rango: 'Suboficial',
    icono: '🚓',
    bgImage: '/assets/schools/eestp_pnp-bg.jpg',
    descripcion: 'Formación de suboficiales técnicos de la Policía Nacional para patrullaje integrado, intervención táctica, tránsito y rescate de emergencia. Evaluación en Razonamiento Matemático, Verbal, Ética Policial y Geografía del Perú.'
  },
];

const FILTER_TABS = [
  { id: 'TODAS', label: 'TODAS', activeClass: 'bg-slate-900 text-white border-slate-900 dark:bg-peru-red dark:text-white dark:border-peru-red shadow-sm' },
  { id: 'EJÉRCITO', label: 'EJÉRCITO', activeClass: 'bg-[#4B5320] text-white border-[#4B5320] shadow-[0_0_15px_rgba(75,83,32,0.4)]' },
  { id: 'MARINA', label: 'MARINA', activeClass: 'bg-[#003865] text-white border-[#003865] shadow-[0_0_15px_rgba(0,56,101,0.4)]' },
  { id: 'FUERZA AÉREA', label: 'FUERZA AÉREA', activeClass: 'bg-[#0284C7] text-white border-[#0284C7] shadow-[0_0_15px_rgba(2,132,199,0.4)]' },
  { id: 'POLICÍA', label: 'POLICÍA', activeClass: 'bg-[#065F46] text-white border-[#065F46] shadow-[0_0_15px_rgba(6,95,70,0.4)]' },
];

export default function SchoolSelector({ onSelectSchool }) {
  const { highlightedSchool, academicSchool } = useAssessmentStore();
  const [activeFilter, setActiveFilter] = useState('TODAS');

  // Filtrado reactivo de las escuelas
  const filteredSchools = activeFilter === 'TODAS'
    ? MILITARY_SCHOOLS
    : MILITARY_SCHOOLS.filter(esc => esc.fuerza === activeFilter);

  // Normalizar el ID para comparación segura
  const normalizeId = (id) => String(id || '').replace(/[-_]/g, '').toUpperCase();
  const highlightedNorm = normalizeId(highlightedSchool || academicSchool);

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-6">
      
      {/* Cabecera del Módulo 2 */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-[#00F0FF] text-xs font-rajdhani font-bold uppercase tracking-widest mb-3">
          <Zap className="w-3.5 h-3.5" />
          <span>MÓDULO DE DIAGNÓSTICO ACADÉMICO · BAREMO OFICIAL</span>
        </div>

        <h1 className="font-sans font-black tracking-tight text-2xl sm:text-4xl text-slate-900 dark:text-white uppercase">
          SELECCIONA TU ESCUELA MATRIZ OBJETIVO
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 font-inter mt-2 leading-relaxed">
          Cada institución evalúa con su propio balotario temático 2026/2027. El simulador extraerá 
          <strong className="text-slate-900 dark:text-white font-semibold"> 20 reactivos equitativos</strong> con un límite de 
          <strong className="text-slate-900 dark:text-white font-semibold"> 72 segundos por reactivo</strong>. 
          Aciertos: <span className="text-emerald-600 dark:text-emerald-400 font-bold">+20 pts</span> | Errores: <span className="text-red-600 dark:text-red-400 font-bold">-1.25 pts</span>.
        </p>

        {highlightedSchool && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 text-xs font-rajdhani font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Sparkles className="w-4 h-4 text-neon-cyan animate-pulse" />
            <span>Escuela recomendada por tu test vocacional: <strong className="text-neon-cyan">{highlightedSchool}</strong></span>
          </div>
        )}
      </div>

      {/* 1. BARRA DE FILTRADO TÁCTICO HORIZONTAL (Pills) */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
        {FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 sm:px-5 py-2 rounded-xl font-rajdhani font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer border select-none ${
                isActive
                  ? tab.activeClass
                  : "bg-transparent border-slate-300 dark:border-gray-800 text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-gray-600"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 2. CUADRÍCULA EN FORMATO PANORÁMICO (2 Columnas con Tarjetas Estructuradas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredSchools.map((esc) => {
            const isHighlighted = normalizeId(esc.id) === highlightedNorm || normalizeId(esc.sigla) === highlightedNorm;

            return (
              <motion.div
                key={esc.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelectSchool(esc.sigla || esc.id)}
                className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-[#121624] border transition-all duration-300 cursor-pointer flex flex-col select-none ${
                  isHighlighted
                    ? "ring-4 ring-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.45)] border-transparent scale-[1.01]"
                    : "border-slate-200 dark:border-gray-800 shadow-md hover:shadow-2xl hover:border-slate-300 dark:hover:border-gray-700"
                }`}
              >
                {/* Badge Flotante Superior para Escuela Recomendada */}
                {isHighlighted && (
                  <div className="bg-gradient-to-r from-neon-cyan via-teal-400 to-[#00F0FF] text-night-deep font-rajdhani font-black text-xs py-1.5 px-4 text-center uppercase tracking-widest flex items-center justify-center gap-2 shadow-md z-20">
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span>RECOMENDADA POR TU TEST VOCACIONAL</span>
                  </div>
                )}

                {/* SECCIÓN SUPERIOR: FOTOGRAFÍA PANORÁMICA 16:9 AUTÉNTICA (Sin manchar la imagen) */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img
                    src={esc.bgImage}
                    alt={esc.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.classList.add('opacity-0');
                    }}
                    className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Badges superiores flotantes */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
                    <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-white border border-white/15 text-[11px] font-rajdhani font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                      <span>{esc.icono}</span>
                      <span>{esc.rama}</span>
                    </span>

                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-rajdhani font-extrabold uppercase tracking-wider backdrop-blur-md border shadow-sm ${
                      esc.rango === 'Oficial'
                        ? "bg-amber-500/25 text-amber-200 border-amber-400/40"
                        : "bg-cyan-500/25 text-cyan-200 border-cyan-400/40"
                    }`}>
                      {esc.rango.toUpperCase()}
                    </span>
                  </div>

                  {/* Franja de Título sobre la base de la fotografía */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10 flex items-end p-4">
                    <div className="flex items-baseline gap-2.5">
                      <h3 className="text-3xl font-black font-sans tracking-tight text-white leading-none drop-shadow-md">
                        {esc.sigla}
                      </h3>
                      <span className="text-xs text-gray-200 font-inter font-medium truncate max-w-[320px] drop-shadow-sm hidden sm:inline">
                        {esc.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* SECCIÓN INFERIOR: PANEL DESCRIPTIVO DEDICADO */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white dark:bg-[#121624] transition-colors duration-300">
                  <div>
                    <h4 className="text-xs font-bold font-inter text-slate-800 dark:text-gray-200 leading-snug sm:hidden mb-2">
                      {esc.name}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 font-inter leading-relaxed line-clamp-3">
                      {esc.descripcion}
                    </p>

                    {/* Metadatos Tácticos */}
                    <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-slate-100 dark:border-gray-800/80 text-[11px] font-rajdhani font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                      <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>20 Reactivos Oficiales</span>
                      </span>
                      <span className="text-slate-300 dark:text-gray-700">•</span>
                      <span className="flex items-center gap-1.5 text-cyan-600 dark:text-[#00F0FF]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>72s por Reactivo</span>
                      </span>
                    </div>
                  </div>

                  {/* Botón de Acción Táctico */}
                  <div className="mt-5 pt-1">
                    <button
                      type="button"
                      className={`w-full py-2.5 px-4 rounded-xl font-rajdhani font-bold text-xs sm:text-sm uppercase tracking-wider cursor-pointer shadow-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                        isHighlighted
                          ? "bg-neon-cyan text-night-deep hover:bg-cyan-300 shadow-cyan-glow font-black"
                          : "bg-slate-900 text-white dark:bg-[#00F0FF]/10 dark:text-[#00F0FF] dark:border dark:border-[#00F0FF]/30 group-hover:bg-peru-red dark:group-hover:bg-neon-cyan dark:group-hover:text-night-deep dark:group-hover:border-transparent group-hover:scale-[1.01]"
                      }`}
                    >
                      <span>INICIAR SIMULACRO OFICIAL</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
}

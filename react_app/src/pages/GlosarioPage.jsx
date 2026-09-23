import React, { useState, useEffect } from 'react';
import { TACTICAL_GLOSSARY } from '../components/common/Tooltip';
import { useAppRouter } from '../router/AppRouter';
import {
  BookOpen,
  Search,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Shield,
  Brain,
  Scale,
  Target,
  Activity,
  Award,
  Flame,
  Clock,
  ShieldCheck
} from 'lucide-react';

const CATEGORIES = [
  'TODAS',
  'Psicometría',
  'Admisión',
  'Evaluación Cognitiva',
  'Evaluación Médica',
  'Capacidad Física',
  'Biometría',
  'Estándar Militar'
];

/**
 * Mapeo de ilustraciones fotográficas y badges para cada término del glosario
 */
const TERM_ILLUSTRATIONS = {
  'ipip-neo': {
    image: '/assets/general/glossary-psychometrics.jpg',
    badge: 'EVALUACIÓN PSICOMÉTRICA',
    icon: Brain
  },
  'baremo': {
    image: '/assets/general/glossary-scoring-regulations.jpg',
    badge: 'REGLAMENTO & PONDERACIONES',
    icon: Scale
  },
  'deco': {
    image: '/assets/general/cadets-study-habits.jpg',
    badge: 'DESTREZAS COGNITIVAS',
    icon: Target
  },
  'protocolo-mil-std': {
    image: '/assets/general/tactical-command-room.jpg',
    badge: 'ESTÁNDAR CONJUNTO CCFFAA',
    icon: ShieldCheck
  },
  'big-five': {
    image: '/assets/general/glossary-psychometrics.jpg',
    badge: '5 GRANDES FACTORES',
    icon: Sparkles
  },
  'antropometria': {
    image: '/assets/general/biometric-check.jpg',
    badge: 'MEDICIÓN SOMÁTICA MINDEF',
    icon: Activity
  },
  'imc': {
    image: '/assets/general/biometric-check.jpg',
    badge: 'ÍNDICE BIOMÉTRICO (KG/M²)',
    icon: Activity
  },
  'nota-vigesimal': {
    image: '/assets/general/glossary-scoring-regulations.jpg',
    badge: 'ESCALA ACADÉMICA 0-20',
    icon: Award
  },
  'test-de-cooper': {
    image: '/assets/general/cadets-physical-training.jpg',
    badge: '2,400 METROS PLANOS',
    icon: Flame
  },
  'salto-de-valor': {
    image: '/assets/general/glossary-diving-valor.jpg',
    badge: 'PLATAFORMA NAVAL 5M',
    icon: ShieldCheck
  },
  'pomodoro-militar': {
    image: '/assets/general/cadets-study-habits.jpg',
    badge: 'CADENCIA OPERACIONAL 50/10',
    icon: Clock
  }
};

export default function GlosarioPage() {
  const { currentHash, navigate } = useAppRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('TODAS');
  const [highlightedId, setHighlightedId] = useState('');

  // Deduplicar términos por su ID único para evitar tarjetas repetidas
  const termsList = React.useMemo(() => {
    const uniqueTermsMap = new Map();
    Object.values(TACTICAL_GLOSSARY).forEach((term) => {
      if (term && term.id && !uniqueTermsMap.has(term.id)) {
        uniqueTermsMap.set(term.id, term);
      }
    });
    return Array.from(uniqueTermsMap.values());
  }, []);

  // Detectar y resaltar el término solicitado por el hash de la URL
  useEffect(() => {
    if (currentHash) {
      const cleanId = currentHash.replace(/^#/, '');
      setHighlightedId(cleanId);

      // Desplazamiento suave con compensación de barra superior
      const timer = setTimeout(() => {
        const el = document.getElementById(cleanId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [currentHash]);

  const filteredTerms = termsList.filter((item) => {
    const termName = item?.termino || '';
    const termDef = item?.definicion || '';
    const termCat = item?.categoria || '';

    const matchesSearch =
      termName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      termDef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      termCat.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === 'TODAS' ||
      termCat.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10">
      
      {/* Botón de Regreso y Navegación Rápida */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#141518] text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-white font-rajdhani font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Simulador Vocacional</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-rajdhani font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          <BookOpen className="w-4 h-4 text-cyan-600 dark:text-neon-cyan" />
          <span>DOCTRINA & BAREMOS // REVISIÓN TÉCNICA OFICIAL 2026</span>
        </div>
      </div>

      {/* Hero del Glosario Táctico con Fotografía de Biblioteca Doctrinal Militar */}
      <div className="relative overflow-hidden rounded-3xl text-white p-6 sm:p-10 border border-slate-700/80 dark:border-cyan-500/40 shadow-2xl transition-colors bg-night-deep min-h-[340px] flex flex-col justify-between">
        
        {/* Fotografía de Fondo: Biblioteca de Doctrina y Reglamentos Militares */}
        <img
          src="/assets/general/military-doctrine-library.jpg"
          alt="Biblioteca de Doctrina y Reglamentos Oficiales de las Fuerzas Armadas"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-105"
        />

        {/* Overlay Degradado Táctico de Alto Contraste */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B101E]/95 via-[#0B101E]/90 to-[#0B101E]/75 z-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none z-10" />

        <div className="relative z-20 space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B101E]/90 border border-neon-cyan/50 text-neon-cyan text-xs sm:text-sm font-rajdhani font-bold tracking-widest uppercase shadow-cyan-glow">
            <Sparkles className="w-4 h-4 text-neon-cyan flex-shrink-0" />
            <span>TERMINOLOGÍA MILITAR · PROTOCOLOS & MARCO DOCTRINAL</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-sans font-black text-white uppercase tracking-tight leading-tight max-w-4xl text-balance">
            <span className="block text-slate-100">GLOSARIO TÁCTICO &</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-200 mt-1">
              DOCTRINA CONCEPTUAL 2026
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-200 font-inter max-w-3xl leading-relaxed font-medium drop-shadow-sm">
            Consulta los fundamentos científicos, biométricos y doctrinales utilizados en los 4 pilares del Sistema de Admisión de las Fuerzas Armadas y Policía Nacional del Perú. Cada término cuenta con base legal, referencia metodológica y aplicación táctica.
          </p>
        </div>
      </div>

      {/* Barra de Búsqueda y Filtros de Categoría */}
      <div className="space-y-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar término (ej. IPIP-NEO, Baremo, Cooper, DECO)..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-[#121624] border border-slate-300 dark:border-gray-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base font-inter focus:outline-none focus:border-neon-cyan transition-all shadow-inner"
          />
        </div>

        {/* Categorías (Pills con contraste AAA) */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-rajdhani font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-neon-cyan text-night-deep border-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.4)] font-black'
                    : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cuadrícula Enciclopédica de Términos Ilustrados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {filteredTerms.map((item) => {
          const isTargeted = highlightedId === item.id;
          const visual = TERM_ILLUSTRATIONS[item.id] || {
            image: '/assets/general/military-doctrine-library.jpg',
            badge: item.categoria.toUpperCase(),
            icon: Shield
          };
          const IconComponent = visual.icon;

          return (
            <div
              key={item.id}
              id={item.id}
              className={`p-5 sm:p-6 rounded-3xl transition-all duration-300 border relative flex flex-col justify-between overflow-hidden group ${
                isTargeted
                  ? 'bg-cyan-50 dark:bg-cyan-950/40 border-neon-cyan ring-4 ring-cyan-500/20 dark:ring-neon-cyan/40 shadow-xl scale-[1.01]'
                  : 'bg-white dark:bg-[#121624] border-slate-200 dark:border-gray-800 hover:border-slate-300 dark:hover:border-gray-700 shadow-sm'
              }`}
            >
              <div>
                {/* Cabecera Ilustrativa Fotográfica del Término en Proporción 16:9 Natural */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 mb-4 border border-slate-200 dark:border-slate-800 shadow-inner">
                  <img
                    src={visual.image}
                    alt={item.termino}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  
                  {/* Badge de Categoría e Icono */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="p-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/20 text-cyan-300">
                      <IconComponent className="w-3.5 h-3.5" />
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/90 backdrop-blur-sm border border-cyan-400/50 text-cyan-300 text-[10px] font-rajdhani font-black tracking-wider uppercase">
                      {visual.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-300 uppercase">
                      ID: #{item.id}
                    </span>
                    <span className="text-[10px] font-rajdhani font-bold text-slate-300 uppercase bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      {item.categoria}
                    </span>
                  </div>
                </div>

                {/* Título del Término con Tipografía de Alto Impacto */}
                <h2 className="text-2xl sm:text-3xl font-rajdhani font-bold text-slate-900 dark:text-white uppercase tracking-wide leading-tight">
                  {item.termino}
                </h2>

                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-inter mt-3 leading-relaxed break-words">
                  {item.definicion}
                </p>
              </div>

              {/* Pie de tarjeta con fuente completa y enlace directo sin sobreesfuerzo */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between gap-3 text-xs font-inter text-slate-500 dark:text-slate-400">
                <div className="flex-1 break-words leading-relaxed">
                  <strong className="text-slate-700 dark:text-slate-300 font-semibold">Fuente Oficial:</strong> {item.referencia}
                </div>

                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = item.id;
                    setHighlightedId(item.id);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  title={`Enlace directo al término ${item.termino}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 text-cyan-700 dark:text-neon-cyan font-rajdhani font-bold text-xs uppercase tracking-wider transition-all border border-cyan-300 dark:border-cyan-500/40 hover:scale-[1.03] cursor-pointer flex-shrink-0 shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ver Término</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800 shadow-sm">
          <p className="text-base sm:text-lg font-rajdhani font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
            No se encontraron términos coincidentes con "{searchTerm}"
          </p>
        </div>
      )}

    </div>
  );
}

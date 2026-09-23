import React, { useState, useEffect } from 'react';
import { TACTICAL_GLOSSARY } from '../components/common/Tooltip';
import { useAppRouter, Link } from '../router/AppRouter';
import {
  BookOpen,
  Search,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Shield,
  Tag,
  CheckCircle2
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

export default function GlosarioPage() {
  const { currentHash, navigate } = useAppRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('TODAS');
  const [highlightedId, setHighlightedId] = useState('');

  const termsList = Object.values(TACTICAL_GLOSSARY);

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
    const matchesSearch =
      item.termino.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definicion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoria.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === 'TODAS' ||
      item.categoria.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Botón de Regreso y Navegación Rápida */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-rajdhani font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Simulador Vocacional</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-rajdhani font-bold text-slate-400 uppercase tracking-widest">
          <BookOpen className="w-4 h-4 text-neon-cyan" />
          <span>DOCUMENTO DOCTRINARIO // REVISIÓN TÉCNICA 2026</span>
        </div>
      </div>

      {/* Hero del Glosario Táctico */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-neon-cyan/40 p-8 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-neon-cyan/40 text-neon-cyan text-xs font-rajdhani font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TERMINOLOGÍA MILITAR & PROTOCOLOS DE EVALUACIÓN</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-sans font-black text-white uppercase tracking-tight leading-tight">
            GLOSARIO TÁCTICO & CONCEPTUAL
          </h1>

          <p className="text-base sm:text-lg text-slate-200 font-inter mt-3 leading-relaxed">
            Consulta los fundamentos científicos, biométricos y doctrinales utilizados en los 4 pilares del Sistema de Admisión de las Fuerzas Armadas y Policía Nacional del Perú.
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
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white placeholder-slate-400 text-base font-inter focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
          />
        </div>

        {/* Categorías (Pills) */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-rajdhani font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-neon-cyan text-night-deep border-neon-cyan shadow-cyan-glow font-black'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cuadrícula de Términos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTerms.map((item) => {
          const isTargeted = highlightedId === item.id;

          return (
            <div
              key={item.id}
              id={item.id}
              className={`p-6 sm:p-7 rounded-3xl transition-all duration-500 border relative flex flex-col justify-between ${
                isTargeted
                  ? 'bg-cyan-950/40 border-neon-cyan ring-4 ring-neon-cyan/40 shadow-cyan-glow scale-[1.01]'
                  : 'bg-white dark:bg-[#121624] border-slate-200 dark:border-gray-800 hover:border-slate-300 dark:hover:border-gray-700 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="px-3 py-1 rounded-lg bg-cyan-500/10 dark:bg-cyan-950/80 border border-cyan-500/30 text-cyan-600 dark:text-neon-cyan font-rajdhani font-bold text-xs uppercase tracking-wider">
                    {item.categoria}
                  </span>

                  <span className="text-[11px] font-mono text-slate-400 uppercase">
                    ID: #{item.id}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-rajdhani font-bold text-slate-900 dark:text-white uppercase tracking-wide leading-tight">
                  {item.termino}
                </h2>

                <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 font-inter mt-3 leading-relaxed">
                  {item.definicion}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-gray-800/80 flex items-center justify-between text-xs font-inter text-slate-500 dark:text-slate-400">
                <span className="truncate max-w-[280px]">
                  <strong>Fuente:</strong> {item.referencia}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.origin + `/glosario#${item.id}`);
                    setHighlightedId(item.id);
                  }}
                  title="Copiar enlace directo al término"
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800">
          <p className="text-lg font-rajdhani font-bold text-slate-400 uppercase tracking-widest">
            No se encontraron términos coincidentes con "{searchTerm}"
          </p>
        </div>
      )}

    </div>
  );
}

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
  CheckCircle2,
  Check,
  Copy
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
  const [copiedId, setCopiedId] = useState('');

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

  const handleCopyLink = (termId) => {
    const url = `${window.location.origin}/glosario#${termId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(termId);
    setHighlightedId(termId);
    setTimeout(() => {
      setCopiedId('');
    }, 2000);
  };

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

      {/* Hero del Glosario Táctico */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#101424] text-slate-900 dark:text-white p-6 sm:p-10 border border-slate-200 dark:border-gray-800 shadow-xl transition-colors">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-neon-cyan/40 text-cyan-700 dark:text-neon-cyan text-xs font-rajdhani font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TERMINOLOGÍA MILITAR & PROTOCOLOS DE EVALUACIÓN</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
            GLOSARIO TÁCTICO & CONCEPTUAL
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-inter leading-relaxed">
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

      {/* Cuadrícula de Términos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {filteredTerms.map((item) => {
          const isTargeted = highlightedId === item.id;
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              id={item.id}
              className={`p-6 sm:p-7 rounded-3xl transition-all duration-300 border relative flex flex-col justify-between ${
                isTargeted
                  ? 'bg-cyan-50 dark:bg-cyan-950/40 border-neon-cyan ring-4 ring-cyan-500/20 dark:ring-neon-cyan/40 shadow-xl scale-[1.01]'
                  : 'bg-white dark:bg-[#121624] border-slate-200 dark:border-gray-800 hover:border-slate-300 dark:hover:border-gray-700 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="px-3 py-1 rounded-lg bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 font-rajdhani font-bold text-xs uppercase tracking-wider">
                    {item.categoria}
                  </span>

                  <span className="text-[11px] font-mono text-slate-400 uppercase">
                    #{item.id}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-rajdhani font-bold text-slate-900 dark:text-white uppercase tracking-wide leading-tight">
                  {item.termino}
                </h2>

                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-inter mt-3 leading-relaxed break-words">
                  {item.definicion}
                </p>
              </div>

              {/* Pie de tarjeta con fuente completa sin truncar */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-gray-800 flex items-start justify-between gap-3 text-xs font-inter text-slate-500 dark:text-slate-400">
                <div className="flex-1 break-words leading-relaxed">
                  <strong className="text-slate-700 dark:text-slate-300 font-semibold">Fuente:</strong> {item.referencia}
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyLink(item.id)}
                  title="Copiar enlace directo al término"
                  className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors cursor-pointer flex-shrink-0 flex items-center gap-1.5"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[10px] font-rajdhani font-bold text-emerald-500 uppercase">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-rajdhani font-bold uppercase hidden xs:inline">Enlace</span>
                    </>
                  )}
                </button>
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

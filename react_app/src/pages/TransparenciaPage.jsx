import React, { useState, useEffect } from 'react';
import { OFFICIAL_PROSPECTUSES } from '../data/officialProspectusData';
import { Link } from '../router/AppRouter';
import { useAssessmentStore } from '../store/useAssessmentStore';
import {
  FileText,
  Download,
  ShieldCheck,
  Building2,
  ChevronDown,
  Search,
  BookOpen,
  Scale,
  ArrowRight,
  Layers,
  Sparkles,
  Award,
  CheckCircle2,
  FileCheck2,
  GraduationCap
} from 'lucide-react';

const BRANCHES = [
  {
    id: 'EJERCITO',
    nombre: 'Ejército del Perú',
    sigla: 'EP',
    lema: 'Hasta Quemar el Último Cartucho',
    color: '#4B5320',
    colorBorder: 'border-emerald-700/60 dark:border-[#556B2F]',
    colorBg: 'bg-emerald-900/10 dark:bg-[#556B2F]/15',
    colorText: 'text-emerald-700 dark:text-yellow-400',
    accentBadge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
    icon: '⚔️',
    escuelas: ['EMCH', 'ETE']
  },
  {
    id: 'MARINA',
    nombre: 'Marina de Guerra del Perú',
    sigla: 'MGP',
    lema: 'Morir Antes que Rendir el Pabellón',
    color: '#002B49',
    colorBorder: 'border-blue-700/60 dark:border-blue-500/50',
    colorBg: 'bg-blue-900/10 dark:bg-blue-900/20',
    colorText: 'text-blue-700 dark:text-cyan-400',
    accentBadge: 'bg-blue-950/80 text-cyan-300 border-blue-500/40',
    icon: '⚓',
    escuelas: ['ENP', 'CITEN']
  },
  {
    id: 'FAP',
    nombre: 'Fuerza Aérea del Perú',
    sigla: 'FAP',
    lema: 'Arriba, Siempre Arriba',
    color: '#00F0FF',
    colorBorder: 'border-cyan-600/60 dark:border-cyan-400/50',
    colorBg: 'bg-cyan-500/10 dark:bg-cyan-500/15',
    colorText: 'text-cyan-700 dark:text-[#00F0FF]',
    accentBadge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
    icon: '✈️',
    escuelas: ['EOFAP', 'ESOFA']
  },
  {
    id: 'PNP',
    nombre: 'Policía Nacional del Perú',
    sigla: 'PNP',
    lema: 'Dios, Patria y Ley',
    color: '#1A472A',
    colorBorder: 'border-emerald-600/60 dark:border-emerald-500/50',
    colorBg: 'bg-emerald-800/10 dark:bg-emerald-900/20',
    colorText: 'text-emerald-800 dark:text-emerald-400',
    accentBadge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
    icon: '👮',
    escuelas: ['EO_PNP', 'EESTP_PNP']
  }
];

export default function TransparenciaPage() {
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSchool, setExpandedSchool] = useState(null);
  const [viewMode, setViewMode] = useState('tree'); // 'tree' | 'cards'
  const { startAcademicDiagnostic } = useAssessmentStore();

  // Scroll suave automático al hash si se llega con #pdf-emch, etc.
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.replace(/^#/, '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setExpandedSchool(targetId.replace('pdf-', '').toUpperCase());
        }, 150);
      }
    }
  }, []);

  const filteredBranches = selectedBranch === 'ALL'
    ? BRANCHES
    : BRANCHES.filter(b => b.id === selectedBranch);

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10">
      
      {/* 1. HEADER INSTITUCIONAL DEL CENTRO DE TRANSPARENCIA */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#101424] text-slate-900 dark:text-white p-6 sm:p-10 border border-slate-200 dark:border-gray-800 shadow-xl transition-colors">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm font-rajdhani font-bold tracking-widest uppercase shadow-sm">
            <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-neon-cyan flex-shrink-0" />
            <span>ORGANIGRAMA INSTITUCIONAL DE ADMISIÓN · FUERZAS ARMADAS Y POLICÍA NACIONAL</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
            CENTRO OFICIAL DE TRANSPARENCIA Y DESCARGA DE PROSPECTOS 2026
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-inter max-w-3xl leading-relaxed">
            Estructura jerárquica y normativa legal de los procesos de admisión a las 8 Escuelas Matrices de Oficiales y Suboficiales del Perú. Los baremos de esfuerzo, tablas biométricas y temarios DECO provienen estrictamente de las resoluciones directorales vigentes.
          </p>

          {/* Buscador Rápido y Filtros Tácticos */}
          <div className="pt-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Buscador en tiempo real */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar escuela, resolución o tema..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-gray-700 text-slate-900 dark:text-white placeholder-slate-400 font-inter text-sm focus:outline-none focus:border-neon-cyan transition-colors shadow-inner"
              />
            </div>

            {/* Filtros de Fuerza Militar */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setSelectedBranch('ALL')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-rajdhani font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedBranch === 'ALL'
                    ? 'bg-neon-cyan text-night-deep shadow-[0_0_15px_rgba(0,240,255,0.4)] font-black'
                    : 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                Todas las Ramas
              </button>
              {BRANCHES.map(b => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBranch(b.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-rajdhani font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedBranch === b.id
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md font-black'
                      : 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span>{b.icon}</span>
                  <span>{b.sigla}</span>
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* 2. ESTRUCTURA JERÁRQUICA TÁCTICA */}
      <div className="space-y-6 sm:space-y-8">
        
        {/* ========================================================= */}
        {/* NIVEL 1: NODO EJECUTIVO SUPREMO (MINDEF & MININTER) */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-3xl p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#121624] border-2 border-slate-300 dark:border-cyan-500/50 text-center shadow-lg dark:shadow-[0_0_30px_rgba(0,240,255,0.15)] relative transition-all">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-peru-red text-white text-[10px] font-sans font-black uppercase tracking-widest shadow-md">
              NIVEL 1 // AUTORIDAD SUPREMA DEL ESTADO PERUANO
            </div>
            
            <div className="flex items-center justify-center gap-3 my-2">
              <span className="text-2xl select-none">🇵🇪</span>
              <Building2 className="w-6 h-6 text-cyan-600 dark:text-neon-cyan" />
              <span className="text-2xl select-none">🇵🇪</span>
            </div>

            <h2 className="text-lg sm:text-2xl font-sans font-black text-slate-900 dark:text-white uppercase tracking-tight">
              MINISTERIO DE DEFENSA & MINISTERIO DEL INTERIOR
            </h2>
            
            <p className="font-rajdhani text-xs sm:text-sm font-bold text-slate-600 dark:text-gray-300 uppercase tracking-widest mt-1">
              COMANDO CONJUNTO DE LAS FUERZAS ARMADAS (CCFFAA) · DIRECCIÓN GENERAL PNP
            </p>

            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-gray-800 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-inter">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-black/40 font-mono text-[11px]">
                ⚖️ Ley N° 29248 (Servicio Militar)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-black/40 font-mono text-[11px]">
                ⚖️ D. Leg. N° 1267 (Ley de la PNP)
              </span>
            </div>
          </div>

          {/* Tronco de Conexión SVG con Conectores Jerárquicos Dinámicos */}
          <div className="w-full max-w-4xl h-12 flex items-center justify-center relative">
            <svg className="w-full h-full" viewBox="0 0 800 48" fill="none" preserveAspectRatio="none">
              {/* Tallo Vertical Principal */}
              <line x1="400" y1="0" x2="400" y2="24" stroke="#00F0FF" strokeWidth="2.5" />
              
              {/* Bus Horizontal si se muestran todas las ramas */}
              {selectedBranch === 'ALL' ? (
                <>
                  <line x1="100" y1="24" x2="700" y2="24" stroke="#00F0FF" strokeWidth="2.5" />
                  <line x1="100" y1="24" x2="100" y2="48" stroke="#00F0FF" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="300" y1="24" x2="300" y2="48" stroke="#00F0FF" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="500" y1="24" x2="500" y2="48" stroke="#00F0FF" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="700" y1="24" x2="700" y2="48" stroke="#00F0FF" strokeWidth="2" strokeDasharray="3 3" />
                </>
              ) : (
                /* Conector Directo cuando hay 1 sola rama seleccionada */
                <line x1="400" y1="24" x2="400" y2="48" stroke="#00F0FF" strokeWidth="2.5" strokeDasharray="3 3" />
              )}
            </svg>
          </div>
        </div>

        {/* ========================================================= */}
        {/* NIVEL 2, 3 Y 4: CONTENEDOR RESPONSIVE SIN ESPACIOS VACÍOS */}
        {/* ========================================================= */}
        <div className={`grid gap-6 sm:gap-8 ${
          selectedBranch === 'ALL'
            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
            : 'max-w-4xl mx-auto grid-cols-1'
        }`}>
          {filteredBranches.map((branch) => {
            const branchProspectuses = OFFICIAL_PROSPECTUSES.filter((p) => {
              const cleanSigla = p.sigla.replace(/[-_]/g, '');
              const matchesBranch = branch.escuelas.some((e) => e.replace(/[-_]/g, '') === cleanSigla);
              if (!matchesBranch) return false;

              if (searchQuery.trim() === '') return true;
              const q = searchQuery.toLowerCase();
              return (
                p.nombre.toLowerCase().includes(q) ||
                p.sigla.toLowerCase().includes(q) ||
                p.resolucionOficial.toLowerCase().includes(q) ||
                p.prospectoTitulo.toLowerCase().includes(q)
              );
            });

            return (
              <div key={branch.id} className="flex flex-col space-y-4">
                
                {/* TARJETA DE RAMA MILITAR (NIVEL 2) */}
                <div className={`p-5 rounded-2xl bg-white dark:bg-[#121624] border-2 ${branch.colorBorder} shadow-md transition-all`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-2xl select-none">{branch.icon}</span>
                    <span className={`text-[10px] font-rajdhani font-black px-2.5 py-0.5 rounded-full ${branch.accentBadge} uppercase tracking-wider`}>
                      NIVEL 2 // RAMA
                    </span>
                  </div>

                  <h3 className="font-sans font-black text-base sm:text-lg text-slate-900 dark:text-white uppercase leading-tight">
                    {branch.nombre}
                  </h3>

                  <p className={`font-rajdhani text-xs font-bold ${branch.colorText} uppercase tracking-wider mt-1`}>
                    "{branch.lema}"
                  </p>
                </div>

                {/* Conector Vertical Hacia las Escuelas */}
                <div className="h-4 flex items-center justify-center">
                  <div className="w-0.5 h-full bg-cyan-500/50" />
                </div>

                {/* ESCUELAS Y FICHAS DE DESCARGA PDF (NIVEL 3 & 4) */}
                <div className={`gap-5 ${
                  selectedBranch !== 'ALL'
                    ? 'grid grid-cols-1 md:grid-cols-2'
                    : 'flex flex-col space-y-5'
                }`}>
                  {branchProspectuses.map((prospecto) => {
                    const isExpanded = expandedSchool === prospecto.sigla;
                    const cardAnchorId = `pdf-${prospecto.sigla.toLowerCase().replace(/[-_]/g, '')}`;
                    const isOficiales = ['EMCH', 'ENP', 'EOFAP', 'EO_PNP'].includes(prospecto.id);

                    return (
                      <div
                        key={prospecto.id}
                        id={cardAnchorId}
                        className={`rounded-2xl transition-all duration-300 overflow-hidden border flex flex-col justify-between ${
                          isExpanded
                            ? 'bg-white dark:bg-[#141926] border-neon-cyan shadow-xl scale-[1.01]'
                            : 'bg-white dark:bg-[#121624] border-slate-200 dark:border-gray-800 hover:border-slate-400 dark:hover:border-gray-700 shadow-sm'
                        }`}
                      >
                        {/* Cabecera de Escuela (Nivel 3) */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-xl select-none">{prospecto.icono}</span>
                              <span className={`text-[10px] font-rajdhani font-black px-2 py-0.5 rounded border uppercase tracking-wider ${
                                isOficiales
                                  ? 'bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border-cyan-300 dark:border-cyan-500/40'
                                  : 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-500/40'
                              }`}>
                                {isOficiales ? 'OFICIALES (5 AÑOS)' : 'SUBOFICIALES (3 AÑOS)'}
                              </span>
                            </div>

                            <div className="flex items-baseline gap-2">
                              <h4 className="font-sans font-black text-xl text-slate-900 dark:text-white uppercase tracking-tight">
                                {prospecto.sigla}
                              </h4>
                              <span className="text-xs font-rajdhani font-bold text-slate-500 dark:text-gray-400 uppercase">
                                {prospecto.fuerza}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 dark:text-slate-300 font-inter mt-1.5 leading-relaxed line-clamp-2">
                              {prospecto.nombre}
                            </p>
                          </div>

                          {/* ========================================================= */}
                          {/* NODO FINAL: DESCARGA OFICIAL DE PROSPECTO (NIVEL 4) */}
                          {/* ========================================================= */}
                          <div className="mt-5 pt-3 border-t border-slate-100 dark:border-gray-800 space-y-3">
                            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 leading-snug line-clamp-2" title={prospecto.resolucionOficial}>
                              ⚖️ {prospecto.resolucionOficial}
                            </div>

                            {/* Botón Principal de Descarga PDF */}
                            <a
                              href={prospecto.pdfUrl}
                              download={`${prospecto.sigla}_Prospecto_Oficial_2026.pdf`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-rajdhani font-black text-xs uppercase tracking-wider shadow-md hover:shadow-cyan-glow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
                            >
                              <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                              <span>Descargar Prospecto Oficial PDF</span>
                            </a>

                            {/* Acciones Secundarias: Ver Temario y Simular */}
                            <div className="flex items-center justify-between pt-1 text-xs">
                              <button
                                type="button"
                                onClick={() => setExpandedSchool(isExpanded ? null : prospecto.sigla)}
                                className="font-rajdhani font-bold text-cyan-600 dark:text-neon-cyan hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <BookOpen className="w-3 h-3" />
                                <span>{isExpanded ? 'Ocultar Temario' : 'Ver Temario Oficial'}</span>
                                <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                              </button>

                              <button
                                type="button"
                                onClick={() => startAcademicDiagnostic(prospecto.sigla)}
                                className="font-rajdhani font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                                title="Rendir simulacro de conocimientos para esta escuela"
                              >
                                <span>Simular</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Desglose Expandible de Auditoría Oficial */}
                        {isExpanded && (
                          <div className="p-4 bg-slate-50 dark:bg-black/50 border-t border-slate-200 dark:border-gray-800 text-xs font-inter space-y-2.5 text-slate-700 dark:text-slate-300">
                            <div>
                              <strong className="text-slate-900 dark:text-white block font-rajdhani text-xs uppercase tracking-wider mb-0.5">
                                📚 Balotario Oficial de Ciencias:
                              </strong>
                              <span className="leading-relaxed">{prospecto.paginasTemario}</span>
                            </div>
                            <div>
                              <strong className="text-slate-900 dark:text-white block font-rajdhani text-xs uppercase tracking-wider mb-0.5">
                                🏃 Baremos de Aptitud Física:
                              </strong>
                              <span className="leading-relaxed">{prospecto.paginasFisico}</span>
                            </div>
                            <div>
                              <strong className="text-slate-900 dark:text-white block font-rajdhani text-xs uppercase tracking-wider mb-0.5">
                                🩺 Tabla Médica Antropométrica:
                              </strong>
                              <span className="leading-relaxed">{prospecto.paginasMedico}</span>
                            </div>
                            <div className="pt-2 border-t border-slate-200 dark:border-gray-800 text-[10px] text-slate-500 font-mono">
                              Verificado con: {prospecto.notaAuditoria}
                            </div>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* 3. FOOTER DEL CENTRO DE TRANSPARENCIA */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Scale className="w-6 h-6 text-cyan-600 dark:text-neon-cyan flex-shrink-0" />
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-inter">
            Todos los reactivos y baremos están actualizados al ciclo de admisión <strong>2026/2027</strong>. Los prospectos adjuntos son propiedad institucional del Estado Peruano y se proporcionan con fines de orientación vocacional pública.
          </p>
        </div>

        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-gray-700 hover:border-cyan-500 text-xs font-rajdhani font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors whitespace-nowrap"
        >
          &larr; Volver al Test Vocacional
        </Link>
      </div>

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { OFFICIAL_PROSPECTUSES } from '../data/officialProspectusData';
import { Link } from '../router/AppRouter';
import { useAssessmentStore } from '../store/useAssessmentStore';
import {
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Building2,
  ChevronDown,
  Search,
  BookOpen,
  Scale,
  Award,
  ArrowRight,
  Flame,
  Layers,
  Compass
} from 'lucide-react';

const BRANCHES = [
  {
    id: 'EJERCITO',
    nombre: 'Ejército del Perú',
    sigla: 'EP',
    lema: 'Hasta Quemar el Último Cartucho',
    color: '#4B5320',
    colorBorder: 'border-[#556B2F]',
    colorBg: 'bg-[#556B2F]/10',
    colorText: 'text-military-olive dark:text-yellow-400',
    icon: '⚔️',
    escuelas: ['EMCH', 'ETE']
  },
  {
    id: 'MARINA',
    nombre: 'Marina de Guerra del Perú',
    sigla: 'MGP',
    lema: 'Morir Antes que Rendir el Pabellón',
    color: '#002B49',
    colorBorder: 'border-blue-700',
    colorBg: 'bg-blue-900/10',
    colorText: 'text-blue-600 dark:text-cyan-400',
    icon: '⚓',
    escuelas: ['ENP', 'CITEN']
  },
  {
    id: 'FAP',
    nombre: 'Fuerza Aérea del Perú',
    sigla: 'FAP',
    lema: 'Arriba, Siempre Arriba',
    color: '#00F0FF',
    colorBorder: 'border-cyan-500',
    colorBg: 'bg-cyan-500/10',
    colorText: 'text-cyan-600 dark:text-[#00F0FF]',
    icon: '✈️',
    escuelas: ['EOFAP', 'ESOFA']
  },
  {
    id: 'PNP',
    nombre: 'Policía Nacional del Perú',
    sigla: 'PNP',
    lema: 'Dios, Patria y Ley',
    color: '#1A472A',
    colorBorder: 'border-emerald-600',
    colorBg: 'bg-emerald-800/10',
    colorText: 'text-emerald-700 dark:text-emerald-400',
    icon: '👮',
    escuelas: ['EO_PNP', 'EESTP_PNP']
  }
];

export default function TransparenciaPage() {
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSchool, setExpandedSchool] = useState(null);
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
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-8 space-y-10">
      
      {/* 1. HEADER INSTITUCIONAL DEL CENTRO DE TRANSPARENCIA */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 sm:p-10 border border-slate-700 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B101E] via-[#0B101E]/95 to-[#0B101E]/80 z-0" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-xs sm:text-sm font-rajdhani font-bold tracking-widest uppercase shadow-sm">
            <ShieldCheck className="w-4 h-4 text-neon-cyan" />
            <span>ORGANIGRAMA INSTITUCIONAL DE ADMISIÓN · FUERZAS ARMADAS Y POLICÍA NACIONAL</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-black text-white uppercase tracking-tight leading-tight">
            CENTRO OFICIAL DE TRANSPARENCIA Y DESCARGA DE PROSPECTOS 2026
          </h1>

          <p className="text-base sm:text-lg text-slate-200 font-inter max-w-3xl leading-relaxed">
            Estructura jerárquica y normativa legal de los procesos de admisión a las 8 Escuelas Matrices de Oficiales y Suboficiales del Perú. Toda la información psicométrica, baremos físicos de combate y temarios de ciencias de esta plataforma provienen estrictamente de las resoluciones directorales y prospectos oficiales vigentes.
          </p>

          {/* Buscador Rápido y Filtros */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar escuela, resolución o tema..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 dark:bg-black/50 border border-slate-600 dark:border-gray-700 text-white placeholder-slate-400 font-inter text-sm focus:outline-none focus:border-neon-cyan transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedBranch('ALL')}
                className={`px-3.5 py-2 rounded-xl text-xs font-rajdhani font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedBranch === 'ALL'
                    ? 'bg-neon-cyan text-night-deep shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-slate-700'
                }`}
              >
                Todas las Ramas
              </button>
              {BRANCHES.map(b => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBranch(b.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-rajdhani font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedBranch === b.id
                      ? 'bg-white text-slate-900 shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-slate-700'
                  }`}
                >
                  <span className="mr-1">{b.icon}</span>
                  <span>{b.sigla}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. ORGANIGRAMA VISUAL JERÁRQUICO (4 NIVELES) */}
      <div className="space-y-8">
        
        {/* ========================================================= */}
        {/* NIVEL 1: RAÍZ INSTITUCIONAL (MINDEF & MININTER) */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-2xl p-6 rounded-3xl bg-white dark:bg-[#121624] border-2 border-slate-300 dark:border-cyan-500/40 text-center shadow-lg dark:shadow-[0_0_30px_rgba(0,240,255,0.15)] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-peru-red text-white text-[10px] font-sans font-black uppercase tracking-widest">
              NIVEL 1 · AUTORIDAD SUPREMA DEL ESTADO
            </div>
            
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-2xl">🇵🇪</span>
              <Building2 className="w-6 h-6 text-neon-cyan" />
              <span className="text-2xl">🇵🇪</span>
            </div>

            <h2 className="text-lg sm:text-2xl font-sans font-black text-slate-900 dark:text-white uppercase tracking-tight">
              MINISTERIO DE DEFENSA & MINISTERIO DEL INTERIOR
            </h2>
            <p className="font-rajdhani text-xs sm:text-sm font-bold text-slate-600 dark:text-gray-300 uppercase tracking-widest mt-1">
              COMANDO CONJUNTO DE LAS FUERZAS ARMADAS (CCFFAA) · DIRECCIÓN GENERAL PNP
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-inter mt-2 max-w-lg mx-auto">
              Marco Legal: Ley N° 29248 (Ley del Servicio Militar) y Decreto Legislativo N° 1267 (Ley de la Policía Nacional del Perú). Regulan la formación, jerarquía y captación del personal militar y policial.
            </p>
          </div>

          {/* Conector Troncal SVG hacia Nivel 2 */}
          <div className="w-full max-w-xs h-10 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 200 40" fill="none" preserveAspectRatio="none">
              <path d="M 100 0 L 100 40" stroke="#00F0FF" strokeWidth="2.5" strokeDasharray="4 4" className="animate-pulse" />
            </svg>
          </div>
        </div>

        {/* ========================================================= */}
        {/* NIVEL 2: RAMAS MILITARES Y POLICIALES */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBranches.map(branch => {
            const branchProspectuses = OFFICIAL_PROSPECTUSES.filter(p => {
              const cleanSigla = p.sigla.replace(/[-_]/g, '');
              const matchesBranch = branch.escuelas.some(e => e.replace(/[-_]/g, '') === cleanSigla);
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
                
                {/* TARJETA DE RAMA (NIVEL 2) */}
                <div className={`p-4 rounded-2xl bg-white dark:bg-[#121624] border-2 ${branch.colorBorder} shadow-md transition-all duration-300`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl select-none">{branch.icon}</span>
                    <span className="text-[10px] font-rajdhani font-black px-2 py-0.5 rounded bg-slate-100 dark:bg-black/40 text-slate-700 dark:text-gray-300 uppercase tracking-wider">
                      NIVEL 2 · FUERZA
                    </span>
                  </div>

                  <h3 className="font-sans font-black text-base sm:text-lg text-slate-900 dark:text-white uppercase leading-tight">
                    {branch.nombre}
                  </h3>

                  <p className={`font-rajdhani text-xs font-bold ${branch.colorText} uppercase tracking-wider mt-1`}>
                    "{branch.lema}"
                  </p>
                </div>

                {/* Conector Vertical hacia Nivel 3 */}
                <div className="h-6 flex items-center justify-center">
                  <div className="w-0.5 h-full bg-slate-300 dark:bg-cyan-500/60" />
                </div>

                {/* ========================================================= */}
                {/* NIVEL 3 & 4: ESCUELAS Y TARJETAS DESCARGABLES */}
                {/* ========================================================= */}
                <div className="space-y-5">
                  {branchProspectuses.map((prospecto) => {
                    const isExpanded = expandedSchool === prospecto.sigla;
                    const cardAnchorId = `pdf-${prospecto.sigla.toLowerCase().replace(/[-_]/g, '')}`;

                    return (
                      <div
                        key={prospecto.id}
                        id={cardAnchorId}
                        className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                          isExpanded
                            ? 'bg-white dark:bg-[#141926] border-neon-cyan shadow-xl scale-[1.01]'
                            : 'bg-white dark:bg-[#121624] border-slate-200 dark:border-gray-800 hover:border-slate-400 dark:hover:border-gray-700 shadow-sm'
                        }`}
                      >
                        {/* Cabecera de la Escuela (Nivel 3) */}
                        <div className="p-4 sm:p-5">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-xl select-none">{prospecto.icono}</span>
                            <span className="text-[10px] font-rajdhani font-bold px-2 py-0.5 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-500/30 uppercase tracking-widest">
                              NIVEL 3 · ESCUELA MATRIZ
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

                          <p className="text-xs text-slate-600 dark:text-slate-300 font-inter mt-1 leading-snug line-clamp-2">
                            {prospecto.nombre}
                          </p>

                          {/* ========================================================= */}
                          {/* NIVEL 4: NODO FINAL - DESCARGA DEL PROSPECTO OFICIAL */}
                          {/* ========================================================= */}
                          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-gray-800 space-y-2.5">
                            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate" title={prospecto.resolucionOficial}>
                              ⚖️ {prospecto.resolucionOficial}
                            </div>

                            {/* Botón Principal de Descarga PDF Táctico */}
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

                            <div className="flex items-center justify-between pt-1">
                              {/* Botón de Desglose de Auditoría */}
                              <button
                                type="button"
                                onClick={() => setExpandedSchool(isExpanded ? null : prospecto.sigla)}
                                className="text-[11px] font-rajdhani font-bold text-cyan-600 dark:text-neon-cyan hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <BookOpen className="w-3 h-3" />
                                <span>{isExpanded ? 'Ocultar Temario' : 'Ver Temario & Baremos'}</span>
                                <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                              </button>

                              {/* Atajo al simulador para esta escuela */}
                              <button
                                type="button"
                                onClick={() => startAcademicDiagnostic(prospecto.sigla)}
                                className="text-[11px] font-rajdhani font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 cursor-pointer"
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
                          <div className="p-4 bg-slate-50 dark:bg-black/40 border-t border-slate-200 dark:border-gray-800 text-xs font-inter space-y-2 text-slate-700 dark:text-slate-300">
                            <div>
                              <strong className="text-slate-900 dark:text-white block font-rajdhani text-xs uppercase tracking-wider mb-0.5">
                                📚 Balotario Oficial de Ciencias:
                              </strong>
                              <span>{prospecto.paginasTemario}</span>
                            </div>
                            <div>
                              <strong className="text-slate-900 dark:text-white block font-rajdhani text-xs uppercase tracking-wider mb-0.5">
                                🏃 Baremos de Aptitud Física:
                              </strong>
                              <span>{prospecto.paginasFisico}</span>
                            </div>
                            <div>
                              <strong className="text-slate-900 dark:text-white block font-rajdhani text-xs uppercase tracking-wider mb-0.5">
                                🩺 Tabla Médica Antropométrica:
                              </strong>
                              <span>{prospecto.paginasMedico}</span>
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
      <div className="p-6 rounded-2xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Scale className="w-6 h-6 text-neon-cyan flex-shrink-0" />
          <p className="text-xs text-slate-600 dark:text-slate-300 font-inter">
            Todos los reactivos y baremos están actualizados al ciclo de admisión <strong>2026/2027</strong>. Los prospectos adjuntos son propiedad intelectual de sus respectivas instituciones y se proporcionan con fines de orientación vocacional pública.
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

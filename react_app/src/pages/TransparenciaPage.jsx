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
  Sparkles,
  Award,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  Shield
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
      
      {/* 1. HEADER INSTITUCIONAL CON FOTOGRAFÍA MILITAR Y CENTRO DE PROSPECTOS */}
      <div className="relative overflow-hidden rounded-3xl text-white p-6 sm:p-10 border border-slate-700/80 dark:border-cyan-500/40 shadow-2xl transition-colors bg-night-deep min-h-[320px] flex flex-col justify-between">
        
        {/* Fotografía de Fondo: Archivo y Centro de Documentación Estratégica CCFFAA */}
        <img
          src="/assets/general/prospectus-official-library.jpg"
          alt="Centro de Documentación Estratégica y Archivo de Prospectos Oficiales"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-105"
        />

        {/* Overlay Degradado Táctico de Alto Contraste */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B101E]/95 via-[#0B101E]/90 to-[#0B101E]/75 z-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none z-10" />

        <div className="relative z-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B101E]/90 border border-neon-cyan/50 text-neon-cyan text-xs sm:text-sm font-rajdhani font-bold tracking-widest uppercase shadow-cyan-glow">
            <ShieldCheck className="w-4 h-4 text-neon-cyan flex-shrink-0" />
            <span>DESCARGA DE PROSPECTOS OFICIALES · FUERZAS ARMADAS Y POLICÍA NACIONAL</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-black text-white uppercase tracking-tight leading-tight drop-shadow-md">
            CENTRO OFICIAL DE DESCARGA DE PROSPECTOS 2026
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-200 font-inter max-w-3xl leading-relaxed font-medium drop-shadow-sm">
            Documentación técnica oficial, tablas antropométricas y temarios DECO de las 8 Escuelas Matrices de Oficiales y Suboficiales del Perú. Descarga los prospectos completos en formato PDF avalados por resoluciones de comandancia general.
          </p>

          {/* Buscador Rápido y Filtros de Fuerza Militar */}
          <div className="pt-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Buscador en tiempo real */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar escuela, resolución o tema..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white placeholder-slate-400 font-inter text-sm focus:outline-none focus:border-neon-cyan transition-colors shadow-inner"
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
                    : 'bg-black/40 hover:bg-black/60 text-slate-300 border border-slate-700'
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
                      ? 'bg-white text-slate-900 shadow-md font-black'
                      : 'bg-black/40 hover:bg-black/60 text-slate-300 border border-slate-700'
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

      {/* 2. NIVEL SUPREMO: AUTORIDAD DEL ESTADO PERUANO */}
      <div className="w-full max-w-4xl mx-auto p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#121624] border-2 border-slate-300 dark:border-cyan-500/50 text-center shadow-lg dark:shadow-[0_0_30px_rgba(0,240,255,0.15)] relative transition-all">
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-peru-red text-white text-[10px] font-sans font-black uppercase tracking-widest shadow-md">
          AUTORIDAD SUPREMA DEL ESTADO PERUANO
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
          <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-black/40 font-mono text-[11px] font-bold">
            ⚖️ Ley N° 29248 (Servicio Militar)
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-black/40 font-mono text-[11px] font-bold">
            ⚖️ D. Leg. N° 1267 (Ley de la PNP)
          </span>
          <span className="px-2.5 py-1 rounded-md bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 font-mono text-[11px] font-bold border border-cyan-200 dark:border-cyan-500/30">
            🛡️ Baremos Oficiales 2026 / 2027
          </span>
        </div>
      </div>

      {/* 3. DIRECTORIO INSTITUCIONAL DE DESCARGA DE PROSPECTOS POR FUERZA (ALINEACIÓN PROFESIONAL Y RIGUROSA) */}
      <div className="space-y-8">
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

          if (branchProspectuses.length === 0) return null;

          return (
            <div key={branch.id} className="rounded-3xl border-2 border-slate-200 dark:border-gray-800 bg-slate-50/60 dark:bg-[#0d1220]/60 p-5 sm:p-7 space-y-6 shadow-md transition-all">
              
              {/* Encabezado del Comando Institucional */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white dark:bg-[#141d30] border border-slate-300 dark:border-cyan-500/40 flex items-center justify-center text-2xl shadow-sm flex-shrink-0">
                    {branch.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-rajdhani font-black px-2 py-0.5 rounded-full ${branch.accentBadge} uppercase tracking-wider`}>
                        COMANDO INSTITUCIONAL
                      </span>
                      <span className="font-mono text-xs text-slate-500 dark:text-gray-400">
                        [{branch.sigla}]
                      </span>
                    </div>
                    <h3 className="font-sans font-black text-xl sm:text-2xl text-slate-900 dark:text-white uppercase tracking-tight">
                      {branch.nombre}
                    </h3>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className={`font-rajdhani text-xs sm:text-sm font-black ${branch.colorText} uppercase tracking-wider block`}>
                    "{branch.lema}"
                  </span>
                  <span className="text-[11px] font-inter text-slate-500 dark:text-slate-400">
                    2 Escuelas Matrices: Oficiales y Suboficiales
                  </span>
                </div>
              </div>

              {/* Cuadrícula Simétrica de las Escuelas Matrices (Misma Altura y Alineación de Botones) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {branchProspectuses.map((prospecto) => {
                  const isExpanded = expandedSchool === prospecto.sigla;
                  const cardAnchorId = `pdf-${prospecto.sigla.toLowerCase().replace(/[-_]/g, '')}`;
                  const isOficiales = ['EMCH', 'ENP', 'EOFAP', 'EO_PNP'].includes(prospecto.id);

                  return (
                    <div
                      key={prospecto.id}
                      id={cardAnchorId}
                      className={`h-full flex flex-col justify-between rounded-2xl transition-all duration-300 overflow-hidden border ${
                        isExpanded
                          ? 'bg-white dark:bg-[#141b2e] border-neon-cyan shadow-xl scale-[1.01]'
                          : 'bg-white dark:bg-[#111625] border-slate-200 dark:border-gray-800 hover:border-slate-400 dark:hover:border-cyan-500/40 shadow-sm'
                      }`}
                    >
                      {/* Cabecera y Datos de la Escuela */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Nivel de Formación */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-2xl select-none">{prospecto.icono}</span>
                            <span className={`text-[10px] font-rajdhani font-black px-2.5 py-1 rounded-full border uppercase tracking-wider ${
                              isOficiales
                                ? 'bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border-cyan-300 dark:border-cyan-500/40'
                                : 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-500/40'
                            }`}>
                              {isOficiales ? 'CARRERA DE OFICIALES (5 AÑOS)' : 'CARRERA DE SUBOFICIALES (3 AÑOS)'}
                            </span>
                          </div>

                          {/* Sigla y Nombre Oficial */}
                          <div className="min-h-[68px]">
                            <h4 className="font-sans font-black text-2xl text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
                              {prospecto.sigla}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-inter mt-1 leading-relaxed line-clamp-2">
                              {prospecto.nombre}
                            </p>
                          </div>
                        </div>

                        {/* Pie de Ficha con Resolución y Botones de Acción Estandarizados */}
                        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-gray-800 space-y-3">
                          
                          {/* Resolución Directoral Oficial */}
                          <div className="min-h-[36px] flex items-center text-[11px] font-mono text-slate-500 dark:text-slate-400 leading-snug line-clamp-2" title={prospecto.resolucionOficial}>
                            <span>⚖️ {prospecto.resolucionOficial}</span>
                          </div>

                          {/* Botón Principal: Descargar Prospecto Oficial PDF */}
                          <a
                            href={prospecto.pdfUrl}
                            download={`${prospecto.sigla}_Prospecto_Oficial_2026.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-rajdhani font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-cyan-glow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group select-none"
                          >
                            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                            <span>Descargar Prospecto Oficial PDF</span>
                          </a>

                          {/* Acciones Secundarias: Ver Temario DECO y Simular */}
                          <div className="flex items-center justify-between pt-1 text-xs">
                            <button
                              type="button"
                              onClick={() => setExpandedSchool(isExpanded ? null : prospecto.sigla)}
                              className="font-rajdhani font-bold text-cyan-600 dark:text-neon-cyan hover:underline flex items-center gap-1 cursor-pointer py-1"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>{isExpanded ? 'Ocultar Temario' : 'Ver Temario Oficial'}</span>
                              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>

                            <button
                              type="button"
                              onClick={() => startAcademicDiagnostic(prospecto.sigla)}
                              className="font-rajdhani font-bold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white flex items-center gap-1 cursor-pointer py-1 transition-colors"
                              title="Rendir simulacro de conocimientos para esta escuela"
                            >
                              <span>Simular Examen</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Desglose Expandible de Temario Oficial y Baremos */}
                      {isExpanded && (
                        <div className="p-5 bg-slate-50 dark:bg-black/60 border-t border-slate-200 dark:border-gray-800 text-xs font-inter space-y-3 text-slate-700 dark:text-slate-300 animate-in fade-in duration-200">
                          <div>
                            <strong className="text-slate-900 dark:text-white block font-rajdhani text-xs uppercase tracking-wider mb-1">
                              📚 Balotario Oficial de Ciencias:
                            </strong>
                            <p className="leading-relaxed text-slate-600 dark:text-slate-300">{prospecto.paginasTemario}</p>
                          </div>
                          <div>
                            <strong className="text-slate-900 dark:text-white block font-rajdhani text-xs uppercase tracking-wider mb-1">
                              🏃 Baremos de Aptitud Física:
                            </strong>
                            <p className="leading-relaxed text-slate-600 dark:text-slate-300">{prospecto.paginasFisico}</p>
                          </div>
                          <div>
                            <strong className="text-slate-900 dark:text-white block font-rajdhani text-xs uppercase tracking-wider mb-1">
                              🩺 Tabla Médica Antropométrica:
                            </strong>
                            <p className="leading-relaxed text-slate-600 dark:text-slate-300">{prospecto.paginasMedico}</p>
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

      {/* 4. FOOTER TÉCNICO Y RETORNO */}
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

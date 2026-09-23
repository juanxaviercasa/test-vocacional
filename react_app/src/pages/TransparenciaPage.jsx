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
  Shield,
  Activity,
  X
} from 'lucide-react';

const SCHOOL_IMAGES = {
  EMCH: '/assets/schools/emch-bg.jpg',
  ETE: '/assets/schools/ete-bg.jpg',
  ENP: '/assets/schools/enp-bg.jpg',
  CITEN: '/assets/schools/citen-bg.jpg',
  EOFAP: '/assets/schools/eofap-bg.jpg',
  ESOFA: '/assets/schools/esofa-bg.jpg',
  EO_PNP: '/assets/schools/eo_pnp-bg.jpg',
  EESTP_PNP: '/assets/schools/eestp_pnp-bg.jpg'
};

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
  const [selectedSchoolDetail, setSelectedSchoolDetail] = useState(null);
  const [detailTab, setDetailTab] = useState('temario'); // 'temario' | 'fisico' | 'medico' | 'requisitos'
  const { startAcademicDiagnostic } = useAssessmentStore();

  // Scroll suave automático al hash si se llega con #pdf-emch, etc.
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.replace(/^#/, '');
      const matched = OFFICIAL_PROSPECTUSES.find(
        (p) => `pdf-${p.sigla.toLowerCase().replace(/[-_]/g, '')}` === targetId
      );
      if (matched) {
        setSelectedSchoolDetail(matched);
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 150);
        }
      }
    }
  }, []);

  // Volver a la lista con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedSchoolDetail) {
        setSelectedSchoolDetail(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSchoolDetail]);

  const filteredBranches = selectedBranch === 'ALL'
    ? BRANCHES
    : BRANCHES.filter(b => b.id === selectedBranch);

  // =========================================================================
  // VISTA A PANTALLA COMPLETA: DESGLOSE TÉCNICO OFICIAL DEL PROSPECTO (PDF)
  // =========================================================================
  if (selectedSchoolDetail) {
    const isOficiales = ['EMCH', 'ENP', 'EOFAP', 'EO_PNP'].includes(selectedSchoolDetail.id);
    const schoolImage = SCHOOL_IMAGES[selectedSchoolDetail.id] || '/assets/general/hero-joint-forces.jpg';

    return (
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-in fade-in duration-200">
        
        {/* Barra Superior de Navegación y Retorno Rápido */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-gray-800">
          <button
            type="button"
            onClick={() => setSelectedSchoolDetail(null)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#141518] hover:border-cyan-500 text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-neon-cyan font-rajdhani font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm w-fit"
          >
            <span>&larr; Volver al Listado de Escuelas</span>
          </button>

          <div className="flex items-center gap-2.5 flex-wrap">
            <a
              href={selectedSchoolDetail.pdfUrl}
              download={`${selectedSchoolDetail.sigla}_Prospecto_Oficial_2026.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-rajdhani font-black text-xs uppercase tracking-wider shadow-md hover:shadow-cyan-glow transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Prospecto Oficial PDF</span>
            </a>

            <button
              type="button"
              onClick={() => startAcademicDiagnostic(selectedSchoolDetail.sigla)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-black text-xs uppercase tracking-wider shadow-cyan-glow hover:bg-cyan-300 transition-all cursor-pointer"
            >
              <span>Rendir Simulacro Académico</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cabecera Panorámica 16:9 de la Escuela Matriz Seleccionada */}
        <div className="relative overflow-hidden rounded-3xl bg-night-deep border border-slate-700/80 dark:border-cyan-500/40 shadow-2xl">
          <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden bg-slate-900">
            <img
              src={schoolImage}
              alt={`Campus de ${selectedSchoolDetail.nombre}`}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B101E] via-[#0B101E]/80 to-black/40" />
            
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-3">
              <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black/70 backdrop-blur-md border border-cyan-400/50 flex items-center justify-center text-3xl shadow-lg">
                {selectedSchoolDetail.icono}
              </span>
              <div>
                <span className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-rajdhani font-black uppercase tracking-wider border backdrop-blur-md ${
                  isOficiales ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50' : 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                }`}>
                  {isOficiales ? 'ESCUELA DE OFICIALES · 5 AÑOS DE FORMACIÓN' : 'ESCUELA DE SUBOFICIALES · 3 AÑOS DE FORMACIÓN'}
                </span>
                <span className="block text-xs font-mono text-slate-300 mt-1 uppercase">
                  {selectedSchoolDetail.fuerza}
                </span>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 space-y-1">
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-sans font-black text-white uppercase tracking-tight leading-tight drop-shadow-md">
                {selectedSchoolDetail.nombre}
              </h1>
              <p className="text-xs sm:text-sm font-mono text-cyan-300 flex items-center gap-2">
                <span>⚖️ {selectedSchoolDetail.resolucionOficial}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Pestañas de Navegación del Desglose Técnico Completo */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-gray-800 pb-2">
          {[
            { id: 'temario', label: '1. Temario Académico DECO', icon: BookOpen },
            { id: 'fisico', label: '2. Baremos Físicos Oficiales', icon: Activity },
            { id: 'medico', label: '3. Antropometría & Examen Médico', icon: ShieldCheck },
            { id: 'requisitos', label: '4. Requisitos & Base Legal', icon: FileCheck2 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = detailTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setDetailTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl font-rajdhani font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-neon-cyan text-night-deep border-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.4)] font-black'
                    : 'bg-white dark:bg-[#121624] border-slate-200 dark:border-gray-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* CONTENIDO DESGLOSADO DE CADA PESTAÑA */}
        <div className="bg-white dark:bg-[#121624] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-gray-800 shadow-md space-y-6">
          
          {/* TAB 1: TEMARIO ACADÉMICO DECO */}
          {detailTab === 'temario' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100 dark:border-gray-800">
                <div>
                  <h3 className="text-xl sm:text-2xl font-sans font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    Balotario de Ciencias y Letras (Metodología DECO)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-inter mt-1">
                    {selectedSchoolDetail.paginasTemario}
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-xs font-mono font-bold">
                  100 Preguntas · 3 Horas · 72s por Reactivo
                </div>
              </div>

              {/* Matriz de Materias y Contenidos Extraídos del PDF Oficial */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-gray-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-rajdhani font-bold text-base uppercase">
                    <span>📐 Álgebra, Aritmética y Trigonometría</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 font-inter list-disc list-inside">
                    <li>Ecuaciones lineales, sistemas cuadráticos y logaritmos.</li>
                    <li>Matrices, determinantes y progresiones aritméticas/geométricas.</li>
                    <li>Identidades trigonométricas fundamentales, ángulos compuestos y cónicas.</li>
                    <li>Razones, proporciones, porcentajes y regla de tres compuesta.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-gray-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-rajdhani font-bold text-base uppercase">
                    <span>⚡ Física Clásica y Mecánica</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 font-inter list-disc list-inside">
                    <li>Cinemática escalar y vectorial (MRU, MRUV, MCU, Tiro Parabólico).</li>
                    <li>Leyes de Newton, estática, dinámica lineal y fuerza de rozamiento.</li>
                    <li>Trabajo mecánico, potencia y conservación de la energía mecánica.</li>
                    <li>Hidrostática (Presión, Principio de Pascal y Arquímedes) y electrostática.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-gray-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-rajdhani font-bold text-base uppercase">
                    <span>📖 Comunicación, Razonamiento Verbal & DECO</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 font-inter list-disc list-inside">
                    <li>Comprensión lectora contextualizada bajo escenarios de resolución táctica.</li>
                    <li>Inferencias lógicas, sentido contextual y coherencia textual.</li>
                    <li>Analogías operacionales, conectores lógicos y precisión léxica.</li>
                    <li>Sintaxis, ortografía de la lengua española y redacción técnica.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-gray-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-rajdhani font-bold text-base uppercase">
                    <span>🇵🇪 Historia del Perú, Geografía y Geopolítica</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 font-inter list-disc list-inside">
                    <li>Proceso emancipador, Campañas de Junín y Ayacucho.</li>
                    <li>Guerra del Pacífico: Campaña Naval de Grau y terrestre de Bolognesi y Cáceres.</li>
                    <li>Conflictos del Cenepa y pacificación nacional.</li>
                    <li>Geografía física del Perú: relieve, fronteras territoriales y soberanía marítima.</li>
                  </ul>
                </div>

              </div>

              {/* Sistema de Calificación y Penalización Oficial */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-inter">
                  <strong className="text-amber-600 dark:text-amber-400 uppercase font-rajdhani block text-base">
                    Baremo Oficial de Calificación DECO:
                  </strong>
                  <span>• Acierto: <strong>+20.00 puntos</strong> | Error: <strong>-1.25 puntos</strong> (penalización oficial por azar) | Blanco: <strong>0.00 puntos</strong>.</span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">Nota mínima aprobatoria institucional: <strong>12.00 puntos</strong> en escala vigesimal.</span>
                </div>

                <button
                  type="button"
                  onClick={() => startAcademicDiagnostic(selectedSchoolDetail.sigla)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-night-deep font-rajdhani font-black text-xs uppercase tracking-wider shadow-md whitespace-nowrap cursor-pointer"
                >
                  Practicar con Reactivos Oficiales &rarr;
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: BAREMOS FÍSICOS OFICIALES */}
          {detailTab === 'fisico' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-slate-100 dark:border-gray-800">
                <h3 className="text-xl sm:text-2xl font-sans font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Pruebas Físicas de Esfuerzo Máximo y Tablas Oficiales
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-inter mt-1">
                  {selectedSchoolDetail.paginasFisico}
                </p>
              </div>

              {/* Grid de 4 Pruebas Físicas con Datos Oficiales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-gray-800 space-y-2">
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-2 shadow-inner">
                    <img src="/assets/general/cadets-physical-training.jpg" alt="Trote Cooper" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-rajdhani font-bold text-base text-slate-900 dark:text-white uppercase">
                    🏃 Trote de Cooper 2,400m
                  </h4>
                  <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 font-inter">
                    <div>• 20 Pts: <strong>&lt; 9 min 30 s</strong></div>
                    <div>• 16 Pts: <strong>10 min 15 s</strong></div>
                    <div>• 12 Pts (Mínimo): <strong>11 min 30 s</strong></div>
                    <div className="text-red-500 font-bold">• Descalificación: &gt; 11:31 min</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-gray-800 space-y-2">
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-2 shadow-inner">
                    <img src="/assets/general/physical-test-pullups.jpg" alt="Barras de Tracción" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-rajdhani font-bold text-base text-slate-900 dark:text-white uppercase">
                    💪 Barras Fijas de Tracción
                  </h4>
                  <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 font-inter">
                    <div>• 20 Pts: <strong>16 repeticiones</strong></div>
                    <div>• 16 Pts: <strong>12 repeticiones</strong></div>
                    <div>• 12 Pts (Mínimo): <strong>8 repeticiones</strong></div>
                    <div className="text-slate-400 text-[11px]">Estrictas, mentón sobre barra, sin balanceo.</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-gray-800 space-y-2">
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-2 shadow-inner">
                    <img src="/assets/general/physical-test-swimming.jpg" alt="Natación Militar" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-rajdhani font-bold text-base text-slate-900 dark:text-white uppercase">
                    🏊 Natación Militar Utilitaria
                  </h4>
                  <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 font-inter">
                    <div>• Distancia: <strong>50 metros libres</strong></div>
                    <div>• 20 Pts: <strong>&lt; 40 segundos</strong></div>
                    <div>• 12 Pts (Mínimo): <strong>&lt; 60 segundos</strong></div>
                    <div className="text-slate-400 text-[11px]">Estilo crol o pecho continuo sin tocar bordes.</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-gray-800 space-y-2">
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-2 shadow-inner">
                    <img src="/assets/general/glossary-diving-valor.jpg" alt="Salto de Valor" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-rajdhani font-bold text-base text-slate-900 dark:text-white uppercase">
                    🎖️ Salto de Valor (5 Metros)
                  </h4>
                  <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 font-inter">
                    <div>• Altura: <strong>5.00 metros</strong> a fosa olímpica</div>
                    <div>• Condición: <strong>Aprobado / Descalificado</strong></div>
                    <div>• Posición: <strong>Firmeza vertical</strong>, brazos pegados</div>
                    <div className="text-red-500 font-bold">• Descarte: Titubeo mayor a 3 segundos</div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: ANTROPOMETRÍA Y EXAMEN MÉDICO */}
          {detailTab === 'medico' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-slate-100 dark:border-gray-800">
                <h3 className="text-xl sm:text-2xl font-sans font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Tabla Antropométrica Oficial y Perfil de Salud
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-inter mt-1">
                  {selectedSchoolDetail.paginasMedico}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-gray-800 space-y-3">
                  <div className="text-cyan-600 dark:text-cyan-400 font-rajdhani font-bold text-lg uppercase flex items-center gap-2">
                    <span>📏 Talla Mínima Descalzo</span>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-inter">
                    <div>• Varones: <strong>1.68 m</strong> (FFAA) / <strong>1.67 m</strong> (PNP)</div>
                    <div>• Damas: <strong>1.60 m</strong> (FFAA) / <strong>1.58 m</strong> (PNP)</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                      Medido con estadiómetro calibrado y talones juntos. Cero milímetros de tolerancia por debajo de la valla.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-gray-800 space-y-3">
                  <div className="text-cyan-600 dark:text-cyan-400 font-rajdhani font-bold text-lg uppercase flex items-center gap-2">
                    <span>⚖️ Índice de Masa Corporal (IMC)</span>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-inter">
                    <div>• Oficiales: <strong>18.5 a 27.5 kg/m²</strong></div>
                    <div>• Suboficiales: <strong>18.5 a 28.0 kg/m²</strong></div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                      Descarte directo por desnutrición (IMC &lt; 18.5) o por sobrepeso/obesidad según tabla MINDEF.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-gray-800 space-y-3">
                  <div className="text-cyan-600 dark:text-cyan-400 font-rajdhani font-bold text-lg uppercase flex items-center gap-2">
                    <span>👁️ Agudeza Visual & Salud</span>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-inter">
                    <div>• Armas / Vuelo: <strong>20/20 estricto</strong> sin lentes</div>
                    <div>• Servicios / Técnica: Hasta <strong>20/40</strong> corregible</div>
                    <div>• Test de Ishihara: Visión cromática 100% normal (cero daltonismo).</div>
                  </div>
                </div>

              </div>

              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-gray-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1 font-inter">
                <strong>🩺 Batería de Exámenes Clínicos Eliminatorios:</strong>
                <p>Electrocardiograma en reposo y esfuerzo, radiografía panorámica de columna y tórax, odontología (máx. 2 piezas faltantes no contiguas) y panel toxicológico de 5 sustancias.</p>
              </div>
            </div>
          )}

          {/* TAB 4: REQUISITOS Y MARCO LEGAL */}
          {detailTab === 'requisitos' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-slate-100 dark:border-gray-800">
                <h3 className="text-xl sm:text-2xl font-sans font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Requisitos Civiles, Legales y Base Doctrinal
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-inter mt-1">
                  {selectedSchoolDetail.resolucionOficial} · {selectedSchoolDetail.notaAuditoria}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-inter">
                
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-gray-800 space-y-2">
                  <h4 className="font-rajdhani font-bold text-base text-slate-900 dark:text-white uppercase">
                    📜 Requisitos de Inscripción Obligatorios
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>Ser peruano(a) de nacimiento.</li>
                    <li>Estado civil soltero(a), sin hijos ni dependientes familiares.</li>
                    <li>Edad: Mínimo 15 años y máximo 21 años, 11 meses y 29 días al año de ingreso.</li>
                    <li>Certificados de secundaria completa visados por UGEL / MINEDU.</li>
                    <li>No haber sido separado de ninguna institución armada ni civil por sanción disciplinaria.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-gray-800 space-y-2">
                  <h4 className="font-rajdhani font-bold text-base text-slate-900 dark:text-white uppercase">
                    ⚖️ Marco Legal y Decretos Supremos
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>Ley N° 29248 (Ley del Servicio Militar) y reglamentos complementarios.</li>
                    <li>Decreto Legislativo N° 1267 (Ley de la Policía Nacional del Perú).</li>
                    <li>Directivas Generales de Admisión CCFFAA / Comando Conjunto.</li>
                    <li>Certificado de Antecedentes Policiales, Penales y Judiciales inmaculados.</li>
                  </ul>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Footer de Retorno al Listado General */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <button
            type="button"
            onClick={() => setSelectedSchoolDetail(null)}
            className="px-6 py-3 rounded-xl border border-slate-300 dark:border-gray-700 hover:border-cyan-500 font-rajdhani font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors cursor-pointer"
          >
            &larr; Volver al Listado de Escuelas
          </button>

          <a
            href={selectedSchoolDetail.pdfUrl}
            download={`${selectedSchoolDetail.sigla}_Prospecto_Oficial_2026.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-rajdhani font-black text-xs uppercase tracking-wider shadow-md hover:shadow-cyan-glow transition-all"
          >
            Descargar Documento Oficial Completo (PDF)
          </a>
        </div>

      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10">
      
      {/* 1. HEADER INSTITUCIONAL CON FOTOGRAFÍA MILITAR Y CENTRO DE PROSPECTOS */}
      <div className="relative overflow-hidden rounded-3xl text-white p-6 sm:p-10 border border-slate-700/80 dark:border-cyan-500/40 shadow-2xl transition-colors bg-night-deep min-h-[340px] flex flex-col justify-between">
        
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

          {/* Título Principal con Distribución Perfecta y Equilibrada */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-sans font-black text-white uppercase tracking-tight leading-tight drop-shadow-md max-w-4xl text-balance">
            <span className="block">CENTRO OFICIAL DE DESCARGA</span>
            <span className="block text-cyan-400 dark:text-[#00F0FF]">
              PROSPECTOS & TEMARIOS MILITARES 2026
            </span>
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

      {/* 3. DIRECTORIO INSTITUCIONAL CON FOTOGRAFÍAS REALES EN LAS 8 ESCUELAS */}
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

              {/* Cuadrícula Simétrica de Escuelas con Imágenes y Altura Idéntica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {branchProspectuses.map((prospecto) => {
                  const cardAnchorId = `pdf-${prospecto.sigla.toLowerCase().replace(/[-_]/g, '')}`;
                  const isOficiales = ['EMCH', 'ENP', 'EOFAP', 'EO_PNP'].includes(prospecto.id);
                  const schoolImage = SCHOOL_IMAGES[prospecto.id] || '/assets/general/hero-joint-forces.jpg';

                  return (
                    <div
                      key={prospecto.id}
                      id={cardAnchorId}
                      className="h-full flex flex-col justify-between rounded-2xl transition-all duration-300 overflow-hidden border bg-white dark:bg-[#111625] border-slate-200 dark:border-gray-800 hover:border-slate-400 dark:hover:border-cyan-500/50 shadow-md group"
                    >
                      {/* Cabecera Fotográfica Panorámica en Proporción 16:9 Natural */}
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-900 flex-shrink-0 shadow-inner">
                        <img
                          src={schoolImage}
                          alt={`Campus y Cadetes de ${prospecto.sigla}`}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111625] via-[#111625]/60 to-transparent z-10" />

                        {/* Badges Flotantes sobre la Fotografía */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                          <span className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-xl shadow-md">
                            {prospecto.icono}
                          </span>
                          <span className={`text-[10px] font-rajdhani font-black px-2.5 py-1 rounded-full border backdrop-blur-md uppercase tracking-wider shadow-sm ${
                            isOficiales
                              ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50'
                              : 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                          }`}>
                            {isOficiales ? 'OFICIALES · 5 AÑOS' : 'SUBOFICIALES · 3 AÑOS'}
                          </span>
                        </div>

                        {/* Rótulo de Sigla y Fuerza */}
                        <div className="absolute bottom-3 left-4 right-4 z-20">
                          <div className="flex items-baseline gap-2">
                            <h4 className="font-sans font-black text-2xl text-white uppercase tracking-tight drop-shadow-md">
                              {prospecto.sigla}
                            </h4>
                            <span className="text-xs font-rajdhani font-bold text-cyan-400 uppercase tracking-wider">
                              {prospecto.fuerza}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Cuerpo de la Tarjeta con Textos Estandarizados */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-inter leading-relaxed line-clamp-2 min-h-[40px]">
                            {prospecto.nombre}
                          </p>
                        </div>

                        {/* Pie de Tarjeta con Resolución y Acciones Estandarizadas */}
                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-gray-800 space-y-3">
                          
                          {/* Decreto Legal */}
                          <div className="min-h-[32px] flex items-center text-[11px] font-mono text-slate-500 dark:text-slate-400 leading-snug line-clamp-1" title={prospecto.resolucionOficial}>
                            <span>⚖️ {prospecto.resolucionOficial}</span>
                          </div>

                          {/* Botón Principal: Descargar PDF Oficial */}
                          <a
                            href={prospecto.pdfUrl}
                            download={`${prospecto.sigla}_Prospecto_Oficial_2026.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-rajdhani font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-cyan-glow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer select-none"
                          >
                            <Download className="w-4 h-4" />
                            <span>Descargar Prospecto Oficial PDF</span>
                          </a>

                          {/* Acciones Secundarias: Apertura de Desglose Completo y Simulación */}
                          <div className="flex items-center justify-between pt-1 text-xs">
                            <button
                              type="button"
                              onClick={() => setSelectedSchoolDetail(prospecto)}
                              className="font-rajdhani font-bold text-cyan-600 dark:text-neon-cyan hover:underline flex items-center gap-1.5 cursor-pointer py-1"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Ver Desglose Completo & Temario DECO</span>
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

                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

      {/* 5. FOOTER TÉCNICO Y RETORNO */}
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

import React, { useState } from 'react';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import { SCHOOL_PHYSICAL_BENCHMARKS, TACTICAL_STUDY_HABITS } from '../../data/strategicBenchmarks';
import Tooltip from '../common/Tooltip';
import ReproductorInstitucional from '../common/ReproductorInstitucional';
import { Link } from '../../router/AppRouter';
import {
  Award,
  BarChart3,
  Activity,
  Flame,
  Clock,
  RotateCcw,
  Printer,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Target,
  Shield,
  Dumbbell,
  BookOpen,
  FileText
} from 'lucide-react';

const SCHOOL_IMAGE_MAP = {
  EOFAP: '/assets/schools/eofap-bg.jpg',
  EMCH: '/assets/schools/emch-bg.jpg',
  ENP: '/assets/schools/enp-bg.jpg',
  CITEN: '/assets/schools/citen-bg.jpg',
  ESOFA: '/assets/schools/esofa-bg.jpg',
  ETE: '/assets/schools/ete-bg.jpg',
  EO_PNP: '/assets/schools/eo_pnp-bg.jpg',
  'EO-PNP': '/assets/schools/eo_pnp-bg.jpg',
  EESTP: '/assets/schools/eestp_pnp-bg.jpg',
  'EESTP-PNP': '/assets/schools/eestp_pnp-bg.jpg',
  EESTP_PNP: '/assets/schools/eestp_pnp-bg.jpg',
};

export default function DashboardEstrategico({ results, onRestart, onSelectOtherSchool }) {
  const { candidate, switchToModule, vocationalVerdict } = useAssessmentStore();

  if (!results) {
    return (
      <div className="max-w-xl mx-auto p-8 rounded-2xl text-center bg-white dark:bg-[#141518] border border-slate-200 dark:border-gray-800">
        <p className="text-sm font-rajdhani font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
          Generando Dashboard Estratégico de Brechas...
        </p>
      </div>
    );
  }

  const { score, schoolMeta, strongTopics, weakTopics } = results;
  const schoolSigla = schoolMeta?.sigla || 'EOFAP';
  const cleanSchoolKey = String(schoolSigla).replace(/[-_]/g, '');

  // Buscar benchmarks físicos de la escuela
  const benchmarks = SCHOOL_PHYSICAL_BENCHMARKS[cleanSchoolKey] || 
                     SCHOOL_PHYSICAL_BENCHMARKS[schoolSigla] || 
                     SCHOOL_PHYSICAL_BENCHMARKS.EOFAP;

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-6 space-y-8">
      
      {/* 1. HERO BANNER: INFORME ESTRATÉGICO Y REPORTE DE BRECHAS CON FONDO FOTOGRÁFICO */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 sm:p-8 border border-neon-cyan/40 shadow-2xl">
        {/* Imagen Fotográfica de la Escuela Seleccionada */}
        <img
          src={SCHOOL_IMAGE_MAP[schoolSigla] || '/assets/general/hero-joint-forces.jpg'}
          alt={schoolMeta.name}
          className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-transform duration-1000 scale-105"
        />
        {/* Overlays Degradados Tácticos de Alto Contraste */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B101E] via-[#0B101E]/95 to-[#0B101E]/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B101E] via-transparent to-black/40 z-10" />
        
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none z-10" />

        <div className="relative z-20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-xs sm:text-sm font-rajdhani font-bold tracking-widest uppercase mb-3 shadow-sm">
              <Zap className="w-4 h-4 text-neon-cyan" />
              <span>DASHBOARD ESTRATÉGICO · REPORTE INTEGRAL DE BRECHAS 2026/2027</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-sans font-black text-white uppercase tracking-tight leading-tight">
              PLAN DE ACCIÓN TÁCTICO · {schoolMeta.sigla}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 font-inter mt-3 max-w-2xl leading-relaxed">
              Postulante <strong className="text-white font-semibold">{candidate.nombre}</strong> (DNI: {candidate.dni}). Hemos procesado tu rendimiento en los 20 reactivos oficiales de la <strong className="text-cyan-300 font-semibold">{schoolMeta.name}</strong> bajo la metodología <Tooltip termino="DECO">DECO</Tooltip>. A continuación se detallan tus brechas académicas, metas de acondicionamiento físico reglamentario y pautas de disciplina táctica.
            </p>

            {/* Enlace Directo a Fuentes Oficiales en Centro de Transparencia y Reproductor del Himno */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href={`/transparencia#pdf-${schoolSigla.toLowerCase().replace(/[-_]/g, '')}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/70 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan hover:text-night-deep text-xs sm:text-sm font-rajdhani font-bold uppercase tracking-wider transition-all duration-200 shadow-sm"
              >
                <FileText className="w-4 h-4" />
                <span>Fuentes y Validez Oficial · Prospecto {schoolMeta.sigla} 2026</span>
              </Link>
              <ReproductorInstitucional escuela={schoolSigla} />
            </div>
          </div>

          {/* Calificación Global Vigesimal */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-black/60 border border-neon-cyan/50 shadow-cyan-glow min-w-[200px]">
            <span className="text-xs sm:text-sm font-rajdhani font-bold text-slate-300 uppercase tracking-widest">
              NOTA ACADÉMICA <Tooltip termino="Nota Vigesimal">VIGESIMAL</Tooltip>
            </span>
            <div className="text-5xl sm:text-6xl font-sans font-black text-neon-cyan my-1">
              {score.vigesimalScore.toFixed(2)}
            </div>
            <span className={`text-xs font-rajdhani font-extrabold px-3 py-1 rounded uppercase tracking-wider ${
              score.isApproved
                ? "bg-emerald-950/90 border border-emerald-500 text-emerald-400"
                : "bg-red-950/90 border border-alert-red text-alert-red"
            }`}>
              {score.isApproved ? "✓ APTO ACADÉMICO (>= 12.00)" : "EN OBSERVACIÓN (< 12.00)"}
            </span>
            <span className="text-xs text-slate-300 font-inter mt-2">
              Precisión: <strong className="text-white">{score.accuracy}%</strong> ({score.correctCount}/20 correctas)
            </span>
          </div>
        </div>
      </div>

      {/* 2. GRID PRINCIPAL DE 3 COLUMNAS: ACADÉMICA | FÍSICA | HÁBITOS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* =================================================================== */}
        {/* COLUMNA A: BRECHAS ACADÉMICAS Y TEMAS CRÍTICOS                      */}
        {/* =================================================================== */}
        <div className="rounded-2xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800 p-5 sm:p-6 shadow-sm flex flex-col justify-between h-full space-y-6 transition-colors">
          <div>
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-gray-800">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-neon-cyan flex-shrink-0">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-teko uppercase font-bold text-cyan-600 dark:text-neon-cyan tracking-widest block leading-none">
                  COLUMNA A · CONOCIMIENTOS
                </span>
                <h3 className="font-rajdhani text-base sm:text-lg font-bold text-slate-900 dark:text-white uppercase leading-none mt-0.5">
                  Diagnóstico Académico y Brechas
                </h3>
              </div>
            </div>

            {/* Gráfico de Barras de Rendimiento por Curso */}
            <div className="mt-5 space-y-3.5">
              <h4 className="text-xs font-rajdhani font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                Precisión por Materia Evaluada:
              </h4>

              {Object.entries(score.courseStats || {}).map(([course, st]) => {
                const pct = st.total > 0 ? Math.round((st.correct / st.total) * 100) : 0;
                const isGood = pct >= 60;

                return (
                  <div key={course} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-inter">
                      <span className="font-semibold text-slate-800 dark:text-gray-200 truncate max-w-[180px]" title={course}>
                        {course}
                      </span>
                      <span className="text-slate-500 dark:text-gray-400 font-mono text-[11px]">
                        {st.correct}/{st.total} ({pct}%)
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          pct >= 75
                            ? "bg-emerald-500"
                            : pct >= 50
                            ? "bg-cyan-500 dark:bg-neon-cyan"
                            : "bg-alert-red"
                        }`}
                        style={{ width: `${Math.max(5, pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Alertas: Temas a Reforzar */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-gray-800">
              <div className="flex items-center gap-1.5 text-alert-red font-rajdhani font-bold text-xs uppercase tracking-wider mb-2.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Alertas: Temas a Reforzar con Prioridad</span>
              </div>

              {weakTopics.length > 0 ? (
                <div className="space-y-2">
                  {weakTopics.slice(0, 4).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-alert-red/30 text-xs font-inter text-red-800 dark:text-red-200 flex items-start gap-2"
                    >
                      <span className="font-bold text-alert-red">•</span>
                      <div>
                        <strong className="font-semibold block">{item.topic}</strong>
                        <span className="text-[11px] text-red-600 dark:text-red-400">
                          {item.course} · Requiere revisión del balotario
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300">
                  ✓ ¡Excelente rendimiento! No se detectaron vacíos temáticos graves en este simulacro.
                </div>
              )}
            </div>

            {/* Temas Fuertes (Fortalezas) */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-gray-800">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-rajdhani font-bold text-xs uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Fortalezas Cognitivas Consolidadas</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {strongTopics.length > 0 ? (
                  strongTopics.slice(0, 4).map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-[11px] font-rajdhani font-bold uppercase text-emerald-700 dark:text-emerald-300"
                    >
                      ✓ {item.topic}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 dark:text-gray-400 font-inter italic">
                    Incrementa tus horas de estudio para consolidar materias fuertes.
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-3 text-[11px] text-slate-400 dark:text-gray-500 font-inter border-t border-slate-100 dark:border-gray-800/80">
            Ponderación balotario oficial 2026/2027.
          </div>
        </div>

        {/* =================================================================== */}
        {/* COLUMNA B: RECOMENDACIONES FÍSICAS REGLAMENTARIAS                   */}
        {/* =================================================================== */}
        <div className="rounded-2xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800 p-5 sm:p-6 shadow-sm flex flex-col justify-between h-full space-y-6 transition-colors">
          <div>
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-gray-800">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-teko uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-widest block leading-none">
                  COLUMNA B · CONDICIÓN FÍSICA
                </span>
                <h3 className="font-rajdhani text-xl md:text-2xl font-bold text-slate-900 dark:text-white uppercase leading-tight mt-0.5">
                  Estándar Físico ({schoolMeta.sigla})
                </h3>
              </div>
            </div>

            {/* Banner Fotográfico: Acondicionamiento Físico de Cadetes */}
            <div className="relative h-28 sm:h-32 w-full rounded-xl overflow-hidden mt-4 mb-3 border border-emerald-500/30">
              <img
                src="/assets/general/cadets-physical-training.jpg"
                alt="Acondicionamiento Físico de Cadetes Militares del Perú"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
                <span className="text-[10px] font-rajdhani font-black uppercase tracking-wider text-emerald-400 drop-shadow">
                  DISCIPLINA FÍSICA // BATALLÓN DE CADETES
                </span>
                <span className="text-[9px] font-mono bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40 text-emerald-300">
                  ESFUERZO MÁXIMO
                </span>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-[#181d2e] border border-slate-200 dark:border-gray-700/60 text-xs sm:text-sm">
              <span className="font-rajdhani font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                OBJETIVO OPERACIONAL PRINCIPAL:
              </span>
              <p className="text-slate-800 dark:text-slate-200 font-inter font-medium leading-relaxed">
                {benchmarks.metaPrincipal}
              </p>
            </div>

            {/* Fichas de Exigencias Físicas Específicas */}
            <div className="mt-5 space-y-3">
              {/* Trote 2,400m */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#141518]">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-rajdhani font-bold text-sm uppercase text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>🏃</span>
                    <span>Trote de Resistencia (<Tooltip termino="Test de Cooper">Test de Cooper</Tooltip> {benchmarks.trote.distancia})</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
                    {benchmarks.trote.tiempoMeta.split('(')[0]}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-inter leading-relaxed">
                  {benchmarks.trote.pauta}
                </p>
              </div>

              {/* Natación */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#141518]">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-rajdhani font-bold text-sm uppercase text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>🏊</span>
                    <span>Natación y <Tooltip termino="Salto de Valor">Salto de Valor</Tooltip> ({benchmarks.natacion.distancia})</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-600 dark:text-neon-cyan bg-cyan-50 dark:bg-cyan-950/50 px-2 py-0.5 rounded">
                    {benchmarks.natacion.tiempoMeta}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-inter leading-relaxed">
                  {benchmarks.natacion.pauta}
                </p>
              </div>

              {/* Barras Fijas */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#141518]">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-rajdhani font-bold text-sm uppercase text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>💪</span>
                    <span>{benchmarks.fuerzaTrenSuperior.ejercicio}</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-600 dark:text-yellow-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded">
                    {benchmarks.fuerzaTrenSuperior.repeticiones}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-inter leading-relaxed">
                  {benchmarks.fuerzaTrenSuperior.pauta}
                </p>
              </div>

              {/* Planchas y Abdominales */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#141518]">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-rajdhani font-bold text-sm uppercase text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>⚡</span>
                    <span>{benchmarks.flexionesAbdominales.ejercicio}</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                    {benchmarks.flexionesAbdominales.repeticiones}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-inter leading-relaxed">
                  {benchmarks.flexionesAbdominales.pauta}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 text-xs text-slate-500 dark:text-slate-400 font-inter border-t border-slate-100 dark:border-gray-800/80">
            Prueba de esfuerzo eliminatoria previa al internamiento según <Tooltip termino="Baremo">Baremo</Tooltip> oficial.
          </div>
        </div>

        {/* =================================================================== */}
        {/* COLUMNA C: HÁBITOS DE ESTUDIO TÁCTICO                               */}
        {/* =================================================================== */}
        <div className="rounded-2xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800 p-5 sm:p-6 shadow-sm flex flex-col justify-between h-full space-y-6 transition-colors">
          <div>
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-gray-800">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-yellow-400 flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-teko uppercase font-bold text-amber-600 dark:text-yellow-400 tracking-widest block leading-none">
                  COLUMNA C · DISCIPLINA Y HÁBITOS
                </span>
                <h3 className="font-rajdhani text-xl md:text-2xl font-bold text-slate-900 dark:text-white uppercase leading-tight mt-0.5">
                  Protocolos de Estudio Táctico
                </h3>
              </div>
            </div>

            {/* Banner Fotográfico: Disciplina Intelectual y Hábitos de Cadetes */}
            <div className="relative h-28 sm:h-32 w-full rounded-xl overflow-hidden mt-4 mb-3 border border-amber-500/30">
              <img
                src="/assets/general/cadets-study-habits.jpg"
                alt="Rigor Intelectual y Estudio de Cadetes Militares del Perú"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
                <span className="text-[10px] font-rajdhani font-black uppercase tracking-wider text-yellow-400 drop-shadow">
                  RIGOR INTELECTUAL // BALOTARIO Y HORAS SILLA
                </span>
                <span className="text-[9px] font-mono bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-500/40 text-yellow-300">
                  BALOTARIO 2026
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {TACTICAL_STUDY_HABITS.map((habit) => (
                <div
                  key={habit.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#141518] space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-rajdhani font-bold text-sm uppercase text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{habit.icono}</span>
                      <span>
                        {habit.id === 'pomodoro' ? (
                          <Tooltip termino="Pomodoro Militar">{habit.titulo}</Tooltip>
                        ) : (
                          habit.titulo
                        )}
                      </span>
                    </span>
                    <span className="text-[10px] font-rajdhani font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-slate-300">
                      {habit.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-inter leading-relaxed">
                    {habit.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 text-xs text-slate-500 dark:text-slate-400 font-inter border-t border-slate-100 dark:border-gray-800/80">
            Metodología de alto rendimiento para postulantes según el <Tooltip termino="Protocolo MIL-STD">Protocolo MIL-STD</Tooltip>.
          </div>
        </div>

      </div>

      {/* 3. BARRA INFERIOR DE ACCIONES */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-gray-800 no-print">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onRestart}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#141518] text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white font-rajdhani font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Repetir Simulacro {schoolMeta.sigla}</span>
          </button>

          <button
            type="button"
            onClick={onSelectOtherSchool}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#141518] text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white font-rajdhani font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Target className="w-4 h-4" />
            <span>Evaluar Otra Escuela</span>
          </button>

          <button
            type="button"
            onClick={() => setIsTransparencyOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-cyan-500/50 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-950/80 hover:text-neon-cyan font-rajdhani font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Prospecto Oficial {schoolMeta.sigla}</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#141518] text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white font-rajdhani font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Ficha Estratégica en PDF</span>
          </button>

          <button
            type="button"
            onClick={() => switchToModule('vocational')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-black text-xs sm:text-sm uppercase tracking-wider shadow-cyan-glow hover:bg-cyan-300 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Orientación Vocacional</span>
          </button>
        </div>
      </div>

    </div>
  );
}

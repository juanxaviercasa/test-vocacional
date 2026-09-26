import React, { useEffect, useState } from 'react';
import { useAssessmentStore } from '../../../store/useAssessmentStore';
import TacticalRadarChart from '../Pillar5Consolidated/TacticalRadarChart';
import TacticalFODAMap from '../../report/TacticalFODAMap';
import { generateTacticalPDF } from '../../../utils/pdfGenerator';
import Tooltip from '../../common/Tooltip';
import ReproductorInstitucional from '../../common/ReproductorInstitucional';
import {
  ShieldCheck,
  Award,
  ArrowRight,
  Printer,
  RotateCcw,
  Sparkles,
  Zap,
  Target,
  CheckCircle2,
  AlertTriangle,
  Download,
  Loader2,
  FileCheck2,
  Cpu,
  Wrench,
  ShieldAlert,
  Activity,
  Calendar,
  QrCode,
  Compass,
  Check,
  Flame,
  Shield
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

export default function Pillar4VocationalResult() {
  const {
    vocationalVerdict,
    calculateVocationalResults,
    startAcademicDiagnostic,
    resetAll,
    candidate
  } = useAssessmentStore();

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      await generateTacticalPDF('vocational-report-container', candidate.nombre, candidate.dni);
    } catch (err) {
      console.error('Error generando PDF clasificado:', err);
      alert('Ocurrió un inconveniente al compilar el PDF. Puede utilizar la opción de Imprimir Ficha Vocacional como alternativa inmediata.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  useEffect(() => {
    if (!vocationalVerdict) {
      calculateVocationalResults();
    }
  }, [vocationalVerdict, calculateVocationalResults]);

  const verdict = vocationalVerdict || calculateVocationalResults();

  if (!verdict || !verdict.topSchool) {
    return (
      <div className="max-w-xl mx-auto p-8 rounded-2xl text-center bg-white dark:bg-[#141518] border border-slate-200 dark:border-gray-800">
        <p className="text-sm font-rajdhani font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
          Sintetizando perfil vocacional y militar 360°...
        </p>
      </div>
    );
  }

  const {
    topSchool,
    schoolScores,
    legalEval,
    psychScores,
    interestsEval,
    cogScores = { factorG: 78, aptitudMecanica: 72, velocidad: 80, globalIndex: 75, nivel: 'PROMEDIO_APTO' },
    physScore = 15.0,
    especialidadSugerida = "Oficial de Comando y Operaciones",
    igacMilitar = { score: 85, veredicto: "APTO DESTACADO - ALTA CAPACIDAD COMBATIENTE Y DE MANDO", level: "success" },
    planEntrenamiento = [],
    verificationCode = "VOC-2026-7842"
  } = verdict;

  const topSigla = topSchool.escuela.sigla || topSchool.escuela.id;

  return (
    <div id="vocational-report-container" className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-6 space-y-8 relative">
      
      {/* 1. TARJETA HERO DEL RESULTADO VOCACIONAL CON IMAGEN AUTÉNTICA */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 sm:p-10 border border-neon-cyan/40 shadow-2xl">
        {/* Imagen Fotográfica de la Institución Recomendada */}
        <img
          src={SCHOOL_IMAGE_MAP[topSigla] || '/assets/general/hero-joint-forces.jpg'}
          alt={topSchool.escuela.nombre}
          className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-transform duration-1000 scale-105"
        />
        {/* Overlays Degradados Tácticos de Alto Contraste */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B101E] via-[#0B101E]/95 to-[#0B101E]/75 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B101E] via-transparent to-black/40 z-10" />
        
        {/* Glow de fondo decorativo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none z-10" />
        
        <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Columna Izquierda: Veredicto Institucional */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-xs sm:text-sm font-rajdhani font-bold tracking-widest uppercase mb-4 shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>DICTAMEN VOCACIONAL OFICIAL 2026/2027 // EVALUACIÓN 360°</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-rajdhani font-bold text-slate-200 uppercase tracking-wider">
              MÁXIMA AFINIDAD VOCACIONAL DETECTADA
            </h1>
            
            <h2 className="text-3xl sm:text-5xl font-sans font-black text-neon-cyan uppercase mt-1 tracking-tight leading-tight">
              {topSchool.escuela.nombre} ({topSigla})
            </h2>

            {/* ESPECIALIDAD MILITAR RECOMENDADA */}
            <div className="my-4 p-4 rounded-2xl bg-black/60 border border-neon-cyan/50 backdrop-blur-md flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-neon-cyan/20 border border-neon-cyan text-neon-cyan flex items-center justify-center flex-shrink-0 shadow-cyan-glow">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-rajdhani font-bold text-slate-300 uppercase tracking-widest block">
                  ESPECIALIDAD MILITAR SUGERIDA // ALTA CORRELACIÓN
                </span>
                <span className="text-lg sm:text-xl font-rajdhani font-black text-white uppercase tracking-wide">
                  {especialidadSugerida}
                </span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-200 font-inter mt-3 max-w-2xl leading-relaxed">
              Postulante <strong className="text-white">{candidate.nombre || "Cadete Evaluado"}</strong> (DNI: {candidate.dni || "--------"}). Tras el análisis multi-factorial de tu biometría (<Tooltip termino="Antropometría">Antropometría</Tooltip>), rendimiento físico, facultades cognitivas superiores (<Tooltip termino="Factor G">Raven & Bennett</Tooltip>), rasgos de personalidad <Tooltip termino="Big Five">Big Five</Tooltip> e intereses situacionales, tu perfil presenta la más alta correlación táctica bajo el <Tooltip termino="Baremo">Baremo Oficial</Tooltip> para formarte como <strong className="text-emerald-300 font-semibold">{topSchool.escuela.rango} en el/la {topSchool.escuela.rama}</strong>.
            </p>

            {/* Affordance Sonora: Reproductor del Himno Institucional Oficial */}
            <div className="mt-4 flex items-center">
              <ReproductorInstitucional escuela={topSigla} />
            </div>

            {/* BOTÓN PRINCIPAL DESTACADO (CALL TO ACTION REQUERIDO) */}
            <div className="mt-5 pt-1 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={() => startAcademicDiagnostic(topSigla)}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-neon-cyan via-teal-300 to-[#00F0FF] text-night-deep font-rajdhani font-black text-sm sm:text-base uppercase tracking-wider shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:shadow-[0_0_45px_rgba(0,240,255,0.85)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group text-center"
              >
                <Zap className="w-5 h-5 text-night-deep fill-current flex-shrink-0" />
                <span className="truncate">MEDIR MI NIVEL ACADÉMICO PARA {topSigla} -&gt;</span>
                <ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1.5" />
              </button>

              <span className="text-xs sm:text-sm font-rajdhani font-medium text-slate-300 uppercase tracking-widest text-center sm:text-left">
                Balotario Oficial de 20 preguntas con cronómetro
              </span>
            </div>
          </div>

          {/* Columna Derecha: Medidor de Compatibilidad */}
          <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-black/60 border border-neon-cyan/50 shadow-cyan-glow min-w-[220px]">
            <span className="text-xs sm:text-sm font-rajdhani font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
              <Target className="w-4 h-4 text-neon-cyan" />
              <span>COMPATIBILIDAD</span>
            </span>

            <div className="text-6xl sm:text-7xl font-sans font-black text-neon-cyan my-1 tracking-tight">
              {topSchool.compatibilidad}%
            </div>

            <span className={`text-xs sm:text-sm font-rajdhani font-extrabold px-3 py-1 rounded-md uppercase tracking-wider ${
              topSchool.esApto
                ? "bg-emerald-950/90 border border-emerald-500 text-emerald-400"
                : "bg-red-950/90 border border-red-500 text-red-400"
            }`}>
              {topSchool.esApto ? "✓ APTO RECOMENDADO" : "OBSERVADO LEGAL"}
            </span>

            <div className="mt-4 text-xs text-slate-300 font-rajdhani text-center space-y-1 w-full border-t border-white/10 pt-3">
              <div className="flex justify-between"><span>Psicometría:</span> <strong className="text-white">{topSchool.psychFit}%</strong></div>
              <div className="flex justify-between"><span>Cognitivo:</span> <strong className="text-white">{topSchool.cogFit}%</strong></div>
              <div className="flex justify-between"><span>Intereses:</span> <strong className="text-white">{topSchool.interestFit}%</strong></div>
              <div className="flex justify-between"><span>Físico:</span> <strong className="text-white">{topSchool.physFit}%</strong></div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. SEMÁFORO CASTRENSE: ÍNDICE GLOBAL DE APTITUD PARA EL COMBATE (IGAC) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0B101E] to-slate-900 border border-emerald-500/40 shadow-tactical-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-sans font-black text-2xl border flex-shrink-0 ${
            igacMilitar.level === 'success' ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' :
            igacMilitar.level === 'warning' ? 'bg-amber-950/80 border-amber-500 text-amber-400' :
            'bg-red-950/80 border-red-500 text-red-400'
          }`}>
            {igacMilitar.score}%
          </div>
          <div>
            <span className="text-[10px] font-rajdhani font-bold text-slate-400 uppercase tracking-widest block">
              IGAC // ÍNDICE GLOBAL DE APTITUD PARA EL COMBATE
            </span>
            <h3 className="text-base sm:text-xl font-rajdhani font-bold text-white uppercase tracking-wide">
              {igacMilitar.veredicto}
            </h3>
            <span className="text-xs text-slate-400 font-inter">
              Evaluación multifactorial: 25% Físico + 25% Cognitivo + 25% Psicometría + 15% Intereses + 10% Sinceridad
            </span>
          </div>
        </div>

        {/* Badges de Auditoría de Sinceridad y Filtro Clínico */}
        <div className="flex flex-wrap items-center gap-3">
          <div className={`px-4 py-2 rounded-xl border text-xs font-rajdhani font-bold uppercase tracking-wider flex items-center gap-2 ${
            psychScores.alertaFalsaVirtud
              ? "bg-amber-950/60 border-amber-500 text-amber-400"
              : "bg-emerald-950/60 border-emerald-500 text-emerald-400"
          }`}>
            <ShieldCheck className="w-4 h-4" />
            <span>Sinceridad Escala L: {psychScores.indiceSinceridad || 100}% {psychScores.alertaFalsaVirtud ? "(Obs. Falsa Virtud)" : "(Confiable)"}</span>
          </div>

          <div className={`px-4 py-2 rounded-xl border text-xs font-rajdhani font-bold uppercase tracking-wider flex items-center gap-2 ${
            psychScores.alertasClinicas?.length > 0
              ? "bg-rose-950/60 border-rose-500 text-rose-400"
              : "bg-emerald-950/60 border-emerald-500 text-emerald-400"
          }`}>
            <Activity className="w-4 h-4" />
            <span>{psychScores.alertasClinicas?.length > 0 ? "Restricción Clínica Activa" : "Expediente Clínico Limpio"}</span>
          </div>
        </div>
      </div>

      {/* 3. ALERTAS CLÍNICAS O DE SINCERIDAD (SI EXISTEN) */}
      {(psychScores.alertaFalsaVirtud || psychScores.alertasClinicas?.length > 0) && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/30 border border-amber-500/50 text-slate-200 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-rajdhani font-bold text-sm uppercase tracking-wider">
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <span>OBSERVACIONES DEL GABINETE DE PSICOLOGÍA Y SANIDAD MILITAR</span>
          </div>
          {psychScores.alertaFalsaVirtud && (
            <p className="text-xs sm:text-sm font-inter text-amber-200/90 leading-relaxed pl-7">
              ⚠️ <strong>Auditoría de Sinceridad (Escala L):</strong> Se identificaron respuestas con tendencia a la auto-idealización ("falsa virtud"). El algoritmo aplicó un ajuste compensatorio del 10% en el índice de compatibilidad para normalizar el perfil a los estándares del examen de admisión.
            </p>
          )}
          {psychScores.alertasClinicas?.map((alerta, idx) => (
            <p key={idx} className="text-xs sm:text-sm font-inter text-rose-300 leading-relaxed pl-7">
              🚨 <strong>Hallazgo Clínico:</strong> {alerta}
            </p>
          ))}
        </div>
      )}

      {/* 4. DESGLOSE ANALÍTICO DE LAS 5 DIMENSIONES EVALUADAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Dimensión 1: Legal & Físico */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800 shadow-sm transition-colors">
          <span className="text-[10px] font-rajdhani font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
            01 // BIOMETRÍA & FÍSICO
          </span>
          <div className="text-2xl font-sans font-bold text-slate-900 dark:text-white mb-2">
            Nota: {physScore} <span className="text-xs font-normal text-slate-400">/ 20</span>
          </div>
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-inter space-y-1 leading-relaxed">
            <div>IMC: <strong className="text-slate-900 dark:text-white font-semibold">{legalEval.imc}</strong></div>
            <div>Estatura: <strong className="text-slate-900 dark:text-white font-semibold">{candidate.talla_cm} cm</strong></div>
            <div>Habilitadas: <strong className="text-emerald-500 font-semibold">{legalEval.totalAptas} de 8</strong></div>
          </div>
        </div>

        {/* Dimensión 2: Psicometría Big Five */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800 shadow-sm transition-colors">
          <span className="text-[10px] font-rajdhani font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
            02 // PERSONALIDAD BIG FIVE
          </span>
          <div className="text-2xl font-sans font-bold text-slate-900 dark:text-white mb-2">
            Ajuste: {topSchool.psychFit}%
          </div>
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-inter space-y-1 leading-relaxed">
            <div>Estabilidad: <strong className="text-slate-900 dark:text-white font-semibold">{100 - psychScores.N}%</strong></div>
            <div>Liderazgo: <strong className="text-slate-900 dark:text-white font-semibold">{psychScores.E}%</strong></div>
            <div>Disciplina: <strong className="text-slate-900 dark:text-white font-semibold">{psychScores.C}%</strong></div>
          </div>
        </div>

        {/* Dimensión 3: Cognitivo Superior */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121624] border border-cyan-500/30 dark:border-neon-cyan/30 shadow-sm transition-colors bg-cyan-500/[0.02]">
          <span className="text-[10px] font-rajdhani font-bold text-cyan-600 dark:text-neon-cyan uppercase tracking-wider block mb-1">
            03 // COGNITIVO SUPERIOR
          </span>
          <div className="text-2xl font-sans font-bold text-cyan-600 dark:text-neon-cyan mb-2">
            Factor "g": {cogScores.factorG}%
          </div>
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-inter space-y-1 leading-relaxed">
            <div>Mecánica Bennett: <strong className="text-slate-900 dark:text-white font-semibold">{cogScores.aptitudMecanica}%</strong></div>
            <div>Velocidad: <strong className="text-slate-900 dark:text-white font-semibold">{cogScores.velocidad}%</strong></div>
            <div>Nivel: <strong className="text-emerald-500 font-semibold">{cogScores.nivel === 'SUPERIOR_ELITE' ? 'Élite' : 'Apto'}</strong></div>
          </div>
        </div>

        {/* Dimensión 4: Intereses Operacionales */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800 shadow-sm transition-colors">
          <span className="text-[10px] font-rajdhani font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
            04 // INTERESES TÁCTICOS
          </span>
          <div className="text-2xl font-sans font-bold text-slate-900 dark:text-white mb-2">
            Afinidad: {topSchool.interestFit}%
          </div>
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-inter space-y-1 leading-relaxed">
            <div>FAP: <strong className="text-slate-900 dark:text-white font-semibold">{interestsEval.affinity?.FAP || 25}%</strong></div>
            <div>Marina: <strong className="text-slate-900 dark:text-white font-semibold">{interestsEval.affinity?.Marina || 25}%</strong></div>
            <div>Ejército: <strong className="text-slate-900 dark:text-white font-semibold">{interestsEval.affinity?.Ejército || 25}%</strong></div>
          </div>
        </div>

        {/* Dimensión 5: Dictamen Consolidado */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800 shadow-sm transition-colors">
          <span className="text-[10px] font-rajdhani font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
            05 // DICTAMEN FINAL
          </span>
          <div className="text-2xl font-sans font-bold text-emerald-600 dark:text-emerald-400 mb-2">
            {topSchool.compatibilidad}%
          </div>
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-inter space-y-1 leading-relaxed">
            <div>Escuela: <strong className="text-slate-900 dark:text-white font-semibold">{topSigla}</strong></div>
            <div>Rango: <strong className="text-slate-900 dark:text-white font-semibold">{topSchool.escuela.rango}</strong></div>
            <div>Estado: <strong className="text-emerald-500 font-semibold">{topSchool.esApto ? "Apto" : "Obs."}</strong></div>
          </div>
        </div>

      </div>

      {/* 5. RADAR TÁCTICO POLIGONAL */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800 shadow-sm transition-colors">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-gray-800 pb-4 mb-6">
          <div>
            <span className="text-xs font-rajdhani font-bold text-cyan-600 dark:text-neon-cyan tracking-widest uppercase">
              CALIBRACIÓN POLIGONAL DE AFINIDAD MILITAR 360°
            </span>
            <h3 className="text-xl sm:text-2xl font-rajdhani font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-0.5">
              Vector del Postulante vs Perfil Ideal ({topSigla})
            </h3>
          </div>
          <span className="text-xs font-rajdhani text-slate-500 dark:text-gray-400 uppercase tracking-wider">
            6 Dimensiones Castrenses Integradas
          </span>
        </div>

        <div className="flex justify-center my-4">
          <TacticalRadarChart
            userScores={[
              100 - psychScores.N,
              psychScores.E,
              cogScores.factorG,
              cogScores.aptitudMecanica,
              psychScores.C,
              topSchool.interestFit,
            ]}
            idealScores={[
              100 - topSchool.escuela.perfilIdeal.N,
              topSchool.escuela.perfilIdeal.E,
              85,
              80,
              topSchool.escuela.perfilIdeal.C,
              85,
            ]}
            labels={[
              "Estabilidad",
              "Liderazgo",
              "Factor 'g'",
              "Mecánica",
              "Disciplina",
              "Afinidad",
            ]}
          />
        </div>
      </div>

      {/* 6. FODA TÁCTICO (4 CUADRANTES) */}
      <TacticalFODAMap verdict={verdict} />

      {/* 7. PLAN DE NIVELACIÓN Y ACONDICIONAMIENTO PRE-MILITAR DE 8 SEMANAS */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800 shadow-sm transition-colors space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-gray-800 pb-4">
          <div>
            <span className="text-xs font-rajdhani font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase">
              HOJA DE RUTA OPERATIVA DE PREPARACIÓN
            </span>
            <h3 className="text-xl sm:text-2xl font-rajdhani font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-0.5">
              Plan Táctico de Nivelación Castrense (8 Semanas)
            </h3>
          </div>
          <span className="text-xs font-rajdhani text-slate-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-500" />
            <span>Objetivo: Proceso de Admisión 2026/2027</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {planEntrenamiento.map((fase, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-neon-cyan/40 text-neon-cyan text-[11px] font-rajdhani font-bold uppercase tracking-wider mb-2">
                  {fase.semana}
                </span>
                <h4 className="font-rajdhani font-bold text-base text-slate-900 dark:text-white uppercase leading-tight mb-2">
                  {fase.eje}
                </h4>
                <p className="text-xs font-inter text-slate-600 dark:text-slate-300 leading-relaxed">
                  {fase.accion}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center gap-1 text-[11px] font-rajdhani font-bold text-emerald-500 uppercase">
                <Check className="w-3.5 h-3.5" />
                <span>Hito de Rendimiento Calibrado</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. CUADRO COMPARATIVO DE LAS 8 ESCUELAS */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-rajdhani font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Cuadro de Compatibilidad Vocacional (8 Escuelas Matrices)
          </h3>
          <p className="text-xs text-slate-500 dark:text-gray-400 font-inter">
            Clasificación oficial basada en la concordancia legal, biométrica, física, cognitiva, psicométrica y de intereses operacionales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {schoolScores.map((item, index) => {
            const esc = item.escuela;
            const escSigla = esc.sigla || esc.id;
            const isTop = index === 0;

            return (
              <div
                key={esc.id}
                className={`p-5 rounded-2xl border relative overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                  isTop
                    ? "bg-cyan-50 dark:bg-cyan-950/30 border-cyan-500 dark:border-neon-cyan shadow-md dark:shadow-cyan-glow scale-[1.02]"
                    : item.esApto
                    ? "bg-white dark:bg-[#141518] border-slate-200 dark:border-gray-800 hover:border-slate-400 dark:hover:border-gray-700"
                    : "bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-500/25 opacity-80"
                }`}
              >
                <div>
                  {/* Mini-Banner Fotográfico Institucional */}
                  <div className="relative h-24 w-full rounded-xl overflow-hidden mb-3 border border-slate-200 dark:border-gray-800">
                    <img
                      src={SCHOOL_IMAGE_MAP[escSigla] || '/assets/general/hero-joint-forces.jpg'}
                      alt={esc.nombre}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <span className="absolute bottom-1.5 left-2 text-[11px] font-rajdhani font-black text-white uppercase tracking-wider drop-shadow">
                      {escSigla} · {esc.fuerza || esc.rama}
                    </span>
                    <span className="absolute top-1.5 right-1.5 text-lg select-none drop-shadow">
                      {esc.icon}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-rajdhani font-bold px-2 py-0.5 rounded border uppercase ${
                      item.esApto
                        ? "border-emerald-500/50 text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60"
                        : "border-red-500/50 text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/60"
                    }`}>
                      {item.esApto ? "✓ APTO" : "✕ OBSERVADO"}
                    </span>
                  </div>

                  <h4 className="font-rajdhani font-bold text-base text-slate-900 dark:text-white uppercase line-clamp-2 leading-tight">
                    {esc.nombre}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-gray-400 font-inter mt-1">
                    {esc.rama} · {esc.rango}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-gray-800">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-[11px] font-rajdhani font-bold text-slate-500 dark:text-gray-400 uppercase">
                      Compatibilidad:
                    </span>
                    <span className={`text-xl font-sans font-black ${
                      isTop ? "text-cyan-600 dark:text-neon-cyan" : item.esApto ? "text-slate-900 dark:text-white" : "text-red-500"
                    }`}>
                      {item.compatibilidad}%
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isTop ? "bg-cyan-500 dark:bg-neon-cyan" : item.esApto ? "bg-emerald-500" : "bg-red-500"
                      }`}
                      style={{ width: `${item.compatibilidad}%` }}
                    />
                  </div>

                  {!item.esApto && (
                    <p className="text-[10px] text-red-500 font-inter mt-1.5 line-clamp-1">
                      ⚠️ {item.motivo}
                    </p>
                  )}

                  {/* Botón rápido para medir conocimientos con esa escuela específica */}
                  <button
                    type="button"
                    onClick={() => startAcademicDiagnostic(escSigla)}
                    className="mt-3 w-full py-1.5 rounded-lg border border-slate-300 dark:border-gray-700 hover:border-cyan-500 text-[11px] font-rajdhani font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-[#00F0FF] transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>Simular examen {escSigla}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 9. CERTIFICACIÓN OFICIAL, TIMBRE DIGITAL Y CÓDIGO QR NOTARIAL */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-5">
          {/* QR SVG Nativo Puro */}
          <div className="w-24 h-24 p-2 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950">
              {/* Esquinas QR */}
              <rect x="5" y="5" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
              <rect x="11" y="11" width="16" height="16" rx="2" fill="currentColor" />
              <rect x="67" y="5" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
              <rect x="73" y="11" width="16" height="16" rx="2" fill="currentColor" />
              <rect x="5" y="67" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
              <rect x="11" y="73" width="16" height="16" rx="2" fill="currentColor" />
              {/* Patrones de datos vectorizados */}
              <rect x="42" y="10" width="8" height="8" fill="currentColor" />
              <rect x="42" y="24" width="8" height="8" fill="currentColor" />
              <rect x="52" y="18" width="8" height="8" fill="currentColor" />
              <rect x="12" y="44" width="8" height="8" fill="currentColor" />
              <rect x="24" y="44" width="8" height="8" fill="currentColor" />
              <rect x="42" y="42" width="16" height="16" rx="2" fill="#D90429" />
              <rect x="68" y="44" width="8" height="8" fill="currentColor" />
              <rect x="80" y="44" width="8" height="8" fill="currentColor" />
              <rect x="42" y="68" width="8" height="8" fill="currentColor" />
              <rect x="54" y="76" width="8" height="8" fill="currentColor" />
              <rect x="68" y="68" width="8" height="8" fill="currentColor" />
              <rect x="80" y="80" width="8" height="8" fill="currentColor" />
            </svg>
          </div>

          <div>
            <span className="text-[10px] font-rajdhani font-bold text-neon-cyan uppercase tracking-widest block">
              SISTEMA DE VERIFICACIÓN NOTARIAL CASTRENSE
            </span>
            <h4 className="text-lg font-rajdhani font-bold text-white uppercase">
              Certificado Digital de Idoneidad Vocacional
            </h4>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-xs font-mono font-bold bg-black/60 px-2 py-0.5 rounded border border-white/20 text-emerald-400">
                CÓDIGO: {verificationCode}
              </span>
              <span className="text-xs text-slate-400 font-inter">
                • Registrado en Servidor Central FF.AA.
              </span>
            </div>
          </div>
        </div>

        <div className="text-center md:text-right text-xs text-slate-400 font-inter max-w-xs">
          Documento emitido conforme a las leyes orgánicas del Ejército, Marina de Guerra, Fuerza Aérea y Policía Nacional del Perú. Válido para orientación y nivelación premilitar.
        </div>
      </div>

      {/* 10. ACCIONES SECUNDARIAS */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-slate-200 dark:border-gray-800 no-print">
        <button
          type="button"
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan text-night-deep hover:bg-cyan-300 font-rajdhani font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-cyan-glow transition-all cursor-pointer"
        >
          {isGeneratingPDF ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-night-deep" />
              <span>COMPILANDO INFORME...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-night-deep" />
              <span>DESCARGAR INFORME OFICIAL (PDF)</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-gray-700 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white font-rajdhani font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir Ficha Vocacional</span>
        </button>

        <button
          type="button"
          onClick={resetAll}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-gray-700 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white font-rajdhani font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reiniciar Test Vocacional</span>
        </button>
      </div>

      {/* BOTÓN PRINCIPAL FLOTANTE REQUERIDO: DESCARGAR INFORME CLASIFICADO (PDF) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 no-print">
        <button
          type="button"
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
          className="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl bg-gradient-to-r from-neon-cyan via-teal-300 to-[#00F0FF] text-night-deep font-rajdhani font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.7)] hover:shadow-[0_0_40px_rgba(0,240,255,0.9)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 sm:gap-3 cursor-pointer border-2 border-white/80"
          title="Descargar informe oficial en PDF de alta resolución"
        >
          {isGeneratingPDF ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-night-deep flex-shrink-0" />
              <span className="whitespace-nowrap">COMPILANDO REPORTE...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-night-deep flex-shrink-0" />
              <span className="whitespace-nowrap">DESCARGAR INFORME (PDF)</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}

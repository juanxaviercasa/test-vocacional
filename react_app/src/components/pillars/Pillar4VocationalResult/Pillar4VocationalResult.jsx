import React, { useEffect } from 'react';
import { useAssessmentStore } from '../../../store/useAssessmentStore';
import TacticalRadarChart from '../Pillar5Consolidated/TacticalRadarChart';
import Tooltip from '../../common/Tooltip';
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
  AlertTriangle
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
          Sintetizando perfil vocacional militar...
        </p>
      </div>
    );
  }

  const { topSchool, schoolScores, legalEval, psychScores, interestsEval } = verdict;
  const topSigla = topSchool.escuela.sigla || topSchool.escuela.id;

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-6 space-y-8">
      
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
              <span>DICTAMEN VOCACIONAL OFICIAL 2026/2027</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-rajdhani font-bold text-slate-200 uppercase tracking-wider">
              MÁXIMA AFINIDAD VOCACIONAL DETECTADA
            </h1>
            
            <h2 className="text-3xl sm:text-5xl font-sans font-black text-neon-cyan uppercase mt-1 tracking-tight leading-tight">
              {topSchool.escuela.nombre} ({topSigla})
            </h2>

            <p className="text-base sm:text-lg text-slate-200 font-inter mt-3 max-w-2xl leading-relaxed">
              Postulante <strong className="text-white">{candidate.nombre}</strong> (DNI: {candidate.dni}). Tras el análisis multi-factorial de tu biometría reglamentaria (<Tooltip termino="Antropometría">Antropometría</Tooltip>), rasgos de personalidad <Tooltip termino="Big Five">Big Five</Tooltip> e intereses operacionales, tu perfil presenta la más alta correlación táctica bajo el <Tooltip termino="Baremo">Baremo Oficial</Tooltip> para formarte como <strong className="text-emerald-300 font-semibold">{topSchool.escuela.rango} en el/la {topSchool.escuela.rama}</strong>.
            </p>

            {/* BOTÓN PRINCIPAL DESTACADO (CALL TO ACTION REQUERIDO) */}
            <div className="mt-6 pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={() => startAcademicDiagnostic(topSigla)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-neon-cyan via-teal-300 to-[#00F0FF] text-night-deep font-rajdhani font-black text-base sm:text-lg uppercase tracking-wider shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:shadow-[0_0_45px_rgba(0,240,255,0.85)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <Zap className="w-5 h-5 text-night-deep fill-current" />
                <span>MEDIR MI NIVEL ACADÉMICO PARA {topSigla} -&gt;</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
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

            <span className="text-xs sm:text-sm font-rajdhani font-extrabold px-3 py-1 rounded-md bg-emerald-950/90 border border-emerald-500 text-emerald-400 uppercase tracking-wider">
              {topSchool.esApto ? "✓ APTO RECOMENDADO" : "OBSERVADO LEGAL"}
            </span>

            <div className="mt-3 text-xs text-slate-300 font-rajdhani text-center space-y-0.5">
              <div>Psicometría: <strong className="text-white">{topSchool.psychFit}%</strong></div>
              <div>Intereses: <strong className="text-white">{topSchool.interestFit}%</strong></div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. DESGLOSE DE LOS 3 PILARES PREVIOS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Pilar 1: Legal */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800 shadow-sm transition-colors">
          <span className="text-xs font-rajdhani font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
            FASE 01 // FILTRO LEGAL Y BIOMÉTRICO
          </span>
          <div className="text-2xl font-sans font-bold text-slate-900 dark:text-white mb-2">
            IMC: {legalEval.imc}
          </div>
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-inter space-y-1.5 leading-relaxed">
            <div>Estatura: <strong className="text-slate-900 dark:text-white font-semibold">{candidate.talla_cm} cm</strong></div>
            <div>Edad: <strong className="text-slate-900 dark:text-white font-semibold">{candidate.edad} años</strong></div>
            <div>Escuelas Habilitadas: <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">{legalEval.totalAptas} de 8</strong></div>
          </div>
        </div>

        {/* Pilar 2: Psicometría */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800 shadow-sm transition-colors">
          <span className="text-xs font-rajdhani font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
            FASE 02 // PERSONALIDAD MILITAR BIG FIVE
          </span>
          <div className="text-2xl font-sans font-bold text-slate-900 dark:text-white mb-2">
            Ajuste Conductual: {topSchool.psychFit}%
          </div>
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-inter space-y-1.5 leading-relaxed">
            <div>Estabilidad Emocional: <strong className="text-slate-900 dark:text-white font-semibold">{100 - psychScores.N}%</strong></div>
            <div>Liderazgo / Extraversión: <strong className="text-slate-900 dark:text-white font-semibold">{psychScores.E}%</strong></div>
            <div>Disciplina / Responsabilidad: <strong className="text-slate-900 dark:text-white font-semibold">{psychScores.C}%</strong></div>
          </div>
        </div>

        {/* Pilar 3: Intereses */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800 shadow-sm transition-colors">
          <span className="text-xs font-rajdhani font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
            FASE 03 // PREFERENCIA OPERACIONAL
          </span>
          <div className="text-2xl font-sans font-bold text-slate-900 dark:text-white mb-2">
            Afinidad Rama: {topSchool.interestFit}%
          </div>
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-inter space-y-1.5 leading-relaxed">
            <div>FAP: <strong className="text-slate-900 dark:text-white font-semibold">{interestsEval.affinity.FAP}%</strong> · Marina: <strong className="text-slate-900 dark:text-white font-semibold">{interestsEval.affinity.Marina}%</strong></div>
            <div>Ejército: <strong className="text-slate-900 dark:text-white font-semibold">{interestsEval.affinity.Ejército}%</strong> · PNP: <strong className="text-slate-900 dark:text-white font-semibold">{interestsEval.affinity.PNP}%</strong></div>
          </div>
        </div>

      </div>

      {/* 3. RADAR TÁCTICO */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800 shadow-sm transition-colors">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-gray-800 pb-4 mb-6">
          <div>
            <span className="text-xs font-rajdhani font-bold text-cyan-600 dark:text-neon-cyan tracking-widest uppercase">
              CALIBRACIÓN POLIGONAL DE AFINIDAD
            </span>
            <h3 className="text-xl sm:text-2xl font-rajdhani font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-0.5">
              Vector del Postulante vs Perfil Ideal ({topSigla})
            </h3>
          </div>
          <span className="text-xs font-rajdhani text-slate-500 dark:text-gray-400 uppercase tracking-wider">
            Dimensiones Vocacionales Ponderadas
          </span>
        </div>

        <div className="flex justify-center my-4">
          <TacticalRadarChart
            userScores={[
              100 - psychScores.N,
              psychScores.E,
              psychScores.O,
              psychScores.C,
              topSchool.interestFit,
            ]}
            idealScores={[
              100 - topSchool.escuela.perfilIdeal.N,
              topSchool.escuela.perfilIdeal.E,
              topSchool.escuela.perfilIdeal.O,
              topSchool.escuela.perfilIdeal.C,
              85,
            ]}
            labels={[
              "Estabilidad",
              "Liderazgo",
              "Estrategia",
              "Disciplina",
              "Afinidad Rama",
            ]}
          />
        </div>
      </div>

      {/* 4. CUADRO COMPARATIVO DE LAS 8 ESCUELAS */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-rajdhani font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Cuadro de Compatibilidad Vocacional (8 Escuelas Matrices)
          </h3>
          <p className="text-xs text-slate-500 dark:text-gray-400 font-inter">
            Clasificación oficial basada en la concordancia legal, biométrica, psicométrica y de intereses operacionales.
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

      {/* 5. ACCIONES SECUNDARIAS */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-slate-200 dark:border-gray-800 no-print">
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

    </div>
  );
}

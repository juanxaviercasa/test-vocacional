import React from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Activity,
  GraduationCap,
  Sparkles,
  Target,
  Zap,
  CheckCircle2,
  TrendingUp,
  Dumbbell,
  BookOpen
} from 'lucide-react';
import { SCHOOL_PHYSICAL_BENCHMARKS } from '../../data/strategicBenchmarks';

/**
 * Mapa Mental Táctico (FODA Vocacional Simplificado)
 * 4 Cuadrantes Estratégicos:
 * 1. Fortalezas (Rasgos de Personalidad y Biometría)
 * 2. Oportunidades de Mejora (Gestión de Estrés / Brechas)
 * 3. Recomendaciones Físicas (Metas de Trote, Barras y Natación)
 * 4. Recomendaciones Académicas (Ejes de Balotario Oficial DECO)
 */
export default function TacticalFODAMap({ verdict }) {
  if (!verdict || !verdict.topSchool) return null;

  const { topSchool, psychScores, legalEval, interestsEval } = verdict;
  const esc = topSchool.escuela;
  const escSigla = esc.sigla || esc.id;
  const cleanKey = String(escSigla).replace(/[-_]/g, '');

  const physicalBenchmark = SCHOOL_PHYSICAL_BENCHMARKS[cleanKey] ||
                            SCHOOL_PHYSICAL_BENCHMARKS[escSigla] ||
                            SCHOOL_PHYSICAL_BENCHMARKS.EOFAP;

  // 1. Dinamizar Fortalezas según puntajes psicométricos
  const fortalezasList = [];
  if (psychScores.C >= 60) {
    fortalezasList.push({
      titulo: 'Alta Disciplina & Diligencia Militar',
      detalle: `Puntaje C del ${psychScores.C}%: Rigor en cumplimiento de directivas y meticulosidad procedimental.`
    });
  } else {
    fortalezasList.push({
      titulo: 'Sentido del Deber Operacional',
      detalle: 'Acatamiento de la cadena de mando y fidelidad a la misión constitucional asignada.'
    });
  }

  if (100 - psychScores.N >= 60) {
    fortalezasList.push({
      titulo: 'Estabilidad Emocional en Situaciones Críticas',
      detalle: `Resiliencia del ${100 - psychScores.N}%: Sangre fría para tomar decisiones tácticas bajo presión extrema.`
    });
  } else {
    fortalezasList.push({
      titulo: 'Respuesta Emocional Alerta',
      detalle: 'Vigilancia continua del entorno y pronta reacción ante estímulos de peligro.'
    });
  }

  if (legalEval.imc >= 18.5 && legalEval.imc <= 25) {
    fortalezasList.push({
      titulo: 'Biometría Antropométrica Óptima',
      detalle: `IMC de ${legalEval.imc}: En rango perfecto según la tabla reglamentaria de sanidad militar.`
    });
  } else {
    fortalezasList.push({
      titulo: 'Estatura Reglamentaria Conforme',
      detalle: `Estatura de ${legalEval.candidate?.talla_cm || 172} cm: Habilitado para la línea de comando institucional.`
    });
  }

  // 2. Dinamizar Oportunidades de Mejora
  const oportunidadesList = [];
  if (psychScores.N > 40) {
    oportunidadesList.push({
      titulo: 'Tolerancia al Estrés Agudo',
      detalle: 'Entrenar el protocolo Box Breathing (4-4-4-4) para regular taquicardias en entrevistas de admisión.'
    });
  } else {
    oportunidadesList.push({
      titulo: 'Velocidad de Mando y Asertividad',
      detalle: 'Fortalecer la proyección de voz y la comunicación directa sin titubeos ante superiores.'
    });
  }

  if (psychScores.E < 55) {
    oportunidadesList.push({
      titulo: 'Comando de Grupo y Liderazgo Expresivo',
      detalle: 'Desarrollar soltura en conducción de pelotones e instrucción pública de subalternos.'
    });
  } else {
    oportunidadesList.push({
      titulo: 'Escucha Táctica y Delegación',
      detalle: 'Canalizar el exceso de iniciativa respetando la jerarquía y el trabajo conjunto.'
    });
  }

  oportunidadesList.push({
    titulo: 'Simulacros con Cronómetro de 72s',
    detalle: 'Automatizar el descarte rápido de distractores para evitar el agotamiento cognitivo en el examen.'
  });

  // 3. Recomendaciones Físicas según Escuela
  const recomendacionesFisicas = [
    {
      titulo: `Trote 2,400m: ${physicalBenchmark.trote.distancia}`,
      detalle: `Meta oficial: ${physicalBenchmark.trote.tiempoMeta}. Trabaja series fraccionadas de 800m.`
    },
    {
      titulo: `Dominadas en Barra: ${physicalBenchmark.fuerzaTrenSuperior.ejercicio}`,
      detalle: `${physicalBenchmark.fuerzaTrenSuperior.repeticiones}. Agarres pronos estrictos sin balanceo de cadera.`
    },
    {
      titulo: `Aptitud Acuática: ${physicalBenchmark.natacion.distancia}`,
      detalle: `${physicalBenchmark.natacion.tiempoMeta}. Dominio continuo y salto de valor desde plataforma de 5m.`
    }
  ];

  // 4. Recomendaciones Académicas
  const recomendacionesAcademicas = [
    {
      titulo: 'Ciencias Exactas (Álgebra y Trigonometría)',
      detalle: 'Prioridad de balotario: Vectores, geometría analítica, identidades y cálculo cinemático.'
    },
    {
      titulo: 'Metodología DECO y Análisis Crítico',
      detalle: 'Práctica de enunciados contextualizados de situación real en lugar de memoria pasiva.'
    },
    {
      titulo: 'Cultura Militar, Geografía y Realidad Nacional',
      detalle: 'Tratados limítrofes, historia republicana de las FFAA/PNP y Constitución Política del Perú.'
    }
  ];

  return (
    <div className="w-full space-y-6">
      
      {/* Título de la Sección del Mapa Mental */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-gray-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-rajdhani font-bold tracking-widest text-cyan-600 dark:text-neon-cyan uppercase">
              MATRIZ TÁCTICA DE DIAGNÓSTICO
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-rajdhani font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-0.5">
            Mapa Mental Vocacional (FODA Estratégico 360°)
          </h3>
        </div>
        <div className="text-xs font-rajdhani text-slate-500 dark:text-gray-400 uppercase tracking-wider bg-slate-100 dark:bg-[#141518] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-gray-800">
          Objetivo Clave: <strong className="text-cyan-600 dark:text-neon-cyan">{escSigla}</strong> ({topSchool.compatibilidad}%)
        </div>
      </div>

      {/* Grid del Mapa Mental: 4 Cuadrantes con Hub Central */}
      <div className="relative">
        
        {/* Hub Central (Visual Core Connector) */}
        <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none">
          <div className="w-28 h-28 rounded-full bg-[#0B101E] border-2 border-neon-cyan shadow-[0_0_30px_rgba(0,240,255,0.4)] flex flex-col items-center justify-center p-2 text-center">
            <span className="text-[10px] font-rajdhani font-bold text-slate-300 uppercase tracking-tighter">NODO CENTRAL</span>
            <span className="text-base font-sans font-black text-neon-cyan leading-none">{escSigla}</span>
            <span className="text-[10px] font-rajdhani text-emerald-400 font-extrabold">{topSchool.compatibilidad}% FIT</span>
          </div>
        </div>

        {/* 4 Cuadrantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* CUADRANTE 1: FORTALEZAS */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/95 dark:bg-[#0B101E]/90 border-2 border-emerald-500/40 dark:border-emerald-500/30 backdrop-blur-md shadow-sm dark:shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:border-emerald-500 transition-all duration-300 group">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-500/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-rajdhani font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                    CUADRANTE 01 // FACTORES PROPIOS
                  </span>
                  <h4 className="font-rajdhani font-bold text-base sm:text-lg text-slate-900 dark:text-white uppercase tracking-wider">
                    FORTALEZAS TÁCTICAS
                  </h4>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-rajdhani font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 uppercase">
                CONSOLIDADO
              </span>
            </div>

            <div className="space-y-3">
              {fortalezasList.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-rajdhani font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                      {item.titulo}
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-inter leading-relaxed">
                      {item.detalle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CUADRANTE 2: OPORTUNIDADES DE MEJORA */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/95 dark:bg-[#0B101E]/90 border-2 border-amber-500/40 dark:border-amber-500/30 backdrop-blur-md shadow-sm dark:shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:border-amber-500 transition-all duration-300 group">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-500/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-rajdhani font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest block">
                    CUADRANTE 02 // POTENCIADORES
                  </span>
                  <h4 className="font-rajdhani font-bold text-base sm:text-lg text-slate-900 dark:text-white uppercase tracking-wider">
                    OPORTUNIDADES DE MEJORA
                  </h4>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-rajdhani font-bold bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/30 uppercase">
                EN DESARROLLO
              </span>
            </div>

            <div className="space-y-3">
              {oportunidadesList.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-rajdhani font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                      {item.titulo}
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-inter leading-relaxed">
                      {item.detalle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CUADRANTE 3: RECOMENDACIONES FÍSICAS */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/95 dark:bg-[#0B101E]/90 border-2 border-cyan-500/40 dark:border-neon-cyan/30 backdrop-blur-md shadow-sm dark:shadow-[0_0_20px_rgba(0,240,255,0.1)] hover:border-neon-cyan transition-all duration-300 group">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-cyan-500/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-rajdhani font-black text-cyan-600 dark:text-neon-cyan uppercase tracking-widest block">
                    CUADRANTE 03 // BAREMOS REGLAMENTARIOS
                  </span>
                  <h4 className="font-rajdhani font-bold text-base sm:text-lg text-slate-900 dark:text-white uppercase tracking-wider">
                    RECOMENDACIONES FÍSICAS ({escSigla})
                  </h4>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-rajdhani font-bold bg-cyan-500/10 text-cyan-600 dark:text-neon-cyan border border-cyan-500/30 uppercase">
                COOPER 2026
              </span>
            </div>

            <div className="space-y-3">
              {recomendacionesFisicas.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <Dumbbell className="w-4 h-4 text-cyan-500 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-rajdhani font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                      {item.titulo}
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-inter leading-relaxed">
                      {item.detalle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CUADRANTE 4: RECOMENDACIONES ACADÉMICAS */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/95 dark:bg-[#0B101E]/90 border-2 border-purple-500/40 dark:border-purple-500/30 backdrop-blur-md shadow-sm dark:shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:border-purple-500 transition-all duration-300 group">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-500/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-500">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-rajdhani font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest block">
                    CUADRANTE 04 // TEMARIO OFICIAL
                  </span>
                  <h4 className="font-rajdhani font-bold text-base sm:text-lg text-slate-900 dark:text-white uppercase tracking-wider">
                    RECOMENDACIONES ACADÉMICAS
                  </h4>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-rajdhani font-bold bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/30 uppercase">
                DECO / SAN MARCOS
              </span>
            </div>

            <div className="space-y-3">
              {recomendacionesAcademicas.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <BookOpen className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-rajdhani font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                      {item.titulo}
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-inter leading-relaxed">
                      {item.detalle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}

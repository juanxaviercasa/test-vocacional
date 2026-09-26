import React from 'react';
import { useAssessmentStore } from '../../../store/useAssessmentStore';
import TacticalRadarChart from './TacticalRadarChart';
import { Award, Printer, RotateCcw, ShieldCheck, CheckCircle, AlertTriangle, ChevronRight, FileText } from 'lucide-react';

export default function Pillar5Consolidated() {
  const { finalVerdict, resetAll, candidate } = useAssessmentStore();

  if (!finalVerdict) {
    return (
      <div className="max-w-xl mx-auto glass-panel p-8 rounded-2xl text-center">
        <p className="text-sm font-rajdhani text-slate-400 uppercase">Calculando dictamen consolidado...</p>
      </div>
    );
  }

  const { topSchool, schoolScores, legalEval, psychScores, interestsEval, knowEval } = finalVerdict;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-8">
      
      {/* TARJETA HERO DEL DICTAMEN FINAL */}
      <div className="glass-panel-cyan p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        {/* Fondo Inmersivo de Ceremonia Oficial de Graduación y Acreditación Militar */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <img
            src="/assets/general/vocational-verdict-merit.jpg"
            alt="Ceremonia Oficial de Acreditación y Entrega de Dictamen Militar CCFFAA"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B101E] via-[#0B101E]/85 to-[#0B101E]/60" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Veredicto y Compatibilidad */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-rajdhani font-bold tracking-widest uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DICTAMEN OFICIAL INTEGRAL 2026/2027</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-rajdhani font-bold text-white uppercase tracking-wide">
              RECOMENDACIÓN TÁCTICA PRINCIPAL
            </h1>
            
            <h2 className="text-xl sm:text-3xl font-rajdhani font-bold text-neon-cyan uppercase mt-1">
              {topSchool.escuela.nombre} ({topSchool.escuela.id})
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-inter mt-2 max-w-2xl leading-relaxed">
              Postulante <strong className="text-white">{candidate.nombre}</strong> (DNI: {candidate.dni}). Evaluado con éxito a través del algoritmo multi-pilar. Tu perfil psicométrico, tus intereses tácticos y tu desempeño académico muestran el máximo ajuste operacional para la carrera militar de <strong className="text-emerald-400">{topSchool.escuela.rango} en el/la {topSchool.escuela.rama}</strong>.
            </p>
          </div>

          {/* Medidor de Afinidad Global */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-night-deep/80 border border-neon-cyan/40 shadow-cyan-glow min-w-[200px]">
            <span className="text-xs font-rajdhani font-bold text-slate-400 uppercase tracking-widest">
              COMPATIBILIDAD
            </span>
            <div className="text-5xl font-rajdhani font-extrabold text-neon-cyan my-1">
              {topSchool.compatibilidad}%
            </div>
            <span className="text-[11px] font-rajdhani font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500 text-emerald-400 uppercase">
              APTO DESTACADO
            </span>
          </div>

        </div>
      </div>

      {/* DESGLOSE DE LOS 4 PILARES EN 4 TARJETAS HUD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Pilar 1: Legal */}
        <div className="p-4 rounded-2xl glass-panel border border-white/10">
          <span className="text-[10px] font-rajdhani font-bold text-slate-400 uppercase tracking-wider block mb-1">
            PILAR 1 // FILTRO LEGAL Y BIOMÉTRICO
          </span>
          <div className="text-xl font-rajdhani font-bold text-white mb-2">
            IMC: {legalEval.imc}
          </div>
          <div className="text-xs text-slate-300 font-inter space-y-1">
            <div>Estatura: <strong className="text-white">{candidate.talla_cm} cm</strong></div>
            <div>Edad: <strong className="text-white">{candidate.edad} años</strong></div>
            <div>Escuelas Aptas: <strong className="text-emerald-400">{legalEval.totalAptas} de 8</strong></div>
          </div>
        </div>

        {/* Pilar 2: Psicometría */}
        <div className="p-4 rounded-2xl glass-panel border border-white/10">
          <span className="text-[10px] font-rajdhani font-bold text-slate-400 uppercase tracking-wider block mb-1">
            PILAR 2 // PERSONALIDAD BIG FIVE
          </span>
          <div className="text-xl font-rajdhani font-bold text-white mb-2">
            Ajuste: {topSchool.psychFit}%
          </div>
          <div className="text-xs text-slate-300 font-inter space-y-1">
            <div>Estabilidad: <strong className="text-white">{100 - psychScores.N}%</strong></div>
            <div>Liderazgo: <strong className="text-white">{psychScores.E}%</strong></div>
            <div>Disciplina: <strong className="text-white">{psychScores.C}%</strong></div>
          </div>
        </div>

        {/* Pilar 3: Intereses */}
        <div className="p-4 rounded-2xl glass-panel border border-white/10">
          <span className="text-[10px] font-rajdhani font-bold text-slate-400 uppercase tracking-wider block mb-1">
            PILAR 3 // INTERESES OPERACIONALES
          </span>
          <div className="text-xl font-rajdhani font-bold text-white mb-2">
            Afinidad: {topSchool.interestFit}%
          </div>
          <div className="text-xs text-slate-300 font-inter space-y-1">
            <div>FAP: <strong className="text-white">{interestsEval.affinity.FAP}%</strong> · MGP: <strong className="text-white">{interestsEval.affinity.Marina}%</strong></div>
            <div>EP: <strong className="text-white">{interestsEval.affinity.Ejército}%</strong> · PNP: <strong className="text-white">{interestsEval.affinity.PNP}%</strong></div>
          </div>
        </div>

        {/* Pilar 4: Conocimientos */}
        <div className="p-4 rounded-2xl glass-panel border border-white/10">
          <span className="text-[10px] font-rajdhani font-bold text-slate-400 uppercase tracking-wider block mb-1">
            PILAR 4 // RENDIMIENTO ACADÉMICO
          </span>
          <div className="text-xl font-rajdhani font-bold text-white mb-2">
            Nota: {knowEval.score20} / 20
          </div>
          <div className="text-xs text-slate-300 font-inter space-y-1">
            <div>Aciertos: <strong className="text-white">{knowEval.correctCount} de {knowEval.total}</strong></div>
            <div>Eficacia: <strong className="text-emerald-400">{knowEval.pct}%</strong></div>
          </div>
        </div>

      </div>

      {/* SECCIÓN DEL GRÁFICO DE RADAR TÁCTICO */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
          <div>
            <span className="text-xs font-rajdhani font-bold text-neon-cyan tracking-widest uppercase">
              CALIBRACIÓN POLIGONAL DE AFINIDAD
            </span>
            <h3 className="text-xl sm:text-2xl font-rajdhani font-bold text-white uppercase tracking-wider mt-0.5">
              Vector del Postulante vs Perfil Ideal ({topSchool.escuela.id})
            </h3>
          </div>
          <span className="text-xs font-rajdhani text-slate-400 uppercase tracking-wider">
            6 Ejes Operacionales Ponderados
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
              Math.min(100, Math.round((knowEval.score20 / 20) * 100))
            ]}
            idealScores={[
              100 - topSchool.escuela.perfilIdeal.N,
              topSchool.escuela.perfilIdeal.E,
              topSchool.escuela.perfilIdeal.O,
              topSchool.escuela.perfilIdeal.C,
              85,
              85
            ]}
            labels={[
              "Estabilidad",
              "Liderazgo",
              "Estrategia",
              "Disciplina",
              "Afinidad Rama",
              "Académico"
            ]}
          />
        </div>
      </div>

      {/* GRID RESPONSIVO DE LAS 8 ESCUELAS MILITARES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-rajdhani font-bold text-white uppercase tracking-wider">
              Cuadro de Compatibilidad y Mérito por Escuela (8 Instituciones)
            </h3>
            <p className="text-xs text-slate-400 font-inter">
              Evaluación consolidada legal, psicométrica, táctica y académica.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {schoolScores.map((item, index) => {
            const esc = item.escuela;
            return (
              <div
                key={esc.id}
                className={`p-5 rounded-2xl border relative overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                  index === 0
                    ? "bg-cyan-950/30 border-neon-cyan shadow-cyan-glow scale-[1.02]"
                    : item.esApto
                    ? "bg-graphite-surface border-white/10 hover:border-white/30"
                    : "bg-red-950/20 border-red-500/25 opacity-75"
                }`}
              >
                {/* Marca de agua institucional */}
                <div className="absolute right-1 bottom-0 text-5xl font-rajdhani font-black text-white/[0.035] pointer-events-none select-none">
                  {esc.id}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{esc.icon}</span>
                    <span className={`text-xs font-rajdhani font-bold px-2 py-0.5 rounded border uppercase ${
                      item.esApto
                        ? "border-emerald-500/50 text-emerald-400 bg-emerald-950/60"
                        : "border-red-500/50 text-red-400 bg-red-950/60"
                    }`}>
                      {item.esApto ? "✓ APTO" : "✕ OBSERVADO"}
                    </span>
                  </div>

                  <h4 className="font-rajdhani font-bold text-base text-white uppercase line-clamp-2 leading-tight">
                    {esc.nombre}
                  </h4>
                  <p className="text-xs text-slate-400 font-inter mt-1">
                    {esc.rama} · {esc.rango}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-[11px] font-rajdhani font-bold text-slate-400 uppercase">
                      Compatibilidad:
                    </span>
                    <span className={`text-xl font-rajdhani font-extrabold ${
                      index === 0 ? "text-neon-cyan" : item.esApto ? "text-white" : "text-red-400"
                    }`}>
                      {item.compatibilidad}%
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        index === 0 ? "bg-neon-cyan shadow-cyan-glow" : item.esApto ? "bg-emerald-400" : "bg-red-500"
                      }`}
                      style={{ width: `${item.compatibilidad}%` }}
                    />
                  </div>

                  {!item.esApto && (
                    <p className="text-[10px] text-red-400 font-inter mt-1.5 line-clamp-1">
                      ⚠️ {item.motivo}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ACCIONES FINALES (DESCARGAR PDF / REINICIAR) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-white/10 no-print">
        <button
          type="button"
          onClick={() => window.print()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gold-primary text-night-deep font-rajdhani font-bold text-base tracking-wider uppercase shadow-[0_0_25px_rgba(255,215,0,0.35)] hover:bg-yellow-300 transition-all duration-300"
        >
          <Printer className="w-5 h-5" />
          <span>Descargar / Imprimir Dictamen en PDF</span>
        </button>

        <button
          type="button"
          onClick={resetAll}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 text-slate-300 hover:text-white hover:bg-white/5 font-rajdhani font-bold text-sm tracking-wider uppercase transition-all duration-300"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reiniciar Simulación Táctica</span>
        </button>
      </div>

    </div>
  );
}

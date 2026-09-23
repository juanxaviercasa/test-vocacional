import React, { useEffect, useState } from 'react';
import { useAssessmentStore } from '../../../store/useAssessmentStore';
import { evaluateLegalCandidate } from '../../../data/legalRequirements';
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function UnlockingTransition() {
  const { candidate, nextPillar, setPilar1SubStep } = useAssessmentStore();
  const [isScanning, setIsScanning] = useState(true);
  const [evaluation, setEvaluation] = useState(null);

  useEffect(() => {
    const result = evaluateLegalCandidate(candidate);
    setEvaluation(result);

    const timer = setTimeout(() => {
      setIsScanning(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [candidate]);

  if (isScanning) {
    return (
      <div className="max-w-2xl mx-auto glass-panel p-10 rounded-2xl border border-neon-cyan/40 shadow-cyan-glow text-center py-16">
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-neon-cyan/30 animate-ping" />
          <div className="absolute inset-0 rounded-full border border-neon-cyan border-t-transparent animate-spin" />
          <ShieldCheck className="w-10 h-10 text-neon-cyan animate-pulse" />
        </div>
        <h3 className="text-2xl font-rajdhani font-bold text-white uppercase tracking-wider mb-2">
          PROCESANDO BAREMOS OFICIALES...
        </h3>
        <p className="text-sm text-neon-cyan font-rajdhani tracking-widest uppercase">
          DESBLOQUEANDO ESCUELAS MILITARES COMPATIBLES
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto glass-panel p-6 sm:p-8 rounded-2xl border border-neon-green/30 shadow-tactical-card">
      
      {/* Banner de Éxito Táctico */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
        <div>
          <span className="text-xs font-rajdhani font-bold text-emerald-400 tracking-widest uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            FILTRO LEGAL Y FÍSICO COMPLETADO
          </span>
          <h3 className="text-xl sm:text-2xl font-rajdhani font-bold text-white uppercase tracking-wider mt-0.5">
            Escuelas Matrices Desbloqueadas: {evaluation?.totalAptas} de {evaluation?.totalEscuelas}
          </h3>
        </div>
        <div className="px-4 py-2 rounded-xl bg-night-deep/80 border border-emerald-500/40 text-emerald-400 font-rajdhani font-bold text-sm tracking-wider">
          IMC: {evaluation?.imc} (Baremado)
        </div>
      </div>

      {/* Grid de las 8 Escuelas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {evaluation?.results.map((item) => {
          const esc = item.escuela;
          return (
            <div
              key={esc.id}
              className={`p-3.5 rounded-xl border relative overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                item.esApto
                  ? "bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-400 hover:shadow-green-glow"
                  : "bg-red-950/20 border-red-500/30 opacity-75"
              }`}
            >
              {/* Marca de agua institucional */}
              <div className="absolute right-1 bottom-0 text-3xl font-rajdhani font-extrabold text-white/[0.04] pointer-events-none select-none">
                {esc.id}
              </div>

              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-base">{esc.icon}</span>
                  <span className={`text-[10px] font-rajdhani font-bold px-1.5 py-0.5 rounded border uppercase ${
                    item.esApto
                      ? "border-emerald-500/50 text-emerald-400 bg-emerald-950/60"
                      : "border-red-500/50 text-red-400 bg-red-950/60"
                  }`}>
                    {item.esApto ? "✓ APTO" : "✕ OBS"}
                  </span>
                </div>
                <h4 className="font-rajdhani font-bold text-xs text-white uppercase line-clamp-2">
                  {esc.nombre}
                </h4>
                <p className="text-[10px] text-slate-400 font-inter mt-0.5">
                  {esc.rama} · {esc.rango}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/5 text-[10px] text-slate-400">
                {item.esApto ? (
                  <span className="text-emerald-400 font-medium">Requisitos cumplidos</span>
                ) : (
                  <span className="text-red-400 line-clamp-1 font-medium">{item.motivo}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Botones de Navegación */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={() => setPilar1SubStep(3)}
          className="text-xs font-rajdhani font-bold text-slate-400 hover:text-white uppercase tracking-wider"
        >
          ← Modificar Parámetros Médicos
        </button>

        <button
          type="button"
          onClick={nextPillar}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-bold text-base tracking-wider uppercase shadow-cyan-glow-lg hover:bg-cyan-300 transition-all duration-300"
        >
          <span>INICIAR PILAR 2: TEST PSICOMÉTRICO (IPIP-NEO)</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}

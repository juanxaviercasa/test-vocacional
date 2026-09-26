import React from 'react';
import { useAssessmentStore } from '../../../store/useAssessmentStore';
import { Ruler, ArrowLeft, ArrowRight, Activity } from 'lucide-react';

export default function SubStepAnthropometry() {
  const { candidate, updateCandidate, setPilar1SubStep } = useAssessmentStore();

  const h_m = candidate.talla_cm > 3 ? candidate.talla_cm / 100 : candidate.talla_cm;
  const imc = h_m > 0 ? parseFloat((candidate.peso_kg / (h_m * h_m)).toFixed(1)) : 22.0;

  let imcStatus = "Óptimo Militar";
  let imcBadgeClass = "border-emerald-500 text-emerald-400 bg-emerald-950/40";
  if (imc < 18.5) {
    imcStatus = "Bajo Peso";
    imcBadgeClass = "border-amber-500 text-amber-400 bg-amber-950/40";
  } else if (imc > 25 && imc <= 27.5) {
    imcStatus = "Límite Máximo Aceptable";
    imcBadgeClass = "border-amber-500 text-amber-400 bg-amber-950/40";
  } else if (imc > 27.5) {
    imcStatus = "Sobrepeso Descalificante";
    imcBadgeClass = "border-alert-red text-alert-red bg-red-950/40 animate-pulse";
  }

  return (
    <div className="max-w-4xl mx-auto glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 shadow-tactical-card relative overflow-hidden">
      
      {/* Header del Sub-Paso */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div>
          <span className="text-xs font-rajdhani font-bold text-neon-cyan tracking-widest uppercase">
            MICRO-PASO 02 DE 03 // ANTROPOMETRÍA
          </span>
          <h3 className="text-xl sm:text-2xl font-rajdhani font-bold text-white uppercase tracking-wider mt-0.5">
            Biometría y Escaneo Corporal
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1 rounded-lg border text-xs font-rajdhani font-bold tracking-wider uppercase flex items-center gap-1.5 ${imcBadgeClass}`}>
            <Activity className="w-3.5 h-3.5" />
            <span>IMC: {imc} ({imcStatus})</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Columna Izquierda: Parámetros Numéricos */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Estatura y Peso */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-night-deep/80 border border-white/10">
              <label className="block text-[11px] font-rajdhani font-bold text-slate-400 uppercase tracking-wider mb-1">
                Estatura Descalzo (CM)
              </label>
              <div className="flex items-baseline gap-2">
                <input
                  type="number"
                  min="140"
                  max="215"
                  value={candidate.talla_cm}
                  onChange={(e) => updateCandidate('talla_cm', parseFloat(e.target.value) || 160)}
                  className="w-full bg-transparent text-neon-cyan font-rajdhani font-bold text-3xl outline-none"
                />
                <span className="text-xs text-slate-500 font-bold">CM</span>
              </div>
              <span className="text-[10px] text-slate-400">Exigencia mínima: 168cm (M) / 158cm (F)</span>
            </div>

            <div className="p-4 rounded-xl bg-night-deep/80 border border-white/10">
              <label className="block text-[11px] font-rajdhani font-bold text-slate-400 uppercase tracking-wider mb-1">
                Peso Corporal (KG)
              </label>
              <div className="flex items-baseline gap-2">
                <input
                  type="number"
                  min="40"
                  max="140"
                  value={candidate.peso_kg}
                  onChange={(e) => updateCandidate('peso_kg', parseFloat(e.target.value) || 60)}
                  className="w-full bg-transparent text-neon-cyan font-rajdhani font-bold text-3xl outline-none"
                />
                <span className="text-xs text-slate-500 font-bold">KG</span>
              </div>
              <span className="text-[10px] text-slate-400">Rango tabla antropométrica oficial</span>
            </div>
          </div>

          {/* Edad Cumplida */}
          <div className="p-4 rounded-xl bg-night-deep/80 border border-white/10">
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-rajdhani font-bold text-slate-400 uppercase tracking-wider">
                Edad Cumplida (al año de postulación)
              </label>
              <span className="text-sm font-rajdhani font-bold text-neon-cyan">{candidate.edad} AÑOS</span>
            </div>
            <input
              type="range"
              min="15"
              max="26"
              value={candidate.edad}
              onChange={(e) => updateCandidate('edad', parseInt(e.target.value, 10))}
              className="w-full accent-neon-cyan cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-rajdhani mt-1">
              <span>15 AÑOS (MÍN)</span>
              <span>LÍMITE OFICIALES: 21-22 AÑOS</span>
              <span>26 AÑOS (MÁX)</span>
            </div>
          </div>

          {/* Talla Sentado (Ergonomía de Cabinas FAP) */}
          <div className="p-4 rounded-xl bg-night-deep/80 border border-white/10">
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-rajdhani font-bold text-slate-400 uppercase tracking-wider">
                Talla Sentado (Tronco y Cabeza)
              </label>
              <span className="text-sm font-rajdhani font-bold text-neon-cyan">{candidate.talla_sentado_cm} CM</span>
            </div>
            <input
              type="range"
              min="75"
              max="110"
              value={candidate.talla_sentado_cm}
              onChange={(e) => updateCandidate('talla_sentado_cm', parseFloat(e.target.value))}
              className="w-full accent-neon-cyan cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block mt-1">
              Parámetro crítico para cabinas de aviones de caza y helicópteros FAP (Rango: 85 - 98 cm).
            </span>
          </div>

          {/* Autoevaluación de Aptitud Física Militar (Escala Vigesimal 0-20) */}
          <div className="p-4 rounded-xl bg-night-deep/80 border border-emerald-500/30">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="text-[10px] font-rajdhani font-bold text-emerald-400 uppercase tracking-widest block">
                  TABLA MILITAR DE APTITUD FÍSICA (1500M, NATACIÓN, PLANCHAS)
                </span>
                <label className="text-xs font-rajdhani font-bold text-white uppercase tracking-wider">
                  Nota de Rendimiento Físico Estimada (0 - 20)
                </label>
              </div>
              <div className="text-right">
                <span className="text-2xl font-sans font-black text-emerald-400">
                  {candidate.promedio_fisico || 15.0}
                </span>
                <span className="text-[10px] text-slate-400 block">/ 20 Vigesimal</span>
              </div>
            </div>

            <input
              type="range"
              min="8"
              max="20"
              step="0.5"
              value={candidate.promedio_fisico || 15.0}
              onChange={(e) => updateCandidate('promedio_fisico', parseFloat(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />

            <div className="grid grid-cols-3 gap-2 mt-3 text-center">
              <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                <span className="text-[10px] text-slate-400 font-rajdhani block">1,500m Carrera</span>
                <span className="text-[11px] font-rajdhani font-bold text-emerald-300">
                  {(candidate.promedio_fisico || 15) >= 16 ? "< 5:15 min" : (candidate.promedio_fisico || 15) >= 13 ? "5:30 - 6:00 min" : "> 6:15 min"}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                <span className="text-[10px] text-slate-400 font-rajdhani block">50m Natación Crol</span>
                <span className="text-[11px] font-rajdhani font-bold text-cyan-300">
                  {(candidate.promedio_fisico || 15) >= 15 ? "Apto (< 45s)" : (candidate.promedio_fisico || 15) >= 12 ? "Apto Básico" : "Riesgo"}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                <span className="text-[10px] text-slate-400 font-rajdhani block">Planchas / Flex</span>
                <span className="text-[11px] font-rajdhani font-bold text-amber-300">
                  {(candidate.promedio_fisico || 15) >= 16 ? "+40 reps" : (candidate.promedio_fisico || 15) >= 13 ? "28 - 38 reps" : "< 25 reps"}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Columna Derecha: SVG de Escaneo Humano Holográfico */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative p-6 rounded-2xl bg-night-deep/60 border border-neon-cyan/20">
          
          {/* Retícula y Efecto de Escaneo */}
          <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
          
          {/* Silueta Wireframe Holográfica con HUD Lines */}
          <div className="relative w-48 h-64 flex items-center justify-center">
            <svg
              viewBox="0 0 200 300"
              className="w-full h-full text-neon-cyan/60 filter drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]"
            >
              {/* Líneas de escaneo horizontal */}
              <line x1="10" y1="50" x2="190" y2="50" stroke="#00F0FF" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <line x1="10" y1="150" x2="190" y2="150" stroke="#00F0FF" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <line x1="10" y1="240" x2="190" y2="240" stroke="#00F0FF" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              
              {/* Silueta humana vectorizada */}
              <path
                d="M100 20 C110 20 118 28 118 40 C118 52 110 58 100 58 C90 58 82 52 82 40 C82 28 90 20 100 20 Z 
                   M75 68 L125 68 L140 135 L125 140 L120 100 L120 185 L135 275 L115 275 L105 195 L95 195 L85 275 L65 275 L80 185 L80 100 L75 140 L60 135 Z"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* Puntos clave biométricos */}
              <circle cx="100" cy="40" r="3" fill="#00F0FF" />
              <circle cx="100" cy="95" r="3" fill="#10B981" />
              <circle cx="100" cy="180" r="3" fill="#FFD700" />
            </svg>

            {/* Marcadores de cota */}
            <div className="absolute right-0 top-12 text-[10px] font-rajdhani font-bold text-neon-cyan bg-night-deep/80 px-1.5 py-0.5 rounded border border-neon-cyan/40">
              {candidate.talla_cm} CM
            </div>
            <div className="absolute left-0 bottom-24 text-[10px] font-rajdhani font-bold text-emerald-400 bg-night-deep/80 px-1.5 py-0.5 rounded border border-emerald-500/40">
              {candidate.peso_kg} KG
            </div>
          </div>

          <div className="text-center mt-2">
            <span className="text-[11px] font-rajdhani font-bold text-slate-300 tracking-widest uppercase">
              ESCÁNER ANTROPOMÉTRICO ACTIVO
            </span>
            <span className="block text-[10px] text-slate-500">Parámetros procesados contra tablas DIGEMIN</span>
          </div>

        </div>

      </div>

      {/* Navegación entre micro-pasos */}
      <div className="pt-6 border-t border-white/10 mt-6 flex justify-between items-center">
        <button
          type="button"
          onClick={() => setPilar1SubStep(1)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-slate-300 hover:text-white hover:bg-white/5 font-rajdhani font-bold text-sm tracking-wider uppercase transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        <button
          type="button"
          onClick={() => setPilar1SubStep(3)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-bold text-sm tracking-wider uppercase shadow-cyan-glow hover:bg-cyan-300 transition-all duration-300"
        >
          <span>Siguiente: Filtro Médico y Legal</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

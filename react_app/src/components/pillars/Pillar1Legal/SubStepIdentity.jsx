import React from 'react';
import { useAssessmentStore } from '../../../store/useAssessmentStore';
import TacticalRadioCard from '../../common/TacticalRadioCard';
import { User, ArrowRight } from 'lucide-react';

export default function SubStepIdentity() {
  const { candidate, updateCandidate, setPilar1SubStep } = useAssessmentStore();

  const handleNext = (e) => {
    e.preventDefault();
    setPilar1SubStep(2);
  };

  return (
    <div className="max-w-2xl mx-auto glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 shadow-tactical-card">
      
      {/* Header del Sub-Paso */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div>
          <span className="text-xs font-rajdhani font-bold text-neon-cyan tracking-widest uppercase">
            MICRO-PASO 01 DE 03 // IDENTIFICACIÓN
          </span>
          <h3 className="text-xl sm:text-2xl font-rajdhani font-bold text-white uppercase tracking-wider mt-0.5">
            Identidad Básica del Postulante
          </h3>
        </div>
        <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan">
          <User className="w-5 h-5" />
        </div>
      </div>

      <form onSubmit={handleNext} className="space-y-6">
        {/* Nombre Completo */}
        <div>
          <label className="block text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider mb-2">
            Nombre y Apellidos Completos
          </label>
          <input
            type="text"
            required
            value={candidate.nombre}
            onChange={(e) => updateCandidate('nombre', e.target.value)}
            placeholder="Ej. Carlos Mendoza Ramos"
            className="w-full px-4 py-3 rounded-xl bg-night-deep/80 border border-white/15 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan text-white placeholder-slate-500 font-inter text-sm outline-none transition-all"
          />
        </div>

        {/* DNI */}
        <div>
          <label className="block text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider mb-2">
            Documento Nacional de Identidad (DNI)
          </label>
          <input
            type="text"
            maxLength={8}
            pattern="[0-9]{8}"
            value={candidate.dni}
            onChange={(e) => updateCandidate('dni', e.target.value.replace(/\D/g, ''))}
            placeholder="8 dígitos oficiales"
            className="w-full px-4 py-3 rounded-xl bg-night-deep/80 border border-white/15 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan text-white placeholder-slate-500 font-inter text-sm outline-none transition-all"
          />
        </div>

        {/* Sexo Biológico (Radio Cards Tácticos) */}
        <div>
          <label className="block text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider mb-2">
            Sexo Biológico (Según DNI para baremos antropométricos)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TacticalRadioCard
              selected={candidate.sexo === 'M'}
              onClick={() => updateCandidate('sexo', 'M')}
              title="Varón (Masculino)"
              subtitle="Baremo militar para postulantes masculinos"
              icon="♂"
              badge="OFICIAL"
            />
            <TacticalRadioCard
              selected={candidate.sexo === 'F'}
              onClick={() => updateCandidate('sexo', 'F')}
              title="Dama (Femenino)"
              subtitle="Baremo militar para postulantes femeninas"
              icon="♀"
              badge="OFICIAL"
            />
          </div>
        </div>

        {/* Botón de Avance */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-bold text-sm tracking-wider uppercase shadow-cyan-glow hover:bg-cyan-300 transition-all duration-300"
          >
            <span>Siguiente: Antropometría y Escaneo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

    </div>
  );
}

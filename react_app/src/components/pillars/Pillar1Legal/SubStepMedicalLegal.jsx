import React from 'react';
import { useAssessmentStore } from '../../../store/useAssessmentStore';
import TacticalRadioCard from '../../common/TacticalRadioCard';
import { ArrowLeft, ArrowRight, ShieldAlert } from 'lucide-react';

export default function SubStepMedicalLegal() {
  const { candidate, updateCandidate, setPilar1SubStep } = useAssessmentStore();

  return (
    <div className="max-w-3xl mx-auto glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 shadow-tactical-card">
      
      {/* Header del Sub-Paso */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div>
          <span className="text-xs font-rajdhani font-bold text-neon-cyan tracking-widest uppercase">
            MICRO-PASO 03 DE 03 // CONDICIÓN MÉDICO-LEGAL
          </span>
          <h3 className="text-xl sm:text-2xl font-rajdhani font-bold text-white uppercase tracking-wider mt-0.5">
            Filtros Excluyentes de Aptitud
          </h3>
        </div>
        <div className="w-10 h-10 rounded-xl bg-amber-950/40 border border-alert-amber/40 flex items-center justify-center text-alert-amber">
          <ShieldAlert className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Tatuajes Visibles */}
        <div>
          <label className="block text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider mb-2">
            Tatuajes en Zonas Visibles con Uniforme de Verano
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TacticalRadioCard
              selected={!candidate.tiene_tatuajes}
              onClick={() => updateCandidate('tiene_tatuajes', false)}
              title="Sin Tatuajes Visibles"
              subtitle="Cumple normativa militar de porte y presentación"
              badge="APTO"
            />
            <TacticalRadioCard
              selected={candidate.tiene_tatuajes}
              onClick={() => updateCandidate('tiene_tatuajes', true)}
              title="Poseo Tatuajes Visibles"
              subtitle="En cuello, antebrazos, manos o piernas (Restricción)"
              badge="OBSERVADO"
            />
          </div>
        </div>

        {/* Agudeza Visual */}
        <div>
          <label className="block text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider mb-2">
            Agudeza Visual (Ambos Ojos)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TacticalRadioCard
              selected={candidate.agudeza_visual_20_20}
              onClick={() => updateCandidate('agudeza_visual_20_20', true)}
              title="20/20 Natural Sin Lentes"
              subtitle="Exigido para Oficiales de Armas y Pilotos EOFAP"
              badge="PILOTO OK"
            />
            <TacticalRadioCard
              selected={!candidate.agudeza_visual_20_20}
              onClick={() => updateCandidate('agudeza_visual_20_20', false)}
              title="Uso de Lentes Correctores"
              subtitle="Apto para especialidades técnicas y de servicios"
              badge="SERVICIOS"
            />
          </div>
        </div>

        {/* Antecedentes Penales o Policiales */}
        <div>
          <label className="block text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider mb-2">
            Antecedentes Penales, Judiciales o Policiales
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TacticalRadioCard
              selected={!candidate.tiene_antecedentes}
              onClick={() => updateCandidate('tiene_antecedentes', false)}
              title="Carezco de Antecedentes"
              subtitle="Hoja de vida intachable / Sin registros"
              badge="APTO"
            />
            <TacticalRadioCard
              selected={candidate.tiene_antecedentes}
              onClick={() => updateCandidate('tiene_antecedentes', true)}
              title="Registro Antecedentes"
              subtitle="Causal de exclusión directa por ley militar"
              badge="EXCLUYENTE"
            />
          </div>
        </div>

        {/* Educación Secundaria */}
        <div>
          <label className="block text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-wider mb-2">
            Educación Básica Regular (Secundaria)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TacticalRadioCard
              selected={candidate.secundaria_completa}
              onClick={() => updateCandidate('secundaria_completa', true)}
              title="Culminada / Cursando 5to"
              subtitle="Certificado oficial de estudios visado"
              badge="APTO"
            />
            <TacticalRadioCard
              selected={!candidate.secundaria_completa}
              onClick={() => updateCandidate('secundaria_completa', false)}
              title="Incompleta"
              subtitle="No cumple requisito académico mínimo"
              badge="NO APTO"
            />
          </div>
        </div>

      </div>

      {/* Navegación entre micro-pasos */}
      <div className="pt-6 border-t border-white/10 mt-6 flex justify-between items-center">
        <button
          type="button"
          onClick={() => setPilar1SubStep(2)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-slate-300 hover:text-white hover:bg-white/5 font-rajdhani font-bold text-sm tracking-wider uppercase transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        <button
          type="button"
          onClick={() => setPilar1SubStep(4)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-bold text-sm tracking-wider uppercase shadow-cyan-glow hover:bg-cyan-300 transition-all duration-300"
        >
          <span>Finalizar Filtro y Desbloquear Escuelas</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

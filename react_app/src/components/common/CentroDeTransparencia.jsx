import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OFFICIAL_PROSPECTUSES } from '../../data/officialProspectusData';
import {
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  X,
  BookOpen,
  Scale,
  Award,
  Search,
  Filter
} from 'lucide-react';

export default function CentroDeTransparencia({ isOpen, onClose }) {
  const [filterFuerza, setFilterFuerza] = useState('TODAS');
  const [searchQuery, setSearchQuery] = useState('');

  // Cerrar con la tecla Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const filtered = OFFICIAL_PROSPECTUSES.filter((p) => {
    const matchesFilter =
      filterFuerza === 'TODAS' ||
      p.fuerza.toUpperCase().includes(filterFuerza.toUpperCase());
    const matchesSearch =
      searchQuery === '' ||
      p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sigla.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.prospectoTitulo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop con Blur y Oscurecimiento */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
          />

          {/* Contenedor Modal Flotante */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-50 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[#0B101E] border border-neon-cyan/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] text-white overflow-hidden my-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Header del Modal */}
            <div className="p-6 sm:p-8 border-b border-white/10 relative overflow-hidden bg-gradient-to-r from-slate-900 via-[#0B101E] to-slate-900">
              <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-start justify-between gap-4 relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-xs font-rajdhani font-bold tracking-widest uppercase mb-2 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>MÓDULO DE CONFIANZA Y AUDITORÍA DE CONTENIDOS</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-sans font-black text-white uppercase tracking-tight leading-tight">
                    100% Basado en Prospectos Oficiales de Admisión
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 font-inter mt-1.5 max-w-2xl leading-relaxed">
                    Cada reactivo del balotario, baremo de aptitud física y estándar biométrico de esta plataforma se encuentra rigurosamente contrastado con las resoluciones y prospectos oficiales de las Fuerzas Armadas y Policía Nacional del Perú (Convocatorias 2026 / 2027).
                  </p>
                </div>

                {/* Botón Cerrar */}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                  title="Cerrar ventana"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filtros Rápidos por Fuerza */}
              <div className="flex flex-wrap items-center gap-2 mt-5 pt-3 border-t border-white/10">
                {['TODAS', 'EJÉRCITO', 'MARINA', 'FUERZA AÉREA', 'POLICÍA'].map((fuerza) => (
                  <button
                    key={fuerza}
                    type="button"
                    onClick={() => setFilterFuerza(fuerza)}
                    className={`px-3.5 py-1.5 rounded-xl font-rajdhani font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      filterFuerza === fuerza
                        ? "bg-neon-cyan text-night-deep shadow-cyan-glow font-black"
                        : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {fuerza}
                  </button>
                ))}
              </div>
            </div>

            {/* Lista Interactiva de las 8 Instituciones */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[60vh]">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-neon-cyan/40 transition-all duration-200 space-y-3"
                >
                  {/* Encabezado de la Institución */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl select-none">{item.icono}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-rajdhani font-black text-neon-cyan uppercase tracking-wider">
                            {item.sigla} · {item.fuerza}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        </div>
                        <h3 className="text-base sm:text-lg font-rajdhani font-bold text-white uppercase leading-snug">
                          {item.prospectoTitulo}
                        </h3>
                      </div>
                    </div>

                    {/* Botón de Acción Requerido: Ver Prospecto Original */}
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-neon-cyan/15 hover:bg-neon-cyan text-neon-cyan hover:text-night-deep border border-neon-cyan/40 font-rajdhani font-bold text-xs uppercase tracking-wider transition-all duration-200 flex-shrink-0 cursor-pointer shadow-sm"
                      title={`Descargar o previsualizar el PDF oficial de ${item.sigla}`}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Ver Prospecto Original</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Notas de Páginas Utilizadas para Extraer Temario y Baremos */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-inter pt-1">
                    
                    {/* Temario Oficial */}
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                      <span className="font-rajdhani font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Extracción del Temario:</span>
                      </span>
                      <p className="text-slate-200 leading-relaxed text-[11px]">
                        {item.paginasTemario}
                      </p>
                    </div>

                    {/* Baremos Físicos */}
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                      <span className="font-rajdhani font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Baremos de Esfuerzo Físico:</span>
                      </span>
                      <p className="text-slate-200 leading-relaxed text-[11px]">
                        {item.paginasFisico}
                      </p>
                    </div>

                    {/* Normas Médicas y Base Legal */}
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                      <span className="font-rajdhani font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                        <Scale className="w-3.5 h-3.5" />
                        <span>Base Legal y Sanidad:</span>
                      </span>
                      <p className="text-slate-200 leading-relaxed text-[11px]">
                        {item.paginasMedico}
                      </p>
                    </div>

                  </div>

                  {/* Pie de Ficha con Resolución Oficial */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5">
                    <span>{item.resolucionOficial}</span>
                    <span className="text-emerald-400 font-rajdhani font-bold uppercase tracking-wider">
                      ✓ Auditado y Conforme 2026/2027
                    </span>
                  </div>

                </div>
              ))}
            </div>

            {/* Footer del Modal */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 font-inter text-center sm:text-left">
                Repositorio de Prospectos Oficiales regulado por la Ley N° 29248 del Servicio Militar y Admisión Castrense.
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-rajdhani font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
              >
                Cerrar Centro
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

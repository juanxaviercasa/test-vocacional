/**
 * PsychometricView.jsx
 * Vista 2: 'Test Psicométrico IPIP-NEO'
 * Conecta 'psicometria.json'.
 * Permite seleccionar entre "Integral 120" o "Rápido 50".
 * Implementa el cálculo de la distancia euclidiana frente a los perfiles ideales institucionales.
 */

import React, { useState } from 'react';

const LIKERT_OPTIONS = [
  { value: 1, label: 'Muy en desacuerdo', short: '1' },
  { value: 2, label: 'En desacuerdo', short: '2' },
  { value: 3, label: 'Neutral', short: '3' },
  { value: 4, label: 'De acuerdo', short: '4' },
  { value: 5, label: 'Muy de acuerdo', short: '5' }
];

export const PsychometricView = ({
  psychometric,
  onSetMode,
  onAnswerItem,
  onComputeResults,
  onNext,
  onPrev
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const { mode, questions = [], answers = {}, normalizedBigFive, compatibilityBySchool, isCompleted } = psychometric;

  const totalAnswered = Object.keys(answers).length;
  const progressPct = questions.length > 0 ? Math.round((totalAnswered / questions.length) * 100) : 0;

  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const currentQuestions = questions.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handleQuickFill = () => {
    questions.forEach(q => {
      if (!answers[q.id_reactivo]) {
        // Asignar respuestas simuladas balanceadas
        const val = Math.floor(Math.random() * 2) + 4; // 4 o 5
        onAnswerItem(q.id_reactivo, val);
      }
    });
    onComputeResults();
  };

  return (
    <section className="stepper-view psychometric-view">
      <div className="view-header">
        <span className="step-badge">Fase 2 de 4</span>
        <h2>🧠 Evaluación Psicométrica Militar (Modelo Big Five IPIP-NEO)</h2>
        <p className="view-subtitle">
          Calibración de perfil de personalidad militar y cálculo de distancia euclidiana frente a los estándares de las FF.AA.
        </p>
      </div>

      {/* Selector de Modo: Integral 120 vs Rápido 50 */}
      <div className="card-glass mode-selector-box">
        <span className="mode-label">Seleccione Modalidad de Evaluación:</span>
        <div className="mode-toggle-group">
          <button
            type="button"
            className={`mode-btn ${mode === 'rapido_50' ? 'active' : ''}`}
            onClick={() => {
              onSetMode('rapido_50');
              setCurrentPage(0);
            }}
          >
            ⚡ Modo Rápido (50 Reactivos · ~12 min)
          </button>
          <button
            type="button"
            className={`mode-btn ${mode === 'integral_120' ? 'active' : ''}`}
            onClick={() => {
              onSetMode('integral_120');
              setCurrentPage(0);
            }}
          >
            🎯 Modo Integral (120 Reactivos · ~25 min)
          </button>
        </div>

        <button
          type="button"
          className="btn-outline-gold-sm"
          onClick={handleQuickFill}
          title="Rellena las respuestas automáticamente con datos coherentes para pruebas rápidas"
        >
          ⚡ Relleno Rápido de Demostración
        </button>
      </div>

      {/* Barra de Progreso */}
      <div className="progress-bar-container">
        <div className="progress-bar-header">
          <span>Progreso del Test Psicométrico: <strong>{totalAnswered} de {questions.length}</strong> reactivos</span>
          <span>{progressPct}% completado</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Lista de Preguntas Likert */}
      <div className="psychometric-questions-container">
        {currentQuestions.map((q, idx) => {
          const globalIdx = currentPage * itemsPerPage + idx + 1;
          const currentVal = answers[q.id_reactivo];

          return (
            <div key={q.id_reactivo} className={`psycho-question-card ${currentVal ? 'answered' : ''}`}>
              <div className="question-card-meta">
                <span className="q-badge">#{globalIdx}</span>
                <span className="domain-badge">{q.dominio_evaluado || 'Personalidad Militar'}</span>
              </div>

              <p className="psycho-statement-text">{q.enunciado}</p>

              {/* Escala Likert de 5 Puntos */}
              <div className="likert-buttons-row">
                {LIKERT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`likert-btn ${currentVal === opt.value ? 'selected' : ''}`}
                    onClick={() => onAnswerItem(q.id_reactivo, opt.value)}
                  >
                    <span className="likert-num">{opt.short}</span>
                    <span className="likert-text">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Paginación de Reactivos */}
      <div className="pagination-controls">
        <button
          type="button"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="btn-secondary"
        >
          ◂ Bloque Anterior
        </button>

        <span className="pagination-info">
          Página {currentPage + 1} de {totalPages}
        </span>

        {currentPage < totalPages - 1 ? (
          <button
            type="button"
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="btn-secondary"
          >
            Siguiente Bloque ▸
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onComputeResults()}
            className="btn-gold-sm"
          >
            📊 Calcular Distancia Euclidiana
          </button>
        )}
      </div>

      {/* Visualización de Resultados y Distancia Euclidiana si ya se computó */}
      {compatibilityBySchool && Object.keys(compatibilityBySchool).length > 0 && (
        <div className="card-glass euclidean-results-card">
          <h3 className="euclidean-title">📏 Distancia Euclidiana y Similitud Psicométrica Oficial</h3>
          <p className="euclidean-subtitle">
            Calculada en el hiperespacio 5D de los Cinco Grandes (N, E, O, A, C) frente al perfil ideal de cada institución:
          </p>

          <div className="big-five-bars-row">
            {Object.entries(normalizedBigFive).map(([dom, val]) => (
              <div key={dom} className="domain-metric-box">
                <span className="dom-name">{dom}</span>
                <strong className="dom-val">{val}%</strong>
                <div className="dom-mini-bar">
                  <div className="dom-mini-fill" style={{ width: `${val}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="euclidean-grid">
            {Object.values(compatibilityBySchool).map((esc) => (
              <div key={esc.escuela_id} className="euclidean-school-card">
                <div className="esc-header">
                  <strong>{esc.escuela_id}</strong>
                  <span className="esc-rango">{esc.rango}</span>
                </div>
                <div className="euclidean-affinity-val">{esc.afinidad_pct}%</div>
                <div className="euclidean-metric-sub">
                  Distancia: <code>{esc.euclidean_distance}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="view-footer-actions">
        <button type="button" className="btn-secondary" onClick={onPrev}>
          ◂ Volver a Filtro Físico
        </button>
        <button
          type="button"
          className="btn-gold-action"
          onClick={() => {
            onComputeResults();
            onNext();
          }}
        >
          <span>Avanzar a Fase 3: Simulador de Conocimientos ▸</span>
        </button>
      </div>
    </section>
  );
};

export default PsychometricView;

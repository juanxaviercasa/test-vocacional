/**
 * KnowledgeView.jsx
 * Vista 3: 'Simulador de Conocimientos'
 * Conecta 'conocimientos.json'.
 * Implementa extracción aleatoria de 20 preguntas sin repetir.
 * Renderiza sintaxis LaTeX (KaTeX) y gráficos vectoriales ('imagen_url').
 */

import React from 'react';
import QuestionCard from '../../../react_components/QuestionCard.jsx';

export const KnowledgeView = ({
  knowledge,
  onSample20,
  onAnswerQuestion,
  onGradeExam,
  onNext,
  onPrev
}) => {
  const { questions = [], answers = {}, scoreResult } = knowledge;

  const answeredCount = Object.keys(answers).length;

  const handleQuickFill = () => {
    questions.forEach(q => {
      if (!answers[q.id_pregunta]) {
        const opts = ['A', 'B', 'C', 'D'];
        const choice = opts[Math.floor(Math.random() * opts.length)];
        onAnswerQuestion(q.id_pregunta, choice);
      }
    });
    onGradeExam();
  };

  return (
    <section className="stepper-view knowledge-view">
      <div className="view-header">
        <span className="step-badge">Fase 3 de 4</span>
        <h2>📝 Simulador de Examen de Conocimientos y Psicotécnico</h2>
        <p className="view-subtitle">
          20 preguntas extraídas aleatoriamente de la base maestra sin repetir. Penalización oficial: Acierto (+1.0) · Error (-0.25) · Blanco (0.0).
        </p>
      </div>

      <div className="card-glass knowledge-toolbar">
        <div>
          <span className="toolbar-info">
            Respondidas: <strong>{answeredCount} de {questions.length}</strong> preguntas
          </span>
        </div>
        <div className="toolbar-buttons">
          <button
            type="button"
            className="btn-outline-gold-sm"
            onClick={onSample20}
            title="Extrae un nuevo lote de 20 preguntas al azar sin repetir"
          >
            🎲 Extraer Nuevo Lote Aleatorio
          </button>
          <button
            type="button"
            className="btn-outline-gold-sm"
            onClick={handleQuickFill}
          >
            ⚡ Simulación Rápida de Respuestas
          </button>
        </div>
      </div>

      {/* Listado de las 20 Preguntas */}
      <div className="knowledge-questions-list">
        {questions.map((q, idx) => (
          <div key={q.id_pregunta} className="question-item-wrapper">
            <QuestionCard
              question={q}
              questionNumber={idx + 1}
              totalQuestions={questions.length}
              selectedOption={answers[q.id_pregunta] || null}
              onSelectOption={(optId) => onAnswerQuestion(q.id_pregunta, optId)}
            />
          </div>
        ))}
      </div>

      {/* Resultados de Calificación si ya fue evaluado */}
      {scoreResult && (
        <div className="card-glass score-summary-card">
          <div className="score-summary-header">
            <h3>🎖️ Calificación Oficial de Conocimientos</h3>
            <div className="vigesimal-pill">
              Nota: <strong>{scoreResult.notaVigesimal}</strong> / 20.00
            </div>
          </div>

          <div className="score-metrics-grid">
            <div className="score-metric-box hit">
              <span className="metric-label">✓ Aciertos (+1.0)</span>
              <strong className="metric-val">{scoreResult.aciertos}</strong>
            </div>
            <div className="score-metric-box err">
              <span className="metric-label">✗ Errores (-0.25)</span>
              <strong className="metric-val">{scoreResult.errores}</strong>
            </div>
            <div className="score-metric-box blank">
              <span className="metric-label">⚪ En Blanco (0.0)</span>
              <strong className="metric-val">{scoreResult.blancos}</strong>
            </div>
            <div className="score-metric-box net">
              <span className="metric-label">📊 Puntaje Neto</span>
              <strong className="metric-val">{scoreResult.puntajeNeto}</strong>
            </div>
          </div>
        </div>
      )}

      <div className="view-footer-actions">
        <button type="button" className="btn-secondary" onClick={onPrev}>
          ◂ Volver al Test Psicométrico
        </button>
        <button
          type="button"
          className="btn-gold-action"
          onClick={() => {
            onGradeExam();
            onNext();
          }}
        >
          <span>Avanzar a Fase 4: Dictamen Consolidado ▸</span>
        </button>
      </div>
    </section>
  );
};

export default KnowledgeView;

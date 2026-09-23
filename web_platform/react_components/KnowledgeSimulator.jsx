/**
 * KnowledgeSimulator.jsx
 * Componente Contenedor del Simulador de Examen de Conocimientos y Psicotécnico
 * Gestiona:
 * - Selección de escuela militar (EMCH, ENP, EOFAP, EO-PNP, etc.)
 * - Carga de preguntas desde el backend o desde 'conocimientos_psicotecnico.json'
 * - Temporizador regresivo oficial
 * - Navegación entre preguntas y marcado rápido (teclas 1-5 y flechas)
 * - Calificación con penalización oficial (-0.25 por error)
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';
import './KnowledgeSimulator.css';

export const KnowledgeSimulator = ({
  initialQuestions = [],
  schoolId = 'EMCH',
  timeMinutes = 45,
  onSubmit = null,
}) => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [secondsRemaining, setSecondsRemaining] = useState(timeMinutes * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  // Carga inicial si no se proporcionan preguntas
  useEffect(() => {
    if (initialQuestions && initialQuestions.length > 0) {
      setQuestions(initialQuestions);
    } else {
      // Fetch desde API del sistema
      fetch(`/api/vocational/mock-100?school=${schoolId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.preguntas) {
            setQuestions(data.preguntas.slice(0, 30));
          }
        })
        .catch((err) => console.error('Error al cargar banco:', err));
    }
  }, [initialQuestions, schoolId]);

  // Temporizador regresivo
  useEffect(() => {
    if (isFinished || secondsRemaining <= 0) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished, secondsRemaining]);

  const handleSelectOption = useCallback((optionId) => {
    if (isFinished || questions.length === 0) return;
    const currentQ = questions[currentIndex];
    const qId = currentQ.id_pregunta || currentQ.id;

    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optionId,
    }));
  }, [currentIndex, isFinished, questions]);

  // Navegación por teclado (teclas 1 a 5 para opciones, flechas izquierda/derecha)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFinished) return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 5) {
        const letters = ['A', 'B', 'C', 'D', 'E'];
        handleSelectOption(letters[num - 1]);
      } else if (e.key === 'ArrowRight' && currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, handleSelectOption, isFinished, questions.length]);

  const handleFinish = () => {
    setIsFinished(true);

    let aciertos = 0;
    let errores = 0;
    let blancos = 0;

    questions.forEach((q) => {
      const qId = q.id_pregunta || q.id;
      const userChoice = userAnswers[qId];

      // Determinar correcta
      let correctId = null;
      if (q.opciones) {
        const correctOpt = q.opciones.find((o) => o.es_correcta);
        if (correctOpt) correctId = correctOpt.id_opcion;
      }
      if (!correctId && q.correct_index !== undefined) {
        const letters = ['A', 'B', 'C', 'D', 'E'];
        correctId = letters[q.correct_index];
      }

      if (!userChoice) {
        blancos++;
      } else if (userChoice === correctId) {
        aciertos++;
      } else {
        errores++;
      }
    });

    const total = questions.length || 1;
    const puntajeNeto = Math.max(0, aciertos * 1.0 - errores * 0.25);
    const notaVigesimal = Number(((puntajeNeto / total) * 20.0).toFixed(2));
    const esAprobado = notaVigesimal >= 12.0;

    const result = {
      aciertos,
      errores,
      blancos,
      puntajeNeto,
      notaVigesimal,
      esAprobado,
      total,
    };

    setScoreResult(result);
    if (onSubmit) onSubmit(result);
  };

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) {
    return (
      <div className="knowledge-simulator-loading">
        <div className="spinner-gold" />
        <p>Cargando banco de conocimientos y psicotécnico militar...</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const currentQId = currentQ?.id_pregunta || currentQ?.id;

  return (
    <div className="knowledge-simulator-root">
      {/* Barra Superior con Temporizador y Progreso */}
      <header className="simulator-header-bar">
        <div className="simulator-status-info">
          <span className="simulator-target-badge">🎯 {schoolId}</span>
          <span className="simulator-progress-text">
            Pregunta {currentIndex + 1} de {questions.length}
          </span>
        </div>

        {/* Grilla de Navegación Rápida */}
        <div className="simulator-nav-pills-row">
          {questions.map((q, idx) => {
            const qId = q.id_pregunta || q.id;
            const isAnswered = Boolean(userAnswers[qId]);
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={qId}
                type="button"
                className={`nav-pill-btn ${isCurrent ? 'current' : ''} ${isAnswered ? 'answered' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Cronómetro Oficial */}
        <div className={`simulator-timer-box ${secondsRemaining < 300 ? 'urgent' : ''}`}>
          <span>⏱️</span>
          <span>{formatTimer(secondsRemaining)}</span>
        </div>
      </header>

      {/* Tarjeta de la Pregunta Actual */}
      <main className="simulator-question-viewport">
        <QuestionCard
          question={currentQ}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          selectedOption={userAnswers[currentQId] || null}
          onSelectOption={handleSelectOption}
          disabled={isFinished}
        />
      </main>

      {/* Controles de Navegación Inferiores */}
      <footer className="simulator-footer-bar">
        <button
          type="button"
          className="btn-sim-secondary"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((prev) => prev - 1)}
        >
          ◂ Anterior
        </button>

        <div className="simulator-helper-hint">
          💡 Puedes presionar teclas <strong>1 al 5</strong> para marcar opciones y <strong>← / →</strong> para navegar.
        </div>

        <div className="simulator-actions-right">
          {currentIndex < questions.length - 1 ? (
            <button
              type="button"
              className="btn-sim-primary"
              onClick={() => setCurrentIndex((prev) => prev + 1)}
            >
              Siguiente ▸
            </button>
          ) : (
            <button
              type="button"
              className="btn-sim-finish"
              onClick={handleFinish}
            >
              🏁 Finalizar y Calificar
            </button>
          )}
        </div>
      </footer>

      {/* Modal de Resultados */}
      {isFinished && scoreResult && (
        <div className="simulator-result-modal-backdrop">
          <div className="simulator-result-modal-card">
            <h3>Dictamen Oficial de Admisión</h3>
            <div className={`score-badge ${scoreResult.esAprobado ? 'approved' : 'failed'}`}>
              <div className="score-number">{scoreResult.notaVigesimal}</div>
              <div className="score-scale">Escala Vigesimal (0-20)</div>
            </div>
            <p className="status-verdict">
              {scoreResult.esAprobado ? '✅ APTO EN CONOCIMIENTOS' : '❌ NO ALCANZÓ EL PUNTAJE MÍNIMO'}
            </p>

            <div className="score-breakdown-row">
              <span className="hit-count">✓ Correctas: {scoreResult.aciertos}</span>
              <span className="err-count">✗ Incorrectas (-0.25): {scoreResult.errores}</span>
              <span className="blank-count">⚪ En Blanco: {scoreResult.blancos}</span>
            </div>

            <button
              type="button"
              className="btn-sim-primary"
              onClick={() => window.location.reload()}
            >
              🔄 Intentar Nuevo Simulacro
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

KnowledgeSimulator.propTypes = {
  initialQuestions: PropTypes.array,
  schoolId: PropTypes.string,
  timeMinutes: PropTypes.number,
  onSubmit: PropTypes.func,
};

export default KnowledgeSimulator;

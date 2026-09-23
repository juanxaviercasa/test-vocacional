/**
 * QuestionCard.jsx
 * Componente de Tarjeta de Pregunta para el Simulador de Conocimientos.
 *
 * ESQUEMA ACTUALIZADO DE LA PREGUNTA:
 * {
 *   id_pregunta: string,
 *   area_academica: string,
 *   tema_especifico: string,
 *   enunciado: string,       // Soporta texto plano y sintaxis LaTeX ($...$, $$...$$)
 *   imagen_url?: string,     // CONDICIONAL: ej. "/assets/math/geo_01.svg"
 *   imagen_alt?: string,     // Texto alternativo accesible para la imagen
 *   opciones: Array<{
 *     id_opcion: string,     // 'A', 'B', 'C', 'D', 'E'
 *     texto_respuesta: string // Soporta sintaxis LaTeX
 *   }>,
 *   nivel_dificultad?: number
 * }
 */

import React from 'react';
import PropTypes from 'prop-types';
import LatexRenderer from './LatexRenderer';

export const QuestionCard = ({
  question,
  questionNumber = 1,
  totalQuestions = 30,
  selectedOption = null,
  onSelectOption = () => {},
  showFeedback = false,
  correctOption = null,
  disabled = false,
}) => {
  if (!question) return null;

  // Extraer propiedades soportando ambas nomenclaturas (banco local vs prospecto oficial)
  const qId = question.id_pregunta || question.id;
  const area = question.area_academica || question.subject || 'Ciencias Exactas';
  const tema = question.tema_especifico || question.subtopic || '';
  const enunciado = question.enunciado || question.question || '';
  const imagenUrl = question.imagen_url || null;
  const imagenAlt = question.imagen_alt || `Diagrama vectorial para el ejercicio ${qId}`;

  // Normalizar opciones
  const opciones = (question.opciones || []).map((opt, idx) => {
    if (typeof opt === 'string') {
      const letters = ['A', 'B', 'C', 'D', 'E'];
      return { id_opcion: letters[idx] || `${idx + 1}`, texto_respuesta: opt };
    }
    return {
      id_opcion: opt.id_opcion || opt.id || String.fromCharCode(65 + idx),
      texto_respuesta: opt.texto_respuesta || opt.text || '',
    };
  });

  return (
    <article className="knowledge-question-card" id={`card-question-${qId}`}>
      {/* 1. Barra de Metadatos: Número, Área Académica y Tema */}
      <header className="exam-card-header">
        <div className="exam-card-badge-row">
          <span className="exam-question-number-pill">
            Pregunta #{questionNumber} de {totalQuestions}
          </span>
          <span className="exam-area-tag">{area}</span>
        </div>
        {tema && <span className="exam-subtopic-tag">{tema}</span>}
      </header>

      {/* 2. Enunciado con soporte para fórmulas complejas LaTeX */}
      <div className="exam-statement-container">
        <LatexRenderer content={enunciado} className="exam-statement-text" />
      </div>

      {/* 3. CONDICIONAL: Renderizado de Imagen/Gráfico Vectorial centrado debajo del enunciado y encima de las opciones */}
      {imagenUrl && (
        <figure className="exam-question-image-wrapper">
          <img
            src={imagenUrl}
            alt={imagenAlt}
            className="exam-question-image"
            loading="lazy"
            onError={(e) => {
              console.warn(`No se pudo cargar el gráfico vectorial en: ${imagenUrl}`);
              e.currentTarget.style.display = 'none';
            }}
          />
          <figcaption className="exam-question-image-caption">
            {imagenAlt}
          </figcaption>
        </figure>
      )}

      {/* 4. Opciones de Respuesta con soporte LaTeX para cada alternativa */}
      <div
        className="exam-options-grid"
        role="radiogroup"
        aria-label={`Opciones para la pregunta ${questionNumber}`}
      >
        {opciones.map((opt) => {
          const isSelected = selectedOption === opt.id_opcion;
          let feedbackClass = '';

          if (showFeedback && correctOption) {
            if (opt.id_opcion === correctOption) {
              feedbackClass = 'is-correct';
            } else if (isSelected && opt.id_opcion !== correctOption) {
              feedbackClass = 'is-incorrect';
            }
          }

          return (
            <button
              key={opt.id_opcion}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              className={`exam-option-btn ${isSelected ? 'selected' : ''} ${feedbackClass}`}
              onClick={() => onSelectOption(opt.id_opcion)}
            >
              <span className="exam-option-indicator">{opt.id_opcion}</span>
              <span className="exam-option-label">
                <LatexRenderer content={opt.texto_respuesta} />
              </span>
            </button>
          );
        })}
      </div>
    </article>
  );
};

QuestionCard.propTypes = {
  question: PropTypes.shape({
    id_pregunta: PropTypes.string,
    id: PropTypes.string,
    area_academica: PropTypes.string,
    subject: PropTypes.string,
    tema_especifico: PropTypes.string,
    subtopic: PropTypes.string,
    enunciado: PropTypes.string,
    question: PropTypes.string,
    imagen_url: PropTypes.string,
    imagen_alt: PropTypes.string,
    opciones: PropTypes.array,
  }).isRequired,
  questionNumber: PropTypes.number,
  totalQuestions: PropTypes.number,
  selectedOption: PropTypes.string,
  onSelectOption: PropTypes.func,
  showFeedback: PropTypes.bool,
  correctOption: PropTypes.string,
  disabled: PropTypes.bool,
};

export default QuestionCard;

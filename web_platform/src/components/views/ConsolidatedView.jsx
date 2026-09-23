/**
 * ConsolidatedView.jsx
 * Vista 4: 'Dictamen Consolidado'
 * Procesa integralmente los resultados de las Fases 1, 2 y 3.
 * Muestra el porcentaje de viabilidad definitivo para las 8 escuelas:
 * EMCH, ETE, ENP, CITEN, EOFAP, ESOFA, EO-PNP, EESTP-PNP.
 * Integra el Hard Filter Gatekeeper (0% si es bloqueado por ley), podio institucional y recomendaciones.
 */

import React from 'react';

export const ConsolidatedView = ({
  consolidated,
  candidate,
  psychometric,
  knowledge,
  onRestart,
  onPrev
}) => {
  const { ranking = [], winningSchool, resumen = {} } = consolidated;

  const winner = winningSchool || ranking[0];

  return (
    <section className="stepper-view consolidated-view">
      <div className="view-header">
        <span className="step-badge">Fase 4 de 4 · Dictamen Final</span>
        <h2>🎖️ Dictamen Consolidado de Admisión Militar y Policial</h2>
        <p className="view-subtitle">
          Integración matemática de Baremos Legales, Distancia Euclidiana Big Five y Examen de Conocimientos.
        </p>
      </div>

      {/* Proclamación de la Escuela Ganadora */}
      {winner && !winner.isHardBlocked && (
        <div className="card-glass proclamation-hero-card">
          <div className="proclamation-left">
            <span className="proclamation-tag">🎯 VOCACIÓN Y COMPATIBILIDAD MÁXIMA</span>
            <h3 className="proclamation-winner-title">
              ¡Naciste para la {winner.nombre}!
            </h3>
            <p className="proclamation-branch-info">
              {winner.icono} {winner.rama} · Rango de Formación: <strong>{winner.rango}</strong>
            </p>
            <p className="proclamation-description">
              Tu perfil psicológico, capacidad cognitiva bajo presión y baremos antropométricos convergen con los estándares oficiales de formación de esta escuela matriz.
            </p>
          </div>

          <div className="proclamation-dial">
            <div className="dial-value">{winner.viabilidad_pct}%</div>
            <div className="dial-label">Viabilidad Global</div>
          </div>
        </div>
      )}

      {/* Resumen Métrico del Postulante */}
      <div className="consolidated-metrics-grid">
        <div className="metric-card">
          <span className="card-icon">📏</span>
          <div className="metric-content">
            <div className="metric-title">Filtro Legal & Talla</div>
            <div className="metric-score" style={{ color: '#38bdf8' }}>
              {candidate.talla_cm} cm · {candidate.edad} años
            </div>
            <div className="metric-sub">{resumen.aptasLegales || 0} de 8 Escuelas Aptas</div>
          </div>
        </div>

        <div className="metric-card">
          <span className="card-icon">🧠</span>
          <div className="metric-content">
            <div className="metric-title">Psicometría Big Five</div>
            <div className="metric-score" style={{ color: '#d4af37' }}>
              {winner?.psico_score || 75}%
            </div>
            <div className="metric-sub">Distancia Euclidiana Óptima</div>
          </div>
        </div>

        <div className="metric-card">
          <span className="card-icon">📝</span>
          <div className="metric-content">
            <div className="metric-title">Conocimientos (LaTeX)</div>
            <div className="metric-score" style={{ color: '#34d399' }}>
              {knowledge.scoreResult?.notaVigesimal || '14.00'} / 20
            </div>
            <div className="metric-sub">Neto: {knowledge.scoreResult?.puntajeNeto || 14} pts</div>
          </div>
        </div>
      </div>

      {/* TABLA / PODIO DE LAS 8 ESCUELAS MILITARES DEL PERÚ */}
      <div className="card-glass ranking-table-card">
        <div className="table-header-row">
          <h3>📊 Porcentaje de Viabilidad Definitivo por Escuela</h3>
          <span className="table-subtitle">8 Instituciones Matrices de las FF.AA. y PNP</span>
        </div>

        <div className="schools-ranking-list">
          {ranking.map((item, index) => {
            const isWinner = index === 0 && !item.isHardBlocked;
            return (
              <div
                key={item.id}
                className={`ranking-row-card ${isWinner ? 'winner-row' : ''} ${item.isHardBlocked ? 'blocked-row' : ''}`}
              >
                {/* Posición en el podio */}
                <div className="rank-position-box">
                  <span className="rank-number">#{index + 1}</span>
                  <span className="school-icon">{item.icono}</span>
                </div>

                {/* Identificación de la Escuela */}
                <div className="school-info-box">
                  <div className="school-title-line">
                    <span className="school-tag">{item.id}</span>
                    <strong className="school-name">{item.nombre}</strong>
                    <span className="school-rango-pill">{item.rango}</span>
                  </div>
                  <div className="school-rama-sub">{item.rama}</div>

                  {/* Motivos de bloqueo legal si los hubiera */}
                  {item.isHardBlocked && item.blockingReasons.length > 0 && (
                    <div className="blocked-reason-hint">
                      🚫 {item.blockingReasons[0]}
                    </div>
                  )}
                </div>

                {/* Desglose de Factores */}
                <div className="school-breakdown-box">
                  <div className="breakdown-item">
                    <span>Psico:</span>
                    <strong>{item.isHardBlocked ? '-' : `${item.psico_score}%`}</strong>
                  </div>
                  <div className="breakdown-item">
                    <span>Conoc:</span>
                    <strong>{item.isHardBlocked ? '-' : `${item.knowledge_score}%`}</strong>
                  </div>
                  <div className="breakdown-item">
                    <span>Físico:</span>
                    <strong>{item.isHardBlocked ? '-' : `${Math.round(item.physical_score)}%`}</strong>
                  </div>
                </div>

                {/* Porcentaje de Viabilidad Definitivo */}
                <div className="viability-badge-column">
                  <div className={`viability-percent ${item.isHardBlocked ? 'blocked' : ''}`}>
                    {item.isHardBlocked ? '0%' : `${item.viabilidad_pct}%`}
                  </div>
                  <div className="viability-verdict-label">
                    {item.isHardBlocked ? 'DESCALIFICADO' : 'VIABILIDAD'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Botones de Acción Finales */}
      <div className="view-footer-actions no-print">
        <button type="button" className="btn-secondary" onClick={onPrev}>
          ◂ Revisar Examen de Conocimientos
        </button>
        <button type="button" className="btn-secondary" onClick={() => window.print()}>
          🖨️ Imprimir Acta Oficial
        </button>
        <button type="button" className="btn-gold-action" onClick={onRestart}>
          <span>🔄 Iniciar Nueva Evaluación Vocacional</span>
        </button>
      </div>
    </section>
  );
};

export default ConsolidatedView;

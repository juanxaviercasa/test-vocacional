/**
 * PhysicalView.jsx
 * Vista 1: 'Esfuerzo Físico y Talla'
 * Conecta 'investigacion_2.json'.
 * Valida el input del usuario (edad, sexo, talla, peso/IMC, estado civil, antecedentes)
 * aplicando un Hard Filter estricto por institución.
 */

import React from 'react';

export const PhysicalView = ({
  candidate,
  hardFilterResult,
  onUpdateCandidate,
  onNext
}) => {
  const handleChange = (field, value) => {
    onUpdateCandidate({ [field]: value });
  };

  const imc = candidate.peso_kg && candidate.talla_cm
    ? (candidate.peso_kg / Math.pow(candidate.talla_cm / 100, 2)).toFixed(1)
    : '22.0';

  const schoolVerdicts = hardFilterResult?.schoolVerdicts || {};
  const totalAptas = hardFilterResult?.totalAptas || 0;

  return (
    <section className="stepper-view physical-view">
      <div className="view-header">
        <span className="step-badge">Fase 1 de 4</span>
        <h2>🏃 Evaluación de Esfuerzo Físico, Antropometría y Filtro Legal</h2>
        <p className="view-subtitle">
          Baremos oficiales según prospectos de admisión de las 8 escuelas matrices del Perú.
        </p>
      </div>

      <div className="physical-grid-layout">
        {/* Formulario de Entrada de Datos del Postulante */}
        <div className="card-glass form-column">
          <h3 className="form-section-title">📋 Datos Biométricos y Legales</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Edad (Años)</label>
              <input
                type="number"
                min="15"
                max="30"
                value={candidate.edad}
                onChange={(e) => handleChange('edad', parseInt(e.target.value, 10) || 18)}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label>Sexo</label>
              <select
                value={candidate.sexo}
                onChange={(e) => handleChange('sexo', e.target.value)}
                className="input-field"
              >
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Talla (cm)</label>
              <input
                type="number"
                min="140"
                max="210"
                value={candidate.talla_cm}
                onChange={(e) => handleChange('talla_cm', parseFloat(e.target.value) || 170)}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label>Peso (kg)</label>
              <input
                type="number"
                min="40"
                max="140"
                value={candidate.peso_kg}
                onChange={(e) => handleChange('peso_kg', parseFloat(e.target.value) || 68)}
                className="input-field"
              />
            </div>
          </div>

          {/* IMC en tiempo real */}
          <div className="imc-badge-box">
            <span>Índice de Masa Corporal (IMC):</span>
            <strong className="imc-value">{imc} kg/m²</strong>
            <span className="imc-status">
              {imc < 18.5 ? '⚠️ Bajo Peso' : imc <= 25 ? '✅ Peso Normal' : imc <= 27.5 ? '⚠️ Sobrepeso Leve' : '❌ Obesidad (No Apto)'}
            </span>
          </div>

          <h4 className="form-sub-title">⚖️ Requisitos de Ley Militar y Civil</h4>

          <div className="form-row">
            <div className="form-group">
              <label>Estado Civil</label>
              <select
                value={candidate.estado_civil}
                onChange={(e) => handleChange('estado_civil', e.target.value)}
                className="input-field"
              >
                <option value="soltero">Soltero(a)</option>
                <option value="casado">Casado(a)</option>
                <option value="conviviente">Conviviente</option>
              </select>
            </div>

            <div className="form-group">
              <label>¿Tiene Hijos o Dependientes?</label>
              <select
                value={candidate.tiene_hijos ? 'si' : 'no'}
                onChange={(e) => handleChange('tiene_hijos', e.target.value === 'si')}
                className="input-field"
              >
                <option value="no">No (Soltero sin hijos)</option>
                <option value="si">Sí (Con hijos/cargas)</option>
              </select>
            </div>
          </div>

          <div className="form-row checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={candidate.tiene_antecedentes}
                onChange={(e) => handleChange('tiene_antecedentes', e.target.checked)}
              />
              <span>Registra antecedentes policiales, penales o judiciales</span>
            </label>
          </div>

          <h4 className="form-sub-title">🏋️ Pruebas de Esfuerzo Físico Oficial</h4>
          <div className="form-row">
            <div className="form-group">
              <label>Flexiones de Brazo (rep)</label>
              <input
                type="number"
                value={candidate.flexiones_rep}
                onChange={(e) => handleChange('flexiones_rep', parseInt(e.target.value, 10) || 0)}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Carrera 1500m (Segundos)</label>
              <input
                type="number"
                value={candidate.carrera_tiempo_seg}
                onChange={(e) => handleChange('carrera_tiempo_seg', parseInt(e.target.value, 10) || 0)}
                className="input-field"
              />
              <span className="field-hint">{Math.floor(candidate.carrera_tiempo_seg / 60)}m {candidate.carrera_tiempo_seg % 60}s</span>
            </div>
          </div>
        </div>

        {/* Panel en Tiempo Real del Semáforo Hard Filter */}
        <div className="card-glass status-column">
          <div className="status-header">
            <h3>🚦 Semáforo de Aptitud Legal (Hard Filter)</h3>
            <span className={`status-counter-pill ${totalAptas > 0 ? 'success' : 'danger'}`}>
              {totalAptas} de 8 Escuelas Aptas
            </span>
          </div>

          <p className="filter-description">
            Validación contra la base de datos maestra <code>investigacion_2.json</code>. Si incumple edad, talla mínima o estado civil, se aplica <strong>Descalificación Directa (Hard Block)</strong>.
          </p>

          <div className="schools-traffic-list">
            {Object.values(schoolVerdicts).map((item) => (
              <div
                key={item.escuela_id}
                className={`traffic-school-card ${item.es_apto ? 'apto' : 'bloqueado'}`}
              >
                <div className="school-card-top">
                  <div className="school-name-box">
                    <span className="school-id-badge">{item.escuela_id}</span>
                    <span className="school-full-name">{item.nombre}</span>
                  </div>
                  <span className={`verdict-pill ${item.es_apto ? 'apto' : 'no-apto'}`}>
                    {item.es_apto ? '✓ APTO LEGAL' : '✗ DESCALIFICADO'}
                  </span>
                </div>

                <div className="school-requirements-summary">
                  <span>Talla Mín: <strong>{item.min_talla} cm</strong></span>
                  <span>Edad: <strong>{item.min_edad} - {item.max_edad} años</strong></span>
                  <span>Rango: <strong>{item.rango}</strong></span>
                </div>

                {item.motivos_descalificacion.length > 0 && (
                  <ul className="disqualification-list">
                    {item.motivos_descalificacion.map((m, idx) => (
                      <li key={idx}>🚫 {m}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="view-footer-actions">
        <button
          type="button"
          className="btn-gold-action"
          onClick={onNext}
          disabled={totalAptas === 0}
        >
          <span>Avanzar a Fase 2: Test Psicométrico IPIP-NEO ▸</span>
        </button>
      </div>
    </section>
  );
};

export default PhysicalView;

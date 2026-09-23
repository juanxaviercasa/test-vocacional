/**
 * MilitaryStepperApp.jsx
 * Componente Contenedor del Stepper de 4 Fases para Admisión Militar y Policial.
 * Integra useMilitaryStore / MilitaryContext:
 *   Fase 1: 'Esfuerzo Físico y Talla' ('investigacion_2.json')
 *   Fase 2: 'Test Psicométrico' ('psicometria.json')
 *   Fase 3: 'Simulador de Conocimientos' ('conocimientos.json')
 *   Fase 4: 'Dictamen Consolidado' (Viabilidad definitiva para las 8 escuelas)
 */

import React, { useEffect } from 'react';
import { useMilitaryStore } from '../../store/useMilitaryStore.js';
import PhysicalView from './PhysicalView.jsx';
import PsychometricView from './PsychometricView.jsx';
import KnowledgeView from './KnowledgeView.jsx';
import ConsolidatedView from './ConsolidatedView.jsx';
import './MilitaryStepperApp.css';

const STEPS = [
  { id: 1, title: 'Esfuerzo Físico y Talla', icon: '🏃', tag: 'Hard Filter' },
  { id: 2, title: 'Test Psicométrico', icon: '🧠', tag: 'IPIP-NEO Big Five' },
  { id: 3, title: 'Simulador de Conocimientos', icon: '📝', tag: '20 Preguntas · LaTeX' },
  { id: 4, title: 'Dictamen Consolidado', icon: '🎖️', tag: '8 Escuelas · Viabilidad' },
];

export const MilitaryStepperApp = () => {
  const {
    currentStep,
    isLoading,
    candidate,
    hardFilterResult,
    psychometric,
    knowledge,
    consolidated,
    actions
  } = useMilitaryStore();

  useEffect(() => {
    actions.loadDatabases();
  }, []);

  return (
    <div className="military-stepper-app-root">
      {/* Cintillo Patriótico */}
      <div className="peru-ribbon" />

      {/* Header Institucional */}
      <header className="military-app-header">
        <div className="header-brand-container">
          <div className="brand-coat">🇵🇪</div>
          <div>
            <h1>SISTEMA DE ADMISIÓN Y EVALUACIÓN MILITAR</h1>
            <p>Fuerzas Armadas y Policía Nacional del Perú · Stepper Multi-Fase 2026/2027</p>
          </div>
        </div>

        <div className="schools-tag-row">
          <span className="inst-badge">⚔️ EMCH</span>
          <span className="inst-badge">🛡️ ETE</span>
          <span className="inst-badge">⚓ ENP</span>
          <span className="inst-badge">🚢 CITEN</span>
          <span className="inst-badge">✈️ EOFAP</span>
          <span className="inst-badge">🛩️ ESOFA</span>
          <span className="inst-badge">👮 EO-PNP</span>
          <span className="inst-badge">🚔 EESTP</span>
        </div>
      </header>

      {/* Barra del Stepper de 4 Fases */}
      <nav className="stepper-navigation-bar" aria-label="Progreso de Evaluación">
        {STEPS.map((s) => {
          const isCurrent = s.id === currentStep;
          const isPassed = s.id < currentStep;

          return (
            <button
              key={s.id}
              type="button"
              className={`stepper-nav-step ${isCurrent ? 'active' : ''} ${isPassed ? 'completed' : ''}`}
              onClick={() => actions.setStep(s.id)}
            >
              <div className="step-circle-indicator">
                {isPassed ? '✓' : s.icon}
              </div>
              <div className="step-info">
                <span className="step-step-text">Fase {s.id}</span>
                <strong className="step-title-text">{s.title}</strong>
                <span className="step-tag-text">{s.tag}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Contenedor de la Vista Activa */}
      <main className="stepper-main-content">
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner-gold" />
            <p>Cargando bases de datos maestras (investigacion_2, psicometria, conocimientos)...</p>
          </div>
        )}

        {/* FASE 1: Esfuerzo Físico y Talla (Hard Filter) */}
        {currentStep === 1 && (
          <PhysicalView
            candidate={candidate}
            hardFilterResult={hardFilterResult}
            onUpdateCandidate={actions.updateCandidate}
            onNext={actions.nextStep}
          />
        )}

        {/* FASE 2: Test Psicométrico (Modo 120/50 y Distancia Euclidiana) */}
        {currentStep === 2 && (
          <PsychometricView
            psychometric={psychometric}
            onSetMode={actions.setPsychometricMode}
            onAnswerItem={actions.answerPsychometricItem}
            onComputeResults={actions.computePsychometricResults}
            onNext={actions.nextStep}
            onPrev={actions.prevStep}
          />
        )}

        {/* FASE 3: Simulador de Conocimientos (20 Preguntas sin repetir con LaTeX) */}
        {currentStep === 3 && (
          <KnowledgeView
            knowledge={knowledge}
            onSample20={actions.sampleKnowledgeQuestions}
            onAnswerQuestion={actions.answerKnowledgeQuestion}
            onGradeExam={actions.gradeKnowledge}
            onNext={actions.nextStep}
            onPrev={actions.prevStep}
          />
        )}

        {/* FASE 4: Dictamen Consolidado (Viabilidad Definitiva para las 8 Escuelas) */}
        {currentStep === 4 && (
          <ConsolidatedView
            consolidated={consolidated}
            candidate={candidate}
            psychometric={psychometric}
            knowledge={knowledge}
            onRestart={() => actions.setStep(1)}
            onPrev={actions.prevStep}
          />
        )}
      </main>

      <footer className="military-app-footer">
        <p>
          Sistema de Admisión Militar y Policial · State Management con Hard Filter, Distancia Euclidiana y LaTeX KaTeX.
        </p>
      </footer>
    </div>
  );
};

export default MilitaryStepperApp;

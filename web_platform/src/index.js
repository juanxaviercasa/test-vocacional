/**
 * web_platform/src/index.js
 * Entrada principal del módulo de State Management y Vistas del Stepper Militar
 */

export { default as militaryStore, useMilitaryStore } from './store/useMilitaryStore.js';
export { MilitaryProvider, useMilitaryContext } from './context/MilitaryContext.jsx';
export * from './store/militaryStateLogic.js';

export { default as PhysicalView } from './components/views/PhysicalView.jsx';
export { default as PsychometricView } from './components/views/PsychometricView.jsx';
export { default as KnowledgeView } from './components/views/KnowledgeView.jsx';
export { default as ConsolidatedView } from './components/views/ConsolidatedView.jsx';
export { default as MilitaryStepperApp } from './components/views/MilitaryStepperApp.jsx';

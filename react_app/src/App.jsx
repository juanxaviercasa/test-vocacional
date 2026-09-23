import React from 'react';
import { RouterProvider, useAppRouter } from './router/AppRouter';
import RootLayout from './components/layout/RootLayout';
import MilitaryAssessmentWizard from './components/MilitaryAssessmentWizard';
import AcademicModule from './components/academic/AcademicModule';
import GlosarioPage from './pages/GlosarioPage';
import TransparenciaPage from './pages/TransparenciaPage';
import EntrenamientoPage from './pages/EntrenamientoPage';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { useAssessmentStore } from './store/useAssessmentStore';

/**
 * Gestor de Enrutamiento y Renderizado de Vistas Dedicadas
 * Soporta navegación fluida entre:
 * - '/' (Test Vocacional / Diagnóstico Académico)
 * - '/glosario' (Glosario Técnico de Términos Militares)
 * - '/transparencia' (Organigrama Institucional y Descarga de Prospectos PDF)
 * - '/entrenamiento' (Hub Estratégico de Preparación Física, Cognitiva y Mental)
 */
function AppContent() {
  const { activeModule } = useAssessmentStore();
  const { currentPath } = useAppRouter();

  // 1. Ruta: Glosario Técnico Dedicado
  if (currentPath === '/glosario') {
    return <GlosarioPage />;
  }

  // 2. Ruta: Centro de Transparencia y Organigrama de 4 Niveles
  if (currentPath === '/transparencia') {
    return <TransparenciaPage />;
  }

  // 3. Ruta: Centro de Entrenamiento (Hub Estratégico)
  if (currentPath === '/entrenamiento') {
    return <EntrenamientoPage />;
  }

  // 4. Ruta Principal: Wizard Vocacional (Módulo 1) o Diagnóstico Académico (Módulo 2)
  return activeModule === 'vocational' ? (
    <MilitaryAssessmentWizard />
  ) : (
    <AcademicModule />
  );
}

export default function App() {
  return (
    <RouterProvider>
      <RootLayout>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </RootLayout>
    </RouterProvider>
  );
}

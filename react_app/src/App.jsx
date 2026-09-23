import React from 'react';
import RootLayout from './components/layout/RootLayout';
import MilitaryAssessmentWizard from './components/MilitaryAssessmentWizard';
import AcademicModule from './components/academic/AcademicModule';
import { useAssessmentStore } from './store/useAssessmentStore';

export default function App() {
  const { activeModule } = useAssessmentStore();

  return (
    <RootLayout>
      {activeModule === 'vocational' ? (
        <MilitaryAssessmentWizard />
      ) : (
        <AcademicModule />
      )}
    </RootLayout>
  );
}

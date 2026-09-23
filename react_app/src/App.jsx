import React from 'react';
import TacticalHUDLayout from './components/layout/TacticalHUDLayout';
import MilitaryAssessmentWizard from './components/MilitaryAssessmentWizard';

export default function App() {
  return (
    <TacticalHUDLayout>
      <MilitaryAssessmentWizard />
    </TacticalHUDLayout>
  );
}

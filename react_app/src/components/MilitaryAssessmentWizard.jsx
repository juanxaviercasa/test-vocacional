import React from 'react';
import { useAssessmentStore } from '../store/useAssessmentStore';
import AnimatePillarContainer from './layout/AnimatePillarContainer';
import Pillar1Legal from './pillars/Pillar1Legal/Pillar1Legal';
import Pillar2Psychometric from './pillars/Pillar2Psychometric/Pillar2Psychometric';
import Pillar3Cognitive from './pillars/Pillar3Cognitive/Pillar3Cognitive';
import Pillar3Interests from './pillars/Pillar3Interests/Pillar3Interests';
import Pillar4VocationalResult from './pillars/Pillar4VocationalResult/Pillar4VocationalResult';

/**
 * Módulo 1: Wizard de Evaluación y Diagnóstico Castrense 360° (5 Fases)
 * 1. Filtro Legal & Físico -> 2. Psicometría & Clínica -> 3. Cognitivo & Mecánica -> 4. Intereses Tácticos -> 5. Dictamen 360°
 */
export default function MilitaryAssessmentWizard() {
  const { currentPillar, direction } = useAssessmentStore();

  const renderActivePillar = () => {
    switch (currentPillar) {
      case 1:
        return <Pillar1Legal />;
      case 2:
        return <Pillar2Psychometric />;
      case 3:
        return <Pillar3Cognitive />;
      case 4:
        return <Pillar3Interests />;
      case 5:
        return <Pillar4VocationalResult />;
      default:
        return <Pillar1Legal />;
    }
  };

  return (
    <div className="w-full">
      <AnimatePillarContainer animationKey={`main-vocational-step-${currentPillar}`} direction={direction}>
        {renderActivePillar()}
      </AnimatePillarContainer>
    </div>
  );
}

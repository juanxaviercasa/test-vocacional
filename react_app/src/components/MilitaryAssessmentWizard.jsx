import React from 'react';
import { useAssessmentStore } from '../store/useAssessmentStore';
import AnimatePillarContainer from './layout/AnimatePillarContainer';
import Pillar1Legal from './pillars/Pillar1Legal/Pillar1Legal';
import Pillar2Psychometric from './pillars/Pillar2Psychometric/Pillar2Psychometric';
import Pillar3Interests from './pillars/Pillar3Interests/Pillar3Interests';
import Pillar4Knowledge from './pillars/Pillar4Knowledge/Pillar4Knowledge';
import Pillar5Consolidated from './pillars/Pillar5Consolidated/Pillar5Consolidated';

export default function MilitaryAssessmentWizard() {
  const { currentPillar, direction } = useAssessmentStore();

  const renderActivePillar = () => {
    switch (currentPillar) {
      case 1:
        return <Pillar1Legal />;
      case 2:
        return <Pillar2Psychometric />;
      case 3:
        return <Pillar3Interests />;
      case 4:
        return <Pillar4Knowledge />;
      case 5:
        return <Pillar5Consolidated />;
      default:
        return <Pillar1Legal />;
    }
  };

  return (
    <div className="w-full">
      <AnimatePillarContainer animationKey={`main-pillar-${currentPillar}`} direction={direction}>
        {renderActivePillar()}
      </AnimatePillarContainer>
    </div>
  );
}

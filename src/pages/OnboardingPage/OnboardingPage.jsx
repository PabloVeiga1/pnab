import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingFlow from '../../components/OnboardingFlow/OnboardingFlow';

export default function OnboardingPage() {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/');
  };

  return <OnboardingFlow onComplete={handleComplete} initialStage="splash" />;
}

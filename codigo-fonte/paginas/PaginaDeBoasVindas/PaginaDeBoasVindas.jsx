import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingFlow from '../../componentes/FluxoDeBoasVindas/FluxoDeBoasVindas';

export default function OnboardingPage() {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/');
  };

  return <OnboardingFlow onComplete={handleComplete} initialStage="splash" />;
}

import React, { useState, useEffect, useRef } from 'react';
import './OnboardingFlow.css';
import {
  PathIllustration,
  MissionsIllustration,
  CaminhoDeBronzeLogo,
} from './Illustrations';
import { AVATARS } from './avatarsData';

export default function OnboardingFlow({
  onComplete,
  initialStage = 'splash',
  skipOnboardingIfCompleted = false,
}) {
  const [stage, setStage] = useState(initialStage); // 'splash' | 'onboarding' | 'avatar'
  const [splashProgress, setSplashProgress] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [confirmedAvatarId, setConfirmedAvatarId] = useState(() => {
    return localStorage.getItem('caminho_bronze_avatar') || 'mic';
  });
  const [selectedAvatarId, setSelectedAvatarId] = useState(confirmedAvatarId);
  const [isPopping, setIsPopping] = useState(false);

  // Controle de Swipe Mobile (Touch)
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // 1. ANIMAÇÃO DA SPLASH SCREEN (PROGRESS BAR)
  useEffect(() => {
    if (stage !== 'splash') return;

    setSplashProgress(0);
    const interval = setInterval(() => {
      setSplashProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.max(2, Math.floor((100 - prev) * 0.15) + 3);
        const next = Math.min(100, prev + increment);
        return next;
      });
    }, 55);

    return () => clearInterval(interval);
  }, [stage]);

  // Transição da Splash Screen ao atingir 100%
  useEffect(() => {
    if (stage === 'splash' && splashProgress === 100) {
      const timeout = setTimeout(() => {
        const hasOnboarded = localStorage.getItem('caminho_bronze_onboarded');
        if (skipOnboardingIfCompleted && hasOnboarded) {
          if (onComplete) onComplete({ avatar: selectedAvatarId });
        } else {
          setStage('onboarding');
        }
      }, 350);
      return () => clearTimeout(timeout);
    }
  }, [splashProgress, stage, skipOnboardingIfCompleted, onComplete, selectedAvatarId]);

  // Efeito pop ao trocar de avatar
  useEffect(() => {
    setIsPopping(true);
    const t = setTimeout(() => setIsPopping(false), 300);
    return () => clearTimeout(t);
  }, [selectedAvatarId]);

  // Ações de Navegação dos Slides
  const handleNextSlide = () => {
    if (slideIndex < 2) {
      setSlideIndex((curr) => curr + 1);
    } else {
      setStage('avatar');
    }
  };

  const handlePrevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex((curr) => curr - 1);
    }
  };

  const handleSkip = () => {
    // Pula diretamente para a seleção de avatar ou finaliza
    setStage('avatar');
  };

  const handleCancelAvatarSelection = () => {
    setSelectedAvatarId(confirmedAvatarId);

    if (onComplete) {
      onComplete({ avatar: confirmedAvatarId });
    }
  };

  const handleFinish = (avatarToSave = selectedAvatarId) => {
    try {
      localStorage.setItem('caminho_bronze_onboarded', 'true');
      localStorage.setItem('caminho_bronze_avatar', avatarToSave);
      setConfirmedAvatarId(avatarToSave);
    } catch (e) {
      console.warn('Erro ao salvar no localStorage:', e);
    }

    if (onComplete) {
      onComplete({ avatar: avatarToSave });
    }
  };

  // Handlers para Touch / Swipe Gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    // Se arrastou mais de 50px
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0 && slideIndex < 2) {
        // Swipe para esquerda -> Avançar
        handleNextSlide();
      } else if (deltaX < 0 && slideIndex > 0) {
        // Swipe para direita -> Voltar
        handlePrevSlide();
      }
    }
  };

  // Dados das 3 telas de Onboarding
  const slidesData = [
    {
      title: 'O Caminho de Bronze',
      description: 'Explore a orla de Maceió e conheça os seis ícones da cultura alagoana.',
      renderIllustration: () => <PathIllustration size={230} showPins={false} />,
      leftButton: { text: 'Pular', onClick: handleSkip },
      rightButton: { text: 'Avançar', onClick: handleNextSlide },
    },
    {
      title: 'Mapa interativo',
      description: 'Use o GPS para se aproximar de cada estátua e desbloqueá-la.',
      renderIllustration: () => <PathIllustration size={230} showPins={true} />,
      leftButton: { text: 'Voltar', onClick: handlePrevSlide },
      rightButton: { text: 'Avançar', onClick: handleNextSlide },
    },
    {
      title: 'Missões e conquistas',
      description: 'Cada estátua tem um desafio. Ao responder corretamente, você conquista um badge exclusivo.',
      renderIllustration: () => <MissionsIllustration size={230} />,
      leftButton: { text: 'Voltar', onClick: handlePrevSlide },
      rightButton: { text: 'Acessar', onClick: () => setStage('avatar') },
    },
  ];

  const currentSlide = slidesData[slideIndex];
  const activeAvatarObj = AVATARS.find((a) => a.id === selectedAvatarId) || AVATARS[0];

  return (
    <div className="onboarding-backdrop">
      <div className="onboarding-phone-frame">

        {/* ================= TELA 1: SPLASH SCREEN ================= */}
        {stage === 'splash' && (
          <div className="onboarding-screen-content">
            <div className="splash-container">
              <CaminhoDeBronzeLogo size={210} />

              <div className="splash-progress-wrapper">
                <div className="splash-progress-track">
                  <div
                    className="splash-progress-bar"
                    style={{ width: `${splashProgress}%` }}
                  />
                </div>
                <span className="splash-loading-text">Carregando...</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= TELAS 2, 3 E 4: ONBOARDING CAROUSEL ================= */}
        {stage === 'onboarding' && (
          <div
            className="onboarding-screen-content"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="onboarding-slide-body" key={slideIndex}>
              <div className="onboarding-illustration-box">
                {currentSlide.renderIllustration()}
              </div>

              <h1 className="onboarding-title">{currentSlide.title}</h1>
              <p className="onboarding-description">{currentSlide.description}</p>
            </div>

            {/* Stepper Dots (Indicadores de página) */}
            <div className="onboarding-stepper">
              {slidesData.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setSlideIndex(idx)}
                  className={`stepper-dot ${idx === slideIndex ? 'active' : 'inactive'}`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Botões Inferiores */}
            <div className="onboarding-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={currentSlide.leftButton.onClick}
              >
                {currentSlide.leftButton.text}
              </button>

              <button
                type="button"
                className="btn-primary"
                onClick={currentSlide.rightButton.onClick}
              >
                {currentSlide.rightButton.text}
              </button>
            </div>
          </div>
        )}

        {/* ================= TELA 5: SELEÇÃO DE AVATAR ================= */}
        {stage === 'avatar' && (
          <div className="onboarding-screen-content">
            <div className="avatar-selection-screen">
              <div className="avatar-header">
                <h2>Selecionar avatar</h2>
                <p>Selecione um avatar e explore os desafios.</p>
              </div>

              {/* Prévia Central do Avatar Grande */}
              <div className="avatar-large-preview-wrapper">
                <div className={`avatar-large-circle ${isPopping ? 'pop' : ''}`}>
                  {activeAvatarObj.renderIcon('#A81D84', 92)}
                </div>
                <div className="avatar-selected-title">{activeAvatarObj.name}</div>
                <div className="avatar-selected-subtitle">{activeAvatarObj.description}</div>
              </div>

              {/* Seletor Horizontal com os 6 Avatares */}
              <div className="avatar-thumbnails-row">
                {AVATARS.map((avatar) => {
                  const isSelected = avatar.id === selectedAvatarId;
                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      className={`avatar-thumb-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedAvatarId(avatar.id)}
                      title={avatar.name}
                      aria-label={avatar.name}
                    >
                      {avatar.renderIcon('#A81D84', 28)}
                    </button>
                  );
                })}
              </div>

              {/* Botões Inferiores de Ação */}
              <div className="onboarding-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCancelAvatarSelection}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => handleFinish(selectedAvatarId)}
                >
                  Selecionar avatar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import './SplashScreen.css';
import { CaminhoDeBronzeLogo } from '../OnboardingFlow/Illustrations';

export default function SplashScreen({
  text = 'Carregando...',
  onFinish,
  minDuration = 1400,
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / minDuration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        if (onFinish) {
          setTimeout(onFinish, 200);
        }
      }
    }, 35);

    return () => clearInterval(interval);
  }, [minDuration, onFinish]);

  return (
    <div className="splash-fullscreen-backdrop">
      <div className="splash-screen-body">
        <CaminhoDeBronzeLogo size={200} />

        <div className="splash-progress-wrapper">
          <div className="splash-progress-track">
            <div
              className="splash-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="splash-loading-text">{text}</span>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react'
import Map from './components/Map/Map.jsx'
import './App.css'

import Header from './components/Header/Header.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import BottomControls from './components/BottomControls/BottomControls.jsx'
import OnboardingFlow from './components/OnboardingFlow/OnboardingFlow.jsx'

export default function App() {
  const [destino, setDestino] = useState(() => {
    const stored = sessionStorage.getItem('destino')
    return stored ? JSON.parse(stored) : null
  })

  // Controla a dinâmica de aplicativo mobile (Splash -> Onboarding -> Avatar)
  const [showFlow, setShowFlow] = useState(() => {
    const onboarded = localStorage.getItem('caminho_bronze_onboarded')
    const sessionSplash = sessionStorage.getItem('cb_session_splash_shown')
    return !onboarded || !sessionSplash
  })

  const [flowStage, setFlowStage] = useState('splash')

  useEffect(() => {
    if (destino) {
      sessionStorage.setItem('destino', JSON.stringify(destino))
    } else {
      sessionStorage.removeItem('destino')
    }
  }, [destino])

  useEffect(() => {
    const handler = () => sessionStorage.removeItem('destino')
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [])

  const handleFlowComplete = () => {
    sessionStorage.setItem('cb_session_splash_shown', 'true')
    setShowFlow(false)
  }

  const handleOpenProfile = () => {
    setFlowStage('avatar')
    setShowFlow(true)
  }

  return (
    <>
      {showFlow && (
        <OnboardingFlow
          initialStage={flowStage}
          skipOnboardingIfCompleted={flowStage === 'splash'}
          onComplete={handleFlowComplete}
        />
      )}

      <main className="app-root">
        <Header />
        <SearchBar onSelect={setDestino} />
        <Map destino={destino} />
        <BottomControls onOpenProfile={handleOpenProfile} />
      </main>
    </>
  )
}

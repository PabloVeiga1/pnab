import { lazy, Suspense, useEffect, useState } from 'react'
import './Aplicativo.css'

import Header from './componentes/Cabecalho/Cabecalho.jsx'
import SearchBar from './componentes/BarraDeBusca/BarraDeBusca.jsx'
import BottomControls from './componentes/ControlesInferiores/ControlesInferiores.jsx'
import OnboardingFlow from './componentes/FluxoDeBoasVindas/FluxoDeBoasVindas.jsx'

const Map = lazy(() => import('./componentes/Mapa/Mapa.jsx'))

export default function App() {
  const [destino, setDestino] = useState(() => {
    const stored = sessionStorage.getItem('destino')
    return stored ? JSON.parse(stored) : null
  })
  const [destinationSelection, setDestinationSelection] = useState(0)

  // Controla a dinâmica de aplicativo mobile (Splash -> Onboarding -> Avatar)
  const [showFlow, setShowFlow] = useState(() => {
    const onboarded = localStorage.getItem('caminho_bronze_onboarded')
    const sessionSplash = sessionStorage.getItem('cb_session_splash_shown')
    return !onboarded || !sessionSplash
  })

  const [flowStage, setFlowStage] = useState('splash')
  const [gpsStatus, setGpsStatus] = useState(() => showFlow ? 'idle' : 'searching')

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

  const handleDestinationChange = (nextDestino) => {
    setDestino(nextDestino)
    setDestinationSelection((selection) => selection + 1)
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
        <Header gpsStatus={gpsStatus} />
        <SearchBar onSelect={handleDestinationChange} />
        {(!showFlow || flowStage === 'avatar') && (
          <Suspense fallback={<div className="map-loading" role="status">Carregando mapa...</div>}>
            <Map
              destino={destino}
              destinationSelection={destinationSelection}
              onLocationStatusChange={setGpsStatus}
            />
          </Suspense>
        )}
        <BottomControls onOpenProfile={handleOpenProfile} />
      </main>
    </>
  )
}

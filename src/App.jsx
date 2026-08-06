import { useEffect, useState } from 'react'
import Map from './components/Map/Map.jsx'
import './App.css'

import Header from './components/Header/Header.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import BottomControls from './components/BottomControls/BottomControls.jsx'

export default function App() {
  const [destino, setDestino] = useState(() => {
    const stored = sessionStorage.getItem('destino')
    return stored ? JSON.parse(stored) : null
  })
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)

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

  useEffect(() => {
    const standaloneMode = window.matchMedia('(display-mode: standalone)').matches
    const iosStandalone = 'standalone' in window.navigator && window.navigator.standalone
    setIsInstalled(standaloneMode || iosStandalone)

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
    }

    const handleAppInstalled = () => {
      setDeferredPrompt(null)
      setIsInstalled(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return
    }

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setDeferredPrompt(null)
    }
  }

  return (
    <main className="app-root">
      {!isInstalled && (
        <button
          type="button"
          className="install-pwa-button"
          onClick={handleInstallClick}
          disabled={!deferredPrompt}
        >
          {deferredPrompt ? 'Instalar app' : 'Instalar pelo navegador'}
        </button>
      )}
      <Header />
      <SearchBar onSelect={setDestino} />
      <Map destino={destino} />
      <BottomControls />
    </main>
  )
}

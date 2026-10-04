import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'

import './index.css'
import App from './App.jsx'
import 'maplibre-gl/dist/maplibre-gl.css'
import Homenageados from './pages/Homenageados/Homenageados.jsx'
import RotasOrdenadas from './pages/RotasOrdenadas/RotasOrdenadas.jsx'
import GracilianoPage from './pages/InfoHomenageados/Graciliano/Graciliano.jsx'
import AurelioPage from './pages/InfoHomenageados/Aurelio/Aurelio.jsx'
import LedoPage from './pages/InfoHomenageados/Ledo/Ledo.jsx'
import NisePage from './pages/InfoHomenageados/Nise/Nise.jsx'
import PauloPage from './pages/InfoHomenageados/Paulo/Paulo.jsx'
import ZumbiPage from './pages/InfoHomenageados/Zumbi/Zumbi.jsx'
import OnboardingPage from './pages/OnboardingPage/OnboardingPage.jsx'
import { MonumentosProvider } from './data/MonumentosProvider.jsx'
import { useMonumentos } from './data/useMonumentos.js'

function ApenasEncontrado({ monumentoId, children }) {
  const { monumentos } = useMonumentos()
  const monumento = monumentos.find((item) => item.id === monumentoId)

  return monumento?.status === 'encontrado'
    ? children
    : <Navigate to="/rotasordenadas" replace />
}

registerSW({
  immediate: true,
  onOfflineReady() {},
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    path: '/homenageados',
    element: <Homenageados />,
  },
  {
    path: '/rotasordenadas',
    element: <RotasOrdenadas />,
  },
  {
    path: '/rotasordenadas/graci',
    element: <ApenasEncontrado monumentoId={1}><GracilianoPage /></ApenasEncontrado>,
  },
  {
    path: '/rotasordenadas/aurelio',
    element: <ApenasEncontrado monumentoId={2}><AurelioPage /></ApenasEncontrado>,
  },
  {
    path: '/rotasordenadas/ledo',
    element: <ApenasEncontrado monumentoId={6}><LedoPage /></ApenasEncontrado>,
  },
  {
    path: '/rotasordenadas/nise',
    element: <ApenasEncontrado monumentoId={5}><NisePage /></ApenasEncontrado>,
  },
  {
    path: '/rotasordenadas/paulo',
    element: <ApenasEncontrado monumentoId={4}><PauloPage /></ApenasEncontrado>,
  },
  {
    path: '/rotasordenadas/zumbi',
    element: <ApenasEncontrado monumentoId={3}><ZumbiPage /></ApenasEncontrado>,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MonumentosProvider>
      <RouterProvider router={router} />
    </MonumentosProvider>
  </StrictMode>,
)

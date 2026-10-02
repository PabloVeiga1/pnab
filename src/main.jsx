import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
    element: <GracilianoPage />,
  },
  {
    path: '/rotasordenadas/aurelio',
    element: <AurelioPage />,
  },
  {
    path: '/rotasordenadas/ledo',
    element: <LedoPage />,
  },
  {
    path: '/rotasordenadas/nise',
    element: <NisePage />,
  },
  {
    path: '/rotasordenadas/paulo',
    element: <PauloPage />,
  },
  {
    path: '/rotasordenadas/zumbi',
    element: <ZumbiPage />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

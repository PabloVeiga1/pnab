import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'

import './index.css'
import App from './App.jsx'
import Homenageados from './pages/Homenageados/Homenageados.jsx'
import RotasOrdenadas from './pages/RotasOrdenadas/RotasOrdenadas.jsx'
import GracilianoPage from './pages/InfoHomenageados/Graciliano/Graciliano.jsx'
import AurelioPage from './pages/InfoHomenageados/Aurelio/Aurelio.jsx'
import LedoPage from './pages/InfoHomenageados/Ledo/Ledo.jsx'
import NisePage from './pages/InfoHomenageados/Nise/Nise.jsx'
import PauloPage from './pages/InfoHomenageados/Paulo/Paulo.jsx'
import JorgePage from './pages/InfoHomenageados/Jorge/Jorge.jsx'
import OnboardingPage from './pages/OnboardingPage/OnboardingPage.jsx'
import { MonumentosProvider } from './data/MonumentosProvider.jsx'
import ApenasEncontrado from './components/ApenasEncontrado.jsx'

registerSW({
  immediate: true,
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
    path: '/rotasordenadas/jorge',
    element: <ApenasEncontrado monumentoId={3}><JorgePage /></ApenasEncontrado>,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MonumentosProvider>
      <RouterProvider router={router} />
    </MonumentosProvider>
  </StrictMode>,
)

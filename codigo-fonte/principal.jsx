import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'

import './estilosGlobais.css'
import App from './Aplicativo.jsx'
import Homenageados from './paginas/Homenageados/Homenageados.jsx'
import RotasOrdenadas from './paginas/RotasOrdenadas/RotasOrdenadas.jsx'
import GracilianoPage from './paginas/InformacoesHomenageados/Graciliano/Graciliano.jsx'
import AurelioPage from './paginas/InformacoesHomenageados/Aurelio/Aurelio.jsx'
import LedoPage from './paginas/InformacoesHomenageados/Ledo/Ledo.jsx'
import NisePage from './paginas/InformacoesHomenageados/Nise/Nise.jsx'
import PauloPage from './paginas/InformacoesHomenageados/Paulo/Paulo.jsx'
import JorgePage from './paginas/InformacoesHomenageados/Jorge/Jorge.jsx'
import OnboardingPage from './paginas/PaginaDeBoasVindas/PaginaDeBoasVindas.jsx'
import { MonumentosProvider } from './dados/ProvedorMonumentos.jsx'
import ApenasEncontrado from './componentes/ApenasEncontrado.jsx'

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

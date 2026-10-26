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

import AurelioMidias from "./paginas/InformacoesHomenageados/Aurelio/Midias.jsx";
import AurelioDetalhes from "./paginas/InformacoesHomenageados/Aurelio/Detalhes.jsx";
import AurelioSobre from "./paginas/InformacoesHomenageados/Aurelio/Sobre.jsx";

import GracilianoMidias from "./paginas/InformacoesHomenageados/Graciliano/Midias.jsx";
import GracilianoDetalhes from "./paginas/InformacoesHomenageados/Graciliano/Detalhes.jsx";
import GracilianoSobre from "./paginas/InformacoesHomenageados/Graciliano/Sobre.jsx";

import JorgeMidias from "./paginas/InformacoesHomenageados/Jorge/Midias.jsx";
import JorgeDetalhes from "./paginas/InformacoesHomenageados/Jorge/Detalhes.jsx";
import JorgeSobre from "./paginas/InformacoesHomenageados/Jorge/Sobre.jsx";

import LedoMidias from "./paginas/InformacoesHomenageados/Ledo/Midias.jsx";
import LedoDetalhes from "./paginas/InformacoesHomenageados/Ledo/Detalhes.jsx";
import LedoSobre from "./paginas/InformacoesHomenageados/Ledo/Sobre.jsx";

import NiseMidias from "./paginas/InformacoesHomenageados/Nise/Midias.jsx";
import NiseDetalhes from "./paginas/InformacoesHomenageados/Nise/Detalhes.jsx";
import NiseSobre from "./paginas/InformacoesHomenageados/Nise/Sobre.jsx";

import PauloMidias from "./paginas/InformacoesHomenageados/Paulo/Midias.jsx";
import PauloDetalhes from "./paginas/InformacoesHomenageados/Paulo/Detalhes.jsx";
import PauloSobre from "./paginas/InformacoesHomenageados/Paulo/Sobre.jsx";


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
  {
    path: "/rotasordenadas/aurelio/midias",
    element: <AurelioMidias />,
  },
  {
    path: "/rotasordenadas/aurelio/detalhes",
    element: <AurelioDetalhes />,
  },
  {
    path: "/rotasordenadas/aurelio/sobre",
    element: <AurelioSobre />,
  },
  {
    path: "/rotasordenadas/graci/midias",
    element: <GracilianoMidias />,
  },
  {
    path: "/rotasordenadas/graci/detalhes",
    element: <GracilianoDetalhes />,
  },
  {
    path: "/rotasordenadas/graci/sobre",
    element: <GracilianoSobre />,
  },
  {
    path: "/rotasordenadas/jorge/midias",
    element: <JorgeMidias />,
  },
  {
    path: "/rotasordenadas/jorge/detalhes",
    element: <JorgeDetalhes />,
  },
  {
    path: "/rotasordenadas/jorge/sobre",
    element: <JorgeSobre />,
  },
  {
    path: "/rotasordenadas/ledo/midias",
    element: <LedoMidias />,
  },
  {
    path: "/rotasordenadas/ledo/detalhes",
    element: <LedoDetalhes />,
  },
  {
    path: "/rotasordenadas/ledo/sobre",
    element: <LedoSobre />,
  },
  {
    path: "/rotasordenadas/nise/midias",
    element: <NiseMidias />,
  },
  {
    path: "/rotasordenadas/nise/detalhes",
    element: <NiseDetalhes />,
  },
  {
    path: "/rotasordenadas/nise/sobre",
    element: <NiseSobre />,
  },
  {
    path: "/rotasordenadas/paulo/midias",
    element: <PauloMidias />,
  },
  {
    path: "/rotasordenadas/paulo/detalhes",
    element: <PauloDetalhes />,
  },
  {
    path: "/rotasordenadas/paulo/sobre",
    element: <PauloSobre />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MonumentosProvider>
      <RouterProvider router={router} />
    </MonumentosProvider>
  </StrictMode>,
)

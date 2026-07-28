import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "maplibre-gl/dist/maplibre-gl.css";
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Homenageados from './pages/Homenageados/Homenageados.jsx';
import RotasOrdenadas from "./pages/RotasOrdenadas/RotasOrdenadas.jsx"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/homenageados",
    element: <Homenageados />
  },
  {
    path: "/rotasordenadas",
    element: <RotasOrdenadas />
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

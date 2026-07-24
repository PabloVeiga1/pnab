import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "maplibre-gl/dist/maplibre-gl.css";
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Homenageados from './pages/Homenageados/Homenageados.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/homenageados",
    element: <Homenageados />
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

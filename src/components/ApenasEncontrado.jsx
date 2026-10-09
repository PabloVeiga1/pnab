import { Navigate } from 'react-router-dom'
import { useMonumentos } from '../data/useMonumentos.js'

export default function ApenasEncontrado({ monumentoId, children }) {
  const { monumentos } = useMonumentos()
  const monumento = monumentos.find((item) => item.id === monumentoId)

  return monumento?.status === 'encontrado'
    ? children
    : <Navigate to="/rotasordenadas" replace />
}

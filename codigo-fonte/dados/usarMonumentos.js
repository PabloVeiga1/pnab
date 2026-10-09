import { useContext } from 'react';
import { MonumentosContext } from './ContextoMonumentos.jsx';

export function useMonumentos() {
  const context = useContext(MonumentosContext);
  if (!context) {
    throw new Error('useMonumentos deve ser usado dentro de MonumentosProvider.');
  }
  return context;
}
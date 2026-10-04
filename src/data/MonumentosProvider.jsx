import { useCallback, useEffect, useState } from 'react';
import { MonumentosContext } from './MonumentosContext.jsx';
import { monumentos as monumentosBase } from './monumentos.js';

const STORAGE_KEY = 'caminho_bronze_encontrados';

function carregarMonumentos() {
  try {
    const idsEncontrados = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const idsValidos = Array.isArray(idsEncontrados) ? idsEncontrados : [];

    return monumentosBase.map((monumento) => ({
      ...monumento,
      status: monumento.status === 'encontrado' || idsValidos.includes(monumento.id)
        ? 'encontrado'
        : 'não encontrado',
    }));
  } catch {
    return monumentosBase.map((monumento) => ({ ...monumento }));
  }
}

export function MonumentosProvider({ children }) {
  const [monumentos, setMonumentos] = useState(carregarMonumentos);

  useEffect(() => {
    try {
      const idsEncontrados = monumentos
        .filter((monumento) => monumento.status === 'encontrado')
        .map((monumento) => monumento.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(idsEncontrados));
    } catch (error) {
      console.warn('Não foi possível salvar o progresso:', error);
    }
  }, [monumentos]);

  const marcarEncontrado = useCallback((id) => {
    setMonumentos((atuais) => atuais.map((monumento) => (
      monumento.id === id
        ? { ...monumento, status: 'encontrado' }
        : monumento
    )));
  }, []);

  return (
    <MonumentosContext.Provider value={{ monumentos, marcarEncontrado }}>
      {children}
    </MonumentosContext.Provider>
  );
}
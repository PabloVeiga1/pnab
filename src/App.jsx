import { useEffect, useState } from 'react'
import React from 'react'
import Map from './components/Map/Map.jsx'
import './App.css'

import Header from "./components/Header/Header.jsx"
import SearchBar from './components/SearchBar/SearchBar.jsx'
import BottomControls from "./components/BottomControls/BottomControls.jsx"

export default function App() {
  // Persistir apenas durante a sessão (navegação SPA), limpar ao recarregar a página
  const [destino, setDestino] = useState(() => {
    const stored = sessionStorage.getItem('destino');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (destino) {
      sessionStorage.setItem('destino', JSON.stringify(destino));
    } else {
      sessionStorage.removeItem('destino');
    }
  }, [destino]);

  // Ao recarregar/fechar a aba, remover destino para não reaparecer após refresh
  useEffect(() => {
    const handler = () => sessionStorage.removeItem('destino');
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, []);


  return (
    <main className="app-root">
      <Header />
      <SearchBar onSelect={setDestino} />
      <Map destino={destino} />
      <BottomControls />
    </main>
  )
}

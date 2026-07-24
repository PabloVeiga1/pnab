import { useState } from 'react'
import React from 'react'
import Map from './components/Map/Map.jsx'
import './App.css'

import Header from "./components/Header/Header.jsx"
import SearchBar from './components/SearchBar/SearchBar.jsx'
import BottomControls from "./components/BottomControls/BottomControls.jsx"

export default function App() {
  const [destino,setDestino] = useState(null)
  return (
    <main>
      <Header/>
      <SearchBar onSelect={setDestino}/>
      <Map destino={destino}/>
      <BottomControls/>
    </main>
  )
}

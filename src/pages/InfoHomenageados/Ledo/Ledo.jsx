import React, { useState } from "react";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import "./Ledo.css";
import TimeLineLedo from "./TimeLineLedo.jsx";
import MidiasLedo from "./MidiasLedo.jsx";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from "../../../data/useMonumentos.js";

export default function LedoPage() {
  const [activeTab, setActiveTab] = useState("biografia");
  const { monumentos } = useMonumentos();
  const ledo = monumentos.find(el => el.nome === "Lêdo Ivo")

  const navigate = useNavigate();
  
  function irRotas() {
    navigate("/rotasordenadas");
  }

  return (
    <div className="container-statue">
      <header className="header-statue">
        <button className="btn-back">
          <FaArrowLeft size={16} onClick={irRotas}/>
        </button>

        <div className="badge-status">
          <FaLock size={12} />
          <span>{ledo.status}</span>
        </div>
      </header>

      <section className="profile-section">
        <div className="avatar-placeholder"></div>
        <div className="profile-info">
          <h2>{ledo.nome}</h2>
          <p>Escritor</p>
        </div>
      </section>

      <nav className="tabs-nav">
        <button
          type="button"
          className={`tab-item ${activeTab === "biografia" ? "active" : ""}`}
          onClick={() => setActiveTab("biografia")}
          onFocus={() => setActiveTab("biografia")}
        >
          <span className="tab-dot"></span> Biografia
        </button>
        <button
          type="button"
          className={`tab-item ${activeTab === "linha" ? "active" : ""}`}
          onClick={() => setActiveTab("linha")}
          onFocus={() => setActiveTab("linha")}
        >
          <span className="tab-dot"></span> Linha do tempo
        </button>
        <button
          type="button"
          className={`tab-item ${activeTab === "midias" ? "active" : ""}`}
          onClick={() => setActiveTab("midias")}
          onFocus={() => setActiveTab("midias")}
        >
          <span className="tab-dot"></span> Mídias
        </button>
      </nav>

      <main className="content-area">
        {activeTab === "biografia" && (
          <article className="biografia-content">
            <h1>Biografia</h1>
            <p>
              Ledo Ivo (1924–2012) foi poeta, romancista e cronista brasileiro, integrante da Geração de 1945. Sua obra combina lirismo e reflexão social, explorando a memória, a cidade e a condição humana em textos carregados de sensibilidade.
            </p>
          </article>
        )}
        {activeTab === "linha" && <TimeLineLedo />}
        {activeTab === "midias" && <MidiasLedo />}
      </main>
    </div>
  );
}

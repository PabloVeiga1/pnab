import React, { useState } from "react";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import "./Zumbi.css";
import TimeLineZumbi from "./TimeLineZumbi.jsx";
import MidiasZumbi from "./MidiasZumbi.jsx";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from "../../../data/useMonumentos.js";

export default function GracilianoPage() {
  const [activeTab, setActiveTab] = useState("biografia");
  const { monumentos } = useMonumentos();
  const zumbi = monumentos.find(el => el.nome === "Zumbi dos Palmares")
      
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
          <span>{zumbi.status}</span>
        </div>
      </header>

      <section className="profile-section">
        <div className="avatar-placeholder"></div>
        <div className="profile-info">
          <h2>{zumbi.nome}</h2>
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
              Zumbi dos Palmares (1645–1695) foi líder do Quilombo dos Palmares e símbolo da resistência negra contra a escravidão no Brasil. Sua luta pela liberdade e pela afirmação da identidade afro-brasileira continua inspirando movimentos sociais até hoje.
            </p>
          </article>
        )}
        {activeTab === "linha" && <TimeLineZumbi />}
        {activeTab === "midias" && <MidiasZumbi />}
      </main>
    </div>
  );
}

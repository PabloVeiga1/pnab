import React, { useState } from "react";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import "./Jorge.css";
import TimeLineJorge from "./TimeLineJorge.jsx";
import MidiasJorge from "./MidiasJorge.jsx";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from "../../../data/useMonumentos.js";

export default function JorgePage() {
  const [activeTab, setActiveTab] = useState("biografia");
  const { monumentos } = useMonumentos();
  const jorge = monumentos.find(el => el.nome === "Jorge de Lima")

  const navigate = useNavigate();
  function irRotas() {
    navigate("/rotasordenadas");
  }

  return (
    <div className="container-statue">
      <header className="header-statue">
        <button className="btn-back" onClick={irRotas}>
          <FaArrowLeft size={16}/>
        </button>

        <div className="badge-status">
          <FaLock size={12} />
          <span>{jorge.status}</span>
        </div>
      </header>

      <section className="profile-section">
        <div className="avatar-placeholder"></div>
        <div className="profile-info">
          <h2>{jorge.nome}</h2>
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
              Jorge de Lima (1893–1953) foi um poeta, romancista e ensaísta brasileiro. Sua obra é marcada pela busca de uma identidade nacional e pela exploração de temas como a morte, a natureza e a condição humana.
            </p>
          </article>
        )}
        {activeTab === "linha" && <TimeLineJorge />}
        {activeTab === "midias" && <MidiasJorge />}
      </main>
    </div>
  );
}

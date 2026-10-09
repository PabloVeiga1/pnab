import React, { useState } from "react";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import "./Nise.css";
import TimeLineNise from "./LinhaDoTempoNise.jsx";
import MidiasNise from "./MidiasNise.jsx";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from "../../../dados/usarMonumentos.js";
import fotoNise from "../../../../identidade_visual/perfis/tipo-2-nise.png";

export default function NisePage() {
  const [activeTab, setActiveTab] = useState("biografia");
  const { monumentos } = useMonumentos();
  const nise = monumentos.find(el => el.nome === "Nise da Silveira")
  
  const navigate = useNavigate();
  function irRotas() {
    navigate("/rotasordenadas");
  }
  return (
    <div className="container-statue pagina-nise">
      <header className="header-statue">
        <button className="btn-back">
          <FaArrowLeft size={16} onClick={irRotas}/>
        </button>

        <div className="badge-status">
          <FaLock size={12} />
          <span>{nise.status}</span>
        </div>
      </header>

      <section className="profile-section">
        <div className="avatar-placeholder">
          <div className="avatar-recorte">
            <img src={fotoNise} alt="Retrato de Nise da Silveira" />
          </div>
        </div>
        <div className="profile-info">
          <h2>{nise.nome}</h2>
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
              Nise da Silveira (1905–1999) foi uma psiquiatra brasileira pioneira na humanização do tratamento das doenças mentais. Ela rejeitou métodos agressivos como eletrochoque e lobotomia, valorizando a terapia ocupacional e a expressão artística no processo de cura.
            </p>
          </article>
        )}
        {activeTab === "linha" && <TimeLineNise />}
        {activeTab === "midias" && <MidiasNise />}
      </main>
    </div>
  );
}

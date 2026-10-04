import React, { useState } from "react";
import { FaArrowLeft, FaLock,FaCheck } from "react-icons/fa";
import "./Graciliano.css";
import TimeLineGraciliano from "./TimeLineGraciliano.jsx";
import MidiasGraciliano from "./MidiasGraciliano.jsx";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from "../../../data/useMonumentos.js";

export default function GracilianoPage() {

  const [activeTab, setActiveTab] = useState("biografia");
  const { monumentos } = useMonumentos();
  const graci = monumentos.find(el => el.nome === "Graciliano Ramos")
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
          <span>{graci.status === "encontrado"? <FaCheck style={{marginBottom:"-3px",marginRight:"5px"}}/>: <FaLock/>}{graci.status}</span>
        </div>
      </header>

      <section className="profile-section">
        <div className="avatar-placeholder"></div>
        <div className="profile-info">
          <h2>{graci.nome}</h2>
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
              Graciliano Ramos (1892–1953) foi um dos maiores escritores brasileiros do século XX, autor de obras fundamentais como "Vidas Secas" e "São Bernardo". Sua escrita direta, condensada e socialmente engajada expôs as dificuldades do sertanejo e as contradições da sociedade brasileira.
            </p>
          </article>
        )}
        {activeTab === "linha" && <TimeLineGraciliano />}
        {activeTab === "midias" && <MidiasGraciliano />}
      </main>
    </div>
  );
}

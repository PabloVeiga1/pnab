import React, { useState } from "react";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import "./Paulo.css";
import TimeLinePaulo from "./TimeLinePaulo.jsx";
import MidiasPaulo from "./MidiasPaulo.jsx";
import { useNavigate } from 'react-router-dom';
import { monumentos } from "../../../data/monumentos.js";

export default function PauloPage() {
  const [activeTab, setActiveTab] = useState("biografia");
  const paulo = monumentos.find(el => el.nome === "Paulo Gracindo")
    
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
          <span>{paulo.status}</span>
        </div>
      </header>

      <section className="profile-section">
        <div className="avatar-placeholder"></div>
        <div className="profile-info">
          <h2>{paulo.nome}</h2>
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
              Paulo Freire (1921–1997) foi um educador e filósofo brasileiro conhecido por sua pedagogia crítica e libertadora, que valoriza o diálogo, a conscientização e a participação dos alunos. Sua obra "Pedagogia do Oprimido" é referência mundial em educação popular.
            </p>
          </article>
        )}
        {activeTab === "linha" && <TimeLinePaulo />}
        {activeTab === "midias" && <MidiasPaulo />}
      </main>
    </div>
  );
}

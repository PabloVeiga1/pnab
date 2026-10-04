import React, { useState } from "react";
import { FaArrowLeft, FaLock,FaCheck } from "react-icons/fa";
import "./Aurelio.css";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from "../../../data/useMonumentos";
import TimeLineAurelio from "./TimeLineAurelio.jsx";
import MidiasAurelio from "./MidiasAurelio.jsx";

export default function AurelioPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("biografia");
  const { monumentos } = useMonumentos();

  function irRotas() {
    navigate("/rotasordenadas");
  }

  const aurelio = monumentos.find(el => el.nome === "Aurélio Buarque de Holanda");

  return (
    <div className="container-statue">
      <header className="header-statue">
        <button className="btn-back" onClick={irRotas}>
          <FaArrowLeft size={16} />
        </button>

        <div className="badge-status">
          <span>{aurelio.status === "encontrado"? <FaCheck style={{marginBottom:"-3px",marginRight:"5px"}}/>: <FaLock/>}{aurelio.status}</span>
        </div>
      </header>
      <section className="profile-section">
        <div className="avatar-placeholder"></div>
        <div className="profile-info">
          <h2>{aurelio.nome}</h2>
          <p>Escritor, Professor, Tradutor e Lexicógrafo</p>
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
              Aurélio Buarque de Holanda (1910–1989) foi um lexicógrafo, professor e tradutor brasileiro, reconhecido por criar o Dicionário Aurélio, um dos principais referenciais da língua portuguesa no país. Sua obra ajudou a normatizar o uso do português no Brasil e a tornar a língua mais acessível para estudantes, escritores e professores.
            </p>
          </article>
        )}

        {activeTab === "linha" && <TimeLineAurelio />}
        {activeTab === "midias" && <MidiasAurelio />}
      </main>
    </div>
  );
}

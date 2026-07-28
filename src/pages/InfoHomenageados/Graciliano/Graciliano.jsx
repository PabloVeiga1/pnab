import React from "react";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import "./Graciliano.css";

export default function GracilianoPage() {
  return (
    <div className="container-statue">
      {}
      <header className="header-statue">
        <button className="btn-back">
          <FaArrowLeft size={16} />
        </button>

        <div className="badge-status">
          <FaLock size={12} />
          <span>Não descoberto</span>
        </div>
      </header>

      {}
      <section className="profile-section">
        <div className="avatar-placeholder"></div>
        <div className="profile-info">
          <h2>Graciliano Ramos</h2>
          <p>Escritor</p>
        </div>
      </section>

      {}
      <nav className="tabs-nav">
        <button className="tab-item active">
          <span className="tab-dot"></span> Biografia
        </button>
        <button className="tab-item">
          <span className="tab-dot"></span> Linha do tempo
        </button>
        <button className="tab-item">
          <span className="tab-dot"></span> Mídias
        </button>
      </nav>

      {}
      <main className="content-area">
        <article className="biografia-content">
          <h1>Biografia</h1>
          <p>
            Esse código garantirá a proteção e a privacidade do seu perfil. Esse
            código garantirá a proteção e a privacidade do seu perfil. Esse código
            garantirá a proteção e a privacidade do seu perfil. Esse código
            garantirá a proteção e a privacidade do seu perfil. Esse código
            garantirá a proteção e a privacidade do seu perfil.
          </p>
        </article>
      </main>
    </div>
  );
}

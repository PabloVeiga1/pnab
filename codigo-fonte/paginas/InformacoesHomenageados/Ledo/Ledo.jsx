import pdfUrl from "./ledo-ivo.pdf"
import React from "react";
import { FaArrowLeft, FaLock, FaCheck } from "react-icons/fa";
import "./Ledo.css";
import "../PerfilHomenageado.css";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from "../../../dados/usarMonumentos.js";
import fotoLedo from "../../../../identidade_visual/perfis/tipo-2-ledo-ivo.png";
import bannerLedo from "../../../../identidade_visual/banners/banner_ledo_ivo.png";
import MenuPerfil from "../MenuPerfil.jsx";
import { FiFileText } from "react-icons/fi";

export default function LedoPage() {
  const { monumentos } = useMonumentos();
  const ledo = monumentos.find(el => el.nome === "Lêdo Ivo")

  const navigate = useNavigate();
  
  function irRotas() {
    navigate("/rotasordenadas");
  }

  return (
    <div className="container-statue pagina-ledo">
      <div className="profile-hero" style={{ "--profile-banner": `url(${bannerLedo})` }}>
        <header className="header-statue">
          <button className="btn-back" onClick={irRotas}>
            <FaArrowLeft size={16} />
          </button>
          <div className="badge-status" aria-label={`Status: ${ledo.status}`}>
            <span aria-hidden="true">{ledo.status === "encontrado" ? <FaCheck /> : <FaLock />}{ledo.status}</span>
          </div>
        </header>
        <section className="profile-section">
          <div className="avatar-placeholder">
            <div className="avatar-recorte">
              <img src={fotoLedo} alt="Retrato de Lêdo Ivo" />
            </div>
          </div>
          <div className="profile-info">
            <h2>{ledo.nome}</h2>
            <p>Poeta, escritor e jornalista</p>
          </div>
        </section>
      </div>

      <MenuPerfil perfil="ledo" />
      <main className="content-area">
        <p className="biografia-resumo">
          Poeta de Maceió que transformou sua terra, suas memórias e sua visão
          de mundo em literatura.
        </p>
        <article className="biografia-content">
          <h1>Biografia</h1>
          <div className="biografia-texto">
            <p>
              E aí, meus chegados! Eu sou o Lêdo Ivo, jornalista, romancista e, acima de tudo, poeta. Nasci em Maceió, em 1924. Minha escrita é intensa, não foge da realidade, mas traz sempre aquele toque de "encantamento". Se você gosta de versos como eu, venha conhecer mais sobre a minha história! Acesse o link! Espero você lá no Posto 7, na Praia da Jatiúca!
            </p>
          </div>
        </article>
        <section className="biografia-acoes" aria-label="Mais conteúdos sobre Lêdo Ivo">
          <a
            className="biografia-download"
            href={pdfUrl}
            download="ledo-ivo.pdf"
          >
            <span className="biografia-download-icone">
              <FiFileText aria-hidden="true" />
            </span>
            <span className="biografia-download-texto">
              <strong>Lêdo Ivo</strong>
              <span>Biografia estendida</span>
            </span>
          </a>
          <button className="biografia-desafio" type="button" disabled>
            Desafio
          </button>
        </section>
      </main>
    </div>
  );
}

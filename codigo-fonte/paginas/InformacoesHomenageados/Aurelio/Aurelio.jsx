import React from "react";
import pdfUrl from './aurelio-buarque.pdf';
import { FaArrowLeft, FaLock,FaCheck } from "react-icons/fa";
import "./Aurelio.css";
import "../PerfilHomenageado.css";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from "../../../dados/usarMonumentos";
import fotoAurelio from "../../../../identidade_visual/perfis/tipo-2-aurélio.png";
import bannerAurelio from "../../../../identidade_visual/banners/banner_aurelio.png";
import MenuPerfil from "../MenuPerfil.jsx";
import { FiFileText } from "react-icons/fi";

export default function AurelioPage() {
  const navigate = useNavigate();
  const { monumentos } = useMonumentos();

  function irRotas() {
    navigate("/rotasordenadas");
  }

  const aurelio = monumentos.find(el => el.nome === "Aurélio Buarque de Holanda");

  return (
    <div className="container-statue pagina-aurelio">
      <div className="profile-hero" style={{ "--profile-banner": `url(${bannerAurelio})` }}>
        <header className="header-statue">
          <button className="btn-back" onClick={irRotas}>
            <FaArrowLeft size={16} />
          </button>
          <div className="badge-status" aria-label={`Status: ${aurelio.status}`}>
            <span aria-hidden="true">{aurelio.status === "encontrado" ? <FaCheck /> : <FaLock />}{aurelio.status}</span>
          </div>
        </header>
        <section className="profile-section">
          <div className="avatar-placeholder">
            <div className="avatar-recorte">
              <img src={fotoAurelio} alt="Retrato de Aurélio Buarque de Holanda" />
            </div>
          </div>
          <div className="profile-info">
            <h2>{aurelio.nome}</h2>
            <p>Escritor, Professor, Tradutor e Lexicógrafo</p>
          </div>
        </section>
      </div>
      <MenuPerfil perfil="aurelio" />
      <main className="content-area">
        <p className="biografia-resumo">
          O alagoano que fez das palavras um ofício e ajudou
          gerações de brasileiros a conhecer, compreender e usar melhor a língua portuguesa.
        </p>
        <article className="biografia-content">
          <h1>Biografia</h1>
          <div className="biografia-texto">
            <p>
             Fala, meu povo! Eu sou o cara que criou o dicionário mais famoso do Brasil. Você já deve ter visto meu nome por aí: Aurélio! Além de dicionarista, sou crítico literário, tradutor e ensaísta. Nasci em Passo de Camaragibe. Espero sua visita lá na Praia de Ponta Verde . Clica no link e vem saber mais! 
            </p>
          </div>
        </article>
        <section className="biografia-acoes" aria-label="Mais conteúdos sobre Aurélio Buarque de Holanda">
          <a
            className="biografia-download"
            href={pdfUrl}
            download="aurelio-buarque.pdf"
          >
            <span className="biografia-download-icone">
              <FiFileText aria-hidden="true" />
            </span>
            <span className="biografia-download-texto">
              <strong>Aurélio Buarque de Holanda</strong>
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

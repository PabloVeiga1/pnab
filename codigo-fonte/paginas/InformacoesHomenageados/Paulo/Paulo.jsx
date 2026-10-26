import pdfUrl from "./paulo-gracindo.pdf"
import React from "react";
import { FaArrowLeft, FaLock, FaCheck} from "react-icons/fa";
import "./Paulo.css";
import "../PerfilHomenageado.css";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from "../../../dados/usarMonumentos.js";
import fotoPaulo from "../../../../identidade_visual/perfis/tipo-2-paulo-gracindo.png";
import MenuPerfil from "../MenuPerfil.jsx";
import { FiFileText } from "react-icons/fi";

export default function PauloPage() {
  const { monumentos } = useMonumentos();
  const paulo = monumentos.find(el => el.nome === "Paulo Gracindo")
    
  const navigate = useNavigate();
  function irRotas() {
    navigate("/rotasordenadas");
  }

  return (
    <div className="container-statue pagina-paulo">
      <header className="header-statue">
        <button className="btn-back" onClick={irRotas}>
          <FaArrowLeft size={16} />
        </button>

        <div className="badge-status">
          <span>{paulo.status === "encontrado"? <FaCheck style={{marginBottom:"-3px",marginRight:"5px"}}/>: <FaLock/>}{paulo.status}</span>
        </div>
      </header>

      <section className="profile-section">
        <div className="avatar-placeholder">
          <div className="avatar-recorte">
            <img src={fotoPaulo} alt="Retrato de Paulo Gracindo" />
          </div>
        </div>
        <div className="profile-info">
          <h2>{paulo.nome}</h2>
          <p>Ator</p>
        </div>
      </section>

      <MenuPerfil perfil="paulo" />
      <main className="content-area">
        <p className="biografia-resumo">
          Um artista que levou Alagoas consigo e ajudou a construir a história
          da dramaturgia brasileira.
        </p>
        <article className="biografia-content">
          <h1>Biografia</h1>
          <div className="biografia-texto">
            <p>
              Olá, pessoal! Eu sou o Paulo Gracindo. Nasci no Rio de Janeiro em 1911, mas me considero alagoano com muito orgulho, pois vim morar aqui ainda criança. Saí de Maceió para me tornar um dos rostos mais conhecidos da história da TV, do rádio e do teatro no Brasil. Quer saber mais sobre mim? Acesse o link! A gente se vê lá na Praia de Pajuçara.
            </p>
          </div>
        </article>
        <section className="biografia-acoes" aria-label="Mais conteúdos sobre Paulo Gracindo">
          <a
            className="biografia-download"
            href={pdfUrl}
            download="paulo-gracindo.pdf"
          >
            <span className="biografia-download-icone">
              <FiFileText aria-hidden="true" />
            </span>
            <span className="biografia-download-texto">
              <strong>Paulo Gracindo</strong>
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

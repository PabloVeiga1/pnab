import React from "react";
import { FaArrowLeft, FaLock, FaCheck} from "react-icons/fa";
import "./Nise.css";
import "../PerfilHomenageado.css";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from "../../../dados/usarMonumentos.js";
import fotoNise from "../../../../identidade_visual/perfis/tipo-2-nise.png";
import bannerNise from "../../../../identidade_visual/banners/banner_nise.png";
import MenuPerfil from "../MenuPerfil.jsx";
import { FiFileText } from "react-icons/fi";


export default function NisePage() {
  const { monumentos } = useMonumentos();
  const nise = monumentos.find(el => el.nome === "Nise da Silveira")
  
  const navigate = useNavigate();
  function irRotas() {
    navigate("/rotasordenadas");
  }
  return (
    <div className="container-statue pagina-nise">
      <div className="profile-hero" style={{ "--profile-banner": `url(${bannerNise})` }}>
        <header className="header-statue">
          <button className="btn-back" onClick={irRotas}>
            <FaArrowLeft size={16} />
          </button>
          <div className="badge-status" aria-label={`Status: ${nise.status}`}>
            <span aria-hidden="true">{nise.status === "encontrado" ? <FaCheck /> : <FaLock />}{nise.status}</span>
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
            <p>Psiquiatra</p>
          </div>
        </section>
      </div>

      <MenuPerfil perfil="nise" />
      <main className="content-area">
        <p className="biografia-resumo">
          Uma alagoana que transformou a relação entre psiquiatria, arte, afeto
          e liberdade.
        </p>
        <article className="biografia-content">
          <h1>Biografia</h1>
          <div className="biografia-texto">
            <p>
              Olá, meus queridos e minhas queridas! Sou a Dra. Nise da Silveira, médica e psiquiatra, mas muita gente me conhece como a "rebelde" da medicina. Nasci em Alagoas e encarei o desafio de ser a única mulher em uma turma de 157 homens na faculdade. Desde cedo, entendi que o meu papel era questionar as estruturas rígidas e lutar pelo que acredito. Acesse o link e conheça mais sobre a minha história. Te espero sentadinha lá na Praça Vera Arruda, na Praia de Jatiúca. Um abraço!
            </p>
          </div>
        </article>
        <section className="biografia-acoes" aria-label="Mais conteúdos sobre Nise da Silveira">
          <a
            className="biografia-download"
            href="/biografias/biografia-estendida-nise-da-silveira.pdf"
            download
          >
            <span className="biografia-download-icone">
              <FiFileText aria-hidden="true" />
            </span>
            <span className="biografia-download-texto">
              <strong>Nise da Silveira</strong>
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

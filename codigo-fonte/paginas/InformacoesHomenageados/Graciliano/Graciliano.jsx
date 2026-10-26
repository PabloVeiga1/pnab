import React from "react";
import { FaArrowLeft, FaLock,FaCheck } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import "./Graciliano.css";
import "../PerfilHomenageado.css";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from "../../../dados/usarMonumentos.js";
import fotoGraciliano from "../../../../identidade_visual/perfis/tipo-2-graciliano.png";
import bannerGraciliano from "../../../../identidade_visual/banners/banner_graciliano.png";
import MenuPerfil from "../MenuPerfil.jsx";

export default function GracilianoPage() {

  const { monumentos } = useMonumentos();
  const graci = monumentos.find(el => el.nome === "Graciliano Ramos")
  const navigate = useNavigate();

  function irRotas() {
    navigate("/rotasordenadas");
  }

  return (
    <div className="container-statue pagina-graciliano">
      <div className="profile-hero" style={{ "--profile-banner": `url(${bannerGraciliano})` }}>
        <header className="header-statue">
          <button className="btn-back" onClick={irRotas}>
            <FaArrowLeft size={16}/>
          </button>
          <div className="badge-status" aria-label={`Status: ${graci.status}`}>
            <span aria-hidden="true">{graci.status === "encontrado"? <FaCheck/>: <FaLock/>}{graci.status}</span>
          </div>
        </header>

        <section className="profile-section">
          <div className="avatar-placeholder">
            <div className="avatar-recorte">
              <img src={fotoGraciliano} alt="Retrato de Graciliano Ramos" />
            </div>
          </div>
          <div className="profile-info">
            <h2>{graci.nome}</h2>
            <p>Escritor</p>
          </div>
        </section>
      </div>

      <MenuPerfil perfil="graci" />
      <main className="content-area">
        <p className="biografia-resumo">
          O escritor alagoano que transformou a experiência humana e a
          realidade do Nordeste em uma das obras mais importantes da literatura brasileira.
        </p>
        <article className="biografia-content">
          <h1>Biografia</h1>
          <div className="biografia-texto">
            <p>
             E aí, galera?! Eu sou o Graciliano Ramos, escritor e alagoano. Nasci em Quebrangulo e já fiz bastante coisa: até prefeito eu fui! Escrevi alguns livros e dizem que foram marcantes, o mais conhecido deles é Vidas Secas, que conta a história da cachorra Baleia e da família de Fabiano.  Minha obra foi traduzida para diversos idiomas. Que tal conhecer mais sobre essa história? Acesse o link e vá me vê lá na Praia de Pajuçara, se quiser.   
            </p>
          </div>
        </article>
        <section className="biografia-acoes" aria-label="Mais conteúdos sobre Graciliano Ramos">
          <a
            className="biografia-download"
            href="/biografias/biografia-estendida-graciliano-ramos.pdf"
            download
          >
            <span className="biografia-download-icone">
              <FiFileText aria-hidden="true" />
            </span>
            <span className="biografia-download-texto">
              <strong>Graciliano Ramos</strong>
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

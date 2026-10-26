import React from "react";
import { FaArrowLeft, FaLock, FaCheck} from "react-icons/fa";
import "./Jorge.css";
import "../PerfilHomenageado.css";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from "../../../dados/usarMonumentos.js";
import fotoJorge from "../../../../identidade_visual/perfis/tipo-2-jorge-de-lima.png";
import bannerJorge from "../../../../identidade_visual/banners/banner_jorge_lima.png";
import MenuPerfil from "../MenuPerfil.jsx";
import { FiFileText } from "react-icons/fi";

export default function JorgePage() {
  const { monumentos } = useMonumentos();
  const jorge = monumentos.find(el => el.nome === "Jorge de Lima")

  const navigate = useNavigate();
  function irRotas() {
    navigate("/rotasordenadas");
  }

  return (
    <div className="container-statue pagina-jorge">
      <div className="profile-hero" style={{ "--profile-banner": `url(${bannerJorge})` }}>
        <header className="header-statue">
          <button className="btn-back" onClick={irRotas}>
            <FaArrowLeft size={16}/>
          </button>
          <div className="badge-status" aria-label={`Status: ${jorge.status}`}>
            <span aria-hidden="true">{jorge.status === "encontrado" ? <FaCheck /> : <FaLock />}{jorge.status}</span>
          </div>
        </header>
        <section className="profile-section">
          <div className="avatar-placeholder">
            <div className="avatar-recorte">
              <img src={fotoJorge} alt="Retrato de Jorge de Lima" />
            </div>
          </div>
          <div className="profile-info">
            <h2>{jorge.nome}</h2>
            <p>Poeta e escritor</p>
          </div>
        </section>
      </div>

      <MenuPerfil perfil="jorge" />
      <main className="content-area">
        <p className="biografia-resumo">
          Poeta de Alagoas que transformou memória, infância, cultura,
          religiosidade e identidade brasileira em literatura.
        </p>
        <article className="biografia-content">
          <h1>Biografia</h1>
          <div className="biografia-texto">
            <p>
              E aí, rapaziada! Eu sou o Jorge de Lima. Nasci em União dos Palmares e desde novinho era apaixonado pela arte de criar versos. Aos 14 anos escrevi um poema que seria um dos mais famosos da minha obra: O Acendedor de Lampiões. Além de poeta e pintor, também fui médico e dediquei minha vida a cuidar das pessoas e a contar a beleza e as lutas da nossa gente e da cultura nordestina. Quer saber como a poesia pode acender novas ideias? Acesse o link para conhecer mais sobre a minha trajetória! Te vejo na Praça Sinimbu, lá no bairro histórico de Jaraguá. Um abraço!
            </p>
          </div>
        </article>
        <section className="biografia-acoes" aria-label="Mais conteúdos sobre Jorge de Lima">
          <a
            className="biografia-download"
            href="/biografias/biografia-estendida-jorge-de-lima.pdf"
            download
          >
            <span className="biografia-download-icone">
              <FiFileText aria-hidden="true" />
            </span>
            <span className="biografia-download-texto">
              <strong>Jorge de Lima</strong>
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

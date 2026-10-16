import React from "react";
import { FaArrowLeft, FaLock, FaCheck} from "react-icons/fa";
import "./Jorge.css";
import "../PerfilHomenageado.css";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from "../../../dados/usarMonumentos.js";
import fotoJorge from "../../../../identidade_visual/perfis/tipo-2-jorge-de-lima.png";
import bannerJorge from "../../../../identidade_visual/banners/banner_jorge_lima.png";
import MenuPerfil from "../MenuPerfil.jsx";

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
      </main>
    </div>
  );
}

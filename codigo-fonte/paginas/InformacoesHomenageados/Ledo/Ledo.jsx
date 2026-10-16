import React from "react";
import { FaArrowLeft, FaLock, FaCheck } from "react-icons/fa";
import "./Ledo.css";
import "../PerfilHomenageado.css";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from "../../../dados/usarMonumentos.js";
import fotoLedo from "../../../../identidade_visual/perfis/tipo-2-ledo-ivo.png";
import bannerLedo from "../../../../identidade_visual/banners/banner_ledo_ivo.png";
import MenuPerfil from "../MenuPerfil.jsx";

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
      </main>
    </div>
  );
}

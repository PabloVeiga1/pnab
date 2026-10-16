import React from "react";
import { FaArrowLeft, FaLock, FaCheck} from "react-icons/fa";
import "./Nise.css";
import "../PerfilHomenageado.css";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from "../../../dados/usarMonumentos.js";
import fotoNise from "../../../../identidade_visual/perfis/tipo-2-nise.png";
import bannerNise from "../../../../identidade_visual/banners/banner_nise.png";
import MenuPerfil from "../MenuPerfil.jsx";

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
      </main>
    </div>
  );
}

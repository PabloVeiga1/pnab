import React from "react";
import { FaArrowLeft, FaLock, FaCheck} from "react-icons/fa";
import "./Paulo.css";
import "../PerfilHomenageado.css";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from "../../../dados/usarMonumentos.js";
import fotoPaulo from "../../../../identidade_visual/perfis/tipo-2-paulo-gracindo.png";
import MenuPerfil from "../MenuPerfil.jsx";

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
      </main>
    </div>
  );
}

import React from "react";
import { FaArrowLeft, FaCheck, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMonumentos } from "../../dados/usarMonumentos.js";
import "./PerfilHomenageado.css";

export default function CabecalhoPerfil({ perfilInfo, onVoltar }) {
  const navigate = useNavigate();
  const { monumentos } = useMonumentos();

  const monumento = monumentos?.find(
    (el) => el.id === perfilInfo?.idMonumento || el.nome === perfilInfo?.nome
  );
  const status = monumento?.status || "encontrado";

  function irRotas() {
    if (onVoltar) {
      onVoltar();
    } else {
      navigate("/rotasordenadas");
    }
  }

  if (!perfilInfo) return null;

  return (
    <div
      className="profile-hero"
      style={{ "--profile-banner": `url(${perfilInfo.banner})` }}
    >
      <header className="header-statue">
        <button
          className="btn-back"
          onClick={irRotas}
          aria-label="Voltar para as rotas"
        >
          <FaArrowLeft size={16} />
        </button>
        <div className="badge-status" aria-label={`Status: ${status}`}>
          <span aria-hidden="true">
            {status === "encontrado" ? <FaCheck /> : <FaLock />}
            {status}
          </span>
        </div>
      </header>

      <section className="profile-section">
        <div className="avatar-placeholder">
          <div className="avatar-recorte">
            <img src={perfilInfo.foto} alt={`Retrato de ${perfilInfo.nome}`} />
          </div>
        </div>
        <div className="profile-info">
          <h2>{perfilInfo.nome}</h2>
          <p>{perfilInfo.funcao}</p>
        </div>
      </section>
    </div>
  );
}


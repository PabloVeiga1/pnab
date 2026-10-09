import "./ControlesInferiores.css";
import { FiList } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AVATARS } from "../FluxoDeBoasVindas/DadosAvatares";

export default function BottomControls({ onOpenProfile }) {
  const navigate = useNavigate();

  function irHomenageados() {
    navigate("/homenageados");
  }

  function irRotasOrdenadas() {
    navigate("/rotasordenadas");
  }

  function handleProfileClick() {
    if (onOpenProfile) {
      onOpenProfile();
    } else {
      navigate("/onboarding");
    }
  }

  const savedAvatarId = localStorage.getItem("caminho_bronze_avatar") || "mic";
  const avatarObj = AVATARS.find((a) => a.id === savedAvatarId) || AVATARS[0];

  return (
    <nav className="bottom-dock-container" role="toolbar" aria-label="Navegação inferior">
      <div className="bottom-dock">
        {/* Botão 1: Estátuas */}
        <button
          type="button"
          onClick={irHomenageados}
          className="dock-item-btn"
          aria-label="Menu Estátuas"
          title="Ver Estátuas"
        >
          <div className="dock-icon-wrapper">
            <FiList className="dock-icon-statues" />
          </div>
          <span className="dock-label">Estátuas</span>
        </button>

        {/* Botão 2 (Central): Rotas Ordenadas / GPS */}
        <button
          type="button"
          onClick={irRotasOrdenadas}
          className="dock-center-btn"
          aria-label="Rotas Ordenadas"
          title="Ver Rotas Guiadas"
        >
          <FaMapMarkerAlt className="dock-pin-icon" />
        </button>

        {/* Botão 3: Perfil com Avatar */}
        <button
          type="button"
          onClick={handleProfileClick}
          className="dock-item-btn"
          aria-label="Perfil do Usuário"
          title="Perfil e Avatar"
        >
          <div className="dock-avatar-circle">
            {avatarObj.renderIcon("#A81D84", 20)}
          </div>
          <span className="dock-label">Perfil</span>
        </button>
      </div>
    </nav>
  );
}

import "./BottomControls.css";
import { FiList } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AVATARS } from "../OnboardingFlow/avatarsData";

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

  const savedAvatarId = localStorage.getItem("caminho_bronze_avatar");
  const avatarObj = AVATARS.find((a) => a.id === savedAvatarId);

  return (
    <div className="bottom-controls" role="toolbar" aria-label="Controles inferiores">
      <button onClick={irHomenageados} className="control-btn" aria-label="Menu Homenageados" title="Homenageados">
        <FiList />
      </button>

      <button onClick={irRotasOrdenadas} className="control-btn primary" aria-label="Rotas Ordenadas" title="Rotas Ordenadas">
        <FaMapMarkerAlt />
      </button>

      <button onClick={handleProfileClick} className="control-btn" aria-label="Perfil e Avatar" title="Alterar Avatar ou Ver Apresentação">
        {avatarObj ? avatarObj.renderIcon("#A81D84", 26) : <FiUser />}
      </button>
    </div>
  );
}

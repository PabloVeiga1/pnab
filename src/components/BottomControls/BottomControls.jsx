import "./BottomControls.css";
import { FiList } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

import { useNavigate } from "react-router-dom";

export default function BottomControls() {
  const navigate = useNavigate()

  function irHomenageados(){
    navigate("/homenageados")
  }
  return (
    <div className="bottom-controls" role="toolbar" aria-label="Controles inferiores">
      <button onClick={irHomenageados} className="control-btn" aria-label="Menu Homenageados">
        <FiList />
      </button>

      <button className="control-btn primary" aria-label="Rotas Ordenadas">
        <FaMapMarkerAlt />
      </button>

      <button className="control-btn" aria-label="Perfil">
        <FiUser/>
      </button>
    </div>
  );
}

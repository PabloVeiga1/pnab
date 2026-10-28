
import { FaArrowLeft, FaLock,FaCheck } from "react-icons/fa";
import "./Aurelio.css";
import "../PerfilHomenageado.css";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from "../../../dados/usarMonumentos.js";
import fotoAurelio from "../../../../identidade_visual/perfis/tipo-2-aurélio.png";
import bannerAurelio from "../../../../identidade_visual/banners/banner_aurelio.png";
import MenuPerfil from "../MenuPerfil.jsx";


export default function AurelioPage() {
  const navigate = useNavigate();
  const { monumentos } = useMonumentos();

  function irRotas() {
    navigate("/rotasordenadas");
  }

  const aurelio = monumentos.find(el => el.nome === "Aurélio Buarque de Holanda");

  return (
    <div className="container-statue pagina-aurelio">
      <div className="profile-hero" style={{ "--profile-banner": `url(${bannerAurelio})` }}>
        <header className="header-statue">
          <button className="btn-back" onClick={irRotas}>
            <FaArrowLeft size={16} />
          </button>
          <div className="badge-status" aria-label={`Status: ${aurelio.status}`}>
            <span aria-hidden="true">{aurelio.status === "encontrado" ? <FaCheck /> : <FaLock />}{aurelio.status}</span>
          </div>
        </header>
        <section className="profile-section">
          <div className="avatar-placeholder">
            <div className="avatar-recorte">
              <img src={fotoAurelio} alt="Retrato de Aurélio Buarque de Holanda" />
            </div>
          </div>
          <div className="profile-info">
            <h2>{aurelio.nome}</h2>
            <p>Escritor, Professor, Tradutor e Lexicógrafo</p>
          </div>
        </section>
      </div>
      <MenuPerfil perfil="aurelio" />
      <main className="content-area">
        <h2>Sobre</h2>
      </main>
    </div>
  );
}
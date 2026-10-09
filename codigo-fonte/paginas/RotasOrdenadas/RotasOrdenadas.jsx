import "./RotasOrdenadas.css";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from '../../dados/usarMonumentos';
import TimeLine from "./LinhaDoTempo";
import Card from "./Cartao";

export default function RotasOrdenadas() {
  const navigate = useNavigate();
  const { monumentos } = useMonumentos();

  function irHome() {
    navigate("/");
  }

  const totalEncontrados = monumentos.filter((m) => m.status === "encontrado").length;

  return (
    <div className="rotas-page">
      <header className="page-header">
        <button onClick={irHome} className="page-back-button" aria-label="Voltar">
          <FiArrowLeft />
        </button>
        <h1 className="page-header-title">Rotas ordenadas</h1>
      </header>

      <main className="page-body">
        <h2 className="section-title">Percurso guiado</h2>
        <p className="section-description">
          {totalEncontrados} estátuas de {monumentos.length} concluídas
        </p>

        <TimeLine />
        <Card />
      </main>
    </div>
  );
}

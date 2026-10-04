import "./Header.css";
import { useMonumentos } from "../../data/useMonumentos";

export default function Header() {
  const { monumentos } = useMonumentos();
  const totalEncontrados = monumentos.filter((m) => m.status === "encontrado").length;
  const total = monumentos.length;
  const progressPercent = (totalEncontrados / total) * 100;

  return (
    <header className="header">
      <div className="header-info">
        <h2>Caminho de Bronze</h2>
        <span>{totalEncontrados}/{total} descobertas</span>
      </div>

      <div className="gps-pill" title="GPS Ativo">
        <span className="gps-pill-dot" />
        <span className="gps-pill-text">GPS</span>
      </div>

      <div className="header-progress-track">
        <div
          className="header-progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
}
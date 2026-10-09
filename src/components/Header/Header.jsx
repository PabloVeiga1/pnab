import "./Header.css";
import { useMonumentos } from "../../data/useMonumentos";

const gpsStatusLabels = {
  idle: "GPS aguardando",
  searching: "Buscando localização",
  active: "GPS ativo",
  approximate: "GPS aproximado",
  unavailable: "GPS indisponível",
};

export default function Header({ gpsStatus = "searching" }) {
  const { monumentos } = useMonumentos();
  const totalEncontrados = monumentos.filter((m) => m.status === "encontrado").length;
  const total = monumentos.length;
  const progressPercent = (totalEncontrados / total) * 100;
  const gpsLabel = gpsStatusLabels[gpsStatus] ?? gpsStatusLabels.unavailable;

  return (
    <header className="header">
      <div className="header-info">
        <h2>Caminho de Bronze</h2>
        <span>{totalEncontrados}/{total} descobertas</span>
      </div>

      <div className={`gps-pill gps-pill--${gpsStatus}`} title={gpsLabel} role="status" aria-label={gpsLabel}>
        <span className="gps-pill-dot" />
        <span className="gps-pill-text">{gpsLabel}</span>
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
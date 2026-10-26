import "./Cabecalho.css";
import { useMonumentos } from "../../dados/usarMonumentos";

<<<<<<< HEAD:src/components/Header/Header.jsx
export default function Header({ gpsState = { status: "searching", accuracy: null } }) {
  const totalEncontrados = monumentos.filter((m) => m.status === "encontrado").length;
  const total = monumentos.length;
  const progressPercent = (totalEncontrados / total) * 100;
  const gpsLabels = {
    searching: "Buscando GPS",
    active: gpsState.accuracy == null
      ? "GPS ativo"
      : `GPS ±${Math.round(gpsState.accuracy)} m`,
    imprecise: gpsState.reason === "jump"
      ? "GPS instável"
      : gpsState.reason === "stabilizing"
        ? "Estabilizando GPS"
      : gpsState.accuracy == null
        ? "GPS impreciso"
        : `GPS ±${Math.round(gpsState.accuracy)} m`,
    unavailable: "GPS indisponível",
  };
  const gpsLabel = gpsLabels[gpsState.status] || gpsLabels.searching;
  const gpsTitle = gpsState.status === "active"
    ? `Precisão estimada: ±${Math.round(gpsState.accuracy)} m`
    : gpsState.status === "imprecise" && gpsState.reason === "jump"
      ? "Posição GPS inconsistente; aguardando confirmação."
      : gpsState.status === "imprecise" && gpsState.reason === "stabilizing"
        ? "Aguardando leituras GPS estáveis."
      : gpsState.status === "imprecise" && gpsState.accuracy != null
        ? `Precisão insuficiente: ±${Math.round(gpsState.accuracy)} m; limite ±35 m.`
    : gpsLabel;
=======
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
>>>>>>> f16e3011f9a866b7dc8a0aaf60a3776e6bb3c4cd:codigo-fonte/componentes/Cabecalho/Cabecalho.jsx

  return (
    <header className="header">
      <div className="header-info">
        <h2>Caminho de Bronze</h2>
        <span>{totalEncontrados}/{total} descobertas</span>
      </div>

<<<<<<< HEAD:src/components/Header/Header.jsx
      <div
        className={`gps-pill gps-pill--${gpsState.status}`}
        title={gpsTitle}
        role="status"
        aria-live="polite"
      >
=======
      <div className={`gps-pill gps-pill--${gpsStatus}`} title={gpsLabel} role="status" aria-label={gpsLabel}>
>>>>>>> f16e3011f9a866b7dc8a0aaf60a3776e6bb3c4cd:codigo-fonte/componentes/Cabecalho/Cabecalho.jsx
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
import React from "react";
import { FiLink, FiFileText, FiPlay } from "react-icons/fi";
import "./PerfilHomenageado.css";

export default function CardInformativo({
  tipo = "link", // "link", "documento", "video"
  icone,
  titulo,
  subtitulo,
  href = "#",
  target,
  rel,
  download,
  onClick,
}) {
  let IconeComponente = FiLink;

  if (icone) {
    IconeComponente = icone;
  } else if (tipo === "documento" || tipo === "pdf") {
    IconeComponente = FiFileText;
  } else if (tipo === "video") {
    IconeComponente = FiPlay;
  }

  const isExternal = href && href.startsWith("http");

  return (
    <a
      href={href}
      className="card-informativo"
      target={target || (isExternal ? "_blank" : undefined)}
      rel={rel || (isExternal ? "noopener noreferrer" : undefined)}
      download={download}
      onClick={onClick}
    >
      <div className="card-informativo-icone" aria-hidden="true">
        <IconeComponente size={22} />
      </div>
      <div className="card-informativo-textos">
        <h3 className="card-informativo-titulo">{titulo}</h3>
        {subtitulo && (
          <span className="card-informativo-subtitulo">{subtitulo}</span>
        )}
      </div>
    </a>
  );
}


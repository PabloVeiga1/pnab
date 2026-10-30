import React from "react";
import CabecalhoPerfil from "./CabecalhoPerfil.jsx";
import MenuPerfil from "./MenuPerfil.jsx";
import { obterPerfil } from "./dadosPerfisHomenageados.js";
import "./PerfilHomenageado.css";

export default function PerfilHomenageadoLayout({
  perfil,
  titulo,
  children,
  onVoltar,
}) {
  const perfilInfo = typeof perfil === "string" ? obterPerfil(perfil) : perfil;

  return (
    <div className={`container-statue ${perfilInfo?.classeCss || ""}`}>
      <CabecalhoPerfil perfilInfo={perfilInfo} onVoltar={onVoltar} />
      <MenuPerfil perfil={perfilInfo?.slug} />
      <main className="content-area">
        {titulo && <h2>{titulo}</h2>}
        {children}
      </main>
    </div>
  );
}


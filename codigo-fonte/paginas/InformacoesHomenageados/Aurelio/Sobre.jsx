import React from "react";
import PerfilHomenageadoLayout from "../PerfilHomenageadoLayout.jsx";
import ConteudoSobre from "../ConteudoSobre.jsx";
import "./Aurelio.css";

export default function Sobre() {
  return (
    <PerfilHomenageadoLayout perfil="aurelio" titulo="Sobre">
      <ConteudoSobre />
    </PerfilHomenageadoLayout>
  );
}

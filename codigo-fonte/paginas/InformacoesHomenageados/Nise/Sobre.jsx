import React from "react";
import PerfilHomenageadoLayout from "../PerfilHomenageadoLayout.jsx";
import ConteudoSobre from "../ConteudoSobre.jsx";
import "./Nise.css";

export default function Sobre() {
  return (
    <PerfilHomenageadoLayout perfil="nise" titulo="Sobre">
      <ConteudoSobre />
    </PerfilHomenageadoLayout>
  );
}

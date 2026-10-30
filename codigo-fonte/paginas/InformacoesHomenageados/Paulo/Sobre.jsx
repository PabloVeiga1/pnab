import React from "react";
import PerfilHomenageadoLayout from "../PerfilHomenageadoLayout.jsx";
import ConteudoSobre from "../ConteudoSobre.jsx";
import "./Paulo.css";

export default function Sobre() {
  return (
    <PerfilHomenageadoLayout perfil="paulo" titulo="Sobre">
      <ConteudoSobre />
    </PerfilHomenageadoLayout>
  );
}

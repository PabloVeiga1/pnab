import React from "react";
import PerfilHomenageadoLayout from "../PerfilHomenageadoLayout.jsx";
import ConteudoSobre from "../ConteudoSobre.jsx";
import "./Graciliano.css";

export default function Sobre() {
  return (
    <PerfilHomenageadoLayout perfil="graci" titulo="Sobre">
      <ConteudoSobre />
    </PerfilHomenageadoLayout>
  );
}

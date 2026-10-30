import React from "react";
import PerfilHomenageadoLayout from "../PerfilHomenageadoLayout.jsx";
import ConteudoSobre from "../ConteudoSobre.jsx";
import "./Ledo.css";

export default function Sobre() {
  return (
    <PerfilHomenageadoLayout perfil="ledo" titulo="Sobre">
      <ConteudoSobre />
    </PerfilHomenageadoLayout>
  );
}

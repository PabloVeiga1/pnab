import React from "react";
import PerfilHomenageadoLayout from "../PerfilHomenageadoLayout.jsx";
import ConteudoMidias from "../ConteudoMidias.jsx";
import "./Paulo.css";

export default function Midias() {
  return (
    <PerfilHomenageadoLayout perfil="paulo" titulo="Mídias">
      <ConteudoMidias perfil="paulo" />
    </PerfilHomenageadoLayout>
  );
}

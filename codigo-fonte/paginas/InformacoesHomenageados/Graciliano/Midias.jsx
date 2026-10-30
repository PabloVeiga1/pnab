import React from "react";
import PerfilHomenageadoLayout from "../PerfilHomenageadoLayout.jsx";
import ConteudoMidias from "../ConteudoMidias.jsx";
import "./Graciliano.css";

export default function Midias() {
  return (
    <PerfilHomenageadoLayout perfil="graci" titulo="Mídias">
      <ConteudoMidias perfil="graci" />
    </PerfilHomenageadoLayout>
  );
}

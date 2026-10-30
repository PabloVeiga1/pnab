import React from "react";
import PerfilHomenageadoLayout from "../PerfilHomenageadoLayout.jsx";
import ConteudoMidias from "../ConteudoMidias.jsx";
import "./Nise.css";

export default function Midias() {
  return (
    <PerfilHomenageadoLayout perfil="nise" titulo="Mídias">
      <ConteudoMidias perfil="nise" />
    </PerfilHomenageadoLayout>
  );
}

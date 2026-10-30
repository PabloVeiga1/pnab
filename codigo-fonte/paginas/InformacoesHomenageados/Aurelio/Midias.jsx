import React from "react";
import PerfilHomenageadoLayout from "../PerfilHomenageadoLayout.jsx";
import ConteudoMidias from "../ConteudoMidias.jsx";
import "./Aurelio.css";

export default function Midias() {
  return (
    <PerfilHomenageadoLayout perfil="aurelio" titulo="Mídias">
      <ConteudoMidias perfil="aurelio" />
    </PerfilHomenageadoLayout>
  );
}

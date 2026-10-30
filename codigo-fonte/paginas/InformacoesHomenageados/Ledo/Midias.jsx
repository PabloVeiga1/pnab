import React from "react";
import PerfilHomenageadoLayout from "../PerfilHomenageadoLayout.jsx";
import ConteudoMidias from "../ConteudoMidias.jsx";
import "./Ledo.css";

export default function Midias() {
  return (
    <PerfilHomenageadoLayout perfil="ledo" titulo="Mídias">
      <ConteudoMidias perfil="ledo" />
    </PerfilHomenageadoLayout>
  );
}

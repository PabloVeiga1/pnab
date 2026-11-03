import React from "react";
import PerfilHomenageadoLayout from "../PerfilHomenageadoLayout.jsx";
import "./Aurelio.css";
import CardInformativo from "../CardInformativo.jsx";

export default function Detalhes() {
  return <PerfilHomenageadoLayout perfil="aurelio" titulo="Detalhes">
        <div className="lista-cards-informativos">
          <CardInformativo
            tipo="link"
            titulo="Artísta Plástico"
            subtitulo="Leo Santana"
            href="#"
          />
          <CardInformativo
            tipo="documento"
            titulo="Crônica Caminho de Bronze"
            subtitulo="Carlito Lima"
            href="#"
          />
          <CardInformativo
            tipo="documento"
            titulo="Crônica 2"
            subtitulo="Antônio Torres"
            href="#"
          />
          <CardInformativo
            tipo="link"
            titulo="Imortal da ABL"
            href="#"
          />
          <CardInformativo
            tipo="link"
            titulo="Amigo Lêdo"
            href="#"
          />
        </div>
      </PerfilHomenageadoLayout>;
}

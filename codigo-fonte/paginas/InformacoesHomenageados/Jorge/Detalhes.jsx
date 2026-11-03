import React from "react";
import PerfilHomenageadoLayout from "../PerfilHomenageadoLayout.jsx";
import CardInformativo from "../CardInformativo.jsx";
import "./Jorge.css";
import escultor from "../conteudos_detalhes/escultor.pdf"
import texto_ledo from "../conteudos_detalhes/texto_ledo_ivo.pdf"

export default function Detalhes() {
  return  <PerfilHomenageadoLayout perfil="jorge" titulo="Detalhes">
          <div className="lista-cards-informativos">
              <CardInformativo
                tipo="link"
                titulo="Artísta Plástico"
                subtitulo="Leo Santana"
                href={escultor}
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
                href={texto_ledo}
              />
            </div>
        </PerfilHomenageadoLayout>;
}

import React from "react";
import pdfUrl from "./ledo-ivo.pdf";
import { FiFileText } from "react-icons/fi";
import PerfilHomenageadoLayout from "../PerfilHomenageadoLayout.jsx";
import "./Ledo.css";

export default function LedoPage() {
  return (
    <PerfilHomenageadoLayout perfil="ledo">
      <p className="biografia-resumo">
        Poeta de Maceió que transformou sua terra, suas memórias e sua visão
        de mundo em literatura.
      </p>
      <article className="biografia-content">
        <h1>Biografia</h1>
        <div className="biografia-texto">
          <p>
            E aí, meus chegados! Eu sou o Lêdo Ivo, jornalista, romancista e, acima de tudo, poeta. Nasci em Maceió, em 1924. Minha escrita é intensa, não foge da realidade, mas traz sempre aquele toque de "encantamento". Se você gosta de versos como eu, venha conhecer mais sobre a minha história! Acesse o link! Espero você lá no Posto 7, na Praia da Jatiúca!
          </p>
        </div>
      </article>
      <section className="biografia-acoes" aria-label="Mais conteúdos sobre Lêdo Ivo">
        <a
          className="biografia-download"
          href={pdfUrl}
          download="ledo-ivo.pdf"
        >
          <span className="biografia-download-icone">
            <FiFileText aria-hidden="true" />
          </span>
          <span className="biografia-download-texto">
            <strong>Lêdo Ivo</strong>
            <span>Biografia estendida</span>
          </span>
        </a>
        <button className="biografia-desafio" type="button" disabled>
          Desafio
        </button>
      </section>
    </PerfilHomenageadoLayout>
  );
}

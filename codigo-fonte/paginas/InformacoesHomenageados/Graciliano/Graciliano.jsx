import React from "react";
import pdfUrl from "./graciliano.pdf";
import { FiFileText } from "react-icons/fi";
import PerfilHomenageadoLayout from "../PerfilHomenageadoLayout.jsx";
import "./Graciliano.css";

export default function GracilianoPage() {
  return (
    <PerfilHomenageadoLayout perfil="graci">
      <p className="biografia-resumo">
        O escritor alagoano que transformou a experiência humana e a
        realidade do Nordeste em uma das obras mais importantes da literatura brasileira.
      </p>
      <article className="biografia-content">
        <h1>Biografia</h1>
        <div className="biografia-texto">
          <p>
            E aí, galera?! Eu sou o Graciliano Ramos, escritor e alagoano. Nasci em Quebrangulo e já fiz bastante coisa: até prefeito eu fui! Escrevi alguns livros e dizem que foram marcantes, o mais conhecido deles é Vidas Secas, que conta a história da cachorra Baleia e da família de Fabiano.  Minha obra foi traduzida para diversos idiomas. Que tal conhecer mais sobre essa história? Acesse o link e vá me vê lá na Praia de Pajuçara, se quiser.
          </p>
        </div>
      </article>
      <section className="biografia-acoes" aria-label="Mais conteúdos sobre Graciliano Ramos">
        <a
          className="biografia-download"
          href={pdfUrl}
          download="graciliano.pdf"
        >
          <span className="biografia-download-icone">
            <FiFileText aria-hidden="true" />
          </span>
          <span className="biografia-download-texto">
            <strong>Graciliano Ramos</strong>
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

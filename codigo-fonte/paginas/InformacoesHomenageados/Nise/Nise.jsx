import React from "react";
import pdfUrl from "./nise-da-silveira.pdf";
import { FiFileText } from "react-icons/fi";
import PerfilHomenageadoLayout from "../PerfilHomenageadoLayout.jsx";
import "./Nise.css";

export default function NisePage() {
  return (
    <PerfilHomenageadoLayout perfil="nise">
      <p className="biografia-resumo">
        Uma alagoana que transformou a relação entre psiquiatria, arte, afeto
        e liberdade.
      </p>
      <article className="biografia-content">
        <h1>Biografia</h1>
        <div className="biografia-texto">
          <p>
            Olá, meus queridos e minhas queridas! Sou a Dra. Nise da Silveira, médica e psiquiatra, mas muita gente me conhece como a "rebelde" da medicina. Nasci em Alagoas e encarei o desafio de ser a única mulher em uma turma de 157 homens na faculdade. Desde cedo, entendi que o meu papel era questionar as estruturas rígidas e lutar pelo que acredito. Acesse o link e conheça mais sobre a minha história. Te espero sentadinha lá na Praça Vera Arruda, na Praia de Jatiúca. Um abraço!
          </p>
        </div>
      </article>
      <section className="biografia-acoes" aria-label="Mais conteúdos sobre Nise da Silveira">
        <a
          className="biografia-download"
          href={pdfUrl}
          download="nise-da-silveira.pdf"
        >
          <span className="biografia-download-icone">
            <FiFileText aria-hidden="true" />
          </span>
          <span className="biografia-download-texto">
            <strong>Nise da Silveira</strong>
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

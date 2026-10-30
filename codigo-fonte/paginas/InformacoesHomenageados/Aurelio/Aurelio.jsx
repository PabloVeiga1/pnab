import React from "react";
import pdfUrl from "./aurelio-buarque.pdf";
import { FiFileText } from "react-icons/fi";
import PerfilHomenageadoLayout from "../PerfilHomenageadoLayout.jsx";
import "./Aurelio.css";

export default function AurelioPage() {
  return (
    <PerfilHomenageadoLayout perfil="aurelio">
      <p className="biografia-resumo">
        O alagoano que fez das palavras um ofício e ajudou
        gerações de brasileiros a conhecer, compreender e usar melhor a língua portuguesa.
      </p>
      <article className="biografia-content">
        <h1>Biografia</h1>
        <div className="biografia-texto">
          <p>
            Fala, meu povo! Eu sou o cara que criou o dicionário mais famoso do Brasil. Você já deve ter visto meu nome por aí: Aurélio! Além de dicionarista, sou crítico literário, tradutor e ensaísta. Nasci em Passo de Camaragibe. Espero sua visita lá na Praia de Ponta Verde . Clica no link e vem saber mais! 
          </p>
        </div>
      </article>
      <section className="biografia-acoes" aria-label="Mais conteúdos sobre Aurélio Buarque de Holanda">
        <a
          className="biografia-download"
          href={pdfUrl}
          download="aurelio-buarque.pdf"
        >
          <span className="biografia-download-icone">
            <FiFileText aria-hidden="true" />
          </span>
          <span className="biografia-download-texto">
            <strong>Aurélio Buarque de Holanda</strong>
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

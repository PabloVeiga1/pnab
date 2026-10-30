import React from "react";
import pdfUrl from "./paulo-gracindo.pdf";
import { FiFileText } from "react-icons/fi";
import PerfilHomenageadoLayout from "../PerfilHomenageadoLayout.jsx";
import "./Paulo.css";

export default function PauloPage() {
  return (
    <PerfilHomenageadoLayout perfil="paulo">
      <p className="biografia-resumo">
        Um artista que levou Alagoas consigo e ajudou a construir a história
        da dramaturgia brasileira.
      </p>
      <article className="biografia-content">
        <h1>Biografia</h1>
        <div className="biografia-texto">
          <p>
            Olá, pessoal! Eu sou o Paulo Gracindo. Nasci no Rio de Janeiro em 1911, mas me considero alagoano com muito orgulho, pois vim morar aqui ainda criança. Saí de Maceió para me tornar um dos rostos mais conhecidos da história da TV, do rádio e do teatro no Brasil. Quer saber mais sobre mim? Acesse o link! A gente se vê lá na Praia de Pajuçara.
          </p>
        </div>
      </article>
      <section className="biografia-acoes" aria-label="Mais conteúdos sobre Paulo Gracindo">
        <a
          className="biografia-download"
          href={pdfUrl}
          download="paulo-gracindo.pdf"
        >
          <span className="biografia-download-icone">
            <FiFileText aria-hidden="true" />
          </span>
          <span className="biografia-download-texto">
            <strong>Paulo Gracindo</strong>
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

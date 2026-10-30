import React from "react";
import pdfUrl from "./jorge-lima.pdf";
import { FiFileText } from "react-icons/fi";
import PerfilHomenageadoLayout from "../PerfilHomenageadoLayout.jsx";
import "./Jorge.css";

export default function JorgePage() {
  return (
    <PerfilHomenageadoLayout perfil="jorge">
      <p className="biografia-resumo">
        Poeta de Alagoas que transformou memória, infância, cultura,
        religiosidade e identidade brasileira em literatura.
      </p>
      <article className="biografia-content">
        <h1>Biografia</h1>
        <div className="biografia-texto">
          <p>
            E aí, rapaziada! Eu sou o Jorge de Lima. Nasci em União dos Palmares e desde novinho era apaixonado pela arte de criar versos. Aos 14 anos escrevi um poema que seria um dos mais famosos da minha obra: O Acendedor de Lampiões. Além de poeta e pintor, também fui médico e dediquei minha vida a cuidar das pessoas e a contar a beleza e as lutas da nossa gente e da cultura nordestina. Quer saber como a poesia pode acender novas ideias? Acesse o link para conhecer mais sobre a minha trajetória! Te vejo na Praça Sinimbu, lá no bairro histórico de Jaraguá. Um abraço!
          </p>
        </div>
      </article>
      <section className="biografia-acoes" aria-label="Mais conteúdos sobre Jorge de Lima">
        <a
          className="biografia-download"
          href={pdfUrl}
          download="jorge-lima.pdf"
        >
          <span className="biografia-download-icone">
            <FiFileText aria-hidden="true" />
          </span>
          <span className="biografia-download-texto">
            <strong>Jorge de Lima</strong>
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

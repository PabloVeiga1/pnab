import React from "react";
import CardInformativo from "./CardInformativo.jsx";
import apresentacao from "./conteudos_sobre/apresentacao_do_projeto.pdf";

import folder_alunos from "./conteudos_sobre/folder_alunos.pdf";
import folder_professores from "./conteudos_sobre/folder_professores.pdf";
import roteiro from "./conteudos_sobre/roteiro.pdf";
export default function ConteudoSobre({ itens }) {
  const itensPadrao = [
    {
      tipo: "documento",
      titulo: "Apresentação",
      subtitulo: "Projeto Caminho de Bronze",
      href: apresentacao,
    },
    {
      tipo: "documento",
      titulo: "Roteiro",
      subtitulo: "Aula guiada",
      href: roteiro,
    },
    {
      tipo: "documento",
      titulo: "Folder para alunos",
      href: folder_alunos,
    },
    {
      tipo: "documento",
      titulo: "Folder para professores",
      href: folder_professores,
    },
  ];

  const lista = itens || itensPadrao;

  return (
    <div className="lista-cards-informativos">
      {lista.map((item, index) => (
        <CardInformativo
          key={index}
          tipo={item.tipo}
          titulo={item.titulo}
          subtitulo={item.subtitulo}
          href={item.href || "#"}
        />
      ))}
    </div>
  );
}


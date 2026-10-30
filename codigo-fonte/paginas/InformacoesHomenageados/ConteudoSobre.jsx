import React from "react";
import CardInformativo from "./CardInformativo.jsx";

export default function ConteudoSobre({ itens }) {
  const itensPadrao = [
    {
      tipo: "documento",
      titulo: "Apresentação",
      subtitulo: "Projeto Caminho de Bronze",
      href: "#",
    },
    {
      tipo: "documento",
      titulo: "Roteiro",
      subtitulo: "Aula guiada",
      href: "#",
    },
    {
      tipo: "documento",
      titulo: "Folder para alunos",
      href: "#",
    },
    {
      tipo: "documento",
      titulo: "Folder para professores",
      href: "#",
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


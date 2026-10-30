import React from "react";
import CarrosselMidias from "./CarrosselMidias.jsx";
import { obterImagensMidias } from "./dadosMidiasHomenageados.js";
import { obterPerfil } from "./dadosPerfisHomenageados.js";

export default function ConteudoMidias({
  perfil,
  linkTitulo,
  linkSubtitulo,
  linkUrl,
  videoTitulo,
  videoSubtitulo,
  videoUrl,
}) {
  const perfilInfo = typeof perfil === "string" ? obterPerfil(perfil) : perfil;
  const imagens = obterImagensMidias(perfilInfo?.slug);

  return (
    <CarrosselMidias
      imagens={imagens}
      nomeHomenageado={perfilInfo?.nome}
      linkTitulo={linkTitulo}
      linkSubtitulo={linkSubtitulo}
      linkUrl={linkUrl}
      videoTitulo={videoTitulo}
      videoSubtitulo={videoSubtitulo}
      videoUrl={videoUrl}
    />
  );
}


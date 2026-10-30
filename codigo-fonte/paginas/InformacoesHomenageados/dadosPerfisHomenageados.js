import fotoAurelio from "../../../identidade_visual/perfis/tipo-2-aurélio.png";
import bannerAurelio from "../../../identidade_visual/banners/banner_aurelio.png";

import fotoGraciliano from "../../../identidade_visual/perfis/tipo-2-graciliano.png";
import bannerGraciliano from "../../../identidade_visual/banners/banner_graciliano.png";

import fotoJorge from "../../../identidade_visual/perfis/tipo-2-jorge-de-lima.png";
import bannerJorge from "../../../identidade_visual/banners/banner_jorge_lima.png";

import fotoLedo from "../../../identidade_visual/perfis/tipo-2-ledo-ivo.png";
import bannerLedo from "../../../identidade_visual/banners/banner_ledo_ivo.png";

import fotoNise from "../../../identidade_visual/perfis/tipo-2-nise.png";
import bannerNise from "../../../identidade_visual/banners/banner_nise.png";

import fotoPaulo from "../../../identidade_visual/perfis/tipo-2-paulo-gracindo.png";

export const perfisHomenageados = {
  aurelio: {
    slug: "aurelio",
    idMonumento: 2,
    nome: "Aurélio Buarque de Holanda",
    funcao: "Escritor, Professor, Tradutor e Lexicógrafo",
    foto: fotoAurelio,
    banner: bannerAurelio,
    classeCss: "pagina-aurelio",
  },
  graci: {
    slug: "graci",
    idMonumento: 1,
    nome: "Graciliano Ramos",
    funcao: "Escritor",
    foto: fotoGraciliano,
    banner: bannerGraciliano,
    classeCss: "pagina-graciliano",
  },
  jorge: {
    slug: "jorge",
    idMonumento: 3,
    nome: "Jorge de Lima",
    funcao: "Poeta e escritor",
    foto: fotoJorge,
    banner: bannerJorge,
    classeCss: "pagina-jorge",
  },
  ledo: {
    slug: "ledo",
    idMonumento: 6,
    nome: "Lêdo Ivo",
    funcao: "Poeta, escritor e jornalista",
    foto: fotoLedo,
    banner: bannerLedo,
    classeCss: "pagina-ledo",
  },
  nise: {
    slug: "nise",
    idMonumento: 5,
    nome: "Nise da Silveira",
    funcao: "Psiquiatra",
    foto: fotoNise,
    banner: bannerNise,
    classeCss: "pagina-nise",
  },
  paulo: {
    slug: "paulo",
    idMonumento: 4,
    nome: "Paulo Gracindo",
    funcao: "Ator",
    foto: fotoPaulo,
    banner: bannerGraciliano, // Fallback enquanto não há banner exclusivo de Paulo
    classeCss: "pagina-paulo",
  },
};

export function obterPerfil(slug) {
  return perfisHomenageados[slug] || null;
}


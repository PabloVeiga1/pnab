// Mapeamento e importação automática das mídias dos homenageados
const todasImagens = import.meta.glob(
  "./*/*_midias/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, import: "default" }
);

export function obterImagensMidias(slugPerfil) {
  if (!slugPerfil) return [];
  const termo = slugPerfil === "graci" ? "graciliano" : slugPerfil;
  const chaves = Object.keys(todasImagens).filter((caminho) =>
    caminho.toLowerCase().includes(termo.toLowerCase())
  );

  chaves.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return chaves.map((caminho) => todasImagens[caminho]);
}


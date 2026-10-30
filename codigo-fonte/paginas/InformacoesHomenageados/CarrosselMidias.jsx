import React, { useRef, useState, useEffect } from "react";
import { FiX, FiLink, FiPlay } from "react-icons/fi";
import "./CarrosselMidias.css";

export default function CarrosselMidias({
  imagens = [],
  nomeHomenageado = "",
  linkTitulo = "Título do link",
  linkSubtitulo = "Subtítulo",
  linkUrl = "#",
  videoTitulo = "Título do vídeo",
  videoSubtitulo = "Vídeo explicativo",
  videoUrl = "#",
}) {
  const trilhoRef = useRef(null);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [estaArrastando, setEstaArrastando] = useState(false);

  // Estados de controle de clique vs arraste no mouse
  const posicaoInicialX = useRef(0);
  const rolagemInicial = useRef(0);
  const moveuDuranteClique = useRef(false);

  function handleMouseDown(e) {
    if (!trilhoRef.current) return;
    setEstaArrastando(true);
    moveuDuranteClique.current = false;
    posicaoInicialX.current = e.pageX - trilhoRef.current.offsetLeft;
    rolagemInicial.current = trilhoRef.current.scrollLeft;
  }

  function handleMouseMove(e) {
    if (!estaArrastando || !trilhoRef.current) return;
    e.preventDefault();
    const xAtual = e.pageX - trilhoRef.current.offsetLeft;
    const distancia = xAtual - posicaoInicialX.current;

    if (Math.abs(distancia) > 6) {
      moveuDuranteClique.current = true;
    }
    trilhoRef.current.scrollLeft = rolagemInicial.current - distancia;
  }

  function handleMouseUpOuLeave() {
    setEstaArrastando(false);
  }

  function handleItemClick(img) {
    if (moveuDuranteClique.current) return;
    setImagemSelecionada(img);
  }

  function fecharModal() {
    setImagemSelecionada(null);
  }

  // Trava scroll da página e escuta tecla Escape ao abrir o modal
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        fecharModal();
      }
    }

    if (imagemSelecionada) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [imagemSelecionada]);

  return (
    <div className="secao-midias">
      {/* Carrossel de Fotos */}
      <div className="carrossel-midias-container">
        {imagens.length > 0 ? (
          <div
            ref={trilhoRef}
            className={`carrossel-midias-trilho ${estaArrastando ? "arrastando" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOuLeave}
            onMouseLeave={handleMouseUpOuLeave}
          >
            {imagens.map((img, index) => (
              <div
                key={index}
                className="carrossel-midias-item"
                onClick={() => handleItemClick(img)}
                role="button"
                tabIndex={0}
                aria-label={`Ver foto ${index + 1} de ${nomeHomenageado}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleItemClick(img);
                  }
                }}
              >
                <img
                  src={img}
                  alt={`Mídia ${index + 1} de ${nomeHomenageado}`}
                  className="carrossel-midias-foto"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="carrossel-midias-vazio">
            <p>Fotos em breve disponíveis nesta galeria.</p>
          </div>
        )}
      </div>

      {/* Cards de Ação (Link e Vídeo) */}
      <div className="midias-acoes-lista">
        <a
          href={linkUrl}
          className="card-midia-acao"
          target={linkUrl !== "#" ? "_blank" : undefined}
          rel={linkUrl !== "#" ? "noopener noreferrer" : undefined}
        >
          <div className="card-midia-icone" aria-hidden="true">
            <FiLink size={22} />
          </div>
          <div className="card-midia-textos">
            <h3 className="card-midia-titulo">{linkTitulo}</h3>
            <span className="card-midia-subtitulo">{linkSubtitulo}</span>
          </div>
        </a>

        <a
          href={videoUrl}
          className="card-midia-acao"
          target={videoUrl !== "#" ? "_blank" : undefined}
          rel={videoUrl !== "#" ? "noopener noreferrer" : undefined}
        >
          <div className="card-midia-icone" aria-hidden="true">
            <FiPlay size={22} />
          </div>
          <div className="card-midia-textos">
            <h3 className="card-midia-titulo">{videoTitulo}</h3>
            <span className="card-midia-subtitulo">{videoSubtitulo}</span>
          </div>
        </a>
      </div>

      {/* Modal Lightbox com imagem ampliada */}
      {imagemSelecionada && (
        <div
          className="modal-lightbox-backdrop"
          onClick={fecharModal}
          role="dialog"
          aria-modal="true"
          aria-label="Imagem ampliada"
        >
          <div
            className="modal-lightbox-conteudo"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-lightbox-fechar"
              onClick={fecharModal}
              aria-label="Fechar visualização"
            >
              <FiX size={20} />
            </button>
            <img
              src={imagemSelecionada}
              alt={`Foto ampliada de ${nomeHomenageado}`}
              className="modal-lightbox-imagem"
            />
          </div>
        </div>
      )}
    </div>
  );
}


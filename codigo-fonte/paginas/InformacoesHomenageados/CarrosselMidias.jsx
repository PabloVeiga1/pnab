import React, { useRef, useState, useEffect } from "react";
import { FiX, FiLink, FiPlay, FiCamera } from "react-icons/fi";
import "./CarrosselMidias.css";

export default function CarrosselMidias({
  imagens = [],
  nomeHomenageado = "",
  linkTitulo = "Título do link",
  linkSubtitulo = "Indisponível no momento",
  linkUrl = "#",
  linkDisponivel = false,
  videoTitulo = "Título do vídeo",
  videoSubtitulo = "Indisponível no momento",
  videoUrl = "#",
  videoDisponivel = false,
  mensagemIndisponivel = "Indisponível no momento",
}) {
  const trilhoRef = useRef(null);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [estaArrastando, setEstaArrastando] = useState(false);

  const isLinkDisponivel = Boolean(linkDisponivel && linkUrl && linkUrl !== "#");
  const isVideoDisponivel = Boolean(videoDisponivel && videoUrl && videoUrl !== "#");

  const textoSubtituloLink = isLinkDisponivel
    ? linkSubtitulo
    : (linkSubtitulo && linkSubtitulo !== "Subtítulo"
        ? (linkSubtitulo.includes("Indisponível") ? linkSubtitulo : `${linkSubtitulo} • ${mensagemIndisponivel}`)
        : mensagemIndisponivel);

  const textoSubtituloVideo = isVideoDisponivel
    ? videoSubtitulo
    : (videoSubtitulo && videoSubtitulo !== "Subtítulo" && videoSubtitulo !== "Vídeo explicativo"
        ? (videoSubtitulo.includes("Indisponível") ? videoSubtitulo : `${videoSubtitulo} • ${mensagemIndisponivel}`)
        : mensagemIndisponivel);

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
          <div className="card-fotos-indisponiveis">
            <div className="card-fotos-indisponiveis-cabecalho">
              <FiCamera size={26} className="icone-camera-indisponivel" />
              <strong className="titulo-fotos-indisponiveis">Fotografias indisponíveis</strong>
            </div>
            <p className="texto-fotos-indisponiveis">
              Durante o registro visual, a estátua estava em manutenção. Em breve, as imagens estarão disponíveis no aplicativo.
            </p>
          </div>
        )}
      </div>

      {/* Cards de Ação (Link e Vídeo) */}
      <div className="midias-acoes-lista">
        <a
          href={isLinkDisponivel ? linkUrl : undefined}
          className={`card-midia-acao ${!isLinkDisponivel ? "indisponivel" : ""}`}
          target={isLinkDisponivel ? "_blank" : undefined}
          rel={isLinkDisponivel ? "noopener noreferrer" : undefined}
          aria-disabled={!isLinkDisponivel}
          onClick={(e) => {
            if (!isLinkDisponivel) {
              e.preventDefault();
            }
          }}
          title={!isLinkDisponivel ? "Link indisponível no momento" : undefined}
        >
          <div className="card-midia-icone" aria-hidden="true">
            <FiLink size={22} />
          </div>
          <div className="card-midia-textos">
            <h3 className="card-midia-titulo">{linkTitulo}</h3>
            <span className="card-midia-subtitulo">{textoSubtituloLink}</span>
          </div>
        </a>

        <a
          href={isVideoDisponivel ? videoUrl : undefined}
          className={`card-midia-acao ${!isVideoDisponivel ? "indisponivel" : ""}`}
          target={isVideoDisponivel ? "_blank" : undefined}
          rel={isVideoDisponivel ? "noopener noreferrer" : undefined}
          aria-disabled={!isVideoDisponivel}
          onClick={(e) => {
            if (!isVideoDisponivel) {
              e.preventDefault();
            }
          }}
          title={!isVideoDisponivel ? "Vídeo indisponível no momento" : undefined}
        >
          <div className="card-midia-icone" aria-hidden="true">
            <FiPlay size={22} />
          </div>
          <div className="card-midia-textos">
            <h3 className="card-midia-titulo">{videoTitulo}</h3>
            <span className="card-midia-subtitulo">{textoSubtituloVideo}</span>
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


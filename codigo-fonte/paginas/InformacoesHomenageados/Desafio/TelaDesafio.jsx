import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiCheck, FiX } from 'react-icons/fi';
import CabecalhoPerfil from '../CabecalhoPerfil.jsx';
import { obterPerfil } from '../dadosPerfisHomenageados.js';
import { obterDesafio, salvarDesafioConcluido } from '../dadosDesafios.js';
import './TelaDesafio.css';

export default function TelaDesafio({ perfil: perfilProp }) {
  const navigate = useNavigate();
  const params = useParams();
  const slug = perfilProp || params.perfil || 'graci';

  const perfilInfo = obterPerfil(slug);
  const desafio = obterDesafio(slug);

  const [indicePergunta, setIndicePergunta] = useState(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [statusResposta, setStatusResposta] = useState('idle'); // 'idle' | 'correta' | 'errada'
  const [desafioFinalizado, setDesafioFinalizado] = useState(false);

  if (!perfilInfo || !desafio) {
    return (
      <div className="desafio-container-erro">
        <h2>Desafio não encontrado</h2>
        <button type="button" onClick={() => navigate('/rotasordenadas')}>
          Voltar para Rotas
        </button>
      </div>
    );
  }

  const perguntaAtual = desafio.perguntas[indicePergunta];
  const totalPerguntas = desafio.perguntas.length;

  const handleVoltar = () => {
    navigate(`/rotasordenadas/${slug}`);
  };

  const handleSelecionarOpcao = (letra) => {
    // Se já estiver com status correta, não permite mudar até avançar
    if (statusResposta === 'correta') return;

    setOpcaoSelecionada(letra);
    const estaCorreta = letra === perguntaAtual.respostaCorreta;

    if (estaCorreta) {
      setStatusResposta('correta');
    } else {
      setStatusResposta('errada');
    }
  };

  const handleTentarNovamente = () => {
    setOpcaoSelecionada(null);
    setStatusResposta('idle');
  };

  const handleAvancar = () => {
    if (statusResposta !== 'correta') {
      if (statusResposta === 'errada') {
        handleTentarNovamente();
      }
      return;
    }

    if (indicePergunta < totalPerguntas - 1) {
      setIndicePergunta((prev) => prev + 1);
      setOpcaoSelecionada(null);
      setStatusResposta('idle');
    } else {
      salvarDesafioConcluido(slug);
      setDesafioFinalizado(true);
    }
  };

  const reiniciarDesafio = () => {
    setIndicePergunta(0);
    setOpcaoSelecionada(null);
    setStatusResposta('idle');
    setDesafioFinalizado(false);
  };

  return (
    <div className={`container-statue ${perfilInfo?.classeCss || ""} tela-desafio-page`}>
      {/* Cabeçalho unificado idêntico às outras telas (biografia, mídias, detalhes, sobre) */}
      <CabecalhoPerfil perfilInfo={perfilInfo} onVoltar={handleVoltar} />

      {/* Conteúdo rolável do desafio */}
      <main className="content-area desafio-content-area">
        {/* Card de Recompensa */}
        <section className="desafio-card-recompensa">
          <div className="desafio-recompensa-icone">
            <img
              src={desafio.recompensa.icone}
              alt={desafio.recompensa.titulo}
            />
          </div>
          <div className="desafio-recompensa-info">
            <strong className="desafio-recompensa-titulo">
              {desafio.recompensa.titulo}
            </strong>
            <span className="desafio-recompensa-subtitulo">
              {desafio.recompensa.descricao}
            </span>
          </div>
        </section>

        {/* Seção das Perguntas */}
        <section className="desafio-secao-perguntas">
          <div className="desafio-perguntas-topo">
            <h2 className="desafio-titulo-secao">Perguntas</h2>
            <div
              className="desafio-progresso-trilho"
              aria-label={`Pergunta ${indicePergunta + 1} de ${totalPerguntas}`}
            >
              {desafio.perguntas.map((p, idx) => {
                const isAtual = idx === indicePergunta;
                const isPassada = idx < indicePergunta;
                let classePill = 'desafio-pill';

                if (isAtual) {
                  classePill += ' ativa';
                  if (statusResposta === 'errada') {
                    classePill += ' erro';
                  }
                } else if (isPassada) {
                  classePill += ' concluida';
                }

                return <span key={p.id} className={classePill} />;
              })}
            </div>
          </div>

          <p className="desafio-enunciado">{perguntaAtual.enunciado}</p>

          {/* Lista de Opções */}
          <div className="desafio-opcoes-lista" role="radiogroup">
            {perguntaAtual.opcoes.map((opcao) => {
              const foiSelecionada = opcaoSelecionada === opcao.letra;
              const estaCorreta = statusResposta === 'correta' && foiSelecionada;
              const estaErrada = statusResposta === 'errada' && foiSelecionada;

              let opcaoClasses = 'desafio-opcao-btn';
              if (estaCorreta) opcaoClasses += ' correta';
              if (estaErrada) opcaoClasses += ' errada';

              return (
                <button
                  key={opcao.letra}
                  type="button"
                  className={opcaoClasses}
                  onClick={() => handleSelecionarOpcao(opcao.letra)}
                  aria-checked={foiSelecionada}
                  role="radio"
                >
                  <div className="desafio-opcao-esquerda">
                    <span className="desafio-letra-badge">{opcao.letra}</span>
                    <span className="desafio-opcao-texto">{opcao.texto}</span>
                  </div>

                  <div className="desafio-opcao-direita">
                    {estaCorreta && (
                      <FiCheck className="desafio-feedback-icone correta" size={20} />
                    )}
                    {estaErrada && (
                      <FiX className="desafio-feedback-icone errada" size={20} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      {/* Rodapé fixo com botão de ação */}
      <footer className="desafio-rodape-acoes">
        {statusResposta === 'errada' ? (
          <button
            type="button"
            className="desafio-btn-acao erro"
            onClick={handleTentarNovamente}
          >
            Tentar novamente
          </button>
        ) : (
          <button
            type="button"
            className={`desafio-btn-acao ${statusResposta === 'correta' ? 'sucesso' : 'padrao'}`}
            onClick={handleAvancar}
            disabled={statusResposta !== 'correta'}
          >
            Avançar
          </button>
        )}
      </footer>

      {/* Modal de Conclusão / Celebração */}
      {desafioFinalizado && (
        <div className="desafio-modal-overlay">
          <div className="desafio-modal-card">
            <div className="desafio-modal-icone-wrapper">
              <img
                src={desafio.recompensa.icone}
                alt={desafio.recompensa.titulo}
                className="desafio-modal-icone"
              />
            </div>

            <h2 className="desafio-modal-titulo">Parabéns!</h2>
            <p className="desafio-modal-subtitulo">
              Você concluiu o Desafio de <strong>{perfilInfo.nome}</strong>!
            </p>

            <div className="desafio-modal-conquista">
              <span className="desafio-modal-conquista-tag">Recompensa Desbloqueada</span>
              <strong className="desafio-modal-conquista-nome">{desafio.recompensa.titulo}</strong>
              <p className="desafio-modal-conquista-desc">{desafio.recompensa.conquista}</p>
            </div>

            <div className="desafio-modal-botoes">
              <button
                type="button"
                className="desafio-modal-btn principal"
                onClick={handleVoltar}
              >
                Voltar ao Perfil
              </button>
              <button
                type="button"
                className="desafio-modal-btn secundario"
                onClick={reiniciarDesafio}
              >
                Refazer Desafio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

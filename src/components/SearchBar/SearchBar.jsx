import { useState } from "react";
import { useMonumentos } from "../../data/useMonumentos";
import "./SearchBar.css";
import { FiSearch, FiX, FiCheck, FiLock } from "react-icons/fi";

export default function SearchBar({ onSelect }) {
  const { monumentos } = useMonumentos();
  const [texto, setTexto] = useState("");
  const [sugestoes, setSugestoes] = useState([]);

  function pesquisar(valor) {
    setTexto(valor);

    if (!valor.trim()) {
      setSugestoes([]);
      return;
    }

    const encontrados = monumentos.filter((monumento) =>
      monumento.nome.toLowerCase().includes(valor.toLowerCase()) ||
      (monumento.bairro && monumento.bairro.toLowerCase().includes(valor.toLowerCase()))
    );

    setSugestoes(encontrados);
  }

  function limpar() {
    setTexto("");
    setSugestoes([]);
  }

  function selecionar(monumento) {
    setTexto(monumento.nome);
    setSugestoes([]);

    if (onSelect) {
      onSelect(monumento);
    }
  }

  return (
    <div className="search-box">
      <div className="search-input-card">
        <FiSearch className="search-icon-left" />

        <input
          type="text"
          value={texto}
          onChange={(e) => pesquisar(e.target.value)}
          placeholder="Buscar homenageado ou local"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const monumento = monumentos.find(
                (m) => m.nome.toLowerCase() === texto.toLowerCase()
              );
              if (monumento) {
                selecionar(monumento);
              }
            }
          }}
        />

        {texto && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={limpar}
            aria-label="Limpar busca"
          >
            <FiX />
          </button>
        )}
      </div>

      {sugestoes.length > 0 && (
        <div className="suggestions-dropdown">
          {sugestoes.map((monumento) => {
            const isEncontrado = monumento.status === "encontrado";
            return (
              <div
                key={monumento.id}
                className="suggestion-item"
                onClick={() => selecionar(monumento)}
              >
                {/* ID badge circular */}
                <div className={`suggestion-badge ${isEncontrado ? "found" : "locked"}`}>
                  {monumento.id}
                </div>

                {/* Informações: Nome e Bairro */}
                <div className="suggestion-info">
                  <div className={`suggestion-nome ${isEncontrado ? "found" : ""}`}>
                    {monumento.nome}
                  </div>
                  <div className="suggestion-bairro">
                    {monumento.bairro || "Pajuçara"}
                  </div>
                </div>

                {/* Status: Checkmark turquesa ou Cadeado cinza */}
                <div className="suggestion-action">
                  {isEncontrado ? (
                    <div className="suggestion-check-pill" title="Descoberto">
                      <FiCheck />
                    </div>
                  ) : (
                    <FiLock className="suggestion-lock-icon" title="Não encontrado" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
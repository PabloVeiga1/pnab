import { monumentos } from "../../data/monumentos";
import { useState } from "react";

import "./SearchBar.css";
import { FaSearch , FaLock , FaCheck} from "react-icons/fa";
export default function SearchBar({ onSelect }) {
  const [texto, setTexto] = useState("");
  const [sugestoes, setSugestoes] = useState([]);

  function pesquisar(valor) {
    setTexto(valor);

    if (!valor.trim()) {
      setSugestoes([]);
      return;
    }

    const encontrados = monumentos.filter((monumento) =>
      monumento.nome.toLowerCase().includes(valor.toLowerCase())
    );

    setSugestoes(encontrados);
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

      <div className="search-input-wrapper">

        <input
          type="text"
          value={texto}
          onChange={(e) => pesquisar(e.target.value)}
          placeholder="Buscar homenageado ou Local"
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

        {sugestoes.length > 0 && (
          <div className="suggestions">
            {sugestoes.map((monumento) => (
              <div
                key={monumento.id}
                className="suggestion"
                onClick={() => selecionar(monumento)}
              >
                <div className="nome">{monumento.nome}</div>
                <div style={{display:"flex",justifyContent:"center", alignItems:"center",flexDirection:"column"}}>{monumento.status === "não encontrado" ? <p><FaLock style={{marginBottom:"-2px",marginRight:"5px",fontSize:"15px",color:"gray"}}/> {monumento.status}</p>: <p><FaCheck style={{marginBottom:"-3px",marginRight:"8px",fontSize:"15px",color:"gray"}}/>{monumento.status}</p>}</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
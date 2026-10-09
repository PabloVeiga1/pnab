import React from "react";
import "./RotasOrdenadas.css";
import { useNavigate } from "react-router-dom";
import { FiChevronRight, FiMapPin, FiLock, FiCheck } from "react-icons/fi";
import { useMonumentos } from "../../dados/usarMonumentos";

export default function Card() {
  const navigate = useNavigate();
  const { monumentos } = useMonumentos();

  const pageRouteByName = {
    "Graciliano Ramos": "/rotasordenadas/graci",
    "Aurélio Buarque de Holanda": "/rotasordenadas/aurelio",
    "Lêdo Ivo": "/rotasordenadas/ledo",
    "Nise da Silveira": "/rotasordenadas/nise",
    "Paulo Gracindo": "/rotasordenadas/paulo",
    "Jorge de Lima": "/rotasordenadas/jorge",
  };

  function goToPage(name) {
    const path = pageRouteByName[name];
    if (path) {
      navigate(path);
    }
  }

  return (
    <section className="rotas-cards-list">
      {monumentos.map((el) => {
        const isDone = el.status === "encontrado";

        return (
          <div
            key={el.id}
            className={`rota-statue-card ${isDone ? "done" : "locked"}`}
            onClick={() => isDone && goToPage(el.nome)}
          >
            <div className="rota-card-header">
              <div className="rota-card-header-left">
                {isDone ? (
                  <div className="rota-card-check-badge">
                    <FiCheck />
                  </div>
                ) : (
                  <div className="rota-card-number-badge">{el.id}</div>
                )}
                <span className={`rota-card-name ${isDone ? "done" : ""}`}>
                  {el.nome}
                </span>
              </div>

              <div className="rota-card-header-right">
                {isDone ? (
                  <FiChevronRight className="rota-card-arrow-icon" />
                ) : (
                  <FiLock className="rota-card-lock-icon" />
                )}
              </div>
            </div>

            <div className="rota-card-address-row">
              <FiMapPin className="rota-card-pin-icon" />
              <span>{el.adress}</span>
            </div>
          </div>
        );
      })}
    </section>
  );
}

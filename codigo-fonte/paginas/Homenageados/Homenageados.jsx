import React from 'react';
import "./Homenageados.css";
import { FiArrowLeft, FiCheck, FiLock } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from '../../dados/usarMonumentos';

export default function Homenageados() {
  const navigate = useNavigate();
  const { monumentos } = useMonumentos();

  function irHome() {
    navigate("/");
  }

  return (
    <div className="homenageados-page">
      <header className="page-header">
        <button onClick={irHome} className="page-back-button" aria-label="Voltar">
          <FiArrowLeft />
        </button>
        <h1 className="page-header-title">Homenageados</h1>
      </header>

      <main className="page-body">
        <h2 className="section-title">Listagem</h2>
        <p className="section-description">
          Esse código garantirá a proteção e a privacidade do seu perfil.
        </p>

        <div className="homenageados-card-list">
          {monumentos.map((el) => {
            const isEncontrado = el.status === "encontrado";
            return (
              <div
                key={el.id}
                className={`homenageado-row ${isEncontrado ? "found" : "locked"}`}
              >
                <div className={`homenageado-badge ${isEncontrado ? "found" : "locked"}`}>
                  {el.id}
                </div>

                <div className="homenageado-info">
                  <div className={`homenageado-nome ${isEncontrado ? "found" : ""}`}>
                    {el.nome}
                  </div>
                  <div className="homenageado-bairro">
                    {el.bairro || "Pajuçara"}
                  </div>
                </div>
                <div className="homenageado-status-icon">
                  {isEncontrado ? (
                    <div className="homenageado-check-circle" title="Descoberto">
                      <FiCheck />
                    </div>
                  ) : (
                    <FiLock className="homenageado-lock-icon" title="Não encontrado" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

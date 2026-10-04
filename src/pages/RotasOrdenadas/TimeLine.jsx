import React from "react";
import "./RotasOrdenadas.css";
import { FiCheck } from "react-icons/fi";
import { useMonumentos } from "../../data/useMonumentos";

export default function TimeLine() {
  const { monumentos } = useMonumentos();
  const activeIndex = monumentos.findIndex((m) => m.status !== "encontrado");

  return (
    <section className="timeline-container">
      {monumentos.map((el, idx) => {
        const isDone = el.status === "encontrado";
        const isActive = idx === activeIndex;
        const isLast = idx === monumentos.length - 1;

        return (
          <React.Fragment key={el.id}>
            <div
              className={`timeline-step-circle ${
                isDone ? "done" : isActive ? "active" : "pending"
              }`}
              title={el.nome}
            >
              {isDone ? <FiCheck /> : el.id}
            </div>

            {!isLast && (
              <div
                className={`timeline-connector-line ${
                  isDone && monumentos[idx + 1]?.status === "encontrado"
                    ? "done"
                    : ""
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </section>
  );
}

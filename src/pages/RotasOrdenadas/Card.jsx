import { monumentos } from "../../data/monumentos"
import "./RotasOrdenadas.css"
import { useNavigate } from "react-router-dom"

import { FaChevronRight, FaMapMarkerAlt, FaLock } from "react-icons/fa"
export default function Card() {
  const navigate = useNavigate()

  const pageRouteByName = {
    "Graciliano Ramos": "/rotasordenadas/graci",
    "Aurélio Buarque de Holanda": "/rotasordenadas/aurelio",
    "Lêdo Ivo": "/rotasordenadas/ledo",
    "Nise da Silveira": "/rotasordenadas/nise",
    "Paulo Gracindo": "/rotasordenadas/paulo",
    "Zumbi dos Palmares": "/rotasordenadas/zumbi",
  }

  function goToPage(name) {
    const path = pageRouteByName[name]
    if (path) {
      navigate(path)
    }
  }

  return (
    <section className="containerCard">
      {monumentos.map((el) => (
        <div key={el.id} className="CardStatueP">
          <p className="statueName">
            {el.nome}
            {el.status === "encontrado" ? (
              <FaChevronRight
                onClick={() => goToPage(el.nome)}
                style={{ marginTop: "5px", fontSize: "13px", cursor: "pointer" }}
              />
            ) : (
              <FaLock style={{ marginTop: "5px", fontSize: "13px", color: "gray" }} />
            )}
          </p>
          <p className="statueAdress">
            <FaMapMarkerAlt style={{ color: "gray", marginBottom: "-1px" }} /> {el.adress}
          </p>
        </div>
      ))}
    </section>
  )
}

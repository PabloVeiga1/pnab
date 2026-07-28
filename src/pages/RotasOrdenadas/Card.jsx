import { monumentos } from "../../data/monumentos"
import "./RotasOrdenadas.css"

import { FaChevronRight,FaMapMarkerAlt} from "react-icons/fa"
export default function Card() {
  return (
    <section className="containerCard">
        {monumentos.map((el)=>(
            <div key={monumentos.id} className="CardStatueP">
                <p className="statueName">
                    {el.nome}
                    <FaChevronRight style={{marginTop:"5px",fontSize:"13px"}}/>
                </p>
                <p className="statueAdress"><FaMapMarkerAlt style={{color:"gray",marginBottom:"-1px"}}/> {el.adress}</p>
            </div>
        ))}
    </section>
  )
}

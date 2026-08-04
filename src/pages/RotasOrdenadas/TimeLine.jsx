import { FaCheck } from "react-icons/fa"
import "./RotasOrdenadas.css"

import { monumentos } from "../../data/monumentos"

export default function TimeLine() {
  return ( 
    <section className="timeLine">
        {monumentos.map(el =>{
          if(el.id === 6){
            return <>{el.status === "encontrado" ? <div className="checked"><FaCheck /></div> : <div key={el.id} className="circle">{el.id}</div>}</>
          }
          return <>
            {el.status === "encontrado" ? <div className="checked"><FaCheck /></div> : <div key={el.id} className="circle">{el.id}</div>}
            <div className="line"></div>
          </>
        })}
    </section>
  )
}

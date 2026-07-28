import "./RotasOrdenadas.css"
import { FiArrowLeft } from "react-icons/fi";
import { Navigate, useNavigate } from 'react-router-dom';
import {FaLock,FaCheck} from "react-icons/fa"
import { monumentos } from '../../data/monumentos';

import TimeLine from "./TimeLine";
import Card from "./Card";

export default function RotasOrdenadas() {
  const navigate = useNavigate()
  
  function irHome(){
    navigate("/")
  }


  const totalEcontrados = monumentos.filter(m => m.status === "encontrado").length

  return <>
    <div className='container'>
        <header>
            <button onClick={irHome}className="ArrowButtonRotas">
                <FiArrowLeft/>
            </button>
            <h1>Rotas ordenadas</h1>
        </header>
        <main className='corpo'>
            <h2>Percurso guiado</h2>
            <p className='description'>{totalEcontrados} estátuas de {monumentos.length} concluídas</p>
            <TimeLine/>
            <Card/>
        </main>
    </div>
  </>
}

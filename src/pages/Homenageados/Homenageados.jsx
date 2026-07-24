import React from 'react'
import "./Homenageados.css"
import { FiArrowLeft } from "react-icons/fi";
import { Navigate, useNavigate } from 'react-router-dom';

import { monumentos } from '../../data/monumentos';

export default function Homenageados() {

  const navigate = useNavigate()
  
  function irHome(){
    navigate("/")
  }

  return <>
    <div className='container'>
        <header>
            <button onClick={irHome}className="ArrowButton">
                <FiArrowLeft/>
            </button>
            <h1>Homenageados</h1>
        </header>
        <main className='corpo'>
            <h2>Listagem</h2>
            <p className='description'>Esse código garantirá a proteção e a privacidade do seu perfil</p>
            <div className="list">
                {monumentos.map((el)=>{
                    return <div key={el.id} className='statue'>
                        <div className="info">
                        <div className='id_statue'>
                            {el.id}
                        </div>
                        <div className="nome">{el.nome}</div>
                    </div>
                    <div className='status_statue'>
                        {el.status}
                    </div>
                    </div>
                })}
            </div>
        </main>
    </div>
  </>
}

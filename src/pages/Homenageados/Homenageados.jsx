import React from 'react'
import "./Homenageados.css"
import { FiArrowLeft } from "react-icons/fi";
import { Navigate, useNavigate } from 'react-router-dom';
import {FaLock,FaCheck} from "react-icons/fa"
import { monumentos } from '../../data/monumentos';

export default function Homenageados() {

  const navigate = useNavigate()
  
  function irHome(){
    navigate("/")
  }

  return <>
    <div className='container'>
        <header>
            <button onClick={irHome}className="ArrowButtonHomenageados">
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
                        {el.status === "não encontrado" ? <p><FaLock style={{marginBottom:"-2px",marginRight:"5px",fontSize:"15px",color:"gray"}}/> {el.status}</p>: <p><FaCheck style={{marginBottom:"-3px",marginRight:"8px",fontSize:"15px",color:"gray"}}/>{el.status}</p>}
                    </div>
                    </div>
                })}
            </div>
        </main>
    </div>
  </>
}

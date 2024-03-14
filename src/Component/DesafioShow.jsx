import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../assets/DesafioShow.css'
import { BarraRepasos } from './BarraRepasos';
export const DesafioShow = ({ desafio }) => {
    const { user_id  } = useParams();
    
    return (
        
        <div className='ctn-desafio'>
            <div className='ctn-desafio-info'>
                <div className='info'> <span>Titulo : </span>{desafio.desaCreated.nameDesa}</div>
                <div className='info'><span>Creado por : </span>{desafio.user.firstName}</div>
                <div className='info'>
                    <span>Fecha finalizacion : </span>{desafio.desaCreated.finishedDate.slice(0, 10)}
                </div>
                
                <BarraRepasos repasos={desafio.numReps} repasosTotal={desafio.desaCreated.numRep}/>
            </div>
            <div className='ctn-desafio-btn'>
            <Link className='btn link' to={`/${user_id}/desafios-join/${desafio.id}`}>Ver Desafio</Link>
            </div>

            
        </div>
    )
}

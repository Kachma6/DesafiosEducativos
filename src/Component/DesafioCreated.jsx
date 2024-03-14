import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/DesafioCreated.css';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
export const DesafioCreated = ({desafio, eliminar}) => {

  const editar = () => {

  }
  console.log(desafio)
   return (
    <div className='ctn-desafio'>
      <div  className='ctn-desafio-info'>
        <div className='info'><span>Titulo :</span> {desafio.nameDesa}</div>
        <div className='info'><span>Fecha de inicio :</span> {desafio.created[0]}-{desafio.created[1]}-{desafio.created[2]}</div>
        <div className='info'><span>Fecha de finalizacion :</span> {desafio.finishedDate.slice(0,10)}</div>
        
        <button className='btn secondary' onClick={eliminar}><DeleteForeverIcon/></button>
        <button className='btn secondary' onClick={editar}><EditIcon/></button>
      </div>
      <div>
      <Link className='btn link'>Detalle</Link>
      </div>
      
    </div>
    
  )
}

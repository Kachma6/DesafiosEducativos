import React, { useEffect, useState } from 'react'
import { Menu } from '../Component/Menu'
import { useParams } from 'react-router-dom';
import { Header } from '../Component/Header';
import { getDesafiosCreated} from '../apis/DesafiosApi';
import Suscribe from '../Component/Suscribe';
import { Link } from 'react-router-dom';
import { DesafioCreated } from '../Component/DesafioCreated';
import { deleteCreateDesafio } from '../apis/DesafiosApi';
export const MisDesafios = () => {
  const user = JSON.parse(localStorage.getItem('user'));
    const { user_id } = useParams();
    const [ listDesafiosCreated , setListDesafiosCreated] = useState([])
    useEffect(()=>{
      getDesafios();
       
    },[])
    const getDesafios = async () => {
      const data = await getDesafiosCreated(user_id);
      setListDesafiosCreated(data);
      console.log(data)  
    }

    const eliminar = async (id) => {
      const response = await deleteCreateDesafio(id);
      getDesafios();
      console.log(response);
    }
    
  return (
    <div className='ctn-home-page'>

    <div className='ctn-header'>
      <Header userId = {user_id} name={user.username}/>
    </div>
    <div className='ctn-dashboard'> 
      <div className='ctn-navegacion'>
        <Menu estado={2}/>
        <Suscribe />
      </div>
      <div className='ctn-user'>
           <div className='ctn-user-title background'>
                 <h2 className='ctn-user-title-h1'>Desafios that I created</h2>
                 <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
              
                    <Link  to={`/${user_id}/mis-desafios/create`} className='btn link'>Crear Nuevo Desafio</Link>
                 
            </div>
            <div className='ctn-user-body'>
            {listDesafiosCreated.map((desa)=><DesafioCreated key={desa.id} desafio={desa} eliminar = {()=>eliminar(desa.id)} />)}

            </div>
      </div>
    </div>
    


  </div>
  )
}

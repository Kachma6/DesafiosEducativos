import React, { useEffect, useState } from 'react'
import { Menu } from '../Component/Menu'
import { useParams } from 'react-router-dom';
import { Header } from '../Component/Header';
import { getDesafiosJoinByUserId } from '../apis/DesafiosApi';
import Suscribe from '../Component/Suscribe.jsx';
import { DesafioShow } from '../Component/DesafioShow.jsx';
export const DesafiosJoin = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { user_id } = useParams();
  const [listDesafiosJoin, setListDesafiosJoin] = useState([])
  useEffect(() => {
    getDesafios();

  }, [])
  const getDesafios = async () => {
    const data = await getDesafiosJoinByUserId(user_id);
    setListDesafiosJoin(data);
    console.log(data)
  }
  return (
    <div className='ctn-home-page'>

      <div className='ctn-header'>
        <Header userId={user_id} name={user.username} />
      </div>
      <div className='ctn-dashboard'>
        <div className='ctn-navegacion'>
          <Menu estado={1} />
          <Suscribe />
        </div>
        <div className='ctn-user'>
          <div className='ctn-user-title background'>
            <h2>Desafios por terminar!</h2>
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
           
          </div>
          <div className='ctn-user-body'>
            {listDesafiosJoin.map((desa, index) => <DesafioShow key={index} desafio={desa} />)}

          </div>


        </div>
      </div>



    </div>
  )
}

import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import '../assets/Menu.css'
export const Menu = ({ estado }) => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const handleClickDesafios = () => {
    navigate(`/${user_id}/desafios-join`)
  }
  const handleClickMisDesafios = () => {
    navigate(`/${user_id}/mis-desafios`)
  }
  const handleLogOut = () => {
    localStorage.clear
    navigate('/')
  }
  const crearDesafio = () => {
    navigate(`/${user_id}/mis-desafios/create`);
  }
  return (
    <div className='ctn-menu'>
        <div className='ctn-menu-header'></div>
        <div className='ctn-menu-body'>
          <div>
          <div>
            <div className='item-menu-title'>Participante</div>
            <div className='item-menu-group'>
              <div className={estado == 1 ? 'item-menu clicked' : 'item-menu'} onClick={handleClickDesafios}>
                <SportsScoreIcon />
                <span>Mis Desafios</span>
              </div>
            </div>
          </div>


          <div>
            <div className='item-menu-title'>Creador</div>
            <div className='item-menu-group'>
              <div className={estado == 2 ? 'item-menu clicked' : 'item-menu'} onClick={handleClickMisDesafios}>
                <MilitaryTechIcon />
                <span>Mis Desafios</span>
              </div>
              <div className={estado == 3 ? 'item-menu clicked' : 'item-menu'} onClick={crearDesafio}>
                <AddCircleIcon />
                <span>Crear Desafio</span>
              </div>
            </div>
          </div>
          </div>
         



          <div className={estado == 4 ? 'item-menu clicked' : 'item-menu'} onClick={handleLogOut}>
            <LogoutIcon />
            <span>Cerrar Sesión</span>
          </div>
        </div>

      



    </div>
  )
}

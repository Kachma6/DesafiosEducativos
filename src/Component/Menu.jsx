import React from 'react'
import '../assets/Menu.css'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
export const Menu = ({estado}) => {
  const { user_id  } = useParams();
  return (
    <div className='ctn-menu'>
        <nav>
          <div className='ctn-menu-header'>
              Menu
          </div>
        <ul>
           <li className={estado==1? 'clicked': ''}>
            <SportsScoreIcon/>
           <Link 
           to={`/${user_id}/desafios-join`} 
          
           >Desafios</Link>
          </li>
          <li className={estado==2? 'clicked':''}>
            <MilitaryTechIcon/>
            <Link to={`/${user_id}/mis-desafios`} >Mis Desafios</Link>
          </li>
       
          <li >
            <LogoutIcon/>
          <Link to="/">Cerrar Sesión</Link>
          </li>
         
        </ul>
      </nav>

     
        
    </div>
  )
}

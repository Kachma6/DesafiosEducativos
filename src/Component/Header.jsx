import React from 'react'
import '../assets/Header.css'
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
export const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const showMenu = () => {
    let menuBtn = document.getElementById('menuIcon');
    if(menuBtn.classList.contains('activo')){
      menuBtn.classList.remove('activo')
    }else{
      menuBtn.classList.add('activo');
    }
  }
 
 
  return (
    <div className='ctn-header-component'>
         <div className='ctn-header-icon-menu' onClick={showMenu}><MenuIcon/></div>
        <div className='ctn-icon'>
          <p className='icon uno'>M</p>
          <p className='icon dos'>e</p>
          <p className='icon tres'>m</p>
          <p className='icon cuatro'>o</p>
        </div>
       
        <div className='ctn-name'>
      
      
        <div className='name'>{`${user.firstName} ${user.lastName}`}</div>
        <Avatar alt={user.firstName} src={user.gender === 1?'/src/Images/9439775.jpg':'/src/Images/9442242.jpg'}/>
        </div>
        
    </div>
  )
}

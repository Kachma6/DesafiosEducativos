import React from 'react'
import '../assets/Header.css'
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
export const Header = ({user}) => {
  const showMenu = () => {
    let menuBtn = document.getElementById('menuIcon');
    if(menuBtn.classList.contains('activo')){
      menuBtn.classList.remove('activo')
    }else{
      menuBtn.classList.add('activo');
    }
  }
  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  return (
    <div className='ctn-header-component'>
         <div className='ctn-header-icon-menu' onClick={showMenu}><MenuIcon/></div>
        <div className='ctn-icon'>
          <h1> 
LC</h1>
          
        </div>
       
        <div className='ctn-name'>
      
      
        <div className='name'>{`${user.firstName} ${user.lastName}`}</div>
        <Avatar alt={user.firstName} src={user.gender === 1?'/src/Images/9439775.jpg':'/src/Images/9442242.jpg'}/>
        </div>
        
    </div>
  )
}

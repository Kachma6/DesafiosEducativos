import React, { useEffect, useState } from 'react'
import '../assets/HomePage.css'
import { Menu } from '../Component/Menu'
import { useParams } from 'react-router-dom';

import { Header } from '../Component/Header';



export const HomePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(window.location.href);
  console.log(user);
  const { user_id } = useParams();


 
  return (
    <div className='ctn-home-page'>

      <div className='ctn-header'>
        <Header user={user}/>
      </div>
      <div className='ctn-dashboard'> 
        <div className='ctn-navegacion'>
          <Menu />
       
        </div>
        <div className='ctn-user'>
        </div>
      </div>
      


    </div>
  )
}

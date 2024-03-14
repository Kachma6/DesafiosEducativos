import React from 'react'
import '../assets/Header.css'
export const Header = ({userId, name}) => {
  return (
    <div className='ctn-header-component'>
        {/* User {userId} */}
        <div className='ctn-icon'>
          <h1> LearningDaily</h1>
          
        </div>
        <div className='ctn-name'>
        <div className='name-icon'>KA</div>
        <div className='name'>{name}</div>
        </div>
        
    </div>
  )
}

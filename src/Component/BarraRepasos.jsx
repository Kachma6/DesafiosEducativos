import React, { useEffect, useState } from 'react'
import '../assets/BarraRepasos.css'
export const BarraRepasos = ({ repasos , repasosTotal, color}) => {
    // const [days, setDays] = useState(Array[repasosTotal])
    // useEffect(()=>{
    //     renderizar()
    // },[])
    const renderizar = () => {
        const day = [];
        for(let i = 0; i < repasosTotal; i++){
            day.push(<div key={i} className={i<repasos?'c-repaso done':'c-repaso no-done'} style={{  background: i<repasos&&color.letter }}></div>)
        }
        return day;
    
    }
    return (
    <div className='ctn-barra'>
         {/* <div className='ctn-barra-title'>Progreso : </div> */}
        <div className='ctn-barra-repaso'>
       <div style={{  background: color.back }}>
       {
            renderizar().map((h)=>(h))
        }
       </div>
       </div>
        <div className='ctn-barra-title'>  {repasos}/{repasosTotal}  </div>
        
    </div>    
    
  )
}

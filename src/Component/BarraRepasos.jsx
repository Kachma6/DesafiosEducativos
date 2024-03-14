import React, { useEffect, useState } from 'react'
import '../assets/BarraRepasos.css'
export const BarraRepasos = ({ repasos , repasosTotal}) => {
    // const [days, setDays] = useState(Array[repasosTotal])
    // useEffect(()=>{
    //     renderizar()
    // },[])
    const renderizar = () => {
        const day = [];
        for(let i = 0; i < repasosTotal; i++){
            day.push(<div className={i<repasos?'c-repaso done':'c-repaso no-done'}></div>)
        }
        return day;
    
    }
    return (
    <div className='ctn-barra-repaso'>
        <div className='ctn-barra-title'>Progreso : </div>
        {
            renderizar().map((h)=>(h))
        }
        <div className='ctn-barra-title'>  {repasos}/{repasosTotal}  </div>
    </div>
  )
}

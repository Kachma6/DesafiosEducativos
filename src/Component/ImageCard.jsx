import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
export const ImageCard = ({imagen, eliminar}) => {
  console.log("desde imagencard",imagen)
  return (
  
    <div className='ctn-imagen-show'>
      
        <div className='close-imagen' onClick={()=>eliminar()}><CloseIcon/></div>
        <div className='grid-imagen-show' >
                <img src={imagen.webformatURL} height={"100px"}></img>
            </div>
    </div>
  )
}

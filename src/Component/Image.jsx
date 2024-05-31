import React from 'react'

export const Image = ({imagen, imagenClick, eliminar}) => {
    
    
    return (
        <div key={imagen.id} onClick={()=> imagenClick({})}>
            
            <div className='grid-imagen' >
                <img src={imagen.webformatURL} height={"100px"}></img>
            </div>

        </div>
    )
}

import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import '../assets/CardRepaso.css';
export const CardRepaso = ({ cardProp, enviarRespuesta, color }) => {
  // const [cardRepaso, setCardRepaso] = useState(cardProp);
  const [respuesta, setRespuesta] = useState('');
  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (respuesta === cardProp.answer) {
      enviarRespuesta(1)
    } else {
      enviarRespuesta(0)
    }
    setRespuesta('');
    girar();
    let btn = document.getElementById('btn-next');
    btn.classList.remove('display')
  }
  const girar = () => {
    const elemento = document.getElementsByClassName('card-repaso');
    const elementoDetras = document.getElementsByClassName('card-repaso-detras');
    if(elemento[0].classList.contains('ocultar')){
      elemento[0].classList.remove('ocultar');
    }else{
      elemento[0].classList.add('ocultar');
    }
    if(elementoDetras[0].classList.contains('ocultar')){
      elementoDetras[0].classList.remove('ocultar');
    }else{
      elementoDetras[0].classList.add('ocultar');
    }
    
  }
  return (
    <div className='ctn-card-repaso'>
  
        <div className='card-repaso' style={{ background: color.back }}>
          {/* <div className='card-header'>Tarjeta de Repaso</div> */}
          <div className='card-body'>
            <div className='card-body-part pregunta'>
              <div className='card-body-title'>Pregunta : </div>
              <div className='card-body-text'>{cardProp.question}</div>
            </div>
            <div className='card-body-part respuesta'>
              <div className='card-body-title'>Respuesta : </div>
              <div className='card-form'>
                <form >

                  <TextField
                    autoFocus
                    required
                    margin="normal"
                    style={{ background: '#ffffff' }}
                    id="respuesta"
                    name="Escribe tu respuesta"
                    label="Escribe tu respuesta"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={respuesta}
                    onChange={(e) => setRespuesta(e.target.value)}
                  />
                  <button className='btn' onClick={onHandleSubmit}>Enviar</button>
                </form>

              </div>
            </div>

          </div>

        </div>
        <div className='card-repaso-detras ocultar' style={{ background: color.back }}>
          {/* <div className='card-header'>Tarjeta de Repaso</div> */}
          <div className='card-body'>
            <div className='card-body-part pregunta'>
              <div className='card-body-title'>Pregunta : </div>
              <div className='card-body-text'>{cardProp.question}</div>
            </div>
            <div className='card-body-part respuesta'>
              <div className='card-body-title'>Respuesta : </div>
              <div className='card-form'>
                <div className='card-body-text'>{cardProp.answer}</div>

              </div>
            </div>

          </div>

        </div>
      

    </div>

  )
}

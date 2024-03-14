import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import '../assets/CardRepaso.css';
export const CardRepaso = ({ cardProp, enviarRespuesta }) => {
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
  }
  return (
    <div className='card-repaso'>
      <div className='card-header'>Tarjeta de Repaso</div>
      <div className='card-body'>
        <div className='card-pregunta'>Pregunta : </div>
        <div className='card-pregunta-text'>{cardProp.question}</div>
        <div className='card-pregunta'>Respuesta : </div>
        <div className='card-form'>
          <form >
          
            <TextField
              autoFocus
              required
              margin="dense"
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
  )
}

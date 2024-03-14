import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
export const CardCreate = ({enviarCard}) => {
    const [card, setCard] = useState({
        
        question:'',
        answer:''
    
      })
    
      const onChangeQuestion = (e) => {
         setCard({
            ...card,
           question: e.target.value
         })
      }
      const onChangeAnswer = (e) => {
        setCard({
            ...card,
            answer: e.target.value
        })
      }
    const onSubmit = (e) => {
        e.preventDefault();
        
        enviarCard(card)
        setCard({
        
            question:'',
            answer:''
        
          })
    }
  return (
    <div className='card'  >
         
    <form onSubmit={(e)=>onSubmit(e)}>
    {/* <TextField
      
      fullWidth
      margin="dense"
      id="question"
      name="Codigo"
      label="Pregunta"
      type="text"
      variant="outlined"
      defaultValue={card.question}
      onChange={onChangeQuestion}
     
    />
      <TextField
 
      margin="dense"
      id="answer"
      name="Codigo"
      label="Respuesta"
      type="text"
      fullWidth
      variant="outlined"
      defaultValue={card.answer}
      onChange={onChangeAnswer}
    /> */}
    <input onChange={onChangeQuestion} value={card.question} required/>
    <input onChange={onChangeAnswer} value={card.answer} required/>
    <button onSubmit={(e)=>onSubmit(e)}>Guardar</button>
    {/* <div onClick={(e)=>onSubmit(e)} className='btn' > 
      Guardar Card
    </div> */}
    
    </form>
  

</div>
  )
}

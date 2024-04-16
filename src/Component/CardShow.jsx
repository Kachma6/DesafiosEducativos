import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import '../assets/CardShow.css'
import Avatar from '@mui/material/Avatar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { getColor} from '../assets/colors.js'
export const CardShow = ({ cardData, index, editar, eliminar }) => {
    const myCard = cardData
    const [ cardAux , setCardAux] = useState({
       myCard
    })
    const [isOnBlur, setIsOnBlur] = useState(true);
    const [ isValidation, setIsValidation] = useState({
        answer: false,
        question: false
})
    useEffect(()=>{
        setCardAux(cardData)
    }, [cardData])
    const onChangeCardAux = (e) => {
        setCardAux({...cardAux, question: e.target.value})
        editar(index, cardAux)
    } 
    const onChangeCardAux2 = (e) => {
        setCardAux({...cardAux, answer: e.target.value})
        editar(index, cardAux)
    }
    const eliminarCard = (e) => {
        e.preventDefault();
       
        eliminar();
        
    }
    const editarCard = (e) => {
        e.preventDefault();
        editar(index, cardAux)
    }
    const onHandleBlur = () => {
        console.log("onblour", cardAux)
        console.log(isOnBlur)
        validarInputs();
        editar(index, cardAux)
    }
    const validarInputs = () => {
        let cardsAuxiliar = isValidation;
        for(let value in cardAux){
            if(cardAux[value]===''){
                cardsAuxiliar[value] = true
            }else{
                cardsAuxiliar[value]= false
            }
        }

        setIsValidation(cardsAuxiliar)
        console.log("is validation",isValidation)
       
    }
    console.log("get color",getColor());
    return ( 
        <div className='card-show' >
            <div className='card-show-header'>
            <div>
           Tarjeta : {index+1}
            </div>
            <div className='ctn-card-btns'>
                <Avatar sx={{ bgcolor: "black" }} onClick={eliminarCard}>
                     <DeleteForeverIcon />
                 </Avatar>
                </div>
            </div>
            <form >
                <TextField
                    autoFocus
                    margin="normal"
                    id="question"
                    name="question"
                    label="Pregunta"
                    type="text"
                    fullWidth
                    variant="outlined"
                    inputProps={{ maxLength: 200 }}
                    value={cardAux.question}
                    onChange={onChangeCardAux}
                    onBlur={onHandleBlur}
                    error={isValidation.question}
                    helperText={isValidation.question ? 'Por favor llene el campo': ''}
                    multiline
                />
                <TextField

                    margin="normal"
                    id="answer"
                    name="answer"
                    label="Respuesta"
                    type="text"
                    fullWidth
                    variant="outlined"
                    inputProps={{ maxLength: 100 }}
                    value={cardAux.answer}
                     onChange={onChangeCardAux2}
                     onBlur={onHandleBlur}
                     error={isValidation.answer}
                    helperText={isValidation.answer ? 'Por favor llene el campo': ''}
                   multiline
                />
               
                {/* <button className='btn' onClick={editarCard}>Guardar Cambios</button> */}
              
               
            </form>
           
        </div>
    )
}

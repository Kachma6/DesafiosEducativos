import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
export const CardShow = ({ cardData, index, editar, eliminar }) => {
    const [card, setCard] = useState({

        question: cardData.question,
        answer: cardData.answer

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

    const eliminarCard = (e) => {
        e.preventDefault();
        eliminar();
    }
    const editarCard = (e) => {
        e.preventDefault();
        editar(index, card)
    }
    return (
        <div className='card'>
            <form>
                <TextField

                    margin="dense"
                    id="answer"
                    name="Codigo"
                    label="Pregunta"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={card.question}
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
                    value={card.answer}
                    onChange={onChangeAnswer}
                />
               
                <button className='btn' onClick={editarCard}>Guardar Cambios</button>
                <button className='btn' onClick={eliminarCard}>Eliminar</button>
            </form>
        </div>
    )
}

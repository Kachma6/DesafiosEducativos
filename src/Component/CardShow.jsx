import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import '../assets/CardShow.css'
import Avatar from '@mui/material/Avatar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { SearchImage } from './SearchImage.jsx';
import { ImageCard } from './ImageCard.jsx';
import Tooltip from '@mui/material/Tooltip';

export const CardShow = ({ cardData, index, editar, eliminar,editarImagen, eliminarImagen }) => {
    
    const myCard = cardData
    const [cardAux, setCardAux] = useState({
        myCard
    })
    const [imagen, setImagen] = useState("");
    const [imagenURL, setImagenURL] = useState("");
    const [isOnBlur, setIsOnBlur] = useState(true);
    const [isValidation, setIsValidation] = useState({
        answer: false,
        question: false
    })
    useEffect(() => {
        setCardAux(cardData)
    }, [cardData])
    const onChangeCardAux = (e) => {
        setCardAux({ ...cardAux, question: e.target.value })
        editar(index, cardAux)
    }
    const onChangeCardAux2 = (e) => {
        setCardAux({ ...cardAux, answer: e.target.value })
        editar(index, cardAux)
    }
    const getImagenChoose = (imagen) => {
        
        setCardAux({...cardAux, url: imagen.url})
        editarImagen(index, imagen);
        
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
    
        validarInputs();
        editar(index, cardAux)
    }
    const validarInputs = () => {
        let cardsAuxiliar = isValidation;
        for (let value in cardAux) {
            if (cardAux[value] === '') {
                cardsAuxiliar[value] = true
            } else {
                cardsAuxiliar[value] = false
            }
        }

        setIsValidation(cardsAuxiliar)

    }
    
    const eliminarImagenCard = () => {
        setCardAux({...cardAux, url: ""})
        eliminarImagen(index);
    }
 
    return (
        <div className='card-show' >
            <div className='card-show-header'>
                <div>
                    Tarjeta : {index + 1}
                </div>
                <div className='ctn-card-btns'>

                    
                    <Tooltip title="Agregar imagen">
                        <Avatar sx={{ bgcolor: "black", marginRight: "15px" }}>
                        <SearchImage getImagenChoose={(imagen)=>getImagenChoose(imagen)} />
                        </Avatar>
                            
                       
                    </Tooltip>
                    <Tooltip title="Eliminar tarjeta">
                         <Avatar sx={{ bgcolor: "black" }} onClick={eliminarCard}>
                            <DeleteForeverIcon />
                        </Avatar>
                    </Tooltip>

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
                    placeholder='Pregunta...'
                    inputProps={{ maxLength: 200 }}
                    value={cardAux.question}
                    onChange={onChangeCardAux}
                    onBlur={onHandleBlur}
                    sx={cardAux.url !== "" ? {
                        ".MuiOutlinedInput-root": {
                            paddingTop: "1rem",
                            flexDirection: "column"
                        },
                        img: {

                            height: "100px",
                            borderRadius: "10px",
                            objectFit: "cover",
                           
                        }
                    } : {}}
                    InputProps={cardAux.url !== null && cardAux.url !== '' && cardAux.url !== undefined? {
                        startAdornment: <ImageCard imagen={{ id: imagen, webformatURL: cardAux.url }} eliminar={() => eliminarImagenCard()} />
                    } : {}}
                    error={isValidation.question}
                    helperText={isValidation.question ? 'Por favor llene el campo' : ''}
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
                    helperText={isValidation.answer ? 'Por favor llene el campo' : ''}
                    multiline
                />




            </form>

        </div>
    )
}

import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Menu } from '../Component/Menu'
import { Header } from '../Component/Header';
import Suscribe from '../Component/Suscribe';
import TextField from '@mui/material/TextField';
import { CardShow } from '../Component/CardShow';
import { createDesafio } from '../apis/DesafiosApi';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { v4 } from 'uuid'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../assets/FormCreateDesafio.css'
export const FormCreateDesafio = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { user_id } = useParams();
  const [cards, setCards] = useState([])
  const [response, setResponse] = useState([])
  const [desafio, setDesafio] = useState({
    nameDesa: '',
    description: '',
    finishedDate: dayjs('2024-04-17'),
    numRep: '',
    idUser: { id: user_id },
    code: v4(),
    cards: cards,
  });
  const onChangeNameDesa = (e) => {
    setDesafio({
      ...desafio,
      nameDesa: e.target.value
    })

  }
  const onChangeDescripcion = (e) => {
    setDesafio({
      ...desafio,
      description: e.target.value
    })

  }
  const onChangeFinishedDate = (e) => {

    setDesafio({
      ...desafio,
      finishedDate: e
    })

  }
  const onChangeNumRep = (e) => {
    setDesafio({
      ...desafio,
      numRep: e.target.value
    })

  }

  const enviarCard = (cardAux) => {
    let newCard = { answer: cardAux.answer, question: cardAux.question, idDesaCreated: { id: 1 } }
    setDesafio({ ...desafio, cards: [...desafio.cards, newCard] })

  }

  const eliminarCard = (index) => {
    console.log("Eliminar", index);
    let cardsAuxi = desafio.cards.slice();
    cardsAuxi.splice(index, 1)
    setDesafio({ ...desafio, cards: cardsAuxi })
  }
  const editarCard = (index, data) => {
    let cardsAuxi = desafio.cards.slice();
    cardsAuxi[index].answer = data.answer;
    cardsAuxi[index].question = data.question
    setDesafio({ ...desafio, cards: cardsAuxi })
  }
  const guardarDesafio = async (e) => {
    e.preventDefault();
    const responseDb = await createDesafio(desafio);
    console.log(responseDb);
    setResponse(responseDb)
    console.log("envioooooooooooooooooooooooooooo")

    setDesafio({
      nameDesa: '',
      description: '',
      finishedDate: '',
      numRep: '',
      idUser: { id: user_id },
      code: v4(),
      cards: []
    })
  }

  console.log(desafio)
  return (
    <div className='ctn-home-page' >

      <div className='ctn-header'>
        <Header userId={user_id} name={user.username} />
      </div>
      <div className='ctn-dashboard'>
        <div className='ctn-navegacion'>
          <Menu estado={2} />
          <Suscribe />
        </div>
        <div className='ctn-user'>
          <div className='ctn-user-title'>
            <h2>Crea un nuevo Desafio para compartir!</h2>
          </div>
          <div className='ctn-user-body'>
            <div className='ctn-form'>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="Codigo"
                label="Nombre del Desafio :"
                type="text"
                fullWidth
                variant="outlined"
                value={desafio.nameDesa}
                onChange={onChangeNameDesa}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="Codigo"
                label="Descripcion :"
                type="text"
                fullWidth
                variant="outlined"
                value={desafio.description}
                onChange={onChangeDescripcion}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Fecha de finalizacion :" value={desafio.finishedDate} onChange={onChangeFinishedDate} defaultValue={dayjs('2022-04-17')} />
                </DemoContainer>
              </LocalizationProvider>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="Codigo"
                label="Numero de Repeticiones :"
                type="number"
                fullWidth
                variant="outlined"
                value={desafio.numRep}
                onChange={onChangeNumRep}
              />
              <div>


                {
                  desafio.cards.map((c, index) => (
                    <CardShow
                      key={index}
                      cardData={c}
                      index={index}
                      eliminar={() => eliminarCard(index)}
                      editar={(index, data) => editarCard(index, data)}
                    />

                  ))
                }
                {/* <CardCreate enviarCard={enviarCard} /> */}
                <button className='btn secondary' onClick={enviarCard}>Crear Tarjeta</button>
              </div>
              {}
              <button className='btn secondary' onClick={guardarDesafio}>Guardar Desafio</button>
              {
                response.code ?
                  <div>{response.code}</div> :
                  <div>No existe</div>
              }
            </div>


          </div>

        </div>
      </div>



    </div>
  )
}

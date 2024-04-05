import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Menu } from '../Component/Menu'
import { Header } from '../Component/Header';

import TextField from '@mui/material/TextField';
import { CardShow } from '../Component/CardShow';
import { createDesafio , getDesafioComplete, editCreateDesafio} from '../apis/DesafiosApi';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const FormEditDesafio = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [isLoading, setIsLoading] = useState(true);
    const { user_id , desafio_id} = useParams();
    const [response, setResponse] = useState([])
    const [desafio, setDesafio] = useState({});
    useEffect(()=>{
        getDesafio();
    },[])

    const getDesafio = async () => {
        const data = await getDesafioComplete(desafio_id)
        setDesafio(data);
        setIsLoading(false)
        console.log(data)
    }
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
      let newCard = { answer: cardAux.answer, question: cardAux.question, idDesaCreated: { id: desafio_id } }
      setDesafio({ ...desafio, cards: [...desafio.cards, newCard] })
  
    }
  
    const eliminarCard = (index) => {
      let cardsAuxi = desafio.cards.slice();
      cardsAuxi.splice(index, 1)
      console.log("cardsAuxi", cardsAuxi)
      setDesafio({ ...desafio, cards: cardsAuxi })
      console.log("se renderiza otra vez")
    }
    const editarCard = (index, data) => {
      let cardsAuxi = desafio.cards.slice();
      cardsAuxi[index].answer = data.answer;
      cardsAuxi[index].question = data.question
      setDesafio({ ...desafio, cards: cardsAuxi })
    }
    const guardarDesafio = async (e) => {
      e.preventDefault();
      console.log("final enviando..",desafio)
      const responseDb = await editCreateDesafio(desafio, desafio_id);
      setResponse(responseDb)
      console.log(responseDb)
      
    }
    console.log(desafio)
    if(isLoading){
      return (
        <div className='ctn-home-page' >
  
        <div className='ctn-header'>
          <Header user={user}/>
        </div>
        <div className='ctn-dashboard'>
          <div className='ctn-navegacion'>
            <Menu estado={2} />
         
          </div>
          <div className='ctn-user'>
            <div className='ctn-user-title'>
              <h2>Crea un nuevo Desafio para compartir!</h2>
            </div>
            <div className='ctn-user-body'>
              
                  Loading.....................
            </div>
  
          </div>
        </div>
  
  
  
      </div>
      )
    }
    return (
      <div className='ctn-home-page' >
  
        <div className='ctn-header'>
          <Header user={user}/>
        </div>
        <div className='ctn-dashboard'>
          <div className='ctn-navegacion'>
            <Menu estado={2} />
           
          </div>
          <div className='ctn-user'>
            <div className='ctn-user-title'>
              <h2>Editando el Desafio!</h2>
            </div>
            <div className='ctn-user-body'>
              <div className=''>
                <TextField
                  
                  required
                  margin="dense"
                  id="name"
                  name="Codigo"
                  label="Nombre del Desafio :"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={desafio.nameDesa}
                  onChange={onChangeNameDesa}
                  helperText={!desafio.nameDesa? 'Titulo es obligatorio':""}
                  error={!desafio.nameDesa}
                />
                <TextField
                  
                  required
                  margin="dense"
                  id="name"
                  name="Codigo"
                  label="Descripcion :"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={desafio.description}
                  onChange={onChangeDescripcion}
                />
  
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Fecha de finalizacion :" value={dayjs(desafio.finishedDate)} onChange={onChangeFinishedDate}  />
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
  
                {console.log(desafio.cards)}
                  {
                   
                    desafio.cards!=null? desafio.cards.map((c, index) => (
                      <CardShow
                        key={index}
                        cardData={c}
                        index={index}
                        eliminar={() => eliminarCard(index)}
                        editar={(index, data) => editarCard(index, data)}
                      />
                      
  
                    )):<div>No Existen cards</div>
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

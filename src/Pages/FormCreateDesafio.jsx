import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { v4 } from 'uuid';
import Avatar from '@mui/material/Avatar';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Today } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { createDesafio } from '../apis/DesafiosApi';
import '../assets/FormCreateDesafio.css'
import { Menu, Header, CardShow } from '../Component';
import { getColor } from '../assets/colors';
import InfoIcon from '@mui/icons-material/Info';
import { ChooseImages } from '../Component/ChooseImages';
import ErrorIcon from '@mui/icons-material/Error';
const valuesOfReps = [
  {
    value: 2
  },
  {
    value: 3
  },
  {
    value: 4
  },
  {
    value: 5
  },
  {
    value: 6
  },
  {
    value: 7
  },
  {
    value: 8
  },
  {
    value: 9
  },
  {
    value: 10
  },
]

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
export const FormCreateDesafio = () => {

  const { user_id } = useParams();
  const [response, setResponse] = useState([])
  const [desafio, setDesafio] = useState({
    nameDesa: '',
    description: '',
    finishedDate: dayjs(),
    numRep: 2,
    idUser: { id: user_id, rol: "USER" },
    code: v4(),
    cards: [],
  });
  const [desafioValidation, setDesafioValidation] = useState({
    nameDesa: false,
    description: false,
    finishedDate: false,
    cards: false,
  });
  const [estadoPeticion, setEstadoPeticion] = useState(true)
  const [showAlert, setShowAlert] = useState(false);
  const [openShareCode, setOpenShareCode] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);

  const handleClose = () => {
    setOpenShareCode(false);
  };
  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
  };
  const onChangeData = (e) => {
    const { value, name } = e.target;
    changeIsValid(name, value)
    setDesafio({
      ...desafio,
      [name]: value
    })
  }
  const onChangeFinishedDate = (e) => {
    setDesafio({
      ...desafio,
      finishedDate: e
    })
  }

  const changeIsValid = (name, value) => {
    if (value === '') {
      setDesafioValidation({ ...desafioValidation, [name]: true })
    } else {
      setDesafioValidation({ ...desafioValidation, [name]: false })
    }
  }

  const enviarCard = () => {
    let newCard = { answer: '', question: '', idDesaCreated: { id: 1 }, url:"" }
    setDesafio({ ...desafio, cards: [...desafio.cards, newCard] })
  }
  const eliminarCard = (index) => {
    let cardsAuxi = desafio.cards.slice();
    cardsAuxi.splice(index, 1)
    setDesafio({ ...desafio, cards: cardsAuxi })
  }
  const editarCard = (index, data) => {
    
    let cardsAuxi = desafio.cards.slice();
    cardsAuxi[index].answer = data.answer;
    cardsAuxi[index].question = data.question;
    cardsAuxi[index].url = data.url;
    setDesafio({ ...desafio, cards: cardsAuxi })
    validarCards();
  }
  const eliminarImagen = (index) => {
    
    let cardsAuxi = desafio.cards.slice();
    cardsAuxi[index].url = "" ;
    cardsAuxi[index].idImage = "";
    setDesafio({ ...desafio, cards: cardsAuxi })
  }
  const editarImagen = (index, imagen) => {
    
    let cardsAuxi = desafio.cards.slice();
   
    cardsAuxi[index].url = imagen.url;
    cardsAuxi[index].idImage = imagen.id
    setDesafio({ ...desafio, cards: cardsAuxi })
    validarCards();
  }
  const guardarDesafio = async () => {
   
    let validation = validarFormulario();
    if (validarCards() === 0 && validation === 0) {
     
      const responseDb = await createDesafio(desafio);
      if (responseDb.status === 403 || responseDb.code == 'ERR_NETWORK' || responseDb.code === 'ERR_BAD_REQUEST') {
        setEstadoPeticion(false);
        setShowAlert(true)
      } else {
        if (responseDb.status === 200) {
          setEstadoPeticion(true);
          setShowAlert(true)
          setResponse(responseDb.data)
          setDesafio({
            nameDesa: '',
            description: '',
            finishedDate: dayjs(),
            numRep: '',
            idUser: { id: user_id },
            code: v4(),
            cards: []
          })
          setOpenShareCode(true)
        }
      }

    } else {
 
      setEstadoPeticion(false);
      setShowAlert(true)
    }
  }
  const validarCards = () => {
    let cardsAux = desafio.cards.slice();
    let contador = 0;
    for (let clave in cardsAux) {
      if (cardsAux[clave].answer === '' || cardsAux[clave].question === '') {
        contador++;
      }
    }
    if (contador > 0) {
      setDesafioValidation({ ...desafioValidation, cards: true })
    } else {
      setDesafioValidation({ ...desafioValidation, cards: false })
    }
    return contador;
  }
  const validarFormulario = () => {
    let contador = 0;
    let arrayErrores = desafioValidation;
    for (let clave in desafio) {
      if (desafio[clave] === '') {
        arrayErrores[clave] = true
        contador++;
      }
    }
    setDesafioValidation(arrayErrores)
    return contador;
  }
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowAlert(false);
  };
  
  return (
    <div className='ctn-home-page' >

      <div className='ctn-header'>
        <Header />
      </div>
      <div className='ctn-dashboard'>
        <div className='ctn-navegacion' id='menuIcon'>
          <Menu estado={3} />

        </div>
        <div className='ctn-user'>
          <div className='ctn-user-title'>
            <div className='ctn-user-title-h1' >Crea un nuevo Desafío para compartir!</div>
            <div className='ctn-user-title-options'>
              {desafio.cards.length === 0 ?
                <div></div> :
                <button className='btn' onClick={guardarDesafio}>Guardar Desafío</button>
              }

            </div>

          </div>
          <div className='ctn-user-body'>
           

            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={openShareCode}
            >
              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Comparte el Desafío!
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>
                <Typography gutterBottom>
                  Comparte el código, para que personas se puedan unir al desafío!....
                </Typography>
                <div className='code'>
                  <TextField
                    value={response.code && response.code}
                    fullWidth
                    margin='none'
                    size='small'
                  />
                  <CopyToClipboard text={response.code && response.code} onCopy={onCopyText}>
                    <Avatar variant="square"><ContentCopyIcon /></Avatar>
                  </CopyToClipboard>

                </div>
                {copyStatus && <p>El código se ha copiado!</p>}
              </DialogContent>
            </BootstrapDialog>
            <div className='form-create-desafio'>
            
              <TextField
                autoFocus
                required
                margin="normal"
                id="nameDesa"
                name="nameDesa"
                label="Nombre del Desafío"
                type="text"
                fullWidth
                inputProps={{ maxLength: 200 }}
                variant="outlined"
                value={desafio.nameDesa}
                onChange={onChangeData}
                error={desafioValidation.nameDesa}
                helperText={desafioValidation.nameDesa ? "Es obligatorio" : ''}
              />
              <TextField
                required
                margin="normal"
                id="description"
                name="description"
                label="Instrucción"
                type="text"
                fullWidth
                inputProps={{ maxLength: 200 }}
                variant="outlined"
                value={desafio.description}
                onChange={onChangeData}
                error={desafioValidation.description}
                helperText={desafioValidation.description ? "Es obligatorio" : ''}
              />
              
             <div className='info-form'><InfoIcon/><span>Considere que sólo se puede realizar un repaso por día</span></div>
              <div className='form-create-desafio-two'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label="Fecha de finalización :"
                      value={desafio.finishedDate}
                      onChange={onChangeFinishedDate}
                      defaultValue={Today}
                      name='finishedDate'
                      disablePast

                      sx={{
                        width: '100%',
                        margin: 30
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <TextField
                  id="outlined-select-currency"
                  select
                  fullWidth
                  name='numRep'
                  label="Número de Repeticiones"
                  margin="normal"
                  value={desafio.numRep}
                  onChange={onChangeData}
                >
                  {valuesOfReps.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className='form-create-desafio-separador'></div>
              <h2 className=' ctn-user-title-h1' >
                Crea tarjetas de estudio para tu desafío!
              </h2>
              <div>

                {
                  desafioValidation.cards &&  <div className='error-form'><ErrorIcon/><span>Llene todos los campos de las tarjetas de aprendizaje</span></div>
                }
                {
                  desafio.cards.map((c, index) => (
                    <CardShow
                      key={index}
                      cardData={c}
                      index={index}
                      eliminar={() => eliminarCard(index)}
                      editar={(index, data) => editarCard(index, data)}
                      editarImagen = {(index, url) => editarImagen(index, url)}
                      eliminarImagen={()=>eliminarImagen(index)}
                    />

                  ))
                }

                <div className='form-create-desafio-btn'>
                  <button className='btn icon' onClick={enviarCard}><AddIcon /><span>Nueva Tarjeta</span></button>

                </div>
              </div>

            </div>


          </div>

        </div>
      </div>




      <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert
          onClose={handleCloseAlert}
          severity={estadoPeticion ? "success" : "error"}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {estadoPeticion ? "El desafio se ha creado correctamente" : "Lo sentimos mucho,no se ha creado el desafio"}
        </Alert>
      </Snackbar>
    </div>
  )
}

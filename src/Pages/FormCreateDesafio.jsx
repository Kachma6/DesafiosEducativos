import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Menu } from '../Component/Menu'
import { Header } from '../Component/Header';
import TextField from '@mui/material/TextField';
import { CardShow } from '../Component/CardShow';
import { createDesafio } from '../apis/DesafiosApi';
import dayjs from 'dayjs';
import { v4 } from 'uuid';
import Avatar from '@mui/material/Avatar';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../assets/FormCreateDesafio.css'
import { Today } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
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
  const user = JSON.parse(localStorage.getItem('user'));
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
  const [open1, setOpen1] = useState(false);
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
    let newCard = { answer: '', question: '', idDesaCreated: { id: 1 } }
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
    cardsAuxi[index].question = data.question
    setDesafio({ ...desafio, cards: cardsAuxi })
    validarCards();
  }
  const guardarDesafio = async () => {
    let validation = validarFormulario();
    if (validarCards() === 0 && validation === 0) {
      const responseDb = await createDesafio(desafio);
      if (responseDb.status === 403 || responseDb.code == 'ERR_NETWORK' || responseDb.code === 'ERR_BAD_REQUEST') {
        setEstadoPeticion(false);
        setOpen1(true)
      } else {
        if (responseDb.status === 200) {
          setEstadoPeticion(true);
          setOpen1(true)
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
      console.log("No se guardo nada")
      setEstadoPeticion(false);
      setOpen1(true)
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
  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen1(false);
  };
  console.log(desafio)
  return (
    <div className='ctn-home-page' >

      <div className='ctn-header'>
        <Header user={user} />
      </div>
      <div className='ctn-dashboard'>
        <div className='ctn-navegacion' id='menuIcon'>
          <Menu estado={3} />

        </div>
        <div className='ctn-user'>
          <div className='ctn-user-title'>
            <h2 className='ctn-user-title-h1'>Crea un nuevo Desafio para compartir!</h2>
            <div className='ctn-user-title-options'>
              {desafio.cards.length === 0 ?
                <div></div> :
                <button className='btn' onClick={guardarDesafio}>Guardar Desafio</button>
              }

            </div>

          </div>
          <div className='ctn-user-body'>
            {
              response.code ?
                <div>{response.code}</div> :
                <div></div>
            }

            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={openShareCode}
            >
              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Comparte el Desafio!
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
                  Comparte el codigo, para que personas se puedan unir al desafio!....
                </Typography>
                <div className='code'>
                  {/* {
              response.code ?
                <div>{response.code}</div> :
                <div></div>
            }
            
          <button onClick={handleCopied}>
            Save changes
          </button> */}
                  <TextField
                    value={response.code && response.code}
                    fullWidth
                    margin='none'
                    size='small'
                    
                  />
                  <CopyToClipboard text={response.code && response.code} onCopy={onCopyText}>
                    <Avatar  variant="square"><ContentCopyIcon /></Avatar>
                  </CopyToClipboard>
                  
                </div>
                {copyStatus && <p>El codigo se ha copiado!</p>}
              </DialogContent>
            </BootstrapDialog>
            <div className='form-create-desafio'>
              <TextField
                autoFocus
                required
                margin="normal"
                id="nameDesa"
                name="nameDesa"
                label="Nombre del Desafio"
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
                label="Descripcion"
                type="text"
                fullWidth
                inputProps={{ maxLength: 200 }}
                variant="outlined"
                value={desafio.description}
                onChange={onChangeData}
                onBlur={() => console.log("onblur")}
                error={desafioValidation.description}
                helperText={desafioValidation.description ? "Es obligatorio" : ''}
              />
              <div className='form-create-desafio-two'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label="Fecha de finalizacion :"
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
                  label="Numero de Repeticiones"
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
              <h2 className=' ctn-user-title-h1'>
                Crea tarjetas de estudio para tu desafio!
              </h2>
              <div>

                {
                  desafioValidation.cards && <div className='message-error'> * Por favor llena todos los campos de las tarjetas</div>
                }
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

                <div className='form-create-desafio-btn'>
                  <button className='btn icon' onClick={enviarCard}><AddCircleIcon /><span>Nueva Tarjeta</span></button>

                </div>
              </div>

            </div>


          </div>

        </div>
      </div>




      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert
          onClose={handleClose1}
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

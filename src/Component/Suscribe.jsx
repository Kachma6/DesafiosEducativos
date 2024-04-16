import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { suscribeDesafio } from '../apis/UserApi'
import { AlertStatus } from './AlertStatus';
import '../assets/Suscribe.css';

export const Suscribe = ( { update = ()=>{console.log("Actualizando")}} ) => {
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const { user_id } = useParams();
  const [code, setCode] = useState('');
  const [showAlert, setShowAlert] = useState({
    type: '',
    message: ''
  })

  const handleForm = async (e) => {
    console.log("entro aqui")
    e.preventDefault();


    if (code === '') {
      console.log("entra a codigo vacio")
      setShowAlert({
        type: 'info',
        message: 'No ha introducido un codigo valido!'
      });
      setOpenAlert(true)

    } else {
      let data = {
        code: code,
        user: {
          id: user_id,
          rol: "USER"
        }
      }
      const response = await suscribeDesafio(data);
      if (response.status == 200) {
        setShowAlert({
          type: 'success',
          message: 'Se ha inscrito correctamente a este desafio!'
        })
        setOpenAlert(true)
        update();

      } else {
        setShowAlert({
          type: 'error',
          message: 'Ha ocurrido un error vuelve a intentarlo'
        })
        setOpenAlert(true)
      }
    }
    setOpenModal(false);
    setCode('');
  }
  
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  return (
    <React.Fragment>

      <div className='ctn-suscribe'>
        <div className='ctn-suscribe-title'>Se parte de un desafio de aprendizaje!</div>
        <button className='btn-suscribe' onClick={()=>setOpenModal(true)}>
          <span>Inscribirse</span>
        </button>
        {/* <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert
            onClose={handleCloseAlert}
            severity={showAlert.type}
            sx={{ width: '100%' }}
          >
            {showAlert.message}
          </Alert>
        </Snackbar> */}
        <AlertStatus open={openAlert}  status={showAlert.type} message={showAlert.message}/>
      </div>

      <Dialog
        open={openModal}
        onClose={()=>setOpenModal(false)}
      >
        <DialogTitle>Inscribirse a un Desafio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa el codigo para ser parte del desafio de aprendizaje.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Codigo"
            label="Codigo"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={code}
            onChange={(e)=>setCode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <button className='btn secondary' onClick={()=>setOpenModal(false)}>Cancelar</button>
          <button className='btn' type="submit" onClick={handleForm}>Inscribirse</button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
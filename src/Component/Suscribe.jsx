import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { suscribeDesafio} from '../apis/UserApi'
import { useParams } from 'react-router-dom';
import '../assets/Suscribe.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
export const Suscribe = () =>{
  const [open, setOpen] = useState(false);
  const {user_id} = useParams();
  const [codigo, setCodigo] = useState('');
  const [estadoPeticion, setEstadoPeticion] = useState(true)
  const [open1, setOpen1] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleForm = async (e) => {
    console.log("entro aqui")
    e.preventDefault();
    let data = {
        code:codigo,
        user:{
             id: user_id,
             rol:"USER"
        }
    }
    
    const response = await suscribeDesafio(data);
    console.log(response)
    if(response.status == 200){
      setEstadoPeticion(true);
      setOpen1(true)

    }else{
      setEstadoPeticion(false);
      setOpen1(true)

      console.log(response.status)
    }
    setOpen(false);
    setCodigo('');
}
  const handleClose = () => {
    setOpen(false);
    
  };




  
 
  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };
  return (
    <React.Fragment>

      <div className='ctn-suscribe'>
        <div className='ctn-suscribe-title'>Se parte de un desafio de aprendizaje!</div>
       
        <button className='btn-suscribe' onClick={handleClickOpen}>
         
          <span>Inscribirse</span>       
        </button>
        <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert
          onClose={handleClose1}
          severity={ estadoPeticion? "success":"error"}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {estadoPeticion? "Se ha inscrito al desafio correctamente.":  "Ya esta inscrito, u ocurrio algun problema."}
        </Alert>
      </Snackbar>
      </div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
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
            defaultValue={codigo}
            onChange={(e)=>setCodigo(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <button className='btn' type="submit" onClick={handleForm}>Inscribirse</button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
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
import imagen from '../Images/suscribe2.svg'
export default function Suscribe() {
  const [open, setOpen] = React.useState(false);
  const {user_id} = useParams();
  const [codigo, setCodigo] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleForm = async (e) => {
    console.log("entro aqui")
    e.preventDefault();
    let data = {
        "code":codigo,
        "user":{
            "id": user_id
        }
    }
    
    const response = await suscribeDesafio(data);
   
    setOpen(false);
    setCodigo('');
}
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>

      <div className='ctn-suscribe'>
        <div>Se parte de un desafio de aprendizaje!</div>
        <div className='ctn-imagen'></div>
        <button className='btn' onClick={handleClickOpen}>
          Inscribirse
        </button>
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
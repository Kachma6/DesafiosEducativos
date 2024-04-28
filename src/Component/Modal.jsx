import  React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MenuItem from '@mui/material/MenuItem';
export default function AlertDialog({action, icon}) {
  const [openModal, setOpenModal] = useState(false);
  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleConfirm = () => {
    action();
    setOpenModal(false)
    
}
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <React.Fragment>
   
      <div onClick={handleClickOpen}>
        {icon}
      </div>
      
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Abandonar Repaso"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              Esta seguro de abandonar el repaso que esta realizando!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleConfirm} autoFocus>
            Abandonar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
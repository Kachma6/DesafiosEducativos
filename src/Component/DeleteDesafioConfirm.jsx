import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
export default function AlertDialog({ eliminar, idDesafio, type }) {
  const [openModal, setOpenModal] = useState(false);
  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleConfirm = () => {

    eliminar();
    setOpenModal(false)

  }
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <React.Fragment>
      {
        type === 1 ?
          <MenuItem className='menu-item' onClick={handleClickOpen}>

            <DeleteForeverIcon />
            <span>Eliminar</span>


          </MenuItem> :
          <MenuItem className='menu-item' onClick={handleClickOpen}>
            Abandonar
          </MenuItem>
      }


      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {
        type === 1 ?
          "Eliminar desafío" :
          "Abandonar desafío"
      }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {
        type === 1 ?
          "¿Esta seguro de eliminar el desafío seleccionado?" :
          "¿Esta seguro de Abandonar el desafío seleccionado?"
      }
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleConfirm} autoFocus>
          {
        type === 1 ?
          "Eliminar" :
          "Abandonar"
      }
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
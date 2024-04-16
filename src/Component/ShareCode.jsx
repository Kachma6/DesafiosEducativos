import React ,{useState} from 'react';

import ShareIcon from '@mui/icons-material/Share';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Avatar from '@mui/material/Avatar';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs( {code}) {
  const [open, setOpen] = React.useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
  };
  return (
    <React.Fragment>
      <MenuItem className='menu-item' onClick={handleClickOpen}>
             <ShareIcon/> <span>Compartir</span>
            
      </MenuItem>
      <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
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
                  <TextField
                    value={code}
                    fullWidth
                    margin='none'
                    size='small'
                  />
                  <CopyToClipboard text={code} onCopy={onCopyText}>
                    <Avatar variant="square"><ContentCopyIcon /></Avatar>
                  </CopyToClipboard>

                </div>
                {copyStatus && <p>El codigo se ha copiado!</p>}
              </DialogContent>
            </BootstrapDialog>
    </React.Fragment>
  );
}

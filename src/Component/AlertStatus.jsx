import React,{useEffect, useState} from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
export const AlertStatus = ( { open ,  status , message}) => {
    const openA = open;
    const [openAlert, setOpenAlert] = useState(openA);
    useEffect(()=>{
        setOpenAlert(open)
    }, [open])
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
      };
  return (
    <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert
          onClose={handleCloseAlert}
          severity={status}
        
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
  )
}

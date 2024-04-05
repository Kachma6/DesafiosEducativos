import React, { useState } from 'react'
import { Menu, Header,DesafioCreated, Suscribe} from '../Component'

import { useNavigate, useParams } from 'react-router-dom';
import { deleteCreateDesafio } from '../apis/DesafiosApi';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CircularProgress from '@mui/material/CircularProgress';
import { colorsSet } from '../assets/colors.js';
import { useFetchDesafios } from '../Hooks/useFetchDesafios.js';
export const MisDesafios = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { user_id } = useParams();
  const navigate = useNavigate();
  const { listDesafiosCreated, isLoading} = useFetchDesafios(user_id);
  const [estadoPeticion, setEstadoPeticion] = useState(true)
  const [open1, setOpen1] = useState(false);

  const eliminar = async (id) => {
    const response = await deleteCreateDesafio(id);
    console.log("eliminandoooooooooooo", id)
    if(response.status === 200){
      setEstadoPeticion(true);
      setOpen1(true)
      useFetchDesafios(user_id);
    }else{
      if(response.status === 403 || response.code ==='ERR_NETWORK'){
        setEstadoPeticion(false);
        setOpen1(true)
      }
    }
   

  }
  const crearDesafio = () => {
    navigate(`/${user_id}/mis-desafios/create`);
  }
  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen1(false);
  };
  const randomNumberInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
 
  return (
    <div className='ctn-home-page'>

      <div className='ctn-header'>
        <Header user={user}/>
      </div>
      <div className='ctn-dashboard'>
        <div className='ctn-navegacion' id='menuIcon'>
          <Menu estado={2} />
          
        </div>
        <div className='ctn-user'>
          <div className='ctn-user-title'>
            <h2 className='ctn-user-title-h1'>Mis Desafios</h2>
            <div onClick={crearDesafio}>
              <Avatar  sx={{ bgcolor:"black" }}>
              <AddBoxIcon/>
              </Avatar>
                
              
            </div>
            {/* <button className='btn' onClick={crearDesafio}>Crear Nuevo Desafio</button> */}
          </div>
          <div className='ctn-user-body'>
            <div className='ctn-user-container-grid'>
            <Suscribe />
            {
              isLoading &&
              <CircularProgress /> 
            
            }
            
              {
                listDesafiosCreated.length&&listDesafiosCreated.map((desa) => <DesafioCreated key={desa.id} desafio={desa} color={colorsSet[randomNumberInRange(0,25)]} eliminar={() => eliminar(desa.id)} />)
              }
           
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
          {estadoPeticion ? "El desafio se ha borrado correctamente" : "Lo sentimos mucho, ocurrio un error"}
        </Alert>
      </Snackbar>
    </div>
  )
}

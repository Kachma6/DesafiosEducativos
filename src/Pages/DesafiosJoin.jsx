import React, { useEffect, useState } from 'react'
import { Menu } from '../Component/Menu'
import { useParams } from 'react-router-dom';
import { Header } from '../Component/Header';
import { getDesafiosJoinByUserId} from '../apis/DesafiosApi';
import { desuscribeDesafio } from '../apis/UserApi.js';
import {Suscribe} from '../Component/Suscribe.jsx';
import { DesafioShow } from '../Component/DesafioShow.jsx';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { colorsSet } from '../assets/colors.js';
export const DesafiosJoin = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { user_id } = useParams();
  const [listDesafiosJoin, setListDesafiosJoin] = useState([])
  useEffect(() => {
    getDesafios();

  }, [])
  const [estadoPeticion, setEstadoPeticion] = useState(true)
  const [open1, setOpen1] = useState(false);

  const getDesafios = async () => {
    const data = await getDesafiosJoinByUserId(user_id);
    setListDesafiosJoin(data);
    console.log(data)
  }
  const abandonar = async (id) => {
    const response = await desuscribeDesafio(id);
    console.log("eliminandoooooooooooo", id)
    console.log(response)
    if(response.status === 200){
      setEstadoPeticion(true);
      setOpen1(true)
      getDesafios();
    }else{
      if(response.status === 403 || response.code ==='ERR_NETWORK'){
        setEstadoPeticion(false);
        setOpen1(true)
      }
    }
   

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
        <Header user={user} />
      </div>
      <div className='ctn-dashboard'>
        <div className='ctn-navegacion' id='menuIcon'>
          <Menu estado={1} />
         
        </div>
        <div className='ctn-user'>
          <div className='ctn-user-title'>
            <h2>Desafios por terminar!</h2>
           
          </div>
          <div className='ctn-user-body'>
            <div className='ctn-user-container-grid'>
              <Suscribe/>
            {listDesafiosJoin.length > 0
            ?listDesafiosJoin.map((desa, index) => <DesafioShow key={index} desafio={desa} abandonar={() => abandonar(desa.id)} color={colorsSet[randomNumberInRange(0,25)]} />)
            :<div>No hay Desafios</div>
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

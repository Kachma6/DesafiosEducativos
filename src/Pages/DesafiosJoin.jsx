import React, { useEffect, useState } from 'react'
import { Menu , Suscribe, Header, DesafioShow} from '../Component'
import { useParams } from 'react-router-dom';
import { getDesafiosJoinByUserId} from '../apis/DesafiosApi';
import { desuscribeDesafio } from '../apis/UserApi.js';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { getColor } from '../assets/colors.js';
import { AlertStatus } from '../Component/AlertStatus.jsx';
import dayjs from 'dayjs';
export const DesafiosJoin = () => {
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
  const isTodayTheLastRep = (listReps) => {

    for(let i = 0; i< listReps.length;i++){

      console.log(listReps[i].dateRep[0] ===dayjs().year() &&  listReps[i].dateRep[1] === dayjs().month() && listReps[i].dateRep[2] === dayjs().date())
      if( listReps[i].dateRep[0] ===dayjs().year() &&  listReps[i].dateRep[1] === dayjs().month()+1 && listReps[i].dateRep[2] === dayjs().date() ){
        console.log("hola")
        return false;
      }
    }
    return true;
  }
  
  return (
    <div className='ctn-home-page'>

      <div className='ctn-header'>
        <Header />
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
              <Suscribe update={()=>getDesafios()}/>
            {listDesafiosJoin.length > 0
            ?listDesafiosJoin.map((desa, index) => <DesafioShow key={index} desafio={desa} abandonar={() => abandonar(desa.id)} color={getColor()}  isAvailable = { isTodayTheLastRep(desa.repsDesa)}/>)
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
      <AlertStatus open={false} status='success' message={"mensaje"}/>
    </div>
  )
}

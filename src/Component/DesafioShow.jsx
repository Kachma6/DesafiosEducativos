import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../assets/DesafioShow.css'
import { BarraRepasos } from './BarraRepasos';
import dayjs from 'dayjs';
import DeleteDesafioConfirm from '../Component/DeleteDesafioConfirm'
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DateRangeIcon from '@mui/icons-material/DateRange';
export const calculateStateString = (date,desafio) => {
    
    const tomorrow = dayjs(date).add(1,'day');
    
    if ( tomorrow.isBefore(dayjs()) || !isComplete(desafio)) {
        return 'Finalizado'
    } else {
        return 'En proceso'
    }

};
export const isComplete = (desafio) => {
   
    if(desafio.repsDesa.length >= desafio.desaCreated.numRep){
        return false;
    }
    return true;
}
export const DesafioShow = ({ desafio, abandonar, color, isAvailable }) => {
    const { user_id } = useParams();
    const navigate = useNavigate();
   
    const [status, setStatus] = useState([
        "En proceso", "Terminado"
    ])
    // Menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // ---------------------
    const calculateState = () => {
        let date = dayjs(desafio.desaCreated.finishedDate.slice(0, 10))
        let today = dayjs();
        let days =  Math.ceil((date - today) / (1000 * 3600 * 24));
        if(days <= 0){
            return 0;
        }else{
            return days;
        }
        

    };
  
    
    const isValidDate = (date) => {
        const tomorrow = dayjs(date).add(1,'day');
        if (tomorrow.isBefore(dayjs())) {
            return false
        } else {
            return true
        }

    }
    const repasar = () => {
        handleClose();
        navigate(`/${user_id}/desafios-join/${desafio.id}/desa-created/${desafio.desaCreated.id}`)

    }
    
    return (

        <div className='ctn-desafio' style={{ background: color.back }}>
            <div className='ctn-desafio-info-head'>
                <div className='ctn-state'>{calculateStateString(desafio.desaCreated.finishedDate.slice(0, 10), desafio)}</div>
                <div
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </div>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <DeleteDesafioConfirm eliminar={() => abandonar()} idDesafio={desafio.id} type={2} />
                    {/* <MenuItem className='menu-item' onClick={repasar}>Repasar</MenuItem> */}

                </Menu>
            </div>
            <div className='ctn-desafio-info' style={{ background: color.back }}>


                <div className='ctn-desafio-info-header'>
                    <div className='ctn-desafio-info-title' style={{ color: color.letter }}> {desafio.desaCreated.nameDesa}</div>

                </div>
                <div className='ctn-desafio-info-body'>
                    <div>
                        <div className='info'><span>Creado por : </span>{`${desafio.desaCreated.userCreated.firstName} ${desafio.desaCreated.userCreated.lastName}`}</div>
                        <div className='info'>
                            <span>Fecha finalización : </span>{dayjs(desafio.desaCreated.finishedDate.slice(0, 10)).locale('es').format('DD  MMMM YYYY')}
                        </div>
                    </div>


                    <div className='ctn-letrero' >
                        <div className='letrero' >
                            <div className='letrero-let'>Dias faltantes</div>
                            {/* <div className='letrero-let'></div> */}
                            <div className='letrero-num' style={{ color: color.letter }}>{calculateState()}</div>
                        </div>
                        <div className='letrero' >
                            <div className='letrero-let'>Repasos Faltantes</div>
                            {/* <div className='letrero-let'></div> */}
                            <div className='letrero-num' style={{ color: color.letter }}>{desafio.desaCreated.numRep - desafio.repsDesa.length}</div>
                        </div>
                    </div>


                </div>


                <BarraRepasos repasos={desafio.repsDesa.length} repasosTotal={desafio.desaCreated.numRep} color={color} />

            </div>


            <div className='ctn-desafio-btns'>

                <div>{calculateState() === 1 && "Manana termina el desafio"}</div>

                <div className='ctn-desafio-numbers'>
                    {
                        isAvailable && isComplete(desafio) && isValidDate(desafio.desaCreated.finishedDate.slice(0, 10)) ?
                            <div className='btn' onClick={repasar}>
                                Repasar
                            </div> :
                            <div className='btn disable' >
                            Repasar
                        </div>
                    }


                </div>


            </div>

        </div>
    )
}


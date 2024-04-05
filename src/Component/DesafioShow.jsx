import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../assets/DesafioShow.css'
import { BarraRepasos } from './BarraRepasos';
import dayjs from 'dayjs';
import DeleteDesafioConfirm from '../Component/DeleteDesafioConfirm'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
export const DesafioShow = ({ desafio, abandonar, color }) => {
    const { user_id } = useParams();
    const navigate = useNavigate();


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

        return Math.ceil((date - today) / (1000 * 3600 * 24));

    }
    const calculateStateString = () => {
        if (dayjs(desafio.desaCreated.finishedDate.slice(0, 10)).isBefore(dayjs())) {
            return 'Finalizado'
        } else {
            return 'En proceso'
        }

    }
    const repasar = () => {
        handleClose();
        navigate(`/${user_id}/desafios-join/${desafio.id}/desa-created/${desafio.desaCreated.id}`)

    }

    return (

        <div className='ctn-desafio' style={{ background: color.back }}>
             <div className='ctn-desafio-info-head'>
                    <div className='ctn-state'>{calculateStateString()}</div>
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
                        <MenuItem className='menu-item' onClick={repasar}>Repasar</MenuItem>

                    </Menu>
                </div>
            <div className='ctn-desafio-info' style={{ background: color.back }}>

               
                <div className='ctn-desafio-info-header'>
                    <div className='ctn-desafio-info-title' style={{ color: color.letter }}> {desafio.desaCreated.nameDesa}</div>

                </div>
                <div className='ctn-desafio-info-body'>
                    <div className='info'><span>Creado por : </span>{`${desafio.desaCreated.userCreated.firstName} ${desafio.desaCreated.userCreated.lastName}`}</div>
                    <div className='info'>
                        <span>Fecha finalizacion : </span>{dayjs(desafio.desaCreated.finishedDate.slice(0, 10)).format('DD MMMM YYYY')}
                    </div>
                    <div className='info'>
                        <span>Dias faltantes </span>{calculateState()}
                    </div>

                </div>


                <BarraRepasos repasos={desafio.numReps} repasosTotal={desafio.desaCreated.numRep} color={color} />

            </div>


            <div className='ctn-desafio-btns'>
             
                <div>{calculateState() === 1 && "Manana termina el desafio"}</div>

                <div className='ctn-desafio-numbers'>
                <div className='btn' onClick={repasar}>
                    Repasar
                </div>
                </div>
               

            </div>

        </div>
    )
}

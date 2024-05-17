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

        return Math.ceil((date - today) / (1000 * 3600 * 24));

    }
    const calculateStateString = () => {
        console.log("finalizado " , dayjs(desafio.desaCreated.finishedDate.slice(0, 10)).isBefore(dayjs()) )
        console.log(dayjs(desafio.desaCreated.finishedDate.slice(0, 10)))
        console.log(dayjs().isSame(desafio.desaCreated.finishedDate.slice(0, 10), 'date'))
        console.log("finalizado is today " , dayjs(desafio.desaCreated.finishedDate.slice(0, 10)).isSame(dayjs()) )
        if (dayjs(desafio.desaCreated.finishedDate.slice(0, 10)).isBefore(dayjs()) || !isComplete()) {
            return 'Finalizado'
        } else {
            return 'En proceso'
        }

    }
    const isValidDate = () => {
        if (dayjs(desafio.desaCreated.finishedDate.slice(0, 10)).isBefore(dayjs())) {
            return false
        } else {
            return true
        }

    }
    const repasar = () => {
        handleClose();
        navigate(`/${user_id}/desafios-join/${desafio.id}/desa-created/${desafio.desaCreated.id}`)

    }
    const isComplete = () => {
        console.log(desafio.repsDesa.length)
        console.log(desafio.desaCreated.numRep)
        if(desafio.repsDesa.length >= desafio.desaCreated.numRep){
            console.log("entro")
            return false;
        }
        return true;
    }
    console.log("isAvailable", isAvailable);
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
                            <span>Fecha finalizacion : </span>{dayjs(desafio.desaCreated.finishedDate.slice(0, 10)).format('DD MMMM YYYY')}
                        </div>
                    </div>


                    <div className='ctn-letrero' >
                        <div className='letrero' >
                            <div className='letrero-let'>Dias Faltantes</div>
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
                        isAvailable && isComplete() && isValidDate() ?
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

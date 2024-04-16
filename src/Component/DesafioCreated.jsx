import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../assets/DesafioCreated.css';
import EditIcon from '@mui/icons-material/Edit';
import StyleIcon from '@mui/icons-material/Style';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import dayjs from 'dayjs';
import DeleteDesafioConfirm from '../Component/DeleteDesafioConfirm';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareCode from '../Component/ShareCode'
export const DesafioCreated = ({ desafio, eliminar, color }) => {

  const { user_id } = useParams();
  const navigate = useNavigate();

  const editar = () => {
    handleClose();
    navigate(`/${user_id}/mis-desafios/${desafio.id}`)
  }
  // Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // ---------------------
  const calculateState = () => {
    if (dayjs(desafio.finishedDate.slice(0, 10)).isBefore(dayjs())) {
      return 'Finalizado'
    } else {
      return 'En proceso'
    }

  }


  return (
    <div className='ctn-desafio' style={{ background: color.back }}>
         <div className='ctn-desafio-info-head'>
          <div className='ctn-state'>{calculateState()}</div>
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
               
            <ShareCode code={desafio.code}/>
            
            <MenuItem onClick={editar} className='menu-item'>
              <EditIcon /> <span>Editar</span>
            </MenuItem>

            <DeleteDesafioConfirm eliminar={() => eliminar(desafio.id)} idDesafio={desafio.id} type={1} />



          </Menu>

        </div>
      <div className='ctn-desafio-info' style={{ background: color.back }}>
     
        <div className='ctn-desafio-info-header'>
          <div className='ctn-desafio-info-title' style={{ color: color.letter }}> {desafio.nameDesa}</div>
          

        </div>
        <div className='ctn-desafio-info-body'>
        <span className='info'>{desafio.description}</span>
          <div className='info'><span>Inicio :</span>
            {dayjs(`${desafio.created[0]}-${desafio.created[1]}-${desafio.created[2]}`).locale("es").format('DD MMMM [de] YYYY')}</div>
          <div className='info'><span>Finaliza :</span> {dayjs(desafio.finishedDate.slice(0, 10)).locale("es").format('DD MMMM [de] YYYY')}</div>

        </div>

      </div>
      <div className='ctn-desafio-btns'>



        <div className='ctn-desafio-numbers'>
          <div className='ctn-state'><PersonOutlineIcon /><span>{desafio.numMembers}</span></div>
          <div className='ctn-state'><StyleIcon /><span>{desafio.numCards}</span></div>
        </div>
        


      </div>

    </div>

  )
}

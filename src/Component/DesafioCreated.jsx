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
  const calculateStateDays = () => {
    let date = dayjs(desafio.finishedDate.slice(0, 10))
    let today = dayjs();

    return Math.ceil((date - today) / (1000 * 3600 * 24));

  }
  console.log(desafio)
  return (
    <div className='cctn-desafio' style={{ background: color.back }}>
      <div className='cctn-desafio-info-head'>
        <div className='cctn-state'>{calculateState()}</div>
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

          <ShareCode code={desafio.code} />

          <MenuItem onClick={editar} className='menu-item'>
            <EditIcon /> <span>Editar</span>
          </MenuItem>

          <DeleteDesafioConfirm eliminar={() => eliminar(desafio.id)} idDesafio={desafio.id} type={1} />



        </Menu>

      </div>
      <div className='cctn-desafio-info' style={{ background: color.back }}>

        <div className='cctn-desafio-info-header'>
          <div className='cctn-desafio-info-title' style={{ color: color.letter }}> {desafio.nameDesa}</div>
          {/* <span className='info'>{desafio.description}</span> */}

        </div>
        <div className='cctn-desafio-info-body'>

          <div>

            <div className='info'><span>Inicio : </span>
              {dayjs(`${desafio.created[0]}-${desafio.created[1]}-${desafio.created[2]}`).locale("es").format('DD MMMM [de] YYYY')}</div>
            <div className='info'><span>Finaliza : </span> {dayjs(desafio.finishedDate.slice(0, 10)).locale("es").format('DD MMMM [de] YYYY')}</div>
          </div>

        </div>

      </div>
      <div className='cctn-desafio-btns'>



        {/* <div className='cctn-desafio-numbers'>

          <div className='cctn-state state'><span>{desafio.numMembers}</span></div>
          <div className='cctn-state state'><span>{desafio.numCards}</span></div>

        </div> */}

        <div className='cctn-letrero' >
          <div className='cletrero' >
            <div className='cletrero-let'><PersonOutlineIcon style={{ color: color.letter }} /></div>

            <div className='cletrero-num' style={{ color: color.letter }}>{desafio.numMembers}</div>
          </div>
          <div className='cletrero' >
            <div className='cletrero-let'><StyleIcon style={{ color: color.letter }} /></div>

            <div className='cletrero-num' style={{ color: color.letter }}>{desafio.numCards}</div>
          </div>
          <div className='cletrero' >
            <div className='letrero-let' style={{ color: color.letter }}>Dias Faltantes</div>

            <div className='cletrero-num' style={{ color: color.letter }}>{calculateStateDays()}</div>
          </div>
          <div className='cletrero' >
            <div className='letrero-let' style={{ color: color.letter }}>Total Repasos</div>

            <div className='cletrero-num' style={{ color: color.letter }}>{desafio.numRep}</div>
          </div>
        </div>

      </div>

    </div>

  )
}

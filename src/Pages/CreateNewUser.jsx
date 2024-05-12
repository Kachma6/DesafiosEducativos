import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { createNewUser } from '../apis/UserApi';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import '../assets/CreateNewUser.css';
import { AlertStatus } from '../Component';
import { getColor } from '../assets/colors';
const valuesOfReps = [
    {
      value: "Mujer"
    },
    {
      value: "Hombre"
    },
    {
        value: "Prefiero no mencionar"
    }
    
  ]
export const CreateNewUser = () => {
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        gender: 1
    })
    const [newUserValidation, setNewUserValidation] = useState({
        firstName: false,
        lastName: false,
        username: false,
        email: false,
        password: false
    })
    const [ alert , setAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [color, setColor] = useState(getColor());
    const handleChanges = (e) => {
        const { name, value } = e.target
        setNewUser({
            ...newUser, [name]: value
        })
        changeIsValid(name, value)
    }
    const handleOnBlur = (e) => {
        const { name, value } = e.target
        changeIsValid(name, value)
    }
    const changeIsValid = (name, value) => {
        console.log(name)
        if (value === '') {
            setNewUserValidation({ ...newUserValidation, [name]: true })
        } else {
            if (name === 'password') {
                if (value.length < 9) {
                    setNewUserValidation({ ...newUserValidation, [name]: true })
                    console.log("entra a password")
                } else {
                    setNewUserValidation({ ...newUserValidation, [name]: false })
                }


            } else {
                console.log("nooooooooo entra a password")
                setNewUserValidation({ ...newUserValidation, [name]: false })
            }
        }
    }
    const handleSubmit = async () => {
        if (valido() && validoTodo()) {
            setLoading(true)
            const response = await createNewUser(newUser)
            setLoading(false)
            console.log(response);
            if (response.code === 'ERR_BAD_REQUEST' || response.code === 'ERR_NETWORK') {
                setAlert(false )
                console.log("algo salio mal", alert)
                
                setAlert(true)
            } else {
                if (response.id !== null) {
                    localStorage.setItem('user', JSON.stringify(response));
                    navigate(`/${response.id}/desafios-join`, { replace: true })
                }
            }


            console.log("envio")
        } else {
            console.log("no envio")
        }

        
    }
    const valido = () => {

        for (let clave in newUserValidation) {
            console.log(clave)
            if (newUserValidation[clave] === true) {
                return false;
            }

        }
        return true;
    }
    const validoTodo = () => {

        for (let clave in newUser) {
            console.log(clave)
            if (newUser[clave] === '') {
                setNewUserValidation({ ...newUserValidation, [clave]: newUserValidation[clave] = true })
                return false;
            }

        }
        return true;
    }
    const handleCancelar = () => {
        navigate(-1);
    }
    console.log(newUser)
    return (
        <div className='ctn-home-page'>
          <div className='ctn-header'>
        <div className='ctn-header-component'>
          <div className='ctn-icon'>
            <p className='icon uno'>M</p>
            <p className='icon dos'>e</p>
            <p className='icon tres'>m</p>
            <p className='icon cuatro'>o</p>
          </div>
        </div>
      </div>
      <div className='ctn-login-page'>
        <div className='ctn-login-page-form'>
          <div className='login-page-register'  >
          
                <div className='ctn-form-text'>
                    <div>Regístrate ahora</div>
                    <div>Aprende mientras juegas</div>
                </div>

                <TextField
                    className='input'
                    label="Nombre"
                    variant="standard"
                    name="firstName"
                    margin='normal'
                    value={newUser.firstName}
                    onChange={handleChanges}
                    onBlur={handleOnBlur}
                    error={newUserValidation.firstName}
                    helperText={newUserValidation.firstName && "Campo Obligatorio"}
                    required />

                <TextField
                    className='input'
                    label="Apellidos"
                    variant="standard"
                    name="lastName"
                    margin='normal'
                    value={newUser.lastName}
                    onChange={handleChanges}
                    onBlur={handleOnBlur}
                    error={newUserValidation.lastName}
                    helperText={newUserValidation.lastName && "Campo Obligatorio"}
                    required />

                <TextField
                    className='input'
                    label="Nombre de usuario"
                    variant="standard"
                    name="username"
                    margin='normal'
                    value={newUser.username}
                    onChange={handleChanges}
                    onBlur={handleOnBlur}
                    error={newUserValidation.username}
                    helperText={newUserValidation.username && "Campo Obligatorio"}
                    required />

                <TextField
                    className='input'
                    label="Correo Electronico"
                    variant="standard"
                    name='email'
                    type='email'
                    margin='normal'
                    value={newUser.email}
                    onChange={handleChanges}
                    onBlur={handleOnBlur}
                    error={newUserValidation.email}
                    helperText={newUserValidation.email && "Campo Obligatorio"}
                    required />

                <TextField
                    className='input'
                    label="Contraseña"
                    margin='normal'
                    variant="standard"
                    type='password'
                    name='password'
                    value={newUser.password}
                    onChange={handleChanges}
                    onBlur={handleOnBlur}
                    error={newUserValidation.password}
                    helperText={newUserValidation.password && "Minimo 8 caracteres"}
                    required 
                />
                  <TextField
                  id="standard-select-currency"
                  select
                  fullWidth
                  name='gender'
                  label="Genero"
                  margin='normal'
                  variant='standard'
                  value={newUser.gender}
                  onChange={handleChanges}
                >
                  {valuesOfReps.map((option, index) => (
                    <MenuItem key={index} value={index}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>


                <div className='ctn-display'>
                <button className='btn' onClick={handleCancelar}>Cancelar</button>
                <button className='btn' onClick={handleSubmit}>Crear</button>
                {/* {
                    loading&&<CircularProgress color="inherit" />
                } */}
                </div>
                
                
                

           
          </div>
        </div>
        <div className='login-page-header'>
          <div className='login-page-header-content'>
            <div className='ctn-icon-login'>
              <div className='icon uno'>M</div>
              <div className='icon dos'>e</div>
              <div className='icon tres'>m</div>
              <div className='icon cuatro'>o</div>
            </div>
            <div className='ctn-icon-login-text'>Diviertate y desafiate mientras aprendes con el metodo Active Recall!</div>
          </div>

          {/* <div>
          <img src={imagen} style={{width:"80%"}}></img>
        </div> */}

        </div>
      </div>
           
         

            <AlertStatus open={alert} message={'No se ha registrado el usuario'} status={'error'}/>
        </div>
    )
}

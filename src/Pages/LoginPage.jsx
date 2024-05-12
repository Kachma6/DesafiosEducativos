import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { autenticate } from '../apis/UserApi';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from '../Images/logo.png'
import { getColor } from '../assets/colors';
import '../assets/LoginPage.css'
import imagen from '../Images/login2.png'

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showUserNotFound, setUserNotFound] = useState('');
  const [color, setColor] = useState(getColor());
  const [login, setLogin] = useState({
    username: {
      value: '',
      error: false,
      errorMessage: ''

    },
    password: {
      value: '',
      error: false,
      errorMessage: ''
    }
  })
  const navigate = useNavigate()
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (login.username.value === '' || login.password.value === '') {
      setLogin({ username: { ...login.username, error: true, errorMessage: "Campo obligatorio" }, password: { ...login.password, error: true, errorMessage: "Campo obligatorio" } })
    } else {
      try {
        const user = await autenticate(login.username.value, login.password.value);
        if (user.status === 403 || user.code === "ERR_NETWORK" || user.code === "ERR_BAD_REQUEST"
        ) {
          setUserNotFound("Llene los campos correctamente.")
        } else {
          if (user.status === 200) {
            navigate(`${user.data.id}/desafios-join`);
            localStorage.setItem('user', JSON.stringify(user.data));
          }

        }

      } catch (error) {

        setUserNotFound("Ocurrio un problema, intente otra vez")
      }

    }
  };
  const handleTextField = (e) => {
    setColor(getColor())
    const { name, value } = e.target;
    setUserNotFound('');
    if (e.target.value === '') {
      setLogin({ ...login, [name]: { ...login[name], error: true, value: value, errorMessage: "Campo Obligatorio" } })
      console.log("entra")
    } else {
      setLogin({ ...login, [name]: { ...login[name], error: false, value: value, errorMessage: '' } })
    }

  }

  return (

    <div className='ctn-home-page' >
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
          <div className='login-page' style={{ background: color.back }} >
            <form onSubmit={handleSubmit}>
              <div className='login-page-title' style={{ color: color.letter }}>Iniciar Sesión</div>
              <TextField
                className='input'
                label="Username"
                variant="standard"
                name='username'
                error={login.username.error}
                helperText={login.username.errorMessage}
                onChange={handleTextField}
                value={login.username.value} />
              <FormControl className='input' variant='standard'>
                <InputLabel htmlFor="standard-adornment-password" error={login.password.error}>Contraseña</InputLabel>
                <Input
                  id="standard-adornment-password"
                  onChange={handleTextField}
                  name='password'
                  error={login.password.error}
                  value={login.password.value}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                <FormHelperText id="component-helper-text" error={login.password.error}>
                  {login.password.errorMessage}
                </FormHelperText>
              </FormControl>


              <div>{showUserNotFound}</div>
              <div className='ctn-btns'>
                <button style={{ background: color.letter }} className='btn' type='submit' onClick={handleSubmit}>Iniciar Sesión</button>

              </div>

            </form>

            <p className='text-register'>No tienes una cuenta?</p>
            <Link className='link text-register' to={'/create-count'}>Registrate</Link>







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
            <div className='ctn-icon-login-text'>Diviertate y desafiate mientras aprendes con el método Active Recall!</div>
          </div>

          {/* <div>
          <img src={imagen} style={{width:"80%"}}></img>
        </div> */}

        </div>
      </div>

    </div>

  )
}

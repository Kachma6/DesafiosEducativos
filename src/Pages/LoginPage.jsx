import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { autenticate } from '../apis/UserApi';
import TextField from '@mui/material/TextField';
import '../assets/LoginPage.css'

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await autenticate(username, password)
      if (username === user.username && password === user.password) {
        navigate(`${user.id}/mis-desafios`);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        // console.log("No es igual")
      }
      console.log(user);

    } catch (error) {
      console.log("error")
    }


  };
  return (

    <div className='ctn-login-page'>
     <div className='login-page'> 
      <form onSubmit={handleSubmit}>
      <div className='login-page-title'>Iniciar Sesión</div>
      <TextField
        className='input'
        label="Username"
        variant="standard"
        onChange={(e) => setUsername(e.target.value)}
        value={username} />
      


      <FormControl className='input'  variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
        <Input
          id="standard-adornment-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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
      </FormControl>

      <button className='btn' type='submit' onClick={handleSubmit}>Iniciar Sesión</button>

      </form>
     
        <p className='text-register'>No tienes una cuenta?</p>
      <Link className='link text-register' to={'/create-count'}>Registrate</Link>

      

    



      </div> 
    </div>

  )
}

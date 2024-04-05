import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { autenticate } from '../apis/UserApi';
import TextField from '@mui/material/TextField';
import '../assets/LoginPage.css'
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showUserNotFound, setUserNotFound] = useState('');
  const [ login, setLogin] = useState({
    username:{
      value:'',
      error:false,
      errorMessage:''

    },
    password:{
      value:'',
      error:false,
      errorMessage:''
    }
  })
  const navigate = useNavigate()
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleSubmit = async (e) => {
    e.preventDefault();

  
      try {
        const user = await autenticate(login.username.value, login.password.value);
        console.log("user de login", user)
        if (user.status === 403 || user.code === "ERR_NETWORK" || user.code === "ERR_BAD_REQUEST"
        ) {
           console.log("algo salio mal")
           setLogin({...login, [username]:{...login[username], error:true,errorMessage:'Por favor lleno los campos'}})
           setLogin({...login, [password]:{...login[password], error:true,errorMessage:'Por favor llene el campo'}})
           setUserNotFound("Llene los campos correctamente.")
        } else {
          if(user.status === 200){
            console.log("autenticado")
            navigate(`${user.data.id}/desafios-join`);
           localStorage.setItem('user', JSON.stringify(user.data));
          }
         
        }
  
      } catch (error) {
        console.log("error")
       setUserNotFound("Llene los campos correctamente.")
      }
  
    

 

  };
  const handleTextField = (e) => {
    const { name, value} = e.target;
    setUserNotFound('');
    if(e.target.value === ''){
      setLogin({...login, [name]:{...login[name], error:true, value:value,errorMessage:`Por favor llenar el campo ${name}`}})
      console.log("entra")
    }else{
      setLogin({...login, [name]:{...login[name], error:false ,value:value}})
    }
   
  }
  console.log(login);
  return (

    <div className='ctn-login-page'>
     <div className='login-page'> 
      <form onSubmit={handleSubmit}>
      <div className='login-page-title'>Iniciar Sesión</div>
      <TextField
        className='input'
        label="Username"
        variant="standard"
        name='username'
        error={login.username.error}
        helperText={login.username.errorMessage}
        onChange={handleTextField}
        value={login.username.value} />
        
      


      <FormControl className='input'  variant="standard">
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
      <button className='btn' type='submit' onClick={handleSubmit}>Iniciar Sesión</button>

      </form>
     
        <p className='text-register'>No tienes una cuenta?</p>
      <Link className='link text-register' to={'/create-count'}>Registrate</Link>

      

    



      </div> 
    </div>

  )
}

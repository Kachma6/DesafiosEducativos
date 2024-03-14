import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { createNewUser } from '../apis/UserApi';
import { useNavigate } from 'react-router-dom';
export const CreateNewUser = () => {
    const [ newUser, setNewUser] = useState({
        firstName:'',
        lastName:'',
        username:'',
        email:'',
        password:''
    })
    const navigate = useNavigate();
    const handleFirstName = (e) => {
        setNewUser({
            ...newUser, firstName: e.target.value
        })
    }
    const handleLastName = (e) => {
        setNewUser({
            ...newUser, lastName: e.target.value
        })
    }
    const handleUsername = (e) => {
        setNewUser({
            ...newUser,username: e.target.value
        })
    }
    const handleEmail = (e) => {
        setNewUser({
            ...newUser, email: e.target.value
        })
    }
    const handlePassword = (e) => {
        setNewUser({
            ...newUser, password: e.target.value
        })
    }
   
    const handleSubmit =  async () => {
        const response = await createNewUser(newUser)
        console.log(response);
        navigate(`/${response.id}/mis-desafios`,{ replace:true})
    }
    const handleCancelar = () => {
        navigate(-1);
    }
    console.log(newUser)
  return (
    <div>
         <TextField 
         className='input' 
         label="Nombre" 
         variant="outlined" 
         value={newUser.firstName}
         onChange={handleFirstName}
         required  />
       
         <TextField 
         className='input' 
         label="Apellidos" 
         variant="outlined" 
         value={newUser.lastName}
         onChange={handleLastName}
         required />

         <TextField 
         className='input' 
         label="Nombre de usuario" 
         variant="outlined" 
         value={newUser.username}
         onChange={handleUsername}
         required />

         <TextField 
         className='input' 
         label="Correo Electronico" 
         variant="outlined" 
         value={newUser.email}
         onChange={handleEmail}
         required />

         <TextField 
         className='input' 
         label="Contraseña" 
         variant="outlined" 
         type='password'
         value={newUser.password}
         onChange={handlePassword}
         required/>
         
         <button onClick={handleCancelar}>Cancelar</button>
         <button onClick={handleSubmit}>Crear</button>


    </div>
  )
}

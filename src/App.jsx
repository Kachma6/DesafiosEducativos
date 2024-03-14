
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './Pages/LoginPage'
import { HomePage } from './Pages/HomePage'

import { NoPage } from './Pages/NoPage'
import { MisDesafios } from './Pages/MisDesafios'
import { DesafiosJoin } from './Pages/DesafiosJoin'
import { RepasoDesafio } from './Pages/RepasoDesafio'
import { FormCreateDesafio } from './Pages/FormCreateDesafio'
import { CreateNewUser } from './Pages/CreateNewUser'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/:user_id' element={<HomePage />} />
        {/* <Route path='home' element={} /> */}
        <Route path='/' element={<LoginPage />} />
        <Route path='/create-count' element={<CreateNewUser/>}/>
        <Route path='*' element={<NoPage />} />
        <Route path='/:user_id/mis-desafios' element={<MisDesafios/>}/>
        <Route path='/:user_id/mis-desafios/create' element={<FormCreateDesafio/>}/>
        <Route path='/:user_id/mis-desafios/:desafio_id' />
        <Route path='/:user_id/desafios-join' element={<DesafiosJoin/>}/>
        <Route path='/:user_id/desafios-join/:desafio_id' element={<RepasoDesafio/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

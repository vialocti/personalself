import React from 'react'

import {BrowserRouter, Routes, Route}from 'react-router-dom'

import NavBar from '../components/NavBar'
import HomePage from '../pages/HomePage'
import HorariosPage from '../pages/HorariosPage'


import HorariosAreaPage from '../pages/HorariosAreaPage'
//import Login from '../components/Login'
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'
import CambiarClave from '../components/CambiarClave'
import LoginPage from '../pages/LoginPage'



const RoutesAsistencia = () => {
 
  
  return (
    <BrowserRouter>
        
        <NavBar />
        
        <Routes>
            <Route path='/' element={<PublicRoutes/>}>
              <Route index element={<HomePage/>} />
              <Route exact path='/login' element={<LoginPage />} />
            </Route>
            <Route path='/asistencia' element={<PrivateRoutes/>}>
              <Route index element={<HorariosPage/>} />
              <Route exact path ='/asistencia/asistenciaArea' element={<HorariosAreaPage/>} />
              <Route exact path='/asistencia/cambiarclave' element={<CambiarClave/>}/>
            </Route>
        
        </Routes>
    </BrowserRouter>
  )
}

export default RoutesAsistencia
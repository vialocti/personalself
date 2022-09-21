import React from 'react'
import {BrowserRouter, Routes, Route}from 'react-router-dom'

import NavBar from '../components/NavBar'
import HorariosPage from '../pages/HorariosPage'

const RoutesAsistencia = () => {
  return (
    <BrowserRouter>
        
        <NavBar />
        
        <Routes>
            <Route exact path='/asistenciaself' element={<HorariosPage/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default RoutesAsistencia
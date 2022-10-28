
import React, { useContext, useEffect } from 'react'
import { NavLink} from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import '../css/NavBar.css'


const NavBar = () => {
  
    const {isLoged,logout,nombre} = useContext(AuthContext)
      
  

 useEffect(()=>{
    
    logout()
    

 },[logout])

 

     return (
   
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
            <div className="navbar-brand logo"><img id="imgb" src={require('../logo-economicas.png')} alt="FCE"/></div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className=" navbar-inverse navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                       
                       <li className="nav-item"><NavLink to="/asistencia" className="nav-link">Asistencia Personal </NavLink></li>
                       <li className="nav-item"><NavLink to="/asistencia/asistenciaArea" className="nav-link">Asistencia Area</NavLink></li>
                       <li className="nav-item"><NavLink to="/asistencia/cambiarclave" className="nav-link">Cambiar Password</NavLink></li>
                       <li className='nav-item'><NavLink to="/asistencia/virtual" className="nav-link">Asistencia Virtual</NavLink></li>
                       {!isLoged?
                       <li className="nav-item"><NavLink to ="/login"className="nav-link">Login</NavLink> </li>     
                       :<li className="nav-item"><button className="nav-link btn btn-info" onClick={logout}>Logout</button></li>}
                       </div>
                </div>
                <div>
                    {isLoged?<div className="fw-bold">{nombre}</div>:null}
                </div>
            </div>
        </nav>
     
   
      
         
  )
}

export default NavBar
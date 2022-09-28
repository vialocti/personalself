
import React, { useContext, useState,useEffect } from 'react'
import { NavLink} from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import '../css/NavBar.css'


const NavBar = () => {
  
    const {login,logout,isLoged} = useContext(AuthContext)
    const [leg, setLeg] = useState('')
    const [nrod, setNrod] = useState('')  
  
  

 useEffect(()=>{
    
    logout()
    

 },[logout])

  const onHandleSubmit =()=>{
       login(leg,nrod)
       setLeg('')
       setNrod('')
       
    }

  

    const onHandleOnChangeLeg =(event)=>{
        event.preventDefault()
        setLeg(event.target.value)  
     }

    const onHandleOnChangeDoc =(event)=>{
        event.preventDefault()
        setNrod(event.target.value)    
     }

 
 

    return (
   
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
            <div className="navbar-brand logo" NavLink to="/"><img id="imgb" src={require('../logo-economicas.png')} alt="FCE"/></div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className=" navbar-inverse navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                       
                       <li className="nav-item"><NavLink to="/asistencia" className="nav-link">Asistencia Personal</NavLink></li>
                       <li className="nav-item"><NavLink to="/asistencia/asistenciaArea" className="nav-link">Asistencia Area</NavLink></li>
                    </div>
                </div>
            </div>
      
        {!isLoged? 
            <div className="formi"> 
            
                <input id="legajo" style={{marginRight:'2px'}}
                    type="text"
                    placeholder="Legajo" 
                    className="form-control mr-sm-2"     
                    onChange={onHandleOnChangeLeg}
                    value={leg}
                    />

                <input id="nrodoc" style={{marginRight:'2px'}}
                    type="password"
                    placeholder="Nro.Documento" 
                    className="form-control mr-sm-2"
                    onChange={onHandleOnChangeDoc}
                    value={nrod}  
                />
 
                <button 
                    className="btn btn-primary btn-block"
                    onClick={onHandleSubmit}
                >
                        LogIn
                </button>
                </div>
                :
              

                <div className='formilogout'>           
                <button 
                    className="btn btn-primary btn-block"
                    onClick={logout}
                 >
                    LogOut       
                </button>
                </div> 
                }


         
    
    </nav>
      
         
  )
}

export default NavBar
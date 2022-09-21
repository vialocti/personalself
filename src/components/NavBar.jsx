
import React, { useContext,useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import '../css/NavBar.css'
//import Cookies from 'universal-cookie'



//const cookies = new Cookies()




const NavBar = () => {
  const {legajo,nrodoc,setLegajo,setNrodoc,login,logout,isLoged} = useContext(AuthContext)

  useEffect(() => {
    
  }, [])
   

       const onHandleSubmit =async ()=>{
       login(legajo,nrodoc)
       
    }

    const onHandleOnChangeLeg =(event)=>{
        event.preventDefault()
        setLegajo(event.target.value)  
     }

    const onHandleOnChangeDoc =(event)=>{
        event.preventDefault()
        setNrodoc(event.target.value)    
     }


    return (
   
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
    
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className=" navbar-inverse navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
        
                        <li className="nav-item"><NavLink to="/asistenciaself" className="nav-link">Asistencia Personal</NavLink></li>
                        <li className="nav-item"><NavLink to="/horariosarea" className="nav-link">Asistencia Area</NavLink></li>
         
         </div>
         </div>
         </div>

         {isLoged
                    ?<div className='logout'>
                        <button className='btn btn-info' 
                            onClick={logout}
                        >
                            LogOut
                        </button>
                    </div>

            : <div className="formi"> 
            
                <input id="legajo" style={{marginRight:'2px'}}
                    type="text"
                    placeholder="Legajo" 
                    className="form-control mr-sm-2"     
                    onChange={onHandleOnChangeLeg}
                    value={legajo}
                    />

                <input id="nrodoc" style={{marginRight:'2px'}}
                type="text"
                placeholder="Nro.Documento" 
                className="form-control mr-sm-2"
                onChange={onHandleOnChangeDoc}
                value={nrodoc}  
                />

                <button 
                type="button" 
                className="btn btn-primary btn-block"
                onClick={onHandleSubmit}
                >
                    LogIn
                </button>
               </div>
         }

    
    </nav>
      
       
    
  )
}

export default NavBar

/*
 <a className="navbar-brand logo" href="/"><img id="imgb" src={require('../images/Fotos/logo-economicas.png')} alt="FCE"/></a>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" role="navigation">
    
    < div className="container">
        <a className="navbar-brand" href="/">Brand</a>
        <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
            &#9776;
        </button>
        <div className="collapse navbar-collapse" id="exCollapsingNavbar">
            <ul className="nav navbar-nav">
                <li className="nav-item"><a href="/asistenciaself" className="nav-link">Asistencia Personal</a></li>
                <li className="nav-item"><a href="/horariosarea" className="nav-link">Asistencia Area</a></li>
                <li className="nav-item"><a href="/logout" className="nav-link">Salir</a></li>
                
            </ul>
             </div>    
                                 
                        <form className="formLogin">
                                <div className="form-group">
                                    <input id="legajo"
                                        type="text"
                                        placeholder="Legajo" 
                                        className="form-control form-control-sm" 
                                        onChange={onHandleOnChangeLeg}
                                        value={legajo}
                                        />
                                </div>
                                <div className="form-group">
                                    <input id="nrodoc" 
                      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" role="navigation">
    
    < div className="container">
        <a className="navbar-brand" href="/">Brand</a>
        <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
            &#9776;
        </button>
        <div className="collapse navbar-collapse" id="exCollapsingNavbar">
            <ul className="nav navbar-nav">
                <li className="nav-item"><a href="/asistenciaself" className="nav-link">Asistencia Personal</a></li>
                <li className="nav-item"><a href="/horariosarea" className="nav-link">Asistencia Area</a></li>
                <li className="nav-item"><a href="/logout" className="nav-link">Salir</a></li>
                
            </ul>
             </div>    
                                 
                        <form className="formLogin">
                                <div className="form-group">
                                    <input id="legajo"
                                        type="text"
                                        placeholder="Legajo" 
                                        className="form-control form-control-sm" 
                                        onChange={onHandleOnChangeLeg}
                                        value={legajo}
                                        />
                                </div>
                                <div className="form-group">
                                    <input id="nrodoc" 
                                    type="text"
                                    placeholder="Nro.Documento" 
                                    className="form-control form-control-sm"
                                    onChange={onHandleOnChangeDoc}
                                    value={nrodoc}  
                                    />
                                </div>
                                <div className="form-group">
                                    <button 
                                    type="button" 
                                    className="btn btn-primary btn-block"
                                    onClick={onHandleSubmit}
                                    >
                                        Identificarse
                                    </button>
                                </div>
                                
                            </form>
                    

            </div>
        
    </nav>              type="text"
                                    placeholder="Nro.Documento" 
                                    className="form-control form-control-sm"
                                    onChange={onHandleOnChangeDoc}
                                    value={nrodoc}  
                                    />
                                </div>
                                <div className="form-group">
                                    <button 
                                    type="button" 
                                    className="btn btn-primary btn-block"
                                    onClick={onHandleSubmit}
                                    >
                                        Identificarse
                                    </button>
                                </div>
                                
                            </form>
                    

            </div>
        
    </nav>*/
import React, { useEffect } from 'react'
import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'



const HeaderFCE = () => {

  const {legajo,nombre,condi} = useContext(AuthContext)
 useEffect(() => {
     console.log(legajo)
  
    
  }, [legajo])
  
  return (

  <div className='container'>
       <div className='row'> 
        
        <div className='col'>
          Legajo:{legajo!==9?legajo:null}
        </div>  
        
        <div className='col'>
          Nombre: {nombre}
        </div>
        
        <div className='col'>
          Personal: {condi===1?'Docente':'No Docente'}
        </div>

        </div> 
        
        
    </div>
  )
}

export default HeaderFCE
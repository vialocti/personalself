import React,{useContext,useEffect} from 'react'


import FoundFechas from '../components/FoundFechas'
import HeaderFCE from '../components/HeaderFCE'

import ViewHorarios from '../components/ViewHorarios'
import AuthContext from '../contexts/AuthContext'

import '../css/HorariosPage.css'  

const HorariosPage = () => {
  const {user} = useContext(AuthContext)
  return (
    <div className="containermain">
    
    <div className='cabecera'>
        <HeaderFCE />
    </div>
    
    <div className="containerdatos">        
        
        <div className="parteIz">
            <div className='foundfechas'>
              <FoundFechas />
            </div>
        </div>
            
        <div className="parteDr">
            <ViewHorarios />
        </div>
    </div>
    
    </div>
  )
}

export default HorariosPage
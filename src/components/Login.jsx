import React, {useContext, useState} from 'react'
import AuthContext from '../contexts/AuthContext'

const Login = () => {
  const {login} = useContext(AuthContext)
  const [leg, setLeg] = useState('')
  const [nrod, setNrod] = useState('')  
  
  
  const onHandleSubmit =async ()=>{
       login(leg,nrod)
       
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
    <div>
        <h2>Identificarse</h2>
        <div className="formi"> 
            
                <input id="legajo" style={{marginRight:'2px'}}
                    type="text"
                    placeholder="Legajo" 
                    className="form-control mr-sm-2"     
                    onChange={onHandleOnChangeLeg}
                    value={leg}
                    />

                <input id="nrodoc" style={{marginRight:'2px'}}
                    type="text"
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
        
    </div>
  )
}

export default Login

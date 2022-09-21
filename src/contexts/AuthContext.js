import React,{createContext, useState} from "react"
import { autenticarse } from '../services/ServiceConsu'
import Cookies from "universal-cookie"

const AuthContext = createContext()


const cookies = new Cookies()
const AuthProvider =({children})=>{
    
    
    const [legajo, setLegajo]=useState('')
    const [isLoged, setIsLoged] =useState(false)

    const [nrodoc,setNrodoc] = useState('')
    
    async function login (legajo,nrodoc){
        
        const data = await autenticarse(legajo,nrodoc)
                 
        cookies.set('legajo',data.data[0].legajo,{'path':'/'})
        cookies.set('apellido',data.data[0].apellido,{'path':'/'})       
        setIsLoged(true)
      
    }

    const logout =()=>{
        
        cookies.remove('legajo',{'path':'/'})
        cookies.remove('apellido',{'path':'/'})       
        setLegajo('')
        setNrodoc('')
        setIsLoged(false)   
    }

    
    const data = {setLegajo,setNrodoc,legajo,nrodoc,login,logout,isLoged}
    
    return(
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}
export {AuthProvider}
export default AuthContext
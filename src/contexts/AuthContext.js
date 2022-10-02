import React,{createContext, useState, useCallback, useMemo} from "react"
import { autenticarse } from '../services/ServiceConsu'
//import Cookies from "universal-cookie"

const MY_AUTH_APP = false
const MY_AUTH_LEGAJO = 9
const MY_AUTH_CONDICION = 2
const MY_AUTH_NOMBRE = null
const MY_AUTH_NRODOC = null
//const MY_AUTH_PASSW = null
const AuthContext = createContext()


//const cookies = new Cookies()
const AuthProvider =({children})=>{
    
    
    const [legajo, setLegajo]=useState(localStorage.getItem(MY_AUTH_LEGAJO))
    const [isLoged, setIsLoged] =useState(localStorage.getItem(MY_AUTH_APP))
    const [nombre, setNombre] = useState(localStorage.getItem(MY_AUTH_NOMBRE))
    const [nrodoc,setNrodoc] = useState(localStorage.getItem(MY_AUTH_NRODOC))
    const [condi, setCondicion] = useState(localStorage.getItem(MY_AUTH_CONDICION))
    //const [password, setPassword] = useState(localStorage.getItem(MY_AUTH_PASSW)) 
    
    
    
    const login = useCallback (async(leg,passw)=>{
        //setPassword=(passw.toString()) 
        //console.log(passw)
        const data = await autenticarse(leg,passw)  
        if (data.data[0].existe === 0){
           
            setIsLoged(false)  
            return 0
        }else{
            localStorage.setItem(MY_AUTH_APP,true)
            localStorage.setItem(MY_AUTH_LEGAJO,data.data[0].legajo)
            localStorage.setItem(MY_AUTH_CONDICION,data.data[0].condicion)
            localStorage.setItem(MY_AUTH_NRODOC,data.data[0].nrodocumento)
            localStorage.setItem(MY_AUTH_NOMBRE,data.data[0].apellido)
          //  localStorage.setItem(MY_AUTH_PASSW,password)
            setIsLoged(true)
            setNombre(data.data[0].apellido)
            setCondicion(data.data[0].condicion)
            setNrodoc(data.data[0].nrodocumento) 
            setLegajo(data.data[0].legajo)  
            
            
                   
        }  
               
      
    },[])

    const logout =useCallback(()=>{
        localStorage.removeItem(MY_AUTH_APP)
        localStorage.removeItem(MY_AUTH_NOMBRE)
        localStorage.removeItem(MY_AUTH_NRODOC)
        localStorage.removeItem(MY_AUTH_LEGAJO)
        localStorage.removeItem(MY_AUTH_CONDICION)
        //localStorage.removeItem(MY_AUTH_PASSW)
        setLegajo(9)
        setNrodoc('')
        //setPassword('')
        setNombre('')
        setCondicion(2)
        setIsLoged(false)   
    },[])

    
    const data = useMemo(
        ()=>({
            login,
            logout,
            legajo,
            isLoged,
            nombre,
            nrodoc,
            condi,
        }),[login,logout,isLoged,condi,legajo,nombre,nrodoc]
    )

    
    return(
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}
export {AuthProvider}
export default AuthContext
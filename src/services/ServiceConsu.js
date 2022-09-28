

import axios from 'axios';

//const uri="http://200.12.136.74:4000/biometrico";
const uri="http://localhost:4000/biometrico";



//autenticarse
export async function autenticarse(legajo,nrodoc){
        let strq=`${uri}/login/${legajo}/${nrodoc}`        
        try {
            const response=await axios({
                url:strq,
                method:"GET"
            })
            
               return response
            

            
        } catch (error) {
            console.log(error)
        }
    }



//-------Asistencias Consultas ---------


//consulta asistencia por agente
export async function asistenciaPersona(claustro,fechaini,fechafin,legajo){
    var fecfin=''
    try {
        if(fechafin==='0000-00-00' || fechafin===''){
            fecfin=fechaini
        }else{
            fecfin=fechafin
        }
        
        const response = await axios({
            url: uri + `/asistencia_p/${claustro}/${fechaini}/${fecfin}/${legajo}`,
            method:"GET"
        })
       
        if(response.data.length===0){
            console.log("NAda")
        }
         
         return response
    } catch (error) {
        console.log(error)
        
    }
}

//diasregistrados/0/28220/2022-09-05/2022-09-16

//consulta dias asisistencia por agente
export async function personaDiasAsistencia(claustro,fechaini,fechafin,legajo){
    var fecfin=''
    try {
        if(fechafin==='0000-00-00' || fechafin===''){
            fecfin=fechaini
        }else{
            fecfin=fechafin
        }
        
        const response = await axios({
            url: uri + `/diasregistrados/${claustro}/${fechaini}/${fecfin}/${legajo}`,
            method:"GET"
        })
       
        if(response.data.length===0){
            console.log("NAda")
        }
         
         return response
    } catch (error) {
        console.log(error)
        
    }
}


//horastotal/0/28367/2022-09-05/2022-09-16

export async function personaHorasAsistencia(claustro,fechaini,fechafin,legajo){
    var fecfin=''
    try {
        if(fechafin==='0000-00-00' || fechafin===''){
            fecfin=fechaini
        }else{
            fecfin=fechafin
        }
        
        const response = await axios({
            url: uri + `/horastotal/${claustro}/${fechaini}/${fecfin}/${legajo}`,
            method:"GET"
        })
       
        if(response.data.length===0){
            console.log("NAda")
        }
         
         return response
    } catch (error) {
        console.log(error)
        
    }
}
import React, {useState,useContext, useEffect} from 'react'

//import {useForm} from 'react-hook-form'
//import { yupResolver } from '@hookform/resolvers/yup'
//import * as yup from 'yup'
import AuthContext from '../contexts/AuthContext'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const uri = 'http://200.12.136.74:4000/biometrico/'

const AsistenciaVirtualPage = () => {
   const {legajo,nombre,condi}= useContext(AuthContext)
    const [hora, setHora] = useState('')
    const [fecha, setFecha] = useState('')
    const [horasT, setHorasT] = useState('')
    const [nroreg, setNroreg] = useState('')
    //const[asistencia, setAsistencia] =useState([])
    const [ruta, setRuta] = useState(`${uri}horario_persofechas/28367/9/2122-09-01/2122-09-23`)


    const navigate = useNavigate()
      
    const ti =()=>{
         const fechahoy = new Date()
          let hora=fechahoy.getHours()<10? '0' + fechahoy.getHours():fechahoy.getHours()
          let minutos = fechahoy.getMinutes()<10? '0'+fechahoy.getMinutes():fechahoy.getMinutes()
          let horatext= hora + ':' + minutos
          return horatext
          
    }


    
    useEffect(() => {
      
      const convertirFecha=fechahoy=>{
          
          let dia = fechahoy.getDate() <10?'0'+fechahoy.getDate():fechahoy.getDate()
          let mes = fechahoy.getMonth()+1 <10? '0' + fechahoy.getMonth()+1:fechahoy.getMonth()+1
          let anio = fechahoy.getFullYear()
          let fechatext = anio + '-' + mes + '-' + dia
          setFecha(fechatext)
          setRuta(`${uri}horario_persofechas/${condi}/${legajo}/${fechatext}/${fechatext}`)
          setHora(ti())  
              
      }

      const cl = setInterval(() => {
          
      }, 2000);

      const fechahoy = new Date()
    

     convertirFecha(fechahoy)
     return () => clearInterval(cl);


     
    }, [condi,legajo])
    
    
    
    
    const getAsistencia = async  () => {
      console.log(ruta)
          
      try{
  
        const res = await axios.get(ruta)
        //await setAsistencia(res.data)
        return await res.data
           
    }catch(error){
        console.log(error)
    }
    
  
    }
  

  const calcularHoras=(hentrada,hsalida)=>{
    let horaE =parseFloat(hentrada.substr(0,2))
    let minE=parseFloat(hentrada.substr(3,2))
    let horaS =parseFloat(hsalida.substr(0,2))
    let minS=parseFloat(hsalida.substr(3,2))
    let horaT=0
    let minT=0
    if (minE > minS){
      minT=minS + 60 - minE
      horaT = horaS - horaE -1
    }else{
      minT=minS - minE
      horaT = horaS - horaE 
    }
    let cantiH  = horaT + minT/60
    
    setHorasT(cantiH)
  }

  const VerificarFecha=async ()=>{
 
    const retorno = await getAsistencia()
    if (retorno.length===0){
      return 0
    }
    else{
      console.log(retorno)
      let nroregs = retorno.length
      if(retorno[nroregs-1].Hsalida ==='X'){
        return retorno[nroregs-1].Hentrada
      
      }else{
      
        return 1
      
      }
    }
  }
    
     
    
  const setHoraIO = async (e) =>{
    e.preventDefault()
   let tipo = await VerificarFecha()
   console.log(tipo)
   if (tipo===0){
    //nuevoRegistro(legajo,condicion,fecha,hora)
   Swal.fire({
      icon: 'success',
      title: 'Registro de Entrada',
      text: `fecha:${fecha} - hora:${hora}`
      
    })
   }else if(tipo===1){
    Swal.fire({
      title: 'Seguro que quiere marcar Nuevo Ingreso en el dia de Hoy?',
      text: `fecha:${fecha} - hora:${hora}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#f33',
      confirmButtonText: 'Registrar?'
    }).then((result) => {
      if (result.isConfirmed) {
     //   nuevoRegistro(legajo,condicion,fecha,hora)
        Swal.fire({
          title:'Ingreso Registrado',
          icon:'success',
          
          
      })
      }
    })
   }else{
   // grabarSalida(legajo,condicion,fecha,hora)
   calcularHoras(tipo,hora)
    Swal.fire({
      icon: 'success',
      title: 'Registro de Salida',
      text: `fecha:${fecha} - hora:${hora}`
    })
   }
    navigate('/')
    
  }

  return (
  
  
  <div className='container-fluid'>

    <div className='row'>
              
              <div className='col md-3 xs-12'>

              </div>
              
              <div className='col md-6 xs-12'>
            
                <div className='caja'>
                
                    <div className='cabecera'>
              
                        <h4>Registro asistencia Virtual</h4>
                        <h6>Fecha- {fecha}</h6>
                        <h6>Hora - {hora}</h6>
                        <h5>Legajo:{legajo}</h5>
                        <h5>Nombre:{nombre}</h5>
                        
                    </div>
                   <div className='cuerpo'>
                      
                   </div>
                    <div className='pie'>
                        <button onClick={setHoraIO} className='btn btn-primary'>Enviar Asistencia</button>
                    </div>
            
                </div>
              </div>
            
                <div className='col md-3 xs-12'>

                </div>
          </div>
        </div>    
    
  )
}

export default AsistenciaVirtualPage
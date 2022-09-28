import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios'

import ReactDatePicker, { registerLocale } from 'react-datepicker'
import ViewHorarios from '../components/ViewHorarios'
import '../css/busquedaFechas.css'
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es'
import AuthContext from '../contexts/AuthContext'
import '../css/HorariosPage.css'



registerLocale("es", es)

//const uri = 'http://200.12.136.74:4000/biometrico/'
const uri = 'http://localhost:4000/biometrico/'




const HorariosPage = () => {
  const {legajo,condi,nombre} = useContext(AuthContext)  
  
  const [asistencia, setAsistencia] = useState([])
  
  const [fechai,setFechai]=useState(new Date())
  const [fechaf,setFechaf]=useState(new Date())
 
  const [horasT, setHorasT] =useState('')
  const [diasT, setDiasT] = useState('')

  const [ruta, setRuta] = useState(`${uri}horario_persofechas/28367/9/2122-09-01/2122-09-23`)
  const [rutaH, setRutaH] = useState(`${uri}horastotal/0/28367/2122-09-01/2122-09-23`)
  const [rutaD, setRutaD] = useState(`${uri}diasregistrados/28367/2122-09-01/2122-09-23`)

  
  
  
  useEffect(()=>{
    const getfechas=()=>
    {
      let ff = new Date()
      let dia = ff.getDate()<10?'0'+ff.getDate():ff.getDate()
      let mes = ff.getMonth()+1<10 ? '0'+ (ff.getMonth()+1):ff.getMonth()+1
      let fechaf = ff.getFullYear() + '-' + mes + '-' + dia
      let fechai = ff.getFullYear() + '-' + mes + '-01'
      console.log(fechaf, fechai)
      if( Number.isInteger(legajo) && legajo!==9){
      setRuta(`${uri}horario_persofechas/${condi}/${legajo}/${fechai}/${fechaf}`)
      setRutaH(`${uri}horastotal/${condi}/${legajo}/${fechai}/${fechaf}`)
      setRutaD(`${uri}diasregistrados/${condi}/${legajo}/${fechai}/${fechaf}`)
      }
     }


    getfechas()
   
  },[legajo])
  
  
  
  useEffect(() => {


     const getDias = async  () => {
      
      try{
  
          const resd=await axios.get(rutaD)
          await setDiasT(resd.data[0].nrodias)
            
    }catch(error){
        console.log(error)
    }
    }



    
    const getHoras = async  () => {
      
      try{
  
        const resh=await axios.get(rutaH)
        await setHorasT(resh.data[0].horasT)
    

        
    }catch(error){
        console.log(error)
    }
    }

    const getAsistencia = async  () => {
      try{
  
        const res = await axios.get(ruta)
        await setAsistencia(res.data)
      
      
       
    }catch(error){
        console.log(error)
    }
    }
    

    if( Number.isInteger(legajo) && legajo!==9){
    getAsistencia()
    getDias()
    getHoras()
    }
  }, [ruta,rutaD,rutaH])

 

  //funcion de conversion de fecha para consulta
   

  const convertirfecha = (fecha)=>{
      
  let dia=fecha.getDate()
  let mes = fecha.getMonth() +1
  let anio = fecha.getFullYear()
  if (dia < 10){
    dia = '0' + dia
  }
  if (mes<10){
    mes = '0' + mes
  }

  return anio + '-' + mes + '-' + dia

}



  //preparar ruta de busqueda
  const buscarAsistencia = async ()=>{
    var ff = ''
    var fi =''
    
    if (fechaf-fechai < 0){
      alert('La fecha Final no puede ser menor a la fecha inicial')
    }else{
      ff = convertirfecha(fechaf)
      fi = convertirfecha(fechai)
    }
    
    
    
    let url = `${uri}horario_persofechas/${condi}/${legajo}/${fi}/${ff}`
    let urlh= `${uri}horastotal/${condi}/${legajo}/${fi}/${ff}`
    let urld= `${uri}diasregistrados/${condi}/${legajo}/${fi}/${ff}`
     console.log(legajo)
    if( Number.isInteger(legajo) && legajo!==9 ){
        setRuta(url)
        setRutaH(urlh)
        setRutaD(urld)
    }
   
   
}  

//actualizar fechas inicio y final
const onChangeFi = (fecha)=>{
    setFechai(fecha) 
    setFechaf(fecha)
}

const onChangeFf = (fecha)=>{
  setFechaf(fecha)

}


  return (
    <div className='container'>
    
   
    <div className='row'>
          
      <div className='col x-12 md-3'>
      
      <div className="row row-tit" >
         
      </div>
      
     
       
      <div className="card">
        <div className="card-header">
        {nombre}({legajo})
        </div> 
         <div className="card-body">

          <div className='row'>
            <label className='label'htmlFor="fechainicial">Fecha Inicio</label>
                <ReactDatePicker 
                id='fechai' 
                selected={fechai}
                onChange={onChangeFi}
                locale="es" className="pickers" dateFormat='dd-MM-yyyy'
            />
          </div>
      
          <div className='row'>
            <label className='label' htmlFor="fechafinal">Fecha Fin</label>
            <ReactDatePicker 
              id='fechaf' 
              selected={fechaf}
              onChange={onChangeFf}
              locale="es" className="pickers" dateFormat='dd-MM-yyyy'
             />
          </div>
        </div>

       <div className="card-footer">
       <div className='rowp'>
          <button className='btn btn-primary' 
               onClick={buscarAsistencia}
                >Buscar
          </button>
       </div>
       </div>

       </div>
      </div>
       <div className='col xs-12 md-9'>
          {asistencia.length > 0 ? <ViewHorarios datosasistencia={asistencia} horast={horasT} diast={diasT} />: null} 
      </div>
    </div>
    
   
  </div>
  )
}
 
  

export default HorariosPage
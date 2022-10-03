import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios'

import ReactDatePicker, { registerLocale } from 'react-datepicker'
//import HorariosAreaVista from '../components/ViewHorarios'

import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es'
import AuthContext from '../contexts/AuthContext'
import '../css/HorariosPageArea.css'
import { CSVLink } from 'react-csv';
import Swal from 'sweetalert2';



registerLocale("es", es)

const uri = 'http://200.12.136.74:4000/biometrico/'
//const uri = 'http://localhost:4000/biometrico/'




const HorariosAreaPage = () => {
  const {legajo} = useContext(AuthContext)  
  
  const [asistencia_area, setAsistencia_area] = useState([])
  const [habilitado, setHabilitado ] = useState(false)
  const [fechai,setFechai]=useState(new Date())
  const [fechaf,setFechaf]=useState(new Date())
 

  const [ruta, setRuta] = useState(`${uri}horas-area_fecha/t/2122-09-01/2122-09-23`)
 

  useEffect(()=>{
      
    if(legajo===28367){
        setHabilitado(true)
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Acceso a Areas No permitido..',
          text: 'No tiene permiso para acceder a esta info',
          
        })

      }
  },[legajo])
  
  useEffect(() => {


     const getAsistencia_area = async  () => {
      try{
  
        const res = await axios.get(ruta)
        await setAsistencia_area(res.data)
        
    }catch(error){
        console.log(error)
    }
    }
    

    
    getAsistencia_area()
   
    
  }, [ruta])

 

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
      Swal.fire({
        icon: 'error',
        title: 'Error de Fechas...',
        text: 'Fecha Inicial debe ser menor a la Fecha Final',
        
      })
    }else{
      ff = convertirfecha(fechaf)
      fi = convertirfecha(fechai)
    }
    
    let area = document.getElementById('area').value
    
    
    let url = `${uri}horas_area_fecha/${area}/${fi}/${ff}`

    
        setRuta(url)
    
    
   
   
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
    <div>
    
    {habilitado &&
    <div className='row m-2'>
          
      <div className='col-md-5 sm-5 xs-12'>
      
      <div className="row row-tit" >
         
      </div>
      
     
       
      <div className="card shadow">
      <div className="card-title text-left border-bottom">
                <h4 className='p-3'> Control Por Area  </h4>
            </div> 
         <div className="card-body m-2">

          <div>
          
          <label htmlFor="area"> Area </label>
          <select id='area' className='select' style={{width:'350px',height:'40px'}}>
            <option>SELECCIONE UN AREA</option>
            <option value="Carrera_Licenciatura_en_Administracion">Carrera Licenciatura en  Administracion</option>
            <option value="Carrera_Licenciatura_en_Economia">Carrera Licenciatura en Economia</option>
            <option value="Carrera_Contador_Publico">Carrera Contador Público</option>
            <option value="Carrera_Licenciatura_en_Logística">Carrera Licenciatura en Logística</option>            
            <option value="Decanato">Decanato</option>
            <option value="Departamento_Clases_y_Exámenes">Departamento Clases y Exámenes</option>
            <option value="Departamento_Mesa_de_Entradas">Departamento Mesa de Entradas</option>
            <option value="Dirección_de_Alumnos">Direccion de Alumnos</option>
            <option value="Dirección_de_RRHH">Dirección de RRHH</option>   
            <option value="Dirección_de_Servicios_Generales">Dirección de Servicios Generales</option>         
            <option value="Dirección_de_Informática">Dirección de Informática</option>
            <option value="Dirección_de_Biblioteca">Dirección de Biblioteca</option>
            <option value="Dirección_de_Despacho">Dirección de Despacho</option>
            <option value="Dirección_de_Publicaciones">Dirección de Publicaciones</option>
            <option value="Dirección_General_de_Gestión_Administrativo_Financiera">Dirección General de Gestión Administrativo Financiera</option>
            <option value="Dirección_General_de_Gestión_Académica">Dirección General de Gestión Académica</option>
            <option value="ECONET">ECONET</option>
            <option value="Secretaría_de_Administración_y_Finanzas">Secretaría de Administración y Finanzas</option>
            <option value="Secretaria_de_Asustos_Estudiantiles">Secretaria de Asustos Estudiantiles</option>
            <option value="Secretaría_de_Extensión_y_RRII">Secretaría de Extensión y RRII</option>
            <option value="Secretaría_de_Posgrado_e_Investigación">Secretaría de Posgrado e Investigación</option>
          
            
          </select>
          </div>


          <div>
            <label className='label'htmlFor="fechainicial">Fecha Inicio</label>
                <ReactDatePicker 
                id='fechai' 
                selected={fechai}
                onChange={onChangeFi}
                locale="es" className="pickers" dateFormat='dd-MM-yyyy'
            />
          </div>
      
         <div style={{marginTop:'10px'}}>
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
                >Ver Asistencia
          </button>
          
          {asistencia_area.length > 0 ? 
        <button className='btn btn-outline'>
        <CSVLink data={asistencia_area} filename={`asistencia_${legajo}_ ${new Date().toLocaleString()}.csv`}>Exportar a .csv</CSVLink>
        </button>
        :null}
       </div>
       </div>

       </div>
      </div>
      <div className='col-md-7 sm-7 xs-12 '>
          {asistencia_area.length > 0 ?  <div className='container tbl-container'>
        <div className="row tbl-fixed">
      <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Legajo</th> 
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Entrada</th>
              <th>Salida</th>
            </tr>
          </thead>
      
          <tbody>
             {
              asistencia_area.map((ele,ind)=>
                <tr key={ind}>
                  
                  <td>{ele.legajo}</td>
                  <td>{ele.apellido}</td>  
                  <td>{ele.fecha}</td> 
                  <td>{ele.Hentrada}</td> 
                  <td>{ele.Hsalida}</td>
        
                </tr>
              )
              }
          </tbody>
      </table>
      </div>
    </div>: null} 
      </div>
    </div>
}
   
  </div>
  )
}
 
  

export default HorariosAreaPage
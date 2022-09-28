import React,{useEffect, useState} from 'react'
import '../css/viewhorarios.css'

const ViewHorarios = ({datosasistencia, horast,diast}) => {
 
  const [promedio, setPromedio]=useState('')



  useEffect(() => {
    const getPromedio=()=>{
      const horas = Math.floor(parseFloat(horast)/parseFloat(diast))
      const minutos = Math.round(((parseFloat(horast)/parseFloat(diast)) - horas)*60, 2)
      setPromedio(`${horas} horas con ${minutos} minutos`)
    }

    getPromedio()
  
  }, [horast,diast])
  


  return (
    
    
      <div className='container tbl-container'>
        <div className="row tbl-fixed">
      <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Entrada</th>
              <th>Salida</th>
            </tr>
          </thead>
      
          <tbody>
             {
              datosasistencia.map((ele,ind)=>
                <tr key={ind}>
          
                  <td>{ele.fecha}</td> 
                  <td>{ele.Hentrada}</td> 
                  <td>{ele.Hsalida}</td>
        
                </tr>
              )
              }
          </tbody>
      </table>
      </div>
       <div className="row">
        <h6>Horas: {horast} -- Dias: {diast} -- Promedio:{promedio}</h6>
        </div>
      </div>
      
      
  )
}

export default ViewHorarios
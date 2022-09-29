import React,{useEffect, useState} from 'react'
import '../css/viewhorarios.css'

const ViewHorarios = ({datosasistencia}) => {
 
  const [promedio, setPromedio]=useState('')
  const [horasT, setHorasT] = useState('')
  const [diasT, setDiasT] = useState('')




  useEffect(() => {
  
    const getPromedio=()=>{
      
      let sumaH =datosasistencia.reduce((sum, value) => (typeof value.horasT == "number" ? sum + value.horasT : sum), 0)
      let fechaant=datosasistencia[0].fecha
      let dias=1
      datosasistencia.map((ele)=>{
        if(fechaant !== ele.fecha){fechaant=ele.fecha; dias= dias + 1}
      }
      )
      setDiasT(dias)
      setHorasT(sumaH.toFixed(2))
      const horas = Math.floor(parseFloat(sumaH)/parseFloat(dias))
      const minutos = Math.round(((parseFloat(sumaH)/parseFloat(dias)) - horas)*60, 2)
      
      setPromedio(`${horas} horas con ${minutos} minutos`)
    
    }

    const mostrarPromedio =()=>{
      const horas = Math.floor(parseFloat(horasT)/parseFloat(diasT))
      const minutos = Math.round(((parseFloat(horasT)/parseFloat(diasT)) - horas)*60, 2)
     
      setPromedio(`${horas} horas con ${minutos} minutos`)
      
    }

    getPromedio()
    mostrarPromedio()
   
  }, [datosasistencia,horasT,diasT])
  

  


  return (
    
    
      <div className='container tbl-container'>
        <div className="row tbl-fixed">
      <table className="table table-striped table-sm">
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
        <div className='resu'>    
            Horas: {horasT} -- Dias: {diasT} -- Promedio: {promedio}
        </div>
        </div>
      </div>
      
      
  )
}

export default ViewHorarios
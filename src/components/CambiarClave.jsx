import React,{useContext} from 'react'
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {changepassAgente} from '../services/ServiceConsu'
import AuthContext from '../contexts/AuthContext'
import Swal from 'sweetalert2';
import '../css/cambiarclave.css'

const schema = yup.object({
  legajo: yup.string().required('legajo es requerido').matches(/^[0-9]+$/, "Deben ser solo digitos"),
  passold: yup.string().required('password actual requerida').matches(/^[0-9]+$/, "Deben ser solo digitos"),
  passnew: yup.string().required('debe ingresar una nueva password').matches(/^[0-9]+$/, "Deben ser solo digitos").min(4,"Minimo 4 digitos").max(8,"Maximo 8 digitos"),

}).required();

const CambiarClave = () => {
  const {logout,nombre,legajo}= useContext(AuthContext)
    const {register, handleSubmit,formState:{errors}} =useForm({
     resolver : yupResolver(schema)
    });

  const onSubmit =async  data =>{
      
      let legajo = data.legajo;
      let passold = data.passold;
      let passnew = data.passnew;
      const resp = await changepassAgente(legajo,passold,passnew) 
      if(resp.data.affectedRows===1){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Clave cambiada, debe reiniciar sesion',
          showConfirmButton: false,
          timer: 2500})
          logout()   
        }else if(resp.data.affectedRows===0){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Los datos son incorrectos'
          })
        }

    }


  return (
    <div className='container'>
       <div className="row">
       <div className="col">
       <div className='card'>
        <h6>{nombre}({legajo})</h6>
        <h4>Cambio de PassWord</h4>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='col xs-12 md-4'>  
            <label htmlFor="legajo">Legajo</label><p>{errors.legajo?.message}</p>
            <input 
                type="text" 
                {...register("legajo")} 
            />
          </div>
          <div className='col xs-12 md-4'>
                <label htmlFor="passold">Password Actual</label><p>{errors.passold?.message}</p>
                <input type="text" 
                {...register("passold")} 
            />
          </div>
          <div className='col xs-12 md-4'>
          <label htmlFor="passnew">Nuevo Password</label><p>{errors.passnew?.message}</p>
          <input type="text" 
          {...register("passnew")} 
          />
          </div>
          <br/>
               
          
          <button 
          type="submit"
          className='btn btn-warning'
          >
                Cambiar Clave
            </button>
        </form>
        </div>
        </div>
        </div>
    </div>
  )
}

export default CambiarClave
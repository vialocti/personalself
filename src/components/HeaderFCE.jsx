import React from 'react'
import Cookies from 'universal-cookie'


const cookies = new Cookies()
const HeaderFCE = () => {

 /* useEffect(() => {
     //console.log(cookies.get('legajo'))
  
    
  }, [cookies.get('legajo')])
  */
  return (
    <div className='container'>
        <div className='imagen'>
          <h2>{cookies.get('legajo')}</h2>
        </div>
        <div className='Titulo'>
            
        </div>
        
    </div>
  )
}

export default HeaderFCE
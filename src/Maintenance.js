import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
function Maintenance() {
    const navigate = useNavigate([]);
    useEffect(()=>
    {
      async function isSession(){
        const response = await fetch('/isSessionPresent',{
          method: 'GET',
          credentials: 'include'
        })

        const resp = response.json();
        return resp;
      }
      isSession().then(data =>{
        if(data.session == "absent"){
          navigate('/login');
        }
      })
   
},[])
  return (
    <div className='Maintenance__container'>Maintenance
        <div className='line1'>
            <p>1. Operational fee</p>
            <div>
                <strong>The bank will charge a nominal fee of Rs.10 from your source account, for any cash transfer whose value exceeds Rs.5000.</strong>
            </div>
        </div>
        <div className='line2'>
            <p>2. Maintenance fee</p>
            <div>
                <strong>For every 10 transactions a user performs, an account maintenance fee of Rs.100 will be charged by the bank.</strong>
            </div>
        </div>
    </div>
  )
}

export default Maintenance
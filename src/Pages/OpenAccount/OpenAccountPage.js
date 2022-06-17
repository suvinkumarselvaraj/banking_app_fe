import React,{useEffect} from 'react'
import Header from '../Headers/Header'
import OpenAccountLeft from './OpenAccountLeft/OpenAccountLeft'
import OpenAccountRight from './OpenAccountRight/OpenAccountRight'
import './OpenAccountPage.css';
import {useNavigate} from 'react-router-dom'

function OpenAccountPage() {
  const navigate = useNavigate()
  useEffect(()=>{
    console.log('logg in to check if this is working');
    
    async function isSession(){
      const response = await fetch('/isSessionPresent',{
        method: 'GET',
        credentials: 'include'
      });
      const resp = await response.json();
      return resp;
    }
    isSession().then(data =>{
      if(data.session == "present"){
        navigate('/home');
      }
    })

      },[])
  return (
    <div className='OpenAccountPage__container'>
        <Header/>
        <div className='OpenAccountPage__partition'>
        <OpenAccountLeft/>

        <OpenAccountRight/>
        </div>
    </div> 
  )
}

export default OpenAccountPage
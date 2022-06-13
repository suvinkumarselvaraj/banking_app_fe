import React,{useEffect} from 'react'
import Header from './Header'
import OpenAccountLeft from './OpenAccountLeft'
import OpenAccountRight from './OpenAccountRight'
import './OpenAccountPage.css';
import {useNavigate} from 'react-router-dom'

function OpenAccountPage() {
  const navigate = useNavigate()
  useEffect(()=>{
    console.log('logg in to check if this is working');
    fetch('/isSessionPresent',{
        method: 'GET',
        credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.session == "present"){
          navigate('/home');}
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


import React,{useEffect} from 'react'
import { Link, Route, useNavigate } from 'react-router-dom'
import LoginButton from '../LoginButton/LoginButton'
import OpenAccount from '../OpenAccount/OpenAccount'
import './PreLogin.css';

function PreLogin() {
  const navigate = useNavigate();
  useEffect(()=>{
    async function isSession(){
      const response = await fetch('/isSessionPresent',{
        method: 'GET',
        credentials: 'include'
      })
      const resp = await response.json();
      return resp;
    }
    isSession().then(data => {
      if(data.session == "present")
        navigate('/home');
    })
  })

  return (
    <div className='PreLogin__container'>
      <img className = 'PreLogin__bankLogo' src="https://logomakercdn.truic.com/ux-flow/industry/bank-meta.png" alt="bank__logo"></img>
      <div className='PreLogin__text'>
        <p>Your One Stop Banking App</p>
      </div>
      <Link to = "/login">
      <LoginButton/>
      </Link>
      <OpenAccount />
    </div>
  )
}

export default PreLogin
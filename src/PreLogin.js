

import React,{useEffect} from 'react'
import { Link, Route, useNavigate } from 'react-router-dom'
import LoginButton from './LoginButton'
import OpenAccount from './OpenAccount'
import { Navigate } from 'react-router-dom'
import './PreLogin.css'
import {useStateValue} from './StateProvider';
import { DataArray } from '@mui/icons-material'

function PreLogin() {
  const navigate = useNavigate();
  useEffect(()=>{
    fetch('/isSessionPresent',{
      method: 'GET',
      credentials: 'include'
  })
  .then(res => res.json())
  .then(data => {
      console.log(data);
      if(data.session == "present"){
        navigate("/home");
        return;
      }
  })
})
  return (
    <div className='PreLogin__container'>
      <img className = 'PreLogin__bankLogo' src="https://logomakercdn.truic.com/ux-flow/industry/bank-meta.png" alt="bank__logo"></img>
      <div className='PreLogin__text'>
        <p>Your One Stop Banking App</p>
      </div>
      <Link to = "/loginn">
      <LoginButton/>
      </Link>
      <OpenAccount />
    </div>
  )
}

export default PreLogin
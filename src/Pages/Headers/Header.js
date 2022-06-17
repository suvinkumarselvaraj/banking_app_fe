import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './Header.css'
import {useStateValue} from '../../StateProvider';
import { useCookies } from 'react-cookie';
import cookie from 'react-cookies'

function Header() {

  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [active_user,dispatch] = useStateValue();
  const navigate = useNavigate();
  function handleSign(event){
    console.log(event.target.innerHTML);
    if(event.target.innerHTML === 'Sign in')
    navigate("/login");
    console.log('about to call logout');
    async function logOut(){
      const response = await fetch('/logout',{
        method:'get',
        credentials: 'include'
      })
      const resp = await response.json();
      return resp;
    }
    logOut().then(data=>{
      console.log(data);
    }).catch(err =>{
      console.log(err);
    })

    sessionStorage.clear();
    dispatch({
      type: 'Remove_logged_user',
      logged_user: null
    })
    navigate("/login",{
      replace:true});  
  }
  return (
    <div className='Header__container'>
        <div className='Header__bankLogo__div'>
        <img className = 'Header__bankLogo' src="https://logomakercdn.truic.com/ux-flow/industry/bank-meta.png" alt="bank__logo"></img>
        <p className='Header__logo__name'>ZOHO BANKING</p>
        </div>
        <div className='Header__info'>
        <strong>YOUR ONE-STOP ONLINE BANKING APPLICATION</strong>
        </div>
        <div className='Header__login'>
            <a className = "Header__login__link" onClick={handleSign} name = 'status'>{sessionStorage.getItem("username")? 'Sign out' : 'Sign in'}</a>
        </div>
        </div>
  )
}

export default Header
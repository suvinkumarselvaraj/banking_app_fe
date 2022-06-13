import React, { useEffect } from 'react'
import { useStateValue } from './StateProvider';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    
    const navigate = useNavigate();
    useEffect(()=>{
        console.log('hello');
        //even before loading the login page, check whether exists a session
        //call in a api to check if the session exists
        fetch('/isSessionPresent',{
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.session == "present"){
                //check whether the session is same
                fetch('/isSameSession',{
                    method: 'GET',
                    credentials: 'include'
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if(data.isValidUser == "failure")
                    //invalid the session and log the user out
                   {
                    fetch('/logout',{
                    method: 'GET',
                    credentials: 'include'
                   }).then(res => res.json())
                   .then(data => console.log("successfully logged the user out and cleared the sesion"))
                   .catch(err => console.log(err));
                    }
                     else{
                    navigate("/home");
                    }   
                })       
            }
           
        })
        .catch(err => console.log(err));
        //if the session exists then check whether if the session id incoming is same 
        //if same, then navigate the user to the home page
        //if different, log the user out and invalidate the session

        //if there is no session, the allow the user to the login page

        // if(document.cookie!='')
        // navigate('/home') ;
    })
    const [active_user,dispatch] = useStateValue();
    function handleLogin(event){
        // event.preventDefault();
        console.log(event.target);
        
    }
    function handleLoginSubmit(event){
        event.preventDefault();
        var data = new FormData(event.target);
        console.log(data.get("account_no"));
        console.log(data.get("account_password"));
        //backend call
        var accountNumber = data.get("account_no");
        var password = data.get("account_password");

        if(accountNumber === ''||password === ''){
            alert("Empty field values not allowed");
            return;
        }
        var userData = {'accountNumber':accountNumber,'password':password};
        if(accountNumber >= 11011 && password.length >=6)
        {
            fetch('/loginuser', {
            method: 'POST', // or 'PUT'   x-www-form-urlencoded
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },    
            body: JSON.stringify(userData),
            })
            .then(res => res.json())
            .then(data => {  
              console.log(data);
              if(data.status === "failure")
              {
                  alert("wrong username or password, check your credentials again");
                  return;
              }
              else{
                  sessionStorage.setItem("username",data.username);
                  sessionStorage.setItem("accountNo",accountNumber);
                  sessionStorage.setItem("phoneNo",data.phoneNo);
                  sessionStorage.setItem("balance",data.balance);
                  sessionStorage.setItem("customerId",data.customerId);
                  //sessionStorage.setItem("accountBalance",);
                  dispatch({
                      type: 'Add_logged_user',
                      logged_user: sessionStorage.getItem("username")
                  });
                //   alert("success");
                navigate("/home", { replace: true });
              }
          })
          .catch((error)=>{
              console.log(error);
          })
        }
        else{
            alert("check your credentials and try again");
            return;
        }
    }
    function handleOpenAccount(event){

    }
  return (
    <div className='Login__container'>
        
        <form onSubmit = {handleLoginSubmit}>
        <img className = 'Login__container__logo' src="https://logomakercdn.truic.com/ux-flow/industry/bank-meta.png" alt="bank__logo"></img>
        <div className='Login__container__account__no'>
        <p>Account Number</p>
        <input type="text" className='Login__container__input__field' placeholder='Enter your account number' name = "account_no"></input>
        </div>
        <div className='Login__container__account__password'>
        <p>Password</p>
        <input type="password" className='Login__container__input__field' placeholder='Enter your password' name = "account_password"></input>
        </div>
        <div>
        <button className = "Login__button" onClick={handleLogin}>Login</button>
        <div>
            <small>Don't have an account?</small>
            <Link to = "/openaccount">
        <button className = "Login__Open__button" onClick={handleOpenAccount}>Open account</button>
        </Link>
        </div>
        </div>
        <div>
        <a href = "/admin">admin?</a>
        </div>
        </form>
        
    </div>
  )
}

export default Login
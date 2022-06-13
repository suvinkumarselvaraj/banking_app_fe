import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
function UserAccount() {
        const navigate = useNavigate();
        useEffect(()=>{
             
                        fetch('/isSessionPresent',{
                            method: 'GET',
                            credentials: 'include'
                        })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if(data.session == "absent"){
                              navigate('/');}
                            })
                   
                fetch('/accountDetails',{                     
                        method:'GET',
                        credentials:'include'
                })
                .then(res => res.json())
                .then(data => {
                        if (data.isValidUser != "success"){
                                alert("no use");
                        }
                        console.log(data)
                })
                .catch(err => console.log(err));
        })
  return (
    <div className='UserAccount__container1'>
        <div className='line111'>
                <p>Name : <strong>{sessionStorage.getItem("username").toUpperCase()}</strong></p>
        </div>
        <div className='line222'>
                <p>Account number : <strong>{sessionStorage.getItem("accountNo")}</strong></p>
        </div>
        <div className='line333'>
                <p>Phone number :<strong> {sessionStorage.getItem("phoneNo")}</strong></p>
        </div>
        <div className='line444'>
                <p>Available balance :<strong> Rs {sessionStorage.getItem("balance")}</strong></p>
        </div>
        
        
    </div>
  )
}

export default UserAccount
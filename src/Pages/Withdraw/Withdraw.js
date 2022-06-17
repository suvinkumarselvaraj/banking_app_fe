import React, { useEffect } from 'react'
import './Withdraw.css';
import { useNavigate } from 'react-router-dom';
import { AltRoute } from '@mui/icons-material';
function Withdraw() {
    const navigate = useNavigate();
    useEffect(()=>{
        async function isSession(){
            const response = await fetch('/isSessionPresent',{
                method: 'GET',
                credentials:'include'
            })
            const resp = await response.json();
            return resp;
        }
        isSession().then(data=>{
            if(data.session == "absent")
            navigate("/");
        })
        .catch(err =>{
            console.log(err);
        })
    },[]);
    
    function handleWithdrawlSubmit(event){
        event.preventDefault();
        var formData = new FormData(event.target);
        const password = formData.get("password");
        if((sessionStorage.getItem("balance")-formData.get("withdrawlAmount"))<1000)
        {   alert("Perform a withdrawl such that your minimum balance will be maintained over Rs. 1000");
            return;
        }
        var type = "withdrawl";
        const passwordDatas = {'accountNumber':sessionStorage.getItem("accountNo"),'oPass':password};
        async function passwordCheck(){
            const response = await fetch('/checkPassword',{
                method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-type':'application/json'
                },
                body: JSON.stringify(passwordDatas)
            })
            const resp = await response.json();
            return resp;
        }
        passwordCheck().then(data =>{
            if(data.oldPasswordCheck == "success"){
                const datas = {
                    'accountNumber' : sessionStorage.getItem("accountNo"),
                    'customerId' : sessionStorage.getItem("customerId"),
                    'amount' :formData.get("withdrawlAmount") ,
                    'balance': sessionStorage.getItem("balance"),
                    'transactionType' : type
                }
                transaction(datas).then(data =>{
                    if(data.status == "success"){
                        sessionStorage.setItem("balance",sessionStorage.getItem("balance")-formData.get("withdrawlAmount"));
                        //   sessionStorage.removeItem("balance")
                        alert("withdrawal successful");
                        navigate("/accountDetails",{replace:true});
                    }else{
                        alert('something went wrong. try again later');
                    }
                })
                .catch(err => console.log(err))
            }else{
                alert('wrong password. try again')
            }
        })
        .catch(err => console.log(err));
        async function transaction(datas){
            const response = await fetch('/transactions',{
                method: 'post',
                headers:{
                    'Accept':'application/json',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(datas)
            })
            const resp = await response.json();
            return resp;
        }
    }
  return (
    <div className = 'Withdraw__container'>Withdraw
        <div className = 'line1'>
            <p>Your available balance Rs.{sessionStorage.getItem("balance")}</p>
            <p>Please note that a minimum balance of Rs.1000 must be maintained once after the withdrawl</p>
        </div>
        <form onSubmit = {handleWithdrawlSubmit}>
        <div className='line2'>
            <p>Enter the amount for withdrawl</p>
            <input type = "number" className = 'input_box' min = '1000' max = '100000' name = 'withdrawlAmount' placeholder='Enter the amount to be withdrawn'></input>
        </div>
        <div className='line3'>
            <p>Enter your password</p>
            <input type = "password" className = 'input_box' name = 'password' placeholder='Enter your password'></input>
        </div>
        <div className='line4'>
            <button className='deposit_submit'>Proceed</button>
        </div>
        </form>
    </div>
  )
}

export default Withdraw;
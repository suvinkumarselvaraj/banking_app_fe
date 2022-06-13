import React,{useEffect} from 'react'
import { useStateValue } from './StateProvider'
import './UserPage.css';
import {Link,useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie'; 
import { integerPropType } from '@mui/utils';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SavingsIcon from '@mui/icons-material/Savings';
import AtmIcon from '@mui/icons-material/Atm';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InfoIcon from '@mui/icons-material/Info';
import PasswordIcon from '@mui/icons-material/Password';

function UserPage() {
  const navigate = useNavigate();
  // sessionStorage.getItem('accountNo').toString()
    useEffect(()=>
    {
      console.log(document.cookie);
      // fetch('/validation',{
      //   method:'GET',
      //   credentials:'include'
      // })
      // .then(res => res.json())
      // .then(data => console.log(data))
      // .catch(err => console.log(err));
      // document.cookie = "JSESSION=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path =/";
      // console.log(document.cookie);     
     fetch('/checktransactions?acc='+sessionStorage.getItem('accountNo').toString())
      .then(res => res.json())
      .then(data=>{
        console.log(data);
          if(data.maintenance === "success") {
          sessionStorage.removeItem("balance");
          sessionStorage.setItem("balance",data.getItem("balance"));
        }

        if(data.status5 == "true") {
          navigate('/forcePasswordChange');

        } else if(data.status10 == "true"){
          var type = "Maintenance fee";
          var amount = "100";
          var transfer_data = {
            'accountNumber' : sessionStorage.getItem("accountNo"),
            'customerId' : sessionStorage.getItem("customerId"),
            'amount' : amount,
            'balance': sessionStorage.getItem("balance"),
            'transactionType' : type,
  
              }
          //deduct a maintenance fee of rs. 100
          fetch("/maintenancefee",{
            method: 'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(transfer_data)
          })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if(data.status === "success"){
              navigate('/forcePasswordChange');
              console.log("succesfully inserted");
              sessionStorage.removeItem("balance");
              sessionStorage.setItem("balance",data.getItem("balance"));
              
             
            }else
            alert("something wrong, try again later");
          })
        }
      })
    }
    )
      
  //const [{active_user},dispatch] = useStateValue();
  return (
    <div className = 'UserPage__container'>
      <p>Account number: {sessionStorage.getItem("accountNo")}</p>
      <div className='row1'>
      <Link to = '/accountDetails'>
      <div className = 'service lineOne'>
       
          <div><AccountCircleIcon className='account__icon' style = {{fontSize:40}}/></div>
        <button className='userPage__button'>Account Details</button>  
        
      </div>
      </Link>
      <Link to = "/deposit">
      <div className = 'service lineTwo'>
        <div> <SavingsIcon className='account__icon' style= {{fontSize:40}}/></div>
        <button className='userPage__button'>Cash Deposit</button>  
        
      </div>
      </Link>
        
      <div className = 'service lineThree'>
      <Link to = '/withdraw'>
        <div>
          <AtmIcon  className='account__icon' style= {{fontSize:40}} />
        </div>
        <button className='userPage__button'>Cash Withdrawal</button>
        </Link>
      </div>
      <Link to = '/transfer'>
      <div className = 'service line4'>   
          <div><TransferWithinAStationIcon className='account__icon' style= {{fontSize:40}} /></div>
        <button className='userPage__button'>Transfer Amount</button>
       
      </div>
      </Link>
      </div>

      <div className='row2'>
      <Link to = '/transactions/details'>
      <div className = "service line5">
       
          <div><ReceiptIcon  className='account__icon' style= {{fontSize:40}} /></div>
        <button className='userPage__button'>View Transactions</button>
       
      </div>
      </Link>
      <div className = "service line6">
        <Link to = '/maintenance'>
          <div><InfoIcon className='account__icon' style= {{fontSize:40}} /></div>
        <button className='userPage__button'>Maintenance charge details</button>
        </Link>
      </div>
      <div className = "service line7">
        <Link to = '/changePassword'>
          <div><PasswordIcon  className='account__icon' style= {{fontSize:40}} /></div>
        <button className='++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++9G'>Change Password</button>
        </Link>
      </div>
      </div>
      </div>
  )
}

function example(){
  return <div>Hello</div>
}

export default UserPage
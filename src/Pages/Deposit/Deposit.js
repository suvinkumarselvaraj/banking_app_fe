import React,{useEffect} from 'react'
import './Deposit.css'
import { useNavigate } from 'react-router-dom';
function Deposit() {
  const navigate = useNavigate();
  useEffect(()=>{
      console.log('logg in to check if this is working');
      async function isSession(){
        const response = await fetch('/isSessionPresent',{
          method: 'GET',
          credentials: 'include'
        })
        const resp = await response.json();
        return resp;
      }
      isSession().then(data =>{
        if(data.session == "absent")
          navigate('/');
      })
    },[])

  function handleSubmit(event){
    event.preventDefault();
    var data = new FormData(event.target);
    var amount = data.get("deposit_amount");
    if(amount<1000 && amount > 999999)
    {
      alert("It is possible to deposit amount only within the given range: Rs. 1000 to Rs. 999999");
      return;
    }
    const passwordDatas = {'accountNumber':sessionStorage.getItem("accountNo"),'oPass':data.get('password')};
    
    async function checkPassword(){
      const response = await fetch('/checkPassword',{
        method : 'POST',
        headers:{
          'Accept':'application/json',
          'Content-type':'application/json'
        },
        body: JSON.stringify(passwordDatas)
      })
      const resp = await response.json();
      return resp;
    }
    checkPassword().then(data =>{
      if(data.oldPasswordCheck == "success"){
        var type = "deposit";
        var deposit_data = {
          'accountNumber' : sessionStorage.getItem("accountNo"),
          'customerId' : sessionStorage.getItem("customerId"),
          'amount' : amount,
          'balance': sessionStorage.getItem("balance"),
          'transactionType' : type
        }
        transaction(deposit_data).then(data=>{
          if(data.status === "success"){
            console.log("succesfully inserted");
            sessionStorage.removeItem("balance");
            sessionStorage.setItem("balance",data.balance);
            alert("successfully deposited");
            navigate("/accountDetails",{replace:true});
          }else
          alert("something wrong, try again later");
        })
        .catch(err => console.log(err))
      }else{
        alert('wrong password. try again')
      }
    })
    .catch(err => console.log(err))

    async function transaction(deposit_data){
      const response = await fetch('/transactions',{
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify(deposit_data)
      })
      const resp = await response.json();
      return resp;
    }
}
  return (
     <div className = 'Deposit__container'>
    <p>Deposit</p>
        <form onSubmit = {handleSubmit}>
        <div className = 'line1'>
        <p>Enter the amount to be deposited</p>
        <input className = "input_box" type="number" min = '1000' max = '9999999' name = "deposit_amount"></input>      
        </div>
        <div className = 'line2'>
        <p>Enter the password</p>
        <input className = "input_box"  type="password" name = "password"></input>      
        </div>
        <button type = "submit_button" className = "deposit_submit">Deposit</button>
        </form>
    </div>
    
  )
}

export default Deposit
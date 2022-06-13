import React ,{useEffect,useState} from "react"
import { useNavigate } from "react-router-dom";
import './Transactions.css';

function Transactions() {
    var i = 0;
            const navigate = useNavigate();
            useEffect(()=>{
                console.log('logg in to check if this is working');
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
                  })
            // if(sessionStorage.getItem("customerId")==='undefined')
            // navigate("/login");
            const [accounts,setAccounts] = useState([]);
   useEffect(()=>{
    var id = sessionStorage.getItem("customerId");
    
    fetch('/transactionDetails?id='+id.toString())
    .then(res => res.json())
    .then(data=>{
        setAccounts(data);
        console.log(data);
        for(var i = 0; i<accounts.length;i++){
            console.log(accounts[i].transactionType);
        }
    })
   },[])
        

    return (
      <div className='Transactions__container'>
          <div className="row1__container">
              <div className="field1 field">
                  <strong>Transaction ID</strong>
              </div>
              <div className="field2 field">
                  <strong>Transaction Type</strong>
              </div>
              <div className="field3 field">
                  <strong>Amount (Rs)</strong>
              </div>
              <div className="field4 field">
                  <strong>Balance (Rs)</strong>
              </div>
              <div className="filed5 field">
                  <strong>Transaction date</strong>
              </div>
                
          </div>
          
          {accounts?.map(account => (
              <div className="row2__container">
                <div className="field1 field">
                {++i}
            </div>
            <div className="field2 field">
                {account.transactionType}
            </div>
            <div className="field3 field">
            {account.amount}
            </div>
            <div className="field4 field">
            {account.balance}
            </div>
            <div className="filed5 field">
            {account.date}
            </div>

             
                         
          </div>
             ))}

                </div>
    )
  }
  export default Transactions;
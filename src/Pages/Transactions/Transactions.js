import React ,{useEffect,useState} from "react"
import { useNavigate } from "react-router-dom";
import './Transactions.css';

function Transactions() {
    const navigate = useNavigate();
    const [accounts,setAccounts] = useState([]);

    useEffect(()=>{
        console.log('logg in to check if this is working');
        async function iSSession(){
            const response = await fetch('/isSessionPresent',{
                method: 'GET',
                credentials: 'include'
            })
            const resp = await response.json();
            return resp;
        }
        iSSession().then(data =>{
            if(data.session == "absent"){
                navigate('/');
            }else{
                transactionDetail().then(data=>{
                    console.log(data);
                    setAccounts(data);
                    console.log(accounts);
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));

        async function transactionDetail(){
            const responses = await fetch('/transactiondetails?id='+id.toString())
            //const resp = await response.json();
            const resp = await responses.json();
            console.log(resp);
            return resp;
        }
    },[])

    var i = 0;   
    var id = sessionStorage.getItem("customerId");
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

  function example1(){
    return <div>Hello</div>
  }
  export default Transactions;
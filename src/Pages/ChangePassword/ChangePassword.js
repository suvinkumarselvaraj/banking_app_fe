
import React ,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './ChangePassword.css';

function ChangePassword() {
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
    })
    function handleChangePassword(event){
        event.preventDefault();
        var data = new FormData(event.target);

        if(oPass =='' || pass1==''||pass2 ==''){
            alert("Empty field values not allowed");
            return;
        }
        
        var oPass = data.get("oPassword");
        var pass1 = data.get("newPassword1");
        var pass2 = data.get("newPassword2");
        console.log(pass1);
        console.log(pass2);
        if(pass1 !== pass2){
            alert("New passwords doesn't match. Try again!");
            return;
        }
        if(pass1.length<6 || pass1.includes(" "))
        {
            alert("Password badly formatted");
            return;
        }
        var uCase = 0;  
        var lCase = 0;
        var nCase = 0;
        for(var i = 0; i<pass1.length;i++){
            if(pass1[i]>='a'&&pass2[i]<='z')
            uCase++;
            else
            if(pass1[i]>='A'&&pass2[i]<='Z')
            lCase++;
            else
            if(pass1[i]>=0 && pass2[i]<=9)
            nCase++;

        }
        if(uCase<2 || lCase<2 || nCase<2) 
        {
            alert("Password must contain atleast 2 upper case characters, 2 lower case characters and 2 integers");
            return;
        }

        //db connection to check the old password
        const pass = {'accountNumber':sessionStorage.getItem("accountNo").toString(), 'oPass':oPass,'nPass':pass1};
        async function checkPass(){
            const response = await fetch('/checkPassword',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify(pass)
        })
            const resp = await response.json();
            return resp;
        } 
        checkPass().then(data =>{
            if(data.oldPasswordCheck == "success")
            {
                changePass().then(data =>{
                    if(data.insertion == "success"){
                        console.log('success');
                    } else
                    if(data.insertion === "failure")
                    {   
                        console.log(data.insertion);
                        alert("The new password must be unique and should not be similar to that of your 3 old passwords");
                    }
                    else
                    if(data.status === "success" )
                    {
                        alert("successful");
                        navigate("/home",{replace:true});
                    }
                })
            }else{
                alert('Old password does not match the record');
            }
        })
        async function changePass(){
            const response = await fetch('/changePassword',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pass)
            })
            const resp = await response.json();
            return resp;
        }
    }
  return (
    <div className='ChangePassword__container'>
        <form onSubmit={handleChangePassword}>
            <div className='line1'>
                <p>Enter your old password</p>
                <input type = 'password' className='input_box' placeholder='old password' name = 'oPassword'></input>
            </div>
            <div className='line2'>
                <p>Enter your new password</p>
                <input type = 'password' className='input_box' placeholder='new password' name = 'newPassword1'></input>
            </div>
            <div className='line3'>
                <p>Re-enter new password</p>
                <input type = 'password' className='input_box' placeholder='re-enter new password' name = 'newPassword2'></input>
            </div>
            <button className='submit_button'>Change</button>
        </form>

    </div>
  )
}

export default ChangePassword
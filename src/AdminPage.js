import React, { useEffect } from 'react'
import { useStateValue } from './StateProvider'
import { Link } from 'react-router-dom';
import './AdminPage.css'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
function AdminPage() {
    const [{active_admin},dispatch] = useStateValue();
    useEffect(()=>{

    })
  return (
    <div className='AdminPage__container'>
        <div className='adminLine1'>
        <strong>Welcome {active_admin.toUpperCase()}</strong>
        </div>
        <div className='options__container'>
        <Link to = '/adminAddNewCx'>
            <div className='add__customer'>
                <div>
               <AddCircleOutlineIcon className = 'account__icon' style = {{fontSize:40}} />
               </div>
                <button className='addCustomer'>Add new customer</button>
                
            </div>
            </Link>
            <Link to = '/viewTopCustomers'>
            <div className='view__customer'>
                <div><PageviewOutlinedIcon  className = 'account__icon' style = {{fontSize:40}} /></div>
                <button className='viewCustomer'>View top customer</button>
                
            </div>
            </Link>
            <Link to = '/users'>
            <div className='view__customer__totally'>
               <div> <FormatListNumberedOutlinedIcon className = 'account__icon' style = {{fontSize:40}} /></div>
                <button className='viewCustomer'>List users</button>       
            </div>
            </Link>

        </div>
    </div>
  )
}

export default AdminPage
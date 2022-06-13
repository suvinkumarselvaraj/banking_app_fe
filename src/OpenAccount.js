import React, { useEffect } from 'react'
import './OpenAccount.css'
import { Link, useNavigate } from 'react-router-dom';
function OpenAccount() {
  
  return (
    <div className='OpenAccount__container'>
        <Link to = '/open'>
        <button type='button' className='OpenAccount__button'>
                Open Account
            </button>
            </Link>
    </div>
  )
}

export default OpenAccount
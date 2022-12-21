import React from 'react'
import { NavLink } from 'react-router-dom'
import './PayReqButt.css';

export default function PayReqButt() {
  return (
    <div className='sidebar-single-div pay-request-butt'>
        <NavLink to='/pay' className='pay-request-a'>
            <span className='pay-request-a-v'>V</span>
            <span className='pay-request-text'>Pay or Request</span>
        </NavLink>
    </div>
  )
}

import React from 'react'
import { NavLink } from 'react-router-dom'
import './PayReqButt.css';

export default function PayReqButt({ setOpenMenu }) {
  return (
    <div className='sidebar-single-div pay-request-butt' onClick={() => setOpenMenu(false)}>
      <NavLink to='/pay' className='pay-request-a' onClick={() => setOpenMenu(false)}>
        <span className='pay-request-a-v'>V</span>
        <span className='pay-request-text'>Pay or Request</span>
      </NavLink>
    </div>
  )
}

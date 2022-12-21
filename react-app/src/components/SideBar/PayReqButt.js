import React from 'react'
import { NavLink } from 'react-router-dom'

export default function PayReqButt() {
  return (
    <div className='sidebar-single-div'>
        <NavLink to='/pay'>
            <span>V</span>
            <span>Pay or Request</span>
        </NavLink>
    </div>
  )
}

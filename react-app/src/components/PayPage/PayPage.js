import React from 'react'
import SideBar from '../SideBar/SideBar'
import PayForm from './PayForm';
import './PayPage.css';

export default function PayPage() {
  return (
    <div className='pay-page-div'>
        <SideBar />
        <PayForm />
    </div>
  )
}

import React from 'react'
import SideBar from '../SideBar/SideBar'
import SideBarMobile from '../SideBar/SideBarMobile';
import PayForm from './PayForm';
import './PayPage.css';

export default function PayPage() {
  return (
    <div className='pay-page-div'>
        <SideBar />
        <SideBarMobile />
        <PayForm />
    </div>
  )
}

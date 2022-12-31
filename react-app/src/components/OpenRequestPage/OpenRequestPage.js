import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOpenRequests } from '../../store/openRequest';
import './OpenRequestPage.css';
import SideBar from '../SideBar/SideBar'
import OpenPayments from './OpenPayments';
import OpenRequests from './OpenRequests';
import SideBarMobile from '../SideBar/SideBarMobile';

export default function OpenRequestPage() {
    const [active, setActive] = useState('Requests');
    const userOpens = useSelector(state => state.openReqPay.openRequests);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllOpenRequests())
    }, [dispatch])

  return (
    <div className='openrequest-page-div'>
        <SideBar />
        <SideBarMobile />        
        <div className='openrequest-page'>
            <h1 className='openrequest-head'>Open Requests</h1>
            <div className='openrequest-tag'>
                <button className={`openrequest-button ${active === 'Requests' ? 'open-requests-active' : ''}`} onClick={() => { setActive('Requests') }}>Requests</button>
                <button className={`openrequest-button ${active === 'Payments' ? 'open-requests-active' : ''}`} onClick={() => { setActive('Payments') }}>Payments</button>
            </div>
            {active === 'Requests' &&
                <div className='open-requests-body-div'>
                    <OpenRequests userRequests={userOpens?.RequestFroms || []} />
                </div>
            }
            {active === 'Payments' &&
                <div className='open-requests-body-div'>
                    <OpenPayments userPayments={userOpens?.RequestTos || []} />
                </div>
            }            
        </div>
    </div>
  )
}

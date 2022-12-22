import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTransactions } from '../../store/transactons';
import SideBar from '../SideBar/SideBar';
import './AccountPage.css';

export default function AccountPage() {
  const [active, setActive] = useState('MyTrans');
  const userOpens = useSelector(state => state.openReqPay.openRequests);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTransactions())
  }, [dispatch])

  return (
    <div className='transaction-page-div'>
      <SideBar />
      <div className='transaction-page'>
        <div className='transaction-tag'>
          <button className={`transaction-button ${active === 'FrdTrans' ? 'transaction-active' : ''}`} onClick={() => { setActive('FrdTrans') }}>
            <i className="fa-solid fa-user-group transaction-button-icon"></i>
          </button>
          <button className={`transaction-button ${active === 'MyTrans' ? 'transaction-active' : ''}`} onClick={() => { setActive('MyTrans') }}>
            <i className="fa-solid fa-user transaction-button-icon"></i>
          </button>
        </div>
        {active === 'MyTrans' &&
          <div className='transaction-body-div'>
            {/* <OpenRequests userRequests={userOpens?.RequestFroms || []} /> */}
            Me
          </div>
        }
        {active === 'FrdTrans' &&
          <div className='transaction-body-div'>
            {/* <OpenPayments userPayments={userOpens?.RequestTos || []} /> */}
            Friend
          </div>
        }
      </div>
    </div>
  )
}

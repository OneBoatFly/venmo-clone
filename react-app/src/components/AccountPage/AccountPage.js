import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTransactions } from '../../store/transactons';
import SideBar from '../SideBar/SideBar';
import UserTransactions from './UserTransactions';
import './AccountPage.css';

export default function AccountPage() {
  const [active, setActive] = useState('MyTrans');
  const userTransactions = useSelector(state => state.transaction.userTransactions);
  const friendsTransactions = useSelector(state => state.transaction.friendsTransactions);

  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllTransactions())
    }, [])

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
            <UserTransactions userTransactions={userTransactions || []} />
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

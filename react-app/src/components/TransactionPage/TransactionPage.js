import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchAllTransactions } from '../../store/transactons';
import SideBar from '../SideBar/SideBar';
import UserTransactions from './UserTransactions';
import './TransactionPage.css';
import FriendsTransactions from './FriendsTransactions';
import SideBarMobile from '../SideBar/SideBarMobile';

export default function AccountPage() {
  const [active, setActive] = useState('MyTrans');

  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllTransactions())
    }, [])

  return (
    <div className='transaction-page-div'>
      <SideBar />
      <SideBarMobile />      
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
            <UserTransactions />
          </div>
        }
        {active === 'FrdTrans' &&
          <div className='transaction-body-div'>
            <FriendsTransactions />
          </div>
        }
      </div>
    </div>
  )
}

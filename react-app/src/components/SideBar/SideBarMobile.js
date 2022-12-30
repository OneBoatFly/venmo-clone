import React, { useState } from 'react';
import LogoutButton from '../Auth/LogoutButton';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PayReqButt from './PayReqButt';
import { getDecimalNum } from '../../utils/getDecimalNum';
import './SideBarMobile.css';

export default function SideBarMobile() {
    const user = useSelector(state => state.session.user);
    const amount = getDecimalNum(user?.balance)

    const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className='sidebar-mobile-wrapper'>
      <div className="sidebar-menu-icon-wrapper" onClick={() => setOpenMenu(prev => !prev)}>
        <i className="fa-solid fa-bars"></i>
      </div>
      <nav className={`sidebar-mobile-div ${openMenu ? 'open-sidebar-mobile': 'close-sidebar-mobile'}`}>
          {user &&
              <>
                  <div className='sidebar-mobile-single-div' onClick={() => setOpenMenu(false)}>
                      {user ?
                          <NavLink to='/account' exact={true} className='vinmo-a'>
                              <span className='vinmo-span'>Vinmo</span>
                          </NavLink>
                          :
                          <NavLink to='/' exact={true} className='vinmo-a'>
                              <span className='vinmo-span'>Vinmo</span>
                          </NavLink>
                      }
                  </div>
                  <div className='sidebar-mobile-single-div profile-container'>
                      <img src={user.imageUrl} alt='' className='side-bar-profile-pic' />
                      <div className='sidebar-mobile-name-email-div'>
                          <span>Hi, {user.username}</span>
                          <NavLink to={`/transactions`}>@{user.email}</NavLink>
                      </div>
                  </div>
                  <PayReqButt />
                  <div className='sidebar-mobile-single-div'>
                      <span className='sidebar-mobile-balance'>${amount} in Vinmo</span>
                  </div>
                  <div className='sidebar-mobile-single-div sidebar-mobile-menu'>
                      <NavLink to='/transactions' onClick={() => setOpenMenu(false)}>My Transactions</NavLink>
                      <NavLink to='/open' onClick={() => setOpenMenu(false)}>Open Request</NavLink>
                      <NavLink to='/friends' onClick={() => setOpenMenu(false)}>Friends</NavLink>
                      {/* <NavLink to='/search' onClick={(e) => e.preventDefault()}>Search - feature to come</NavLink> */}
                      <LogoutButton />
                  </div>
              </>
          }
      </nav>
    </div>
  )
}

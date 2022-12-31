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
    const [menuIcon, setMenuIcon] = useState(true);

    const handleMenuClick = () => {
        setOpenMenu(prev => !prev)
        setMenuIcon(false);
    }

  return (
    <div className='sidebar-mobile-wrapper'>
        <div className={`sidebar-menu-icon-wrapper ${menuIcon ? 'show-menu-icon': 'no-menu-icon'}`} onClick={handleMenuClick}>
        <i className="fa-solid fa-bars"></i>
      </div>
      <nav className={`sidebar-mobile-div ${openMenu ? 'open-sidebar-mobile': 'close-sidebar-mobile'}`}>
          {user &&
              <>
                  <div className='sidebar-mobile-single-div sidebar-mobile-head' onClick={() => setOpenMenu(false)}>
                      {user ?
                          <NavLink to='/account' exact={true} className='vinmo-a'>
                              <span className='vinmo-span'>Vinmo</span>
                          </NavLink>
                          :
                          <NavLink to='/' exact={true} className='vinmo-a'>
                              <span className='vinmo-span'>Vinmo</span>
                          </NavLink>
                      }
                      <button className='sidebar-mobile-exit-button' onClick={() => setMenuIcon(true)}>
                          <i className="fa-solid fa-xmark"></i>
                      </button>
                  </div>
                  <div className='sidebar-mobile-single-div profile-container'>
                      <img src={user.imageUrl} alt='' className='side-bar-profile-pic' />
                      <div className='sidebar-mobile-name-email-div'>
                          <span>Hi, {user.username}</span>
                          <NavLink to={`/transactions`}>@{user.email}</NavLink>
                      </div>
                  </div>
                  <PayReqButt setOpenMenu={setOpenMenu} />
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

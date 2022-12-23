import React from 'react';
import LogoutButton from '../Auth/LogoutButton';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PayReqButt from './PayReqButt';
import './SideBar.css';
import { getDecimalNum } from '../../utils/getDecimalNum';

export default function SideBar() {
  const user = useSelector(state => state.session.user);
  const amount = getDecimalNum(user?.balance)

return (
    <nav className='sidebar-div'>
      {user &&
        <>
          <div className='sidebar-single-div'>
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
          <div className='sidebar-single-div profile-container'>
            <img src={user.imageUrl} alt='' className='side-bar-profile-pic'/>
            <div className='sidebar-name-email-div'>
              <span>Hi, {user.username}</span>
              <NavLink to={`/account`}>@{user.email}</NavLink>
            </div>
          </div>
          <PayReqButt />
          <div className='sidebar-single-div'>
        <span className='sidebar-balance'>${amount} in Vinmo</span>
          </div>
          <div className='sidebar-single-div sidebar-menu'>
            <NavLink to='/account'>My Account</NavLink>
            <NavLink to='/open'>Open Request</NavLink>
            <NavLink to='/friends'>Friends</NavLink>
            <NavLink to='/search' onClick={(e) => e.preventDefault()}>Search - feature to come</NavLink>
            <LogoutButton />
          </div>
        </>
      }
    </nav>
  );
}

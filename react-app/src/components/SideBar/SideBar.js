import React from 'react';
import LogoutButton from '../Auth/LogoutButton';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PayReqButt from './PayReqButt';
import './SideBar.css';

export default function SideBar() {
  const user = useSelector(state => state.session.user);

return (
    <nav className='sidebar-div'>
      {user &&
        <>
          <div className='sidebar-single-div'>
            <NavLink to='/' exact={true} className='vinmo-a'>
              <span className='vinmo-span'>Vinmo</span>
            </NavLink>
          </div>
          <div className='sidebar-single-div'>
            <img src={user.imageUrl} alt=''/>
            <div className='sidebar-name-email-div'>
              <span>Hi, {user.username}</span>
              <NavLink to={`/u/${user.username}`}>@ {user.email}</NavLink>
            </div>
          </div>
          <PayReqButt />
          <div className='sidebar-single-div'>
              <span>${user.balance / 100} in Vinmo</span>
          </div>
          <div className='sidebar-single-div'>
            <NavLink to='/open'>Open Request</NavLink>
            <LogoutButton />
          </div>
        </>
      }
    </nav>
  );
}

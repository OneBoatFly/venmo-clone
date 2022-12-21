
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => { 
  return (
    <nav className='nav-bar-nav'>
      <div className='nav-bar-divs'>
        <NavLink to='/' exact={true} className='vinmo-a'>
          <span className='vinmo-span'>Vinmo</span>
        </NavLink>
      </div>
      <div className='nav-bar-divs'>
        <NavLink to='/login' exact={true} className='login-a'>
          Login
        </NavLink>
        <NavLink to='/sign-up' exact={true} className='sign-up-a'>
          <span className='vinmo-span logo-tiny'>V</span>
          <span className='nav-bar-single-span'>Get Vinmo</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;

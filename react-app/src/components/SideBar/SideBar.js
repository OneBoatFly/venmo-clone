import React from 'react';
import LogoutButton from '../auth/LogoutButton';
import { NavLink } from 'react-router-dom';

export default function SideBar() {
return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

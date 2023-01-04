import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import './HomeMain.css';

export default function HomeMain() {
  const dispatch = useDispatch();

  const onDemo = () => {
    dispatch(login('yizhou@aa.io', 'password'));
  };

  return (
    <div className='home-main-div'>
      <div className='home-main-sub-div'>
        <div className='home-main-left'>
          <span className='home-main-head'>Fast, safe, social payments</span>
          <span className='home-main-narrative'>Pay. Get paid. Shop. Share. Join tens of millions of people on Venmo.</span>
          <div className='demo-user' onClick={() => onDemo()}>
            <span className='vinmo-span-in-main'>V</span>
            <span className='nav-bar-single-span'>Demo User</span>
          </div>
        </div>
        <div className='home-main-right'>
          <img src="https://images.ctfassets.net/gkyt4bl1j2fs/1JiidWGTfhUgMxEmCJO8m6/1a8d451b72b3b8a0d3c769b4dc8880dd/Homepage_Desktop_UI_Comp_01.png?w=2351&h=2930&q=50&fm=webp" alt='' className='upper-phone' />
          <img src='https://images.ctfassets.net/gkyt4bl1j2fs/7apFsv5d4BzvErxKWJEj1p/c5d4ab04f8a2a46fb784dcb95dc8c1a2/Screen_Shot_2022-05-19_at_10.29.13_AM.png' alt='' className='doodle-multi' />
        </div>
      </div>
    </div>
  )
}

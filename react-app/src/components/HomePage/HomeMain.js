import React from 'react';
import { NavLink } from 'react-router-dom';
import './HomeMain.css';

export default function HomeMain() {
  return (
    <div className='home-main-div'>
      <div className='home-main-sub-div'>
        <div className='home-main-left'>
          <span className='home-main-head'>Fast, safe, social payments</span>
          <span className='home-main-narrative'>Pay. Get paid. Shop. Share. Join tens of millions of people on Venmo.</span>
          <NavLink to='/sign-up' exact={true} className='sign-up-a-in-main'>
            <span className='vinmo-span-in-main'>V</span>
            <span className='nav-bar-single-span'>Get Vinmo</span>
          </NavLink>
        </div>
        <div className='home-main-right'>
          <img src='https://images.ctfassets.net/gkyt4bl1j2fs/6dMOFkDr1hizWs0WolE9qI/b189b5fa7968e55a49e17647485454ec/Homepage_Bit1.svg' alt='' className='doodle-green'/>
          <img src='https://images.ctfassets.net/gkyt4bl1j2fs/1lkW032LqzVC0G3hUHAXER/0698a44d0c6c360f99ee08025146891e/Homepage_Desktop_UI_Comp_01_Partial_A.png?w=1157&h=1387&q=50&fm=webp' alt='' className='upper-phone'/>
          <img src="https://images.ctfassets.net/gkyt4bl1j2fs/69Oy6OCLUOPWgsDsrwMvvF/aca39b4bf4b2f4529c6cb4946186173f/Homepage_Desktop_UI_Comp_01__4_.png?w=1584&h=1751&q=50&fm=webp" alt='' className='upper-phone-shadow' />
          {/* <img src='https://images.ctfassets.net/gkyt4bl1j2fs/2BOTYOgZOZ7phFmhZ9f3Xn/ec1de5984da8ed5788f17f4ae512d55d/Group_99243014.png?w=3045&h=3340&q=50&fm=webp' alt='' className='lower-phone' /> */}
          <img src='https://images.ctfassets.net/gkyt4bl1j2fs/1kzGJV6ENbBO37jAmEdk1q/8e19c2d605fe213ecbc8e24fa5a6b7be/Homepage_Bit2.svg' alt='' className='doodle-multi' />
        </div>
      </div>
    </div>
  )
}
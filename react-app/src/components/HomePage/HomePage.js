import React from 'react';
import HomeMain from './HomeMain';
import NavBar from './NavBar';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className='home-page-div'>
        <NavBar />
        <HomeMain />
    </div>
  )
}

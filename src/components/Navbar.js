import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import Sidebar from './Sidebar';  
import './Navbar.css';
import product from '../images/product logo.png';

function Navbar() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className='navbar'>
        <Link to='#' className='menu-bars' onClick={() => setOpen(!isOpen)}>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </Link>
        <img src={product} style={{width:'8%'}} />
      
      </div>
      <Sidebar isOpen={isOpen} />
    </>
  );
}

export default Navbar;

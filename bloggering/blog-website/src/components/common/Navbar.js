import React, { useState } from 'react';
import Logout from './Logout';
import { Link } from 'react-router-dom';
import '../styles/nav.css';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';
export const Navbar = ({ isAuth, setIsAuth }) => {
  const [ showLinks, setShowLinks ] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  
  return (
    <nav>
      <h1 className="logo">Untitled Blog</h1>
      <div className="burger-menu" onClick={toggleLinks}>
        {showLinks ? <RxCross2 size={20} /> : <RxHamburgerMenu size={20} />}
      </div>
      <div className={`nav-links ${showLinks ? 'show' : ''}`}>
        <Link to="/" className='nav-btn'>Home</Link>
        {isAuth ?
          <>
            <Link to="/createpost" className='nav-btn'>Create Post</Link>
            <Logout setIsAuth={setIsAuth} />
          </>
          :
          <Link to="/login" className='nav-btn'>Login</Link>
        }
      </div>
    </nav>
  )
}

export default Navbar;
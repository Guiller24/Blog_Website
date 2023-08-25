import React from 'react';
import Logout from './Logout';
import { Link } from 'react-router-dom';


export const Navbar = ({ isAuth, setIsAuth }) => {
  console.log(isAuth);
  return (
    <nav>
        <h1 className="logo">Untitled Blog</h1>
      <Link to="/" className='nav-btn'>Home</Link>
      {isAuth ? 
        <>
          <Link to="/createpost" className='nav-btn'>Create Post</Link>
          <Logout setIsAuth={setIsAuth} />
        </>
         : 
        <Link to="/login" className='nav-btn'>Login</Link>
      }
    </nav>
  )
}

export default Navbar;
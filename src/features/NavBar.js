import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { Route } from 'react-router-dom';

class NavBar extends React.Component {
  render() {
    return (
      <div className='nav'>
        <div>
          <h1>Welcome</h1>
        </div>
        <nav className='nav-bar'>
          <Link to='/login'>LOGIN</Link>
          <Link to='/register'>REGISTER</Link>
        </nav>
      </div>
    );
  }
}

export default NavBar;

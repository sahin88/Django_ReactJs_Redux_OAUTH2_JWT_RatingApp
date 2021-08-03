import React, { Fragment } from 'react';
import '../css/navbar.css'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth'
const Navbar = ({ logout, isAuthenticated }) => {
  const guestlink = () => {

    return (<div className="nav-ul">
      <Link className="link" to="/signup">Signup</Link>
      <Link className="link" to="/login">Login</Link>

    </div>)

  }
  const authLink = () => {
    return (<div className="nav-ul">

      <Link className="link" onClick={logout}>Logout</Link>

    </div>)

  }


  return (<nav>
    <input id="nav-toggle" type="checkbox" />
    <div className="nav-logo">
      Bewertung App
    </div>
    <label for="nav-toggle" class="icon-burger">
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </label>
    <div className="nav-ul">
      <Link className="link" to="/">Home</Link>
      {isAuthenticated ? authLink() : guestlink()}

    </div>

  </nav>);
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});



export default connect(mapStateToProps, { logout })(Navbar);

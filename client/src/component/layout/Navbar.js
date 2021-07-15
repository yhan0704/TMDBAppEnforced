import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

function Navbar({ isAuthenticated, user, logout }) {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> MovieApp
        </Link>
      </h1>
      <ul>
        <li>
          {isAuthenticated ? (
            <Link to="/" style={{ display: "none" }}>
              Register
            </Link>
          ) : (
            <Link to="/register">Register</Link>
          )}
        </li>
        <li>
          {isAuthenticated && user ? (
            <Link to={`/profile/myProfile`}>Profile</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
        <li>
          {isAuthenticated && user && (
            <a href="/" onClick={logout}>
              Log Out
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
}

const mapStateProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateProps, { logout })(Navbar);

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './navbar.css';


const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}

        <Link to="/" className="navbar-logo">

          <div className="logo-cube">
            <div className="cube">
              <div className="cube-face front"></div>
              <div className="cube-face back"></div>
              <div className="cube-face right"></div>
              <div className="cube-face left"></div>
              <div className="cube-face top"></div>
              <div className="cube-face bottom"></div>
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/features" className="nav-link">Features</Link>
          {/* <Link to="/ether" className="nav-link">Ether</Link>
          <Link to="/use-cases" className="nav-link">Use cases</Link> */}
          {/* <Link to="/docs" className="nav-link">Docs</Link> */}
          <Link to="/blog" className="nav-link">Blog</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        {/* Auth Button */}
        <div className="navbar-auth">
          {user ? (
            <div className="user-menu">
              <Link to="/dashboard" className="dashboard-btn">
                <span>Dashboard</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9,22 9,12 15,12 15,22"></polyline>
                </svg>
              </Link>
              <div className="user-dropdown">
                <div className="user-info">
                  <img 
                    src={user.avatar_url} 
                    alt={user.name || user.login} 
                    className="user-avatar-small"
                  />
                  <span className="user-name-small">{user.name || user.login}</span>
                </div>
                <button className="logout-btn-small" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="get-started-btn">
              <span>Get Started</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

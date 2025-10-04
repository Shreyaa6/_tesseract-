import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './navbar.css';


const Navbar = ({ onNavigate }) => {
  const handleNavClick = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}

        <div className="navbar-logo" onClick={() => handleNavClick('landing')}>

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
          <a href="#home" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('landing'); }}>Home</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#ether" className="nav-link">Ether</a>
          <a href="#use-cases" className="nav-link">Use cases</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#docs" className="nav-link">Docs</a>
          <a href="#blog" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('blog'); }}>Blog</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        {/* Action Buttons */}
        <div className="navbar-actions">
          {user ? (
            <Link to="/dashboard" className="signup-btn">
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="signup-btn">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

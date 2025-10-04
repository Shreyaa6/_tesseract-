import React from 'react';
import { Link } from 'react-router-dom';
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
          <a href="#features" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('features'); }}>Features</a>
          <a href="#ether" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('ether'); }}>Ether</a>
          <a href="#use-cases" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('usecase'); }}>Use cases</a>
          <a href="#docs" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('docs'); }}>Docs</a>
          <a href="#blog" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('blog'); }}>Blog</a>
          <a href="#contact" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

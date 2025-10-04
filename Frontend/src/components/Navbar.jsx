import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
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
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#ether" className="nav-link">Ether</a>
          <a href="#use-cases" className="nav-link">Use cases</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#docs" className="nav-link">Docs</a>
          <a href="#blog" className="nav-link">Blog</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useRef } from 'react';
import './footer.css';

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const glowContainerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (glowContainerRef.current) {
      const rect = glowContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <>
      {/* Hero Section */}
      {/* <section className="footer-hero">
        <div className="footer-hero-content">
          <h2 className="footer-hero-title">
            Built for the world's fastest engineering teams, now available for everyone
          </h2>
          <div className="footer-hero-actions">
            <button className="footer-demo-btn">Request a demo</button>
            <div
              className="cta-glow-container"
              ref={glowContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                '--mouse-x': `${mousePosition.x}px`,
                '--mouse-y': `${mousePosition.y}px`
              }}
            >
              <div className="cta-glow cta-glow-1"></div>
              <div className="cta-glow cta-glow-2"></div>
              <button className="footer-trial-btn">Start free trial →</button>
            </div>
          </div>
        </div>
        <div className="footer-hero-bg">
          <div className="hexagon-pattern"></div>
        </div>
        <div className="footer-hero-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L22 7L12 12L2 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="blog-footer">
        {/* Footer Links */}
        <div className="footer-container">
          <div className="footer-columns">
            <div className="footer-column">
              <h3 className="footer-title">Features</h3>
              <ul className="footer-links">
                <li><a href="#cli">CLI</a></li>
                <li><a href="#merge-queue">Merge queue</a></li>
                <li><a href="#insights">Insights</a></li>
                <li><a href="#pr-inbox">PR inbox</a></li>
                <li><a href="#ai-reviews">AI reviews</a></li>
                <li><a href="#chat">Chat <span className="new-badge">NEW</span></a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">Company</h3>
              <ul className="footer-links">
                <li><a href="#blog">Blog</a></li>
                <li><a href="#customers">Customers</a></li>
                <li><a href="#careers">Careers <span className="job-count">19</span></a></li>
                <li><a href="#privacy">Privacy policy</a></li>
                <li><a href="#terms">Terms of service</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">Resources</h3>
              <ul className="footer-links">
                <li><a href="#docs">Docs</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#status">Status</a></li>
                <li><a href="#guides">Guides</a></li>
                <li><a href="#stacking">Stacking workflow</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">Connect</h3>
              <ul className="footer-links">
                <li><a href="#contact">📧 Contact us</a></li>
                <li><a href="#slack"># Community Slack</a></li>
                <li><a href="#github">🐙 GitHub</a></li>
                <li><a href="#twitter">𝕏 X</a></li>
                <li><a href="#linkedin">💼 LinkedIn</a></li>
                <li><a href="#youtube">📺 YouTube</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-status">
              <span className="status-indicator">🟢</span>
              <span>All systems operational</span>
            </div>
            <div className="footer-copyright">
              © Tesseract 2025
            </div>
          </div>
        </div>

        {/* Neon Sign Section */}
        <section className="neon-section">
          <div className="neon-container">
            <div className="neon-sign">
              <h1 className="neon-text">
                {'Tesseract'.split('').map((letter, index) => (
                  <span
                    key={index}
                    className="neon-letter"
                    style={{ '--delay': `${index * 0.1}s` }}
                  >
                    {letter}
                  </span>
                ))}
              </h1>
            </div>
            <div className="neon-status">
              <span className="status-dot">🟢</span>
              <span className="status-text">All systems operational</span>
            </div>
            <div className="neon-copyright">
              © Tesseract 2025
            </div>
            <div className="neon-url">
              <div className="url-box">
                https://graphite.dev/homepage
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;

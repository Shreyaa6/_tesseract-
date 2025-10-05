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
      {/* Footer */}
      <footer className="blog-footer">
        <div className="footer-container">
          {/* Logo */}
          <div className="footer-logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path 
                d="M20 2L38 12L20 22L2 12L20 2Z" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinejoin="round"
              />
              <path 
                d="M2 28L20 38L38 28" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinejoin="round"
              />
              <path 
                d="M2 18L20 28L38 18" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinejoin="round"
              />
              {/* Inner hexagon */}
              <path 
                d="M20 6L32 12L20 18L8 12L20 6Z" 
                fill="white" 
                stroke="white" 
                strokeWidth="1.5" 
                strokeLinejoin="round"
              />
              <path 
                d="M8 24L20 30L32 24" 
                fill="white" 
                stroke="white" 
                strokeWidth="1.5" 
                strokeLinejoin="round"
              />
              <path 
                d="M8 18L20 24L32 18" 
                fill="white" 
                stroke="white" 
                strokeWidth="1.5" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          {/* Footer Columns */}
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
                <li>
                  <a href="mailto:contact@tesseract.dev" className="social-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="https://slack.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52-2.523A2.528 2.528 0 0 1 5.042 10.12h2.52v2.522a2.528 2.528 0 0 1-2.52 2.523zm1.271-5.045H5.042a2.528 2.528 0 0 1-2.52-2.523A2.528 2.528 0 0 1 5.042 2.567a2.528 2.528 0 0 1 2.52 2.523v2.53z"/>
                      <path d="M8.313 5.042a2.528 2.528 0 0 1 2.523-2.52 2.528 2.528 0 0 1 2.523 2.52v2.52H8.313V5.042zm5.045 1.271V5.042a2.528 2.528 0 0 1 2.523-2.52 2.528 2.528 0 0 1 2.523 2.52 2.528 2.528 0 0 1-2.523 2.523H13.358z"/>
                      <path d="M18.958 8.313a2.528 2.528 0 0 1 2.52 2.523 2.528 2.528 0 0 1-2.52 2.523h-2.52V8.313h2.52zm-1.271 5.045h2.52a2.528 2.528 0 0 1 2.52 2.523 2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.52-2.523v-2.52z"/>
                      <path d="M15.687 18.958a2.528 2.528 0 0 1-2.523 2.52 2.528 2.528 0 0 1-2.523-2.52v-2.52h5.046v2.52zm-5.045-1.271v2.52a2.528 2.528 0 0 1-2.523 2.52 2.528 2.528 0 0 1-2.523-2.52 2.528 2.528 0 0 1 2.523-2.523h5.046z"/>
                    </svg>
                    Community Slack
                  </a>
                </li>
                <li>
                  <a href="https://github.com/tesseract" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/tesseract" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    X
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/company/tesseract" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com/@tesseract" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            © _tesseract/ 2025
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

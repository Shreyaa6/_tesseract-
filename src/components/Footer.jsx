import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo */}
          <div className="footer-logo">
            <div className="logo-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                {/* Multi-layered hexagonal logo */}
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
                  stroke="white" 
                  strokeWidth="1.5" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M8 24L20 30L32 24" 
                  stroke="white" 
                  strokeWidth="1.5" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M8 18L20 24L32 18" 
                  stroke="white" 
                  strokeWidth="1.5" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Footer Columns */}
          <div className="footer-columns">
            {/* Features Column */}
            <div className="footer-column">
              <h3 className="column-title">Features</h3>
              <ul className="column-links">
                <li><a href="#" className="footer-link">CLI</a></li>
                <li><a href="#" className="footer-link">Merge queue</a></li>
                <li><a href="#" className="footer-link">Insights</a></li>
                <li><a href="#" className="footer-link">PR inbox</a></li>
                <li><a href="#" className="footer-link">AI reviews</a></li>
                <li>
                  <a href="#" className="footer-link">
                    Chat
                    <span className="badge">NEW</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="footer-column">
              <h3 className="column-title">Company</h3>
              <ul className="column-links">
                <li><a href="#" className="footer-link">Blog</a></li>
                <li><a href="#" className="footer-link">Customers</a></li>
                <li>
                  <a href="#" className="footer-link">
                    Careers
                    <span className="badge">19</span>
                  </a>
                </li>
                <li><a href="#" className="footer-link">Privacy policy</a></li>
                <li><a href="#" className="footer-link">Terms of service</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="footer-column">
              <h3 className="column-title">Resources</h3>
              <ul className="column-links">
                <li><a href="#" className="footer-link">Docs</a></li>
                <li><a href="#" className="footer-link">Pricing</a></li>
                <li><a href="#" className="footer-link">Status</a></li>
                <li><a href="#" className="footer-link">Guides</a></li>
                <li><a href="#" className="footer-link">Stacking workflow</a></li>
              </ul>
            </div>

            {/* Connect Column */}
            <div className="footer-column">
              <h3 className="column-title">Connect</h3>
              <ul className="column-links">
                <li>
                  <a href="mailto:contact@tesseract.dev" className="footer-link">
                    <svg className="social-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="https://slack.com" className="footer-link" target="_blank" rel="noopener noreferrer">
                    <svg className="social-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M21 12c0 1.66-1.34 3-3 3H6c-1.66 0-3-1.34-3-3s1.34-3 3-3h12c1.66 0 3 1.34 3 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 21c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3s-3 1.34-3 3v12c0 1.66 1.34 3 3 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Community Slack
                  </a>
                </li>
                <li>
                  <a href="https://github.com" className="footer-link" target="_blank" rel="noopener noreferrer">
                    <svg className="social-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" className="footer-link" target="_blank" rel="noopener noreferrer">
                    <svg className="social-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    X (Twitter)
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" className="footer-link" target="_blank" rel="noopener noreferrer">
                    <svg className="social-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com" className="footer-link" target="_blank" rel="noopener noreferrer">
                    <svg className="social-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

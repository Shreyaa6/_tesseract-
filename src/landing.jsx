import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import './landing.css';

const Landing = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isReverseAnimating, setIsReverseAnimating] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = (e) => {
      // Prevent scrolling during animations
      if (isAnimating) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Enable scrolling immediately on first scroll
      if (!animationComplete) {
        setAnimationComplete(true);
        document.body.classList.add('scroll-enabled');
      }
      
      // Handle animations based on scroll direction
      if (window.scrollY > 200 && !isScrolled && !isReverseAnimating && !isAnimating) {
        // Scrolling down - trigger forward animation
        setIsAnimating(true);
        document.body.classList.add('animating');
        setIsScrolled(true);
        
        // Allow scrolling after animation completes
        setTimeout(() => {
          setIsAnimating(false);
          document.body.classList.remove('animating');
        }, 2000);
      } else if (window.scrollY < 100 && isScrolled && !isReverseAnimating && !isAnimating) {
        // Scrolling up - trigger reverse animation
        setIsAnimating(true);
        document.body.classList.add('animating');
        setIsReverseAnimating(true);
        setIsScrolled(false);
        
        // Reset flags after completion
        setTimeout(() => {
          setIsReverseAnimating(false);
          setIsAnimating(false);
          document.body.classList.remove('animating');
        }, 2000);
      }
    };

    const handleWheel = (e) => {
      if (isAnimating) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleKeyDown = (e) => {
      if (isAnimating && (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' || e.key === 'ArrowUp' || e.key === 'PageUp')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isScrolled, animationComplete, isReverseAnimating, isAnimating]);

  return (
    <div className="landing-page">
      <Navbar onNavigate={onNavigate} />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className={`hero-visual ${isScrolled ? 'scrolled' : ''} ${isReverseAnimating ? 'reverse' : ''}`}>
          <div className="hero-cube-container">
            <div className="hero-cube">
              <div className="hero-cube-face front"></div>
              <div className="hero-cube-face back"></div>
              <div className="hero-cube-face right"></div>
              <div className="hero-cube-face left"></div>
              <div className="hero-cube-face top"></div>
              <div className="hero-cube-face bottom"></div>
            </div>
          </div>
          <div className="hero-text">_tesseract/</div>
          <div className="hero-tagline">Graphite helps teams on GitHub ship higher quality software, faster</div>
        </div>
        
        {/* Scroll indicator */}
        {!isScrolled && (
          <div className="scroll-indicator">
            <div className="scroll-text">Scroll to continue</div>
            <div className="scroll-arrow">↓</div>
          </div>
        )}
      </section>

      {/* Developer Infrastructure Section */}
      <section className="infrastructure-section" id="infrastructure">
        <div className="infrastructure-container">
          <div className="section-header">
            <h2 className="section-title">Developer infrastructure built for your team</h2>
            <p className="section-subtitle">
              Graphite works seamlessly with the technologies you already use
            </p>
          </div>
          
          <div className="infrastructure-content">
            {/* Left Side - Visual Cards */}
            <div className="visual-cards">
              <div className="card-stack">
                {/* Tesseract Card (Top) */}
                <div className="tech-card tesseract-card">
                  <div className="card-logo">
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
                    </svg>
                  </div>
                </div>
                
                {/* GitHub Card (Middle) */}
                <div className="tech-card github-card">
                  <div className="card-logo">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path 
                        d="M20 0C8.95 0 0 8.95 0 20c0 8.84 5.73 16.34 13.68 18.99 1 .18 1.37-.43 1.37-.97 0-.48-.02-1.75-.02-3.18-5.57 1.21-6.74-2.68-6.74-2.68-.91-2.31-2.22-2.93-2.22-2.93-1.82-1.24.14-1.21.14-1.21 2.01.14 3.07 2.06 3.07 2.06 1.78 3.05 4.64 2.17 5.77 1.66.18-1.29.7-2.17 1.27-2.67-4.44-.5-9.11-2.22-9.11-9.89 0-2.18.78-3.96 2.06-5.36-.21-.5-.89-2.54.19-5.29 0 0 1.68-.54 5.5 2.05 1.6-.44 3.31-.67 5.01-.67 1.7 0 3.41.23 5.01.67 3.82-2.59 5.5-2.05 5.5-2.05 1.08 2.75.4 4.79.19 5.29 1.28 1.4 2.06 3.18 2.06 5.36 0 7.68-4.67 9.39-9.11 9.89.72.62 1.36 1.84 1.36 3.71 0 2.68-.02 4.84-.02 5.5 0 .54.37 1.16 1.37.97C34.27 36.34 40 28.84 40 20c0-11.05-8.95-20-20-20z" 
                        fill="#8B5CF6"
                      />
                    </svg>
                  </div>
                </div>
                
                {/* Git Card (Bottom) */}
                <div className="tech-card git-card">
                  <div className="card-logo">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path 
                        d="M20 2C10.06 2 2 10.06 2 20c0 7.95 5.15 14.7 12.3 17.08.9.16 1.23-.39 1.23-.87 0-.43-.01-1.57-.02-3.08-5.01 1.09-6.07-2.41-6.07-2.41-.82-2.08-2-2.64-2-2.64-1.64-1.12.12-1.1.12-1.1 1.81.13 2.76 1.86 2.76 1.86 1.6 2.74 4.18 1.95 5.2 1.49.16-1.16.63-1.95 1.14-2.4-3.99-.45-8.19-1.99-8.19-8.89 0-1.96.7-3.56 1.85-4.81-.19-.45-.82-2.28.18-4.75 0 0 1.51-.48 4.95 1.84 1.44-.4 2.98-.6 4.51-.6 1.53 0 3.07.2 4.51.6 3.44-2.32 4.95-1.84 4.95-1.84 1 2.47.37 4.3.18 4.75 1.15 1.25 1.85 2.85 1.85 4.81 0 6.91-4.2 8.44-8.19 8.89.64.56 1.22 1.66 1.22 3.34 0 2.41-.02 4.35-.02 4.95 0 .48.33 1.03 1.23.87C32.85 34.7 38 27.95 38 20c0-9.94-8.06-18-18-18z" 
                        fill="#F97316"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Text Blocks */}
            <div className="text-blocks">
              <div className="text-block">
                <h3 className="block-title">Where change happens</h3>
                <p className="block-description">
                  Organizations that adopt Graphite ship more code with smaller PRs and faster review cycles.
                </p>
              </div>
              
              <div className="text-block">
                <h3 className="block-title">Synced with GitHub</h3>
                <p className="block-description">
                  GitHub sync and deep integration means your team is always on the same page.
                </p>
              </div>
              
              <div className="text-block">
                <h3 className="block-title">Built on top of Git</h3>
                <p className="block-description">
                  Graphite is integrated with all your git scripts, aliases, and workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Five Cards Section */}
      <section className="five-cards-section">
        <div className="five-cards-container">
          {/* All 5 Cards in One Row */}
          <div className="cards-row">
            <div className="card-item">
              <h3 className="card-title">Ask, update, commit. All in one place.</h3>
              <p className="card-description">
                Now you can chat with Graphite to get context on code changes, fix issues, resolve CI failures, and update your PRs, right in your review flow.
              </p>
              <button className="learn-more-btn">Learn More</button>
            </div>
            
            <div className="card-item">
              <h3 className="card-title">Save hours on every pull request</h3>
              <p className="card-description">
                Get immediate, actionable feedback on every pull request with Graphite's codebase-aware AI.
              </p>
              <button className="learn-more-btn">Learn More</button>
            </div>
            
            <div className="card-item">
              <h3 className="card-title">Turn comments into suggested changes</h3>
              <p className="card-description">
                Graphite generates suggested code changes for comments, helping you to resolve threads faster.
              </p>
              <button className="learn-more-btn">Learn More</button>
            </div>
            
            <div className="card-item">
              <h3 className="card-title">Detailed PR descriptions in seconds</h3>
              <p className="card-description">
                Explain every change to your reviewers with one click.
              </p>
              <button className="learn-more-btn">Learn More</button>
            </div>
            
            <div className="card-item">
              <h3 className="card-title">From failures to fixes</h3>
              <p className="card-description">
                Graphite summarizes and generates fixes for your failing CI.
              </p>
              <button className="learn-more-btn">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="geometric-background">
            <div className="geometric-lines">
              <div className="line line-1"></div>
              <div className="line line-2"></div>
              <div className="line line-3"></div>
              <div className="line line-4"></div>
              <div className="line line-5"></div>
              <div className="line line-6"></div>
            </div>
          </div>
          <h2 className="cta-title">Built for the world's fastest engineering teams, now available for everyone</h2>
          <div className="cta-actions">
            <button className="cta-primary">Request a demo</button>
            <button className="cta-secondary">Start free trial →</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="logo-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
              <span>Graphite</span>
            </div>
            <p className="footer-text">
              © 2024 Graphite. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

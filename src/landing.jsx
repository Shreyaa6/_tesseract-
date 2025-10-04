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

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">Why choose Graphite?</h2>
            <p className="section-description">
              Everything you need to build and deploy modern applications
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-description">
                Built for speed with cutting-edge technology and optimized performance.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3 className="feature-title">Enterprise Security</h3>
              <p className="feature-description">
                Bank-grade security with end-to-end encryption and compliance standards.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚙️</div>
              <h3 className="feature-title">Easy Integration</h3>
              <p className="feature-description">
                Seamlessly integrate with your existing tools and workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to get started?</h2>
          <p className="cta-description">
            Join thousands of developers building the future with Graphite
          </p>
          <div className="cta-actions">
            <button className="cta-primary large">Start Free Trial</button>
            <button className="cta-outline large">Contact Sales</button>
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

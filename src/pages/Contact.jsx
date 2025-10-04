import React from 'react';
import Navbar from '../components/Navbar';
import './contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-container">
          <h1 className="contact-hero-title">
            Get in Touch
            <span className="gradient-text"> with Our Team</span>
          </h1>
          <p className="contact-hero-description">
            Have questions about our GitHub repository tracking platform? 
            We're here to help you get the most out of your development workflow.
          </p>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="contact-methods-section">
        <div className="contact-methods-container">
          <div className="section-header">
            <h2 className="section-title">Contact Methods</h2>
            <p className="section-description">
              Choose the best way to reach us
            </p>
          </div>
          <div className="contact-methods-grid">
            <div className="contact-method-card">
              <div className="contact-method-icon"></div>
              <h3 className="contact-method-title">Email Support</h3>
              <p className="contact-method-description">
                Get help with technical questions, feature requests, or general inquiries.
              </p>
              <div className="contact-method-info">
                <div className="contact-info-item">
                  <span className="contact-info-label">General:</span>
                  <span className="contact-info-value">hello@tesseract.dev</span>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-label">Support:</span>
                  <span className="contact-info-value">support@tesseract.dev</span>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-label">Response Time:</span>
                  <span className="contact-info-value">Within 24 hours</span>
                </div>
              </div>
            </div>
            <div className="contact-method-card">
              <div className="contact-method-icon"></div>
              <h3 className="contact-method-title">Community Discord</h3>
              <p className="contact-method-description">
                Join our Discord community for real-time discussions, tips, and updates.
              </p>
              <div className="contact-method-info">
                <div className="contact-info-item">
                  <span className="contact-info-label">Server:</span>
                  <span className="contact-info-value">discord.gg/tesseract</span>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-label">Members:</span>
                  <span className="contact-info-value">2,500+ developers</span>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-label">Activity:</span>
                  <span className="contact-info-value">24/7 community</span>
                </div>
              </div>
            </div>
            <div className="contact-method-card">
              <div className="contact-method-icon"></div>
              <h3 className="contact-method-title">GitHub Issues</h3>
              <p className="contact-method-description">
                Report bugs, request features, or contribute to our open-source projects.
              </p>
              <div className="contact-method-info">
                <div className="contact-info-item">
                  <span className="contact-info-label">Repository:</span>
                  <span className="contact-info-value">github.com/tesseract-dev</span>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-label">Issues:</span>
                  <span className="contact-info-value">Open source</span>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-label">Contributions:</span>
                  <span className="contact-info-value">Welcome</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="contact-form-container">
          <div className="contact-form-content">
            <div className="contact-form-text">
              <h2 className="contact-form-title">Send us a Message</h2>
              <p className="contact-form-description">
                Have a specific question or need personalized assistance? 
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              <div className="contact-form-features">
                <div className="form-feature">
                  <span className="form-feature-check">✓</span>
                  <span>Free consultation</span>
                </div>
                <div className="form-feature">
                  <span className="form-feature-check">✓</span>
                  <span>Custom setup assistance</span>
                </div>
                <div className="form-feature">
                  <span className="form-feature-check">✓</span>
                  <span>Priority support</span>
                </div>
              </div>
            </div>
            <div className="contact-form-wrapper">
              <form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" id="name" className="form-input" placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" id="email" className="form-input" placeholder="your.email@example.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="company" className="form-label">Company (Optional)</label>
                  <input type="text" id="company" className="form-input" placeholder="Your company name" />
                </div>
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <select id="subject" className="form-select">
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="feature">Feature Request</option>
                    <option value="integration">Integration Help</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea id="message" className="form-textarea" rows="5" placeholder="Tell us how we can help you..."></textarea>
                </div>
                <button type="submit" className="form-submit">Send Message</button>
              </form>
            </div>
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
              <span>_tesseract/</span>
            </div>
            <p className="footer-text">
              © 2024 _tesseract/. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;

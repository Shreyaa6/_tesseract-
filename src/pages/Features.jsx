import React from 'react';
import Navbar from '../components/Navbar';
import './features.css';

const Features = ({ onNavigate }) => {
  return (
    <div className="features-page">
      <Navbar onNavigate={onNavigate} />
      
      {/* Hero Section */}
      <section className="features-hero">
        <div className="features-hero-container">
          <h1 className="features-hero-title">
            Powerful Features for
            <span className="gradient-text"> GitHub Repository Tracking</span>
          </h1>
          <p className="features-hero-description">
            Discover all the comprehensive features that make our platform the perfect solution 
            for monitoring and analyzing your GitHub repositories.
          </p>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="main-features-section">
        <div className="main-features-container">
          <div className="section-header">
            <h2 className="section-title">Core Features</h2>
            <p className="section-description">
              Everything you need to track, analyze, and optimize your GitHub workflow
            </p>
          </div>
          <div className="main-features-grid">
            <div className="main-feature-card">
              <div className="main-feature-icon"></div>
              <h3 className="main-feature-title">Real-time Repository Monitoring</h3>
              <p className="main-feature-description">
                Get instant updates on commits, pull requests, issues, and releases across all your repositories. 
                Monitor activity in real-time with customizable dashboards.
              </p>
              <ul className="main-feature-list">
                <li>Live commit tracking</li>
                <li>Pull request monitoring</li>
                <li>Issue tracking</li>
                <li>Release notifications</li>
              </ul>
            </div>
            <div className="main-feature-card">
              <div className="main-feature-icon"></div>
              <h3 className="main-feature-title">Advanced Analytics & Insights</h3>
              <p className="main-feature-description">
                Deep dive into your development patterns with comprehensive analytics. 
                Understand team productivity, code quality trends, and project health metrics.
              </p>
              <ul className="main-feature-list">
                <li>Team productivity metrics</li>
                <li>Code quality analysis</li>
                <li>Commit pattern insights</li>
                <li>Project health scoring</li>
              </ul>
            </div>
            <div className="main-feature-card">
              <div className="main-feature-icon"></div>
              <h3 className="main-feature-title">Security & Compliance</h3>
              <p className="main-feature-description">
                Stay secure with automated vulnerability scanning, dependency monitoring, 
                and compliance reporting for enterprise-grade security.
              </p>
              <ul className="main-feature-list">
                <li>Vulnerability scanning</li>
                <li>Dependency monitoring</li>
                <li>Security alerts</li>
                <li>Compliance reporting</li>
              </ul>
            </div>
            <div className="main-feature-card">
              <div className="main-feature-icon"></div>
              <h3 className="main-feature-title">Team Collaboration Tools</h3>
              <p className="main-feature-description">
                Enhance team collaboration with code review insights, contributor analytics, 
                and communication tracking across your development teams.
              </p>
              <ul className="main-feature-list">
                <li>Code review analytics</li>
                <li>Contributor insights</li>
                <li>Team communication tracking</li>
                <li>Collaboration metrics</li>
              </ul>
            </div>
            <div className="main-feature-card">
              <div className="main-feature-icon"></div>
              <h3 className="main-feature-title">Custom Dashboards</h3>
              <p className="main-feature-description">
                Create personalized dashboards with customizable widgets, real-time data visualization, 
                and role-based access controls for different team members.
              </p>
              <ul className="main-feature-list">
                <li>Customizable widgets</li>
                <li>Real-time data visualization</li>
                <li>Role-based access</li>
                <li>Personalized views</li>
              </ul>
            </div>
            <div className="main-feature-card">
              <div className="main-feature-icon"></div>
              <h3 className="main-feature-title">Integration & API</h3>
              <p className="main-feature-description">
                Seamlessly integrate with your existing tools through our comprehensive API, 
                webhooks, and pre-built connectors for popular development platforms.
              </p>
              <ul className="main-feature-list">
                <li>RESTful API access</li>
                <li>Webhook support</li>
                <li>Third-party integrations</li>
                <li>Custom connectors</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="tech-specs-section">
        <div className="tech-specs-container">
          <div className="section-header">
            <h2 className="section-title">Technical Specifications</h2>
            <p className="section-description">
              Built for scale, security, and performance
            </p>
          </div>
          <div className="tech-specs-grid">
            <div className="tech-spec-card">
              <h4 className="tech-spec-title">Performance</h4>
              <div className="tech-spec-item">
                <span className="tech-spec-label">Response Time</span>
                <span className="tech-spec-value">&lt; 100ms</span>
              </div>
              <div className="tech-spec-item">
                <span className="tech-spec-label">Uptime</span>
                <span className="tech-spec-value">99.9%</span>
              </div>
              <div className="tech-spec-item">
                <span className="tech-spec-label">Data Processing</span>
                <span className="tech-spec-value">Real-time</span>
              </div>
            </div>
            <div className="tech-spec-card">
              <h4 className="tech-spec-title">Security</h4>
              <div className="tech-spec-item">
                <span className="tech-spec-label">Encryption</span>
                <span className="tech-spec-value">AES-256</span>
              </div>
              <div className="tech-spec-item">
                <span className="tech-spec-label">Compliance</span>
                <span className="tech-spec-value">SOC 2</span>
              </div>
              <div className="tech-spec-item">
                <span className="tech-spec-label">Access Control</span>
                <span className="tech-spec-value">RBAC</span>
              </div>
            </div>
            <div className="tech-spec-card">
              <h4 className="tech-spec-title">Scalability</h4>
              <div className="tech-spec-item">
                <span className="tech-spec-label">Repositories</span>
                <span className="tech-spec-value">Unlimited</span>
              </div>
              <div className="tech-spec-item">
                <span className="tech-spec-label">Team Members</span>
                <span className="tech-spec-value">Unlimited</span>
              </div>
              <div className="tech-spec-item">
                <span className="tech-spec-label">Data Retention</span>
                <span className="tech-spec-value">Unlimited</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Experience These Features?</h2>
          <p className="cta-description">
            Start using our comprehensive GitHub repository tracking platform today
          </p>
          <div className="cta-actions">
            <button className="cta-primary large">Get Started Free</button>
            <button className="cta-outline large">View Demo</button>
          </div>
          <div className="cta-note">
            <span className="cta-note-text">Completely Free • No credit card required • No hidden fees • Forever free</span>
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

export default Features;

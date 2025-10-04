import React from 'react';
import Navbar from '../components/Navbar';
import './ether.css';

const Ether = () => {
  return (
    <div className="ether-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="ether-hero">
        <div className="ether-hero-container">
          <h1 className="ether-hero-title">
            Ether
            <span className="gradient-text"> - The Future of Development</span>
          </h1>
          <p className="ether-hero-description">
            Experience the next generation of GitHub repository tracking with Ether. 
            Our cutting-edge platform combines AI-powered insights with real-time collaboration tools.
          </p>
        </div>
      </section>

      {/* What is Ether Section */}
      <section className="what-is-ether-section">
        <div className="what-is-ether-container">
          <div className="what-is-ether-content">
            <div className="what-is-ether-text">
              <h2 className="what-is-ether-title">What is Ether?</h2>
              <p className="what-is-ether-description">
                Ether represents the evolution of GitHub repository tracking. It's not just another monitoring tool—it's 
                an intelligent platform that understands your development patterns, predicts potential issues, and 
                provides actionable insights to help your team work more efficiently.
              </p>
              <div className="ether-features">
                <div className="ether-feature">
                  <h4 className="ether-feature-title">AI-Powered Analytics</h4>
                  <p className="ether-feature-description">
                    Machine learning algorithms analyze your code patterns and provide intelligent recommendations.
                  </p>
                </div>
                <div className="ether-feature">
                  <h4 className="ether-feature-title">Predictive Insights</h4>
                  <p className="ether-feature-description">
                    Anticipate potential issues before they become problems with predictive analytics.
                  </p>
                </div>
                <div className="ether-feature">
                  <h4 className="ether-feature-title">Smart Automation</h4>
                  <p className="ether-feature-description">
                    Automate routine tasks and focus on what matters most—building great software.
                  </p>
                </div>
              </div>
            </div>
            <div className="what-is-ether-visual">
              <div className="ether-visual-card">
                <div className="ether-visual-header">
                  <div className="ether-visual-title">Ether Dashboard</div>
                  <div className="ether-visual-status">AI Active</div>
                </div>
                <div className="ether-visual-content">
                  <div className="ether-metric">
                    <div className="ether-metric-label">Code Quality Score</div>
                    <div className="ether-metric-value">94/100</div>
                    <div className="ether-metric-trend">↗ +5% this week</div>
                  </div>
                  <div className="ether-metric">
                    <div className="ether-metric-label">Predicted Issues</div>
                    <div className="ether-metric-value">2</div>
                    <div className="ether-metric-trend">↓ -3 from last week</div>
                  </div>
                  <div className="ether-metric">
                    <div className="ether-metric-label">Team Efficiency</div>
                    <div className="ether-metric-value">87%</div>
                    <div className="ether-metric-trend">↗ +12% improvement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ether Capabilities Section */}
      <section className="ether-capabilities-section">
        <div className="ether-capabilities-container">
          <div className="section-header">
            <h2 className="section-title">Ether Capabilities</h2>
            <p className="section-description">
              Discover the advanced features that make Ether the future of development tracking
            </p>
          </div>
          <div className="ether-capabilities-grid">
            <div className="ether-capability-card">
              <div className="ether-capability-icon"></div>
              <h3 className="ether-capability-title">Intelligent Code Analysis</h3>
              <p className="ether-capability-description">
                Advanced AI algorithms analyze your codebase to identify patterns, detect anomalies, 
                and suggest improvements for better code quality and maintainability.
              </p>
            </div>
            <div className="ether-capability-card">
              <div className="ether-capability-icon"></div>
              <h3 className="ether-capability-title">Predictive Issue Detection</h3>
              <p className="ether-capability-description">
                Machine learning models predict potential bugs, performance issues, and security 
                vulnerabilities before they impact your production environment.
              </p>
            </div>
            <div className="ether-capability-card">
              <div className="ether-capability-icon"></div>
              <h3 className="ether-capability-title">Smart Workflow Optimization</h3>
              <p className="ether-capability-description">
                Automatically optimize your development workflow by analyzing team patterns, 
                identifying bottlenecks, and suggesting process improvements.
              </p>
            </div>
            <div className="ether-capability-card">
              <div className="ether-capability-icon"></div>
              <h3 className="ether-capability-title">Natural Language Queries</h3>
              <p className="ether-capability-description">
                Ask questions about your codebase in plain English and get intelligent answers 
                powered by advanced natural language processing.
              </p>
            </div>
            <div className="ether-capability-card">
              <div className="ether-capability-icon"></div>
              <h3 className="ether-capability-title">Automated Documentation</h3>
              <p className="ether-capability-description">
                Generate comprehensive documentation automatically based on code analysis, 
                commit patterns, and project structure.
              </p>
            </div>
            <div className="ether-capability-card">
              <div className="ether-capability-icon"></div>
              <h3 className="ether-capability-title">Intelligent Notifications</h3>
              <p className="ether-capability-description">
                Receive smart notifications that prioritize important events and filter out noise, 
                helping you stay focused on what matters most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="future-vision-section">
        <div className="future-vision-container">
          <div className="future-vision-content">
            <h2 className="future-vision-title">The Future of Development</h2>
            <p className="future-vision-description">
              Ether is just the beginning. We're building towards a future where AI and human developers 
              work together seamlessly, where code quality is automatically maintained, and where 
              development teams can focus entirely on innovation and creativity.
            </p>
            <div className="future-roadmap">
              <div className="roadmap-item">
                <div className="roadmap-phase">Phase 1</div>
                <div className="roadmap-title">Intelligent Monitoring</div>
                <div className="roadmap-description">AI-powered repository tracking and analysis</div>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-phase">Phase 2</div>
                <div className="roadmap-title">Predictive Analytics</div>
                <div className="roadmap-description">Machine learning-driven issue prediction</div>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-phase">Phase 3</div>
                <div className="roadmap-title">Autonomous Development</div>
                <div className="roadmap-description">AI-assisted code generation and optimization</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Experience Ether?</h2>
          <p className="cta-description">
            Be among the first to experience the future of GitHub repository tracking
          </p>
          <div className="cta-actions">
            <button className="cta-primary large">Join Ether Beta</button>
            <button className="cta-outline large">Learn More</button>
          </div>
          <div className="cta-note">
            <span className="cta-note-text">Early Access Available • Completely Free • No Credit Card Required</span>
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

export default Ether;

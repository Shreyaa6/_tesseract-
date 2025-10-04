import React from 'react';
import Navbar from '../components/Navbar';
import './usecase.css';

const UseCase = ({ onNavigate }) => {
  return (
    <div className="usecase-page">
      <Navbar onNavigate={onNavigate} />
      

      {/* Industries Section */}
      <section className="industries-section">
        <div className="industries-container">
          <div className="section-header">
            <h2 className="section-title">Perfect for Every Industry</h2>
            <p className="section-description">
              From agile startups to enterprise corporations, our GitHub tracking solution scales with your needs
            </p>
          </div>
          <div className="industries-grid">
            <div className="industry-card">
              <div className="industry-icon"></div>
              <h3 className="industry-title">Startups</h3>
              <p className="industry-description">
                Track rapid development cycles, monitor team velocity, and ensure code quality as you scale. 
                Perfect for fast-moving teams that need real-time insights.
              </p>
              <ul className="industry-features">
                <li>Real-time commit tracking</li>
                <li>Team productivity metrics</li>
                <li>Code quality monitoring</li>
                <li>Deployment pipeline insights</li>
              </ul>
            </div>
            <div className="industry-card">
              <div className="industry-icon"></div>
              <h3 className="industry-title">MNCs & Enterprises</h3>
              <p className="industry-description">
                Manage complex multi-team repositories, ensure compliance, and maintain governance across 
                distributed development teams.
              </p>
              <ul className="industry-features">
                <li>Multi-team repository management</li>
                <li>Compliance reporting</li>
                <li>Security vulnerability tracking</li>
                <li>Cross-team collaboration metrics</li>
              </ul>
            </div>
            <div className="industry-card">
              <div className="industry-icon"></div>
              <h3 className="industry-title">Manufacturing & IoT</h3>
              <p className="industry-description">
                Monitor embedded systems development, track firmware updates, and ensure version control 
                across production environments.
              </p>
              <ul className="industry-features">
                <li>Firmware version tracking</li>
                <li>Embedded system monitoring</li>
                <li>Production deployment logs</li>
                <li>Hardware integration insights</li>
              </ul>
            </div>
            <div className="industry-card">
              <div className="industry-icon"></div>
              <h3 className="industry-title">Healthcare & Fintech</h3>
              <p className="industry-description">
                Maintain strict compliance standards, track audit trails, and ensure data security 
                across critical healthcare and financial applications.
              </p>
              <ul className="industry-features">
                <li>Audit trail compliance</li>
                <li>Security vulnerability scanning</li>
                <li>Data privacy monitoring</li>
                <li>Regulatory reporting</li>
              </ul>
            </div>
            <div className="industry-card">
              <div className="industry-icon"></div>
              <h3 className="industry-title">Gaming & Entertainment</h3>
              <p className="industry-description">
                Track game development cycles, monitor live service updates, and manage content 
                delivery across multiple platforms.
              </p>
              <ul className="industry-features">
                <li>Game build tracking</li>
                <li>Live service monitoring</li>
                <li>Content delivery metrics</li>
                <li>Platform deployment logs</li>
              </ul>
            </div>
            <div className="industry-card">
              <div className="industry-icon"></div>
              <h3 className="industry-title">E-commerce & Retail</h3>
              <p className="industry-description">
                Monitor high-traffic applications, track seasonal updates, and ensure seamless 
                customer experience across all touchpoints.
              </p>
              <ul className="industry-features">
                <li>High-traffic monitoring</li>
                <li>Seasonal update tracking</li>
                <li>Customer experience metrics</li>
                <li>Performance optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Free Forever Section */}
      <section className="free-section">
        <div className="free-container">
            <div className="free-content">
              <div className="free-icon"></div>
              <h2 className="free-title">Completely Free Forever</h2>
            <p className="free-description">
              No subscriptions, no hidden fees, no credit card required. Our GitHub repository tracking platform 
              is completely free for all users, forever. We believe in making powerful development tools accessible to everyone.
            </p>
            <div className="free-features">
              <div className="free-feature">
                <span className="free-check">✓</span>
                <span>Unlimited repositories</span>
              </div>
              <div className="free-feature">
                <span className="free-check">✓</span>
                <span>Unlimited team members</span>
              </div>
              <div className="free-feature">
                <span className="free-check">✓</span>
                <span>All features included</span>
              </div>
              <div className="free-feature">
                <span className="free-check">✓</span>
                <span>No time limits</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">Comprehensive Repository Insights</h2>
            <p className="section-description">
              Everything you need to monitor, analyze, and optimize your GitHub workflow
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3 className="feature-title">Real-time Analytics</h3>
              <p className="feature-description">
                Get instant insights into commit patterns, pull request trends, and team productivity metrics. 
                Monitor your repository health in real-time.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3 className="feature-title">Code Quality Monitoring</h3>
              <p className="feature-description">
                Track code quality metrics, identify technical debt, and monitor test coverage across all your repositories.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3 className="feature-title">Security Alerts</h3>
              <p className="feature-description">
                Stay ahead of security vulnerabilities with automated scanning and instant alerts for potential threats.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3 className="feature-title">Team Collaboration</h3>
              <p className="feature-description">
                Monitor team collaboration patterns, track code review efficiency, and identify knowledge sharing opportunities.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3 className="feature-title">Performance Metrics</h3>
              <p className="feature-description">
                Track deployment frequency, lead time, and recovery metrics to optimize your development pipeline.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3 className="feature-title">Custom Notifications</h3>
              <p className="feature-description">
                Set up personalized alerts for critical events, milestones, and anomalies in your development workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2 className="benefits-title">Why Choose Our GitHub Tracking Solution?</h2>
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon"></div>
                  <div className="benefit-content">
                    <h4 className="benefit-title">Lightning Fast Setup</h4>
                    <p className="benefit-description">
                      Get started in minutes with our one-click GitHub integration. No complex configurations required.
                    </p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon"></div>
                  <div className="benefit-content">
                    <h4 className="benefit-title">Enterprise Security</h4>
                    <p className="benefit-description">
                      Bank-grade security with SOC 2 compliance, end-to-end encryption, and role-based access control.
                    </p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon"></div>
                  <div className="benefit-content">
                    <h4 className="benefit-title">Mobile & Desktop</h4>
                    <p className="benefit-description">
                      Access your repository insights anywhere with our responsive web app and native mobile applications.
                    </p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon"></div>
                  <div className="benefit-content">
                    <h4 className="benefit-title">API & Integrations</h4>
                    <p className="benefit-description">
                      Seamlessly integrate with your existing tools via our comprehensive API and pre-built connectors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="benefits-visual">
              <div className="visual-card">
                <div className="visual-header">
                  <div className="visual-title">Repository Health Score</div>
                  <div className="visual-score">94/100</div>
                </div>
                <div className="visual-metrics">
                  <div className="metric-bar">
                    <div className="metric-label">Code Quality</div>
                    <div className="metric-progress">
                      <div className="progress-bar" style={{width: '92%'}}></div>
                    </div>
                    <div className="metric-value">92%</div>
                  </div>
                  <div className="metric-bar">
                    <div className="metric-label">Test Coverage</div>
                    <div className="metric-progress">
                      <div className="progress-bar" style={{width: '87%'}}></div>
                    </div>
                    <div className="metric-value">87%</div>
                  </div>
                  <div className="metric-bar">
                    <div className="metric-label">Security Score</div>
                    <div className="metric-progress">
                      <div className="progress-bar" style={{width: '96%'}}></div>
                    </div>
                    <div className="metric-value">96%</div>
                  </div>
                  <div className="metric-bar">
                    <div className="metric-label">Performance</div>
                    <div className="metric-progress">
                      <div className="progress-bar" style={{width: '89%'}}></div>
                    </div>
                    <div className="metric-value">89%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Transform Your GitHub Workflow?</h2>
          <p className="cta-description">
            Join thousands of teams already using our platform to optimize their development process
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

export default UseCase;

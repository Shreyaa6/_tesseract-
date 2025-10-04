import React from 'react';
import Navbar from '../components/Navbar';
import './docs.css';

const Docs = () => {
  return (
    <div className="docs-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="docs-hero">
        <div className="docs-hero-container">
          <h1 className="docs-hero-title">
            Documentation
            <span className="gradient-text"> & API Reference</span>
          </h1>
          <p className="docs-hero-description">
            Everything you need to get started with our GitHub repository tracking platform. 
            From quick start guides to advanced API documentation.
          </p>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="quick-start-section">
        <div className="quick-start-container">
          <div className="section-header">
            <h2 className="section-title">Quick Start Guide</h2>
            <p className="section-description">
              Get up and running in minutes with our step-by-step guide
            </p>
          </div>
          <div className="quick-start-steps">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-title">Connect Your GitHub Account</h3>
                <p className="step-description">
                  Authorize our platform to access your GitHub repositories securely using OAuth 2.0.
                </p>
                <div className="code-block">
                  <code>git clone https://github.com/your-org/your-repo.git</code>
                </div>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-title">Select Repositories</h3>
                <p className="step-description">
                  Choose which repositories you want to track and configure monitoring settings.
                </p>
                <div className="code-block">
                  <code>npm install @tesseract/tracker</code>
                </div>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-title">Start Monitoring</h3>
                <p className="step-description">
                  Begin tracking commits, pull requests, and other repository activities in real-time.
                </p>
                <div className="code-block">
                  <code>tesseract start --repo your-repo</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Documentation */}
      <section className="api-docs-section">
        <div className="api-docs-container">
          <div className="section-header">
            <h2 className="section-title">API Documentation</h2>
            <p className="section-description">
              Integrate with our platform using our comprehensive REST API
            </p>
          </div>
          <div className="api-endpoints">
            <div className="api-endpoint-card">
              <div className="endpoint-method get">GET</div>
              <div className="endpoint-path">/api/v1/repositories</div>
              <div className="endpoint-description">Retrieve all tracked repositories</div>
              <div className="endpoint-example">
                <pre><code>{`curl -H "Authorization: Bearer YOUR_TOKEN" \\
  https://api.tesseract.dev/v1/repositories`}</code></pre>
              </div>
            </div>
            <div className="api-endpoint-card">
              <div className="endpoint-method post">POST</div>
              <div className="endpoint-path">/api/v1/repositories</div>
              <div className="endpoint-description">Add a new repository for tracking</div>
              <div className="endpoint-example">
                <pre><code>{`curl -X POST \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"owner": "your-org", "name": "your-repo"}' \\
  https://api.tesseract.dev/v1/repositories`}</code></pre>
              </div>
            </div>
            <div className="api-endpoint-card">
              <div className="endpoint-method get">GET</div>
              <div className="endpoint-path">/api/v1/repositories/{id}/commits</div>
              <div className="endpoint-description">Get commit history for a repository</div>
              <div className="endpoint-example">
                <pre><code>{`curl -H "Authorization: Bearer YOUR_TOKEN" \\
  https://api.tesseract.dev/v1/repositories/123/commits`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-description">
              Find answers to common questions about our platform
            </p>
          </div>
          <div className="faq-list">
            <div className="faq-item">
              <h3 className="faq-question">Is my data secure?</h3>
              <p className="faq-answer">
                Yes, we use enterprise-grade security with AES-256 encryption, SOC 2 compliance, 
                and never store your source code. We only track metadata and statistics.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">How much does it cost?</h3>
              <p className="faq-answer">
                Our platform is completely free forever. No subscriptions, no hidden fees, 
                no credit card required. We believe in making powerful tools accessible to everyone.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Can I track private repositories?</h3>
              <p className="faq-answer">
                Yes, you can track both public and private repositories. We respect GitHub's 
                privacy settings and only access what you explicitly authorize.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">What programming languages are supported?</h3>
              <p className="faq-answer">
                We support all programming languages and file types. Our platform analyzes 
                repository metadata, commit patterns, and collaboration metrics regardless of the codebase.
              </p>
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

export default Docs;

import React from 'react';
import Navbar from '../components/Navbar';
import './features.css';

const Features = () => {
  return (
    <div className="features-page">
      <Navbar />
      {/* Background Image */}
      <div className="background-container"></div>

      {/* Content */}
      <div className="features-content">
        <h1 className="features-main-title">The new standard for developer infrastructure</h1>

        <div className="feature-cards-grid">
          {/* Card 1: _tesseract/ CLI */}
          <div className="feature-card">
            <div className="card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
                <polyline points="4 7 4 5 20 5 20 7"></polyline>
                <line x1="6" y1="9" x2="6" y2="9"></line>
                <line x1="8" y1="9" x2="8" y2="9"></line>
                <line x1="10" y1="9" x2="10" y2="9"></line>
              </svg>
            </div>
            <h2 className="card-title">_tesseract/ CLI</h2>
            <p className="card-description">Streamline Git commands and seamlessly stack pull requests from your terminal.</p>
            <button className="see-more-btn">See more</button>
          </div>

          {/* Card 2: Pull request inbox */}
          <div className="feature-card">
            <div className="card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
                <rect x="2" y="2" width="20" height="16" rx="2"></rect>
                <path d="M8 10l4 4 4-4"></path>
              </svg>
            </div>
            <h2 className="card-title">Pull request inbox</h2>
            <p className="card-description">Stay on top of every PR and review request in one unified inbox.</p>
            <button className="see-more-btn">See more</button>
          </div>

          {/* Card 3: Diamond (AI feedback) */}
          <div className="feature-card">
            <div className="card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                <path d="M13 8H7"></path>
                <path d="M17 12H7"></path>
                <circle cx="17" cy="8" r="2"></circle>
                <circle cx="13" cy="12" r="2"></circle>
                <circle cx="9" cy="16" r="2"></circle>
              </svg>
            </div>
            <h2 className="card-title">Diamond</h2>
            <p className="card-description">Get immediate, actionable feedback on every pull request with _tesseract/'s codebase-aware AI.</p>
            <button className="see-more-btn">See more</button>
          </div>

          {/* Card 4: Merge Queue */}
          <div className="feature-card">
            <div className="card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 6h13"></path>
                <path d="M8 12h13"></path>
                <path d="M8 18h13"></path>
                <path d="M3 6h.01"></path>
                <path d="M3 12h.01"></path>
                <path d="M3 18h.01"></path>
                <path d="M18 6l3 3-3 3"></path>
                <path d="M18 12l3 3-3 3"></path>
              </svg>
            </div>
            <h2 className="card-title">Merge Queue</h2>
            <p className="card-description">Eliminate merge conflicts and keep your main branch green—whether you're a team of 10 or 10,000.</p>
            <button className="see-more-btn">See more</button>
          </div>

          {/* Card 5: Insights and reports */}
          <div className="feature-card">
            <div className="card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18"></path>
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
                <circle cx="18" cy="8" r="2"></circle>
                <circle cx="13" cy="13" r="2"></circle>
                <circle cx="10" cy="10" r="2"></circle>
                <circle cx="7" cy="14" r="2"></circle>
              </svg>
            </div>
            <h2 className="card-title">Insights and reports</h2>
            <p className="card-description">Accelerate your team with powerful, real-time developer metrics.</p>
            <button className="see-more-btn">See more</button>
          </div>

          {/* Card 6: UI Screenshot Card */}
          <div className="feature-card ui-screenshot-card">
            <div className="card-ui-placeholder">
              <div className="ui-header">
                <span>Activity</span>
                <div className="ui-icons">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </div>
              </div>
              <ul className="ui-list">
                <li><span className="status-icon"></span> e requirements</li>
                <li><span className="status-icon"></span> comment threads resolved</li>
                <li><span className="status-icon green-check"></span> 9/9 required CI checks passed</li>
                <li><span className="status-icon green-check"></span> 1/1 files approved by owners</li>
                <li><span className="status-icon green-check"></span> Checks completed</li>
                <li><span className="status-icon green-check"></span> required checks successful</li>
              </ul>
              <div className="ui-code-snippet">
                <span>30-chore-ack</span>
              </div>
            </div>
            <h2 className="card-title">Insights and reports</h2>
            <p className="card-description">Accelerate your team with powerful, real-time developer metrics.</p>
            <button className="see-more-btn">See more</button>
          </div>
        </div>
      </div>

      {/* _tesseract/ CLI Section */}
      <div className="cli-section">
        <div className="cli-content">
          <h2 className="cli-title">The _tesseract/ CLI</h2>
          <p className="cli-subtitle">A faster, more intuitive Git interface, designed to make stacking effortless.</p>
          
          {/* Terminal UI */}
          <div className="terminal-container">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <div className="terminal-button close"></div>
                <div className="terminal-button minimize"></div>
                <div className="terminal-button maximize"></div>
              </div>
              <div className="terminal-title">Terminal</div>
            </div>
            <div className="terminal-body">
              <div className="terminal-line">
                <span className="terminal-text">The stack ending with 10-01-feat_fizzbuzz_handle_baz_too will merge when ready.</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-prompt">&gt;</span>
                <span className="terminal-command">gt sync</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-success">✓ Fetching branches from remote...</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-text">main fast-forwarded to 0ab23ffb.</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-success">✔ Cleaning up branches with merged/closed PRs...</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-success">✓ PR #36909 for 10-01-feat_create_fizzbuzz_script is merged. Delete this branch? (Y/n) ... </span>
                <span className="terminal-text">yes</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-success">✓ PR #36910 for 10-01-feat_fizzbuzz_handle_baz_too is merged. Delete this branch? (Y/n) ... </span>
                <span className="terminal-text">yes</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-warning">◷ Syncing branches...</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-text">All branches are up to date.</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-info">● Restacking branches...</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-text">Restacked 10-01-feat_reticulating_splines on main.</span>
              </div>
            </div>
          </div>

          {/* Workflow Cards */}
          <div className="workflow-cards-grid">
            <div className="workflow-card">
              <h3 className="workflow-title">Start a stack</h3>
              <p className="workflow-description">Create the first branch in your stack with <code>gt create</code>.</p>
            </div>
            
            <div className="workflow-card">
              <h3 className="workflow-title">Keep stacking</h3>
              <p className="workflow-description">Run <code>gt create</code> again to stack another branch on top of your previous changes without waiting for them to merge into main.</p>
            </div>
            
            <div className="workflow-card">
              <h3 className="workflow-title">Visualize your stack</h3>
              <p className="workflow-description">Get a bird's eye view of your stack with <code>gt log</code>.</p>
            </div>
            
            <div className="workflow-card">
              <h3 className="workflow-title">Publish your stack</h3>
              <p className="workflow-description">Create or update PRs for every branch in your stack with <code>gt submit</code>.</p>
            </div>
            
            <div className="workflow-card">
              <h3 className="workflow-title">Respond to feedback</h3>
              <p className="workflow-description">Update changes across your stack with <code>gt modify</code>. _tesseract/ handles all of the recursive rebasing for you.</p>
            </div>
            
            <div className="workflow-card">
              <h3 className="workflow-title">Ship, sync, repeat</h3>
              <p className="workflow-description">Automatically sync your local stack with remote changes, and clean up stale branches with <code>gt sync</code>.</p>
            </div>
          </div>
        </div>
      </div>

      {/* PR Inbox Section */}
      <div className="inbox-section">
        <div className="inbox-content">
          <h2 className="inbox-title">Inbox zero for your code changes</h2>
          <p className="inbox-subtitle">Stay on top of every PR and review request in one unified inbox</p>
          
          {/* PR Inbox UI */}
          <div className="inbox-ui-container">
            <div className="inbox-ui">
              {/* Sidebar */}
              <div className="inbox-sidebar">
                <div className="sidebar-header">
                  <h3>Inbox</h3>
                </div>
                <div className="sidebar-nav">
                  <div className="nav-item active">
                    <span className="nav-text">Needs your review</span>
                    <span className="nav-badge">12</span>
                  </div>
                  <div className="nav-item">
                    <span className="nav-text">Returned to you</span>
                  </div>
                  <div className="nav-item">
                    <span className="nav-text">Approved</span>
                  </div>
                  <div className="nav-item">
                    <span className="nav-text">Merging and recently merged</span>
                  </div>
                  <div className="nav-item">
                    <span className="nav-text">Draft</span>
                  </div>
                  <div className="nav-icons">
                    <div className="nav-icon">⚙️</div>
                    <div className="nav-icon">⚡</div>
                    <div className="nav-icon">👤</div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="inbox-main">
                <div className="inbox-header">
                  <div className="header-left">
                    <h4>Needs your review</h4>
                    <span className="header-title">Title</span>
                  </div>
                  <div className="header-right">
                    <span className="sync-info">2 synced repos</span>
                  </div>
                </div>

                <div className="pr-list">
                  <div className="pr-item">
                    <div className="pr-icon">🌿</div>
                    <div className="pr-content">
                      <div className="pr-title">fix(insights): align card titles along baseline</div>
                      <div className="pr-author">nicholasyan • monologue #15258</div>
                    </div>
                    <div className="pr-status">
                      <div className="review-status">1/2</div>
                      <div className="ci-status success">✓</div>
                      <div className="changes">+22/-10</div>
                      <div className="updated">12m</div>
                    </div>
                  </div>

                  <div className="pr-item">
                    <div className="pr-icon">💬</div>
                    <div className="pr-content">
                      <div className="pr-title">chore(merge): update merge phase during merge-all and ff-merge</div>
                      <div className="pr-author">alex • monologue #15257</div>
                    </div>
                    <div className="pr-status">
                      <div className="review-status">2/2</div>
                      <div className="ci-status success">✓</div>
                      <div className="changes">+74/-1</div>
                      <div className="updated">14m</div>
                    </div>
                  </div>

                  <div className="pr-item">
                    <div className="pr-icon">👤</div>
                    <div className="pr-content">
                      <div className="pr-title">feat(ui): add new dashboard components</div>
                      <div className="pr-author">sarah • monologue #15256</div>
                    </div>
                    <div className="pr-status">
                      <div className="review-status">13/13</div>
                      <div className="ci-status pending">⏱</div>
                      <div className="changes">+156/-23</div>
                      <div className="updated">1h</div>
                    </div>
                  </div>

                  <div className="pr-item">
                    <div className="pr-icon">🌿</div>
                    <div className="pr-content">
                      <div className="pr-title">fix(auth): resolve login validation issues</div>
                      <div className="pr-author">mike • monologue #15255</div>
                    </div>
                    <div className="pr-status">
                      <div className="review-status">0/1</div>
                      <div className="ci-status error">✗</div>
                      <div className="changes">+8/-15</div>
                      <div className="updated">2h</div>
                    </div>
                  </div>
                </div>

                <div className="load-more">
                  <button className="load-more-btn">Load more</button>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="inbox-feature-cards">
            <div className="inbox-feature-card">
              <h3 className="inbox-card-title">Every change in one place</h3>
              <p className="inbox-card-description">Stay on top of your team's pull requests from one dashboard. See reviews, CI status, stack info, and everything else you need to know about your PRs.</p>
            </div>
            
            <div className="inbox-feature-card">
              <h3 className="inbox-card-title">Fully customizable</h3>
              <p className="inbox-card-description">Customize each inbox section to match your workflow. Filter PRs based on author, CI status, reviews, labels, and much, much more.</p>
            </div>
            
            <div className="inbox-feature-card">
              <h3 className="inbox-card-title">As fast as you are</h3>
              <p className="inbox-card-description">Keyboard shortcuts, at-a-glance statuses, and real-time GitHub sync help you stay up-to-date and take action on things that need your attention.</p>
            </div>
            
            <div className="inbox-feature-card">
              <h3 className="inbox-card-title">Pull requests the way they should be</h3>
              <p className="inbox-card-description">File diffs, version history, comments, and CI in one intuitive interface. Code review has never been this enjoyable.</p>
            </div>
          </div>

          {/* Get Started Button */}
          <div className="get-started-container">
            <button className="get-started-btn">
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
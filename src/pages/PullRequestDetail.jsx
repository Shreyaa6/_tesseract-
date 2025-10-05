import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SkeletonLoader from '../components/SkeletonLoader';
import './PullRequestDetail.css';

const PullRequestDetail = () => {
  const { owner, repo, number } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pullRequest, setPullRequest] = useState(null);
  const [commits, setCommits] = useState([]);
  const [files, setFiles] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (owner && repo && number) {
      fetchPullRequestDetails();
    }
  }, [owner, repo, number]);

  const fetchPullRequestDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('tesseract_token');
      
      if (!token) {
        throw new Error('No GitHub token found');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      };

      const repoFullName = `${owner}/${repo}`;
      
      // Fetch pull request details
      const prResponse = await fetch(`https://api.github.com/repos/${repoFullName}/pulls/${number}`, { headers });
      if (!prResponse.ok) {
        throw new Error(`Failed to fetch pull request: ${prResponse.status}`);
      }
      const prData = await prResponse.json();
      setPullRequest(prData);

      // Fetch commits
      const commitsResponse = await fetch(`https://api.github.com/repos/${repoFullName}/pulls/${number}/commits`, { headers });
      if (commitsResponse.ok) {
        const commitsData = await commitsResponse.json();
        setCommits(commitsData);
      }

      // Fetch files changed
      const filesResponse = await fetch(`https://api.github.com/repos/${repoFullName}/pulls/${number}/files`, { headers });
      if (filesResponse.ok) {
        const filesData = await filesResponse.json();
        setFiles(filesData);
      }

      // Fetch reviews
      const reviewsResponse = await fetch(`https://api.github.com/repos/${repoFullName}/pulls/${number}/reviews`, { headers });
      if (reviewsResponse.ok) {
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      }

      // Fetch comments
      const commentsResponse = await fetch(`https://api.github.com/repos/${repoFullName}/issues/${number}/comments`, { headers });
      if (commentsResponse.ok) {
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      }

    } catch (err) {
      console.error('Error fetching pull request details:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return formatDate(dateString);
  };

  const getFileIcon = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    const iconMap = {
      js: '📄',
      jsx: '⚛️',
      ts: '📘',
      tsx: '⚛️',
      py: '🐍',
      java: '☕',
      cpp: '⚙️',
      c: '⚙️',
      html: '🌐',
      css: '🎨',
      scss: '🎨',
      json: '📋',
      md: '📝',
      txt: '📄',
      yml: '⚙️',
      yaml: '⚙️',
      xml: '📄',
      sql: '🗄️',
      sh: '💻',
      dockerfile: '🐳',
      gitignore: '🚫',
      readme: '📖'
    };
    return iconMap[extension] || '📄';
  };

  const getFileStatusColor = (status) => {
    switch (status) {
      case 'added': return '#10B981';
      case 'modified': return '#F59E0B';
      case 'removed': return '#EF4444';
      case 'renamed': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getReviewStateColor = (state) => {
    switch (state) {
      case 'APPROVED': return '#10B981';
      case 'CHANGES_REQUESTED': return '#EF4444';
      case 'COMMENTED': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <div className="pr-detail-page">
        <div className="error-container">
          <h2>Error Loading Pull Request</h2>
          <p>{error}</p>
          <button onClick={() => navigate(`/repository/${owner}/${repo}`)} className="back-btn">
            Back to Repository
          </button>
        </div>
      </div>
    );
  }

  if (!pullRequest) {
    return (
      <div className="pr-detail-page">
        <div className="error-container">
          <h2>Pull Request Not Found</h2>
          <button onClick={() => navigate(`/repository/${owner}/${repo}`)} className="back-btn">
            Back to Repository
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pr-detail-page">
      <nav className="dashboard-nav">
        <div className="nav-content">
          <div className="nav-logo">
            <div className="logo-cube">
              <div className="cube">
                <div className="cube-face front"></div>
                <div className="cube-face back"></div>
                <div className="cube-face right"></div>
                <div className="cube-face left"></div>
                <div className="cube-face top"></div>
                <div className="cube-face bottom"></div>
              </div>
            </div>
            <h1>_tesseract/</h1>
          </div>
          
          <div className="nav-user">
            <div className="user-info">
              <img 
                src={user?.avatar_url} 
                alt={user?.name || user?.login} 
                className="user-avatar"
              />
              <span className="user-name">{user?.name || user?.login}</span>
            </div>
            <button className="logout-btn" onClick={() => navigate(`/repository/${owner}/${repo}`)}>
              Back to Repository
            </button>
          </div>
        </div>
      </nav>

      <main className="pr-main">
        <div className="pr-content">
          {/* PR Header */}
          <div className="pr-header">
            <div className="pr-header-info">
              <div className="pr-title-section">
                <div className="pr-number">#{pullRequest.number}</div>
                <h1 className="pr-title">{pullRequest.title}</h1>
                <div className="pr-labels">
                  {pullRequest.draft && (
                    <span className="pr-label draft">Draft</span>
                  )}
                  {pullRequest.labels.map((label) => (
                    <span 
                      key={label.id} 
                      className="pr-label"
                      style={{ backgroundColor: `#${label.color}` }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pr-status-section">
                <span className={`status-badge ${pullRequest.state} ${pullRequest.merged_at ? 'merged' : ''}`}>
                  {pullRequest.merged_at ? 'Merged' : pullRequest.state === 'open' ? 'Open' : 'Closed'}
                </span>
                <div className="pr-actions">
                  <a 
                    href={pullRequest.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-btn primary"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
            
            <div className="pr-meta">
              <div className="pr-author">
                <img 
                  src={pullRequest.user.avatar_url} 
                  alt={pullRequest.user.login}
                  className="author-avatar"
                />
                <div className="author-info">
                  <span className="author-name">{pullRequest.user.login}</span>
                  <span className="author-date">opened {getTimeAgo(pullRequest.created_at)}</span>
                </div>
              </div>
              <div className="pr-stats">
                <div className="stat-item">
                  <span className="stat-number">{commits.length}</span>
                  <span className="stat-label">Commits</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{files.length}</span>
                  <span className="stat-label">Files</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{pullRequest.additions}</span>
                  <span className="stat-label">Additions</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{pullRequest.deletions}</span>
                  <span className="stat-label">Deletions</span>
                </div>
              </div>
            </div>

            {pullRequest.body && (
              <div className="pr-description">
                <div className="description-content">
                  {pullRequest.body.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            )}

            <div className="pr-branch-info">
              <div className="branch-section">
                <span className="branch-label">From:</span>
                <span className="branch-name">{pullRequest.head.ref}</span>
              </div>
              <div className="branch-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17l9.2-9.2M17 8l-9.2 9.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="branch-section">
                <span className="branch-label">To:</span>
                <span className="branch-name">{pullRequest.base.ref}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs-container">
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`tab ${activeTab === 'commits' ? 'active' : ''}`}
                onClick={() => setActiveTab('commits')}
              >
                Commits ({commits.length})
              </button>
              <button 
                className={`tab ${activeTab === 'files' ? 'active' : ''}`}
                onClick={() => setActiveTab('files')}
              >
                Files ({files.length})
              </button>
              <button 
                className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({reviews.length})
              </button>
              <button 
                className={`tab ${activeTab === 'comments' ? 'active' : ''}`}
                onClick={() => setActiveTab('comments')}
              >
                Comments ({comments.length})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <div className="overview-grid">
                  <div className="overview-card">
                    <h3>Pull Request Summary</h3>
                    <div className="summary-stats">
                      <div className="summary-item">
                        <span className="summary-label">Status:</span>
                        <span className={`summary-value ${pullRequest.state}`}>
                          {pullRequest.merged_at ? 'Merged' : pullRequest.state === 'open' ? 'Open' : 'Closed'}
                        </span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Created:</span>
                        <span className="summary-value">{formatDate(pullRequest.created_at)}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Updated:</span>
                        <span className="summary-value">{getTimeAgo(pullRequest.updated_at)}</span>
                      </div>
                      {pullRequest.merged_at && (
                        <div className="summary-item">
                          <span className="summary-label">Merged:</span>
                          <span className="summary-value">{formatDate(pullRequest.merged_at)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="overview-card">
                    <h3>Code Changes</h3>
                    <div className="changes-summary">
                      <div className="change-item additions">
                        <span className="change-label">+{pullRequest.additions}</span>
                        <span className="change-text">Additions</span>
                      </div>
                      <div className="change-item deletions">
                        <span className="change-label">-{pullRequest.deletions}</span>
                        <span className="change-text">Deletions</span>
                      </div>
                      <div className="change-item files">
                        <span className="change-label">{files.length}</span>
                        <span className="change-text">Files Changed</span>
                      </div>
                    </div>
                  </div>

                  <div className="overview-card">
                    <h3>Review Status</h3>
                    <div className="review-summary">
                      {reviews.length > 0 ? (
                        reviews.map((review) => (
                          <div key={review.id} className="review-item">
                            <img 
                              src={review.user.avatar_url} 
                              alt={review.user.login}
                              className="reviewer-avatar"
                            />
                            <div className="review-info">
                              <span className="reviewer-name">{review.user.login}</span>
                              <span 
                                className={`review-state ${review.state.toLowerCase()}`}
                                style={{ color: getReviewStateColor(review.state) }}
                              >
                                {review.state.replace('_', ' ')}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="no-reviews">No reviews yet</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'commits' && (
              <div className="commits-tab">
                <div className="commits-list">
                  {commits.map((commit) => (
                    <div key={commit.sha} className="commit-card">
                      <div className="commit-header">
                        <div className="commit-sha">{commit.sha.substring(0, 7)}</div>
                        <div className="commit-message">{commit.commit.message.split('\n')[0]}</div>
                        <div className="commit-date">{getTimeAgo(commit.commit.author.date)}</div>
                      </div>
                      <div className="commit-meta">
                        <div className="commit-author">
                          <img 
                            src={commit.author?.avatar_url || commit.committer?.avatar_url} 
                            alt={commit.commit.author.name}
                            className="commit-avatar"
                          />
                          <span className="commit-author-name">{commit.commit.author.name}</span>
                        </div>
                        <div className="commit-stats">
                          <span className="commit-stat">
                            {commit.stats?.additions || 0} additions
                          </span>
                          <span className="commit-stat">
                            {commit.stats?.deletions || 0} deletions
                          </span>
                          <span className="commit-stat">
                            {commit.files?.length || 0} files
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'files' && (
              <div className="files-tab">
                <div className="files-list">
                  {files.map((file) => (
                    <div key={file.sha} className="file-card">
                      <div className="file-header">
                        <div className="file-icon">{getFileIcon(file.filename)}</div>
                        <div className="file-name">{file.filename}</div>
                        <div className="file-status">
                          <span 
                            className="status-indicator"
                            style={{ backgroundColor: getFileStatusColor(file.status) }}
                          >
                            {file.status}
                          </span>
                        </div>
                      </div>
                      <div className="file-stats">
                        <div className="file-stat">
                          <span className="stat-label">Changes:</span>
                          <span className="stat-value">
                            +{file.additions} -{file.deletions}
                          </span>
                        </div>
                        <div className="file-stat">
                          <span className="stat-label">Patch:</span>
                          <span className="stat-value">{file.patch?.length || 0} lines</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-tab">
                <div className="reviews-list">
                  {reviews.map((review) => (
                    <div key={review.id} className="review-card">
                      <div className="review-header">
                        <img 
                          src={review.user.avatar_url} 
                          alt={review.user.login}
                          className="reviewer-avatar"
                        />
                        <div className="review-info">
                          <span className="reviewer-name">{review.user.login}</span>
                          <span 
                            className={`review-state ${review.state.toLowerCase()}`}
                            style={{ color: getReviewStateColor(review.state) }}
                          >
                            {review.state.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="review-date">{getTimeAgo(review.submitted_at)}</div>
                      </div>
                      {review.body && (
                        <div className="review-body">
                          <p>{review.body}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'comments' && (
              <div className="comments-tab">
                <div className="comments-list">
                  {comments.map((comment) => (
                    <div key={comment.id} className="comment-card">
                      <div className="comment-header">
                        <img 
                          src={comment.user.avatar_url} 
                          alt={comment.user.login}
                          className="commenter-avatar"
                        />
                        <div className="comment-info">
                          <span className="commenter-name">{comment.user.login}</span>
                          <span className="comment-date">{getTimeAgo(comment.created_at)}</span>
                        </div>
                      </div>
                      <div className="comment-body">
                        <p>{comment.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PullRequestDetail;

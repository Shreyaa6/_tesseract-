import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SkeletonLoader from '../components/SkeletonLoader';
import './RepositoryDetail.css';

const RepositoryDetail = () => {
  const { owner, repo } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [repository, setRepository] = useState(null);
  const [pullRequests, setPullRequests] = useState([]);
  const [issues, setIssues] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (owner && repo) {
      fetchRepositoryDetails();
    }
  }, [owner, repo]);

  const fetchRepositoryDetails = async () => {
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
      
      // Fetch repository details
      const repoResponse = await fetch(`https://api.github.com/repos/${repoFullName}`, { headers });
      if (!repoResponse.ok) {
        throw new Error(`Failed to fetch repository: ${repoResponse.status}`);
      }
      const repoData = await repoResponse.json();
      setRepository(repoData);

      // Fetch pull requests
      const prResponse = await fetch(`https://api.github.com/repos/${repoFullName}/pulls?state=all&per_page=20`, { headers });
      if (prResponse.ok) {
        const prs = await prResponse.json();
        setPullRequests(prs);
      }

      // Fetch issues
      const issuesResponse = await fetch(`https://api.github.com/repos/${repoFullName}/issues?state=all&per_page=20`, { headers });
      if (issuesResponse.ok) {
        const issuesData = await issuesResponse.json();
        setIssues(issuesData);
      }

      // Fetch contributors
      const contributorsResponse = await fetch(`https://api.github.com/repos/${repoFullName}/contributors?per_page=10`, { headers });
      if (contributorsResponse.ok) {
        const contributorsData = await contributorsResponse.json();
        setContributors(contributorsData);
      }

      // Fetch recent commits
      const commitsResponse = await fetch(`https://api.github.com/repos/${repoFullName}/commits?per_page=20`, { headers });
      if (commitsResponse.ok) {
        const commitsData = await commitsResponse.json();
        setCommits(commitsData);
      }

    } catch (err) {
      console.error('Error fetching repository details:', err);
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

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <div className="repository-detail-page">
        <div className="error-container">
          <h2>Error Loading Repository</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!repository) {
    return (
      <div className="repository-detail-page">
        <div className="error-container">
          <h2>Repository Not Found</h2>
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="repository-detail-page">
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
            <button className="logout-btn" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </nav>

      <main className="repository-main">
        <div className="repository-content">
          {/* Repository Header */}
          <div className="repository-header">
            <div className="repo-header-info">
              <div className="repo-title-section">
                <h1 className="repo-title">{repository.name}</h1>
                <div className="repo-meta">
                  <span className="repo-owner">@{repository.owner.login}</span>
                  <span className="repo-visibility">{repository.private ? 'Private' : 'Public'}</span>
                  <span className="repo-language">{repository.language || 'Unknown'}</span>
                </div>
              </div>
              <div className="repo-stats">
                <div className="stat-item">
                  <span className="stat-number">{repository.stargazers_count}</span>
                  <span className="stat-label">Stars</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{repository.forks_count}</span>
                  <span className="stat-label">Forks</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{repository.watchers_count}</span>
                  <span className="stat-label">Watchers</span>
                </div>
              </div>
            </div>
            
            {repository.description && (
              <p className="repo-description">{repository.description}</p>
            )}
            
            <div className="repo-actions">
              <a 
                href={repository.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-btn primary"
              >
                View on GitHub
              </a>
              <a 
                href={repository.clone_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-btn secondary"
              >
                Clone Repository
              </a>
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
                className={`tab ${activeTab === 'pulls' ? 'active' : ''}`}
                onClick={() => setActiveTab('pulls')}
              >
                Pull Requests ({pullRequests.length})
              </button>
              <button 
                className={`tab ${activeTab === 'issues' ? 'active' : ''}`}
                onClick={() => setActiveTab('issues')}
              >
                Issues ({issues.length})
              </button>
              <button 
                className={`tab ${activeTab === 'commits' ? 'active' : ''}`}
                onClick={() => setActiveTab('commits')}
              >
                Recent Commits ({commits.length})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <div className="overview-grid">
                  <div className="overview-card">
                    <h3>Contributors</h3>
                    <div className="contributors-list">
                      {contributors.slice(0, 5).map((contributor, index) => (
                        <div key={contributor.id} className="contributor-item">
                          <img 
                            src={contributor.avatar_url} 
                            alt={contributor.login}
                            className="contributor-avatar"
                          />
                          <div className="contributor-info">
                            <span className="contributor-name">{contributor.login}</span>
                            <span className="contributor-commits">{contributor.contributions} commits</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="overview-card">
                    <h3>Repository Info</h3>
                    <div className="info-list">
                      <div className="info-item">
                        <span className="info-label">Created:</span>
                        <span className="info-value">{formatDate(repository.created_at)}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Last Updated:</span>
                        <span className="info-value">{getTimeAgo(repository.updated_at)}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Size:</span>
                        <span className="info-value">{Math.round(repository.size / 1024)} MB</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Default Branch:</span>
                        <span className="info-value">{repository.default_branch}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pulls' && (
              <div className="pulls-tab">
                <div className="items-list">
                  {pullRequests.map((pr) => (
                    <div key={pr.id} className="item-card">
                      <div className="item-header">
                        <h4 className="item-title">{pr.title}</h4>
                        <span className={`item-status ${pr.state}`}>{pr.state}</span>
                      </div>
                      <div className="item-meta">
                        <span className="item-author">by {pr.user.login}</span>
                        <span className="item-date">{getTimeAgo(pr.created_at)}</span>
                      </div>
                      {pr.body && (
                        <p className="item-description">{pr.body.substring(0, 200)}...</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'issues' && (
              <div className="issues-tab">
                <div className="items-list">
                  {issues.map((issue) => (
                    <div key={issue.id} className="item-card">
                      <div className="item-header">
                        <h4 className="item-title">{issue.title}</h4>
                        <span className={`item-status ${issue.state}`}>{issue.state}</span>
                      </div>
                      <div className="item-meta">
                        <span className="item-author">by {issue.user.login}</span>
                        <span className="item-date">{getTimeAgo(issue.created_at)}</span>
                      </div>
                      {issue.body && (
                        <p className="item-description">{issue.body.substring(0, 200)}...</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'commits' && (
              <div className="commits-tab">
                <div className="items-list">
                  {commits.map((commit) => (
                    <div key={commit.sha} className="item-card">
                      <div className="item-header">
                        <h4 className="item-title">{commit.commit.message.split('\n')[0]}</h4>
                        <span className="commit-sha">{commit.sha.substring(0, 7)}</span>
                      </div>
                      <div className="item-meta">
                        <span className="item-author">by {commit.commit.author.name}</span>
                        <span className="item-date">{getTimeAgo(commit.commit.author.date)}</span>
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

export default RepositoryDetail;

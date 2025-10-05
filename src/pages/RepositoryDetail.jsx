import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SkeletonLoader from '../components/SkeletonLoader';
import githubApi from '../services/githubApi';
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
  
  // Repository switching states
  const [availableRepos, setAvailableRepos] = useState([]);
  const [repoSearchQuery, setRepoSearchQuery] = useState('');
  const [showRepoSearch, setShowRepoSearch] = useState(false);
  
  // PR filtering states
  const [prFilter, setPrFilter] = useState('all');
  const [prSearchQuery, setPrSearchQuery] = useState('');
  
  // Statistics states
  const [repoStats, setRepoStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [commitActivity, setCommitActivity] = useState([]);
  const [languageStats, setLanguageStats] = useState([]);
  const [releaseStats, setReleaseStats] = useState([]);

  useEffect(() => {
    if (user) {
      fetchAvailableRepositories();
    }
  }, [user]);

  useEffect(() => {
    if (owner && repo) {
      fetchRepositoryDetails();
      fetchRepositoryStatistics();
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

      // Fetch repository details via our server
      const repoData = await githubApi.getRepository(token, owner, repo);
      setRepository(repoData);

      // Fetch pull requests via our server
      try {
        const prs = await githubApi.getPullRequests(token, owner, repo, { per_page: 20 });
        setPullRequests(prs);
      } catch (err) {
        console.error('Failed to fetch pull requests:', err);
      }

      // Fetch issues via our server
      try {
        const issuesData = await githubApi.getIssues(token, owner, repo, { per_page: 20 });
        setIssues(issuesData);
      } catch (err) {
        console.error('Failed to fetch issues:', err);
      }

      // Fetch contributors via our server
      try {
        const contributorsData = await githubApi.getContributors(token, owner, repo, { per_page: 10 });
        setContributors(contributorsData);
      } catch (err) {
        console.error('Failed to fetch contributors:', err);
      }

      // Fetch recent commits via our server
      try {
        const commitsData = await githubApi.getCommits(token, owner, repo, { per_page: 20 });
        setCommits(commitsData);
      } catch (err) {
        console.error('Failed to fetch commits:', err);
      }

    } catch (err) {
      console.error('Error fetching repository details:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableRepositories = async () => {
    try {
      const token = localStorage.getItem('tesseract_token');
      if (!token) return;

      const repos = await githubApi.getUserRepositories(token);
      
      const reposWithAccess = await Promise.all(
        repos.map(async (repo) => {
          try {
            const permission = await githubApi.getCollaboratorPermission(token, repo.owner.login, repo.name, user.login);
            return {
              ...repo,
              hasCollaboratorAccess: ['admin', 'write'].includes(permission.permission)
            };
          } catch (err) {
            return { ...repo, hasCollaboratorAccess: false };
          }
        })
      );
      
      const collaboratorRepos = reposWithAccess.filter(repo => repo.hasCollaboratorAccess);
      setAvailableRepos(collaboratorRepos);
    } catch (err) {
      console.error('Error fetching available repositories:', err);
    }
  };

  const fetchRepositoryStatistics = async () => {
    try {
      setLoadingStats(true);
      const token = localStorage.getItem('tesseract_token');
      
      if (!token) {
        throw new Error('No GitHub token found');
      }

      // Fetch commit activity for the last year via our server
      try {
        const activityData = await githubApi.getCommitActivity(token, owner, repo);
        setCommitActivity(activityData.slice(-12)); // Last 12 weeks
      } catch (err) {
        console.error('Failed to fetch commit activity:', err);
      }

      // Fetch language statistics via our server
      try {
        const languagesData = await githubApi.getLanguages(token, owner, repo);
        const totalBytes = Object.values(languagesData).reduce((sum, bytes) => sum + bytes, 0);
        const languageStatsData = Object.entries(languagesData).map(([language, bytes]) => ({
          language,
          bytes,
          percentage: ((bytes / totalBytes) * 100).toFixed(1)
        })).sort((a, b) => b.bytes - a.bytes);
        setLanguageStats(languageStatsData);
      } catch (err) {
        console.error('Failed to fetch languages:', err);
      }

      // Fetch releases via our server
      try {
        const releasesData = await githubApi.getReleases(token, owner, repo, { per_page: 10 });
        setReleaseStats(releasesData);
      } catch (err) {
        console.error('Failed to fetch releases:', err);
      }

      // Calculate comprehensive statistics
      const stats = {
        totalCommits: commits.length,
        totalIssues: issues.length,
        totalPullRequests: pullRequests.length,
        totalContributors: contributors.length,
        avgCommitsPerWeek: commitActivity.reduce((sum, week) => sum + week.total, 0) / Math.max(commitActivity.length, 1),
        avgIssuesPerWeek: issues.length / 52, // Rough estimate
        avgPRsPerWeek: pullRequests.length / 52,
        repositoryAge: Math.floor((new Date() - new Date(repository?.created_at)) / (1000 * 60 * 60 * 24)),
        lastActivity: repository?.updated_at,
        codeFrequency: commitActivity,
        languageDistribution: languageStats,
        releaseCount: releaseStats.length,
        latestRelease: releaseStats[0]?.published_at || null
      };

      setRepoStats(stats);
      
    } catch (err) {
      console.error('Error fetching repository statistics:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleRepoSwitch = (repoFullName) => {
    const [newOwner, newRepo] = repoFullName.split('/');
    navigate(`/repository/${newOwner}/${newRepo}`);
    setShowRepoSearch(false);
    setRepoSearchQuery('');
  };

  const filteredRepos = availableRepos.filter(repo => 
    repo.name.toLowerCase().includes(repoSearchQuery.toLowerCase()) ||
    repo.full_name.toLowerCase().includes(repoSearchQuery.toLowerCase())
  );

  // Filter pull requests based on selected filter and search query
  const filteredPullRequests = pullRequests.filter(pr => {
    const matchesFilter = prFilter === 'all' || 
      (prFilter === 'open' && pr.state === 'open') ||
      (prFilter === 'closed' && pr.state === 'closed' && !pr.merged_at) ||
      (prFilter === 'merged' && pr.state === 'closed' && pr.merged_at) ||
      (prFilter === 'draft' && pr.draft);
    
    const matchesSearch = prSearchQuery === '' || 
      pr.title.toLowerCase().includes(prSearchQuery.toLowerCase()) ||
      pr.user.login.toLowerCase().includes(prSearchQuery.toLowerCase()) ||
      pr.labels.some(label => label.name.toLowerCase().includes(prSearchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

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
          {/* Repository Search Bar */}
          <div className="repo-search-section">
            <div className="repo-search-container">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Search repositories..."
                  value={repoSearchQuery}
                  onChange={(e) => setRepoSearchQuery(e.target.value)}
                  onFocus={() => setShowRepoSearch(true)}
                  className="repo-search-input"
                />
                <div className="search-icon">🔍</div>
              </div>
              
              {showRepoSearch && (
                <div className="repo-search-dropdown">
                  <div className="dropdown-header">
                    <span>Switch Repository</span>
                    <button 
                      className="close-dropdown"
                      onClick={() => setShowRepoSearch(false)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="repo-list">
                    {filteredRepos.length > 0 ? (
                      filteredRepos.map((repo) => (
                        <div 
                          key={repo.id} 
                          className="repo-item"
                          onClick={() => handleRepoSwitch(repo.full_name)}
                        >
                          <div className="repo-item-info">
                            <div className="repo-item-name">{repo.name}</div>
                            <div className="repo-item-owner">@{repo.owner.login}</div>
                          </div>
                          <div className="repo-item-stats">
                            <span className="repo-stars">⭐ {repo.stargazers_count}</span>
                            <span className="repo-language">{repo.language || 'Unknown'}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-repos">No repositories found</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

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
            
            {/* Key Metrics Row */}
            {repoStats && (
              <div className="key-metrics-row">
                <div className="metric-item">
                  <div className="metric-icon">📊</div>
                  <div className="metric-content">
                    <span className="metric-number">{repoStats.totalCommits}</span>
                    <span className="metric-label">Commits</span>
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-icon">👥</div>
                  <div className="metric-content">
                    <span className="metric-number">{repoStats.totalContributors}</span>
                    <span className="metric-label">Contributors</span>
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-icon">🔀</div>
                  <div className="metric-content">
                    <span className="metric-number">{pullRequests.filter(pr => pr.state === 'open').length}</span>
                    <span className="metric-label">Open PRs</span>
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-icon">🐛</div>
                  <div className="metric-content">
                    <span className="metric-number">{issues.filter(issue => issue.state === 'open').length}</span>
                    <span className="metric-label">Open Issues</span>
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-icon">🚀</div>
                  <div className="metric-content">
                    <span className="metric-number">{repoStats.releaseCount}</span>
                    <span className="metric-label">Releases</span>
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-icon">📅</div>
                  <div className="metric-content">
                    <span className="metric-number">{Math.floor(repoStats.repositoryAge / 365)}y</span>
                    <span className="metric-label">Age</span>
                  </div>
                </div>
              </div>
            )}
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
                {/* Repository Overview */}
                <div className="overview-section">
                  <h3 className="section-title">Repository Overview</h3>
                  <p className="section-description">
                    Last updated: {getTimeAgo(repository.updated_at)} • 
                    {repoStats && ` ${repoStats.avgCommitsPerWeek.toFixed(1)} commits/week avg`}
                  </p>
                </div>

                {/* Commit Activity Chart */}
                {commitActivity.length > 0 && (
                  <div className="activity-chart-section">
                    <div className="chart-header">
                      <h3>Commit Activity (Last 12 Weeks)</h3>
                      <div className="chart-legend">
                        <div className="legend-item">
                          <div className="legend-color high"></div>
                          <span>High Activity</span>
                        </div>
                        <div className="legend-item">
                          <div className="legend-color medium"></div>
                          <span>Medium Activity</span>
                        </div>
                        <div className="legend-item">
                          <div className="legend-color low"></div>
                          <span>Low Activity</span>
                        </div>
                      </div>
                    </div>
                    <div className="activity-chart">
                      {commitActivity.map((week, index) => {
                        const maxCommits = Math.max(...commitActivity.map(w => w.total));
                        const intensity = week.total / maxCommits;
                        return (
                          <div key={index} className="week-column">
                            <div className="week-label">W{index + 1}</div>
                            <div className="week-bars">
                              {week.days.map((day, dayIndex) => {
                                const dayIntensity = day / Math.max(...week.days);
                                return (
                                  <div 
                                    key={dayIndex} 
                                    className={`day-bar ${intensity > 0.7 ? 'high' : intensity > 0.3 ? 'medium' : 'low'}`}
                                    style={{ opacity: dayIntensity }}
                                    title={`${day} commits`}
                                  ></div>
                                );
                              })}
                            </div>
                            <div className="week-total">{week.total}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Language Distribution */}
                {languageStats.length > 0 && (
                  <div className="language-section">
                    <h3>Language Distribution</h3>
                    <div className="language-chart">
                      {languageStats.slice(0, 5).map((lang, index) => (
                        <div key={lang.language} className="language-item">
                          <div className="language-info">
                            <span className="language-name">{lang.language}</span>
                            <span className="language-percentage">{lang.percentage}%</span>
                          </div>
                          <div className="language-bar">
                            <div 
                              className="language-fill"
                              style={{ 
                                width: `${lang.percentage}%`,
                                backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                              }}
                            ></div>
                          </div>
                          <div className="language-bytes">{Math.round(lang.bytes / 1024)} KB</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contributors and Repository Info */}
                <div className="overview-grid">
                  <div className="overview-card">
                    <h3>Top Contributors</h3>
                    <div className="contributors-list">
                      {contributors.slice(0, 5).map((contributor, index) => (
                        <div key={contributor.id} className="contributor-item">
                          <div className="contributor-rank">#{index + 1}</div>
                          <img 
                            src={contributor.avatar_url} 
                            alt={contributor.login}
                            className="contributor-avatar"
                          />
                          <div className="contributor-info">
                            <span className="contributor-name">{contributor.login}</span>
                            <span className="contributor-commits">{contributor.contributions} commits</span>
                          </div>
                          <div className="contributor-percentage">
                            {((contributor.contributions / contributors.reduce((sum, c) => sum + c.contributions, 0)) * 100).toFixed(1)}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="overview-card">
                    <h3>Repository Details</h3>
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
                      <div className="info-item">
                        <span className="info-label">License:</span>
                        <span className="info-value">{repository.license?.name || 'No License'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Archived:</span>
                        <span className="info-value">{repository.archived ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="overview-card">
                    <h3>Recent Releases</h3>
                    <div className="releases-list">
                      {releaseStats.slice(0, 3).map((release) => (
                        <div key={release.id} className="release-item">
                          <div className="release-header">
                            <span className="release-tag">{release.tag_name}</span>
                            <span className="release-date">{getTimeAgo(release.published_at)}</span>
                          </div>
                          <div className="release-title">{release.name || release.tag_name}</div>
                          {release.body && (
                            <div className="release-description">
                              {release.body.substring(0, 100)}...
                            </div>
                          )}
                        </div>
                      ))}
                      {releaseStats.length === 0 && (
                        <div className="no-releases">No releases yet</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pulls' && (
              <div className="pulls-tab">
                {/* PR Filter Controls */}
                <div className="pr-controls">
                  <div className="pr-filters">
                    <button 
                      className={`filter-btn ${prFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setPrFilter('all')}
                    >
                      <div className="status-dot all"></div>
                      All ({pullRequests.length})
                    </button>
                    <button 
                      className={`filter-btn ${prFilter === 'open' ? 'active' : ''}`}
                      onClick={() => setPrFilter('open')}
                    >
                      <div className="status-dot open"></div>
                      Open ({pullRequests.filter(pr => pr.state === 'open').length})
                    </button>
                    <button 
                      className={`filter-btn ${prFilter === 'merged' ? 'active' : ''}`}
                      onClick={() => setPrFilter('merged')}
                    >
                      <div className="status-dot merged"></div>
                      Merged ({pullRequests.filter(pr => pr.state === 'closed' && pr.merged_at).length})
                    </button>
                    <button 
                      className={`filter-btn ${prFilter === 'closed' ? 'active' : ''}`}
                      onClick={() => setPrFilter('closed')}
                    >
                      <div className="status-dot closed"></div>
                      Closed ({pullRequests.filter(pr => pr.state === 'closed' && !pr.merged_at).length})
                    </button>
                    <button 
                      className={`filter-btn ${prFilter === 'draft' ? 'active' : ''}`}
                      onClick={() => setPrFilter('draft')}
                    >
                      <div className="status-dot draft"></div>
                      Draft ({pullRequests.filter(pr => pr.draft).length})
                    </button>
                  </div>
                  <div className="pr-search">
                    <input 
                      type="text" 
                      placeholder="Search pull requests..." 
                      className="pr-search-input"
                      value={prSearchQuery}
                      onChange={(e) => setPrSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Enhanced PR List */}
                <div className="pr-list">
                  {filteredPullRequests.length > 0 ? (
                    filteredPullRequests.map((pr) => (
                    <div 
                      key={pr.id} 
                      className={`pr-card ${pr.state} ${pr.draft ? 'draft' : ''}`}
                      onClick={() => navigate(`/repository/${owner}/${repo}/pull/${pr.number}`)}
                    >
                      <div className="pr-header">
                        <div className="pr-title-section">
                          <div className="pr-number">#{pr.number}</div>
                          <h4 className="pr-title">{pr.title}</h4>
                          <div className="pr-labels">
                            {pr.draft && (
                              <span className="pr-label draft">Draft</span>
                            )}
                            {pr.labels.map((label) => (
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
                        <div className="pr-status">
                          <span className={`status-badge ${pr.state} ${pr.merged_at ? 'merged' : ''}`}>
                            {pr.merged_at ? 'Merged' : pr.state === 'open' ? 'Open' : 'Closed'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="pr-meta">
                        <div className="pr-author">
                          <img 
                            src={pr.user.avatar_url} 
                            alt={pr.user.login}
                            className="author-avatar"
                          />
                          <span className="author-name">{pr.user.login}</span>
                        </div>
                        <div className="pr-dates">
                          <span className="pr-created">Created {getTimeAgo(pr.created_at)}</span>
                          {pr.updated_at !== pr.created_at && (
                            <span className="pr-updated">Updated {getTimeAgo(pr.updated_at)}</span>
                          )}
                        </div>
                      </div>

                      {pr.body && (
                        <div className="pr-description">
                          <p>{pr.body.substring(0, 150)}...</p>
                        </div>
                      )}

                      <div className="pr-stats">
                        <div className="pr-stat">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>{pr.commits || 0} commits</span>
                        </div>
                        <div className="pr-stat">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
                            <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                            <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
                            <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
                            <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          <span>{pr.changed_files || 0} files changed</span>
                        </div>
                        <div className="pr-stat">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          <span>{pr.review_comments || 0} comments</span>
                        </div>
                      </div>

                      <div className="pr-footer">
                        <div className="pr-branch-info">
                          <span className="branch-from">{pr.head.ref}</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M7 17l9.2-9.2M17 8l-9.2 9.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <span className="branch-to">{pr.base.ref}</span>
                        </div>
                        <div className="pr-actions">
                          <button className="pr-action-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                    ))
                  ) : (
                    <div className="no-prs">
                      <div className="no-prs-icon">🔍</div>
                      <h3>No pull requests found</h3>
                      <p>Try adjusting your filters or search query</p>
                    </div>
                  )}
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
      </main>
    </div>
  );
};

export default RepositoryDetail;

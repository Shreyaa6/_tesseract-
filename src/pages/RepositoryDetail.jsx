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
  const [activePrFilter, setActivePrFilter] = useState('all');
  
  // Analytics data
  const [commitActivity, setCommitActivity] = useState([]);
  const [languageStats, setLanguageStats] = useState([]);
  const [contributorActivity, setContributorActivity] = useState([]);
  const [prTrends, setPrTrends] = useState([]);
  const [issueTrends, setIssueTrends] = useState([]);
  const [repositoryHealth, setRepositoryHealth] = useState({});
  
  // Commit modal state
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [commitFiles, setCommitFiles] = useState([]);
  const [showCommitModal, setShowCommitModal] = useState(false);
  const [loadingCommitDetails, setLoadingCommitDetails] = useState(false);

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

      // Fetch analytics data
      await fetchAnalyticsData(repoFullName, headers);

    } catch (err) {
      console.error('Error fetching repository details:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalyticsData = async (repoFullName, headers) => {
    try {
      // Fetch commit activity (last 52 weeks)
      const commitActivityResponse = await fetch(`https://api.github.com/repos/${repoFullName}/stats/commit_activity`, { headers });
      if (commitActivityResponse.ok) {
        const activityData = await commitActivityResponse.json();
        setCommitActivity(activityData);
      }

      // Fetch language statistics
      const languagesResponse = await fetch(`https://api.github.com/repos/${repoFullName}/languages`, { headers });
      if (languagesResponse.ok) {
        const languagesData = await languagesResponse.json();
        const languageArray = Object.entries(languagesData).map(([name, bytes]) => ({
          name,
          bytes,
          percentage: ((bytes / Object.values(languagesData).reduce((a, b) => a + b, 0)) * 100).toFixed(1)
        }));
        setLanguageStats(languageArray);
      }

      // Fetch contributor activity
      const contributorStatsResponse = await fetch(`https://api.github.com/repos/${repoFullName}/stats/contributors`, { headers });
      if (contributorStatsResponse.ok) {
        const contributorStatsData = await contributorStatsResponse.json();
        setContributorActivity(contributorStatsData);
      }

      // Calculate repository health metrics
      const healthMetrics = calculateRepositoryHealth();
      setRepositoryHealth(healthMetrics);

      // Calculate PR and Issue trends
      const prTrendsData = calculateTrends(pullRequests, 'created_at');
      const issueTrendsData = calculateTrends(issues, 'created_at');
      setPrTrends(prTrendsData);
      setIssueTrends(issueTrendsData);

    } catch (err) {
      console.error('Error fetching analytics data:', err);
    }
  };

  const calculateRepositoryHealth = () => {
    const now = new Date();
    const lastCommit = commits[0] ? new Date(commits[0].commit.author.date) : null;
    const daysSinceLastCommit = lastCommit ? Math.floor((now - lastCommit) / (1000 * 60 * 60 * 24)) : 999;
    
    const openIssues = issues.filter(issue => issue.state === 'open').length;
    const closedIssues = issues.filter(issue => issue.state === 'closed').length;
    const openPRs = pullRequests.filter(pr => pr.state === 'open').length;
    const mergedPRs = pullRequests.filter(pr => pr.state === 'closed' && pr.merged_at).length;
    
    const issueResolutionRate = closedIssues / (openIssues + closedIssues) || 0;
    const prMergeRate = mergedPRs / (openPRs + mergedPRs) || 0;
    
    let healthScore = 100;
    if (daysSinceLastCommit > 30) healthScore -= 30;
    if (daysSinceLastCommit > 90) healthScore -= 40;
    if (issueResolutionRate < 0.5) healthScore -= 20;
    if (prMergeRate < 0.3) healthScore -= 10;
    
    return {
      score: Math.max(0, healthScore),
      lastCommitDays: daysSinceLastCommit,
      issueResolutionRate: (issueResolutionRate * 100).toFixed(1),
      prMergeRate: (prMergeRate * 100).toFixed(1),
      totalContributors: contributors.length,
      activeContributors: contributors.filter(c => c.contributions > 0).length
    };
  };

  const calculateTrends = (data, dateField) => {
    const last30Days = data.filter(item => {
      const itemDate = new Date(item[dateField]);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return itemDate >= thirtyDaysAgo;
    });
    
    return {
      total: data.length,
      last30Days: last30Days.length,
      trend: last30Days.length > data.length * 0.3 ? 'increasing' : 'stable'
    };
  };

  const fetchCommitDetails = async (commitSha) => {
    try {
      setLoadingCommitDetails(true);
      const token = localStorage.getItem('tesseract_token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      };
      
      const repoFullName = `${owner}/${repo}`;
      const response = await fetch(`https://api.github.com/repos/${repoFullName}/commits/${commitSha}`, { headers });
      
      if (response.ok) {
        const commitData = await response.json();
        setSelectedCommit(commitData);
        setCommitFiles(commitData.files || []);
        setShowCommitModal(true);
      }
    } catch (err) {
      console.error('Error fetching commit details:', err);
    } finally {
      setLoadingCommitDetails(false);
    }
  };

  const closeCommitModal = () => {
    setShowCommitModal(false);
    setSelectedCommit(null);
    setCommitFiles([]);
  };

  const handlePrAction = async (pr, action) => {
    try {
      const token = localStorage.getItem('tesseract_token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      };
      
      const repoFullName = `${owner}/${repo}`;
      
      switch (action) {
        case 'approve':
          // Create a review with approval
          await fetch(`https://api.github.com/repos/${repoFullName}/pulls/${pr.number}/reviews`, {
            method: 'POST',
            headers: {
              ...headers,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              event: 'APPROVE',
              body: 'Looks good to me! ✅'
            })
          });
          alert('Pull request approved!');
          break;
          
        case 'comment':
          const comment = prompt('Enter your review comment:');
          if (comment) {
            await fetch(`https://api.github.com/repos/${repoFullName}/pulls/${pr.number}/reviews`, {
              method: 'POST',
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                event: 'COMMENT',
                body: comment
              })
            });
            alert('Comment added!');
          }
          break;
          
        case 'reject':
          const rejectComment = prompt('Enter rejection reason:');
          if (rejectComment) {
            await fetch(`https://api.github.com/repos/${repoFullName}/pulls/${pr.number}/reviews`, {
              method: 'POST',
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                event: 'REQUEST_CHANGES',
                body: rejectComment
              })
            });
            alert('Pull request rejected with feedback!');
          }
          break;
          
        case 'merge':
          // Merge the pull request
          await fetch(`https://api.github.com/repos/${repoFullName}/pulls/${pr.number}/merge`, {
            method: 'PUT',
            headers: {
              ...headers,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              commit_title: `Merge pull request #${pr.number} from ${pr.head.ref}`,
              commit_message: pr.title,
              merge_method: 'merge'
            })
          });
          alert('Pull request merged!');
          break;
          
        case 'close':
          // Close the pull request
          await fetch(`https://api.github.com/repos/${repoFullName}/pulls/${pr.number}`, {
            method: 'PATCH',
            headers: {
              ...headers,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              state: 'closed'
            })
          });
          alert('Pull request closed!');
          break;
          
        default:
          break;
      }
      
      // Refresh the PR data
      fetchRepositoryDetails();
      
    } catch (err) {
      console.error('Error performing PR action:', err);
      alert('Error performing action. Please try again.');
    }
  };

  const handleBulkAction = async (action) => {
    const openPRs = pullRequests.filter(pr => pr.state === 'open');
    if (openPRs.length === 0) {
      alert('No open pull requests to perform bulk action on.');
      return;
    }

    const confirmMessage = `Are you sure you want to ${action} ${openPRs.length} open pull request(s)?`;
    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      const token = localStorage.getItem('tesseract_token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      };
      
      const repoFullName = `${owner}/${repo}`;
      
      for (const pr of openPRs) {
        switch (action) {
          case 'approve':
            await fetch(`https://api.github.com/repos/${repoFullName}/pulls/${pr.number}/reviews`, {
              method: 'POST',
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                event: 'APPROVE',
                body: 'Bulk approved ✅'
              })
            });
            break;
            
          case 'comment':
            await fetch(`https://api.github.com/repos/${repoFullName}/pulls/${pr.number}/reviews`, {
              method: 'POST',
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                event: 'COMMENT',
                body: 'Bulk review comment'
              })
            });
            break;
            
          case 'close':
            await fetch(`https://api.github.com/repos/${repoFullName}/pulls/${pr.number}`, {
              method: 'PATCH',
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                state: 'closed'
              })
            });
            break;
        }
      }
      
      alert(`Bulk ${action} completed on ${openPRs.length} pull request(s)!`);
      fetchRepositoryDetails();
      
    } catch (err) {
      console.error('Error performing bulk action:', err);
      alert('Error performing bulk action. Please try again.');
    }
  };

  const getFileIcon = (filename) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    const iconMap = {
      'js': '📄',
      'jsx': '⚛️',
      'ts': '📘',
      'tsx': '⚛️',
      'css': '🎨',
      'html': '🌐',
      'json': '📋',
      'md': '📝',
      'py': '🐍',
      'java': '☕',
      'cpp': '⚙️',
      'c': '⚙️',
      'php': '🐘',
      'rb': '💎',
      'go': '🐹',
      'rs': '🦀',
      'sql': '🗄️',
      'xml': '📄',
      'yml': '⚙️',
      'yaml': '⚙️',
      'sh': '🐚',
      'bat': '🖥️',
      'ps1': '🖥️',
      'dockerfile': '🐳',
      'gitignore': '🚫',
      'env': '🔧',
      'lock': '🔒',
      'txt': '📄',
      'log': '📋',
      'svg': '🎨',
      'png': '🖼️',
      'jpg': '🖼️',
      'jpeg': '🖼️',
      'gif': '🖼️',
      'ico': '🖼️',
      'pdf': '📄',
      'zip': '📦',
      'tar': '📦',
      'gz': '📦'
    };
    return iconMap[extension] || '📄';
  };

  const getFileStatusIcon = (status) => {
    const statusMap = {
      'added': '➕',
      'modified': '✏️',
      'removed': '➖',
      'renamed': '🔄',
      'copied': '📋'
    };
    return statusMap[status] || '📄';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
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
              <button 
                className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('analytics')}
              >
                Analytics & Insights
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-tab">
                {/* Repository Health Dashboard */}
                <div className="health-dashboard">
                  <h3>Repository Health</h3>
                  <div className="health-metrics">
                    <div className="health-score">
                      <div className="score-circle">
                        <span className="score-number">{repositoryHealth.score || 0}</span>
                        <span className="score-label">Health Score</span>
                      </div>
                    </div>
                    <div className="health-stats">
                      <div className="health-stat">
                        <span className="stat-value">{repositoryHealth.lastCommitDays || 0}</span>
                        <span className="stat-label">Days since last commit</span>
                      </div>
                      <div className="health-stat">
                        <span className="stat-value">{repositoryHealth.issueResolutionRate || 0}%</span>
                        <span className="stat-label">Issue resolution rate</span>
                      </div>
                      <div className="health-stat">
                        <span className="stat-value">{repositoryHealth.prMergeRate || 0}%</span>
                        <span className="stat-label">PR merge rate</span>
                      </div>
                      <div className="health-stat">
                        <span className="stat-value">{repositoryHealth.activeContributors || 0}</span>
                        <span className="stat-label">Active contributors</span>
                      </div>
                    </div>
                  </div>
                </div>

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
                            <div className="contributor-stats">
                              <span className="contributor-commits">{contributor.contributions} commits</span>
                              <div className="contribution-bar">
                                <div 
                                  className="contribution-fill" 
                                  style={{ 
                                    width: `${(contributor.contributions / contributors[0]?.contributions) * 100}%` 
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="overview-card">
                    <h3>Language Distribution</h3>
                    <div className="language-stats">
                      {languageStats.slice(0, 5).map((lang, index) => (
                        <div key={lang.name} className="language-item">
                          <div className="language-info">
                            <span className="language-name">{lang.name}</span>
                            <span className="language-percentage">{lang.percentage}%</span>
                          </div>
                          <div className="language-bar">
                            <div 
                              className="language-fill" 
                              style={{ width: `${lang.percentage}%` }}
                            ></div>
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

                  <div className="overview-card">
                    <h3>Activity Trends</h3>
                    <div className="trends-stats">
                      <div className="trend-item">
                        <span className="trend-label">Pull Requests</span>
                        <div className="trend-info">
                          <span className="trend-total">{prTrends.total || 0}</span>
                          <span className={`trend-indicator ${prTrends.trend || 'stable'}`}>
                            {prTrends.trend === 'increasing' ? '↗' : '→'}
                          </span>
                        </div>
                      </div>
                      <div className="trend-item">
                        <span className="trend-label">Issues</span>
                        <div className="trend-info">
                          <span className="trend-total">{issueTrends.total || 0}</span>
                          <span className={`trend-indicator ${issueTrends.trend || 'stable'}`}>
                            {issueTrends.trend === 'increasing' ? '↗' : '→'}
                          </span>
                        </div>
                      </div>
                      <div className="trend-item">
                        <span className="trend-label">Last 30 Days</span>
                        <div className="trend-info">
                          <span className="trend-total">
                            {(prTrends.last30Days || 0) + (issueTrends.last30Days || 0)}
                          </span>
                          <span className="trend-indicator stable">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="analytics-tab">
                <div className="analytics-grid">
                  {/* Commit Activity Chart */}
                  <div className="analytics-card large">
                    <h3>Commit Activity (Last 12 Weeks)</h3>
                    <div className="commit-chart">
                      {commitActivity.slice(-12).map((week, index) => {
                        const maxCommits = Math.max(...commitActivity.map(w => w.total));
                        const height = (week.total / maxCommits) * 100;
                        return (
                          <div key={index} className="commit-bar">
                            <div 
                              className="commit-bar-fill" 
                              style={{ height: `${height}%` }}
                              title={`${week.total} commits`}
                            ></div>
                            <span className="commit-week">W{index + 1}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contributor Activity */}
                  <div className="analytics-card">
                    <h3>Contributor Activity</h3>
                    <div className="contributor-chart">
                      {contributorActivity.slice(0, 8).map((contributor, index) => {
                        const totalCommits = contributor.weeks.reduce((sum, week) => sum + week.c, 0);
                        const maxCommits = Math.max(...contributorActivity.map(c => 
                          c.weeks.reduce((sum, week) => sum + week.c, 0)
                        ));
                        const width = (totalCommits / maxCommits) * 100;
                        return (
                          <div key={contributor.author.id} className="contributor-bar">
                            <div className="contributor-info">
                              <img 
                                src={contributor.author.avatar_url} 
                                alt={contributor.author.login}
                                className="contributor-mini-avatar"
                              />
                              <span className="contributor-mini-name">{contributor.author.login}</span>
                            </div>
                            <div className="contributor-bar-container">
                              <div 
                                className="contributor-bar-fill" 
                                style={{ width: `${width}%` }}
                              ></div>
                              <span className="contributor-count">{totalCommits}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Language Distribution Chart */}
                  <div className="analytics-card">
                    <h3>Language Distribution</h3>
                    <div className="language-chart">
                      {languageStats.map((lang, index) => (
                        <div key={lang.name} className="language-chart-item">
                          <div className="language-chart-info">
                            <div 
                              className="language-color" 
                              style={{ 
                                backgroundColor: `hsl(${index * 60}, 70%, 50%)` 
                              }}
                            ></div>
                            <span className="language-chart-name">{lang.name}</span>
                            <span className="language-chart-percentage">{lang.percentage}%</span>
                          </div>
                          <div className="language-chart-bar">
                            <div 
                              className="language-chart-fill" 
                              style={{ 
                                width: `${lang.percentage}%`,
                                backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Repository Metrics */}
                  <div className="analytics-card">
                    <h3>Repository Metrics</h3>
                    <div className="metrics-grid">
                      <div className="metric-item">
                        <div className="metric-icon">📊</div>
                        <div className="metric-content">
                          <span className="metric-value">{repository.stargazers_count}</span>
                          <span className="metric-label">Stars</span>
                        </div>
                      </div>
                      <div className="metric-item">
                        <div className="metric-icon">🍴</div>
                        <div className="metric-content">
                          <span className="metric-value">{repository.forks_count}</span>
                          <span className="metric-label">Forks</span>
                        </div>
                      </div>
                      <div className="metric-item">
                        <div className="metric-icon">👀</div>
                        <div className="metric-content">
                          <span className="metric-value">{repository.watchers_count}</span>
                          <span className="metric-label">Watchers</span>
                        </div>
                      </div>
                      <div className="metric-item">
                        <div className="metric-icon">📝</div>
                        <div className="metric-content">
                          <span className="metric-value">{commits.length}</span>
                          <span className="metric-label">Recent Commits</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Timeline */}
                  <div className="analytics-card large">
                    <h3>Recent Activity Timeline</h3>
                    <div className="activity-timeline">
                      {[...commits.slice(0, 10), ...pullRequests.slice(0, 5), ...issues.slice(0, 5)]
                        .sort((a, b) => new Date(b.created_at || b.commit?.author?.date) - new Date(a.created_at || a.commit?.author?.date))
                        .slice(0, 15)
                        .map((item, index) => (
                          <div key={`${item.id || item.sha}-${index}`} className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                              <div className="timeline-header">
                                <span className="timeline-type">
                                  {item.commit ? 'Commit' : item.pull_request ? 'Pull Request' : 'Issue'}
                                </span>
                                <span className="timeline-date">
                                  {getTimeAgo(item.created_at || item.commit?.author?.date)}
                                </span>
                              </div>
                              <div className="timeline-title">
                                {item.commit ? item.commit.message.split('\n')[0] : item.title}
                              </div>
                              <div className="timeline-author">
                                by {item.commit ? item.commit.author.name : item.user?.login}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pulls' && (
              <div className="pulls-tab">
                <div className="pr-header">
                  <div className="pr-stats">
                    <div className="pr-stat-item">
                      <span className="pr-stat-number">{pullRequests.filter(pr => pr.state === 'open').length}</span>
                      <span className="pr-stat-label">Open</span>
                    </div>
                    <div className="pr-stat-item">
                      <span className="pr-stat-number">{pullRequests.filter(pr => pr.state === 'closed' && pr.merged_at).length}</span>
                      <span className="pr-stat-label">Merged</span>
                    </div>
                    <div className="pr-stat-item">
                      <span className="pr-stat-number">{pullRequests.filter(pr => pr.state === 'closed' && !pr.merged_at).length}</span>
                      <span className="pr-stat-label">Closed</span>
                    </div>
                  </div>
                  <div className="pr-controls">
                    <div className="pr-filters">
                      <button className={`filter-btn ${activePrFilter === 'all' ? 'active' : ''}`} onClick={() => setActivePrFilter('all')}>
                        All ({pullRequests.length})
                      </button>
                      <button className={`filter-btn ${activePrFilter === 'open' ? 'active' : ''}`} onClick={() => setActivePrFilter('open')}>
                        Open ({pullRequests.filter(pr => pr.state === 'open').length})
                      </button>
                      <button className={`filter-btn ${activePrFilter === 'merged' ? 'active' : ''}`} onClick={() => setActivePrFilter('merged')}>
                        Merged ({pullRequests.filter(pr => pr.state === 'closed' && pr.merged_at).length})
                      </button>
                    </div>
                    <div className="pr-bulk-actions">
                      <button className="bulk-action-btn" onClick={() => handleBulkAction('approve')}>
                        Bulk Approve
                      </button>
                      <button className="bulk-action-btn" onClick={() => handleBulkAction('comment')}>
                        Bulk Comment
                      </button>
                      <button className="bulk-action-btn" onClick={() => handleBulkAction('close')}>
                        Bulk Close
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="pr-list">
                  {pullRequests
                    .filter(pr => {
                      if (activePrFilter === 'open') return pr.state === 'open';
                      if (activePrFilter === 'merged') return pr.state === 'closed' && pr.merged_at;
                      if (activePrFilter === 'closed') return pr.state === 'closed' && !pr.merged_at;
                      return true;
                    })
                    .map((pr) => (
                    <div key={pr.id} className="pr-card">
                      <div className="pr-card-header">
                        <div className="pr-title-section">
                          <div className="pr-icon">
                            {pr.state === 'open' ? '🔀' : pr.merged_at ? '✅' : '❌'}
                          </div>
                          <div className="pr-title-info">
                            <h4 className="pr-title">{pr.title}</h4>
                            <div className="pr-meta">
                              <span className="pr-number">#{pr.number}</span>
                              <span className="pr-author">by {pr.user.login}</span>
                              <span className="pr-date">{getTimeAgo(pr.created_at)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="pr-status-section">
                          <span className={`pr-status ${pr.state} ${pr.merged_at ? 'merged' : ''}`}>
                            {pr.merged_at ? 'Merged' : pr.state}
                          </span>
                          <div className="pr-actions">
                            <a 
                              href={pr.html_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="pr-action-btn view"
                            >
                              View
                            </a>
                            {pr.state === 'open' && (
                              <>
                                <button className="pr-action-btn approve" onClick={() => handlePrAction(pr, 'approve')}>
                                  Approve
                                </button>
                                <button className="pr-action-btn comment" onClick={() => handlePrAction(pr, 'comment')}>
                                  Comment
                                </button>
                                <button className="pr-action-btn merge" onClick={() => handlePrAction(pr, 'merge')}>
                                  Merge
                                </button>
                                <button className="pr-action-btn reject" onClick={() => handlePrAction(pr, 'reject')}>
                                  Reject
                                </button>
                                <button className="pr-action-btn close" onClick={() => handlePrAction(pr, 'close')}>
                                  Close
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {pr.body && (
                        <div className="pr-description">
                          <p>{pr.body.substring(0, 300)}{pr.body.length > 300 ? '...' : ''}</p>
                        </div>
                      )}
                      
                      <div className="pr-footer">
                        <div className="pr-stats-mini">
                          <div className="pr-stat-mini">
                            <span className="stat-icon">💬</span>
                            <span className="stat-text">{pr.comments || 0} comments</span>
                          </div>
                          <div className="pr-stat-mini">
                            <span className="stat-icon">📝</span>
                            <span className="stat-text">{pr.commits || 0} commits</span>
                          </div>
                          <div className="pr-stat-mini">
                            <span className="stat-icon">📁</span>
                            <span className="stat-text">{pr.changed_files || 0} files</span>
                          </div>
                          {pr.additions && pr.deletions && (
                            <div className="pr-stat-mini">
                              <span className="stat-icon">➕</span>
                              <span className="stat-text">{pr.additions} additions</span>
                            </div>
                          )}
                          {pr.additions && pr.deletions && (
                            <div className="pr-stat-mini">
                              <span className="stat-icon">➖</span>
                              <span className="stat-text">{pr.deletions} deletions</span>
                            </div>
                          )}
                        </div>
                        
                        {pr.labels && pr.labels.length > 0 && (
                          <div className="pr-labels">
                            {pr.labels.map((label, index) => (
                              <span 
                                key={index} 
                                className="pr-label"
                                style={{ backgroundColor: `#${label.color}` }}
                              >
                                {label.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
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
                <div className="commits-list">
                  {commits.map((commit) => (
                    <div 
                      key={commit.sha} 
                      className="commit-item"
                      onClick={() => fetchCommitDetails(commit.sha)}
                    >
                      <div className="commit-icon">📝</div>
                      <div className="commit-content">
                        <div className="commit-header">
                          <h4 className="commit-title">{commit.commit.message.split('\n')[0]}</h4>
                          <div className="commit-meta">
                            <span className="commit-sha">{commit.sha.substring(0, 7)}</span>
                            <span className="commit-date">{getTimeAgo(commit.commit.author.date)}</span>
                          </div>
                        </div>
                        <div className="commit-author">
                          <img 
                            src={commit.author?.avatar_url || 'https://via.placeholder.com/20'} 
                            alt={commit.commit.author.name}
                            className="author-avatar"
                          />
                          <span className="author-name">{commit.commit.author.name}</span>
                          <span className="author-email">{commit.commit.author.email}</span>
                        </div>
                        {commit.stats && (
                          <div className="commit-stats">
                            <span className="stat-item">
                              <span className="stat-icon">➕</span>
                              <span className="stat-text">{commit.stats.additions} additions</span>
                            </span>
                            <span className="stat-item">
                              <span className="stat-icon">➖</span>
                              <span className="stat-text">{commit.stats.deletions} deletions</span>
                            </span>
                            <span className="stat-item">
                              <span className="stat-icon">📄</span>
                              <span className="stat-text">{commit.stats.total} files changed</span>
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="commit-arrow">→</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Commit Details Modal */}
      {showCommitModal && selectedCommit && (
        <div className="commit-modal-overlay" onClick={closeCommitModal}>
          <div className="commit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="commit-modal-header">
              <div className="commit-modal-title">
                <span className="commit-modal-icon">📝</span>
                <h3>{selectedCommit.commit.message.split('\n')[0]}</h3>
              </div>
              <button className="close-modal-btn" onClick={closeCommitModal}>×</button>
            </div>
            
            <div className="commit-modal-content">
              <div className="commit-info">
                <div className="commit-details">
                  <div className="commit-sha-full">
                    <span className="label">Commit:</span>
                    <code className="sha-code">{selectedCommit.sha}</code>
                    <button 
                      className="copy-btn"
                      onClick={() => navigator.clipboard.writeText(selectedCommit.sha)}
                    >
                      📋
                    </button>
                  </div>
                  <div className="commit-author-info">
                    <img 
                      src={selectedCommit.author?.avatar_url || 'https://via.placeholder.com/40'} 
                      alt={selectedCommit.commit.author.name}
                      className="commit-author-avatar"
                    />
                    <div className="author-details">
                      <span className="author-name">{selectedCommit.commit.author.name}</span>
                      <span className="author-email">{selectedCommit.commit.author.email}</span>
                      <span className="commit-date">{formatDate(selectedCommit.commit.author.date)}</span>
                    </div>
                  </div>
                </div>
                
                {selectedCommit.stats && (
                  <div className="commit-summary">
                    <div className="summary-item">
                      <span className="summary-icon">📊</span>
                      <span className="summary-text">
                        {selectedCommit.stats.additions} additions, {selectedCommit.stats.deletions} deletions
                      </span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-icon">📄</span>
                      <span className="summary-text">
                        {selectedCommit.stats.total} files changed
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {loadingCommitDetails ? (
                <div className="loading-files">
                  <div className="loading-spinner"></div>
                  <span>Loading file changes...</span>
                </div>
              ) : (
                <div className="files-changes">
                  <h4>Files Changed ({commitFiles.length})</h4>
                  <div className="files-list">
                    {commitFiles.map((file, index) => (
                      <div key={index} className="file-item">
                        <div className="file-header">
                          <div className="file-info">
                            <span className="file-status-icon">{getFileStatusIcon(file.status)}</span>
                            <span className="file-icon">{getFileIcon(file.filename)}</span>
                            <span className="file-name">{file.filename}</span>
                            {file.previous_filename && (
                              <span className="file-rename">
                                {' '}→ {file.previous_filename}
                              </span>
                            )}
                          </div>
                          <div className="file-stats">
                            {file.additions > 0 && (
                              <span className="file-additions">+{file.additions}</span>
                            )}
                            {file.deletions > 0 && (
                              <span className="file-deletions">-{file.deletions}</span>
                            )}
                            {file.changes > 0 && (
                              <span className="file-changes">{file.changes} changes</span>
                            )}
                          </div>
                        </div>
                        
                        {file.patch && (
                          <div className="file-diff">
                            <div className="diff-header">
                              <span className="diff-label">Changes</span>
                              <span className="diff-size">{formatFileSize(file.patch.length)}</span>
                            </div>
                            <pre className="diff-content">
                              <code>{file.patch.substring(0, 1000)}{file.patch.length > 1000 ? '...' : ''}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepositoryDetail;

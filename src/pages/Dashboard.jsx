import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../components/SkeletonLoader';
import githubApi from '../services/githubApi';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout, isMaintainer } = useAuth();
  const navigate = useNavigate();
  const [repoData, setRepoData] = useState(null);
  const [prData, setPrData] = useState(null);
  const [issuesData, setIssuesData] = useState(null);
  const [contributorsData, setContributorsData] = useState(null);
  const [recentActivity, setRecentActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableRepos, setAvailableRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState('Shreyaa6/_tesseract-');
  const [reposWithAccess, setReposWithAccess] = useState([]);
  const [currentView, setCurrentView] = useState('overview'); // 'overview' or 'single'
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 10;

  useEffect(() => {
    if (user) {
      fetchUserRepositories();
    }
  }, [user]);

  useEffect(() => {
    if (selectedRepo) {
      fetchGitHubData(selectedRepo);
    }
  }, [selectedRepo]);

  const fetchUserRepositories = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('tesseract_token');
      if (!token) return;

      // Fetch user's repositories via our server
      const repos = await githubApi.getUserRepositories(token);
      console.log('User repositories:', repos);
        
      // Check access level for each repository
      const reposWithAccessData = await Promise.all(
        repos.map(async (repo) => {
          try {
            // Check if user has any level of access (admin, write, or read)
            let accessLevel = 'read';
            let hasCollaboratorAccess = false;
            
            try {
              const permission = await githubApi.getCollaboratorPermission(token, repo.owner.login, repo.name, user.login);
              accessLevel = permission.permission;
              hasCollaboratorAccess = ['admin', 'write', 'read'].includes(permission.permission);
            } catch (err) {
              console.log(`No collaborator access for ${repo.full_name}`);
            }
            
            // Fetch additional metrics for each repo via our server
            const [prs, issues, contributors, commits] = await Promise.all([
              githubApi.getPullRequests(token, repo.owner.login, repo.name, { per_page: 10 }).catch(() => []),
              githubApi.getIssues(token, repo.owner.login, repo.name, { per_page: 10 }).catch(() => []),
              githubApi.getContributors(token, repo.owner.login, repo.name, { per_page: 5 }).catch(() => []),
              githubApi.getCommits(token, repo.owner.login, repo.name, { 
                since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                per_page: 100 
              }).catch(() => [])
            ]);
            
            return {
              ...repo,
              accessLevel,
              hasCollaboratorAccess,
              prCount: prs.length,
              issuesCount: issues.length,
              contributorsCount: contributors.length,
              contributors: contributors.slice(0, 5),
              commits: commits,
              commitsCount: commits.length,
              lastContribution: commits.length > 0 ? commits[0].commit.author.date : repo.updated_at,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              updatedAt: repo.updated_at
            };
          } catch (err) {
            console.error(`Error fetching data for ${repo.full_name}:`, err);
            return {
              ...repo,
              accessLevel: 'read',
              hasCollaboratorAccess: false,
              prCount: 0,
              issuesCount: 0,
              contributorsCount: 0,
              contributors: [],
              commits: [],
              commitsCount: 0,
              lastContribution: repo.updated_at,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              updatedAt: repo.updated_at
            };
          }
        })
      );
        
      // Filter repositories with any level of access (admin, write, or read)
      const collaboratorRepos = reposWithAccessData.filter(repo => repo.hasCollaboratorAccess);
      console.log('Total repositories found:', reposWithAccessData.length);
      console.log('Repositories with access:', collaboratorRepos.length);
      console.log('Repository access details:', reposWithAccessData.map(repo => ({
        name: repo.name,
        owner: repo.owner.login,
        accessLevel: repo.accessLevel,
        hasAccess: repo.hasCollaboratorAccess
      })));
      setReposWithAccess(collaboratorRepos);
      
      // Format repositories for dropdown
      const formattedRepos = reposWithAccessData.map(repo => ({
        value: `${repo.owner.login}/${repo.name}`,
        label: `${repo.name}`,
        fullName: repo.full_name,
        owner: repo.owner.login,
        name: repo.name,
        private: repo.private,
        fork: repo.fork,
        hasCollaboratorAccess: repo.hasCollaboratorAccess
      }));
      
      setAvailableRepos(formattedRepos);
      
      // Set default repository if none selected
      if (formattedRepos.length > 0 && !selectedRepo) {
        setSelectedRepo(formattedRepos[0].value);
      }
    } catch (err) {
      console.error('Error fetching user repositories:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchGitHubData = async (repoFullName = selectedRepo) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('tesseract_token');
      
      console.log('=== Dashboard API Debug ===');
      console.log('Token exists:', !!token);
      
      if (!token) {
        throw new Error('No GitHub token found');
      }

      const [owner, repoName] = repoFullName.split('/');

      // Fetch repository data via our server
      console.log('Fetching repository data for:', repoFullName);
      const repo = await githubApi.getRepository(token, owner, repoName);
      console.log('Repository data:', repo);
      setRepoData(repo);

      // Fetch pull requests via our server
      console.log('Fetching pull requests...');
      try {
        const prs = await githubApi.getPullRequests(token, owner, repoName, { per_page: 100 });
        console.log('Pull requests data:', prs);
        setPrData(prs);
      } catch (err) {
        console.error('PR API error:', err);
      }

      // Fetch issues via our server
      console.log('Fetching issues...');
      try {
        const issues = await githubApi.getIssues(token, owner, repoName, { per_page: 100 });
        console.log('Issues data:', issues);
        setIssuesData(issues);
      } catch (err) {
        console.error('Issues API error:', err);
      }

      // Fetch contributors via our server
      console.log('Fetching contributors...');
      try {
        const contributors = await githubApi.getContributors(token, owner, repoName);
        console.log('Contributors data:', contributors);
        console.log('Contributors count:', contributors.length);
        console.log('Contributors details:', contributors.map(c => ({
          login: c.login,
          contributions: c.contributions,
          avatar_url: c.avatar_url
        })));
        setContributorsData(contributors);
      } catch (err) {
        console.error('Contributors API error:', err);
        
        // Fallback: try to get contributors from commits
        console.log('Trying fallback: getting contributors from commits...');
        try {
          const commits = await githubApi.getCommits(token, owner, repoName, { per_page: 100 });
          console.log('Commits for contributors:', commits);
          
          // Extract unique contributors from commits
          const contributorMap = new Map();
          commits.forEach(commit => {
            if (commit.author && commit.author.login) {
              if (!contributorMap.has(commit.author.login)) {
                contributorMap.set(commit.author.login, {
                  login: commit.author.login,
                  avatar_url: commit.author.avatar_url,
                  contributions: 1
                });
              } else {
                contributorMap.get(commit.author.login).contributions++;
              }
            }
          });
          
          const contributorsFromCommits = Array.from(contributorMap.values());
          console.log('Contributors from commits:', contributorsFromCommits);
          setContributorsData(contributorsFromCommits);
        } catch (commitErr) {
          console.error('Fallback contributors error:', commitErr);
        }
      }

      // Fetch recent activity (commits) via our server
      if (!recentActivity) {
        console.log('Fetching recent commits...');
        try {
          const commits = await githubApi.getCommits(token, owner, repoName, { per_page: 10 });
          console.log('Commits data:', commits);
          setRecentActivity(commits);
        } catch (err) {
          console.error('Commits API error:', err);
        }
      }

      console.log('=== API Debug Complete ===');

    } catch (err) {
      console.error('Error fetching GitHub data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate metrics from real data
  const calculateMetrics = () => {
    if (!prData || !issuesData || !repoData) return null;

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // PR metrics
    const recentPRs = prData.filter(pr => new Date(pr.created_at) > thirtyDaysAgo);
    const mergedPRs = prData.filter(pr => pr.state === 'closed' && pr.merged_at);
    const avgPRTime = mergedPRs.length > 0 
      ? mergedPRs.reduce((acc, pr) => {
          const created = new Date(pr.created_at);
          const merged = new Date(pr.merged_at);
          return acc + (merged - created);
        }, 0) / mergedPRs.length / (1000 * 60 * 60 * 24)
      : 0;

    // Issue metrics
    const recentIssues = issuesData.filter(issue => new Date(issue.created_at) > thirtyDaysAgo);
    const closedIssues = issuesData.filter(issue => issue.state === 'closed');
    const avgIssueTime = closedIssues.length > 0
      ? closedIssues.reduce((acc, issue) => {
          const created = new Date(issue.created_at);
          const closed = new Date(issue.closed_at);
          return acc + (closed - created);
        }, 0) / closedIssues.length / (1000 * 60 * 60 * 24)
      : 0;

    return {
      prs: {
        opened: recentPRs.length,
        merged: mergedPRs.length,
        velocity: avgPRTime.toFixed(1) + 'd'
      },
      issues: {
        opened: recentIssues.length,
        closed: closedIssues.length,
        velocity: avgIssueTime.toFixed(1) + 'd'
      },
      engagement: {
        stars: repoData.stargazers_count || 0,
        forks: repoData.forks_count || 0,
        watchers: repoData.watchers_count || 0,
        activity: repoData.stargazers_count > 10 ? 'High' : repoData.stargazers_count > 5 ? 'Medium' : 'Low'
      }
    };
  };

  const metrics = calculateMetrics();

  // Generate activity path for the line graph based on real commit data
  const generateActivityPath = (repo) => {
    const points = 7; // Number of data points for 30 days
    const width = 80;
    const height = 30;
    const stepX = width / (points - 1);
    
    // Create activity data based on real commits from last 30 days
    const activityData = Array.from({ length: points }, (_, i) => {
      const daysAgo = Math.floor((30 * i) / (points - 1)); // 0, 5, 10, 15, 20, 25, 30 days ago
      const targetDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
      
      // Count commits for this specific day
      const commitsOnDay = repo.commits ? repo.commits.filter(commit => {
        const commitDate = new Date(commit.commit.author.date);
        return commitDate.toDateString() === targetDate.toDateString();
      }).length : 0;
      
      // Normalize activity (0-1 scale, with some smoothing)
      const normalizedActivity = Math.min(1, commitsOnDay / 5); // Max 5 commits per day = 1.0
      return normalizedActivity;
    });
    
    const pathData = activityData.map((value, index) => {
      const x = index * stepX;
      const y = height - (value * height);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
    
    return pathData;
  };

  const handleRepoClick = (repo) => {
    navigate(`/repo/${repo.owner.login}/${repo.name}`);
  };

  // Filter repositories based on search term
  const filteredRepos = reposWithAccess.filter(repo => 
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.owner.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredRepos.length / reposPerPage);
  const startIndex = (currentPage - 1) * reposPerPage;
  const endIndex = startIndex + reposPerPage;
  const currentRepos = filteredRepos.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="dashboard-container">
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
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

        <main className="dashboard-main">
          <div className="dashboard-content">
            {loading ? (
              <SkeletonLoader />
            ) : (
              <div className="repositories-overview">
                <div className="overview-header">
                  <div className="overview-title">
                    <h1>Repositories</h1>
                    <p>{filteredRepos.length} repositories {searchTerm && `(filtered from ${reposWithAccess.length})`}</p>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="search-container">
                  <div className="search-bar">
                    <input
                      type="text"
                      placeholder="Search repositories by name or owner..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="search-input"
                    />
                    <div className="search-icon">🔍</div>
                  </div>
                </div>

                <div className="repositories-table">
                  <div className="table-header">
                    <div className="table-cell">REPOSITORY</div>
                    <div className="table-cell">ACTIVITY</div>
                    <div className="table-cell">PULL REQUESTS</div>
                    <div className="table-cell">CONTRIBUTORS</div>
                    <div className="table-cell">COMMITS</div>
                    <div className="table-cell">LAST 30 DAYS</div>
                  </div>

                  {currentRepos.map((repo, index) => (
                    <div key={repo.id} className="table-row" onClick={() => handleRepoClick(repo)}>
                      <div className="table-cell">
                        <div className="repo-cell">
                          <div className="repo-info-cell">
                            <div className="repo-name">{repo.name}</div>
                            <div className="repo-org">@{repo.owner.login}</div>
                          </div>
                        </div>
                      </div>
                      <div className="table-cell">
                        <div className={`activity-indicator ${repo.stars > 10 ? 'high' : repo.stars > 5 ? 'medium' : 'low'}`}>
                          <span className="activity-dot"></span>
                          {repo.stars > 10 ? 'High' : repo.stars > 5 ? 'Medium' : 'Low'}
                        </div>
                      </div>
                      <div className="table-cell">
                        <div className="pr-info">
                          <div className="pr-count">{repo.prCount} PRs</div>
                          <div className="pr-stats">
                            <span className="pr-open">{repo.prCount} open</span>
                            <span className="pr-separator">•</span>
                            <span className="pr-closed">{Math.floor(repo.prCount * 0.8)} closed</span>
                          </div>
                        </div>
                      </div>
                      <div className="table-cell">
                        <div className="contributors">
                          {repo.contributors.slice(0, 4).map((contributor, idx) => (
                            <div key={idx} className="contributor-avatar">
                              <img 
                                src={contributor.avatar_url} 
                                alt={contributor.login}
                                onError={(e) => {
                                  e.target.src = `https://ui-avatars.com/api/?name=${contributor.login}&background=667eea&color=fff&size=28`;
                                }}
                              />
                            </div>
                          ))}
                          {repo.contributorsCount > 4 && (
                            <span className="contributor-count">+{repo.contributorsCount - 4}</span>
                          )}
                        </div>
                      </div>
                      <div className="table-cell">
                        <div className="commits-info">
                          <div className="last-commit-date">
                            {new Date(repo.lastContribution).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="total-commits">
                            {repo.commitsCount} commits
                          </div>
                        </div>
                      </div>
                      <div className="table-cell">
                        <div className="activity-graph">
                          <div className="graph-container">
                            <svg className="line-graph" width="80" height="30" viewBox="0 0 80 30">
                              <defs>
                                <linearGradient id={`gradient-${repo.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3"/>
                                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0"/>
                                </linearGradient>
                              </defs>
                              <path
                                d={generateActivityPath(repo)}
                                fill="none"
                                stroke="#22c55e"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d={generateActivityPath(repo)}
                                fill={`url(#gradient-${repo.id})`}
                                stroke="none"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination-container">
                    <div className="pagination">
                      <button 
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        ← Previous
                      </button>
                      
                      <div className="pagination-info">
                        Page {currentPage} of {totalPages}
                      </div>
                      
                      <div className="pagination-numbers">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <button
                              key={pageNum}
                              className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                              onClick={() => handlePageChange(pageNum)}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>
                      
                      <button 
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  };

export default Dashboard;

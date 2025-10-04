import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import SkeletonLoader from '../components/SkeletonLoader';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout, isMaintainer } = useAuth();
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

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      };

      // Fetch user's repositories
      const reposResponse = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', { headers });
      if (reposResponse.ok) {
        const repos = await reposResponse.json();
        console.log('User repositories:', repos);
        
        // Check access level for each repository
        const reposWithAccessData = await Promise.all(
          repos.map(async (repo) => {
            try {
              // Check if user has admin/maintainer/collaborator access
              const accessResponse = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/collaborators/${user.login}/permission`, { headers });
              let accessLevel = 'read';
              let hasCollaboratorAccess = false;
              
              if (accessResponse.ok) {
                const permission = await accessResponse.json();
                accessLevel = permission.permission;
                hasCollaboratorAccess = ['admin', 'maintain', 'write'].includes(permission.permission);
              }
              
              // Fetch additional metrics for each repo
              const [prsResponse, issuesResponse, contributorsResponse, commitsResponse] = await Promise.all([
                fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/pulls?state=all&per_page=10`, { headers }),
                fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/issues?state=all&per_page=10`, { headers }),
                fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/contributors?per_page=5`, { headers }),
                fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?since=${new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()}&per_page=100`, { headers })
              ]);
              
              const prs = prsResponse.ok ? await prsResponse.json() : [];
              const issues = issuesResponse.ok ? await issuesResponse.json() : [];
              const contributors = contributorsResponse.ok ? await contributorsResponse.json() : [];
              const commits = commitsResponse.ok ? await commitsResponse.json() : [];
              
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
        
        // Filter repositories with admin/maintainer/collaborator access
        const collaboratorRepos = reposWithAccessData.filter(repo => repo.hasCollaboratorAccess);
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
      }
    } catch (err) {
      console.error('Error fetching user repositories:', err);
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

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      };

      // Fetch repository data
      console.log('Fetching repository data for:', repoFullName);
      const repoResponse = await fetch(`https://api.github.com/repos/${repoFullName}`, { headers });
      console.log('Repository response status:', repoResponse.status);
      if (!repoResponse.ok) {
        const errorText = await repoResponse.text();
        console.error('Repository API error:', errorText);
        throw new Error(`Failed to fetch repository: ${repoResponse.status}`);
      }
      const repo = await repoResponse.json();
      console.log('Repository data:', repo);
      setRepoData(repo);

      // Fetch pull requests
      console.log('Fetching pull requests...');
      const prResponse = await fetch(`https://api.github.com/repos/${repoFullName}/pulls?state=all&per_page=100`, { headers });
      console.log('PR response status:', prResponse.status);
      if (prResponse.ok) {
        const prs = await prResponse.json();
        console.log('Pull requests data:', prs);
        setPrData(prs);
      } else {
        const errorText = await prResponse.text();
        console.error('PR API error:', errorText);
      }

      // Fetch issues
      console.log('Fetching issues...');
      const issuesResponse = await fetch(`https://api.github.com/repos/${repoFullName}/issues?state=all&per_page=100`, { headers });
      console.log('Issues response status:', issuesResponse.status);
      if (issuesResponse.ok) {
        const issues = await issuesResponse.json();
        console.log('Issues data:', issues);
        setIssuesData(issues);
      } else {
        const errorText = await issuesResponse.text();
        console.error('Issues API error:', errorText);
      }

      // Fetch contributors
      console.log('Fetching contributors...');
      const contributorsResponse = await fetch(`https://api.github.com/repos/${repoFullName}/contributors`, { headers });
      console.log('Contributors response status:', contributorsResponse.status);
      if (contributorsResponse.ok) {
        const contributors = await contributorsResponse.json();
        console.log('Contributors data:', contributors);
        console.log('Contributors count:', contributors.length);
        console.log('Contributors details:', contributors.map(c => ({
          login: c.login,
          contributions: c.contributions,
          avatar_url: c.avatar_url
        })));
        setContributorsData(contributors);
      } else {
        const errorText = await contributorsResponse.text();
        console.error('Contributors API error:', errorText);
        
        // Fallback: try to get contributors from commits
        console.log('Trying fallback: getting contributors from commits...');
        const commitsResponse = await fetch(`https://api.github.com/repos/${repoFullName}/commits?per_page=100`, { headers });
        if (commitsResponse.ok) {
          const commits = await commitsResponse.json();
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
        }
      }

      // Fetch recent activity (commits) - only if we didn't already fetch them for contributors
      if (!recentActivity) {
        console.log('Fetching recent commits...');
        const commitsResponse = await fetch(`https://api.github.com/repos/${repoFullName}/commits?per_page=10`, { headers });
        console.log('Commits response status:', commitsResponse.status);
        if (commitsResponse.ok) {
          const commits = await commitsResponse.json();
          console.log('Commits data:', commits);
          setRecentActivity(commits);
        } else {
          const errorText = await commitsResponse.text();
          console.error('Commits API error:', errorText);
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
                    <p>{reposWithAccess.length} repositories</p>
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

                  {reposWithAccess.map((repo, index) => (
                    <div key={repo.id} className="table-row">
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
              </div>
            )}
          </div>
        </main>
      </div>
    );
  };

export default Dashboard;

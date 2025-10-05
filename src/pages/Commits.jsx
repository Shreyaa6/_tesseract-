import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import SkeletonLoader from '../components/SkeletonLoader';
import './Commits.css';

const Commits = () => {
  const { user, logout } = useAuth();
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [availableRepos, setAvailableRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [commitBranches, setCommitBranches] = useState({});
  const [loadingBranches, setLoadingBranches] = useState({});
  const [commitPullRequests, setCommitPullRequests] = useState({});
  const [loadingPullRequests, setLoadingPullRequests] = useState({});
  const [detailedCommits, setDetailedCommits] = useState({});
  const [loadingDetailedCommits, setLoadingDetailedCommits] = useState({});
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [showCommitModal, setShowCommitModal] = useState(false);
  const [commitComparison, setCommitComparison] = useState(null);
  const [loadingComparison, setLoadingComparison] = useState(false);
  const [selectedCommitsForComparison, setSelectedCommitsForComparison] = useState([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [commitComments, setCommitComments] = useState({});
  const [loadingComments, setLoadingComments] = useState({});
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedCommitForComments, setSelectedCommitForComments] = useState(null);
  const [showCreateCommentModal, setShowCreateCommentModal] = useState(false);
  const [showEditCommentModal, setShowEditCommentModal] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [newCommentBody, setNewCommentBody] = useState('');
  const [editCommentBody, setEditCommentBody] = useState('');

  useEffect(() => {
    if (user) {
      fetchUserRepositories();
    }
  }, [user]);

  useEffect(() => {
    if (selectedRepo) {
      fetchCommits(selectedRepo, 1);
    }
  }, [selectedRepo]);

  const fetchUserRepositories = async () => {
    try {
      const token = localStorage.getItem('tesseract_token');
      if (!token) return;

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      };

      const reposResponse = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', { headers });
      if (reposResponse.ok) {
        const repos = await reposResponse.json();
        
        const reposWithAccessData = await Promise.all(
          repos.map(async (repo) => {
            try {
              const accessResponse = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/collaborators/${user.login}/permission`, { headers });
              let hasCollaboratorAccess = false;
              
              if (accessResponse.ok) {
                const permission = await accessResponse.json();
                hasCollaboratorAccess = ['admin', 'write'].includes(permission.permission);
              }
              
              return {
                ...repo,
                hasCollaboratorAccess
              };
            } catch (err) {
              return {
                ...repo,
                hasCollaboratorAccess: false
              };
            }
          })
        );
        
        const collaboratorRepos = reposWithAccessData.filter(repo => repo.hasCollaboratorAccess);
        
        const formattedRepos = collaboratorRepos.map(repo => ({
          value: `${repo.owner.login}/${repo.name}`,
          label: `${repo.name}`,
          fullName: repo.full_name,
          owner: repo.owner.login,
          name: repo.name
        }));
        
        setAvailableRepos(formattedRepos);
        
        if (formattedRepos.length > 0 && !selectedRepo) {
          setSelectedRepo(formattedRepos[0].value);
        }
      }
    } catch (err) {
      console.error('Error fetching user repositories:', err);
    }
  };

  const fetchCommitBranches = async (repoFullName, commitSha) => {
    try {
      setLoadingBranches(prev => ({ ...prev, [commitSha]: true }));
      
      const token = localStorage.getItem('tesseract_token');
      if (!token) {
        throw new Error('No GitHub token found');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      };

      const response = await fetch(
        `https://api.github.com/repos/${repoFullName}/commits/${commitSha}/branches-where-head`,
        { headers }
      );

      if (!response.ok) {
        // If the API endpoint is not available, return empty array
        if (response.status === 404) {
          setCommitBranches(prev => ({ ...prev, [commitSha]: [] }));
          return;
        }
        const errorText = await response.text();
        throw new Error(`Failed to fetch branches: ${response.status} - ${errorText}`);
      }

      const branchesData = await response.json();
      setCommitBranches(prev => ({ ...prev, [commitSha]: branchesData }));
      
    } catch (err) {
      console.error('Error fetching commit branches:', err);
      setCommitBranches(prev => ({ ...prev, [commitSha]: [] }));
    } finally {
      setLoadingBranches(prev => ({ ...prev, [commitSha]: false }));
    }
  };

  const fetchCommitPullRequests = async (repoFullName, commitSha) => {
    try {
      setLoadingPullRequests(prev => ({ ...prev, [commitSha]: true }));
      
      const token = localStorage.getItem('tesseract_token');
      if (!token) {
        throw new Error('No GitHub token found');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      };

      const response = await fetch(
        `https://api.github.com/repos/${repoFullName}/commits/${commitSha}/pulls`,
        { headers }
      );

      if (!response.ok) {
        // If the API endpoint is not available, return empty array
        if (response.status === 404) {
          setCommitPullRequests(prev => ({ ...prev, [commitSha]: [] }));
          return;
        }
        const errorText = await response.text();
        throw new Error(`Failed to fetch pull requests: ${response.status} - ${errorText}`);
      }

      const pullRequestsData = await response.json();
      setCommitPullRequests(prev => ({ ...prev, [commitSha]: pullRequestsData }));
      
    } catch (err) {
      console.error('Error fetching commit pull requests:', err);
      setCommitPullRequests(prev => ({ ...prev, [commitSha]: [] }));
    } finally {
      setLoadingPullRequests(prev => ({ ...prev, [commitSha]: false }));
    }
  };

  const fetchDetailedCommit = async (repoFullName, commitSha) => {
    try {
      setLoadingDetailedCommits(prev => ({ ...prev, [commitSha]: true }));
      
      const token = localStorage.getItem('tesseract_token');
      if (!token) {
        throw new Error('No GitHub token found');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      };

      const response = await fetch(
        `https://api.github.com/repos/${repoFullName}/commits/${commitSha}`,
        { headers }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch detailed commit: ${response.status} - ${errorText}`);
      }

      const detailedCommitData = await response.json();
      setDetailedCommits(prev => ({ ...prev, [commitSha]: detailedCommitData }));
      
    } catch (err) {
      console.error('Error fetching detailed commit:', err);
      setDetailedCommits(prev => ({ ...prev, [commitSha]: null }));
    } finally {
      setLoadingDetailedCommits(prev => ({ ...prev, [commitSha]: false }));
    }
  };

  const fetchCommitComparison = async (repoFullName, baseCommit, headCommit) => {
    try {
      setLoadingComparison(true);
      
      const token = localStorage.getItem('tesseract_token');
      if (!token) {
        throw new Error('No GitHub token found');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      };

      const basehead = `${baseCommit}...${headCommit}`;
      const response = await fetch(
        `https://api.github.com/repos/${repoFullName}/compare/${basehead}`,
        { headers }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch commit comparison: ${response.status} - ${errorText}`);
      }

      const comparisonData = await response.json();
      setCommitComparison(comparisonData);
      
    } catch (err) {
      console.error('Error fetching commit comparison:', err);
      setCommitComparison(null);
    } finally {
      setLoadingComparison(false);
    }
  };

  const fetchCommitComments = async (repoFullName, commitSha) => {
    try {
      setLoadingComments(prev => ({ ...prev, [commitSha]: true }));
      
      const token = localStorage.getItem('tesseract_token');
      if (!token) {
        throw new Error('No GitHub token found');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      };

      const response = await fetch(
        `https://api.github.com/repos/${repoFullName}/commits/${commitSha}/comments`,
        { headers }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch commit comments: ${response.status} - ${errorText}`);
      }

      const commentsData = await response.json();
      setCommitComments(prev => ({ ...prev, [commitSha]: commentsData }));
      
    } catch (err) {
      console.error('Error fetching commit comments:', err);
      setCommitComments(prev => ({ ...prev, [commitSha]: [] }));
    } finally {
      setLoadingComments(prev => ({ ...prev, [commitSha]: false }));
    }
  };

  const createCommitComment = async (repoFullName, commitSha, body, path = null, position = null) => {
    try {
      const token = localStorage.getItem('tesseract_token');
      if (!token) {
        throw new Error('No GitHub token found');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json'
      };

      const commentData = { body };
      if (path) commentData.path = path;
      if (position !== null) commentData.position = position;

      const response = await fetch(
        `https://api.github.com/repos/${repoFullName}/commits/${commitSha}/comments`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(commentData)
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create commit comment: ${response.status} - ${errorText}`);
      }

      const newComment = await response.json();
      
      // Refresh comments for this commit
      await fetchCommitComments(repoFullName, commitSha);
      
      return newComment;
      
    } catch (err) {
      console.error('Error creating commit comment:', err);
      throw err;
    }
  };

  const updateCommitComment = async (repoFullName, commentId, body) => {
    try {
      const token = localStorage.getItem('tesseract_token');
      if (!token) {
        throw new Error('No GitHub token found');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json'
      };

      const response = await fetch(
        `https://api.github.com/repos/${repoFullName}/comments/${commentId}`,
        {
          method: 'PATCH',
          headers,
          body: JSON.stringify({ body })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update commit comment: ${response.status} - ${errorText}`);
      }

      const updatedComment = await response.json();
      
      // Refresh comments for the commit
      const commitSha = Object.keys(commitComments).find(sha => 
        commitComments[sha].some(comment => comment.id === commentId)
      );
      if (commitSha) {
        await fetchCommitComments(repoFullName, commitSha);
      }
      
      return updatedComment;
      
    } catch (err) {
      console.error('Error updating commit comment:', err);
      throw err;
    }
  };

  const deleteCommitComment = async (repoFullName, commentId) => {
    try {
      const token = localStorage.getItem('tesseract_token');
      if (!token) {
        throw new Error('No GitHub token found');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      };

      const response = await fetch(
        `https://api.github.com/repos/${repoFullName}/comments/${commentId}`,
        {
          method: 'DELETE',
          headers
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete commit comment: ${response.status} - ${errorText}`);
      }

      // Refresh comments for the commit
      const commitSha = Object.keys(commitComments).find(sha => 
        commitComments[sha].some(comment => comment.id === commentId)
      );
      if (commitSha) {
        await fetchCommitComments(repoFullName, commitSha);
      }
      
    } catch (err) {
      console.error('Error deleting commit comment:', err);
      throw err;
    }
  };

  const fetchCommits = async (repoFullName, pageNum = 1, append = false) => {
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

      const response = await fetch(
        `https://api.github.com/repos/${repoFullName}/commits?page=${pageNum}&per_page=30`,
        { headers }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch commits: ${response.status} - ${errorText}`);
      }

      const commitsData = await response.json();
      
      if (append) {
        setCommits(prev => [...prev, ...commitsData]);
      } else {
        setCommits(commitsData);
      }
      
      setHasMore(commitsData.length === 30);
      
      // Fetch branches and pull requests for the first 5 commits automatically
      commitsData.slice(0, 5).forEach(commit => {
        fetchCommitBranches(repoFullName, commit.sha);
        fetchCommitPullRequests(repoFullName, commit.sha);
      });
      
    } catch (err) {
      console.error('Error fetching commits:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreCommits = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCommits(selectedRepo, nextPage, true);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const getCommitStatus = (commit) => {
    if (commit.stats) {
      const { additions, deletions } = commit.stats;
      if (additions > deletions) return 'added';
      if (deletions > additions) return 'removed';
      return 'modified';
    }
    return 'modified';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'added': return '#22c55e';
      case 'removed': return '#ef4444';
      case 'modified': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const handleBranchClick = (commitSha) => {
    if (!commitBranches[commitSha] && !loadingBranches[commitSha]) {
      fetchCommitBranches(selectedRepo, commitSha);
    }
  };

  const handlePullRequestClick = (commitSha) => {
    if (!commitPullRequests[commitSha] && !loadingPullRequests[commitSha]) {
      fetchCommitPullRequests(selectedRepo, commitSha);
    }
  };

  const handleDetailedCommitClick = (commitSha) => {
    if (!detailedCommits[commitSha] && !loadingDetailedCommits[commitSha]) {
      fetchDetailedCommit(selectedRepo, commitSha);
    }
    setSelectedCommit(commitSha);
    setShowCommitModal(true);
  };

  const closeCommitModal = () => {
    setShowCommitModal(false);
    setSelectedCommit(null);
  };

  const handleCompareCommits = (commitSha) => {
    if (selectedCommitsForComparison.length === 0) {
      setSelectedCommitsForComparison([commitSha]);
    } else if (selectedCommitsForComparison.length === 1) {
      if (selectedCommitsForComparison[0] === commitSha) {
        setSelectedCommitsForComparison([]);
      } else {
        setSelectedCommitsForComparison([selectedCommitsForComparison[0], commitSha]);
        // Automatically fetch comparison when two commits are selected
        fetchCommitComparison(selectedRepo, selectedCommitsForComparison[0], commitSha);
        setShowComparisonModal(true);
      }
    } else {
      setSelectedCommitsForComparison([commitSha]);
    }
  };

  const closeComparisonModal = () => {
    setShowComparisonModal(false);
    setCommitComparison(null);
    setSelectedCommitsForComparison([]);
  };

  const isCommitSelected = (commitSha) => {
    return selectedCommitsForComparison.includes(commitSha);
  };

  const handleCommentsClick = (commitSha) => {
    if (!commitComments[commitSha] && !loadingComments[commitSha]) {
      fetchCommitComments(selectedRepo, commitSha);
    }
    setSelectedCommitForComments(commitSha);
    setShowCommentsModal(true);
  };

  const closeCommentsModal = () => {
    setShowCommentsModal(false);
    setSelectedCommitForComments(null);
  };

  const handleCreateComment = async () => {
    if (!newCommentBody.trim()) return;
    
    try {
      await createCommitComment(selectedRepo, selectedCommitForComments, newCommentBody);
      setNewCommentBody('');
      setShowCreateCommentModal(false);
    } catch (err) {
      console.error('Error creating comment:', err);
      alert('Failed to create comment. Please try again.');
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setEditCommentBody(comment.body);
    setShowEditCommentModal(true);
  };

  const handleUpdateComment = async () => {
    if (!editCommentBody.trim() || !editingComment) return;
    
    try {
      await updateCommitComment(selectedRepo, editingComment.id, editCommentBody);
      setEditCommentBody('');
      setEditingComment(null);
      setShowEditCommentModal(false);
    } catch (err) {
      console.error('Error updating comment:', err);
      alert('Failed to update comment. Please try again.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      await deleteCommitComment(selectedRepo, commentId);
    } catch (err) {
      console.error('Error deleting comment:', err);
      alert('Failed to delete comment. Please try again.');
    }
  };

  const canEditComment = (comment) => {
    return user && user.login === comment.user.login;
  };

  return (
    <div className="commits-container">
      <nav className="commits-nav">
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

      <main className="commits-main">
        <div className="commits-content">
          <div className="commits-header">
            <div className="header-left">
              <h1>Commits</h1>
              <p>View commit history and changes</p>
            </div>
            
            <div className="header-right">
              <select 
                value={selectedRepo} 
                onChange={(e) => {
                  setSelectedRepo(e.target.value);
                  setPage(1);
                  setCommits([]);
                }}
                className="repo-selector"
              >
                {availableRepos.map(repo => (
                  <option key={repo.value} value={repo.value}>
                    {repo.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <p>Error: {error}</p>
              <button onClick={() => fetchCommits(selectedRepo)} className="retry-btn">
                Retry
              </button>
            </div>
          )}

          {loading && commits.length === 0 ? (
            <SkeletonLoader />
          ) : (
            <div className="commits-list">
              {commits.map((commit, index) => (
                <div key={commit.sha} className="commit-item">
                  <div className="commit-header">
                    <div className="commit-info">
                      <div className="commit-message">
                        {commit.commit.message.split('\n')[0]}
                      </div>
                      <div className="commit-meta">
                        <span className="commit-author">
                          {commit.author ? (
                            <>
                              <img 
                                src={commit.author.avatar_url} 
                                alt={commit.author.login}
                                className="author-avatar"
                                onError={(e) => {
                                  e.target.src = `https://ui-avatars.com/api/?name=${commit.author.login}&background=667eea&color=fff&size=20`;
                                }}
                              />
                              <span>{commit.author.login}</span>
                            </>
                          ) : (
                            <span>{commit.commit.author.name}</span>
                          )}
                        </span>
                        <span className="commit-date">
                          {formatDate(commit.commit.author.date)}
                        </span>
                        <span className="commit-sha">
                          {commit.sha.substring(0, 7)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="commit-actions">
                      <button 
                        className="branches-btn"
                        onClick={() => handleBranchClick(commit.sha)}
                        disabled={loadingBranches[commit.sha]}
                      >
                        {loadingBranches[commit.sha] ? (
                          <div className="loading-spinner-small"></div>
                        ) : (
                          <>
                            <span>Branches</span>
                            {commitBranches[commit.sha] && (
                              <span className="branch-count">({commitBranches[commit.sha].length})</span>
                            )}
                          </>
                        )}
                      </button>
                      <button 
                        className="pull-requests-btn"
                        onClick={() => handlePullRequestClick(commit.sha)}
                        disabled={loadingPullRequests[commit.sha]}
                      >
                        {loadingPullRequests[commit.sha] ? (
                          <div className="loading-spinner-small"></div>
                        ) : (
                          <>
                            <span>Pull Requests</span>
                            {commitPullRequests[commit.sha] && (
                              <span className="pr-count">({commitPullRequests[commit.sha].length})</span>
                            )}
                          </>
                        )}
                      </button>
                      <button 
                        className="details-btn"
                        onClick={() => handleDetailedCommitClick(commit.sha)}
                        disabled={loadingDetailedCommits[commit.sha]}
                      >
                        {loadingDetailedCommits[commit.sha] ? (
                          <div className="loading-spinner-small"></div>
                        ) : (
                          <span>View Details</span>
                        )}
                      </button>
                      <button 
                        className={`compare-btn ${isCommitSelected(commit.sha) ? 'selected' : ''}`}
                        onClick={() => handleCompareCommits(commit.sha)}
                      >
                        <span>{isCommitSelected(commit.sha) ? 'Selected' : 'Compare'}</span>
                      </button>
                      <button 
                        className="comments-btn"
                        onClick={() => handleCommentsClick(commit.sha)}
                        disabled={loadingComments[commit.sha]}
                      >
                        {loadingComments[commit.sha] ? (
                          <div className="loading-spinner-small"></div>
                        ) : (
                          <>
                            <span>Comments</span>
                            {commitComments[commit.sha] && (
                              <span className="comment-count">({commitComments[commit.sha].length})</span>
                            )}
                          </>
                        )}
                      </button>
                      <a 
                        href={commit.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="commit-link"
                      >
                        View on GitHub
                      </a>
                    </div>
                  </div>

                  {commit.stats && (
                    <div className="commit-stats">
                      <div className="stats-item">
                        <span className="stat-label">Changes:</span>
                        <span className="stat-value">{commit.stats.total}</span>
                      </div>
                      <div className="stats-item">
                        <span className="stat-label additions">+{commit.stats.additions}</span>
                        <span className="stat-label deletions">-{commit.stats.deletions}</span>
                      </div>
                    </div>
                  )}

                  {commitBranches[commit.sha] && commitBranches[commit.sha].length > 0 && (
                    <div className="commit-branches">
                      <div className="branches-header">
                        <span>Branches containing this commit ({commitBranches[commit.sha].length})</span>
                      </div>
                      <div className="branches-list">
                        {commitBranches[commit.sha].map((branch, branchIndex) => (
                          <div key={branchIndex} className="branch-item">
                            <div className="branch-info">
                              <span className={`branch-name ${branch.protected ? 'protected' : ''}`}>
                                {branch.name}
                              </span>
                              {branch.protected && (
                                <span className="protected-badge">Protected</span>
                              )}
                            </div>
                            <div className="branch-commit">
                              <span className="branch-sha">{branch.commit.sha.substring(0, 7)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {commitPullRequests[commit.sha] && commitPullRequests[commit.sha].length > 0 && (
                    <div className="commit-pull-requests">
                      <div className="pull-requests-header">
                        <span>Pull requests containing this commit ({commitPullRequests[commit.sha].length})</span>
                      </div>
                      <div className="pull-requests-list">
                        {commitPullRequests[commit.sha].map((pr, prIndex) => (
                          <div key={prIndex} className="pull-request-item">
                            <div className="pr-info">
                              <div className="pr-title">
                                <a 
                                  href={pr.html_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="pr-link"
                                >
                                  #{pr.number} {pr.title}
                                </a>
                              </div>
                              <div className="pr-meta">
                                <span className={`pr-state ${pr.state}`}>
                                  {pr.state}
                                </span>
                                <span className="pr-author">
                                  by {pr.user?.login || 'Unknown'}
                                </span>
                                <span className="pr-date">
                                  {formatDate(pr.created_at)}
                                </span>
                              </div>
                            </div>
                            <div className="pr-actions">
                              <a 
                                href={pr.html_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="pr-view-btn"
                              >
                                View PR
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {commit.files && commit.files.length > 0 && (
                    <div className="commit-files">
                      <div className="files-header">
                        <span>Files changed ({commit.files.length})</span>
                      </div>
                      <div className="files-list">
                        {commit.files.slice(0, 5).map((file, fileIndex) => (
                          <div key={fileIndex} className="file-item">
                            <div className="file-info">
                              <span 
                                className="file-status"
                                style={{ color: getStatusColor(file.status) }}
                              >
                                {file.status}
                              </span>
                              <span className="file-name">{file.filename}</span>
                            </div>
                            <div className="file-changes">
                              <span className="file-additions">+{file.additions}</span>
                              <span className="file-deletions">-{file.deletions}</span>
                            </div>
                          </div>
                        ))}
                        {commit.files.length > 5 && (
                          <div className="more-files">
                            +{commit.files.length - 5} more files
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {hasMore && !loading && (
                <div className="load-more-container">
                  <button 
                    onClick={loadMoreCommits}
                    className="load-more-btn"
                    disabled={loading}
                  >
                    Load More Commits
                  </button>
                </div>
              )}

              {loading && commits.length > 0 && (
                <div className="loading-more">
                  <div className="loading-spinner"></div>
                  <span>Loading more commits...</span>
                </div>
              )}

              {commits.length === 0 && !loading && !error && (
                <div className="no-commits">
                  <p>No commits found for this repository.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Commit Detail Modal */}
      {showCommitModal && selectedCommit && (
        <div className="commit-modal-overlay" onClick={closeCommitModal}>
          <div className="commit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Commit Details</h2>
              <button className="modal-close" onClick={closeCommitModal}>×</button>
            </div>
            <div className="modal-content">
              {loadingDetailedCommits[selectedCommit] ? (
                <div className="modal-loading">
                  <div className="loading-spinner"></div>
                  <span>Loading commit details...</span>
                </div>
              ) : detailedCommits[selectedCommit] ? (
                <div className="detailed-commit-info">
                  <div className="commit-header-detail">
                    <div className="commit-message-detail">
                      {detailedCommits[selectedCommit].commit.message}
                    </div>
                    <div className="commit-sha-detail">
                      {detailedCommits[selectedCommit].sha}
                    </div>
                  </div>
                  <div className="commit-meta-detail">
                    <div className="author-info">
                      <h3>Author</h3>
                      {detailedCommits[selectedCommit].author ? (
                        <div className="author-details">
                          <img 
                            src={detailedCommits[selectedCommit].author.avatar_url} 
                            alt={detailedCommits[selectedCommit].author.login}
                            className="author-avatar-large"
                          />
                          <div className="author-text">
                            <div className="author-name">{detailedCommits[selectedCommit].author.login}</div>
                            <div className="author-email">{detailedCommits[selectedCommit].commit.author.email}</div>
                            <div className="author-date">{formatDate(detailedCommits[selectedCommit].commit.author.date)}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="author-details">
                          <div className="author-text">
                            <div className="author-name">{detailedCommits[selectedCommit].commit.author.name}</div>
                            <div className="author-email">{detailedCommits[selectedCommit].commit.author.email}</div>
                            <div className="author-date">{formatDate(detailedCommits[selectedCommit].commit.author.date)}</div>
                          </div>
                        </div>
                      )}
                    </div>
                    {detailedCommits[selectedCommit].parents && detailedCommits[selectedCommit].parents.length > 0 && (
                      <div className="parents-info">
                        <h3>Parent Commits</h3>
                        <div className="parents-list">
                          {detailedCommits[selectedCommit].parents.map((parent, index) => (
                            <div key={index} className="parent-commit">
                              <a href={parent.html_url} target="_blank" rel="noopener noreferrer" className="parent-link">
                                {parent.sha.substring(0, 7)}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {detailedCommits[selectedCommit].commit.verification && (
                      <div className="verification-info">
                        <h3>Verification</h3>
                        <div className={`verification-status ${detailedCommits[selectedCommit].commit.verification.verified ? 'verified' : 'unverified'}`}>
                          <span className="verification-icon">
                            {detailedCommits[selectedCommit].commit.verification.verified ? '✓' : '✗'}
                          </span>
                          <span className="verification-text">
                            {detailedCommits[selectedCommit].commit.verification.verified ? 'Verified' : 'Unverified'}
                          </span>
                          <span className="verification-reason">
                            {detailedCommits[selectedCommit].commit.verification.reason}
                          </span>
                        </div>
                      </div>
                    )}
                    {detailedCommits[selectedCommit].files && detailedCommits[selectedCommit].files.length > 0 && (
                      <div className="files-detail">
                        <h3>Files Changed ({detailedCommits[selectedCommit].files.length})</h3>
                        <div className="files-detail-list">
                          {detailedCommits[selectedCommit].files.map((file, fileIndex) => (
                            <div key={fileIndex} className="file-detail-item">
                              <div className="file-detail-info">
                                <span className="file-detail-status" style={{ color: getStatusColor(file.status) }}>
                                  {file.status}
                                </span>
                                <span className="file-detail-name">{file.filename}</span>
                                {file.previous_filename && (
                                  <span className="file-rename">→ {file.previous_filename}</span>
                                )}
                              </div>
                              <div className="file-detail-changes">
                                <span className="file-detail-additions">+{file.additions}</span>
                                <span className="file-detail-deletions">-{file.deletions}</span>
                                <span className="file-detail-total">{file.changes} changes</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="modal-error">
                  <p>Failed to load commit details.</p>
                  <button onClick={() => fetchDetailedCommit(selectedRepo, selectedCommit)} className="retry-btn">
                    Retry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Commit Comparison Modal */}
      {showComparisonModal && (
        <div className="comparison-modal-overlay" onClick={closeComparisonModal}>
          <div className="comparison-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Commit Comparison</h2>
              <button className="modal-close" onClick={closeComparisonModal}>×</button>
            </div>
            <div className="modal-content">
              {loadingComparison ? (
                <div className="modal-loading">
                  <div className="loading-spinner"></div>
                  <span>Loading comparison...</span>
                </div>
              ) : commitComparison ? (
                <div className="comparison-info">
                  <div className="comparison-header">
                    <div className="comparison-title">
                      <h3>Comparing Commits</h3>
                      <div className="comparison-range">
                        <span className="base-commit">{selectedCommitsForComparison[0]?.substring(0, 7)}</span>
                        <span className="comparison-arrow">→</span>
                        <span className="head-commit">{selectedCommitsForComparison[1]?.substring(0, 7)}</span>
                      </div>
                    </div>
                    <div className="comparison-stats">
                      <div className="stat-item">
                        <span className="stat-label">Status:</span>
                        <span className={`stat-value status-${commitComparison.status}`}>
                          {commitComparison.status}
                        </span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Commits:</span>
                        <span className="stat-value">{commitComparison.total_commits}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Ahead by:</span>
                        <span className="stat-value">{commitComparison.ahead_by}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Behind by:</span>
                        <span className="stat-value">{commitComparison.behind_by}</span>
                      </div>
                    </div>
                  </div>

                  {commitComparison.files && commitComparison.files.length > 0 && (
                    <div className="comparison-files">
                      <h3>Files Changed ({commitComparison.files.length})</h3>
                      <div className="comparison-files-list">
                        {commitComparison.files.map((file, fileIndex) => (
                          <div key={fileIndex} className="comparison-file-item">
                            <div className="file-info">
                              <span className="file-status" style={{ color: getStatusColor(file.status) }}>
                                {file.status}
                              </span>
                              <span className="file-name">{file.filename}</span>
                              {file.previous_filename && (
                                <span className="file-rename">→ {file.previous_filename}</span>
                              )}
                            </div>
                            <div className="file-changes">
                              <span className="file-additions">+{file.additions}</span>
                              <span className="file-deletions">-{file.deletions}</span>
                              <span className="file-total">{file.changes} changes</span>
                            </div>
                            {file.patch && (
                              <div className="file-patch">
                                <pre>{file.patch}</pre>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {commitComparison.commits && commitComparison.commits.length > 0 && (
                    <div className="comparison-commits">
                      <h3>Commits in Range ({commitComparison.commits.length})</h3>
                      <div className="comparison-commits-list">
                        {commitComparison.commits.map((commit, commitIndex) => (
                          <div key={commitIndex} className="comparison-commit-item">
                            <div className="commit-info">
                              <div className="commit-message">
                                {commit.commit.message.split('\n')[0]}
                              </div>
                              <div className="commit-meta">
                                <span className="commit-author">
                                  {commit.author ? (
                                    <>
                                      <img 
                                        src={commit.author.avatar_url} 
                                        alt={commit.author.login}
                                        className="author-avatar"
                                        onError={(e) => {
                                          e.target.src = `https://ui-avatars.com/api/?name=${commit.author.login}&background=667eea&color=fff&size=20`;
                                        }}
                                      />
                                      <span>{commit.author.login}</span>
                                    </>
                                  ) : (
                                    <span>{commit.commit.author.name}</span>
                                  )}
                                </span>
                                <span className="commit-date">
                                  {formatDate(commit.commit.author.date)}
                                </span>
                                <span className="commit-sha">
                                  {commit.sha.substring(0, 7)}
                                </span>
                              </div>
                            </div>
                            <div className="commit-actions">
                              <a 
                                href={commit.html_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="commit-link"
                              >
                                View on GitHub
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="comparison-links">
                    <a 
                      href={commitComparison.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="comparison-link"
                    >
                      View on GitHub
                    </a>
                    <a 
                      href={commitComparison.diff_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="comparison-link"
                    >
                      View Diff
                    </a>
                    <a 
                      href={commitComparison.patch_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="comparison-link"
                    >
                      View Patch
                    </a>
                  </div>
                </div>
              ) : (
                <div className="modal-error">
                  <p>Failed to load commit comparison.</p>
                  <button onClick={() => fetchCommitComparison(selectedRepo, selectedCommitsForComparison[0], selectedCommitsForComparison[1])} className="retry-btn">
                    Retry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Commit Comments Modal */}
      {showCommentsModal && selectedCommitForComments && (
        <div className="comments-modal-overlay" onClick={closeCommentsModal}>
          <div className="comments-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Commit Comments</h2>
              <button className="modal-close" onClick={closeCommentsModal}>×</button>
            </div>
            <div className="modal-content">
              <div className="comments-header">
                <div className="commit-info-header">
                  <h3>Commit: {selectedCommitForComments.substring(0, 7)}</h3>
                  <button 
                    className="add-comment-btn"
                    onClick={() => setShowCreateCommentModal(true)}
                  >
                    Add Comment
                  </button>
                </div>
              </div>

              {loadingComments[selectedCommitForComments] ? (
                <div className="modal-loading">
                  <div className="loading-spinner"></div>
                  <span>Loading comments...</span>
                </div>
              ) : (
                <div className="comments-list">
                  {commitComments[selectedCommitForComments] && commitComments[selectedCommitForComments].length > 0 ? (
                    commitComments[selectedCommitForComments].map((comment, index) => (
                      <div key={comment.id} className="comment-item">
                        <div className="comment-header">
                          <div className="comment-author">
                            <img 
                              src={comment.user.avatar_url} 
                              alt={comment.user.login}
                              className="comment-avatar"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${comment.user.login}&background=667eea&color=fff&size=32`;
                              }}
                            />
                            <div className="comment-author-info">
                              <span className="comment-author-name">{comment.user.login}</span>
                              <span className="comment-date">{formatDate(comment.created_at)}</span>
                            </div>
                          </div>
                          <div className="comment-actions">
                            {canEditComment(comment) && (
                              <>
                                <button 
                                  className="edit-comment-btn"
                                  onClick={() => handleEditComment(comment)}
                                >
                                  Edit
                                </button>
                                <button 
                                  className="delete-comment-btn"
                                  onClick={() => handleDeleteComment(comment.id)}
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="comment-body">
                          {comment.body}
                        </div>
                        {comment.path && (
                          <div className="comment-path">
                            <span className="path-label">File:</span>
                            <span className="path-value">{comment.path}</span>
                          </div>
                        )}
                        {comment.position !== null && (
                          <div className="comment-position">
                            <span className="position-label">Line:</span>
                            <span className="position-value">{comment.position}</span>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="no-comments">
                      <p>No comments yet. Be the first to comment!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Comment Modal */}
      {showCreateCommentModal && (
        <div className="create-comment-modal-overlay" onClick={() => setShowCreateCommentModal(false)}>
          <div className="create-comment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Comment</h2>
              <button className="modal-close" onClick={() => setShowCreateCommentModal(false)}>×</button>
            </div>
            <div className="modal-content">
              <div className="comment-form">
                <textarea
                  value={newCommentBody}
                  onChange={(e) => setNewCommentBody(e.target.value)}
                  placeholder="Write your comment here..."
                  className="comment-textarea"
                  rows={6}
                />
                <div className="comment-form-actions">
                  <button 
                    className="cancel-btn"
                    onClick={() => {
                      setShowCreateCommentModal(false);
                      setNewCommentBody('');
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    className="submit-btn"
                    onClick={handleCreateComment}
                    disabled={!newCommentBody.trim()}
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Comment Modal */}
      {showEditCommentModal && editingComment && (
        <div className="edit-comment-modal-overlay" onClick={() => setShowEditCommentModal(false)}>
          <div className="edit-comment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Comment</h2>
              <button className="modal-close" onClick={() => setShowEditCommentModal(false)}>×</button>
            </div>
            <div className="modal-content">
              <div className="comment-form">
                <textarea
                  value={editCommentBody}
                  onChange={(e) => setEditCommentBody(e.target.value)}
                  placeholder="Write your comment here..."
                  className="comment-textarea"
                  rows={6}
                />
                <div className="comment-form-actions">
                  <button 
                    className="cancel-btn"
                    onClick={() => {
                      setShowEditCommentModal(false);
                      setEditCommentBody('');
                      setEditingComment(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    className="submit-btn"
                    onClick={handleUpdateComment}
                    disabled={!editCommentBody.trim()}
                  >
                    Update Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Commits;

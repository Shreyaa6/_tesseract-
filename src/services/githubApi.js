// GitHub API service that proxies requests through our server
const SERVER_BASE_URL = 'https://server-tesserect-qdey.vercel.app';

class GitHubApiService {
  constructor() {
    this.baseUrl = SERVER_BASE_URL;
  }

  // Helper method to get headers with token
  getHeaders(token) {
    return {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    };
  }

  // Get user repositories
  async getUserRepositories(token, params = {}) {
    const queryParams = new URLSearchParams({
      sort: 'updated',
      per_page: '100',
      ...params
    });

    const response = await fetch(`${this.baseUrl}/api/github/user/repos?${queryParams}`, {
      headers: this.getHeaders(token)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.status}`);
    }

    return response.json();
  }

  // Get repository details
  async getRepository(token, owner, repo) {
    const response = await fetch(`${this.baseUrl}/api/github/repos/${owner}/${repo}`, {
      headers: this.getHeaders(token)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch repository: ${response.status}`);
    }

    return response.json();
  }

  // Get repository pull requests
  async getPullRequests(token, owner, repo, params = {}) {
    const queryParams = new URLSearchParams({
      state: 'all',
      per_page: '20',
      ...params
    });

    const response = await fetch(`${this.baseUrl}/api/github/repos/${owner}/${repo}/pulls?${queryParams}`, {
      headers: this.getHeaders(token)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch pull requests: ${response.status}`);
    }

    return response.json();
  }

  // Get repository issues
  async getIssues(token, owner, repo, params = {}) {
    const queryParams = new URLSearchParams({
      state: 'all',
      per_page: '20',
      ...params
    });

    const response = await fetch(`${this.baseUrl}/api/github/repos/${owner}/${repo}/issues?${queryParams}`, {
      headers: this.getHeaders(token)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch issues: ${response.status}`);
    }

    return response.json();
  }

  // Get repository contributors
  async getContributors(token, owner, repo, params = {}) {
    const queryParams = new URLSearchParams({
      per_page: '10',
      ...params
    });

    const response = await fetch(`${this.baseUrl}/api/github/repos/${owner}/${repo}/contributors?${queryParams}`, {
      headers: this.getHeaders(token)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch contributors: ${response.status}`);
    }

    return response.json();
  }

  // Get repository commits
  async getCommits(token, owner, repo, params = {}) {
    const queryParams = new URLSearchParams({
      per_page: '20',
      ...params
    });

    const response = await fetch(`${this.baseUrl}/api/github/repos/${owner}/${repo}/commits?${queryParams}`, {
      headers: this.getHeaders(token)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch commits: ${response.status}`);
    }

    return response.json();
  }

  // Get repository languages
  async getLanguages(token, owner, repo) {
    const response = await fetch(`${this.baseUrl}/api/github/repos/${owner}/${repo}/languages`, {
      headers: this.getHeaders(token)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch languages: ${response.status}`);
    }

    return response.json();
  }

  // Get repository releases
  async getReleases(token, owner, repo, params = {}) {
    const queryParams = new URLSearchParams({
      per_page: '10',
      ...params
    });

    const response = await fetch(`${this.baseUrl}/api/github/repos/${owner}/${repo}/releases?${queryParams}`, {
      headers: this.getHeaders(token)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch releases: ${response.status}`);
    }

    return response.json();
  }

  // Get commit activity stats
  async getCommitActivity(token, owner, repo) {
    const response = await fetch(`${this.baseUrl}/api/github/repos/${owner}/${repo}/stats/commit_activity`, {
      headers: this.getHeaders(token)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch commit activity: ${response.status}`);
    }

    return response.json();
  }

  // Get user info
  async getUser(token) {
    const response = await fetch(`${this.baseUrl}/api/github/user`, {
      headers: this.getHeaders(token)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.status}`);
    }

    return response.json();
  }

  // Check collaborator permission
  async getCollaboratorPermission(token, owner, repo, username) {
    const response = await fetch(`${this.baseUrl}/api/github/repos/${owner}/${repo}/collaborators/${username}/permission`, {
      headers: this.getHeaders(token)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch collaborator permission: ${response.status}`);
    }

    return response.json();
  }

  // Get specific commit details
  async getCommit(token, owner, repo, sha) {
    const response = await fetch(`${this.baseUrl}/api/github/repos/${owner}/${repo}/commits/${sha}`, {
      headers: this.getHeaders(token)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch commit: ${response.status}`);
    }

    return response.json();
  }

  // Get commit comparison
  async getCommitComparison(token, owner, repo, base, head) {
    const response = await fetch(`${this.baseUrl}/api/github/repos/${owner}/${repo}/compare/${base}...${head}`, {
      headers: this.getHeaders(token)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch commit comparison: ${response.status}`);
    }

    return response.json();
  }

  // Get commit comments
  async getCommitComments(token, owner, repo, sha) {
    const response = await fetch(`${this.baseUrl}/api/github/repos/${owner}/${repo}/commits/${sha}/comments`, {
      headers: this.getHeaders(token)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch commit comments: ${response.status}`);
    }

    return response.json();
  }

  // Get repository branches
  async getBranches(token, owner, repo) {
    const response = await fetch(`${this.baseUrl}/api/github/repos/${owner}/${repo}/branches`, {
      headers: this.getHeaders(token)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch branches: ${response.status}`);
    }

    return response.json();
  }
}

// Create and export a singleton instance
const githubApi = new GitHubApiService();
export default githubApi;

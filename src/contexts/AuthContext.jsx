import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMaintainer, setIsMaintainer] = useState(false);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('tesseract_user');
    const storedToken = localStorage.getItem('tesseract_token');
    
    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        checkMaintainerStatus(userData.login, storedToken);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('tesseract_user');
        localStorage.removeItem('tesseract_token');
      }
    }
    setLoading(false);
  }, []);

  const checkMaintainerStatus = async (username, token) => {
    try {
      // Check if user has ADMIN or MAINTAIN permission on the repository
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query($owner: String!, $repo: String!, $username: String!) {
              repository(owner: $owner, name: $repo) {
                collaborators(query: $username, first: 1) {
                  edges {
                    node {
                      login
                      repositoryPermissions {
                        admin
                        maintain
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: {
            owner: 'Shreyaa6', // Your GitHub username
            repo: '_tesseract-', // Your repository name
            username: username
          }
        })
      });

      const data = await response.json();
      
      if (data.data?.repository?.collaborators?.edges?.length > 0) {
        const collaborator = data.data.repository.collaborators.edges[0].node;
        const hasAdminOrMaintain = collaborator.repositoryPermissions.admin || 
                                 collaborator.repositoryPermissions.maintain;
        setIsMaintainer(hasAdminOrMaintain);
      } else {
        setIsMaintainer(false);
      }
    } catch (error) {
      console.error('Error checking maintainer status:', error);
      setIsMaintainer(false);
    }
  };

  const login = async (code) => {
    try {
      setLoading(true);
      
      console.log('=== AuthContext Login ===');
      console.log('Exchanging code for token:', code);
      
      // Exchange code for access token
      const tokenResponse = await fetch('http://localhost:3001/api/auth/github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      console.log('Token response status:', tokenResponse.status);
      console.log('Token response ok:', tokenResponse.ok);

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        console.error('Token exchange failed:', errorData);
        throw new Error(`Failed to exchange code for token: ${errorData.error || 'Unknown error'}`);
      }

      const tokenData = await tokenResponse.json();
      console.log('Token data received:', tokenData);
      
      const { access_token } = tokenData;

      // Get user info from GitHub
      console.log('Fetching user info with token:', access_token ? '***' + access_token.slice(-4) : 'NO TOKEN');
      
      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      });

      console.log('User response status:', userResponse.status);
      console.log('User response ok:', userResponse.ok);

      if (!userResponse.ok) {
        const errorData = await userResponse.text();
        console.error('User fetch failed:', errorData);
        throw new Error('Failed to fetch user info');
      }

      const userData = await userResponse.json();
      console.log('User data received:', userData);

      // Store user data and token
      localStorage.setItem('tesseract_user', JSON.stringify(userData));
      localStorage.setItem('tesseract_token', access_token);

      setUser(userData);
      await checkMaintainerStatus(userData.login, access_token);
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('tesseract_user');
    localStorage.removeItem('tesseract_token');
    setUser(null);
    setIsMaintainer(false);
  };

  const value = {
    user,
    loading,
    isMaintainer,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

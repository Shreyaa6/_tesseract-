import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const processedCodeRef = useRef(null);

  useEffect(() => {
    // Check if we have a code in the URL (OAuth callback)
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code && processedCodeRef.current !== code) {
      console.log('OAuth callback received, code:', code);
      processedCodeRef.current = code; // Mark as processed
      
      // Check if we're in a popup window
      if (window.opener) {
        console.log('In popup window, processing OAuth callback');
        handleGitHubCallback(code);
      } else {
        // Regular page redirect
        handleGitHubCallback(code);
      }
    }
  }, []);

  const handleGitHubCallback = async (code) => {
    try {
      console.log('Processing OAuth callback with code:', code);
      await login(code);
      
      // Check if we're in a popup window
      if (window.opener) {
        console.log('OAuth successful in popup, notifying parent window');
        // Notify the parent window that OAuth was successful
        window.opener.postMessage({ type: 'OAUTH_SUCCESS' }, window.location.origin);
        // Close the popup
        window.close();
      } else {
        console.log('OAuth successful, redirecting to dashboard');
        // Redirect to dashboard - ProtectedRoute will handle maintainer check
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      
      if (window.opener) {
        // Notify parent window of failure
        window.opener.postMessage({ type: 'OAUTH_ERROR', error: error.message }, window.location.origin);
        window.close();
      } else {
        alert('Authentication failed. Please try again.');
      }
    }
  };

  const handleGitHubLogin = () => {
    console.log('=== GITHUB LOGIN CLICKED ===');
    
    const clientId = 'Ov23lihegNLNB6NBAGet';
    const redirectUri = encodeURIComponent('http://localhost:3000/login');
    const scope = 'read:user,repo';
    
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    
    console.log('Opening GitHub OAuth in new window:', githubAuthUrl);
    
    // Open GitHub OAuth in a new window
    const popup = window.open(
      githubAuthUrl,
      'github-oauth',
      'width=600,height=700,scrollbars=yes,resizable=yes,top=100,left=100'
    );
    
    // Focus the popup window
    if (popup) {
      popup.focus();
      
      // Listen for the popup to close or redirect
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          console.log('OAuth popup closed');
          // Refresh the page to check for authentication
          window.location.reload();
        }
      }, 1000);
      
      // Listen for messages from the popup (if using postMessage)
      const messageListener = (event) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'OAUTH_SUCCESS') {
          console.log('OAuth successful, closing popup');
          popup.close();
          clearInterval(checkClosed);
          window.removeEventListener('message', messageListener);
          // Redirect to dashboard or reload
          window.location.href = '/dashboard';
        } else if (event.data.type === 'OAUTH_ERROR') {
          console.error('OAuth failed:', event.data.error);
          popup.close();
          clearInterval(checkClosed);
          window.removeEventListener('message', messageListener);
          alert('Authentication failed: ' + event.data.error);
        }
      };
      
      window.addEventListener('message', messageListener);
    } else {
      console.error('Failed to open popup window');
      alert('Please allow popups for this site to sign in with GitHub');
    }
  };

  if (loading) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Authenticating...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
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
          <p className="login-subtitle">Sign in to access the dashboard</p>
        </div>

        <div className="login-content">
          <button 
            className="github-login-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Button clicked - handler called');
              handleGitHubLogin();
            }}
            type="button"
          >
            <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Sign in with GitHub
          </button>

          <div className="login-info">
            <p>You need maintainer permissions to access the dashboard.</p>
            <p className="login-note">
              If you don't have the required permissions, you'll be redirected to an access denied page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

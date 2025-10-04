const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Simple cache to prevent duplicate OAuth code processing
const processedCodes = new Set();

// Clean up old codes every 5 minutes
setInterval(() => {
  processedCodes.clear();
  console.log('Cleared processed codes cache');
}, 5 * 60 * 1000);

// Middleware
app.use(cors());
app.use(express.json());

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID || 'your-github-client-id';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || 'your-github-client-secret';

console.log('=== Environment Variables Debug ===');
console.log('REACT_APP_GITHUB_CLIENT_ID:', process.env.REACT_APP_GITHUB_CLIENT_ID);
console.log('GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID);
console.log('GITHUB_CLIENT_SECRET:', process.env.GITHUB_CLIENT_SECRET ? '***' + process.env.GITHUB_CLIENT_SECRET.slice(-4) : 'NOT SET');
console.log('Final GITHUB_CLIENT_ID:', GITHUB_CLIENT_ID);
console.log('Final GITHUB_CLIENT_SECRET:', GITHUB_CLIENT_SECRET ? '***' + GITHUB_CLIENT_SECRET.slice(-4) : 'NOT SET');

// Exchange code for access token
app.post('/api/auth/github', async (req, res) => {
  try {
    const { code } = req.body;
    
    console.log('=== OAuth Token Exchange Request ===');
    console.log('Received code:', code);
    console.log('Client ID:', GITHUB_CLIENT_ID);
    console.log('Client Secret:', GITHUB_CLIENT_SECRET ? '***' + GITHUB_CLIENT_SECRET.slice(-4) : 'NOT SET');

    if (!code) {
      console.log('ERROR: No authorization code provided');
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    // Check if this code has already been processed
    if (processedCodes.has(code)) {
      console.log('ERROR: Code already processed:', code);
      return res.status(400).json({ error: 'Authorization code already used' });
    }

    // Mark code as being processed immediately
    processedCodes.add(code);

    if (!GITHUB_CLIENT_ID || GITHUB_CLIENT_ID === 'your-github-client-id') {
      console.log('ERROR: GitHub Client ID not configured properly');
      return res.status(500).json({ error: 'GitHub OAuth not configured' });
    }

    if (!GITHUB_CLIENT_SECRET || GITHUB_CLIENT_SECRET === 'your-github-client-secret') {
      console.log('ERROR: GitHub Client Secret not configured properly');
      return res.status(500).json({ error: 'GitHub OAuth not configured' });
    }

    console.log('Making request to GitHub OAuth API...');
    
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code,
      }),
    });

    console.log('GitHub API Response Status:', tokenResponse.status);
    console.log('GitHub API Response Headers:', Object.fromEntries(tokenResponse.headers.entries()));

    const tokenData = await tokenResponse.json();
    console.log('GitHub API Response Data:', tokenData);

    if (tokenData.error) {
      console.log('ERROR: GitHub API returned error:', tokenData.error);
      return res.status(400).json({ error: tokenData.error_description || 'Failed to exchange code for token' });
    }

    if (!tokenData.access_token) {
      console.log('ERROR: No access token in response');
      return res.status(400).json({ error: 'No access token received from GitHub' });
    }

    console.log('SUCCESS: Access token received');
    res.json({ access_token: tokenData.access_token });
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Handle OAuth callback
app.get('/login', (req, res) => {
  const { code, error } = req.query;
  
  if (error) {
    console.log('OAuth error:', error);
    res.redirect(`http://localhost:3000/login?error=${error}`);
    return;
  }
  
  if (code) {
    console.log('OAuth callback received, redirecting to React app with code');
    res.redirect(`http://localhost:3000/login?code=${code}`);
    return;
  }
  
  // If no code or error, redirect to React app
  res.redirect('http://localhost:3000/login');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve React app for all other routes (excluding API routes)
app.get('*', (req, res) => {
  // Don't redirect API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  // Redirect all other routes to React app
  res.redirect('http://localhost:3000' + req.path);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

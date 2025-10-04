import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Simple AccessDenied component
const AccessDenied = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '100vh', 
    backgroundColor: '#000', 
    color: 'white',
    textAlign: 'center',
    padding: '2rem'
  }}>
    <h1>Access Denied</h1>
    <p>You don't have the required maintainer permissions for this repository.</p>
    <p>Please contact the repository owner to request access.</p>
    <button 
      onClick={() => window.location.href = '/'}
      style={{
        padding: '10px 20px',
        backgroundColor: 'white',
        color: 'black',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '1rem'
      }}
    >
      Go Home
    </button>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

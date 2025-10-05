import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading, isMaintainer } = useAuth();

  console.log('ProtectedRoute - user:', user ? 'authenticated' : 'not authenticated');
  console.log('ProtectedRoute - loading:', loading);
  console.log('ProtectedRoute - isMaintainer:', isMaintainer);

  if (loading) {
    console.log('ProtectedRoute - showing loading spinner');
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('ProtectedRoute - redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('ProtectedRoute - rendering dashboard');
  // Allow access to dashboard for all authenticated users
  // Show maintainer-specific features based on isMaintainer status
  return children;
};

export default ProtectedRoute;

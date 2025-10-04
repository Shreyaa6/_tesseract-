import React, { useState } from 'react'
import Landing from './landing'
import Blog from './pages/Blog'
import Contact from './pages/Contact'

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

  const renderPage = () => {
    switch (currentPage) {
      case 'blog':
        return <Blog onNavigate={setCurrentPage} />
      case 'contact':
        return <Contact onNavigate={setCurrentPage} />
      case 'landing':
      default:
        return <Landing onNavigate={setCurrentPage} />
    }
  }

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

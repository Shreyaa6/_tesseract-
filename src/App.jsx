import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RepositoryDetail from './pages/RepositoryDetail';
import PullRequestDetail from './pages/PullRequestDetail';
import Commits from './pages/Commits';
import Features from './pages/Features';
import Ether from './pages/Ether';
import UseCase from './pages/UseCase';
import Docs from './pages/Docs';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/features" element={<Features />} />
          <Route path="/ether" element={<Ether />} />
          <Route path="/use-cases" element={<UseCase />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/commits" 
            element={
              <ProtectedRoute>
                <Commits />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/repository/:owner/:repo" 
            element={
              <ProtectedRoute>
                <RepositoryDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/repository/:owner/:repo/pull/:number" 
            element={
              <ProtectedRoute>
                <PullRequestDetail />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

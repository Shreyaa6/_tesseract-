import React, { useState } from 'react'
import Landing from './landing'
import Blog from './pages/Blog'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  const renderPage = () => {
    switch (currentPage) {
      case 'blog':
        return <Blog onNavigate={setCurrentPage} />
      case 'landing':
      default:
        return <Landing onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="app">
      {renderPage()}
    </div>
  )
}

export default App

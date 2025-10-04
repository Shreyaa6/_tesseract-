import React, { useState } from 'react'
import Landing from './landing'
import Blog from './pages/Blog'
import UseCase from './pages/UseCase'
import Features from './pages/Features'
import Ether from './pages/Ether'
import Docs from './pages/Docs'
import Contact from './pages/Contact'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  const renderPage = () => {
    switch (currentPage) {
      case 'blog':
        return <Blog onNavigate={setCurrentPage} />
      case 'usecase':
        return <UseCase onNavigate={setCurrentPage} />
      case 'features':
        return <Features onNavigate={setCurrentPage} />
      case 'ether':
        return <Ether onNavigate={setCurrentPage} />
      case 'docs':
        return <Docs onNavigate={setCurrentPage} />
      case 'contact':
        return <Contact onNavigate={setCurrentPage} />
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

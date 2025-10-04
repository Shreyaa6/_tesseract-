import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './blog.css';

const Blog = ({ onNavigate }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [crossMousePosition, setCrossMousePosition] = useState({ x: 0, y: 0 });
  const glowContainerRef = useRef(null);
  const crossBackgroundRef = useRef(null);

  const handleMouseMove = (e) => {
    if (glowContainerRef.current) {
      const rect = glowContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const handleCrossMouseMove = (e) => {
    if (crossBackgroundRef.current) {
      const rect = crossBackgroundRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCrossMousePosition({ x, y });
    }
  };

  // Calculate edge fade based on cursor position
  const getEdgeFadeMask = () => {
    if (!crossBackgroundRef.current) return '';
    
    const rect = crossBackgroundRef.current.getBoundingClientRect();
    const width = rect.width;
    const cursorX = crossMousePosition.x;
    
    // Define edge zones (10% from each edge)
    const edgeZone = width * 0.1;
    const centerZone = width * 0.8;
    
    // If cursor is in left edge zone, fade from cursor position
    if (cursorX < edgeZone) {
      const fadeStart = Math.max(0, cursorX - 50);
      const fadeEnd = Math.min(width, cursorX + 50);
      return `linear-gradient(to right, transparent 0%, black ${fadeStart}px, black ${fadeEnd}px, transparent 100%)`;
    }
    
    // If cursor is in right edge zone, fade from cursor position
    if (cursorX > width - edgeZone) {
      const fadeStart = Math.max(0, cursorX - 50);
      const fadeEnd = Math.min(width, cursorX + 50);
      return `linear-gradient(to right, transparent 0%, black ${fadeStart}px, black ${fadeEnd}px, transparent 100%)`;
    }
    
    // If cursor is in center, use normal edge fade
    return `linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)`;
  };
  const blogPosts = [
    {
      id: 1,
      category: 'ENGINEERING',
      date: 'September 18, 2025',
      title: 'Introducing frozen branches: A safer way to build on your teammates\' work',
      author: 'David Bradford',
      authorAvatar: '👨‍💻',
      featured: true
    },
    {
      id: 2,
      category: 'CHANGELOG',
      date: 'September 17, 2025',
      title: 'Graphite changelog [09-17-2025]',
      author: 'Sara Verdi',
      authorAvatar: '👩‍💻',
      featured: false
    },
    {
      id: 3,
      category: 'ENGINEERING',
      date: 'September 10, 2025',
      title: 'How we sped up code search for Graphite Chat',
      author: 'Brandon Willett',
      authorAvatar: '👨‍💻',
      featured: false
    },
    {
      id: 4,
      category: 'LAUNCHES',
      date: 'September 5, 2025',
      title: 'Graphite Chat: AI-powered code assistance',
      author: 'Emily Chen',
      authorAvatar: '👩‍💻',
      featured: false
    },
    {
      id: 5,
      category: 'LEARNING',
      date: 'August 28, 2025',
      title: 'Best practices for Git workflow optimization',
      author: 'Michael Rodriguez',
      authorAvatar: '👨‍💻',
      featured: false
    },
    {
      id: 6,
      category: 'COMPANY',
      date: 'August 20, 2025',
      title: 'Graphite raises Series A funding',
      author: 'Sarah Johnson',
      authorAvatar: '👩‍💻',
      featured: false
    }
  ];

  const categories = [
    'All posts',
    '#events',
    '#launches', 
    '#state of code',
    '#launch week',
    '#learning',
    '#changelog',
    '#company',
    '#engineering',
    '#stacking'
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const otherPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="blog-page">
      <Navbar onNavigate={onNavigate} />
      
      {/* Blog Header */}
      {/* <header className="blog-header">
        <div className="blog-header-container">
          <div className="blog-logo">
            <div className="blog-logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M12 2L22 7L12 12L2 7L12 2Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M2 17L12 22L22 17" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M2 12L12 17L22 12" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span>Graphite</span>
          </div>
          
          <nav className="blog-nav">
            <a href="#features" className="blog-nav-link">Features</a>
            <a href="#diamond" className="blog-nav-link">Diamond</a>
            <a href="#use-cases" className="blog-nav-link">Use cases</a>
            <a href="#pricing" className="blog-nav-link">Pricing</a>
            <a href="#docs" className="blog-nav-link">Docs</a>
            <a href="#blog" className="blog-nav-link active">Blog</a>
            <a href="#contact" className="blog-nav-link">Contact</a>
          </nav>
          
          <div className="blog-actions">
            <button className="blog-login-btn">
              <span className="login-icon">G</span>
              Log in
            </button>
            <button className="blog-signup-btn">Sign up</button>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="blog-main">
        <div className="blog-container">
          {/* Featured Post */}
          <div className="cross-background-wrapper" 
               ref={crossBackgroundRef}
               onMouseMove={handleCrossMouseMove}
               style={{
                 '--cross-mouse-x': `${crossMousePosition.x}px`,
                 '--cross-mouse-y': `${crossMousePosition.y}px`
               }}>
            <div className="cross-background-sub-wrapper">
              <div className="cross-background-background"></div>
              <div className="cross-background-mask" 
                   style={{
                     maskImage: `radial-gradient(circle 200px at var(--cross-mouse-x, 50%) var(--cross-mouse-y, 50%), white 45%, transparent), ${getEdgeFadeMask()}`
                   }}></div>
            </div>
            <section className="featured-post">
              <div className="featured-post-content">
                <div className="post-category">#{featuredPost.category.toLowerCase()}</div>
                <h1 className="featured-post-title">{featuredPost.title}</h1>
                <div className="post-meta">
                  <span className="post-date">{featuredPost.date}</span>
                  <div className="post-author">
                    <span className="author-avatar">{featuredPost.authorAvatar}</span>
                    <span className="author-name">{featuredPost.author}</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Category Filters */}
          <section className="category-filters">
            <div className="filter-buttons">
              {categories.map((category, index) => (
                <button 
                  key={index}
                  className={`filter-btn ${index === 0 ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="blog-posts-grid">
            {otherPosts.map((post) => (
              <article key={post.id} className="blog-post-card">
                <div className="post-card-header">
                  <span className="post-card-category">{post.category}</span>
                  <span className="post-card-date">{post.date}</span>
                </div>
                <h2 className="post-card-title">{post.title}</h2>
                <div className="post-card-author">
                  <span className="post-card-avatar">{post.authorAvatar}</span>
                  <span className="post-card-author-name">{post.author}</span>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="blog-footer">
        {/* Hero Section */}
        <section className="footer-hero">
          <div className="footer-hero-content">
            <h2 className="footer-hero-title">
              Built for the world's fastest engineering teams, now available for everyone
            </h2>
            <div className="footer-hero-actions">
              <button className="footer-demo-btn">Request a demo</button>
              <div 
                className="cta-glow-container"
                ref={glowContainerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  '--mouse-x': `${mousePosition.x}px`,
                  '--mouse-y': `${mousePosition.y}px`
                }}
              >
                <div className="cta-glow cta-glow-1"></div>
                <div className="cta-glow cta-glow-2"></div>
                <button className="footer-trial-btn">Start free trial →</button>
              </div>
            </div>
          </div>
          <div className="footer-hero-bg">
            <div className="hexagon-pattern"></div>
          </div>
          <div className="footer-hero-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M12 2L22 7L12 12L2 7L12 2Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinejoin="round"
              />
              <path 
                d="M2 17L12 22L22 17" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinejoin="round"
              />
              <path 
                d="M2 12L12 17L22 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </section>

        {/* Footer Links */}
        <div className="footer-container">
          <div className="footer-columns">
            <div className="footer-column">
              <h3 className="footer-title">Features</h3>
              <ul className="footer-links">
                <li><a href="#cli">CLI</a></li>
                <li><a href="#merge-queue">Merge queue</a></li>
                <li><a href="#insights">Insights</a></li>
                <li><a href="#pr-inbox">PR inbox</a></li>
                <li><a href="#ai-reviews">AI reviews</a></li>
                <li><a href="#chat">Chat <span className="new-badge">NEW</span></a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">Company</h3>
              <ul className="footer-links">
                <li><a href="#blog">Blog</a></li>
                <li><a href="#customers">Customers</a></li>
                <li><a href="#careers">Careers <span className="job-count">19</span></a></li>
                <li><a href="#privacy">Privacy policy</a></li>
                <li><a href="#terms">Terms of service</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">Resources</h3>
              <ul className="footer-links">
                <li><a href="#docs">Docs</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#status">Status</a></li>
                <li><a href="#guides">Guides</a></li>
                <li><a href="#stacking">Stacking workflow</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">Connect</h3>
              <ul className="footer-links">
                <li><a href="#contact">📧 Contact us</a></li>
                <li><a href="#slack"># Community Slack</a></li>
                <li><a href="#github">🐙 GitHub</a></li>
                <li><a href="#twitter">𝕏 X</a></li>
                <li><a href="#linkedin">💼 LinkedIn</a></li>
                <li><a href="#youtube">📺 YouTube</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-status">
              <span className="status-indicator">🟢</span>
              <span>All systems operational</span>
            </div>
            <div className="footer-copyright">
              © Graphite 2025
            </div>
          </div>
        </div>
      </footer>

      {/* Neon Sign Section */}
      <section className="neon-section">
        <div className="neon-container">
          <div className="neon-sign">
            <h1 className="neon-text">
              {'Graphite'.split('').map((letter, index) => (
                <span 
                  key={index} 
                  className="neon-letter"
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  {letter}
                </span>
              ))}
            </h1>
          </div>
          <div className="neon-status">
            <span className="status-dot">🟢</span>
            <span className="status-text">All systems operational</span>
          </div>
          <div className="neon-copyright">
            © Graphite 2025
          </div>
          <div className="neon-url">
            <div className="url-box">
              https://graphite.dev/homepage
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;

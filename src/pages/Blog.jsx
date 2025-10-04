import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './blog.css';

const Blog = ({ onNavigate }) => {
  const [crossMousePosition, setCrossMousePosition] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState('All posts');
  const [hoveredCard, setHoveredCard] = useState(null);
  const crossBackgroundRef = useRef(null);

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
      date: 'August 19, 2025',
      title: 'Introducing Graphite Chat',
      author: 'Merrill Lutsky',
      authorAvatar: '👩‍💻',
      featured: false
    },
    {
      id: 5,
      category: 'LEARNING',
      date: 'July 29, 2025',
      title: 'AI is writing code—here\'s why it also needs to review that code',
      author: 'Sara Verdi',
      authorAvatar: '👩‍💻',
      featured: false
    },
    {
      id: 6,
      category: 'ENGINEERING',
      date: 'July 25, 2025',
      title: 'How I got Claude to write code I could actually ship',
      author: 'Kush Gupta',
      authorAvatar: '👨‍💻',
      featured: false,
      categories: ['ENGINEERING', 'LAUNCHES', 'STACKING']
    }
  ];

  const designPosts = [
    {
      id: 7,
      category: 'Design Insights',
      title: 'Trends in Modern Design',
      description: 'Discover the latest trends shaping modern design studios and how they can elevate.',
      image: '💻',
      featured: false
    },
    {
      id: 8,
      category: 'Design Tips',
      title: 'Power of Minimalist Design',
      description: 'Learn how minimalist design can create impactful and projects for your clients.',
      image: '💻',
      featured: false
    },
    {
      id: 9,
      category: 'Design Tips',
      title: 'Sustainable Design for Studios',
      description: 'Explore how design studios can adopt sustainable practices to create projects.',
      image: '💻',
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

  // Filter posts based on active category
  const filteredPosts = activeCategory === 'All posts' 
    ? otherPosts 
    : otherPosts.filter(post => {
        const categoryTag = `#${post.category.toLowerCase()}`;
        return categoryTag === activeCategory || 
               (post.categories && post.categories.some(cat => `#${cat.toLowerCase()}` === activeCategory));
      });

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleCardHover = (postId) => {
    setHoveredCard(postId);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

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
                  className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="blog-posts-grid">
            {filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className={`blog-post-card ${hoveredCard === post.id ? 'hovered' : ''}`}
                onMouseEnter={() => handleCardHover(post.id)}
                onMouseLeave={handleCardLeave}
              >
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

          {/* Design Talk From the Team Section */}
          <section className="design-section">
            <div className="design-header">
              <h2 className="design-title">
                Design <span className="design-accent">Talk</span> From the Team
              </h2>
              <p className="design-subtitle">
                Discover design tips, and expert insights to help your brand stand out.
              </p>
            </div>
            
            <div className="design-posts-grid">
              {designPosts.map((post) => (
                <article 
                  key={post.id} 
                  className={`design-post-card ${hoveredCard === post.id ? 'hovered' : ''}`}
                  onMouseEnter={() => handleCardHover(post.id)}
                  onMouseLeave={handleCardLeave}
                >
                  <div className="design-card-category">{post.category}</div>
                  <div className="design-card-image">{post.image}</div>
                  <h3 className="design-card-title">{post.title}</h3>
                  <p className="design-card-description">{post.description}</p>
                  <button className="design-read-more-btn">
                    Read More
                    <span className="arrow-icon">→</span>
                  </button>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;

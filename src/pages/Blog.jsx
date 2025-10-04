import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './blog.css';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All posts');

  const blogPosts = [
    {
      id: 1,
      category: 'ENGINEERING',
      date: 'September 18, 2025',
      title: 'Introducing frozen branches: A safer way to build on your teammates\' work',
      description: 'Learn how frozen branches help teams collaborate more effectively while maintaining code quality and reducing merge conflicts.',
      author: 'David Bradford',
      authorAvatar: '👨‍💻',
      featured: true
    },
    {
      id: 2,
      category: 'CHANGELOG',
      date: 'September 17, 2025',
      title: 'Graphite changelog [09-17-2025]',
      description: 'Latest updates and improvements to the Graphite platform, including new features and bug fixes.',
      author: 'Sara Verdi',
      authorAvatar: '👩‍💻',
      featured: false
    },
    {
      id: 3,
      category: 'ENGINEERING',
      date: 'September 10, 2025',
      title: 'How we sped up code search for Graphite Chat',
      description: 'Deep dive into the technical improvements that made our code search feature lightning fast.',
      author: 'Brandon Willett',
      authorAvatar: '👨‍💻',
      featured: false
    },
    {
      id: 4,
      category: 'LAUNCHES',
      date: 'August 19, 2025',
      title: 'Introducing Graphite Chat',
      description: 'Meet our new AI-powered chat feature that helps developers get instant answers about their codebase.',
      author: 'Merrill Lutsky',
      authorAvatar: '👩‍💻',
      featured: false
    },
    {
      id: 5,
      category: 'LEARNING',
      date: 'July 29, 2025',
      title: 'AI is writing code—here\'s why it also needs to review that code',
      description: 'Exploring the importance of AI code review in maintaining software quality and security.',
      author: 'Sara Verdi',
      authorAvatar: '👩‍💻',
      featured: false
    },
    {
      id: 6,
      category: 'ENGINEERING',
      date: 'July 25, 2025',
      title: 'How I got Claude to write code I could actually ship',
      description: 'Practical tips and techniques for getting AI assistants to produce production-ready code.',
      author: 'Kush Gupta',
      authorAvatar: '👨‍💻',
      featured: false
    }
  ];

  const recentPosts = [
    {
      id: 7,
      category: 'Design',
      title: 'Trends in Modern Development Tools',
      description: 'Discover the latest trends shaping modern development workflows and how they can improve your productivity.',
      date: 'September 15, 2025',
      author: 'Alex Chen',
      authorAvatar: '👨‍💻'
    },
    {
      id: 8,
      category: 'Tutorial',
      title: 'Building Scalable Microservices',
      description: 'Learn how to design and implement microservices that can scale with your growing application needs.',
      date: 'September 12, 2025',
      author: 'Maria Rodriguez',
      authorAvatar: '👩‍💻'
    },
    {
      id: 9,
      category: 'Case Study',
      title: 'How We Reduced Build Times by 80%',
      description: 'A detailed case study on optimizing CI/CD pipelines and the impact on developer productivity.',
      date: 'September 8, 2025',
      author: 'James Wilson',
      authorAvatar: '👨‍💻'
    }
  ];

  const categories = [
    'All posts',
    '#engineering',
    '#launches',
    '#learning',
    '#changelog',
    '#company',
    '#stacking'
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const otherPosts = blogPosts.filter(post => !post.featured);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="blog-page">
      <Navbar />
      
      {/* Background Image */}
      <div className="background-container"></div>

      {/* Content */}
      <div className="blog-content">
        <h1 className="blog-main-title">Developer insights and updates</h1>

        <div className="blog-cards-grid">
          {/* Card 1: Latest Updates */}
          <div className="blog-card">
            <div className="card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
              </svg>
            </div>
            <h2 className="card-title">Latest Updates</h2>
            <p className="card-description">Stay informed with the newest features, improvements, and announcements from our development team.</p>
            <button className="read-more-btn">Read more</button>
          </div>

          {/* Card 2: Engineering Insights */}
          <div className="blog-card">
            <div className="card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h2 className="card-title">Engineering Insights</h2>
            <p className="card-description">Deep technical articles about our engineering challenges, solutions, and the technologies we use.</p>
            <button className="read-more-btn">Read more</button>
          </div>

          {/* Card 3: Developer Stories */}
          <div className="blog-card">
            <div className="card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h2 className="card-title">Developer Stories</h2>
            <p className="card-description">Personal experiences, lessons learned, and stories from developers in our community.</p>
            <button className="read-more-btn">Read more</button>
          </div>

          {/* Card 4: Tutorials */}
          <div className="blog-card">
            <div className="card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            </div>
            <h2 className="card-title">Tutorials</h2>
            <p className="card-description">Step-by-step guides to help you master new tools, techniques, and best practices.</p>
            <button className="read-more-btn">Read more</button>
          </div>

          {/* Card 5: Case Studies */}
          <div className="blog-card">
            <div className="card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18"></path>
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
              </svg>
            </div>
            <h2 className="card-title">Case Studies</h2>
            <p className="card-description">Real-world examples of how teams solved complex problems and improved their development workflows.</p>
            <button className="read-more-btn">Read more</button>
          </div>

          {/* Card 6: Community */}
          <div className="blog-card">
            <div className="card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h2 className="card-title">Community</h2>
            <p className="card-description">Connect with fellow developers, share experiences, and learn from the community.</p>
            <button className="read-more-btn">Read more</button>
          </div>
        </div>
      </div>

      {/* Featured Post Section */}
      <div className="featured-section">
        <div className="featured-content">
          <h2 className="featured-title">Featured Post</h2>
          <p className="featured-subtitle">
            Our latest insights and updates from the development team
          </p>
          
          {featuredPost && (
            <div className="featured-post-card">
              <div className="featured-post-header">
                <div className="featured-post-meta">
                  <span className="featured-post-category">{featuredPost.category}</span>
                  <span className="featured-post-date">{featuredPost.date}</span>
                </div>
                <div className="featured-post-author">
                  <span>{featuredPost.authorAvatar}</span>
                  <span>{featuredPost.author}</span>
                </div>
              </div>
              <div className="featured-post-body">
                <h3 className="featured-post-title">{featuredPost.title}</h3>
                <p className="featured-post-excerpt">{featuredPost.description}</p>
                <button className="featured-read-more">Read Full Article</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="recent-posts-section">
        <div className="recent-posts-content">
          <h2 className="recent-posts-title">Recent Posts</h2>
          <p className="recent-posts-subtitle">
            Stay up to date with our latest articles and insights
          </p>
          
          <div className="recent-posts-grid">
            {recentPosts.map((post) => (
              <div key={post.id} className="recent-post-card">
                <div className="recent-post-meta">
                  <span className="recent-post-category">{post.category}</span>
                  <span className="recent-post-date">{post.date}</span>
                </div>
                <h3 className="recent-post-title">{post.title}</h3>
                <p className="recent-post-description">{post.description}</p>
                <div className="recent-post-author">
                  <span className="recent-post-avatar">{post.authorAvatar}</span>
                  <span className="recent-post-author-name">{post.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;

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
      authorAvatar: ''
    },
    {
      id: 8,
      category: 'Tutorial',
      title: 'Building Scalable Microservices',
      description: 'Learn how to design and implement microservices that can scale with your growing application needs.',
      date: 'September 12, 2025',
      author: 'Maria Rodriguez',
      authorAvatar: ''
    },
    {
      id: 9,
      category: 'Case Study',
      title: 'How We Reduced Build Times by 80%',
      description: 'A detailed case study on optimizing CI/CD pipelines and the impact on developer productivity.',
      date: 'September 8, 2025',
      author: 'James Wilson',
      authorAvatar: ''
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
          {/* Card 1: Start a stack */}
          <div className="blog-card">
            <h2 className="card-title">Start a stack</h2>
            <p className="card-description">Create the first branch in your stack with <span className="command-highlight">gt create</span></p>
          </div>

          {/* Card 2: Keep stacking */}
          <div className="blog-card">
            <h2 className="card-title">Keep stacking</h2>
            <p className="card-description">Run <span className="command-highlight">gt create</span> again to stack another branch on top of your previous changes without waiting for them to merge into main.</p>
          </div>

          {/* Card 3: Visualize your stack */}
          <div className="blog-card">
            <h2 className="card-title">Visualize your stack</h2>
            <p className="card-description">Get a bird's eye view of your stack with <span className="command-highlight">gt log</span></p>
          </div>

          {/* Card 4: Publish your stack */}
          <div className="blog-card">
            <h2 className="card-title">Publish your stack</h2>
            <p className="card-description">Create or update PRs for every branch in your stack with <span className="command-highlight">gt submit</span></p>
          </div>

          {/* Card 5: Respond to feedback */}
          <div className="blog-card">
            <h2 className="card-title">Respond to feedback</h2>
            <p className="card-description">Update changes across your stack with <span className="command-highlight">gt modify _tesseract/</span> handles all of the recursive rebasing for you.</p>
          </div>

          {/* Card 6: Ship, sync, repeat */}
          <div className="blog-card">
            <h2 className="card-title">Ship, sync, repeat</h2>
            <p className="card-description">Automatically sync your local stack with remote changes, and clean up stale branches with <span className="command-highlight">gt sync</span></p>
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
                  <span className="recent-post-category">{post.category.toUpperCase()}</span>
                  <span className="recent-post-date">{post.date}</span>
                </div>
                <h3 className="recent-post-title">{post.title}</h3>
                <p className="recent-post-description">{post.description}</p>
                <div className="recent-post-author">
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

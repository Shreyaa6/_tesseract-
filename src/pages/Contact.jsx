import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './contact.css';

const Contact = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('message');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    interests: [],
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(item => item !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your submission! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        interests: [],
        message: ''
      });
    }, 2000);
  };

  const interests = [
    'Product Launch',
    'Growth Strategies',
    'Branding',
    'Content',
    'Web Development'
  ];

  return (
    <div className="contact-page">
      <Navbar onNavigate={onNavigate} />
      
      <main className="contact-main">
        <div className="contact-container">
          {/* Left Side - Hero Section */}
          <div className="contact-left">
            <div className="contact-hero-content">
              <h1 className="contact-hero-title">Let's get down to business</h1>
              <p className="contact-hero-description">
                We'd love to chat! If you fill out the information below, someone from the team will reach out right away!
              </p>
            </div>
            
            {/* Cube Animation */}
            <div className="contact-cube-container">
              <div className="contact-cube">
                <div className="contact-cube-face front"></div>
                <div className="contact-cube-face back"></div>
                <div className="contact-cube-face right"></div>
                <div className="contact-cube-face left"></div>
                <div className="contact-cube-face top"></div>
                <div className="contact-cube-face bottom"></div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Contact Form */}
          <div className="contact-right">
            <div className="contact-form-container">
              {/* Tabs */}
              <div className="contact-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'message' ? 'active' : ''}`}
                  onClick={() => setActiveTab('message')}
                >
                  Send a Message
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'call' ? 'active' : ''}`}
                  onClick={() => setActiveTab('call')}
                >
                  Schedule a Call
                </button>
              </div>
              
              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="section-label">What are you looking for?</label>
                  <div className="interest-buttons">
                    {interests.map((interest, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`interest-btn ${formData.interests.includes(interest) ? 'selected' : ''}`}
                        onClick={() => handleInterestChange(interest)}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="section-label">About Your Project</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    rows="6"
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
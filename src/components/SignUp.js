import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();

  // Simulate user authentication and redirect
  const handleAuth = (e) => {
    e.preventDefault();
    // In a real app, you would handle authentication here
    // For this example, we'll just navigate to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className="signup-page-container">
      <div className="signup-card">
        <div className="signup-logo">
          <img src="https://img.icons8.com/nolan/64/brain.png" alt="LearnAI Pro Logo" />
          <div className="signup-logo-text">
            <span>LearnAI Pro</span>
            <small>AI-powered Learning Platform</small>
          </div>
        </div>
        <h2 className="signup-title">Get Started</h2>
        <p className="signup-subtitle">Create an account or log in to continue.</p>
        <form className="signup-form" onSubmit={handleAuth}>
          <div className="signup-input-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="you@example.com" required />
          </div>
          <div className="signup-input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" required />
          </div>
          <button type="submit" className="signup-submit-button">
            Sign Up or Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
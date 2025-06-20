import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo">
          <img src="https://img.icons8.com/nolan/64/brain.png" alt="LearnAI Pro Logo" className="logo-icon" />
          <div className="logo-text">
            <span>LearnAI Pro</span>
            <small>AI-powered Learning Platform</small>
          </div>
        </div>
        <nav className="navigation">
          <button className="signup-button" onClick={handleSignUp}>
            Sign Up
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
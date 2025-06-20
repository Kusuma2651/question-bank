// src/components/HeroSection/HeroSection.js
// --- FINAL REVISION ---
import React from 'react';
import '../styles/HeroSection.css';
// IMPORTANT: Using the FILLED icons now, not Outlined
import ChatIcon from '@mui/icons-material/Chat';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import InsightsIcon from '@mui/icons-material/Insights';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="ai-badge">AI-Powered Learning Revolution</div>
        <h1>
          Transform Your Question Banks
          <br />
          into <span className="gradient-text">Extraordinary Learning Experiences</span>
        </h1>
        <p className="hero-subtitle">
          Upload your question banks and unlock AI-powered learning with intelligent chat
          assistance, adaptive quizzes, and comprehensive explanations that adapt to your
          learning style.
        </p>
      </div>

      <div className="hero-features-card-wrapper">
        <div className="hero-features-card">
          {/* Item 1: AI Chat Assistant */}
          <div className="hero-feature-item">
            <div className="hero-icon-wrapper blue">
              <ChatIcon />
            </div>
            <h3>AI Chat Assistant</h3>
            <p>Get instant answers with voice synthesis</p>
          </div>
          
          {/* Item 2: Smart Quizzes */}
          <div className="hero-feature-item">
            <div className="hero-icon-wrapper magenta">
              <LightbulbIcon />
            </div>
            <h3>Smart Quizzes</h3>
            <p>Adaptive questions that evolve with you</p>
          </div>
          
          {/* Item 3: Deep Insights */}
          <div className="hero-feature-item">
            <div className="hero-icon-wrapper teal">
              <InsightsIcon />
            </div>
            <h3>Deep Insights</h3>
            <p>Comprehensive explanations and analysis</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
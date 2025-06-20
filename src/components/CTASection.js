import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CTASection.css';

const CTASection = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate('/signup');
  };

  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2>Ready to Transform Your Learning?</h2>
        <p>
          Join thousands of learners who have already revolutionized their study
          experience with LearnAI Pro
        </p>
        <button className="cta-button" onClick={handleStartLearning}>
          Start Learning Now →
        </button>
      </div>
    </section>
  );
};

export default CTASection;
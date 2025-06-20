// src/components/FeaturesSection/FeaturesSection.js
// --- MODIFIED & FINALIZED ---
import React from 'react';
import '../styles/FeaturesSection.css';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

const FeatureCard = ({ icon, title, description, iconBgColor, iconColor }) => (
  <div className="feature-card">
    <div className="feature-icon-wrapper" style={{ backgroundColor: iconBgColor }}>
      {React.cloneElement(icon, { style: { color: iconColor } })}
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: <QuestionAnswerOutlinedIcon />,
      title: 'AI Chat Assistant',
      description: 'Ask questions and get instant, intelligent answers with advanced text-to-speech functionality for immersive learning.',
      iconBgColor: 'var(--feature-icon-bg-blue)',
      iconColor: 'var(--feature-icon-color-blue)',
    },
    {
      icon: <AutoAwesomeOutlinedIcon />,
      title: 'Adaptive Quizzes',
      description: 'Practice with dynamically generated quizzes that adapt to your learning pace and difficulty preferences.',
      iconBgColor: 'var(--feature-icon-bg-magenta)',
      iconColor: 'var(--feature-icon-color-magenta)',
    },
    {
      icon: <VisibilityOutlinedIcon />,
      title: 'Deep Explanations',
      description: 'Get comprehensive explanations with visual aids, key concepts, and related topics for complete understanding.',
      iconBgColor: 'var(--feature-icon-bg-teal)',
      iconColor: 'var(--feature-icon-color-teal)',
    },
    {
      icon: <TrendingUpOutlinedIcon />,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics, streaks, and personalized recommendations.',
      iconBgColor: 'var(--feature-icon-bg-orange)',
      iconColor: 'var(--feature-icon-color-orange)',
    },
  ];

  return (
    <section className="features-section">
      <div className="features-header">
        <h2>Why Choose <span className="gradient-text">LearnAI Pro?</span></h2>
        <p className="features-subtitle">
          Experience the future of learning with our advanced, AI-powered platform
        </p>
      </div>
      <div className="features-grid">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            iconBgColor={feature.iconBgColor}
            iconColor={feature.iconColor}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
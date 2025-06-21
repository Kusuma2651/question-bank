import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (validateForm()) {
      // In a real app, you would handle login API call here
      // For demo, we'll check localStorage for registered user
      const userData = localStorage.getItem('user');
      
      if (userData) {
        const user = JSON.parse(userData);
        if (user.email === formData.email) {
          // Successful login
          navigate('/dashboard');
          return;
        }
      }
      
      // If we get here, login failed
      setLoginError('Invalid email or password');
    }
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
        <h2 className="signup-title">Welcome Back</h2>
        <p className="signup-subtitle">Log in to continue your learning journey</p>
        {loginError && <div className="login-error">{loginError}</div>}
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="signup-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <button type="submit" className="signup-submit-button">
            Log In
          </button>
          <p className="auth-switch">
            Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
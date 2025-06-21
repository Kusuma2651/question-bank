import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Assuming this component exists
import Header from './components/Header';
// Corrected import paths to point to the actual component files
import SignUp from './components/SignUp';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import Learn from './components/Learn';
import 'katex/dist/katex.min.css'; // Add this line for math rendering
import './App.css';

// Placeholder for LandingPage if it doesn't exist
const LandingPageContent = () => (
  <>
    <Header />
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to LearnAI Pro</h1>
      <p>Click "Sign Up" to begin.</p>
    </div>
  </>
);
// Use the actual LandingPage component if it exists, otherwise use the placeholder
// This logic is preserved from your file.
const EffectiveLandingPage = LandingPage || LandingPageContent;


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EffectiveLandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
        {/*
          Both /dashboard and /upload now correctly point to the Dashboard component.
          This is needed for the "Upload" and "Learn" tabs on the dashboard page.
          In our Dashboard.js, clicking the "Upload" tab navigates to "/dashboard".
          This route ensures it works correctly.
        */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Dashboard />} /> {/* Kept for consistency and future-proofing */}
        
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </Router>
  );
}

export default App;
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Analytics from './Analytics';
import UploadedMaterials from './UploadedMaterials';
import RedirectModal from './RedirectModal';
import '../styles/Dashboard.css'; // This CSS file will be completely replaced

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [analysisState, setAnalysisState] = useState('idle');
  const [activeTab, setActiveTab] = useState('upload'); // 'upload', 'analytics', 'materials'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Static data for AI Analysis Results
  const analysisResult = {
    totalQuestions: 247,
    modules: 4,
    chapters: 18,
    keyConcepts: 67,
    detectedModules: ['Calculus', 'Linear Algebra', 'Statistics', 'Discrete Mathematics'],
    difficulty: { easy: 89, medium: 124, hard: 34 },
  };

  const totalDifficulty = analysisResult.difficulty.easy + analysisResult.difficulty.medium + analysisResult.difficulty.hard;

  const handleFileProcessing = (uploadedFile) => {
    if (!uploadedFile) return;

    setFile({
      name: uploadedFile.name,
      size: (uploadedFile.size / 1024 / 1024).toFixed(2),
    });
    setAnalysisState('processing');
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisState('complete');
      setIsModalOpen(true);
    }, 2500);
  };
  
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      handleFileProcessing(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 52428800, // 50MB
  });

  const handleRedirect = () => {
    navigate('/learn');
  };

  const renderUploadTab = () => (
    <div className="tab-content-inner">
      <header className="dashboard-header">
          <div className="dashboard-smart-analysis-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
            <span>Smart Content Analysis</span>
          </div>
          <h1>Upload Your <span className="gradient-text">Question Bank</span></h1>
          <p>Let our advanced AI analyze and organize your content for an extraordinary educational experience.</p>
        </header>

        <main className="dashboard-main-grid">
          <div className="dashboard-upload-card">
            <div className="dashboard-upload-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
              <h3>Upload Your File</h3>
            </div>
            <p className="dashboard-upload-supported">Supported formats: PDF, TXT, DOCX - Max size: 50MB</p>
            
            {analysisState === 'idle' && (
              <div {...getRootProps({ className: `dashboard-dropzone ${isDragActive ? 'active' : ''}` })}>
                <input {...getInputProps()} />
                <div className="dashboard-dropzone-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <p><b>Drag & drop your question bank here</b></p>
                  <p>or click to browse your files</p>
                  <button type="button" className="dashboard-choose-file-btn">Choose File</button>
                </div>
              </div>
            )}
            
            {analysisState !== 'idle' && file && (
               <div className="dashboard-file-item">
                <div className={`dashboard-file-icon ${analysisState === 'processing' ? 'processing' : 'complete'}`}>
                    {analysisState === 'processing' ? <div className="dashboard-spinner"></div> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>}
                </div>
                <div className="dashboard-file-details">
                  <span>{analysisState === 'processing' ? `Analyzing ${file.name}...` : file.name}</span>
                  <small>{analysisState === 'processing' ? 'This may take a moment' : 'Ready for processing'}</small>
                </div>
                <div className="dashboard-file-size">{file.size} MB</div>
              </div>
            )}
          </div>

          <div className="dashboard-results-card">
            <div className="dashboard-upload-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
                <h3>AI Analysis Results</h3>
            </div>
            <p className="dashboard-upload-supported">Intelligent content organization and structure analysis</p>
            
            <div className="dashboard-results-content-wrapper">
                {analysisState === 'idle' || analysisState === 'processing' ? (
                    <div className="dashboard-results-placeholder">
                        <div className="placeholder-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><circle cx="11.5" cy="14.5" r="2.5"/><path d="m13.25 16.25 2.5 2.5"/></svg>
                        </div>
                        <h4>Ready for Analysis</h4>
                        <p>Upload your question bank to see detailed AI analysis and content organization</p>
                    </div>
                ) : (
                    <div className={`dashboard-results-details ${analysisState === 'complete' ? 'visible' : ''}`}>
                        <div className="dashboard-stats-grid">
                            <div className="dashboard-stat-item blue"><h4>{analysisResult.totalQuestions}</h4><p>Total Questions</p></div>
                            <div className="dashboard-stat-item pink"><h4>{analysisResult.modules}</h4><p>Modules</p></div>
                            <div className="dashboard-stat-item green"><h4>{analysisResult.chapters}</h4><p>Chapters</p></div>
                            <div className="dashboard-stat-item orange"><h4>{analysisResult.keyConcepts}</h4><p>Key Concepts</p></div>
                        </div>
                        <div className="dashboard-detected-modules">
                            <h5>Detected Modules:</h5>
                            <div className="dashboard-tags">{analysisResult.detectedModules.map(mod => <span key={mod}>{mod}</span>)}</div>
                        </div>
                        <div className="dashboard-difficulty">
                            <h5>Difficulty Distribution:</h5>
                            <div className="dashboard-difficulty-bar"><p>Easy</p><div className="dashboard-bar"><div className="dashboard-bar-fill easy" style={{width: `${(analysisResult.difficulty.easy / totalDifficulty) * 100}%`}}></div></div><span>{analysisResult.difficulty.easy}</span></div>
                            <div className="dashboard-difficulty-bar"><p>Medium</p><div className="dashboard-bar"><div className="dashboard-bar-fill medium" style={{width: `${(analysisResult.difficulty.medium / totalDifficulty) * 100}%`}}></div></div><span>{analysisResult.difficulty.medium}</span></div>
                            <div className="dashboard-difficulty-bar"><p>Hard</p><div className="dashboard-bar"><div className="dashboard-bar-fill hard" style={{width: `${(analysisResult.difficulty.hard / totalDifficulty) * 100}%`}}></div></div><span>{analysisResult.difficulty.hard}</span></div>
                        </div>
                        <button className="dashboard-start-learning-btn" onClick={() => setIsModalOpen(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            Start Your Learning Journey
                        </button>
                    </div>
                )}
            </div>
          </div>
        </main>
    </div>
  );

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-content">
        <header className="dashboard-top-header">
            <div className="dashboard-page-logo">
                <img src="https://img.icons8.com/nolan/64/brain.png" alt="LearnAI Pro Logo" className="dashboard-logo-icon" />
                <div className="dashboard-logo-text">
                    <span>LearnAI Pro</span>
                    <small>Intelligent Learning Platform</small>
                </div>
            </div>
            
            <nav className="dashboard-tabs-nav">
                <button className={`dashboard-tab ${activeTab === 'upload' ? 'active' : ''}`} onClick={() => setActiveTab('upload')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                    <span>Upload</span>
                </button>
                <button className={`dashboard-tab ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m18.7 8-5.1 5.2-4-4L3 15.9"/></svg>
                    <span>Analytics</span>
                </button>
                <button className={`dashboard-tab ${activeTab === 'materials' ? 'active' : ''}`} onClick={() => setActiveTab('materials')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    <span>Materials</span>
                </button>
                <button className="dashboard-tab learn-tab" onClick={() => navigate('/learn')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18"/><path d="m18 9-6-6-6 6"/></svg>
                    <span>Learn</span>
                </button>
            </nav>
        </header>
        
        <div className="dashboard-tab-content">
            {activeTab === 'upload' && renderUploadTab()}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'materials' && <UploadedMaterials />}
        </div>
      </div>

      <RedirectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRedirect={handleRedirect}
      />
    </div>
  );
};

export default Dashboard;
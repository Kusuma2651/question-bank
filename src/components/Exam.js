import React from 'react';
import { useState, useEffect, useRef } from 'react';
import '../styles/Exam.css';

// Data for the 3 questions shown in the screenshots
const examQuestions = [
    {
        id: 1,
        question: "What is the derivative of f(x) = x³ + 2x² - 5x + 3?",
        options: [
            { id: 'A', text: '3x³ + 4x - 5' },
            { id: 'B', text: 'x³ + 4x - 5' },
            { id: 'C', text: '3x² + 4x - 5' },
            { id: 'D', text: '3x + 4x - 5' }
        ],
        correctAnswer: 'C',
        topic: 'Derivatives',
        difficulty: 'medium',
    },
    {
        id: 2,
        question: "What is the limit of (sin x)/x as x approaches 0?",
        options: [
            { id: 'A', text: '0' },
            { id: 'B', text: '1' },
            { id: 'C', text: 'undefined' },
            { id: 'D', text: '∞' }
        ],
        correctAnswer: 'B',
        topic: 'Limits',
        difficulty: 'hard',
    },
    {
        id: 3,
        question: "What is the integral of 2x dx?",
        options: [
            { id: 'A', text: 'x² + C' },
            { id: 'B', text: '2x² + C' },
            { id: 'C', text: 'x²/2 + C' },
            { id: 'D', text: '2x + C' }
        ],
        correctAnswer: 'A',
        topic: 'Integration',
        difficulty: 'easy',
    },
];

const TOTAL_TIME = 30 * 60; // 30 minutes in seconds

const Exam = ({ onExitExam }) => {
    const [examState, setExamState] = useState('landing'); // 'landing', 'active', 'results'
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({}); // e.g. {1: 'A', 2: 'C'}
    const [flagged, setFlagged] = useState([]); // e.g. [1, 3]
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    const [results, setResults] = useState(null);
    const [expandedItem, setExpandedItem] = useState(null); // For accordion in results

    const timerRef = useRef(null);

    // --- TIMER LOGIC ---
    useEffect(() => {
        if (examState === 'active') {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        handleSubmitExam();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [examState]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    // --- EXAM HANDLERS ---
    const handleStartExam = () => {
        setExamState('active');
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setFlagged([]);
        setTimeLeft(TOTAL_TIME);
    };

    const handleSelectAnswer = (questionId, optionId) => {
        setUserAnswers(prev => ({ ...prev, [questionId]: optionId }));
    };

    const handleNavigate = (index) => {
        if (index >= 0 && index < examQuestions.length) {
            setCurrentQuestionIndex(index);
        }
    };
    
    const handleToggleFlag = (questionId) => {
        setFlagged(prev => 
            prev.includes(questionId) 
            ? prev.filter(id => id !== questionId) 
            : [...prev, questionId]
        );
    };

    const handleSubmitExam = () => {
        clearInterval(timerRef.current);
        let correctCount = 0;
        let incorrectCount = 0;

        examQuestions.forEach(q => {
            if (userAnswers[q.id] === q.correctAnswer) {
                correctCount++;
            } else if (userAnswers[q.id]) {
                incorrectCount++;
            }
        });

        const unansweredCount = examQuestions.length - (correctCount + incorrectCount);
        const score = Math.round((correctCount / examQuestions.length) * 100);

        setResults({ correctCount, incorrectCount, unansweredCount, score });
        setExamState('results');
    };
    
    const handleRetakeExam = () => {
        setResults(null);
        setExpandedItem(null);
        setExamState('landing');
    };

    const handleToggleExpand = (id) => {
        setExpandedItem(prev => (prev === id ? null : id));
    };

    // --- RENDER FUNCTIONS ---
    const renderLandingPage = () => (
        <div className="exam-wrapper exam-landing">
            <header className="exam-header-simple">
                 <img src="https://i.imgur.com/JzW6g4U.png" alt="LearnAI Pro Logo" className="exam-logo-icon" />
                <span className="exam-logo-text">LearnAI Pro</span>
            </header>
            <main className="exam-main-content centered">
                <div className="exam-landing-content">
                    <div className="exam-icon-container trophy">
                       <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 1h-17A1.5 1.5 0 0 0 2 2.5v11A1.5 1.5 0 0 0 3.5 15H5v3.5a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5V15h1.5a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 20.5 1zM18 13h-2v1.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5V13H6V3h12v10z"></path><path d="M10 6h4v4h-4z"></path></svg>
                    </div>

                    <h1 className="exam-title">Practice Examination</h1>
                    <p className="exam-subtitle">Test your knowledge with a comprehensive exam covering all the topics from your question bank. Get detailed performance analytics and identify areas for improvement.</p>
                    
                    <div className="exam-info-card">
                        <div className="info-item">
                            <div className="info-icon smart-questions">
                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                            </div>
                            <h3>Smart Questions</h3>
                            <p>{examQuestions.length} carefully selected questions</p>
                        </div>
                        <div className="info-item">
                            <div className="info-icon time-limit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                            </div>
                            <h3>Time Limit</h3>
                            <p>{TOTAL_TIME / 60} minutes to complete</p>
                        </div>
                        <div className="info-item">
                             <div className="info-icon detailed-analytics">
                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m18.7 8-5.1 5.2-4-4L3 15.9"/></svg>
                            </div>
                            <h3>Detailed Analytics</h3>
                            <p>Performance insights & recommendations</p>
                        </div>
                        <div className="exam-instructions">
                            <h4>Exam Instructions:</h4>
                            <ul>
                                <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>You have {TOTAL_TIME / 60} minutes to complete all questions.</li>
                                <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>You can navigate between questions and change your answers.</li>
                                <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>Flag questions for review if you're unsure.</li>
                                <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>Submit your exam when ready or when time expires.</li>
                            </ul>
                        </div>
                    </div>
                    <button className="exam-start-btn" onClick={handleStartExam}>Start Examination</button>
                    <button className="exam-back-btn" onClick={onExitExam}>Back to Learning</button>
                </div>
            </main>
        </div>
    );

    const renderActiveExam = () => {
        const currentQuestion = examQuestions[currentQuestionIndex];
        const answeredCount = Object.keys(userAnswers).length;

        return (
            <div className="exam-wrapper exam-active">
                <header className="exam-header-active">
                    <div className="exam-logo-container">
                        <img src="https://i.imgur.com/JzW6g4U.png" alt="LearnAI Pro Logo" className="exam-logo-icon" />
                        <span className="exam-logo-text">LearnAI Pro</span>
                    </div>
                    <div className="exam-status-container">
                        <span className="exam-timer">{formatTime(timeLeft)}</span>
                        <span className="exam-answered-count">{answeredCount}/{examQuestions.length} Answered</span>
                    </div>
                </header>
                <div className="exam-content-layout">
                    <aside className="question-navigation-panel">
                        <h3>Question Navigation</h3>
                        <div className="question-progress">
                            <div className="progress-bar-background">
                                <div className="progress-bar-fill" style={{width: `${(answeredCount / examQuestions.length) * 100}%`}}></div>
                            </div>
                            <p>{answeredCount} of {examQuestions.length} completed</p>
                        </div>
                        <div className="question-grid">
                            {examQuestions.map((q, index) => (
                                <button
                                    key={q.id}
                                    className={`
                                        question-nav-btn 
                                        ${currentQuestionIndex === index ? 'current' : ''} 
                                        ${userAnswers[q.id] ? 'answered' : ''}
                                    `}
                                    onClick={() => handleNavigate(index)}
                                >
                                    {flagged.includes(q.id) && <span className="flag-icon-nav">🚩</span>}
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <div className="question-nav-legend">
                           <div><span className="legend-box answered"></span> Answered</div>
                           <div><span className="legend-box current"></span> Current</div>
                           <div><span className="legend-box not-answered"></span> Not Answered</div>
                           <div><span className="legend-box flagged">🚩</span> Flagged</div>
                        </div>
                    </aside>
                    <main className="question-display-panel">
                        <div className="question-header">
                            <h2>Question {currentQuestionIndex + 1} of {examQuestions.length}</h2>
                            <div className="question-tags">
                                <span className={`tag-difficulty ${currentQuestion.difficulty}`}>{currentQuestion.difficulty}</span>
                                <span className="tag-topic">{currentQuestion.topic}</span>
                            </div>
                        </div>
                        <p className="question-text">{currentQuestion.question}</p>
                        <div className="question-options">
                            {currentQuestion.options.map(opt => (
                                <div
                                    key={opt.id}
                                    className={`option-card ${userAnswers[currentQuestion.id] === opt.id ? 'selected' : ''}`}
                                    onClick={() => handleSelectAnswer(currentQuestion.id, opt.id)}
                                >
                                    <span className="option-letter">{opt.id}</span>
                                    <p>{opt.text}</p>
                                </div>
                            ))}
                        </div>
                        <div className="question-footer">
                            <label className="flag-checkbox">
                                <input 
                                    type="checkbox" 
                                    checked={flagged.includes(currentQuestion.id)}
                                    onChange={() => handleToggleFlag(currentQuestion.id)}
                                />
                                <span className="flag-icon">🚩</span> Flag for Review
                            </label>
                            <div className="navigation-buttons">
                                <button 
                                    className="exam-nav-btn previous" 
                                    onClick={() => handleNavigate(currentQuestionIndex - 1)}
                                    disabled={currentQuestionIndex === 0}
                                >
                                    ← Previous
                                </button>
                                {currentQuestionIndex < examQuestions.length - 1 ? (
                                    <button className="exam-nav-btn next" onClick={() => handleNavigate(currentQuestionIndex + 1)}>
                                        Next →
                                    </button>
                                ) : (
                                    <button className="exam-nav-btn submit" onClick={handleSubmitExam}>
                                        Submit Exam
                                    </button>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    };

    const renderResultsPage = () => {
         if (!results) return null;
         const { correctCount, incorrectCount, unansweredCount, score } = results;

         return (
            <div className="exam-wrapper exam-results">
                 <header className="exam-header-simple results-header">
                     <div className="results-logo-container">
                        <img src="https://i.imgur.com/JzW6g4U.png" alt="LearnAI Pro Logo" className="exam-logo-icon" />
                        <div>
                            <span className="exam-logo-text">LearnAI Pro</span>
                            <span className="exam-results-subtitle">Exam Results</span>
                        </div>
                     </div>
                     <div className="results-header-actions">
                        <button className="exam-back-btn" onClick={onExitExam}>← Back to Learning</button>
                        <button className="results-action-btn retake-header" onClick={handleRetakeExam}>Retake Exam</button>
                     </div>
                 </header>
                 <main className="exam-main-content centered">
                    <div className="results-content">
                        <div className="results-icon-container">
                            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="50" fill="#FCE8E7"/>
                                <circle cx="50" cy="50" r="40" fill="#F8BDBD"/>
                                <circle cx="50" cy="50" r="30" fill="#F28B82"/>
                                <circle cx="50" cy="50" r="12" fill="white"/>
                            </svg>
                        </div>
                        <h1 className="results-title">Exam <span className="keep-learning">Keep Learning!</span></h1>
                        <p className="results-subtitle">Don't worry! Use this as a learning opportunity to strengthen your knowledge.</p>
                        
                        <div className="score-summary">
                            <span>Score: {score}%</span>
                            <span>{correctCount}/{examQuestions.length} Correct</span>
                        </div>

                        <div className="results-layout">
                            <aside className="performance-overview-panel">
                                <div className="panel-header">
                                    <div className="panel-icon-bg purple-bg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10M18 20V4M6 20V16"/></svg>
                                    </div>
                                    <h3>Performance Overview</h3>
                                </div>
                                <div className="overview-item">
                                    <p>Correct Answers</p>
                                    <div className="overview-count correct">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>
                                        <span>{correctCount}</span>
                                    </div>
                                </div>
                                <div className="overview-item">
                                    <p>Incorrect Answers</p>
                                    <div className="overview-count incorrect">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                                        <span>{incorrectCount}</span>
                                    </div>
                                </div>
                                <div className="overview-item">
                                    <p>Unanswered</p>
                                    <div className="overview-count unanswered">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                                        <span>{unansweredCount}</span>
                                    </div>
                                </div>
                                <div className="score-breakdown">
                                    <h4>Score Breakdown</h4>
                                    <div className="breakdown-bar-container">
                                        <div className="breakdown-bar-fill" style={{ width: `${score}%` }}></div>
                                    </div>
                                    <p>Correct ({correctCount}) <span className="breakdown-percent">{score}%</span></p>
                                </div>
                            </aside>

                            <main className="question-review-panel">
                                <div className="panel-header">
                                    <div className="panel-icon-bg pink-bg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><path d="M2 9a3 3 0 0 1 3-3h1a2 2 0 0 1 2 2 2 2 0 0 1-2 2H5a3 3 0 0 1-3-3z"/></svg>
                                    </div>
                                    <h3>Question Review</h3>
                                </div>
                                <div className="review-list">
                                    {examQuestions.map((q, index) => {
                                        const userAnswer = userAnswers[q.id];
                                        const isCorrect = userAnswer === q.correctAnswer;
                                        const isAnswered = userAnswer !== undefined;
                                        const isExpanded = expandedItem === q.id;
                                        const topicClass = q.topic.toLowerCase();
                                        
                                        return (
                                            <div key={q.id} className="review-item" onClick={() => handleToggleExpand(q.id)}>
                                                <div className="review-item-header">
                                                    <div className="review-item-info">
                                                        <span className={`review-item-number ${q.difficulty}`}>{index + 1}</span>
                                                        <span className={`tag-difficulty small ${q.difficulty}`}>{q.difficulty}</span>
                                                        <span className={`review-item-topic ${topicClass}`}>{q.topic}</span>
                                                    </div>
                                                    <button className="review-item-status-btn">
                                                        {isAnswered ? 
                                                            (isCorrect ? <span className="status-icon correct">✓</span> : <span className="status-icon incorrect">×</span>)
                                                            : <span className="status-icon unanswered">!</span>
                                                        }
                                                    </button>
                                                </div>
                                                <p className="review-item-question">{q.question}</p>
                                                {isExpanded && (
                                                    <div className="review-item-details">
                                                        <p className="review-item-answer">Your answer: <strong>{isAnswered ? (q.options.find(o => o.id === userAnswer)?.text || 'Invalid') : 'unanswered'}</strong></p>
                                                        {!isCorrect && <p className="review-item-correct-answer">Correct answer: <strong>{q.options.find(o => o.id === q.correctAnswer).text}</strong></p>}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </main>
                        </div>

                        <div className="results-footer">
                            <button className="results-action-btn continue" onClick={onExitExam}>Continue Learning</button>
                            <button className="results-action-btn retake" onClick={handleRetakeExam}>Retake Exam</button>
                        </div>
                    </div>
                 </main>
             </div>
         );
    }
    
    // Main render logic
    switch (examState) {
        case 'active':
            return renderActiveExam();
        case 'results':
            return renderResultsPage();
        case 'landing':
        default:
            return renderLandingPage();
    }
};

export default Exam;
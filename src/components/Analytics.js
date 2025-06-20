import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import '../styles/Analytics.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [timeFilter, setTimeFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [showAllExams, setShowAllExams] = useState(false);
  const [showAllConcepts, setShowAllConcepts] = useState(false);
  const [activePerformanceTab, setActivePerformanceTab] = useState('score');
  const [selectedConcept, setSelectedConcept] = useState(null);

  // Performance test data with subject and date information
  const allPerformanceTestData = [
    { label: 'Test 1', value: 85, date: '2023-05-10', subject: 'Calculus' },
    { label: 'Test 2', value: 78, date: '2023-05-15', subject: 'Linear Algebra' },
    { label: 'Test 3', value: 92, date: '2023-06-01', subject: 'Calculus' },
    { label: 'Test 4', value: 65, date: '2023-06-05', subject: 'Statistics' },
    { label: 'Test 5', value: 88, date: '2023-06-10', subject: 'Calculus' },
    { label: 'Test 6', value: 72, date: '2023-06-15', subject: 'Linear Algebra' },
    { label: 'Test 7', value: 95, date: '2023-06-20', subject: 'Calculus' },
    { label: 'Test 8', value: 68, date: '2023-06-25', subject: 'Statistics' },
    { label: 'Test 9', value: 82, date: '2023-07-01', subject: 'Linear Algebra' },
    { label: 'Test 10', value: 53, date: '2023-07-05', subject: 'Statistics' },
    { label: 'Test 11', value: 91, date: '2023-07-10', subject: 'Calculus' },
    { label: 'Test 12', value: 97, date: '2023-07-15', subject: 'Calculus' },
    { label: 'Test 13', value: 60, date: '2023-07-20', subject: 'Linear Algebra' },
    { label: 'Test 14', value: 75, date: '2023-07-25', subject: 'Statistics' },
    { label: 'Test 15', value: 89, date: '2023-08-01', subject: 'Calculus' },
    { label: 'Test 16', value: 50, date: '2023-08-05', subject: 'Statistics' },
    { label: 'Test 17', value: 83, date: '2023-08-10', subject: 'Linear Algebra' },
    { label: 'Test 18', value: 70, date: '2023-08-15', subject: 'Statistics' },
    { label: 'Test 19', value: 97, date: '2023-08-20', subject: 'Calculus' },
    { label: 'Test 20', value: 58, date: '2023-08-25', subject: 'Linear Algebra' }
  ].map(test => ({
    ...test,
    color: test.value >= 85 ? '#10B981' : test.value >= 70 ? '#F59E0B' : '#EF4444'
  }));

  // Sample exam data
  const examData = [
    {
      id: 1,
      title: "Calculus Midterm Exam",
      date: "2023-05-15",
      score: 85,
      totalQuestions: 50,
      timeSpent: "45:22",
      subjects: ["Calculus"],
      concepts: [
        { name: "Derivatives", correct: 12, total: 15, strength: true },
        { name: "Integrals", correct: 18, total: 20, strength: true },
        { name: "Limits", correct: 8, total: 15, weakness: true }
      ],
      performance: [65, 72, 80, 85, 90, 85, 88]
    },
    {
      id: 2,
      title: "Linear Algebra Final",
      date: "2023-06-20",
      score: 78,
      totalQuestions: 60,
      timeSpent: "58:14",
      subjects: ["Linear Algebra"],
      concepts: [
        { name: "Vectors", correct: 15, total: 20, strength: true },
        { name: "Matrices", correct: 12, total: 20 },
        { name: "Eigenvalues", correct: 10, total: 20, weakness: true }
      ],
      performance: [60, 65, 70, 75, 72, 78, 80]
    },
    {
      id: 3,
      title: "Comprehensive Math Test",
      date: "2023-07-10",
      score: 92,
      totalQuestions: 75,
      timeSpent: "1:05:43",
      subjects: ["Calculus", "Linear Algebra", "Statistics"],
      concepts: [
        { name: "Derivatives", correct: 20, total: 20, strength: true },
        { name: "Probability", correct: 18, total: 20, strength: true },
        { name: "Hypothesis Testing", correct: 12, total: 15 },
        { name: "Matrix Operations", correct: 15, total: 20 }
      ],
      performance: [75, 80, 85, 88, 90, 92, 95]
    }
  ];

  // Filter performance test data based on selected filters
  const filterPerformanceTestData = () => {
    return allPerformanceTestData.filter(test => {
      const timeMatch = timeFilter === 'all' ||
        (timeFilter === 'recent' && new Date(test.date) > new Date('2023-06-01')) ||
        (timeFilter === 'older' && new Date(test.date) <= new Date('2023-06-01'));

      const subjectMatch = subjectFilter === 'all' ||
        test.subject === subjectFilter;

      const difficultyMatch = difficultyFilter === 'all' ||
        (difficultyFilter === 'high' && test.value >= 85) ||
        (difficultyFilter === 'medium' && test.value >= 70 && test.value < 85) ||
        (difficultyFilter === 'low' && test.value < 70);

      return timeMatch && subjectMatch && difficultyMatch;
    });
  };

  const performanceTestData = filterPerformanceTestData();

  // Filter exams based on filters
  const filteredExams = examData.filter(exam => {
    const timeMatch = timeFilter === 'all' ||
      (timeFilter === 'recent' && new Date(exam.date) > new Date('2023-06-01')) ||
      (timeFilter === 'older' && new Date(exam.date) <= new Date('2023-06-01'));

    const subjectMatch = subjectFilter === 'all' ||
      exam.subjects.includes(subjectFilter);

    const difficultyMatch = difficultyFilter === 'all' ||
      (difficultyFilter === 'high' && exam.score >= 85) ||
      (difficultyFilter === 'medium' && exam.score >= 70 && exam.score < 85) ||
      (difficultyFilter === 'low' && exam.score < 70);

    return timeMatch && subjectMatch && difficultyMatch;
  });

  // Calculate aggregates based on filtered data
  const totalExams = filteredExams.length;
  const avgScore = totalExams > 0 ? Math.round(
    filteredExams.reduce((sum, exam) => sum + exam.score, 0) / totalExams
  ) : 0;
  const totalQuestions = filteredExams.reduce((sum, exam) => sum + exam.totalQuestions, 0);
  const totalTime = filteredExams.reduce((sum, exam) => {
    const timeParts = exam.timeSpent.split(':').map(Number);
    let seconds = 0;
    if (timeParts.length === 2) {
      const [mins, secs] = timeParts;
      seconds = mins * 60 + secs;
    } else if (timeParts.length === 3) {
      const [hours, mins, secs] = timeParts;
      seconds = hours * 3600 + mins * 60 + secs;
    }
    return sum + seconds;
  }, 0);
  const totalTimeFormatted = totalExams > 0 ? `${Math.floor(totalTime / 3600)}h ${Math.floor((totalTime % 3600) / 60)}m` : '0h 0m';

  // Concept performance analysis based on filtered exams
  const conceptPerformance = {};
  filteredExams.forEach(exam => {
    exam.concepts.forEach(concept => {
      if (!conceptPerformance[concept.name]) {
        conceptPerformance[concept.name] = { correct: 0, total: 0, exams: [] };
      }
      conceptPerformance[concept.name].correct += concept.correct;
      conceptPerformance[concept.name].total += concept.total;
      conceptPerformance[concept.name].exams.push({
        examTitle: exam.title,
        examDate: exam.date,
        score: Math.round((concept.correct / concept.total) * 100)
      });
    });
  });

  // Convert to array and calculate percentages
  const conceptAnalysis = Object.entries(conceptPerformance).map(([name, data]) => ({
    name,
    correct: data.correct,
    total: data.total,
    percentage: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
    exams: data.exams
  }));

  // Sort by percentage
  conceptAnalysis.sort((a, b) => b.percentage - a.percentage);

  // Get top strengths and weaknesses
  const strengths = conceptAnalysis.slice(0, 3);
  const weaknesses = [...conceptAnalysis].reverse().slice(0, 3);

  // Performance chart data - modified for bar chart
  const performanceChartData = {
    labels: performanceTestData.map(item => item.label),
    datasets: [
      {
        label: 'Performance Test Results',
        data: performanceTestData.map(item => item.value),
        backgroundColor: performanceTestData.map(item => item.color),
        borderColor: performanceTestData.map(item => item.color),
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  };

  const performanceChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.parsed.y}%`;
          }
        }
      },
      title: {
        display: true,
        text: 'Test Scores Distribution',
        font: {
          size: 16
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Test Number',
          font: {
            weight: 'bold'
          }
        },
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        title: {
          display: true,
          text: 'Score (%)',
          font: {
            weight: 'bold'
          }
        },
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    },
    maintainAspectRatio: false
  };

  // Concept details modal
  const ConceptDetailsModal = ({ concept, onClose }) => {
    if (!concept) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>{concept.name} Details</h3>
            <button onClick={onClose} className="close-button">
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="concept-summary">
              <div className="summary-item">
                <span>Mastery Level</span>
                <div className={`mastery-badge ${concept.percentage >= 80 ? 'high' : concept.percentage >= 60 ? 'medium' : 'low'}`}>
                  {concept.percentage}%
                </div>
              </div>
              <div className="summary-item">
                <span>Questions Correct</span>
                <strong>{concept.correct}/{concept.total}</strong>
              </div>
            </div>

            <div className="performance-chart-container">
              <h4>Performance Over Exams</h4>
              <div className="mini-chart">
                <Line 
                  data={{
                    labels: concept.exams.map(exam => exam.examTitle),
                    datasets: [{
                      label: 'Score',
                      data: concept.exams.map(exam => exam.score),
                      borderColor: concept.percentage >= 80 ? '#10B981' : concept.percentage >= 60 ? '#F59E0B' : '#EF4444',
                      backgroundColor: 'rgba(255, 255, 255, 0)',
                      tension: 0.3
                    }]
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="exam-performance">
              <h4>Exam Performance</h4>
              <div className="exam-list">
                {concept.exams.map((exam, index) => (
                  <div key={index} className="exam-item">
                    <div className="exam-info">
                      <h5>{exam.examTitle}</h5>
                      <span>{exam.examDate}</span>
                    </div>
                    <div className={`exam-score ${exam.score >= 85 ? 'high' : exam.score >= 70 ? 'medium' : 'low'}`}>
                      {exam.score}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="analytics-dashboard">
      <div className="dashboard-header">
        <h1>Exam Performance Analytics</h1>
        <p>Detailed insights into your exam results and concept mastery</p>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Time Period:</label>
          <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
            <option value="all">All Time</option>
            <option value="recent">Recent (Last 2 Months)</option>
            <option value="older">Older</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Subject:</label>
          <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
            <option value="all">All Subjects</option>
            <option value="Calculus">Calculus</option>
            <option value="Linear Algebra">Linear Algebra</option>
            <option value="Statistics">Statistics</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Performance:</label>
          <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
            <option value="all">All Levels</option>
            <option value="high">High (85%+)</option>
            <option value="medium">Medium (70-84%)</option>
            <option value="low">Low (&lt;70%)</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card exams-card">
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <div className="card-content">
            <h3>{totalExams}</h3>
            <p>Exams Completed</p>
          </div>
        </div>
        <div className="summary-card score-card">
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <div className="card-content">
            <h3>{avgScore}%</h3>
            <p>Average Score</p>
          </div>
        </div>
        <div className="summary-card questions-card">
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div className="card-content">
            <h3>{totalQuestions}</h3>
            <p>Questions Attempted</p>
          </div>
        </div>
        <div className="summary-card time-card">
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div className="card-content">
            <h3>{totalTimeFormatted}</h3>
            <p>Total Time Spent</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="analytics-content">
        {/* Left Column */}
        <div className="analytics-left">
          {/* Performance Test Graph */}
          <div className="analytics-card performance-card">
            <div className="card-header">
              <h3>Performance Test Results</h3>
              <span className="filter-info">
                Showing {performanceTestData.length} tests
              </span>
            </div>
            <div className="chart-container" style={{ height: '300px' }}>
              {performanceTestData.length > 0 ? (
                <Bar data={performanceChartData} options={performanceChartOptions} />
              ) : (
                <div className="no-data-message">
                  No performance test data available for the selected filters
                </div>
              )}
            </div>
            <div className="chart-footer">
              <div className="color-indicators">
                <div className="indicator-item">
                  <div className="color-box high"></div>
                  <span>85-100% (Excellent)</span>
                </div>
                <div className="indicator-item">
                  <div className="color-box medium"></div>
                  <span>70-84% (Good)</span>
                </div>
                <div className="indicator-item">
                  <div className="color-box low"></div>
                  <span>0-69% (Needs Improvement)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Exam List */}
          <div className="analytics-card exams-list-card">
            <div className="card-header">
              <h3>Recent Exams</h3>
              <button 
                className="view-all" 
                onClick={() => setShowAllExams(!showAllExams)}
              >
                {showAllExams ? 'Show Less' : 'View All'}
              </button>
            </div>
            <div className="exam-list">
              {filteredExams.length > 0 ? (
                (showAllExams ? filteredExams : filteredExams.slice(0, 3)).map(exam => (
                  <div key={exam.id} className="exam-item">
                    <div className="exam-info">
                      <h4>{exam.title}</h4>
                      <div className="exam-meta">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          {new Date(exam.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                          </svg>
                          {exam.totalQuestions} questions
                        </span>
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          {exam.timeSpent}
                        </span>
                      </div>
                    </div>
                    <div className="exam-score">
                      <div 
                        className={`score-circle ${exam.score >= 85 ? 'high' : exam.score >= 70 ? 'medium' : 'low'}`}
                        style={{ 
                          background: `conic-gradient(currentColor ${exam.score}%, #E5E7EB ${exam.score}%)`
                        }}
                      >
                        <span>{exam.score}%</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-data-message">
                  No exams available for the selected filters
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="analytics-right">
          {/* Strengths & Weaknesses */}
          <div className="analytics-card sw-card">
            <div className="card-header">
              <h3>Strengths & Weaknesses</h3>
            </div>
            <div className="sw-container">
              <div className="strengths">
                <h4>Top Strengths</h4>
                {strengths.length > 0 ? (
                  strengths.map((concept, index) => (
                    <div key={index} className="sw-item">
                      <div className="sw-progress">
                        <div 
                          className="sw-progress-bar" 
                          style={{ width: `${concept.percentage}%` }}
                        ></div>
                      </div>
                      <div className="sw-details">
                        <span>{concept.name}</span>
                        <strong>{concept.percentage}%</strong>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-data-message small">
                    No strength data available
                  </div>
                )}
              </div>
              <div className="weaknesses">
                <h4>Top Weaknesses</h4>
                {weaknesses.length > 0 ? (
                  weaknesses.map((concept, index) => (
                    <div key={index} className="sw-item">
                      <div className="sw-progress">
                        <div 
                          className="sw-progress-bar" 
                          style={{ width: `${concept.percentage}%` }}
                        ></div>
                      </div>
                      <div className="sw-details">
                        <span>{concept.name}</span>
                        <strong>{concept.percentage}%</strong>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-data-message small">
                    No weakness data available
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Concept Mastery */}
          <div className="analytics-card mastery-card">
            <div className="card-header">
              <h3>Concept Mastery</h3>
              <button 
                className="view-all" 
                onClick={() => setShowAllConcepts(!showAllConcepts)}
              >
                {showAllConcepts ? 'Show Less' : 'Details'}
              </button>
            </div>
            <div className="concept-mastery">
              {conceptAnalysis.length > 0 ? (
                (showAllConcepts ? conceptAnalysis : conceptAnalysis.slice(0, 5)).map((concept, index) => (
                  <div 
                    key={index} 
                    className="concept-item"
                    onClick={() => setSelectedConcept(concept)}
                  >
                    <div className="concept-info">
                      <span className="concept-name">{concept.name}</span>
                      <span className="concept-stats">{concept.correct}/{concept.total}</span>
                    </div>
                    <div className="concept-progress">
                      <div 
                        className={`progress-bar ${concept.percentage >= 80 ? 'high' : concept.percentage >= 60 ? 'medium' : 'low'}`}
                        style={{ width: `${concept.percentage}%` }}
                      ></div>
                    </div>
                    <div className={`concept-percentage ${concept.percentage >= 80 ? 'high' : concept.percentage >= 60 ? 'medium' : 'low'}`}>
                      {concept.percentage}%
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-data-message">
                  No concept mastery data available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Concept Details Modal */}
      <ConceptDetailsModal 
        concept={selectedConcept} 
        onClose={() => setSelectedConcept(null)} 
      />
    </div>
  );
};

export default Analytics;
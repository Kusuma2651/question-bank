import React, { useState, useEffect } from 'react';
import '../styles/Learn.css';
import Exam from './Exam'; 

// --- NEW IMPORTS ---
import Whiteboard from './Whiteboard'; // <-- IMPORT THE WHITEBOARD
import { whiteboardContent } from '../data/explanationData.js'; // <-- Import whiteboard data to find valid topics

// --- EXPANDED DYNAMIC QUIZ DATA (NOW COVERS ALL TOPICS) ---
const quizDataByTopic = {
  // --- CALCULUS ---
  derivative_power_rule: {
    name: 'Derivative Power Rule',
    keywords: ['derivative', 'power rule', 'differentiate'],
    questions: [
      { id: 1, difficulty: 'MEDIUM', question: "What is the derivative of f(x) = x³ + 2x²?", options: [{ id: 'A', text: '3x² + 4x' }, { id: 'B', text: 'x² + 4x' }, { id: 'C', 'text': '3x + 4' }], correctAnswer: 'A',
        explanation: { answer: "Apply the power rule to each term: d/dx(x³) = 3x² and d/dx(2x²) = 4x. The sum is 3x² + 4x.", keyConcepts: ["Power rule: d/dx(xⁿ) = nxⁿ⁻¹", "Sum Rule"], relatedTopics: ["Chain Rule", "Integration"] }
      }
    ]
  },
  integration_by_parts: {
    name: 'Integration by Parts',
    keywords: ['integration', 'parts', 'integral'],
    questions: [
      { id: 1, difficulty: 'HARD', question: 'Which of the following is the correct formula for Integration by Parts?', options: [{ id: 'A', text: '∫u dv = uv - ∫v du' }, { id: 'B', text: '∫u dv = uv + ∫v du' }], correctAnswer: 'A',
        explanation: { answer: "The formula is ∫u dv = uv - ∫v du. It's used for integrating a product of two functions.", keyConcepts: ["Integration by Parts Formula", "Product Rule for Integration"], relatedTopics: ["Definite Integrals", "U-Substitution"] }
      }
    ]
  },
  limits: {
    name: "Limits",
    keywords: ['limit'],
    questions: [
      { id: 1, difficulty: 'EASY', question: 'What is the limit of f(x) = 2x + 3 as x approaches 2?', options: [{ id: 'A', text: '7' }, { id: 'B', text: '5' }], correctAnswer: 'A',
        explanation: { answer: 'For continuous functions, you can use direct substitution. Substitute x=2 into 2x+3 to get 2(2)+3 = 7.', keyConcepts: ['Direct Substitution', 'Limit of a Function'], relatedTopics: ["Continuity", "Derivatives"] }
      }
    ]
  },
  chain_rule: {
    name: "Chain Rule",
    keywords: ['chain rule'],
    questions: [
      { id: 1, difficulty: 'MEDIUM', question: 'Find the derivative of f(x) = (2x+1)³.', options: [{ id: 'A', text: '3(2x+1)²' }, { id: 'B', text: '6(2x+1)²' }], correctAnswer: 'B',
        explanation: { answer: "Using the chain rule, you differentiate the 'outside' function (power of 3) and multiply by the derivative of the 'inside' function (2x+1). So, 3(2x+1)² * 2 = 6(2x+1)².", keyConcepts: ['Chain Rule', 'Derivative of Outer Function', 'Derivative of Inner Function'], relatedTopics: ["Product Rule", "Composite Functions"] }
      }
    ]
  },
  product_rule: {
    name: "Product Rule",
    keywords: ['product rule'],
    questions: [
      { id: 1, difficulty: 'MEDIUM', question: 'Derivative of x * sin(x)?', options: [{ id: 'A', text: 'sin(x) + xcos(x)' }, { id: 'B', text: 'cos(x)' }], correctAnswer: 'A',
        explanation: { answer: "Using the product rule f'g + fg', where f=x and g=sin(x). We get (1)sin(x) + (x)cos(x).", keyConcepts: ["Product Rule: f'g + fg'"], relatedTopics: ["Quotient Rule", "Trigonometric Derivatives"] }
      }
    ]
  },
  
  // --- MATH & STATISTICS ---
  linear_algebra: {
    name: "Linear Algebra",
    keywords: ['matrix', 'vector'],
    questions: [
      { id: 1, difficulty: 'EASY', question: 'What is the dimension of a 2x3 matrix?', options: [{ id: 'A', text: '2 rows, 3 columns' }, { id: 'B', text: '3 rows, 2 columns' }], correctAnswer: 'A',
        explanation: { answer: 'The dimensions of a matrix are always given as rows by columns (m x n).', keyConcepts: ['Matrix Dimensions', 'Rows and Columns'], relatedTopics: ["Determinants", "Matrix Multiplication"] }
      }
    ]
  },
  statistics_mean: {
    name: "Statistics: Mean",
    keywords: ['mean', 'average'],
    questions: [
      { id: 1, difficulty: 'EASY', question: 'What is the mean of the numbers 2, 4, and 6?', options: [{ id: 'A', text: '4' }, { id: 'B', text: '12' }], correctAnswer: 'A',
        explanation: { answer: 'To find the mean, sum the numbers and divide by the count of the numbers: (2+4+6)/3 = 12/3 = 4.', keyConcepts: ['Mean Calculation', 'Summation'], relatedTopics: ["Median", "Mode", "Standard Deviation"] }
      }
    ]
  },
  probability: {
    name: "Probability",
    keywords: ['probability', 'chance'],
    questions: [
      { id: 1, difficulty: 'EASY', question: 'What is the probability of flipping heads on a fair coin?', options: [{ id: 'A', text: '0.5' }, { id: 'B', text: '1' }], correctAnswer: 'A',
        explanation: { answer: 'There is 1 favorable outcome (heads) out of 2 possible outcomes (heads or tails). So, the probability is 1/2 or 0.5.', keyConcepts: ['Basic Probability', 'Favorable Outcomes', 'Total Outcomes'], relatedTopics: ["Conditional Probability", "Sample Space"] }
      }
    ]
  },
  geometry_area: {
    name: "Geometry: Area",
    keywords: ['area', 'geometry'],
    questions: [
      { id: 1, difficulty: 'EASY', question: 'What is the area of a square with a side length of 4 units?', options: [{ id: 'A', text: '16' }, { id: 'B', text: '8' }], correctAnswer: 'A',
        explanation: { answer: 'The area of a square is calculated by squaring the side length (side * side), so 4 * 4 = 16 square units.', keyConcepts: ['Area of a Square', 'Side Length'], relatedTopics: ["Perimeter", "Area of a Rectangle"] }
      }
    ]
  },
  pythagorean_theorem: {
    name: "Pythagorean Theorem",
    keywords: ['pythagorean', 'triangle'],
    questions: [
      { id: 1, difficulty: 'MEDIUM', question: 'In a right-angled triangle, if side a=3 and side b=4, what is the length of the hypotenuse (c)?', options: [{ id: 'A', text: '5' }, { id: 'B', 'text': '7' }], correctAnswer: 'A',
        explanation: { answer: 'According to the Pythagorean theorem, a² + b² = c². So, 3² + 4² = c², which is 9 + 16 = 25. The square root of 25 is 5.', keyConcepts: ["Pythagorean Theorem: a²+b²=c²", "Right-angled Triangle"], relatedTopics: ["Trigonometry", "Distance Formula"] }
      }
    ]
  },

  // --- UPSC Subjects ---
  history_1857_revolt: {
    name: "History: Revolt of 1857",
    keywords: ['history', '1857', 'revolt', 'mutiny'],
    questions: [
      { id: 1, difficulty: 'EASY', question: 'What was the immediate cause of the 1857 Revolt?', options: [
        { id: 'A', text: 'The introduction of the Enfield Rifle' },
        { id: 'B', text: 'The Doctrine of Lapse' }
      ], correctAnswer: 'A',
        explanation: { answer: "While the Doctrine of Lapse was a major political cause, the immediate trigger was the introduction of the Enfield Rifle, whose cartridges were greased with animal fat, offending both Hindu and Muslim sepoys.", keyConcepts: ['Immediate Cause vs. Long-term Causes', 'Sepoy Mutiny'], relatedTopics: ['Doctrine of Lapse', 'British Raj'] }
      }
    ]
  },
  geography_monsoon: {
    name: "Geography: Indian Monsoon",
    keywords: ['geography', 'monsoon', 'climate'],
    questions: [
      { id: 1, difficulty: 'MEDIUM', question: 'The South-West Monsoon in India is primarily caused by:', options: [
        { id: 'A', text: 'The Coriolis effect' },
        { id: 'B', text: 'The intense heating of the Tibetan Plateau' }
      ], correctAnswer: 'B',
        explanation: { answer: 'The intense heating of the Tibetan Plateau and the Indian subcontinent creates a strong low-pressure zone, which draws in moisture-laden winds from the high-pressure zone over the Indian Ocean.', keyConcepts: ['Differential Heating', 'Pressure Gradients'], relatedTopics: ['El Niño', 'Jet Streams'] }
      }
    ]
  },
  polity_preamble: {
    name: "Polity: Preamble",
    keywords: ['polity', 'preamble', 'constitution'],
    questions: [
      { id: 1, difficulty: 'MEDIUM', question: 'Which amendment added the words "SOCIALIST" and "SECULAR" to the Preamble?', options: [
        { id: 'A', text: '42nd Amendment' },
        { id: 'B', text: '44th Amendment' }
      ], correctAnswer: 'A',
        explanation: { answer: 'The 42nd Amendment Act of 1976, enacted during the Emergency, added the words "Socialist," "Secular," and "Integrity" to the Preamble.', keyConcepts: ['42nd Amendment (Mini-Constitution)', 'Preamble Ideals'], relatedTopics: ['Fundamental Rights', 'Directive Principles'] }
      }
    ]
  },
  economy_inflation: {
    name: "Economy: Inflation",
    keywords: ['economy', 'inflation'],
    questions: [
      { id: 1, difficulty: 'EASY', question: "A situation where there is 'too much money chasing too few goods' is known as:", options: [
        { id: 'A', text: 'Cost-Push Inflation' },
        { id: 'B', text: 'Demand-Pull Inflation' }
      ], correctAnswer: 'B',
        explanation: { answer: "Demand-Pull inflation occurs when aggregate demand in an economy is greater than the aggregate supply, leading to a rise in general price levels.", keyConcepts: ['Demand-Pull Inflation', 'Aggregate Demand'], relatedTopics: ['Monetary Policy', 'Fiscal Policy'] }
      }
    ]
  },
  environment_ramsar: {
    name: "Environment: Ramsar Sites",
    keywords: ['environment', 'ramsar', 'wetland'],
    questions: [
      { id: 1, difficulty: 'EASY', question: 'The Ramsar Convention is an international treaty for the conservation of:', options: [
        { id: 'A', text: 'Wetlands' },
        { id: 'B', text: 'Tropical Rainforests' }
      ], correctAnswer: 'A',
        explanation: { answer: "The Ramsar Convention, signed in Ramsar, Iran, in 1971, is an intergovernmental treaty that provides the framework for national action and international cooperation for the conservation and wise use of wetlands and their resources.", keyConcepts: ['Ramsar Convention', 'Wetland Conservation'], relatedTopics: ['Biodiversity', 'Montreux Record'] }
      }
    ]
  },
  biology_cell: {
    name: "Biology: The Animal Cell",
    keywords: ['biology', 'cell', 'organelle'],
    questions: [
      { id: 1, difficulty: 'EASY', question: "Which organelle is known as the 'powerhouse' of the cell?", options: [
        { id: 'A', text: 'Nucleus' },
        { id: 'B', text: 'Mitochondrion' }
      ], correctAnswer: 'B',
        explanation: { answer: "The mitochondrion is responsible for generating most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy. Hence, it's called the 'powerhouse'.", keyConcepts: ['Mitochondrion', 'ATP Synthesis', 'Cellular Respiration'], relatedTopics: ['Nucleus', 'Ribosome'] }
      }
    ]
  },

  // *** NEWLY ADDED QUIZ MODULES ***
  physics_newtons_laws: {
    name: "Physics: Newton's Laws",
    keywords: ['physics', 'newton', 'force', 'mass'],
    questions: [
      { id: 1, difficulty: 'EASY', question: "Newton's Second Law of Motion is represented by which formula?", options: [
        { id: 'A', text: 'E = mc²' },
        { id: 'B', text: 'F = ma' }
      ], correctAnswer: 'B',
        explanation: { answer: "F = ma states that the force (F) acting on an object is equal to the mass (m) of the object multiplied by its acceleration (a).", keyConcepts: ["Newton's Second Law", "Force, Mass, Acceleration"], relatedTopics: ["Newton's First Law", "Newton's Third Law", "Friction"] }
      }
    ]
  },
  chemistry_benzene_ring: {
    name: "Chemistry: Benzene",
    keywords: ['chemistry', 'benzene', 'aromatic'],
    questions: [
      { id: 1, difficulty: 'MEDIUM', question: "What is the key feature of a benzene ring that gives it stability?", options: [
        { id: 'A', text: 'Delocalized pi electrons' },
        { id: 'B', text: 'Localized single bonds' }
      ], correctAnswer: 'A',
        explanation: { answer: "The delocalization of pi electrons across the entire ring (resonance) spreads out the electron density, which makes the molecule very stable compared to a structure with fixed double bonds.", keyConcepts: ['Aromaticity', 'Delocalization', 'Resonance'], relatedTopics: ["Hückel's Rule", 'Organic Chemistry'] }
      }
    ]
  },
  language_english: {
    name: 'English: Parts of Speech',
    keywords: ['english', 'grammar', 'noun', 'verb'],
    questions: [
      { id: 1, difficulty: 'EASY', question: "In the sentence 'The quick brown fox jumps', what part of speech is 'jumps'?", options: [
        { id: 'A', text: 'Noun' },
        { id: 'B', text: 'Verb' }
      ], correctAnswer: 'B',
        explanation: { answer: "A verb is a word that describes an action or a state of being. 'Jumps' is the action being performed by the fox.", keyConcepts: ['Verb (Action Word)', 'Noun (Thing/Animal)'], relatedTopics: ['Adjectives', 'Adverbs'] }
      }
    ]
  },
  language_hindi: {
    name: 'Hindi: Basic Greetings',
    keywords: ['hindi', 'namaste'],
    questions: [
      { id: 1, difficulty: 'EASY', question: "How do you say 'Thank you' in Hindi?", options: [
        { id: 'A', text: 'नमस्ते (Namaste)' },
        { id: 'B', text: 'धन्यवाद (Dhanyavaad)' }
      ], correctAnswer: 'B',
        explanation: { answer: "'Dhanyavaad' (धन्यवाद) is the formal way to say 'Thank you' in Hindi. 'Namaste' (नमस्ते) is a respectful greeting for 'Hello'.", keyConcepts: ['Hindi Vocabulary', 'Formal Greetings'], relatedTopics: ['Common Phrases'] }
      }
    ]
  },
  language_telugu: {
    name: 'Telugu: Basic Greetings',
    keywords: ['telugu', 'namaskaram'],
    questions: [
      { 
        id: 1, 
        difficulty: 'EASY', 
        question: "What is the Telugu word for 'Hello'?", 
        options: [
          { id: 'A', text: "ధన్యవాదాలు (Dhan'yavādālu)" },
          { id: 'B', text: 'నమస్కారం (Namaskāram)' }
        ], 
        correctAnswer: 'B',
        explanation: { 
          answer: "'Namaskāram' (నమస్కారం) is a respectful greeting equivalent to 'Hello'. 'Dhan'yavādālu' (ధన్యవాదాలు) means 'Thank you'.", 
          keyConcepts: ['Telugu Vocabulary', 'Greetings'], 
          relatedTopics: ['Common Phrases'] 
        }
      }
    ]
  },

  // *** NEWLY ADDED QUIZ MODULES FOR PROBLEM SOLVING & LONG-FORM CONTENT ***
  derivative_problem_solving: {
    name: 'Solving a Derivative Problem',
    keywords: ['solve derivative', 'product rule example'],
    questions: [
      { id: 1, difficulty: 'MEDIUM', question: "When differentiating f(x) = (x² + 1)sin(x), what is the term that corresponds to u'v in the product rule formula?", options: [
        { id: 'A', text: '(x² + 1)cos(x)' },
        { id: 'B', text: '2x * sin(x)' }
      ], correctAnswer: 'B',
        explanation: { answer: "In the product rule (uv)' = u'v + uv', 'u' is (x² + 1) and 'v' is sin(x). The derivative of u, u', is 2x. Therefore, the term u'v is 2x * sin(x).", keyConcepts: ['Product Rule', 'Identifying u and v', 'Basic Derivatives'], relatedTopics: ['Quotient Rule', 'Chain Rule'] }
      }
    ]
  },
  chemistry_sn2_reaction: {
    name: 'Chemistry: SN2 Reaction',
    keywords: ['sn2 reaction', 'nucleophilic substitution', 'chemistry derivation'],
    questions: [
      { id: 1, difficulty: 'MEDIUM', question: "What is a defining characteristic of an SN2 reaction mechanism?", options: [
        { id: 'A', 'text': 'It occurs in two steps with a carbocation intermediate.' },
        { id: 'B', 'text': 'It is a single, concerted step involving a backside attack.' }
      ], correctAnswer: 'B',
        explanation: { answer: "The SN2 reaction is 'bimolecular', meaning the rate-determining step involves two species (the nucleophile and the substrate). It happens in a single, concerted step where the nucleophile attacks as the leaving group leaves, causing an inversion of stereochemistry.", keyConcepts: ['SN2 Mechanism', 'Concerted Reaction', 'Backside Attack', 'Bimolecular'], relatedTopics: ['SN1 Reaction', 'Stereochemistry', 'Leaving Groups'] }
      }
    ]
  },
  physics_kinematics_problem: {
    name: 'Physics: Kinematics Problem',
    keywords: ['kinematics', 'free fall', 'physics problem'],
    questions: [
      { id: 1, difficulty: 'EASY', question: 'In the free fall problem, why can the term v₀t be ignored?', options: [
        { id: 'A', text: 'Because the object was dropped, so its initial velocity (v₀) was zero.' },
        { id: 'B', text: 'Because time (t) is what we are trying to find.' }
      ], correctAnswer: 'A',
        explanation: { answer: "The problem states the stone was 'dropped', which implies it started from rest. Therefore, its initial velocity (v₀) is 0 m/s. Anything multiplied by zero is zero, so the v₀t term in the kinematic equation becomes zero and can be ignored.", keyConcepts: ['Initial Velocity', 'Kinematic Equations', 'Free Fall Assumptions'], relatedTopics: ['Projectile Motion', 'Conservation of Energy'] }
      }
    ]
  },
  history_green_revolution: {
    name: 'History: The Green Revolution',
    keywords: ['green revolution', 'agriculture', 'borlaug'],
    questions: [
      { id: 1, difficulty: 'EASY', question: 'What was the core technological component of the Green Revolution in India?', options: [
        { id: 'A', text: 'Introduction of high-yielding variety (HYV) seeds.' },
        { id: 'B', text: 'Development of large-scale organic farming.' }
      ], correctAnswer: 'A',
        explanation: { answer: "The fundamental breakthrough of the Green Revolution was the development and widespread adoption of high-yielding varieties (HYV) of seeds, especially for wheat and rice. These seeds were designed to produce significantly more grain per hectare when supplied with adequate fertilizer and water.", keyConcepts: ['High-Yielding Varieties (HYV)', 'M.S. Swaminathan', 'Food Security'], relatedTopics: ['Indian Agriculture', 'Five-Year Plans'] }
      }
    ]
  }
};

// --- COMBINE ALL AVAILABLE TOPICS FROM QUIZZES AND WHITEBOARD DATA ---
// This logic ensures all data is unified.
const masterTopicData = { ...quizDataByTopic };
Object.keys(whiteboardContent).forEach(key => {
    if (!masterTopicData[key]) {
        masterTopicData[key] = {
            name: whiteboardContent[key].name,
            keywords: whiteboardContent[key].keywords,
            questions: []
        };
    }
});

// Create the list for the UI from this master data object
const allTopics = Object.keys(masterTopicData).map(key => ({
    id: key,
    name: masterTopicData[key].name
}));


const Learn = () => {
  const [pageState, setPageState] = useState('analyzing');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Hello! I'm your AI learning companion for UPSC and other exams. Let me analyze your uploaded document..." }
  ]);
  const [inputValue, setInputValue] = useState('');

  const [activeQuiz, setActiveQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [maximizedPanel, setMaximizedPanel] = useState(null);

  // --- NEW STATE FOR WHITEBOARD ---
  const [isWhiteboardVisible, setIsWhiteboardVisible] = useState(false);
  const [whiteboardTopicId, setWhiteboardTopicId] = useState(null);


  const handleTakeExam = () => {
    setPageState('examView');
  };

  const handleExitExam = () => {
    setPageState('topicsReady'); 
  };

  useEffect(() => {
    if (pageState === 'analyzing') {
      const timer = setTimeout(() => {
        setMessages(prev => [
          ...prev, {
            id: 2, sender: 'ai', text: "I've analyzed your document. Here are the key topics I've found. Click one to see a detailed explanation, or ask me about a concept directly.", topics: allTopics
          }
        ]);
        setPageState('topicsReady');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [pageState]);

  if (pageState === 'examView') {
    return <Exam onExitExam={handleExitExam} />;
  }

  const currentQuestion = activeQuiz[currentQuestionIndex];
  const isCorrect = isAnswered && selectedAnswer === currentQuestion?.correctAnswer;
  const isLastQuestion = currentQuestionIndex === activeQuiz.length - 1;

  const startQuiz = (topicId) => {
    const selectedQuizData = masterTopicData[topicId];
    if (selectedQuizData && selectedQuizData.questions.length > 0) {
    setActiveQuiz(selectedQuizData.questions);
    setCurrentQuestionIndex(0);
    setCorrectCount(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setPageState('quizActive');
    }
  };

  const findTopicFromText = (text) => {
    const lowercasedText = text.toLowerCase();
    for (const topicId in masterTopicData) {
      if (masterTopicData[topicId].keywords.some(keyword => lowercasedText.includes(keyword))) {
        return topicId;
      }
    }
    return null;
  };

  const handleToggleMaximize = (panel) => {
    setMaximizedPanel(current => (current === panel ? null : panel));
  };

  const handleTopicSelect = (topicId) => {
    if (pageState === 'quizActive') return;
  
    // Always show whiteboard if content exists
    if (whiteboardContent[topicId]) {
      const topicName = masterTopicData[topicId]?.name || 'this topic';
      setMessages(prev => [
        ...prev, { id: Date.now(), sender: 'ai', text: `Excellent choice! Let's break down "${topicName}" on the whiteboard.`, hasTTS: true }
      ]);
      setWhiteboardTopicId(topicId);
      setIsWhiteboardVisible(true);
    }
    
    // Always start the quiz if available
    if (masterTopicData[topicId]?.questions.length > 0) {
      startQuiz(topicId);
    } else {
      // If no quiz available, ensure we're in topicsReady state
      setPageState('topicsReady');
    }
  };
  
  const handleCloseWhiteboard = () => {
    setIsWhiteboardVisible(false);
    if (whiteboardTopicId && masterTopicData[whiteboardTopicId]?.questions.length > 0) {
      const topicName = masterTopicData[whiteboardTopicId].name;
       setMessages(prev => [
          ...prev, { id: Date.now() + 1, sender: 'ai', text: `Hope that helped! Now, let's test your understanding of "${topicName}".` }
      ]);
      startQuiz(whiteboardTopicId);
    }
    setWhiteboardTopicId(null); // Reset
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const userMessage = { id: Date.now(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    const matchedTopicId = findTopicFromText(inputValue);
    
    if (matchedTopicId) {
       handleTopicSelect(matchedTopicId);
    } else {
      const aiResponse = { id: Date.now() + 1, sender: 'ai', text: "I'm not sure about that topic. Please try asking in a different way or select one of the suggested topics." };
      setMessages(prev => [...prev, aiResponse]);
    }
  };

  const handleSelectAnswer = (optionId) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(optionId);
    if (optionId === currentQuestion.correctAnswer) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
    } else {
      const score = ((correctCount / activeQuiz.length) * 100).toFixed(0);
      alert(`Quiz Complete! Your final score: ${score}%`);
      setActiveQuiz([]);
      setPageState('topicsReady');
    }
  };

  return (
    <div className="learn-page-wrapper">
      <header className="learn-page-header final-style">
        <div className="learn-logo-container">
          <img src="https://img.icons8.com/nolan/64/brain.png" alt="LearnAI Pro Logo" className="learn-logo-icon" />
          <div className="learn-logo-text"><span>LearnAI Pro</span><small>Intelligent Learning Platform</small></div>
        </div>
        <div className="learn-header-stats">
          <div className="learn-stat-item simple">Score: <strong>87%</strong></div>
          <div className="learn-stat-item simple">Streak: <strong>8</strong></div>
        </div>
        <div className="learn-header-actions">
          <button className="learn-take-exam-btn" onClick={handleTakeExam}>Take Exam</button>
            <span className="learn-module-chip">UPSC - General Studies</span>
        </div>
      </header>

      {pageState === 'quizActive' && (
        <section className="learn-overall-progress">
            <h4>OVERALL PROGRESS</h4>
            <div className="learn-progress-grid">
              <div className="learn-progress-item color-blue"><span>{currentQuestionIndex + (isAnswered ? 1 : 0)}</span><small>Completed</small></div>
              <div className="learn-progress-item color-gray"><span>{activeQuiz.length - (currentQuestionIndex + (isAnswered ? 1 : 0))}</span><small>Remaining</small></div>
              <div className="learn-progress-item color-orange"><span>45m</span><small>Time Spent</small></div>
              <div className="learn-progress-item color-yellow"><span>2h 0m</span><small>Est. Remaining</small></div>
            <div className="learn-progress-item color-green"><span>{activeQuiz.length > 0 ? (((currentQuestionIndex + (isAnswered ? 1 : 0)) / activeQuiz.length) * 100).toFixed(1) : 0}%</span><small>Progress</small></div>
              <div className="learn-progress-item color-purple"><span>32</span><small>Q/Hour</small></div>
            </div>
            <div className="learn-progress-bar-container">
            <div className="learn-progress-bar-fill" style={{ width: `${activeQuiz.length > 0 ? (((currentQuestionIndex + (isAnswered ? 1 : 0)) / activeQuiz.length) * 100) : 0}%` }}></div>
              <span className="progress-bar-text">24/247</span>
            </div>
        </section>
      )}

      <main className={`learn-page-main-content ${maximizedPanel ? 'panel-maximized' : ''} ${maximizedPanel ? `${maximizedPanel}-max` : ''}`}>
        <aside className={`learn-panel ${maximizedPanel && maximizedPanel !== 'assistant' ? 'minimized' : ''}`}>
          <div className="learn-panel-header assistant-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65c0 1.61 1.31 2.92 2.92 2.92c1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" /></svg>
            <h4>AI Assistant</h4><small>Online & Ready</small>
            <button className="panel-action-btn" title="Expand/Collapse" onClick={() => handleToggleMaximize('assistant')}>
              {maximizedPanel === 'assistant' ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3H3v5m13 13h5v-5M3 8l6 6m5-11l-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </button>
          </div>
          <div className="panel-content-wrapper">
            <div className="learn-chat-area" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`learn-chat-message-wrapper ${msg.sender === 'user' ? 'user' : ''}`}>
                  {msg.sender === 'ai' && <div className="ai-avatar"></div>}
                  <div className={`learn-chat-message ${msg.sender}`}>
                    <p>{msg.text}</p>
                    {msg.topics && (
                      <div className="topic-selection-container">
                        {msg.topics.map(topic => (
                          <button key={topic.id} className="topic-select-button" onClick={() => handleTopicSelect(topic.id)}>
                            {topic.name}
                          </button>
                        ))}
                      </div>
                    )}
                    {msg.hasTTS && (
                      <div className="tts-controls-wrapper">
                        <button className="listen-btn" title="Listen"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg></button>
                        <button className="tts-control-btn" title="Play"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z" /></svg></button>
                        <button className="tts-control-btn" title="Pause"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg></button>
                        <button className="tts-control-btn" title="Stop"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M6 6h12v12H6z" /></svg></button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
                <form className="learn-chat-input-container" onSubmit={handleSendMessage}><input type="text" placeholder="Ask about a topic..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} /><button type="submit" title="Send Message"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z" /></svg></button></form>
          </div>
        </aside>
        
        <section className={`learn-panel ${maximizedPanel && maximizedPanel !== 'quiz' ? 'minimized' : ''}`}>
          <div className="learn-panel-header quiz-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M9.525 21.5q-1.875 0-3.2-1.325t-1.325-3.2q0-1.875 1.325-3.2t3.2-1.325q1.875 0 3.2 1.325t1.325 3.2q0 1.875-1.325 3.2t-3.2 1.325Zm5-11q-1.875 0-3.2-1.325T10 5.975q0-1.875 1.325-3.2T14.525 1.45q1.875 0 3.2 1.325t1.325 3.2q0 1.875-1.325 3.2t-3.2 1.325ZM2.45 10.5q-1.875 0-3.163-1.325T-.975 5.975q0-1.875 1.288-3.2T3.475 1.45q1.875 0 3.163 1.325T7.9 5.975q0 1.875-1.288 3.2T3.45 10.5Zm13.525 11q-1.875 0-3.2-1.325t-1.325-3.2q0-1.875 1.325-3.2t3.2-1.325q1.875 0 3.2 1.325t1.325 3.2q0 1.875-1.325 3.2t-3.2 1.325Z" /></svg><h4>Smart Quiz</h4><small>Adaptive Learning</small>
            <button className="panel-action-btn" title="Expand/Collapse" onClick={() => handleToggleMaximize('quiz')}>
              {maximizedPanel === 'quiz' ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3H3v5m13 13h5v-5M3 8l6 6m5-11l-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </button>
          </div>
        <div className="panel-content-wrapper">{pageState === 'quizActive' && currentQuestion ? (<div className="learn-quiz-content-wrapper"><div className="learn-quiz-header-2"><span className={`quiz-difficulty-tag ${currentQuestion.difficulty.toLowerCase()}`}>{currentQuestion.difficulty}</span><span className="quiz-question-count">Question {currentQuestionIndex + 1} of {activeQuiz.length}</span><span className="quiz-timer">2:30</span></div><div className="quiz-progress-bar-container"><div className="quiz-progress-bar-fill" style={{ width: `${((currentQuestionIndex + 1) / activeQuiz.length) * 100}%` }}></div></div><p className="learn-question-text">{currentQuestion.question}</p><div className="learn-options">{currentQuestion.options.map(opt => (<div key={opt.id} className={`learn-option ${isAnswered ? (opt.id === currentQuestion.correctAnswer ? 'correct' : (opt.id === selectedAnswer ? 'incorrect' : '')) : ''}`} onClick={() => handleSelectAnswer(opt.id)}><span>{opt.id}</span><p>{opt.text}</p>{isAnswered && opt.id === selectedAnswer && <div className={`feedback-icon ${isCorrect ? 'correct' : 'incorrect'}`}>{isCorrect ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 16.2l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.137 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.137T12 22z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-2.6 2.6L8 14.6l2.6-2.6L8 9.4l1.4-1.4l2.6 2.6l2.6-2.6l1.4 1.4l-2.6 2.6l2.6 2.6l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.137 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.137T12 22z" /></svg>}</div>}</div>))}</div>{isAnswered && (<div className={`learn-feedback-card ${isCorrect ? 'correct' : 'incorrect'}`}><div className="feedback-icon-large">{isCorrect ? '✓' : '⊗'}</div><div className="feedback-text"><h5>{isCorrect ? "Excellent!" : "Not quite right"}</h5><p>{isCorrect ? "You're mastering this concept." : "Let's review this together."}</p></div><button className="next-question-btn" onClick={handleNextQuestion}>{isLastQuestion ? 'Finish' : 'Next Question'}</button></div>)}</div>) : <div className="quiz-placeholder">Select a topic from the AI Assistant to start an explanation or a quiz.</div>}</div>
        </section>
        
        <aside className={`learn-panel ${maximizedPanel && maximizedPanel !== 'explanation' ? 'minimized' : ''}`}>
          <div className="learn-panel-header explanation-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M20 22H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2M4 4v16h16V4z" /><path fill="currentColor" d="M6 14h12v-2H6zm0-4h12V8H6zm0-4h8V4H6z" /></svg><h4>Detailed Explanation</h4><small>Comprehensive Analysis</small>
            <button className="panel-action-btn" title="Expand/Collapse" onClick={() => handleToggleMaximize('explanation')}>
              {maximizedPanel === 'explanation' ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3H3v5m13 13h5v-5M3 8l6 6m5-11l-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </button>
          </div>
          <div className="panel-content-wrapper">{isAnswered && currentQuestion ? (<div className="learn-explanation-content visible"><div className="explanation-box answer"><div className="box-header"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg><h5>Answer Explanation</h5></div><p>{currentQuestion.explanation.answer}</p></div><div className="explanation-box concepts"><div className="box-header"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z" /></svg><h5>Key Concepts</h5></div><ul>{currentQuestion.explanation.keyConcepts.map(c => <li key={c}>{c}</li>)}</ul></div><div className="explanation-box related"><div className="box-header"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M11 15H6.5q-.65 0-1.075-.425T5 13.5V8h2v5.5H11v-3l4 4l-4 4v-3Zm7.5 5H13v-2h5.5V6H13V4h5.5q.65 0 1.075.425T20 5.5v13q0 .65-.425 1.075T18.5 20Z" /></svg><h5>Related Topics</h5></div><div className="related-topics-tags">{currentQuestion.explanation.relatedTopics.map(t => <span key={t}>{t}</span>)}</div></div></div>) : <div className="quiz-placeholder"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 14.5V4A2 2 0 0 1 6.5 2z" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg><h4>Ready to Learn!</h4><p>Answer a question to unlock detailed explanations.</p></div>}</div>
        </aside>
      </main>

    {/* --- RENDER THE WHITEBOARD CONDITIONALLY --- */}
    {isWhiteboardVisible && whiteboardTopicId && (
        <Whiteboard 
            topicId={whiteboardTopicId}
            onClose={handleCloseWhiteboard}
        />
      )}

    </div>
  );
};

export default Learn;
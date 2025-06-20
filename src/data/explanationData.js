// src/data/whiteboardContent.js

// FINAL, COMPREHENSIVE VERSION
// This data file now contains a unique, animated whiteboard explanation for EVERY topic in the application.
// The missing "biology_cell" entry has been added.

export const whiteboardContent = {
    // --- CALCULUS TOPICS ---
    derivative_power_rule: {
      name: 'Derivative Power Rule',
      keywords: ['derivative', 'power rule', 'calculus'],
      title: 'Calculus: The Power Rule',
      steps: [
        { type: 'heading', content: 'The Power Rule', delay: 500 },
        { type: 'text', content: "It's a shortcut for finding derivatives of polynomial functions.", delay: 1500 },
        { type: 'svg', content: `<svg viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg"><path d="M 10 90 Q 50 90, 75 50 T 140 10" stroke="#6C5CE7" stroke-width="2" fill="none" /><line x1="40" y1="95" x2="110" y2="25" stroke="#00B894" stroke-width="1.5" /><circle cx="75" cy="50" r="3" fill="#E74C3C" /></svg>`, delay: 1000 },
        { type: 'sub-heading', content: 'The Formula', delay: 1000 },
        { type: 'formula', content: '\\frac{d}{dx}(x^n) = nx^{n-1}', delay: 1500, animation: 'pop-in' },
      ]
    },
    integration_by_parts: {
      name: 'Integration by Parts',
      keywords: ['integration', 'parts', 'integral'],
      title: 'Calculus: Integration by Parts',
      steps: [
        { type: 'heading', content: 'Integration by Parts', delay: 500 },
        { type: 'text', content: "A technique used to find the integral of a product of functions.", delay: 2000 },
        { type: 'sub-heading', content: 'The Formula', delay: 1500 },
        { type: 'formula', content: '\\int u \\, dv = uv - \\int v \\, du', delay: 2000, animation: 'pop-in' },
        { type: 'text', content: "The key is to choose 'u' and 'dv' correctly!", delay: 1500 },
        { type: 'svg', content: `<svg viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg"><text x="10" y="25" font-family="Kalam" font-size="12">∫</text><text x="25" y="25" font-family="Kalam" font-size="12" fill="#6c5ce7">f(x)</text><text x="55" y="25" font-family="Kalam" font-size="12" fill="#00b894">g(x)</text><text x="85" y="25" font-family="Kalam" font-size="12">dx</text><path d="M 40 30 Q 50 40, 40 50" stroke="#e74c3c" stroke-width="1.5" fill="none" /><text x="45" y="60" font-family="Kalam" font-size="10" fill="#e74c3c">Choose u</text><path d="M 70 30 Q 60 40, 70 50" stroke="#e74c3c" stroke-width="1.5" fill="none" /><text x="75" y="60" font-family="Kalam" font-size="10" fill="#e74c3c">Choose dv</text></svg>`, delay: 1500 },
      ]
    },
    limits: {
      name: 'Limits',
      keywords: ['limit'],
      title: 'Calculus: Understanding Limits',
      steps: [
        { type: 'heading', content: 'Understanding Limits', delay: 500 },
        { type: 'text', content: "A limit is the value that a function 'approaches' as the input approaches some value.", delay: 2000 },
        { type: 'svg', content: `<svg viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg"><path d="M 10 80 C 40 10, 110 10, 140 80" stroke="#6C5CE7" stroke-width="2" fill="none" /><line x1="75" y1="90" x2="75" y2="38" stroke="#2d3436" stroke-dasharray="2 2" stroke-width="1" /><circle cx="75" cy="35" r="3" fill="white" stroke="#E74C3C" stroke-width="1.5" /><text x="70" y="99" font-family="Kalam" font-size="10">c</text><text x="80" y="35" font-family="Kalam" font-size="10">L</text></svg>`, delay: 1500 },
        { type: 'sub-heading', content: 'Notation', delay: 1500 },
        { type: 'formula', content: '\\lim_{x \\to c} f(x) = L', delay: 2000, animation: 'pop-in' },
      ]
    },
    chain_rule: {
      name: 'Chain Rule',
      keywords: ['chain rule'],
      title: 'Calculus: The Chain Rule',
      steps: [
        { type: 'heading', content: 'The Chain Rule', delay: 500 },
        { type: 'text', content: "Used to find the derivative of a function that is nested inside another function.", delay: 2000 },
        { type: 'svg', content: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="100" height="60" rx="10" stroke="#6c5ce7" stroke-width="2" fill="rgba(108, 92, 231, 0.1)" /><rect x="30" y="25" width="60" height="30" rx="5" stroke="#00b894" stroke-width="2" fill="rgba(0, 184, 148, 0.1)" /><text x="50" y="45" font-family="Kalam" font-size="10" fill="#2d3436">g(x)</text><text x="15" y="22" font-family="Kalam" font-size="10" fill="#6c5ce7">f( )</text></svg>`, delay: 1500 },
        { type: 'sub-heading', content: 'The Formula', delay: 1500 },
        { type: 'formula', content: "\\frac{d}{dx}f(g(x)) = f'(g(x)) \\cdot g'(x)", delay: 2000, animation: 'pop-in' },
      ]
    },
    product_rule: {
      name: 'Product Rule',
      keywords: ['product rule'],
      title: 'Calculus: The Product Rule',
      steps: [
        { type: 'heading', content: 'The Product Rule', delay: 500 },
        { type: 'text', content: "Used to find the derivative of a product of two functions.", delay: 2000 },
        { type: 'sub-heading', content: 'The Formula', delay: 1500 },
        { type: 'formula', content: "(f \\cdot g)' = f'g + fg'", delay: 2000, animation: 'pop-in' },
        { type: 'text', content: "In words: 'The first times the derivative of the second, plus the second times the derivative of the first.'", delay: 2000 },
      ]
    },
  
    // --- MATH & STATISTICS ---
    linear_algebra: {
      name: 'Linear Algebra',
      keywords: ['matrix', 'vector'],
      title: 'Linear Algebra: Matrix Dimensions',
      steps: [
        { type: 'heading', content: 'Matrix Dimensions', delay: 500 },
        { type: 'text', content: "The size of a matrix is given by its number of rows and columns.", delay: 2000 },
        { type: 'sub-heading', content: 'Rows by Columns (m x n)', delay: 1500 },
        { type: 'svg', content: `<svg viewBox="0 -10 140 100" xmlns="http://www.w3.org/2000/svg"><path d="M 20 10 L 20 80 M 120 10 L 120 80" stroke="#2d3436" stroke-width="2" /><text x="40" y="30">a</text><text x="80" y="30">b</text><text x="40" y="60">c</text><text x="80" y="60">d</text><text x="0" y="50" font-family="Kalam">2 Rows</text><path d="M 5 45 L 18 45" stroke="#e74c3c" stroke-width="1.5" marker-end="url(#arrow-red)" /><text x="50" y="0" font-family="Kalam">2 Columns</text><path d="M 70 5 L 70 8" stroke="#e74c3c" stroke-width="1.5" marker-end="url(#arrow-red)" /><defs><marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#e74c3c" /></marker></defs></svg>`, delay: 1500 },
        { type: 'text', content: "The matrix above has 2 rows and 2 columns, so it is a 2x2 matrix.", delay: 2000 },
      ]
    },
    statistics_mean: {
      name: 'Statistics: Mean',
      keywords: ['mean', 'average'],
      title: 'Statistics: Calculating the Mean',
      steps: [
        { type: 'heading', content: 'The Mean', delay: 500 },
        { type: 'text', content: "The mean is the 'average' of a set of numbers. You add them all up and divide by how many there are.", delay: 2000 },
        { type: 'svg', content: `<svg viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="80" width="20" height="20" fill="#6c5ce7" /><rect x="40" y="60" width="20" height="40" fill="#00b894" /><rect x="70" y="40" width="20" height="60" fill="#fd79a8" /><line x1="0" y1="50" x2="150" y2="50" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="4 4"/><text x="100" y="45" font-family="Kalam" font-size="10">Mean (4)</text></svg>`, delay: 1500 },
        { type: 'sub-heading', content: 'Example: {2, 4, 6}', delay: 1500 },
        { type: 'formula', content: 'Mean = \\frac{2+4+6}{3} = \\frac{12}{3} = 4', delay: 2000, animation: 'pop-in' },
      ]
    },
    probability: {
      name: 'Probability',
      keywords: ['probability', 'chance'],
      title: 'Intro to Probability',
      steps: [
        { type: 'heading', content: 'Basic Probability', delay: 500 },
        { type: 'text', content: "Probability measures the likelihood of an event occurring.", delay: 2000 },
        { type: 'svg', content: `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="60" rx="5" stroke="#2d3436" stroke-width="2" fill="#f5f6fa" /><circle cx="35" cy="40" r="10" fill="#fdcb6e" /><circle cx="65" cy="40" r="10" fill="#81ecec" /><text x="20" y="70" font-family="Kalam" font-size="10">2 outcomes</text></svg>`, delay: 1500 },
        { type: 'sub-heading', content: 'The Formula', delay: 1500 },
        { type: 'formula', content: 'P(\\text{event}) = \\frac{\\text{Favorable Outcomes}}{\\text{Total Outcomes}}', delay: 2000, animation: 'pop-in' },
      ]
    },
    geometry_area: {
      name: 'Geometry: Area',
      keywords: ['area', 'geometry'],
      title: 'Geometry: Area of a Square',
      steps: [
        { type: 'heading', content: 'Area of a Square', delay: 500 },
        { type: 'text', content: "The area is the amount of space inside a 2D shape.", delay: 2000 },
        { type: 'svg', content: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" stroke="#2d3436" stroke-width="2" fill="rgba(0, 184, 148, 0.1)" /><text x="45" y="55" font-family="Kalam" font-size="10" fill="#00b894">Area</text><text x="5" y="55" font-family="Kalam" font-size="10">s</text><text x="45" y="99" font-family="Kalam" font-size="10">s</text></svg>`, delay: 1500 },
        { type: 'sub-heading', content: 'The Formula', delay: 1500 },
        { type: 'formula', content: 'Area = s \\times s = s^2', delay: 2000, animation: 'pop-in' },
      ]
    },
    pythagorean_theorem: {
      name: 'Pythagorean Theorem',
      keywords: ['pythagorean', 'triangle'],
      title: 'Geometry: Pythagorean Theorem',
      steps: [
        { type: 'heading', content: 'Pythagorean Theorem', delay: 500 },
        { type: 'text', content: "In a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.", delay: 2000 },
        { type: 'svg', content: `<svg viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg"><path d="M 10 10 L 10 100 L 110 100 L 10 10 Z" stroke="#2D3436" stroke-width="2" fill="rgba(108, 92, 231, 0.1)" /><rect x="10" y="90" width="10" height="10" stroke="#E74C3C" stroke-width="1.5" fill="none" /><text x="5" y="55" font-family="Kalam" font-size="12" fill="#2D3436">a</text><text x="60" y="105" font-family="Kalam" font-size="12" fill="#2D3436">b</text><text x="65" y="50" font-family="Kalam" font-size="12" fill="#2D3436" transform="rotate(-45, 60, 50)">c</text></svg>`, delay: 1500 },
        { type: 'formula', content: 'a^2 + b^2 = c^2', delay: 1500, animation: 'pop-in' },
      ]
    },
    
    // --- UPSC Subjects ---
    history_1857_revolt: {
      name: 'History: Revolt of 1857',
      keywords: ['history', '1857', 'revolt', 'mutiny'],
      title: 'History: The Revolt of 1857',
      steps: [
          { type: 'heading', content: 'Revolt of 1857', delay: 500 },
          { type: 'text', content: "A major uprising against the rule of the British East India Company.", delay: 2000 },
          { type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/India_1857_revolt_map.svg/500px-India_1857_revolt_map.svg.png', alt: 'Map of the 1857 Revolt', delay: 1500, animation: 'pop-in' },
          { type: 'sub-heading', content: 'Key Causes', delay: 1500 },
          { type: 'list', items: ["Political: Doctrine of Lapse.", "Economic: Heavy taxation.", "Immediate: Enfield rifle cartridges."], delay: 2500 },
      ]
    },
    geography_monsoon: {
      name: 'Geography: Indian Monsoon',
      keywords: ['geography', 'monsoon', 'climate'],
      title: 'Geography: Indian Monsoon',
      steps: [
          { type: 'heading', content: 'The Indian Monsoon', delay: 500 },
          { type: 'text', content: "A seasonal reversal in wind direction, crucial for India's economy.", delay: 1500 },
          { type: 'svg', content: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg"><path d="M 50 140 q 20 -60 50 -80 t 80 -40" stroke="#888" stroke-width="1" fill="none" stroke-dasharray="4 4" /><text x="40" y="130" font-size="10">🇮🇳</text><path d="M 60 120 q 50 -20 80 -70" stroke="#0984E3" stroke-width="2.5" fill="none" marker-end="url(#arrow)" /><text x="10" y="20" font-family="Kalam" font-size="10">Low Pressure</text><text x="100" y="145" font-family="Kalam" font-size="10">High Pressure</text><defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#0984E3" /></marker></defs></svg>`, delay: 1500 },
          { type: 'sub-heading', content: 'Summer (SW Monsoon)', delay: 1500 },
          { type: 'list', items: ["Low pressure over land.", "High pressure over sea.", "Winds blow sea to land, bringing rain."], delay: 2000 },
      ]
    },
    polity_preamble: {
      name: 'Polity: Preamble',
      keywords: ['polity', 'preamble', 'constitution'],
      title: 'Polity: The Preamble',
      steps: [
          { type: 'heading', content: 'The Preamble', delay: 500 },
          { type: 'text', content: "The soul of the Indian Constitution.", delay: 2000 },
          { type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Preamble_of_the_Constitution_of_India_%28calligraphy%29.jpg/400px-Preamble_of_the_Constitution_of_India_%28calligraphy%29.jpg', alt: 'Calligraphy of the Preamble', delay: 1500, animation: 'pop-in'},
          { type: 'sub-heading', content: 'Key Ideals', delay: 1500 },
          { type: 'list', items: ["Sovereign", "Socialist", "Secular", "Democratic", "Republic"], delay: 2500 },
      ]
    },
    economy_inflation: {
      name: 'Economy: Inflation',
      keywords: ['economy', 'inflation'],
      title: 'Economy: Inflation',
      steps: [
          { type: 'heading', content: 'Inflation', delay: 500 },
          { type: 'text', content: "The rate of increase in prices over a given period of time.", delay: 2000 },
          { type: 'svg', content: `<svg viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg"><line x1="10" y1="90" x2="140" y2="90" stroke="#2d3436" stroke-width="1.5"/><line x1="10" y1="90" x2="10" y2="10" stroke="#2d3436" stroke-width="1.5"/><text x="0" y="8" font-size="8">Price</text><text x="120" y="99" font-size="8">Quantity</text><path d="M 30 80 C 60 20, 90 20, 120 80" stroke="#e74c3c" stroke-width="2" fill="none" /><path d="M 20 70 C 50 10, 80 10, 110 70" stroke="#6c5ce7" stroke-width="2" fill="none" /><text x="100" y="60" font-family="Kalam" font-size="8">Demand</text><text x="20" y="20" font-family="Kalam" font-size="8">Supply</text></svg>`, delay: 1500 },
          { type: 'sub-heading', content: 'Main Types', delay: 1500 },
          { type: 'list', items: ["Demand-Pull: Too much money chasing too few goods.", "Cost-Push: Rise in production costs."], delay: 2000 },
      ]
    },
    environment_ramsar: {
      name: 'Environment: Ramsar Sites',
      keywords: ['environment', 'ramsar', 'wetland'],
      title: 'Environment: Ramsar Sites',
      steps: [
          { type: 'heading', content: 'Ramsar Convention', delay: 500 },
          { type: 'text', content: "An international treaty for the conservation and sustainable use of wetlands.", delay: 2000 },
          { type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Ramsar_Sites_in_India_map.svg/500px-Ramsar_Sites_in_India_map.svg.png', alt: 'Map of Ramsar sites in India', delay: 1500, animation: 'pop-in' },
          { type: 'sub-heading', content: 'What is a Wetland?', delay: 1500 },
          { type: 'text', content: "An area of land saturated with water, like a marsh, lake, or mangrove.", delay: 2000 },
      ]
    },
    // *** THIS IS THE NEWLY ADDED/CORRECTED ENTRY ***
    biology_cell: {
      name: "Biology: The Animal Cell",
      keywords: ['biology', 'cell', 'organelle'],
      title: 'Biology: The Animal Cell',
      steps: [
        { type: 'heading', content: 'The Animal Cell', delay: 500 },
        { type: 'text', content: "The cell is the basic building block of life. Here are its key parts, called organelles.", delay: 1500 },
        { type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Animal_cell_structure_en.svg/450px-Animal_cell_structure_en.svg.png', alt: 'Diagram of an animal cell', delay: 1000, animation: 'pop-in' },
        { type: 'sub-heading', content: 'Important Organelles', delay: 1000 },
        { type: 'list', items: ["Nucleus: The cell's 'brain'.", "Mitochondrion: The 'powerhouse'.", "Ribosome: Makes proteins."], delay: 2000 },
      ]
    },
  };
// src/components/Whiteboard.js
import React, { useState, useEffect, useRef } from 'react';
import '../styles/Whiteboard.css';
import { whiteboardContent } from '../data/explanationData.js';

import { TypeAnimation } from 'react-type-animation';
import { BlockMath } from 'react-katex';

const WhiteboardStep = ({ step, shouldAnimate, onComplete }) => {
  const { type, content, src, alt, animation, items } = step;
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!shouldAnimate) {
      setIsComplete(true);
    }
  }, [shouldAnimate]);

  const handleAnimationComplete = () => {
    setIsComplete(true);
    if (onComplete) onComplete();
  };

  useEffect(() => {
    if (shouldAnimate && onComplete && ['svg', 'formula', 'image'].includes(type)) {
      const timer = setTimeout(() => {
        handleAnimationComplete();
      }, step.delay || 1500);
      return () => clearTimeout(timer);
    }
  }, [shouldAnimate, onComplete, type, step]);

  const renderContent = () => {
    switch (type) {
      case 'heading':
        return shouldAnimate ? (
          <TypeAnimation 
            sequence={[content, handleAnimationComplete]} 
            speed={30} 
            wrapper="h1" 
            cursor={false}
            style={{ whiteSpace: 'pre-line' }}
          />
        ) : (
          <h1 style={{ whiteSpace: 'pre-line' }}>{content}</h1>
        );
      case 'sub-heading':
        return shouldAnimate ? (
          <TypeAnimation 
            sequence={[content, handleAnimationComplete]} 
            speed={30} 
            wrapper="h2" 
            cursor={false}
            style={{ whiteSpace: 'pre-line' }}
          />
        ) : (
          <h2 style={{ whiteSpace: 'pre-line' }}>{content}</h2>
        );
      case 'text':
        return shouldAnimate ? (
          <TypeAnimation 
            sequence={[content, handleAnimationComplete]} 
            speed={30} 
            wrapper="p" 
            cursor={false}
            style={{ whiteSpace: 'pre-line' }}
          />
        ) : (
          <p style={{ whiteSpace: 'pre-line' }}>{content}</p>
        );
      case 'list':
        return (
          <ul className="checklist" style={{ whiteSpace: 'pre-line' }}>
            {items.map((item, i) => (
              <li key={i}>
                {shouldAnimate ? (
                  <TypeAnimation 
                    sequence={[item, () => i === items.length - 1 && handleAnimationComplete()]} 
                    speed={50} 
                    wrapper="span" 
                    cursor={false}
                    style={{ whiteSpace: 'pre-line' }}
                  />
                ) : (
                  <span style={{ whiteSpace: 'pre-line' }}>{item}</span>
                )}
              </li>
            ))}
          </ul>
        );
      case 'svg':
        return <div className="hand-drawn-svg" dangerouslySetInnerHTML={{ __html: content }} />;
      case 'formula':
        return <BlockMath math={content} />;
      case 'image':
        return <img src={src} alt={alt} className="whiteboard-image" />;
      default:
        return null;
    }
  };

  return (
    <div className={`whiteboard-step ${animation || ''} ${isComplete ? 'complete' : ''}`}>
      {renderContent()}
    </div>
  );
};

const Whiteboard = ({ topicId, onClose }) => {
  const [displayedSteps, setDisplayedSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const topicData = whiteboardContent[topicId] || { 
    title: 'Not Found', 
    steps: [{ type: 'text', content: 'Content for this topic could not be found.' }] 
  };
  const contentRef = useRef(null);

  useEffect(() => {
    setDisplayedSteps([]);
    setCurrentStepIndex(0);
    setIsAnimating(true);
  }, [topicId]);

  const handleStepComplete = () => {
    setIsAnimating(false);
    if (currentStepIndex < topicData.steps.length - 1) {
      setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
        setIsAnimating(true);
      }, 300);
    }
  };

  useEffect(() => {
    if (currentStepIndex < topicData.steps.length) {
      setDisplayedSteps(prev => [...prev, topicData.steps[currentStepIndex]]);
    }
  }, [currentStepIndex, topicData.steps]);

  useEffect(() => {
    if (contentRef.current && !isMinimized) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [displayedSteps, isMinimized]);

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    setIsMinimized(false);
    setIsAnimating(currentStepIndex >= displayedSteps.length - 1);
  };

  if (isMinimized) {
    return (
      <div className="whiteboard-minimized" onClick={handleMaximize}>
        <div className="whiteboard-minimized-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
            <path fill="currentColor" d="M8 8h8v2H8zm0 3h8v2H8zm0 3h5v2H8z"/>
          </svg>
          <span>{topicData.title}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="whiteboard-container">
      <header className="whiteboard-header">
        <h3 style={{fontFamily: 'Inter, sans-serif'}}>{topicData.title}</h3>
        <div className="whiteboard-controls">
          <button className="whiteboard-minimize-btn" onClick={handleMinimize} title="Minimize">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M20 14H4v-4h16v4z"/>
            </svg>
          </button>
          <button className="whiteboard-close-btn" onClick={onClose} title="Close Explanation">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7L10.6 12L5.7 7.1q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275L12 10.6l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"/>
            </svg>
          </button>
        </div>
      </header>
      <div className="whiteboard-content" ref={contentRef} style={{ overflowY: 'auto', flex: '1' }}>
        {displayedSteps.map((step, index) => (
          <WhiteboardStep 
            key={index} 
            step={step} 
            shouldAnimate={index === currentStepIndex && isAnimating}
            onComplete={index === currentStepIndex ? handleStepComplete : null}
          />
        ))}
      </div>
      <div className="whiteboard-tray"></div>
    </div>
  );
};

export default Whiteboard;
// src/components/Whiteboard.js

import React, { useState, useEffect, useRef } from 'react';
import '../styles/Whiteboard.css';
import { whiteboardContent } from '../data/explanationData.js';

import { TypeAnimation } from 'react-type-animation';
import { BlockMath } from 'react-katex';

const WhiteboardStep = ({ step }) => {
  const { type, content, src, alt, animation, items } = step;

  const renderContent = () => {
    switch (type) {
      case 'heading':
        return <TypeAnimation sequence={[content]} speed={60} wrapper="h1" cursor={false} />;
      case 'sub-heading':
        return <TypeAnimation sequence={[content]} speed={70} wrapper="h2" cursor={false} />;
      case 'text':
        return <TypeAnimation sequence={[content]} speed={80} wrapper="p" cursor={false} />;
      case 'list':
        return (
          <ul className="checklist">
            {items.map((item, i) => (
              <li key={i}>
                <TypeAnimation sequence={[item]} speed={80} wrapper="span" cursor={false} />
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
    <div className={`whiteboard-step ${animation || ''}`}>
      {renderContent()}
    </div>
  );
};

const Whiteboard = ({ topicId, onClose }) => {
  const [displayedSteps, setDisplayedSteps] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const topicData = whiteboardContent[topicId] || { title: 'Not Found', steps: [{ type: 'text', content: 'Content for this topic could not be found.' }] };
  const contentRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timeouts = [];
    setDisplayedSteps([]);

    let cumulativeDelay = 0;
    topicData.steps.forEach((step) => {
      cumulativeDelay += step.delay || 1000;
      const stepTimeout = setTimeout(() => {
        setDisplayedSteps(prev => [...prev, step]);
      }, cumulativeDelay);
      timeouts.push(stepTimeout);
    });
    
    return () => {
      document.body.style.overflow = 'auto';
      timeouts.forEach(clearTimeout);
    };
  }, [topicId]);

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
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleMinimize();
    }
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
    <div className="whiteboard-overlay" onClick={handleOverlayClick}>
      <div className="whiteboard-container" onClick={(e) => e.stopPropagation()}>
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
        <div className="whiteboard-content" ref={contentRef}>
          {displayedSteps.map((step, index) => (
            <WhiteboardStep key={index} step={step} />
          ))}
        </div>
        <div className="whiteboard-tray"></div>
      </div>
    </div>
  );
};

export default Whiteboard;
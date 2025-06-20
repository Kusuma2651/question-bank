import React, { useEffect, useState } from 'react';
import '../styles/RedirectModal.css';

const RedirectModal = ({ isOpen, onClose, onRedirect }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (isOpen) {
      // Reset countdown on open
      setCountdown(5);

      // Start the countdown timer for display
      const countInterval = setInterval(() => {
        setCountdown(prev => (prev > 1 ? prev - 1 : 1));
      }, 1000);

      // Start the main redirection timer
      const redirectTimer = setTimeout(() => {
        onRedirect();
      }, 5000); // 5-second redirect

      // Cleanup function to clear timers
      return () => {
        clearInterval(countInterval);
        clearTimeout(redirectTimer);
      };
    }
  }, [isOpen, onRedirect]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="redirect-modal-overlay" onClick={onClose}>
      <div className="redirect-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="redirect-modal-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <h3 className="redirect-modal-title">Analysis Complete!</h3>
        <p className="redirect-modal-text">
          Redirecting to your personalized learning page in {countdown} seconds...
        </p>
        <button className="redirect-modal-cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RedirectModal;
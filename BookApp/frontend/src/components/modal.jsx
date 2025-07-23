import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';

/**
 * Modal Component
 * ----------------
 * Serves as an overlay wrapper for dialogs (e.g., FriendsModal, About, BookDetail).
 * Renders children into a portal attached to document.body.
 * Handles:
 *  - backdrop click to close
 *  - ESC key to close
 *
 * Props:
 *  - children: React nodes to display inside the modal
 *  - onClose: callback invoked to close the modal
 */
export default function Modal({ children, onClose }) {
  // Close on ESC key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Prevent click inside modal-content from closing
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Render overlay via portal
  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.body
  );
}

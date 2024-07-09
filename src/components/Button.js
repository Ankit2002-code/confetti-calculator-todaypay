import React from 'react';
import '../styles/Button.css';

function Button({ label, onClick, isActive, isLastColumn }) {
  return (
    <button 
      className={`button ${isActive ? 'active' : ''} ${isLastColumn ? 'last-column' : ''}`} 
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
import React from 'react';
import '../styles/HistoryPanel.css';

function HistoryPanel({ history, onHistoryItemClick }) {
  return (
    <div className="history-panel">
      <h3>Calculation History</h3>
      {history.length === 0 ? (
        <p>No calculations yet.</p>
      ) : (
        <ul>
          {history.map((item, index) => (
            <li key={index} onClick={() => onHistoryItemClick(item)}>
              <span className="expression">{item.expression}</span>
              <span className="result">{item.result}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HistoryPanel;
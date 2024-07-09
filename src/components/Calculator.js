import React, { useState } from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import HistoryPanel from './HistoryPanel';
import { calculate, scientificOperations } from '../utils/calculatorLogic';
import ConfettiExplosion from 'react-confetti-explosion';
import '../styles/Calculator.css';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(null);
  const [isRadians, setIsRadians] = useState(true);
  const [prevValue, setPrevValue] = useState(null);
  const [currentOperation, setCurrentOperation] = useState(null);
  const [isExploding, setIsExploding] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [history, setHistory] = useState([]);

  const handleDigitClick = (digit) => {
    setDisplay(prev => prev === '0' ? digit : prev + digit);
  };

  const handleOperationClick = (operation) => {
    if (prevValue === null) {
      setPrevValue(parseFloat(display));
      setDisplay('0');
    } else {
      const result = calculate(prevValue, parseFloat(display), currentOperation);
      setPrevValue(result);
      setDisplay(result.toString());
    }
    setCurrentOperation(operation);
  };

  const handleEqualsClick = () => {
    if (prevValue !== null && currentOperation !== null) {
      const result = calculate(prevValue, parseFloat(display), currentOperation);
      setDisplay(result.toString());
      checkForConfetti(result);
      
      // Add to history
      setHistory(prevHistory => [
        { expression: `${prevValue} ${currentOperation} ${display}`, result },
        ...prevHistory.slice(0, 9) // Keep only the last 10 calculations
      ]);

      setPrevValue(null);
      setCurrentOperation(null);
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setPrevValue(null);
    setCurrentOperation(null);
  };

  const handleScientificOperation = (operation) => {
    const result = scientificOperations[operation](parseFloat(display), isRadians);
    setDisplay(result.toString());
    checkForConfetti(result);
  };

  const handleMemoryOperation = (operation) => {
    switch (operation) {
      case 'MC':
        setMemory(null);
        break;
      case 'MR':
        if (memory !== null) setDisplay(memory.toString());
        break;
      case 'M+':
        setMemory((prev) => (prev || 0) + parseFloat(display));
        break;
      case 'M-':
        setMemory((prev) => (prev || 0) - parseFloat(display));
        break;
      default:
        break;
    }
  };

  const checkForConfetti = (result) => {
    if ((result === 8 || result === 12) && !isExploding) {
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 2000);
    }
  };

  const handleHistoryItemClick = (item) => {
    setDisplay(item.result.toString());
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className="calculator-container">
      <div className={`calculator ${isDarkMode ? 'dark-mode' : ''}`}>
        {isExploding && <ConfettiExplosion />}
        <Display value={display} />
        <ButtonPanel 
          onDigitClick={handleDigitClick}
          onOperationClick={handleOperationClick}
          onEqualsClick={handleEqualsClick}
          onClearClick={handleClearClick}
          onScientificOperation={handleScientificOperation}
          onMemoryOperation={handleMemoryOperation}
          onToggleRadians={() => setIsRadians(prev => !prev)}
          isRadians={isRadians}
        />
        <button className="theme-toggle" onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>
      <div className={`history-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <HistoryPanel history={history} onHistoryItemClick={handleHistoryItemClick} />
      </div>
    </div>
  );
}

export default Calculator;
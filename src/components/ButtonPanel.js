import React from 'react';
import Button from './Button';
import '../styles/ButtonPanel.css';

function ButtonPanel({ 
  onDigitClick, 
  onOperationClick, 
  onEqualsClick, 
  onClearClick,
  onScientificOperation,
  onMemoryOperation,
  onToggleRadians,
  isRadians
}) {
  const buttons = [
    ['(', ')', 'mc','m+','m-','mr','AC','+/-','%','/'],
    ['2nd','x²','x³','xʸ','eˣ','10ˣ','7','8', '9','x'],
    ['1/x','²√x','³√x','y√x', 'ln', 'log', '4', '5', '6','-'],
    ['x!', 'sin', 'cos', 'tan','e','EE','1', '2', '3', '+'],
    ['Rad', 'sinh', 'cosh', 'tanh','π', 'Rand', '0', '.', '','=']
  ];

  const handleClick = (value) => {
    if ('0123456789.'.includes(value)) {
      onDigitClick(value);
    } else if (['+', '-', 'x', '÷'].includes(value)) {
      onOperationClick(value);
    } else if (value === '=') {
      onEqualsClick();
    } else if (value === 'AC') {
      onClearClick();
    } else if (['sin', 'cos', 'tan', 'ln', 'log', 'x!', '²√x'].includes(value)) {
      onScientificOperation(value);
    } else if (['mc', 'm+', 'm-', 'mr'].includes(value)) {
      onMemoryOperation(value);
    } else if (value === 'Rad') {
      onToggleRadians();
    }
  };

  return (
    <div className="button-panel">
      {buttons.map((row, i) => (
        <div key={i} className="button-row">
          {row.map((label, j) => (
            <Button 
              key={label} 
              label={label} 
              onClick={() => handleClick(label)}
              isActive={label === 'Rad' && isRadians}
              isLastColumn={j === 9}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ButtonPanel;
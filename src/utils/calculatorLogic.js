export function calculate(a, b, operation) {
    switch (operation) {
      case '+': return a + b;
      case '-': return a - b;
      case 'x': return a * b;
      case '÷': return b !== 0 ? a / b : 'Error';
      default: return b;
    }
  }
  
  export const scientificOperations = {
    'sin': (x, isRadians) => Math.sin(isRadians ? x : x * Math.PI / 180),
    'cos': (x, isRadians) => Math.cos(isRadians ? x : x * Math.PI / 180),
    'tan': (x, isRadians) => Math.tan(isRadians ? x : x * Math.PI / 180),
    'ln': (x) => Math.log(x),
    'log₁₀': (x) => Math.log10(x),
    'x!': (x) => {
      if (x < 0) return NaN;
      if (x === 0) return 1;
      let result = 1;
      for (let i = 2; i <= x; i++) result *= i;
      return result;
    },
    '²√x': (x) => Math.sqrt(x),
    'x²': (x) => x * x,
    'x³': (x) => x * x * x,
    'xʸ': (x, y) => Math.pow(x, y),
    'eˣ': (x) => Math.exp(x),
    '10ˣ': (x) => Math.pow(10, x),
    '¹/x': (x) => 1 / x,
    '³√x': (x) => Math.cbrt(x),
    'ʸ√x': (x, y) => Math.pow(x, 1 / y),
    'sinh': (x, isRadians) => Math.sinh(isRadians ? x : x * Math.PI / 180),
    'cosh': (x, isRadians) => Math.cosh(isRadians ? x : x * Math.PI / 180),
    'tanh': (x, isRadians) => Math.tanh(isRadians ? x : x * Math.PI / 180),
  };
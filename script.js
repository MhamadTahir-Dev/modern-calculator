const currentDisplay = document.getElementById('current');
const previousDisplay = document.getElementById('previous');

let current = '0';
let previous = '';
let operator = null;
let shouldReset = false;

function updateDisplay() {
  currentDisplay.textContent = current;
  previousDisplay.textContent = previous;
}

function addNumber(number) {
  if (current === 'Error') current = '0';

  if (number === '.' && current.includes('.')) return;

  if (shouldReset) {
    current = number === '.' ? '0.' : number;
    shouldReset = false;
  } else {
    current = current === '0' && number !== '.' ? number : current + number;
  }

  updateDisplay();
}

function chooseOperator(op) {
  if (current === 'Error') return;

  if (operator && !shouldReset) {
    calculate();
  }

  previous = current;
  operator = op;
  shouldReset = true;
  updateDisplay();
}

function calculate() {
  if (!operator || previous === '') return;

  const a = Number(previous);
  const b = Number(current);
  let result;

  switch (operator) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      result = b === 0 ? 'Error' : a / b;
      break;
  }

  current =
    result === 'Error' ? 'Error' : String(Number(result.toPrecision(12)));

  previous = '';
  operator = null;
  shouldReset = true;
  updateDisplay();
}

function clearCalculator() {
  current = '0';
  previous = '';
  operator = null;
  shouldReset = false;
  updateDisplay();
}

function deleteNumber() {
  if (current === 'Error' || shouldReset) {
    current = '0';
    shouldReset = false;
  } else {
    current = current.length > 1 ? current.slice(0, -1) : '0';
  }

  updateDisplay();
}

function percentage() {
  if (current !== 'Error') {
    current = String(Number(current) / 100);
    updateDisplay();
  }
}

document.querySelector('.buttons').addEventListener('click', (e) => {
  const button = e.target.closest('button');
  if (!button) return;
  if (button.dataset.number !== undefined) {
    addNumber(button.dataset.number);
  }
  if (button.dataset.operator) {
    chooseOperator(button.dataset.operator);
  }
  switch (button.dataset.action) {
    case 'clear':
      clearCalculator();
      break;
    case 'delete':
      deleteNumber();
      break;
    case 'percent':
      percentage();
      break;
    case 'calculate':
      calculate();
      break;
  }
});
updateDisplay();

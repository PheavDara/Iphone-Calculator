// DOM Elements
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const valueEl = document.querySelector('.value');

const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');

const additionEl = document.querySelector('.addition');
const subtractionEl = document.querySelector('.subtraction');
const multiplicationEl = document.querySelector('.multiplication');
const divisionEl = document.querySelector('.division');
const equalEl = document.querySelector('.equal');

const decimalEl = document.querySelector('.decimal');
const number0El = document.querySelector('.number-0');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');
const numberElArray = [
  number0El, number1El, number2El, number3El, number4El,
  number5El, number6El, number7El, number8El, number9El
];


// variables
let valueStrInMemory = null;
let operatorInMemory = null;


// Functions
const getValueAsStr = () => valueEl.textContent.split(',').join('');

const getValueAsNum = () => {
  return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
  const valueEl = document.querySelector('.value');
  const numDigits = valueStr.replace('.', '').length; // 
  if (numDigits > 7) {
    valueEl.style.fontSize = '90px';
  } else {
    valueEl.style.fontSize = '110px'; 
  }

  if (valueStr[valueStr.length - 1] === '.') {
    valueEl.textContent += '.';
    return;
  }

  const [wholeNumStr, decimalStr] = valueStr.split('.');
  if (decimalStr) {
    valueEl.textContent =
      parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
  } else {
    valueEl.textContent = parseFloat(wholeNumStr).toLocaleString();
  }
};

let clearPreviousNumber = false;

// Function to handle number click
const handleNumberClick = (numStr) => {
  if (clearPreviousNumber) {
    setStrAsValue(numStr);
    clearPreviousNumber = false;
  } else {
    const currentValueStr = getValueAsStr();
    if (currentValueStr === '0') {
      setStrAsValue(numStr);
    } else if (currentValueStr.length < 9) { 
      setStrAsValue(currentValueStr + numStr);
    }
  }
};




const getResultOfOperationAsStr = () => {
  const currentValueNum = getValueAsNum();
  const valueNumInMemory = parseFloat(valueStrInMemory);
  let newValueNum;
  if (operatorInMemory === 'addition') {
    newValueNum = valueNumInMemory + currentValueNum;
  } else if (operatorInMemory === 'subtraction') {
    newValueNum = valueNumInMemory - currentValueNum;
  } else if (operatorInMemory === 'multiplication') {
    newValueNum = valueNumInMemory * currentValueNum;
  } else if (operatorInMemory === 'division') {
    newValueNum = valueNumInMemory / currentValueNum;
  }
  newValueNum = parseFloat(newValueNum.toFixed(9));

  return newValueNum.toString();
};


const handleOperatorClick = (operation) => {
  clearPreviousNumber = true;
  const currentValueStr = getValueAsStr();

  if (!valueStrInMemory) {
    valueStrInMemory = currentValueStr;
    operatorInMemory = operation;
    setStrAsValue('0');
    return;
  }
  valueStrInMemory = getResultOfOperationAsStr();
  operatorInMemory = operation;
  setStrAsValue('0');
};

// Add Event Listeners to functions
acEl.addEventListener('click', () => {
  setStrAsValue('0');
  valueStrInMemory = null;
  operatorInMemory = null;
});

// Function to handle equal click
equalEl.addEventListener('click', () => {
  if (valueStrInMemory) {
    setStrAsValue(getResultOfOperationAsStr());
    valueStrInMemory = null;
    operatorInMemory = null;
    clearPreviousNumber = true; 
  }
});

pmEl.addEventListener('click', () => {
  const currentValueNum = getValueAsNum();
  const currentValueStr = getValueAsStr();

  if (currentValueStr === '-0') {
    setStrAsValue('0');
    return;
  }
  if (currentValueNum >= 0) {
    setStrAsValue('-' + currentValueStr);
  } else {
    setStrAsValue(currentValueStr.substring(1));
  }
});
percentEl.addEventListener('click', () => {
  const currentValueNum = getValueAsNum();
  const newValueNum = currentValueNum / 100;
  setStrAsValue(newValueNum.toString());
  valueStrInMemory = null;
  operatorInMemory = null;
});


// add event listeners to operators
additionEl.addEventListener('click', () => {
  handleOperatorClick('addition');
});
subtractionEl.addEventListener('click', () => {
  handleOperatorClick('subtraction');
});
multiplicationEl.addEventListener('click', () => {
  handleOperatorClick('multiplication');
});
divisionEl.addEventListener('click', () => {
  handleOperatorClick('division');
});

equalEl.addEventListener('click', () => {
  if (valueStrInMemory) {
    setStrAsValue(getResultOfOperationAsStr());
    valueStrInMemory = null;
    operatorInMemory = null;
  }
});


// Add Event Listeners to numbers and decimal
for (let i=0; i < numberElArray.length; i++) {
  const numberEl = numberElArray[i];
  numberEl.addEventListener('click', () => {
    handleNumberClick(i.toString());
  });
}
decimalEl.addEventListener('click', () => {
  const currentValueStr = getValueAsStr();
  if (!currentValueStr.includes('.')) {
    setStrAsValue(currentValueStr + '.');
  }
});

// Add event listener for keydown events
document.addEventListener('keydown', (event) => {
  const { key } = event;
  
  // Check if the pressed key is a number key (0-9)
  if (key >= '0' && key <= '9') {
    handleNumberClick(key);
  } else {
    // Map other keys to their respective actions
    switch (key) {
      case '.':
        decimalEl.click(); // Simulate a click on the decimal button
        break;
      case '+':
        additionEl.click(); // Simulate a click on the addition button
        break;
      case '-':
        subtractionEl.click(); // Simulate a click on the subtraction button
        break;
      case '*':
        multiplicationEl.click(); // Simulate a click on the multiplication button
        break;
      case '/':
        divisionEl.click(); // Simulate a click on the division button
        break;
      case 'Enter':
        equalEl.click(); // Simulate a click on the equal button
        break;
      case 'Escape':
        acEl.click(); // Simulate a click on the AC button
        break;
      case 'Backspace':
        // Handle backspace to delete the last digit
        const currentValueStr = getValueAsStr();
        if (currentValueStr !== '0') {
          setStrAsValue(currentValueStr.slice(0, -1));
        }
        break;
      case 'Delete':
        // Clear the entire input
        acEl.click(); // Simulate a click on the AC button
        break;
      case '%':
        percentEl.click(); // Simulate a click on the percent button
        break;
      case 'm':
        pmEl.click(); // Simulate a click on the plus/minus button
        break;
      default:
        break;
    }
  }
});


// Set up the time
const updateTime = () => {
  const currentTime = new Date();

  let currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  if (currentHour > 12) {
    currentHour -= 12;
  }
  hourEl.textContent = currentHour.toString();
  minuteEl.textContent = currentMinute.toString().padStart(2, '0');
}
setInterval(updateTime, 1000);
updateTime();
'use strict';

import { convertInfixToPostfix, evaluatePostfix } from './stack.js';

// console.log(convertInfixToPostfix('12+5*4-22/2'));

// Selecting elements
const inputEl = document.getElementById('input');

// Selecting buttons
const btns = document.querySelectorAll('.input-button');
const btnClear = document.getElementById('clear');
const btnErase = document.getElementById('erase');
const btnEqual = document.getElementById('equal');
const btnResult = document.getElementById('result');

// Main variables
let input = '';
let operation = '';
// let numbers = [];
let result = 0;

const initializeValues = function () {
  input = '';
  operation = '';
  // numbers = [];
};

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function () {
    if (input.length < 15) {
      input = btns[i].value;
      inputEl.value += input;
    }
  });
}

// const performOperation = function () {
//   switch (operation) {
//     case '+':
//       result = numbers[0] + numbers[1];
//       break;
//     case '-':
//       result = numbers[0] - numbers[1];
//       break;
//     case '*':
//       result = numbers[0] * numbers[1];
//       break;
//     case '/':
//       result = numbers[0] / numbers[1];
//       break;
//   }
// };

const evaluateResult = function () {
  // let num = '';
  // for (let i = 0; i < input.length; i++) {
  //   if (
  //     input[i] === '+' ||
  //     input[i] === '-' ||
  //     input[i] === '*' ||
  //     input[i] === '/'
  //   ) {
  //     numbers.push(Number(num));
  //     operation = input[i];
  //     num = '';
  //   } else {
  //     num += input[i];
  //   }
  // }
  // numbers.push(Number(num));
  // performOperation();
  const postfixValue = convertInfixToPostfix(inputEl.value);
  result = evaluatePostfix(postfixValue);
  inputEl.value = result;
  initializeValues();
};

// evalaute result
btnEqual.addEventListener('click', evaluateResult);
document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    evaluateResult();
  }
});

const clear = function () {
  inputEl.value = '';
  initializeValues();
};

// clear the input field
btnClear.addEventListener('click', clear);
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    clear();
  }
});

const earse = function () {
  input = inputEl.value.substring(0, inputEl.value.length - 1);
  inputEl.value = input;
};

// earse character
btnErase.addEventListener('click', earse);
document.addEventListener('keydown', function (event) {
  if (event.key === 'Backspace') {
    earse();
  }
});

const showResult = function () {
  input += result.toString();
  inputEl.value = input;
};

btnResult.addEventListener('click', showResult);
document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowUp') {
    showResult();
  }
});

const isOperator = function (char) {
  if (
    char === '*' ||
    char === '/' ||
    char === '+' ||
    char === '-' ||
    char === '.'
  ) {
    return 1;
  }
  return 0;
};

// type using keyboard
document.addEventListener('keydown', function (event) {
  if (
    Number.parseFloat(event.key) ||
    isOperator(event.key) ||
    event.key === '0'
  ) {
    inputEl.value += event.key;
  }
});

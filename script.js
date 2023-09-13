'use strict';

import { convertInfixToPostfix, evaluatePostfix } from './stack.js';

console.log(convertInfixToPostfix('12+5*4-22/2'));

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
      input += btns[i].value;
      inputEl.value = input;
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

btnEqual.addEventListener('click', function () {
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
});

btnClear.addEventListener('click', function () {
  inputEl.value = '';
  initializeValues();
});

btnErase.addEventListener('click', function () {
  input = input.substring(0, input.length - 1);
  inputEl.value = input;
});

btnResult.addEventListener('click', function () {
  input += result.toString();
  inputEl.value = input;
});

'use strict';

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class Stack {
  #head;
  constructor() {
    this.#head = null;
  }

  push(element) {
    const node = new Node(element);
    if (this.#head === null) {
      this.#head = node;
    } else {
      node.next = this.#head;
      this.#head = node;
    }
    return this;
  }

  pop() {
    const currentNode = this.#head;
    this.#head = this.#head.next;
    currentNode.next = null;
    return this;
  }

  display() {
    let currentNode = this.#head;
    while (currentNode !== null) {
      console.log(`${currentNode.data}`);
      currentNode = currentNode.next;
    }
    return this;
  }

  isEmpty() {
    if (this.#head === null) {
      return true;
    }
    return false;
  }

  top() {
    if (!this.isEmpty()) {
      return this.#head.data;
    } else {
      return null;
    }
  }
}

const isOperand = function (char) {
  if (
    char === '*' ||
    char === '/' ||
    char === '+' ||
    char === '-' ||
    char === '#'
  ) {
    return 0;
  }
  return 1;
};

const precedenceChecker = function (char) {
  if (char === '+' || char === '-') {
    return 1;
  } else if (char === '*' || char === '/') {
    return 2;
  }
  return 0;
};

export const convertInfixToPostfix = function (infixExpression) {
  const stack = new Stack();
  let postfixResult = '';
  let temp = '';
  let i = 0;
  while (i < infixExpression.length) {
    const character = infixExpression.charAt(i);
    if (isOperand(character)) {
      temp += character;
      i++;
    } else {
      if (precedenceChecker(character) > precedenceChecker(stack.top())) {
        stack.push(character);
        if (temp !== '') {
          postfixResult += temp + '#';
          temp = '';
        }
        i++;
      } else {
        if (temp !== '') {
          postfixResult += temp += '#';
          temp = '';
        }
        postfixResult += stack.top();
        stack.pop();
      }
    }
  }
  postfixResult += temp += '#';
  while (!stack.isEmpty()) {
    postfixResult += stack.top();
    stack.pop();
  }
  return postfixResult;
};

const calc = function (stack, num1, num2, operator) {
  switch (operator) {
    case '+':
      stack.push(num1 + num2);
      break;
    case '-':
      stack.push(num1 - num2);
      break;
    case '*':
      stack.push(num1 * num2);
      break;
    case '/':
      stack.push(num1 / num2);
      break;
  }
};

export const evaluatePostfix = function (postfixExperssion) {
  const stack = new Stack();
  let num1 = 0;
  let num2 = 0;
  let temp = '';
  for (let i = 0; i < postfixExperssion.length; i++) {
    const char = postfixExperssion.charAt(i);
    if (isOperand(char)) {
      temp += char;
    } else if (char === '#') {
      stack.push(Number.parseFloat(temp));
      temp = '';
    } else {
      num2 = stack.top();
      stack.pop();
      num1 = stack.top();
      stack.pop();
      calc(stack, num1, num2, char);
    }
  }
  return stack.top().toFixed(1);
};

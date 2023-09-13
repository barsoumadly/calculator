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
}

export const isOperand = function (char) {
  if (char === '*' || char === '/' || char === '+' || char === '-') {
    return 0;
  }
  return 1;
};

export const precedenceChecker = function (char) {
  if (char === '+' || char === '-') {
    return 1;
  } else if (char === '*' || char === '/') {
    return 2;
  }
  return 0;
};

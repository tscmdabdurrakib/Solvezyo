export interface Topic {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
}

export const jsTopics: Topic[] = [
  {
    id: 'js-intro',
    title: 'JavaScript Introduction',
    content: `
      <p>JavaScript is a programming language that enables interactive web pages. It is an interpreted language, which means that it doesn't need to be compiled. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and functional programming styles.</p>
      <p>JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.</p>
    `,
    codeExample: `// Simple JavaScript example
console.log("Hello, World!");

// Variables
let name = "John";
const age = 25;

// Function
function greet(person) {
  return "Hello, " + person;
}

console.log(greet(name));`
  },
  {
    id: 'js-variables',
    title: 'Variables and Data Types',
    content: `
      <p>JavaScript variables are containers for storing data values. In JavaScript, you can declare variables using var, let, or const. JavaScript has dynamic types, meaning the same variable can be used to hold different data types.</p>
      <p>JavaScript has several data types including strings, numbers, booleans, arrays, objects, and more.</p>
    `,
    codeExample: `// Variable declarations
var x = 5;
let y = "Hello";
const z = true;

// Data types
let stringVar = "Text";
let numberVar = 42;
let booleanVar = false;
let arrayVar = [1, 2, 3];
let objectVar = { name: "John", age: 30 };
let nullVar = null;
let undefinedVar = undefined;`
  },
  {
    id: 'js-functions',
    title: 'Functions',
    content: `
      <p>A JavaScript function is a block of code designed to perform a particular task. A JavaScript function is executed when "something" invokes it (calls it). Functions are one of the fundamental building blocks in JavaScript.</p>
    `,
    codeExample: `// Function declaration
function myFunction(p1, p2) {
  return p1 * p2;
}

// Function expression
const square = function(x) {
  return x * x;
};

// Arrow function
const cube = (x) => {
  return x * x * x;
};

// Call functions
console.log(myFunction(4, 3)); // 12
console.log(square(5)); // 25
console.log(cube(3)); // 27`
  },
  {
    id: 'js-objects',
    title: 'Objects',
    content: `
      <p>In JavaScript, objects are king. If you understand objects, you understand JavaScript. All JavaScript values, except primitives, are objects. JavaScript objects are collections of named values.</p>
    `,
    codeExample: `// Object creation
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};

// Accessing object properties
console.log(person.firstName); // John
console.log(person["lastName"]); // Doe
console.log(person.fullName()); // John Doe

// Adding properties
person.nationality = "American";`
  },
  {
    id: 'js-arrays',
    title: 'Arrays',
    content: `
      <p>JavaScript arrays are used to store multiple values in a single variable. Arrays are a special type of objects. The typeof operator in JavaScript returns "object" for arrays.</p>
    `,
    codeExample: `// Array creation
const fruits = ["Apple", "Banana", "Orange"];
const numbers = new Array(1, 2, 3, 4, 5);

// Accessing array elements
console.log(fruits[0]); // Apple
console.log(numbers[2]); // 3

// Array methods
fruits.push("Mango"); // Add to end
fruits.pop(); // Remove from end
fruits.unshift("Kiwi"); // Add to beginning
fruits.shift(); // Remove from beginning

console.log(fruits.length); // Array length`
  },
  {
    id: 'js-conditionals',
    title: 'Conditional Statements',
    content: `
      <p>Conditional statements are used to perform different actions based on different conditions. Very often when you write code, you want to perform different actions for different decisions.</p>
    `,
    codeExample: `// If statement
if (age >= 18) {
  console.log("You are an adult");
} else {
  console.log("You are a minor");
}

// Else if
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else {
  grade = "F";
}

// Switch statement
switch (day) {
  case 0:
    dayName = "Sunday";
    break;
  case 1:
    dayName = "Monday";
    break;
  default:
    dayName = "Unknown";
}`
  },
  {
    id: 'js-loops',
    title: 'Loops',
    content: `
      <p>Loops can execute a block of code a number of times. JavaScript supports different kinds of loops: for, for/in, for/of, while, and do/while.</p>
    `,
    codeExample: `// For loop
for (let i = 0; i < 5; i++) {
  console.log("Number: " + i);
}

// While loop
let count = 0;
while (count < 5) {
  console.log("Count: " + count);
  count++;
}

// For/in loop (for objects)
const person = {fname:"John", lname:"Doe", age:25};
for (let key in person) {
  console.log(key + ": " + person[key]);
}

// For/of loop (for arrays)
const fruits = ["Apple", "Banana", "Orange"];
for (let fruit of fruits) {
  console.log(fruit);
}`
  },
  {
    id: 'js-dom',
    title: 'DOM Manipulation',
    content: `
      <p>The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content. The DOM represents the document as nodes and objects.</p>
    `,
    codeExample: `// Selecting elements
const element = document.getElementById("myId");
const elements = document.getElementsByClassName("myClass");
const queryElement = document.querySelector(".myClass");

// Changing HTML content
element.innerHTML = "New content";
element.textContent = "New text";

// Changing CSS styles
element.style.color = "blue";
element.style.fontSize = "20px";

// Event handling
button.addEventListener("click", function() {
  alert("Button clicked!");
});`
  },
  {
    id: 'js-es6',
    title: 'ES6 Features',
    content: `
      <p>ES6 (ECMAScript 2015) introduced many new features to JavaScript including let/const, arrow functions, template literals, destructuring, modules, classes, promises, and more.</p>
    `,
    codeExample: `// Let and const
const PI = 3.14159;
let radius = 10;

// Arrow functions
const add = (a, b) => a + b;
const square = x => x * x;

// Template literals
const name = "John";
const greeting = \`Hello, \${name}!\`;

// Destructuring
const person = { name: "John", age: 30 };
const { name, age } = person;

// Classes
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  
  area() {
    return this.height * this.width;
  }
}`
  },
  {
    id: 'js-async',
    title: 'Asynchronous JavaScript',
    content: `
      <p>Asynchronous JavaScript allows you to execute long-running operations without blocking the main thread. This includes callbacks, promises, and async/await.</p>
    `,
    codeExample: `// Callbacks
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received");
  }, 2000);
}

fetchData((data) => {
  console.log(data);
});

// Promises
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved");
  }, 2000);
});

promise.then(result => {
  console.log(result);
});

// Async/await
async function fetchDataAsync() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}`
  }
];
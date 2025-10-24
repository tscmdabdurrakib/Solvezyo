export interface Topic {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
}

export const reactTopics: Topic[] = [
  {
    id: 'react-intro',
    title: 'React Introduction',
    content: `
      <p>React is a JavaScript library for building user interfaces. It is declarative, efficient, and flexible. React lets you compose complex UIs from small and isolated pieces of code called "components".</p>
      <p>React was first created in 2011 by Jordan Walke, a software engineer at Facebook. It was first used on Facebook's News Feed and later on Instagram.</p>
    `,
    codeExample: `// Simple React component
import React from 'react';

function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>Welcome to the world of React</p>
    </div>
  );
}

export default App;`
  },
  {
    id: 'react-components',
    title: 'Components and Props',
    content: `
      <p>Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen.</p>
    `,
    codeExample: `// Function component with props
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// ES6 destructuring
function Welcome({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old</p>
    </div>
  );
}

// Using the component
<Welcome name="John" age={25} />`
  },
  {
    id: 'react-state',
    title: 'State and Lifecycle',
    content: `
      <p>State is similar to props, but it is private and fully controlled by the component. State allows React components to change their output over time in response to user actions, network responses, and anything else.</p>
    `,
    codeExample: `import React, { useState, useEffect } from 'react';

function Counter() {
  // State hook
  const [count, setCount] = useState(0);
  
  // Effect hook
  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  }, [count]);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`
  },
  {
    id: 'react-hooks',
    title: 'React Hooks',
    content: `
      <p>Hooks are functions that let you "hook into" React state and lifecycle features from function components. Hooks don't work inside classes — they let you use React without classes.</p>
    `,
    codeExample: `import React, { useState, useEffect, useContext } from 'react';

// useState hook
const [name, setName] = useState('John');

// useEffect hook
useEffect(() => {
  console.log('Component mounted or updated');
}, []);

// Custom hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}`
  },
  {
    id: 'react-events',
    title: 'Handling Events',
    content: `
      <p>Handling events with React elements is very similar to handling events on DOM elements. There are some syntax differences: React events are named using camelCase, rather than lowercase. With JSX you pass a function as the event handler, rather than a string.</p>
    `,
    codeExample: `function Button() {
  // Event handler
  const handleClick = (event) => {
    console.log('Button clicked!', event);
  };
  
  // Passing arguments
  const handleDelete = (id) => {
    console.log('Delete item:', id);
  };
  
  return (
    <div>
      <button onClick={handleClick}>
        Click me
      </button>
      <button onClick={() => handleDelete(123)}>
        Delete item
      </button>
    </div>
  );
}`
  },
  {
    id: 'react-conditional',
    title: 'Conditional Rendering',
    content: `
      <p>In React, you can create distinct components that encapsulate behavior you need. Then, you can render only some of them, depending on the state of your application.</p>
    `,
    codeExample: `function Greeting({ isLoggedIn }) {
  // If/else
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function LoginButton({ isLoggedIn, onClick }) {
  // Element variables
  let button;
  if (isLoggedIn) {
    button = <button onClick={onClick}>Logout</button>;
  } else {
    button = <button onClick={onClick}>Login</button>;
  }
  return button;
}

function Mailbox({ unreadMessages }) {
  // &&
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}`
  },
  {
    id: 'react-lists',
    title: 'Lists and Keys',
    content: `
      <p>Below, we loop through the numbers array using the JavaScript map() function. We return a li element for each item. When we run this code, we'll be given a warning that a key should be provided for list items.</p>
    `,
    codeExample: `function NumberList({ numbers }) {
  // Key should be unique
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}`
  },
  {
    id: 'react-forms',
    title: 'Forms',
    content: `
      <p>HTML form elements work a bit differently from other DOM elements in React, because form elements naturally keep some internal state. In React, mutable state is typically kept in the state property of components, and only updated with setState().</p>
    `,
    codeExample: `function NameForm() {
  const [name, setName] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Name submitted:', name);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}`
  },
  {
    id: 'react-context',
    title: 'Context',
    content: `
      <p>Context provides a way to pass data through the component tree without having to pass props down manually at every level. Context is designed to share data that can be considered "global" for a tree of React components.</p>
    `,
    codeExample: `import React, { createContext, useContext } from 'react';

// Create context
const ThemeContext = createContext('light');

// Provider component
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// Consumer component
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

// Using useContext hook
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button className={theme}>
      I am styled by theme context!
    </button>
  );
}`
  },
  {
    id: 'react-router',
    title: 'React Router',
    content: `
      <p>React Router is a standard library for routing in React. It enables the navigation among views of various components in a React Application, allows changing the browser URL, and keeps the UI in sync with the URL.</p>
    `,
    codeExample: `import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}`
  }
];
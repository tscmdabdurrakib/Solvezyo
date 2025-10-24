export interface Topic {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
}

export const nodejsTopics: Topic[] = [
  {
    id: 'nodejs-intro',
    title: 'Node.js Introduction',
    content: `
      <p>Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting.</p>
      <p>Node.js represents a "JavaScript everywhere" paradigm, unifying web-application development around a single programming language rather than different languages for server-side and client-side scripts.</p>
    `,
    codeExample: `// Simple Node.js server
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, Node.js!');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3000/');
});`
  },
  {
    id: 'nodejs-modules',
    title: 'Modules and NPM',
    content: `
      <p>In Node.js, each file is treated as a separate module. Modules are the fundamental way to organize code in Node.js. Node.js has a simple module loading system. In Node.js, files and modules are in one-to-one correspondence.</p>
      <p>NPM (Node Package Manager) is the default package manager for Node.js. It is used to manage dependencies and packages in Node.js applications.</p>
    `,
    codeExample: `// Creating a module
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };

// Using a module
// app.js
const { add, subtract } = require('./math');

console.log(add(5, 3)); // 8
console.log(subtract(5, 3)); // 2

// Using NPM packages
const express = require('express');
const lodash = require('lodash');`
  },
  {
    id: 'nodejs-file-system',
    title: 'File System',
    content: `
      <p>The fs module provides an API for interacting with the file system in a manner closely modeled around standard POSIX functions. All file system operations have synchronous and asynchronous forms.</p>
    `,
    codeExample: `const fs = require('fs');

// Reading a file asynchronously
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Writing to a file asynchronously
fs.writeFile('output.txt', 'Hello, Node.js!', (err) => {
  if (err) throw err;
  console.log('File written successfully!');
});

// Synchronous operations
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);

fs.writeFileSync('output.txt', 'Hello, Node.js!');`
  },
  {
    id: 'nodejs-events',
    title: 'Events',
    content: `
      <p>Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture in which certain kinds of objects (called "emitters") emit named events that cause Function objects ("listeners") to be called.</p>
    `,
    codeExample: `const EventEmitter = require('events');

// Create an event emitter
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

// Register event listeners
myEmitter.on('event', () => {
  console.log('An event occurred!');
});

// Emit events
myEmitter.emit('event');

// Event with parameters
myEmitter.on('data', (data) => {
  console.log('Received data:', data);
});

myEmitter.emit('data', { name: 'John', age: 30 });`
  },
  {
    id: 'nodejs-streams',
    title: 'Streams',
    content: `
      <p>Streams are objects that let you read data from a source or write data to a destination in continuous fashion. In Node.js, there are four fundamental stream types: Readable, Writable, Duplex, and Transform.</p>
    `,
    codeExample: `const fs = require('fs');

// Reading stream
const readStream = fs.createReadStream('input.txt');
readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.toString());
});
readStream.on('end', () => {
  console.log('Finished reading file');
});

// Writing stream
const writeStream = fs.createWriteStream('output.txt');
writeStream.write('Hello, ');
writeStream.write('Node.js!');
writeStream.end();

// Piping streams
const readStream2 = fs.createReadStream('input.txt');
const writeStream2 = fs.createWriteStream('output.txt');
readStream2.pipe(writeStream2);`
  },
  {
    id: 'nodejs-express',
    title: 'Express.js',
    content: `
      <p>Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It facilitates the rapid development of Node based Web applications.</p>
    `,
    codeExample: `const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ id: userId, name: 'John Doe' });
});

app.post('/users', (req, res) => {
  const userData = req.body;
  // Process user data
  res.status(201).json({ id: 123, ...userData });
});

// Start server
app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}\`);
});`
  },
  {
    id: 'nodejs-database',
    title: 'Database Integration',
    content: `
      <p>Node.js can work with various databases including MongoDB, PostgreSQL, MySQL, and more. Popular database libraries include Mongoose for MongoDB and Sequelize for SQL databases.</p>
    `,
    codeExample: `// MongoDB with Mongoose
const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost:27017/myapp');

// Define schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

// Create model
const User = mongoose.model('User', userSchema);

// CRUD operations
// Create
const newUser = new User({ name: 'John', email: 'john@example.com', age: 30 });
newUser.save();

// Read
User.find({ age: { $gte: 18 } }, (err, users) => {
  console.log(users);
});

// Update
User.updateOne({ name: 'John' }, { age: 31 }, (err, result) => {
  console.log(result);
});

// Delete
User.deleteOne({ name: 'John' }, (err) => {
  console.log('User deleted');
});`
  },
  {
    id: 'nodejs-rest-api',
    title: 'RESTful APIs',
    content: `
      <p>REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP requests to access and use data. They use HTTP verbs like GET, POST, PUT, DELETE to perform operations.</p>
    `,
    codeExample: `const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// In-memory data store (in real apps, use a database)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST create new user
app.post('/api/users', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(user);
  res.status(201).json(user);
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  user.name = req.body.name;
  user.email = req.body.email;
  res.json(user);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).json({ error: 'User not found' });
  
  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser);
});`
  },
  {
    id: 'nodejs-auth',
    title: 'Authentication',
    content: `
      <p>Authentication is the process of verifying who a user is. Authorization is the process of verifying what they have access to. Common authentication methods include JWT (JSON Web Tokens), sessions, and OAuth.</p>
    `,
    codeExample: `const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// User registration
app.post('/register', async (req, res) => {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    // Save user to database
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User login
app.post('/login', async (req, res) => {
  try {
    // Find user
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    
    // Check password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });
    
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}`
  },
  {
    id: 'nodejs-testing',
    title: 'Testing',
    content: `
      <p>Testing is an essential part of software development. Node.js has several testing frameworks including Jest, Mocha, and Chai. Testing ensures that your code works as expected and helps prevent bugs.</p>
    `,
    codeExample: `// Using Jest for testing
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };

// math.test.js
const { add, subtract } = require('./math');

describe('Math functions', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });
  
  test('subtracts 5 - 3 to equal 2', () => {
    expect(subtract(5, 3)).toBe(2);
  });
});

// Async testing
test('fetches user data', async () => {
  const userData = await fetchUser(123);
  expect(userData).toHaveProperty('name');
  expect(userData.name).toBe('John Doe');
});

// Mocking
jest.mock('./database');
const db = require('./database');

test('creates user', async () => {
  db.save.mockResolvedValue({ id: 1, name: 'John' });
  
  const user = await createUser({ name: 'John' });
  expect(user.id).toBe(1);
  expect(db.save).toHaveBeenCalledWith({ name: 'John' });
});`
  }
];
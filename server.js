import express from 'express';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 4000;

// Use Morgan middleware
app.use(morgan('dev'));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, 'public')));

// Hardcoded password
const CORRECT_PASSWORD = '12345610';

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Express.js server! <a href="/login.html">Login</a>');
});

// Login route - POST
app.post('/login', (req, res) => {
  const { password } = req.body;

  if (password === CORRECT_PASSWORD) {
    res.redirect('/node-course.html');
  } else {
    res.status(401).send('Incorrect password. <a href="/login.html">Try again</a>');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
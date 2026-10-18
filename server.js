const express = require('express');

const app = express();
const PORT = 5000;

// Sample users are stored in memory; no database is needed for this assignment.
const users = [
  { id: 1, name: 'Ali' },
  { id: 2, name: 'Ahmed' },
  { id: 3, name: 'Sara' },
];

// Log every incoming request before Express handles its route.
app.use((req, res, next) => {
  console.log('Request received');
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

app.get('/about', (req, res) => {
  res.json({ message: 'This is a basic REST API built with Express.' });
});

app.get('/contact', (req, res) => {
  res.json({ message: 'Contact us at contact@example.com.' });
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const requestedId = Number(req.params.id);
  const user = users.find((currentUser) => currentUser.id === requestedId);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  return res.json(user);
});

app.get('/search', (req, res) => {
  const name = req.query.name;

  if (!name) {
    return res.status(400).json({ message: 'The name query parameter is required.' });
  }

  return res.json({ message: `Searching for ${name}` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
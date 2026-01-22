const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// CORS and common headers middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Controllers
const usersController = require('./controllers/users');

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1><p><a href="/users">View users</a></p>');
});

app.get('/users', usersController.getUsers);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

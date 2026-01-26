require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// JSON body parser
app.use(express.json());

// Whitelist of allowed origins
const whitelist = [
  'https://localhost',
  'https://localhost:4200',,
  // Add more origins as needed:
  'https://app-ui-rims-master-test-eastus-01.azurewebsites.net',
  // 'https://www.yourdomain.com'
];

// CORS and common headers middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (whitelist.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Controllers
const usersController = require('./controllers/users');
const googleMapsController = require('./controllers/google-maps');

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1><p><a href="/users">View users</a></p>');
});

app.get('/users', usersController.getUsers);

app.get('/getLatLong', googleMapsController.getLatLong);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

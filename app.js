const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const applicationRouter = require('./routes/application');
const publicRouter = require('./routes/public');
const userRoutes = require('./routes/userRoutes.js');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configure express-session middleware
app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000, 
    }
}));

app.get('/user-data', (req, res) => {
  fs.readFile('application/data/mockUserData.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching user data');
      return;
    }
    res.json(JSON.parse(data));
  });
});


// Define routes
app.use('/api/', applicationRouter);
app.use('/', publicRouter);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
    console.info(`Server has started on ${PORT}`);
});

module.exports = app;

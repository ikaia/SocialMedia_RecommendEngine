const express = require('express');
const session = require('express-session');
const path = require('path');
const applicationRouter = require('./routes/application');
const publicRouter = require('./routes/public');
const userRoutes = require('./routes/userRoutes.js');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configure express-session middleware
app.use(session({
    secret: 'your_secret_key', // Change this to a random string
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000, 
    }
}));

// Define routes
app.use('/api/', applicationRouter);
app.use('/', publicRouter);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
    console.info(`Server has started on ${PORT}`);
});

module.exports = app;

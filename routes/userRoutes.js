const express = require('express');
const router = express.Router();
const users = require('../application/data/mockUserData.json');
const session = require('express-session');

// Configure express-session middleware
router.use(session({
    secret: 'your_secret_key', // Change this to a random string
    resave: false,
    saveUninitialized: false,
}));

router.post('/register', (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if user with the same email already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        // Create user object
        const newUser = {
            id: users.length + 1, // Generate new user ID
            username,
            email,
            password, // Store plain-text password will change later
        };
        // Add new user to mock database
        users.push(newUser);

        // Store user ID in session
        req.session.userId = newUser.id;

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Session data (login):', req.session);

    // Find user by email
    const user = users.find(user => user.email === email);
    console.log('Found user:', user); // Add this line for debugging

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Compare passwords (plain text)
    if (password !== user.password) {
        return res.status(401).json({ error: 'Invalid password' });
    }

    // Store user ID in session
    req.session.userId = user.id;

    res.json({ message: 'Login successful' });
});


router.post('/logout', (req, res) => {
    // Destroy session on logout
    console.log('Session data (logout):', req.session);
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.json({ message: 'Logout successful' });
    });
});

module.exports = router;

require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const path = require('path');
const users = require(path.join(__dirname, '../application/data/mockUserData.json'));


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
            password, // Store plain-text password
        };
        // Add new user to mock database
        users.push(newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Compare passwords
    if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid password' });
    }

    // If passwords match, generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Generate a refresh token
    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    res.json({ message: 'Login successful', token, refreshToken });
});


// Route for token refresh
router.post('/refresh-token', (req, res) => {
    const refreshToken = req.body.refreshToken;

    // Validate refreshToken
    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid refresh token' });
        }

        // Refresh token is valid, generate a new access token
        const userId = decoded.userId; // Extract user ID from refresh token payload

        // Find user by ID (you need to implement this logic)
        const user = users.find(user => user.id === userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate a new access token
        const newToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the new token to the client
        res.json({ token: newToken });
    });
});


module.exports = router;

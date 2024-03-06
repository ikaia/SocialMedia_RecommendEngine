require('dotenv').config();
const express = require('express');
const router = express.Router();
const users = require('../application/data/mockUserData');



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

    const secretKey = process.env.SECRET_KEY;
    try {
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
        const token = jwt.sign({ userId: user.id, userEmail: user.email }, secretKey);
        // Send token and message in response 
        res.json({ token });
        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to login' });
    }
});


module.exports = router;

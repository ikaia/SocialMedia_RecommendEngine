const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs');
const session = require('express-session');


// Configure express-session middleware
router.use(session({
    secret: 'your_secret_key', // Change this to a random string
    resave: false,
    saveUninitialized: false,
}));

// Load existing user data from the JSON file
let users = [];
try {                              
    const userData = fs.readFileSync('application/data/mockUserData.json');
    users = JSON.parse(userData);
} catch (error) {
    console.error('Error reading user data:', error);
}

router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        
        // Check if user with the same email already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Generate a random salt
        const saltRounds = 10; // Adjust according to your security needs
        const salt = await bcrypt.genSalt(saltRounds);

        // Generate a pepper (additional secret key)
        const pepper = 'your_pepper_value'; // Change this to a strong random string
        
        // Combine password with pepper before hashing
        const hashedPassword = await bcrypt.hash(password + pepper, salt);

        // Create user object with hashed password and salt
        const newUser = {
            id: users.length + 1, // Generate new user ID
            email,
            username,
            hashedPassword,
            salt,
            ratings: [],
        };
        
        // Add new user to the existing user array
        users.push(newUser);

        // Write updated user data back to the JSON file
        fs.writeFileSync('application/data/mockUserData.json', JSON.stringify(users, null, 2));

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
    console.log('Found user:', user); 

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Compare passwords 
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

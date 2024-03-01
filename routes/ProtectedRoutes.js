const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken.js');

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected route accessed successfully' });
});

module.exports = router;

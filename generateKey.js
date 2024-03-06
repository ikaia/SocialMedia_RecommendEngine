const fs = require('fs');

// Function to generate a random secret key
function generateRandomSecretKey() {
    // Generate a random string for the secret key
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return randomString;
}

// Generate a random secret key for JWT_SECRET
const jwtSecretKey = generateRandomSecretKey();

// Generate a random secret key for JWT_REFRESH_SECRET
const jwtRefreshSecretKey = generateRandomSecretKey();

// Write the secret keys to the .env file
fs.writeFileSync('.env', `JWT_SECRET=${jwtSecretKey}\nJWT_REFRESH_SECRET=${jwtRefreshSecretKey}\n`);

console.log('Secret keys generated and saved to .env file:');
console.log('JWT_SECRET:', jwtSecretKey);
console.log('JWT_REFRESH_SECRET:', jwtRefreshSecretKey);

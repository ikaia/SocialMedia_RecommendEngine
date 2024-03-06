
// Function to refresh token
async function refreshToken(refreshToken) {
    try {
        const response = await fetch('/user/refresh-token', { // Changed endpoint to match server-side route
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken })
        });
        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error('Failed to refresh token:', error);
        throw error;
    }
}

// Example usage:
async function handleTokenExpiration() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
        try {
            const newToken = await refreshToken(refreshToken);
            localStorage.setItem('token', newToken);
            console.log('Token refreshed successfully');
        } catch (error) {
            console.error('Token refresh failed:', error);
            // Handle error (e.g., redirect to login page)
        }
    } else {
        // Handle scenario where refreshToken is not available (e.g., redirect to login page)
    }
}

// Call handleTokenExpiration on app startup or wherever token expiration needs to be handled
handleTokenExpiration();

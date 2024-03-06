
async function login(email, password) {
    try {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        
        // Store tokens in local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        
        console.log('Login successful');
        
        // Call handleTokenExpiration after login
        handleTokenExpiration();
    } catch (error) {
        console.error('Login failed:', error);
    }
}



// Function to refresh token
async function refreshToken(refreshToken) {
    try {
        const response = await fetch('/user/refresh-token', {
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
    }
}


setInterval(handleTokenExpiration, 60000); 
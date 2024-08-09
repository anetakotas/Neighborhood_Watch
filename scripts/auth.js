document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in by querying the session endpoint
    fetch('http://localhost:8005/session')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                // User is logged in, show the Log Out button
                document.getElementById('loginButton').style.display = 'none';
                document.getElementById('registerButton').style.display = 'none';
                document.getElementById('logoutButton').style.display = 'inline-block';
                document.getElementById('logoutButton').addEventListener('click', function() {
                    // Handle logout
                    fetch('http://localhost:8005/logout', {
                        method: 'POST',
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.message === 'Logout successful') {
                                window.location.reload(); // Reload the page to update the UI
                            }
                        });
                });
            } else {
                // User is not logged in, show the Log In and Register buttons
                document.getElementById('loginButton').style.display = 'inline-block';
                document.getElementById('registerButton').style.display = 'inline-block';
                document.getElementById('logoutButton').style.display = 'none';

                // Redirect to login and register pages when buttons are clicked
                document.getElementById('loginButton').addEventListener('click', function() {
                    window.location.href = 'login.html';
                });

                document.getElementById('registerButton').addEventListener('click', function() {
                    window.location.href = 'register.html';
                });
            }
        })
        .catch(error => {
            console.error('Error fetching session status:', error);
        });
});

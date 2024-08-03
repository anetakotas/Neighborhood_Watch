document.addEventListener('DOMContentLoaded', function() {
    const authButton = document.getElementById('authButton');

    function updateAuthButton(loggedIn) {
        if (loggedIn) {
            authButton.innerHTML = '<button id="logoutButton">Logout</button>';
            document.getElementById('logoutButton').addEventListener('click', function() {
                fetch('http://localhost:8000/logout', {
                    method: 'POST'
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message === 'Logout successful') {
                            window.location.href = 'index.html';
                        }
                    });
            });
        } else {
            authButton.innerHTML = '<a href="login.html">Login</a>';
        }
    }

    fetch('http://localhost:8000/session')
        .then(response => response.json())
        .then(data => {
            updateAuthButton(data.loggedIn);
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Login successful') {
                message.textContent = 'Login successful';
                message.style.color = 'green';
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                message.textContent = data.message;
                message.style.color = 'red';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            message.textContent = "An error occurred during login";
            message.style.color = 'red';
        });
});

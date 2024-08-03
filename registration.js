// registration.js

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const message = document.getElementById('message');

    if (password !== confirmPassword) {
        message.textContent = 'Passwords do not match!';
        message.style.color = 'red';
        return;
    }

    fetch(`http://localhost:8000/users/check?username=${username}&email=${email}`)
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Username or email already taken') {
                message.textContent = 'Username or email is already taken.';
                message.style.color = 'red';
            } else {
                fetch('http://localhost:8000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, email, password })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message) {
                            message.textContent = data.message;
                            message.style.color = 'red';
                        } else {
                            message.textContent = 'Registration successful';
                            message.style.color = 'green';
                            setTimeout(() => {
                                window.location.href = `profile.html?id=${data.user._id}`;
                            }, 1500);
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        message.textContent = "An error has occurred during registration";
                        message.style.color = 'red';
                    });
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            message.textContent = "An error has occurred during registration";
            message.style.color = 'red';
        });
});

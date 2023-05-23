const loginForm = document.getElementById('login');

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const formData = { email, password }

    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        window.location.replace('/profile');
    } else {
        alert('Login failed...');
    }
});

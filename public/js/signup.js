// attach event listener to signup form, specifically submit event
// prevent default
// alert('Signup');

const signupForm = document.getElementById('signup');

signupForm.addEventListener('submit', async function(event){
    event.preventDefault();

    const name = document.getElementById('signup-name').value;
    const password = document.getElementById('signup-password').value;
    const email = document.getElementById('signup-email').value;

    const formData = { name, email, password }

    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        window.location.replace('/profile');
    } else {
        alert('Signup failed...');
    }
})
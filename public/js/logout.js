const logoutButton = document.querySelector('#logout');

logoutButton.addEventListener('click', async event => {
	event.preventDefault();

	const response = await fetch(`/api/users/logout`, {
		method: 'POST'
	});

	if (response.ok) {
		window.location.replace('/');
	}
})
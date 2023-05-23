const projectForm = document.getElementById("project");

projectForm.addEventListener('submit', async event => {
	event.preventDefault();

	const name = document.getElementById("proj-name").value;
	const description = document.getElementById("proj-description").value;
	const needed_funding = document.getElementById("proj-needed_funding").value;

	const formData = { name, description, needed_funding };
	
	console.log(formData);

	const response = await fetch('/api/projects', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData)
	});

	if (response.ok) {
		window.location.reload();
	} else {
		alert('Add project failed...');
	}
});
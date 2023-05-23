const deleteBtn = document.querySelector('button');

deleteBtn.addEventListener('click', async event => {
	event.preventDefault();
	
	const id = event.target.id;

	alert(id);

	const response = await fetch(`/api/projects/${id}`, {
		method: 'DELETE'
	});

	if (response.ok) {
		window.location.reload();
	}
})
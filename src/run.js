document.addEventListener('DOMContentLoaded', () => {
	//
	//Promise that all title images have been loaded
	Promise.all(title).then(() => {
		//
		//Promise that all resource images have been loaded
		Promise.all(resource).then(() => {
			main();
		});
	});
});

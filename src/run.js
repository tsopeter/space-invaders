document.addEventListener('DOMContentLoaded', () => {
	//
	//got the idea to have a Promise.all to check array of
	//promises from user
	//https://stackoverflow.com/questions/11071314/javascript-execute-after-all
	//-images-have-loaded

	//
	//Promise that all title images have been loaded
	Promise.all(title).then(() => {
		//
		//Promise that all resource images have been loaded
		Promise.all(resource).then(() => {
			//
			//run the main function
			main();
		});
	});
});

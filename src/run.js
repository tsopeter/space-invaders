document.addEventListener('DOMContentLoaded', () => {
	resource = loadImages(resourceFiles);
	title = loadImages(titleFiles);

	//wait until the images have allImagesLoaded be true
	//macOS Safari fixed
	wait();
});

function wait(){
	setTimeout(() => {
		if(!allImagesLoaded){
			wait();
		}
		else{
			main();
		}
	}, 10)
}

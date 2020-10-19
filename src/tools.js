function editSystem(event){
	return (event) => {
		if(editorStarted){
			console.log('hello');
			draw(title[3], 0, 0);
			render();
			
			let boundary = canvas.getBoundingClientRect();
			let leftshift = boundary.x;
			let downshift = boundary.y;
			
			//
			//click only when at certain coordinates
			console.log('x: ' + event.clientX + ', y: ' + event.clientY);	
			if(event.clientX >= leftshift + 0 && event.clientX <= leftshift + 75
		  	&& event.clientY >= downshift + 0 && event.clientY <= downshift + 21){
		  		console.log('exit clicked');
		  		editorStarted = false;
		  		
		  		//
		  		//draw the title screen
		  		menu();	
			}
			else{
				//
				//compute the points to click
				let placeXi = Math.floor((event.clientX - leftshift) / scale);
				let placeXf = Math.ceil((event.clientX - leftshift) / scale);
				
				let placeYi = Math.floor((event.clientY - downshift) / scale);
				let placeYf = Math.ceil((event.clientY - downshift) / scale);
				
				console.log('xi: ' + placeXi + ', yi: ' + placeYi);
				console.log('xf: ' + placeXf + ', yf: ' + placeYf);
			}
		}
	};
}

function editor(){
	edited = true;
	console.log('editor called');
	
	draw(title[3], 0, 0);
	render();
	
	canvas.addEventListener('click', editSystem(event));
	console.log('editor ended');
}

function clearArrays(){
	if(objArr.length != 1){
		objArr
	}
}

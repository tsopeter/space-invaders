function editSystem(event){
	return (event) => {
		if(editorStarted){
			console.log('hello');
			
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
				let placeYi = Math.floor((event.clientY - downshift) / scale);
				
				console.log('xi: ' + placeXi + ', yi: ' + placeYi);
				
				//
				//check for already placed objects
				let placable = true;
				for(var i = 0; i < objArr.length; i++){
					let o = objArr[i];
					if(o.x == placeXi && o.y == placeYi){
						objArr.splice(i, 1);
						placable = false;
					}
				}
				
				//
				//place blocks
				if(placable){
					objArr.push(new block(placeXi, placeYi, resource[8]));
				}
				
				draw(title[3], 0, 0);
				render();
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

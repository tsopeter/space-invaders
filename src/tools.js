let selectBlockType = 0;
const blockType = {
	INVADER: 0,
	BLOCK: 1	
};
Object.freeze(blockType);

function editSystem(event){
	return (event) => {
		if(editorStarted){
			//console.log('hello');
			
			let boundary = canvas.getBoundingClientRect();
			let leftshift = boundary.x;
			let downshift = boundary.y;
			
			//
			//click only when at certain coordinates
			console.log('x: ' + event.clientX + ', y: ' + event.clientY);	
			if(event.clientX >= leftshift + 0 && event.clientX <= leftshift + 75
		  	&& event.clientY >= downshift + 0 && event.clientY <= downshift + 21){
		  		//console.log('exit clicked');
		  		editorStarted = false;
		  		
		  		//
		  		//draw the title screen
		  		menu();	
			}
			else{
				//
				//compute the points to click
				let placeXi = Math.floor(event.clientX - leftshift - 20);
				let placeYi = Math.floor(event.clientY - downshift - 20);
				
				console.log('xi: ' + placeXi + ', yi: ' + placeYi);
				
				//
				//check for already placed objects
				let placable = true;
				for(var i = 0; i < objArr.length; i++){
					if(!blockCollision(placeXi, placeYi, objArr[i])){
						objArr.splice(i, 1);
						placable = false;
					}
				}
				
				//
				//place blocks
				if(placable){
					switch (selectBlockType) {
						case blockType.INVADER:
							objArr.push(new invader(placeXi, placeYi, 1, resource[4], resource[7]));
							break;
						case blockType.BLOCK:
							objArr.push(new block(placeXi, placeYi, resource[8]));
							break;
					}
				}
				
				draw(title[3], 0, 0);
				render();
			}
		}
	};
}

function blockCollision(x, y, o){
	//
	//make sure that anchor point is out of present block
	if(o.x <= x && x < o.x + o.scale && o.y <= y && y < o.y + o.scale){
		return false;
	}
	//
	//make sure that alternative point is out of present block
	let x2 = x + objScale;
	let y2 = y + objScale;
	
	if(o.x <= x2 && x2 < o.x + o.scale && o.y <= y2 && y < o.y + o.scale){
		return false;
	}
	return true;
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

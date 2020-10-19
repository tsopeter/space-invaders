menuFunction = function(event){
	let clicker = function(event){
		//
		//only functions when the game has not started
		if(gameStarted){
			console.log('game Started Already');
			return;
		}
		
		//
		//compute the boundaries
		let boundary = canvas.getBoundingClientRect();
		let leftshift = boundary.x;
		let downshift = boundary.y;
		
		//
		//click only when at certain coordinates
		console.log('x: ' + event.clientX + ', y: ' + event.clientY);	
		if(event.clientX >= leftshift + ((canvas.width / 2) - 131) && event.clientY <= leftshift + ((canvas.width / 2) + 131)
		   && event.clientY >= downshift + ((canvas.height / 2) + 65) && event.clientY <= downshift + ((canvas.height / 2) + 65 + 72)){
		   	gameStarted = true;
		   	console.log('clicked');
		   	progShell();
		   }
	};
	
	return clicker;
}

function ending(){

}

function menu(){
	//
	//draw the title and background
	draw(title[0], 0, 0);
	console.log('background drawed');
	
	//
	//draw the start button	
	draw(title[1], (canvas.width / 2) - 131, (canvas.height / 2) + 50);
	console.log('start button drawed');
	
	//
	//enable clicking of the screen
	canvas.addEventListener('click', menuFunction(event));	
	console.log('canvas added click');
}

function setup(){
	console.log('setup started');
	//
	//load all sprites into the respective objects
	p.setSprite(resource[0]);
	objArr.push(p);
	console.log('player object loaded');
	
	//
	//setup the enemy
	let e = new invader(10, 10, 1, resource[4], resource[7]);
	let g = new invader(13, 10, 1, resource[4], resource[7]);
	console.log('invader object(s) loaded');
	
	for(var i = 0; i < 10; i++){
		objArr.push(new block(5 + i, gameDimension.height - 4, resource[8]));
	}
	console.log('block object(s) loaded');
	
	objArr.push(e);
	objArr.push(g);
	
	console.log('setup finished');
	
}

function progShell(){
	console.log('programShell Called');
	canvas.removeEventListener('click', menuFunction(event));
	console.log('canvas removed click');
	
	console.log('program Called');
	prog(0);
}

function prog(x){
	if(gameFlag){
		setTimeout(() => {
			document.getElementById('frame-counter').innerText = 'frame: ' + x++;
			update();
			render();
			prog(x);
		}, 50);
	}
}

function update(){
	//
	//update the projectiles
	for(var i = 0; i < projectileArr.length; i++){
		projectileArr[i].update();
	}
	
	//
	//checks for cases
	for(var i = 0; i < objArr.length; i++){
		let o = objArr[i];
		if(o.Name == 'invader' && (o.x == 0 || o.x >= gameDimension.width - 1)){
			invaderReverse = true;
			invaderDown = true;
			break;
		}
	}
	
	//
	//update the game objects
	for(var i = 0; i < objArr.length; i++){
		objArr[i].update();
	}
	
	//
	//check enemy status
	let invaderCount = 0;
	for(var i = 0; i < objArr.length; i++){
		if(objArr[i].Name == 'invader'){
			invaderCount++;
		}
	}
	
	if(invaderCount == 0){
		alert('You Won the game!');
		gameFlag = false;
		ending();
	}
	
	//
	//reset flags
	invaderReverse = false;
	invaderDown = false;
}

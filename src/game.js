menuFunction = function(event){
	let clicker = function(event){
		//
		//only functions when the game has not started
		if(gameStarted || editorStarted){
			//console.log('functions begun');
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
		if(event.clientX >= leftshift + ((canvas.width / 2) - 131) && event.clientX <= leftshift + ((canvas.width / 2) + 131)
		   && event.clientY >= downshift + ((canvas.height / 2) + 65) && event.clientY <= downshift + ((canvas.height / 2) + 65 + 72)){
		   	gameStarted = true;
		   	console.log('clicked');
		   	progShell();
		}
		else if(event.clientX >= leftshift + ((canvas.width / 2) - 131) && event.clientX <= leftshift + ((canvas.width / 2) + 131)
		   && event.clientY >= downshift + ((canvas.height / 2) + 165) && event.clientY <= downshift + ((canvas.height / 2) + 165 + 72)){
		   	console.log('editor clicked');
		   	editorStarted = true;
		 	editor();  
		}
	};
	
	return clicker;
}

function ending(x){
	console.log(x);
	if(x == 1){
		alert("You Win");
		
		//
		//draw the winning screen
	}
	else{
		alert("You Lose");
		
		//
		//draw the losing screen
	}
}

function menuShell(){
	menu();
	menuAddClicker();
}

function menuAddClicker(){
	//
	//enable clicking of the screen
	canvas.addEventListener('click', menuFunction(event));	
	console.log('canvas added click');	
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
	//draw the editor button
	draw(title[2], (canvas.width / 2) - 131, (canvas.height / 2) + 150);
}

function playerSetup(){
	console.log('player setup started');
	//
	//load all sprites into the respective objects
	p.setSprite(resource[0]);
	objArr.push(p);
	console.log('player object loaded');
	
	console.log('player setup ended');	
}

function invaderSetup(){
	for(let i = 4; i < 10; i++){
		objArr.push(new invader(8 * objScale, i * objScale, 1, resource[4], resource[7]));
		objArr.push(new invader(10 * objScale, i * objScale, 1, resource[4], resource[7]));
		objArr.push(new invader(14 * objScale, i * objScale, 1, resource[4], resource[7]));
		objArr.push(new invader(16 * objScale, i * objScale, 1, resource[4], resource[7]));
	}
	console.log('invader object(s) loaded');
}

function gameSetup(){
	console.log('setup started');
	
	//
	//setup the enemy
	invaderSetup();
	
	//
	//setup blocks
	chunkBlockAdder();
	//console.log('block object(s) loaded');
	
	console.log('setup finished');
	
}
function chunkBlockAdder(){
	for(var i = 50; i < gameDimension.width; i += 200){
		blockAdder(i, 75 + i, 450, 500);
	}
}

function blockAdder(start, end, startHeight, endHeight){
	for(var i = startHeight; i <= endHeight; i +=  objScale){
		for(var k = start; k <=  end; k += objScale){
			objArr.push(new block(k, i, resource[8]));
		}
	}
}

function progShell(){
	console.log('programShell Called');
	console.log('canvas removed click');
	
	console.log('program Called');
	playerSetup();
	if(!edited || objArr.length == 1){
		gameSetup();
	}
	prog(0);
}

function prog(x){
	if(gameFlag){
		setTimeout(() => {
			document.getElementById('frame-counter').innerText = 'frame: ' + x++;
			update();
			render();
			prog(x);
		}, 20);
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
		if(o.Name == 'invader' && (o.x <= 0 || o.x >= gameDimension.width - objScale)){
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
	numInvaders = Math.sqrt(invaderCount);
	
	if(invaderCount == 0){
		alert('You Won the game!');
		gameFlag = false;
		p.state(true);
	}
	
	//
	//reset flags
	invaderReverse = false;
	invaderDown = false;
}

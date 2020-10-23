function render(){
	//clear the screen first
	clear();
	
	//draw the background
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	for(var i = 0; i < objArr.length; i++){
		let o = objArr[i];
		draw(o.sprite, o.x, o.y);
	}
	
	for(var i = 0; i < projectileArr.length; i++){
		let q = projectileArr[i];
		draw(q.sprite, q.x, q.y);
	}
}

function clear(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

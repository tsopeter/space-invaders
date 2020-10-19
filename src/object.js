class player{
	constructor(x, y){
		this.Name = 'player';
		this.x = x;
		this.y = y;
		this.alive = true;
		
		document.addEventListener('keydown', (e) => {
			if(this.alive){
				//console.log(e.key);
				if(e.key == 'a' && this.x > 0){
					this.x--;
					//console.log(this.x);
				}
				else if(e.key == 'd' && !(this.x >= gameDimension.width - 1)){
					this.x++;
					//console.log(this.x);
				}
				else if(e.key == ' '){
					console.log('fire');
					this.fireProjectile();
				}
			}
		});
	}
	
	update(){
	
	}
		
	setSprite(pr){
		this.sprite = pr;
	}
	
	fireProjectile(){
		projectileArr.push(new projectile(this.x, this.y - 1, -1, resource[5]));
	}
	
	state(i){
		if(i){
	 		alert('You won the game');
		}
		else{
	 		alert('You lost the game');
	 		this.alive = false;
	 		gameFlag = false;
		}
	}
}

class projectile{
	constructor(x, y, speed, sprite){
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.sprite = sprite;
		this.Name = 'projectile';
	}
	
	update(){
		//
		//check for out-of-bounds
		if(this.y - 1 < 0 || this.y + 1 >= gameDimension.height - 1){
			this.remove();
			return;
		}
		//console.log('projectile: ' + this.x + ' ' + this.y);
		//console.log(gameBoard.returnObj(this.x, this.y));
		//	
		//check for collision
		//console.log(this.y + this.speed);
		if(this.collision()){
			this.remove();
			return;
		}
				
		//
		//update position
		
		//
		//update the gameBoard map
		this.y += this.speed;
	}
	
	collision(){
		for(var i = 0; i < objArr.length; i++){
			let o = objArr[i];
			if(this.x == o.x && this.y + this.speed == o.y){
				objArr[i].state(false);
				return true;
			}
		}
		return false;
	}
	
	remove(){
		for(var i = 0; i < projectileArr.length; i++){
			if(projectileArr[i] == this){
				projectileArr.splice(i, 1);
			}
		}	
	}
}

class invader{
	constructor(x, y, speed, sprite, altSprite){
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.Name = 'invader';
		
		this.sprite = sprite;
		this.altSprite = altSprite;
		this.change = false;
		
		this.moveRate = 3;
		this.moveCounter = 0;
			
		this.alive = true;
	}
	
	update(){
		//
		//change to alt sprite
		if(this.change){
			this.change = false;
			let temp = this.sprite;
			this.sprite = this.altSprite;
			this.altSprite = temp;
		}
	
		//
		//fire a projectile	
		let arg0 = Math.floor(Math.random() * 25);
		if(arg0 == 2){
			this.fireProjectile();
			let temp = this.sprite;
			this.sprite = this.altSprite;
			this.altSprite = temp;
			this.change = true;
			
		}
		
		//
		//move
		console.log('invaderReverse: ' + invaderReverse);
		
		this.moveCounter++;
		if(this.moveCounter == this.moveRate){
			if(invaderDown){
				this.y = this.y + 1;
			}
			if(invaderReverse){
				this.speed = -1 * this.speed;
			}
		
			this.x = this.x + this.speed;
			this.moveCounter = 0;
		}
		
		
		//
		//check if out of bounds
		if(this.y >= gameDimension.height - 1){
			this.state(false);
		}
	}
	
	fireProjectile(){
		projectileArr.push(new projectile(this.x, this.y + 1, 1, resource[6]));
	}
	
	state(i){
		if(!i){
			console.log('invader hit');
			for (var i = 0; i < objArr.length; i++){
				if(objArr[i] == this){
					objArr.splice(i, 1);
				}
			}
		}
	}
}

class block{
	constructor(x, y, sprite){
		this.x = x;
		this.y = y;
		this.sprite = sprite;
		this.Name = 'block';
	}
	
	update(){
		
	}
	
	state(i){
		if(!i){
			for(var i = 0; i < objArr.length; i++){
				if(objArr[i] == this){
					objArr.splice(i, 1);
				}
			}
		}
	}
}

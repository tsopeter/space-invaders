class player{
	constructor(x, y){
		this.scale = objScale;
		this.Name = 'player';
		this.x = x;
		this.y = y;
		this.acceleration = 0.1;
		this.alive = true;
		
		document.addEventListener('keydown', (e) => {
			if(this.alive){
				//console.log(e.key);
				let threshold = 8;
				let factor = 20;
				let init_acceleration = 8;
				if(e.key == 'a' && this.x > 0){
					if(Math.abs(this.acceleration) < threshold){
						this.acceleration = init_acceleration;
					}
					else{
						this.acceleration = -this.acceleration;
					}
					this.acceleration = -Math.sqrt(Math.abs(this.acceleration) * factor);
					//console.log(this.x);
				}
				else if(e.key == 'd' && !(this.x >= gameDimension.width - this.scale)){
					if(Math.abs(this.acceleration) < threshold){
						this.acceleration = init_acceleration;
					}
					else{
						this.acceleration = -this.acceleration;
					}
					this.acceleration = Math.sqrt(Math.abs(this.acceleration) * factor);
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
		let threshold = 0.5;
		let factor = 1;
		
		if(this.acceleration < 0){
			factor = -1;
		}
		
		if(Math.abs(this.acceleration) > threshold){
			if(this.x + this.acceleration < 0 || this.x + this.acceleration >= gameDimension.width - this.scale){
				this.acceleration = 0;
				return;
			}
			this.x += this.acceleration;
			
			this.acceleration = Math.abs(this.acceleration) * 0.8 * factor;
		}
		if(Math.abs(this.acceleration) < threshold){
			this.acceleration = 0;
		}
	}
		
	setSprite(pr){
		this.sprite = pr;
	}
	
	fireProjectile(){
		projectileArr.push(new projectile(this.x, this.y - this.scale -1, -1, resource[5], this.Name));
	}
	
	state(i){
		if(i){
	 		gameFlag = false;
	 		ending(1);
		}
		else{
	 		this.alive = false;
	 		gameFlag = false;
	 		ending(2);
		}
	}
}

class projectile{
	constructor(x, y, speed, sprite, objMiss){
		this.scale = objScale;
		this.x = x;
		this.middleX = this.x + 12;
		this.y = y;
		this.speed = speed * this.scale;
		this.sprite = sprite;
		this.Name = 'projectile';
		this.objMiss = objMiss;
	}
	
	update(){
		//
		//check for out-of-bounds
		if(this.y - this.speed < 0 || this.y + this.speed >= gameDimension.height - this.scale){
			this.remove();
			return;
		}

		//
		//check for collision with other objects
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
			if(this.middleX >= o.x && this.middleX < o.x + o.scale && this.y >= o.y && this.y  < o.y + o.scale && o.Name != this.objMiss){
				objArr[i].state(false);
				return true;
			}
			else if(this.middleX >= o.x && this.middleX < o.x + o.scale && this.y + this.scale >= o.y && this.y + this.scale < o.y + o.scale && o.Name != this.objMiss){
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
		this.scale = objScale;
		this.x = x;
		this.y = y;
		this.speed = speed * 5;
		this.Name = 'invader';
		
		this.sprite = sprite;
		this.altSprite = altSprite;
		this.change = false;
		
		this.moveRate = 3;
		this.moveCounter = 0;
			
		this.alive = true;
		
		this.top = true;
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
		//only fire a projectile when it is the bottom at the given x value	
		if(this.top){
			let arg0 = Math.floor(Math.random() * 75);
			if(arg0 == 2){
				this.fireProjectile();
				let temp = this.sprite;
				this.sprite = this.altSprite;
				this.altSprite = temp;
				this.change = true;
				
			}
		}
		
		//
		//move
		console.log('invaderReverse: ' + invaderReverse);
		
		if(invaderDown){
			this.y = this.y + this.scale;
		}
		if(invaderReverse){
			this.speed = -1 * this.speed;
		}
	
		this.x = this.x + this.speed;
		
		//
		//check if out of bounds
		if(this.y >= gameDimension.height){
			this.state(false);
		}
	}
	
	fireProjectile(){
		projectileArr.push(new projectile(this.x, this.y + this.scale + 1, 0.5, resource[6], this.Name));
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
		this.scale = objScale;
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

let canvas = document.getElementById('mycanvas');
let ctx = canvas.getContext('2d');

let scale = 25;

var gameDimension = {
	width: canvas.width / scale,
	height: canvas.height / scale
}

let resourceFiles = ['sprites/001A.png', 'sprites/002.png', 'sprites/003.png', 'sprites/004.png',
		     'sprites/005.png', 'sprites/006.png', 'sprites/007.png', 'sprites/005F.png',
		     'sprites/008.png'];

let titleFiles = ['menu/title01.png', 'menu/start002A.png', 'menu/editor003.png', 'menu/exit004.png'];

let resource;
let title;

let projectileArr = new Array;
let objArr = new Array;

let p = new player(0, gameDimension.height - 2);

let gameFlag = true;

let gameStarted = false;
let editorStarted = false;
let edited = false;

let invaderReverse = false;

let invaderDown = false;

document.getElementById("game").addEventListener('click', () => {
	gameFlag = false;
});

function loadImages(fileArray){
	let resourceCache = new Array;
	for(var i = 0; i < fileArray.length; i++){
		let t_p = new Promise(resolve => {
			let t_img = new Image();
			t_img.addEventListener('load', () => {
				resolve(t_img);
			});
			t_img.src = fileArray[i];
		});
		resourceCache.push(t_p);
	}
	return resourceCache;
}
/**
*	This takes 3 parameters
*	@param {Promise} idx     : Takes the element index of the resource array
*	@param {Integer} dx      : x start of the destination image
*	@param {Integer} dy      : y start of the destination image
*/
function draw(idx, dx, dy){
	idx.then(img => {
		//console.log(img.width);
		ctx.drawImage(img, dx, dy);
	});
}

Walk.shapes.circle = function(radius) {
	var that = new THREE.Shape();

	that.moveTo( 0, radius*2 );
		
	// handle_x, handle_y, endpoint_x, endpoint_y
	that.quadraticCurveTo( radius, radius, radius, 0 );
	that.quadraticCurveTo( radius, -radius, 0, -radius );
	that.quadraticCurveTo( -radius, -radius, -radius, 0 );
	that.quadraticCurveTo( -radius, radius, 0, radius );

	return that;
};
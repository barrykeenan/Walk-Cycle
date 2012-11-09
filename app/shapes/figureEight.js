Walk.shapes.figureEight = function(radius) {
	var that = new THREE.Shape();

	that.moveTo( 0, radius*2 );
		
	// handle_x, handle_y, endpoint_x, endpoint_y
	that.quadraticCurveTo( radius, radius*2, radius, radius );
	that.quadraticCurveTo( radius, 0, 0, 0 );

	that.quadraticCurveTo( -radius, 0, -radius, -radius );
	that.quadraticCurveTo( -radius, -radius*2, 0, -radius*2 );

	that.quadraticCurveTo( radius, -radius*2, radius, -radius );
	that.quadraticCurveTo( radius, 0, 0, 0 );

	that.quadraticCurveTo( -radius, 0, -radius, radius );
	that.quadraticCurveTo( -radius, radius*2, 0, radius*2 );

	return that;
};
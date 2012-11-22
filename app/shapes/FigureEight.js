/**
 * Figure 8 path geometry
 * 
 * @type {FigureEight}
 */
define([

	"three.js/three.min"

], function() {

	// var _foobar = 'private';

	function FigureEight(radius) {
		THREE.Shape.call(this);

		// console.log(_foobar);

		this.moveTo( 0, radius*2 );
			
		// handle_x, handle_y, endpoint_x, endpoint_y
		this.quadraticCurveTo( radius, radius*2, radius, radius );
		this.quadraticCurveTo( radius, 0, 0, 0 );

		this.quadraticCurveTo( -radius, 0, -radius, -radius );
		this.quadraticCurveTo( -radius, -radius*2, 0, -radius*2 );

		this.quadraticCurveTo( radius, -radius*2, radius, -radius );
		this.quadraticCurveTo( radius, 0, 0, 0 );

		this.quadraticCurveTo( -radius, 0, -radius, radius );
		this.quadraticCurveTo( -radius, radius*2, 0, radius*2 );
	};

	FigureEight.prototype = Object.create( THREE.Shape.prototype );

	return FigureEight;

});
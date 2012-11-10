/**
 * Circle path geometry
 * 
 * @type {Circle}
 */
define([

	"three.js/three.min"

], function() {

	function Circle(radius) {
		THREE.Shape.call(this);

		this.moveTo( 0, radius );
			
		// handle_x, handle_y, endpoint_x, endpoint_y
		this.quadraticCurveTo( radius, radius, radius, 0 );
		this.quadraticCurveTo( radius, -radius, 0, -radius );
		this.quadraticCurveTo( -radius, -radius, -radius, 0 );
		this.quadraticCurveTo( -radius, radius, 0, radius );
	};

	Circle.prototype = Object.create( THREE.Shape.prototype );

	return Circle;

});
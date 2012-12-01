/**
 * Figure 8 3D path geometry
 * 
 * @type {FigureEight}
 */
define([

	"three.js/three.min"

], function() {

	var _numPoints = 100;

	function FigureEight3(radius, height, smoothness) {
		// smooth my curve over this many points
		_numPoints = smoothness || _numPoints;

		THREE.ClosedSplineCurve3.call(this, [
		   new THREE.Vector3(0, height, radius*2),
		   new THREE.Vector3(radius, height, radius),

		   new THREE.Vector3(-radius, height, -radius),
		   new THREE.Vector3(0, height, -radius*2),

		   new THREE.Vector3(radius, height, -radius),
		   new THREE.Vector3(-radius, height, radius)
		]);
	};

	FigureEight3.prototype = Object.create( THREE.ClosedSplineCurve3.prototype );

	FigureEight3.prototype.getPoints = function() {
		return THREE.ClosedSplineCurve3.prototype.getPoints.call(this, _numPoints);
	};

	FigureEight3.prototype.geometry = function() {
		var geometry = new THREE.Geometry();

		var splinePoints = this.getPoints();

		for(var i = 0; i < splinePoints.length; i++){
		    geometry.vertices.push(splinePoints[i]);  
		}

		return geometry;
	}

	return FigureEight3;

});
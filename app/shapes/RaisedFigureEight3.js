/**
 * Figure 8 3D path geometry
 * 
 * @type {FigureEight}
 */
define([

	"three.js/three.min"

], function() {

	var _numPoints = 100;

	function RaisedFigureEight3(radius, min_height, max_height, smoothness) {
		// smooth my curve over this many points
		_numPoints = smoothness || _numPoints;

		var mid_height = (max_height - min_height)/2;

		THREE.ClosedSplineCurve3.call(this, [
		   new THREE.Vector3(0, max_height, radius*2),
		   new THREE.Vector3(radius, max_height, radius),

		   new THREE.Vector3(-radius, min_height, -radius),
		   new THREE.Vector3(0, min_height, -radius*2),

		   new THREE.Vector3(radius, mid_height, -radius),
		   new THREE.Vector3(-radius, mid_height, radius)
		]);
	};

	RaisedFigureEight3.prototype = Object.create( THREE.ClosedSplineCurve3.prototype );

	RaisedFigureEight3.prototype.getPoints = function() {
		return THREE.ClosedSplineCurve3.prototype.getPoints.call(this, _numPoints);
	};

	RaisedFigureEight3.prototype.geometry = function() {
		var geometry = new THREE.Geometry();

		var splinePoints = this.getPoints();

		for(var i = 0; i < splinePoints.length; i++){
		    geometry.vertices.push(splinePoints[i]);  
		}

		return geometry;
	}

	return RaisedFigureEight3;

});
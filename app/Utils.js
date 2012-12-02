/**
 * Drawing Utils
 * 
 * @type {Utils}
 */
define([

	"three.js/three.min"

], function() {

	var _scene = null;

	function Utils(scene) {
		_scene = scene;
	};

	Utils.prototype.strokePath = function(path, color) {
		var stroke = new THREE.Line(path.geometry(), new THREE.LineBasicMaterial( { color: color, linewidth: 2 } ) );
		_scene.add(stroke);
	};

	return Utils;
});
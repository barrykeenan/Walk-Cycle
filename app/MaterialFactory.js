/**
 * Used to store various textures
 * 
 * @type {MaterialFactory}
 */
define(function() {

	function MaterialFactory() {};

	MaterialFactory.prototype.skin = function() {
		return new THREE.MeshLambertMaterial({
      		color: 0xFFE2C5
    	});
	};

	MaterialFactory.prototype.hair = function() {
		return new THREE.MeshLambertMaterial({
      		color: 0x333333
    	});
	};

	MaterialFactory.prototype.tshirt = function() {
		return new THREE.MeshLambertMaterial({
      		color: 0xeeffff
    	});
	};

	MaterialFactory.prototype.pants = function() {
		return new THREE.MeshLambertMaterial({
      		color: 0x333366
    	});
	};

	MaterialFactory.prototype.wireframe = function() {
		return new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
	};

	MaterialFactory.prototype.solid = function() {
		return new THREE.MeshLambertMaterial({
      		color: 0xCCcccc
    	});
	};

	return MaterialFactory;
});
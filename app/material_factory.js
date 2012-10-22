/**
 * Used to store various textures
 * @type {Object}
 */
Walk.materialFactory = {

	wireframe: function() {
		return new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
	},

	solid: function() {
		return new THREE.MeshLambertMaterial({
      		color: 0xCC0000
    	});
	}
};
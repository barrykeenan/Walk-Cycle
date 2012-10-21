/**
 * Used to store various textures
 * @type {Object}
 */
Walk.materialFactory = {

	basicMaterial: function() {
		return new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
	},

	otherMaterial: function() {
		return new THREE.MeshLambertMaterial({
      		color: 0xCC0000
    	});
	}
};
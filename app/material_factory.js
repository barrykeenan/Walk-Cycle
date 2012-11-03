/**
 * Used to store various textures
 * @type {Object}
 */
Walk.materialFactory = {

	skin: function() {
		return new THREE.MeshLambertMaterial({
      		color: 0xFFE2C5
    	});
	},

	hair: function() {
		return new THREE.MeshLambertMaterial({
      		color: 0x333333
    	});
	},

	tshirt: function() {
		return new THREE.MeshLambertMaterial({
      		color: 0xeeffff
    	});
	},

	pants: function() {
		return new THREE.MeshLambertMaterial({
      		color: 0x333366
    	});
	},

	wireframe: function() {
		return new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
	},

	solid: function() {
		return new THREE.MeshLambertMaterial({
      		color: 0xCCcccc
    	});
	}
};
/**
 * TexturedPlane @extends THREE.Mesh
 * 
 * @type {TexturedPlane}
 */
define([

	"three.js/three.min"

], function() {

	function TexturedPlane(texture_url) {
		var texture = THREE.ImageUtils.loadTexture(texture_url);
		var geometry = new THREE.PlaneGeometry( 16000, 16000 );
		var material = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture, perPixel: true } );

		THREE.Mesh.call(this, geometry, material);

		// config
		this.material.map.repeat.set( 64, 64 );
		this.material.map.wrapS = this.material.map.wrapT = THREE.RepeatWrapping;
		this.rotation.x = - Math.PI/2;
		this.receiveShadow = true;
	};

	TexturedPlane.prototype = Object.create( THREE.Mesh.prototype );

	return TexturedPlane;
});
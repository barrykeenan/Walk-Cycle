/**
 * Skybox @extends THREE.Mesh
 * 
 * @type {Skybox}
 */
define([

	"three.js/three.min"

], function() {

	function Skybox(textures) {
		// load the cube textures
		var textureCube	= THREE.ImageUtils.loadTextureCube(textures);
		textureCube.format = THREE.RGBFormat;
		
		// init the cube shadder
		var shader = THREE.ShaderUtils.lib["cube"];
		shader.uniforms[ "tCube" ].value = textureCube;

		var material = new THREE.ShaderMaterial({
			fragmentShader: shader.fragmentShader,
			vertexShader: shader.vertexShader,
			uniforms: shader.uniforms,
			depthWrite: false,
			side: THREE.BackSide
		});

		// build the skybox Mesh
		THREE.Mesh.call(this, new THREE.CubeGeometry( 4000, 4000, 4000 ), material);
	};

	Skybox.prototype = Object.create( THREE.Mesh.prototype );

	return Skybox;
});
/**
 * HeightMap @extends THREE.Mesh (TexturedPlane??)
 * 
 * @type {HeightMap}
 */
define([

	"three.js/three.min",
	"three.js/ShaderTerrain"

], function() {

	/**
	 * Constructor
	 * @param {[type]} heightmap_url Required heightmap texture
	 * @param {[type]} options       Optional textures for additional detail
	 */
	function HeightMap(heightmap_url, options) {

		this.loadTextures(heightmap_url, options);

        var terrainShader = THREE.ShaderTerrain[ "terrain" ];
        var uniformsTerrain = THREE.UniformsUtils.clone(terrainShader.uniforms);

		this.setDisplacement(uniformsTerrain, this.heightMap, this.normalMapTexture);
		this.setOverlay(uniformsTerrain); // options

        var finalHeightMapMaterial = this.getMaterial(uniformsTerrain, terrainShader);

		THREE.Mesh.call(this, this.getPlaneGeometry(), finalHeightMapMaterial);

		// config
		this.rotation.x = - Math.PI/2;
	};

	HeightMap.prototype = Object.create( THREE.Mesh.prototype );

	// private

	/**
	 * Load textures from urls
	 * @param  {[type]} heightmap_url Required heightmap texture
	 * @param  {[type]} options       Optional textures
	 */
	HeightMap.prototype.loadTextures = function(heightmap_url, options) {
        this.heightMap = THREE.ImageUtils.loadTexture('textures/terrain/hills4.png');
       	this.normalMapTexture = THREE.ImageUtils.loadTexture( "textures/terrain/grasslight-big-nm.jpg");

        this.diffuseTexture1 = THREE.ImageUtils.loadTexture("textures/terrain/grasslight-big.jpg");
        this.diffuseTexture2 = THREE.ImageUtils.loadTexture("textures/terrain/backgrounddetailed6.jpg");

 		this.normalMapTexture.wrapS = this.normalMapTexture.wrapT = THREE.RepeatWrapping;
 		this.diffuseTexture1.wrapS = this.diffuseTexture1.wrapT = THREE.RepeatWrapping;
        this.diffuseTexture2.wrapS = this.diffuseTexture2.wrapT = THREE.RepeatWrapping;
	};

	/**
	 * Displacment is the height
	 * @param {[type]} uniformsTerrain [description]
	 * @param {[type]} baseTexture		Required - main height map
	 * @param {[type]} detailTexture    Optional - detail bumps?
	 */
	HeightMap.prototype.setDisplacement = function(uniformsTerrain, baseTexture, detailTexture) {
        uniformsTerrain[ "tDisplacement" ].value = baseTexture;
        uniformsTerrain[ "uDisplacementScale" ].value = 400;
        // uniformsTerrain[ "uOffset" ].value.set(1, 100);
        
        // detail
		uniformsTerrain[ "tDetail" ].value = detailTexture;
	};

	/**
	 * Depending on how many overlay textures supplied to constructor.
	 * Diffuse1 as a minimum
	 */
	HeightMap.prototype.setOverlay = function(uniformsTerrain) {
		// high texture
        uniformsTerrain[ "tDiffuse1" ].value = this.diffuseTexture1;
        uniformsTerrain[ "enableDiffuse1" ].value = true;
        // low texture
        uniformsTerrain[ "tDiffuse2" ].value = this.diffuseTexture2;
        uniformsTerrain[ "enableDiffuse2" ].value = true;

        // uniformsTerrain[ "tSpecular" ].value = normalMapTexture;
        // uniformsTerrain[ "enableSpecular" ].value = true;

	 	// Normal map. (Like a directional bump map)
        uniformsTerrain[ "tNormal" ].value = this.heightMap;
        uniformsTerrain[ "uNormalScale" ].value = 3;

		// in the absence of any texture, can use colour        
        // uniformsTerrain[ "uDiffuseColor" ].value.setHex(0xffffff);
        // uniformsTerrain[ "uSpecularColor" ].value.setHex(0xffffff);
        // uniformsTerrain[ "uAmbientColor" ].value.setHex(0xffffff);
 
        uniformsTerrain[ "uShininess" ].value = 30;

        // uniformsTerrain[ "uRepeatBase" ].value.set(2, 2);
        uniformsTerrain[ "uRepeatOverlay" ].value.set(32, 32);
	};

	/**
	 * Basic plane geometry that the height map material is applied to.
	 * @param  {[type]} length [description]
	 * @param  {[type]} width  [description]
	 * @return {[type]}        [description]
	 */
	HeightMap.prototype.getPlaneGeometry = function(length, width) {
        var plane = new THREE.PlaneGeometry(10000, 10000, 256, 256);

        plane.computeFaceNormals();
        plane.computeVertexNormals();
        plane.computeTangents();

        return plane;
	};

	HeightMap.prototype.getMaterial = function(uniformsTerrain, terrainShader) {
        // @extends Material
     	return new THREE.ShaderMaterial({
            uniforms: uniformsTerrain,
            vertexShader: terrainShader.vertexShader,
            fragmentShader: terrainShader.fragmentShader,
            lights: true, // this.config object?
            fog: true
        });
	};

	return HeightMap;
});
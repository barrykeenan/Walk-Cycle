/**
 * HeightMap @extends THREE.Mesh (TexturedPlane??)
 * 
 * @type {HeightMap}
 */
define([

	"three.js/three.min",
	"three.js/ShaderTerrain"

], function() {

	function HeightMap(texture_url) {

        var heightMap = THREE.ImageUtils.loadTexture('textures/terrain/hills4.png');
		var normalMapTexture = THREE.ImageUtils.loadTexture( "textures/terrain/grasslight-big-nm.jpg");

        var baseTexture = THREE.ImageUtils.loadTexture("textures/terrain/grasslight-big.jpg");
        var diffuseTexture2 = THREE.ImageUtils.loadTexture("textures/terrain/backgrounddetailed6.jpg");

 		normalMapTexture.wrapS = normalMapTexture.wrapT = THREE.RepeatWrapping;
 		baseTexture.wrapS = baseTexture.wrapT = THREE.RepeatWrapping;
        diffuseTexture2.wrapS = diffuseTexture2.wrapT = THREE.RepeatWrapping;

        var terrainShader = THREE.ShaderTerrain[ "terrain" ];
        var uniformsTerrain = THREE.UniformsUtils.clone(terrainShader.uniforms);

        // the displacement determines the height of a vector, mapped to the heightmap
        uniformsTerrain[ "tDisplacement" ].value = heightMap;
        uniformsTerrain[ "uDisplacementScale" ].value = 400;
        // uniformsTerrain[ "uOffset" ].value.set(1, 100);

        // normal map (bump map) detail
		uniformsTerrain[ "tDetail" ].value = normalMapTexture;

        // high texture
        uniformsTerrain[ "tDiffuse1" ].value = baseTexture;
        uniformsTerrain[ "enableDiffuse1" ].value = true;
        // low texture
        uniformsTerrain[ "tDiffuse2" ].value = diffuseTexture2;
        uniformsTerrain[ "enableDiffuse2" ].value = true;

        // uniformsTerrain[ "tSpecular" ].value = normalMapTexture;
        // uniformsTerrain[ "enableSpecular" ].value = true;

        // normal map
        uniformsTerrain[ "tNormal" ].value = heightMap;
        uniformsTerrain[ "uNormalScale" ].value = 3;
 
        // uniformsTerrain[ "uDiffuseColor" ].value.setHex(0xffffff);
        // uniformsTerrain[ "uSpecularColor" ].value.setHex(0xffffff);
        // uniformsTerrain[ "uAmbientColor" ].value.setHex(0xffffff);
 
        uniformsTerrain[ "uShininess" ].value = 30;

        // uniformsTerrain[ "uRepeatBase" ].value.set(2, 2);
        uniformsTerrain[ "uRepeatOverlay" ].value.set(32, 32);
 
        // @extends Material
        var material = new THREE.ShaderMaterial({
            uniforms: uniformsTerrain,
            vertexShader: terrainShader.vertexShader,
            fragmentShader: terrainShader.fragmentShader,
            lights: true,
            fog: true
        });
 
        // we use a plain to render as terrain
        var geometryTerrain = new THREE.PlaneGeometry(10000, 10000, 256, 256);
        // var geometryTerrain = new THREE.PlaneGeometry(8000, 8000, 256, 256);
        geometryTerrain.computeFaceNormals();
        geometryTerrain.computeVertexNormals();
        geometryTerrain.computeTangents();


		// var material = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture, perPixel: true } );
 
        // create a 3D object to add
		THREE.Mesh.call(this, geometryTerrain, material);

		// config
		this.rotation.x = - Math.PI/2;

	};

	HeightMap.prototype = Object.create( THREE.Mesh.prototype );

	// HeightMap.prototype.getHeightData = function(img) {
	//     var canvas = document.createElement('canvas');
	//     canvas.width = 128;
	//     canvas.height = 128;
	//     var context = canvas.getContext( '2d' );

	//     var size = 128 * 128, data = new Float32Array( size );

	//     context.drawImage(img,0,0);

	//     for ( var i = 0; i < size; i ++ ) {
	//         data[i] = 0
	//     }

	//     var imgd = context.getImageData(0, 0, 128, 128);
	//     var pix = imgd.data;

	//     var j=0;
	//     for (var i = 0, n = pix.length; i < n; i += (4)) {
	//         var all = pix[i]+pix[i+1]+pix[i+2];
	//         data[j++] = all/30;
	//     }

	//     return data;
	// };

	return HeightMap;
});
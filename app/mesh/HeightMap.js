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
		 // load the heightmap we created as a texture
        var texture = THREE.ImageUtils.loadTexture('textures/terrain/combined.png');
 
        // load two other textures we'll use to make the map look more real
        // var detailTexture = THREE.ImageUtils.loadTexture("textures/terrain/bg.jpg");
        var detailTexture = THREE.ImageUtils.loadTexture("textures/terrain/grasslight-big.jpg");
 
        // the following configuration defines how the terrain is rendered
        var terrainShader = THREE.ShaderTerrain[ "terrain" ];
        var uniformsTerrain = THREE.UniformsUtils.clone(terrainShader.uniforms);

        // how to treat abd scale the normal texture
        uniformsTerrain[ "tNormal" ].value = detailTexture;
        uniformsTerrain[ "uNormalScale" ].value = 1;
 
        // the displacement determines the height of a vector, mapped to
        // the heightmap
        uniformsTerrain[ "tDisplacement" ].value = texture;
        uniformsTerrain[ "uDisplacementScale" ].value = 100;
 
        // the following textures can be use to finetune how
        // the map is shown. These are good defaults for simple
        // rendering
        uniformsTerrain[ "tDiffuse1" ].value = detailTexture;
        uniformsTerrain[ "tDetail" ].value = detailTexture;
        uniformsTerrain[ "enableDiffuse1" ].value = true;
        uniformsTerrain[ "enableDiffuse2" ].value = true;
        uniformsTerrain[ "enableSpecular" ].value = true;
 
        // diffuse is based on the light reflection
        uniformsTerrain[ "uDiffuseColor" ].value.setHex(0xcccccc);
        // uniformsTerrain[ "uDiffuseColor" ].value.setHex(0xffffff);
        uniformsTerrain[ "uSpecularColor" ].value.setHex(0xff0000);
        // uniformsTerrain[ "uSpecularColor" ].value.setHex(0xffffff);
        // is the base color of the terrain
        uniformsTerrain[ "uAmbientColor" ].value.setHex(0x0000cc);
        // uniformsTerrain[ "uAmbientColor" ].value.setHex(0xffffff);
 
        // how shiny is the terrain
        uniformsTerrain[ "uShininess" ].value = 3;
 
        // handles light reflection
        uniformsTerrain[ "uRepeatOverlay" ].value.set(3, 3);
 
        // configure the material that reflects our terrain
        var material = new THREE.ShaderMaterial({
            uniforms: uniformsTerrain,
            vertexShader: terrainShader.vertexShader,
            fragmentShader: terrainShader.fragmentShader,
            lights: true,
            fog: false
        });
 
        // we use a plain to render as terrain
        var geometryTerrain = new THREE.PlaneGeometry(10000, 10000, 256, 256);
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
/**
 * Scene with lights, props & actors
 *
 * @type {World}
 */
define([

	"app/Utils",
	"app/mesh/TexturedPlane",
	"app/mesh/HeightMap",
	"app/mesh/Skybox",

	"app/MotionPath",
	"app/shapes/FigureEight3",
	"app/shapes/RaisedFigureEight3",
	"app/person/model/Person",
	"app/person/animations/Walk"

], function(
	Utils,
	TexturedPlane,
	HeightMap,
	Skybox,

	MotionPath,

	FigureEight3,
	RaisedFigureEight3,
	Person,
	Walk
) {

	// private class variables
	var _scene;
	var _materials;
	var _utils;

	var _colours = {
		lime: 0x00ff11,
		magenta: 0xff00f0
	};

	var _actors = {};
	var _paths = {};

	function World(materialFactory) {
		_materials = materialFactory;
		_scene = new THREE.Scene();
		_utils = new Utils(_scene);

		/**
		 * Main camera
		 */
		this.sceneCamera;
		
		/**
		 * Skybox camera position remains fixed - only rotates to face correct direction
		 */
		this.skyCamera;
		this.skyScene = new THREE.Scene();

		/**
		 * All meshes that animate
		 */
		this.morphs = [];

		this.addGround();
		this.addSky();
		this.addEffects();
		this.addActors();

		this.addLights();
		this.initCamera();

		// this.startTimeline();
	};

	World.prototype.initCamera = function() {
		this.sceneCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
		// this.sceneCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100);
		_scene.add(this.sceneCamera);
		this.cameraHelper = new THREE.CameraHelper(this.sceneCamera);
		// _scene.add(this.cameraHelper);

		this.skyCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
	};

	World.prototype.addActors = function() {
		var me = this;

		var personMaterials = {
			skin: _materials.skin(),
			hair: _materials.hair(),

			tshirt: _materials.tshirt(),
			pants: _materials.pants(),

			default: _materials.solid()
		};

		// perhaps 1 = 1m
		_actors.bob = new Person(personMaterials, 100);
		// _scene.add(_actors.bob.rootObject());


		_paths.walkPath = new FigureEight3(400, 200);
		// _utils.strokePath(_paths.walkPath, _colours.lime);

		_paths.cameraPath = new RaisedFigureEight3(600, 200, 600);
		// _utils.strokePath(_paths.cameraPath, _colours.magenta);

		var loader = new THREE.JSONLoader();
		var lamp;
	    loader.load("models/lamp_animated.js", function(geometry) {

			var material = geometry.materials[ 0 ];
			material.morphTargets = true;

			var faceMaterial = new THREE.MeshFaceMaterial();
			var morph = new THREE.MorphAnimMesh(geometry, faceMaterial);

			// one second duration
			morph.duration = 1000;
			morph.scale.set(50,50,50);


			morph.matrixAutoUpdate = false;
			morph.updateMatrix();

			_scene.add( morph );

			me.morphs.push( morph );

			me.lampMotion(morph);
	    });
    };

	World.prototype.addGround = function() {
		// var ground = new TexturedPlane("textures/terrain/grasslight-big.jpg");
		var ground = new HeightMap("textures/terrain/grasslight-big.jpg");

		_scene.add( ground );
	};

	World.prototype.addEffects = function() {
		_scene.fog = new THREE.Fog( 0x34583e, 500, 7000 );
	};

	/**
	 * Skybox Code
	 */
	World.prototype.addSky = function() {

		// load the cube textures
		var urlPrefix	= "textures/miramar/miramar_";
		var textures = [
			urlPrefix + "ft.jpg", urlPrefix + "bk.jpg",
			urlPrefix + "up.jpg", urlPrefix + "dn.jpg",
			urlPrefix + "rt.jpg", urlPrefix + "lf.jpg"
		];

		var skybox = new Skybox(textures);

		this.skyScene.add(skybox);
	}

    World.prototype.addLights = function() {

    	// shadow colour?
    	// var ambient = new THREE.AmbientLight( 0x333333 );
    	var ambient = new THREE.AmbientLight( 0x333344 );
		// _scene.add( ambient );

    	// add a sphere helper to position properly
        pointLight = new THREE.PointLight(0xFFFFFF);
        pointLight.position.x = -4000;
        pointLight.position.y = 2000; // height
        pointLight.position.z = 4000;
        pointLight.intensity = 2;
        pointLight.distance = 10000; // area of effect
        _scene.add(pointLight);

		var helperWidth = 100;
        var lightHelper = new THREE.Mesh(
	 		new THREE.SphereGeometry(helperWidth),
	 		_materials.wireframe()
	 	);
	 	lightHelper.position = pointLight.position;
	 	_scene.add(lightHelper);

		var light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 1, 0.5, 0 ).normalize();
		// light.intensity = 8.6;
		_scene.add( light );

		var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
		light.position.set( - 1, - 0.5, 0 ).normalize();
		// light.intensity = 1;
		_scene.add( light );
	};

	World.prototype.startTimeline = function() {
		this.actorMotion(_actors.bob, _paths.walkPath);
		this.cameraMotion(this.sceneCamera, _paths.cameraPath);
	};

	World.prototype.actorMotion = function(person, path) {
		var walkAnimation = new Walk();
		walkAnimation.animate(_actors.bob);

		var timeline = new TimelineMax({
			repeat: -1
		});

		timeline.append( new MotionPath(_actors.bob.rootObject(), path, 20, {
			orientToPath: true,
			snap: { y: false }
		}));

		timeline.seek(1);
	};

	World.prototype.lampMotion = function(morph) {

		console.log(this.morphs);

		var timeline2 = new TimelineMax({
			repeat: -1
		});

		// convoluted. Tween should have a delta property that can use
		var pathControl = {
			position: 0
		};
		var tween = TweenMax.fromTo(pathControl, 1,
			{ position: 0 },
			{ position: 1 ,
			ease: Linear.easeNone
		});

		tween.eventCallback('onUpdate', function(object3D, tween){
			object3D.updateAnimation( 10 );
		}, [this.morphs[0], "{self}"], this);

		timeline2.insert(tween);
	};

	World.prototype.cameraMotion = function(camera, path) {
		var timeline = new TimelineMax({
			repeat: -1
		});

		timeline.append( new MotionPath(camera, path, 7.5, {
			position: { from: 0, to: 0.3 },
			fn: this.updateCamera,
			scope: this
		}));

		timeline.append( new MotionPath(camera, path, 2, {
			position: { from: 0.3, to: 0.7 },
			fn: this.updateCamera,
			scope: this
		}));

		timeline.append( new MotionPath(camera, path, 10.5, {
			position: { from: 0.7, to: 1 },
			fn: this.updateCamera,
			scope: this
		}));

	};

	// TODO: refer to other camera as sceneCamera
	World.prototype.updateCamera = function(camera) {
		camera.lookAt(_actors.bob.rootObject().position);
		this.cameraHelper.update();

		// this.skyCamera.rotation.copy( camera.rotation );
	};

	World.prototype.scene = function() {
		return _scene;
	};

    return World;

});
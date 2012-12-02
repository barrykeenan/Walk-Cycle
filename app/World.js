/**
 * Scene with lights, props & actors
 *
 * @type {World}
 */
define([

	"app/Utils",
	"app/MotionPath",
	"app/shapes/FigureEight3",
	"app/shapes/RaisedFigureEight3",
	"app/person/model/Person",
	"app/person/animations/Walk"

], function(Utils, MotionPath, FigureEight3, RaisedFigureEight3, Person, Walk) {

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
	};

	World.prototype.scene = function() {
		return _scene;
	};

	/**
	 * Called from Viewport
	 */
	World.prototype.addProps = function() {

		var personMaterials = {
			skin: _materials.skin(),
			hair: _materials.hair(),

			tshirt: _materials.tshirt(),
			pants: _materials.pants(),

			default: _materials.solid()
		};

		_actors.bob = new Person(personMaterials, 100);
		_scene.add(_actors.bob.rootObject());


		_paths.walkPath = new FigureEight3(400, 200);
		_utils.strokePath(_paths.walkPath, _colours.lime);

		_paths.cameraPath = new RaisedFigureEight3(600, 200, 600);
		_utils.strokePath(_paths.cameraPath, _colours.magenta);


		// Move this to the viewport

		this.splineCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
		// this.splineCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100);
		_scene.add(this.splineCamera);

		this.cameraHelper = new THREE.CameraHelper(this.splineCamera);
		_scene.add(this.cameraHelper);
    };

	/**
	 * Called from Viewport
	 */
    World.prototype.addLights = function() {
		var light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 1, 0.5, 0 ).normalize();
		_scene.add( light );

		var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
		light.position.set( - 1, - 0.5, 0 ).normalize();
		_scene.add( light );
	};

    /**
	 * Called from Viewport
	 */
	World.prototype.startTimeline = function() {

		this.actorMotion(_actors.bob, _paths.walkPath);
		this.cameraMotion(this.splineCamera, _paths.cameraPath);

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
	};

    return World;

});
/**
 * Scene with lights, props & actors
 *
 * @type {World}
 */
define([

	"app/Utils",
	"app/MotionPath",
	"app/shapes/FigureEight3",
	"app/person/model/Person",
	"app/person/animations/Walk"

], function(Utils, MotionPath, FigureEight3, Person, Walk) {

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
	};

	World.prototype.actorMotion = function(person, path) {
		// var walkAnimation = new Walk();
		// walkAnimation.animate(person);

		var timeline = new TimelineMax({
			repeat: -1
		});

		timeline.append( new MotionPath(person.centre, path, 20) );
	};

    return World;

});
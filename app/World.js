/**
 * Scene with lights, props & actors
 *
 * @type {World}
 */
define([

	"app/shapes/FigureEight",
	"app/shapes/FigureEight3",
	"app/shapes/RaisedFigureEight3",
	"app/person/model/Person",
	"app/person/animations/Walk"

], function(FigureEight, FigureEight3, RaisedFigureEight3, Person, Walk) {

	function World(materialFactory) {
		this.materials = materialFactory;
	};

	/**
	 * Called from Viewport
	 */
	World.prototype.addProps = function() {

		var colours = {
			lime: 0x00ff11,
			magenta: 0xff00f0
		};

		var materials = {
			skin: this.materials.skin(),
			hair: this.materials.hair(),

			tshirt: this.materials.tshirt(),
			pants: this.materials.pants(),

			default: this.materials.solid()
		};

		this.person = new Person(materials, 100);
		this.scene.add(this.person.rootObject());


		this.walkPath = new FigureEight3(400, 200);
		// Utils.strokePath
		this.strokePath(this.walkPath, colours.lime);

		this.cameraPath = new RaisedFigureEight3(600, 200, 600);
		this.strokePath(this.cameraPath, colours.magenta);


		// Move this to the viewport

		this.splineCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
		// this.splineCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100);
		this.scene.add(this.splineCamera);

		this.cameraHelper = new THREE.CameraHelper(this.splineCamera);
		this.scene.add(this.cameraHelper);
    };

	/**
	 * Called from Viewport
	 */
    World.prototype.addLights = function() {
		var light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 1, 0.5, 0 ).normalize();
		this.scene.add( light );

		var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
		light.position.set( - 1, - 0.5, 0 ).normalize();
		this.scene.add( light );
	};


	// TODO: stroke the helperScene so when switch camera, not seen
	World.prototype.strokePath = function(path, color) {
		// var points = shape.createPointsGeometry();

		var stroke = new THREE.Line(path.geometry(), new THREE.LineBasicMaterial( { color: color, linewidth: 2 } ) );
		this.scene.add(stroke);
	};

    /**
	 * Called from Viewport
	 */
	World.prototype.startTimeline = function() {

		this.actorMotion(this.person, this.walkPath);

		this.cameraMotion(this.splineCamera, this.cameraPath);

	};

	World.prototype.cameraMotion = function(camera, path) {
		var timeline = new TimelineMax({
			repeat: -1
		});

		timeline.append( this.motionPath(camera, path, 7.5, {
			position: { from: 0, to: 0.3 },
			fn: this.updateCamera,
			scope: this
		}));

		timeline.append( this.motionPath(camera, path, 2, {
			position: { from: 0.3, to: 0.7 },
			fn: this.updateCamera,
			scope: this
		}));

		timeline.append( this.motionPath(camera, path, 10.5, {
			position: { from: 0.7, to: 1 },
			fn: this.updateCamera,
			scope: this
		}));

	};

	// TODO: refer to other camera as sceneCamera
	World.prototype.updateCamera = function(camera) {
		camera.lookAt(this.person.centre.position);
		this.cameraHelper.update();
	};

	World.prototype.actorMotion = function(person, path) {
		var walkAnimation = new Walk();
		walkAnimation.animate(person);

		var timeline = new TimelineMax({
			repeat: -1
		});

		timeline.append( this.motionPath(person.centre, path, 20, {
			orientToPath: true,
			snap: { y: false }
		}));

		timeline.seek(1);
	};

	World.prototype.motionPath = function(object3D, path, duration, options) {
		options.snap = options.snap || {};
		options.position = options.position || { from: 0, to: 1 };

		var pathControl = {
			position: 0
		};

		var tween = TweenMax.fromTo(pathControl, duration,
			{ position: options.position.from },
			{ position: options.position.to,

			onUpdate: function(object3D, tween) {
				var pathPosition = path.getPoint(pathControl.position);
				
				if(options.snap.x!==false) { object3D.position.x = pathPosition.x; }
				if(options.snap.y!==false) { object3D.position.y = pathPosition.y; }
				if(options.snap.z!==false) { object3D.position.z = pathPosition.z; }

				if(options.orientToPath===true) {
					var tangent = path.getTangent(pathControl.position);
					var angle = Math.atan2(-tangent.z, tangent.x);
					object3D.rotation.y = angle;
				}

				// callback
				if(typeof options.fn === 'function') {
					options.scope = options.scope || this;
					options.fn.call(options.scope, object3D);
				}
			},
			onUpdateParams:[object3D, "{self}"],
			ease: Linear.easeNone
		});

		return tween;
	};

    return World;

});
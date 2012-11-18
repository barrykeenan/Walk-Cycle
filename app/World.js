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

		this.cameraPath = new RaisedFigureEight3(500, 100, 600);
		this.strokePath(this.cameraPath, colours.magenta);


		// Move this to the viewport

		// var splineCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
		this.splineCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100);
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

	World.prototype.strokePath = function(path, color) {
		// var points = shape.createPointsGeometry();

		var stroke = new THREE.Line(path.geometry(), new THREE.LineBasicMaterial( { color: color, linewidth: 2 } ) );
		this.scene.add(stroke);
	};

    /**
	 * Called from Viewport
	 */
	World.prototype.startTimeline = function() {
		var walkAnimation = new Walk();
		walkAnimation.animate(this.person);
		
		this.motionPath(this.person.centre, this.walkPath, {
			orientToPath: true,
			snap: {y: false}
		});

		this.motionPath(this.splineCamera, this.cameraPath, {
		});
	};

	World.prototype.motionPath = function(object3D, path, options) {
		options.snap = options.snap || {};

		var timeline = new TimelineMax({
			repeat: -1
		});

		timeline.insert(
			TweenMax.to(object3D, 20,
				{ onUpdate: function(object3D, tween){
					var pathPosition = path.getPoint(tween.ratio);
					
					object3D.position.x = pathPosition.x;
					if(options.snap.y!==false) { object3D.position.y = pathPosition.y; }
					object3D.position.z = pathPosition.z;

					if(options.orientToPath===true) {
						var tangent = path.getTangent(tween.ratio);
						var angle = Math.atan2(-tangent.z, tangent.x);
						object3D.rotation.y = angle;
					}

				}, onUpdateParams:[object3D, "{self}"], ease: Linear.easeNone }
			)
		);
	};

    return World;

});
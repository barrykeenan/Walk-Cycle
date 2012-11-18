/**
 * Scene with lights, props & actors
 *
 * @type {World}
 */
define([

	"app/shapes/FigureEight",
	"app/shapes/FigureEight3",
	"app/person/model/Person",
	"app/person/animations/Walk"

], function(FigureEight, FigureEight3, Person, Walk) {

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


		this.walkPath = new FigureEight3(400);
		// Utils.strokePath
		this.strokePath(this.walkPath, colours.lime);

		this.cameraPath = new FigureEight3(400);
		this.strokePath(this.cameraPath, colours.magenta);
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
		// var walkAnimation = new Walk();
		// walkAnimation.animate(this.person);
		
		// this.moveActorAlongPath(this.walkPath, true);
	};

	World.prototype.moveActorAlongPath = function(path, orientToPath) {
		var timeline = new TimelineMax({
			repeat: -1
		});

		timeline.insert(
			TweenMax.to(this.person.centre, 20,
				{ onUpdate: function(app, tween){
					var pathPosition = path.getPoint(tween.ratio);
					
					app.person.centre.position.x = pathPosition.x;
					app.person.centre.position.z = pathPosition.y;

					if(orientToPath===true) {
						var tangent = path.getTangent(tween.ratio);
						var angle = Math.atan2(-tangent.y, tangent.x);
						app.person.centre.rotation.y = angle;
					}

				}, onUpdateParams:[this, "{self}"], ease: Linear.easeNone }
			)
		);
	};

    return World;

});
/**
 * Scene with lights, props & actors
 *
 * @type {World}
 */
define([

	"app/shapes/FigureEight",
	"app/person/model/Person",
	"app/person/animations/Walk"

], function(FigureEight, Person, Walk) {

	function World(materialFactory) {
		this.materials = materialFactory;
	};

	/**
	 * Called from Viewport
	 */
	World.prototype.addProps = function() {

		var materials = {
			skin: this.materials.skin(),
			hair: this.materials.hair(),

			tshirt: this.materials.tshirt(),
			pants: this.materials.pants(),

			default: this.materials.solid()
		};

		this.person = new Person(materials, 100);
		this.scene.add(this.person.rootObject());


		this.eightPath = new FigureEight(400);
		var eightLine = this.createLine(this.eightPath, 0x00ff11 );
		eightLine.rotation.x = Math.PI/2;
		this.scene.add( eightLine );
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

	World.prototype.createLine = function(shape, color) {
		var points = shape.createPointsGeometry();

		return new THREE.Line( points, new THREE.LineBasicMaterial( { color: color, linewidth: 2 } ) );
	};

    /**
	 * Called from Viewport
	 */
	World.prototype.startTimeline = function() {
		// var walkAnimation = new Walk();
		// walkAnimation.animate(this.person);
		
		this.moveActorAlongPath();
	};

	World.prototype.moveActorAlongPath = function() {
		var timeline = new TimelineMax({
			repeat: -1
		});

		timeline.insert(
			TweenMax.to(this.person.centre, 20,
				{ onUpdate: function(app, tween){
					app.person.centre.position.x = app.eightPath.getPoint(tween.ratio).x;
					app.person.centre.position.z = app.eightPath.getPoint(tween.ratio).y;

				}, onUpdateParams:[this, "{self}"], ease: Linear.easeNone }
			)
		);
	};

    return World;

});
// Use require js to load classes

if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	};
}


/**
 * Scene with props
 *
 * Requires Greensock TweenLite for animation
 * 
 * @type {Walk.world}
 */
Walk.world = {
	materials: null,
	scene: null,

	initialize: function(materialFactory){
		this.materials = materialFactory;

		return this;
	},

	/**
	 * Called from Viewport
	 */
	addProps: function() {

		var materials = {
			skin: this.materials.skin(),
			hair: this.materials.hair(),

			tshirt: this.materials.tshirt(),
			pants: this.materials.pants(),

			default: this.materials.solid()
		};

		this.person = Walk.person.model.person.initialize(materials, 100);

		this.scene.add(this.person.rootObject());

		this.eight = this.figureEight(300);

		this.createLine(this.eight, 0x00ff11, 0, 0, 0, Math.PI/2, 0, 0, 1 );
    },

    circleShape: function(circleRadius) {
		var circleShape = new THREE.Shape();
		circleShape.moveTo( 0, circleRadius );

		// handle_x, handle_y, endpoint_x, endpoint_y
		circleShape.quadraticCurveTo( circleRadius, circleRadius, circleRadius, 0 );
		circleShape.quadraticCurveTo( circleRadius, -circleRadius, 0, -circleRadius );
		circleShape.quadraticCurveTo( -circleRadius, -circleRadius, -circleRadius, 0 );
		circleShape.quadraticCurveTo( -circleRadius, circleRadius, 0, circleRadius );

		return circleShape;
    },

    figureEight: function(radius) {
		var eight = new THREE.Shape();
		eight.moveTo( 0, radius*2 );
		
		// handle_x, handle_y, endpoint_x, endpoint_y
		eight.quadraticCurveTo( radius, radius*2, radius, radius );
		eight.quadraticCurveTo( radius, 0, 0, 0 );

		eight.quadraticCurveTo( -radius, 0, -radius, -radius );
		eight.quadraticCurveTo( -radius, -radius*2, 0, -radius*2 );

		eight.quadraticCurveTo( radius, -radius*2, radius, -radius );
		eight.quadraticCurveTo( radius, 0, 0, 0 );

		eight.quadraticCurveTo( -radius, 0, -radius, radius );
		eight.quadraticCurveTo( -radius, radius*2, 0, radius*2 );

		return eight;
    },

	createLine: function(shape, color, x, y, z, rx, ry, rz, s) {
		var points = shape.createPointsGeometry();

		var line = new THREE.Line( points, new THREE.LineBasicMaterial( { color: color, linewidth: 2 } ) );
		line.position.set( x, y, z );
		line.rotation.set( rx, ry, rz );
		line.scale.set( s, s, s );
		this.scene.add( line );
	},

    /**
	 * Called from Viewport
	 */
	startTimeline: function() {
		var walkAnimation = Walk.person.animations.walk;
		walkAnimation.animate(this.person);

		// console.log('point:', this.circle.getPoint(0.1).x);

		var timeline = new TimelineMax({
			repeat: -1
		});

		var pos = {
			x: 0,
			y: 0,
			z: 0
		};

		// TODO: modify multiple properties at once??
		timeline.insert(
			TweenMax.to(pos, 15,
				{ x: 100, onUpdate: function(app, tween){
					app.person.centre.position.x = app.eight.getPoint(tween.ratio).x;
				}, onUpdateParams:[this, "{self}"], ease: Linear.easeNone }
			)
		);
		timeline.insert(
			TweenMax.to(pos, 15,
				{ y: 100, onUpdate: function(app, tween){
					app.person.centre.position.z = app.eight.getPoint(tween.ratio).y;
				}, onUpdateParams:[this, "{self}"],ease: Linear.easeNone }
			)
		);
	},

	debug: function(app, tween){
		// console.log(tween.ratio);

		console.log('point:', app.circle.getPoint(tween.ratio).x);

		app.person.centre.position.x = app.circle.getPoint(tween.ratio).x;
	}

};

var world = Walk.world.initialize(Walk.materialFactory);

var viewport = Walk.viewport.initialize({
	containerEl: document.getElementById('content'),
	world: world
});




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

		this.eight = this.figureEight(400);

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

		this.moveActorAlongPath();
	},

	moveActorAlongPath: function() {
		var timeline = new TimelineMax({
			repeat: -1
		});

		timeline.insert(
			TweenMax.to(this.person.centre, 20,
				{ onUpdate: function(app, tween){
					app.person.centre.position.x = app.eight.getPoint(tween.ratio).x;
					app.person.centre.position.z = app.eight.getPoint(tween.ratio).y;

					// http://www.planetclegg.com/projects/WarpingTextToSplines.html
					// We can rotate the vector 90 degrees by using linear algebra,
					// or by simply swapping the terms and negating one of them. 
					var tangent = app.eight.getTangent(tween.ratio);
					var angle = Math.atan2(-tangent.y, tangent.x);
					app.person.centre.rotation.y = angle;

				}, onUpdateParams:[this, "{self}"], ease: Linear.easeNone }
			)
		);
	}

};

var world = Walk.world.initialize(Walk.materialFactory);

var viewport = Walk.viewport.initialize({
	containerEl: document.getElementById('content'),
	world: world
});




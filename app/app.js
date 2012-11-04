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

		this.circle = this.circleShape(300);

		this.createLine(this.circle, 0x00ff11, 0, 0, 0, Math.PI/2, 0, 0, 1 );
    },

    circleShape: function(circleRadius) {

		var circleShape = new THREE.Shape();
		circleShape.moveTo( 0, circleRadius );
		circleShape.quadraticCurveTo( circleRadius, circleRadius, circleRadius, 0 );
		circleShape.quadraticCurveTo( circleRadius, -circleRadius, 0, -circleRadius );
		circleShape.quadraticCurveTo( -circleRadius, -circleRadius, -circleRadius, 0 );
		circleShape.quadraticCurveTo( -circleRadius, circleRadius, 0, circleRadius );

		return circleShape;
    },

	createLine: function(shape, color, x, y, z, rx, ry, rz, s) {
		var points = shape.createPointsGeometry();

		var line = new THREE.Line( points, new THREE.LineBasicMaterial( { color: color, linewidth: 2 } ) );
		line.position.set( x, y, z + 25 );
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

		// mesh.position = spline.getPoint(t);

		// console.log('point:', this.circle.getPoint(0.1).x);

		var timeline = new TimelineMax({
			repeat: -1
		});

		var pos = {
			x: 0,
			y: 0,
			z: 0
		};
		timeline.insert(
			TweenMax.to(pos, 5,
				{ x: 100, onUpdate: function(app, tween){
					app.person.centre.position.x = app.circle.getPoint(tween.ratio).x;
				}, onUpdateParams:[this, "{self}"], ease: Linear.easeNone }
			)
		);
		timeline.insert(
			TweenMax.to(pos, 5,
				{ y: 100, onUpdate: function(app, tween){
					app.person.centre.position.z = app.circle.getPoint(tween.ratio).y;
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




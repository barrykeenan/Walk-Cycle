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

		this.eight = Walk.shapes.figureEight(400);

		this.createLine(this.eight, 0x00ff11, 0, 0, 0, Math.PI/2, 0, 0, 1 );
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
		// var walkAnimation = Walk.person.animations.walk;
		// walkAnimation.animate(this.person);
	}

};

var world = Walk.world.initialize(Walk.materialFactory);

var viewport = Walk.viewport.initialize({
	containerEl: document.getElementById('content'),
	world: world
});




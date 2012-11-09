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


		this.eightShape = Walk.shapes.figureEight(400);
		var eightLine = this.createLine(this.eightShape, 0x00ff11 );
		eightLine.rotation.x = Math.PI/2;
		this.scene.add( eightLine );
    },

	createLine: function(shape, color) {
		var points = shape.createPointsGeometry();

		return new THREE.Line( points, new THREE.LineBasicMaterial( { color: color, linewidth: 2 } ) );
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




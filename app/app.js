// Use require js to load classes

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

		this.hipPivot = new THREE.Object3D();
		this.hipPivot.position.y = 200;
		this.scene.add( this.hipPivot );


		var radiusTop = 50,
			radiusBottom = 35,
			height = 200, 
			radiusSegments = 20,
			heightSegments = 2,
			openEnded = false;

	 	this.cylinder = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded),
	 		this.materials.otherMaterial()
	 	);
        this.cylinder.overdraw = true;
        this.cylinder.position.y = -100;
        this.hipPivot.add(this.cylinder);
    },

    /**
	 * Called from Viewport
	 */
	startTimeline: function() {
		
		TweenLite.to(this.hipPivot.rotation, 2, {
			z: -Math.PI
			// ease: Bounce.easeOut
			// delay: i*0.2
		});
	}
	
};

var world = Walk.world.initialize(Walk.materialFactory);

var viewport = Walk.viewport.initialize({
	containerEl: document.body,
	world: world
});




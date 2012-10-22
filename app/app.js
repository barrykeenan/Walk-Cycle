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
		// this.hipPivot.rotation.z = Math.PI/4;
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

		var hipTween = TweenMax.fromTo(this.hipPivot.rotation, 2,
			{ z: Math.PI/4 },
			{ z: -Math.PI/4, repeat: -1, yoyo: true, ease: Power2.easeInOut }
		);

	}

};

var world = Walk.world.initialize(Walk.materialFactory);

var viewport = Walk.viewport.initialize({
	containerEl: document.body,
	world: world
});




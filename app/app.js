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
		this.hipPivot.position.y = 435;
		this.scene.add( this.hipPivot );


		var radiusTop = 50,
			radiusBottom = 35,
			height = 200, 
			radiusSegments = 10,
			heightSegments = 2,
			openEnded = false;

	 	this.thigh = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments),
	 		this.materials.solid()
	 	);
        this.thigh.position.y = -100;
        this.hipPivot.add(this.thigh);

		//

		this.knee = new THREE.Mesh(
	 		new THREE.SphereGeometry(38),
	 		this.materials.solid()
	 	);
        this.knee.position.y = -100;
        this.knee.position.x = 2;
        this.thigh.add(this.knee);

        //

		radiusTop = 40,
		radiusBottom = 25,
		height = 190;

		this.calf = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments),
	 		this.materials.solid()
	 	);
        this.calf.position.y = -100;
        this.knee.add(this.calf);

        //

		this.ankle = new THREE.Mesh(
	 		new THREE.SphereGeometry(28),
	 		this.materials.solid()
	 	);
        this.ankle.position.y = -100;
        this.calf.add(this.ankle);

        //

        radiusTop = 35,
		radiusBottom = 40,
		height = 30;

		this.foot = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments),
	 		this.materials.solid()
	 	);
        this.foot.scale.x = 2;
        this.foot.position.y = -20;
        this.foot.position.x = 30;
        this.ankle.add(this.foot);
    },

    /**
	 * Called from Viewport
	 */
	startTimeline: function() {

		var hipTween = TweenMax.fromTo(this.hipPivot.rotation, 2,
			{ z: Math.PI/4 },
			{ z: -Math.PI/4, repeat: -1, yoyo: true, ease: Power2.easeInOut }
		);

		var kneeTween = TweenMax.fromTo(this.knee.rotation, 2,
			{ z: 0 },
			{ z: -Math.PI/4, repeat: -1, yoyo: true, ease: Power2.easeInOut }
		);

		var ankleTween = TweenMax.fromTo(this.ankle.rotation, 2,
			{ z: 0 },
			{ z: Math.PI/8, repeat: -1, yoyo: true, ease: Power2.easeInOut }
		);

	}

};

var world = Walk.world.initialize(Walk.materialFactory);

var viewport = Walk.viewport.initialize({
	containerEl: document.body,
	world: world
});




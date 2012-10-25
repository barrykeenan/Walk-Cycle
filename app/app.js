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
        this.ankle.rotation.z = Math.PI/6;
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

		// Setup a timeline object
		var timeline = new TimelineMax();
		var tweens = [];

		timeline.append('start');

		// Hip

		timeline.insert(
			TweenMax.fromTo(this.hipPivot.rotation, 2,
				{ z: Math.PI/6 },
				{ z: -Math.PI/12 }
			)
		);

		timeline.insert('weight', 0.7);

		timeline.insert(
			TweenMax.to(this.hipPivot.position, 0.2,
				{ y: this.hipPivot.position.y - 5 }
			),
			0.55 // use array of label: time
		);

		timeline.insert(
			TweenMax.to(this.hipPivot.position, 0.2,
				{ y: this.hipPivot.position.y + 5 }
			),
			0.8 // use array of label: time
		);

		// Knee

		timeline.insert(
			TweenMax.fromTo(this.knee.rotation, 1,
				{ z: 0 },
				{ z: -Math.PI/6 }
			),
			0.8
		);

		// Foot

		timeline.insert('strike', 0.4);

		timeline.insert(
			TweenMax.to(this.ankle.rotation, 0.3,
				{ z: 0 }
			),
			0.4
		);

		timeline.insert('swing', 2);

		// Hip

		timeline.insert(
			TweenMax.to(this.hipPivot.rotation, 2,
				{ z: Math.PI/6 }
			),
			2 // use array of label: time
		);

		// Knee

		timeline.insert(
			TweenMax.to(this.knee.rotation, 0.4,
				{ z: -Math.PI/3.5 }
			),
			2
		);
		timeline.insert(
			TweenMax.to(this.knee.rotation, 1,
				{ z: 0 }
			),
			2.5
		);

		// Foot

		timeline.insert(
			TweenMax.to(this.ankle.rotation, 0.5,
				{ z: -Math.PI/8 }
			),
			2
		);

		timeline.insert(
			TweenMax.to(this.ankle.rotation, 1,
				{ z: Math.PI/6 }
			),
			2.5
		);

		// timeline.seek('start');
		// timeline.seek('strike');
		// timeline.seek('weight');
		// timeline.seek('spring');
		// timeline.seek('swing');
	}

};

var world = Walk.world.initialize(Walk.materialFactory);

var viewport = Walk.viewport.initialize({
	containerEl: document.body,
	world: world
});




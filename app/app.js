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

		var materials = {
			default: this.materials.solid()
		};

		var person = Walk.person.initialize(materials, 200);
		// console.log(person);

		this.scene.add(person.rootObject());

		this.walk(person);
    },

    /**
	 * Called from Viewport
	 */
	walk: function(person) {

		// Setup a timeline object
		var timeline = new TimelineMax({repeat: -1});

		// todo: timings object
		timeline.append('start');
		timeline.insert('strike', 0.4);
		timeline.insert('weight', 0.7);
		timeline.insert('swing', 2);

		this.hipTweens(timeline, person);
		this.kneeTweens(timeline, person);
		this.ankleTweens(timeline, person);


		// timeline.seek('start');
		// timeline.seek('strike');
		// timeline.seek('weight');
		// timeline.seek('spring');
		// timeline.seek('swing');
	},

	hipTweens: function(timeline, person){

		// swing 
		timeline.insert(
			TweenMax.fromTo(person.leftLeg.hipPivot.rotation, 2,
				{ z: Math.PI/6 },
				// { z: -Math.PI/12, ease: Power0.easeInOut }
				{ z: -Math.PI/12, ease: Sine.easeInOut }
			)
		);
		timeline.insert(
			TweenMax.to(person.leftLeg.hipPivot.rotation, 1.8,
				{ z: Math.PI/6, ease: Sine.easeOut }
			),
			2 // use array of label: time
		);

		// weight

		timeline.insert(
			TweenMax.to(person.leftLeg.hipPivot.position, 0.1,
				{ y: person.leftLeg.hipPivot.position.y - 10 }
			),
			0.9 // use array of label: time
		);
		timeline.insert(
			TweenMax.to(person.leftLeg.hipPivot.position, 0.3,
				{ y: person.leftLeg.hipPivot.position.y }
			),
			1.5 // use array of label: time
		);
		
	},

	kneeTweens: function(timeline, person) {
		timeline.insert(
			TweenMax.fromTo(person.leftLeg.knee.rotation, 1,
				{ z: 0 },
				{ z: -Math.PI/6 }
			),
			0.8
		);

		// swing
		timeline.insert(
			TweenMax.to(person.leftLeg.knee.rotation, 0.4,
				{ z: -Math.PI/3 }
			),
			2
		);
		timeline.insert(
			TweenMax.to(person.leftLeg.knee.rotation, 1,
				{ z: 0 }
			),
			2.6
		);
	},

	ankleTweens: function(timeline, person) {

		// strike 
		timeline.insert(
			TweenMax.to(person.leftLeg.ankle.rotation, 0.2,
				{ z: Math.PI/24, y: 0 }
			),
			0.7
		);

		// spring
		timeline.insert(
			TweenMax.to(person.leftLeg.ankle.rotation, 0.2,
				{ z: -Math.PI/12 }
			),
			1.2
		);

		// swing
		timeline.insert(
			TweenMax.to(person.leftLeg.ankle.rotation, 0.4,
				{ z: -Math.PI/5 }
			),
			2.1
		);

		timeline.insert(
			TweenMax.to(person.leftLeg.ankle.rotation, 0.5,
				{ z: Math.PI/6, y: -Math.PI/12 }
			),
			2.6
		);

	}

};

var world = Walk.world.initialize(Walk.materialFactory);

var viewport = Walk.viewport.initialize({
	containerEl: document.body,
	world: world
});




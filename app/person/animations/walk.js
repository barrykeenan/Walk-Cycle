Walk.person.animations = {};

/**
 * Walk animation
 */
Walk.person.animations.walk = {

	animate: function(person) {

		// todo: timings object
		// timeline.append('start');
		// timeline.insert('strike', 0.4);
		// timeline.insert('weight', 0.7);
		// timeline.insert('swing', 2);

		this.walkTorso(person.torsoPivot);
		this.walkPelvis(person);

		var rightLegTimeline = this.walkLeg(person.rightLeg);
		var leftLegTimeline = this.walkLeg(person.leftLeg, rightLegTimeline.duration()/2);
	},

	walkTorso: function(torso) {
		// Setup a timeline object
		var timeline = new TimelineMax({
			repeat: -1,
			repeatDelay: 0.1,
		});

		timeline.insert(
			TweenMax.to(torso.rotation, 0.1,
				{ x: -Math.PI/48, ease: Linear.easeNone }
			),
			0.9
		);

		timeline.insert(
			TweenMax.to(torso.rotation, 0.3,
				{ x: 0, ease: Linear.easeNone }
			),
			1.5
		);

		timeline.insert(
			TweenMax.to(torso.rotation, 0.1,
				{ x: Math.PI/48, ease: Linear.easeNone }
			),
			2.8
		);

		timeline.insert(
			TweenMax.to(torso.rotation, 0.3,
				{ x: 0, ease: Linear.easeNone }
			),
			3.4
		);

	},

	walkPelvis: function(person) {
		// Setup a timeline object
		var timeline = new TimelineMax({
			repeat: -1,
			repeatDelay: 0.1,
		});

		timeline.insert(
			TweenMax.to(person.pelvis.rotation, 0.1,
				{ x: Math.PI/24, ease: Linear.easeNone }
			),
			0.9
		);

		timeline.insert(
			TweenMax.to(person.pelvis.rotation, 0.3,
				{ x: 0, ease: Linear.easeNone }
			),
			1.5
		);

		timeline.insert(
			TweenMax.to(person.pelvis.rotation, 0.1,
				{ x: -Math.PI/24, ease: Linear.easeNone }
			),
			2.8
		);

		timeline.insert(
			TweenMax.to(person.pelvis.rotation, 0.3,
				{ x: 0, ease: Linear.easeNone }
			),
			3.4
		);

	},

	walkLeg: function(leg, seek) {
		seek = seek || 0;

		// Setup a timeline object
		var timeline = new TimelineMax({
			repeat: -1
		});
		timeline.seek(seek);

		this.hipTweens(timeline, leg);
		this.kneeTweens(timeline, leg);
		this.ankleTweens(timeline, leg);

		return timeline;
	},

	hipTweens: function(timeline, leg){

		// swing 
		timeline.insert(
			TweenMax.fromTo(leg.hipPivot.rotation, 2,
				{ z: Math.PI/6 },
				// { z: -Math.PI/12, ease: Power0.easeInOut }
				{ z: -Math.PI/12, ease: Sine.easeInOut }
			)
		);
		timeline.insert(
			TweenMax.to(leg.hipPivot.rotation, 1.8,
				{ z: Math.PI/6, ease: Sine.easeOut }
			),
			2 // use array of label: time
		);

		// weight

		timeline.insert(
			TweenMax.to(leg.hipPivot.position, 0.1,
				{ y: leg.hipPivot.position.y - 10 }
			),
			0.9 // use array of label: time
		);
		timeline.insert(
			TweenMax.to(leg.hipPivot.position, 0.3,
				{ y: leg.hipPivot.position.y }
			),
			1.5 // use array of label: time
		);
		
	},

	kneeTweens: function(timeline, leg) {
		timeline.insert(
			TweenMax.fromTo(leg.knee.rotation, 1,
				{ z: 0 },
				{ z: -Math.PI/6 }
			),
			0.8
		);

		// swing
		timeline.insert(
			TweenMax.to(leg.knee.rotation, 0.4,
				{ z: -Math.PI/3 }
			),
			2
		);
		timeline.insert(
			TweenMax.to(leg.knee.rotation, 1,
				{ z: 0 }
			),
			2.6
		);
	},

	ankleTweens: function(timeline, leg) {
		var direction = (leg.type == 'right')? -1 : 1;

		// strike 
		timeline.insert(
			TweenMax.fromTo(leg.ankle.rotation, 0.2,
				{ z: Math.PI/6, y: Math.PI/12 * direction },
				{ z: Math.PI/24, y: 0 }
			),
			0.7
		);

		// spring
		timeline.insert(
			TweenMax.to(leg.ankle.rotation, 0.2,
				{ z: -Math.PI/12 }
			),
			1.2
		);

		// swing
		timeline.insert(
			TweenMax.to(leg.ankle.rotation, 0.4,
				{ z: -Math.PI/5 }
			),
			2.1
		);

		timeline.insert(
			TweenMax.to(leg.ankle.rotation, 0.5,
				{ z: Math.PI/6, y: Math.PI/12 * direction }
			),
			2.6
		);

	}


};
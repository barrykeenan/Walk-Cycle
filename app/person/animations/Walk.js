/**
 * Walk animation
 * 
 * @type {Walk}
 */
define([

], function(FigureEight, Person, Walk) {

	function Walk() {};


	Walk.prototype.animate = function(person) {

		// todo: timings object
		// timeline.append('start');
		// timeline.insert('strike', 0.4);
		// timeline.insert('weight', 0.7);
		// timeline.insert('swing', 2);

		var leftArmTimeline = this.swingArm(person.leftArm);
		var rightArmTimeline = this.swingArm(person.rightArm, leftArmTimeline.duration()/2);

		this.walkTorso(person.torsoPivot);
		this.twistHead(person.head.rootObject());

		this.walkPelvis(person);

		var rightLegTimeline = this.walkLeg(person.rightLeg);
		var leftLegTimeline = this.walkLeg(person.leftLeg, rightLegTimeline.duration()/2);

		this.leap(person.centre);
	};

	Walk.prototype.twistHead = function(head) {

		var timeline = new TimelineMax({
			repeat: -1,
			repeatDelay: 0.1,
		});

		timeline.insert(
			TweenMax.fromTo(head.rotation, 1.8,
				{ y: -Math.PI/48 },
				{ y: Math.PI/48 }
			)
		);
		timeline.insert(
			TweenMax.to(head.rotation, 1.8,
				{ y: -Math.PI/48 }
			),
			1.9 // use array of label: time
		);
	};

	Walk.prototype.swingArm = function(arm, seek) {
		seek = seek || 0;

		// Setup a timeline object
		var timeline = new TimelineMax({
			repeat: -1
		});
		timeline.seek(seek);

		this.shoulderTweens(timeline, arm);
		this.elbowTweens(timeline, arm);
		// this.ankleTweens(timeline, leg);

		return timeline;
	};

	Walk.prototype.shoulderTweens = function(timeline, arm){

		// swing 
		timeline.insert(
			TweenMax.fromTo(arm.shoulder.rotation, 2,
				{ z: -Math.PI/5 },
				{ z: Math.PI/3 }
			)
		);
		timeline.insert(
			TweenMax.to(arm.shoulder.rotation, 1.8,
				{ z: -Math.PI/5 }
			),
			2 // use array of label: time
		);
		
	};

	Walk.prototype.elbowTweens = function(timeline, arm) {

		timeline.insert(
			TweenMax.fromTo(arm.elbow.rotation, 2,
				{ z: Math.PI/1.5 },
				{ z: Math.PI/2 }
			)
		);

		timeline.insert(
			TweenMax.to(arm.elbow.rotation, 1.8,
				{ z: Math.PI/1.5 }
			),
			2
		);

	};


	Walk.prototype.walkTorso = function(torso) {
		// Setup a timeline object
		var timeline = new TimelineMax({
			repeat: -1,
			repeatDelay: 0.1,
		});


		// swing

		timeline.insert(
			TweenMax.fromTo(torso.rotation, 1.8,
				{ y: Math.PI/18 },
				{ y: -Math.PI/18 }
			)
		);
		timeline.insert(
			TweenMax.to(torso.rotation, 1.8,
				{ y: Math.PI/18 }
			),
			1.9 // use array of label: time
		);

		// weight

		timeline.insert(
			TweenMax.to(torso.rotation, 0.2,
				{ x: Math.PI/96, ease: Linear.easeNone }
			),
			0.8
		);
		timeline.insert(
			TweenMax.to(torso.rotation, 0.3,
				{ x: 0, ease: Linear.easeNone }
			),
			1.5
		);
		timeline.insert(
			TweenMax.to(torso.rotation, 0.2,
				{ x: -Math.PI/96, ease: Linear.easeNone }
			),
			2.7
		);
		timeline.insert(
			TweenMax.to(torso.rotation, 0.3,
				{ x: 0, ease: Linear.easeNone }
			),
			3.4
		);

	};

	Walk.prototype.walkPelvis = function(person) {
		// Setup a timeline object
		var timeline = new TimelineMax({
			repeat: -1,
			repeatDelay: 0.1,
		});

		timeline.insert(
			TweenMax.to(person.pelvis.rotation, 0.2,
				{ x: Math.PI/48, ease: Linear.easeNone }
			),
			0.8
		);

		timeline.insert(
			TweenMax.to(person.pelvis.rotation, 0.3,
				{ x: 0, ease: Linear.easeNone }
			),
			1.5
		);

		timeline.insert(
			TweenMax.to(person.pelvis.rotation, 0.2,
				{ x: -Math.PI/48, ease: Linear.easeNone }
			),
			2.7
		);

		timeline.insert(
			TweenMax.to(person.pelvis.rotation, 0.3,
				{ x: 0, ease: Linear.easeNone }
			),
			3.4
		);

	};

	Walk.prototype.walkLeg = function(leg, seek) {
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
	};

	Walk.prototype.hipTweens = function(timeline, leg){

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
				{ y: leg.hipPivot.position.y - (leg.scale * 0.05) }
			),
			0.9 // use array of label: time
		);
		timeline.insert(
			TweenMax.to(leg.hipPivot.position, 0.3,
				{ y: leg.hipPivot.position.y }
			),
			1.5 // use array of label: time
		);
		
	};

	Walk.prototype.kneeTweens = function(timeline, leg) {
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
	};

	Walk.prototype.ankleTweens = function(timeline, leg) {
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

	};

	Walk.prototype.leap = function(centre) {

		var timeline = new TimelineMax({
			repeat: -1,
			repeatDelay: 0.1,
		});

		// weight

		var currentVertical = centre.position.y;

		timeline.insert(
			TweenMax.to(centre.position, 0.3,
				{ y: currentVertical + 5, ease: Linear.easeNone }
			),
			1
		);
		timeline.insert(
			TweenMax.to(centre.position, 0.5,
				{ y: currentVertical, ease: Linear.easeNone }
			),
			1.4
		);
		timeline.insert(
			TweenMax.to(centre.position, 0.3,
				{ y: currentVertical + 5, ease: Linear.easeNone }
			),
			2.9
		);
		timeline.insert(
			TweenMax.to(centre.position, 0.5,
				{ y: currentVertical, ease: Linear.easeNone }
			),
			3.3
		);

	};

	return Walk;

});
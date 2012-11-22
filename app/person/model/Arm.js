/**
 * Arm @extends CompositeObject
 * 
 * @type {Arm}
 */
define([

], function() {

	// materials: {
	// 	default: new THREE.MeshLambertMaterial({
 //      		color: 0xCC0000
 //    	})
	// },
	
	function Arm(materials, scale, type) {

		this.materials = materials || this.materials;
		this.scale = scale || 1;
		this.type = type || 'right';

		this.shoulder = null;
		this.thigh = null;
		this.knee = null;
		this.calf = null;
		this.ankle = null;
		this.foot = null;

		this.buildArm();
	};

	Arm.prototype.defaultMaterial = function() {
		return this.materials.default;
	};

	Arm.prototype.buildArm = function() {
		var side = (this.type == 'right')? 1 : -1;

		var shoulderWidth = this.scale * 0.23;
		this.shoulder = new THREE.Mesh(
	 		new THREE.SphereGeometry(shoulderWidth),
	 		this.materials.tshirt || this.defaultMaterial()
	 	);
		this.shoulder.rotation.x = -Math.PI/16 * side;

		var radiusTop = this.scale * 0.2,
			radiusBottom = this.scale * 0.15,
			height = this.scale * 0.6,
			radiusSegments = 10,
			heightSegments = 2,
			openEnded = false;

	 	this.upperArm = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments),
	 		this.materials.skin || this.defaultMaterial()
	 	);
       	this.upperArm.position.y = -this.scale * 0.25;
		this.upperArm.rotation.x = Math.PI/24 * side;

        this.shoulder.add(this.upperArm);

       	radiusTop = this.scale * 0.2;
		radiusBottom = this.scale * 0.2;
		height = this.scale * 0.4;

		this.sleave = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments),
	 		this.materials.tshirt || this.defaultMaterial()
	 	);
       	this.sleave.position.y = this.scale * 0.11;
        this.upperArm.add(this.sleave);

		//

		var elbowWidth = this.scale * 0.16;
		this.elbow = new THREE.Mesh(
	 		new THREE.SphereGeometry(elbowWidth),
	 		this.materials.skin || this.defaultMaterial()
	 	);
        this.elbow.position.y = -this.scale * 0.3;
        this.elbow.position.x = -this.scale * 0.01; // shunt elbow back a little

		this.elbow.rotation.x = Math.PI/24 * side;

        this.upperArm.add(this.elbow);

        //

		radiusTop = this.scale * 0.15,
		radiusBottom = this.scale * 0.125,
		height = this.scale * 0.55;

		this.forearm = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments),
	 		this.materials.skin || this.defaultMaterial()
	 	);
        this.forearm.position.y = -this.scale * 0.3;
        this.forearm.position.x = this.scale * 0.01; // -shunt elbow back a little
        this.elbow.add(this.forearm);

        //

		var wristWidth = this.scale * 0.13;
		this.wrist = new THREE.Mesh(
	 		new THREE.SphereGeometry(wristWidth),
	 		this.materials.skin || this.defaultMaterial()
	 	);
        this.wrist.position.y = -this.scale * 0.3;
        this.forearm.add(this.wrist);

        //

        radiusTop = this.scale * 0.12;
		radiusBottom = this.scale * 0.15;
		height = this.scale * 0.15;

		this.hand = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments),
	 		this.materials.skin || this.defaultMaterial()
	 	);
        this.hand.scale.x = 1.5;

        this.hand.position.y = -this.scale * 0.3;

		this.hand.rotation.x = Math.PI/2 * side;
		this.hand.rotation.y = Math.PI/2;

        this.wrist.add(this.hand);
	};

	Arm.prototype.rootObject = function() {
		return this.shoulder;
	};

	return Arm;
});
/**
 * Person @extends composite shape
 * 
 * @type {Walk.person}
 */
Walk.person.model.person = {

	materials: {
		default: new THREE.MeshLambertMaterial({
      		color: 0xCC0000
    	})
	},

	scale: 1,

	torsoPivot: null,
	centre: new THREE.Object3D(),
	pelvis: null,
	leftLeg: null,
	rightLeg: null,

	initialize: function(materials, scale) {

		this.materials = materials || this.materials;
		this.scale = scale || this.scale;
		

		this.buildTorso();
		this.leftArm = this.buildArm('left');
		this.rightArm = this.buildArm('right');

		this.head = this.attachHead();

		this.centre.position.y = this.scale * 2.175;
		this.buildPelvis();
		
		this.rightLeg = Object.create(Walk.person.model.leg).initialize(this.materials, this.scale);
		this.rightLeg.rootObject().position.z = this.scale * 0.3;
		this.centre.add(this.rightLeg.rootObject());

		this.leftLeg = Object.create(Walk.person.model.leg).initialize(this.materials, this.scale, 'left');
		this.leftLeg.rootObject().position.z = -this.scale * 0.3;
		this.centre.add(this.leftLeg.rootObject());

		return this;
	},

	attachHead: function() {
		var head = Walk.person.model.head.initialize(this.materials, this.scale);

		head.rootObject().position.y = this.scale * 0.96; // up

		this.torso.add(head.rootObject());

		return head;
	},

	buildArm: function(type) {
		var arm = Object.create(Walk.person.model.arm).initialize(this.materials, this.scale, type);
		arm.rootObject().scale.z = 0.5; // reset scale

		arm.rootObject().position.y = this.scale * 0.38; // up

		var side = (type == 'right')? 1 : -1;

		arm.rootObject().position.z = this.scale * 0.26 * side;

		this.torso.add(arm.rootObject());

		return arm;
	},

	buildPelvis: function() {
		var radiusTop = this.scale * 0.24,
			radiusBottom = this.scale * 0.28,
			height = this.scale * 0.4,
			radiusSegments = 10,
			heightSegments = 2,
			openEnded = false;

	 	this.pelvis = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments),
	 		this.materials.pants || this.defaultMaterial()
	 	);
        this.pelvis.scale.z = 2;
        this.pelvis.rotation.z = -Math.PI/8;
		this.pelvis.position.y = 20;
		this.pelvis.position.x = 5;

        this.centre.add(this.pelvis);

		// this.pelvis.position.y = this.scale * 2.175; // this.centre.position.y
	},

	buildTorso: function() {
		this.torsoPivot = new THREE.Object3D();
		this.torsoPivot.position.y = 80;
		this.torsoPivot.position.x = 24;
        this.torsoPivot.rotation.z = -Math.PI/12;
        this.centre.add(this.torsoPivot);

		var radiusTop = this.scale * 0.35,
			radiusBottom = this.scale * 0.26,
			height = this.scale * 0.9,
			radiusSegments = 10,
			heightSegments = 2,
			openEnded = false;

	 	this.torso = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments),
	 		this.materials.tshirt || this.defaultMaterial()
	 	);
        this.torso.scale.z = 2;


        this.torsoPivot.add(this.torso);

        var shoulderWidth = this.scale * 0.35;
		this.shoulder = new THREE.Mesh(
	 		new THREE.SphereGeometry(shoulderWidth),
	 		this.materials.tshirt || this.defaultMaterial()
	 	);
        this.shoulder.scale.y = 0.5;
        this.shoulder.position.y = 45;
        this.torso.add(this.shoulder);

    	radiusTop = this.scale * 0.15,
		radiusBottom = this.scale * 0.2,
		height = this.scale * 0.1;

	 	this.neck = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments),
	 		this.materials.skin || this.defaultMaterial()
	 	);
        this.neck.scale.z = 0.5;
        this.neck.position.y = 65;
	    this.torso.add(this.neck);

	    return this.torso;
	},

	defaultMaterial: function() {
		return this.materials.default;
	},

	rootObject: function(){
		return this.centre;
	}

};
/**
 * Person @extends composite shape
 * 
 * @type {Walk.person}
 */
Walk.person = {

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
		this.buildHead();

		this.centre.position.y = this.scale * 2.175;
		this.buildPelvis();
		
		this.rightLeg = Object.create(Walk.leg).initialize(this.materials, this.scale);
		this.rightLeg.rootObject().position.z = this.scale * 0.4;
		this.centre.add(this.rightLeg.rootObject());

		this.leftLeg = Object.create(Walk.leg).initialize(this.materials, this.scale, 'left', 1);
		this.leftLeg.rootObject().position.z = -this.scale * 0.4;
		this.centre.add(this.leftLeg.rootObject());

		return this;
	},

	buildHead: function() {

        var headWidth = this.scale * 0.4;
		this.head = new THREE.Mesh(
	 		new THREE.SphereGeometry(headWidth),
	 		this.defaultMaterial()
	 	);
        this.head.position.y = 60;
        this.head.scale.z = 0.5;

        this.shoulder.add(this.head);
	},

	buildPelvis: function() {
		var radiusTop = this.scale * 0.3,
			radiusBottom = this.scale * 0.25,
			height = this.scale * 0.6,
			radiusSegments = 10,
			heightSegments = 2,
			openEnded = false;

	 	this.pelvis = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments),
	 		this.defaultMaterial()
	 	);
        this.pelvis.scale.z = 2;
        this.pelvis.rotation.z = -Math.PI/8;
		this.pelvis.position.y = 20;

        this.centre.add(this.pelvis);

		// this.pelvis.position.y = this.scale * 2.175; // this.centre.position.y
	},

	buildTorso: function() {
		this.torsoPivot = new THREE.Object3D();
		this.torsoPivot.position.y = 80;
		this.torsoPivot.position.x = 19;
        this.torsoPivot.rotation.z = -Math.PI/12;
        this.centre.add(this.torsoPivot);

		var radiusTop = this.scale * 0.35,
			radiusBottom = this.scale * 0.3,
			height = this.scale * 0.9,
			radiusSegments = 10,
			heightSegments = 2,
			openEnded = false;

	 	this.torso = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments),
	 		this.defaultMaterial()
	 	);
        this.torso.scale.z = 2;


        this.torsoPivot.add(this.torso);

        var shoulderWidth = this.scale * 0.35;
		this.shoulder = new THREE.Mesh(
	 		new THREE.SphereGeometry(shoulderWidth),
	 		this.defaultMaterial()
	 	);
        this.shoulder.position.y = 40;
        this.torso.add(this.shoulder);
	},

	defaultMaterial: function() {
		return this.materials.default;
	},

	rootObject: function(){
		return this.centre;
	}

};
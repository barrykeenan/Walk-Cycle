/**
 * Head @extends composite shape
 * 
 * @type {Walk.person.model.Head}
 */
Walk.person.model.head = {

	materials: {
		default: new THREE.MeshLambertMaterial({
      		color: 0xCC0000
    	})
	},

	scale: 1,

	initialize: function(materials, scale) {
		this.materials = materials || this.materials;
		this.scale = scale || this.scale;

 		var scullWidth = this.scale * 0.35;
		this.scull = new THREE.Mesh(
	 		new THREE.SphereGeometry(scullWidth),
	 		this.materials.skin || this.defaultMaterial()
	 	);
        this.scull.scale.z = 0.4;

		var hairWidth = this.scale * 0.36;
		this.hair = new THREE.Mesh(
	 		new THREE.SphereGeometry(hairWidth),
	 		this.materials.hair || this.defaultMaterial()
	 	);
        this.hair.scale.z = 1.1;
		this.hair.position.x = -3;
		this.hair.position.y = 2;

        this.scull.add(this.hair);

      

	 	var radiusTop = this.scale * 0.3,
			radiusBottom = this.scale * 0.35,
			height = this.scale * 0.3,
			radiusSegments = 10,
			heightSegments = 2,
			openEnded = false;

	 	this.jaw = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments),
	 		this.materials.skin || this.defaultMaterial()
	 	);
        // this.jaw.scale.z = 1.2;

		this.jaw.position.y = -10;
		this.jaw.position.x = 5;

        this.jaw.rotation.z = Math.PI/24;

        this.scull.add(this.jaw);


        radiusTop = this.scale * 0.03;
		radiusBottom = this.scale * 0.06;
		height = this.scale * 0.15;

	 	this.nose = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments),
	 		this.materials.skin || this.defaultMaterial()
	 	);

		this.nose.position.y = 3;
		this.nose.position.x = 32;

        this.nose.rotation.z = Math.PI/12;

        this.scull.add(this.nose);

		return this;
	},

	defaultMaterial: function() {
		return this.materials.default;
	},

	rootObject: function(){
		return this.scull;
	}

};
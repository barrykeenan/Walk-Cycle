/**
 * Leg @extends composite shape
 * 
 * @type {Walk.leg}
 */
Walk.leg = {

	materials: {
		default: new THREE.MeshLambertMaterial({
      		color: 0xCC0000
    	})
	},

	scale: 1,
	type: 'right',

	hipPivot: null,
	thigh: null,
	knee: null,
	calf: null,
	ankle: null,
	foot: null,

	initialize: function(materials, scale, type){
		this.materials = materials || this.materials;
		this.scale = scale || this.scale;
		this.type = type || this.type;

		this.hipPivot = new THREE.Object3D();
		this.hipPivot.add(this.leg());

		return this;
	},

	defaultMaterial: function() {
		return this.materials.default;
	},

	leg: function(){

		var radiusTop = this.scale * 0.25,
			radiusBottom = this.scale * 0.2,
			height = this.scale,
			radiusSegments = 10,
			heightSegments = 2,
			openEnded = false;

	 	this.thigh = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments),
	 		this.defaultMaterial()
	 	);
       	this.thigh.position.y = -this.scale * 0.5;

		//

		var kneeWidth = this.scale * 0.19;
		this.knee = new THREE.Mesh(
	 		new THREE.SphereGeometry(kneeWidth),
	 		this.defaultMaterial()
	 	);
        this.knee.position.y = -this.scale * 0.5;
        this.knee.position.x = this.scale * 0.01; // shunt knee forward a little
        this.thigh.add(this.knee);

        //

		radiusTop = this.scale * 0.2,
		radiusBottom = this.scale * 0.125,
		height = this.scale * 0.95;

		this.calf = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments),
	 		this.defaultMaterial()
	 	);
        this.calf.position.y = -this.scale * 0.5;
        this.calf.position.x = -this.scale * 0.01; // -shunt knee forward a little
        this.knee.add(this.calf);

        //

		var ankleWidth = this.scale * 0.14;
		this.ankle = new THREE.Mesh(
	 		new THREE.SphereGeometry(ankleWidth),
	 		this.defaultMaterial()
	 	);
        this.ankle.position.y = -this.scale * 0.5;
        this.calf.add(this.ankle);

        //

        radiusTop = this.scale * 0.175;
		radiusBottom = this.scale * 0.2;
		height = this.scale * 0.15;

		this.foot = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments),
	 		this.defaultMaterial()
	 	);
        this.foot.scale.x = 2;
        this.foot.position.y = -this.scale * 0.1;
        this.foot.position.x = this.scale * 0.15;
        this.ankle.add(this.foot);
        
  		return this.thigh;

	},

	rootObject: function(){
		return this.hipPivot;
	}

};
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

	pelvis: new THREE.Object3D(),
	leftLeg: null,
	rightLeg: null,

	initialize: function(materials, scale) {

		this.materials = materials || this.materials;
		this.scale = scale || this.scale;
		
		this.pelvis.position.y = 435;
		
		this.leftLeg = Walk.leg.initialize(this.materials, this.scale);

		this.pelvis.add(this.leftLeg.rootObject())

		return this;
	},

	rootObject: function(){
		return this.pelvis;
	}

};
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
		
		this.rightLeg = Object.create(Walk.leg).initialize(this.materials, this.scale);
		this.rightLeg.rootObject().position.z = this.scale * 0.4;
		this.pelvis.add(this.rightLeg.rootObject());

		this.leftLeg = Object.create(Walk.leg).initialize(this.materials, this.scale, 'left', 1);
		this.leftLeg.rootObject().position.z = -this.scale * 0.4;
		this.pelvis.add(this.leftLeg.rootObject());

		return this;
	},

	rootObject: function(){
		return this.pelvis;
	}

};
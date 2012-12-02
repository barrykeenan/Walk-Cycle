/**
 * Leg @extends CompositeObject
 * 
 * @type {Head}
 */
define([

], function() {

	// materials: {
	// 	default: new THREE.MeshLambertMaterial({
 //      		color: 0xCC0000
 //    	})
	// },
	
	function Leg(materials, scale, type) {

		this.materials = materials || this.materials;
		this.scale = scale || 1;
		this.type = type || 'right';

		this.hipPivot = null;
		this.thigh = null;
		this.knee = null;
		this.calf = null;
		this.ankle = null;
		this.foot = null;

		this.buildLeg();
	};

	Leg.prototype.defaultMaterial = function() {
		return this.materials.default;
	};

	Leg.prototype.buildLeg = function() {

		var hipWidth = this.scale * 0.25;
		this.hipPivot = new THREE.Mesh(
	 		new THREE.SphereGeometry(hipWidth),
	 		this.materials.pants || this.defaultMaterial()
	 	);
        // this.knee.position.y = -this.scale * 0.5;
        // this.knee.position.x = this.scale * 0.01; // shunt knee forward a little
        // this.thigh.add(this.knee);

		var radiusTop = this.scale * 0.25,
			radiusBottom = this.scale * 0.2,
			height = this.scale,
			radiusSegments = 10,
			heightSegments = 2,
			openEnded = false;

	 	this.thigh = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments),
	 		this.materials.pants || this.defaultMaterial()
	 	);
       	this.thigh.position.y = -this.scale * 0.5;
        this.hipPivot.add(this.thigh);

		//

		var kneeWidth = this.scale * 0.19;
		this.knee = new THREE.Mesh(
	 		new THREE.SphereGeometry(kneeWidth),
	 		this.materials.pants || this.defaultMaterial()
	 	);
        this.knee.position.y = -this.scale * 0.5;
        this.knee.position.x = this.scale * 0.01; // shunt knee forward a little
        this.thigh.add(this.knee);

        //

		radiusTop = this.scale * 0.2,
		radiusBottom = this.scale * 0.25,
		height = this.scale * 0.95;

		this.calf = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments),
	 		this.materials.pants || this.defaultMaterial()
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
	 		this.materials.hair || this.defaultMaterial()
	 	);
        this.foot.scale.x = 2;
        this.foot.position.y = -this.scale * 0.1;
        this.foot.position.x = this.scale * 0.15;
        this.ankle.add(this.foot);
	};

	Leg.prototype.rootObject = function() {
		return this.hipPivot;
	};

	return Leg;
});
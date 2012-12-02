/**
 * Requires Greensock TweenLite for animation
 * 
 * @type {Viewport}
 */
define([

	"three.js/controls/TrackballControls",
	// "greensock/minified/TweenMax.min"
	"greensock/uncompressed/TweenMax"

], function() {

	// containerEl: null,

	/**
	 * Render component
	 * @type {THREE.WebGLRenderer}
	 */
	// renderer: null,

	// objects: [],

	var _world;
	var _finalScene;

	var _helperScene;
	var _helperCam;

	function Viewport(cfg) {

		// TODO: use apply
		this.containerEl = cfg.containerEl;
		_world = cfg.world;
		this.materials = cfg.materials;
		this.animateFn = cfg.animateFn;

		this.initContainer();
		this.initRenderComponent();
		
		_helperScene = new THREE.Scene();
		_finalScene = _world.scene();
		this.addSceneHelpers();

		this.addCamera();

		this.addProps();
		_world.addProps();
		_world.addLights();

		this.initControls(_helperCam, this.containerEl);

	 	this.render();

	 	// start animation loop
	 	TweenMax.ticker.addEventListener("tick", this.animate.bind(this));

		_world.startTimeline();
	};

	Viewport.prototype.initContainer = function() {
		this.el = document.createElement( 'div' );
		this.el.style.position = 'absolute';
		this.el.style.backgroundColor = '#aaa';

		this.el.style.userSelect = 'none';
		this.el.style.WebkitUserSelect = 'none';
		this.el.style.MozUserSelect = 'none';
	
		this.containerEl.appendChild(this.el);
	};

	Viewport.prototype.initRenderComponent = function() {
		this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: false, clearColor: 0xaaaaaa, clearAlpha: 1 } );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		// this.renderer.setSize( 800, 600 );

		this.renderer.autoClear = false;
		this.renderer.autoUpdateScene = false;

		this.el.appendChild( this.renderer.domElement );
	};

    /**
     * controls need to be added *after* main logic,
     * otherwise controls.enabled doesn't work.
     */
    Viewport.prototype.initControls = function(camera, containerEl) {
		this.controls = new THREE.TrackballControls( camera, containerEl );
		this.controls.rotateSpeed = 1.0;
		this.controls.zoomSpeed = 1.2;
		this.controls.panSpeed = 0.8;
		this.controls.noZoom = false;
		this.controls.noPan = false;
		this.controls.staticMoving = true;
		this.controls.dynamicDampingFactor = 0.3;

		this.controls.target = new THREE.Vector3(0, 100, 0);

		// set scope to this
		// this.controls.addEventListener( 'change', this.render.bind(this) );
    };

	Viewport.prototype.addSceneHelpers = function() {
		var size = 500, step = 25;
		var geometry = new THREE.Geometry();
		var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );
		var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0x888888 );

		for ( var i = - size; i <= size; i += step ) {

			geometry.vertices.push( new THREE.Vector3( -size, 0, i ) );
			geometry.vertices.push( new THREE.Vector3(  size, 0, i ) );

			geometry.vertices.push( new THREE.Vector3( i, 0, -size ) );
			geometry.vertices.push( new THREE.Vector3( i, 0,  size ) );

			var color = i === 0 ? color1 : color2;

			geometry.colors.push( color, color, color, color );
		}

		var grid = new THREE.Line( geometry, material, THREE.LinePieces );
		_helperScene.add( grid );
	};

	Viewport.prototype.addCamera = function() {
		// set some camera attributes
		var VIEW_ANGLE = 50,
			ASPECT = window.innerWidth / window.innerHeight,
			NEAR = 1,
			FAR = 5000;
		_helperCam = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );

    	// the camera starts at 0,0,0 so pull it back
		// default
		// this.camera.position.set( 1800, 500, 0);
		_helperCam.position.set( 0, 3800, 0);

		// straight down
		// this.camera.position.set( 0, 800, 0 );

		_helperScene.add( _helperCam );
	};

	Viewport.prototype.addProps = function() {
	 	// set up the sphere vars
		var radius = 10,
		    segments = 6,
		    rings = 6;

		var sphere1 = new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, rings),
			this.materials.solid()
		);
		sphere1.position.x = -200;

		_helperScene.add(sphere1);
		
		var sphere2 = new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, rings),
			this.materials.solid()
		);
		sphere2.position.x = 200;

		_helperScene.add(sphere2);
    };
		
	Viewport.prototype.animate = function() {
		this.controls.update();

		this.render();
	};

	Viewport.prototype.render = function() {
		_helperScene.updateMatrixWorld();
		_finalScene.updateMatrixWorld();

		this.renderer.clear();

		var options = {
			camera: 'final',
			showGuides: true,
			showGrid: true
		};
		
		//TODO: set camera depth properties
		if(options.camera=='final') {
			this.renderer.render(_finalScene, _world.splineCamera);

			if(options.showGrid===true){
				this.renderer.render(_helperScene, _world.splineCamera);
			}
		}
		else {
			this.renderer.render(_finalScene, _helperCam);
			this.renderer.render(_helperScene, _helperCam);
		}		
	};

	return Viewport;

});
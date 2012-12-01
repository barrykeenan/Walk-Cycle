var Walk = Walk || {
	baseUrl: 'lib'
}

// Use require.js to load modules
requirejs.config({
    baseUrl: Walk.baseUrl,
    paths: {
        app: '../app'
    },

    shim: {
        'three.js/controls/TrackballControls': {
            deps: ['three.js/three.min'],
            exports: 'THREE.TrackballControls'
        }
    }
});


// Start the main app logic.
require([

	'app/MaterialFactory',
	'app/World',
	'app/Viewport',

	"three.js/three.min"

], function(MaterialFactory, World, Viewport) {

	var materials = new MaterialFactory();

	var world = new World(materials);

	var viewport = new Viewport({
		containerEl: document.getElementById('content'),
		materials: materials,
		world: world
	});
});
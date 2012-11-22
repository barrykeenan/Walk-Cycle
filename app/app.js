var Walk = Walk || {
	baseUrl: ''
}

// Use require.js to load modules
requirejs.config({
    baseUrl: Walk.baseUrl + 'lib',
    paths: {
        app: Walk.baseUrl + 'app'
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

	var world = new World(new MaterialFactory());

	var viewport = new Viewport({
		containerEl: document.getElementById('content'),
		world: world
	});
});
// Use require.js to load modules
requirejs.config({
    baseUrl: 'lib',

    paths: {
        app: '../app'
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
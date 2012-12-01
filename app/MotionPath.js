/**
 * Tween along a Path guide
 * 
 * @type {MotionPath} @extends Tween
 */
define([

	"greensock/minified/TweenMax.min"

], function() {

	var _path;
	var _pathControl = {
		position: 0
	};
	var _options;

	/**
	 * Tweens along a path
	 * 
	 * @param {[type]} object3D The object to tween
	 * @param {[type]} path     The path to snap to
	 * @param {int} duration 
	 * @param {Object} options  An object with the following options: 
	 *                          position: Portion of the path to move along. Default is the whole path.
	 */
	function MotionPath(object3D, path, duration, options) {
		_path = path;

		_options = options || {};
		_options.position = options.position || { from: 0, to: 1 };

		var tween = TweenMax.fromTo(_pathControl, duration,
			{ position: _options.position.from },
			{ position: _options.position.to,

			onUpdate: this.onUpdate,
			onUpdateParams:[object3D, "{self}"],

			ease: Linear.easeNone
		});

		return tween;
	};

	MotionPath.prototype.onUpdate = function(object3D, tween) {
		var pathPosition = _path.getPoint(_pathControl.position);
				
		if(_options.snap.x!==false) { object3D.position.x = pathPosition.x; }
		if(_options.snap.y!==false) { object3D.position.y = pathPosition.y; }
		if(_options.snap.z!==false) { object3D.position.z = pathPosition.z; }

		if(_options.orientToPath===true) {
			var tangent = _path.getTangent(_pathControl.position);
			var angle = Math.atan2(-tangent.z, tangent.x);
			object3D.rotation.y = angle;
		}
	};

	return MotionPath;
});
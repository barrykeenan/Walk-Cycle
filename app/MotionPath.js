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

		options = options || {};
		options.position = options.position || { from: 0, to: 1 };

		var tween = TweenMax.fromTo(_pathControl, duration,
			{ position: options.position.from },
			{ position: options.position.to,

			onUpdate: this.onUpdate,
			onUpdateParams:[object3D, "{self}"],

			ease: Linear.easeNone
		});

		return tween;
	};

	MotionPath.prototype.onUpdate = function(object3D, tween) {
		var pathPosition = _path.getPoint(_pathControl.position);
				
		object3D.position.x = pathPosition.x;
		object3D.position.z = pathPosition.z;
	};

	return MotionPath;
});
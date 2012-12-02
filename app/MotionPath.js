/**
 * Tween along a Path guide
 * 
 * @type {MotionPath} @extends Tween
 */
define([

	"greensock/minified/TweenMax.min"
	// "greensock/uncompressed/TweenMax"

], function() {

	// private class (shared) variables
	// var _PATH;

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
		this._pathControl = {
			position: 0
		};
		this._path = path;
		this._options = options || {};

		this._options.snap = this._options.snap || {};
		this._options.position = this._options.position || { from: 0, to: 1 };

		var tween = TweenMax.fromTo(this._pathControl, duration,
			{ position: this._options.position.from },
			{ position: this._options.position.to,
			ease: Linear.easeNone
		});

		tween.eventCallback('onUpdate', this.moveObject, [object3D, "{self}"], this);

		return tween;
	};

	MotionPath.prototype = Object.create( TweenMax.prototype );

	MotionPath.prototype.moveObject = function(object3D, tween) {
		var pathPosition = this._path.getPoint(this._pathControl.position);
				
		if(this._options.snap.x!==false) { object3D.position.x = pathPosition.x; }
		if(this._options.snap.y!==false) { object3D.position.y = pathPosition.y; }
		if(this._options.snap.z!==false) { object3D.position.z = pathPosition.z; }

		if(this._options.orientToPath===true) {
			var tangent = this._path.getTangent(this._pathControl.position);
			var angle = Math.atan2(-tangent.z, tangent.x);
			object3D.rotation.y = angle;
		}

		// callback
		if(typeof this._options.fn === 'function') {
			this._options.scope = this._options.scope || this;
			this._options.fn.call(this._options.scope, object3D);
		}
	};

	return MotionPath;
});
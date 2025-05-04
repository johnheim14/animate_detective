(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"animate30_atlas_1", frames: [[4154,4451,151,628],[4307,4451,151,628],[4154,2968,466,1481],[0,0,6742,2966],[4622,3372,66,91],[0,2968,4152,1875],[4460,4451,221,402],[4622,2968,221,402],[4644,3465,45,14],[4622,3465,20,47]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.arm_left = function() {
	this.initialize(ss["animate30_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.arm_right = function() {
	this.initialize(ss["animate30_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.body = function() {
	this.initialize(ss["animate30_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.city_night = function() {
	this.initialize(ss["animate30_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Layer1 = function() {
	this.initialize(ss["animate30_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Layer1_1 = function() {
	this.initialize(ss["animate30_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.leg_left = function() {
	this.initialize(ss["animate30_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.leg_right = function() {
	this.initialize(ss["animate30_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.mouth = function() {
	this.initialize(ss["animate30_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.pupil_right = function() {
	this.initialize(ss["animate30_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween27 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.mouth();
	this.instance.setTransform(-3.5,-3.95,0.1888,0.4505,11.9501);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.8,-3.9,9.6,7.9);


(lib.Tween26 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.mouth();
	this.instance.setTransform(-4.25,-1.3,0.1888,0.1888);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.2,-1.3,8.5,2.7);


(lib.Tween25 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.arm_right();
	this.instance.setTransform(-14.25,-59.3,0.1888,0.1888);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.2,-59.3,28.5,118.6);


(lib.Tween24 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.leg_right();
	this.instance.setTransform(-20.85,-37.95,0.1888,0.1888);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-37.9,41.7,75.9);


(lib.Tween23 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.leg_left();
	this.instance.setTransform(-20.85,-37.95,0.1888,0.1888);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-37.9,41.7,75.9);


(lib.Tween22 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.body();
	this.instance.setTransform(-44,-139.85,0.1888,0.1888);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44,-139.8,88,279.70000000000005);


(lib.Tween21 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.arm_left();
	this.instance.setTransform(-14.25,-59.3,0.1888,0.1888);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.2,-59.3,28.5,118.6);


(lib.Tween20 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.pupil_right();
	this.instance.setTransform(-1.9,-4.45,0.1888,0.1888);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.9,-4.4,3.8,8.9);


(lib.Tween8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill().beginStroke("#F4F4F9").setStrokeStyle(1,1,1).moveTo(4.2,-34).lineTo(-4.2,33.9);
	this.shape.setTransform(-0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.2,-34.9,10.4,69.9);


(lib.Tween7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill().beginStroke("#F4F4F9").setStrokeStyle(1,1,1).moveTo(4.2,-33.9).lineTo(-4.2,33.9);
	this.shape.setTransform(-0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.2,-34.9,10.4,69.9);


(lib.Tween6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill().beginStroke("#F4F4F9").setStrokeStyle(1,1,1).moveTo(4.2,-33.9).lineTo(-4.2,33.9);
	this.shape.setTransform(-0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.2,-34.9,10.4,69.9);


(lib.Tween5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill().beginStroke("#F4F4F9").setStrokeStyle(1,1,1).moveTo(4.2,-33.9).lineTo(-4.2,34);
	this.shape.setTransform(-0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.2,-34.9,10.4,69.9);


(lib.Tween4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill().beginStroke("#F4F4F9").setStrokeStyle(1,1,1).moveTo(4.2,-34).lineTo(-4.2,33.9);
	this.shape.setTransform(-0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.2,-34.9,10.4,69.9);


(lib.Tween3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill().beginStroke("#F4F4F9").setStrokeStyle(1,1,1).moveTo(4.2,-33.9).lineTo(-4.2,33.9);
	this.shape.setTransform(-0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.2,-34.9,10.4,69.9);


(lib.playButton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill("#FF0000").beginStroke().moveTo(3.5,8.4).lineTo(3.5,-2.4).curveTo(3.5,-4.3,2.9,-4.9).curveTo(2.4,-5.4,1.5,-5.4).curveTo(-0.7,-5.5,-3.4,-3.4).lineTo(-3.4,5.5).lineTo(-0.5,5.5).lineTo(-0.5,8.4).lineTo(-9.5,8.4).lineTo(-9.5,5.5).lineTo(-6.6,5.5).lineTo(-6.6,-5.2).lineTo(-9.5,-5.2).lineTo(-9.5,-8.1).lineTo(-3.4,-8.1).lineTo(-3.4,-6.1).curveTo(-0.2,-8.4,2.3,-8.4).curveTo(4,-8.4,5,-7.7).curveTo(6.1,-6.9,6.4,-5.8).curveTo(6.7,-4.7,6.7,-2.5).lineTo(6.7,5.5).lineTo(9.5,5.5).lineTo(9.5,8.4).closePath();
	this.shape.setTransform(113.25,1.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.beginFill("#FF0000").beginStroke().moveTo(-6.2,6.2).curveTo(-8.7,3.8,-8.7,0).curveTo(-8.7,-3.8,-6.2,-6.3).curveTo(-3.7,-8.7,-0,-8.7).curveTo(3.6,-8.7,6.1,-6.4).curveTo(8.7,-3.9,8.7,0).curveTo(8.7,3.9,6.1,6.3).curveTo(3.6,8.8,-0,8.7).curveTo(-3.7,8.7,-6.2,6.2).closePath().moveTo(-3.8,-4).curveTo(-5.3,-2.4,-5.3,0).curveTo(-5.3,2.4,-3.8,4).curveTo(-2.2,5.5,-0,5.6).curveTo(2.2,5.6,3.8,4).curveTo(5.2,2.4,5.2,0).curveTo(5.2,-2.5,3.7,-4).curveTo(2.2,-5.6,-0,-5.6).curveTo(-2.3,-5.6,-3.8,-4).closePath();
	this.shape_1.setTransform(92.8,1.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.beginFill("#FF0000").beginStroke().moveTo(-4.2,12.1).lineTo(-4.2,9.1).lineTo(-1.6,9.1).lineTo(-1.6,-1.6).lineTo(-4.2,-1.6).lineTo(-4.2,-4.5).lineTo(1.6,-4.5).lineTo(1.6,9.1).lineTo(4.2,9.1).lineTo(4.2,12.1).closePath().moveTo(-1.5,-8.8).curveTo(-2.1,-9.3,-2.1,-10.1).curveTo(-2.1,-10.9,-1.5,-11.5).curveTo(-1,-12.1,-0.1,-12).curveTo(0.7,-12.1,1.3,-11.5).curveTo(1.9,-11,1.9,-10.1).curveTo(1.9,-9.3,1.3,-8.7).curveTo(0.7,-8.2,-0.1,-8.2).curveTo(-0.9,-8.1,-1.5,-8.8).closePath();
	this.shape_2.setTransform(77.875,-2.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.beginFill("#FF0000").beginStroke().moveTo(-0.7,10.5).curveTo(-1.6,9.9,-1.8,8.9).curveTo(-2.1,7.9,-2.1,5.5).lineTo(-2.1,-2.7).lineTo(-4.2,-2.7).lineTo(-4.2,-5.6).lineTo(-2.1,-5.6).lineTo(-2.1,-8.2).lineTo(1.2,-11.1).lineTo(1.2,-5.6).lineTo(4.2,-5.6).lineTo(4.2,-2.7).lineTo(1.2,-2.7).lineTo(1.2,5.3).curveTo(1.2,7.2,1.4,7.6).curveTo(1.6,8.1,2.5,8.1).curveTo(3.4,8.1,4.2,7.8).lineTo(4.2,10.8).curveTo(3,11.1,1.7,11.1).curveTo(0.3,11.2,-0.7,10.5).closePath();
	this.shape_3.setTransform(67.275,-0.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.beginFill("#FF0000").beginStroke().moveTo(-6.6,7.2).curveTo(-8.3,5.7,-8.3,3.4).curveTo(-8.3,1.1,-6.5,-0.4).curveTo(-4.7,-1.9,-2.2,-1.9).curveTo(0.1,-1.9,2.3,-0.5).lineTo(2.3,-2.2).curveTo(2.3,-3.4,2,-4.1).curveTo(1.8,-4.8,0.9,-5.3).curveTo(0,-5.9,-1.4,-5.9).curveTo(-3.8,-5.9,-4.9,-3.9).lineTo(-8,-4.8).curveTo(-6,-8.6,-0.9,-8.6).curveTo(1,-8.6,2.3,-8.1).curveTo(3.7,-7.6,4.3,-6.8).curveTo(5,-6,5.2,-5.1).curveTo(5.5,-4.2,5.5,-2.2).lineTo(5.5,5.5).lineTo(8.3,5.5).lineTo(8.3,8.4).lineTo(2.6,8.4).lineTo(2.6,6.4).curveTo(0.2,8.6,-2.7,8.6).curveTo(-4.9,8.6,-6.6,7.2).closePath().moveTo(-4.3,1.4).curveTo(-5.2,2.2,-5.2,3.4).curveTo(-5.2,4.6,-4.4,5.4).curveTo(-3.6,6.1,-2.2,6.1).curveTo(0.2,6.1,2.3,4.2).lineTo(2.3,2.2).curveTo(0.2,0.6,-2,0.6).curveTo(-3.3,0.6,-4.3,1.4).closePath();
	this.shape_4.setTransform(53.275,1.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.beginFill("#FF0000").beginStroke().moveTo(8.5,8.4).lineTo(8.5,-2.1).curveTo(8.5,-3.5,8.3,-4.2).curveTo(8.2,-4.7,7.7,-5.1).curveTo(7.1,-5.5,6.4,-5.5).curveTo(4.3,-5.5,1.7,-3.4).lineTo(1.7,5.5).lineTo(4.5,5.5).lineTo(4.5,8.4).lineTo(-1.5,8.4).lineTo(-1.5,-2.4).curveTo(-1.6,-4.1,-2.1,-4.8).curveTo(-2.5,-5.5,-3.7,-5.5).curveTo(-5.4,-5.5,-8.4,-3.4).lineTo(-8.4,5.5).lineTo(-5.5,5.5).lineTo(-5.5,8.4).lineTo(-14.6,8.4).lineTo(-14.6,5.5).lineTo(-11.6,5.5).lineTo(-11.6,-5.2).lineTo(-14.4,-5.2).lineTo(-14.4,-8.1).lineTo(-8.4,-8.1).lineTo(-8.4,-6.1).curveTo(-5.5,-8.4,-2.7,-8.4).curveTo(0.2,-8.4,1.3,-5.8).curveTo(4.5,-8.4,7.3,-8.4).curveTo(8.9,-8.4,9.9,-7.7).curveTo(11,-7,11.4,-5.9).curveTo(11.7,-4.8,11.7,-2.7).lineTo(11.7,5.5).lineTo(14.6,5.5).lineTo(14.6,8.4).closePath();
	this.shape_5.setTransform(28.6,1.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.beginFill("#FF0000").beginStroke().moveTo(-4.2,12.1).lineTo(-4.2,9.1).lineTo(-1.6,9.1).lineTo(-1.6,-1.6).lineTo(-4.2,-1.6).lineTo(-4.2,-4.5).lineTo(1.6,-4.5).lineTo(1.6,9.1).lineTo(4.2,9.1).lineTo(4.2,12.1).closePath().moveTo(-1.5,-8.8).curveTo(-2.1,-9.3,-2.1,-10.1).curveTo(-2.1,-10.9,-1.5,-11.5).curveTo(-1,-12.1,-0.1,-12).curveTo(0.7,-12.1,1.3,-11.5).curveTo(1.9,-11,1.9,-10.1).curveTo(1.9,-9.3,1.3,-8.7).curveTo(0.7,-8.2,-0.1,-8.2).curveTo(-0.9,-8.1,-1.5,-8.8).closePath();
	this.shape_6.setTransform(8.225,-2.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.beginFill("#FF0000").beginStroke().moveTo(3.5,8.4).lineTo(3.5,-2.4).curveTo(3.4,-4.3,2.9,-4.9).curveTo(2.3,-5.4,1.5,-5.4).curveTo(-0.6,-5.5,-3.4,-3.4).lineTo(-3.4,5.5).lineTo(-0.5,5.5).lineTo(-0.5,8.4).lineTo(-9.5,8.4).lineTo(-9.5,5.5).lineTo(-6.6,5.5).lineTo(-6.6,-5.2).lineTo(-9.5,-5.2).lineTo(-9.5,-8.1).lineTo(-3.4,-8.1).lineTo(-3.4,-6.1).curveTo(-0.2,-8.4,2.4,-8.4).curveTo(3.9,-8.4,5,-7.7).curveTo(6,-6.9,6.4,-5.8).curveTo(6.7,-4.7,6.7,-2.5).lineTo(6.7,5.5).lineTo(9.5,5.5).lineTo(9.5,8.4).closePath();
	this.shape_7.setTransform(-6.7,1.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.beginFill("#FF0000").beginStroke().moveTo(3.2,11.9).lineTo(3.2,8.9).lineTo(6.1,8.9).lineTo(4.4,3.5).lineTo(-4.2,3.5).lineTo(-6,8.9).lineTo(-3.1,8.9).lineTo(-3.1,11.9).lineTo(-12.5,11.9).lineTo(-12.5,8.9).lineTo(-9.6,8.9).lineTo(-3.1,-9.2).lineTo(-6,-9.2).lineTo(-6,-11.9).lineTo(6.1,-11.9).lineTo(6.1,-9.2).lineTo(3.2,-9.2).lineTo(9.8,8.9).lineTo(12.5,8.9).lineTo(12.5,11.9).closePath().moveTo(-3.3,0.7).lineTo(3.5,0.7).lineTo(0.3,-9.2).lineTo(-0,-9.2).closePath();
	this.shape_8.setTransform(-29.375,-1.925);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.beginFill("#FF0000").beginStroke().moveTo(-6.6,12).lineTo(-6.6,9.2).lineTo(-3.3,9.2).lineTo(-1.4,4.3).lineTo(-6.8,-9.1).lineTo(-9.6,-9.1).lineTo(-9.6,-12).lineTo(-1.4,-12).lineTo(-1.4,-9.1).lineTo(-3.3,-9.1).lineTo(0.2,0.1).lineTo(3.7,-9.1).lineTo(1.5,-9.1).lineTo(1.5,-12).lineTo(9.5,-12).lineTo(9.5,-9.1).lineTo(7.1,-9.1).lineTo(-1.1,12).closePath();
	this.shape_9.setTransform(-60.2,5.375);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.beginFill("#FF0000").beginStroke().moveTo(-6.6,7.2).curveTo(-8.3,5.7,-8.3,3.4).curveTo(-8.3,1.1,-6.5,-0.4).curveTo(-4.7,-1.9,-2.2,-1.9).curveTo(0.1,-1.9,2.3,-0.5).lineTo(2.3,-2.2).curveTo(2.3,-3.4,2,-4.1).curveTo(1.8,-4.8,0.9,-5.3).curveTo(0,-5.9,-1.4,-5.9).curveTo(-3.8,-5.9,-4.9,-3.9).lineTo(-8,-4.8).curveTo(-6,-8.6,-0.9,-8.6).curveTo(1,-8.6,2.3,-8.1).curveTo(3.7,-7.6,4.3,-6.8).curveTo(5,-6,5.2,-5.1).curveTo(5.5,-4.2,5.5,-2.2).lineTo(5.5,5.5).lineTo(8.3,5.5).lineTo(8.3,8.4).lineTo(2.6,8.4).lineTo(2.6,6.4).curveTo(0.2,8.6,-2.7,8.6).curveTo(-4.9,8.6,-6.6,7.2).closePath().moveTo(-4.3,1.4).curveTo(-5.2,2.2,-5.2,3.4).curveTo(-5.2,4.6,-4.4,5.4).curveTo(-3.6,6.1,-2.2,6.1).curveTo(0.2,6.1,2.3,4.2).lineTo(2.3,2.2).curveTo(0.2,0.6,-2,0.6).curveTo(-3.3,0.6,-4.3,1.4).closePath();
	this.shape_10.setTransform(-78.775,1.575);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.beginFill("#FF0000").beginStroke().moveTo(-4.4,11.9).lineTo(-4.4,9).lineTo(-1.4,9).lineTo(-1.4,-9).lineTo(-4.4,-9).lineTo(-4.4,-11.9).lineTo(1.8,-11.9).lineTo(1.8,9).lineTo(4.3,9).lineTo(4.3,11.9).closePath();
	this.shape_11.setTransform(-93.8,-1.925);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.beginFill("#FF0000").beginStroke().moveTo(-9.2,11.9).lineTo(-9.2,8.9).lineTo(-6.2,8.9).lineTo(-6.2,-8.9).lineTo(-9.2,-8.9).lineTo(-9.2,-11.9).lineTo(-0.7,-11.9).curveTo(3,-11.9,4.9,-11.4).curveTo(6.7,-10.8,8,-9).curveTo(9.2,-7.1,9.2,-4.5).curveTo(9.2,-2.5,8.4,-0.9).curveTo(7.6,0.7,6.4,1.5).curveTo(5.1,2.3,3.6,2.5).curveTo(2.1,2.8,-1,2.8).lineTo(-2.6,2.8).lineTo(-2.6,8.9).lineTo(0.4,8.9).lineTo(0.4,11.9).closePath().moveTo(-2.6,-0.1).lineTo(-0.6,-0.1).curveTo(2.9,-0.1,4.3,-1.1).curveTo(5.6,-2.1,5.6,-4.6).curveTo(5.6,-6.2,4.9,-7.3).curveTo(4.2,-8.3,3.1,-8.6).curveTo(2.1,-8.9,-0.4,-8.9).lineTo(-2.6,-8.9).closePath();
	this.shape_12.setTransform(-108.975,-1.925);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.beginFill().beginStroke("#000000").setStrokeStyle(1,1,1).moveTo(-152,-71.5).lineTo(152,-71.5).lineTo(152,71.5).lineTo(-152,71.5).closePath();
	this.shape_13.setTransform(0,0.025);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-152,71.5).lineTo(-152,-71.5).lineTo(152,-71.5).lineTo(152,71.5).closePath();
	this.shape_14.setTransform(0,0.025);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.beginFill("#000000").beginStroke().moveTo(3.5,8.4).lineTo(3.5,-2.4).curveTo(3.5,-4.3,2.9,-4.9).curveTo(2.4,-5.4,1.5,-5.4).curveTo(-0.7,-5.5,-3.4,-3.4).lineTo(-3.4,5.5).lineTo(-0.5,5.5).lineTo(-0.5,8.4).lineTo(-9.5,8.4).lineTo(-9.5,5.5).lineTo(-6.6,5.5).lineTo(-6.6,-5.2).lineTo(-9.5,-5.2).lineTo(-9.5,-8.1).lineTo(-3.4,-8.1).lineTo(-3.4,-6.1).curveTo(-0.2,-8.4,2.3,-8.4).curveTo(4,-8.4,5,-7.7).curveTo(6.1,-6.9,6.4,-5.8).curveTo(6.7,-4.7,6.7,-2.5).lineTo(6.7,5.5).lineTo(9.5,5.5).lineTo(9.5,8.4).closePath();
	this.shape_15.setTransform(113.25,1.55);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.beginFill("#000000").beginStroke().moveTo(-6.2,6.2).curveTo(-8.7,3.8,-8.7,0).curveTo(-8.7,-3.8,-6.2,-6.3).curveTo(-3.7,-8.7,-0,-8.7).curveTo(3.6,-8.7,6.1,-6.4).curveTo(8.7,-3.9,8.7,0).curveTo(8.7,3.9,6.1,6.3).curveTo(3.6,8.8,-0,8.7).curveTo(-3.7,8.7,-6.2,6.2).closePath().moveTo(-3.8,-4).curveTo(-5.3,-2.4,-5.3,0).curveTo(-5.3,2.4,-3.8,4).curveTo(-2.2,5.5,-0,5.6).curveTo(2.2,5.6,3.8,4).curveTo(5.2,2.4,5.2,0).curveTo(5.2,-2.5,3.7,-4).curveTo(2.2,-5.6,-0,-5.6).curveTo(-2.3,-5.6,-3.8,-4).closePath();
	this.shape_16.setTransform(92.8,1.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.beginFill("#000000").beginStroke().moveTo(-4.2,12.1).lineTo(-4.2,9.1).lineTo(-1.6,9.1).lineTo(-1.6,-1.6).lineTo(-4.2,-1.6).lineTo(-4.2,-4.5).lineTo(1.6,-4.5).lineTo(1.6,9.1).lineTo(4.2,9.1).lineTo(4.2,12.1).closePath().moveTo(-1.5,-8.8).curveTo(-2.1,-9.3,-2.1,-10.1).curveTo(-2.1,-10.9,-1.5,-11.5).curveTo(-1,-12.1,-0.1,-12).curveTo(0.7,-12.1,1.3,-11.5).curveTo(1.9,-11,1.9,-10.1).curveTo(1.9,-9.3,1.3,-8.7).curveTo(0.7,-8.2,-0.1,-8.2).curveTo(-0.9,-8.1,-1.5,-8.8).closePath();
	this.shape_17.setTransform(77.875,-2.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.beginFill("#000000").beginStroke().moveTo(-0.7,10.5).curveTo(-1.6,9.9,-1.8,8.9).curveTo(-2.1,7.9,-2.1,5.5).lineTo(-2.1,-2.7).lineTo(-4.2,-2.7).lineTo(-4.2,-5.6).lineTo(-2.1,-5.6).lineTo(-2.1,-8.2).lineTo(1.2,-11.1).lineTo(1.2,-5.6).lineTo(4.2,-5.6).lineTo(4.2,-2.7).lineTo(1.2,-2.7).lineTo(1.2,5.3).curveTo(1.2,7.2,1.4,7.6).curveTo(1.6,8.1,2.5,8.1).curveTo(3.4,8.1,4.2,7.8).lineTo(4.2,10.8).curveTo(3,11.1,1.7,11.1).curveTo(0.3,11.2,-0.7,10.5).closePath();
	this.shape_18.setTransform(67.275,-0.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.beginFill("#000000").beginStroke().moveTo(-6.6,7.2).curveTo(-8.3,5.7,-8.3,3.4).curveTo(-8.3,1.1,-6.5,-0.4).curveTo(-4.7,-1.9,-2.2,-1.9).curveTo(0.1,-1.9,2.3,-0.5).lineTo(2.3,-2.2).curveTo(2.3,-3.4,2,-4.1).curveTo(1.8,-4.8,0.9,-5.3).curveTo(0,-5.9,-1.4,-5.9).curveTo(-3.8,-5.9,-4.9,-3.9).lineTo(-8,-4.8).curveTo(-6,-8.6,-0.9,-8.6).curveTo(1,-8.6,2.3,-8.1).curveTo(3.7,-7.6,4.3,-6.8).curveTo(5,-6,5.2,-5.1).curveTo(5.5,-4.2,5.5,-2.2).lineTo(5.5,5.5).lineTo(8.3,5.5).lineTo(8.3,8.4).lineTo(2.6,8.4).lineTo(2.6,6.4).curveTo(0.2,8.6,-2.7,8.6).curveTo(-4.9,8.6,-6.6,7.2).closePath().moveTo(-4.3,1.4).curveTo(-5.2,2.2,-5.2,3.4).curveTo(-5.2,4.6,-4.4,5.4).curveTo(-3.6,6.1,-2.2,6.1).curveTo(0.2,6.1,2.3,4.2).lineTo(2.3,2.2).curveTo(0.2,0.6,-2,0.6).curveTo(-3.3,0.6,-4.3,1.4).closePath();
	this.shape_19.setTransform(53.275,1.575);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.beginFill("#000000").beginStroke().moveTo(8.5,8.4).lineTo(8.5,-2.1).curveTo(8.5,-3.5,8.3,-4.2).curveTo(8.2,-4.7,7.7,-5.1).curveTo(7.1,-5.5,6.4,-5.5).curveTo(4.3,-5.5,1.7,-3.4).lineTo(1.7,5.5).lineTo(4.5,5.5).lineTo(4.5,8.4).lineTo(-1.5,8.4).lineTo(-1.5,-2.4).curveTo(-1.6,-4.1,-2.1,-4.8).curveTo(-2.5,-5.5,-3.7,-5.5).curveTo(-5.4,-5.5,-8.4,-3.4).lineTo(-8.4,5.5).lineTo(-5.5,5.5).lineTo(-5.5,8.4).lineTo(-14.6,8.4).lineTo(-14.6,5.5).lineTo(-11.6,5.5).lineTo(-11.6,-5.2).lineTo(-14.4,-5.2).lineTo(-14.4,-8.1).lineTo(-8.4,-8.1).lineTo(-8.4,-6.1).curveTo(-5.5,-8.4,-2.7,-8.4).curveTo(0.2,-8.4,1.3,-5.8).curveTo(4.5,-8.4,7.3,-8.4).curveTo(8.9,-8.4,9.9,-7.7).curveTo(11,-7,11.4,-5.9).curveTo(11.7,-4.8,11.7,-2.7).lineTo(11.7,5.5).lineTo(14.6,5.5).lineTo(14.6,8.4).closePath();
	this.shape_20.setTransform(28.6,1.55);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.beginFill("#000000").beginStroke().moveTo(-4.2,12.1).lineTo(-4.2,9.1).lineTo(-1.6,9.1).lineTo(-1.6,-1.6).lineTo(-4.2,-1.6).lineTo(-4.2,-4.5).lineTo(1.6,-4.5).lineTo(1.6,9.1).lineTo(4.2,9.1).lineTo(4.2,12.1).closePath().moveTo(-1.5,-8.8).curveTo(-2.1,-9.3,-2.1,-10.1).curveTo(-2.1,-10.9,-1.5,-11.5).curveTo(-1,-12.1,-0.1,-12).curveTo(0.7,-12.1,1.3,-11.5).curveTo(1.9,-11,1.9,-10.1).curveTo(1.9,-9.3,1.3,-8.7).curveTo(0.7,-8.2,-0.1,-8.2).curveTo(-0.9,-8.1,-1.5,-8.8).closePath();
	this.shape_21.setTransform(8.225,-2.1);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.beginFill("#000000").beginStroke().moveTo(3.5,8.4).lineTo(3.5,-2.4).curveTo(3.4,-4.3,2.9,-4.9).curveTo(2.3,-5.4,1.5,-5.4).curveTo(-0.6,-5.5,-3.4,-3.4).lineTo(-3.4,5.5).lineTo(-0.5,5.5).lineTo(-0.5,8.4).lineTo(-9.5,8.4).lineTo(-9.5,5.5).lineTo(-6.6,5.5).lineTo(-6.6,-5.2).lineTo(-9.5,-5.2).lineTo(-9.5,-8.1).lineTo(-3.4,-8.1).lineTo(-3.4,-6.1).curveTo(-0.2,-8.4,2.4,-8.4).curveTo(3.9,-8.4,5,-7.7).curveTo(6,-6.9,6.4,-5.8).curveTo(6.7,-4.7,6.7,-2.5).lineTo(6.7,5.5).lineTo(9.5,5.5).lineTo(9.5,8.4).closePath();
	this.shape_22.setTransform(-6.7,1.55);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.beginFill("#000000").beginStroke().moveTo(3.2,11.9).lineTo(3.2,8.9).lineTo(6.1,8.9).lineTo(4.4,3.5).lineTo(-4.2,3.5).lineTo(-6,8.9).lineTo(-3.1,8.9).lineTo(-3.1,11.9).lineTo(-12.5,11.9).lineTo(-12.5,8.9).lineTo(-9.6,8.9).lineTo(-3.1,-9.2).lineTo(-6,-9.2).lineTo(-6,-11.9).lineTo(6.1,-11.9).lineTo(6.1,-9.2).lineTo(3.2,-9.2).lineTo(9.8,8.9).lineTo(12.5,8.9).lineTo(12.5,11.9).closePath().moveTo(-3.3,0.7).lineTo(3.5,0.7).lineTo(0.3,-9.2).lineTo(-0,-9.2).closePath();
	this.shape_23.setTransform(-29.375,-1.925);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.beginFill("#000000").beginStroke().moveTo(-6.6,12).lineTo(-6.6,9.2).lineTo(-3.3,9.2).lineTo(-1.4,4.3).lineTo(-6.8,-9.1).lineTo(-9.6,-9.1).lineTo(-9.6,-12).lineTo(-1.4,-12).lineTo(-1.4,-9.1).lineTo(-3.3,-9.1).lineTo(0.2,0.1).lineTo(3.7,-9.1).lineTo(1.5,-9.1).lineTo(1.5,-12).lineTo(9.5,-12).lineTo(9.5,-9.1).lineTo(7.1,-9.1).lineTo(-1.1,12).closePath();
	this.shape_24.setTransform(-60.2,5.375);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.beginFill("#000000").beginStroke().moveTo(-6.6,7.2).curveTo(-8.3,5.7,-8.3,3.4).curveTo(-8.3,1.1,-6.5,-0.4).curveTo(-4.7,-1.9,-2.2,-1.9).curveTo(0.1,-1.9,2.3,-0.5).lineTo(2.3,-2.2).curveTo(2.3,-3.4,2,-4.1).curveTo(1.8,-4.8,0.9,-5.3).curveTo(0,-5.9,-1.4,-5.9).curveTo(-3.8,-5.9,-4.9,-3.9).lineTo(-8,-4.8).curveTo(-6,-8.6,-0.9,-8.6).curveTo(1,-8.6,2.3,-8.1).curveTo(3.7,-7.6,4.3,-6.8).curveTo(5,-6,5.2,-5.1).curveTo(5.5,-4.2,5.5,-2.2).lineTo(5.5,5.5).lineTo(8.3,5.5).lineTo(8.3,8.4).lineTo(2.6,8.4).lineTo(2.6,6.4).curveTo(0.2,8.6,-2.7,8.6).curveTo(-4.9,8.6,-6.6,7.2).closePath().moveTo(-4.3,1.4).curveTo(-5.2,2.2,-5.2,3.4).curveTo(-5.2,4.6,-4.4,5.4).curveTo(-3.6,6.1,-2.2,6.1).curveTo(0.2,6.1,2.3,4.2).lineTo(2.3,2.2).curveTo(0.2,0.6,-2,0.6).curveTo(-3.3,0.6,-4.3,1.4).closePath();
	this.shape_25.setTransform(-78.775,1.575);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.beginFill("#000000").beginStroke().moveTo(-4.4,11.9).lineTo(-4.4,9).lineTo(-1.4,9).lineTo(-1.4,-9).lineTo(-4.4,-9).lineTo(-4.4,-11.9).lineTo(1.8,-11.9).lineTo(1.8,9).lineTo(4.3,9).lineTo(4.3,11.9).closePath();
	this.shape_26.setTransform(-93.8,-1.925);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.beginFill("#000000").beginStroke().moveTo(-9.2,11.9).lineTo(-9.2,8.9).lineTo(-6.2,8.9).lineTo(-6.2,-8.9).lineTo(-9.2,-8.9).lineTo(-9.2,-11.9).lineTo(-0.7,-11.9).curveTo(3,-11.9,4.9,-11.4).curveTo(6.7,-10.8,8,-9).curveTo(9.2,-7.1,9.2,-4.5).curveTo(9.2,-2.5,8.4,-0.9).curveTo(7.6,0.7,6.4,1.5).curveTo(5.1,2.3,3.6,2.5).curveTo(2.1,2.8,-1,2.8).lineTo(-2.6,2.8).lineTo(-2.6,8.9).lineTo(0.4,8.9).lineTo(0.4,11.9).closePath().moveTo(-2.6,-0.1).lineTo(-0.6,-0.1).curveTo(2.9,-0.1,4.3,-1.1).curveTo(5.6,-2.1,5.6,-4.6).curveTo(5.6,-6.2,4.9,-7.3).curveTo(4.2,-8.3,3.1,-8.6).curveTo(2.1,-8.9,-0.4,-8.9).lineTo(-2.6,-8.9).closePath();
	this.shape_27.setTransform(-108.975,-1.925);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.beginFill("#666666").beginStroke().moveTo(-152,71.5).lineTo(-152,-71.5).lineTo(152,-71.5).lineTo(152,71.5).closePath();
	this.shape_28.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},1).to({state:[{t:this.shape_28},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-153,-72.4,306,144.9);


(lib.office_background = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Layer1_1();
	this.instance.setTransform(-2076,-937.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2076,-937.5,4152,1875);


(lib.pupil = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.pupil_right();
	this.instance.setTransform(-1.9,-4.45,0.1888,0.1888);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.9,-4.4,3.8,8.9);


(lib.mouth_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.mouth();
	this.instance.setTransform(-4.25,-1.3,0.1888,0.1888);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.2,-1.3,8.5,2.7);


(lib.leg_right_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.leg_right();
	this.instance.setTransform(-20.85,-37.95,0.1888,0.1888);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-37.9,41.7,75.9);


(lib.leg_left_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.leg_left();
	this.instance.setTransform(-20.85,-37.95,0.1888,0.1888);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-37.9,41.7,75.9);


(lib.body_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.body();
	this.instance.setTransform(-44,-139.85,0.1888,0.1888);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44,-139.8,88,279.70000000000005);


(lib.arm_right_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.arm_right();
	this.instance.setTransform(-14.25,-59.3,0.1888,0.1888);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.2,-59.3,28.5,118.6);


(lib.arm_left_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.arm_left();
	this.instance.setTransform(-14.25,-59.3,0.1888,0.1888);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.2,-59.3,28.5,118.6);


(lib.Layer1_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Layer1();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Layer1_2, new cjs.Rectangle(0,0,66,91), null);


(lib.city_background = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.city_night();
	this.instance.setTransform(-589.2,-259.2,0.1748,0.1748);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-589.2,-259.2,1178.5,518.5);


(lib.buttonNext = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill("#000000").beginStroke().moveTo(-9,9).curveTo(-12.7,5.4,-12.7,0).curveTo(-12.7,-5.3,-9,-9).curveTo(-5.2,-12.7,0.2,-12.7).curveTo(5.5,-12.7,9.1,-9.1).curveTo(12.7,-5.5,12.7,-0.2).lineTo(12.6,1.5).lineTo(-1.2,1.5).curveTo(-1.5,0.5,-1.6,-0.4).curveTo(-1.5,-1.6,-1.1,-2.8).lineTo(3.5,-2.8).curveTo(3,-5.5,0.5,-5.5).curveTo(-1.3,-5.5,-2.3,-4).curveTo(-3.4,-2.6,-3.4,-0.3).curveTo(-3.4,2,-2.3,3.5).curveTo(-1.4,5,0.4,5).curveTo(1.7,5,3,3.6).lineTo(8.2,9.8).curveTo(4.5,12.7,0.1,12.7).curveTo(-5.3,12.7,-9,9).closePath();
	this.shape.setTransform(78.9,0.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.beginFill("#000000").beginStroke().moveTo(-8.3,8.6).curveTo(-10.8,5.7,-10.9,0.4).lineTo(-10.9,-12.4).lineTo(-1.7,-12.4).lineTo(-1.7,1.3).curveTo(-1.7,3.4,0,3.4).curveTo(1.7,3.4,1.7,1.3).lineTo(1.7,-12.4).lineTo(10.8,-12.4).lineTo(10.8,1.2).curveTo(10.8,5.9,7.7,9.2).curveTo(4.6,12.4,0,12.4).curveTo(-5.2,12.4,-8.3,8.6).closePath();
	this.shape_1.setTransform(51.35,1.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.beginFill("#000000").beginStroke().moveTo(1.7,12.4).lineTo(1.7,-1.3).curveTo(1.7,-3.4,-0,-3.4).curveTo(-1.7,-3.4,-1.7,-1.3).lineTo(-1.7,12.4).lineTo(-10.9,12.4).lineTo(-10.9,-1.1).curveTo(-10.9,-5.9,-7.7,-9.2).curveTo(-4.5,-12.4,0.1,-12.4).curveTo(5.2,-12.4,8.4,-8.6).curveTo(10.9,-5.7,10.9,-0.4).lineTo(10.9,12.4).closePath();
	this.shape_2.setTransform(24.3,0.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.beginFill("#000000").beginStroke().moveTo(-4.6,17.6).lineTo(-4.6,-6.7).lineTo(4.6,-6.7).lineTo(4.6,17.6).closePath().moveTo(-3.2,-10.1).curveTo(-4.5,-11.3,-4.5,-13.2).curveTo(-4.5,-15,-3.2,-16.3).curveTo(-1.8,-17.6,0,-17.6).curveTo(1.9,-17.6,3.2,-16.3).curveTo(4.6,-15,4.6,-13.2).curveTo(4.6,-11.3,3.3,-10.1).curveTo(2,-8.9,0,-8.9).curveTo(-2,-8.9,-3.2,-10.1).closePath();
	this.shape_3.setTransform(3.525,-4.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.beginFill("#000000").beginStroke().moveTo(5.7,16.8).curveTo(2.6,16.9,-0.2,15.5).curveTo(-3,14,-4.6,11.5).curveTo(-6.7,8.3,-6.7,3.1).lineTo(-6.7,-16.8).lineTo(2.4,-16.8).lineTo(2.4,-7.5).lineTo(6.6,-7.5).lineTo(6.6,2.2).lineTo(2.4,2.2).curveTo(2.5,5.1,3.3,6.1).curveTo(4.3,7.3,6.7,7.3).lineTo(6.7,16.8).lineTo(5.7,16.8).closePath();
	this.shape_4.setTransform(-12.05,-3.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.beginFill("#000000").beginStroke().moveTo(1.7,12.4).lineTo(1.7,-1.3).curveTo(1.7,-3.4,0,-3.4).curveTo(-1.7,-3.4,-1.7,-1.3).lineTo(-1.7,12.4).lineTo(-10.9,12.4).lineTo(-10.9,-1.1).curveTo(-10.8,-5.9,-7.7,-9.2).curveTo(-4.5,-12.4,0,-12.4).curveTo(5.3,-12.4,8.4,-8.6).curveTo(10.8,-5.7,10.8,-0.4).lineTo(10.8,12.4).closePath();
	this.shape_5.setTransform(-33.95,0.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.beginFill("#000000").beginStroke().moveTo(-9,9).curveTo(-12.8,5.2,-12.8,-0).curveTo(-12.8,-5.4,-9,-9).curveTo(-5.3,-12.7,0.2,-12.7).curveTo(5.4,-12.7,9.1,-8.9).curveTo(12.8,-5.2,12.8,-0).curveTo(12.8,5.2,9.1,9).curveTo(5.3,12.7,0,12.7).curveTo(-5.3,12.7,-9,9).closePath().moveTo(-2.5,-2.6).curveTo(-3.5,-1.5,-3.5,-0).curveTo(-3.5,1.5,-2.5,2.6).curveTo(-1.5,3.7,-0,3.7).curveTo(1.5,3.7,2.5,2.6).curveTo(3.5,1.5,3.5,-0).curveTo(3.5,-1.5,2.5,-2.6).curveTo(1.5,-3.7,-0,-3.7).curveTo(-1.5,-3.7,-2.5,-2.6).closePath();
	this.shape_6.setTransform(-61.425,0.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.beginFill("#000000").beginStroke().moveTo(-12.4,12.5).curveTo(-17.5,7.5,-17.5,0.1).curveTo(-17.5,-7.3,-12.3,-12.5).curveTo(-7.2,-17.5,0.3,-17.5).curveTo(7.6,-17.5,12.6,-12.5).curveTo(16,-9.1,17.4,-2.9).lineTo(6.8,-2.2).curveTo(5,-7.7,0,-7.7).curveTo(-3.1,-7.7,-5.2,-5.5).curveTo(-7.3,-3.3,-7.3,0.1).curveTo(-7.3,3.4,-5.2,5.5).curveTo(-3.2,7.6,-0.1,7.6).curveTo(3,7.7,4.9,5.7).curveTo(6.8,3.9,7.1,0.3).lineTo(17.5,0.7).curveTo(16.5,8.7,11.9,13.1).curveTo(7.3,17.5,0,17.5).curveTo(-7.4,17.5,-12.4,12.5).closePath();
	this.shape_7.setTransform(-94.225,-3.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.beginFill().beginStroke("#000000").setStrokeStyle(1,1,1).moveTo(122.1,-44.5).lineTo(127,-37.7).lineTo(48.2,70.7).lineTo(19,61.2).moveTo(-127,-16.7).lineTo(-127,-70.7);
	this.shape_8.setTransform(0.025,41.725);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.beginFill("#FFFFFF").beginStroke().moveTo(21,100.2).lineTo(21,29).lineTo(-125,29).lineTo(-125,-25).lineTo(19,-25).lineTo(19,-99.6).lineTo(46.2,-108.4).lineTo(125,0).lineTo(124.1,1.2).lineTo(46.2,108.5).closePath();
	this.shape_9.setTransform(-1.975,-4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.beginFill("#00CCFF").beginStroke().moveTo(21,100.2).lineTo(21,29).lineTo(-125,29).lineTo(-125,-25).lineTo(19,-25).lineTo(19,-99.6).lineTo(46.2,-108.4).lineTo(125,0).lineTo(124.1,1.2).lineTo(46.2,108.5).closePath();
	this.shape_10.setTransform(-1.975,-4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.beginFill("#666666").beginStroke().moveTo(21,100.2).lineTo(21,29).lineTo(-125,29).lineTo(-125,-25).lineTo(19,-25).lineTo(19,-99.6).lineTo(46.2,-108.4).lineTo(125,0).lineTo(124.1,1.2).lineTo(46.2,108.5).closePath();
	this.shape_11.setTransform(-1.975,-4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_10},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_11},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-128,-112.4,256.1,225.9);


(lib.buttonDrink = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill("#000000").beginStroke().moveTo(-4.2,15.4).curveTo(-5.8,13.8,-5.8,11.3).curveTo(-5.8,8.8,-4.1,7.1).curveTo(-2.4,5.4,-0,5.4).curveTo(2.3,5.4,4.1,7.1).curveTo(5.8,8.9,5.8,11.3).curveTo(5.8,13.7,4.1,15.3).curveTo(2.4,17,-0,17).curveTo(-2.6,17,-4.2,15.4).closePath().moveTo(-4.2,3.7).lineTo(-4.7,-17).lineTo(4.7,-17).lineTo(4.5,3.7).closePath();
	this.shape.setTransform(43.75,32.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.beginFill("#000000").beginStroke().moveTo(2.6,16.7).lineTo(-3.1,0.8).lineTo(1,-7.7).lineTo(10.5,-7.7).lineTo(6,1.2).lineTo(12.6,16.7).closePath().moveTo(-12.7,16.7).lineTo(-12.7,-16.7).lineTo(-3.5,-16.7).lineTo(-3.5,16.7).closePath();
	this.shape_1.setTransform(21.3,31.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.beginFill("#000000").beginStroke().moveTo(1.8,12.4).lineTo(1.8,-1.3).curveTo(1.7,-3.4,-0,-3.4).curveTo(-1.7,-3.4,-1.7,-1.3).lineTo(-1.7,12.4).lineTo(-10.8,12.4).lineTo(-10.8,-1.1).curveTo(-10.9,-5.9,-7.7,-9.2).curveTo(-4.6,-12.4,0.1,-12.4).curveTo(5.3,-12.4,8.4,-8.6).curveTo(10.9,-5.7,10.9,-0.4).lineTo(10.9,12.4).closePath();
	this.shape_2.setTransform(-7.55,36.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.beginFill("#000000").beginStroke().moveTo(-4.6,17.6).lineTo(-4.6,-6.7).lineTo(4.6,-6.7).lineTo(4.6,17.6).closePath().moveTo(-3.2,-10.1).curveTo(-4.5,-11.3,-4.5,-13.2).curveTo(-4.5,-15,-3.2,-16.3).curveTo(-1.8,-17.6,0,-17.6).curveTo(1.9,-17.6,3.2,-16.3).curveTo(4.6,-15,4.6,-13.2).curveTo(4.6,-11.3,3.3,-10.1).curveTo(2,-8.8,0,-8.8).curveTo(-2,-8.8,-3.2,-10.1).closePath();
	this.shape_3.setTransform(-28.325,30.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.beginFill("#000000").beginStroke().moveTo(-6.7,12.4).lineTo(-6.7,-0.9).curveTo(-6.7,-6.2,-3.8,-9.3).curveTo(-0.9,-12.4,3.9,-12.4).curveTo(5,-12.4,6.7,-12.2).lineTo(6.7,-2.4).curveTo(5.7,-2.9,5,-2.9).curveTo(2.5,-2.9,2.5,0.9).lineTo(2.5,12.4).closePath();
	this.shape_4.setTransform(-42.275,36.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.beginFill("#000000").beginStroke().moveTo(-9,13.3).curveTo(-12.8,9.6,-12.8,4.3).curveTo(-12.8,-0.9,-9,-4.6).curveTo(-5.3,-8.4,-0.3,-8.4).lineTo(2.2,-8.3).lineTo(2.2,1.8).curveTo(1.1,0.9,-0,0.9).curveTo(-1.4,0.9,-2.4,2).curveTo(-3.5,3,-3.5,4.5).curveTo(-3.5,5.9,-2.4,6.9).curveTo(-1.4,7.9,0.1,7.9).curveTo(3.6,7.9,3.6,3).lineTo(3.6,-16.9).lineTo(12.8,-16.9).lineTo(12.8,3.4).curveTo(12.7,9,9.8,12.5).curveTo(8.1,14.5,5.6,15.7).curveTo(2.9,16.9,0.2,16.9).curveTo(-5.3,16.9,-9,13.3).closePath();
	this.shape_5.setTransform(-66.5,32.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.beginFill("#000000").beginStroke().moveTo(-9,9.1).curveTo(-12.7,5.5,-12.7,0).curveTo(-12.7,-5.3,-9,-9).curveTo(-5.3,-12.7,-0,-12.7).curveTo(5.9,-12.7,9.3,-9.2).curveTo(12.7,-5.7,12.7,0.2).lineTo(12.7,12.2).lineTo(3.6,12.2).lineTo(3.6,0.9).curveTo(3.6,-1,2.6,-2.2).curveTo(1.7,-3.3,0.1,-3.3).curveTo(-1.3,-3.3,-2.4,-2.3).curveTo(-3.4,-1.2,-3.4,0.2).curveTo(-3.4,1.7,-2.5,2.7).curveTo(-1.5,3.7,-0.1,3.7).curveTo(1.1,3.7,2.2,3).lineTo(2.2,12.5).curveTo(1,12.7,0.1,12.7).curveTo(-5.4,12.7,-9,9.1).closePath();
	this.shape_6.setTransform(30.075,-22.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.beginFill("#000000").beginStroke().moveTo(5.6,16.8).curveTo(2.5,16.9,-0.2,15.5).curveTo(-2.9,14,-4.6,11.5).curveTo(-6.7,8.3,-6.7,3.1).lineTo(-6.7,-16.8).lineTo(2.5,-16.8).lineTo(2.5,-7.5).lineTo(6.5,-7.5).lineTo(6.5,2.2).lineTo(2.5,2.2).curveTo(2.4,5.1,3.4,6.1).curveTo(4.3,7.3,6.7,7.3).lineTo(6.7,16.8).lineTo(5.6,16.8).closePath();
	this.shape_7.setTransform(-4.8,-26.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.beginFill("#000000").beginStroke().moveTo(-9,9).curveTo(-12.7,5.4,-12.7,0).curveTo(-12.7,-5.3,-9,-9).curveTo(-5.2,-12.7,0.2,-12.7).curveTo(5.5,-12.7,9.1,-9.1).curveTo(12.7,-5.5,12.7,-0.2).lineTo(12.6,1.5).lineTo(-1.2,1.5).curveTo(-1.5,0.5,-1.6,-0.4).curveTo(-1.5,-1.6,-1.1,-2.8).lineTo(3.5,-2.8).curveTo(3,-5.5,0.5,-5.5).curveTo(-1.3,-5.5,-2.3,-4).curveTo(-3.4,-2.6,-3.4,-0.3).curveTo(-3.4,2,-2.3,3.5).curveTo(-1.4,5,0.4,5).curveTo(1.7,5,3,3.6).lineTo(8.2,9.8).curveTo(4.5,12.7,0.1,12.7).curveTo(-5.3,12.7,-9,9).closePath();
	this.shape_8.setTransform(-26.85,-22.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.beginFill("#000000").beginStroke().moveTo(-9.6,12.4).curveTo(-14.3,7.2,-14.3,-0.2).curveTo(-14.3,-7.6,-9.5,-12.5).curveTo(-4.7,-17.5,2.6,-17.5).curveTo(5,-17.5,8,-16.5).lineTo(8,-6.6).curveTo(5.7,-7.7,3.8,-7.7).curveTo(0.3,-7.7,-1.9,-5.5).curveTo(-4.2,-3.3,-4.2,0.1).curveTo(-4.2,3.7,-2.1,5.7).curveTo(-0,7.8,3.4,7.8).curveTo(5.7,7.8,5.7,6.5).curveTo(5.7,5.5,4.2,5.5).lineTo(1.8,5.5).lineTo(1.8,-2).lineTo(11.3,-2).curveTo(14.3,1.7,14.3,5.9).curveTo(14.3,10.8,10.8,14.2).curveTo(7.2,17.5,2,17.5).curveTo(-4.8,17.5,-9.6,12.4).closePath();
	this.shape_9.setTransform(-55.875,-26.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.beginFill().beginStroke("#000000").setStrokeStyle(1,1,1).moveTo(4.6,-16.5).lineTo(9.5,-9.7).lineTo(-9.5,16.5);
	this.shape_10.setTransform(117.525,13.725);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-75.7,72).lineTo(-75.7,-72).lineTo(75.7,-72).lineTo(75.7,72).closePath();
	this.shape_11.setTransform(-14.025,-1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.beginFill("#00FFFF").beginStroke().moveTo(-75.7,72).lineTo(-75.7,-72).lineTo(75.7,-72).lineTo(75.7,72).closePath();
	this.shape_12.setTransform(-14.025,-1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.beginFill("#666666").beginStroke().moveTo(-75.7,72).lineTo(-75.7,-72).lineTo(75.7,-72).lineTo(75.7,72).closePath();
	this.shape_13.setTransform(-14.025,-1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_12},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_13},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_11},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-110,-73,238.1,144);


(lib.buttonComputer = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill("#000000").beginStroke().moveTo(-3,11.1).curveTo(-4.2,9.9,-4.2,8.1).curveTo(-4.2,6.3,-3,5.1).curveTo(-1.7,3.9,-0,3.9).curveTo(1.7,3.9,2.9,5.1).curveTo(4.2,6.4,4.2,8.1).curveTo(4.2,9.8,2.9,11.1).curveTo(1.7,12.2,-0,12.2).curveTo(-1.8,12.2,-3,11.1).closePath().moveTo(-3,2.7).lineTo(-3.4,-12.2).lineTo(3.4,-12.2).lineTo(3.2,2.7).closePath();
	this.shape.setTransform(35.775,17.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.beginFill("#000000").beginStroke().moveTo(-9,9).curveTo(-12.6,5.4,-12.6,0.1).curveTo(-12.6,-5.3,-8.9,-8.9).curveTo(-5.2,-12.6,0.2,-12.6).curveTo(5.5,-12.6,9,-9).curveTo(11.5,-6.6,12.5,-2.1).lineTo(4.9,-1.6).curveTo(3.6,-5.6,0,-5.6).curveTo(-2.3,-5.6,-3.8,-4).curveTo(-5.2,-2.4,-5.2,0.1).curveTo(-5.2,2.5,-3.8,4).curveTo(-2.3,5.5,-0.1,5.5).curveTo(2.2,5.5,3.5,4.1).curveTo(4.9,2.8,5.1,0.3).lineTo(12.6,0.4).curveTo(11.8,6.3,8.6,9.4).curveTo(5.3,12.6,0,12.6).curveTo(-5.4,12.6,-9,9).closePath();
	this.shape_1.setTransform(14.475,17.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.beginFill("#000000").beginStroke().moveTo(-8.9,12.3).lineTo(-8.9,-2.7).curveTo(-8.9,-4.9,-8.4,-6.5).curveTo(-7.9,-8,-6.9,-9.2).curveTo(-5.5,-10.7,-3.7,-11.5).curveTo(-1.8,-12.3,0.2,-12.3).curveTo(3.9,-12.3,6.4,-9.9).curveTo(8.9,-7.4,8.9,-3.7).curveTo(8.9,-0.2,6.6,2).curveTo(4.6,4,0.5,4).lineTo(-0.6,4).lineTo(-0.6,-2.3).curveTo(1.6,-2.3,1.6,-3.9).curveTo(1.6,-5.4,-0.1,-5.5).curveTo(-1.8,-5.5,-1.8,-3.4).lineTo(-1.8,12.3).closePath();
	this.shape_2.setTransform(-8.5,16.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.beginFill("#000000").beginStroke().moveTo(-6.5,6.5).curveTo(-9.1,3.9,-9.1,0).curveTo(-9.1,-3.8,-6.4,-6.5).curveTo(-3.8,-9.1,0.1,-9.1).curveTo(4,-9.1,6.6,-6.5).curveTo(9.1,-4,9.1,-0.2).lineTo(9.1,1.1).lineTo(-0.9,1.1).curveTo(-1.1,0.3,-1.1,-0.3).curveTo(-1.1,-1.2,-0.8,-2).lineTo(2.5,-2).curveTo(2.2,-4,0.3,-4).curveTo(-0.9,-4,-1.7,-2.9).curveTo(-2.4,-1.9,-2.4,-0.3).curveTo(-2.4,1.4,-1.7,2.5).curveTo(-1,3.6,0.3,3.6).curveTo(1.2,3.6,2.2,2.6).lineTo(5.9,7.1).curveTo(3.3,9.1,0.1,9.1).curveTo(-3.8,9.1,-6.5,6.5).closePath();
	this.shape_3.setTransform(-38.175,20.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.beginFill("#000000").beginStroke().moveTo(1.1,12).lineTo(1.1,2.8).curveTo(1.1,1.6,0.9,1.2).curveTo(0.7,0.8,-0,0.8).curveTo(-1.1,0.8,-1.1,2.4).lineTo(-1.1,12).lineTo(-7.7,12).lineTo(-7.7,-12).lineTo(-1.1,-12).lineTo(-1.1,-4.7).curveTo(0.5,-5.9,2.2,-5.9).curveTo(4.7,-5.9,6.2,-4).curveTo(7.7,-2.2,7.7,0.9).lineTo(7.7,12).closePath();
	this.shape_4.setTransform(-57.875,17.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.beginFill("#000000").beginStroke().moveTo(4.1,12.1).curveTo(1.8,12.1,-0.1,11.1).curveTo(-2.1,10.1,-3.3,8.3).curveTo(-4.8,6,-4.8,2.3).lineTo(-4.8,-12.1).lineTo(1.7,-12.1).lineTo(1.7,-5.4).lineTo(4.7,-5.4).lineTo(4.7,1.5).lineTo(1.7,1.5).curveTo(1.7,3.6,2.4,4.4).curveTo(3.1,5.2,4.8,5.2).lineTo(4.8,12.1).lineTo(4.1,12.1).closePath();
	this.shape_5.setTransform(-73.525,17.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.beginFill("#000000").beginStroke().moveTo(-6.5,6.5).curveTo(-9.1,3.9,-9.1,0).curveTo(-9.1,-3.8,-6.4,-6.5).curveTo(-3.8,-9.1,0.1,-9.1).curveTo(4,-9.1,6.6,-6.5).curveTo(9.1,-4,9.1,-0.2).lineTo(9.1,1.1).lineTo(-0.9,1.1).curveTo(-1.1,0.3,-1.1,-0.3).curveTo(-1.1,-1.2,-0.8,-2).lineTo(2.5,-2).curveTo(2.2,-4,0.3,-4).curveTo(-0.9,-4,-1.7,-2.9).curveTo(-2.4,-1.9,-2.4,-0.3).curveTo(-2.4,1.4,-1.7,2.5).curveTo(-1,3.6,0.3,3.6).curveTo(1.2,3.6,2.2,2.6).lineTo(5.9,7.1).curveTo(3.3,9.1,0.1,9.1).curveTo(-3.8,9.1,-6.5,6.5).closePath();
	this.shape_6.setTransform(-0.725,-22.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.beginFill("#000000").beginStroke().moveTo(-6.3,8.9).lineTo(-6.3,1.9).lineTo(-6,1.9).curveTo(-4.4,1.9,-3.8,1.3).curveTo(-3.1,0.6,-3,-1).curveTo(-2.8,-3.7,-2.5,-4.8).curveTo(-2.1,-5.9,-1,-7).curveTo(0.9,-8.9,4.3,-8.9).lineTo(6.3,-8.9).lineTo(6.3,-1.9).curveTo(4.9,-1.9,4.4,-1.4).curveTo(3.9,-0.9,3.8,0.6).curveTo(3.3,5.7,-0.2,7.8).curveTo(-2,8.9,-5.4,8.9).closePath();
	this.shape_7.setTransform(-17.375,-22.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.beginFill("#000000").beginStroke().moveTo(-6.5,9.9).curveTo(-8.7,7.5,-8.7,3).lineTo(-8.7,-12.3).lineTo(-1.5,-12.3).lineTo(-1.5,3).curveTo(-1.5,5.2,0,5.2).curveTo(1.6,5.2,1.6,3).lineTo(1.6,-12.3).lineTo(8.7,-12.3).lineTo(8.7,3.2).curveTo(8.7,7.4,6.2,9.9).curveTo(3.8,12.3,-0.3,12.3).curveTo(-4.4,12.3,-6.5,9.9).closePath();
	this.shape_8.setTransform(-34.575,-25.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-62,59).lineTo(-62,-59).lineTo(62.1,-59).lineTo(62.1,59).closePath();
	this.shape_9.setTransform(-19.05,-3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.beginFill("#00FFFF").beginStroke().moveTo(-62,59).lineTo(-62,-59).lineTo(62.1,-59).lineTo(62.1,59).closePath();
	this.shape_10.setTransform(-19.05,-3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.beginFill("#666666").beginStroke().moveTo(-62,59).lineTo(-62,-59).lineTo(62.1,-59).lineTo(62.1,59).closePath();
	this.shape_11.setTransform(-19.05,-3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_10},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_11},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-62,136,118);


(lib.Tween19 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// talk_animation
	this.instance = new lib.Tween26("synched",0);

	this.instance_1 = new lib.Tween27("synched",0);
	this.instance_1.setTransform(0.4,0.65,1,1.4937);
	this.instance_1._off = true;

	this.instance_2 = new lib.mouth();
	this.instance_2.setTransform(-4.25,-1.3,0.1888,0.1888);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},4).to({state:[{t:this.instance_2}]},5).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,scaleY:1.4937,x:0.4,y:0.65},4).wait(6));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},4).to({_off:true,scaleX:0.1888,scaleY:0.1888,x:-4.25,y:-1.3},5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.4,-5.2,9.600000000000001,11.9);


(lib.raindrop = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// raindrop
	this.instance = new lib.Tween3("synched",0);
	this.instance.setTransform(34.95,-272);

	this.instance_1 = new lib.Tween4("synched",0);
	this.instance_1.setTransform(18.3,-149.55);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween5("synched",0);
	this.instance_2.setTransform(2.3,-25.25);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween6("synched",0);
	this.instance_3.setTransform(-12.4,85.6);
	this.instance_3._off = true;

	this.instance_4 = new lib.Tween7("synched",0);
	this.instance_4.setTransform(-23.95,179.15);
	this.instance_4._off = true;

	this.instance_5 = new lib.Tween8("synched",0);
	this.instance_5.setTransform(-34.85,272.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},2).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.instance_4}]},2).to({state:[{t:this.instance_5}]},2).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:18.3,y:-149.55},2).wait(9));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},2).to({_off:true,x:2.3,y:-25.25},2).wait(7));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2).to({_off:false},2).to({_off:true,x:-12.4,y:85.6},2).wait(5));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(4).to({_off:false},2).to({_off:true,x:-23.95,y:179.15},2).wait(3));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(6).to({_off:false},2).to({_off:true,x:-34.85,y:272.05},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-40,-306.9,80.1,613.9);


(lib.cuppsd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// cup_psd
	this.instance = new lib.Layer1_2();
	this.instance.setTransform(33,45.5,1,1,0,0,0,33,45.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,66,91);


// stage content:
(lib.animate30 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {introButtonStart:1,introButtonEnd:13,drinkIdle:404,drinkIdleEnd:424,finalIdle:777,finalIdleEnd:813,idleStart:199,idleEnd:253,nextAnimation:260,drinkAnimation:425,storm_sound:14};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,13,14,134,140,199,253,260,359,404,424,425,599,759,777,813];
	this.streamSoundSymbolsList[14] = [{id:"stormrain263044",startFrame:14,endFrame:260,loop:1,offset:0}];
	this.streamSoundSymbolsList[140] = [{id:"soundeffectblahblahblah239796wav",startFrame:140,endFrame:143,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_13 = function() {
		var _this = this;
		
		_this.gotoAndPlay('introButtonStart');
		
		this.playButton.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(15);
		}
	}
	this.frame_14 = function() {
		var soundInstance = playSound("stormrain263044",0);
		this.InsertIntoSoundStreamData(soundInstance,14,260,1);
	}
	this.frame_134 = function() {
		playSound("jazzsaxophoneloopwav",-1);
	}
	this.frame_140 = function() {
		var soundInstance = playSound("soundeffectblahblahblah239796wav",0);
		this.InsertIntoSoundStreamData(soundInstance,140,143,1);
	}
	this.frame_199 = function() {
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.nxtBtn.on('click', function(){
		/*
		Moves the playhead to the specified frame label in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay('nextAnimation');
		});
	}
	this.frame_253 = function() {
		var _this = this;
		/*
		Moves the playhead to the specified frame label in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay('idleStart');
	}
	this.frame_260 = function() {
		playSound("vibraphonechord42410wav");
	}
	this.frame_359 = function() {
		playSound("soundeffectblahblahblah239796wav");
	}
	this.frame_404 = function() {
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.drinkButton.on('click', function(){
		/*
		Moves the playhead to the specified frame label in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay('drinkAnimation');
		});
	}
	this.frame_424 = function() {
		var _this = this;
		/*
		Moves the playhead to the specified frame label in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay('drinkIdle');
	}
	this.frame_425 = function() {
		playSound("vibraphonechord42410wav");
	}
	this.frame_599 = function() {
		playSound("soundeffectblahblahblah239796wav");
	}
	this.frame_759 = function() {
		playSound("soundeffectblahblahblah239796wav");
	}
	this.frame_777 = function() {
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.pcBtn.on('click', function () {
			/*
		Loads the URL in a new browser window.
		*/
			window.open('http://www.google.com', '_blank');
		});
	}
	this.frame_813 = function() {
		var _this = this;
		/*
		Moves the playhead to the specified frame label in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay('finalIdle');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(13).call(this.frame_13).wait(1).call(this.frame_14).wait(120).call(this.frame_134).wait(6).call(this.frame_140).wait(59).call(this.frame_199).wait(54).call(this.frame_253).wait(7).call(this.frame_260).wait(99).call(this.frame_359).wait(45).call(this.frame_404).wait(20).call(this.frame_424).wait(1).call(this.frame_425).wait(174).call(this.frame_599).wait(160).call(this.frame_759).wait(18).call(this.frame_777).wait(36).call(this.frame_813).wait(27));

	// nextButton
	this.nxtBtn = new lib.buttonNext();
	this.nxtBtn.name = "nxtBtn";
	this.nxtBtn.setTransform(547.4,255.5,0.5931,0.5931,0,0,0,0.1,0.1);
	this.nxtBtn._off = true;
	new cjs.ButtonHelper(this.nxtBtn, 0, 1, 2, false, new lib.buttonNext(), 3);

	this.drinkButton = new lib.buttonDrink();
	this.drinkButton.name = "drinkButton";
	this.drinkButton.setTransform(612.45,291.7,0.3758,0.3758);
	this.drinkButton._off = true;
	new cjs.ButtonHelper(this.drinkButton, 0, 1, 2, false, new lib.buttonDrink(), 3);

	this.pcBtn = new lib.buttonComputer();
	this.pcBtn.name = "pcBtn";
	this.pcBtn.setTransform(106,288.65,0.439,0.439);
	this.pcBtn._off = true;
	new cjs.ButtonHelper(this.pcBtn, 0, 1, 2, false, new lib.buttonComputer(), 3);

	this.timeline.addTween(cjs.Tween.get(this.nxtBtn).wait(199).to({_off:false},0).to({regX:0.2,regY:0.2,scaleX:0.4998,scaleY:0.5003,rotation:3.7314,x:547.45,y:255.55},30).to({scaleX:0.5672,scaleY:0.5619,rotation:-5.4762},23).to({_off:true},1).wait(587));
	this.timeline.addTween(cjs.Tween.get(this.drinkButton).wait(404).to({_off:false},0).to({scaleX:0.2358,scaleY:0.2781,rotation:7.194,x:616.6,y:290.45},5).to({scaleX:0.295,scaleY:0.3042,rotation:-12.2286,x:613.25,y:292.15},5).to({scaleX:0.3277,scaleY:0.3447,rotation:6.6931,x:612.85,y:291.35},5).to({scaleX:0.3758,scaleY:0.3758,rotation:0,x:612.45,y:291.7},5).to({_off:true},1).wait(415));
	this.timeline.addTween(cjs.Tween.get(this.pcBtn).wait(777).to({_off:false},0).to({regX:0.4,regY:0.1,scaleX:0.3264,scaleY:0.3264,rotation:11.4418,x:106.15,y:288.75},7).to({regX:0.1,regY:0.2,scaleX:0.3901,scaleY:0.3212,rotation:-21.6897,x:106.05,y:288.7},10).to({regY:0.1,scaleX:0.3661,scaleY:0.2819,rotation:13.955},10).to({regX:0.2,regY:0.2,scaleX:0.3812,scaleY:0.3711,rotation:0.959,x:106.1,y:288.65},9).to({_off:true},1).wait(26));

	// office_start_text
	this.text = new cjs.Text("", "24px 'Rockwell'", "#CCCCCC");
	this.text.lineHeight = 30;
	this.text.lineWidth = 295;
	this.text.parent = this;
	this.text.setTransform(9.3,66.95);

	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill("#CCCCCC").beginStroke().moveTo(2.2,8.1).lineTo(2.2,6.1).lineTo(4.2,6.1).lineTo(3,2.4).lineTo(-2.9,2.4).lineTo(-4.1,6.1).lineTo(-2.1,6.1).lineTo(-2.1,8.1).lineTo(-8.6,8.1).lineTo(-8.6,6.1).lineTo(-6.6,6.1).lineTo(-2.1,-6.3).lineTo(-4.1,-6.3).lineTo(-4.1,-8.2).lineTo(4.2,-8.2).lineTo(4.2,-6.3).lineTo(2.2,-6.3).lineTo(6.7,6.1).lineTo(8.6,6.1).lineTo(8.6,8.1).closePath().moveTo(-2.3,0.5).lineTo(2.4,0.5).lineTo(0.2,-6.3).lineTo(-0,-6.3).closePath();
	this.shape.setTransform(17.675,81.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.beginFill("#CCCCCC").beginStroke().moveTo(2.4,5.7).lineTo(2.4,-1.6).curveTo(2.4,-3,2,-3.4).curveTo(1.6,-3.7,1,-3.7).curveTo(-0.4,-3.7,-2.3,-2.3).lineTo(-2.3,3.8).lineTo(-0.4,3.8).lineTo(-0.4,5.7).lineTo(-6.5,5.7).lineTo(-6.5,3.8).lineTo(-4.5,3.8).lineTo(-4.5,-3.6).lineTo(-6.5,-3.6).lineTo(-6.5,-5.6).lineTo(-2.3,-5.6).lineTo(-2.3,-4.2).curveTo(-0.2,-5.8,1.6,-5.8).curveTo(2.7,-5.7,3.4,-5.2).curveTo(4.1,-4.7,4.4,-4).curveTo(4.6,-3.2,4.6,-1.7).lineTo(4.6,3.8).lineTo(6.5,3.8).lineTo(6.5,5.7).closePath();
	this.shape_1.setTransform(33.225,83.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.beginFill("#CCCCCC").beginStroke().moveTo(2.4,8.1).lineTo(2.4,1.2).lineTo(2.3,-0.5).curveTo(2.2,-1,1.9,-1.2).curveTo(1.5,-1.5,1,-1.5).curveTo(-0.3,-1.5,-2.3,-0.1).lineTo(-2.3,6.2).lineTo(-0.3,6.2).lineTo(-0.3,8.1).lineTo(-6.6,8.1).lineTo(-6.6,6.2).lineTo(-4.5,6.2).lineTo(-4.5,-6.2).lineTo(-6.6,-6.2).lineTo(-6.6,-8.2).lineTo(-2.3,-8.2).lineTo(-2.3,-1.9).curveTo(-0.3,-3.5,1.5,-3.5).curveTo(2.6,-3.5,3.4,-3).curveTo(4.1,-2.6,4.4,-1.8).curveTo(4.7,-1.1,4.7,0.5).lineTo(4.7,6.2).lineTo(6.6,6.2).lineTo(6.6,8.1).closePath();
	this.shape_2.setTransform(67.85,81.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-0.5,7.2).curveTo(-1.1,6.8,-1.3,6.1).curveTo(-1.5,5.4,-1.5,3.7).lineTo(-1.5,-1.9).lineTo(-2.9,-1.9).lineTo(-2.9,-3.9).lineTo(-1.5,-3.9).lineTo(-1.5,-5.6).lineTo(0.8,-7.7).lineTo(0.8,-3.9).lineTo(2.9,-3.9).lineTo(2.9,-1.9).lineTo(0.8,-1.9).lineTo(0.8,3.6).curveTo(0.8,4.9,0.9,5.3).curveTo(1,5.6,1.7,5.6).curveTo(2.3,5.6,2.9,5.3).lineTo(2.9,7.4).curveTo(2,7.7,1.1,7.7).curveTo(0.2,7.7,-0.5,7.2).closePath();
	this.shape_3.setTransform(57.2,82.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-4.2,4.3).curveTo(-6,2.6,-6,-0).curveTo(-6,-2.7,-4.2,-4.3).curveTo(-2.5,-6,0,-6).curveTo(2.5,-6,4.2,-4.3).curveTo(6,-2.7,6,-0).curveTo(6,2.6,4.2,4.3).curveTo(2.5,6,0,6).curveTo(-2.5,6,-4.2,4.3).closePath().moveTo(-2.6,-2.7).curveTo(-3.6,-1.6,-3.6,-0).curveTo(-3.6,1.7,-2.6,2.7).curveTo(-1.5,3.8,0,3.8).curveTo(1.5,3.8,2.6,2.7).curveTo(3.6,1.7,3.6,-0).curveTo(3.6,-1.7,2.6,-2.8).curveTo(1.5,-3.9,0,-3.8).curveTo(-1.6,-3.8,-2.6,-2.7).closePath();
	this.shape_4.setTransform(46.675,84);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-4.6,5.7).lineTo(-4.6,3.8).lineTo(-2.3,3.8).lineTo(-2.3,-3.6).lineTo(-4.6,-3.6).lineTo(-4.6,-5.6).lineTo(-0.5,-5.6).lineTo(-0.5,-3.1).curveTo(-0.2,-4,0.6,-4.7).curveTo(1.2,-5.3,1.9,-5.5).curveTo(2.7,-5.8,4,-5.8).lineTo(4.5,-5.8).lineTo(4.5,-3.5).lineTo(4.1,-3.5).curveTo(2.4,-3.5,1.6,-3.2).curveTo(0.7,-2.9,0.4,-1.9).curveTo(-0.1,-1.1,-0.1,1.2).lineTo(-0.1,3.8).lineTo(2.4,3.8).lineTo(2.4,5.7).closePath();
	this.shape_5.setTransform(93.4,83.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-4.2,4.4).curveTo(-6,2.7,-6,-0).curveTo(-6,-2.7,-4.2,-4.3).curveTo(-2.4,-6,-0,-6).curveTo(2.3,-6,4.1,-4.3).curveTo(5.9,-2.7,6,0.5).lineTo(-3.5,0.5).curveTo(-3.3,2.1,-2.3,3.1).curveTo(-1.2,4,0.3,4).curveTo(2.7,4,4,2.2).lineTo(6,3).curveTo(5,4.5,3.5,5.3).curveTo(2,6,0.3,6).curveTo(-2.3,6,-4.2,4.4).closePath().moveTo(-2.3,-3.4).curveTo(-3.3,-2.4,-3.5,-1.1).lineTo(3.7,-1.1).curveTo(3.5,-2.3,2.5,-3.3).curveTo(1.5,-4.2,-0,-4.2).curveTo(-1.3,-4.2,-2.3,-3.4).closePath();
	this.shape_6.setTransform(81.4,84);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-5.3,6.8).curveTo(-6.9,5.2,-6.9,2.5).curveTo(-6.9,-0.4,-5.2,-2).curveTo(-3.5,-3.6,-1.3,-3.6).curveTo(0.9,-3.6,2.7,-1.8).lineTo(2.7,-6.3).lineTo(0.5,-6.3).lineTo(0.5,-8.3).lineTo(4.9,-8.3).lineTo(4.9,6.1).lineTo(7,6.1).lineTo(7,8).lineTo(2.7,8).lineTo(2.7,6.4).curveTo(1,8.2,-1.4,8.2).curveTo(-3.6,8.2,-5.3,6.8).closePath().moveTo(-3.6,-0.4).curveTo(-4.5,0.7,-4.6,2.4).curveTo(-4.6,4.2,-3.5,5.2).curveTo(-2.4,6.3,-1,6.2).curveTo(0.4,6.2,1.5,5.2).curveTo(2.7,4.2,2.7,2.3).curveTo(2.7,0.3,1.5,-0.6).curveTo(0.4,-1.6,-1,-1.6).curveTo(-2.5,-1.6,-3.6,-0.4).closePath();
	this.shape_7.setTransform(112.3,81.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-4.5,4.9).curveTo(-5.7,3.9,-5.7,2.3).curveTo(-5.7,0.7,-4.5,-0.3).curveTo(-3.2,-1.3,-1.5,-1.3).curveTo(0.1,-1.3,1.5,-0.4).lineTo(1.5,-1.5).curveTo(1.5,-2.4,1.4,-2.8).curveTo(1.2,-3.3,0.6,-3.7).curveTo(0,-4.1,-1,-4.1).curveTo(-2.6,-4.1,-3.4,-2.7).lineTo(-5.5,-3.3).curveTo(-4.1,-5.9,-0.6,-5.9).curveTo(0.7,-5.9,1.6,-5.6).curveTo(2.5,-5.2,3,-4.7).curveTo(3.4,-4.2,3.6,-3.5).curveTo(3.7,-2.9,3.7,-1.5).lineTo(3.7,3.7).lineTo(5.7,3.7).lineTo(5.7,5.7).lineTo(1.8,5.7).lineTo(1.8,4.3).curveTo(0.2,5.9,-1.8,5.9).curveTo(-3.4,5.9,-4.5,4.9).closePath().moveTo(-2.9,0.9).curveTo(-3.5,1.5,-3.5,2.3).curveTo(-3.5,3.1,-3,3.7).curveTo(-2.5,4.2,-1.5,4.2).curveTo(0.1,4.2,1.5,2.8).lineTo(1.5,1.5).curveTo(0.1,0.4,-1.4,0.4).curveTo(-2.3,0.4,-2.9,0.9).closePath();
	this.shape_8.setTransform(126.075,83.925);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-2.9,8.3).lineTo(-2.9,6.3).lineTo(-1.1,6.3).lineTo(-1.1,-1.1).lineTo(-2.9,-1.1).lineTo(-2.9,-3.1).lineTo(1.1,-3.1).lineTo(1.1,6.3).lineTo(2.9,6.3).lineTo(2.9,8.3).closePath().moveTo(-1,-6).curveTo(-1.4,-6.4,-1.4,-6.9).curveTo(-1.4,-7.5,-1.1,-7.9).curveTo(-0.7,-8.3,-0.1,-8.3).curveTo(0.5,-8.3,0.8,-7.9).curveTo(1.2,-7.5,1.2,-6.9).curveTo(1.2,-6.4,0.8,-6).curveTo(0.5,-5.6,-0.1,-5.6).curveTo(-0.7,-5.6,-1,-6).closePath();
	this.shape_9.setTransform(155.225,81.375);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-4.5,8.2).lineTo(-4.5,6.3).lineTo(-2.3,6.3).lineTo(-0.9,2.9).lineTo(-4.6,-6.2).lineTo(-6.6,-6.2).lineTo(-6.6,-8.2).lineTo(-0.9,-8.2).lineTo(-0.9,-6.2).lineTo(-2.3,-6.2).lineTo(0.2,0).lineTo(2.6,-6.2).lineTo(1.1,-6.2).lineTo(1.1,-8.2).lineTo(6.5,-8.2).lineTo(6.5,-6.2).lineTo(4.8,-6.2).lineTo(-0.7,8.2).closePath();
	this.shape_10.setTransform(138.8,86.525);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-0.5,7.2).curveTo(-1.1,6.8,-1.3,6.1).curveTo(-1.4,5.4,-1.4,3.7).lineTo(-1.4,-1.9).lineTo(-2.9,-1.9).lineTo(-2.9,-3.9).lineTo(-1.4,-3.9).lineTo(-1.4,-5.6).lineTo(0.8,-7.7).lineTo(0.8,-3.9).lineTo(2.9,-3.9).lineTo(2.9,-1.9).lineTo(0.8,-1.9).lineTo(0.8,3.6).curveTo(0.8,4.9,0.9,5.3).curveTo(1.1,5.6,1.6,5.6).curveTo(2.3,5.6,2.9,5.3).lineTo(2.9,7.4).curveTo(2,7.7,1.1,7.7).curveTo(0.2,7.7,-0.5,7.2).closePath();
	this.shape_11.setTransform(181.95,82.175);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.beginFill("#CCCCCC").beginStroke().moveTo(2.4,5.7).lineTo(2.4,-1.6).curveTo(2.4,-3,2,-3.4).curveTo(1.6,-3.7,1,-3.7).curveTo(-0.4,-3.7,-2.3,-2.3).lineTo(-2.3,3.8).lineTo(-0.4,3.8).lineTo(-0.4,5.7).lineTo(-6.5,5.7).lineTo(-6.5,3.8).lineTo(-4.5,3.8).lineTo(-4.5,-3.6).lineTo(-6.5,-3.6).lineTo(-6.5,-5.6).lineTo(-2.3,-5.6).lineTo(-2.3,-4.2).curveTo(-0.2,-5.8,1.6,-5.8).curveTo(2.7,-5.7,3.4,-5.2).curveTo(4.1,-4.7,4.4,-4).curveTo(4.6,-3.2,4.6,-1.7).lineTo(4.6,3.8).lineTo(6.5,3.8).lineTo(6.5,5.7).closePath();
	this.shape_12.setTransform(33.225,83.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-4.2,4.4).curveTo(-6,2.7,-6,-0).curveTo(-6,-2.7,-4.2,-4.3).curveTo(-2.4,-6,-0.1,-6).curveTo(2.3,-6,4.1,-4.3).curveTo(5.9,-2.7,6,0.5).lineTo(-3.5,0.5).curveTo(-3.3,2.1,-2.3,3.1).curveTo(-1.2,4,0.3,4).curveTo(2.7,4,4.1,2.2).lineTo(6,3).curveTo(5.1,4.5,3.5,5.3).curveTo(2,6,0.3,6).curveTo(-2.3,6,-4.2,4.4).closePath().moveTo(-2.3,-3.4).curveTo(-3.3,-2.4,-3.5,-1.1).lineTo(3.7,-1.1).curveTo(3.5,-2.3,2.5,-3.3).curveTo(1.5,-4.2,0,-4.2).curveTo(-1.3,-4.2,-2.3,-3.4).closePath();
	this.shape_13.setTransform(206.15,84);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.beginFill("#CCCCCC").beginStroke().moveTo(2.4,8.1).lineTo(2.4,1.2).lineTo(2.3,-0.5).curveTo(2.2,-1,1.9,-1.2).curveTo(1.5,-1.5,1,-1.5).curveTo(-0.3,-1.5,-2.3,-0.1).lineTo(-2.3,6.2).lineTo(-0.3,6.2).lineTo(-0.3,8.1).lineTo(-6.6,8.1).lineTo(-6.6,6.2).lineTo(-4.5,6.2).lineTo(-4.5,-6.2).lineTo(-6.6,-6.2).lineTo(-6.6,-8.2).lineTo(-2.3,-8.2).lineTo(-2.3,-1.9).curveTo(-0.3,-3.5,1.5,-3.5).curveTo(2.6,-3.5,3.4,-3).curveTo(4.1,-2.6,4.4,-1.8).curveTo(4.7,-1.1,4.7,0.5).lineTo(4.7,6.2).lineTo(6.6,6.2).lineTo(6.6,8.1).closePath();
	this.shape_14.setTransform(67.85,81.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-3.8,8.3).lineTo(-3.8,6.3).lineTo(-2.2,6.3).lineTo(-2.2,-1).lineTo(-3.8,-1).lineTo(-3.8,-3).lineTo(-2.2,-3).lineTo(-2.2,-4.7).curveTo(-2.2,-6.7,-1.2,-7.5).curveTo(-0.4,-8.3,0.8,-8.3).curveTo(3.4,-8.3,3.8,-5.7).lineTo(1.8,-5.4).curveTo(1.7,-6.5,0.9,-6.5).curveTo(0.5,-6.5,0.3,-6.1).curveTo(0.1,-5.8,0.1,-4.7).lineTo(0.1,-3).lineTo(2.1,-3).lineTo(2.1,-1).lineTo(0.1,-1).lineTo(0.1,6.3).lineTo(2.3,6.3).lineTo(2.3,8.3).closePath();
	this.shape_15.setTransform(244.25,81.325);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-3.8,8.3).lineTo(-3.8,6.3).lineTo(-2.2,6.3).lineTo(-2.2,-1).lineTo(-3.8,-1).lineTo(-3.8,-3).lineTo(-2.2,-3).lineTo(-2.2,-4.7).curveTo(-2.1,-6.7,-1.3,-7.5).curveTo(-0.4,-8.3,0.8,-8.3).curveTo(3.4,-8.3,3.8,-5.7).lineTo(1.8,-5.4).curveTo(1.7,-6.5,1,-6.5).curveTo(0.4,-6.5,0.3,-6.1).curveTo(0.1,-5.8,0.1,-4.7).lineTo(0.1,-3).lineTo(2.1,-3).lineTo(2.1,-1).lineTo(0.1,-1).lineTo(0.1,6.3).lineTo(2.2,6.3).lineTo(2.2,8.3).closePath();
	this.shape_16.setTransform(237.25,81.325);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-4.2,4.3).curveTo(-6,2.6,-6,-0).curveTo(-6,-2.7,-4.2,-4.3).curveTo(-2.5,-6,0,-6).curveTo(2.5,-6,4.2,-4.3).curveTo(6,-2.7,6,-0).curveTo(6,2.6,4.2,4.3).curveTo(2.5,6,0,6).curveTo(-2.5,6,-4.2,4.3).closePath().moveTo(-2.6,-2.7).curveTo(-3.6,-1.6,-3.6,-0).curveTo(-3.6,1.7,-2.6,2.7).curveTo(-1.5,3.8,0,3.8).curveTo(1.5,3.8,2.6,2.7).curveTo(3.6,1.7,3.6,-0).curveTo(3.6,-1.7,2.6,-2.8).curveTo(1.5,-3.9,0,-3.8).curveTo(-1.6,-3.8,-2.6,-2.7).closePath();
	this.shape_17.setTransform(46.675,84);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-4,4.1).curveTo(-5.5,2.3,-5.6,-0.1).curveTo(-5.6,-2.7,-3.9,-4.3).curveTo(-2.2,-6,-0,-6).curveTo(1.9,-6,3.2,-4.9).lineTo(3.2,-5.7).lineTo(5.2,-5.7).lineTo(5.2,-1.4).lineTo(3.2,-1.4).curveTo(3,-2.7,2.2,-3.3).curveTo(1.4,-4,0.3,-4).curveTo(-1.3,-4,-2.2,-2.9).curveTo(-3.2,-1.8,-3.2,-0.1).curveTo(-3.2,1.5,-2.3,2.8).curveTo(-1.3,4,0.3,3.9).curveTo(2.7,4,3.8,1.7).lineTo(5.6,2.6).curveTo(4.1,6,0.3,6).curveTo(-2.4,6,-4,4.1).closePath();
	this.shape_18.setTransform(260.2,84);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-2.9,8.3).lineTo(-2.9,6.3).lineTo(-1.1,6.3).lineTo(-1.1,-1.1).lineTo(-2.9,-1.1).lineTo(-2.9,-3.1).lineTo(1.1,-3.1).lineTo(1.1,6.3).lineTo(2.9,6.3).lineTo(2.9,8.3).closePath().moveTo(-1,-6).curveTo(-1.4,-6.4,-1.4,-6.9).curveTo(-1.4,-7.5,-1.1,-7.9).curveTo(-0.7,-8.3,-0.1,-8.3).curveTo(0.5,-8.3,0.8,-7.9).curveTo(1.2,-7.5,1.2,-6.9).curveTo(1.2,-6.4,0.8,-6).curveTo(0.5,-5.6,-0.1,-5.6).curveTo(-0.7,-5.6,-1,-6).closePath();
	this.shape_19.setTransform(155.225,81.375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-4.2,4.4).curveTo(-6,2.7,-6,-0).curveTo(-6,-2.7,-4.2,-4.3).curveTo(-2.4,-6,-0,-6).curveTo(2.3,-6,4.1,-4.3).curveTo(5.9,-2.7,6,0.5).lineTo(-3.5,0.5).curveTo(-3.3,2.1,-2.3,3.1).curveTo(-1.2,4,0.3,4).curveTo(2.7,4,4,2.2).lineTo(6,3).curveTo(5,4.5,3.5,5.3).curveTo(2,6,0.3,6).curveTo(-2.3,6,-4.2,4.4).closePath().moveTo(-2.3,-3.4).curveTo(-3.3,-2.4,-3.5,-1.1).lineTo(3.7,-1.1).curveTo(3.5,-2.3,2.5,-3.3).curveTo(1.5,-4.2,-0,-4.2).curveTo(-1.3,-4.2,-2.3,-3.4).closePath();
	this.shape_20.setTransform(81.4,84);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-1.5,1.4).lineTo(-1.5,-1.4).lineTo(1.5,-1.4).lineTo(1.5,1.4).closePath();
	this.shape_21.setTransform(297.5,88.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-1.4,1.4).lineTo(-1.4,-1.4).lineTo(1.5,-1.4).lineTo(1.5,1.4).closePath();
	this.shape_22.setTransform(290.5,88.2);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-1.4,1.4).lineTo(-1.4,-1.4).lineTo(1.4,-1.4).lineTo(1.4,1.4).closePath();
	this.shape_23.setTransform(283.5,88.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-3.7,10.2).lineTo(-3.7,7.6).lineTo(-1.5,7.6).lineTo(-1.5,-7.7).lineTo(-3.7,-7.7).lineTo(-3.7,-10.2).lineTo(3.7,-10.2).lineTo(3.7,-7.7).lineTo(1.6,-7.7).lineTo(1.6,7.6).lineTo(3.7,7.6).lineTo(3.7,10.2).closePath();
	this.shape_24.setTransform(305.925,119.7);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-5,5.2).curveTo(-6.9,2.9,-6.9,-0.1).curveTo(-7,-3.3,-4.9,-5.4).curveTo(-2.7,-7.5,0,-7.5).curveTo(2.4,-7.5,4,-6.1).lineTo(4,-7.1).lineTo(6.5,-7.1).lineTo(6.5,-1.7).lineTo(4,-1.7).curveTo(3.8,-3.3,2.7,-4.1).curveTo(1.7,-4.9,0.3,-4.9).curveTo(-1.6,-4.9,-2.8,-3.6).curveTo(-4,-2.2,-4,-0.1).curveTo(-4,1.9,-2.8,3.5).curveTo(-1.7,5,0.4,5).curveTo(3.4,5,4.7,2.2).lineTo(6.9,3.3).curveTo(5.1,7.5,0.3,7.5).curveTo(-3.1,7.5,-5,5.2).closePath();
	this.shape_25.setTransform(326.15,122.8);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-5.3,5.4).curveTo(-7.4,3.3,-7.4,-0).curveTo(-7.4,-3.2,-5.3,-5.4).curveTo(-3.1,-7.5,-0,-7.5).curveTo(3.1,-7.5,5.3,-5.4).curveTo(7.4,-3.3,7.4,-0).curveTo(7.4,3.3,5.3,5.4).curveTo(3.1,7.5,-0,7.5).curveTo(-3.2,7.5,-5.3,5.4).closePath().moveTo(-3.3,-3.4).curveTo(-4.5,-2,-4.5,-0).curveTo(-4.5,2.1,-3.2,3.5).curveTo(-1.9,4.8,-0,4.8).curveTo(1.9,4.8,3.2,3.4).curveTo(4.5,2.1,4.5,-0).curveTo(4.5,-2.1,3.2,-3.5).curveTo(1.9,-4.8,-0,-4.8).curveTo(-2,-4.8,-3.3,-3.4).closePath();
	this.shape_26.setTransform(342.4,122.8);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-4.4,6.6).curveTo(-5.3,6,-5.6,5).curveTo(-5.9,4,-5.9,1.8).lineTo(-5.9,-4.7).lineTo(-7.9,-4.7).lineTo(-7.9,-7.2).lineTo(-3.1,-7.2).lineTo(-3.1,1.4).curveTo(-3.1,3,-3,3.5).curveTo(-2.9,4.1,-2.6,4.4).curveTo(-2.1,4.8,-1.4,4.8).curveTo(0.4,4.8,2.6,2.9).lineTo(2.6,-4.7).lineTo(0.1,-4.7).lineTo(0.1,-7.2).lineTo(5.4,-7.2).lineTo(5.4,4.5).lineTo(7.9,4.5).lineTo(7.9,7).lineTo(2.6,7).lineTo(2.6,5.3).curveTo(0.2,7.2,-2,7.2).curveTo(-3.5,7.2,-4.4,6.6).closePath();
	this.shape_27.setTransform(359.7,122.925);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-3.7,10.2).lineTo(-3.7,7.7).lineTo(-1.2,7.7).lineTo(-1.2,-7.7).lineTo(-3.7,-7.7).lineTo(-3.7,-10.2).lineTo(1.6,-10.2).lineTo(1.6,7.7).lineTo(3.7,7.7).lineTo(3.7,10.2).closePath();
	this.shape_28.setTransform(372.225,119.7);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-6.6,8.4).curveTo(-8.7,6.5,-8.7,3).curveTo(-8.7,-0.5,-6.6,-2.5).curveTo(-4.3,-4.5,-1.6,-4.5).curveTo(1.2,-4.5,3.3,-2.2).lineTo(3.3,-7.8).lineTo(0.6,-7.8).lineTo(0.6,-10.3).lineTo(6.1,-10.3).lineTo(6.1,7.6).lineTo(8.7,7.6).lineTo(8.7,10.1).lineTo(3.3,10.1).lineTo(3.3,8).curveTo(1.2,10.3,-1.7,10.3).curveTo(-4.5,10.3,-6.6,8.4).closePath().moveTo(-4.4,-0.5).curveTo(-5.7,0.9,-5.7,3).curveTo(-5.7,5.3,-4.3,6.6).curveTo(-3.1,7.8,-1.2,7.8).curveTo(0.6,7.8,2,6.5).curveTo(3.3,5.2,3.3,2.8).curveTo(3.3,0.5,2,-0.7).curveTo(0.5,-1.9,-1.3,-1.9).curveTo(-3.1,-1.9,-4.4,-0.5).closePath();
	this.shape_29.setTransform(386.65,119.825);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-3.4,6.3).lineTo(-3.4,7.1).lineTo(-5.8,7.1).lineTo(-5.8,2.2).lineTo(-3.4,2.2).lineTo(-3.4,2.7).curveTo(-3.2,3.7,-2.3,4.3).curveTo(-1.3,5,-0,5).curveTo(1.3,5,2.1,4.5).curveTo(2.9,4,2.9,3.2).curveTo(2.9,2.4,2.3,2).curveTo(1.6,1.6,-0.4,1.3).curveTo(-3.3,0.8,-4.6,-0.3).curveTo(-5.8,-1.4,-5.8,-3.2).curveTo(-5.8,-4.9,-4.5,-6.1).curveTo(-3.1,-7.3,-0.9,-7.3).curveTo(1.1,-7.3,2.6,-6.5).lineTo(2.6,-7.1).lineTo(5.1,-7.1).lineTo(5.1,-2.4).lineTo(2.6,-2.4).lineTo(2.6,-3.3).curveTo(1.5,-5,-0.7,-5).curveTo(-1.8,-5,-2.5,-4.5).curveTo(-3.2,-4.1,-3.2,-3.3).curveTo(-3.2,-2.5,-2.6,-2.2).curveTo(-1.9,-1.9,0.2,-1.5).curveTo(2.3,-1.2,3.4,-0.8).curveTo(4.4,-0.3,5.1,0.7).curveTo(5.8,1.7,5.8,3).curveTo(5.8,5,4.3,6.1).curveTo(2.8,7.3,0.4,7.3).curveTo(-1.9,7.3,-3.4,6.3).closePath();
	this.shape_30.setTransform(409.975,122.825);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-4.3,6.6).curveTo(-5.3,6,-5.6,5).curveTo(-5.9,4,-5.9,1.8).lineTo(-5.9,-4.7).lineTo(-7.9,-4.7).lineTo(-7.9,-7.2).lineTo(-3.2,-7.2).lineTo(-3.2,1.4).curveTo(-3.2,3,-3.1,3.5).curveTo(-3,4.1,-2.5,4.4).curveTo(-2.1,4.8,-1.5,4.8).curveTo(0.4,4.8,2.7,2.9).lineTo(2.7,-4.7).lineTo(0.2,-4.7).lineTo(0.2,-7.2).lineTo(5.5,-7.2).lineTo(5.5,4.5).lineTo(7.9,4.5).lineTo(7.9,7).lineTo(2.7,7).lineTo(2.7,5.3).curveTo(0.2,7.2,-2,7.2).curveTo(-3.5,7.2,-4.3,6.6).closePath();
	this.shape_31.setTransform(425.35,122.925);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-5.2,5.5).curveTo(-7.5,3.4,-7.5,-0).curveTo(-7.5,-3.2,-5.3,-5.4).curveTo(-3,-7.5,-0.1,-7.5).curveTo(2.8,-7.5,5.1,-5.4).curveTo(7.4,-3.3,7.5,0.7).lineTo(-4.5,0.7).curveTo(-4.2,2.7,-2.9,3.9).curveTo(-1.6,5.1,0.4,5.1).curveTo(3.3,5.1,5,2.8).lineTo(7.5,3.8).curveTo(6.3,5.7,4.4,6.6).curveTo(2.5,7.5,0.4,7.5).curveTo(-2.9,7.5,-5.2,5.5).closePath().moveTo(-2.9,-4.1).curveTo(-4,-3,-4.4,-1.3).lineTo(4.6,-1.3).curveTo(4.3,-2.8,3.1,-4).curveTo(1.8,-5.2,-0.1,-5.2).curveTo(-1.7,-5.2,-2.9,-4.1).closePath();
	this.shape_32.setTransform(454.65,122.8);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-5.7,7.2).lineTo(-5.7,4.7).lineTo(-2.9,4.7).lineTo(-2.9,-4.5).lineTo(-5.7,-4.5).lineTo(-5.7,-7).lineTo(-0.6,-7).lineTo(-0.6,-3.8).curveTo(-0.2,-5,0.7,-5.9).curveTo(1.5,-6.6,2.4,-7).curveTo(3.4,-7.2,5,-7.2).lineTo(5.7,-7.2).lineTo(5.7,-4.4).lineTo(5.2,-4.4).curveTo(3,-4.4,2,-4).curveTo(0.9,-3.5,0.4,-2.4).curveTo(-0.1,-1.3,-0.1,1.6).lineTo(-0.1,4.7).lineTo(3,4.7).lineTo(3,7.2).closePath();
	this.shape_33.setTransform(439.925,122.7);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-4.3,6.6).curveTo(-5.3,6,-5.6,5).curveTo(-5.9,4,-5.9,1.8).lineTo(-5.9,-4.7).lineTo(-7.9,-4.7).lineTo(-7.9,-7.2).lineTo(-3.2,-7.2).lineTo(-3.2,1.4).curveTo(-3.2,3,-3.1,3.5).curveTo(-2.9,4.1,-2.5,4.4).curveTo(-2.1,4.8,-1.5,4.8).curveTo(0.5,4.8,2.7,2.9).lineTo(2.7,-4.7).lineTo(0.2,-4.7).lineTo(0.2,-7.2).lineTo(5.5,-7.2).lineTo(5.5,4.5).lineTo(7.9,4.5).lineTo(7.9,7).lineTo(2.7,7).lineTo(2.7,5.3).curveTo(0.2,7.2,-2,7.2).curveTo(-3.4,7.2,-4.3,6.6).closePath();
	this.shape_34.setTransform(479.45,122.925);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-3.4,6.3).lineTo(-3.4,7.1).lineTo(-5.8,7.1).lineTo(-5.8,2.2).lineTo(-3.4,2.2).lineTo(-3.4,2.7).curveTo(-3.2,3.7,-2.3,4.3).curveTo(-1.3,5,-0,5).curveTo(1.3,5,2.1,4.5).curveTo(2.9,4,2.9,3.2).curveTo(2.9,2.4,2.3,2).curveTo(1.6,1.6,-0.4,1.3).curveTo(-3.3,0.8,-4.6,-0.3).curveTo(-5.8,-1.4,-5.8,-3.2).curveTo(-5.8,-4.9,-4.5,-6.1).curveTo(-3.1,-7.3,-0.9,-7.3).curveTo(1.1,-7.3,2.6,-6.5).lineTo(2.6,-7.1).lineTo(5.1,-7.1).lineTo(5.1,-2.4).lineTo(2.6,-2.4).lineTo(2.6,-3.3).curveTo(1.5,-5,-0.7,-5).curveTo(-1.8,-5,-2.5,-4.5).curveTo(-3.2,-4.1,-3.2,-3.3).curveTo(-3.2,-2.5,-2.6,-2.2).curveTo(-1.9,-1.9,0.2,-1.5).curveTo(2.3,-1.2,3.4,-0.8).curveTo(4.4,-0.3,5.1,0.7).curveTo(5.8,1.7,5.8,3).curveTo(5.8,5,4.3,6.1).curveTo(2.8,7.3,0.4,7.3).curveTo(-1.9,7.3,-3.4,6.3).closePath();
	this.shape_35.setTransform(409.975,122.825);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-5.2,5.5).curveTo(-7.5,3.4,-7.5,-0).curveTo(-7.5,-3.2,-5.3,-5.4).curveTo(-3,-7.5,-0.1,-7.5).curveTo(2.8,-7.5,5.1,-5.4).curveTo(7.4,-3.3,7.5,0.7).lineTo(-4.5,0.7).curveTo(-4.2,2.7,-2.9,3.9).curveTo(-1.6,5.1,0.4,5.1).curveTo(3.3,5.1,5,2.8).lineTo(7.5,3.8).curveTo(6.3,5.7,4.3,6.6).curveTo(2.5,7.5,0.4,7.5).curveTo(-2.9,7.5,-5.2,5.5).closePath().moveTo(-2.9,-4.1).curveTo(-4,-3,-4.4,-1.3).lineTo(4.6,-1.3).curveTo(4.3,-2.8,3.1,-4).curveTo(1.8,-5.2,-0.1,-5.2).curveTo(-1.7,-5.2,-2.9,-4.1).closePath();
	this.shape_36.setTransform(510,122.8);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-5.7,6.1).curveTo(-7.1,4.9,-7.1,2.9).curveTo(-7.1,0.9,-5.6,-0.4).curveTo(-4.1,-1.7,-1.9,-1.7).curveTo(0.1,-1.7,1.9,-0.5).lineTo(1.9,-1.9).curveTo(1.9,-2.9,1.7,-3.5).curveTo(1.5,-4.1,0.8,-4.6).curveTo(0,-5.1,-1.2,-5.1).curveTo(-3.3,-5.1,-4.2,-3.4).lineTo(-6.9,-4.1).curveTo(-5.1,-7.4,-0.8,-7.4).curveTo(0.8,-7.4,2,-7).curveTo(3.1,-6.5,3.7,-5.8).curveTo(4.3,-5.2,4.5,-4.4).curveTo(4.7,-3.6,4.7,-1.9).lineTo(4.7,4.7).lineTo(7.1,4.7).lineTo(7.1,7.2).lineTo(2.2,7.2).lineTo(2.2,5.4).curveTo(0.2,7.4,-2.3,7.4).curveTo(-4.2,7.4,-5.7,6.1).closePath().moveTo(-3.7,1.2).curveTo(-4.4,1.8,-4.4,2.9).curveTo(-4.4,3.9,-3.7,4.6).curveTo(-3.1,5.3,-1.9,5.3).curveTo(0.1,5.3,1.9,3.6).lineTo(1.9,1.9).curveTo(0.1,0.5,-1.7,0.5).curveTo(-2.9,0.5,-3.7,1.2).closePath();
	this.shape_37.setTransform(534.575,122.725);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-6.6,8.4).curveTo(-8.7,6.5,-8.7,3).curveTo(-8.7,-0.5,-6.6,-2.5).curveTo(-4.3,-4.5,-1.6,-4.5).curveTo(1.2,-4.5,3.3,-2.2).lineTo(3.3,-7.8).lineTo(0.6,-7.8).lineTo(0.6,-10.3).lineTo(6.1,-10.3).lineTo(6.1,7.6).lineTo(8.7,7.6).lineTo(8.7,10.1).lineTo(3.3,10.1).lineTo(3.3,8).curveTo(1.3,10.3,-1.7,10.3).curveTo(-4.5,10.3,-6.6,8.4).closePath().moveTo(-4.4,-0.5).curveTo(-5.7,0.9,-5.7,3).curveTo(-5.7,5.3,-4.3,6.6).curveTo(-3.1,7.8,-1.2,7.8).curveTo(0.6,7.8,2,6.5).curveTo(3.3,5.2,3.3,2.8).curveTo(3.3,0.5,2,-0.7).curveTo(0.5,-1.9,-1.3,-1.9).curveTo(-3.1,-1.9,-4.4,-0.5).closePath();
	this.shape_38.setTransform(559.45,119.825);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-5.7,7.2).lineTo(-5.7,4.7).lineTo(-2.9,4.7).lineTo(-2.9,-4.5).lineTo(-5.7,-4.5).lineTo(-5.7,-7).lineTo(-0.6,-7).lineTo(-0.6,-3.8).curveTo(-0.2,-5,0.7,-5.9).curveTo(1.5,-6.6,2.4,-7).curveTo(3.4,-7.2,5,-7.2).lineTo(5.7,-7.2).lineTo(5.7,-4.4).lineTo(5.2,-4.4).curveTo(3,-4.4,2,-4).curveTo(0.9,-3.5,0.4,-2.4).curveTo(-0.1,-1.3,-0.1,1.6).lineTo(-0.1,4.7).lineTo(3,4.7).lineTo(3,7.2).closePath();
	this.shape_39.setTransform(439.925,122.7);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.beginFill("#FFFFFF").beginStroke().moveTo(3,7.2).lineTo(3,-2).curveTo(3,-3.7,2.5,-4.2).curveTo(2,-4.6,1.3,-4.6).curveTo(-0.5,-4.7,-2.9,-2.8).lineTo(-2.9,4.7).lineTo(-0.4,4.7).lineTo(-0.4,7.2).lineTo(-8.2,7.2).lineTo(-8.2,4.7).lineTo(-5.7,4.7).lineTo(-5.7,-4.5).lineTo(-8.2,-4.5).lineTo(-8.2,-7).lineTo(-2.9,-7).lineTo(-2.9,-5.3).curveTo(-0.2,-7.2,2,-7.2).curveTo(3.4,-7.2,4.3,-6.5).curveTo(5.2,-5.9,5.5,-5).curveTo(5.7,-4,5.8,-2.2).lineTo(5.8,4.7).lineTo(8.1,4.7).lineTo(8.1,7.2).closePath();
	this.shape_40.setTransform(598.4,122.7);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-3.6,10.3).lineTo(-3.6,7.8).lineTo(-1.4,7.8).lineTo(-1.4,-1.4).lineTo(-3.6,-1.4).lineTo(-3.6,-3.9).lineTo(1.4,-3.9).lineTo(1.4,7.8).lineTo(3.6,7.8).lineTo(3.6,10.3).closePath().moveTo(-1.3,-7.5).curveTo(-1.8,-8,-1.8,-8.7).curveTo(-1.8,-9.3,-1.3,-9.8).curveTo(-0.8,-10.3,-0.1,-10.3).curveTo(0.6,-10.3,1.1,-9.9).curveTo(1.6,-9.4,1.6,-8.7).curveTo(1.6,-8,1.1,-7.5).curveTo(0.6,-7,-0.1,-7).curveTo(-0.8,-7,-1.3,-7.5).closePath();
	this.shape_41.setTransform(585.275,119.575);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-1.8,10.2).lineTo(-1.8,6.6).lineTo(1.8,6.6).lineTo(1.8,10.2).closePath().moveTo(-0.8,4.7).lineTo(-1.5,-4).lineTo(-1.5,-10.2).lineTo(1.5,-10.2).lineTo(1.5,-4).lineTo(0.7,4.7).closePath();
	this.shape_42.setTransform(628.25,119.7);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.beginFill("#FFFFFF").beginStroke().moveTo(4.4,10.2).lineTo(-2.7,3.1).lineTo(-2.7,7.7).lineTo(-0.3,7.7).lineTo(-0.3,10.2).lineTo(-8,10.2).lineTo(-8,7.7).lineTo(-5.5,7.7).lineTo(-5.5,-7.7).lineTo(-8,-7.7).lineTo(-8,-10.2).lineTo(-2.7,-10.2).lineTo(-2.7,2.5).lineTo(2.6,-1.7).lineTo(0.2,-1.7).lineTo(0.2,-4).lineTo(8.1,-4).lineTo(8.1,-1.7).lineTo(5.9,-1.7).lineTo(0.5,2.8).lineTo(5.5,7.7).lineTo(8.1,7.7).lineTo(8.1,10.2).closePath();
	this.shape_43.setTransform(615.45,119.7);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-0.5,10.3).lineTo(-7.5,-7.7).lineTo(-7.5,7.6).lineTo(-5.2,7.6).lineTo(-5.2,10.1).lineTo(-12.4,10.1).lineTo(-12.4,7.6).lineTo(-10,7.6).lineTo(-10,-7.7).lineTo(-12.4,-7.7).lineTo(-12.4,-10.3).lineTo(-5.5,-10.3).lineTo(-0.1,3.7).lineTo(5.3,-10.3).lineTo(12.4,-10.3).lineTo(12.4,-7.7).lineTo(9.9,-7.7).lineTo(9.9,7.6).lineTo(12.4,7.6).lineTo(12.4,10.1).lineTo(4.7,10.1).lineTo(4.7,7.6).lineTo(7.1,7.6).lineTo(7.1,-7.7).lineTo(0.1,10.3).closePath();
	this.shape_44.setTransform(316.25,110.5);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-4.3,6.6).curveTo(-5.3,6,-5.6,5).curveTo(-5.9,4,-5.9,1.8).lineTo(-5.9,-4.7).lineTo(-7.9,-4.7).lineTo(-7.9,-7.2).lineTo(-3.2,-7.2).lineTo(-3.2,1.4).curveTo(-3.2,3,-3.1,3.5).curveTo(-3,4.1,-2.5,4.4).curveTo(-2.1,4.8,-1.4,4.8).curveTo(0.4,4.8,2.7,2.9).lineTo(2.7,-4.7).lineTo(0.2,-4.7).lineTo(0.2,-7.2).lineTo(5.5,-7.2).lineTo(5.5,4.5).lineTo(7.9,4.5).lineTo(7.9,7).lineTo(2.7,7).lineTo(2.7,5.3).curveTo(0.2,7.2,-2,7.2).curveTo(-3.5,7.2,-4.3,6.6).closePath();
	this.shape_45.setTransform(338.05,113.625);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-5,5.2).curveTo(-7,2.9,-6.9,-0.1).curveTo(-6.9,-3.3,-4.9,-5.4).curveTo(-2.7,-7.5,0.1,-7.5).curveTo(2.4,-7.5,4,-6.1).lineTo(4,-7.1).lineTo(6.5,-7.1).lineTo(6.5,-1.7).lineTo(4,-1.7).curveTo(3.8,-3.3,2.8,-4.1).curveTo(1.7,-4.9,0.3,-4.9).curveTo(-1.6,-4.9,-2.7,-3.5).curveTo(-3.9,-2.3,-4,-0.1).curveTo(-4,1.9,-2.8,3.4).curveTo(-1.7,5,0.4,5).curveTo(3.4,5,4.7,2.2).lineTo(6.9,3.3).curveTo(5.1,7.5,0.3,7.5).curveTo(-3.1,7.5,-5,5.2).closePath();
	this.shape_46.setTransform(354.25,113.5);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.beginFill("#FFFFFF").beginStroke().moveTo(3,10.2).lineTo(3,1.6).lineTo(2.9,-0.7).curveTo(2.8,-1.2,2.3,-1.5).curveTo(1.9,-1.8,1.3,-1.9).curveTo(-0.3,-1.8,-2.9,-0.1).lineTo(-2.9,7.7).lineTo(-0.4,7.7).lineTo(-0.4,10.2).lineTo(-8.2,10.2).lineTo(-8.2,7.7).lineTo(-5.6,7.7).lineTo(-5.6,-7.7).lineTo(-8.2,-7.7).lineTo(-8.2,-10.2).lineTo(-2.9,-10.2).lineTo(-2.9,-2.3).curveTo(-0.4,-4.4,1.9,-4.4).curveTo(3.3,-4.4,4.2,-3.8).curveTo(5.2,-3.2,5.5,-2.2).curveTo(5.8,-1.3,5.8,0.6).lineTo(5.8,7.7).lineTo(8.2,7.7).lineTo(8.2,10.2).closePath();
	this.shape_47.setTransform(370.7,110.4);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-1.4,9.6).curveTo(-2.8,8.8,-3.4,8).lineTo(-3.4,10.1).lineTo(-8.7,10.1).lineTo(-8.7,7.6).lineTo(-6.2,7.6).lineTo(-6.2,-7.8).lineTo(-8.7,-7.8).lineTo(-8.7,-10.3).lineTo(-3.4,-10.3).lineTo(-3.4,-2.1).curveTo(-1.3,-4.5,1.7,-4.5).curveTo(4.7,-4.5,6.6,-2.5).curveTo(8.7,-0.5,8.7,2.8).curveTo(8.6,6,6.7,8.2).curveTo(4.8,10.3,1.7,10.3).curveTo(-0,10.3,-1.4,9.6).closePath().moveTo(-1.9,-0.7).curveTo(-3.4,0.6,-3.4,3).curveTo(-3.4,5.2,-1.9,6.5).curveTo(-0.6,7.8,1.1,7.8).curveTo(3,7.8,4.4,6.4).curveTo(5.7,5.1,5.7,2.8).curveTo(5.7,0.5,4.4,-0.7).curveTo(3.1,-2,1.2,-2).curveTo(-0.5,-2,-1.9,-0.7).closePath();
	this.shape_48.setTransform(396.05,110.525);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-5.2,5.5).curveTo(-7.5,3.5,-7.5,-0).curveTo(-7.5,-3.3,-5.3,-5.3).curveTo(-3,-7.5,-0.1,-7.5).curveTo(2.8,-7.5,5.1,-5.4).curveTo(7.4,-3.3,7.5,0.7).lineTo(-4.5,0.7).curveTo(-4.2,2.7,-2.9,3.9).curveTo(-1.6,5.1,0.4,5.1).curveTo(3.3,5.1,5,2.8).lineTo(7.5,3.9).curveTo(6.3,5.7,4.3,6.6).curveTo(2.5,7.5,0.4,7.5).curveTo(-2.9,7.5,-5.2,5.5).closePath().moveTo(-2.9,-4.1).curveTo(-4,-3.1,-4.4,-1.3).lineTo(4.6,-1.3).curveTo(4.3,-2.8,3.1,-4).curveTo(1.8,-5.2,-0.1,-5.2).curveTo(-1.7,-5.2,-2.9,-4.1).closePath();
	this.shape_49.setTransform(414.6,113.5);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-0.6,9).curveTo(-1.4,8.4,-1.6,7.6).curveTo(-1.8,6.7,-1.8,4.7).lineTo(-1.8,-2.4).lineTo(-3.6,-2.4).lineTo(-3.6,-4.9).lineTo(-1.8,-4.9).lineTo(-1.8,-7).lineTo(1,-9.6).lineTo(1,-4.9).lineTo(3.6,-4.9).lineTo(3.6,-2.4).lineTo(1,-2.4).lineTo(1,4.5).curveTo(1,6.2,1.2,6.6).curveTo(1.4,6.9,2.1,6.9).curveTo(2.9,6.9,3.6,6.6).lineTo(3.6,9.2).curveTo(2.6,9.6,1.5,9.6).curveTo(0.2,9.6,-0.6,9).closePath();
	this.shape_50.setTransform(427.725,111.275);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-0.6,9).curveTo(-1.4,8.4,-1.6,7.6).curveTo(-1.8,6.7,-1.8,4.7).lineTo(-1.8,-2.4).lineTo(-3.6,-2.4).lineTo(-3.6,-4.9).lineTo(-1.8,-4.9).lineTo(-1.8,-7).lineTo(1,-9.6).lineTo(1,-4.9).lineTo(3.6,-4.9).lineTo(3.6,-2.4).lineTo(1,-2.4).lineTo(1,4.5).curveTo(1,6.2,1.2,6.6).curveTo(1.4,6.9,2.1,6.9).curveTo(2.9,6.9,3.6,6.6).lineTo(3.6,9.2).curveTo(2.6,9.6,1.5,9.6).curveTo(0.2,9.6,-0.6,9).closePath();
	this.shape_51.setTransform(427.725,111.275);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-5.2,5.5).curveTo(-7.5,3.5,-7.5,-0).curveTo(-7.5,-3.3,-5.2,-5.3).curveTo(-3,-7.5,-0.1,-7.5).curveTo(2.8,-7.5,5.1,-5.4).curveTo(7.4,-3.3,7.5,0.7).lineTo(-4.5,0.7).curveTo(-4.2,2.7,-2.9,3.9).curveTo(-1.6,5.1,0.4,5.1).curveTo(3.3,5.1,5,2.8).lineTo(7.5,3.9).curveTo(6.3,5.7,4.3,6.6).curveTo(2.4,7.5,0.4,7.5).curveTo(-2.9,7.5,-5.2,5.5).closePath().moveTo(-2.9,-4.1).curveTo(-4,-3.1,-4.3,-1.3).lineTo(4.6,-1.3).curveTo(4.3,-2.8,3.1,-4).curveTo(1.8,-5.2,-0.1,-5.2).curveTo(-1.7,-5.2,-2.9,-4.1).closePath();
	this.shape_52.setTransform(449.9,113.5);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-5.7,7.2).lineTo(-5.7,4.7).lineTo(-2.9,4.7).lineTo(-2.9,-4.5).lineTo(-5.7,-4.5).lineTo(-5.7,-7).lineTo(-0.6,-7).lineTo(-0.6,-3.8).curveTo(-0.2,-5,0.7,-5.9).curveTo(1.5,-6.7,2.4,-6.9).curveTo(3.4,-7.2,5,-7.2).lineTo(5.7,-7.2).lineTo(5.7,-4.4).lineTo(5.2,-4.4).curveTo(3,-4.4,2,-4).curveTo(0.9,-3.6,0.4,-2.4).curveTo(-0.1,-1.3,-0.1,1.6).lineTo(-0.1,4.7).lineTo(3,4.7).lineTo(3,7.2).closePath();
	this.shape_53.setTransform(464.875,113.4);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-1.8,2.3).curveTo(-0,2,-0,0.1).lineTo(-0.1,-0.2).lineTo(-1.8,-0.2).lineTo(-1.8,-3.8).lineTo(1.8,-3.8).lineTo(1.8,-0.7).curveTo(1.8,0.9,1.5,1.8).curveTo(1.3,2.7,0.5,3.2).curveTo(-0.4,3.8,-1.8,3.8).closePath();
	this.shape_54.setTransform(475.4,120.825);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-0.6,9).curveTo(-1.4,8.4,-1.6,7.6).curveTo(-1.8,6.7,-1.8,4.7).lineTo(-1.8,-2.4).lineTo(-3.6,-2.4).lineTo(-3.6,-4.9).lineTo(-1.8,-4.9).lineTo(-1.8,-7).lineTo(1,-9.6).lineTo(1,-4.9).lineTo(3.6,-4.9).lineTo(3.6,-2.4).lineTo(1,-2.4).lineTo(1,4.5).curveTo(1,6.2,1.2,6.6).curveTo(1.4,6.9,2.1,6.9).curveTo(2.9,6.9,3.6,6.6).lineTo(3.6,9.2).curveTo(2.6,9.6,1.5,9.6).curveTo(0.2,9.6,-0.6,9).closePath();
	this.shape_55.setTransform(427.725,111.275);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.beginFill("#FFFFFF").beginStroke().moveTo(3,10.2).lineTo(3,1.6).curveTo(3,-0.1,2.9,-0.7).curveTo(2.8,-1.2,2.3,-1.5).curveTo(1.9,-1.8,1.2,-1.9).curveTo(-0.4,-1.8,-2.8,-0.1).lineTo(-2.8,7.7).lineTo(-0.4,7.7).lineTo(-0.4,10.2).lineTo(-8.2,10.2).lineTo(-8.2,7.7).lineTo(-5.6,7.7).lineTo(-5.6,-7.7).lineTo(-8.2,-7.7).lineTo(-8.2,-10.2).lineTo(-2.8,-10.2).lineTo(-2.8,-2.3).curveTo(-0.4,-4.4,1.9,-4.4).curveTo(3.4,-4.4,4.2,-3.8).curveTo(5.2,-3.2,5.5,-2.2).curveTo(5.8,-1.3,5.8,0.6).lineTo(5.8,7.7).lineTo(8.2,7.7).lineTo(8.2,10.2).closePath();
	this.shape_56.setTransform(505.1,110.4);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.beginFill("#FFFFFF").beginStroke().moveTo(3,7.2).lineTo(3,-2.1).curveTo(2.9,-3.7,2.5,-4.1).curveTo(2,-4.6,1.3,-4.7).curveTo(-0.6,-4.7,-2.9,-2.9).lineTo(-2.9,4.7).lineTo(-0.4,4.7).lineTo(-0.4,7.2).lineTo(-8.1,7.2).lineTo(-8.1,4.7).lineTo(-5.7,4.7).lineTo(-5.7,-4.5).lineTo(-8.1,-4.5).lineTo(-8.1,-7).lineTo(-2.9,-7).lineTo(-2.9,-5.2).curveTo(-0.2,-7.2,2,-7.2).curveTo(3.4,-7.2,4.3,-6.6).curveTo(5.2,-5.9,5.5,-5).curveTo(5.7,-4,5.7,-2.2).lineTo(5.7,4.7).lineTo(8.2,4.7).lineTo(8.2,7.2).closePath();
	this.shape_57.setTransform(538.3,113.4);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.beginFill("#FFFFFF").beginStroke().moveTo(4.4,10.2).lineTo(-2.8,3.1).lineTo(-2.8,7.7).lineTo(-0.3,7.7).lineTo(-0.3,10.2).lineTo(-8.1,10.2).lineTo(-8.1,7.7).lineTo(-5.5,7.7).lineTo(-5.5,-7.7).lineTo(-8.1,-7.7).lineTo(-8.1,-10.2).lineTo(-2.8,-10.2).lineTo(-2.8,2.5).lineTo(2.6,-1.7).lineTo(0.2,-1.7).lineTo(0.2,-4).lineTo(8,-4).lineTo(8,-1.7).lineTo(5.9,-1.7).lineTo(0.6,2.7).lineTo(5.5,7.7).lineTo(8,7.7).lineTo(8,10.2).closePath();
	this.shape_58.setTransform(555.35,110.4);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-5.7,10.3).lineTo(-5.7,7.9).lineTo(-2.9,7.9).lineTo(-1.2,3.7).lineTo(-5.9,-7.8).lineTo(-8.2,-7.8).lineTo(-8.2,-10.3).lineTo(-1.2,-10.3).lineTo(-1.2,-7.8).lineTo(-2.9,-7.8).lineTo(0.2,0.1).lineTo(3.2,-7.8).lineTo(1.3,-7.8).lineTo(1.3,-10.3).lineTo(8.2,-10.3).lineTo(8.2,-7.8).lineTo(6,-7.8).lineTo(-0.9,10.3).closePath();
	this.shape_59.setTransform(579.7,116.675);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-5.3,5.4).curveTo(-7.5,3.3,-7.4,-0).curveTo(-7.5,-3.3,-5.3,-5.3).curveTo(-3.1,-7.5,0,-7.5).curveTo(3,-7.5,5.3,-5.4).curveTo(7.5,-3.3,7.4,-0).curveTo(7.5,3.4,5.3,5.5).curveTo(3,7.5,0,7.5).curveTo(-3.2,7.5,-5.3,5.4).closePath().moveTo(-3.3,-3.4).curveTo(-4.5,-2,-4.5,-0).curveTo(-4.5,2.1,-3.2,3.4).curveTo(-1.9,4.8,0,4.8).curveTo(1.9,4.8,3.2,3.4).curveTo(4.5,2.1,4.5,-0).curveTo(4.5,-2.1,3.2,-3.4).curveTo(1.8,-4.8,0,-4.8).curveTo(-2,-4.8,-3.3,-3.4).closePath();
	this.shape_60.setTransform(596.75,113.5);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-4.4,6.6).curveTo(-5.3,6,-5.6,5).curveTo(-5.9,4,-5.9,1.8).lineTo(-5.9,-4.7).lineTo(-7.9,-4.7).lineTo(-7.9,-7.2).lineTo(-3.1,-7.2).lineTo(-3.1,1.4).curveTo(-3.1,3,-3,3.5).curveTo(-3,4.1,-2.6,4.4).curveTo(-2.1,4.8,-1.4,4.8).curveTo(0.5,4.8,2.6,2.9).lineTo(2.6,-4.7).lineTo(0.1,-4.7).lineTo(0.1,-7.2).lineTo(5.4,-7.2).lineTo(5.4,4.5).lineTo(7.9,4.5).lineTo(7.9,7).lineTo(2.6,7).lineTo(2.6,5.3).curveTo(0.2,7.2,-2,7.2).curveTo(-3.5,7.2,-4.4,6.6).closePath();
	this.shape_61.setTransform(614.05,113.625);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-4.2,10.2).lineTo(-4.2,7.6).lineTo(-1.5,7.6).lineTo(-1.5,-7.7).lineTo(-5.8,-7.7).lineTo(-5.8,-2.5).lineTo(-8.3,-2.5).lineTo(-8.3,-10.2).lineTo(8.3,-10.2).lineTo(8.3,-2.5).lineTo(5.7,-2.5).lineTo(5.7,-7.7).lineTo(1.5,-7.7).lineTo(1.5,7.6).lineTo(4.2,7.6).lineTo(4.2,10.2).closePath();
	this.shape_62.setTransform(38.8,104.25);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.beginFill("#FFFFFF").beginStroke().moveTo(7.2,7.2).lineTo(7.2,-1.8).lineTo(7.1,-3.6).curveTo(7,-4,6.5,-4.4).curveTo(6.1,-4.7,5.5,-4.7).curveTo(3.7,-4.7,1.4,-2.9).lineTo(1.4,4.7).lineTo(3.8,4.7).lineTo(3.8,7.2).lineTo(-1.3,7.2).lineTo(-1.3,-2).curveTo(-1.3,-3.4,-1.8,-4.1).curveTo(-2.2,-4.7,-3.1,-4.7).curveTo(-4.7,-4.7,-7.2,-2.9).lineTo(-7.2,4.7).lineTo(-4.7,4.7).lineTo(-4.7,7.2).lineTo(-12.5,7.2).lineTo(-12.5,4.7).lineTo(-10,4.7).lineTo(-10,-4.5).lineTo(-12.4,-4.5).lineTo(-12.4,-7).lineTo(-7.2,-7).lineTo(-7.2,-5.2).curveTo(-4.6,-7.2,-2.2,-7.2).curveTo(0.1,-7.2,1.1,-5).curveTo(3.8,-7.2,6.2,-7.2).curveTo(7.6,-7.2,8.5,-6.6).curveTo(9.4,-6,9.7,-5).curveTo(10,-4.1,10,-2.3).lineTo(10,4.7).lineTo(12.5,4.7).lineTo(12.5,7.2).closePath();
	this.shape_63.setTransform(69.45,107.25);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-5.2,5.5).curveTo(-7.5,3.4,-7.5,0).curveTo(-7.5,-3.3,-5.3,-5.4).curveTo(-3,-7.5,-0.1,-7.5).curveTo(2.8,-7.5,5.1,-5.4).curveTo(7.4,-3.4,7.5,0.7).lineTo(-4.5,0.7).curveTo(-4.2,2.7,-2.9,3.9).curveTo(-1.6,5.1,0.4,5.1).curveTo(3.3,5.1,5,2.7).lineTo(7.5,3.9).curveTo(6.3,5.7,4.3,6.6).curveTo(2.4,7.5,0.4,7.5).curveTo(-2.9,7.5,-5.2,5.5).closePath().moveTo(-2.9,-4.1).curveTo(-4,-3,-4.4,-1.3).lineTo(4.6,-1.3).curveTo(4.3,-2.8,3.1,-4).curveTo(1.8,-5.2,-0.1,-5.2).curveTo(-1.7,-5.2,-2.9,-4.1).closePath();
	this.shape_64.setTransform(90.7,107.35);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-4.7,10.4).lineTo(-4.7,7.9).lineTo(-2.6,7.9).lineTo(-2.6,-1.3).lineTo(-4.7,-1.3).lineTo(-4.7,-3.8).lineTo(-2.6,-3.8).lineTo(-2.6,-5.9).curveTo(-2.7,-8.4,-1.6,-9.4).curveTo(-0.4,-10.4,1.1,-10.4).curveTo(4.2,-10.4,4.7,-7.1).lineTo(2.3,-6.8).curveTo(2.1,-8.1,1.2,-8.1).curveTo(0.6,-8.1,0.3,-7.7).curveTo(0.1,-7.3,0.1,-5.9).lineTo(0.1,-3.8).lineTo(2.6,-3.8).lineTo(2.6,-1.3).lineTo(0.1,-1.3).lineTo(0.1,7.9).lineTo(2.8,7.9).lineTo(2.8,10.4).closePath();
	this.shape_65.setTransform(112.35,104.05);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-5.3,5.4).curveTo(-7.4,3.3,-7.4,0).curveTo(-7.4,-3.3,-5.3,-5.4).curveTo(-3.1,-7.5,-0,-7.5).curveTo(3.1,-7.5,5.3,-5.4).curveTo(7.4,-3.4,7.4,0).curveTo(7.4,3.4,5.3,5.4).curveTo(3.1,7.5,-0,7.5).curveTo(-3.2,7.5,-5.3,5.4).closePath().moveTo(-3.3,-3.4).curveTo(-4.5,-2.1,-4.5,0).curveTo(-4.5,2.1,-3.2,3.4).curveTo(-1.9,4.8,-0,4.8).curveTo(1.9,4.8,3.2,3.4).curveTo(4.5,2.1,4.5,0).curveTo(4.5,-2.1,3.2,-3.5).curveTo(1.9,-4.8,-0,-4.8).curveTo(-2,-4.8,-3.3,-3.4).closePath();
	this.shape_66.setTransform(124.15,107.35);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-5.7,7.2).lineTo(-5.7,4.7).lineTo(-2.9,4.7).lineTo(-2.9,-4.5).lineTo(-5.7,-4.5).lineTo(-5.7,-7).lineTo(-0.6,-7).lineTo(-0.6,-3.8).curveTo(-0.2,-5,0.7,-5.8).curveTo(1.5,-6.6,2.4,-7).curveTo(3.4,-7.2,5,-7.2).lineTo(5.7,-7.2).lineTo(5.7,-4.4).lineTo(5.2,-4.4).curveTo(3,-4.4,2,-3.9).curveTo(0.9,-3.6,0.4,-2.4).curveTo(-0.1,-1.3,-0.1,1.6).lineTo(-0.1,4.7).lineTo(3,4.7).lineTo(3,7.2).closePath();
	this.shape_67.setTransform(139.125,107.25);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.beginFill("#FFFFFF").beginStroke().moveTo(3.2,7.2).lineTo(-0.1,-3).lineTo(-3.5,7.2).lineTo(-6.1,7.2).lineTo(-9.9,-4.7).lineTo(-11.6,-4.7).lineTo(-11.6,-7.2).lineTo(-5.6,-7.2).lineTo(-5.6,-4.7).lineTo(-7.5,-4.7).lineTo(-4.7,3.8).lineTo(-2,-4.7).lineTo(-3.6,-4.7).lineTo(-3.6,-7.2).lineTo(3.3,-7.2).lineTo(3.3,-4.7).lineTo(1.7,-4.7).lineTo(4.4,3.8).lineTo(7.1,-4.7).lineTo(5.2,-4.7).lineTo(5.2,-7.2).lineTo(11.6,-7.2).lineTo(11.6,-4.7).lineTo(9.6,-4.7).lineTo(5.7,7.2).closePath();
	this.shape_68.setTransform(164.3,107.475);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-5.3,5.4).curveTo(-7.4,3.3,-7.5,0).curveTo(-7.4,-3.3,-5.3,-5.4).curveTo(-3.1,-7.5,0,-7.5).curveTo(3.1,-7.5,5.2,-5.4).curveTo(7.5,-3.4,7.5,0).curveTo(7.5,3.4,5.2,5.4).curveTo(3.1,7.5,0,7.5).curveTo(-3.1,7.5,-5.3,5.4).closePath().moveTo(-3.2,-3.4).curveTo(-4.5,-2.1,-4.5,0).curveTo(-4.5,2.1,-3.2,3.4).curveTo(-1.9,4.8,0,4.8).curveTo(1.9,4.8,3.2,3.4).curveTo(4.5,2.1,4.5,0).curveTo(4.5,-2.1,3.2,-3.5).curveTo(1.8,-4.8,0,-4.8).curveTo(-1.9,-4.8,-3.2,-3.4).closePath();
	this.shape_69.setTransform(184.5,107.35);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-5.7,7.2).lineTo(-5.7,4.7).lineTo(-2.9,4.7).lineTo(-2.9,-4.5).lineTo(-5.7,-4.5).lineTo(-5.7,-7).lineTo(-0.6,-7).lineTo(-0.6,-3.8).curveTo(-0.2,-5,0.7,-5.8).curveTo(1.5,-6.6,2.4,-7).curveTo(3.4,-7.2,5,-7.2).lineTo(5.7,-7.2).lineTo(5.7,-4.4).lineTo(5.2,-4.4).curveTo(3,-4.4,2,-3.9).curveTo(0.9,-3.6,0.4,-2.4).curveTo(-0.1,-1.3,-0.1,1.6).lineTo(-0.1,4.7).lineTo(3,4.7).lineTo(3,7.2).closePath();
	this.shape_70.setTransform(139.125,107.25);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.beginFill("#FFFFFF").beginStroke().moveTo(4.4,10.2).lineTo(-2.7,3).lineTo(-2.7,7.7).lineTo(-0.3,7.7).lineTo(-0.3,10.2).lineTo(-8,10.2).lineTo(-8,7.7).lineTo(-5.5,7.7).lineTo(-5.5,-7.7).lineTo(-8,-7.7).lineTo(-8,-10.2).lineTo(-2.7,-10.2).lineTo(-2.7,2.6).lineTo(2.6,-1.7).lineTo(0.2,-1.7).lineTo(0.2,-4).lineTo(8.1,-4).lineTo(8.1,-1.7).lineTo(5.9,-1.7).lineTo(0.5,2.8).lineTo(5.6,7.7).lineTo(8.1,7.7).lineTo(8.1,10.2).closePath();
	this.shape_71.setTransform(214.4,104.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.text}]},140).to({state:[{t:this.shape}]},3).to({state:[{t:this.shape},{t:this.shape_1,p:{x:33.225}}]},3).to({state:[{t:this.shape},{t:this.shape_1,p:{x:33.225}},{t:this.shape_4,p:{x:46.675}},{t:this.shape_3},{t:this.shape_2,p:{x:67.85}}]},3).to({state:[{t:this.shape},{t:this.shape_1,p:{x:33.225}},{t:this.shape_4,p:{x:46.675}},{t:this.shape_3},{t:this.shape_2,p:{x:67.85}},{t:this.shape_6,p:{x:81.4}},{t:this.shape_5}]},3).to({state:[{t:this.shape},{t:this.shape_1,p:{x:33.225}},{t:this.shape_4,p:{x:46.675}},{t:this.shape_3},{t:this.shape_2,p:{x:67.85}},{t:this.shape_6,p:{x:81.4}},{t:this.shape_5},{t:this.shape_7}]},3).to({state:[{t:this.shape},{t:this.shape_1,p:{x:33.225}},{t:this.shape_4,p:{x:46.675}},{t:this.shape_3},{t:this.shape_2,p:{x:67.85}},{t:this.shape_6,p:{x:81.4}},{t:this.shape_5},{t:this.shape_7},{t:this.shape_8}]},3).to({state:[{t:this.shape},{t:this.shape_1,p:{x:33.225}},{t:this.shape_4,p:{x:46.675}},{t:this.shape_3},{t:this.shape_2,p:{x:67.85}},{t:this.shape_6,p:{x:81.4}},{t:this.shape_5},{t:this.shape_7},{t:this.shape_8},{t:this.shape_10},{t:this.shape_9,p:{x:155.225}}]},3).to({state:[{t:this.shape},{t:this.shape_12},{t:this.shape_4,p:{x:46.675}},{t:this.shape_3},{t:this.shape_2,p:{x:67.85}},{t:this.shape_6,p:{x:81.4}},{t:this.shape_5},{t:this.shape_7},{t:this.shape_8},{t:this.shape_10},{t:this.shape_9,p:{x:155.225}},{t:this.shape_1,p:{x:165.725}},{t:this.shape_11}]},3).to({state:[{t:this.shape},{t:this.shape_12},{t:this.shape_4,p:{x:46.675}},{t:this.shape_3},{t:this.shape_14},{t:this.shape_6,p:{x:81.4}},{t:this.shape_5},{t:this.shape_7},{t:this.shape_8},{t:this.shape_10},{t:this.shape_9,p:{x:155.225}},{t:this.shape_1,p:{x:165.725}},{t:this.shape_11},{t:this.shape_2,p:{x:192.6}},{t:this.shape_13}]},3).to({state:[{t:this.shape},{t:this.shape_12},{t:this.shape_17},{t:this.shape_3},{t:this.shape_14},{t:this.shape_6,p:{x:81.4}},{t:this.shape_5},{t:this.shape_7},{t:this.shape_8},{t:this.shape_10},{t:this.shape_9,p:{x:155.225}},{t:this.shape_1,p:{x:165.725}},{t:this.shape_11},{t:this.shape_2,p:{x:192.6}},{t:this.shape_13},{t:this.shape_4,p:{x:225.925}},{t:this.shape_16},{t:this.shape_15}]},3).to({state:[{t:this.shape},{t:this.shape_12},{t:this.shape_17},{t:this.shape_3},{t:this.shape_14},{t:this.shape_20},{t:this.shape_5},{t:this.shape_7},{t:this.shape_8},{t:this.shape_10},{t:this.shape_19},{t:this.shape_1,p:{x:165.725}},{t:this.shape_11},{t:this.shape_2,p:{x:192.6}},{t:this.shape_13},{t:this.shape_4,p:{x:225.925}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_9,p:{x:250.475}},{t:this.shape_18},{t:this.shape_6,p:{x:273.1}}]},3).to({state:[{t:this.shape},{t:this.shape_12},{t:this.shape_17},{t:this.shape_3},{t:this.shape_14},{t:this.shape_20},{t:this.shape_5},{t:this.shape_7},{t:this.shape_8},{t:this.shape_10},{t:this.shape_19},{t:this.shape_1,p:{x:165.725}},{t:this.shape_11},{t:this.shape_2,p:{x:192.6}},{t:this.shape_13},{t:this.shape_4,p:{x:225.925}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_9,p:{x:250.475}},{t:this.shape_18},{t:this.shape_6,p:{x:273.1}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21}]},3).to({state:[]},23).to({state:[{t:this.shape_24}]},160).to({state:[{t:this.shape_24},{t:this.shape_25}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_30,p:{x:409.975}}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_30,p:{x:409.975}},{t:this.shape_31}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_30,p:{x:409.975}},{t:this.shape_31},{t:this.shape_33,p:{x:439.925}},{t:this.shape_32}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_30,p:{x:409.975}},{t:this.shape_31},{t:this.shape_33,p:{x:439.925}},{t:this.shape_32},{t:this.shape_34}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_35},{t:this.shape_31},{t:this.shape_33,p:{x:439.925}},{t:this.shape_32},{t:this.shape_34},{t:this.shape_30,p:{x:494.725}}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_35},{t:this.shape_31},{t:this.shape_33,p:{x:439.925}},{t:this.shape_32},{t:this.shape_34},{t:this.shape_30,p:{x:494.725}},{t:this.shape_36}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_35},{t:this.shape_31},{t:this.shape_33,p:{x:439.925}},{t:this.shape_32},{t:this.shape_34},{t:this.shape_30,p:{x:494.725}},{t:this.shape_36},{t:this.shape_37,p:{x:534.575,y:122.725}}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_35},{t:this.shape_31},{t:this.shape_39},{t:this.shape_32},{t:this.shape_34},{t:this.shape_30,p:{x:494.725}},{t:this.shape_36},{t:this.shape_37,p:{x:534.575,y:122.725}},{t:this.shape_38},{t:this.shape_33,p:{x:574.575}}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_35},{t:this.shape_31},{t:this.shape_39},{t:this.shape_32},{t:this.shape_34},{t:this.shape_30,p:{x:494.725}},{t:this.shape_36},{t:this.shape_37,p:{x:534.575,y:122.725}},{t:this.shape_38},{t:this.shape_33,p:{x:574.575}},{t:this.shape_41,p:{x:585.275,y:119.575}},{t:this.shape_40}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_35},{t:this.shape_31},{t:this.shape_39},{t:this.shape_32},{t:this.shape_34},{t:this.shape_30,p:{x:494.725}},{t:this.shape_36},{t:this.shape_37,p:{x:534.575,y:122.725}},{t:this.shape_38},{t:this.shape_33,p:{x:574.575}},{t:this.shape_41,p:{x:585.275,y:119.575}},{t:this.shape_40},{t:this.shape_43},{t:this.shape_42,p:{x:628.25,y:119.7}}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_35},{t:this.shape_31},{t:this.shape_39},{t:this.shape_32},{t:this.shape_34},{t:this.shape_30,p:{x:494.725}},{t:this.shape_36},{t:this.shape_37,p:{x:534.575,y:122.725}},{t:this.shape_38},{t:this.shape_33,p:{x:574.575}},{t:this.shape_41,p:{x:585.275,y:119.575}},{t:this.shape_40},{t:this.shape_43},{t:this.shape_42,p:{x:628.25,y:119.7}}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_35},{t:this.shape_31},{t:this.shape_39},{t:this.shape_32},{t:this.shape_34},{t:this.shape_30,p:{x:494.725}},{t:this.shape_36},{t:this.shape_37,p:{x:534.575,y:122.725}},{t:this.shape_38},{t:this.shape_33,p:{x:574.575}},{t:this.shape_41,p:{x:585.275,y:119.575}},{t:this.shape_40},{t:this.shape_43},{t:this.shape_42,p:{x:628.25,y:119.7}}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_35},{t:this.shape_31},{t:this.shape_39},{t:this.shape_32},{t:this.shape_34},{t:this.shape_30,p:{x:494.725}},{t:this.shape_36},{t:this.shape_37,p:{x:534.575,y:122.725}},{t:this.shape_38},{t:this.shape_33,p:{x:574.575}},{t:this.shape_41,p:{x:585.275,y:119.575}},{t:this.shape_40},{t:this.shape_43},{t:this.shape_42,p:{x:628.25,y:119.7}}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_35},{t:this.shape_31},{t:this.shape_39},{t:this.shape_32},{t:this.shape_34},{t:this.shape_30,p:{x:494.725}},{t:this.shape_36},{t:this.shape_37,p:{x:534.575,y:122.725}},{t:this.shape_38},{t:this.shape_33,p:{x:574.575}},{t:this.shape_41,p:{x:585.275,y:119.575}},{t:this.shape_40},{t:this.shape_43},{t:this.shape_42,p:{x:628.25,y:119.7}}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_35},{t:this.shape_31},{t:this.shape_39},{t:this.shape_32},{t:this.shape_34},{t:this.shape_30,p:{x:494.725}},{t:this.shape_36},{t:this.shape_37,p:{x:534.575,y:122.725}},{t:this.shape_38},{t:this.shape_33,p:{x:574.575}},{t:this.shape_41,p:{x:585.275,y:119.575}},{t:this.shape_40},{t:this.shape_43},{t:this.shape_42,p:{x:628.25,y:119.7}}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_35},{t:this.shape_31},{t:this.shape_39},{t:this.shape_32},{t:this.shape_34},{t:this.shape_30,p:{x:494.725}},{t:this.shape_36},{t:this.shape_37,p:{x:534.575,y:122.725}},{t:this.shape_38},{t:this.shape_33,p:{x:574.575}},{t:this.shape_41,p:{x:585.275,y:119.575}},{t:this.shape_40},{t:this.shape_43},{t:this.shape_42,p:{x:628.25,y:119.7}}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_35},{t:this.shape_31},{t:this.shape_39},{t:this.shape_32},{t:this.shape_34},{t:this.shape_30,p:{x:494.725}},{t:this.shape_36},{t:this.shape_37,p:{x:534.575,y:122.725}},{t:this.shape_38},{t:this.shape_33,p:{x:574.575}},{t:this.shape_41,p:{x:585.275,y:119.575}},{t:this.shape_40},{t:this.shape_43},{t:this.shape_42,p:{x:628.25,y:119.7}}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_35},{t:this.shape_31},{t:this.shape_39},{t:this.shape_32},{t:this.shape_34},{t:this.shape_30,p:{x:494.725}},{t:this.shape_36},{t:this.shape_37,p:{x:534.575,y:122.725}},{t:this.shape_38},{t:this.shape_33,p:{x:574.575}},{t:this.shape_41,p:{x:585.275,y:119.575}},{t:this.shape_40},{t:this.shape_43},{t:this.shape_42,p:{x:628.25,y:119.7}}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_35},{t:this.shape_31},{t:this.shape_39},{t:this.shape_32},{t:this.shape_34},{t:this.shape_30,p:{x:494.725}},{t:this.shape_36},{t:this.shape_37,p:{x:534.575,y:122.725}},{t:this.shape_38},{t:this.shape_33,p:{x:574.575}},{t:this.shape_41,p:{x:585.275,y:119.575}},{t:this.shape_40},{t:this.shape_43},{t:this.shape_42,p:{x:628.25,y:119.7}}]},2).to({state:[{t:this.shape_24},{t:this.shape_25},{t:this.shape_26},{t:this.shape_27},{t:this.shape_28},{t:this.shape_29},{t:this.shape_35},{t:this.shape_31},{t:this.shape_39},{t:this.shape_32},{t:this.shape_34},{t:this.shape_30,p:{x:494.725}},{t:this.shape_36},{t:this.shape_37,p:{x:534.575,y:122.725}},{t:this.shape_38},{t:this.shape_33,p:{x:574.575}},{t:this.shape_41,p:{x:585.275,y:119.575}},{t:this.shape_40},{t:this.shape_43},{t:this.shape_42,p:{x:628.25,y:119.7}}]},21).to({state:[]},1).to({state:[{t:this.shape_44}]},170).to({state:[{t:this.shape_44},{t:this.shape_45}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47},{t:this.shape_48}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_50,p:{x:427.725}}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_51,p:{x:427.725}},{t:this.shape_50,p:{x:436.775}}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_51,p:{x:427.725}},{t:this.shape_50,p:{x:436.775}}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_51,p:{x:427.725}},{t:this.shape_50,p:{x:436.775}},{t:this.shape_52}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_51,p:{x:427.725}},{t:this.shape_50,p:{x:436.775}},{t:this.shape_52},{t:this.shape_53}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_51,p:{x:427.725}},{t:this.shape_50,p:{x:436.775}},{t:this.shape_52},{t:this.shape_53},{t:this.shape_54}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_51,p:{x:427.725}},{t:this.shape_50,p:{x:436.775}},{t:this.shape_52},{t:this.shape_53},{t:this.shape_54}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_55},{t:this.shape_51,p:{x:436.775}},{t:this.shape_52},{t:this.shape_53},{t:this.shape_54},{t:this.shape_50,p:{x:491.775}}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_55},{t:this.shape_51,p:{x:436.775}},{t:this.shape_52},{t:this.shape_53},{t:this.shape_54},{t:this.shape_50,p:{x:491.775}},{t:this.shape_56},{t:this.shape_37,p:{x:521.975,y:113.425}}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_55},{t:this.shape_51,p:{x:436.775}},{t:this.shape_52},{t:this.shape_53},{t:this.shape_54},{t:this.shape_50,p:{x:491.775}},{t:this.shape_56},{t:this.shape_37,p:{x:521.975,y:113.425}},{t:this.shape_57}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_55},{t:this.shape_51,p:{x:436.775}},{t:this.shape_52},{t:this.shape_53},{t:this.shape_54},{t:this.shape_50,p:{x:491.775}},{t:this.shape_56},{t:this.shape_37,p:{x:521.975,y:113.425}},{t:this.shape_57},{t:this.shape_58}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_55},{t:this.shape_51,p:{x:436.775}},{t:this.shape_52},{t:this.shape_53},{t:this.shape_54},{t:this.shape_50,p:{x:491.775}},{t:this.shape_56},{t:this.shape_37,p:{x:521.975,y:113.425}},{t:this.shape_57},{t:this.shape_58}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_55},{t:this.shape_51,p:{x:436.775}},{t:this.shape_52},{t:this.shape_53},{t:this.shape_54},{t:this.shape_50,p:{x:491.775}},{t:this.shape_56},{t:this.shape_37,p:{x:521.975,y:113.425}},{t:this.shape_57},{t:this.shape_58},{t:this.shape_59}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_55},{t:this.shape_51,p:{x:436.775}},{t:this.shape_52},{t:this.shape_53},{t:this.shape_54},{t:this.shape_50,p:{x:491.775}},{t:this.shape_56},{t:this.shape_37,p:{x:521.975,y:113.425}},{t:this.shape_57},{t:this.shape_58},{t:this.shape_59},{t:this.shape_60}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_55},{t:this.shape_51,p:{x:436.775}},{t:this.shape_52},{t:this.shape_53},{t:this.shape_54},{t:this.shape_50,p:{x:491.775}},{t:this.shape_56},{t:this.shape_37,p:{x:521.975,y:113.425}},{t:this.shape_57},{t:this.shape_58},{t:this.shape_59},{t:this.shape_60},{t:this.shape_61}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_55},{t:this.shape_51,p:{x:436.775}},{t:this.shape_52},{t:this.shape_53},{t:this.shape_54},{t:this.shape_50,p:{x:491.775}},{t:this.shape_56},{t:this.shape_37,p:{x:521.975,y:113.425}},{t:this.shape_57},{t:this.shape_58},{t:this.shape_59},{t:this.shape_60},{t:this.shape_61},{t:this.shape_42,p:{x:626.65,y:110.4}}]},2).to({state:[{t:this.shape_44},{t:this.shape_45},{t:this.shape_46},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_55},{t:this.shape_51,p:{x:436.775}},{t:this.shape_52},{t:this.shape_53},{t:this.shape_54},{t:this.shape_50,p:{x:491.775}},{t:this.shape_56},{t:this.shape_37,p:{x:521.975,y:113.425}},{t:this.shape_57},{t:this.shape_58},{t:this.shape_59},{t:this.shape_60},{t:this.shape_61},{t:this.shape_42,p:{x:626.65,y:110.4}}]},14).to({state:[]},1).to({state:[{t:this.shape_62}]},101).to({state:[{t:this.shape_62},{t:this.shape_41,p:{x:51.975,y:104.125}}]},2).to({state:[{t:this.shape_62},{t:this.shape_41,p:{x:51.975,y:104.125}},{t:this.shape_63}]},2).to({state:[{t:this.shape_62},{t:this.shape_41,p:{x:51.975,y:104.125}},{t:this.shape_63},{t:this.shape_64}]},2).to({state:[{t:this.shape_62},{t:this.shape_41,p:{x:51.975,y:104.125}},{t:this.shape_63},{t:this.shape_64},{t:this.shape_65}]},2).to({state:[{t:this.shape_62},{t:this.shape_41,p:{x:51.975,y:104.125}},{t:this.shape_63},{t:this.shape_64},{t:this.shape_65},{t:this.shape_66}]},2).to({state:[{t:this.shape_62},{t:this.shape_41,p:{x:51.975,y:104.125}},{t:this.shape_63},{t:this.shape_64},{t:this.shape_65},{t:this.shape_66},{t:this.shape_67,p:{x:139.125}}]},2).to({state:[{t:this.shape_62},{t:this.shape_41,p:{x:51.975,y:104.125}},{t:this.shape_63},{t:this.shape_64},{t:this.shape_65},{t:this.shape_66},{t:this.shape_67,p:{x:139.125}},{t:this.shape_68}]},2).to({state:[{t:this.shape_62},{t:this.shape_41,p:{x:51.975,y:104.125}},{t:this.shape_63},{t:this.shape_64},{t:this.shape_65},{t:this.shape_66},{t:this.shape_70},{t:this.shape_68},{t:this.shape_69},{t:this.shape_67,p:{x:199.475}}]},2).to({state:[{t:this.shape_62},{t:this.shape_41,p:{x:51.975,y:104.125}},{t:this.shape_63},{t:this.shape_64},{t:this.shape_65},{t:this.shape_66},{t:this.shape_70},{t:this.shape_68},{t:this.shape_69},{t:this.shape_67,p:{x:199.475}},{t:this.shape_71},{t:this.shape_42,p:{x:227.2,y:104.25}}]},2).to({state:[]},37).wait(26));

	// mouth
	this.instance = new lib.mouth_1();
	this.instance.setTransform(110.25,187.3);
	this.instance._off = true;

	this.instance_1 = new lib.Tween19("synched",0);
	this.instance_1.setTransform(110.25,187.3);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(134).to({_off:false},0).to({_off:true,mode:"synched",startPosition:0},14).wait(16).to({_off:false,x:110.4,y:190},12).to({y:191.25},11).to({x:109.95,y:188.1},14).to({y:190.65},14).to({x:110.4,y:190},3).to({y:191.25},11).to({x:109.95,y:188.1},14).to({y:190.65},14).to({startPosition:0},3).to({x:195.65,y:183.6},19).to({x:284.6,y:191.15},21).to({x:363.15,y:191},19).to({x:445.85,y:190.85},20).to({_off:true,x:532.7,y:196.85},20).to({_off:false},45).to({x:533.5,y:201.7},5).to({x:532.7,y:196.85},15).to({rotation:5.903,x:554.7,y:203.8},20).to({regX:0.1,regY:0.1,rotation:8.7977,x:566.75,y:211.25},15).to({scaleX:0.9999,scaleY:0.9999,rotation:7.542,x:561.9,y:208.6},20).to({regX:0.2,regY:0.2,rotation:-0.4249,x:532.15,y:205.1},20).to({rotation:-0.32,x:532.3,y:201.9},25).to({regX:0.3,rotation:-0.2571,x:532.45,y:199.95},15).to({regX:0.4,regY:0.3,rotation:-0.1941,x:532.6,y:198.05},15).to({regY:0.4,rotation:-0.1093,x:532.65,y:195.5},20).to({scaleX:1,scaleY:1,rotation:-0.0227,x:532.75,y:192.8},20).to({_off:true,regX:0,regY:0,rotation:0,x:532.7,y:192},5).to({_off:false},44).wait(14).to({skewY:180,x:493.2},0).to({startPosition:0},8).to({startPosition:0},9).to({startPosition:0},10).to({startPosition:0},10).to({startPosition:0},10).to({startPosition:0},10).to({startPosition:0},5).to({x:402.35},10).to({x:311.5},10).to({x:220.65},10).to({_off:true,x:180.15},10).to({_off:false},18).wait(63));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(134).to({_off:false},14).to({x:111.45,y:189.4,startPosition:6},16).to({_off:true,x:110.4,y:190,startPosition:0},12).wait(163).to({_off:false,x:532.7,y:196.85},20).to({_off:true},45).wait(190).to({_off:false,y:192},5).to({_off:true},44).wait(106).to({_off:false,skewY:180,x:180.15},10).to({_off:true},18).wait(63));

	// pupil_right
	this.instance_2 = new lib.pupil();
	this.instance_2.setTransform(106.9,165.45);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween20("synched",0);
	this.instance_3.setTransform(106.9,165.45);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(134).to({_off:false},0).to({_off:true,mode:"synched",startPosition:0},14).wait(105).to({_off:false,x:108.1,y:166.3},7).to({x:193,y:160.55},19).to({x:282.15,y:167.75},21).to({x:360.9,y:167.3},19).to({x:443.8,y:166.8},20).to({_off:true,x:530.85,y:172.5},20).wait(481));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(134).to({_off:false},14).to({x:108.1,y:166.3},7).to({x:107,y:164.5},7).to({x:108.15,y:166.7},7).to({x:106.9,y:165.45},7).to({x:108.1,y:166.3},7).to({x:107,y:164.5},7).to({x:108.1,y:166.3},7).to({x:107,y:164.5},7).to({x:108.1,y:166.3},7).to({x:106.9,y:165.45},7).to({x:108.1,y:166.3},7).to({x:107,y:164.5},7).to({x:108.1,y:166.3},7).to({x:107,y:164.5},7).to({x:108.1,y:166.3},7).to({_off:true},7).wait(79).to({_off:false,x:530.85,y:172.5},20).to({startPosition:0},45).to({x:531.65,y:177.35},5).to({x:530.85,y:172.5},15).to({rotation:5.903,x:555.3,y:179.4},20).to({rotation:8.7977,x:568.4,y:188.6},15).to({regX:0.1,regY:0.1,scaleX:0.9999,scaleY:0.9999,rotation:7.542,x:563.05,y:185.95},20).to({rotation:-0.4249,x:530.25,y:182.95},20).to({rotation:-0.32,x:530.4,y:179.8},25).to({rotation:-0.2571,x:530.5,y:177.6},15).to({regY:0.2,rotation:-0.1941,y:173.6},15).to({rotation:-0.1093,x:530.7,y:170.95},20).to({scaleX:1,scaleY:1,rotation:-0.0227,x:530.85,y:168.3},20).to({regX:0,regY:0,rotation:0,y:167.65},5).wait(58).to({skewY:180,x:495.05},0).to({startPosition:0},8).to({startPosition:0},9).to({startPosition:0},10).to({startPosition:0},10).to({startPosition:0},10).to({startPosition:0},10).to({startPosition:0},5).to({x:404.2},10).to({x:313.35},10).to({x:222.5},10).to({x:181.8,y:170},10).wait(81));

	// arm_left
	this.instance_4 = new lib.arm_left_1();
	this.instance_4.setTransform(76.25,280.3);
	this.instance_4._off = true;

	this.instance_5 = new lib.Tween21("synched",0);
	this.instance_5.setTransform(76.25,280.3);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(134).to({_off:false},0).to({_off:true,mode:"synched",startPosition:0},14).wait(105).to({_off:false,x:77.15,y:285.25},7).to({rotation:18.4808,x:144.25,y:271.95},19).to({regX:0.1,regY:0.1,rotation:-24.5979,x:274.4,y:287.55},21).to({regX:0.2,scaleX:0.9999,scaleY:0.9999,rotation:28.2756,x:308.55,y:279.65},19).to({regX:0.3,rotation:-10.8077,x:422.95,y:289.3},20).to({_off:true,regX:0,regY:0,scaleX:1,scaleY:1,rotation:0,x:499.9,y:291.45},20).wait(481));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(134).to({_off:false},14).to({x:77.15,y:285.25},7).to({x:77.75,y:279.7},7).to({x:78.35,y:283.9},7).to({x:76.25,y:280.3},7).to({x:77.15,y:285.25},7).to({x:77.75,y:279.7},7).to({x:77.15,y:285.25},7).to({x:77.75,y:279.7},7).to({x:77.15,y:285.25},7).to({x:76.25,y:280.3},7).to({x:77.15,y:285.25},7).to({x:77.75,y:279.7},7).to({x:77.15,y:285.25},7).to({x:77.75,y:279.7},7).to({x:77.15,y:285.25},7).to({_off:true},7).wait(79).to({_off:false,x:499.9,y:291.45},20).to({startPosition:0},45).to({y:301.95},5).to({y:291.45},15).to({regX:0.1,regY:0.1,rotation:-18.2989,x:528.5,y:299.3},20).to({regY:0.2,scaleX:0.9999,scaleY:0.9999,rotation:-39.2186,x:562.2,y:308.55},15).to({regX:0.2,scaleX:0.9998,scaleY:0.9998,rotation:-47.8249,x:557.55,y:291.35},20).to({regY:0.3,rotation:-64.5061,x:541.45,y:291.15},20).to({regY:0.4,rotation:-60.8695,x:542.35,y:285.85},25).to({regX:0.1,regY:0.5,rotation:-99.9124,x:552.6,y:256.05},15).to({regX:-0.1,scaleY:0.9113,rotation:-140.85,x:532.3,y:228.35},15).to({regX:-0.2,scaleY:0.9507,rotation:-140.4694,x:539.45,y:228.55},20).to({scaleY:0.9704,rotation:-84.2828,x:552.95,y:253.7},10).to({regX:-0.1,regY:0.6,scaleX:0.9999,scaleY:0.9901,rotation:-28.0947,x:521.5,y:282.1},10).to({regX:0,regY:0,scaleX:1,scaleY:1,rotation:0,x:499.9,y:286.6},5).wait(58).to({skewY:180,x:526},0).to({skewX:-15.2074,skewY:164.7926,x:537.25,y:287.45},8).to({skewX:18.234,skewY:198.234,x:509.8},9).to({skewX:-19.9557,skewY:160.0443,x:541.4,y:287},10).to({skewX:20.7148,skewY:200.7148,x:501.85,y:290.75},10).to({skewX:-15.9689,skewY:164.0311,x:539.7,y:291.6},10).to({skewX:-16.959,skewY:163.041,x:536.8,y:290.75},10).to({skewX:19.2384,skewY:199.2384,x:509.8,y:287.05},5).to({skewX:-13.9427,skewY:166.0573,x:448.05,y:288.7},10).to({skewX:22.248,skewY:202.248,x:323.95,y:285.35},10).to({skewX:-18.7142,skewY:161.2858,x:268,y:287.05},10).to({skewX:0,skewY:180,x:212.95,y:286.6},10).wait(81));

	// cup
	this.instance_6 = new lib.cuppsd("synched",0);
	this.instance_6.setTransform(765.85,350.1,0.2485,0.2485,0,0,0,33.2,45.7);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(319).to({_off:false},0).to({regX:33.4,x:682.15},20).to({regX:33,regY:45.5,x:598.35,y:350.05},20).wait(45).to({mode:"independent"},0).wait(5).to({mode:"synched",startPosition:0},0).wait(15).to({startPosition:0},0).wait(20).to({startPosition:0},0).wait(15).to({regY:45.9,rotation:37.1676,x:599.9,y:339.75},0).to({regX:33.4,scaleX:0.2484,scaleY:0.2484,rotation:17.4155,x:598.95,y:318.05},20).to({regX:33.5,regY:45.7,rotation:10.7046,x:586.55,y:307.05},20).to({startPosition:0},25).to({regY:46,rotation:-18.4906,x:600.1,y:239.65},15).to({rotation:-83.0989,x:554.6,y:193.85},15).to({regX:33.3,regY:46.1,rotation:-73.3962,x:560.75,y:187.7},20).to({regX:33.2,regY:46.4,scaleX:0.2485,scaleY:0.2485,rotation:-14.678,x:628.1,y:359.55},20).to({regX:33,regY:45.5,rotation:69.4917,x:636.85,y:351.3},5).to({rotation:94.4592,x:676.35,y:367.4},5).to({_off:true},1).wait(235));

	// body
	this.instance_7 = new lib.body_1();
	this.instance_7.setTransform(89,261.85);
	this.instance_7._off = true;

	this.instance_8 = new lib.Tween22("synched",0);
	this.instance_8.setTransform(89,261.85);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(134).to({_off:false},0).to({_off:true,mode:"synched",startPosition:0},14).wait(105).to({_off:false,x:90.2,y:263.95},7).to({x:174.7,y:257.75},19).to({x:263.95,y:265.1},21).to({x:342.8,y:264.75},19).to({x:425.8,y:264.35},20).to({_off:true,x:512.95,y:270.15},20).wait(481));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(134).to({_off:false},14).to({x:90.2,y:263.95},7).to({x:89,y:261.85},7).to({x:90.2,y:263.95},7).to({x:89,y:261.85},7).to({x:90.2,y:263.95},7).to({x:89,y:261.85},7).to({x:90.2,y:263.95},7).to({x:89,y:261.85},7).to({x:90.2,y:263.95},7).to({x:89,y:261.85},7).to({x:90.2,y:263.95},7).to({x:89,y:261.85},7).to({x:90.2,y:263.95},7).to({x:89,y:261.85},7).to({x:90.2,y:263.95},7).to({_off:true},7).wait(79).to({_off:false,x:512.95,y:270.15},20).to({startPosition:0},45).to({x:513.75,y:275},5).to({x:512.95,y:270.15},15).to({regY:0.1,rotation:5.903,x:527.45,y:274.75},20).to({regX:0.1,rotation:8.7977,x:536,y:280.6},15).to({scaleX:0.9999,scaleY:0.9999,rotation:7.542,x:532.7,y:278.45},20).to({regX:0.2,rotation:-0.4249,x:512.95,y:278.15},20).to({regY:0.2,rotation:-0.32,x:512.9,y:275.05},25).to({regX:0.3,rotation:-0.2571,x:513,y:273.15},15).to({rotation:-0.1941,x:513.05,y:271.2},15).to({rotation:-0.1093,x:513,y:268.65},20).to({scaleX:1,scaleY:1,rotation:-0.0227,y:265.95},20).to({regX:0,regY:0,rotation:0,x:512.95,y:265.3},5).wait(58).to({skewY:180},0).to({startPosition:0},8).to({startPosition:0},9).to({startPosition:0},10).to({startPosition:0},10).to({startPosition:0},10).to({startPosition:0},10).to({startPosition:0},5).to({x:422.1},10).to({x:331.25},10).to({x:240.4},10).to({x:199.9},10).wait(81));

	// leg_left
	this.instance_9 = new lib.leg_left_1();
	this.instance_9.setTransform(86.85,413.95);
	this.instance_9._off = true;

	this.instance_10 = new lib.Tween23("synched",0);
	this.instance_10.setTransform(86.85,413.95);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(134).to({_off:false},0).to({_off:true,mode:"synched",startPosition:0},14).wait(105).to({_off:false},7).to({rotation:23.9743,x:148.7,y:409.05},19).to({regX:0.1,regY:0.1,rotation:-25.0584,x:296.7,y:405.25},21).to({scaleX:0.9999,scaleY:0.9999,rotation:27.994,x:313.85,y:409.65},19).to({regX:0.2,regY:0.4,rotation:-12.7508,x:451.15,y:409},20).to({_off:true,regX:0,regY:0,scaleX:1,scaleY:1,rotation:0,x:509.6,y:420.15},20).wait(481));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(134).to({_off:false},14).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({_off:true},7).wait(79).to({_off:false,x:509.6,y:420.15},20).to({startPosition:0},45).to({x:503.95},5).to({x:509.6},15).to({startPosition:0},20).to({startPosition:0},15).to({startPosition:0},20).to({startPosition:0},20).to({startPosition:0},25).to({startPosition:0},15).to({startPosition:0},15).to({startPosition:0},20).to({startPosition:0},20).to({startPosition:0},5).wait(58).to({skewY:180,x:516.3},0).to({skewX:-15.9526,skewY:164.0474,x:538.8,y:413.9},8).to({skewX:19.7466,skewY:199.7466,x:493.45,y:415.15},9).to({skewX:-25.7455,skewY:154.2545,x:541.7,y:417.2},10).to({skewX:20.7352,skewY:200.7352,x:489.65,y:415.15},10).to({skewX:-22.1943,skewY:157.8057,x:530.85,y:417.65},10).to({skewX:-14.2231,skewY:165.7769,x:532.95,y:419.3},10).to({skewX:31.7421,skewY:211.7421,x:490.1,y:414.75},5).to({skewX:-30.4768,skewY:149.5232,x:449.6,y:419.75},10).to({skewX:14.9956,skewY:194.9956,x:310.05,y:415.15},10).to({skewX:-37.2233,skewY:142.7767,x:272.9,y:417.7},10).to({skewX:0,skewY:180,x:203.25,y:420.15},10).wait(81));

	// leg_right
	this.instance_11 = new lib.leg_right_1();
	this.instance_11.setTransform(103.85,410.95);
	this.instance_11._off = true;

	this.instance_12 = new lib.Tween24("synched",0);
	this.instance_12.setTransform(103.85,410.95);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(134).to({_off:false},0).to({_off:true,mode:"synched",startPosition:0},14).wait(105).to({_off:false},7).to({rotation:-24.4517,x:210.3,y:404.1},19).to({scaleX:0.9999,scaleY:0.9999,rotation:28.7118,x:237.45,y:411},21).to({regX:0.1,regY:0.1,rotation:-36.2442,x:377.85,y:402.8},19).to({rotation:13.8316,x:405.8,y:409.35},20).to({_off:true,regX:0,regY:0,scaleX:1,scaleY:1,rotation:0,x:526.6,y:417.15},20).wait(481));
	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(134).to({_off:false},14).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({startPosition:0},7).to({_off:true},7).wait(79).to({_off:false,x:526.6,y:417.15},20).to({startPosition:0},45).to({x:529,y:417.95},5).to({x:526.6,y:417.15},15).to({startPosition:0},20).to({startPosition:0},15).to({startPosition:0},20).to({startPosition:0},20).to({startPosition:0},25).to({startPosition:0},15).to({startPosition:0},15).to({startPosition:0},20).to({startPosition:0},20).to({startPosition:0},5).wait(58).to({skewY:180,x:499.3},0).to({skewX:13.968,skewY:193.968,x:480.15,y:411.3},8).to({skewX:-15.9462,skewY:164.0538,x:532.6,y:412.6},9).to({skewX:26.6917,skewY:206.6917,x:477.25,y:407.6},10).to({skewX:-34.4597,skewY:145.5403,x:541.3,y:416.75},10).to({skewX:11.7314,skewY:191.7314,x:486},10).to({skewX:18.467,skewY:198.467,x:481.85,y:413.4},10).to({skewX:-23.9696,skewY:156.0304,x:528.4,y:408.8},5).to({skewX:28.7371,skewY:208.7371,x:389.75,y:413.8},10).to({skewX:-34.4992,skewY:145.5008,x:359.2,y:417.55},10).to({skewX:20.7053,skewY:200.7053,x:205.1,y:418.8},10).to({skewX:0,skewY:180,x:186.25,y:417.15},10).wait(81));

	// arm_right
	this.instance_13 = new lib.arm_right_1();
	this.instance_13.setTransform(92.25,281.3);
	this.instance_13._off = true;

	this.instance_14 = new lib.Tween25("synched",0);
	this.instance_14.setTransform(92.25,281.3);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(134).to({_off:false},0).to({_off:true,mode:"synched",startPosition:0},14).wait(105).to({_off:false,regY:-46.5,x:93.45,y:236.9},7).to({rotation:-27.8902,x:188.9,y:239.6},19).to({regX:0.1,regY:-46.4,scaleX:0.9999,scaleY:0.9999,rotation:34.8713,x:257.85,y:245},21).to({rotation:-35.8404,x:341.75,y:242.45},19).to({regY:-46.3,rotation:21.3286,x:427,y:263},20).to({_off:true,regX:0,regY:0,scaleX:1,scaleY:1,rotation:0,x:516.2,y:289.6},20).wait(481));
	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(134).to({_off:false},14).to({x:93.45,y:283.4},7).to({x:92.25,y:281.3},7).to({x:93.45,y:283.4},7).to({x:92.25,y:281.3},7).to({x:93.45,y:283.4},7).to({x:92.25,y:281.3},7).to({x:93.45,y:283.4},7).to({x:92.25,y:281.3},7).to({x:93.45,y:283.4},7).to({x:92.25,y:281.3},7).to({x:93.45,y:283.4},7).to({x:92.25,y:281.3},7).to({x:93.45,y:283.4},7).to({x:92.25,y:281.3},7).to({regX:1.3,regY:-1.3,x:94.75,y:282.1},7).to({_off:true,regX:0,regY:-46.5,x:93.45,y:236.9},7).wait(79).to({_off:false,regY:0,x:516.2,y:289.6},20).to({startPosition:0},45).to({x:517,y:294.45},5).to({x:516.2,y:289.6},15).to({rotation:5.903,x:528.7,y:294.35},20).to({regX:0.1,regY:0.1,rotation:8.7977,x:536.2,y:300.35},15).to({regX:0.2,regY:0,scaleX:0.9999,scaleY:0.9999,rotation:7.542,x:533.45,y:298.1},20).to({regY:0.1,rotation:-84.6989,x:547.85,y:260.95},20).to({regX:0.1,scaleX:0.9998,scaleY:0.9998,rotation:-80.2453,x:544.6,y:259.75},25).to({regX:0.2,regY:0.2,rotation:-26.4884,x:532.75,y:286.45},15).to({regX:0.1,rotation:-19.8669,x:528.6,y:286},15).to({regX:0.2,regY:0.3,rotation:-11.0368,x:523.2,y:285.45},20).to({scaleX:1,scaleY:1,rotation:-2.2082,x:517.6,y:284.95},20).to({regX:0,regY:0,rotation:0,x:516.2,y:284.75},5).wait(58).to({skewY:180,x:509.7},0).to({skewX:31.4752,skewY:211.4752,x:492.65,y:281.45},8).to({regY:0.1,skewX:-32.9755,skewY:147.0245,x:540.6,y:281.85},9).to({regY:0,skewX:44.4857,skewY:224.4857,x:478.9,y:286},10).to({skewX:-38.5197,skewY:141.4803,x:545.05,y:277.6},10).to({skewX:25.9934,skewY:205.9934,x:484.75,y:292.7},10).to({regX:-0.1,regY:-0.1,skewX:32.423,skewY:212.423,x:482.8,y:301.65},10).to({regY:0.1,skewX:-33.7946,skewY:146.2054,x:541.45,y:289.3},5).to({skewX:30.7724,skewY:210.7724,x:390.8,y:294.85},10).to({skewX:-30.4577,skewY:149.5423,x:359.85,y:275.6},10).to({regY:-0.1,skewX:37.0203,skewY:217.0203,x:206.5,y:288.95},10).to({regX:0,regY:0,skewX:0,skewY:180,x:196.65,y:284.75},10).wait(81));

	// background_layer_office
	this.mainContent = new lib.office_background("synched",0);
	this.mainContent.name = "mainContent";
	this.mainContent.setTransform(471.95,227,0.2785,0.2785,0,0,0,0.6,0.2);
	this.mainContent._off = true;

	this.timeline.addTween(cjs.Tween.get(this.mainContent).wait(134).to({_off:false},0).wait(126).to({startPosition:0},0).to({regX:0.7,regY:0.4,x:395.35,y:227.05},19).to({regX:0.9,regY:0.6,x:310.75},21).to({x:234.15},19).to({x:153.55},20).to({regX:0.6,regY:0.2,x:72.9,y:227},20).wait(69).to({startPosition:0},0).wait(171).to({startPosition:0},0).wait(58).to({startPosition:0},0).to({x:562.85},62).wait(120).to({startPosition:0},0).wait(1));

	// intro_text
	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-3.2,2.6).lineTo(-2,-2.6).lineTo(3.3,-2.6).lineTo(2,2.6).closePath();
	this.shape_72.setTransform(565.8,452.575);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-3.3,2.6).lineTo(-2.1,-2.6).lineTo(3.2,-2.6).lineTo(2.1,2.6).closePath();
	this.shape_73.setTransform(553.15,452.575);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-3.3,2.6).lineTo(-2,-2.6).lineTo(3.3,-2.6).lineTo(2,2.6).closePath();
	this.shape_74.setTransform(540.5,452.575);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.beginFill("#CCCCCC").beginStroke().moveTo(3.6,10.8).lineTo(6.6,-2.3).curveTo(7.1,-4.3,7.1,-4.9).curveTo(7.1,-5.8,6.5,-6.4).curveTo(5.8,-7.1,4.9,-7).curveTo(2.4,-7,-1.6,-4.2).lineTo(-4.2,7.2).lineTo(-1,7.2).lineTo(-1.9,10.8).lineTo(-11.5,10.8).lineTo(-10.7,7.2).lineTo(-8.2,7.2).lineTo(-5.1,-6.9).lineTo(-7.9,-6.9).lineTo(-7,-10.5).lineTo(-0.3,-10.5).lineTo(-0.8,-8).curveTo(3.2,-10.8,6.2,-10.8).curveTo(8.6,-10.8,9.9,-9.3).curveTo(11.2,-7.7,11.1,-6).curveTo(11.2,-4.5,10.5,-1.9).lineTo(8.4,7.2).lineTo(11.6,7.2).lineTo(10.7,10.8).closePath();
	this.shape_75.setTransform(522.2,444.35);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-0.8,10.8).lineTo(-1.2,-3.3).lineTo(-10.2,10.8).lineTo(-13.6,10.8).lineTo(-14.3,-7.2).lineTo(-16.7,-7.2).lineTo(-15.9,-10.8).lineTo(-8.1,-10.8).lineTo(-8.9,-7.2).lineTo(-10.9,-7.2).lineTo(-10.3,5.3).lineTo(-2.3,-7.2).lineTo(-5,-7.2).lineTo(-4.2,-10.8).lineTo(5.1,-10.8).lineTo(4.3,-7.2).lineTo(1.9,-7.2).lineTo(2.5,5.3).lineTo(10.5,-7.2).lineTo(8,-7.2).lineTo(8.8,-10.8).lineTo(16.8,-10.8).lineTo(15.9,-7.2).lineTo(14.2,-7.2).lineTo(2.7,10.8).closePath();
	this.shape_76.setTransform(496.5,444.7);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-8.5,8.8).curveTo(-11.1,6.4,-11.1,2.1).curveTo(-11.1,-1.2,-9.6,-4.2).curveTo(-8.1,-7.3,-5,-9.2).curveTo(-1.9,-11.2,1.9,-11.2).curveTo(6.3,-11.2,8.7,-8.6).curveTo(11.1,-6.1,11.1,-2.1).curveTo(11.1,1,9.6,4.3).curveTo(8.1,7.6,4.9,9.4).curveTo(1.7,11.2,-1.8,11.2).curveTo(-5.9,11.2,-8.5,8.8).closePath().moveTo(-4.5,-4.6).curveTo(-6.7,-1.9,-6.7,1.7).curveTo(-6.7,7.4,-1.4,7.4).curveTo(2.4,7.4,4.6,4.6).curveTo(6.9,1.7,6.9,-2.1).curveTo(6.9,-4.5,5.4,-5.9).curveTo(3.8,-7.4,1.3,-7.4).curveTo(-2.3,-7.4,-4.5,-4.6).closePath();
	this.shape_77.setTransform(465.275,444.525);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-4.3,13.8).curveTo(-5.5,12.7,-5.5,10.6).curveTo(-5.5,9.1,-4.3,4.2).lineTo(-2.4,-3.3).lineTo(-4.8,-3.3).lineTo(-4,-6.9).lineTo(-1.6,-6.9).lineTo(-0.5,-11.1).lineTo(4.3,-14.9).lineTo(2.4,-6.9).lineTo(5.5,-6.9).lineTo(4.6,-3.3).lineTo(1.5,-3.3).lineTo(-0.9,6.7).curveTo(-1.5,9.4,-1.5,10).curveTo(-1.5,11.6,0.1,11.5).curveTo(1.2,11.6,3.4,10.4).lineTo(2.5,14).curveTo(0.5,15,-1.4,15).curveTo(-3.2,15,-4.3,13.8).closePath();
	this.shape_78.setTransform(447.525,440.8);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-9.6,15.5).lineTo(-8.8,11.9).lineTo(-6.4,11.9).lineTo(-3.1,-2.1).lineTo(-6.2,-2.1).lineTo(-5.3,-5.7).lineTo(-2.2,-5.7).lineTo(-1.9,-7.2).curveTo(-0.8,-11.7,0.9,-13.6).curveTo(2.7,-15.6,5.3,-15.5).curveTo(7.5,-15.5,9.6,-14.2).lineTo(8,-11.5).curveTo(6.8,-12.2,5.7,-12.3).curveTo(4.4,-12.2,3.6,-11.3).curveTo(2.8,-10.2,2,-6.8).lineTo(1.8,-5.7).lineTo(4.5,-5.7).lineTo(3.7,-2.1).lineTo(0.9,-2.1).lineTo(-2.4,11.9).lineTo(0.6,11.9).lineTo(-0.2,15.5).closePath();
	this.shape_79.setTransform(424.625,439.6);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-8.5,8.8).curveTo(-11.1,6.4,-11.1,2.1).curveTo(-11.1,-1.2,-9.6,-4.2).curveTo(-8.1,-7.3,-5,-9.2).curveTo(-1.9,-11.2,1.9,-11.2).curveTo(6.3,-11.2,8.7,-8.6).curveTo(11.1,-6.1,11.1,-2.1).curveTo(11.1,1,9.6,4.3).curveTo(8.1,7.6,4.9,9.4).curveTo(1.7,11.2,-1.8,11.2).curveTo(-5.9,11.2,-8.5,8.8).closePath().moveTo(-4.5,-4.6).curveTo(-6.7,-1.9,-6.7,1.7).curveTo(-6.7,7.4,-1.4,7.4).curveTo(2.4,7.4,4.6,4.6).curveTo(6.9,1.7,6.9,-2.1).curveTo(6.9,-4.5,5.4,-5.9).curveTo(3.8,-7.4,1.3,-7.4).curveTo(-2.3,-7.4,-4.5,-4.6).closePath();
	this.shape_80.setTransform(402.875,444.525);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-4.3,13.8).curveTo(-5.5,12.7,-5.5,10.6).curveTo(-5.5,9.1,-4.3,4.2).lineTo(-2.4,-3.3).lineTo(-4.8,-3.3).lineTo(-4,-6.9).lineTo(-1.6,-6.9).lineTo(-0.5,-11.1).lineTo(4.3,-14.9).lineTo(2.4,-6.9).lineTo(5.5,-6.9).lineTo(4.6,-3.3).lineTo(1.5,-3.3).lineTo(-0.9,6.7).curveTo(-1.5,9.4,-1.5,10).curveTo(-1.5,11.6,0.1,11.5).curveTo(1.2,11.6,3.4,10.4).lineTo(2.5,14).curveTo(0.5,15,-1.4,15).curveTo(-3.2,15,-4.3,13.8).closePath();
	this.shape_81.setTransform(373.875,440.8);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-10.3,10.8).lineTo(-9.4,7.2).lineTo(-6.7,7.2).lineTo(-3.5,-6.9).lineTo(-6.8,-6.9).lineTo(-5.9,-10.5).lineTo(1,-10.5).lineTo(-0.4,-4.4).curveTo(1.6,-7.8,3.9,-9.3).curveTo(6.2,-10.8,9.3,-10.8).lineTo(10.3,-10.8).lineTo(9.3,-6.9).lineTo(8.3,-7).curveTo(5.5,-7,3.5,-5.7).curveTo(1.4,-4.4,0.2,-2.2).curveTo(-1,-0,-1.8,3.4).lineTo(-2.7,7.2).lineTo(0.9,7.2).lineTo(0,10.8).closePath();
	this.shape_82.setTransform(357.375,444.35);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-8,9.4).curveTo(-9.9,7.7,-9.9,4.9).curveTo(-9.9,1.7,-7.3,-0.4).curveTo(-4.8,-2.5,-0.9,-2.5).curveTo(2,-2.5,5,-1).lineTo(5.6,-3.3).lineTo(5.8,-5).curveTo(5.8,-6.5,4.7,-7.2).curveTo(3.6,-8,2.1,-8).curveTo(-1.1,-8,-3.2,-4.9).lineTo(-6.5,-6.4).curveTo(-5.2,-8.4,-2.7,-9.8).curveTo(-0.2,-11.1,2.8,-11.1).curveTo(6.1,-11.1,8,-9.6).curveTo(9.8,-8.2,9.8,-5.9).curveTo(9.8,-4.5,9.3,-2.3).lineTo(7.3,7.1).lineTo(9.9,7.1).lineTo(9.2,10.7).lineTo(2.7,10.7).lineTo(3.4,7.8).curveTo(0.3,11.1,-3.5,11.1).curveTo(-6,11.1,-8,9.4).closePath().moveTo(-4.5,1.8).curveTo(-6,3,-6,4.8).curveTo(-6,6.2,-5,7.1).curveTo(-3.9,7.9,-2.3,7.9).curveTo(0.3,7.9,3.6,5.1).lineTo(4.4,1.9).lineTo(3.4,1.5).curveTo(1.2,0.6,-0.6,0.6).curveTo(-3,0.6,-4.5,1.8).closePath();
	this.shape_83.setTransform(335.425,444.4);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-14.4,15.6).lineTo(-13.6,12).lineTo(-11,12).lineTo(-5.4,-11.7).lineTo(-8.4,-11.7).lineTo(-7.6,-15.3).lineTo(-0.6,-15.3).lineTo(-1.2,-12.6).curveTo(2,-15.6,5.9,-15.6).curveTo(9.5,-15.6,12,-12.9).curveTo(14.4,-10.3,14.4,-6.1).curveTo(14.4,-1,11,2.8).curveTo(7.6,6.6,2.6,6.6).curveTo(-2,6.6,-4.9,2.9).lineTo(-7.1,12).lineTo(-3.7,12).lineTo(-4.6,15.6).closePath().moveTo(-1.1,-9).curveTo(-3.5,-5.9,-3.5,-2.6).curveTo(-3.5,0.1,-1.9,1.7).curveTo(-0.3,3.2,2.1,3.2).curveTo(5.7,3.2,8,0.3).curveTo(10.3,-2.5,10.3,-6.2).curveTo(10.3,-8.9,8.8,-10.5).curveTo(7.2,-12,4.7,-11.9).curveTo(1.2,-11.9,-1.1,-9).closePath();
	this.shape_84.setTransform(307.95,449.15);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-13.9,15.4).lineTo(-13,11.8).lineTo(-9,11.8).lineTo(-4.8,5.7).lineTo(-5.8,-11.9).lineTo(-8.3,-11.9).lineTo(-7.4,-15.4).lineTo(1,-15.4).lineTo(0.2,-11.9).lineTo(-2.1,-11.9).lineTo(-1.3,0.7).lineTo(7.3,-11.9).lineTo(4.4,-11.9).lineTo(5.2,-15.4).lineTo(13.9,-15.4).lineTo(13.1,-11.9).lineTo(11.1,-11.9).lineTo(-7.6,15.4).closePath();
	this.shape_85.setTransform(273.5,449.325);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-10.8,12.8).curveTo(-13.1,10.1,-13.1,6).curveTo(-13.1,0.9,-9.6,-2.9).curveTo(-6.1,-6.8,-1.3,-6.8).curveTo(3.2,-6.8,6.2,-2.9).lineTo(8.3,-11.9).lineTo(5,-11.9).lineTo(5.9,-15.4).lineTo(13.1,-15.4).lineTo(6.8,11.5).lineTo(9.7,11.5).lineTo(8.9,15.1).lineTo(2,15.1).lineTo(2.6,12.5).curveTo(-0.4,15.5,-4.5,15.4).curveTo(-8.4,15.5,-10.8,12.8).closePath().moveTo(-6.6,-0.4).curveTo(-9,2.4,-9,5.9).curveTo(-9,8.6,-7.5,10.2).curveTo(-5.9,11.9,-3.4,11.9).curveTo(-0.1,11.9,2.3,9.1).curveTo(4.8,6.2,4.8,2.4).curveTo(4.8,-0.4,3.1,-1.8).curveTo(1.4,-3.3,-1,-3.3).curveTo(-4.3,-3.3,-6.6,-0.4).closePath();
	this.shape_86.setTransform(250.1,440.05);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-8.2,8.6).curveTo(-10.8,5.9,-10.8,1.8).curveTo(-10.7,-1.5,-9,-4.5).curveTo(-7.4,-7.5,-4.5,-9.3).curveTo(-1.7,-11.2,1.6,-11.2).curveTo(5.7,-11.2,8.2,-8.6).curveTo(10.7,-5.9,10.8,-1.7).curveTo(10.8,-0.3,10.5,1).lineTo(-6.3,1).lineTo(-6.4,2.2).curveTo(-6.4,4.8,-4.9,6.3).curveTo(-3.4,7.7,-1.1,7.7).curveTo(2.1,7.7,4.3,4.7).lineTo(8.4,6.5).curveTo(7.2,8.6,4.5,9.9).curveTo(1.9,11.2,-1,11.2).curveTo(-5.7,11.2,-8.2,8.6).closePath().moveTo(-2.6,-6.2).curveTo(-4.5,-4.7,-5.4,-2).lineTo(6.7,-2).lineTo(6.7,-3.1).curveTo(6.7,-4.9,5.4,-6.3).curveTo(3.9,-7.8,1.7,-7.8).curveTo(-0.7,-7.8,-2.6,-6.2).closePath();
	this.shape_87.setTransform(223.15,444.525);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-8.2,8.6).curveTo(-10.8,5.9,-10.7,1.8).curveTo(-10.7,-1.5,-9,-4.5).curveTo(-7.4,-7.5,-4.5,-9.3).curveTo(-1.7,-11.2,1.6,-11.2).curveTo(5.7,-11.2,8.2,-8.6).curveTo(10.7,-5.9,10.8,-1.7).curveTo(10.8,-0.3,10.4,1).lineTo(-6.2,1).lineTo(-6.4,2.2).curveTo(-6.4,4.8,-4.9,6.3).curveTo(-3.4,7.7,-1.1,7.7).curveTo(2.1,7.7,4.3,4.7).lineTo(8.4,6.5).curveTo(7.2,8.6,4.6,9.9).curveTo(1.9,11.2,-1,11.2).curveTo(-5.7,11.2,-8.2,8.6).closePath().moveTo(-2.6,-6.2).curveTo(-4.5,-4.7,-5.4,-2).lineTo(6.7,-2).lineTo(6.7,-3.1).curveTo(6.7,-4.9,5.4,-6.3).curveTo(3.9,-7.8,1.7,-7.8).curveTo(-0.7,-7.8,-2.6,-6.2).closePath();
	this.shape_88.setTransform(198.3,444.525);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-6.3,9.2).lineTo(-6.6,10.6).lineTo(-10.2,10.6).lineTo(-8.8,4.7).lineTo(-5.2,4.7).curveTo(-5.2,6.2,-3.9,7).curveTo(-2.6,7.8,-0.5,7.8).curveTo(1.5,7.8,2.6,7).curveTo(3.6,6.2,3.6,5.1).curveTo(3.6,4,2.7,3.2).curveTo(1.8,2.4,-0.6,1.5).curveTo(-2.9,0.6,-4.1,-0.1).curveTo(-5.3,-0.9,-6.1,-2.1).curveTo(-6.9,-3.4,-6.9,-4.8).curveTo(-6.9,-7.3,-4.9,-9.1).curveTo(-2.8,-11,0.8,-11).curveTo(4.1,-11,6.3,-9.1).lineTo(6.7,-10.6).lineTo(10.2,-10.6).lineTo(8.9,-4.7).lineTo(5.3,-4.7).curveTo(5.2,-6.4,3.8,-7).curveTo(2.4,-7.7,0.7,-7.7).curveTo(-1.1,-7.7,-2,-7).curveTo(-3.1,-6.3,-3.1,-5.3).curveTo(-3.1,-4.4,-2.5,-3.9).curveTo(-1.9,-3.3,-0.2,-2.6).curveTo(4.5,-0.8,6.1,0.8).curveTo(7.6,2.5,7.6,4.8).curveTo(7.6,7.6,5.4,9.3).curveTo(3.3,11,-0.9,11).curveTo(-4.7,11,-6.3,9.2).closePath();
	this.shape_89.setTransform(175.875,444.525);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-8.2,8.6).curveTo(-10.8,5.9,-10.8,1.8).curveTo(-10.8,-1.5,-9.1,-4.5).curveTo(-7.4,-7.5,-4.6,-9.3).curveTo(-1.8,-11.2,1.6,-11.2).curveTo(5.7,-11.2,8.2,-8.6).curveTo(10.7,-5.9,10.7,-1.7).curveTo(10.7,-0.3,10.4,1).lineTo(-6.3,1).lineTo(-6.4,2.2).curveTo(-6.4,4.8,-4.9,6.3).curveTo(-3.4,7.7,-1.1,7.7).curveTo(2.1,7.7,4.3,4.7).lineTo(8.5,6.5).curveTo(7.2,8.6,4.5,9.9).curveTo(2,11.2,-1.1,11.2).curveTo(-5.6,11.2,-8.2,8.6).closePath().moveTo(-2.6,-6.2).curveTo(-4.5,-4.7,-5.5,-2).lineTo(6.7,-2).lineTo(6.8,-3.1).curveTo(6.7,-4.9,5.3,-6.3).curveTo(3.9,-7.8,1.6,-7.8).curveTo(-0.7,-7.8,-2.6,-6.2).closePath();
	this.shape_90.setTransform(143,444.525);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.beginFill("#CCCCCC").beginStroke().moveTo(3.6,15.3).lineTo(6.4,3.5).curveTo(7.1,0.3,7.1,-0.4).curveTo(7.1,-2.6,4.9,-2.6).curveTo(2.7,-2.6,-1.5,0.3).lineTo(-4.2,11.7).lineTo(-1.1,11.7).lineTo(-1.9,15.3).lineTo(-11.6,15.3).lineTo(-10.8,11.7).lineTo(-8.3,11.7).lineTo(-2.6,-11.7).lineTo(-5.4,-11.7).lineTo(-4.6,-15.3).lineTo(2.2,-15.3).lineTo(-0.6,-3.5).curveTo(3.4,-6.3,6.3,-6.3).curveTo(8.7,-6.3,9.9,-4.8).curveTo(11.2,-3.3,11.2,-1.4).curveTo(11.2,0,10.3,3.8).lineTo(8.5,11.7).lineTo(11.6,11.7).lineTo(10.7,15.3).closePath();
	this.shape_91.setTransform(116.45,439.875);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-4.3,13.8).curveTo(-5.5,12.7,-5.5,10.6).curveTo(-5.5,9.1,-4.3,4.2).lineTo(-2.4,-3.3).lineTo(-4.8,-3.3).lineTo(-4,-6.9).lineTo(-1.6,-6.9).lineTo(-0.5,-11.1).lineTo(4.3,-14.9).lineTo(2.4,-6.9).lineTo(5.5,-6.9).lineTo(4.6,-3.3).lineTo(1.5,-3.3).lineTo(-0.9,6.7).curveTo(-1.5,9.4,-1.5,10).curveTo(-1.5,11.6,0.1,11.5).curveTo(1.2,11.6,3.4,10.4).lineTo(2.5,14).curveTo(0.5,15,-1.4,15).curveTo(-3.2,15,-4.3,13.8).closePath();
	this.shape_92.setTransform(100.575,440.8);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.beginFill("#CCCCCC").beginStroke().moveTo(3.6,10.8).lineTo(6.6,-2.2).curveTo(7.1,-4.3,7.1,-4.8).curveTo(7.1,-5.8,6.5,-6.5).curveTo(5.8,-7,4.9,-7.1).curveTo(2.4,-7.1,-1.6,-4.2).lineTo(-4.2,7.2).lineTo(-1,7.2).lineTo(-1.9,10.8).lineTo(-11.5,10.8).lineTo(-10.7,7.2).lineTo(-8.2,7.2).lineTo(-5.1,-6.9).lineTo(-7.9,-6.9).lineTo(-7,-10.4).lineTo(-0.3,-10.4).lineTo(-0.8,-8).curveTo(3.2,-10.8,6.2,-10.8).curveTo(8.6,-10.8,9.9,-9.2).curveTo(11.2,-7.7,11.1,-5.9).curveTo(11.2,-4.5,10.5,-2).lineTo(8.4,7.2).lineTo(11.6,7.2).lineTo(10.7,10.8).closePath();
	this.shape_93.setTransform(573.95,389.5);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-6.7,15.6).lineTo(-5.8,12).lineTo(-3.5,12).lineTo(-0.3,-2.2).lineTo(-3.3,-2.2).lineTo(-2.4,-5.7).lineTo(4.5,-5.7).lineTo(0.5,12).lineTo(3.6,12).lineTo(2.7,15.6).closePath().moveTo(2.5,-11.2).curveTo(1.7,-12,1.7,-13.1).curveTo(1.7,-14.1,2.5,-14.8).curveTo(3.2,-15.6,4.2,-15.6).curveTo(5.3,-15.6,6,-14.8).curveTo(6.7,-14.1,6.7,-13.1).curveTo(6.7,-12,6,-11.2).curveTo(5.2,-10.5,4.2,-10.5).curveTo(3.2,-10.5,2.5,-11.2).closePath();
	this.shape_94.setTransform(556.875,384.75);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-4.3,13.8).curveTo(-5.5,12.6,-5.5,10.6).curveTo(-5.5,9.1,-4.3,4.2).lineTo(-2.4,-3.4).lineTo(-4.8,-3.4).lineTo(-4,-6.9).lineTo(-1.6,-6.9).lineTo(-0.5,-11.2).lineTo(4.3,-15).lineTo(2.4,-6.9).lineTo(5.5,-6.9).lineTo(4.6,-3.4).lineTo(1.5,-3.4).lineTo(-0.9,6.7).curveTo(-1.5,9.4,-1.5,10.1).curveTo(-1.5,11.6,0.1,11.6).curveTo(1.2,11.6,3.4,10.3).lineTo(2.5,14).curveTo(0.5,15,-1.4,14.9).curveTo(-3.2,15,-4.3,13.8).closePath();
	this.shape_95.setTransform(534.025,385.95);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.beginFill("#CCCCCC").beginStroke().moveTo(3.6,15.3).lineTo(6.4,3.5).curveTo(7.1,0.3,7.1,-0.4).curveTo(7.1,-2.6,4.9,-2.6).curveTo(2.7,-2.6,-1.5,0.3).lineTo(-4.2,11.7).lineTo(-1.1,11.7).lineTo(-1.9,15.3).lineTo(-11.6,15.3).lineTo(-10.8,11.7).lineTo(-8.3,11.7).lineTo(-2.6,-11.7).lineTo(-5.4,-11.7).lineTo(-4.6,-15.3).lineTo(2.2,-15.3).lineTo(-0.6,-3.5).curveTo(3.4,-6.3,6.3,-6.3).curveTo(8.6,-6.3,9.9,-4.8).curveTo(11.2,-3.3,11.2,-1.4).curveTo(11.2,0,10.3,3.8).lineTo(8.5,11.7).lineTo(11.6,11.7).lineTo(10.7,15.3).closePath();
	this.shape_96.setTransform(511.9,385.025);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-14.8,12.2).lineTo(-12.6,9.2).curveTo(-9.4,12.7,-5.1,12.7).curveTo(-1.7,12.7,0.2,10.5).curveTo(2.1,8.3,3.3,3.4).curveTo(0.1,6.4,-3.8,6.4).curveTo(-7.6,6.4,-10,3.8).curveTo(-12.4,1.2,-12.4,-3.1).curveTo(-12.5,-7.9,-8.9,-11.8).curveTo(-5.4,-15.8,-0.6,-15.8).curveTo(4.2,-15.8,6.9,-11.9).lineTo(7.8,-15.4).lineTo(14.7,-15.4).lineTo(13.8,-11.9).lineTo(11,-11.9).lineTo(7.3,3.4).curveTo(6.2,8,4.9,10.3).curveTo(3.6,12.8,1.1,14.3).curveTo(-1.4,15.8,-5.4,15.8).curveTo(-11.5,15.8,-14.8,12.2).closePath().moveTo(-6,-9.5).curveTo(-8.4,-6.8,-8.4,-3.2).curveTo(-8.4,-0.5,-6.9,1.1).curveTo(-5.3,2.8,-2.8,2.9).curveTo(0.9,2.9,3.2,-0.2).curveTo(5.5,-3.4,5.5,-6.9).curveTo(5.5,-9,4,-10.6).curveTo(2.5,-12.3,-0.1,-12.3).curveTo(-3.6,-12.2,-6,-9.5).closePath();
	this.shape_97.setTransform(488,394.5);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-6.7,15.6).lineTo(-5.8,12).lineTo(-3.5,12).lineTo(-0.3,-2.2).lineTo(-3.3,-2.2).lineTo(-2.4,-5.7).lineTo(4.5,-5.7).lineTo(0.5,12).lineTo(3.6,12).lineTo(2.7,15.6).closePath().moveTo(2.5,-11.2).curveTo(1.7,-12,1.7,-13.1).curveTo(1.7,-14.1,2.5,-14.8).curveTo(3.2,-15.6,4.2,-15.6).curveTo(5.3,-15.6,6,-14.8).curveTo(6.7,-14.1,6.7,-13.1).curveTo(6.7,-12,6,-11.2).curveTo(5.2,-10.5,4.2,-10.5).curveTo(3.2,-10.5,2.5,-11.2).closePath();
	this.shape_98.setTransform(467.775,384.75);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.beginFill("#CCCCCC").beginStroke().moveTo(3.6,10.8).lineTo(6.6,-2.2).curveTo(7.1,-4.3,7.1,-4.8).curveTo(7.1,-5.8,6.4,-6.5).curveTo(5.8,-7,4.9,-7.1).curveTo(2.4,-7.1,-1.7,-4.2).lineTo(-4.3,7.2).lineTo(-1,7.2).lineTo(-1.9,10.8).lineTo(-11.6,10.8).lineTo(-10.8,7.2).lineTo(-8.2,7.2).lineTo(-5.1,-6.9).lineTo(-7.9,-6.9).lineTo(-7,-10.4).lineTo(-0.2,-10.4).lineTo(-0.8,-8).curveTo(3.2,-10.8,6.2,-10.8).curveTo(8.6,-10.8,9.8,-9.2).curveTo(11.1,-7.7,11.1,-5.9).curveTo(11.1,-4.5,10.6,-2).lineTo(8.4,7.2).lineTo(11.6,7.2).lineTo(10.7,10.8).closePath();
	this.shape_99.setTransform(447.35,389.5);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-13.9,15.4).lineTo(-13,11.8).lineTo(-9,11.8).lineTo(-4.8,5.7).lineTo(-5.8,-11.9).lineTo(-8.3,-11.9).lineTo(-7.4,-15.4).lineTo(1,-15.4).lineTo(0.2,-11.9).lineTo(-2.1,-11.9).lineTo(-1.3,0.7).lineTo(7.3,-11.9).lineTo(4.4,-11.9).lineTo(5.2,-15.4).lineTo(13.9,-15.4).lineTo(13.1,-11.9).lineTo(11.1,-11.9).lineTo(-7.6,15.4).closePath();
	this.shape_100.setTransform(413,394.475);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.beginFill("#CCCCCC").beginStroke().moveTo(10,10.8).lineTo(13.1,-2).curveTo(13.5,-4,13.5,-4.8).curveTo(13.5,-7,11.3,-7.1).curveTo(9,-7.1,4.8,-4.1).lineTo(2.1,7.2).lineTo(5.3,7.2).lineTo(4.5,10.8).lineTo(-2.7,10.8).lineTo(0.4,-2.2).curveTo(0.8,-4.2,0.8,-4.8).curveTo(0.8,-5.7,0.1,-6.4).curveTo(-0.5,-7,-1.4,-7).curveTo(-3.8,-7,-8.2,-4.1).lineTo(-10.8,7.2).lineTo(-7.6,7.2).lineTo(-8.4,10.8).lineTo(-18,10.8).lineTo(-17.2,7.2).lineTo(-14.7,7.2).lineTo(-11.5,-6.9).lineTo(-14.3,-6.9).lineTo(-13.5,-10.4).lineTo(-6.8,-10.4).lineTo(-7.3,-7.9).curveTo(-3.1,-10.8,0.1,-10.8).curveTo(1.7,-10.8,3,-9.8).curveTo(4.3,-8.8,4.8,-7.3).curveTo(9.2,-10.8,12.7,-10.8).curveTo(15.2,-10.8,16.4,-9.2).curveTo(17.7,-7.7,17.7,-5.9).curveTo(17.7,-4.5,17,-1.5).lineTo(14.9,7.2).lineTo(18,7.2).lineTo(17.2,10.8).closePath();
	this.shape_101.setTransform(381.875,389.5);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-10.3,10.8).lineTo(-9.4,7.2).lineTo(-6.7,7.2).lineTo(-3.5,-6.9).lineTo(-6.8,-6.9).lineTo(-5.9,-10.4).lineTo(1,-10.4).lineTo(-0.4,-4.5).curveTo(1.6,-7.8,3.9,-9.3).curveTo(6.2,-10.8,9.3,-10.8).lineTo(10.3,-10.8).lineTo(9.3,-6.9).lineTo(8.3,-6.9).curveTo(5.5,-6.9,3.5,-5.6).curveTo(1.4,-4.4,0.2,-2.2).curveTo(-1,-0,-1.8,3.4).lineTo(-2.7,7.2).lineTo(0.9,7.2).lineTo(0,10.8).closePath();
	this.shape_102.setTransform(355.775,389.5);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-8.5,8.8).curveTo(-11.1,6.4,-11.1,2.1).curveTo(-11.1,-1.2,-9.6,-4.2).curveTo(-8.1,-7.3,-5,-9.2).curveTo(-1.9,-11.2,1.9,-11.2).curveTo(6.3,-11.2,8.7,-8.6).curveTo(11.1,-6.1,11.1,-2.1).curveTo(11.1,1,9.6,4.3).curveTo(8.1,7.6,4.9,9.4).curveTo(1.7,11.2,-1.8,11.2).curveTo(-5.9,11.2,-8.5,8.8).closePath().moveTo(-4.5,-4.6).curveTo(-6.7,-1.9,-6.7,1.7).curveTo(-6.7,7.4,-1.4,7.4).curveTo(2.4,7.4,4.6,4.6).curveTo(6.9,1.7,6.9,-2.1).curveTo(6.9,-4.5,5.4,-5.9).curveTo(3.8,-7.4,1.3,-7.4).curveTo(-2.3,-7.4,-4.5,-4.6).closePath();
	this.shape_103.setTransform(333.725,389.675);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-4.3,13.8).curveTo(-5.5,12.6,-5.5,10.6).curveTo(-5.5,9.1,-4.3,4.2).lineTo(-2.4,-3.4).lineTo(-4.8,-3.4).lineTo(-4,-6.9).lineTo(-1.6,-6.9).lineTo(-0.5,-11.2).lineTo(4.3,-15).lineTo(2.4,-6.9).lineTo(5.5,-6.9).lineTo(4.6,-3.4).lineTo(1.5,-3.4).lineTo(-0.9,6.7).curveTo(-1.5,9.4,-1.5,10.1).curveTo(-1.5,11.6,0.1,11.6).curveTo(1.2,11.6,3.4,10.3).lineTo(2.5,14).curveTo(0.5,15,-1.4,14.9).curveTo(-3.2,15,-4.3,13.8).closePath();
	this.shape_104.setTransform(315.975,385.95);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-6.3,9.2).lineTo(-6.6,10.6).lineTo(-10.2,10.6).lineTo(-8.8,4.7).lineTo(-5.2,4.7).curveTo(-5.2,6.2,-3.9,7).curveTo(-2.6,7.8,-0.5,7.8).curveTo(1.5,7.8,2.6,7).curveTo(3.6,6.2,3.6,5.1).curveTo(3.6,4,2.7,3.2).curveTo(1.8,2.4,-0.6,1.5).curveTo(-2.9,0.6,-4.1,-0.1).curveTo(-5.3,-0.9,-6.1,-2.1).curveTo(-6.9,-3.4,-6.9,-4.8).curveTo(-6.9,-7.3,-4.9,-9.1).curveTo(-2.8,-11,0.8,-11).curveTo(4.1,-11,6.3,-9.1).lineTo(6.7,-10.6).lineTo(10.2,-10.6).lineTo(8.9,-4.7).lineTo(5.3,-4.7).curveTo(5.2,-6.4,3.8,-7).curveTo(2.4,-7.7,0.7,-7.7).curveTo(-1.1,-7.7,-2,-7).curveTo(-3.1,-6.3,-3.1,-5.3).curveTo(-3.1,-4.4,-2.5,-3.9).curveTo(-1.9,-3.3,-0.2,-2.6).curveTo(4.5,-0.8,6.1,0.8).curveTo(7.6,2.5,7.6,4.8).curveTo(7.6,7.6,5.4,9.3).curveTo(3.3,11,-0.9,11).curveTo(-4.7,11,-6.3,9.2).closePath();
	this.shape_105.setTransform(297.975,389.675);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.beginFill("#CCCCCC").beginStroke().moveTo(3,15.3).lineTo(-4.1,4.4).lineTo(-5.9,11.7).lineTo(-2.7,11.7).lineTo(-3.5,15.3).lineTo(-13.2,15.3).lineTo(-12.4,11.7).lineTo(-9.9,11.7).lineTo(-4.2,-11.7).lineTo(-7.3,-11.7).lineTo(-6.5,-15.3).lineTo(0.6,-15.3).lineTo(-4.1,3.9).lineTo(5.2,-2.8).lineTo(1.8,-2.8).lineTo(2.6,-6).lineTo(13.2,-6).lineTo(12.4,-2.8).lineTo(10.4,-2.8).lineTo(0.5,4.4).lineTo(5.2,11.7).lineTo(8.7,11.7).lineTo(7.8,15.3).closePath();
	this.shape_106.setTransform(266.65,385.025);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-10.3,10.8).lineTo(-9.4,7.2).lineTo(-6.7,7.2).lineTo(-3.5,-6.9).lineTo(-6.8,-6.9).lineTo(-5.9,-10.4).lineTo(1,-10.4).lineTo(-0.4,-4.5).curveTo(1.6,-7.8,3.9,-9.3).curveTo(6.2,-10.8,9.3,-10.8).lineTo(10.3,-10.8).lineTo(9.3,-6.9).lineTo(8.3,-6.9).curveTo(5.5,-6.9,3.5,-5.6).curveTo(1.4,-4.4,0.2,-2.2).curveTo(-1,-0,-1.8,3.4).lineTo(-2.7,7.2).lineTo(0.9,7.2).lineTo(0,10.8).closePath();
	this.shape_107.setTransform(245.575,389.5);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-8,9.4).curveTo(-9.9,7.7,-9.9,4.9).curveTo(-9.9,1.7,-7.3,-0.4).curveTo(-4.8,-2.5,-0.9,-2.5).curveTo(2,-2.5,5,-0.9).lineTo(5.6,-3.3).lineTo(5.8,-5.1).curveTo(5.8,-6.4,4.7,-7.2).curveTo(3.6,-7.9,2.1,-7.9).curveTo(-1.1,-7.9,-3.2,-4.9).lineTo(-6.5,-6.4).curveTo(-5.2,-8.4,-2.7,-9.8).curveTo(-0.2,-11.1,2.8,-11.1).curveTo(6.1,-11.1,8,-9.7).curveTo(9.8,-8.2,9.8,-5.9).curveTo(9.8,-4.5,9.3,-2.3).lineTo(7.3,7.2).lineTo(9.9,7.2).lineTo(9.2,10.8).lineTo(2.7,10.8).lineTo(3.4,7.7).curveTo(0.3,11.1,-3.5,11.1).curveTo(-6,11.1,-8,9.4).closePath().moveTo(-4.5,1.8).curveTo(-6,3.1,-6,4.7).curveTo(-6,6.2,-5,7.1).curveTo(-3.9,7.9,-2.3,7.9).curveTo(0.3,7.9,3.6,5.2).lineTo(4.4,2).lineTo(3.4,1.5).curveTo(1.2,0.5,-0.6,0.5).curveTo(-3,0.5,-4.5,1.8).closePath();
	this.shape_108.setTransform(223.625,389.55);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-10.8,12.8).curveTo(-13.1,10.1,-13.1,5.9).curveTo(-13.1,0.9,-9.6,-2.9).curveTo(-6.1,-6.8,-1.3,-6.8).curveTo(3.2,-6.8,6.2,-3).lineTo(8.3,-11.9).lineTo(5,-11.9).lineTo(5.9,-15.5).lineTo(13.1,-15.5).lineTo(6.8,11.5).lineTo(9.7,11.5).lineTo(8.9,15.1).lineTo(2,15.1).lineTo(2.6,12.5).curveTo(-0.4,15.5,-4.5,15.5).curveTo(-8.4,15.5,-10.8,12.8).closePath().moveTo(-6.6,-0.4).curveTo(-9,2.5,-9,5.9).curveTo(-9,8.6,-7.5,10.3).curveTo(-5.9,11.9,-3.4,11.9).curveTo(-0.1,11.9,2.3,9.1).curveTo(4.8,6.2,4.8,2.4).curveTo(4.8,-0.4,3.1,-1.8).curveTo(1.4,-3.2,-1,-3.2).curveTo(-4.3,-3.3,-6.6,-0.4).closePath();
	this.shape_109.setTransform(199.7,385.2);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-8,9.4).curveTo(-9.9,7.7,-9.9,4.9).curveTo(-9.9,1.7,-7.3,-0.4).curveTo(-4.8,-2.5,-0.9,-2.5).curveTo(2,-2.5,5,-0.9).lineTo(5.6,-3.3).lineTo(5.8,-5.1).curveTo(5.8,-6.4,4.7,-7.2).curveTo(3.6,-7.9,2.1,-7.9).curveTo(-1.1,-7.9,-3.2,-4.9).lineTo(-6.5,-6.4).curveTo(-5.2,-8.4,-2.7,-9.8).curveTo(-0.2,-11.1,2.8,-11.1).curveTo(6.1,-11.1,8,-9.7).curveTo(9.8,-8.2,9.8,-5.9).curveTo(9.8,-4.5,9.3,-2.3).lineTo(7.3,7.2).lineTo(9.9,7.2).lineTo(9.2,10.8).lineTo(2.7,10.8).lineTo(3.4,7.7).curveTo(0.3,11.1,-3.5,11.1).curveTo(-6,11.1,-8,9.4).closePath().moveTo(-4.5,1.8).curveTo(-6,3.1,-6,4.7).curveTo(-6,6.2,-5,7.1).curveTo(-3.9,7.9,-2.3,7.9).curveTo(0.3,7.9,3.6,5.2).lineTo(4.4,2).lineTo(3.4,1.5).curveTo(1.2,0.5,-0.6,0.5).curveTo(-3,0.5,-4.5,1.8).closePath();
	this.shape_110.setTransform(161.275,389.55);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.beginFill("#CCCCCC").beginStroke().moveTo(3.6,10.8).lineTo(6.7,-2.2).curveTo(7.1,-4.3,7.1,-4.8).curveTo(7.1,-5.8,6.4,-6.5).curveTo(5.8,-7,4.9,-7.1).curveTo(2.4,-7.1,-1.7,-4.2).lineTo(-4.3,7.2).lineTo(-1,7.2).lineTo(-1.9,10.8).lineTo(-11.6,10.8).lineTo(-10.8,7.2).lineTo(-8.2,7.2).lineTo(-5,-6.9).lineTo(-7.9,-6.9).lineTo(-7,-10.4).lineTo(-0.2,-10.4).lineTo(-0.8,-8).curveTo(3.2,-10.8,6.2,-10.8).curveTo(8.6,-10.8,9.8,-9.2).curveTo(11.2,-7.7,11.2,-5.9).curveTo(11.1,-4.5,10.6,-2).lineTo(8.4,7.2).lineTo(11.5,7.2).lineTo(10.7,10.8).closePath();
	this.shape_111.setTransform(124.8,389.5);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.beginFill("#CCCCCC").beginStroke().moveTo(-12.5,12.1).curveTo(-15.7,8.4,-15.7,3.4).curveTo(-15.7,-0.7,-13.7,-5.1).curveTo(-11.8,-9.5,-7.5,-12.6).curveTo(-3.1,-15.8,2.8,-15.8).curveTo(8.9,-15.8,12.2,-12.3).curveTo(15.7,-8.9,15.7,-3.4).curveTo(15.7,0.9,13.6,5.3).curveTo(11.4,9.7,7.2,12.7).curveTo(3,15.8,-2.9,15.8).curveTo(-9.3,15.8,-12.5,12.1).closePath().moveTo(-4.6,-9.6).curveTo(-7.9,-7.1,-9.5,-3.5).curveTo(-11,0.2,-11,3.6).curveTo(-11,6.8,-8.9,9.4).curveTo(-6.9,12,-2.6,12).curveTo(1.4,12,4.5,9.6).curveTo(7.6,7.2,9.3,3.4).curveTo(10.9,-0.3,11,-3.7).curveTo(10.9,-7.1,8.7,-9.6).curveTo(6.4,-12.1,2.5,-12.1).curveTo(-1.3,-12.1,-4.6,-9.6).closePath();
	this.shape_112.setTransform(97.3,385.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72}]},14).to({state:[]},120).wait(706));

	// rain_animation
	this.instance_15 = new lib.raindrop("synched",0);
	this.instance_15.setTransform(-216.85,-400.85,1,1,0,0,0,4.1,-39);

	this.instance_16 = new lib.raindrop("synched",0);
	this.instance_16.setTransform(-114.3,-447.65,1,1,0,0,0,4.1,-39);

	this.instance_17 = new lib.raindrop("synched",0);
	this.instance_17.setTransform(94.65,-395.75,1,1,0,0,0,4.1,-39);

	this.instance_18 = new lib.raindrop("synched",0);
	this.instance_18.setTransform(308.1,-462.4,1,1,0,0,0,4.1,-39);

	this.instance_19 = new lib.raindrop("synched",0);
	this.instance_19.setTransform(538.2,-475.2,1,1,0,0,0,4.1,-39);

	this.instance_20 = new lib.raindrop("synched",0);
	this.instance_20.setTransform(752.25,-500.8,1,1,0,0,0,4.1,-39);

	this.instance_21 = new lib.raindrop("synched",0);
	this.instance_21.setTransform(807.4,-409.8,1,1,0,0,0,4.1,-39);

	this.instance_22 = new lib.raindrop("synched",0);
	this.instance_22.setTransform(638.2,-418.8,1,1,0,0,0,4.1,-39);

	this.instance_23 = new lib.raindrop("synched",0);
	this.instance_23.setTransform(401.75,-398.25,1,1,0,0,0,4.1,-39);

	this.instance_24 = new lib.raindrop("synched",0);
	this.instance_24.setTransform(163.35,-430.3,1,1,0,0,0,4.1,-39);

	this.instance_25 = new lib.raindrop("synched",0);
	this.instance_25.setTransform(-59,-430.95,1,1,0,0,0,4.1,-39);

	this.instance_26 = new lib.raindrop("synched",0);
	this.instance_26.setTransform(26.85,-426.45,1,1,0,0,0,4.1,-39);

	this.instance_27 = new lib.raindrop("synched",0);
	this.instance_27.setTransform(-278.35,-338.05,1,1,0,0,0,4.1,-39);

	this.instance_28 = new lib.raindrop("synched",0);
	this.instance_28.setTransform(-175.8,-384.85,1,1,0,0,0,4.1,-39);

	this.instance_29 = new lib.raindrop("synched",0);
	this.instance_29.setTransform(33.15,-332.95,1,1,0,0,0,4.1,-39);

	this.instance_30 = new lib.raindrop("synched",0);
	this.instance_30.setTransform(246.6,-399.6,1,1,0,0,0,4.1,-39);

	this.instance_31 = new lib.raindrop("synched",0);
	this.instance_31.setTransform(476.7,-412.4,1,1,0,0,0,4.1,-39);

	this.instance_32 = new lib.raindrop("synched",0);
	this.instance_32.setTransform(690.75,-438,1,1,0,0,0,4.1,-39);

	this.instance_33 = new lib.raindrop("synched",0);
	this.instance_33.setTransform(745.9,-347,1,1,0,0,0,4.1,-39);

	this.instance_34 = new lib.raindrop("synched",0);
	this.instance_34.setTransform(576.7,-356,1,1,0,0,0,4.1,-39);

	this.instance_35 = new lib.raindrop("synched",0);
	this.instance_35.setTransform(340.25,-335.45,1,1,0,0,0,4.1,-39);

	this.instance_36 = new lib.raindrop("synched",0);
	this.instance_36.setTransform(101.85,-367.5,1,1,0,0,0,4.1,-39);

	this.instance_37 = new lib.raindrop("synched",0);
	this.instance_37.setTransform(-120.5,-368.15,1,1,0,0,0,4.1,-39);

	this.instance_38 = new lib.raindrop("synched",0);
	this.instance_38.setTransform(-34.65,-363.65,1,1,0,0,0,4.1,-39);

	this.instance_39 = new lib.raindrop("synched",0);
	this.instance_39.setTransform(269.65,-293.85,1,1,0,0,0,4.1,-39);

	this.instance_40 = new lib.raindrop("synched",0);
	this.instance_40.setTransform(499.75,-306.65,1,1,0,0,0,4.1,-39);

	this.instance_41 = new lib.raindrop("synched",0);
	this.instance_41.setTransform(713.8,-332.25,1,1,0,0,0,4.1,-39);

	this.instance_42 = new lib.raindrop("synched",0);
	this.instance_42.setTransform(-254,-236.75,1,1,0,0,0,4.1,-39);

	this.instance_43 = new lib.raindrop("synched",0);
	this.instance_43.setTransform(-151.45,-283.55,1,1,0,0,0,4.1,-39);

	this.instance_44 = new lib.raindrop("synched",0);
	this.instance_44.setTransform(57.5,-231.65,1,1,0,0,0,4.1,-39);

	this.instance_45 = new lib.raindrop("synched",0);
	this.instance_45.setTransform(270.95,-298.3,1,1,0,0,0,4.1,-39);

	this.instance_46 = new lib.raindrop("synched",0);
	this.instance_46.setTransform(501.05,-311.1,1,1,0,0,0,4.1,-39);

	this.instance_47 = new lib.raindrop("synched",0);
	this.instance_47.setTransform(715.1,-336.7,1,1,0,0,0,4.1,-39);

	this.instance_48 = new lib.raindrop("synched",0);
	this.instance_48.setTransform(770.25,-245.7,1,1,0,0,0,4.1,-39);

	this.instance_49 = new lib.raindrop("synched",0);
	this.instance_49.setTransform(601.05,-254.7,1,1,0,0,0,4.1,-39);

	this.instance_50 = new lib.raindrop("synched",0);
	this.instance_50.setTransform(364.6,-234.15,1,1,0,0,0,4.1,-39);

	this.instance_51 = new lib.raindrop("synched",0);
	this.instance_51.setTransform(126.2,-266.2,1,1,0,0,0,4.1,-39);

	this.instance_52 = new lib.raindrop("synched",0);
	this.instance_52.setTransform(-96.15,-266.85,1,1,0,0,0,4.1,-39);

	this.instance_53 = new lib.raindrop("synched",0);
	this.instance_53.setTransform(-10.3,-262.35,1,1,0,0,0,4.1,-39);

	this.instance_54 = new lib.raindrop("synched",0);
	this.instance_54.setTransform(-212.95,-220.75,1,1,0,0,0,4.1,-39);

	this.instance_55 = new lib.raindrop("synched",0);
	this.instance_55.setTransform(209.45,-235.5,1,1,0,0,0,4.1,-39);

	this.instance_56 = new lib.raindrop("synched",0);
	this.instance_56.setTransform(439.55,-248.3,1,1,0,0,0,4.1,-39);

	this.instance_57 = new lib.raindrop("synched",0);
	this.instance_57.setTransform(653.6,-273.9,1,1,0,0,0,4.1,-39);

	this.instance_58 = new lib.raindrop("synched",0);
	this.instance_58.setTransform(-201.45,-185.55,1,1,0,0,0,4.1,-39);

	this.instance_59 = new lib.raindrop("synched",0);
	this.instance_59.setTransform(-98.9,-232.35,1,1,0,0,0,4.1,-39);

	this.instance_60 = new lib.raindrop("synched",0);
	this.instance_60.setTransform(110.05,-180.45,1,1,0,0,0,4.1,-39);

	this.instance_61 = new lib.raindrop("synched",0);
	this.instance_61.setTransform(323.5,-247.1,1,1,0,0,0,4.1,-39);

	this.instance_62 = new lib.raindrop("synched",0);
	this.instance_62.setTransform(553.6,-259.9,1,1,0,0,0,4.1,-39);

	this.instance_63 = new lib.raindrop("synched",0);
	this.instance_63.setTransform(767.65,-285.5,1,1,0,0,0,4.1,-39);

	this.instance_64 = new lib.raindrop("synched",0);
	this.instance_64.setTransform(822.8,-194.5,1,1,0,0,0,4.1,-39);

	this.instance_65 = new lib.raindrop("synched",0);
	this.instance_65.setTransform(653.6,-203.5,1,1,0,0,0,4.1,-39);

	this.instance_66 = new lib.raindrop("synched",0);
	this.instance_66.setTransform(417.15,-182.95,1,1,0,0,0,4.1,-39);

	this.instance_67 = new lib.raindrop("synched",0);
	this.instance_67.setTransform(178.75,-215,1,1,0,0,0,4.1,-39);

	this.instance_68 = new lib.raindrop("synched",0);
	this.instance_68.setTransform(-43.6,-215.65,1,1,0,0,0,4.1,-39);

	this.instance_69 = new lib.raindrop("synched",0);
	this.instance_69.setTransform(42.25,-211.15,1,1,0,0,0,4.1,-39);

	this.instance_70 = new lib.raindrop("synched",0);
	this.instance_70.setTransform(-262.95,-122.75,1,1,0,0,0,4.1,-39);

	this.instance_71 = new lib.raindrop("synched",0);
	this.instance_71.setTransform(-160.4,-169.55,1,1,0,0,0,4.1,-39);

	this.instance_72 = new lib.raindrop("synched",0);
	this.instance_72.setTransform(48.55,-117.65,1,1,0,0,0,4.1,-39);

	this.instance_73 = new lib.raindrop("synched",0);
	this.instance_73.setTransform(262,-184.3,1,1,0,0,0,4.1,-39);

	this.instance_74 = new lib.raindrop("synched",0);
	this.instance_74.setTransform(492.1,-197.1,1,1,0,0,0,4.1,-39);

	this.instance_75 = new lib.raindrop("synched",0);
	this.instance_75.setTransform(706.15,-222.7,1,1,0,0,0,4.1,-39);

	this.instance_76 = new lib.raindrop("synched",0);
	this.instance_76.setTransform(761.3,-131.7,1,1,0,0,0,4.1,-39);

	this.instance_77 = new lib.raindrop("synched",0);
	this.instance_77.setTransform(592.1,-140.7,1,1,0,0,0,4.1,-39);

	this.instance_78 = new lib.raindrop("synched",0);
	this.instance_78.setTransform(355.65,-120.15,1,1,0,0,0,4.1,-39);

	this.instance_79 = new lib.raindrop("synched",0);
	this.instance_79.setTransform(117.25,-152.2,1,1,0,0,0,4.1,-39);

	this.instance_80 = new lib.raindrop("synched",0);
	this.instance_80.setTransform(-105.1,-152.85,1,1,0,0,0,4.1,-39);

	this.instance_81 = new lib.raindrop("synched",0);
	this.instance_81.setTransform(-19.25,-148.35,1,1,0,0,0,4.1,-39);

	this.instance_82 = new lib.raindrop("synched",0);
	this.instance_82.setTransform(285.05,-78.55,1,1,0,0,0,4.1,-39);

	this.instance_83 = new lib.raindrop("synched",0);
	this.instance_83.setTransform(515.15,-91.35,1,1,0,0,0,4.1,-39);

	this.instance_84 = new lib.raindrop("synched",0);
	this.instance_84.setTransform(729.2,-116.95,1,1,0,0,0,4.1,-39);

	this.instance_85 = new lib.raindrop("synched",0);
	this.instance_85.setTransform(-238.6,-21.45,1,1,0,0,0,4.1,-39);

	this.instance_86 = new lib.raindrop("synched",0);
	this.instance_86.setTransform(-136.05,-68.25,1,1,0,0,0,4.1,-39);

	this.instance_87 = new lib.raindrop("synched",0);
	this.instance_87.setTransform(72.9,-16.35,1,1,0,0,0,4.1,-39);

	this.instance_88 = new lib.raindrop("synched",0);
	this.instance_88.setTransform(286.35,-83,1,1,0,0,0,4.1,-39);

	this.instance_89 = new lib.raindrop("synched",0);
	this.instance_89.setTransform(516.45,-95.8,1,1,0,0,0,4.1,-39);

	this.instance_90 = new lib.raindrop("synched",0);
	this.instance_90.setTransform(730.5,-121.4,1,1,0,0,0,4.1,-39);

	this.instance_91 = new lib.raindrop("synched",0);
	this.instance_91.setTransform(785.65,-30.4,1,1,0,0,0,4.1,-39);

	this.instance_92 = new lib.raindrop("synched",0);
	this.instance_92.setTransform(616.45,-39.4,1,1,0,0,0,4.1,-39);

	this.instance_93 = new lib.raindrop("synched",0);
	this.instance_93.setTransform(380,-18.85,1,1,0,0,0,4.1,-39);

	this.instance_94 = new lib.raindrop("synched",0);
	this.instance_94.setTransform(141.6,-50.9,1,1,0,0,0,4.1,-39);

	this.instance_95 = new lib.raindrop("synched",0);
	this.instance_95.setTransform(-80.75,-51.55,1,1,0,0,0,4.1,-39);

	this.instance_96 = new lib.raindrop("synched",0);
	this.instance_96.setTransform(5.1,-47.05,1,1,0,0,0,4.1,-39);

	this.instance_97 = new lib.raindrop("synched",0);
	this.instance_97.setTransform(-300.1,41.35,1,1,0,0,0,4.1,-39);

	this.instance_98 = new lib.raindrop("synched",0);
	this.instance_98.setTransform(-197.55,-5.45,1,1,0,0,0,4.1,-39);

	this.instance_99 = new lib.raindrop("synched",0);
	this.instance_99.setTransform(11.4,46.45,1,1,0,0,0,4.1,-39);

	this.instance_100 = new lib.raindrop("synched",0);
	this.instance_100.setTransform(224.85,-20.2,1,1,0,0,0,4.1,-39);

	this.instance_101 = new lib.raindrop("synched",0);
	this.instance_101.setTransform(454.95,-33,1,1,0,0,0,4.1,-39);

	this.instance_102 = new lib.raindrop("synched",0);
	this.instance_102.setTransform(669,-58.6,1,1,0,0,0,4.1,-39);

	this.instance_103 = new lib.raindrop("synched",0);
	this.instance_103.setTransform(724.15,32.4,1,1,0,0,0,4.1,-39);

	this.instance_104 = new lib.raindrop("synched",0);
	this.instance_104.setTransform(554.95,23.4,1,1,0,0,0,4.1,-39);

	this.instance_105 = new lib.raindrop("synched",0);
	this.instance_105.setTransform(318.5,43.95,1,1,0,0,0,4.1,-39);

	this.instance_106 = new lib.raindrop("synched",0);
	this.instance_106.setTransform(80.1,11.9,1,1,0,0,0,4.1,-39);

	this.instance_107 = new lib.raindrop("synched",0);
	this.instance_107.setTransform(-142.25,11.25,1,1,0,0,0,4.1,-39);

	this.instance_108 = new lib.raindrop("synched",0);
	this.instance_108.setTransform(-56.4,15.75,1,1,0,0,0,4.1,-39);

	this.instance_109 = new lib.raindrop("synched",0);
	this.instance_109.setTransform(-277.05,147.1,1,1,0,0,0,4.1,-39);

	this.instance_110 = new lib.raindrop("synched",0);
	this.instance_110.setTransform(-174.5,100.3,1,1,0,0,0,4.1,-39);

	this.instance_111 = new lib.raindrop("synched",0);
	this.instance_111.setTransform(34.45,152.2,1,1,0,0,0,4.1,-39);

	this.instance_112 = new lib.raindrop("synched",0);
	this.instance_112.setTransform(247.9,85.55,1,1,0,0,0,4.1,-39);

	this.instance_113 = new lib.raindrop("synched",0);
	this.instance_113.setTransform(478,72.75,1,1,0,0,0,4.1,-39);

	this.instance_114 = new lib.raindrop("synched",0);
	this.instance_114.setTransform(692.05,47.15,1,1,0,0,0,4.1,-39);

	this.instance_115 = new lib.raindrop("synched",0);
	this.instance_115.setTransform(747.2,138.15,1,1,0,0,0,4.1,-39);

	this.instance_116 = new lib.raindrop("synched",0);
	this.instance_116.setTransform(578,129.15,1,1,0,0,0,4.1,-39);

	this.instance_117 = new lib.raindrop("synched",0);
	this.instance_117.setTransform(341.55,149.7,1,1,0,0,0,4.1,-39);

	this.instance_118 = new lib.raindrop("synched",0);
	this.instance_118.setTransform(103.15,117.65,1,1,0,0,0,4.1,-39);

	this.instance_119 = new lib.raindrop("synched",0);
	this.instance_119.setTransform(-119.2,117,1,1,0,0,0,4.1,-39);

	this.instance_120 = new lib.raindrop("synched",0);
	this.instance_120.setTransform(-33.35,121.5,1,1,0,0,0,4.1,-39);

	this.instance_121 = new lib.raindrop("synched",0);
	this.instance_121.setTransform(-319.35,193.25,1,1,0,0,0,4.1,-39);

	this.instance_122 = new lib.raindrop("synched",0);
	this.instance_122.setTransform(-216.8,146.45,1,1,0,0,0,4.1,-39);

	this.instance_123 = new lib.raindrop("synched",0);
	this.instance_123.setTransform(-7.85,198.35,1,1,0,0,0,4.1,-39);

	this.instance_124 = new lib.raindrop("synched",0);
	this.instance_124.setTransform(205.6,131.7,1,1,0,0,0,4.1,-39);

	this.instance_125 = new lib.raindrop("synched",0);
	this.instance_125.setTransform(435.7,118.9,1,1,0,0,0,4.1,-39);

	this.instance_126 = new lib.raindrop("synched",0);
	this.instance_126.setTransform(649.75,93.3,1,1,0,0,0,4.1,-39);

	this.instance_127 = new lib.raindrop("synched",0);
	this.instance_127.setTransform(704.9,184.3,1,1,0,0,0,4.1,-39);

	this.instance_128 = new lib.raindrop("synched",0);
	this.instance_128.setTransform(535.7,175.3,1,1,0,0,0,4.1,-39);

	this.instance_129 = new lib.raindrop("synched",0);
	this.instance_129.setTransform(299.25,195.85,1,1,0,0,0,4.1,-39);

	this.instance_130 = new lib.raindrop("synched",0);
	this.instance_130.setTransform(60.85,163.8,1,1,0,0,0,4.1,-39);

	this.instance_131 = new lib.raindrop("synched",0);
	this.instance_131.setTransform(-161.5,163.15,1,1,0,0,0,4.1,-39);

	this.instance_132 = new lib.raindrop("synched",0);
	this.instance_132.setTransform(-75.65,167.65,1,1,0,0,0,4.1,-39);

	this.instance_133 = new lib.raindrop("synched",0);
	this.instance_133.setTransform(-202.7,277.15,1,1,0,0,0,4.1,-39);

	this.instance_134 = new lib.raindrop("synched",0);
	this.instance_134.setTransform(-100.15,230.35,1,1,0,0,0,4.1,-39);

	this.instance_135 = new lib.raindrop("synched",0);
	this.instance_135.setTransform(108.8,282.25,1,1,0,0,0,4.1,-39);

	this.instance_136 = new lib.raindrop("synched",0);
	this.instance_136.setTransform(322.25,215.6,1,1,0,0,0,4.1,-39);

	this.instance_137 = new lib.raindrop("synched",0);
	this.instance_137.setTransform(552.35,202.8,1,1,0,0,0,4.1,-39);

	this.instance_138 = new lib.raindrop("synched",0);
	this.instance_138.setTransform(766.4,177.2,1,1,0,0,0,4.1,-39);

	this.instance_139 = new lib.raindrop("synched",0);
	this.instance_139.setTransform(821.55,268.2,1,1,0,0,0,4.1,-39);

	this.instance_140 = new lib.raindrop("synched",0);
	this.instance_140.setTransform(652.35,259.2,1,1,0,0,0,4.1,-39);

	this.instance_141 = new lib.raindrop("synched",0);
	this.instance_141.setTransform(415.9,279.75,1,1,0,0,0,4.1,-39);

	this.instance_142 = new lib.raindrop("synched",0);
	this.instance_142.setTransform(177.5,247.7,1,1,0,0,0,4.1,-39);

	this.instance_143 = new lib.raindrop("synched",0);
	this.instance_143.setTransform(-44.85,247.05,1,1,0,0,0,4.1,-39);

	this.instance_144 = new lib.raindrop("synched",0);
	this.instance_144.setTransform(41,251.55,1,1,0,0,0,4.1,-39);

	this.instance_145 = new lib.raindrop("synched",0);
	this.instance_145.setTransform(-264.2,339.95,1,1,0,0,0,4.1,-39);

	this.instance_146 = new lib.raindrop("synched",0);
	this.instance_146.setTransform(-161.65,293.15,1,1,0,0,0,4.1,-39);

	this.instance_147 = new lib.raindrop("synched",0);
	this.instance_147.setTransform(47.3,345.05,1,1,0,0,0,4.1,-39);

	this.instance_148 = new lib.raindrop("synched",0);
	this.instance_148.setTransform(260.75,278.4,1,1,0,0,0,4.1,-39);

	this.instance_149 = new lib.raindrop("synched",0);
	this.instance_149.setTransform(490.85,265.6,1,1,0,0,0,4.1,-39);

	this.instance_150 = new lib.raindrop("synched",0);
	this.instance_150.setTransform(704.9,240,1,1,0,0,0,4.1,-39);

	this.instance_151 = new lib.raindrop("synched",0);
	this.instance_151.setTransform(760.05,331,1,1,0,0,0,4.1,-39);

	this.instance_152 = new lib.raindrop("synched",0);
	this.instance_152.setTransform(590.85,322,1,1,0,0,0,4.1,-39);

	this.instance_153 = new lib.raindrop("synched",0);
	this.instance_153.setTransform(354.4,342.55,1,1,0,0,0,4.1,-39);

	this.instance_154 = new lib.raindrop("synched",0);
	this.instance_154.setTransform(116,310.5,1,1,0,0,0,4.1,-39);

	this.instance_155 = new lib.raindrop("synched",0);
	this.instance_155.setTransform(-106.35,309.85,1,1,0,0,0,4.1,-39);

	this.instance_156 = new lib.raindrop("synched",0);
	this.instance_156.setTransform(-20.5,314.35,1,1,0,0,0,4.1,-39);

	this.instance_157 = new lib.raindrop("synched",0);
	this.instance_157.setTransform(283.8,384.15,1,1,0,0,0,4.1,-39);

	this.instance_158 = new lib.raindrop("synched",0);
	this.instance_158.setTransform(513.9,371.35,1,1,0,0,0,4.1,-39);

	this.instance_159 = new lib.raindrop("synched",0);
	this.instance_159.setTransform(727.95,345.75,1,1,0,0,0,4.1,-39);

	this.instance_160 = new lib.raindrop("synched",0);
	this.instance_160.setTransform(-239.85,441.25,1,1,0,0,0,4.1,-39);

	this.instance_161 = new lib.raindrop("synched",0);
	this.instance_161.setTransform(-137.3,394.45,1,1,0,0,0,4.1,-39);

	this.instance_162 = new lib.raindrop("synched",0);
	this.instance_162.setTransform(71.65,446.35,1,1,0,0,0,4.1,-39);

	this.instance_163 = new lib.raindrop("synched",0);
	this.instance_163.setTransform(285.1,379.7,1,1,0,0,0,4.1,-39);

	this.instance_164 = new lib.raindrop("synched",0);
	this.instance_164.setTransform(515.2,366.9,1,1,0,0,0,4.1,-39);

	this.instance_165 = new lib.raindrop("synched",0);
	this.instance_165.setTransform(729.25,341.3,1,1,0,0,0,4.1,-39);

	this.instance_166 = new lib.raindrop("synched",0);
	this.instance_166.setTransform(784.4,432.3,1,1,0,0,0,4.1,-39);

	this.instance_167 = new lib.raindrop("synched",0);
	this.instance_167.setTransform(615.2,423.3,1,1,0,0,0,4.1,-39);

	this.instance_168 = new lib.raindrop("synched",0);
	this.instance_168.setTransform(378.75,443.85,1,1,0,0,0,4.1,-39);

	this.instance_169 = new lib.raindrop("synched",0);
	this.instance_169.setTransform(140.35,411.8,1,1,0,0,0,4.1,-39);

	this.instance_170 = new lib.raindrop("synched",0);
	this.instance_170.setTransform(-82,411.15,1,1,0,0,0,4.1,-39);

	this.instance_171 = new lib.raindrop("synched",0);
	this.instance_171.setTransform(3.85,415.65,1,1,0,0,0,4.1,-39);

	this.instance_172 = new lib.raindrop("synched",0);
	this.instance_172.setTransform(-301.35,504.05,1,1,0,0,0,4.1,-39);

	this.instance_173 = new lib.raindrop("synched",0);
	this.instance_173.setTransform(-198.8,457.25,1,1,0,0,0,4.1,-39);

	this.instance_174 = new lib.raindrop("synched",0);
	this.instance_174.setTransform(10.15,509.15,1,1,0,0,0,4.1,-39);

	this.instance_175 = new lib.raindrop("synched",0);
	this.instance_175.setTransform(223.6,442.5,1,1,0,0,0,4.1,-39);

	this.instance_176 = new lib.raindrop("synched",0);
	this.instance_176.setTransform(453.7,429.7,1,1,0,0,0,4.1,-39);

	this.instance_177 = new lib.raindrop("synched",0);
	this.instance_177.setTransform(667.75,404.1,1,1,0,0,0,4.1,-39);

	this.instance_178 = new lib.raindrop("synched",0);
	this.instance_178.setTransform(722.9,495.1,1,1,0,0,0,4.1,-39);

	this.instance_179 = new lib.raindrop("synched",0);
	this.instance_179.setTransform(553.7,486.1,1,1,0,0,0,4.1,-39);

	this.instance_180 = new lib.raindrop("synched",0);
	this.instance_180.setTransform(317.25,506.65,1,1,0,0,0,4.1,-39);

	this.instance_181 = new lib.raindrop("synched",0);
	this.instance_181.setTransform(78.85,474.6,1,1,0,0,0,4.1,-39);

	this.instance_182 = new lib.raindrop("synched",0);
	this.instance_182.setTransform(-143.5,473.95,1,1,0,0,0,4.1,-39);

	this.instance_183 = new lib.raindrop("synched",0);
	this.instance_183.setTransform(-57.65,478.45,1,1,0,0,0,4.1,-39);

	this.instance_184 = new lib.raindrop("synched",0);
	this.instance_184.setTransform(-278.3,609.8,1,1,0,0,0,4.1,-39);

	this.instance_185 = new lib.raindrop("synched",0);
	this.instance_185.setTransform(-175.75,563,1,1,0,0,0,4.1,-39);

	this.instance_186 = new lib.raindrop("synched",0);
	this.instance_186.setTransform(33.2,614.9,1,1,0,0,0,4.1,-39);

	this.instance_187 = new lib.raindrop("synched",0);
	this.instance_187.setTransform(246.65,548.25,1,1,0,0,0,4.1,-39);

	this.instance_188 = new lib.raindrop("synched",0);
	this.instance_188.setTransform(476.75,535.45,1,1,0,0,0,4.1,-39);

	this.instance_189 = new lib.raindrop("synched",0);
	this.instance_189.setTransform(690.8,509.85,1,1,0,0,0,4.1,-39);

	this.instance_190 = new lib.raindrop("synched",0);
	this.instance_190.setTransform(745.95,600.85,1,1,0,0,0,4.1,-39);

	this.instance_191 = new lib.raindrop("synched",0);
	this.instance_191.setTransform(576.75,591.85,1,1,0,0,0,4.1,-39);

	this.instance_192 = new lib.raindrop("synched",0);
	this.instance_192.setTransform(340.3,612.4,1,1,0,0,0,4.1,-39);

	this.instance_193 = new lib.raindrop("synched",0);
	this.instance_193.setTransform(101.9,580.35,1,1,0,0,0,4.1,-39);

	this.instance_194 = new lib.raindrop("synched",0);
	this.instance_194.setTransform(-120.45,579.7,1,1,0,0,0,4.1,-39);

	this.instance_195 = new lib.raindrop("synched",0);
	this.instance_195.setTransform(-34.6,584.2,1,1,0,0,0,4.1,-39);

	this.instance_196 = new lib.raindrop("synched",0);
	this.instance_196.setTransform(-320.6,655.95,1,1,0,0,0,4.1,-39);

	this.instance_197 = new lib.raindrop("synched",0);
	this.instance_197.setTransform(-218.05,609.15,1,1,0,0,0,4.1,-39);

	this.instance_198 = new lib.raindrop("synched",0);
	this.instance_198.setTransform(-9.1,661.05,1,1,0,0,0,4.1,-39);

	this.instance_199 = new lib.raindrop("synched",0);
	this.instance_199.setTransform(204.35,594.4,1,1,0,0,0,4.1,-39);

	this.instance_200 = new lib.raindrop("synched",0);
	this.instance_200.setTransform(434.45,581.6,1,1,0,0,0,4.1,-39);

	this.instance_201 = new lib.raindrop("synched",0);
	this.instance_201.setTransform(648.5,556,1,1,0,0,0,4.1,-39);

	this.instance_202 = new lib.raindrop("synched",0);
	this.instance_202.setTransform(703.65,647,1,1,0,0,0,4.1,-39);

	this.instance_203 = new lib.raindrop("synched",0);
	this.instance_203.setTransform(534.45,638,1,1,0,0,0,4.1,-39);

	this.instance_204 = new lib.raindrop("synched",0);
	this.instance_204.setTransform(298,658.55,1,1,0,0,0,4.1,-39);

	this.instance_205 = new lib.raindrop("synched",0);
	this.instance_205.setTransform(59.6,626.5,1,1,0,0,0,4.1,-39);

	this.instance_206 = new lib.raindrop("synched",0);
	this.instance_206.setTransform(-162.75,625.85,1,1,0,0,0,4.1,-39);

	this.instance_207 = new lib.raindrop("synched",0);
	this.instance_207.setTransform(-76.9,630.35,1,1,0,0,0,4.1,-39);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_207},{t:this.instance_206},{t:this.instance_205},{t:this.instance_204},{t:this.instance_203},{t:this.instance_202},{t:this.instance_201},{t:this.instance_200},{t:this.instance_199},{t:this.instance_198},{t:this.instance_197},{t:this.instance_196},{t:this.instance_195},{t:this.instance_194},{t:this.instance_193},{t:this.instance_192},{t:this.instance_191},{t:this.instance_190},{t:this.instance_189},{t:this.instance_188},{t:this.instance_187},{t:this.instance_186},{t:this.instance_185},{t:this.instance_184},{t:this.instance_183},{t:this.instance_182},{t:this.instance_181},{t:this.instance_180},{t:this.instance_179},{t:this.instance_178},{t:this.instance_177},{t:this.instance_176},{t:this.instance_175},{t:this.instance_174},{t:this.instance_173},{t:this.instance_172},{t:this.instance_171},{t:this.instance_170},{t:this.instance_169},{t:this.instance_168},{t:this.instance_167},{t:this.instance_166},{t:this.instance_165},{t:this.instance_164},{t:this.instance_163},{t:this.instance_162},{t:this.instance_161},{t:this.instance_160},{t:this.instance_159},{t:this.instance_158},{t:this.instance_157},{t:this.instance_156},{t:this.instance_155},{t:this.instance_154},{t:this.instance_153},{t:this.instance_152},{t:this.instance_151},{t:this.instance_150},{t:this.instance_149},{t:this.instance_148},{t:this.instance_147},{t:this.instance_146},{t:this.instance_145},{t:this.instance_144},{t:this.instance_143},{t:this.instance_142},{t:this.instance_141},{t:this.instance_140},{t:this.instance_139},{t:this.instance_138},{t:this.instance_137},{t:this.instance_136},{t:this.instance_135},{t:this.instance_134},{t:this.instance_133},{t:this.instance_132},{t:this.instance_131},{t:this.instance_130},{t:this.instance_129},{t:this.instance_128},{t:this.instance_127},{t:this.instance_126},{t:this.instance_125},{t:this.instance_124},{t:this.instance_123},{t:this.instance_122},{t:this.instance_121},{t:this.instance_120},{t:this.instance_119},{t:this.instance_118},{t:this.instance_117},{t:this.instance_116},{t:this.instance_115},{t:this.instance_114},{t:this.instance_113},{t:this.instance_112},{t:this.instance_111},{t:this.instance_110},{t:this.instance_109},{t:this.instance_108},{t:this.instance_107},{t:this.instance_106},{t:this.instance_105},{t:this.instance_104},{t:this.instance_103},{t:this.instance_102},{t:this.instance_101},{t:this.instance_100},{t:this.instance_99},{t:this.instance_98},{t:this.instance_97},{t:this.instance_96},{t:this.instance_95},{t:this.instance_94},{t:this.instance_93},{t:this.instance_92},{t:this.instance_91},{t:this.instance_90},{t:this.instance_89},{t:this.instance_88},{t:this.instance_87},{t:this.instance_86},{t:this.instance_85},{t:this.instance_84},{t:this.instance_83},{t:this.instance_82},{t:this.instance_81},{t:this.instance_80},{t:this.instance_79},{t:this.instance_78},{t:this.instance_77},{t:this.instance_76},{t:this.instance_75},{t:this.instance_74},{t:this.instance_73},{t:this.instance_72},{t:this.instance_71},{t:this.instance_70},{t:this.instance_69},{t:this.instance_68},{t:this.instance_67},{t:this.instance_66},{t:this.instance_65},{t:this.instance_64},{t:this.instance_63},{t:this.instance_62},{t:this.instance_61},{t:this.instance_60},{t:this.instance_59},{t:this.instance_58},{t:this.instance_57},{t:this.instance_56},{t:this.instance_55},{t:this.instance_54},{t:this.instance_53},{t:this.instance_52},{t:this.instance_51},{t:this.instance_50},{t:this.instance_49},{t:this.instance_48},{t:this.instance_47},{t:this.instance_46},{t:this.instance_45},{t:this.instance_44},{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15}]},14).to({state:[]},120).wait(706));

	// background_city_intro
	this.instance_208 = new lib.city_background("synched",0);
	this.instance_208.setTransform(62.25,235.15);
	this.instance_208._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_208).wait(14).to({_off:false},0).to({x:578.65},119).to({_off:true},1).wait(706));

	// play_movie
	this.playButton = new lib.playButton();
	this.playButton.name = "playButton";
	this.playButton.setTransform(305,245.95);
	new cjs.ButtonHelper(this.playButton, 0, 1, 2, false, new lib.playButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.playButton).to({_off:true},14).wait(826));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-207,-528.7,1374.9,1535.8000000000002);
// library properties:
lib.properties = {
	id: '38CE97547013714FBC90609F89B89870',
	width: 640,
	height: 480,
	fps: 24,
	color: "#000000",
	opacity: 1.00,
	manifest: [
		{src:"images/animate30_atlas_1.png", id:"animate30_atlas_1"},
		{src:"sounds/jazzsaxophoneloopwav.mp3", id:"jazzsaxophoneloopwav"},
		{src:"sounds/soundeffectblahblahblah239796wav.mp3", id:"soundeffectblahblahblah239796wav"},
		{src:"sounds/stormrain263044.mp3", id:"stormrain263044"},
		{src:"sounds/vibraphonechord42410wav.mp3", id:"vibraphonechord42410wav"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['38CE97547013714FBC90609F89B89870'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;
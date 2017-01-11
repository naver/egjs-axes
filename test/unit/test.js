/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/



QUnit.module("movableCoord methods Test", {
	beforeEach : function() {
		this.inst = new eg.MovableCoord( {
			min : [ 0, 0 ],
			max : [ 300, 400 ],
			bounce : 100,
			margin : 0,
			circular : false
		});
	},
	afterEach : function() {
		this.inst.destroy();
		this.inst = null;
	}
});

QUnit.test("get", function(assert) {
	// Given
	// When
	var pos1 = this.inst.get();
	var pos2 = this.inst.get();
	// Then
	notStrictEqual(pos1, pos2, "postion references are not equal.");
	assert.deepEqual(pos1, pos2, "postion values are equal.")
});

QUnit.test("setTo", function(assert) {
	// Given

	// When
	this.inst.setTo(0, 200);
	// Then
	assert.deepEqual(this.inst.get(), [0, 200], "set to position 0,200");

	// When
	this.inst.setTo(-200, 500);
	// Then
	assert.deepEqual(this.inst.get(), [0, 400], "if position parameters was out of range, set to position min or max values.");

	// When
	this.inst.setTo(600, -900);
	// Then
	assert.deepEqual(this.inst.get(), [300, 0], "if position parameters was out of range, set to position min or max values.");
});

QUnit.test("setTo : check 'change' event", function(assert) {
	var done = assert.async();
	// Given
	this.inst.on("change", function(e) {
		// Then
		assert.deepEqual(e.pos, [0, 200], "set to position 0,200");
		done();
	});
	// When
	this.inst.setTo(0, 200, 0);
});

QUnit.test("setBy", function(assert) {

	// Given
	// When
	var resultVal = this.inst.setBy(20, 20);
	// Then
	assert.equal(resultVal, this.inst, "return instance");
	assert.deepEqual(this.inst.get(), [20, 20], "set to position 20,20 relatively");
	// When
	resultVal = this.inst.setBy(-10, -10);
	// Then
	assert.equal(resultVal, this.inst, "return instance");
	assert.deepEqual(this.inst.get(), [10, 10], "set to position -10,-10 relatively");
	// When
	resultVal = this.inst.setBy(-1000, -1000);
	// Then
	assert.equal(resultVal, this.inst, "return instance");
	assert.deepEqual(this.inst.get(), [0, 0], "if position parameters was out of range, set to position min or max values.");
	// When
	resultVal = this.inst.setBy(1000, 1000);
	// Then
	assert.equal(resultVal, this.inst, "return instance");
	assert.deepEqual(this.inst.get(), [300, 400], "if position parameters was out of range, set to position min or max values.");
});

QUnit.test("setBy : check a 'change' event", function(assert) {
	var done = assert.async();
	// Given
	this.inst.setBy(20, 20);
	this.inst.on("change", function(e) {
		// Then
		assert.deepEqual(e.pos, [10, 10], "set to position -10,-10 relatively");
		done();
	});
	// When
	this.inst.setBy(-10, -10);
});

QUnit.test("_grap : when position was not changed", function(assert) {
	// Given
	var done = assert.async();
	var firedChanged = false;
	this.inst.on("change", function(e) {
		firedChanged = true;
	});

	// When
	this.inst._status.animationParam = {};

	// Then
	this.inst._grab();
	setTimeout(function() {
		assert.equal(firedChanged, false, "must not fire 'change' event");
		done();
	},100);
});

QUnit.module("movableCoord methods Test when inputType is []", {
	beforeEach : function() {
		this.inst = new eg.MovableCoord( {
			min : [ 0, 0 ],
			max : [ 300, 400 ],
			bounce : 100,
			margin : 0,
			circular : false,
			inputType : []
		});
	},
	afterEach : function() {
		this.inst.destroy();
		this.inst = null;
	}
});

QUnit.test("setTo when inputType is []", function(assert) {
	// Given

	// When
	this.inst.setTo(0, 200);
	// Then
	assert.deepEqual(this.inst.get(), [0, 200], "set to position 0,200");

	// When
	this.inst.setTo(-200, 500);
	// Then
	assert.deepEqual(this.inst.get(), [0, 400], "if position parameters was out of range, set to position min or max values.");

	// When
	this.inst.setTo(600, -900);
	// Then
	assert.deepEqual(this.inst.get(), [300, 0], "if position parameters was out of range, set to position min or max values.");
});

QUnit.test("setTo when inputType is [] : check 'change' event", function(assert) {
	var done = assert.async();
	// Given
	this.inst.on("change", function(e) {
		// Then
		assert.deepEqual(e.pos, [0, 200], "set to position 0,200");
		done();
	})
	// When
	this.inst.setTo(0, 200, 0);
});


QUnit.test("setBy when inputType is []", function(assert) {
	// Given
	// When
	this.inst.setBy(20, 20);
	// Then
	assert.deepEqual(this.inst.get(), [20, 20], "set to position 20,20 relatively");
	// When
	this.inst.setBy(-10, -10);
	// Then
	assert.deepEqual(this.inst.get(), [10, 10], "set to position -10,-10 relatively");
	// When
	this.inst.setBy(-1000, -1000);
	// Then
	assert.deepEqual(this.inst.get(), [0, 0], "if position parameters was out of range, set to position min or max values.");
	// When
	this.inst.setBy(1000, 1000);
	// Then
	assert.deepEqual(this.inst.get(), [300, 400], "if position parameters was out of range, set to position min or max values.");
});

QUnit.module("movableCoord setTo duration Test", {
	beforeEach : function() {
		var self=this;
		this.firedChangeEvent = false;
		this.firedAnimationStartEvent = 0;
		this.firedAnimationEndEvent = 0;

		this.inst = new eg.MovableCoord( {
			min : [ 0, 0 ],
			max : [ 300, 400 ],
			bounce : 100,
			margin : 0,
			circular : false,
			maximumDuration : 200
		}).on("change", function(e) {
			self.firedChangeEvent = true;
		}).on("release", function(e) {
			ok(false, "must not fired 'release' event");
		}).on("hold", function(e) {
			ok(false, "must not fired 'hold' event");
		}).on("animationStart", function(e) {
			self.firedAnimationStartEvent++;
		}).on("animationEnd", function(e) {
			self.firedAnimationEndEvent++;
		});

	},
	afterEach : function() {
		this.inst.destroy();
		this.inst = null;
	}
});

QUnit.test("setTo : check event flow when maximumDuration(200ms) is bigger than a duration of setTo", function(assert) {
	var done = assert.async();
	// Given
	var self = this;
	// When
	this.inst.setTo(200, 200, 100);

	// Then
	setTimeout(function() {
		ok(self.firedChangeEvent, "fired 'change' event");
		assert.equal(self.firedAnimationStartEvent, 1, "fired 'animationStart' event");
		assert.equal(self.firedAnimationEndEvent, 1, "fired 'animationEnd' event");
		done();
	},150);
});

QUnit.test("setTo : check event flow when a duration of setTo is bigger than maximumDuration(200ms)", function(assert) {
	var done = assert.async();
	// Given
	var self = this;

	// When
	this.inst.setTo(200, 200, 3000);

	// Then
	setTimeout(function() {
		ok(self.firedChangeEvent, "fired 'change' event");
		assert.equal(self.firedAnimationStartEvent, 1, "fired 'animationStart' event");
		assert.equal(self.firedAnimationEndEvent, 1, "fired 'animationEnd' event");
		done();
	},250);
});

QUnit.test("setTo : check event flow when a duration of setTo is '0'", function(assert) {
	var done = assert.async();
	// Given
	var self = this;

	// When
	this.inst.setTo(200, 200, 0);

	// Then
	ok(self.firedChangeEvent, "fired 'change' event");
	assert.equal(self.firedAnimationStartEvent, 0, "not fired 'animationStart' event");
	assert.equal(self.firedAnimationEndEvent, 0, "not fired 'animationEnd' event");
	done();
});

QUnit.module("movableCoord interrupt Test", {
	beforeEach : function() {
		this.inst = new eg.MovableCoord( {
			min : [ 0, 0 ],
			max : [ 300, 400 ],
			bounce : 100,
			margin : 0,
			circular : false
		});
	},
	afterEach : function() {
		this.inst.destroy();
		this.inst = null;
	}
});


QUnit.test("interrupt test when user's action is fast", function(assert) {
	var done = assert.async();
	//Given
	var el = $("#area").get(0);
	var firedHold = 0;
	var firedRelease = 0;
	var firedAnimationStart = 0;
	var firedAnimationEnd = 0;
	assert.equal(this.inst._status.prevented, false, "init value is 'false'");
	this.inst.on( {
		"hold" : function(e) {
			firedHold++;
			assert.deepEqual(e.pos, [ 0, 0 ], "fire 'hold' event");
			assert.equal(e.hammerEvent.isFirst, true, "'hold' event is first event");
			assert.equal(this._status.prevented, true, "prevented property is 'true'");
		},
		"change" : function(e) {
			if(firedAnimationStart) {
				assert.equal(e.holding, false, "holding value was 'false' before animation event");
			} else {
				assert.equal(e.holding, true, "holding value was 'true' after animation event");
			}
			assert.equal(this._pos[0], e.pos[0], "event x-pos must equal x-pos of the object");
			assert.equal(this._pos[1], e.pos[1], "event y-pos must equal y-pos of the object");
			assert.equal(this._status.prevented, true, "prevented property is 'true'");
		},
		"release" : function(e) {
			firedRelease++;
			ok(true, "fire 'release' event");
			assert.equal(this._status.prevented, true, "prevented property is 'true'");
		},
		"animationStart" : function(e) {
			firedAnimationStart++;
			ok(true, "fire 'animationStart' event");
			assert.equal(this._status.prevented, true, "prevented property is 'true'");
		},
		"animationEnd" : function(e) {
			firedAnimationEnd++;
			ok(true, "fire 'animationEnd' event");
			assert.equal(this._status.prevented, false, "prevented property is 'false'");
		}
	});
	this.inst.bind(el, {
		interruptable : false
	});

	// When
	Simulator.gestures.pan(el, {
		pos: [0, 0],
            deltaX: 100,
            deltaY: 100,
            duration: 1000,
            easing: "linear"
	}, function() {
		// Then
		// for test custom event
		setTimeout(function() {
			assert.equal(firedHold, 1,"fired 'hold' event");
			assert.equal(firedRelease,1,"fired 'release' event");
			assert.equal(firedAnimationStart, 1,"fired 'animationStart' event");
			assert.equal(firedAnimationEnd, 1,"fired 'animationEnd' event");
			done();
		},1000);
    	});
});

QUnit.test("interrupt test when stop method was called in 'animationStart' event", function(assert) {
	var done = assert.async();
	//Given
	var el = $("#area").get(0);
	var timer = null;
	var firedRelease = 0;
	var firedAnimationStart = 0;
	var firedAnimationEnd = 0;
	assert.equal(this.inst._status.prevented, false, "init value is 'false'");
	this.inst.on( {
		"change" : function(e) {
			if(firedAnimationStart) {
				assert.equal(e.holding, false, "holding value was 'false' before animation event");
			} else {
				assert.equal(e.holding, true, "holding value was 'true' after animation event");
			}
			assert.equal(this._status.prevented, true, "prevented property is 'true'");
		},
		"release" : function(e) {
			firedRelease++;
			ok(true, "fire 'release' event");
			assert.equal(this._status.prevented, true, "prevented property is 'true'");
		},
		"animationStart" : function(e) {
			firedAnimationStart++;
			e.stop();
			timer = setTimeout(function() {
				timer = null;
				e.done();
			}, e.duration);
			ok(true, "fire 'animation' event");
			assert.equal(this._status.prevented, true, "prevented property is 'true'");
		},
		"animationEnd" : function(e) {
			firedAnimationEnd++;
			ok(true, "fire 'animationEnd' event");
			assert.equal(this._status.prevented, false, "prevented property is 'false'");
		}
	});
	this.inst.bind(el, {
		interruptable : false
	});

	// When
	Simulator.gestures.pan(el, {
		pos: [0, 0],
            deltaX: 100,
            deltaY: 100,
            duration: 1000,
            easing: "linear"
	}, function() {
		// Then
		// for test custom event
		setTimeout(function() {
			assert.equal(firedRelease,1,"fired 'release' event");
			assert.equal(firedAnimationStart, 1,"fired 'animationStart' event");
			assert.equal(firedAnimationEnd, 1,"fired 'animationEnd' event");
			done();
		},1000);
    	});
});

QUnit.test("interrupt test when 'setTo' method is called : duration = 0", function(assert) {
	//Given
	var el = $("#area").get(0);
	assert.equal(this.inst._status.prevented, false, "init value is 'false'");
	this.inst.on( {
		"change" : function(e) {
			assert.equal(this._status.prevented, true, "prevented property is 'true'");
		}
	});
	this.inst.bind(el, {
		interruptable : false
	});

	// When
	this.inst.setTo(200,200);

	// Then
	assert.equal(this.inst._status.prevented, false, "prevented property is 'false'");

	// When
	this.inst.setTo(100,100);

	// Then
	assert.equal(this.inst._status.prevented, false, "prevented property is 'false'");
});


QUnit.test("interrupt test when 'setTo' method is called : duration = 100", function(assert) {
	var done = assert.async();
	//Given
	var el = $("#area").get(0);
	assert.equal(this.inst._status.prevented, false, "init value is 'false'");
	this.inst.on( {
		"change" : function(e) {
			assert.equal(this._status.prevented, true, "prevented property is 'true'");
		},
		"animationStart" : function(e) {
			assert.equal(this._status.prevented, true, "prevented property is 'true'");
		},
		"animationEnd" : function(e) {
			assert.equal(this._status.prevented, false, "prevented property is 'false'");
		}
	});
	this.inst.bind(el, {
		interruptable : false
	});

	// When
	var self = this;
	this.inst.setTo(200,200,100);
	setTimeout(function() {
		// Then
		assert.equal(self.inst._status.prevented, false, "prevented property is 'false'");
		self.inst.setTo(100,0,100);
		setTimeout(function() {
			// Then
			assert.equal(self.inst._status.prevented, false, "prevented property is 'false'");
			done();
		},150);
	},150);
});

QUnit.test("interrupt test after 'setTo' method is called : move to same position", function(assert) {
	var done = assert.async();
	//Given
	var el = $("#area").get(0);
	assert.equal(this.inst._status.prevented, false, "init value is 'false'");
	this.inst.on( {
		"change" : function(e) {
			assert.equal(this._status.prevented, true, "prevented property is 'true'");
		},
		"animationStart" : function(e) {
			assert.equal(this._status.prevented, true, "prevented property is 'true'");
		},
		"animationEnd" : function(e) {
			assert.equal(this._status.prevented, false, "prevented property is 'false'");
		}
	});
	this.inst.bind(el, {
		interruptable : false
	});

	// When
	var self = this;
	this.inst.setTo(200,200,100);
	setTimeout(function() {
		// Then
		assert.equal(self.inst._status.prevented, false, "prevented property is 'false'");
		// move to same position
		self.inst.setTo(200,200,100);
		setTimeout(function() {
			// Then
			assert.equal(self.inst._status.prevented, false, "prevented property is 'false'");
			done();
		},150);
	},150);
});


QUnit.test("interrupt test after tap gesture", function(assert) {
	var done = assert.async();
	//Given
	var el = $("#area").get(0);
	var firedHold =0;
	var firedRelease = 0;

	this.inst.on( {
		"hold" : function(e) {
			firedHold++;
			assert.deepEqual(e.pos, [ 0, 0 ], "fire 'hold' event");
			assert.equal(e.hammerEvent.isFirst, true, "'hold' event is first event");
			assert.equal(this._isInterrupting(), true, "_isInterrupting is 'true'");
		},
		"change" : function(e) {
			ok(false, "must not fired 'change' event");
		},
		"release" : function(e) {
			firedRelease++;
			ok(true, "fire 'release' event");
			assert.equal(this._isInterrupting(), false, "_isInterrupting is 'false'");
		},
		"animationStart" : function(e) {
			ok(false, "must not fired 'animationStart' event");
		},
		"animationEnd" : function(e) {
			ok(false, "must not fired 'animationEnd' event");
		}
	});
	this.inst.bind(el, {
		interruptable : false
	});

	// When
	Simulator.gestures.tap(el, {
		pos: [50, 50]
	}, function() {
		// Then
		// for test custom event
		setTimeout(function() {
			assert.equal(firedHold,1,"fired 'hold' event");
			assert.equal(firedRelease,1,"fired 'release' event");
			done();
		},1000);
    	});
});

QUnit.test("interrupt test. Second 'MovableCoord move' can be available after 'no move' by first MovableCoord move", function(assert) {
	var EXPECTED_RELEASE_COUNT = 2;
	var releaseCount = 0;
	var done = assert.async();
	//Given
	var el = $("#area").get(0);

	this.inst.on( {
		"release" : function(e) {
			releaseCount++;
		}
	});

	this.inst.bind(el, {
		interruptable: false
	});

	this.inst.options.bounce = [0, 0, 0, 0];

	// When
	Simulator.gestures.pan(el, {
		pos: [100, 100],
            deltaX: -10,
            deltaY: 0,
            duration: 1000,
            easing: "linear"
	}, function() {
		Simulator.gestures.pan(el, {
			pos: [100, 100],
            deltaX: 0,
            deltaY: -10,
            duration: 1000,
            easing: "linear"
		}, function() {
			assert.equal(releaseCount, EXPECTED_RELEASE_COUNT,
				"Second 'MovableCoord move' can be available after 'No move' by first MovableCoord move")
			done();
		});
    });
});

QUnit.module("movableCoord event Test", {
	beforeEach : function() {
		this.inst = new eg.MovableCoord( {
			min : [ 0, 0 ],
			max : [ 300, 400 ],
			bounce : 100,
			margin : 0,
			circular : false
		});
	},
	afterEach : function() {
		this.inst.destroy();
		this.inst = null;
	}
});


QUnit.test("movement direction test (DIRECTION_ALL)", function(assert) {
	var done = assert.async();
	//Given
	var el = $("#area").get(0);

	this.inst.on( {
		"release" : function(e) {
			assert.equal(e.depaPos[0], 10)
			assert.equal(e.depaPos[1], 10)
			assert.equal(this._pos[0], 10)
			assert.equal(this._pos[1], 10)
		}
	});
	this.inst.bind(el, {
		direction : eg.MovableCoord.DIRECTION_ALL
	});

	// When
	Simulator.gestures.pan(el, {
		pos: [0, 0],
            deltaX: 10,
            deltaY: 10,
            duration: 2000,
            easing: "linear"
	}, function() {
		done();
    	});
});


QUnit.test("movement direction test (DIRECTION_HORIZONTAL)", function(assert) {
	var done = assert.async();
	//Given
	var el = $("#area").get(0);

	this.inst.on( {
		"release" : function(e) {
			assert.equal(e.depaPos[0], 10)
			assert.equal(e.depaPos[1], 0)
			assert.equal(this._pos[0], 10)
			assert.equal(this._pos[1], 0)
		}
	});
	this.inst.bind(el, {
		direction : eg.MovableCoord.DIRECTION_HORIZONTAL
	});

	// When
	Simulator.gestures.pan(el, {
		pos: [0, 0],
            deltaX: 10,
            deltaY: 10,
            duration: 2000,
            easing: "linear"
	}, function() {
		done();
    	});
});


QUnit.test("movement direction test (DIRECTION_VERTICAL)", function(assert) {
	var done = assert.async();
	//Given
	var el = $("#area").get(0);

	this.inst.on( {
		"release" : function(e) {
			assert.equal(e.depaPos[0], 0)
			assert.equal(e.depaPos[1], 10)
			assert.equal(this._pos[0], 0)
			assert.equal(this._pos[1], 10)
		}
	});
	this.inst.bind(el, {
		direction : eg.MovableCoord.DIRECTION_VERTICAL
	});

	// When
	Simulator.gestures.pan(el, {
		pos: [0, 0],
            deltaX: 3,
            deltaY: 10,
            duration: 2000,
            easing: "linear"
	}, function() {
		done();
    	});
});

QUnit.test("cross movement test (vertical movement on DIRECTION_HORIZONTAL)", function(assert) {
	var done = assert.async();
	//Given
	var el = $("#area").get(0);

	/**
	 * release event must be expired although the direction is not concerned
	 */
	this.inst.on({
		"release" : function(e) {
			//Then
			assert.equal(e.destPos[0], 0);
			assert.equal(e.destPos[1], 0);
		}
	});
	this.inst.bind(el, {
		direction : eg.MovableCoord.DIRECTION_HORIZONTAL
	});

	// When
	Simulator.gestures.pan(el, {
		pos: [0, 0],
            deltaX: 0,
            deltaY: 10,
            duration: 1000,
            easing: "linear"
	}, done);
});

QUnit.test("cross movement test (horizontal movement on DIRECTION_VERTICAL)", function(assert) {
	var done = assert.async();
	//Given
	var el = $("#area").get(0);

	/**
	 * release event must be expired although the direction is not concerned
	 */
	this.inst.on({
		"release" : function(e) {
			//Then
			assert.equal(e.destPos[0], 0);
			assert.equal(e.destPos[1], 0);
		}
	});
	this.inst.bind(el, {
		direction : eg.MovableCoord.DIRECTION_VERTICAL
	});

	// When
	Simulator.gestures.pan(el, {
		pos: [0, 0],
            deltaX: 10,
            deltaY: 0,
            duration: 1000,
            easing: "linear"
	}, done);
});

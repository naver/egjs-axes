import HammerManager from '../../src/hammerManager.js';

describe("HammerManager Test", function() {
    beforeEach(() => {
		  this.inst = null;
    });
    afterEach(() => {
      if(this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
    });
    
    it("should check a initialization empty value", () => {
        // Given
        // When
        // Then
    });
});


// QUnit.module("movableCoord bind/unbind/getHammer Test", {
// 	beforeEach : function() {
// 		this.inst = new eg.MovableCoord( {
// 			min : [ 0, 0 ],
// 			max : [ 300, 400 ],
// 			bounce : 100,
// 			margin : 0,
// 			circular : false
// 		});
// 	},
// 	afterEach : function() {
// 		if (this.inst) {
// 			this.inst.destroy();
// 			this.inst = null;
// 		}
// 	}
// });

// QUnit.test("bind", function(assert) {
// 	// Given
// 	var el = document.getElementById("area");
// 	var before = el[eg.MovableCoord._KEY];
// 	var beforeHammerCount = Object.keys(this.inst._hammers).length;

// 	// When
// 	this.inst.bind(el, {
// 		direction : eg.MovableCoord.DIRECTION_ALL
// 	});

// 	// Then
// 	var key = el[eg.MovableCoord._KEY];
// 	assert.equal(before, undefined, "key data value is 'undefined'' before call bind method" );
// 	assert.notEqual(key, undefined, "key data value is something after call bind method" );
// 	assert.equal(beforeHammerCount+1, Object.keys(this.inst._hammers).length, "added hammer instance after call bind method" );
// });

// QUnit.test("bind with inputType", function(assert) {
// 	// Given
// 	var el = document.getElementById("area");
// 	var before = el[eg.MovableCoord._KEY];
// 	var beforeHammerCount = Object.keys(this.inst._hammers).length;

// 	// When
// 	var returnVal = this.inst.bind(el, {
// 		direction : eg.MovableCoord.DIRECTION_ALL,
// 		inputType : null
// 	});

// 	// Then
// 	var key = el[eg.MovableCoord._KEY];
// 	assert.equal(returnVal, this.inst, "return instance" );
// 	assert.equal(before, undefined, "key data value is 'undefined'' before call bind method" );
// 	assert.equal(key, undefined, "key data value is 'undefined' after call bind method" );
// 	assert.equal(beforeHammerCount, Object.keys(this.inst._hammers).length, "nothing" );
// });

// QUnit.test("unbind", function(assert) {
// 	// Given
// 	var el = document.getElementById("area");
// 	this.inst.bind(el, {
// 		direction : eg.MovableCoord.DIRECTION_ALL
// 	});
// 	var before = el[eg.MovableCoord._KEY];
// 	var beforeHammerCount = Object.keys(this.inst._hammers).length;

// 	// When
// 	var returnVal = this.inst.unbind(el);
// 	// Then
// 	var key = el[eg.MovableCoord._KEY];
// 	assert.equal(returnVal, this.inst, "return instance" );
// 	assert.notEqual(before, key, "key data value was changed after call 'unbind' method" );
// 	assert.equal(key, undefined, "key data value is 'undefined'' after call bind method" );
// 	assert.equal(beforeHammerCount-1, Object.keys(this.inst._hammers).length, "removed hammer instance after call bind method" );
// });

// QUnit.test("unbind with inputType", function(assert) {
// 	// Given
// 	var el = document.getElementById("area");
// 	this.inst.bind(el, {
// 		direction : eg.MovableCoord.DIRECTION_ALL,
// 		inputType : []
// 	});
// 	var before = el[eg.MovableCoord._KEY];
// 	var beforeHammerCount = Object.keys(this.inst._hammers).length;

// 	// When
// 	this.inst.unbind(el);

// 	// Then
// 	var key = el[eg.MovableCoord._KEY];
// 	assert.equal(before, undefined, "key data value is 'undefined'' after call 'unbind' method" );
// 	assert.equal(key, undefined, "key data value is 'undefined'' after call bind method" );
// 	assert.equal(beforeHammerCount, Object.keys(this.inst._hammers).length, "nothing" );
// });

// QUnit.test("one element, double bind", function(assert) {
// 	// Given
// 	var el = document.getElementById("area");
// 	this.inst.bind(el, {
// 		direction : eg.MovableCoord.DIRECTION_ALL
// 	});
// 	var beforeHammerCount = Object.keys(this.inst._hammers).length;
// 	var before = el[eg.MovableCoord._KEY];
// 	var beforeHammerObject = this.inst._hammers[before];

// 	// When
// 	this.inst.bind(el, {
// 		direction : eg.MovableCoord.DIRECTION_HORIZONTAL
// 	});

// 	// Then
// 	var key = el[eg.MovableCoord._KEY];
// 	assert.equal(before, key, "key data value is same" );
// 	assert.notDeepEqual(beforeHammerObject.inst, this.inst._hammers[key].inst, "recreate hammer instance" );
// 	assert.equal(beforeHammerCount, Object.keys(this.inst._hammers).length, "hammer instance count is same" );
// });


// QUnit.test("bind, after calling destroy", function(assert) {
// 	// Given
// 	var el = document.getElementById("area");
// 	this.inst.bind(el, {
// 		direction : eg.MovableCoord.DIRECTION_ALL
// 	});

// 	// When
// 	this.inst.destroy();

// 	// Then
// 	var key = el[eg.MovableCoord._KEY];
// 	assert.equal(key, undefined, "key is undefined" );
// 	assert.equal(Object.keys(this.inst._hammers).length, 0, "hammer instance count is zero" );
// 	this.inst = null;
// });


// QUnit.test("getHammer", function(assert) {
// 	// Given
// 	var el = document.getElementById("area");

// 	// When
// 	this.inst.bind(el, {
// 		direction : eg.MovableCoord.DIRECTION_ALL
// 	});

// 	// Then
// 	assert.equal(Object.keys(this.inst._hammers).length, 1, "hammer instance count is 1" );
// 	assert.equal(this.inst.getHammer(el), this.inst._hammers[Object.keys(this.inst._hammers)[0]].inst, "hammer instance is equal" );

// 	// When
// 	this.inst.unbind(el, {
// 		direction : eg.MovableCoord.DIRECTION_ALL
// 	});

// 	// Then
// 	assert.equal(Object.keys(this.inst._hammers).length, 0, "hammer instance count is zero" );
// 	assert.equal(this.inst.getHammer(el), null, "hammer instance is equal" );
// });



// QUnit.test("_convertInputType (support touch)", function(assert) {
// 	// Given
// 	var globalWithToucnSupport = {
// 		"ontouchstart": {}
// 	};
// 	var method = eg.invoke("movableCoord", [eg, globalWithToucnSupport, Hammer]);
// 	var inst = new method.MovableCoord( {
// 		min : [ 0, 0 ],
// 		max : [ 300, 400 ],
// 		bounce : 100,
// 		margin : 0,
// 		circular : false
// 	});
// 	var supportTouch = true;
// 	var notSupportTouch = false;

// 	// When
// 	var inputType = [ "touch", "mouse" ];
// 	// Then
// 	assert.equal(inst._convertInputType(inputType), Hammer.TouchInput, "check TouchInput");

// 	// When
// 	inputType = [ "touch" ];
// 	// Then
// 	assert.equal(inst._convertInputType(inputType), Hammer.TouchInput, "check TouchInput");

// 	// When
// 	inputType = [ "mouse" ];
// 	// Then
// 	assert.equal(inst._convertInputType(inputType), Hammer.MouseInput, "check MouseInput");

// 	// When
// 	inputType = [ ];
// 	// Then
// 	assert.equal(inst._convertInputType(inputType), null, "type is null");
// });

// QUnit.test("_convertInputType (not support touch)", function(assert) {
// 	// Given
// 	var globalWithoutToucnSupport = {};
// 	var method = eg.invoke("movableCoord", [eg, globalWithoutToucnSupport, Hammer]);
// 	var inst = new method.MovableCoord( {
// 		min : [ 0, 0 ],
// 		max : [ 300, 400 ],
// 		bounce : 100,
// 		margin : 0,
// 		circular : false
// 	});
// 	var supportTouch = true;
// 	var notSupportTouch = false;

// 	// When
// 	var inputType = [ "touch", "mouse" ];
// 	// Then
// 	assert.equal(inst._convertInputType(inputType), Hammer.MouseInput, "check TouchInput(not supporting touch)");

// 	// When
// 	inputType = [ "touch" ];
// 	// Then
// 	assert.equal(inst._convertInputType(inputType), null, "check TouchInput(not supporting touch)");

// 	// When
// 	inputType = [ "mouse" ];
// 	// Then
// 	assert.equal(inst._convertInputType(inputType), Hammer.MouseInput, "check MouseInput(not supporting touch)");

// 	// When
// 	inputType = [ ];
// 	// Then
// 	assert.equal(inst._convertInputType(inputType), null, "type is null(not supporting touch)");
// });

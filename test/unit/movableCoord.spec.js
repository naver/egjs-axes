import MovableCoord from '../../src/movableCoord.js';

Simulator.setType('touch');
Simulator.events.touch.fakeSupport();
		  

describe("MovableCoord init Test", function() {
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
        this.inst = new MovableCoord();
        // Then
        expect(this.inst).to.be.exist;
    });

    it("should check a initialization position value", () => {
        // Given
        // When
        this.inst = new MovableCoord( {
          min : [ -100, 0 ],
          max : [ 300, 400 ]
        });
        // Then
        expect(this.inst.get()).to.deep.equal([-100, 0]);
    });    


    it("should check initialization status", () => {
      // Given
      // When
      this.inst = new MovableCoord( {
        bounce : [ 100, 200, 50, 30 ],
        margin : [ 0, 100, 0, 100 ],
        circular : [ true, false , true, false ]
      });
      this.inst.destroy();

      // Then
      expect(this.inst.options.bounce).to.deep.equal([100, 200, 50, 30]);
      expect(this.inst.options.margin).to.deep.equal([0, 100, 0, 100]);
      expect(this.inst.options.circular).to.deep.equal([true, false, true, false]);

      // When
      this.inst = new MovableCoord( {
        bounce : [ 100, 200 ],
        margin : [ 0, 100 ],
        circular : [ true, false ]
      });
      this.inst.destroy();

      // Then
      expect(this.inst.options.bounce).to.deep.equal([100, 200, 100, 200]);
      expect(this.inst.options.margin).to.deep.equal([0, 100, 0, 100]);
      expect(this.inst.options.circular).to.deep.equal([true, false, true, false]);

      // When
      this.inst = new MovableCoord( {
        bounce : 50,
        margin : 10,
        circular : false
      });
      this.inst.destroy();

      // Then
      expect(this.inst.options.bounce).to.deep.equal([50, 50, 50, 50]);
      expect(this.inst.options.margin).to.deep.equal([10, 10, 10, 10]);
      expect(this.inst.options.circular).to.deep.equal([false, false, false, false]);
    });
});
 

// describe("MovableCoord Event Test", function() {
//     this.timeout(10000);
//     beforeEach(() => {
//       this.inst = new MovableCoord( {
//         min : [ 0, 0 ],
//         max : [ 200, 400 ],
//         bounce : 100,
//         margin : 0,
//         circular : false
//       });
//       var el = sandbox();
//       var html = `<div id="area" 
//         style="position:relative; border:5px solid #444; width:200px; height:400px; color:#aaa; margin:0;box-sizing:content-box; z-index:9;"></div>
//         <div id="hmove" style="position:relative; border:5px solid #888; background-color:yellowgreen;width:200px; height:80px;"></div>
//         <div id="vmove" style="position:relative; border:5px solid #888; background-color:skyblue;width:80px; height:400px; left:210px; top:-500px;"></div>`;
//       el.innerHTML = html;
//       this.el = el;

//     });
//     afterEach(() => {
//       if(this.inst) {
//         this.inst.destroy();
//         this.inst = null;
//       }
//       // cleanup();
//     });
    
//     it("should check slow movement test (no-velocity)", (done) => {
//       // Given
//       var firedHold =0;
//       var firedRelease = 0;
//       var firedAnimationEnd = 0;


//       var holdHandler = sinon.spy();
//       var changeHandler = sinon.spy();
//       var releaseHandler = sinon.spy();
//       var animationStartHandler = sinon.spy();
//       var animationEndHandler = sinon.spy();

//       this.inst.on( {
//         "hold" : function(e) {
//           firedHold++;
//           // assert.deepEqual(e.pos, [ 0, 0 ], "fire 'hold' event");
//           // assert.equal(e.hammerEvent.isFirst, true, "'hold' event is first event");
//           // assert.equal(this._isInterrupting(), true, "_isInterrupting is 'true'");
//           console.log("hold");
//         },
//         "change" : function(e) {
//           // assert.equal(e.holding, true, "holding value is 'true' before animationStart event");
//           // assert.equal(this._isInterrupting(), true, "_isInterrupting is 'true'");
//           console.log("change");
//         },
//         "release" : function(e) {
//           firedRelease++;
//           console.log("release");
//           // ok(true, "fire 'release' event");
//           // assert.equal(this._isInterrupting(), true, "_isInterrupting is 'true'");
//         }
//         // "hold" : holdHandler,
//         // "animationStart" : animationStartHandler,
//         // "animationEnd" : animationEndHandler
//       });
//       this.inst.bind(this.el);

//       // When
//       Simulator.gestures.pan(this.el, {
//         pos: [30, 30],
//         deltaX: 10,
//         deltaY: 10,
//         duration: 3000,
//         easing: "linear"
//       }, function() {
//         // Then
//         // for test custom event
//         setTimeout(function() {
//           console.log(holdHandler.calledOnce)
//           // expect(holdHandler.calledOnce).to.be.true;
//           console.log(holdHandler.getCall(0));
          
          
//           // expect(releaseHandler.calledOnce).to.be.true;
//           expect(animationStartHandler.called).to.be.false;
//           expect(animationEndHandler.called).to.be.false;
//           done();
//         },1000);
//       });
//     });
// });

// QUnit.test("slow movement test (no-velocity)", function(assert) {
// 	var done = assert.async();

// });

// QUnit.test("slow movement test (no-velocity), release outside", function(assert) {
// 	var done = assert.async();
// 	//Given
// 	var el = $("#area").get(0);
// 	var firedHold =0;
// 	var firedRelease = 0;
// 	var firedAnimationEnd = 0;
// 	var firedAnimationStart = 0;

// 	this.inst.on( {
// 		"hold" : function(e) {
// 			firedHold++;
// 			assert.deepEqual(e.pos, [ 0, 0 ], "fire 'hold' event");
// 			assert.equal(e.hammerEvent.isFirst, true, "'hold' event is first event");
// 			assert.equal(this._isInterrupting(), true, "_isInterrupting is 'true'");
// 		},
// 		"change" : function(e) {
// 			if(firedAnimationStart === 0) {
// 				assert.equal(e.holding, true, "holding value is 'true' before animationStart event");
// 			} else {
// 				assert.equal(e.holding, false, "holding value is 'false' after animationStart event");
// 			}
// 			assert.equal(this._isInterrupting(), true, "_isInterrupting is 'true'");
// 		},
// 		"release" : function(e) {
// 			firedRelease++;
// 			ok(true, "fire 'release' event");
// 			assert.equal(this._isInterrupting(), true, "_isInterrupting is 'true'");
// 		},
// 		"animationStart" : function(e) {
// 			firedAnimationStart++;
// 			ok(true, "must fired 'animationStart' event");
// 			assert.equal(this._isInterrupting(), true, "_isInterrupting is 'true'");
// 		},
// 		"animationEnd" : function(e) {
// 			firedAnimationEnd++;
// 			ok(true, "fire 'animationEnd' event");
// 			assert.equal(this._isInterrupting(), true, "_isInterrupting is 'true'");
// 		}
// 	});
// 	this.inst.bind(el);

// 	// When
// 	Simulator.gestures.pan(el, {
// 		pos: [0, 0],
//             deltaX: 350,
//             deltaY: 10,
//             duration: 1000,
//             easing: "linear"
// 	}, function() {
// 		// Then
// 		// for test custom event
// 		setTimeout(function() {
// 			assert.equal(firedHold, 1, "fired 'hold' event");
// 			assert.equal(firedRelease, 1,"fired 'release' event");
// 			assert.equal(firedAnimationStart, 1, "fired 'animationStrt' event");
// 			assert.equal(firedAnimationEnd, 1, "fired 'animationEnd' event");
// 			done();
// 		},1000);
//     	});
// });

// QUnit.test("fast movement test (velocity)", function(assert) {
// 	var done = assert.async();
// 	//Given
// 	var el = $("#area").get(0);
// 	var firedHold = 0;
// 	var firedRelease = 0;
// 	var firedAnimationStart = 0;
// 	var firedAnimationEnd = 0;

// 	this.inst.on( {
// 		"hold" : function(e) {
// 			firedHold++;
// 			assert.deepEqual(e.pos, [ 0, 0 ], "fire 'hold' event");
// 			assert.equal(e.hammerEvent.isFirst, true, "'hold' event is first event");
// 			assert.equal(this._isInterrupting(), true, "_isInterrupting is 'true'");
// 		},
// 		"change" : function(e) {
// 			if(firedAnimationStart) {
// 				assert.equal(e.holding, false, "holding value was 'false' before animationStart event");
// 			} else {
// 				assert.equal(e.holding, true, "holding value was 'true' after animationStart event");
// 			}
// 			assert.equal(this._pos[0], e.pos[0], "event x-pos must equal x-pos of the object");
// 			assert.equal(this._pos[1], e.pos[1], "event y-pos must equal y-pos of the object");
// 			assert.equal(this._isInterrupting(), true, "_isInterrupting is 'true'");
// 		},
// 		"release" : function(e) {
// 			firedRelease++;
// 			ok(true, "fire 'release' event");
// 			assert.equal(this._isInterrupting(), true, "_isInterrupting is 'true'");
// 		},
// 		"animationStart" : function(e) {
// 			firedAnimationStart++;
// 			ok(true, "fire 'animationStart' event");
// 			assert.equal(this._isInterrupting(), true, "_isInterrupting is 'true'");
// 		},
// 		"animationEnd" : function(e) {
// 			firedAnimationEnd++;
// 			ok(true, "fire 'animationEnd' event");
// 			assert.equal(this._isInterrupting(), true, "_isInterrupting is 'true'");
// 		}
// 	});
// 	this.inst.bind(el);

// 	// When
// 	Simulator.gestures.pan(el, {
// 		pos: [0, 0],
//             deltaX: 100,
//             deltaY: 100,
//             duration: 1000,
//             easing: "linear"
// 	}, function() {
// 		// Then
// 		// for test custom event
// 		setTimeout(function() {
// 			assert.equal(firedHold, 1,"fired 'hold' event");
// 			assert.equal(firedRelease,1,"fired 'release' event");
// 			assert.equal(firedAnimationStart, 1,"fired 'animationStart' event");
// 			assert.equal(firedAnimationEnd, 1,"fired 'animationEnd' event");
// 			done();
// 		},1000);
//     	});
// });

// QUnit.test("movement test when stop method was called in 'animationStart' event", function(assert) {
// 	var done = assert.async();
// 	//Given
// 	var el = $("#area").get(0);
// 	var timer = null;
// 	var firedRelease = 0;
// 	var firedAnimationStart = 0;
// 	var firedAnimationEnd = 0;

// 	this.inst.on( {
// 		"change" : function(e) {
// 			if(firedAnimationStart) {
// 				assert.equal(e.holding, false, "holding value was 'false' before animationStart event");
// 			} else {
// 				assert.equal(e.holding, true, "holding value was 'true' after animationStart event");
// 			}
// 			assert.equal(this._isInterrupting(), true, "_isInterrupting is 'true'");
// 		},
// 		"release" : function(e) {
// 			firedRelease++;
// 			ok(true, "fire 'release' event");
// 			assert.equal(this._isInterrupting(), true, "_isInterrupting is 'true'");
// 		},
// 		"animationStart" : function(e) {
// 			firedAnimationStart++;
// 			e.stop();
// 			timer = setTimeout(function() {
// 				timer = null;
// 				e.done();
// 			}, e.duration);
// 			ok(true, "fire 'animationStart' event");
// 			assert.equal(this._isInterrupting(), true, "_isInterrupting is 'true'");
// 		},
// 		"animationEnd" : function(e) {
// 			firedAnimationEnd++;
// 			ok(true, "fire 'animationEnd' event");
// 			assert.equal(this._isInterrupting(), true, "_isInterrupting is 'true'");
// 		}
// 	});
// 	this.inst.bind(el);

// 	// When
// 	Simulator.gestures.pan(el, {
// 		pos: [0, 0],
//             deltaX: 100,
//             deltaY: 100,
//             duration: 1000,
//             easing: "linear"
// 	}, function() {
// 		// Then
// 		// for test custom event
// 		setTimeout(function() {
// 			assert.equal(firedRelease,1,"fired 'release' event");
// 			assert.equal(firedAnimationStart, 1,"fired 'animationStart' event");
// 			assert.equal(firedAnimationEnd, 1,"fired 'animationEnd' event");
// 			done();
// 		},1000);
//     	});
// });


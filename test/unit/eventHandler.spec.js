import MovableCoord from '../../src/MovableCoord.js';

describe("EventHandler interruptable:false Test", function() {
    beforeEach(() => {
        this.preventedFn = function() {
            expect(this._status.prevented).to.be.true;
        };
        this.notPreventedFn = function() {
            expect(this._status.prevented).to.be.false;
        };
        this.inst = new MovableCoord( {
            min : [ 0, 0 ],
            max : [ 300, 400 ],
            bounce : 100,
            margin : 0,
            circular : false,
            maximumDuration : 200
        });
        this.el = sandbox();
        var html = `<div id="area" 
            style="position:relative; border:5px solid #444; width:300px; height:400px; color:#aaa; margin:0;box-sizing:content-box; z-index:9;"></div>`;
        this.el.innerHTML = html;
    });
    afterEach(() => {
        if(this.inst) {
            this.inst.destroy();
            this.inst = null;
        }
        cleanup();
    });
    it("should check interrupt test when user's action is fast", (done) => {
        // Given
        var holdHandler = sinon.spy(this.preventedFn);
        var changeHandler = sinon.spy(this.preventedFn);
        var releaseHandler = sinon.spy(this.preventedFn);
        var animationStartHandler = sinon.spy(this.preventedFn);       
        var animationEndHandler = sinon.spy(this.notPreventedFn);       

        this.inst.on({
            "hold": holdHandler,
            "change": changeHandler,
            "release": releaseHandler,
            "animationStart": animationStartHandler,
            "animationEnd": animationEndHandler
        });
        this.inst.bind(this.el, {
            interruptable : false
        });

        // when
        Simulator.gestures.pan(this.el, {
            pos: [0, 0],
            deltaX: 100,
            deltaY: 100,
            duration: 1000,
            easing: "linear"
        }, function() {
            // Then
            // for test custom event
            setTimeout(function() {
                expect(holdHandler.calledOnce).to.be.true;
                expect(changeHandler.called).to.be.true;
                expect(releaseHandler.calledOnce).to.be.true;
                expect(animationStartHandler.calledOnce).to.be.true;
                expect(animationEndHandler.calledOnce).to.be.true;
                done();
            }, 1000);    
        }); 
    });

    it("should check movement test when stop method was called in 'animationStart' event", (done) => {
      // Given
        var timer = null;
        var holdHandler = sinon.spy(this.preventedFn);
        var changeHandler = sinon.spy(this.preventedFn);
        var releaseHandler = sinon.spy(this.preventedFn);
        var animationStartHandler = sinon.spy(function(e) {
                e.stop();
                expect(this._status.prevented).to.be.true;
                timer = setTimeout(function() {
                    timer = null;
                    e.done();
                }, e.duration);
            });
        var animationEndHandler = sinon.spy(this.notPreventedFn);
        this.inst.on({
            "hold": holdHandler,
            "change": changeHandler,
            "release": releaseHandler,
            "animationStart": animationStartHandler,
            "animationEnd": animationEndHandler
        });
        this.inst.bind(this.el, {
            interruptable : false
        });
      
      // When
      Simulator.gestures.pan(this.el, {
        pos: [30, 30],
        deltaX: 100,
        deltaY: 100,
        duration: 500,
        easing: "linear"
      }, function() {
            // Then
            // for test custom event
            setTimeout(function() {
                expect(holdHandler.calledOnce).to.be.true;
                expect(changeHandler.called).to.be.true;
                expect(releaseHandler.calledOnce).to.be.true;
                expect(animationStartHandler.calledOnce).to.be.true;
                expect(animationEndHandler.calledOnce).to.be.true;
                done();
            }, 1000);    
        }); 
    });     

    it("should check interrupt test  when 'setTo' method is called : duration = 0", () => {
        // Given
        var changeHandler = sinon.spy(this.preventedFn);
        
        this.inst.on({
            "change": changeHandler
        });
        this.inst.bind(this.el, {
            interruptable : false
    	});

        // When
        this.inst.setTo(200,200);

        // Then
        expect(this.inst._status.prevented).to.be.false;
        expect(changeHandler.calledOnce).to.be.true;

        // When
        this.inst.setTo(100,100);

        // Then
        expect(this.inst._status.prevented).to.be.false;
        expect(changeHandler.calledTwice).to.be.true;
    });

    it("should check interrupt test after tap gesture", (done) => {
        // Given
        var holdHandler = sinon.spy(this.preventedFn);
        var changeHandler = sinon.spy();
        var releaseHandler = sinon.spy(this.notPreventedFn);
        var animationStartHandler = sinon.spy();       
        var animationEndHandler = sinon.spy();       

        this.inst.on({
            "hold": holdHandler,
            "change": changeHandler,
            "release": releaseHandler,
            "animationStart": animationStartHandler,
            "animationEnd": animationEndHandler
        });
        this.inst.bind(this.el, {
            interruptable : false
        });

        // When
        Simulator.gestures.tap(this.el, {
            pos: [50, 50]
        }, function() {
            // Then
            // for test custom event
            setTimeout(function() {
                expect(holdHandler.calledOnce).to.be.true;
                expect(releaseHandler.calledOnce).to.be.true;
                expect(changeHandler.called).to.be.false;
                expect(animationStartHandler.called).to.be.false;
                expect(animationEndHandler.called).to.be.false;
                done();
            }, 100);
        });
    });
});
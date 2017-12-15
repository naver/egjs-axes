import Hammer from "hammerjs";
import {PanInput} from "../../../src/inputType/PanInput";
import {PinchInput} from "../../../src/inputType/PinchInput";
import {UNIQUEKEY} from "../../../src/inputType/InputType";
import {DIRECTION} from "../../../src/const";

describe("PanInput", () => {
  describe("when hammer instance is shared", function() {
    beforeEach(() => {
      this.el = sandbox();
      this.inst1 = new PanInput(this.el);
      this.inst2 = new PinchInput(this.el);
      this.inst1.mapAxes(["x1","y1"]);
      this.inst2.mapAxes(["x2"]);
      const observer = {
        get() {
          return {
            x: 10
          }
        },
        release() {},
        hold() {},
        change() {},
        options: {
          deceleration: 0.0001
        }
      };
      this.inst1.connect(observer);
      this.inst2.hammer = this.inst1.hammer;
      this.inst2.connect(observer);

      this.beforePanstart = this.inst1.hammer.handlers["panstart"][0];
      this.beforePinchstart = this.inst2.hammer.handlers["pinchstart"][0];
      this.onPanstart = sinon.spy(this.beforePanstart);
      this.onPinchstart = sinon.spy(this.beforePinchstart);
      this.inst1.hammer.handlers["panstart"][0] = this.onPanstart;
      this.inst2.hammer.handlers["pinchstart"][0] = this.onPinchstart;      
    });
    afterEach(() => {
      this.inst1.hammer.handlers["panstart"][0] = this.beforePanstart;
      this.inst2.hammer.handlers["pinchstart"][0] = this.beforePinchstart;
              
      if (this.inst1) {
        this.inst1.destroy();
        this.inst1 = null;
      }
      if (this.inst2) {
        this.inst2.destroy();
        this.inst2 = null;
      }
      cleanup();
    });
    it("should check multi event (pan/pinch)", (done) => {
      // Given
      
      // When
      expect(this.inst1.hammer).to.be.equal(this.inst2.hammer);
      expect(this.inst1.element).to.be.equal(this.inst2.element);

      // When
      Simulator.gestures.pan(this.el, {
          pos: [0, 0],
          deltaX: 50,
          deltaY: 50,
          duration: 200,
          easing: "linear"
      }, () => {
          // Then
          expect(this.onPanstart.called).to.be.true;
          expect(this.onPinchstart.called).to.be.false;
          
          Simulator.gestures.pinch(this.el, {
              duration: 500,
              scale: 0.5
          }, () => {
              // Then
              expect(this.onPanstart.callCount).to.be.equal(1);
              expect(this.onPinchstart.callCount).to.be.equal(1);
              done();
          });
      }); 
    });
    it("should check multi dettached event (pan/pinch)", (done) => {
      // Given

      // When
      this.inst1.disconnect();
      expect(this.inst1.element).to.be.equal(this.inst2.element);

      // When
      Simulator.gestures.pan(this.el, {
          pos: [0, 0],
          deltaX: 50,
          deltaY: 50,
          duration: 200,
          easing: "linear"
      }, () => {
          // Then
          expect(this.onPanstart.called).to.be.false;
          expect(this.onPanstart.called).to.be.false;

          Simulator.gestures.pinch(this.el, {
              duration: 500,
              scale: 0.5
          }, () => {
              // Then
              expect(this.onPanstart.called).to.be.false;
              expect(this.onPanstart.called).to.be.false;
              done();
          });
      }); 
    });
  });  
  describe("instance method", function() {
    beforeEach(() => {
      this.inst = new PanInput(sandbox());
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      cleanup();
    });
    it("should check 'mapAxes' method", () => {
      // when
      this.inst.mapAxes(["x"]);

      // then
      expect(this.inst.axes).to.be.eql(["x"]);
      expect(this.inst._direction).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);

      // when
      this.inst.mapAxes(["", "y"]);

      // then
      expect(this.inst.axes).to.be.eql(["", "y"]);
      expect(this.inst._direction).to.be.equal(DIRECTION.DIRECTION_VERTICAL);

      // when
      this.inst.mapAxes(["x", "y"]);

      // then
      expect(this.inst.axes).to.be.eql(["x", "y"]);
      expect(this.inst._direction).to.be.equal(DIRECTION.DIRECTION_ALL);

      // when
      this.inst.mapAxes(["x", "y", "z"]);

      // then
      expect(this.inst.axes).to.be.eql(["x", "y", "z"]);
      expect(this.inst._direction).to.be.equal(DIRECTION.DIRECTION_ALL);
    });
    it("should check status after disconnect", () => {
      // Given
      const beforeHammer = this.inst.hammer;
      this.inst.connect({});
      
      // When
      this.inst.disconnect();

      // Then
      expect(beforeHammer).to.be.not.exist;
      expect(this.observer).to.be.not.exist;
      expect(this.inst.element).to.be.exist;
      expect(UNIQUEKEY in this.inst.element).to.be.true;
      expect(this.inst._direction).to.be.equal(DIRECTION.DIRECTION_NONE);
    });
    it("should check status after destroy", () => {
      // Given
      this.inst.connect({});
      const beforeEl = this.inst.element;
      
      // When
      this.inst.destroy();

      // Then
      expect(this.inst.hammer).to.be.not.exist;
      expect(this.inst.element).to.be.not.exist;
      expect(this.observer).to.be.not.exist;
      expect(UNIQUEKEY in beforeEl).to.be.false;
      expect(this.inst._direction).to.be.equal(DIRECTION.DIRECTION_NONE);
      
      this.inst = null;
    });
    it("should check connect when hammer instance is null and element has key property", () => {
      // Given
      this.inst.element[UNIQUEKEY] = "someting";
      
      // When 
      expect(this.inst.hammer).to.be.not.exist;
      this.inst.connect({});
      
      // Then
      expect(this.inst.hammer).to.be.exist;
    });    
  });
  describe("enable/disable", function() {
    beforeEach(() => {
      this.el = sandbox();
      this.inst = new PanInput(this.el);
      this.inst.mapAxes(["x1","y1"]);
      this.observer = {
        get() {
          return {
            x: 10
          }
        },
        release() {},
        hold() {},
        change() {},
        options: {
          deceleration: 0.0001
        }
      };
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      cleanup();
    });

    it("should check value of `enable/disalbe` methods", () => {
      // Given
      // When
      // Then
      expect(this.inst.isEnable()).to.be.false;

      // When
      this.inst.disable();

      // Then
      expect(this.inst.isEnable()).to.be.false;

      // When (hammer is not exist)
      this.inst.enable();

      // Then
      expect(this.inst.hammer).to.be.not.exist;
      expect(this.inst.isEnable()).to.be.false;

      // When (hammer is exist)
      this.inst.connect(this.observer);
      this.inst.enable();

      // Then
      expect(this.inst.hammer).to.be.exist;
      expect(this.inst.isEnable()).to.be.true;
    });    
    it("should check event when enable method is called", (done) => {
      // Given
      this.inst.connect(this.observer);
      const beforeHandler = this.inst.hammer.handlers["panstart"][0];

      // When
      expect(this.inst.isEnable()).to.be.true;
      const onPanEndHandler = sinon.spy(beforeHandler);
      this.inst.hammer.handlers["panstart"][0] = onPanEndHandler;

      // When
      Simulator.gestures.pan(this.el, {
          pos: [0, 0],
          deltaX: 50,
          deltaY: 50,
          duration: 200,
          easing: "linear"
      }, () => {
          // Then
          expect(onPanEndHandler.called).to.be.true;
          this.inst.hammer.handlers["panstart"][0] = beforeHandler;
          done();
      });
    });
    it("should check event when disable method is called", (done) => {
      // Given
      this.inst.connect(this.observer);
      const beforeHandler = this.inst.hammer.handlers["panstart"][0];
      // When

      const onPanEndHandler = sinon.spy(beforeHandler);
      this.inst.hammer.handlers["panstart"][0] = onPanEndHandler;
      expect(this.inst.isEnable()).to.be.true;
      this.inst.disable();

      // When
      Simulator.gestures.pan(this.el, {
          pos: [0, 0],
          deltaX: 50,
          deltaY: 50,
          duration: 200,
          easing: "linear"
      }, () => {
          // Then
          expect(onPanEndHandler.called).to.be.false;
          this.inst.hammer.handlers["panstart"][0] = beforeHandler;
          done();
      });
    });  
  });

  describe("static method", function() {
    it("should check user's direction", () => {
      //Given
      // When thresholdAngle = 45
      // Then
      expect(PanInput.getDirectionByAngle(0, 45)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(PanInput.getDirectionByAngle(20, 45)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(PanInput.getDirectionByAngle(45, 45)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(PanInput.getDirectionByAngle(100, 45)).to.be.equal(DIRECTION.DIRECTION_VERTICAL);
      expect(PanInput.getDirectionByAngle(134, 45)).to.be.equal(DIRECTION.DIRECTION_VERTICAL);
      expect(PanInput.getDirectionByAngle(135, 45)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(PanInput.getDirectionByAngle(136, 45)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(PanInput.getDirectionByAngle(180, 45)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);

      // When thresholdAngle = 20
      // Then
      expect(PanInput.getDirectionByAngle(0, 20)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(PanInput.getDirectionByAngle(10, 20)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(PanInput.getDirectionByAngle(20, 20)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(PanInput.getDirectionByAngle(30, 20)).to.be.equal(DIRECTION.DIRECTION_VERTICAL);
      expect(PanInput.getDirectionByAngle(50, 20)).to.be.equal(DIRECTION.DIRECTION_VERTICAL);
      expect(PanInput.getDirectionByAngle(160, 20)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(PanInput.getDirectionByAngle(161, 20)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(PanInput.getDirectionByAngle(180, 20)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);

      // When thresholdAngle = -10, 100
      expect(PanInput.getDirectionByAngle(0, -10)).to.be.equal(DIRECTION.DIRECTION_NONE);
      expect(PanInput.getDirectionByAngle(0, 100)).to.be.equal(DIRECTION.DIRECTION_NONE);
    });

    it("should check 'getNextOffset' method", () => {
      // 0.001
      expect(PanInput.getNextOffset([1.5, 1], 0.001)).to.be.eql([1352.0817282989958, 901.3878188659972]);
      expect(PanInput.getNextOffset([1, 1.5], 0.001)).to.be.eql([901.3878188659972, 1352.0817282989958]);

      // 0.01
      expect(PanInput.getNextOffset([1.5, 1], 0.01)).to.be.eql([135.20817282989958, 90.13878188659973]);
      expect(PanInput.getNextOffset([1, 1.5], 0.01)).to.be.eql([90.13878188659973, 135.20817282989958]);
    });

    it("should check 'useDirection' method", () => {
      // DIRECTION_HORIZONTAL
      expect(PanInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_ALL)).to.be.true;
      expect(PanInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_HORIZONTAL)).to.be.true;
      expect(PanInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_VERTICAL)).to.be.false;

      // DIRECTION_VERTICAL
      expect(PanInput.useDirection(DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_ALL)).to.be.true;
      expect(PanInput.useDirection(DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_HORIZONTAL)).to.be.false;
      expect(PanInput.useDirection(DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_VERTICAL)).to.be.true;
    });

    it("should check 'useDirection' method (using userDirection)", () => {
      // DIRECTION_HORIZONTAL
      expect(PanInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_ALL, DIRECTION.DIRECTION_HORIZONTAL)).to.be.true;
      expect(PanInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_ALL, DIRECTION.DIRECTION_VERTICAL)).to.be.true;
      expect(PanInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_HORIZONTAL)).to.be.true;
      expect(PanInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_VERTICAL)).to.be.false;
      expect(PanInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_HORIZONTAL)).to.be.false;
      expect(PanInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_VERTICAL)).to.be.false;

      // DIRECTION_VERTICAL
      expect(PanInput.useDirection(DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_ALL, DIRECTION.DIRECTION_HORIZONTAL)).to.be.true;
      expect(PanInput.useDirection(DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_ALL, DIRECTION.DIRECTION_VERTICAL)).to.be.true;
      expect(PanInput.useDirection(DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_HORIZONTAL)).to.be.false;
      expect(PanInput.useDirection(DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_VERTICAL)).to.be.false;
      expect(PanInput.useDirection(DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_HORIZONTAL)).to.be.false;
      expect(PanInput.useDirection(DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_VERTICAL)).to.be.true;
    });
  });
  describe("options test", function() {
    beforeEach(() => {
      this.inst = new PanInput(sandbox());
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      cleanup();
    });
    it("should check hammerManager default Options", () => {
      // Given
      expect(this.inst.options.hammerManagerOptions).to.be.eql({
        cssProps: {
          userSelect: "none",
          touchSelect: "none",
          touchCallout: "none",
          userDrag: "none",
        }
      });
      
      // When
      this.inst.connect({});

      // Then
      expect(this.inst.element.style.userSelect).to.be.equal("none");
    });
    it("should check hammerManager Options", () => {
      // Given
      this.inst.options.hammerManagerOptions.cssProps.userSelect = "auto";
      
      // When
      this.inst.connect({});

      // Then
      expect(this.inst.element.style.userSelect).to.be.equal("auto");
    });
  });
});

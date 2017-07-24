import Hammer from "hammerjs";
import {PinchInput} from "../../../src/inputType/PinchInput";
import {UNIQUEKEY} from "../../../src/inputType/InputType";

describe("PinchInput", () => {
  describe("instance method", function() {
    beforeEach(() => {
      this.inst = new PinchInput(sandbox());
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      cleanup();
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
      expect(this._prev).to.be.not.exist;
    });
    it("should check status after destroy", () => {
      // Given
      this.inst.connect({});
      
      // When
      this.inst.destroy();

      // Then
      expect(this.inst.hammer).to.be.not.exist;
      expect(this.inst.element).to.be.not.exist;
      expect(this.observer).to.be.not.exist;
      expect(this._prev).to.be.not.exist;
      
      this.inst = null;
    });
  });
  describe("enable/disable", function() {
    beforeEach(() => {
      this.el = sandbox();
      this.inst = new PinchInput(this.el);
      this.inst.mapAxes(["x"]);
      this.observer = {
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
      const beforeHandler = this.inst.hammer.handlers["pinchend"][0];

      // When
      expect(this.inst.isEnable()).to.be.true;
      const onPinchEndHandler = sinon.spy(beforeHandler);
      this.inst.hammer.handlers["pinchend"][0] = onPinchEndHandler;

      // When
      Simulator.gestures.pinch(this.el, {
        duration: 500,
        scale: 0.5
      }, () => {
          // Then
          expect(onPinchEndHandler.called).to.be.true;
          this.inst.hammer.handlers["pinchend"][0] = beforeHandler;
          done();
      });
    });
    it("should check event when disable method is called", (done) => {
      // Given
      this.inst.connect(this.observer);
      const beforeHandler = this.inst.hammer.handlers["pinchend"][0];
      // When

      const onPinchEndHandler = sinon.spy(beforeHandler);
      this.inst.hammer.handlers["pinchend"][0] = onPinchEndHandler;
      expect(this.inst.isEnable()).to.be.true;
      this.inst.disable();

      // When
      Simulator.gestures.pinch(this.el, {
        duration: 500,
        scale: 0.5
      }, () => {
          // Then
          expect(onPinchEndHandler.called).to.be.false;
          this.inst.hammer.handlers["pinchend"][0] = beforeHandler;
          done();
      });
    });  
  });
});

import Axes from "../../../src/Axes.ts";
import { PinchInput } from "../../../src/inputType/PinchInput";

describe("PinchInput", () => {
  describe("instance method", function () {
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
      this.inst.connect({});

      // When
      this.inst.disconnect();

      // Then
      expect(this.observer).to.be.not.exist;
      expect(this.inst.element).to.be.exist;
    });
    it("should check status after destroy", () => {
      // Given
      this.inst.connect({});

      // When
      this.inst.destroy();

      // Then
      expect(this.inst.element).to.be.not.exist;
      expect(this.observer).to.be.not.exist;

      this.inst = null;
    });
  });
  describe("enable/disable", function () {
    beforeEach(() => {
      this.el = sandbox();
      this.inst = new PinchInput(this.el, { inputType: ["touch"] });
      this.inst.mapAxes(["x"]);
      this.observer = {
        get() {
          return {
            x: 10,
          };
        },
        release() {},
        hold() {},
        change() {},
        options: {
          deceleration: 0.0001,
        },
      };
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      cleanup();
    });

    it("should check value of `enable/disable` methods", () => {
      // Given
      // When
      // Then
      expect(this.inst.isEnabled()).to.be.false;

      // When
      this.inst.disable();

      // Then
      expect(this.inst.isEnabled()).to.be.false;

      // When
      this.inst.enable();

      // Then
      expect(this.inst.isEnabled()).to.be.true;

      // When
      this.inst.disable();

      // Then
      expect(this.inst.isEnabled()).to.be.false;
    });
    it("should check event when enable method is called", (done) => {
      // Given
      this.inst.connect(this.observer);
      const beforeHandler = this.inst._onPinchStart;

      // When
      expect(this.inst.isEnabled()).to.be.true;
      const onPinchEndHandler = sinon.spy(beforeHandler);

      // When
      Simulator.gestures.pinch(
        this.el,
        {
          duration: 500,
          scale: 0.5,
        },
        () => {
          // Then
          expect(onPinchEndHandler.called).to.be.true;
          done();
        }
      );
    });
    it("should check event when disable method is called", (done) => {
      // Given
      this.inst.connect(this.observer);
      const beforeHandler = this.inst._onPinchStart;
      // When

      const onPinchEndHandler = sinon.spy(beforeHandler);
      expect(this.inst.isEnabled()).to.be.true;
      this.inst.disable();

      // When
      Simulator.gestures.pinch(
        this.el,
        {
          duration: 500,
          scale: 0.5,
        },
        () => {
          // Then
          expect(onPinchEndHandler.called).to.be.false;
          done();
        }
      );
    });
  });

  describe("offset value", function () {
    beforeEach(() => {
      this.el = sandbox();
      this.input = new PinchInput(this.el, { inputType: ["touch"] });
      this.inst = new Axes(
        {
          x: {
            range: [10, 120],
          },
        },
        { round: 1 },
        {
          x: 50,
        }
      );
      this.inst.connect(["x"], this.input);
    });
    afterEach(() => {
      if (this.ins) {
        this.inst.destroy();
        this.inst = null;
      }
      if (this.input) {
        this.input.destroy();
        this.input = null;
      }
      cleanup();
    });

    it("The offset value should be returned using the position value when the hold event is triggered.", (done) => {
      // Given
      this.input.options.scale = 1;
      // When
      Simulator.gestures.pinch(
        this.el,
        {
          duration: 500,
          scale: 1.1,
        },
        () => {
          // Then
          expect(this.inst.get(["x"]).x).to.be.equal(55);
          done();
        }
      );
    });

    it("The offset value should apply scale option", (done) => {
      // Given
      this.input.options.scale = 1;
      // When
      Simulator.gestures.pinch(
        this.el,
        {
          duration: 500,
          scale: 0.9,
        },
        () => {
          // Then
          expect(this.inst.get(["x"]).x).to.be.equal(45);
          done();
        }
      );
    });
  });

  describe("options test", function () {
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
  });
});

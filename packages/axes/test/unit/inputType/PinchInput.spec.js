import Axes from "../../../src/Axes.ts";
import { PinchInput } from "../../../src/inputType/PinchInput";

describe("PinchInput", () => {
  let el;
  let input;
  let inst;
  let observer;

  describe("Methods", () => {
    beforeEach(() => {
      inst = new PinchInput(sandbox());
    });
    afterEach(() => {
      if (inst) {
        inst.destroy();
        inst = null;
      }
      cleanup();
    });
    it("should check status is completely empty after disconnect", () => {
      // Given
      inst.connect({});

      // When
      inst.disconnect();

      // Then
      expect(observer).to.be.not.exist;
      expect(inst.element).to.be.exist;
    });
    it("should check status is completely empty after destroy", () => {
      // Given
      inst.connect({});

      // When
      inst.destroy();

      // Then
      expect(inst.element).to.be.not.exist;
      expect(observer).to.be.not.exist;

      inst = null;
    });
  });

  describe("enable/disable", () => {
    beforeEach(() => {
      el = sandbox();
      input = new PinchInput(el, { inputType: ["touch"] });
      inst = new Axes({
        zoom: {
          range: [1, 10],
        },
      });
    });
    afterEach(() => {
      if (inst) {
        inst.destroy();
        inst = null;
      }
      if (input) {
        input.destroy();
        input = null;
      }
      cleanup();
    });

    it("should check value of `enable/disable` methods", () => {
      // Given
      // When
      // Then
      expect(input.isEnabled()).to.be.false;

      // When
      input.disable();

      // Then
      expect(input.isEnabled()).to.be.false;

      // When
      input.enable();

      // Then
      expect(input.isEnabled()).to.be.true;

      // When
      input.disable();

      // Then
      expect(input.isEnabled()).to.be.false;
    });
    it("should check event when enable method is called", (done) => {
      // Given
      const hold = sinon.spy();
      const change = sinon.spy();
      const release = sinon.spy();
      inst.connect(["zoom"], input);
      inst.on("hold", hold);
      inst.on("change", change);
      inst.on("release", release);

      // When
      expect(input.isEnabled()).to.be.true;

      // When
      Simulator.gestures.pinch(
        el,
        {
          duration: 500,
          scale: 0.5,
        },
        () => {
          // Then
          expect(hold.calledOnce).to.be.true;
          expect(change.called).to.be.true;
          expect(release.calledOnce).to.be.true;
          done();
        }
      );
    });
    it("should check event when disable method is called", (done) => {
      // Given
      const hold = sinon.spy();
      const change = sinon.spy();
      const release = sinon.spy();
      inst.connect(["zoom"], input);
      inst.on("hold", hold);
      inst.on("change", change);
      inst.on("release", release);

      // When
      expect(input.isEnabled()).to.be.true;
      input.disable();

      // When
      Simulator.gestures.pinch(
        el,
        {
          duration: 500,
          scale: 0.5,
        },
        () => {
          // Then
          expect(hold.called).to.be.false;
          expect(change.called).to.be.false;
          expect(release.called).to.be.false;
          done();
        }
      );
    });
  });

  describe("offset value", () => {
    beforeEach(() => {
      el = sandbox();
      input = new PinchInput(el, { inputType: ["touch"] });
      inst = new Axes(
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
      inst.connect(["x"], input);
    });
    afterEach(() => {
      if (inst) {
        inst.destroy();
        inst = null;
      }
      if (input) {
        input.destroy();
        input = null;
      }
      cleanup();
    });

    it("The offset value should be returned using the position value when the hold event is triggered.", (done) => {
      // Given
      input.options.scale = 1;
      // When
      Simulator.gestures.pinch(
        el,
        {
          duration: 500,
          scale: 1.1,
        },
        () => {
          // Then
          expect(inst.get(["x"]).x).to.be.equal(55);
          done();
        }
      );
    });

    it("The offset value should apply scale option", (done) => {
      // Given
      input.options.scale = 1;
      // When
      Simulator.gestures.pinch(
        el,
        {
          duration: 500,
          scale: 0.9,
        },
        () => {
          // Then
          expect(inst.get(["x"]).x).to.be.equal(45);
          done();
        }
      );
    });
  });

  describe("Options", () => {
    beforeEach(() => {
      el = sandbox();
      inst = new Axes({
        zoom: {
          range: [1, 100],
        },
      });
    });
    afterEach(() => {
      if (inst) {
        inst.destroy();
        inst = null;
      }
      if (input) {
        input.destroy();
        input = null;
      }
      cleanup();
    });

    describe("threshold", () => {
      it("should not trigger change event when moving below threshold", (done) => {
        // Given
        const change = sinon.spy();
        input = new PinchInput(el, {
          inputType: ["touch"],
          threshold: 0.5,
        });
        inst.connect("zoom", input);
        inst.on("change", change);

        // When
        Simulator.gestures.pinch(
          el,
          {
            duration: 500,
            scale: 1.3,
          },
          () => {
            // Then
            expect(change.called).to.be.false;
            done();
          }
        );
      });

      it("should trigger change event when moving above threshold", (done) => {
        // Given
        const change = sinon.spy();
        input = new PinchInput(el, {
          inputType: ["touch"],
          threshold: 0.5,
        });
        inst.connect("zoom", input);
        inst.on("change", change);

        // When
        Simulator.gestures.pinch(
          el,
          {
            duration: 500,
            scale: 2,
          },
          () => {
            // Then
            expect(change.called).to.be.true;
            done();
          }
        );
      });
    });

    ["auto", "none", "manipulation", "pan-x", "pan-y"].forEach(
      (touchAction) => {
        it(`should check whether the style set in touchAction is applied correctly (touchAction: ${touchAction})`, () => {
          // Given
          input = new PinchInput(el, {
            touchAction,
          });
          inst.connect(["zoom"], input);

          // Then
          expect(el.style.touchAction).to.be.equal(touchAction);
          expect(el.style.userSelect).to.be.equal("none");
        });
      }
    );
  });
});

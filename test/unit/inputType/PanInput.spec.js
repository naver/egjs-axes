import Axes from "../../../src/Axes.ts";
import {
  PanInput,
  getDirectionByAngle,
  useDirection,
} from "../../../src/inputType/PanInput";
import {
  DIRECTION_ALL,
  DIRECTION_HORIZONTAL,
  DIRECTION_NONE,
  DIRECTION_VERTICAL,
} from "../../../src/const";

describe("PanInput", () => {
  let el;
  let input;
  let inst;
  let observer;

  describe("instance method", () => {
    beforeEach(() => {
      inst = new PanInput(sandbox());
    });
    afterEach(() => {
      if (inst) {
        inst.destroy();
        inst = null;
      }
      cleanup();
    });
    it("should check 'mapAxes' method", () => {
      // when
      inst.mapAxes(["x"]);

      // then
      expect(inst.axes).to.be.eql(["x"]);
      expect(inst._direction).to.be.equal(DIRECTION_HORIZONTAL);

      // when
      inst.mapAxes(["", "y"]);

      // then
      expect(inst.axes).to.be.eql(["", "y"]);
      expect(inst._direction).to.be.equal(DIRECTION_VERTICAL);

      // when
      inst.mapAxes(["x", "y"]);

      // then
      expect(inst.axes).to.be.eql(["x", "y"]);
      expect(inst._direction).to.be.equal(DIRECTION_ALL);

      // when
      inst.mapAxes(["x", "y", "z"]);

      // then
      expect(inst.axes).to.be.eql(["x", "y", "z"]);
      expect(inst._direction).to.be.equal(DIRECTION_ALL);
    });
    it("should check status after disconnect", () => {
      // Given
      inst.connect({});

      // When
      inst.disconnect();

      // Then
      expect(observer).to.be.not.exist;
      expect(inst.element).to.be.exist;
      expect(inst._direction).to.be.equal(DIRECTION_NONE);
    });
    it("should check status after destroy", () => {
      // Given
      inst.connect({});
      const beforeEl = inst.element;

      // When
      inst.destroy();

      // Then
      expect(inst.element).to.be.not.exist;
      expect(observer).to.be.not.exist;
      expect(inst._direction).to.be.equal(DIRECTION_NONE);

      inst = null;
    });
  });

  describe("enable/disable", () => {
    beforeEach(() => {
      el = sandbox();
      input = new PanInput(el, {
        inputType: ["touch", "mouse"],
      });
      inst = new Axes({
        x: {
          range: [0, 200],
        },
        y: {
          range: [0, 200],
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
      inst.connect(["x", "y"], input);
      inst.on("hold", hold);
      inst.on("change", change);
      inst.on("release", release);

      // When
      expect(input.isEnabled()).to.be.true;

      // When
      Simulator.gestures.pan(
        el,
        {
          pos: [0, 0],
          deltaX: 50,
          deltaY: 50,
          duration: 200,
          easing: "linear",
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
      inst.connect(["x", "y"], input);
      inst.on("hold", hold);
      inst.on("change", change);
      inst.on("release", release);

      // When
      expect(input.isEnabled()).to.be.true;
      input.disable();

      // When
      Simulator.gestures.pan(
        el,
        {
          pos: [0, 0],
          deltaX: 50,
          deltaY: 50,
          duration: 200,
          easing: "linear",
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

  describe("static method", () => {
    it("should check user's direction", () => {
      // Given
      // When thresholdAngle = 45
      // Then
      expect(getDirectionByAngle(0, 45)).to.be.equal(DIRECTION_HORIZONTAL);
      expect(getDirectionByAngle(20, 45)).to.be.equal(DIRECTION_HORIZONTAL);
      expect(getDirectionByAngle(45, 45)).to.be.equal(DIRECTION_HORIZONTAL);
      expect(getDirectionByAngle(100, 45)).to.be.equal(DIRECTION_VERTICAL);
      expect(getDirectionByAngle(134, 45)).to.be.equal(DIRECTION_VERTICAL);
      expect(getDirectionByAngle(135, 45)).to.be.equal(DIRECTION_HORIZONTAL);
      expect(getDirectionByAngle(136, 45)).to.be.equal(DIRECTION_HORIZONTAL);
      expect(getDirectionByAngle(180, 45)).to.be.equal(DIRECTION_HORIZONTAL);

      // When thresholdAngle = 20
      // Then
      expect(getDirectionByAngle(0, 20)).to.be.equal(DIRECTION_HORIZONTAL);
      expect(getDirectionByAngle(10, 20)).to.be.equal(DIRECTION_HORIZONTAL);
      expect(getDirectionByAngle(20, 20)).to.be.equal(DIRECTION_HORIZONTAL);
      expect(getDirectionByAngle(30, 20)).to.be.equal(DIRECTION_VERTICAL);
      expect(getDirectionByAngle(50, 20)).to.be.equal(DIRECTION_VERTICAL);
      expect(getDirectionByAngle(160, 20)).to.be.equal(DIRECTION_HORIZONTAL);
      expect(getDirectionByAngle(161, 20)).to.be.equal(DIRECTION_HORIZONTAL);
      expect(getDirectionByAngle(180, 20)).to.be.equal(DIRECTION_HORIZONTAL);

      // When thresholdAngle = -10, 100
      expect(getDirectionByAngle(0, -10)).to.be.equal(DIRECTION_NONE);
      expect(getDirectionByAngle(0, 100)).to.be.equal(DIRECTION_NONE);
    });

    it("should check 'useDirection' method", () => {
      // DIRECTION_HORIZONTAL
      expect(useDirection(DIRECTION_HORIZONTAL, DIRECTION_ALL)).to.be.true;
      expect(useDirection(DIRECTION_HORIZONTAL, DIRECTION_HORIZONTAL)).to.be
        .true;
      expect(useDirection(DIRECTION_HORIZONTAL, DIRECTION_VERTICAL)).to.be
        .false;

      // DIRECTION_VERTICAL
      expect(useDirection(DIRECTION_VERTICAL, DIRECTION_ALL)).to.be.true;
      expect(useDirection(DIRECTION_VERTICAL, DIRECTION_HORIZONTAL)).to.be
        .false;
      expect(useDirection(DIRECTION_VERTICAL, DIRECTION_VERTICAL)).to.be.true;
    });

    it("should check 'useDirection' method (using userDirection)", () => {
      // DIRECTION_HORIZONTAL
      expect(
        useDirection(DIRECTION_HORIZONTAL, DIRECTION_ALL, DIRECTION_HORIZONTAL)
      ).to.be.true;
      expect(
        useDirection(DIRECTION_HORIZONTAL, DIRECTION_ALL, DIRECTION_VERTICAL)
      ).to.be.true;
      expect(
        useDirection(
          DIRECTION_HORIZONTAL,
          DIRECTION_HORIZONTAL,
          DIRECTION_HORIZONTAL
        )
      ).to.be.true;
      expect(
        useDirection(
          DIRECTION_HORIZONTAL,
          DIRECTION_HORIZONTAL,
          DIRECTION_VERTICAL
        )
      ).to.be.false;
      expect(
        useDirection(
          DIRECTION_HORIZONTAL,
          DIRECTION_VERTICAL,
          DIRECTION_HORIZONTAL
        )
      ).to.be.false;
      expect(
        useDirection(
          DIRECTION_HORIZONTAL,
          DIRECTION_VERTICAL,
          DIRECTION_VERTICAL
        )
      ).to.be.false;

      // DIRECTION_VERTICAL
      expect(
        useDirection(DIRECTION_VERTICAL, DIRECTION_ALL, DIRECTION_HORIZONTAL)
      ).to.be.true;
      expect(
        useDirection(DIRECTION_VERTICAL, DIRECTION_ALL, DIRECTION_VERTICAL)
      ).to.be.true;
      expect(
        useDirection(
          DIRECTION_VERTICAL,
          DIRECTION_HORIZONTAL,
          DIRECTION_HORIZONTAL
        )
      ).to.be.false;
      expect(
        useDirection(
          DIRECTION_VERTICAL,
          DIRECTION_HORIZONTAL,
          DIRECTION_VERTICAL
        )
      ).to.be.false;
      expect(
        useDirection(
          DIRECTION_VERTICAL,
          DIRECTION_VERTICAL,
          DIRECTION_HORIZONTAL
        )
      ).to.be.false;
      expect(
        useDirection(DIRECTION_VERTICAL, DIRECTION_VERTICAL, DIRECTION_VERTICAL)
      ).to.be.true;
    });
  });

  describe("options test", () => {
    beforeEach(() => {
      el = sandbox();
      inst = new Axes({
        x: {
          range: [0, 200],
        },
        y: {
          range: [0, 200],
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

    ["left", "middle", "right"].forEach((button) => {
      it("should check 'inputButton' option", (done) => {
        // Given
        const hold = sinon.spy();
        const change = sinon.spy();
        const release = sinon.spy();
        input = new PanInput(el, {
          inputType: ["touch", "mouse"],
          inputButton: [button],
        });
        inst.connect(["x", "y"], input);
        inst.on("hold", hold);
        inst.on("change", change);
        inst.on("release", release);

        // When
        Simulator.gestures.pan(
          el,
          {
            pos: [0, 0],
            deltaX: 50,
            deltaY: 50,
            duration: 200,
            easing: "linear",
          },
          () => {
            // Then
            expect(hold.called).to.be.equals(button === "left");
            expect(change.called).to.be.equals(button === "left");
            expect(release.called).to.be.equals(button === "left");
            done();
          }
        );
      });
    });

    ["auto", "none", "manipulation", "pan-x", "pan-y"].forEach(
      (touchAction) => {
        it(`should check 'touchAction' option (${touchAction})`, () => {
          // Given
          input = new PanInput(el, {
            touchAction,
          });
          inst.connect(["x", "y"], input);

          // Then
          expect(el.style.touchAction).to.be.equal(touchAction);
          expect(el.style.userSelect).to.be.equal("none");
        });
      }
    );
  });
});

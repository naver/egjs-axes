import {
  PanInput,
  getDirectionByAngle,
  useDirection,
} from "../../../src/inputType/PanInput";
import { PinchInput } from "../../../src/inputType/PinchInput";
import {
  DIRECTION_ALL,
  DIRECTION_HORIZONTAL,
  DIRECTION_NONE,
  DIRECTION_VERTICAL,
} from "../../../src/const";

describe("PanInput", () => {
  describe("when hammer instance is shared", function () {
    beforeEach(() => {
      this.el = sandbox();
      this.inst1 = new PanInput(this.el, {
        inputType: ["touch", "mouse"],
      });
      this.inst2 = new PinchInput(this.el);
      this.inst1.mapAxes(["x1", "y1"]);
      this.inst2.mapAxes(["x2"]);
      const observer = {
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
      this.inst1.connect(observer);
      this.inst2.connect(observer);

      this.beforePanstart = this.inst1._onPanstart;
      this.beforePinchstart = this.inst2._onPinchStart;
      this.onPanstart = sinon.spy(this.beforePanstart);
      this.onPinchstart = sinon.spy(this.beforePinchstart);
    });
    afterEach(() => {
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
      expect(this.inst1.element).to.be.equal(this.inst2.element);

      // When
      Simulator.gestures.pan(
        this.el,
        {
          pos: [0, 0],
          deltaX: 50,
          deltaY: 50,
          duration: 200,
          easing: "linear",
        },
        () => {
          // Then
          expect(this.onPanstart.called).to.be.true;
          expect(this.onPinchstart.called).to.be.false;

          Simulator.gestures.pinch(
            this.el,
            {
              duration: 500,
              scale: 0.5,
            },
            () => {
              // Then
              expect(this.onPanstart.callCount).to.be.equal(1);
              expect(this.onPinchstart.callCount).to.be.equal(1);
              done();
            }
          );
        }
      );
    });
    it("should check multi dettached event (pan/pinch)", (done) => {
      // Given

      // When
      this.inst1.disconnect();
      expect(this.inst1.element).to.be.equal(this.inst2.element);

      // When
      Simulator.gestures.pan(
        this.el,
        {
          pos: [0, 0],
          deltaX: 50,
          deltaY: 50,
          duration: 200,
          easing: "linear",
        },
        () => {
          // Then
          expect(this.onPanstart.called).to.be.false;
          expect(this.onPanstart.called).to.be.false;

          Simulator.gestures.pinch(
            this.el,
            {
              duration: 500,
              scale: 0.5,
            },
            () => {
              // Then
              expect(this.onPanstart.called).to.be.false;
              expect(this.onPanstart.called).to.be.false;
              done();
            }
          );
        }
      );
    });
  });
  describe("instance method", function () {
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
      expect(this.inst._direction).to.be.equal(DIRECTION_HORIZONTAL);

      // when
      this.inst.mapAxes(["", "y"]);

      // then
      expect(this.inst.axes).to.be.eql(["", "y"]);
      expect(this.inst._direction).to.be.equal(DIRECTION_VERTICAL);

      // when
      this.inst.mapAxes(["x", "y"]);

      // then
      expect(this.inst.axes).to.be.eql(["x", "y"]);
      expect(this.inst._direction).to.be.equal(DIRECTION_ALL);

      // when
      this.inst.mapAxes(["x", "y", "z"]);

      // then
      expect(this.inst.axes).to.be.eql(["x", "y", "z"]);
      expect(this.inst._direction).to.be.equal(DIRECTION_ALL);
    });
    it("should check status after disconnect", () => {
      // Given
      this.inst.connect({});

      // When
      this.inst.disconnect();

      // Then
      expect(this.observer).to.be.not.exist;
      expect(this.inst.element).to.be.exist;
      expect(this.inst._direction).to.be.equal(DIRECTION_NONE);
    });
    it("should check status after destroy", () => {
      // Given
      this.inst.connect({});
      const beforeEl = this.inst.element;

      // When
      this.inst.destroy();

      // Then
      expect(this.inst.element).to.be.not.exist;
      expect(this.observer).to.be.not.exist;
      expect(this.inst._direction).to.be.equal(DIRECTION_NONE);

      this.inst = null;
    });
  });
  describe("enable/disable", function () {
    beforeEach(() => {
      this.el = sandbox();
      this.inst = new PanInput(this.el, {
        inputType: ["touch", "mouse"],
      });
      this.inst.mapAxes(["x1", "y1"]);
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
      const beforeHandler = this.inst._onPanstart;

      // When
      expect(this.inst.isEnabled()).to.be.true;
      const onPanEndHandler = sinon.spy(beforeHandler);

      // When
      Simulator.gestures.pan(
        this.el,
        {
          pos: [0, 0],
          deltaX: 50,
          deltaY: 50,
          duration: 200,
          easing: "linear",
        },
        () => {
          // Then
          expect(onPanEndHandler.called).to.be.true;
          done();
        }
      );
    });
    it("should check event when disable method is called", (done) => {
      // Given
      this.inst.connect(this.observer);
      const beforeHandler = this.inst._onPanstart;
      // When

      const onPanEndHandler = sinon.spy(beforeHandler);
      expect(this.inst.isEnabled()).to.be.true;
      this.inst.disable();

      // When
      Simulator.gestures.pan(
        this.el,
        {
          pos: [0, 0],
          deltaX: 50,
          deltaY: 50,
          duration: 200,
          easing: "linear",
        },
        () => {
          // Then
          expect(onPanEndHandler.called).to.be.false;
          done();
        }
      );
    });
  });

  describe("static method", function () {
    it("should check user's direction", () => {
      //Given
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
  describe("options test", function () {
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
  });
});

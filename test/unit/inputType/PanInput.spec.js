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
      this.input = new PanInput(this.el, {
        inputType: ["touch", "mouse"],
      });
      this.inst = new Axes({
        x: {
            range: [0, 200]
        },
        y: {
            range: [0, 200]
        }
      });
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      if (this.input) {
        this.input.destroy();
        this.input = null;
      }
      cleanup();
    });

    it("should check value of `enable/disable` methods", () => {
      // Given
      // When
      // Then
      expect(this.input.isEnabled()).to.be.false;

      // When
      this.input.enable();

      // Then
      expect(this.input.isEnabled()).to.be.true;

      // When
      this.input.disable();

      // Then
      expect(this.input.isEnabled()).to.be.false;
    });
    it("should check event when enable method is called", (done) => {
      // Given
      const hold = sinon.spy();
      const change = sinon.spy();
      const release = sinon.spy();
      this.inst.connect(["x", "y"], this.input);
      this.inst.on("hold", hold);
      this.inst.on("change", change);
      this.inst.on("release", release);

      // When
      expect(this.input.isEnabled()).to.be.true;

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
      this.inst.connect(["x", "y"], this.input);
      this.inst.on("hold", hold);
      this.inst.on("change", change);
      this.inst.on("release", release);

      // When
      expect(this.input.isEnabled()).to.be.true;
      this.input.disable();

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
          expect(hold.called).to.be.false;
          expect(change.called).to.be.false;
          expect(release.called).to.be.false;
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

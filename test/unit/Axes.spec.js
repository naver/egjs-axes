import Axes from "../../src/Axes.ts";
import {HammerInput} from "../../src/inputType/HammerInput.ts";

describe("Axes", function () {
  describe("Axes init Test", function () {
    beforeEach(() => {
      this.inst = null;
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
    });

    it("should check a initialization empty value", () => {
      // Given
      // When
      this.inst = new Axes();
      // Then

      const defaultOptions = {
        easing: function easeOutCubic(x) {
          return 1 - Math.pow(1 - x, 3);
        },
        interruptable: true,
        maximumDuration: Infinity,
        deceleration: 0.0006,
        axis: {}
      }
      
      expect(this.inst).to.be.exist;
      expect(defaultOptions.easing(0.5)).to.be.equal(this.inst.options.easing(0.5));
      expect(defaultOptions.easing(0.3)).to.be.equal(this.inst.options.easing(0.3));
      expect(defaultOptions.easing(0.1)).to.be.equal(this.inst.options.easing(0.1));
      expect(defaultOptions.easing(0.7)).to.be.equal(this.inst.options.easing(0.7));
      expect(defaultOptions.easing(0.9)).to.be.equal(this.inst.options.easing(0.9));
      expect(defaultOptions.interruptable).to.be.equal(this.inst.options.interruptable);
      expect(defaultOptions.maximumDuration).to.be.equal(this.inst.options.maximumDuration);
      expect(defaultOptions.deceleration).to.be.equal(this.inst.options.deceleration);
      expect(defaultOptions.axis).to.be.eql(this.inst.options.axis);
    });

    it("should check initialization status", () => {
      // Given
      // When
      this.inst = new Axes({
        axis: {
          x: {
            range: [0, 100],
            bounce: [30, 50],
            circular: true
          },
          otherX: {
            range: [-100, 100],
            bounce: 40,
            circular: [false, true]
          }
        },
        deceleration: 0.001
      });

      // Then
      expect(this.inst.options.axis.x.bounce).to.deep.equal([30, 50]);
      expect(this.inst.options.axis.x.circular).to.deep.equal([true, true]);
      expect(this.inst.options.axis.otherX.bounce).to.deep.equal([40, 40]);
      expect(this.inst.options.axis.otherX.circular).to.deep.equal([false, true]);
    });
    it("should check `setTo` method", () => {
      // Given
      this.inst = new Axes({
        axis: {
          x: {
            range: [0, 100],
            bounce: [30, 50],
            circular: true
          },
          otherX: {
            range: [-100, 100],
            bounce: 40,
            circular: [false, true]
          }
        },
        deceleration: 0.001
      });      
      // When
      let ret = this.inst.setTo({x: 20});

      // Then
      expect(this.inst.get()).to.be.eql({x: 20, otherX: -100});
      expect(ret).to.be.equal(this.inst);
    });

    it("should check `setTo` method (with duration)", () => {
      // Given
      const startHandler = sinon.spy();
      const changeHandler = sinon.spy();
      const endHandler = sinon.spy(function() {
        // Then
        expect(startHandler.callCount).to.be.equal(1);
        expect(changeHandler.called).to.be.true;
        expect(this.inst.get()).to.be.eql({x: 20, otherX: -100});
        done();
      });
      this.inst = new Axes({
        axis: {
          x: {
            range: [0, 100],
            bounce: [30, 50],
            circular: true
          },
          otherX: {
            range: [-100, 100],
            bounce: 40,
            circular: [false, true]
          }
        },
        deceleration: 0.001
      }).on({
        "animationStart": startHandler,
        "change": changeHandler,
        "animationEnd": endHandler
      });

      // When
      this.inst.setTo({x: 20}, 200);
    });    
  });

  describe("Axes Test with InputType", function () {
    beforeEach(() => {
      this.inst = new Axes({
        axis: {
          x: {
            range: [0, 100],
            bounce: [30, 50],
            circular: true
          },
          otherX: {
            range: [-100, 100],
            bounce: 40,
            circular: [false, true]
          }
        },
        deceleration: 0.001
      });
      sandbox();
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      cleanup();
    });

    it("should check `mapInput` method", () => {
      // Given
      const input = new HammerInput("#sandbox");

      // When
      let ret = this.inst.mapInput("x", input);

      // Then
      expect(input.axes).to.be.eql(["x"]);
      expect(ret).to.be.equal(this.inst);
      input.disconnect();

      // When
      ret = this.inst.mapInput(["x"], input);
      
      // Then
      expect(input.axes).to.be.eql(["x"]);
      expect(ret).to.be.equal(this.inst);
      input.disconnect();

      // When
      ret = this.inst.mapInput(["x", "y"], input);
      
      // Then
      expect(input.axes).to.be.eql(["x", "y"]);
      expect(ret).to.be.equal(this.inst);
      input.disconnect();
    });
  });
});
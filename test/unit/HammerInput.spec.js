import Hammer from "hammerjs";
import {HammerInput, DIRECTION} from "../../src/inputType/HammerInput";
import HammerInputInjector from "inject-loader!../../src/inputType/HammerInput";

describe("HammerInput", () => {
  describe("instance method", function() {
    beforeEach(() => {
      this.inst = new HammerInput(sandbox());
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
  });

  describe("static method", function() {

    it("should check user's direction", () => {
      //Given
      // When thresholdAngle = 45
      // Then
      expect(HammerInput.getDirectionByAngle(0, 45)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(HammerInput.getDirectionByAngle(20, 45)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(HammerInput.getDirectionByAngle(45, 45)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(HammerInput.getDirectionByAngle(100, 45)).to.be.equal(DIRECTION.DIRECTION_VERTICAL);
      expect(HammerInput.getDirectionByAngle(134, 45)).to.be.equal(DIRECTION.DIRECTION_VERTICAL);
      expect(HammerInput.getDirectionByAngle(135, 45)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(HammerInput.getDirectionByAngle(136, 45)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(HammerInput.getDirectionByAngle(180, 45)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);

      // When thresholdAngle = 20
      // Then
      expect(HammerInput.getDirectionByAngle(0, 20)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(HammerInput.getDirectionByAngle(10, 20)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(HammerInput.getDirectionByAngle(20, 20)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(HammerInput.getDirectionByAngle(30, 20)).to.be.equal(DIRECTION.DIRECTION_VERTICAL);
      expect(HammerInput.getDirectionByAngle(50, 20)).to.be.equal(DIRECTION.DIRECTION_VERTICAL);
      expect(HammerInput.getDirectionByAngle(160, 20)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(HammerInput.getDirectionByAngle(161, 20)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
      expect(HammerInput.getDirectionByAngle(180, 20)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);

      // When thresholdAngle = -10, 100
      expect(HammerInput.getDirectionByAngle(0, -10)).to.be.equal(DIRECTION.DIRECTION_NONE);
      expect(HammerInput.getDirectionByAngle(0, 100)).to.be.equal(DIRECTION.DIRECTION_NONE);
    });

    it("should check 'getNextOffset' method", () => {
      // 0.001
      expect(HammerInput.getNextOffset([1.5, 1], 0.001)).to.be.eql([1352.0817282989958, 901.3878188659972]);
      expect(HammerInput.getNextOffset([1, 1.5], 0.001)).to.be.eql([901.3878188659972, 1352.0817282989958]);

      // 0.01
      expect(HammerInput.getNextOffset([1.5, 1], 0.01)).to.be.eql([135.20817282989958, 90.13878188659973]);
      expect(HammerInput.getNextOffset([1, 1.5], 0.01)).to.be.eql([90.13878188659973, 135.20817282989958]);
    });

    it("should check 'useDirection' method", () => {
      // DIRECTION_HORIZONTAL
      expect(HammerInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_ALL)).to.be.true;
      expect(HammerInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_HORIZONTAL)).to.be.true;
      expect(HammerInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_VERTICAL)).to.be.false;

      // DIRECTION_VERTICAL
      expect(HammerInput.useDirection(DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_ALL)).to.be.true;
      expect(HammerInput.useDirection(DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_HORIZONTAL)).to.be.false;
      expect(HammerInput.useDirection(DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_VERTICAL)).to.be.true;
    });

    it("should check 'useDirection' method (using userDirection)", () => {
      // DIRECTION_HORIZONTAL
      expect(HammerInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_ALL, DIRECTION.DIRECTION_HORIZONTAL)).to.be.true;
      expect(HammerInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_ALL, DIRECTION.DIRECTION_VERTICAL)).to.be.true;
      expect(HammerInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_HORIZONTAL)).to.be.true;
      expect(HammerInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_VERTICAL)).to.be.false;
      expect(HammerInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_HORIZONTAL)).to.be.false;
      expect(HammerInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_VERTICAL)).to.be.false;

      // DIRECTION_VERTICAL
      expect(HammerInput.useDirection(DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_ALL, DIRECTION.DIRECTION_HORIZONTAL)).to.be.true;
      expect(HammerInput.useDirection(DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_ALL, DIRECTION.DIRECTION_VERTICAL)).to.be.true;
      expect(HammerInput.useDirection(DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_HORIZONTAL)).to.be.false;
      expect(HammerInput.useDirection(DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_HORIZONTAL, DIRECTION.DIRECTION_VERTICAL)).to.be.false;
      expect(HammerInput.useDirection(DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_HORIZONTAL)).to.be.false;
      expect(HammerInput.useDirection(DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_VERTICAL, DIRECTION.DIRECTION_VERTICAL)).to.be.true;
    });
  });

	describe("SUPPORT_TOUCH mocking", function() {
    it("should check convertHammerInputType when supporting touch", () => {
      // Given
      const MockHammerInput = HammerInputInjector({
        "../const": {
          SUPPORT_TOUCH : true
        }
      }).HammerInput;
      
			// When
      let inputType = [ "touch", "mouse" ];
      // Then
      expect(MockHammerInput.convertHammerInputType(inputType)).to.be.equal(Hammer.TouchInput);

      // When
      inputType = [ "touch" ];
      // Then
      expect(MockHammerInput.convertHammerInputType(inputType)).to.be.equal(Hammer.TouchInput);

      // When
      inputType = [ "mouse" ];
      // Then
      expect(MockHammerInput.convertHammerInputType(inputType)).to.be.equal(Hammer.MouseInput);

      // When
      inputType = [ ];
      // Then
      expect(MockHammerInput.convertHammerInputType(inputType)).to.be.null;
    });


    it("should check convertHammerInputType when not supporting touch", () => {
      // Given
      const MockHammerInput = HammerInputInjector({
        "../const": {
          SUPPORT_TOUCH : false
        }
      }).HammerInput;

      // When
      let inputType = [ "touch", "mouse" ];
      // Then
      expect(MockHammerInput.convertHammerInputType(inputType)).to.be.equal(Hammer.MouseInput);

      // When
      inputType = [ "touch" ];
      // Then
      expect(MockHammerInput.convertHammerInputType(inputType)).to.be.null;

      // When
      inputType = [ "mouse" ];
      // Then
      expect(MockHammerInput.convertHammerInputType(inputType)).to.be.equal(Hammer.MouseInput);

      // When
      inputType = [ ];
      // Then
      expect(MockHammerInput.convertHammerInputType(inputType)).to.be.null;
    });    
  });
});

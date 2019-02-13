import {InputObserver} from "../../src/InputObserver";
import {AnimationManager} from "../../src/AnimationManager";
import Axes from "../../src/Axes";
import {AxisManager} from "../../src/AxisManager";
import {InterruptManager} from "../../src/InterruptManager";
import {EventManager} from "../../src/EventManager";
import Component from "@egjs/component";
import { doesNotThrow } from "assert";

describe("InputObserver", function () {
  describe("observer test", function() {
    beforeEach(() => {
      this.axis = {
        x: {
          range: [0, 100],
          bounce: [50, 50],
          circular: false
        },
        y: {
          range: [0, 200],
          bounce: [0, 0],
          circular: false
        },
        z: {
          range: [-100, 200],
          bounce: [50, 0],
          circular: true
        }
      };
      this.options = {
        deceleration: 0.0001,
        maximumDuration: 2000,
        minimumDuration: 0
      };
      this.axes = new Axes(this.axis, this.options);
      this.axm = this.axes.axm;
      this.am = this.axes.am;
      this.inst = this.axes.io;
    });
    afterEach(() => {
    });

    it("should check 'get' method", () => {
      // Given
      const inputType = {
        axes: ["y"]
      };

      // When/Then
      expect(this.inst.get(inputType)).to.be.eql({"y": 0});

      // When
      this.inst.axm.moveTo({x: 10, y: 20, z: 30});
      
      // Then
      expect(this.inst.get(inputType)).to.be.eql({"y": 20});
    });
    it("should check 'change' method", () => {
      // Given
      const inputType = {
        axes: ["y"]
      };

      
      // When/Then
      expect(this.inst.get(inputType)).to.be.eql({"y": 0});

      // When
      this.inst.change(inputType, {}, {});
      expect(this.inst.get(inputType)).to.be.not.eql({"y": 200});

      this.inst.hold(inputType, {});
      this.inst.change(inputType, {}, {y: 250});
      
      // Then
      expect(this.inst.get(inputType)).to.be.eql({"y": 200});
    });
    it("should check delta that there is no bounce and the position goes to zero.", done => {
      // Given
      const inputType = {
        axes: ["y"]
      };
      // start pos
      let y = 50;
      this.axes.setTo({y: 50}, 0);
      this.axes.on("change", ({pos, delta}) => {
        // Then
        // Find the value as approximated as possible due to floating decimal point problems.
        expect(delta.y + y).to.be.closeTo(pos.y, 0.0000001);

        y = pos.y;
      });
      this.axes.on("finish", () => {
        done();
      });

      // When
      // The last y position should be zero and neither should Delta.
      this.axes.setTo({y: 0}, 300);
    });
    it("should check delta that there is no bounce and the position is out", done => {
      // Given
      const inputType = {
        axes: ["y"]
      };
      // start pos
      let y = 50;
      this.axes.setTo({y: 50}, 0);
      this.axes.on("change", ({pos, delta}) => {
        // Then
        // Find the value as approximated as possible due to floating decimal point problems.
        expect(delta.y + 50).to.be.closeTo(pos.y, 0.0000001);
      });
      this.axes.on("finish", () => {
        done();
      });

      // When

      this.inst.hold(inputType);
      // The last y position should be zero and neither should Delta.
      // y goes to zero without bounce.
      this.inst.change(inputType, {}, {y: -60});
      this.inst.release(inputType);
    });
    it("should check delta that there is bounce and the position is out", done => {
      // Given
      const inputType = {
        axes: ["x"]
      };

      // start pos
      let x = 50;
      this.axes.setTo({x: 50}, 0);
      this.axes.on("change", ({pos, delta}) => {
        // Then
        // Find the value as approximated as possible due to floating decimal point problems.
        expect(delta.x + x).to.be.closeTo(pos.x, 0.0000001);
        x = pos.x;
      });
      this.axes.on("finish", () => {
        done();
      });

      // When
      this.inst.hold(inputType);
      // x bounces by -10 and returns to zero.
      this.inst.change(inputType, {}, {x: -60});
      this.inst.release(inputType);
    });
    
  });
});

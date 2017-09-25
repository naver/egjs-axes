import {InputObserver} from "../../src/InputObserver";
import {AnimationManager} from "../../src/AnimationManager";
import {AxisManager} from "../../src/AxisManager";
import {InterruptManager} from "../../src/InterruptManager";
import {EventManager} from "../../src/EventManager";
import Component from "@egjs/component";

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
      this.am = new AnimationManager({
        options: this.options, 
        itm: new InterruptManager(this.options), 
        em: new EventManager(null),
        axm: new AxisManager(this.axis, this.options)
      });
      this.inst = new InputObserver({
        options: this.options, 
        itm: this.am.itm,
        em: this.am.em,
        axm: this.am.axm,
        am: this.am
      });
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
  });
});

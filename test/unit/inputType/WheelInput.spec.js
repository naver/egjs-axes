import Hammer from "hammerjs";
import TestHeler from "./TestHeler";
import Axes from "../../../src/Axes.ts";
import {WheelInput} from "../../../src/inputType/WheelInput";
import {UNIQUEKEY} from "../../../src/inputType/InputType";

describe.only("WheelInput", () => {
  describe("instance method", function() {
    beforeEach(() => {
      this.inst = new WheelInput(sandbox());
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
      expect(this._timer).to.be.not.exist;
    });
    it("should check status after destroy", () => {
      // Given
      this.inst.connect({});
      
      // When
      this.inst.destroy();

      // Then
      expect(this.inst.element).to.be.not.exist;
      expect(this.observer).to.be.not.exist;
      expect(this._timer).to.be.not.exist;
      
      this.inst = null;
    });
  });
  describe("enable/disable", function() {
    beforeEach(() => {
      this.el = sandbox();
      this.inst = new WheelInput(this.el);
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

      // When
      this.inst.enable();

      // Then
      expect(this.inst.isEnable()).to.be.true;

      // When (after connection)
      this.inst.connect(this.observer);
      this.inst.enable();

      // Then
      expect(this.inst.isEnable()).to.be.true;
    }); 
  });

  describe("wheel event test", function() {
    beforeEach(() => {
      this.el = sandbox();
      this.input = new WheelInput(this.el); 
      this.inst = new Axes({
        x: {
          range: [10, 120]
        }
      });
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

    it("no event triggering when disconnected", (done) => {
      // Given
      const deltaY = 1;
      let changeTriggered = false;

      this.inst
      .on("change", () => {
        changeTriggered = true;
      });
      this.inst.disconnect();

      // When
      TestHeler.wheelVertical(this.el, deltaY, () => {
        // Then
        expect(changeTriggered).to.be.false;
        done();
			});
    });

    it("no event triggering when offset is 0", (done) => {
      // Given
      const deltaY = 0;
      let changeTriggered = false;

      this.inst
      .on("change", () => {
        changeTriggered = true;
      });

      // When
      TestHeler.wheelVertical(this.el, deltaY, () => {
        // Then
        expect(changeTriggered).to.be.false;
        done();
			});
    });

    it("triggering order test", (done) => {
      // Given
      const deltaY = 1;
      const eventLog = [];
      const eventLogAnswer = ["hold", "change", "change", "release"];

      this.inst
      .on("hold", () => {
        eventLog.push("hold");
      }).on("change", () => {
        eventLog.push("change");
      }).on("release", () => {
        eventLog.push("release");
      });

      // When
      TestHeler.wheelVertical(this.el, deltaY, () => {
        setTimeout(()=> {
          TestHeler.wheelVertical(this.el, deltaY, () => {
            setTimeout(()=> {
              // Then
				      expect(eventLog).to.be.deep.equal(eventLogAnswer);
              done();
            }, 60);
          });
        }, 20);		
			});
    });
  });
});


import Hammer from "@egjs/hammerjs";
import TestHelper from "./TestHelper";
import Axes from "../../../src/Axes.ts";
import {WheelInput} from "../../../src/inputType/WheelInput";
import {UNIQUEKEY} from "../../../src/inputType/InputType";

describe("WheelInput", () => {
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

	describe("simple wheel event test", function() {
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
			this.el = null;
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

		it("should cleanup timer when it is detached/destroy (after firing wheel event)", done => {
			// Given
			const deltaY = 300;
			// When
			// 1. Scroll
			TestHelper.wheelVertical(this.el, deltaY, () => {
				// 2. detach & destroy wheel input
				this.inst.disconnect(this.input);
				this.input.destroy();
				this.input = null;
				// 3. create new wheel input
				this.input = new WheelInput(this.el);
				this.inst.connect(["x"], this.input);

				// Then -> script error should not be occur.
				setTimeout(done, 50);
			});
		});
	});

  [1,2,4].forEach(function(scale) {
    [true, false].forEach(function(useNormalized) {
      describe(`wheel event test(useNormalized: ${useNormalized})`, function() {
        beforeEach(() => {
          this.el = sandbox();
          this.input = new WheelInput(this.el, {useNormalized: useNormalized, scale: scale});
          this.inst = new Axes({
            x: {
              range: [10, 120]
            }
          });
          this.inst.connect(["x"], this.input);
        });

        afterEach(() => {
          this.el = null;
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
        [-1,-3,-5,-9].forEach(d => {
          it(`should check delta test (delta: ${d}, useNormalized: ${useNormalized})`, done => {
            this.inst.on("change", ({pos, delta}) => {
                if (delta.x === 0) {
                  return;
                }
              const sign = 1;
              expect(delta.x).to.be.equals(scale * (useNormalized ? sign : (sign * Math.abs(d))));
            });
            this.inst.on("release", e => {
              done();
            });
            TestHelper.wheelVertical(this.el, d, () => {

            });
          });
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
          TestHelper.wheelVertical(this.el, deltaY, () => {
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
          TestHelper.wheelVertical(this.el, deltaY, () => {
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
          TestHelper.wheelVertical(this.el, deltaY, () => {
            setTimeout(()=> {
              TestHelper.wheelVertical(this.el, deltaY, () => {
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
  });
});

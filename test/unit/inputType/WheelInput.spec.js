import Axes from "../../../src/Axes.ts";
import { WheelInput } from "../../../src/inputType/WheelInput";

import TestHelper from "./TestHelper";

describe("WheelInput", () => {
  let el;
  let input;
  let inst;
  let observer;
  let timer;

  describe("instance method", () => {
    beforeEach(() => {
      inst = new WheelInput(sandbox(), { releaseDelay: 50 });
    });
    afterEach(() => {
      if (inst) {
        inst.destroy();
        inst = null;
      }
      cleanup();
    });
    it("should check status after disconnect", () => {
      // Given
      inst.connect({});

      // When
      inst.disconnect();

      // Then
      expect(observer).to.be.not.exist;
      expect(inst.element).to.be.exist;
      expect(timer).to.be.not.exist;
    });
    it("should check status after destroy", () => {
      // Given
      inst.connect({});

      // When
      inst.destroy();

      // Then
      expect(inst.element).to.be.not.exist;
      expect(observer).to.be.not.exist;
      expect(timer).to.be.not.exist;

      inst = null;
    });
  });
  describe("enable/disable", () => {
    beforeEach(() => {
      el = sandbox();
      inst = new WheelInput(el, { releaseDelay: 50 });
      inst.mapAxes(["x"]);
      observer = {
        release: () => {},
        hold: () => {},
        change: () => {},
        options: {
          deceleration: 0.0001,
        },
      };
    });
    afterEach(() => {
      if (inst) {
        inst.destroy();
        inst = null;
      }
      cleanup();
    });

    it("should check value of `enable/disalbe` methods", () => {
      // Given
      // When
      // Then
      expect(inst.isEnabled()).to.be.false;

      // When
      inst.disable();

      // Then
      expect(inst.isEnabled()).to.be.false;

      // When
      inst.enable();

      // Then
      expect(inst.isEnabled()).to.be.true;

      // When (after connection)
      inst.connect(observer);
      inst.enable();

      // Then
      expect(inst.isEnabled()).to.be.true;
    });
  });

  describe("simple wheel event test", () => {
    beforeEach(() => {
      el = sandbox();
      input = new WheelInput(el, { releaseDelay: 50 });
      inst = new Axes(
        {
          x: {
            range: [10, 120],
          },
        },
        {
          maximumDuration: 30,
        }
      );
      inst.connect(["x"], input);
    });

    afterEach(() => {
      el = null;
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

    it("should cleanup timer when it is detached/destroy (after firing wheel event)", (done) => {
      // Given
      const deltaY = 300;
      // When
      // 1. Scroll
      TestHelper.wheelVertical(el, deltaY, () => {
        // 2. detach & destroy wheel input
        inst.disconnect(input);
        input.destroy();
        input = null;
        // 3. create new wheel input
        input = new WheelInput(el, { releaseDelay: 50 });
        inst.connect(["x"], input);

        // Then -> script error should not be occur.
        setTimeout(done, 50);
      });
    });
  });

  [1, 2, 4].forEach((scale) => {
    [true, false].forEach((useNormalized) => {
      describe(`wheel event test(useNormalized: ${useNormalized})`, () => {
        beforeEach(() => {
          el = sandbox();
          input = new WheelInput(el, {
            useNormalized: useNormalized,
            scale: scale,
            releaseDelay: 50,
          });
          inst = new Axes(
            {
              x: {
                range: [10, 120],
              },
            },
            {
              maximumDuration: 0,
            }
          );
          inst.connect(["x"], input);
        });

        afterEach(() => {
          el = null;
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
        [-1, -3, -5, -9].forEach((d) => {
          it(`should check delta test (delta: ${d}, useNormalized: ${useNormalized})`, (done) => {
            inst.on("change", ({ pos, delta }) => {
              if (delta.x === 0) {
                return;
              }
              const sign = 1;
              expect(delta.x).to.be.equals(
                scale * (useNormalized ? sign : sign * Math.abs(d))
              );
            });
            inst.on("release", (e) => {
              done();
            });
            TestHelper.wheelVertical(el, d, () => {});
          });
        });
        it("no event triggering when disconnected", (done) => {
          // Given
          const deltaY = 1;
          let changeTriggered = false;

          inst.on("change", () => {
            changeTriggered = true;
          });
          inst.disconnect();

          // When
          TestHelper.wheelVertical(el, deltaY, () => {
            // Then
            expect(changeTriggered).to.be.false;
            done();
          });
        });

        it("no event triggering when offset is 0", (done) => {
          // Given
          const deltaY = 0;
          let changeTriggered = false;

          inst.on("change", () => {
            changeTriggered = true;
          });

          // When
          TestHelper.wheelVertical(el, deltaY, () => {
            // Then
            expect(changeTriggered).to.be.false;
            done();
          });
        });

        it("triggering order test", (done) => {
          // Given
          const deltaY = -1;
          const eventLog = [];

          inst
            .on("hold", () => {
              eventLog.push("hold");
            })
            .on("change", () => {
              eventLog.push("change");
            })
            .on("release", () => {
              eventLog.push("release");
            });

          // When
          TestHelper.wheelVertical(el, deltaY, () => {
            setTimeout(() => {
              TestHelper.wheelVertical(el, deltaY, () => {
                setTimeout(() => {
                  // Then
                  eventLog.forEach((log, index) => {
                    if (index === 0) {
                      expect(eventLog[index]).to.be.deep.equal("hold");
                    } else if (index === eventLog.length - 1) {
                      expect(eventLog[index]).to.be.deep.equal("release");
                    } else {
                      expect(eventLog[index]).to.be.deep.equal("change");
                    }
                  });
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

import Axes from "../../../src/Axes.ts";
import {
  MoveKeyInput,
  KEY_A,
  KEY_D,
  KEY_DOWN_ARROW,
  KEY_TOP_ARROW,
  KEY_LEFT_ARROW,
  KEY_RIGHT_ARROW,
  KEY_S,
  KEY_UP_ARROW,
  KEY_W,
} from "../../../src/inputType/MoveKeyInput";

import TestHelper from "./TestHelper";

describe("MoveKeyInput", () => {
  let el;
  let elBody;
  let input;
  let inst;
  let observer;
  let timer;

  describe("instance method", () => {
    beforeEach(() => {
      inst = new MoveKeyInput(sandbox());
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
      inst = new MoveKeyInput(el);
      inst.mapAxes(["x", "y"]);
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

  describe("No axes keydown event test", () => {
    beforeEach(() => {
      elBody = sandbox();
      el = document.createElement("div");
      elBody.appendChild(el);

      input = new MoveKeyInput(el);
      inst = new Axes({
        x: {
          range: [10, 120],
        },
        y: {
          range: [10, 120],
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

    it("no event triggering when connet no axes(Left, Right)", (done) => {
      const change = sinon.spy();
      inst.connect([], input);
      inst.on("change", change);
      TestHelper.key(el, "keydown", { keyCode: KEY_RIGHT_ARROW }, () => {
        expect(change.calledOnce).to.be.false;
        done();
      });
    });
    it("no event triggering when connet no axes(Top, Bottom)", (done) => {
      const change = sinon.spy();
      inst.connect([], input);
      inst.on("change", change);
      TestHelper.key(el, "keydown", { keyCode: KEY_TOP_ARROW }, () => {
        expect(change.calledOnce).to.be.false;
        done();
      });
    });
  });
  describe("Keydown event test", () => {
    beforeEach(() => {
      elBody = sandbox();
      el = document.createElement("div");
      elBody.appendChild(el);

      input = new MoveKeyInput(el);
      inst = new Axes({
        x: {
          range: [10, 120],
        },
        y: {
          range: [10, 120],
        },
      });

      inst.connect(["x", "y"], input);
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

    it("no event triggering when disconnected", (done) => {
      // Given
      const rightArrayKeyCode = { keyCode: KEY_RIGHT_ARROW };
      let changeTriggered = false;

      inst.on("change", () => {
        changeTriggered = true;
      });
      inst.disconnect();

      // When
      TestHelper.key(el, "keydown", rightArrayKeyCode, () => {
        // Then
        expect(changeTriggered).to.be.false;
        done();
      });
    });

    it("no event triggering when pressed is not move key", (done) => {
      // Given
      const bKeyCode = 66;
      let changeTriggered = false;

      inst.on("change", () => {
        changeTriggered = true;
      });

      // When
      TestHelper.key(el, "keydown", bKeyCode, () => {
        // Then
        expect(changeTriggered).to.be.false;
        done();
      });
    });

    // left
    [KEY_LEFT_ARROW, KEY_A].forEach((keyCode, idx) => {
      it(
        "should trigger 'change' event to left(keyCode: " + keyCode + ")",
        (done) => {
          // Given
          let changeTriggered = false;
          let deltaX = 0;
          const leftKeyCode = {
            keyCode: keyCode,
          };
          input.options.scale[0] = -1;
          inst.on("change", (e) => {
            deltaX = e.delta.x;
            changeTriggered = true;
          });

          // When
          TestHelper.key(el, "keydown", leftKeyCode);

          // Then
          expect(changeTriggered).to.be.true;
          expect(deltaX).to.be.equal(1);
          done();
        }
      );
    });

    // right
    [KEY_RIGHT_ARROW, KEY_D].forEach((keyCode, idx) => {
      it(
        "should trigger 'change' event to right(keyCode: " + keyCode + ")",
        (done) => {
          // Given
          let changeTriggered = false;
          let deltaX = 0;
          const rightKeyCode = {
            keyCode: keyCode,
          };
          const change = sinon.spy((e) => {
            deltaX = e.delta.x;
            changeTriggered = true;
            expect(deltaX).to.be.equal(1);
            inst.off("change");
          });
          const hold = sinon.spy();

          inst.on("hold", hold);
          inst.on("change", change);

          // When / Then
          expect(input._holding).to.be.false;
          TestHelper.key(el, "keydown", rightKeyCode, (e) => {
            expect(input._holding).to.be.true;
            expect(hold.callCount).to.be.equal(1);

            // Then
            expect(change.calledOnce).to.be.true;

            TestHelper.key(el, "keydown", rightKeyCode, (e) => {
              expect(input._holding).to.be.true;
              expect(hold.callCount).to.be.equal(1);
              done();
            });
          });
        }
      );
    });

    // up
    [KEY_UP_ARROW, KEY_W].forEach((keyCode, idx) => {
      it("should trigger 'change' event to up(" + keyCode + ")", (done) => {
        // Given
        let changeTriggered = false;
        let deltaY = 0;
        const upKeyCode = {
          keyCode: keyCode,
        };
        const change = sinon.spy((e) => {
          deltaY = e.delta.y;
          changeTriggered = true;
          expect(deltaY).to.be.equal(1);
          inst.off("change");
        });
        const hold = sinon.spy();

        inst.on("hold", hold);
        inst.on("change", change);

        expect(input._holding).to.be.false;
        // When
        TestHelper.key(el, "keydown", upKeyCode, (e) => {
          expect(input._holding).to.be.true;
          expect(hold.callCount).to.be.equal(1);

          // Then
          expect(change.calledOnce).to.be.true;

          TestHelper.key(el, "keydown", upKeyCode, (e) => {
            expect(input._holding).to.be.true;
            expect(hold.callCount).to.be.equal(1);
            done();
          });
        });
      });
    });

    // down
    [KEY_DOWN_ARROW, KEY_S].forEach((keyCode, idx) => {
      it("should trigger 'change' event to down(" + keyCode + ")", () => {
        // Given
        let changeTriggered = false;
        let deltaY = 0;
        inst.on("change", (e) => {
          deltaY = e.delta.y;
          changeTriggered = true;
        });
        const downKeyCode = {
          keyCode: keyCode,
        };
        input.options.scale[1] = -1;

        // When
        TestHelper.key(el, "keydown", downKeyCode);

        // Then
        expect(changeTriggered).to.be.true;
        expect(deltaY).to.be.equal(1);
      });
    });
    // down
    [1, 2, 3, 4].forEach((keyCode, idx) => {
      it(
        "should not trigger 'change' event to down wrong keyCode(" +
          keyCode +
          ")",
        (done) => {
          // Given
          const changeHandler = sinon.spy();
          const holdHandler = sinon.spy();
          const releaseHandler = sinon.spy();
          const downKeyCode = {
            keyCode: keyCode,
          };

          inst.on("hold", holdHandler);
          inst.on("change", changeHandler);
          inst.on("release", releaseHandler);

          // When
          TestHelper.key(el, "keydown", downKeyCode);

          // Then
          expect(changeHandler.calledOnce).to.be.false;
          expect(holdHandler.calledOnce).to.be.false;
          setTimeout(() => {
            TestHelper.key(el, "keyup", downKeyCode);
            expect(releaseHandler.calledOnce).to.be.false;
            done();
          }, 100);
        }
      );
      it(
        "triggering order test to down wrong keyCode(" + keyCode + ")",
        (done) => {
          // Given
          const eventLog = [];
          const eventLogAnswer = ["hold", "change", "release"];

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
          TestHelper.key(el, "keydown", { keyCode: KEY_DOWN_ARROW }, () => {
            setTimeout(() => {
              TestHelper.key(el, "keyup", { keyCode: keyCode }, () => {
                setTimeout(() => {
                  // Then
                  expect(eventLog).to.be.deep.equal(eventLogAnswer);
                  done();
                }, 100);
              });
            }, 20);
          });
        }
      );
    });
  });
});

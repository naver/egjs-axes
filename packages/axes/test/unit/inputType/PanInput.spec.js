import Axes from "../../../src/Axes.ts";
import { PanInput, getDirectionByAngle } from "../../../src/inputType/PanInput";
import {
  DIRECTION_ALL,
  DIRECTION_HORIZONTAL,
  DIRECTION_NONE,
  DIRECTION_VERTICAL,
} from "../../../src/const";

describe("PanInput", () => {
  let el;
  let input;
  let inst;
  let observer;

  describe("Methods", () => {
    beforeEach(() => {
      inst = new PanInput(sandbox());
    });
    afterEach(() => {
      if (inst) {
        inst.destroy();
        inst = null;
      }
      cleanup();
    });

    describe("mapAxes", () => {
      it("should initialize correct axes name with its direction", () => {
        // when
        inst.mapAxes(["x"]);

        // then
        expect(inst.axes).to.be.eql(["x"]);
        expect(inst._direction).to.be.equal(DIRECTION_HORIZONTAL);

        // when
        inst.mapAxes(["", "y"]);

        // then
        expect(inst.axes).to.be.eql(["", "y"]);
        expect(inst._direction).to.be.equal(DIRECTION_VERTICAL);

        // when
        inst.mapAxes(["x", "y"]);

        // then
        expect(inst.axes).to.be.eql(["x", "y"]);
        expect(inst._direction).to.be.equal(DIRECTION_ALL);

        // when
        inst.mapAxes(["x", "y", "z"]);

        // then
        expect(inst.axes).to.be.eql(["x", "y", "z"]);
        expect(inst._direction).to.be.equal(DIRECTION_ALL);
      });
    });

    describe("disconnect", () => {
      it("should check status is completely empty after disconnect", () => {
        // Given
        inst.connect({});

        // When
        inst.disconnect();

        // Then
        expect(observer).to.be.not.exist;
        expect(inst.element).to.be.exist;
        expect(inst._direction).to.be.equal(DIRECTION_NONE);
      });
    });

    describe("destroy", () => {
      it("should check status is completely empty after destroy", () => {
        // Given
        inst.connect({});

        // When
        inst.destroy();

        // Then
        expect(inst.element).to.be.not.exist;
        expect(observer).to.be.not.exist;
        expect(inst._direction).to.be.equal(DIRECTION_NONE);

        inst = null;
      });
    });

    describe("release", () => {
      it("should release current input when method is called", (done) => {
        // Given
        el = sandbox();
        input = new PanInput(el, {
          inputType: ["touch", "mouse"],
        });
        inst = new Axes({
          x: {
            range: [0, 200],
          },
        });
        const hold = sinon.spy();
        const release = sinon.spy();
        inst.connect(["x", ""], input);
        inst.on("hold", hold);
        inst.on("release", release);

        // When
        Simulator.gestures.pan(el, {
          pos: [0, 0],
          deltaX: 100,
          duration: 2000,
          easing: "linear",
        });
        setTimeout(() => {
          input.release();
        }, 1000);

        // Then
        setTimeout(() => {
          expect(hold.calledOnce).to.be.true;
          expect(release.calledOnce).to.be.true;
        }, 1500);
        setTimeout(() => {
          expect(inst.get().x).to.be.lessThan(50);
          done();
        }, 2000);
      });
    });

    describe("enable/disable", () => {
      beforeEach(() => {
        el = sandbox();
        input = new PanInput(el, {
          inputType: ["touch", "mouse"],
        });
        inst = new Axes({
          x: {
            range: [0, 200],
          },
          y: {
            range: [0, 200],
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

      it("should check value of `isEnabled` matches correctly after enable/disable", () => {
        // Given
        // When
        // Then
        expect(input.isEnabled()).to.be.false;

        // When
        input.enable();

        // Then
        expect(input.isEnabled()).to.be.true;

        // When
        input.disable();

        // Then
        expect(input.isEnabled()).to.be.false;
      });

      it("should check events can be triggered after enable method is called", (done) => {
        // Given
        const hold = sinon.spy();
        const change = sinon.spy();
        const release = sinon.spy();
        inst.connect(["x", "y"], input);
        inst.on("hold", hold);
        inst.on("change", change);
        inst.on("release", release);

        // When
        expect(input.isEnabled()).to.be.true;

        // When
        Simulator.gestures.pan(
          el,
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

      it("should check events cannot be triggered after disable method is called", (done) => {
        // Given
        const hold = sinon.spy();
        const change = sinon.spy();
        const release = sinon.spy();
        inst.connect(["x", "y"], input);
        inst.on("hold", hold);
        inst.on("change", change);
        inst.on("release", release);

        // When
        expect(input.isEnabled()).to.be.true;
        input.disable();

        // When
        Simulator.gestures.pan(
          el,
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

    describe("getDirectionByAngle", () => {
      it("should check correct direction is calculated from the given angle", () => {
        // Given
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
    });
  });

  describe("Options", () => {
    beforeEach(() => {
      el = sandbox();
      inst = new Axes({
        x: {
          range: [0, 200],
        },
        y: {
          range: [0, 200],
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

    describe("preventClickOnDrag", () => {
      it("should prevent click event when preventClickOnDrag is true", (done) => {
        // Given
        const click = sinon.spy();
        el.addEventListener("click", click);
        input = new PanInput(el, {
          inputType: ["touch", "mouse"],
          preventClickOnDrag: true,
        });
        inst.connect(["x", "y"], input);

        // When
        Simulator.gestures.pan(
          el,
          {
            pos: [0, 0],
            deltaX: 50,
            deltaY: 50,
            duration: 200,
            easing: "linear",
          },
          () => {
            el.click();
            // Then
            expect(click.called).to.be.false;
            done();
          }
        );
      });

      it("shouldn't bother click event when input is disabled", (done) => {
        // Given
        const click = sinon.spy();
        el.addEventListener("click", click);
        input = new PanInput(el, {
          inputType: ["touch", "mouse"],
          preventClickOnDrag: true,
        });
        inst.connect(["x", "y"], input);
        input.disable();

        // When
        Simulator.gestures.pan(
          el,
          {
            pos: [0, 0],
            deltaX: 50,
            deltaY: 50,
            duration: 200,
            easing: "linear",
          },
          () => {
            el.click();
            // Then
            expect(click.called).to.be.true;
            done();
          }
        );
      });

      it("should apply changes in preventClickOnDrag option after connected", (done) => {
        // Given
        const click = sinon.spy();
        el.addEventListener("click", click);
        input = new PanInput(el, {
          inputType: ["touch", "mouse"],
          preventClickOnDrag: true,
        });
        inst.connect(["x", "y"], input);
        input.options.preventClickOnDrag = false;

        // When
        Simulator.gestures.pan(
          el,
          {
            pos: [0, 0],
            deltaX: 50,
            deltaY: 50,
            duration: 200,
            easing: "linear",
          },
          () => {
            el.click();
            // Then
            expect(click.called).to.be.true;
            done();
          }
        );
      });
    });

    describe("preventDefaultOnDrag", () => {
      it("should use preventDefault at the start of a drag when preventDefaultOnDrag is true", () => {
        // Given
        const mouseDown = new MouseEvent("mousedown", { buttons: 1, cancelable: true });
        input = new PanInput(el, {
          inputType: ["touch", "mouse"],
          preventDefaultOnDrag: true,
        });
        inst.connect(["x", "y"], input);

        // When
        el.dispatchEvent(mouseDown);
        // Then
        expect(mouseDown.defaultPrevented).to.be.true;
      });

      it("should apply changes in preventDefaultOnDrag option after connected", () => {
        // Given
        const mouseDown = new MouseEvent("mousedown", { buttons: 1, cancelable: true });
        input = new PanInput(el, {
          inputType: ["touch", "mouse"],
          preventDefaultOnDrag: true,
        });
        inst.connect(["x", "y"], input);
        input.options.preventDefaultOnDrag = false;

        // When
        el.dispatchEvent(mouseDown);
        // Then
        expect(mouseDown.defaultPrevented).to.be.false;
      });
    });

    describe("threshold", () => {
      it("should not trigger change event when moving below threshold", (done) => {
        // Given
        const change = sinon.spy();
        input = new PanInput(el, {
          inputType: ["touch", "mouse"],
          threshold: 100,
        });
        inst.connect(["x", "y"], input);
        inst.on("change", change);

        // When
        Simulator.gestures.pan(
          el,
          {
            pos: [0, 0],
            deltaX: 50,
            deltaY: 0,
            duration: 200,
            easing: "linear",
          },
          () => {
            // Then
            expect(change.called).to.be.false;
            done();
          }
        );
      });

      it("should trigger change event when moving above threshold", (done) => {
        // Given
        const change = sinon.spy();
        input = new PanInput(el, {
          inputType: ["touch", "mouse"],
          threshold: 100,
        });
        inst.connect(["x", "y"], input);
        inst.on("change", change);

        // When
        Simulator.gestures.pan(
          el,
          {
            pos: [0, 0],
            deltaX: 150,
            deltaY: 0,
            duration: 200,
            easing: "linear",
          },
          () => {
            // Then
            expect(change.called).to.be.true;
            done();
          }
        );
      });
    });

    describe("inputKey", () => {
      it("should not trigger events when the key set in inputKey is not pressed", (done) => {
        // Given
        const hold = sinon.spy();
        const change = sinon.spy();
        const release = sinon.spy();
        input = new PanInput(el, {
          inputType: ["touch", "mouse"],
          inputKey: ["shift"],
        });
        inst.connect(["x", "y"], input);
        inst.on("hold", hold);
        inst.on("change", change);
        inst.on("release", release);

        // When
        Simulator.gestures.pan(
          el,
          {
            pos: [0, 0],
            deltaX: 50,
            deltaY: 50,
            duration: 200,
            easing: "linear",
          },
          () => {
            // Then
            expect(hold.called).to.be.equals(false);
            expect(change.called).to.be.equals(false);
            expect(release.called).to.be.equals(false);
            done();
          }
        );
      });
    });

    describe("inputButton", () => {
      ["left", "middle", "right"].forEach((button) => {
        it("should trigger event when the button set in inputButton matches", (done) => {
          // Given
          const hold = sinon.spy();
          const change = sinon.spy();
          const release = sinon.spy();
          input = new PanInput(el, {
            inputType: ["touch", "mouse"],
            inputButton: [button],
          });
          inst.connect(["x", "y"], input);
          inst.on("hold", hold);
          inst.on("change", change);
          inst.on("release", release);

          // When
          Simulator.gestures.pan(
            el,
            {
              pos: [0, 0],
              deltaX: 50,
              deltaY: 50,
              duration: 200,
              easing: "linear",
            },
            () => {
              // Then
              expect(hold.called).to.be.equals(button === "left");
              expect(change.called).to.be.equals(button === "left");
              expect(release.called).to.be.equals(button === "left");
              done();
            }
          );
        });
      });

      it("should not trigger event when the inputButton is empty", (done) => {
        // Given
        const hold = sinon.spy();
        const change = sinon.spy();
        const release = sinon.spy();
        input = new PanInput(el, {
          inputType: ["touch", "mouse"],
          inputButton: [],
        });
        inst.connect(["x", "y"], input);
        inst.on("hold", hold);
        inst.on("change", change);
        inst.on("release", release);

        // When
        Simulator.gestures.pan(
          el,
          {
            pos: [0, 0],
            deltaX: 50,
            deltaY: 50,
            duration: 200,
            easing: "linear",
          },
          () => {
            // Then
            expect(hold.called).to.be.equals(false);
            expect(change.called).to.be.equals(false);
            expect(release.called).to.be.equals(false);
            done();
          }
        );
      });
    });

    describe("touchAction", () => {
      ["auto", "none", "manipulation", "pan-x", "pan-y"].forEach(
        (touchAction) => {
          it(`should check whether the style set in touchAction is applied correctly after enabled (touchAction: ${touchAction})`, () => {
            // Given
            input = new PanInput(el, {
              touchAction,
            });
            el.style.userSelect = "auto";
            inst.connect(["x", "y"], input);

            // Then
            expect(el.style.touchAction).to.be.equal(touchAction);
            expect(el.style.userSelect).to.be.equal("none");
          });

          it(`should check whether the style set in touchAction is removed correctly after disabled (touchAction: ${touchAction})`, () => {
            // Given
            input = new PanInput(el, {
              touchAction,
            });
            el.style.userSelect = "auto";
            inst.connect(["x", "y"], input);
            input.disable();

            // Then
            expect(el.style.touchAction).to.be.equal("");
            expect(el.style.userSelect).to.be.equal("auto");
          });
        }
      );
    });
  });
});

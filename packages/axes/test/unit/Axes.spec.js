import PanInputInjector from "inject-loader!../../src/inputType/PanInput.ts";

import Axes from "../../src/Axes.ts";
import { PanInput } from "../../src/inputType/PanInput.ts";
import { MoveKeyInput, KEY_RIGHT_ARROW } from "../../src/inputType/MoveKeyInput";
import { PinchInput } from "../../src/inputType/PinchInput.ts";
import { getDecimalPlace, roundNumber } from "../../src/utils";
import TestHelper from "./inputType/TestHelper";

describe("Axes", () => {
  let el;
  let input;
  let inst;
  let nestedInst;
  let holdHandler;
  let changeHandler;
  let releaseHandler;
  let finishHandler;
  let animationStartHandler;
  let animationEndHandler;
  let preventedFn;
  let notPreventedFn;

  describe("Axes Test", () => {
    beforeEach(() => {
      inst = null;
    });
    afterEach(() => {
      if (inst) {
        inst.destroy();
        inst = null;
      }
    });

    it("should check a initialization empty value", () => {
      // Given
      // When
      inst = new Axes();
      // Then

      const defaultOptions = {
        easing: (x) => {
          return 1 - Math.pow(1 - x, 3);
        },
        interruptable: true,
        minimumDuration: 0,
        maximumDuration: Infinity,
        deceleration: 0.0006,
      };

      expect(inst).to.be.exist;
      expect(defaultOptions.easing(0.5)).to.be.equal(inst.options.easing(0.5));
      expect(defaultOptions.easing(0.3)).to.be.equal(inst.options.easing(0.3));
      expect(defaultOptions.easing(0.1)).to.be.equal(inst.options.easing(0.1));
      expect(defaultOptions.easing(0.7)).to.be.equal(inst.options.easing(0.7));
      expect(defaultOptions.easing(0.9)).to.be.equal(inst.options.easing(0.9));
      expect(defaultOptions.interruptable).to.be.equal(
        inst.options.interruptable
      );
      expect(defaultOptions.minimumDuration).to.be.equal(
        inst.options.minimumDuration
      );
      expect(defaultOptions.maximumDuration).to.be.equal(
        inst.options.maximumDuration
      );
      expect(defaultOptions.deceleration).to.be.equal(
        inst.options.deceleration
      );
    });

    it("should check initialization status", () => {
      // Given
      // When
      inst = new Axes(
        {
          x: {
            range: [0, 100],
            bounce: [30, 50],
            circular: true,
          },
          otherX: {
            range: [-100, 100],
            bounce: 40,
            circular: [false, true],
          },
        },
        {
          deceleration: 0.001,
        },
        {
          x: 50,
          otherX: 0,
        }
      );

      // Then
      expect(inst.axis.x.bounce).to.deep.equal([30, 50]);
      expect(inst.axis.x.circular).to.deep.equal([true, true]);
      expect(inst.axis.otherX.bounce).to.deep.equal([40, 40]);
      expect(inst.axis.otherX.circular).to.deep.equal([false, true]);
      expect(inst.get().x).to.equal(50);
      expect(inst.get().otherX).to.equal(0);
    });

    it("should check startPos set correctly when initializing an instance", () => {
      // Given
      // When
      changeHandler = sinon.spy();
      inst = new Axes(
        {
          x: {
            range: [0, 100],
            bounce: [30, 50],
            circular: true,
            startPos: 100,
          },
          otherX: {
            range: [-100, 100],
            bounce: 40,
            circular: [false, true],
          },
        },
        {
          deceleration: 0.001,
        }
      ).on({
        change: changeHandler,
      });

      // Then
      expect(inst.get().x).to.equal(100);
      expect(inst.get().otherX).to.equal(-100);
      expect(changeHandler.called).to.be.false;
    });

    it("should check `holding` property changes whether the input is being held", (done) => {
      // Given
      el = sandbox();
      input = new PanInput(el, {
        inputType: ["touch"],
      });
      inst = new Axes(
        {
          x: {
            range: [0, 100],
          },
        }
      );
      inst.connect("x", input);

      // When
      Simulator.gestures.pan(el, {
        pos: [0, 0],
        deltaX: 100,
        duration: 1500,
        easing: "linear",
      });

      // Then
      setTimeout(() => {
        expect(inst.holding).to.be.true;
      }, 1000);
      setTimeout(() => {
        expect(inst.holding).to.be.false;
        done();
      }, 2000);
    });

    it("should check `holding` property changes whether the input is being held (with mixed input types) ", (done) => {
      // Given
      el = sandbox();
      const moveKeyInput = new MoveKeyInput(el);
      input = new PanInput(el, {
        inputType: ["touch"],
      });
      inst = new Axes(
        {
          x: {
            range: [0, 100],
          },
        }
      );
      inst.connect("x", input);
      inst.connect("x", moveKeyInput);

      // When
      Simulator.gestures.pan(el, {
        pos: [0, 0],
        deltaX: 100,
        duration: 1500,
        easing: "linear",
      });
      TestHelper.key(el, "keydown", { keyCode: KEY_RIGHT_ARROW });
      setTimeout(() => {
        TestHelper.key(el, "keyup", { keyCode: KEY_RIGHT_ARROW });
      }, 2500);

      // Then
      setTimeout(() => {
        expect(inst.holding).to.be.true;
      }, 1000);
      setTimeout(() => {
        expect(inst.holding).to.be.true;
      }, 2000);
      setTimeout(() => {
        expect(inst.holding).to.be.false;
        done();
      }, 3000);
    });

    it("should check `setTo/setBy` method", () => {
      // Given
      inst = new Axes(
        {
          x: {
            range: [0, 100],
            bounce: [30, 50],
            circular: true,
          },
          otherX: {
            range: [-100, 100],
            bounce: 40,
            circular: [false, true],
          },
        },
        {
          deceleration: 0.001,
        }
      );
      // When
      const ret = inst.setTo({ x: 20 });

      // Then
      expect(inst.get()).to.be.eql({ x: 20, otherX: -100 });
      expect(ret).to.be.equal(inst);

      // When
      inst.setBy({ x: 10 });

      // Then
      expect(inst.get()).to.be.eql({ x: 30, otherX: -100 });
    });

    it("should check `setTo` method (with duration)", () => {
      // Given
      const startHandler = sinon.spy();
      changeHandler = sinon.spy();
      const endHandler = sinon.spy(() => {
        // Then
        expect(startHandler.callCount).to.be.equal(1);
        expect(changeHandler.called).to.be.true;
        expect(inst.get()).to.be.eql({ x: 20, otherX: -100 });
        done();
      });
      inst = new Axes(
        {
          x: {
            range: [0, 100],
            bounce: [30, 50],
            circular: true,
          },
          otherX: {
            range: [-100, 100],
            bounce: 40,
            circular: [false, true],
          },
        },
        {
          deceleration: 0.001,
        }
      ).on({
        animationStart: startHandler,
        change: changeHandler,
        animationEnd: endHandler,
      });

      // When
      inst.setTo({ x: 20 }, 200);
    });

    it("should check `setBy` method (with duration)", () => {
      // Given
      inst = new Axes(
        {
          x: {
            range: [0, 100],
            bounce: [30, 50],
            circular: true,
          },
          otherX: {
            range: [-100, 100],
            bounce: 40,
            circular: [false, true],
          },
        },
        {
          deceleration: 0.001,
        }
      );
      inst.setTo({ x: 50 });
      expect(inst.get()).to.be.eql({ x: 50, otherX: -100 });

      inst.on({
        animationStart: startHandler,
        change: changeHandler,
        animationEnd: endHandler,
      });

      const startHandler = sinon.spy();
      changeHandler = sinon.spy();
      const endHandler = sinon.spy(() => {
        // Then
        expect(startHandler.callCount).to.be.equal(1);
        expect(changeHandler.called).to.be.true;
        expect(inst.get()).to.be.eql({ x: 40, otherX: -100 });
        done();
      });

      // When
      inst.setBy({ x: -10 }, 200);
    });

    it("should change Axes options via `setOptions` method", () => {
      // Given
      inst = new Axes(
        {
          x: {
            range: [0, 100],
          },
        },
        {
          round: 10,
        }
      );

      // When
      inst.setTo({ x: 48 });

      // Then
      expect(inst.get()).to.be.eql({ x: 50 });

      // When
      inst.setOptions({
        round: 1,
      });
      inst.setTo({ x: 48 });

      // Then
      expect(inst.get()).to.be.eql({ x: 48 });
    });

    it("should change options of each Axis via `setAxis` method", () => {
      // Given
      inst = new Axes(
        {
          x: {
            range: [0, 100],
          },
          y: {
            range: [0, 200],
          },
        },
      );

      // When
      inst.setTo({ x: 150, y: 150 });

      // Then
      expect(inst.get()).to.be.eql({ x: 100, y: 150 });

      // When
      inst.setAxis({
        x: {
          range: [0, 200],
        },
        y: {
          range: [0, 100],
        },
      });
      inst.setTo({ x: 150, y: 200 });

      // Then
      expect(inst.get()).to.be.eql({ x: 150, y: 100 });
    });
  });

  describe("Axes Test with InputType", () => {
    beforeEach(() => {
      inst = new Axes(
        {
          x: {
            range: [0, 100],
            bounce: [30, 50],
            circular: true,
          },
          otherX: {
            range: [-100, 100],
            bounce: 40,
            circular: [false, true],
          },
        },
        {
          deceleration: 0.001,
        }
      );
      sandbox();
    });
    afterEach(() => {
      if (inst) {
        inst.destroy();
        inst = null;
      }
      cleanup();
    });

    it("should check `connect` method", () => {
      // Given
      const input = new PanInput("#sandbox");

      // When
      let ret = inst.connect("x", input);

      // Then
      expect(input.axes).to.be.eql(["x"]);
      expect(inst._inputs.length).to.be.equal(1);
      expect(ret).to.be.equal(inst);

      // When
      ret = inst.connect(["x"], input);

      // Then
      expect(input.axes).to.be.eql(["x"]);
      expect(inst._inputs.length).to.be.equal(1);
      expect(ret).to.be.equal(inst);

      // When
      ret = inst.connect(["x", "y"], input);

      // Then
      expect(input.axes).to.be.eql(["x", "y"]);
      expect(inst._inputs.length).to.be.equal(1);
      expect(ret).to.be.equal(inst);

      // When
      ret = inst.connect("x y", input);

      // Then
      expect(input.axes).to.be.eql(["x", "y"]);
      expect(inst._inputs.length).to.be.equal(1);
      expect(ret).to.be.equal(inst);

      input.destroy();
    });

    it("should check `disconnect` method", () => {
      // Given
      const input1 = new PanInput("#sandbox");
      const input2 = new PanInput("#sandbox");
      const input3 = new PanInput("#sandbox");
      inst.connect("x", input1);
      inst.connect("y", input2);
      inst.connect("x y", input3);

      // When
      expect(inst._inputs.length).to.be.equal(3);
      let ret = inst.disconnect(input1);

      // Then
      expect(inst._inputs.indexOf(input1)).to.be.equal(-1);
      expect(inst._inputs.length).to.be.equal(2);
      expect(ret).to.be.equal(inst);

      // When
      ret = inst.disconnect();

      // Then
      expect(inst._inputs).to.be.eql([]);
      expect(ret).to.be.equal(inst);
      expect(inst._inputs.length).to.be.equal(0);

      // When no input, it should not make script error
      ret = inst.disconnect(input1);

      // Then
      expect(ret).to.be.equal(inst);

      input1.destroy();
      input2.destroy();
      input3.destroy();
    });

    it("should work with pan gesture when connecting PanInput after PinchInput disconnected.", (done) => {
      // Given
      const MOVE_HORIZONTALLY = {
        pos: [0, 0],
        deltaX: 100,
        deltaY: 10,
        duration: 200,
        easing: "linear",
      };
      const MOVE_VERTICALLY = {
        pos: [0, 0],
        deltaX: 0,
        deltaY: 100,
        duration: 200,
        easing: "linear",
      };
      const target = document.querySelector("#sandbox");
      const pinchInput = new PinchInput(target, { inputType: ["touch"] });
      const panInput = new PanInput(target, { inputType: ["touch"] });

      inst.connect("x", pinchInput);
      inst.disconnect(pinchInput);
      inst.connect(["x", "otherX"], panInput);

      const prevX = inst.get()["x"];
      const prevY = inst.get()["otherX"];

      // When
      Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
        Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
          // Then
          const currX = inst.get()["x"];
          const currY = inst.get()["otherX"];

          expect(currX).to.be.not.equal(prevX);
          expect(currY).to.be.not.equal(prevY);

          pinchInput.destroy();
          panInput.destroy();
          done();
        });
      });
    });
  });

  describe("Nested Axes Test", () => {
    beforeEach(() => {
      inst = new Axes({
        x: {
          range: [0, 300],
          bounce: [10, 10],
        },
      });
      nestedInst = new Axes(
        {
          x: {
            range: [0, 200],
            bounce: [10, 10],
          },
        },
        {
          nested: true,
        }
      );
      el = sandbox();
      el.innerHTML = `<div id="parent"
      style="width:300px; height:200px;"><div id="child" style="width:200px; height:200px;"></div></div>`;
    });
    afterEach(() => {
      if (inst) {
        inst.destroy();
        inst = null;
      }
      if (nestedInst) {
        nestedInst.destroy();
        nestedInst = null;
      }
      cleanup();
    });

    it("should check only the state of the axes attached to the child element changes.", (done) => {
      // Given
      const parent = document.querySelector("#parent");
      const child = document.querySelector("#child");
      const parentInput = new PanInput(parent, { inputType: ["touch"] });
      const childInput = new PanInput(child, { inputType: ["touch"] });

      inst.connect(["x"], parentInput);
      nestedInst.connect(["x"], childInput);

      const parentPrevX = inst.get()["x"];
      const childPrevX = nestedInst.get()["x"];

      // When
      Simulator.gestures.pan(
        child,
        {
          pos: [0, 0],
          deltaX: 100,
          deltaY: 0,
          duration: 200,
          easing: "linear",
        },
        () => {
          // Then
          const parentCurrX = inst.get()["x"];
          const childCurrX = nestedInst.get()["x"];

          expect(parentPrevX).to.be.equal(parentCurrX);
          expect(childPrevX).to.be.not.equal(childCurrX);

          parentInput.destroy();
          childInput.destroy();
          done();
        }
      );
    });

    it("should check both state of the axes attached to the elements when child axes reaches the max range.", (done) => {
      // Given
      const parent = document.querySelector("#parent");
      const child = document.querySelector("#child");
      const parentInput = new PanInput(parent, { inputType: ["touch"] });
      const childInput = new PanInput(child, { inputType: ["touch"] });

      inst.connect(["x"], parentInput);
      nestedInst.connect(["x"], childInput);

      const parentPrevX = inst.get()["x"];
      const childPrevX = nestedInst.get()["x"];

      // When
      Simulator.gestures.pan(
        child,
        {
          pos: [0, 0],
          deltaX: 300,
          deltaY: 0,
          duration: 200,
          easing: "linear",
        },
        () => {
          // Then
          const parentCurrX = inst.get()["x"];
          const childCurrX = nestedInst.get()["x"];

          expect(parentPrevX).to.be.not.equal(parentCurrX);
          expect(childPrevX).to.be.not.equal(childCurrX);

          parentInput.destroy();
          childInput.destroy();
          done();
        }
      );
    });
  });

  [20, 30, 40, 50].forEach((iOSEdgeSwipeThreshold) => {
    describe(`Axes iOS Edge Test (iOSEdgeSwipeThreshold: ${iOSEdgeSwipeThreshold})`, () => {
      beforeEach(() => {
        inst = new Axes(
          {
            x: {
              range: [0, 300],
              bounce: 100,
            },
            y: {
              range: [0, 400],
              bounce: 100,
            },
          },
          {
            deceleration: 0.001,
          }
        );
        el = sandbox();
        el.innerHTML = `<div id="area"
    style="position:relative; border:5px solid #444; width:300px; height:400px; color:#aaa; margin:0;box-sizing:content-box; z-index:9;"></div>`;

        releaseHandler = sinon.spy();
        finishHandler = sinon.spy();
        const MockPanInputInjector = PanInputInjector({
          "../const": {
            IOS_EDGE_THRESHOLD: 30,
            IS_IOS_SAFARI: true,
          },
        });
        input = new MockPanInputInjector.PanInput(el, {
          iOSEdgeSwipeThreshold,
          inputKey: ["any"],
          inputType: ["touch"],
        });
        inst
          .on({
            release: releaseHandler,
            finish: finishHandler,
          })
          .connect(["x", "y"], input);

        const touchTrigger = Simulator.events.touch.trigger;

        Simulator.events.touch.originalTrigger = touchTrigger;
        Simulator.events.touch.trigger = (touches, element, type) => {
          if (type === "end") {
            return;
          }
          touchTrigger.call(Simulator.events.touch, touches, element, type);
        };
      });
      afterEach(() => {
        Simulator.events.touch.trigger = Simulator.events.touch.originalTrigger;
        if (inst) {
          inst.destroy();
          inst = null;
        }
        if (input) {
          input.destroy();
          input = null;
        }
        releaseHandler.resetHistory();
        finishHandler.resetHistory();
        cleanup();
      });
      it("should check release event occurs when swiping on ios safari edge. (left to right)", (done) => {
        // Given, When
        // clientX + => -
        Simulator.gestures.pan(
          el,
          {
            pos: [30, 30],
            deltaX: -50,
            deltaY: 10,
            duration: 200,
            easing: "linear",
          },
          () => {
            // Then
            // for test animation event
            setTimeout(() => {
              const releaseEvent = releaseHandler.getCall(0).args[0];
              expect(releaseHandler.calledOnce).to.be.true;
              // expect(releaseEvent.inputEvent.isFinal).to.be.false;
              expect(releaseEvent.isTrusted).to.be.true;

              const finishEvent = finishHandler.getCall(0).args[0];
              expect(finishHandler.called).to.be.true;
              expect(finishEvent.isTrusted).to.be.true;
              done();
            }, 500);
          }
        );
      });
      it("should check release event occurs when swiping a little on ios safari edge. (right to left)", (done) => {
        // Given, When
        // window.innerWidth => window.innerWidth - 15
        Simulator.gestures.pan(
          el,
          {
            pos: [window.innerWidth - iOSEdgeSwipeThreshold + 1, 30],
            deltaX: -15,
            deltaY: 0,
            duration: 200,
            easing: "linear",
          },
          () => {
            // Then
            // for test animation event
            setTimeout(() => {
              const releaseEvent = releaseHandler.getCall(0).args[0];
              expect(releaseHandler.calledOnce).to.be.true;
              // expect(releaseEvent.inputEvent.isFinal).to.be.false;
              expect(releaseEvent.isTrusted).to.be.true;

              const finishEvent = finishHandler.getCall(0).args[0];
              expect(finishHandler.called).to.be.true;
              expect(finishEvent.isTrusted).to.be.true;
              done();
            }, 500);
          }
        );
      });
      it("should check release event not occurs when swiping a lot on ios safari edge. (right to left)", (done) => {
        // Given, When
        // window.innerWidth => window.innerWidth - 30
        Simulator.gestures.pan(
          el,
          {
            pos: [window.innerWidth, 30],
            deltaX: -60,
            deltaY: 0,
            duration: 200,
            easing: "linear",
          },
          () => {
            // Then
            // for test animation event
            setTimeout(() => {
              expect(releaseHandler.callCount).to.be.equals(0);
              done();
            }, 500);
          }
        );
      });
    });
  });
  [["pointer"], ["touch", "mouse"], ["touch"]].forEach((type) => {
    describe(`Axes Custom Event Test with interruptable(${type})`, () => {
      beforeEach(() => {
        if (type.indexOf("pointer") > -1) {
          Simulator.setType("pointer");
        } else {
          Simulator.setType("touch");
        }
        inst = new Axes(
          {
            x: {
              range: [0, 300],
              bounce: 100,
            },
            y: {
              range: [0, 400],
              bounce: 100,
            },
          },
          {
            deceleration: 0.001,
            interruptable: false,
          }
        );
        el = sandbox();
        el.innerHTML = `<div id="area"
        style="position:relative; border:5px solid #444; width:300px; height:400px; color:#aaa; margin:0;box-sizing:content-box; z-index:9;"></div>`;
        const self = inst;
        preventedFn = () => {
          expect(self.interruptManager._prevented).to.be.true;
        };
        notPreventedFn = () => {
          expect(self.interruptManager._prevented).to.be.false;
        };
        input = new PanInput(el, {
          inputType: type,
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
      after(() => {
        // Simulator type should be "touch" type after test complete.
        // Otherwise this test will affect other simulation test.
        Simulator.setType("touch");
      });
      const testNormalBehavior = (done) => {
        // Given
        holdHandler = sinon.spy();
        changeHandler = sinon.spy();
        releaseHandler = sinon.spy();
        finishHandler = sinon.spy();
        animationStartHandler = sinon.spy();
        animationEndHandler = sinon.spy();
        inst.off().on({
          hold: holdHandler,
          change: changeHandler,
          release: releaseHandler,
          finish: finishHandler,
          animationStart: animationStartHandler,
          animationEnd: animationEndHandler,
        });

        // When
        Simulator.gestures.pan(
          el,
          {
            pos: [0, 0],
            deltaX: 100,
            deltaY: 100,
            duration: 1000,
            easing: "linear",
          },
          () => {
            // Then
            // for test custom event
            setTimeout(() => {
              expect(holdHandler.calledOnce).to.be.true;
              expect(changeHandler.called).to.be.true;
              expect(releaseHandler.calledOnce).to.be.true;
              expect(finishHandler.calledOnce).to.be.true;
              expect(animationStartHandler.calledOnce).to.be.true;
              expect(animationEndHandler.calledOnce).to.be.true;
              done();
            }, 1000);
          }
        );
      };
      it("should check normal behavior test after user invokes 'stop' from change event", (done) => {
        // Given
        let changeCount = 0;
        let pos = 0;
        changeHandler = sinon.spy((e) => {
          ++changeCount;

          if (changeCount === 5) {
            // current position
            pos = e.pos;
            // hold => change * 5 (stop) => finish
            e.stop();
          }
        });
        holdHandler = sinon.spy();
        releaseHandler = sinon.spy();
        finishHandler = sinon.spy();
        animationStartHandler = sinon.spy();
        animationEndHandler = sinon.spy();
        inst.on({
          hold: holdHandler,
          change: changeHandler,
          release: releaseHandler,
          finish: finishHandler,
          animationStart: animationStartHandler,
          animationEnd: animationEndHandler,
        });

        // When
        Simulator.gestures.pan(
          el,
          {
            pos: [0, 0],
            deltaX: 100,
            deltaY: 100,
            duration: 1000,
            easing: "linear",
          },
          () => {
            // Then
            setTimeout(() => {
              // The stopped position is the current position.
              expect(pos).to.be.deep.equals(inst.get());
              expect(holdHandler.calledOnce).to.be.true;
              expect(changeCount).to.be.equals(5);
              expect(changeHandler.callCount).to.be.equals(changeCount);
              expect(finishHandler.calledOnce).to.be.true;

              // not called events
              expect(releaseHandler.callCount).to.be.equals(0);
              expect(animationStartHandler.callCount).to.be.equals(0);
              expect(animationEndHandler.callCount).to.be.equals(0);
              testNormalBehavior(done);
            }, 1000);
          }
        );
      });
      it("should check normal behavior test after user invokes 'stop' from change event(after animationStart)", (done) => {
        // Given
        holdHandler = sinon.spy();
        let changeCount = 0;
        let pos = 0;
        releaseHandler = sinon.spy();
        finishHandler = sinon.spy();
        animationStartHandler = sinon.spy();
        animationEndHandler = sinon.spy();
        changeHandler = sinon.spy((e) => {
          if (animationStartHandler.calledOnce) {
            ++changeCount;

            if (changeCount === 5) {
              // current position
              pos = e.pos;
              // hold => change * 5 (stop) => finish
              e.stop();
            }
          }
        });
        inst.on({
          hold: holdHandler,
          change: changeHandler,
          release: releaseHandler,
          finish: finishHandler,
          animationStart: animationStartHandler,
          animationEnd: animationEndHandler,
        });

        // When
        Simulator.gestures.pan(
          el,
          {
            pos: [0, 0],
            deltaX: 100,
            deltaY: 100,
            duration: 1000,
            easing: "linear",
          },
          () => {
            // Then
            setTimeout(() => {
              // The stopped position is the current position.
              expect(pos).to.be.deep.equals(inst.get());
              expect(holdHandler.called).to.be.true;
              expect(changeCount).to.be.equals(5);
              expect(releaseHandler.calledOnce).to.be.true;
              expect(animationStartHandler.calledOnce).to.be.true;
              expect(finishHandler.calledOnce).to.be.true;
              // not called events
              expect(animationEndHandler.callCount).to.be.equals(0);
              testNormalBehavior(done);
            }, 1000);
          }
        );
      });
      it("should check interrupt test when user's action is fast", (done) => {
        holdHandler = sinon.spy(preventedFn);
        changeHandler = sinon.spy(preventedFn);
        releaseHandler = sinon.spy(preventedFn);
        finishHandler = sinon.spy(notPreventedFn);
        animationStartHandler = sinon.spy(preventedFn);
        animationEndHandler = sinon.spy(notPreventedFn);
        inst.on({
          hold: holdHandler,
          change: changeHandler,
          release: releaseHandler,
          finish: finishHandler,
          animationStart: animationStartHandler,
          animationEnd: animationEndHandler,
        });

        // when
        Simulator.gestures.pan(
          el,
          {
            pos: [0, 0],
            deltaX: 100,
            deltaY: 100,
            duration: 1000,
            easing: "linear",
          },
          () => {
            // Then
            // for test custom event
            setTimeout(() => {
              expect(holdHandler.calledOnce).to.be.true;
              expect(changeHandler.called).to.be.true;
              expect(releaseHandler.calledOnce).to.be.true;
              expect(finishHandler.calledOnce).to.be.true;
              expect(animationStartHandler.calledOnce).to.be.true;
              expect(animationEndHandler.calledOnce).to.be.true;
              done();
            }, 1000);
          }
        );
      });
    });
    describe(`Axes Custom Event Test(${type})`, () => {
      beforeEach(() => {
        if (type.indexOf("pointer") > -1) {
          Simulator.setType("pointer");
        } else {
          Simulator.setType("touch");
        }
        inst = new Axes(
          {
            x: {
              range: [0, 300],
              bounce: 100,
            },
            y: {
              range: [0, 400],
              bounce: 100,
            },
          },
          {
            deceleration: 0.001,
          }
        );
        el = sandbox();
        el.innerHTML = `<div id="area"
        style="position:relative; border:5px solid #444; width:300px; height:400px; color:#aaa; margin:0;box-sizing:content-box; z-index:9;"></div>`;

        holdHandler = sinon.spy();
        releaseHandler = sinon.spy();
        finishHandler = sinon.spy();
        animationStartHandler = sinon.spy();
        animationEndHandler = sinon.spy();

        input = new PanInput(el, {
          inputType: type,
        });
        inst
          .on({
            hold: holdHandler,
            release: releaseHandler,
            finish: finishHandler,
            animationStart: animationStartHandler,
            animationEnd: animationEndHandler,
          })
          .connect(["x", "y"], input);
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
        holdHandler.resetHistory();
        releaseHandler.resetHistory();
        finishHandler.resetHistory();
        animationStartHandler.resetHistory();
        animationEndHandler.resetHistory();
        cleanup();
      });
      after(() => {
        // Simulator type should be "touch" type after test complete.
        // Otherwise this test will affect other simulation test.
        Simulator.setType("touch");
      });
      it("should check slow movement test (no-velocity)", (done) => {
        // Given
        changeHandler = sinon.spy();
        inst.on("change", changeHandler);

        // When
        Simulator.gestures.pan(
          el,
          {
            pos: [30, 30],
            deltaX: 10,
            deltaY: 10,
            duration: 3000,
            easing: "linear",
          },
          () => {
            // Then
            const holdEvent = holdHandler.getCall(0).args[0];
            expect(holdHandler.calledOnce).to.be.true;
            expect(holdEvent.pos.x).to.be.equal(0);
            expect(holdEvent.pos.y).to.be.equal(0);
            // expect(holdEvent.inputEvent.isFirst).to.be.true;
            expect(holdEvent.isTrusted).to.be.true;
            expect(changeHandler.called).to.be.true;
            for (let i = 0, len = changeHandler.callCount; i < len; i++) {
              const changeEvent = changeHandler.getCall(i).args[0];
              expect(changeEvent.holding).to.be.true;
              expect(changeEvent.input).to.be.equal(input);
              expect(changeEvent.isTrusted).to.be.true;
              expect(changeEvent.inputEvent).to.be.not.equal(null);
            }
            const releaseEvent = releaseHandler.getCall(0).args[0];
            expect(releaseHandler.calledOnce).to.be.true;
            // expect(releaseEvent.inputEvent.isFinal).to.be.true;
            expect(releaseEvent.input).to.be.equal(input);
            expect(releaseEvent.isTrusted).to.be.true;
            expect(inst.get()).to.be.eql({ x: 10, y: 10 });

            const finishEvent = finishHandler.getCall(0).args[0];
            expect(finishHandler.calledOnce).to.be.true;
            expect(finishEvent.isTrusted).to.be.true;

            expect(animationStartHandler.called).to.be.false;
            expect(animationEndHandler.called).to.be.false;
            done();
          }
        );
      });
      it("should check slow movement test (no-velocity), release outside", (done) => {
        // Given
        inst.on("change", (e) => {
          if (animationStartHandler.called) {
            expect(e.holding).to.be.false;
            expect(inst.animationManager.getEventInfo().input).to.be.equal(
              e.input
            );
          } else {
            expect(e.holding).to.be.true;
          }
          expect(e.input).to.be.equal(input);
          expect(e.inputEvent).to.be.not.equal(null);
          expect(e.isTrusted).to.be.true;
        });
        inst.options.maximumDuration = 200;

        // When
        Simulator.gestures.pan(
          el,
          {
            pos: [30, 30],
            deltaX: -50,
            deltaY: 10,
            duration: 3000,
            easing: "linear",
          },
          () => {
            // Then
            // for test animation event
            setTimeout(() => {
              const holdEvent = holdHandler.getCall(0).args[0];
              expect(holdHandler.calledOnce).to.be.true;
              expect(holdEvent.pos.x).to.be.equal(0);
              expect(holdEvent.pos.y).to.be.equal(0);
              // expect(holdEvent.inputEvent.isFirst).to.be.true;
              expect(holdEvent.input).to.be.equal(input);
              expect(holdEvent.isTrusted).to.be.true;
              const releaseEvent = releaseHandler.getCall(0).args[0];
              expect(releaseHandler.calledOnce).to.be.true;
              // expect(releaseEvent.inputEvent.isFinal).to.be.true;
              expect(releaseEvent.input).to.be.equal(input);
              expect(releaseEvent.isTrusted).to.be.true;

              const result = inst.get();
              expect(result.x).to.be.equal(0);
              expect(result.y).to.be.equal(10);
              expect(releaseEvent.duration).to.be.equal(0);
              expect(releaseEvent.depaPos).to.deep.equal(releaseEvent.destPos);
              const animationStartEvent =
                animationStartHandler.getCall(0).args[0];
              expect(animationStartHandler.called).to.be.true;
              expect(animationStartEvent.isTrusted).to.be.true;
              const animationEndEvent = animationEndHandler.getCall(0).args[0];
              expect(animationEndEvent.isTrusted).to.be.true;

              const finishEvent = finishHandler.getCall(0).args[0];
              expect(finishHandler.called).to.be.true;
              expect(finishEvent.isTrusted).to.be.true;
              done();
            }, 500);
          }
        );
      });

      it("should check fast movement test (velocity)", (done) => {
        // Given
        inst.on("change", (e) => {
          if (animationStartHandler.called) {
            expect(e.holding).to.be.false;
            expect(inst.animationManager.getEventInfo().input).to.be.equal(
              e.input
            );
          } else {
            expect(e.holding).to.be.true;
          }
          expect(e.input).to.be.equal(input);
          expect(e.inputEvent).to.be.not.equal(null);
          expect(e.isTrusted).to.be.true;
        });

        // When
        Simulator.gestures.pan(
          el,
          {
            pos: [0, 0],
            deltaX: 100,
            deltaY: 100,
            duration: 500,
            easing: "linear",
          },
          () => {
            // Then
            // for test animation event
            setTimeout(() => {
              expect(holdHandler.calledOnce).to.be.true;
              const releaseEvent = releaseHandler.getCall(0).args[0];
              expect(releaseHandler.calledOnce).to.be.true;
              expect(animationStartHandler.calledOnce).to.be.true;
              expect(animationEndHandler.calledOnce).to.be.true;
              expect(finishHandler.calledOnce).to.be.true;
              expect(releaseEvent.duration).to.not.equal(0);
              expect(releaseEvent.depaPos).to.not.equal(releaseEvent.destPos);
              done();
            }, 2000);
          }
        );
      });
      it("should check movement test when stop method was called in 'animationStart' event", (done) => {
        // Given
        holdHandler = sinon.spy();
        changeHandler = sinon.spy((e) => {
          if (animationStartHandler.called) {
            expect(e.holding).to.be.false;
          } else {
            expect(e.holding).to.be.true;
          }
        });
        releaseHandler = sinon.spy();
        finishHandler = sinon.spy();
        animationStartHandler = sinon.spy((e) => {
          e.stop();
          setTimeout(() => {
            e.done();
          }, e.duration);
        });
        animationEndHandler = sinon.spy(notPreventedFn);
        inst.on({
          hold: holdHandler,
          change: changeHandler,
          release: releaseHandler,
          finish: finishHandler,
          animationStart: animationStartHandler,
          animationEnd: animationEndHandler,
        });

        // When
        Simulator.gestures.pan(
          el,
          {
            pos: [30, 30],
            deltaX: 100,
            deltaY: 100,
            duration: 500,
            easing: "linear",
          },
          () => {
            // Then
            // for test custom event
            setTimeout(() => {
              expect(holdHandler.calledOnce).to.be.true;
              expect(releaseHandler.calledOnce).to.be.true;
              expect(animationStartHandler.calledOnce).to.be.true;
              expect(animationEndHandler.calledOnce).to.be.true;
              expect(finishHandler.calledOnce).to.be.true;
              done();
            }, 1000);
          }
        );
      });

      it("should fire animationEnd event with isTrusted-true flag if grab while animating.", (done) => {
        // Given
        // When
        let destPos;

        Simulator.gestures.pan(el, {
          pos: [0, 0],
          deltaX: 300,
          deltaY: 50,
          duration: 100,
          easing: "linear",
        });

        // grab while animating
        inst.on("animationStart", (e) => {
          destPos = e.destPos;
          Simulator.gestures.tap(el);
        });

        // Then
        inst.on("animationEnd", (e) => {
          setTimeout(() => {
            const endPos = inst.get();

            expect(e.isTrusted).to.be.true;
            expect(endPos.x !== destPos.x || endPos.y !== destPos.y).to.be.true;
            done();
          });
        });
      });
    });
  });

  describe("round final value of animation automatically by value range and dest pos", () => {
    [
      { range: [0.12345, 100], destPos: 50.1234 }, // max decimal place at range[0]
      { range: [0, 100.123456789], destPos: 50.1234 }, // max decimal place at range[1]
      { range: [0, 100], destPos: 50.1234 }, // max decimal place at dest pos,
      { range: [0, 100], destPos: 50 }, // no decimal
      { range: [0, 1000], destPos: 445.17079889807155 }, // number to resolve flicking test failure.
      { range: [0, 1000], destPos: 240.79930795847713 }, // comparison value that works correctly.
    ].forEach((val) => {
      it(`should round final value of animation by max decimal place(${val.range[0]}, ${val.range[1]}, ${val.destPos})`, async () => {
        inst = new Axes({
          x: {
            range: val.range,
          },
        });

        inst.setTo({ x: val.destPos }, 100);
        await new Promise((res) => inst.on("finish", res));

        expect(inst.get().x).to.be.equal(val.destPos);
      });
    });
  });

  describe("round option", () => {
    [100, 10, 1, 0.1, 0.01, 0.001, 0.0001, 0.00001].forEach((round) => {
      it(`should round value by option value of 1 unit (${round})`, async () => {
        // Given, When
        const dividables = await checkAnimatedValueIsRound(round);

        // Then
        const allDividable = dividables.every((val) => val);
        expect(allDividable).to.be.equal(true);
      });
    });

    [10, 5, 0.05, 0.002, 0.0005].forEach((round) => {
      it(`should round value by option value of dividable unit (${round})`, async () => {
        // Given, When
        const dividables = await checkAnimatedValueIsRound(round);

        // Then
        const allDividable = dividables.every((val) => val);
        expect(allDividable).to.be.equal(true);
      });
    });

    [3, 7, 11, 0.03, 0.007].forEach((round) => {
      it(`should round value by option value of undividable unit (${round})`, async () => {
        // Given, When
        const dividables = await checkAnimatedValueIsRound(round);

        // Then
        const allDividable = dividables.every((val) => val);
        expect(allDividable).to.be.equal(true);
      });
    });

    /**
     * I found delta is zero although delta is not zero
     * when 'round' is specified
     */
    it("should fire change event with changed value / delta although round is specified", (done) => {
      // Given
      const result = [];
      const delta = [];
      inst = new Axes(
        {
          x: {
            range: [0, 200],
          },
        },
        { round: 1 }
      );

      inst.on("change", (e) => {
        result.push(e.pos.x);
        delta.push(e.delta.x);
      });
      // When
      const expectPos = [30, 60, 90];

      expectPos.forEach((v) => inst.setBy({ x: 30 }));

      // Then
      setTimeout(() => {
        expect(result.length).to.be.equal(expectPos.length);
        delta.forEach((v) => expect(v).to.be.equal(30));
        result.forEach((v, i) => expect(v).to.be.equal(expectPos[i]));
        done();
      }, 100);
    });

    const isDividable = (dividend, divisor) => {
      // Round 'dividend / divsior' because it may has decimal error.
      const result = roundNumber(dividend / divisor, 0.000001);
      // Decimal place should be 0
      return getDecimalPlace(result) === 0;
    };

    const checkAnimatedValueIsRound = async (round) => {
      // Given
      const dividables = [];
      inst = new Axes(
        {
          x: {
            range: [0, 200],
          },
        },
        { round }
      ).on({
        animationStart: (e) => {
          dividables.push(isDividable(e.destPos.x, round));
        },
        change: (e) => {
          dividables.push(isDividable(e.pos.x, round));
        },
        finish: () => {
          dividables.push(isDividable(inst.get().x, round));
        },
      });

      // When
      inst.setTo({ x: 100 }, 100);

      await new Promise((res) => setTimeout(res, 150));
      inst.destroy();

      return dividables;
    };
  });
});

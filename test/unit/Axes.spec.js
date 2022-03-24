import Axes from "../../src/Axes.ts";
import { PanInput } from "../../src/inputType/PanInput.ts";
import { PinchInput } from "../../src/inputType/PinchInput.ts";
import { getDecimalPlace, roundNumber } from "../../src/utils";
import PanInputInjector from "inject-loader!../../src/inputType/PanInput.ts";

describe("Axes", function () {
  describe("Axes Test", function () {
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
        minimumDuration: 0,
        maximumDuration: Infinity,
        deceleration: 0.0006,
      };

      expect(this.inst).to.be.exist;
      expect(defaultOptions.easing(0.5)).to.be.equal(
        this.inst.options.easing(0.5)
      );
      expect(defaultOptions.easing(0.3)).to.be.equal(
        this.inst.options.easing(0.3)
      );
      expect(defaultOptions.easing(0.1)).to.be.equal(
        this.inst.options.easing(0.1)
      );
      expect(defaultOptions.easing(0.7)).to.be.equal(
        this.inst.options.easing(0.7)
      );
      expect(defaultOptions.easing(0.9)).to.be.equal(
        this.inst.options.easing(0.9)
      );
      expect(defaultOptions.interruptable).to.be.equal(
        this.inst.options.interruptable
      );
      expect(defaultOptions.minimumDuration).to.be.equal(
        this.inst.options.minimumDuration
      );
      expect(defaultOptions.maximumDuration).to.be.equal(
        this.inst.options.maximumDuration
      );
      expect(defaultOptions.deceleration).to.be.equal(
        this.inst.options.deceleration
      );
    });

    it("should check initialization status", () => {
      // Given
      // When
      this.inst = new Axes(
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
      expect(this.inst.axis.x.bounce).to.deep.equal([30, 50]);
      expect(this.inst.axis.x.circular).to.deep.equal([true, true]);
      expect(this.inst.axis.otherX.bounce).to.deep.equal([40, 40]);
      expect(this.inst.axis.otherX.circular).to.deep.equal([false, true]);
      expect(this.inst.get().x).to.equal(50);
      expect(this.inst.get().otherX).to.equal(0);
    });
    it("should check `setTo/setBy` method", () => {
      // Given
      this.inst = new Axes(
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
      let ret = this.inst.setTo({ x: 20 });

      // Then
      expect(this.inst.get()).to.be.eql({ x: 20, otherX: -100 });
      expect(ret).to.be.equal(this.inst);

      // When
      this.inst.setBy({ x: 10 });

      // Then
      expect(this.inst.get()).to.be.eql({ x: 30, otherX: -100 });
    });

    it("should check `setTo` method (with duration)", () => {
      // Given
      const startHandler = sinon.spy();
      const changeHandler = sinon.spy();
      const endHandler = sinon.spy(function () {
        // Then
        expect(startHandler.callCount).to.be.equal(1);
        expect(changeHandler.called).to.be.true;
        expect(this.inst.get()).to.be.eql({ x: 20, otherX: -100 });
        done();
      });
      this.inst = new Axes(
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
      this.inst.setTo({ x: 20 }, 200);
    });

    it("should check `setBy` method (with duration)", () => {
      // Given
      this.inst = new Axes(
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
      this.inst.setTo({ x: 50 });
      expect(this.inst.get()).to.be.eql({ x: 50, otherX: -100 });

      this.inst.on({
        animationStart: startHandler,
        change: changeHandler,
        animationEnd: endHandler,
      });

      const startHandler = sinon.spy();
      const changeHandler = sinon.spy();
      const endHandler = sinon.spy(function () {
        // Then
        expect(startHandler.callCount).to.be.equal(1);
        expect(changeHandler.called).to.be.true;
        expect(this.inst.get()).to.be.eql({ x: 40, otherX: -100 });
        done();
      });

      // When
      this.inst.setBy({ x: -10 }, 200);
    });
  });

  describe("Axes Test with InputType", function () {
    beforeEach(() => {
      this.inst = new Axes(
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
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      cleanup();
    });

    it("should check `connect` method", () => {
      // Given
      const input = new PanInput("#sandbox");

      // When
      let ret = this.inst.connect("x", input);

      // Then
      expect(input.axes).to.be.eql(["x"]);
      expect(this.inst._inputs.length).to.be.equal(1);
      expect(ret).to.be.equal(this.inst);

      // When
      ret = this.inst.connect(["x"], input);

      // Then
      expect(input.axes).to.be.eql(["x"]);
      expect(this.inst._inputs.length).to.be.equal(1);
      expect(ret).to.be.equal(this.inst);

      // When
      ret = this.inst.connect(["x", "y"], input);

      // Then
      expect(input.axes).to.be.eql(["x", "y"]);
      expect(this.inst._inputs.length).to.be.equal(1);
      expect(ret).to.be.equal(this.inst);

      // When
      ret = this.inst.connect("x y", input);

      // Then
      expect(input.axes).to.be.eql(["x", "y"]);
      expect(this.inst._inputs.length).to.be.equal(1);
      expect(ret).to.be.equal(this.inst);

      input.destroy();
    });

    it("should check `disconnect` method", () => {
      // Given
      const input1 = new PanInput("#sandbox");
      const input2 = new PanInput("#sandbox");
      const input3 = new PanInput("#sandbox");
      this.inst.connect("x", input1);
      this.inst.connect("y", input2);
      this.inst.connect("x y", input3);

      // When
      expect(this.inst._inputs.length).to.be.equal(3);
      let ret = this.inst.disconnect(input1);

      // Then
      expect(this.inst._inputs.indexOf(input1)).to.be.equal(-1);
      expect(this.inst._inputs.length).to.be.equal(2);
      expect(ret).to.be.equal(this.inst);

      // When
      ret = this.inst.disconnect();

      // Then
      expect(this.inst._inputs).to.be.eql([]);
      expect(ret).to.be.equal(this.inst);
      expect(this.inst._inputs.length).to.be.equal(0);

      // When no input, it should not make script error
      ret = this.inst.disconnect(input1);

      // Then
      expect(ret).to.be.equal(this.inst);

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

      this.inst.connect("x", pinchInput);
      this.inst.disconnect(pinchInput);
      this.inst.connect(["x", "otherX"], panInput);

      const prevX = this.inst.get()["x"];
      const prevY = this.inst.get()["otherX"];

      // When
      Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
        Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
          // Then
          const currX = this.inst.get()["x"];
          const currY = this.inst.get()["otherX"];

          expect(currX).to.be.not.equal(prevX);
          expect(currY).to.be.not.equal(prevY);

          pinchInput.destroy();
          panInput.destroy();
          done();
        });
      });
    });
  });
  [20, 30, 40, 50].forEach((iOSEdgeSwipeThreshold) => {
    describe(`Axes iOS Edge Test (iOSEdgeSwipeThreshold: ${iOSEdgeSwipeThreshold})`, function () {
      beforeEach(() => {
        this.inst = new Axes(
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
        this.el = sandbox();
        this.el.innerHTML = `<div id="area"
		style="position:relative; border:5px solid #444; width:300px; height:400px; color:#aaa; margin:0;box-sizing:content-box; z-index:9;"></div>`;

        this.releaseHandler = sinon.spy();
        this.finishHandler = sinon.spy();
        const MockPanInputInjector = PanInputInjector({
          "../const": {
            IOS_EDGE_THRESHOLD: 30,
            IS_IOS_SAFARI: true,
          },
        });
        this.input = new MockPanInputInjector.PanInput(this.el, {
          iOSEdgeSwipeThreshold,
          inputType: ["touch"],
        });
        this.inst
          .on({
            release: this.releaseHandler,
            finish: this.finishHandler,
          })
          .connect(["x", "y"], this.input);

        const touchTrigger = Simulator.events.touch.trigger;

        Simulator.events.touch.originalTrigger = touchTrigger;
        Simulator.events.touch.trigger = function (touches, element, type) {
          if (type === "end") {
            return;
          }
          touchTrigger.call(Simulator.events.touch, touches, element, type);
        };
      });
      afterEach(() => {
        Simulator.events.touch.trigger = Simulator.events.touch.originalTrigger;
        if (this.inst) {
          this.inst.destroy();
          this.inst = null;
        }
        if (this.input) {
          this.input.destroy();
          this.input = null;
        }
        this.releaseHandler.resetHistory();
        this.finishHandler.resetHistory();
        cleanup();
      });
      it("should check release event occurs when swiping on ios safari edge. (left to right)", (done) => {
        // Given, When
        // clientX + => -
        Simulator.gestures.pan(
          this.el,
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
              const releaseEvent = this.releaseHandler.getCall(0).args[0];
              expect(this.releaseHandler.calledOnce).to.be.true;
              // expect(releaseEvent.inputEvent.isFinal).to.be.false;
              expect(releaseEvent.isTrusted).to.be.true;

              const finishEvent = this.finishHandler.getCall(0).args[0];
              expect(this.finishHandler.called).to.be.true;
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
          this.el,
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
              const releaseEvent = this.releaseHandler.getCall(0).args[0];
              expect(this.releaseHandler.calledOnce).to.be.true;
              // expect(releaseEvent.inputEvent.isFinal).to.be.false;
              expect(releaseEvent.isTrusted).to.be.true;

              const finishEvent = this.finishHandler.getCall(0).args[0];
              expect(this.finishHandler.called).to.be.true;
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
          this.el,
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
              expect(this.releaseHandler.callCount).to.be.equals(0);
              done();
            }, 500);
          }
        );
      });
    });
  });
  [["pointer"], ["touch", "mouse"], ["touch"]].forEach((type) => {
    describe(`Axes Custom Event Test with interruptable(${type})`, function () {
      beforeEach(() => {
        if (type.indexOf("pointer") > -1) {
          Simulator.setType("pointer");
        } else {
          Simulator.setType("touch");
        }
        this.inst = new Axes(
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
        this.el = sandbox();
        this.el.innerHTML = `<div id="area"
        style="position:relative; border:5px solid #444; width:300px; height:400px; color:#aaa; margin:0;box-sizing:content-box; z-index:9;"></div>`;
        const self = this.inst;
        this.preventedFn = function () {
          expect(self.interruptManager._prevented).to.be.true;
        };
        this.notPreventedFn = function () {
          expect(self.interruptManager._prevented).to.be.false;
        };
        this.input = new PanInput(this.el, {
          inputType: type,
        });
        this.inst.connect(["x", "y"], this.input);
      });
      afterEach(() => {
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
      after(() => {
        // Simulator type should be "touch" type after test complete.
        // Otherwise this test will affect other simulation test.
        Simulator.setType("touch");
      });
      const testNormalBehavior = (done) => {
        // Given
        const holdHandler = sinon.spy();
        const changeHandler = sinon.spy();
        const releaseHandler = sinon.spy();
        const finishHandler = sinon.spy();
        const animationStartHandler = sinon.spy();
        const animationEndHandler = sinon.spy();
        this.inst.off().on({
          hold: holdHandler,
          change: changeHandler,
          release: releaseHandler,
          finish: finishHandler,
          animationStart: animationStartHandler,
          animationEnd: animationEndHandler,
        });

        // When
        Simulator.gestures.pan(
          this.el,
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
        const changeHandler = sinon.spy((e) => {
          ++changeCount;

          if (changeCount === 5) {
            // current position
            pos = e.pos;
            // hold => change * 5 (stop) => finish
            e.stop();
          }
        });
        const holdHandler = sinon.spy();
        const releaseHandler = sinon.spy();
        const finishHandler = sinon.spy();
        const animationStartHandler = sinon.spy();
        const animationEndHandler = sinon.spy();
        this.inst.on({
          hold: holdHandler,
          change: changeHandler,
          release: releaseHandler,
          finish: finishHandler,
          animationStart: animationStartHandler,
          animationEnd: animationEndHandler,
        });

        // When
        Simulator.gestures.pan(
          this.el,
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
              expect(pos).to.be.deep.equals(this.inst.get());
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
        const holdHandler = sinon.spy();
        let changeCount = 0;
        let pos = 0;
        const releaseHandler = sinon.spy();
        const finishHandler = sinon.spy();
        const animationStartHandler = sinon.spy();
        const animationEndHandler = sinon.spy();
        const changeHandler = sinon.spy((e) => {
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
        this.inst.on({
          hold: holdHandler,
          change: changeHandler,
          release: releaseHandler,
          finish: finishHandler,
          animationStart: animationStartHandler,
          animationEnd: animationEndHandler,
        });

        const inst = this.inst;
        // When
        Simulator.gestures.pan(
          this.el,
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
        const holdHandler = sinon.spy(this.preventedFn);
        const changeHandler = sinon.spy(this.preventedFn);
        const releaseHandler = sinon.spy(this.preventedFn);
        const finishHandler = sinon.spy(this.notPreventedFn);
        const animationStartHandler = sinon.spy(this.preventedFn);
        const animationEndHandler = sinon.spy(this.notPreventedFn);
        this.inst.on({
          hold: holdHandler,
          change: changeHandler,
          release: releaseHandler,
          finish: finishHandler,
          animationStart: animationStartHandler,
          animationEnd: animationEndHandler,
        });

        // when
        Simulator.gestures.pan(
          this.el,
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
    describe(`Axes Custom Event Test(${type})`, function () {
      beforeEach(() => {
        if (type.indexOf("pointer") > -1) {
          Simulator.setType("pointer");
        } else {
          Simulator.setType("touch");
        }
        this.inst = new Axes(
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
        this.el = sandbox();
        this.el.innerHTML = `<div id="area"
        style="position:relative; border:5px solid #444; width:300px; height:400px; color:#aaa; margin:0;box-sizing:content-box; z-index:9;"></div>`;

        this.holdHandler = sinon.spy();
        this.releaseHandler = sinon.spy();
        this.finishHandler = sinon.spy();
        this.animationStartHandler = sinon.spy();
        this.animationEndHandler = sinon.spy();

        this.input = new PanInput(this.el, {
          inputType: type,
        });
        this.inst
          .on({
            hold: this.holdHandler,
            release: this.releaseHandler,
            finish: this.finishHandler,
            animationStart: this.animationStartHandler,
            animationEnd: this.animationEndHandler,
          })
          .connect(["x", "y"], this.input);
      });
      afterEach(() => {
        if (this.inst) {
          this.inst.destroy();
          this.inst = null;
        }
        if (this.input) {
          this.input.destroy();
          this.input = null;
        }
        this.holdHandler.resetHistory();
        this.releaseHandler.resetHistory();
        this.finishHandler.resetHistory();
        this.animationStartHandler.resetHistory();
        this.animationEndHandler.resetHistory();
        cleanup();
      });
      after(() => {
        // Simulator type should be "touch" type after test complete.
        // Otherwise this test will affect other simulation test.
        Simulator.setType("touch");
      });
      it("should check slow movement test (no-velocity)", (done) => {
        // Given
        const changeHandler = sinon.spy();
        this.inst.on("change", changeHandler);

        // When
        Simulator.gestures.pan(
          this.el,
          {
            pos: [30, 30],
            deltaX: 10,
            deltaY: 10,
            duration: 3000,
            easing: "linear",
          },
          () => {
            // Then
            const holdEvent = this.holdHandler.getCall(0).args[0];
            expect(this.holdHandler.calledOnce).to.be.true;
            expect(holdEvent.pos.x).to.be.equal(0);
            expect(holdEvent.pos.y).to.be.equal(0);
            expect(holdEvent.inputEvent.isFirst).to.be.true;
            expect(holdEvent.isTrusted).to.be.true;
            expect(changeHandler.called).to.be.true;
            for (let i = 0, len = changeHandler.callCount; i < len; i++) {
              const changeEvent = changeHandler.getCall(i).args[0];
              expect(changeEvent.holding).to.be.true;
              expect(changeEvent.input).to.be.equal(this.input);
              expect(changeEvent.isTrusted).to.be.true;
              expect(changeEvent.inputEvent).to.be.not.equal(null);
            }
            const releaseEvent = this.releaseHandler.getCall(0).args[0];
            expect(this.releaseHandler.calledOnce).to.be.true;
            expect(releaseEvent.inputEvent.isFinal).to.be.true;
            expect(releaseEvent.input).to.be.equal(this.input);
            expect(releaseEvent.isTrusted).to.be.true;
            expect(this.inst.get()).to.be.eql({ x: 10, y: 10 });

            const finishEvent = this.finishHandler.getCall(0).args[0];
            expect(this.finishHandler.calledOnce).to.be.true;
            expect(finishEvent.isTrusted).to.be.true;

            expect(this.animationStartHandler.called).to.be.false;
            expect(this.animationEndHandler.called).to.be.false;
            done();
          }
        );
      });
      it("should check slow movement test (no-velocity), release outside", (done) => {
        // Given
        this.inst.on("change", (e) => {
          if (this.animationStartHandler.called) {
            expect(e.holding).to.be.false;
            expect(this.inst.animationManager.getEventInfo().input).to.be.equal(
              e.input
            );
          } else {
            expect(e.holding).to.be.true;
          }
          expect(e.input).to.be.equal(this.input);
          expect(e.inputEvent).to.be.not.equal(null);
          expect(e.isTrusted).to.be.true;
        });
        this.inst.options.maximumDuration = 200;

        // When
        Simulator.gestures.pan(
          this.el,
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
              const holdEvent = this.holdHandler.getCall(0).args[0];
              expect(this.holdHandler.calledOnce).to.be.true;
              expect(holdEvent.pos.x).to.be.equal(0);
              expect(holdEvent.pos.y).to.be.equal(0);
              expect(holdEvent.inputEvent.isFirst).to.be.true;
              expect(holdEvent.input).to.be.equal(this.input);
              expect(holdEvent.isTrusted).to.be.true;
              const releaseEvent = this.releaseHandler.getCall(0).args[0];
              expect(this.releaseHandler.calledOnce).to.be.true;
              expect(releaseEvent.inputEvent.isFinal).to.be.true;
              expect(releaseEvent.input).to.be.equal(this.input);
              expect(releaseEvent.isTrusted).to.be.true;

              const result = this.inst.get();
              expect(result.x).to.be.equal(0);
              expect(result.y).to.be.equal(10);
              expect(releaseEvent.duration).to.be.equal(0);
              expect(releaseEvent.depaPos).to.deep.equal(releaseEvent.destPos);
              const animationStartEvent =
                this.animationStartHandler.getCall(0).args[0];
              expect(this.animationStartHandler.called).to.be.true;
              expect(animationStartEvent.isTrusted).to.be.true;
              const animationEndEvent =
                this.animationEndHandler.getCall(0).args[0];
              expect(animationEndEvent.isTrusted).to.be.true;

              const finishEvent = this.finishHandler.getCall(0).args[0];
              expect(this.finishHandler.called).to.be.true;
              expect(finishEvent.isTrusted).to.be.true;
              done();
            }, 500);
          }
        );
      });

      it("should check fast movement test (velocity)", (done) => {
        // Given
        this.inst.on("change", (e) => {
          if (this.animationStartHandler.called) {
            expect(e.holding).to.be.false;
            expect(this.inst.animationManager.getEventInfo().input).to.be.equal(
              e.input
            );
          } else {
            expect(e.holding).to.be.true;
          }
          expect(e.input).to.be.equal(this.input);
          expect(e.inputEvent).to.be.not.equal(null);
          expect(e.isTrusted).to.be.true;
        });

        // When
        Simulator.gestures.pan(
          this.el,
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
              expect(this.holdHandler.calledOnce).to.be.true;
              const releaseEvent = this.releaseHandler.getCall(0).args[0];
              expect(this.releaseHandler.calledOnce).to.be.true;
              expect(this.animationStartHandler.calledOnce).to.be.true;
              expect(this.animationEndHandler.calledOnce).to.be.true;
              expect(this.finishHandler.calledOnce).to.be.true;
              expect(releaseEvent.duration).to.not.equal(0);
              expect(releaseEvent.depaPos).to.not.equal(releaseEvent.destPos);
              done();
            }, 2000);
          }
        );
      });
      it("should check movement test when stop method was called in 'animationStart' event", (done) => {
        // Given
        const holdHandler = sinon.spy();
        const changeHandler = sinon.spy(function (e) {
          if (animationStartHandler.called) {
            expect(e.holding).to.be.false;
          } else {
            expect(e.holding).to.be.true;
          }
        });
        const releaseHandler = sinon.spy();
        const finishHandler = sinon.spy();
        const animationStartHandler = sinon.spy((e) => {
          e.stop();
          setTimeout(function () {
            e.done();
          }, e.duration);
        });
        const animationEndHandler = sinon.spy(this.notPreventedFn);
        this.inst.on({
          hold: holdHandler,
          change: changeHandler,
          release: releaseHandler,
          finish: finishHandler,
          animationStart: animationStartHandler,
          animationEnd: animationEndHandler,
        });

        // When
        Simulator.gestures.pan(
          this.el,
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

        Simulator.gestures.pan(this.el, {
          pos: [0, 0],
          deltaX: 300,
          deltaY: 50,
          duration: 100,
          easing: "linear",
        });

        // grab while animating
        this.inst.on("animationStart", (e) => {
          destPos = e.destPos;
          Simulator.gestures.tap(this.el);
        });

        // Then
        this.inst.on("animationEnd", (e) => {
          setTimeout(() => {
            let endPos = this.inst.get();

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
        this.inst = new Axes({
          x: {
            range: val.range,
          },
        });

        this.inst.setTo({ x: val.destPos }, 100);
        await new Promise((res) => this.inst.on("finish", res));

        expect(this.inst.get().x).to.be.equal(val.destPos);
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
      let result = [];
      let delta = [];
      const inst = new Axes(
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

    function isDividable(dividend, divisor) {
      // Round 'dividend / divsior' because it may has decimal error.
      const result = roundNumber(dividend / divisor, 0.000001);
      // Decimal place should be 0
      return getDecimalPlace(result) === 0;
    }

    async function checkAnimatedValueIsRound(round) {
      // Given
      let dividables = [];
      const inst = new Axes(
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
    }
  });
});

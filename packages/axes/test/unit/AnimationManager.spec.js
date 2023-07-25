import { AxisManager } from "../../src/AxisManager";
import { InterruptManager } from "../../src/InterruptManager";
import { EventManager } from "../../src/EventManager";
import { EasingManager } from "../../src/animation/EasingManager";
import Axes from "../../src";

describe("AnimationManager", () => {
  let inst;
  let axes;
  let axis;
  let options;

  describe("Methods", () => {
    beforeEach(() => {
      axis = {
        x: {
          range: [0, 100],
          bounce: [50, 50],
          circular: false,
        },
        y: {
          range: [0, 200],
          bounce: [0, 0],
          circular: false,
        },
        z: {
          range: [-100, 200],
          bounce: [50, 0],
          circular: true,
        },
      };
      options = {
        deceleration: 0.0001,
        maximumDuration: 2000,
        minimumDuration: 0,
      };
      inst = new EasingManager({
        options: options,
        interruptManager: new InterruptManager(options),
        eventManager: new EventManager(null),
        axisManager: new AxisManager(axis, options),
      });
    });
    afterEach(() => {});

    it("should check 'getDuration' method", () => {
      // Given
      // When
      const depaPos = {
        x: 0,
        y: 0,
      };
      const destPos = {
        x: 100,
        y: 50,
      };

      // When/Then
      expect(inst.getDuration(depaPos, destPos)).to.be.equal(1414.213562373095);

      // When (change option)
      options.maximumDuration = 1200;

      // Then
      expect(inst.getDuration(depaPos, destPos)).to.be.equal(1200);

      // When/Then
      expect(inst.getDuration(depaPos, destPos, 1000)).to.be.equal(1000);

      // When/Then
      expect(inst.getDuration(depaPos, destPos, 2000)).to.be.equal(1200);
    });

    it("should check 'getDisplacement' method", () => {
      // 0.001
      options.deceleration = 0.001;
      expect(inst.getDisplacement([1.5, 1])).to.be.eql([
        1352.0817282989958, 901.3878188659972,
      ]);
      expect(inst.getDisplacement([1, 1.5])).to.be.eql([
        901.3878188659972, 1352.0817282989958,
      ]);

      // 0.01
      options.deceleration = 0.01;
      expect(inst.getDisplacement([1.5, 1])).to.be.eql([
        135.20817282989958, 90.13878188659973,
      ]);
      expect(inst.getDisplacement([1, 1.5])).to.be.eql([
        90.13878188659973, 135.20817282989958,
      ]);
    });

    it("should check 'createAnimationParam' method", () => {
      // Given
      // When
      const pos = {
        x: 200,
        y: 210,
        z: -155,
      };

      // When
      // createAnimationParam does not change the 'pos' param since 2017.10.27
      let param = inst._createAnimationParam(pos, 1000);

      // Then
      expect(param.depaPos).to.be.eql({ x: 0, y: 0, z: -100 });
      expect(param.destPos).to.be.eql({ x: 200, y: 210, z: -155 }); // do not change destPos.
      expect(param.duration).to.be.eql(1000);
      expect(param.delta).to.be.eql({ x: 200, y: 210, z: -55 });
      expect(param.inputEvent).to.be.eql(null);
      expect(param.input).to.be.eql(null);

      // When
      options.maximumDuration = 500;
      const eventValue = { event: "i'm inputEvent" };
      param = inst._createAnimationParam(pos, 1000, {
        event: eventValue,
      });

      // Then
      expect(param.depaPos).to.be.eql({ x: 0, y: 0, z: -100 });
      expect(param.destPos).to.be.eql({ x: 200, y: 210, z: -155 });
      expect(param.duration).to.be.eql(500);
      expect(param.delta).to.be.eql({ x: 200, y: 210, z: -55 });
      expect(param.inputEvent).to.be.equal(eventValue);
    });
  });

  describe("Options", () => {
    beforeEach(() => {
      axis = {
        x: {
          range: [0, 1000],
          bounce: [0, 0],
        },
      };
      options = {
        easing: (x) => { return x },
        minimumDuration: 500,
        maximumDuration: 1000,
      };
      axes = new Axes(axis, options);
      const axisManager = new AxisManager(axis, options);
      const eventManager = new EventManager(axes);
      inst = new EasingManager({
        options: options,
        interruptManager: new InterruptManager(options),
        eventManager,
        axisManager,
      });
      eventManager.setAnimationManager(inst);
    });
    afterEach(() => {
      axes.off();
    });

    describe("minimumDuration", () => {
      it("should play animation longer than the time set in minimumDuration.", (done) => {
        // Given
        const startHandler = sinon.spy();
        const endHandler = sinon.spy();
        axes.on({
          animationStart: startHandler,
          animationEnd: endHandler,
        });

        // When
        inst.setTo({ x: 300 }, 100);

        // Then
        setTimeout(() => {
          expect(startHandler.calledOnce).to.be.true;
          expect(endHandler.called).to.be.false;
        }, 300);
        setTimeout(() => {
          expect(endHandler.calledOnce).to.be.true;
          const result = inst.axisManager.get();
          expect(result.x).to.be.equal(300);
          done();
        }, 600);
      });

      it("should apply changes in minimumDuration option after connected", (done) => {
        // Given
        const startHandler = sinon.spy();
        const endHandler = sinon.spy();
        axes.on({
          animationStart: startHandler,
          animationEnd: endHandler,
        });

        // When
        inst.setOptions({ minimumDuration: 0 });
        inst.setTo({ x: 300 }, 200);

        // Then
        setTimeout(() => {
          expect(startHandler.calledOnce).to.be.true;
          expect(endHandler.called).to.be.false;
        }, 100);
        setTimeout(() => {
          expect(endHandler.calledOnce).to.be.true;
          const result = inst.axisManager.get();
          expect(result.x).to.be.equal(300);
          done();
        }, 300);
      });
    });

    describe("maximumDuration", () => {
      it("should play animation shorter than the time set in maximumDuration.", (done) => {
        // Given
        const startHandler = sinon.spy();
        const endHandler = sinon.spy();
        axes.on({
          animationStart: startHandler,
          animationEnd: endHandler,
        });

        // When
        inst.setTo({ x: 300 }, 1500);

        // Then
        setTimeout(() => {
          expect(endHandler.calledOnce).to.be.true;
          const result = inst.axisManager.get();
          expect(result.x).to.be.equal(300);
          done();
        }, 1100);
      });

      it("should apply changes in maximumDuration option after connected", (done) => {
        // Given
        const startHandler = sinon.spy();
        const endHandler = sinon.spy();
        axes.on({
          animationStart: startHandler,
          animationEnd: endHandler,
        });

        // When
        inst.setOptions({ maximumDuration: 1500 });
        inst.setTo({ x: 300 }, 1300);

        // Then
        setTimeout(() => {
          expect(startHandler.calledOnce).to.be.true;
          expect(endHandler.called).to.be.false;
        }, 1300);
        setTimeout(() => {
          expect(endHandler.calledOnce).to.be.true;
          const result = inst.axisManager.get();
          expect(result.x).to.be.equal(300);
          done();
        }, 1600);
      });
    });
  });

  describe("animation test", () => {
    beforeEach(() => {
      axis = {
        x: {
          range: [0, 100],
          bounce: [50, 50],
          circular: false /* [false, false] */,
        },
        y: {
          range: [0, 200],
          bounce: [0, 0],
          circular: false /* [false, false] */,
        },
        z: {
          range: [-100, 200],
          bounce: [50, 0],
          circular: true /* [true, true] */,
        },
      };
      options = {
        easing: (x) => {
          return 1 - Math.pow(1 - x, 3);
        },
        interruptable: true,
        deceleration: 0.0001,
        minimumDuration: 0,
        maximumDuration: 2000,
      };
      axes = new Axes(axis, options);
      const axisManager = new AxisManager(axis, options);
      const eventManager = new EventManager(axes);
      inst = new EasingManager({
        options: options,
        interruptManager: new InterruptManager(options),
        eventManager,
        axisManager,
      });
      eventManager.setAnimationManager(inst);
    });
    afterEach(() => {
      axes.off();
    });

    it("should check 'setTo' method(duration: 0)", () => {
      // Given
      const changeHandler = sinon.spy();
      const finishHandler = sinon.spy();
      axes.on({
        change: changeHandler,
        finish: finishHandler,
      });

      // When
      inst.setTo(
        {
          x: 100,
          y: 200,
        },
        0
      );

      // Then
      expect(changeHandler.calledOnce).to.be.true;
      expect(finishHandler.calledOnce).to.be.true;
      expect(inst.axisManager.get()).to.be.eql({
        x: 100,
        y: 200,
        z: -100,
      });
    });

    it("should check 'setTo' method (outside)", () => {
      // Given
      const depaPos = inst.axisManager.get();
      const destPos = {
        x: 200,
        z: -155,
      };
      const self = inst;
      const startHandler = sinon.spy();
      const changeHandler = sinon.spy();
      const endHandler = sinon.spy();
      axes.on({
        animationStart: startHandler,
        change: changeHandler,
        animationEnd: endHandler,
      });

      // When
      inst.setTo(destPos, 0);

      // Then
      expect(startHandler.called).to.be.false;
      expect(endHandler.called).to.be.false;
      expect(changeHandler.called).to.be.true;
      expect(changeHandler.getCall(0).args[0].isTrusted).to.be.false;
      expect(self.axisManager.get()).to.be.eql({ x: 100, y: 0, z: 145 });
    });

    it("should check 'setTo' method (outside, duration)", (done) => {
      // Given
      const depaPos = inst.axisManager.get();
      const destPos = {
        x: 200,
        z: -155,
      };
      const self = inst;
      const startHandler = sinon.spy();
      const changeHandler = sinon.spy((event) => {
        expect(event.input).to.be.null;
        expect(event.inputEvent).to.be.null;
        expect(self.getEventInfo()).to.be.null;
      });
      axes.on({
        animationStart: startHandler,
        change: changeHandler,
        animationEnd: (event) => {
          expect(self.axisManager.get()).to.be.eql({ x: 100, y: 0, z: 145 });
          expect(startHandler.callCount).to.be.equal(1);
          expect(startHandler.getCall(0).args[0].isTrusted).to.be.false;
          expect(changeHandler.called).to.be.true;
          expect(event.isTrusted).to.be.false;
          done();
        },
      });

      // When
      inst.setTo(destPos, 1000);
    });

    it("should check 'setTo' method (same position #1)", (done) => {
      // Given
      const depaPos = inst.axisManager.get();
      const destPos = {
        x: 0,
        z: -100,
      };
      const self = inst;
      const changeHandler = sinon.spy();
      axes.on({
        change: changeHandler,
      });

      // When
      const ret = inst.setTo(destPos);

      // Then
      setTimeout(() => {
        expect(changeHandler.called).to.be.false;
        expect(ret).to.be.eq(self);
        done();
      }, 100);
    });

    it("should check 'setTo' method (same position #2 - completely same)", (done) => {
      // Given
      const depaPos = inst.axisManager.get();
      const destPos = {
        x: 0,
        z: -100,
      };
      const self = inst;
      const changeHandler = sinon.spy();
      axes.on({
        change: changeHandler,
      });

      // When
      const ret = inst.setTo(destPos);

      // Then
      setTimeout(() => {
        expect(changeHandler.called).to.be.false;
        expect(ret).to.be.eq(self);
        done();
      }, 100);
    });

    it("should check 'setTo' method (circular, no duration)", (done) => {
      // Given
      const depaPos = inst.axisManager.get();
      const destPos = { z: -200 };
      const self = inst;
      const changeHandler = sinon.spy((event) => {
        // Then
        expect(self.axisManager.get()).to.be.eql({ x: 0, y: 0, z: 100 });
        done();
      });
      axes.on({
        change: changeHandler,
      });

      // When
      const ret = inst.setTo(destPos, 0, true);
    });

    it("should check 'setTo' method (same position after range limit, useCircular)", (done) => {
      // Given
      // depaPos: {x: 0, y: 0, z: -100}
      const destPos = { x: -100, z: 500 };
      const self = inst;
      const changeHandler = sinon.spy();
      axes.on({
        change: changeHandler,
      });

      // When
      const ret = inst.setTo(destPos, 0); // last (useCircular) param makes invalidating z-pos change(500)

      // Then
      setTimeout(() => {
        expect(self.axisManager.get()).to.be.eql({ x: 0, y: 0, z: -100 });
        expect(changeHandler.callCount).to.be.equals(1);
        expect(changeHandler.args[0][0].delta).to.be.eql({
          x: 0,
          y: 0,
          z: 600,
        });
        expect(ret).to.be.eq(self);
        done();
      }, 100);
    });

    it("should check 'setTo' method (diff position after range limit)", (done) => {
      // Given
      const depaPos = inst.axisManager.get();
      const destPos = { x: -100, z: 450 };
      const self = inst;
      const changeHandler = sinon.spy((event) => {
        // Then
        expect(self.axisManager.get()).to.be.eql({ x: 0, y: 0, z: 150 });
        done();
      });
      axes.on({
        change: changeHandler,
      });

      // When
      const ret = inst.setTo(destPos);
    });

    it("should check 'setBy' method (inside, duration)", (done) => {
      // Given
      const depaPos = inst.axisManager.get();
      const byPos = {
        x: 20,
        z: 40,
      };
      const self = inst;
      const startHandler = sinon.spy();
      const changeHandler = sinon.spy((event) => {
        expect(event.input).to.be.null;
        expect(event.inputEvent).to.be.null;
        expect(self.getEventInfo()).to.be.null;
      });
      axes.on({
        animationStart: startHandler,
        change: changeHandler,
        animationEnd: (event) => {
          expect(self.axisManager.get()).to.be.eql({
            x: depaPos.x + byPos.x,
            y: 0,
            z: depaPos.z + byPos.z,
          });
          expect(startHandler.callCount).to.be.equal(1);
          expect(startHandler.getCall(0).args[0].isTrusted).to.be.false;
          expect(changeHandler.called).to.be.true;
          expect(event.isTrusted).to.be.false;
          done();
        },
      });

      // When
      inst.setBy(byPos, 1000);
    });

    it("should check 'setBy' method (outside, duration)", (done) => {
      // Given
      const depaPos = inst.axisManager.get();
      const minZ = axis.z.range[0];
      const rangeLength = axis.z.range[1] - axis.z.range[0];
      const byPos = {
        x: 200,
        z: 500,
      };
      const self = inst;
      const startHandler = sinon.spy();
      const changeHandler = sinon.spy((event) => {
        expect(event.input).to.be.null;
        expect(event.inputEvent).to.be.null;
        expect(self.getEventInfo()).to.be.null;
      });
      axes.on({
        animationStart: startHandler,
        change: changeHandler,
        animationEnd: (event) => {
          expect(self.axisManager.get()).to.be.eql({ x: 100, y: 0, z: 100 });
          expect(startHandler.callCount).to.be.equal(1);
          expect(startHandler.getCall(0).args[0].isTrusted).to.be.false;
          expect(changeHandler.called).to.be.true;
          expect(event.isTrusted).to.be.false;
          done();
        },
      });

      // When
      inst.setBy(byPos, 1000);
    });

    it("should check 'animateTo' method (inside)", (done) => {
      // Given
      const depaPos = inst.axisManager.get();
      const destPos = {
        x: 90,
        z: -80,
      };
      const self = inst;
      const startHandler = sinon.spy();
      const changeHandler = sinon.spy((event) => {
        expect(event.input).to.be.null;
        expect(event.inputEvent).to.be.null;
        expect(self.getEventInfo()).to.be.null;
      });
      axes.on({
        animationStart: startHandler,
        change: changeHandler,
        animationEnd: (event) => {
          expect(self.axisManager.get()).to.be.eql({ x: 90, y: 0, z: -80 });
          expect(startHandler.callCount).to.be.equal(1);
          expect(startHandler.getCall(0).args[0].isTrusted).to.be.false;
          expect(changeHandler.called).to.be.true;
          expect(event.isTrusted).to.be.false;
          done();
        },
      });

      // When
      inst.setTo(destPos, 500);
    });

    it("should check 'animateTo' method (outside)", (done) => {
      // Given
      const depaPos = inst.axisManager.get();
      const destPos = {
        x: 200,
        z: -155,
      };
      const self = inst;
      const startHandler = sinon.spy();
      const endHandler = sinon.spy((event) => {
        if (endHandler.callCount === 1) {
          // first destPos
          expect(self.axisManager.get()).to.be.eql({ x: 200, y: 0, z: 145 });
          expect(startHandler.callCount).to.be.equal(1);
          expect(startHandler.getCall(0).args[0].isTrusted).to.be.false;
          expect(event.isTrusted).to.be.false;
        } else if (endHandler.callCount === 2) {
          // Then
          expect(self.axisManager.get()).to.be.eql({ x: 100, y: 0, z: 145 });
          expect(startHandler.getCall(1).args[0].isTrusted).to.be.false;
          expect(startHandler.callCount).to.be.equal(2);
          expect(event.isTrusted).to.be.false;
          done();
        }
      });
      axes.on({
        animationStart: startHandler,
        animationEnd: endHandler,
      });

      // When
      inst.animateTo(destPos, 1000);
    });

    it("should check 'animateTo' with destPos that can cause floating point", (done) => {
      // circular: true,
      // duration: 102
      // depaPos: 729.5859375
      // destPos: 1055.984375
      // range: [-96, 1055.984375]

      // Given
      inst.axisManager._axis.z.range = [-96, 1055.984375];
      inst.setTo({ z: 729.5858375 }, 0);

      // When
      inst.animateTo({ z: 1055.984375 }, 102);

      setTimeout(() => {
        // Then
        expect(inst.axisManager.get().z).to.be.equals(1055.984375);
        done();
      }, 200);
    });

    it("should check position when animation is running. then, start other animation", (done) => {
      // Given
      const startHandler = sinon.spy();
      const changeHandler = sinon.spy();
      const endHandler = sinon.spy();
      axes.on({
        change: changeHandler,
        animationStart: startHandler,
        animationEnd: endHandler,
      });

      // When
      inst.setTo({ x: 80, y: 150 }, 200);

      // Then
      setTimeout(() => {
        expect(startHandler.calledOnce).to.be.true;
        expect(changeHandler.called).to.be.true;
        expect(endHandler.called).to.be.false;

        // When
        inst.setTo({ x: 0, y: 0 }, 300);
        expect(inst.axisManager.get()).to.not.eql({
          x: 80,
          y: 150,
          z: -100,
        });
      }, 100);
      setTimeout(() => {
        expect(startHandler.calledTwice).to.be.true;
        expect(changeHandler.called).to.be.true;
        expect(endHandler.calledTwice).to.be.true;
        const result = inst.axisManager.get();

        expect(result.x).to.be.equal(0);
        expect(result.y).to.be.equal(0);
        expect(result.z).to.be.equal(-100);
        done();
      }, 500);
    });

    [1, -1].forEach((direction) => {
      it(`should check destPos when range changes dynamically during animateLoop(direction: ${direction}, circular: true)`, (done) => {
        // Given
        const depaPos = { z: -100 };
        const destPos = direction > 0 ? { z: 600 } : { z: -600 };
        const resultPos = direction > 0 ? { z: 300 } : { z: 0 };

        // When
        setTimeout(() => {
          // the right time for a range to be crossed
          // 'pos' is off the range.
          // z.range[1] 200 => 600
          axis.z.range[1] = 600;
        }, 300);

        inst._animateLoop(
          {
            duration: 1000,
            depaPos,
            destPos,
            delta: { z: destPos.z - depaPos.z },
          },
          () => {
            // Then
            expect(inst.axisManager.get(["z"]).z).to.be.equals(resultPos.z);
            done();
          }
        );
      });

      it(`should check destPos when range changes dynamically during animateLoop and change(direction: ${direction}, circular: true)`, (done) => {
        // Given
        const depaPos = { z: -100 };
        const destPos = direction > 0 ? { z: 600 } : { z: -600 };
        const resultPos = direction > 0 ? { z: 300 } : { z: 0 };

        // When
        let willChange = false;
        setTimeout(() => {
          // Starts with the exception of -100, which is the start position.
          axes.on("change", (e) => {
            if (
              // range[0] = -100
              (direction === -1 && e.pos.z < -80) ||
              // range[1] = 200
              (direction === 1 && e.pos.z > 180)
            ) {
              willChange = true;
            } else if (willChange) {
              axis.z.range[1] = 600;
            }
          });
        }, 100);

        inst._animateLoop(
          {
            duration: 1000,
            depaPos,
            destPos,
            delta: { z: destPos.z - depaPos.z },
          },
          () => {
            // Then
            expect(inst.axisManager.get(["z"]).z).to.be.equals(resultPos.z);
            done();
          }
        );
      });
    });

    it("should check 'updateAnimation' method (update destPos)", (done) => {
      // Given
      const startHandler = sinon.spy();
      const endHandler = sinon.spy();
      axes.on({
        animationStart: startHandler,
        animationEnd: endHandler,
      });

      // When
      inst.setTo({ x: 60, y: 70 }, 200);

      // Then
      setTimeout(() => {
        expect(startHandler.calledOnce).to.be.true;
        expect(endHandler.called).to.be.false;

        // When
        inst.updateAnimation({ destPos: { x: 100, y: 100 } });
      }, 100);
      setTimeout(() => {
        expect(startHandler.calledOnce).to.be.true;
        expect(endHandler.calledOnce).to.be.true;
        const result = inst.axisManager.get();

        expect(result.x).to.be.equal(100);
        expect(result.y).to.be.equal(100);
        done();
      }, 500);
    });

    it("should check 'updateAnimation' method (update duration)", (done) => {
      // Given
      const startHandler = sinon.spy();
      const endHandler = sinon.spy();
      axes.on({
        animationStart: startHandler,
        animationEnd: endHandler,
      });

      // When
      inst.setTo({ x: 60, y: 70 }, 200);

      // Then
      setTimeout(() => {
        expect(startHandler.calledOnce).to.be.true;
        expect(endHandler.called).to.be.false;

        // When
        inst.updateAnimation({ duration: 600 });
      }, 100);
      setTimeout(() => {
        expect(endHandler.called).to.be.false;
      }, 400);
      setTimeout(() => {
        expect(endHandler.calledOnce).to.be.true;
        const result = inst.axisManager.get();

        expect(result.x).to.be.equal(60);
        expect(result.y).to.be.equal(70);
        done();
      }, 700);
    });

    it("should check 'updateAnimation' method (multiple time, update both)", (done) => {
      // Given
      const startHandler = sinon.spy();
      const endHandler = sinon.spy();
      axes.on({
        animationStart: startHandler,
        animationEnd: endHandler,
      });

      // When
      inst.setTo({ x: 100, y: 100 }, 200);

      // Then
      setTimeout(() => {
        expect(startHandler.calledOnce).to.be.true;
        expect(endHandler.called).to.be.false;

        // When
        inst.updateAnimation({ destPos: { x: 30, y: 30 }, duration: 400 });
      }, 100);
      setTimeout(() => {
        expect(endHandler.called).to.be.false;

        // When
        inst.updateAnimation({
          destPos: { x: 12.3456, y: 1.2345 },
          duration: 300,
        });
      }, 200);
      setTimeout(() => {
        expect(startHandler.calledOnce).to.be.true;
        expect(endHandler.calledOnce).to.be.true;
        const result = inst.axisManager.get();

        expect(result.x).to.be.equal(12.3456);
        expect(result.y).to.be.equal(1.2345);
        done();
      }, 500);
    });

    it("should check 'updateAnimation' method (restart: true)", (done) => {
      // Given
      const startHandler = sinon.spy();
      const endHandler = sinon.spy();
      axes.on({
        animationStart: startHandler,
        animationEnd: endHandler,
      });

      // When
      inst.setTo({ x: 10, y: 10 }, 200);

      // Then
      setTimeout(() => {
        expect(startHandler.calledOnce).to.be.true;
        expect(endHandler.called).to.be.false;

        // When
        inst.updateAnimation({ duration: 600, restart: true });
      }, 100);
      setTimeout(() => {
        expect(endHandler.calledOnce).to.be.true;
        expect(startHandler.calledTwice).to.be.true;
      }, 400);
      setTimeout(() => {
        expect(startHandler.calledOnce).to.be.false;
        expect(endHandler.calledOnce).to.be.false;
        expect(endHandler.calledTwice).to.be.true;
        const result = inst.axisManager.get();

        expect(result.x).to.be.equal(10);
        expect(result.y).to.be.equal(10);
        done();
      }, 700);
    });

    it("should check 'stopAnimation' method", (done) => {
      // Given
      const startHandler = sinon.spy();
      const endHandler = sinon.spy();
      axes.on({
        animationStart: startHandler,
        animationEnd: endHandler,
      });

      // When
      inst.setTo({ x: 100, y: 100 }, 400);

      // Then
      setTimeout(() => {
        expect(startHandler.calledOnce).to.be.true;
        expect(endHandler.called).to.be.false;

        // When
        inst.stopAnimation(["x", "y"]);
      }, 100);
      setTimeout(() => {
        expect(endHandler.calledOnce).to.be.true;
      }, 200);
      setTimeout(() => {
        const result = inst.axisManager.get();

        expect(result.x).to.not.equal(100);
        expect(result.y).to.not.equal(100);
        done();
      }, 500);
    });
  });
});

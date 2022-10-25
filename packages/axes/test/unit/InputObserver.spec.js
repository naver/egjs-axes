import Axes from "../../src/Axes";

describe("InputObserver", () => {
  let inst;
  let options;
  let axes;
  let axis;
  let axisManager;
  let animationManager;

  describe("observer test", () => {
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
          bounce: [0, 0],
          circular: [false, true],
        },
      };
      options = {
        deceleration: 0.0001,
        maximumDuration: 2000,
        minimumDuration: 0,
      };
      axes = new Axes(axis, options);
      axisManager = axes.axisManager;
      animationManager = axes.animationManager;
      inst = axes.inputObserver;
    });
    afterEach(() => {});

    it("should check 'get' method", () => {
      // Given
      const inputType = {
        axes: ["y"],
      };

      // When/Then
      expect(inst.get(inputType)).to.be.eql({ y: 0 });

      // When
      inst._axisManager.moveTo({ x: 10, y: 20, z: 30 });

      // Then
      expect(inst.get(inputType)).to.be.eql({ y: 20 });
    });
    it("should check 'change' method", () => {
      // Given
      const inputType = {
        axes: ["y"],
      };

      // When/Then
      expect(inst.get(inputType)).to.be.eql({ y: 0 });

      // When
      inst.change(inputType, {}, {});
      expect(inst.get(inputType)).to.be.not.eql({ y: 200 });

      inst.hold(inputType, {});
      inst.change(inputType, {}, { y: 250 });

      // Then
      expect(inst.get(inputType)).to.be.eql({ y: 200 });
    });
    [1, -1].forEach((direction) => {
      it(`should check delta that dragged out of bounce area(direction: ${direction})`, (done) => {
        // Given
        // start pos
        const depaPos = direction > 0 ? 200 : 0;

        axes.setTo({ y: depaPos }, 0);
        axes.on("change", ({ delta }) => {
          // Then
          expect(delta.y).to.be.equals(0);
        });
        axes.on("finish", () => {
          done();
        });

        // When
        const inputType = {
          axes: ["y"],
        };
        const sign = direction > 0 ? 1 : -1;
        inst.hold(inputType);
        // The last y position should be zero and neither should Delta.
        // y goes to zero without bounce.
        inst.change(inputType, {}, { y: sign * 10 });
        inst.change(inputType, {}, { y: sign * 20 });
        inst.change(inputType, {}, { y: sign * 30 });
        inst.change(inputType, {}, { y: sign * 40 });
        inst.release(inputType, {}, [0, 0, 0]);
      });

      it(`should check delta that dragged bounce area (direction: ${direction})`, (done) => {
        // Given
        // start pos
        const depaPos = direction > 0 ? 100 : 0;

        axes.setTo({ x: depaPos }, 0);

        let isFirstTime = true;
        axes.on("change", ({ delta }) => {
          // Then
          if (isFirstTime) {
            // bounce area
            isFirstTime = false;
            return;
          }
          // out of bounce area
          expect(delta.x).to.be.equals(0);
        });
        axes.on("finish", () => {
          done();
        });

        // When
        const inputType = {
          axes: ["x"],
        };
        const sign = direction > 0 ? 1 : -1;
        inst.hold(inputType);
        // Move them approximately 150 by slope bounce to reach the end.
        // bounce area
        inst.change(inputType, {}, { x: sign * 150 });
        // out of bounce area
        inst.change(inputType, {}, { x: sign * 10 });
        inst.change(inputType, {}, { x: sign * 10 });
        inst.change(inputType, {}, { x: sign * 10 });

        axes.off("change");
        inst.release(inputType, {}, [0, 0, 0]);
      });
      it(`should check delta that 'circular' option was enabled(direction: ${direction})`, (done) => {
        // Given
        // start pos
        const depaPos = direction > 0 ? 180 : 0;
        const destPos = direction > 0 ? 300 : -180;
        let z = depaPos;

        axes.setTo({ z: depaPos }, 0);
        axes.on("change", ({ pos, delta }) => {
          // Then
          // Find the value as approximated as possible due to floating decimal point problems.

          if (direction > 0 && pos.z < 180) {
            // range[0] + range[1] = 300 loop for right
            // It is not less than 0 inclusive. z >= 0
            expect(delta.z).to.be.not.lt(0);
            expect(delta.z + z).to.be.closeTo(300 + pos.z, 0.0000001);
            z = 300 + pos.z;
          } else if (direction < 0 && pos.z > 0) {
            // range[0] + range[1] = 300 loop for left
            // It is not greater than 0 inclusive. z <= 0
            expect(delta.z).to.be.not.gt(0);
            expect(delta.z + z).to.be.closeTo(-300 + pos.z, 0.0000001);
            z = -300 + pos.z;
          } else {
            expect(delta.z + z).to.be.closeTo(pos.z, 0.0000001);
            z = pos.z;
          }
        });
        axes.on("finish", () => {
          done();
        });

        // When
        // The last y position should be zero and neither should Delta.
        axes.setTo({ z: destPos }, 300);
      });
    });
    it("should check delta that there is no bounce and the position goes to zero.", (done) => {
      // Given
      const inputType = {
        axes: ["y"],
      };
      // start pos
      let y = 50;
      axes.setTo({ y: 50 }, 0);
      axes.on("change", ({ pos, delta }) => {
        // Then
        // Find the value as approximated as possible due to floating decimal point problems.
        expect(delta.y + y).to.be.closeTo(pos.y, 0.0000001);

        y = pos.y;
      });
      axes.on("finish", () => {
        done();
      });

      // When
      // The last y position should be zero and neither should Delta.
      axes.setTo({ y: 0 }, 300);
    });
    it("should check delta that there is circular", (done) => {
      // Given
      // start pos
      let z = 0;
      axes.setTo({ z: 0 }, 0);
      axes.on("change", ({ delta }) => {
        z += delta.z;
        // Delta is high if the speed is too fast.
        expect(Math.abs(delta.z)).to.be.below(60);
      });
      axes.on("finish", () => {
        expect(z).to.be.closeTo(1000, 0.001);
        done();
      });

      // When
      const inputType = {
        axes: ["z"],
      };
      inst.hold(inputType);
      // 40 * 25
      for (let i = 0; i < 25; ++i) {
        inst.change(inputType, {}, { z: 40 });
      }
      inst.release(inputType, {}, [0, 0, 0]);
    });
    it("should check bounce not occur to direction where the circular is false", (done) => {
      // Given
      // start pos
      let z = 0;
      axes.setTo({ z: 0 }, 0);
      axes.on("change", ({ delta }) => {
        z += delta.z;
        expect(z).to.be.not.lt(-100);
      });
      axes.on("finish", () => {
        done();
      });

      // When
      const inputType = {
        axes: ["z"],
      };
      inst.hold(inputType);
      // 40 * 25
      for (let i = 0; i < 25; ++i) {
        inst.change(inputType, {}, { z: -40 });
      }
      inst.release(inputType, {}, [0, 0, 0]);
    });
    it("should check delta that there is no bounce and the position is out", (done) => {
      // Given
      const inputType = {
        axes: ["y"],
      };
      // start pos
      const y = 50;
      axes.setTo({ y: 50 }, 0);
      axes.on("change", ({ pos, delta }) => {
        // Then
        // Find the value as approximated as possible due to floating decimal point problems.
        expect(delta.y + 50).to.be.closeTo(pos.y, 0.0000001);
      });
      axes.on("finish", () => {
        done();
      });

      // When

      inst.hold(inputType);
      // The last y position should be zero and neither should Delta.
      // y goes to zero without bounce.
      inst.change(inputType, {}, { y: -60 });
      inst.release(inputType, {}, [0, 0, 0]);
    });
    it("should check delta that there is bounce and the position is out", (done) => {
      // Given
      const inputType = {
        axes: ["x"],
      };

      // start pos
      let x = 50;
      axes.setTo({ x: 50 }, 0);
      axes.on("change", ({ pos, delta }) => {
        // Then
        // Find the value as approximated as possible due to floating decimal point problems.
        expect(delta.x + x).to.be.closeTo(pos.x, 0.0000001);
        x = pos.x;
      });
      axes.on("finish", () => {
        done();
      });

      // When
      inst.hold(inputType);
      // x bounces by -10 and returns to zero.
      inst.change(inputType, {}, { x: -60 });
      inst.release(inputType, {}, [0, 0, 0]);
    });
  });
});

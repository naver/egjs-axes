import { RotatePanInput } from "../../../src/inputType/RotatePanInput";
import Axes from "../../../src/Axes";

import TestHelper from "./TestHelper";

describe("RotatePanInput", () => {
  let el;
  let input;
  let axes;
  let clock;

  const testPanMove = async (MOVES) => {
    const resultAngles = [];

    for (let i = 0; i < MOVES.length; i++) {
      const currAxes = MOVES[i].axes ? MOVES[i].axes : axes;
      const currEl = MOVES[i].target ? MOVES[i].target : el;

      currAxes.setTo({ angle: 0 });

      await TestHelper.panOnElement(currEl, MOVES[i], { clock });

      resultAngles.push(currAxes.get()["angle"]);
    }

    // Then
    resultAngles.forEach((angle, i) => {
      expect(angle).to.be.closeTo(MOVES[i].expectedAngle, 1);
    });
  };

  beforeEach(() => {
    clock = sinon.useFakeTimers();

    el = sandbox();
    el.style.position = "absolute";
    el.style.left = "0px";
    el.style.width = "201px";
    el.style.height = "201px";
    el.style.backgroundColor = "yellow";

    input = new RotatePanInput(el, {
      inputType: ["touch", "mouse"],
    });

    axes = new Axes({
      angle: {
        range: [-360, 360],
      },
    });

    axes.connect("angle", input);
    axes.setTo({ angle: 0 });
  });

  afterEach(() => {
    clock.restore();

    if (axes) {
      axes.destroy();
      axes = null;
    }
    cleanup();
  });

  it("should change angle by distance", async () => {
    // Given, When
    // width & height is 201px, 1px is pixel for axis
    // First I tested with 200px, therefore mid point(axis) is 99.5px,
    // But 99.5px is assumed as 100px on Chrome test. So each quadrant has different size.
    // It's not intend.
    const MOVE_HORIZONTALLY_HALF_AT_TOP = {
      pos: [100, 0], // Mid index of width 201 is 100 (201 - 1 / 2 )
      deltaX: 100, // Until 200
      deltaY: 0,
      duration: 2000,
      expectedAngle: 45,
    };

    const MOVE_HORIZONTALLY_FULL_AT_TOP = {
      pos: [0, 0],
      deltaX: 200,
      deltaY: 0,
      duration: 3000,
      expectedAngle: 90,
    };

    const MOVE_VERTICALLY_HALF_AT_LEFT = {
      pos: [0, 0],
      deltaX: 0,
      deltaY: 100,
      duration: 2000,
      expectedAngle: -45,
    };

    const MOVE_VERTICALLY_HALF_AT_RIGHT = {
      pos: [200, 0],
      deltaX: 0,
      deltaY: 100,
      duration: 2000,
      expectedAngle: 45,
    };

    const MOVES = [
      MOVE_HORIZONTALLY_HALF_AT_TOP,
      MOVE_HORIZONTALLY_FULL_AT_TOP,
      MOVE_VERTICALLY_HALF_AT_LEFT,
      MOVE_VERTICALLY_HALF_AT_RIGHT,
    ];

    await testPanMove(MOVES);
  });

  it("should return angle correctly when crossing the axis boundaries", async () => {
    const RADIUS = 100;
    const MOVE_HORIZONTALLY_HALF_AT_TOP = {
      pos: [50, 0], // Mid index of width 201 is 100 (201 - 1 / 2 )
      deltaX: 100, // Until 200
      deltaY: 0,
      duration: 2000,
      expectedAngle: (Math.atan2(100 / 2, RADIUS) * 2 * 180) / Math.PI,
    };
    const MOVE_HORIZONTALLY_HALF_AT_BOTTOM = {
      pos: [50, 200], // Mid index of width 201 is 100 (201 - 1 / 2 )
      deltaX: 100, // Until 200
      deltaY: 0,
      duration: 2000,
      expectedAngle: (-Math.atan2(100 / 2, RADIUS) * 2 * 180) / Math.PI,
    };
    const MOVE_VERTICALLY_HALF_AT_LEFT = {
      pos: [0, 50], // Mid index of width 201 is 100 (201 - 1 / 2 )
      deltaX: 0, // Until 200
      deltaY: 100,
      duration: 2000,
      expectedAngle: (-Math.atan2(100 / 2, RADIUS) * 2 * 180) / Math.PI,
    };
    const MOVE_VERTICALLY_HALF_AT_RIGHT = {
      pos: [200, 50], // Mid index of width 201 is 100 (201 - 1 / 2 )
      deltaX: 0, // Until 200
      deltaY: 100,
      duration: 2000,
      expectedAngle: (Math.atan2(100 / 2, RADIUS) * 2 * 180) / Math.PI,
    };

    const MOVES = [
      MOVE_HORIZONTALLY_HALF_AT_TOP,
      MOVE_HORIZONTALLY_HALF_AT_BOTTOM,
      MOVE_VERTICALLY_HALF_AT_LEFT,
      MOVE_VERTICALLY_HALF_AT_RIGHT,
    ];

    // Then
    await testPanMove(MOVES);
  });

  it("should be animated by release speed", async () => {
    // Mouse speed cannot be acquired when fakeTimer is working.
    clock.restore();

    // Given, When
    const MOVE_HORIZONTALLY_SLOW = {
      pos: [50, 0], // Mid index of width 201 is 100 (201 - 1 / 2 )
      deltaX: 100, // Until 200
      deltaY: 0,
      duration: 2000,
    };
    const MOVE_HORIZONTALLY_FAST = {
      pos: [50, 0], // Mid index of width 201 is 100 (201 - 1 / 2 )
      deltaX: 100, // Until 200
      deltaY: 0,
      duration: 200,
    };
    const MOVES = [MOVE_HORIZONTALLY_SLOW, MOVE_HORIZONTALLY_FAST];

    const resultAngles = [];
    for (let i = 0; i < MOVES.length; i++) {
      axes.setTo({ angle: 0 });

      await TestHelper.panOnElement(el, MOVES[i], { clock });

      resultAngles.push(axes.get()["angle"]);
    }

    // Then
    expect(resultAngles[0] < resultAngles[1]).to.be.true;
  });

  it("should return correct angle by area size.", async () => {
    const smElement = sandbox();
    smElement.style.position = "absolute";
    smElement.style.left = "0px";
    smElement.style.top = "300px";
    smElement.style.width = "101px";
    smElement.style.height = "101px";
    smElement.style.backgroundColor = "yellow";

    const smInput = new RotatePanInput(smElement, {
      inputType: ["touch", "mouse"],
    });

    const smAxes = new Axes({
      angle: {
        range: [-360, 360],
      },
    });

    smAxes.connect("angle", smInput);
    smAxes.setTo({ angle: 0 });

    axes.setTo({ angle: 0 });

    // When
    const MOVE_HORIZONTALLY_ON_BIG = {
      axes: axes,
      target: el,
      pos: [100, 0], // Mid index of width 201 is 100 (201 - 1 / 2 )
      deltaX: 100, // Until 200
      deltaY: 0,
      duration: 2000,
      expectedAngle: 45,
    };

    const MOVE_HORIZONTALLY_ON_SMALL = {
      axes: smAxes,
      target: smElement,
      pos: [50, 0], // Mid index of width 101 is 50 (101 - 1 / 2 )
      deltaX: 50, // Until 100
      deltaY: 0,
      duration: 2000,
      expectedAngle: 45,
    };

    const MOVES = [MOVE_HORIZONTALLY_ON_BIG, MOVE_HORIZONTALLY_ON_SMALL];

    // Then
    await testPanMove(MOVES);
  });

  it("should return correct angle by responsive", async () => {
    const resultAngles = [];
    const MOVE_HORIZONTALLY_ON_BIG = {
      axes: axes,
      target: el,
      pos: [100, 0], // Mid index of width 201 is 100 (201 - 1 / 2 )
      deltaX: 100, // Until 200
      deltaY: 0,
      duration: 2000,
      expectedAngle: 45,
    };

    axes.setTo({ angle: 0 });

    await TestHelper.panOnElement(el, MOVE_HORIZONTALLY_ON_BIG, { clock });

    resultAngles.push(axes.get()["angle"]);

    // When
    /**
     * element size is change.
     */
    el.style.width = "101px";
    el.style.height = "101px";

    const MOVE_HORIZONTALLY_ON_SMALL = {
      axes: axes,
      target: el,
      pos: [50, 0], // Mid index of width 101 is 50 (101 - 1 / 2 )
      deltaX: 50, // Until 100
      deltaY: 0,
      duration: 2000,
      expectedAngle: 45,
    };

    axes.setTo({ angle: 0 });

    await TestHelper.panOnElement(el, MOVE_HORIZONTALLY_ON_SMALL, { clock });

    resultAngles.push(axes.get()["angle"]);

    const MOVES = [MOVE_HORIZONTALLY_ON_BIG, MOVE_HORIZONTALLY_ON_SMALL];

    // Then
    resultAngles.forEach((angle, i) => {
      expect(angle).to.be.closeTo(MOVES[i].expectedAngle, 1);
    });
  });
});

import { AxisManager } from "../../src/AxisManager";

describe("AxisManager", () => {
  let inst;

  describe("instance method", () => {
    beforeEach(() => {
      inst = new AxisManager({
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
      });
    });
    afterEach(() => {});

    it("should check 'moveTo' method", () => {
      // Given
      // When (all)
      let orgPos = inst.get();
      let moveTo = { x: 10, y: 20, z: 30 };
      let moved = inst.moveTo(moveTo);

      // Then
      expect(moved.pos).to.be.eql(moveTo);
      expect(moved.pos).to.be.not.equal(moveTo);
      expect(moved.delta).to.be.eql({
        x: 10,
        y: 20,
        z: 130,
      });

      // When (single)
      moveTo = { x: 30 };
      moved = inst.moveTo(moveTo);

      // Then
      orgPos = inst.get();
      expect(moved.pos).to.be.eql(orgPos);
      expect(moved.pos).to.be.not.equal(orgPos);
      expect(moved.delta).to.be.eql({
        x: 20,
        y: 0,
        z: 0,
      });

      // When (not included)
      moveTo = { notX: 30 };
      moved = inst.moveTo(moveTo);

      // Then
      orgPos = inst.get();
      expect(orgPos.notX).to.be.undefined;
      expect(moved.pos).to.be.eql(orgPos);
      expect(moved.pos).to.be.not.equal(orgPos);
      expect(moved.delta).to.be.eql({
        x: 0,
        y: 0,
        z: 0,
      });
    });

    it("should check 'get' method", () => {
      // Given
      // When

      // Then
      expect(inst.get()).to.be.eql({ x: 0, y: 0, z: -100 });

      // When
      inst.moveTo({ x: 20, y: 40 });

      // Then
      expect(inst.get(["x"])).to.be.eql({ x: 20 });
      expect(inst.get(["y"])).to.be.eql({ y: 40 });
      expect(inst.get(["z"])).to.be.eql({ z: -100 });
      expect(inst.get(["notX"])).to.be.eql({});

      // When (check reference)
      const firstGet = inst.get();
      const secondGet = inst.get();

      // Then
      expect(firstGet).to.be.eql(secondGet);
      expect(firstGet).to.be.not.equal(secondGet);
    });

    it("should check 'every' high-order method", () => {
      // Given
      const orgPos = inst.get();
      expect(orgPos).to.be.eql({ x: 0, y: 0, z: -100 });

      // When
      inst.moveTo({ x: 20, y: 0 });

      // Then
      expect(inst.every(inst.get(), (v, opt, k) => v !== orgPos[k])).to.be
        .false;

      // When
      inst.moveTo({ x: 20, y: 30, z: 0 });

      // Then
      expect(inst.every(inst.get(), (v, opt, k) => v !== orgPos[k])).to.be.true;
    });

    it("should check 'filter' high-order method", () => {
      // Given
      const orgPos = inst.get();
      expect(orgPos).to.be.eql({ x: 0, y: 0, z: -100 });

      // When
      inst.moveTo({ x: 20, y: 0 });

      // Then
      expect(inst.filter(inst.get(), (v, opt, k) => v !== orgPos[k])).to.be.eql(
        { x: 20 }
      );

      // When
      inst.moveTo({ x: 20, y: 30, z: 0 });

      // Then
      expect(inst.filter(inst.get(), (v, opt, k) => v !== orgPos[k])).to.be.eql(
        { x: 20, y: 30, z: 0 }
      );
    });

    it("should check 'map' high-order method", () => {
      // Given
      const orgPos = inst.get();
      expect(orgPos).to.be.eql({ x: 0, y: 0, z: -100 });

      // When
      inst.moveTo({ x: 20, y: 0 });

      // Then
      expect(inst.map(inst.get(), (v) => v + 20)).to.be.eql({
        x: 40,
        y: 20,
        z: -80,
      });
    });

    it("should check 'isOutside' method", () => {
      // Given
      // When
      const orgPos = inst.get();
      expect(orgPos).to.be.eql({ x: 0, y: 0, z: -100 });

      // Then
      expect(inst.isOutside()).to.be.false;

      // When
      inst.moveTo({ x: -50 });

      // Then
      expect(inst.isOutside()).to.be.true;
      expect(inst.isOutside(["y", "z"])).to.be.false;

      // When
      inst.moveTo({ x: 50 });

      // Then
      expect(inst.isOutside()).to.be.false;
      expect(inst.isOutside(["y", "z"])).to.be.false;
    });
  });
});

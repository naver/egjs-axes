import * as Coordinate from "../../src/Coordinate";

describe("Coordinate", () => {
  describe("getInsidePosition", () => {
    it("should return inner position", () => {
      // Given
      // When
      const range = [0, 100];
      let circular = [false, false];

      // Then
      expect(Coordinate.getInsidePosition(0, range, circular)).to.be.equal(0);
      expect(Coordinate.getInsidePosition(-1, range, circular)).to.be.equal(0);
      expect(Coordinate.getInsidePosition(50, range, circular)).to.be.equal(50);
      expect(Coordinate.getInsidePosition(101, range, circular)).to.be.equal(
        100
      );

      // When
      circular = [true, true];

      // Then
      expect(Coordinate.getInsidePosition(0, range, circular)).to.be.equal(0);
      expect(Coordinate.getInsidePosition(-1, range, circular)).to.be.equal(0);
      expect(Coordinate.getInsidePosition(40, range, circular)).to.be.equal(40);
      expect(Coordinate.getInsidePosition(140, range, circular)).to.be.equal(
        100
      );
    });

    it("should return inner position with bounce", () => {
      // Given
      // When
      const range = [0, 100];
      let circular = [false, false];
      const bounce = [50, 100];

      // Then
      expect(
        Coordinate.getInsidePosition(0, range, circular, bounce)
      ).to.be.equal(0);
      expect(
        Coordinate.getInsidePosition(-1, range, circular, bounce)
      ).to.be.equal(-1);
      expect(
        Coordinate.getInsidePosition(-50, range, circular, bounce)
      ).to.be.equal(-50);
      expect(
        Coordinate.getInsidePosition(-51, range, circular, bounce)
      ).to.be.equal(-50);
      expect(
        Coordinate.getInsidePosition(50, range, circular, bounce)
      ).to.be.equal(50);
      expect(
        Coordinate.getInsidePosition(101, range, circular, bounce)
      ).to.be.equal(101);
      expect(
        Coordinate.getInsidePosition(200, range, circular, bounce)
      ).to.be.equal(200);
      expect(
        Coordinate.getInsidePosition(201, range, circular, bounce)
      ).to.be.equal(200);

      // When
      circular = [true, true];

      // Then
      expect(
        Coordinate.getInsidePosition(0, range, circular, bounce)
      ).to.be.equal(0);
      expect(
        Coordinate.getInsidePosition(-1, range, circular, bounce)
      ).to.be.equal(0);
      expect(
        Coordinate.getInsidePosition(-50, range, circular, bounce)
      ).to.be.equal(0);
      expect(
        Coordinate.getInsidePosition(-51, range, circular, bounce)
      ).to.be.equal(0);
      expect(
        Coordinate.getInsidePosition(50, range, circular, bounce)
      ).to.be.equal(50);
      expect(
        Coordinate.getInsidePosition(101, range, circular, bounce)
      ).to.be.equal(100);
      expect(
        Coordinate.getInsidePosition(200, range, circular, bounce)
      ).to.be.equal(100);
      expect(
        Coordinate.getInsidePosition(201, range, circular, bounce)
      ).to.be.equal(100);
    });
  });

  describe("isOutside", () => {
    it("should check if pos is outside", () => {
      // Given
      // When
      const range = [0, 100];

      // Then
      expect(Coordinate.isOutside(0, range)).to.false;
      expect(Coordinate.isOutside(50, range)).to.false;
      expect(Coordinate.isOutside(100, range)).to.false;
      expect(Coordinate.isOutside(-1, range)).to.true;
      expect(Coordinate.isOutside(101, range)).to.true;
    });
  });

  describe("isCircularable", () => {
    it("should check if pos is circularable", () => {
      // Given
      // When
      const range = [0, 100];
      let circular = [false, false];

      // Then
      expect(Coordinate.isCircularable(0, range, circular)).to.false;
      expect(Coordinate.isCircularable(50, range, circular)).to.false;
      expect(Coordinate.isCircularable(100, range, circular)).to.false;
      expect(Coordinate.isCircularable(-1, range, circular)).to.false;
      expect(Coordinate.isCircularable(101, range, circular)).to.false;

      // When
      circular = [true, true];

      // Then
      expect(Coordinate.isCircularable(0, range, circular)).to.false;
      expect(Coordinate.isCircularable(50, range, circular)).to.false;
      expect(Coordinate.isCircularable(100, range, circular)).to.false;
      expect(Coordinate.isCircularable(-1, range, circular)).to.true;
      expect(Coordinate.isCircularable(101, range, circular)).to.true;
    });
  });

  describe("getCirculatedPos", () => {
    it("should calculate position circular", () => {
      // Given
      // When
      let circularOption = [true, true];
      let range = [0, 100];

      // Then
      expect(Coordinate.getCirculatedPos(100, range, circularOption)).to.equal(
        100
      );
      expect(Coordinate.getCirculatedPos(0, range, circularOption)).to.equal(0);
      expect(Coordinate.getCirculatedPos(101, range, circularOption)).to.equal(
        1
      );
      expect(Coordinate.getCirculatedPos(-1, range, circularOption)).to.equal(
        99
      );
      expect(Coordinate.getCirculatedPos(110, range, circularOption)).to.equal(
        10
      );
      expect(Coordinate.getCirculatedPos(-110, range, circularOption)).to.equal(
        90
      );

      // include negative value (Sphere)
      range = [-180, 180];

      // Then
      expect(Coordinate.getCirculatedPos(180, range, circularOption)).to.equal(
        180
      );
      expect(Coordinate.getCirculatedPos(-180, range, circularOption)).to.equal(
        -180
      );
      expect(Coordinate.getCirculatedPos(181, range, circularOption)).to.equal(
        -179
      );
      expect(Coordinate.getCirculatedPos(-181, range, circularOption)).to.equal(
        179
      );
      expect(Coordinate.getCirculatedPos(190, range, circularOption)).to.equal(
        -170
      );
      expect(Coordinate.getCirculatedPos(-200, range, circularOption)).to.equal(
        160
      );

      // // circular option false
      circularOption = [false, false];
      range = [0, 100];

      // Then
      expect(Coordinate.getCirculatedPos(100, range, circularOption)).to.equal(
        100
      );
      expect(Coordinate.getCirculatedPos(0, range, circularOption)).to.equal(0);
      expect(Coordinate.getCirculatedPos(101, range, circularOption)).to.equal(
        101
      );
      expect(Coordinate.getCirculatedPos(-1, range, circularOption)).to.equal(
        -1
      );
      expect(Coordinate.getCirculatedPos(110, range, circularOption)).to.equal(
        110
      );
    });
  });
});

import Coordinate from '../../src/coordinate.js';
import { DIRECTION } from '../../src/consts.js';

describe("Coordinate getDirectionByAngle", function() {
    it("should check user's direction", () => {
        //Given
        // When thresholdAngle = 45
        // Then
        expect(Coordinate.getDirectionByAngle(0, 45)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
        expect(Coordinate.getDirectionByAngle(20, 45)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
        expect(Coordinate.getDirectionByAngle(45, 45)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
        expect(Coordinate.getDirectionByAngle(100, 45)).to.be.equal(DIRECTION.DIRECTION_VERTICAL);
        expect(Coordinate.getDirectionByAngle(134, 45)).to.be.equal(DIRECTION.DIRECTION_VERTICAL);
        expect(Coordinate.getDirectionByAngle(135, 45)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
        expect(Coordinate.getDirectionByAngle(136, 45)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
        expect(Coordinate.getDirectionByAngle(180, 45)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);

        // When thresholdAngle = 20
        // Then
        expect(Coordinate.getDirectionByAngle(0, 20)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
        expect(Coordinate.getDirectionByAngle(10, 20)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
        expect(Coordinate.getDirectionByAngle(20, 20)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
        expect(Coordinate.getDirectionByAngle(30, 20)).to.be.equal(DIRECTION.DIRECTION_VERTICAL);
        expect(Coordinate.getDirectionByAngle(50, 20)).to.be.equal(DIRECTION.DIRECTION_VERTICAL);
        expect(Coordinate.getDirectionByAngle(160, 20)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
        expect(Coordinate.getDirectionByAngle(161, 20)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
        expect(Coordinate.getDirectionByAngle(180, 20)).to.be.equal(DIRECTION.DIRECTION_HORIZONTAL);
    });
});

describe("Coordinate getCircularPos", function() {
    it("should calculate position circular", () => {
        // Given
        // When
        let circularOption = [true, true, true, true];
        let min = [0, 0];
        let max = [100, 100];

        // Then
        expect(Coordinate.getCircularPos([100, 100], min, max, circularOption)).to.eql([100, 100]);
        expect(Coordinate.getCircularPos([0, 0], min, max, circularOption)).to.eql([0, 0]);
        expect(Coordinate.getCircularPos([101, 101], min, max, circularOption)).to.eql([1, 1]);
        expect(Coordinate.getCircularPos([-1, -1], min, max, circularOption)).to.eql([99, 99]);
        expect(Coordinate.getCircularPos([110, 0], min, max, circularOption)).to.eql([10, 0]);
        expect(Coordinate.getCircularPos([0, -110], min, max, circularOption)).to.eql([0, 90]);

        // include negative value (Sphere)
        min = [-180, -90];
        max = [180, 90];

        // Then
        expect(Coordinate.getCircularPos([180, 90], min, max, circularOption)).to.eql([180, 90]);
        expect(Coordinate.getCircularPos([-180, -90], min, max, circularOption)).to.eql([-180, -90]);
        expect(Coordinate.getCircularPos([181, 91], min, max, circularOption)).to.eql([-179, -89]);
        expect(Coordinate.getCircularPos([-181, -91], min, max, circularOption)).to.eql([179, 89]);
        expect(Coordinate.getCircularPos([190, 0], min, max, circularOption)).to.eql([-170, 0]);
        expect(Coordinate.getCircularPos([0, -110], min, max, circularOption)).to.eql([0, 70]);

        // circular option false
        circularOption = [false, false, false, false];
        min = [0, 0];
        max = [100, 100];

        // Then
        expect(Coordinate.getCircularPos([100, 100], min, max, circularOption)).to.eql([100, 100]);
        expect(Coordinate.getCircularPos([0, 0], min, max, circularOption)).to.eql([0, 0]);
        expect(Coordinate.getCircularPos([101, 101], min, max, circularOption)).to.eql([101, 101]);
        expect(Coordinate.getCircularPos([-1, -1], min, max, circularOption)).to.eql([-1, -1]);
        expect(Coordinate.getCircularPos([110, 0], min, max, circularOption)).to.eql([110, 0]);
        expect(Coordinate.getCircularPos([0, -110], min, max, circularOption)).to.eql([0, -110]);

        // circular true on left/right
        circularOption = [false, true, false, true];
        min = [0, 0];
        max = [100, 100];

        // Then
        expect(Coordinate.getCircularPos([100, 100], min, max, circularOption)).to.eql([100, 100]);
        expect(Coordinate.getCircularPos([0, 0], min, max, circularOption)).to.eql([0, 0]);
        expect(Coordinate.getCircularPos([101, 101], min, max, circularOption)).to.eql([1, 101]);
        expect(Coordinate.getCircularPos([-1, -1], min, max, circularOption)).to.eql([99, -1]);
        expect(Coordinate.getCircularPos([110, 0], min, max, circularOption)).to.eql([10, 0]);
        expect(Coordinate.getCircularPos([0, -110], min, max, circularOption)).to.eql([0, -110]);
    });
});

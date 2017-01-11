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

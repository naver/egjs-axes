import MovableCoord from '../../../src/movableCoord.js';

describe("movableCoord init Test", function() {
    beforeEach(() => {
		  this.inst = null;
    });
    afterEach(() => {
      if(this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
    });
    
    it("should check a initialization empty value", () => {
        // Given
        // When
        this.inst = new MovableCoord();
        // Then
        expect(this.inst).to.be.exist;
    });

    it("should check a initialization position value", () => {
        // Given
        // When
        this.inst = new MovableCoord( {
          min : [ -100, 0 ],
          max : [ 300, 400 ]
        });
        // Then
        expect(this.inst.get()).to.deep.equal([-100, 0]);
    });    
});
 


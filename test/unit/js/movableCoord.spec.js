import MovableCoord from '../../../src/movableCoord.js';
import fibonacci from '../../../src/fibonacci.js';
import chai from 'chai';
 
chai.should();
// describe('fibonacci test', () => {
//     it('수열의 첫 번째 값은 0이어야 한다.', () => {
//         // given
//         // when
//         const actual = fibonacci(0);
        
 
//         // then
//         actual.should.be.eql(0);
//     });
 
//     it('수열의 두 번째 값은 1이어야 한다.', () => {
//         // given
//         // when
//         const actual = fibonacci(1);
 
//         // then
//         actual.should.be.eql(1);
//     });
 
//     it('수열의 n 번째 값은 n-2번째와 n-1번째 값의 합이어야 한다.', () => {
//         fibonacci(3).should.be.eql(fibonacci(1) + fibonacci(2));
//         fibonacci(100000).should.be.eql(fibonacci(99998) + fibonacci(99999));
//     });
// });

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
});
 


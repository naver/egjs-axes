import {AxisManager} from "../../src/AxisManager";


describe("AxisManager", function() {
 beforeEach(() => {
    this.inst = new AxisManager( {
      axis: {
        x: {
          range: [0, 100],
          bounce: [0, 0],
          margin: [0, 0],
          circular: [false, false]
        },
        y: {
          range: [0, 200],
          margin: [0, 0],
          bounce: [0, 0],
          circular: [false, false]
        }
      }
    });
  });
  afterEach(() => {
  });
  
  it("should get pos", () => {
    // Given
    let axes = ["x", "y", "z"];
    let before = {
      x: 0,
      y: 0
    };

    // When
    expect(this.inst.get()).to.be.eql(before);
    // Then
  })
  
});

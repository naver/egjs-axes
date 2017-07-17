import Axes from '../../src/Axes.ts';

describe("Axes init Test", function () {
	beforeEach(() => {
		this.inst = null;
	});
	afterEach(() => {
		if (this.inst) {
			this.inst.destroy();
			this.inst = null;
		}
	});

	it("should check a initialization empty value", () => {
    // Given
    // When
    this.inst = new Axes();
    // Then

    const defaultOptions = {
      easing: function easeOutCubic(x) {
        return 1 - Math.pow(1 - x, 3);
      },
      interruptable: true,
      maximumDuration: Infinity,
      deceleration: 0.0006,
      axis: {}
    }
    
    expect(this.inst).to.be.exist;
    expect(defaultOptions.easing(0.5)).to.be.equal(this.inst.options.easing(0.5));
    expect(defaultOptions.easing(0.3)).to.be.equal(this.inst.options.easing(0.3));
    expect(defaultOptions.easing(0.1)).to.be.equal(this.inst.options.easing(0.1));
    expect(defaultOptions.easing(0.7)).to.be.equal(this.inst.options.easing(0.7));
    expect(defaultOptions.easing(0.9)).to.be.equal(this.inst.options.easing(0.9));
    expect(defaultOptions.interruptable).to.be.equal(this.inst.options.interruptable);
    expect(defaultOptions.maximumDuration).to.be.equal(this.inst.options.maximumDuration);
    expect(defaultOptions.deceleration).to.be.equal(this.inst.options.deceleration);
    expect(defaultOptions.axis).to.be.eql(this.inst.options.axis);
	});

  it("should check initialization status", () => {
    // Given
    // When
    this.inst = new Axes({
      axis: {
        x: {
          range: [0, 100],
          bounce: [30, 50],
          circular: true
        },
        otherX: {
          range: [-100, 100],
          bounce: 40,
          circular: [false, true]
        }
      },
      deceleration: 0.001
    });

    // Then
    expect(this.inst.options.axis.x.bounce).to.deep.equal([30, 50]);
    expect(this.inst.options.axis.x.circular).to.deep.equal([true, true]);
    expect(this.inst.options.axis.otherX.bounce).to.deep.equal([40, 40]);
    expect(this.inst.options.axis.otherX.circular).to.deep.equal([false, true]);
  });
});

import {
	AnimationManager
} from "../../src/AnimationManager";
import {AxisManager} from "../../src/AxisManager";
import {InterruptManager} from "../../src/InterruptManager";
import {EventManager} from "../../src/EventManager";


describe("AnimationManager", function () {
	beforeEach(() => {
		this.options = {
			axis: {
				x: {
					range: [0, 100],
					bounce: [50, 50],
					circular: false
				},
				y: {
					range: [0, 200],
					bounce: [0, 0],
					circular: false
				},
				z: {
					range: [-100, 200],
					bounce: [50, 0],
					circular: true
				}
      },
      deceleration: 0.0001,
      maximumDuration: 2000
		};
    this.inst = new AnimationManager(
      this.options, 
      new InterruptManager(this.options), 
      new EventManager(this.options),
      new AxisManager(this.options)
    );
	});
	afterEach(() => {});

	it("should check 'getDuration' method", () => {
		// Given
		// When
		const depaPos = {
			x: 0,
			y: 0
		};
		const destPos = {
			x: 100,
			y: 50
		};

    // When/Then
    expect(this.inst.getDuration(depaPos, destPos)).to.be.equal(1414.213562373095);

    // When (change option)
    this.options.maximumDuration = 1200;

    // Then
    expect(this.inst.getDuration(depaPos, destPos)).to.be.equal(1200);

    // When/Then
    expect(this.inst.getDuration(depaPos, destPos, 1000)).to.be.equal(1000);

    // When/Then
    expect(this.inst.getDuration(depaPos, destPos, 2000)).to.be.equal(1200);
  });
  
	it("should check 'createAnimationParam' method", () => {
		// Given
		// When
		const pos = {
			x: 200,
      y: 210,
      z: -155
		};

    // When
    let param = this.inst.createAnimationParam(pos, 1000);

    // Then
    expect(param.depaPos).to.be.eql({x:0, y:0, z: -100});
    expect(param.destPos).to.be.eql({x:150, y:200, z: -150});
    expect(param.duration).to.be.eql(1000);
    expect(param.distance).to.be.eql({x:150, y:200, z:-50});
    expect(param.inputEvent).to.be.eql(null);

    // When
    this.options.maximumDuration = 500;
    const eventValue = { event: "i'm inputEvent"};
    param = this.inst.createAnimationParam(pos, 1000, eventValue);

    // Then
    expect(param.depaPos).to.be.eql({x:0, y:0, z: -100});
    expect(param.destPos).to.be.eql({x:150, y:200, z: -150});
    expect(param.duration).to.be.eql(500);
    expect(param.distance).to.be.eql({x:150, y:200, z:-50});
    expect(param.inputEvent).to.be.equal(eventValue);
  });
});

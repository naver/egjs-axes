import Axes from "../../src/Axes";

describe("axes", () => {
	let axes;

	beforeEach(() => {
		axes = new Axes();
	});

	afterEach(() => {
		// axes.destroy();
		axes = null;
	});

	it("should created instance", () => {
		expect(axes).to.be.an.instanceof(Axes);
	});
});

import { $, toArray, equal, getDecimalPlace, roundNumber } from "../../src/utils";

describe("Util Test", function () {
	beforeEach(() => {
		this.el = sandbox();
	});
	afterEach(() => {
		cleanup();
	});
	it("should check 'equal' method", () => {
		// Given
		let target1 = {
			x: 10,
			y: 20,
			z: 30
		};
		let target2 = {
			x: 10,
			y: 20
		}

		// Then
		expect(equal(target1, target2)).to.be.false;
		expect(equal(target2, target1)).to.be.true;
	});
	it("should check `$` method", () => {
		// Given
		// When
		const complicatedHTML = "<div class='item'><div class='thumbnail'><img class='img-rounded' src='#' /><div class='caption'><p><a href='http://www.naver.com'></a></p></div></div></div>";
		const div = complicatedHTML; // string
		const divs = [complicatedHTML, complicatedHTML];

		// Then
		expect($(window)).to.be.equal(window);
		expect($(document)).to.be.equal(document);
		expect($(div) instanceof HTMLElement).to.be.true;
		expect($($(div)) instanceof HTMLElement).to.be.true;
		expect($(divs, true).length).to.be.equal(2);
		expect($("#sandbox")).to.be.equal(this.el);
		expect(this.el).to.be.equal(this.el);
	});
	it("should check `toArray` method", () => {
		// Given
		this.el.innerHTML = `<div>content1</div>
    <div>content2</div>
    <div>content3</div>`;
		// When
		const useSlice = Array.prototype.slice.call(this.el.childNodes);

		// Then
		expect(toArray(this.el.childNodes)).to.be.eql(useSlice);
	});

	it("should roundNumber by round unit", () => {
		// Given
		const targetVal = 99.123456789;
		const inputValues = [100, 10, 1, 0, 0.1, 0.01, 0.001, 0.0001];
		const expectValues = [100, 100, 99, 0, 99.1, 99.12, 99.123, 99.1235/* round */];
		// Ref. Same result : https://codepen.io/GreenSock/pen/mLMYwM

		// When
		const result = inputValues.map(input => roundNumber(targetVal, input));

		// Then
		expectValues.forEach((expectVal, i) => {
			expect(result[i]).to.be.equal(expectVal);
		});
	});

	it("should return decimal place", () => {
		// Given
		const inputValues = [1e+3, 100, 10, 1, 0, 0.1, 0.01, 0.001, 0.0001, 1e-5];
		const expectValues = [0, 0, 0, 0, 0, 1, 2, 3, 4, 5];

		// When
		const result = inputValues.map(input => getDecimalPlace(input));

		// Then
		expectValues.forEach((expectVal, i) => {
			expect(expectVal).to.be.equal(result[i]);
		});
	});
});

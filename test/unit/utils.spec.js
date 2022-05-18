import {
  DIRECTION_ALL,
  DIRECTION_HORIZONTAL,
  DIRECTION_NONE,
  DIRECTION_VERTICAL,
} from "../../src/const";
import {
  $,
  toArray,
  equal,
  getDecimalPlace,
  roundNumber,
  isCssPropsFromAxes,
  setCssProps,
} from "../../src/utils";

describe("Util Test", () => {
  let el;

  beforeEach(() => {
    el = sandbox();
  });
  afterEach(() => {
    cleanup();
  });

  it("should check 'equal' method", () => {
    // Given
    const target1 = {
      x: 10,
      y: 20,
      z: 30,
    };
    const target2 = {
      x: 10,
      y: 20,
    };

    // Then
    expect(equal(target1, target2)).to.be.false;
    expect(equal(target2, target1)).to.be.true;
  });

  it("should check `$` method", () => {
    // Given
    // When
    const complicatedHTML =
      "<div class='item'><div class='thumbnail'><img class='img-rounded' src='#' /><div class='caption'><p><a href='http://www.naver.com'></a></p></div></div></div>";
    const div = complicatedHTML; // string
    const divs = [complicatedHTML, complicatedHTML];

    // Then
    expect($(window)).to.be.equal(window);
    expect($(document)).to.be.equal(document);
    expect($(div) instanceof HTMLElement).to.be.true;
    expect($($(div)) instanceof HTMLElement).to.be.true;
    expect($(divs, true).length).to.be.equal(2);
    expect($("#sandbox")).to.be.equal(el);
    expect(el).to.be.equal(el);
  });

  it("should check `toArray` method", () => {
    // Given
    el.innerHTML = `<div>content1</div>
    <div>content2</div>
    <div>content3</div>`;
    // When
    const useSlice = Array.prototype.slice.call(el.childNodes);

    // Then
    expect(toArray(el.childNodes)).to.be.eql(useSlice);
  });

  it("should check 'isCssPropsFromAxes' method", () => {
    // Given
    const cssProps1 = {
      "touch-action": "auto",
      "user-select": "none",
      "-webkit-user-drag": "none",
    };
    const cssProps2 = {
      "touch-action": "none",
      "user-select": "text",
      "-webkit-user-drag": "auto",
    };
    const cssProps3 = {
      "text-align": "center",
    };
    const cssProps4 = {
      "user-select": "none",
      "-webkit-user-drag": "none",
    };
    const cssProps5 = null;

    // Then
    expect(isCssPropsFromAxes(cssProps1)).to.be.true;
    expect(isCssPropsFromAxes(cssProps2)).to.be.false;
    expect(isCssPropsFromAxes(cssProps3)).to.be.false;
    expect(isCssPropsFromAxes(cssProps4)).to.be.true;
    expect(isCssPropsFromAxes(cssProps5)).to.be.false;
  });

  [
    DIRECTION_NONE,
    DIRECTION_ALL,
    DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL,
  ].forEach((direction) => {
    it(`should check 'setCssProps' method (direction:${direction})`, () => {
      // Given
      setCssProps(el, {}, direction);

      // Then
      const answers = {
        [DIRECTION_NONE]: "auto",
        [DIRECTION_ALL]: "none",
        [DIRECTION_VERTICAL]: "pan-x",
        [DIRECTION_HORIZONTAL]: "pan-y",
      };
      expect(el.style.touchAction).to.be.equal(answers[direction]);
    });
  });

  it(`should check 'setCssProps' method (multiple times)`, () => {
    // Given
    setCssProps(el, {}, DIRECTION_ALL);
    setCssProps(el, {}, DIRECTION_VERTICAL);

    // Then
    expect(el.style.touchAction).to.be.equal("none");
  });

  it("should roundNumber by round unit", () => {
    // Given
    const targetVal = 99.123456789;
    const inputValues = [100, 10, 1, 0, 0.1, 0.01, 0.001, 0.0001];
    const expectValues = [
      100, 100, 99, 0, 99.1, 99.12, 99.123, 99.1235 /* round */,
    ];
    // Ref. Same result : https://codepen.io/GreenSock/pen/mLMYwM

    // When
    const result = inputValues.map((input) => roundNumber(targetVal, input));

    // Then
    expectValues.forEach((expectVal, i) => {
      expect(result[i]).to.be.equal(expectVal);
    });
  });

  it("should return decimal place", () => {
    // Given
    const inputValues = [1e3, 100, 10, 1, 0, 0.1, 0.01, 0.001, 0.0001, 1e-5];
    const expectValues = [0, 0, 0, 0, 0, 1, 2, 3, 4, 5];

    // When
    const result = inputValues.map((input) => getDecimalPlace(input));

    // Then
    expectValues.forEach((expectVal, i) => {
      expect(expectVal).to.be.equal(result[i]);
    });
  });
});

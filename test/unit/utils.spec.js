import {$, toArray, equal} from "../../src/utils";

describe("Util Test", function() {
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
});

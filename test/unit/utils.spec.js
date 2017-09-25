import {toArray} from "../../src/utils";

describe.only("Util Test", function() {
  beforeEach(() => {
    this.inst = null;
    this.el = sandbox();
    this.el.innerHTML = `<div>content1</div>
      <div>content2</div>
      <div>content3</div>`;
  });
  afterEach(() => {
    if (this.inst) {
      this.inst.destroy();
      this.inst = null;
    }
    cleanup();
  });
  it("should check `toArray` method", () => {
      // Given
      // When
      const useSlice = Array.prototype.slice.call(this.el.childNodes);

      // Then
      expect(toArray(this.el.childNodes)).to.be.eql(useSlice);
  });
});

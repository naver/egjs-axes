import Hammer from "hammerjs";
import HammerInput from "../../src/inputType/HammerInput";
import HammerInputInjector from "inject-loader!../../src/inputType/HammerInput";

describe("HammerInput", () => {
	describe("SUPPORT_TOUCH mocking", function() {
    beforeEach(() => {
			this.inst = null;
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
    });
    it("should check convertHammerInputType when supporting touch", () => {
      // Given
      var MockHammerInput = HammerInputInjector({
        "../const": {
          SUPPORT_TOUCH : true
        }
      }).HammerInput;
      
			// When
      var inputType = [ "touch", "mouse" ];
      // Then
      expect(MockHammerInput.convertHammerInputType(inputType)).to.be.equal(Hammer.TouchInput);

      // When
      inputType = [ "touch" ];
      // Then
      expect(MockHammerInput.convertHammerInputType(inputType)).to.be.equal(Hammer.TouchInput);

      // When
      inputType = [ "mouse" ];
      // Then
      expect(MockHammerInput.convertHammerInputType(inputType)).to.be.equal(Hammer.MouseInput);

      // When
      inputType = [ ];
      // Then
      expect(MockHammerInput.convertHammerInputType(inputType)).to.be.null;
    });


    it("should check convertHammerInputType when not supporting touch", () => {
      // Given
      var MockHammerInput = HammerInputInjector({
        "../const": {
          SUPPORT_TOUCH : false
        }
      }).HammerInput;

      // When
      var inputType = [ "touch", "mouse" ];
      // Then
      expect(MockHammerInput.convertHammerInputType(inputType)).to.be.equal(Hammer.MouseInput);

      // When
      inputType = [ "touch" ];
      // Then
      expect(MockHammerInput.convertHammerInputType(inputType)).to.be.null;

      // When
      inputType = [ "mouse" ];
      // Then
      expect(MockHammerInput.convertHammerInputType(inputType)).to.be.equal(Hammer.MouseInput);

      // When
      inputType = [ ];
      // Then
      expect(MockHammerInput.convertHammerInputType(inputType)).to.be.null;
    });    
  });
});

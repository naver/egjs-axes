import Hammer from "hammerjs";
import {createHammer, convertInputType} from "../../../src/inputType/InputType";
import {DIRECTION} from "../../../src/const";
import InputInjector from "inject-loader!../../../src/inputType/InputType";

describe("InputType", () => {
  describe("SUPPORT_TOUCH mocking", function() {
    it("should check convertInputType when supporting touch", () => {
      // Given
      const MockInputInjector = InputInjector();

      MockInputInjector.SUPPORT_TOUCH = true;
      MockInputInjector.SUPPORT_POINTER_EVENTS = true;
      // When
      let inputType = ["pointer", "touch", "mouse" ];
      // Then
      expect(Hammer.TouchMouseInput).to.be.ok;
      expect(Hammer.PointerEventInput).to.be.ok;
      expect(MockInputInjector.convertInputType(inputType)).to.be.equal(Hammer.PointerEventInput);
      MockInputInjector.SUPPORT_POINTER_EVENTS = false;
      
      expect(MockInputInjector.convertInputType(inputType)).to.be.equal(Hammer.TouchMouseInput);
      // When
      inputType = [ "touch" ];
      // Then
      expect(MockInputInjector.convertInputType(inputType)).to.be.equal(Hammer.TouchInput);

    // When
      inputType = [ "mouse" ];
      // Then
      expect(MockInputInjector.convertInputType(inputType)).to.be.equal(Hammer.MouseInput);

      // When
      inputType = [ ];
      // Then
      expect(MockInputInjector.convertInputType(inputType)).to.be.null;
    });


    it("should check convertInputType when not supporting touch", () => {
      // Given
      const MockInputInjector = InputInjector();
      MockInputInjector.SUPPORT_TOUCH = false;

      // When
      let inputType = [ "touch", "mouse" ];
      // Then
      expect(MockInputInjector.convertInputType(inputType)).to.be.equal(Hammer.MouseInput);

      // When
      inputType = [ "touch" ];
      // Then
      expect(MockInputInjector.convertInputType(inputType)).to.be.null;

      // When
      inputType = [ "mouse" ];
      // Then
      expect(MockInputInjector.convertInputType(inputType)).to.be.equal(Hammer.MouseInput);

      // When
      inputType = [ ];
      // Then
      expect(MockInputInjector.convertInputType(inputType)).to.be.null;
    });    
  });
});

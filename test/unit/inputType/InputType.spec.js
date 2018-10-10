import {TouchMouseInput, PointerEventInput,TouchInput , MouseInput} from "@egjs/hammerjs";
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
      expect(TouchMouseInput).to.be.ok;
      expect(PointerEventInput).to.be.ok;
      expect(MockInputInjector.convertInputType(inputType)).to.be.equal(PointerEventInput);
      MockInputInjector.SUPPORT_POINTER_EVENTS = false;
      
      expect(MockInputInjector.convertInputType(inputType)).to.be.equal(TouchMouseInput);
      // When
      inputType = [ "touch" ];
      // Then
      expect(MockInputInjector.convertInputType(inputType)).to.be.equal(TouchInput);

    // When
      inputType = [ "mouse" ];
      // Then
      expect(MockInputInjector.convertInputType(inputType)).to.be.equal(MouseInput);

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
      expect(MockInputInjector.convertInputType(inputType)).to.be.equal(MouseInput);

      // When
      inputType = [ "touch" ];
      // Then
      expect(MockInputInjector.convertInputType(inputType)).to.be.null;

      // When
      inputType = [ "mouse" ];
      // Then
      expect(MockInputInjector.convertInputType(inputType)).to.be.equal(MouseInput);

      // When
      inputType = [ ];
      // Then
      expect(MockInputInjector.convertInputType(inputType)).to.be.null;
    });    
  });
});

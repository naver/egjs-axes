import { MouseEventInput } from "../../../src/eventInput/MouseEventInput";
import { PointerEventInput } from "../../../src/eventInput/PointerEventInput";
import { TouchEventInput } from "../../../src/eventInput/TouchEventInput";
import { TouchMouseEventInput } from "../../../src/eventInput/TouchMouseEventInput";

import InputInjector from "inject-loader!../../../src/inputType/InputType";
import EventInjector from "inject-loader!../../../src/eventInput/EventInput";

describe("InputType", () => {
  describe("SUPPORT_TOUCH mocking", () => {
    it("should check convertInputType when supporting touch", () => {
      // Given
      const MockEventInjector = EventInjector();
      const MockInputInjector = InputInjector({
        "../eventInput/EventInput": MockEventInjector,
      });

      MockEventInjector.SUPPORT_TOUCH = true;
      MockEventInjector.SUPPORT_POINTER_EVENTS = true;
      // When
      let inputType = ["pointer", "touch", "mouse"];
      // Then
      expect(
        MockInputInjector.convertInputType(inputType) instanceof
          PointerEventInput
      ).to.be.equal(true);
      MockEventInjector.SUPPORT_POINTER_EVENTS = false;

      expect(
        MockInputInjector.convertInputType(inputType) instanceof
          TouchMouseEventInput
      ).to.be.equal(true);
      // When
      inputType = ["touch"];
      // Then
      expect(
        MockInputInjector.convertInputType(inputType) instanceof TouchEventInput
      ).to.be.equal(true);

      // When
      inputType = ["mouse"];
      // Then
      expect(
        MockInputInjector.convertInputType(inputType) instanceof MouseEventInput
      ).to.be.equal(true);

      // When
      inputType = [];
      // Then
      expect(MockInputInjector.convertInputType(inputType)).to.be.null;
    });

    it("should check convertInputType when not supporting touch", () => {
      // Given
      const MockEventInjector = EventInjector();
      const MockInputInjector = InputInjector({
        "../eventInput/EventInput": MockEventInjector,
      });
      MockEventInjector.SUPPORT_TOUCH = false;

      // When
      let inputType = ["touch", "mouse"];
      // Then
      expect(
        MockInputInjector.convertInputType(inputType) instanceof MouseEventInput
      ).to.be.equal(true);

      // When
      inputType = ["touch"];
      // Then
      expect(MockInputInjector.convertInputType(inputType)).to.be.null;

      // When
      inputType = ["mouse"];
      // Then
      expect(
        MockInputInjector.convertInputType(inputType) instanceof MouseEventInput
      ).to.be.equal(true);

      // When
      inputType = [];
      // Then
      expect(MockInputInjector.convertInputType(inputType)).to.be.null;
    });
  });
});

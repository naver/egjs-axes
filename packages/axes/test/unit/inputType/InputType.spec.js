import Axes from "../../../src/Axes.ts";
import { MouseEventInput } from "../../../src/eventInput/MouseEventInput";
import { PointerEventInput } from "../../../src/eventInput/PointerEventInput";
import { TouchEventInput } from "../../../src/eventInput/TouchEventInput";
import { TouchMouseEventInput } from "../../../src/eventInput/TouchMouseEventInput";
import { PanInput } from "../../../src/inputType/PanInput.ts";

import InputInjector from "inject-loader!../../../src/inputType/InputType";
import EventInjector from "inject-loader!../../../src/eventInput/EventInput";

import TestHelper from "./TestHelper";

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

  describe("eventInput", () => {
    [["mouse"], ["touch"], ["touch", "mouse"]].forEach((inputType) => {
      it(`should recognize the correct event contained in the inputType (inputType: ${inputType}, event: mouse)`, async () => {
        // Given
        const MockEventInjector = EventInjector();
        MockEventInjector.SUPPORT_TOUCH = true;
        const change = sinon.spy();
        const el = sandbox();
        const input = new PanInput(el, {
          inputType,
        });
        const inst = new Axes(
          {
            x: {
              range: [0, 100],
            },
          }
        );
        inst.connect("x", input);
        inst.on("change", change);

        // When
        await TestHelper.dispatchDrag(
          el,
          { left: 0, top: 0 },
          { left: 100, top: 0 },
          { duration: 100, interval: 50 }
        );

        // Then
        expect(change.called).to.be.equal(inputType.indexOf("mouse") > -1);
      });

      it(`should recognize the correct event contained in the inputType (inputType: ${inputType}, event: touch)`, (done) => {
        // Given
        const MockEventInjector = EventInjector();
        MockEventInjector.SUPPORT_TOUCH = true;
        const change = sinon.spy();
        const el = sandbox();
        const input = new PanInput(el, {
          inputType,
        });
        const inst = new Axes(
          {
            x: {
              range: [0, 100],
            },
          }
        );
        inst.connect("x", input);
        inst.on("change", change);

        // When
        Simulator.gestures.pan(el, {
          pos: [0, 0],
          deltaX: 100,
          duration: 1500,
          easing: "linear",
        }, () => {
          // Then
          expect(change.called).to.be.equal(inputType.indexOf("touch") > -1);
          done();
        });
      });
    });
  });
});

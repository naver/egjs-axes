import { InterruptManager } from "./InterruptManager";
import { InputManager } from "./InputManager";
import { IInputType } from "./inputType/Input.d";
import { PositionManager } from "./PositionManager";
/**
 * Copyright (c) NAVER Corp.
 * egjs-axes projects are licensed under the MIT license
 */
import { AxesOption } from "./Option.d";
import Component from "@egjs/component";

/**
 * A module used to change the information of user action entered by various input devices such as touch screen or mouse into logical coordinates within the virtual coordinate system. The coordinate information sorted by time events occurred is provided if animations are made by user actions.
 * @alias eg.Axes
 * @extends eg.Component
 *
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 */
class Axes extends Component {
  options: AxesOption;

  // Managers
  positionManager: PositionManager;
  interrruptManager: InterruptManager;
  inputManager: InputManager;

  constructor(options) {
    super();
    Object.assign(this.options = {
      easing: function easeOutCubic(x) {
        return 1 - Math.pow(1 - x, 3);
      },
      maximumDuration: Infinity,
      deceleration: 0.0006,
      axes: {
        x : {
          range: [0, 100],
          bounce: [0, 0],
          margin: [0, 0],
          circular: [false, false]
        }
      }
    }, options);
    // this._reviseOptions();
    this.positionManager = new PositionManager(this.options.axes);
    this.interrruptManager = new InterruptManager(this);
    this.inputManager = new InputManager(this);
  }

  addInput(axes: Array<string>, inputType: IInputType) {
    inputType.mapAxes(axes);
    inputType.subscribe(this);
    return this;
  }

  removeInput(inputType: IInputType) {
    inputType.unsubscribe();
    return this;
  }

    // deep copy
  get(axes?: Array<string>): Position {
    if (axes) {
      return axes.reduce((acc, v) => {
        acc[v] = this._pos[v];
        return acc;
      }, {});
    } else {
      return { ...this._pos };
    }
  }
}


export default Axes;

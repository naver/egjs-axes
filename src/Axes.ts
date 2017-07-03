/**
 * Copyright (c) NAVER Corp.
 * egjs-axes projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import { AxesOption } from "./Option.d";
import { InputType } from "./inputType/Input.d";

/**
 * A module used to change the information of user action entered by various input devices such as touch screen or mouse into logical coordinates within the virtual coordinate system. The coordinate information sorted by time events occurred is provided if animations are made by user actions.
 * @alias eg.Axes
 * @extends eg.Component
 *
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 */
class Axes extends Component {
  public options: AxesOption;
  private _pos: { [key: string]: number };

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
    this._pos = Object.keys(this.options.axes).reduce((acc, v) => {
      acc[v] = this.options.axes[v].range[0];
      return acc;
    }, {});
  }

  addInput(axes: Array<string>, inputType: InputType) {
    inputType.mapAxes(axes);
    inputType.subscribe(this);
    return this;
  }

  removeInput(inputType: InputType) {
    inputType.unsubscribe();
    return this;
  }

  // deep copy
  get(axes?: Array<string>): { [key: string]: number } {
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

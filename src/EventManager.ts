import { ComponentEvent } from "@egjs/component";

import { InputType } from "./inputType/InputType";
import { Axis } from "./AxisManager";
import { AnimationManager } from "./AnimationManager";
import Axes from "./Axes";
import { roundNumbers } from "./utils";
import { AnimationParam, OnAnimationStart, OnRelease } from "./types";

export interface ChangeEventOption {
  input: InputType;
  event;
}

export class EventManager {
  public animationManager: AnimationManager;
  public constructor(private _axes: Axes) {}
  /**
   * This event is fired when a user holds an element on the screen of the device.
   * @ko 사용자가 기기의 화면에 손을 대고 있을 때 발생하는 이벤트
   * @event Axes#triggerHold
   * @type {object}
   * @property {Object.<string, number>} pos coordinate <ko>좌표 정보</ko>
   * @property {Object} input The instance of inputType where the event occurred<ko>이벤트가 발생한 inputType 인스턴스</ko>
   * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   *
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("hold", function(event) {
   *   // event.pos
   *   // event.input
   *   // event.inputEvent
   *   // isTrusted
   * });
   * ```
   */
  public triggerHold(pos: Axis, option: ChangeEventOption) {
    const { roundPos } = this._getRoundPos(pos);

    this._axes.trigger(
      new ComponentEvent("hold", {
        pos: roundPos,
        input: option.input || null,
        inputEvent: option.event || null,
        isTrusted: true,
      })
    );
  }

  /**
   * Specifies the coordinates to move after the 'change' event. It works when the holding value of the change event is true.
   * @ko 'change' 이벤트 이후 이동할 좌표를 지정한다. change이벤트의 holding 값이 true일 경우에 동작한다
   * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("change", function(event) {
   *   event.holding && event.set({x: 10});
   * });
   * ```
   */
  /** Specifies the animation coordinates to move after the 'release' or 'animationStart' events.
   * @ko 'release' 또는 'animationStart' 이벤트 이후 이동할 좌표를 지정한다.
   * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
   * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("animationStart", function(event) {
   *   event.setTo({x: 10}, 2000);
   * });
   * ```
   */
  /**
   * This event is fired when a user release an element on the screen of the device.
   * @ko 사용자가 기기의 화면에서 손을 뗐을 때 발생하는 이벤트
   * @event Axes#release
   * @type {object}
   * @property {Object.<string, number>} depaPos The coordinates when releasing an element<ko>손을 뗐을 때의 좌표 </ko>
   * @property {Object.<string, number>} destPos The coordinates to move to after releasing an element<ko>손을 뗀 뒤에 이동할 좌표</ko>
   * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
   * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
   * @property {Object} input The instance of inputType where the event occurred<ko>이벤트가 발생한 inputType 인스턴스</ko>
   * @property {setTo} setTo Specifies the animation coordinates to move after the event <ko>이벤트 이후 이동할 애니메이션 좌표를 지정한다</ko>
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   *
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("release", function(event) {
   *   // event.depaPos
   *   // event.destPos
   *   // event.delta
   *   // event.input
   *   // event.inputEvent
   *   // event.setTo
   *   // event.isTrusted
   *
   *   // if you want to change the animation coordinates to move after the 'release' event.
   *   event.setTo({x: 10}, 2000);
   * });
   * ```
   */
  public triggerRelease(param: AnimationParam) {
    const { roundPos, roundDepa } = this._getRoundPos(
      param.destPos,
      param.depaPos
    );
    param.destPos = roundPos;
    param.depaPos = roundDepa;
    param.setTo = this._createUserControll(param.destPos, param.duration);
    this._axes.trigger(
      new ComponentEvent("release", {
        ...param,
        bounceRatio: this._getBounceRatio(roundPos),
      } as OnRelease)
    );
  }

  /**
   * This event is fired when coordinate changes.
   * @ko 좌표가 변경됐을 때 발생하는 이벤트
   * @event Axes#change
   * @type {object}
   * @property {Object.<string, number>} pos  The coordinate <ko>좌표</ko>
   * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
   * @property {Boolean} holding Indicates whether a user holds an element on the screen of the device.<ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
   * @property {Object} input The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.<ko>이벤트가 발생한 inputType 인스턴스. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
   * @property {Object} inputEvent The event object received from inputType. If the value is changed by animation, it returns 'null'.<ko>inputType으로 부터 받은 이벤트 객체. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
   * @property {set} set Specifies the coordinates to move after the event. It works when the holding value is true <ko>이벤트 이후 이동할 좌표를 지정한다. holding 값이 true일 경우에 동작한다.</ko>
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   *
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("change", function(event) {
   *   // event.pos
   *   // event.delta
   *   // event.input
   *   // event.inputEvent
   *   // event.holding
   *   // event.set
   *   // event.isTrusted
   *
   *   // if you want to change the coordinates to move after the 'change' event.
   *   // it works when the holding value of the change event is true.
   *   event.holding && event.set({x: 10});
   * });
   * ```
   */
  public triggerChange(
    pos: Axis,
    isAccurate?: boolean,
    depaPos?: Axis,
    option?: ChangeEventOption,
    holding: boolean = false
  ) {
    const animationManager = this.animationManager;
    const axisManager = animationManager.axisManager;
    const eventInfo = animationManager.getEventInfo();
    const { roundPos, roundDepa } = this._getRoundPos(pos, depaPos);
    const moveTo = axisManager.moveTo(roundPos, roundDepa);
    const inputEvent = option?.event || eventInfo?.event || null;
    const param = {
      pos: moveTo.pos,
      delta: moveTo.delta,
      bounceRatio: this._getBounceRatio(moveTo.pos),
      holding,
      inputEvent,
      isTrusted: !!inputEvent,
      input: option?.input || eventInfo?.input || null,
      set: inputEvent ? this._createUserControll(moveTo.pos) : () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
    };
    const result = this._axes.trigger(new ComponentEvent("change", param));

    if (inputEvent) {
      axisManager.set(
        (param.set() as { destPos: Axis; duration: number }).destPos
      );
    }

    return result;
  }

  /**
   * This event is fired when animation starts.
   * @ko 에니메이션이 시작할 때 발생한다.
   * @event Axes#animationStart
   * @type {object}
   * @property {Object.<string, number>} depaPos The coordinates when animation starts<ko>애니메이션이 시작 되었을 때의 좌표 </ko>
   * @property {Object.<string, number>} destPos The coordinates to move to. If you change this value, you can run the animation<ko>이동할 좌표. 이값을 변경하여 애니메이션을 동작시킬수 있다</ko>
   * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
   * @property {Number} duration Duration of the animation (unit: ms). If you change this value, you can control the animation duration time.<ko>애니메이션 진행 시간(단위: ms). 이값을 변경하여 애니메이션의 이동시간을 조절할 수 있다.</ko>
   * @property {Object} input The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.<ko>이벤트가 발생한 inputType 인스턴스. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
   * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
   * @property {setTo} setTo Specifies the animation coordinates to move after the event <ko>이벤트 이후 이동할 애니메이션 좌표를 지정한다</ko>
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   *
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("release", function(event) {
   *   // event.depaPos
   *   // event.destPos
   *   // event.delta
   *   // event.input
   *   // event.inputEvent
   *   // event.setTo
   *   // event.isTrusted
   *
   *   // if you want to change the animation coordinates to move after the 'animationStart' event.
   *   event.setTo({x: 10}, 2000);
   * });
   * ```
   */
  public triggerAnimationStart(param: AnimationParam): Axes {
    const { roundPos, roundDepa } = this._getRoundPos(
      param.destPos,
      param.depaPos
    );
    param.destPos = roundPos;
    param.depaPos = roundDepa;
    param.setTo = this._createUserControll(param.destPos, param.duration);
    return this._axes.trigger(
      new ComponentEvent("animationStart", param as OnAnimationStart)
    );
  }

  /**
   * This event is fired when animation ends.
   * @ko 에니메이션이 끝났을 때 발생한다.
   * @event Axes#animationEnd
   * @type {object}
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   *
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("animationEnd", function(event) {
   *   // event.isTrusted
   * });
   * ```
   */
  public triggerAnimationEnd(isTrusted: boolean = false) {
    this._axes.trigger(
      new ComponentEvent("animationEnd", {
        isTrusted,
      })
    );
  }

  /**
   * This event is fired when all actions have been completed.
   * @ko 에니메이션이 끝났을 때 발생한다.
   * @event Axes#finish
   * @type {object}
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   *
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("finish", function(event) {
   *   // event.isTrusted
   * });
   * ```
   */
  public triggerFinish(isTrusted: boolean = false) {
    this._axes.trigger(
      new ComponentEvent("finish", {
        isTrusted,
      })
    );
  }

  public setAnimationManager(animationManager: AnimationManager) {
    this.animationManager = animationManager;
  }

  public destroy() {
    this._axes.off();
  }

  private _createUserControll(pos: Axis, duration: number = 0) {
    // to controll
    const userControl = {
      destPos: { ...pos },
      duration,
    };
    return (
      toPos?: Axis,
      userDuration?: number
    ): { destPos: Axis; duration: number } => {
      if (toPos) {
        userControl.destPos = { ...toPos };
      }
      if (userDuration !== undefined) {
        userControl.duration = userDuration;
      }
      return userControl;
    };
  }

  private _getRoundPos(pos: Axis, depaPos?: Axis) {
    // round value if round exist
    const roundUnit = this._axes.options.round;

    // if (round == null) {
    // 	return {pos, depaPos}; // undefined, undefined
    // }
    return {
      roundPos: roundNumbers(pos, roundUnit),
      roundDepa: roundNumbers(depaPos, roundUnit),
    };
  }

  private _getBounceRatio(pos: Axis): Axis {
    return this._axes.axisManager.map(pos, (v, opt) => {
      if (v < opt.range[0] && opt.bounce[0] !== 0) {
        return (opt.range[0] - v) / opt.bounce[0];
      } else if (v > opt.range[1] && opt.bounce[1] !== 0) {
        return (v - opt.range[1]) / opt.bounce[1];
      } else {
        return 0;
      }
    });
  }
}

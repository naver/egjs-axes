/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import { ReactiveSubscribe, Observe, Computed } from "@cfcs/core";

import { EventManager } from "./EventManager";
import { InterruptManager } from "./InterruptManager";
import { AxisManager, AxisOption, Axis } from "./AxisManager";
import { InputObserver } from "./InputObserver";
import {
  TRANSFORM,
  DIRECTION_NONE,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  DIRECTION_DOWN,
  DIRECTION_HORIZONTAL,
  DIRECTION_VERTICAL,
  DIRECTION_ALL,
} from "./const";
import { InputType } from "./inputType/InputType";
import {
  AxesEvents,
  AxesReactiveState,
  ObjectInterface,
  UpdateAnimationOption,
} from "./types";
import { EasingManager } from "./animation/EasingManager";
import { AnimationManager } from "./animation/AnimationManager";

export interface AxesOption {
  easing?: (x: number) => number;
  maximumDuration?: number;
  minimumDuration?: number;
  deceleration?: number;
  interruptable?: boolean;
  round?: number;
  nested?: boolean;
}

/**
 * @typedef {Object} AxisOption The Axis information. The key of the axis specifies the name to use as the logical virtual coordinate system.
 * @ko 축 정보. 축의 키는 논리적인 가상 좌표계로 사용할 이름을 지정한다.
 * @param {Number[]} [range] The range of coordinate <ko>좌표 범위</ko>
 * @param {Number} [range[0]=0] The coordinate of the minimum <ko>최소 좌표</ko>
 * @param {Number} [range[1]=0] The coordinate of the maximum <ko>최대 좌표</ko>
 * @param {Number} [startPos=range[0]] The coordinates to be moved when creating an instance <ko>인스턴스 생성시 이동할 좌표</ko>
 * @param {Number[]} [bounce] The size of bouncing area. The coordinates can exceed the coordinate area as much as the bouncing area based on user action. If the coordinates does not exceed the bouncing area when an element is dragged, the coordinates where bouncing effects are applied are retuned back into the coordinate area<ko>바운스 영역의 크기. 사용자의 동작에 따라 좌표가 좌표 영역을 넘어 바운스 영역의 크기만큼 더 이동할 수 있다. 사용자가 끌어다 놓는 동작을 했을 때 좌표가 바운스 영역에 있으면, 바운스 효과가 적용된 좌표가 다시 좌표 영역 안으로 들어온다</ko>
 * @param {Number} [bounce[0]=0] The size of coordinate of the minimum area <ko>최소 좌표 바운스 영역의 크기</ko>
 * @param {Number} [bounce[1]=0] The size of coordinate of the maximum area <ko>최대 좌표 바운스 영역의 크기</ko>
 * @param {Boolean[]} [circular] Indicates whether a circular element is available. If it is set to "true" and an element is dragged outside the coordinate area, the element will appear on the other side.<ko>순환 여부. 'true'로 설정한 방향의 좌표 영역 밖으로 엘리먼트가 이동하면 반대 방향에서 엘리먼트가 나타난다</ko>
 * @param {Boolean} [circular[0]=false] Indicates whether to circulate to the coordinate of the minimum <ko>최소 좌표 방향의 순환 여부</ko>
 * @param {Boolean} [circular[1]=false] Indicates whether to circulate to the coordinate of the maximum <ko>최대 좌표 방향의 순환 여부</ko>
 **/

/**
 * @typedef {Object} AxesOption The option object of the eg.Axes module
 * @ko eg.Axes 모듈의 옵션 객체
 * @param {Function} [easing=easing.easeOutCubic] The easing function to apply to an animation <ko>애니메이션에 적용할 easing 함수</ko>
 * @param {Number} [maximumDuration=Infinity] Maximum duration of the animation <ko>가속도에 의해 애니메이션이 동작할 때의 최대 좌표 이동 시간</ko>
 * @param {Number} [minimumDuration=0] Minimum duration of the animation <ko>가속도에 의해 애니메이션이 동작할 때의 최소 좌표 이동 시간</ko>
 * @param {Number} [deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time. <ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다</ko>
 * @param {Boolean} [interruptable=true] Indicates whether an animation is interruptible.
 * - true: It can be paused or stopped by user action or the API.
 * - false: It cannot be paused or stopped by user action or the API while it is running.
 * <ko>진행 중인 애니메이션 중지 가능 여부.
 * - true: 사용자의 동작이나 API로 애니메이션을 중지할 수 있다.
 * - false: 애니메이션이 진행 중일 때는 사용자의 동작이나 API가 적용되지 않는다</ko>
 * @param {Number} [round=null] Rounding unit. For example, 0.1 rounds to 0.1 decimal point(6.1234 => 6.1), 5 rounds to 5 (93 => 95)
 * [Details](https://github.com/naver/egjs-axes/wiki/round-option)<ko>반올림 단위. 예를 들어 0.1 은 소숫점 0.1 까지 반올림(6.1234 => 6.1), 5 는 5 단위로 반올림(93 => 95).
 * [상세내용](https://github.com/naver/egjs-axes/wiki/round-option)</ko>
 * @param {Boolean} [nested=false] Whether the event propagates to other instances when the coordinates reach the end of the movable area <ko>좌표가 이동 가능한 영역의 끝까지 도달했을 때 다른 인스턴스들로의 이벤트 전파 여부</ko>
 **/

/**
 * A module used to change the information of user action entered by various input devices such as touch screen or mouse into the logical virtual coordinates. You can easily create a UI that responds to user actions.
 * @ko 터치 입력 장치나 마우스와 같은 다양한 입력 장치를 통해 전달 받은 사용자의 동작을 논리적인 가상 좌표로 변경하는 모듈이다. 사용자 동작에 반응하는 UI를 손쉽게 만들수 있다.
 * @extends eg.Component
 *
 * @param {Object.<string, AxisOption>} axis Axis information managed by eg.Axes. The key of the axis specifies the name to use as the logical virtual coordinate system.  <ko>eg.Axes가 관리하는 축 정보. 축의 키는 논리적인 가상 좌표계로 사용할 이름을 지정한다.</ko>
 * @param {AxesOption} [options={}] The option object of the eg.Axes module<ko>eg.Axes 모듈의 옵션 객체</ko>
 * @param {Object.<string, number>} [startPos={}] The coordinates to be moved when creating an instance. It is applied with higher priority than startPos of axisOption.<ko>인스턴스 생성시 이동할 좌표, axisOption의 startPos보다 높은 우선순위로 적용된다.</ko>
 *
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 * @example
 * ```js
 * // 1. Initialize eg.Axes
 * const axes = new eg.Axes({
 *  something1: {
 *    range: [0, 150],
 *    bounce: 50
 *  },
 *  something2: {
 *    range: [0, 200],
 *    bounce: 100
 *  },
 *  somethingN: {
 *    range: [1, 10],
 *  }
 * }, {
 *  deceleration : 0.0024
 * });
 *
 * // 2. attach event handler
 * axes.on({
 *  "hold" : function(evt) {
 *  },
 *  "release" : function(evt) {
 *  },
 *  "animationStart" : function(evt) {
 *  },
 *  "animationEnd" : function(evt) {
 *  },
 *  "change" : function(evt) {
 *  }
 * });
 *
 * // 3. Initialize inputTypes
 * const panInputArea = new eg.Axes.PanInput("#area", {
 *  scale: [0.5, 1]
 * });
 * const panInputHmove = new eg.Axes.PanInput("#hmove");
 * const panInputVmove = new eg.Axes.PanInput("#vmove");
 * const pinchInputArea = new eg.Axes.PinchInput("#area", {
 *  scale: 1.5
 * });
 *
 * // 4. Connect eg.Axes and InputTypes
 * // [PanInput] When the mouse or touchscreen is down and moved.
 * // Connect the 'something2' axis to the mouse or touchscreen x position and
 * // connect the 'somethingN' axis to the mouse or touchscreen y position.
 * axes.connect(["something2", "somethingN"], panInputArea); // or axes.connect("something2 somethingN", panInputArea);
 *
 * // Connect only one 'something1' axis to the mouse or touchscreen x position.
 * axes.connect(["something1"], panInputHmove); // or axes.connect("something1", panInputHmove);
 *
 * // Connect only one 'something2' axis to the mouse or touchscreen y position.
 * axes.connect(["", "something2"], panInputVmove); // or axes.connect(" something2", panInputVmove);
 *
 * // [PinchInput] Connect 'something2' axis when two pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * axes.connect("something2", pinchInputArea);
 * ```
 */
@ReactiveSubscribe
class Axes extends Component<AxesEvents> {
  /**
   * @name VERSION
   * @desc Version info string
   * @ko 버전정보 문자열
   *
   * @constant
   * @type {String}
   * @example
   * ```js
   * eg.Axes.VERSION;  // ex) 3.3.3
   * ```
   */
  public static VERSION = "#__VERSION__#";
  /* eslint-disable */
  // for tree shaking
  public static PanInput;
  public static PinchInput;
  public static WheelInput;
  public static MoveKeyInput;
  public static RotatePanInput;
  /* eslint-enable */

  /**
   * @name TRANSFORM
   * @desc Returns the transform attribute with CSS vendor prefixes.
   * @ko CSS vendor prefixes를 붙인 transform 속성을 반환한다.
   *
   * @constant
   * @type {String}
   * @example
   * ```js
   * eg.Axes.TRANSFORM; // "transform" or "webkitTransform"
   * ```
   */
  public static TRANSFORM = TRANSFORM;
  /**
   * @name DIRECTION_NONE
   * @constant
   * @type {Number}
   */
  public static DIRECTION_NONE = DIRECTION_NONE;
  /**
   * @name DIRECTION_LEFT
   * @constant
   * @type {Number}
   */
  public static DIRECTION_LEFT = DIRECTION_LEFT;
  /**
   * @name DIRECTION_RIGHT
   * @constant
   * @type {Number}
   */
  public static DIRECTION_RIGHT = DIRECTION_RIGHT;
  /**
   * @name DIRECTION_UP
   * @constant
   * @type {Number}
   */
  public static DIRECTION_UP = DIRECTION_UP;
  /**
   * @name DIRECTION_DOWN
   * @constant
   * @type {Number}
   */
  public static DIRECTION_DOWN = DIRECTION_DOWN;
  /**
   * @name DIRECTION_HORIZONTAL
   * @constant
   * @type {Number}
   */
  public static DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL;
  /**
   * @name DIRECTION_VERTICAL
   * @constant
   * @type {Number}
   */
  public static DIRECTION_VERTICAL = DIRECTION_VERTICAL;
  /**
   * @name DIRECTION_ALL
   * @constant
   * @type {Number}
   */
  public static DIRECTION_ALL = DIRECTION_ALL;
  /**
   * @name Axes#holding
   * @desc Returns true if at least one input is in progress.
   * @ko 입력이 하나 이상 진행 중인지 여부를 반환한다.
   *
   * @readonly
   * @type {boolean}
   * @example
   * ```js
   * const axes = new eg.Axes({
   *  x: {
   *    range: [0, 100],
   *  },
   * });
   *
   * axes.holding
   * ```
   */
  @Computed
  public get holding() {
    return this.eventManager.holdingCount > 0;
  }

  public options: AxesOption;
  public eventManager: EventManager;
  public axisManager: AxisManager;
  public interruptManager: InterruptManager;
  public animationManager: AnimationManager;
  public inputObserver: InputObserver;
  private _inputs: InputType[] = [];

  /**
   *
   */
  public constructor(
    public axis: ObjectInterface<AxisOption> = {},
    options: AxesOption = {},
    startPos: Axis = {}
  ) {
    super();
    this.options = {
      ...{
        easing: (x) => {
          return 1 - Math.pow(1 - x, 3);
        },
        interruptable: true,
        maximumDuration: Infinity,
        minimumDuration: 0,
        deceleration: 0.0006,
        round: null,
        nested: false,
      },
      ...options,
    };
    Object.keys(startPos).forEach((key) => {
      this.axis[key].startPos = startPos[key];
    });

    this.interruptManager = new InterruptManager(this.options);
    this.axisManager = new AxisManager(this.axis);
    this.eventManager = new EventManager(this);
    this.animationManager = new EasingManager(this);
    this.inputObserver = new InputObserver(this);
    this.eventManager.setAnimationManager(this.animationManager);
    this.eventManager.triggerChange(this.axisManager.get());
  }

  /**
   * Connect the axis of eg.Axes to the inputType.
   * @ko eg.Axes의 축과 inputType을 연결한다
   * @param {(String[]|String)} axes The name of the axis to associate with inputType <ko>inputType과 연결할 축의 이름</ko>
   * @param {Object} inputType The inputType instance to associate with the axis of eg.Axes <ko>eg.Axes의 축과 연결할 inputType 인스턴스</ko>
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   }
   * });
   *
   * axes.connect("x", new eg.Axes.PanInput("#area1"))
   *    .connect("x xOther", new eg.Axes.PanInput("#area2"))
   *    .connect(" xOther", new eg.Axes.PanInput("#area3"))
   *    .connect(["x"], new eg.Axes.PanInput("#area4"))
   *    .connect(["xOther", "x"], new eg.Axes.PanInput("#area5"))
   *    .connect(["", "xOther"], new eg.Axes.PanInput("#area6"));
   * ```
   */
  public connect(axes: string[] | string, inputType: InputType) {
    let mapped: string[];
    if (typeof axes === "string") {
      mapped = axes.split(" ");
    } else {
      mapped = axes.concat();
    }

    // check same instance
    if (~this._inputs.indexOf(inputType)) {
      this.disconnect(inputType);
    }

    inputType.mapAxes(mapped);
    inputType.connect(this.inputObserver);
    this._inputs.push(inputType);
    return this;
  }

  /**
   * Disconnect the axis of eg.Axes from the inputType.
   * @ko eg.Axes의 축과 inputType의 연결을 끊는다.
   * @param {Object} [inputType] An inputType instance associated with the axis of eg.Axes <ko>eg.Axes의 축과 연결한 inputType 인스턴스</ko>
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   }
   * });
   *
   * const input1 = new eg.Axes.PanInput("#area1");
   * const input2 = new eg.Axes.PanInput("#area2");
   * const input3 = new eg.Axes.PanInput("#area3");
   *
   * axes.connect("x", input1);
   *    .connect("x xOther", input2)
   *    .connect(["xOther", "x"], input3);
   *
   * axes.disconnect(input1); // disconnects input1
   * axes.disconnect(); // disconnects all of them
   * ```
   */
  public disconnect(inputType?: InputType) {
    if (inputType) {
      const index = this._inputs.indexOf(inputType);

      if (index >= 0) {
        this._inputs[index].disconnect();
        this._inputs.splice(index, 1);
      }
    } else {
      this._inputs.forEach((v) => v.disconnect());
      this._inputs = [];
    }
    return this;
  }

  /**
   * Returns the current position of the coordinates.
   * @ko 좌표의 현재 위치를 반환한다
   * @param {Object} [axes] The names of the axis <ko>축 이름들</ko>
   * @return {Object.<string, number>} Axis coordinate information <ko>축 좌표 정보</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   },
   *    "zoom": {
   *      range: [50, 30]
   *   }
   * });
   *
   * axes.get(); // {"x": 0, "xOther": -100, "zoom": 50}
   * axes.get(["x", "zoom"]); // {"x": 0, "zoom": 50}
   * ```
   */
  public get(axes?: string[]) {
    return this.axisManager.get(axes);
  }

  /**
   * Moves an axis to specific coordinates.
   * @ko 좌표를 이동한다.
   * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
   * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   },
   *    "zoom": {
   *      range: [50, 30]
   *   }
   * });
   *
   * axes.setTo({"x": 30, "zoom": 60});
   * axes.get(); // {"x": 30, "xOther": -100, "zoom": 60}
   *
   * axes.setTo({"x": 100, "xOther": 60}, 1000); // animatation
   *
   * // after 1000 ms
   * axes.get(); // {"x": 100, "xOther": 60, "zoom": 60}
   * ```
   */
  public setTo(pos: Axis, duration = 0) {
    this.animationManager.setTo(pos, duration);
    return this;
  }

  /**
   * Moves an axis from the current coordinates to specific coordinates.
   * @ko 현재 좌표를 기준으로 좌표를 이동한다.
   * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
   * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   },
   *    "zoom": {
   *      range: [50, 30]
   *   }
   * });
   *
   * axes.setBy({"x": 30, "zoom": 10});
   * axes.get(); // {"x": 30, "xOther": -100, "zoom": 60}
   *
   * axes.setBy({"x": 70, "xOther": 60}, 1000); // animatation
   *
   * // after 1000 ms
   * axes.get(); // {"x": 100, "xOther": -40, "zoom": 60}
   * ```
   */
  public setBy(pos: Axis, duration = 0) {
    this.animationManager.setBy(pos, duration);
    return this;
  }

  /**
   * Change the options of Axes instance.
   * @ko 인스턴스의 옵션을 변경한다.
   * @param {AxesOption} options Axes options to change <ko>변경할 옵션 목록</ko>
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   * }, {
   *   round: 10,
   * });
   *
   * axes.setTo({"x": 48});
   * axes.get(); // {"x": 50}
   *
   * axes.setOptions({
   *   round: 1,
   * });
   *
   * axes.setTo({"x": 48});
   * axes.get(); // {"x": 48}
   * ```
   */
  public setOptions(options: AxesOption) {
    this.options = {
      ...this.options,
      ...options,
    };
    this.animationManager.setOptions(options);
    return this;
  }

  /**
   * Change the information of an existing axis.
   * @ko 존재하는 축의 정보를 변경한다.
   * @param {Object.<string, AxisOption>} axis Axis options to change <ko>변경할 축의 정보</ko>
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   * });
   *
   * axes.setTo({"x": 150});
   * axes.get(); // {"x": 100}
   *
   * axes.setAxis({
   *   "x": {
   *      range: [0, 200]
   *   },
   * });
   *
   * axes.setTo({"x": 150});
   * axes.get(); // {"x": 150}
   * ```
   */
  public setAxis(axis: ObjectInterface<AxisOption>) {
    this.axisManager.setAxis(axis);
    return this;
  }

  /**
   * Stop an animation in progress.
   * @ko 재생 중인 애니메이션을 정지한다.
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   * });
   *
   * axes.setTo({"x": 10}, 1000); // start animatation
   *
   * // after 500 ms
   * axes.stopAnimation(); // stop animation during movement.
   * ```
   */
  public stopAnimation() {
    this.animationManager.stopAnimation();
    this.animationManager.finish(false);
    return this;
  }

  /**
   * Change the destination of an animation in progress.
   * @ko 재생 중인 애니메이션의 목적지와 진행 시간을 변경한다.
   * @param {UpdateAnimationOption} pos The coordinate to move to <ko>이동할 좌표</ko>
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 200]
   *   },
   *   "y": {
   *      range: [0, 200]
   *   }
   * });
   *
   * axes.setTo({"x": 50, "y": 50}, 1000); // trigger animation by setTo
   *
   * // after 500 ms
   * axes.updateAnimation({destPos: {"x": 100, "y": 100}}); // animation will end after 500 ms, at {"x": 100, "y": 100}
   *
   * // after 500 ms
   * axes.setTo({"x": 50, "y": 50}, 1000); // trigger animation by setTo
   *
   * // after 700 ms
   * axes.updateAnimation({destPos: {"x": 100, "y": 100}, duration: 1500, restart: true}); // this works same as axes.setTo({"x": 100, "y": 100}, 800) since restart is true.
   * ```
   */
  public updateAnimation(options: UpdateAnimationOption) {
    this.animationManager.updateAnimation(options);
    return this;
  }

  /**
   * Returns whether there is a coordinate in the bounce area of ​​the target axis.
   * @ko 대상 축 중 bounce영역에 좌표가 존재하는지를 반환한다
   * @param {Object} [axes] The names of the axis <ko>축 이름들</ko>
   * @return {Boolen} Whether the bounce area exists. <ko>bounce 영역 존재 여부</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   },
   *    "zoom": {
   *      range: [50, 30]
   *   }
   * });
   *
   * axes.isBounceArea(["x"]);
   * axes.isBounceArea(["x", "zoom"]);
   * axes.isBounceArea();
   * ```
   */
  public isBounceArea(axes?: string[]) {
    return this.axisManager.isOutside(axes);
  }

  /**
   * Destroys properties, and events used in a module and disconnect all connections to inputTypes.
   * @ko 모듈에 사용한 속성, 이벤트를 해제한다. 모든 inputType과의 연결을 끊는다.
   */
  public destroy() {
    this.disconnect();
    this.eventManager.destroy();
  }
}

interface Axes
  extends AxesReactiveState,
    ReactiveSubscribe<AxesReactiveState> {}

export default Axes;

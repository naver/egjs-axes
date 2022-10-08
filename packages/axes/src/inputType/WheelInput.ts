/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { $, getDirection, useDirection } from "../utils";
import { ANY, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from "../const";
import { ElementType } from "../types";

import { toAxis, InputType, InputTypeObserver } from "./InputType";
import { isValidKey } from "../eventInput/EventInput";

export interface WheelInputOption {
  inputKey?: string[];
  scale?: number;
  releaseDelay?: number;
  useNormalized?: boolean;
  useAnimation?: boolean;
}

/**
 * @typedef {Object} WheelInputOption The option object of the eg.Axes.WheelInput module
 * @ko eg.Axes.WheelInput 모듈의 옵션 객체
 * @param {String[]} [inputKey=["any"]] List of key combinations to allow input
 * - any: any key
 * - shift: shift key
 * - ctrl: ctrl key and pinch gesture on the trackpad
 * - alt: alt key
 * - meta: meta key
 * - none: none of these keys are pressed <ko>입력을 허용할 키 조합 목록
 * - any: 아무 키
 * - shift: shift 키
 * - ctrl: ctrl 키 및 트랙패드의 pinch 제스쳐
 * - alt: alt 키
 * - meta: meta 키
 * - none: 아무 키도 눌리지 않은 상태 </ko>
 * @param {Number} [scale=1] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @param {Number} [releaseDelay=300] Millisecond that trigger release event after last input<ko>마지막 입력 이후 release 이벤트가 트리거되기까지의 밀리초</ko>
 * @param {Boolean} [useNormalized=true] Whether to calculate scroll speed the same in all browsers<ko>모든 브라우저에서 스크롤 속도를 동일하게 처리할지 여부</ko>
 * @param {Boolean} [useAnimation=false] Whether to process coordinate changes through the mouse wheel as a continuous animation<ko>마우스 휠을 통한 좌표 변화를 연속적인 애니메이션으로 처리할지 여부</ko>
 **/

/**
 * A module that passes the amount of change to eg.Axes when the mouse wheel is moved. use one axis.
 * @ko 마우스 휠이 움직일때의 변화량을 eg.Axes에 전달하는 모듈. 두개 이하의 축을 사용한다.
 *
 * @example
 * ```js
 * const wheel = new eg.Axes.WheelInput("#area", {
 *     scale: 1
 * });
 *
 * // Connect only one 'something1' axis to the vertical mouse wheel.
 * axes.connect(["something1"], wheel); // or axes.connect("something1", wheel);
 *
 * // Connect only one 'something2' axis to the horizontal mouse wheel.
 * axes.connect(["", "something2"], wheel); // or axes.connect(" something2", pan);
 *
 * // Connect the 'something1' axis to the vertical mouse wheel.
 * // Connect the 'something2' axis to the horizontal mouse wheel.
 * axes.connect(["something1", "something2"], wheel);
 * ```
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.WheelInput module <ko>eg.Axes.WheelInput 모듈을 사용할 엘리먼트</ko>
 * @param {WheelInputOption} [options] The option object of the eg.Axes.WheelInput module<ko>eg.Axes.WheelInput 모듈의 옵션 객체</ko>
 */
export class WheelInput implements InputType {
  public options: WheelInputOption;
  public axes: string[] = [];
  public element: HTMLElement = null;
  private _observer: InputTypeObserver;
  private _direction: number;
  private _enabled = false;
  private _holding = false;
  private _timer: NodeJS.Timeout = null;

  /**
   *
   */
  public constructor(el: ElementType, options?: WheelInputOption) {
    this.element = $(el);
    this.options = {
      inputKey: [ANY],
      scale: 1,
      releaseDelay: 300,
      useNormalized: true,
      useAnimation: false,
      ...options,
    };
    this._onWheel = this._onWheel.bind(this);
  }

  public mapAxes(axes: string[]) {
    // vertical mouse wheel is mapped into axes[0]
    this._direction = getDirection(!!axes[1], !!axes[0]);
    this.axes = axes;
  }

  public connect(observer: InputTypeObserver): InputType {
    this._detachEvent();
    this._attachEvent(observer);
    return this;
  }

  public disconnect() {
    this._detachEvent();
    return this;
  }

  /**
   * Destroys elements, properties, and events used in a module.
   * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
   */
  public destroy() {
    this.disconnect();
    this.element = null;
  }

  /**
   * Enables input devices
   * @ko 입력 장치를 사용할 수 있게 한다
   * @return {WheelInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */
  public enable() {
    this._enabled = true;
    return this;
  }

  /**
   * Disables input devices
   * @ko 입력 장치를 사용할 수 없게 한다.
   * @return {WheelInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */
  public disable() {
    this._enabled = false;
    return this;
  }

  /**
   * Returns whether to use an input device
   * @ko 입력 장치를 사용 여부를 반환한다.
   * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
   */
  public isEnabled() {
    return this._enabled;
  }

  private _onWheel(event: WheelEvent) {
    if (!this._enabled || !isValidKey(event, this.options.inputKey)) {
      return;
    }

    const offset = this._getOffset(
      [event.deltaY, event.deltaX],
      [
        useDirection(DIRECTION_VERTICAL, this._direction),
        useDirection(DIRECTION_HORIZONTAL, this._direction),
      ]
    );

    if (offset[0] === 0 && offset[1] === 0) {
      return;
    }
    event.preventDefault();

    if (!this._holding) {
      this._observer.hold(this, event);
      this._holding = true;
    }

    this._observer.change(
      this,
      event,
      toAxis(this.axes, offset),
      this.options.useAnimation
    );
    clearTimeout(this._timer);

    this._timer = setTimeout(() => {
      if (this._holding) {
        this._holding = false;
        this._observer.release(this, event, [0]);
      }
    }, this.options.releaseDelay);
  }

  private _getOffset(properties: number[], direction: boolean[]): number[] {
    const scale = this.options.scale;
    const useNormalized = this.options.useNormalized;
    return [
      direction[0] && properties[0]
        ? (properties[0] > 0 ? -1 : 1) *
          (useNormalized ? 1 : Math.abs(properties[0])) *
          scale
        : 0,
      direction[1] && properties[1]
        ? (properties[1] > 0 ? -1 : 1) *
          (useNormalized ? 1 : Math.abs(properties[1])) *
          scale
        : 0,
    ];
  }

  private _attachEvent(observer: InputTypeObserver) {
    const element = this.element;
    if (!element) {
      throw new Error("Element to connect input does not exist.");
    }
    this._observer = observer;
    element.addEventListener("wheel", this._onWheel);
    this._enabled = true;
  }

  private _detachEvent() {
    const element = this.element;
    if (element) {
      this.element.removeEventListener("wheel", this._onWheel);
    }
    this._enabled = false;
    this._observer = null;

    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }
}

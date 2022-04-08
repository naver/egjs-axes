import { $, setCssProps } from "../utils";
import { ActiveInput, InputEventType } from "../types";
import { PREVENT_SCROLL_CSSPROPS } from "../const";

import {
  toAxis,
  convertInputType,
  InputType,
  InputTypeObserver,
} from "./InputType";

export interface PinchInputOption {
  scale?: number;
  threshold?: number;
  inputType?: string[];
}

/**
 * @typedef {Object} PinchInputOption The option object of the eg.Axes.PinchInput module
 * @ko eg.Axes.PinchInput 모듈의 옵션 객체
 * @param {Number} [scale=1] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @param {Number} [threshold=0] Minimal scale before recognizing <ko>사용자의 Pinch 동작을 인식하기 위해산 최소한의 배율</ko>
 **/

/**
 * A module that passes the amount of change to eg.Axes when two pointers are moving toward (zoom-in) or away from each other (zoom-out). use one axis.
 * @ko 2개의 pointer를 이용하여 zoom-in하거나 zoom-out 하는 동작의 변화량을 eg.Axes에 전달하는 모듈. 한 개 의 축을 사용한다.
 * @example
 * ```js
 * const pinch = new eg.Axes.PinchInput("#area", {
 * 		scale: 1
 * });
 *
 * // Connect 'something' axis when two pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * axes.connect("something", pinch);
 * ```
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.PinchInput module <ko>eg.Axes.PinchInput 모듈을 사용할 엘리먼트</ko>
 * @param {PinchInputOption} [options] The option object of the eg.Axes.PinchInput module<ko>eg.Axes.PinchInput 모듈의 옵션 객체</ko>
 */
export class PinchInput implements InputType {
  public options: PinchInputOption;
  public axes: string[] = [];
  public element: HTMLElement = null;
  private _observer: InputTypeObserver;
  private _pinchFlag = false;
  private _enabled = false;
  private _originalCssProps: { [key: string]: string };
  private _activeInput: ActiveInput = null;
  private _baseValue: number;

  /**
   *
   */
  public constructor(el: string | HTMLElement, options?: PinchInputOption) {
    this.element = $(el);
    this.options = {
      scale: 1,
      threshold: 0,
      inputType: ["touch", "pointer"],
      ...options,
    };
    this._onPinchStart = this._onPinchStart.bind(this);
    this._onPinchMove = this._onPinchMove.bind(this);
    this._onPinchEnd = this._onPinchEnd.bind(this);
  }

  public mapAxes(axes: string[]) {
    this.axes = axes;
  }

  public connect(observer: InputTypeObserver): InputType {
    if (this._activeInput) {
      this._detachEvent();
    }
    this._attachEvent(observer);
    this._originalCssProps = setCssProps(this.element);
    return this;
  }

  public disconnect() {
    this._detachEvent();
    if (this._originalCssProps !== PREVENT_SCROLL_CSSPROPS) {
      setCssProps(this.element, this._originalCssProps);
    }
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
   * @return {PinchInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */
  public enable() {
    this._enabled = true;
    return this;
  }

  /**
   * Disables input devices
   * @ko 입력 장치를 사용할 수 없게 한다.
   * @return {PinchInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
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

  private _onPinchStart(event: InputEventType) {
    this._activeInput.onEventStart(event);
    if (!this._enabled || this._activeInput.getTouches(event) !== 2) {
      return;
    }

    this._baseValue = this._observer.get(this)[this.axes[0]];
    this._observer.hold(this, event);
    this._pinchFlag = true;
    const pinchEvent = this._activeInput.extendEvent(event);
    this._activeInput.prevEvent = pinchEvent;
  }

  private _onPinchMove(event: InputEventType) {
    this._activeInput.onEventMove(event);
    if (
      !this._pinchFlag ||
      !this._enabled ||
      this._activeInput.getTouches(event) !== 2
    ) {
      return;
    }

    const pinchEvent = this._activeInput.extendEvent(event);
    const offset = this._getOffset(
      pinchEvent.scale,
      this._activeInput.prevEvent.scale
    );
    this._observer.change(this, event, toAxis(this.axes, [offset]));
    this._activeInput.prevEvent = pinchEvent;
  }

  private _onPinchEnd(event: InputEventType) {
    this._activeInput.onEventEnd(event);
    if (
      !this._pinchFlag ||
      !this._enabled ||
      this._activeInput.getTouches(event) > 2
    ) {
      return;
    }

    this._observer.release(this, event, [0], 0);
    this._baseValue = null;
    this._pinchFlag = false;
    this._activeInput.prevEvent = null;
  }

  private _attachEvent(observer: InputTypeObserver) {
    const activeInput = convertInputType(this.options.inputType);
    if (!activeInput) {
      throw new Error(
        "There is currently no inputType available for current device. There must be at least one available inputType."
      );
    }
    this._observer = observer;
    this._enabled = true;
    this._activeInput = activeInput;
    activeInput?.start.forEach((event) => {
      this.element.addEventListener(event, this._onPinchStart, false);
    });
    activeInput?.move.forEach((event) => {
      this.element.addEventListener(event, this._onPinchMove, false);
    });
    activeInput?.end.forEach((event) => {
      this.element.addEventListener(event, this._onPinchEnd, false);
    });
  }

  private _detachEvent() {
    const activeInput = this._activeInput;
    activeInput?.start.forEach((event) => {
      this.element.removeEventListener(event, this._onPinchStart, false);
    });
    activeInput?.move.forEach((event) => {
      this.element.removeEventListener(event, this._onPinchMove, false);
    });
    activeInput?.end.forEach((event) => {
      this.element.removeEventListener(event, this._onPinchEnd, false);
    });
    this._enabled = false;
    this._observer = null;
  }

  private _getOffset(pinchScale: number, prev: number = 1): number {
    return this._baseValue * (pinchScale - prev) * this.options.scale;
  }
}

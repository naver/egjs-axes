import { $ } from "../utils";

import { toAxis, InputType, InputTypeObserver } from "./InputType";

export interface WheelInputOption {
  scale?: number;
  releaseDelay?: number;
  useNormalized?: boolean;
}

/**
 * @typedef {Object} WheelInputOption The option object of the eg.Axes.WheelInput module
 * @ko eg.Axes.WheelInput 모듈의 옵션 객체
 * @param {Number} [scale=1] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @param {Number} [releaseDelay=300] Millisecond that trigger release event after last input<ko>마지막 입력 이후 release 이벤트가 트리거되기까지의 밀리초</ko>
 **/

/**
 * A module that passes the amount of change to eg.Axes when the mouse wheel is moved. use one axis.
 * @ko 마우스 휠이 움직일때의 변화량을 eg.Axes에 전달하는 모듈. 한 개 의 축을 사용한다.
 *
 * @example
 * ```js
 * const wheel = new eg.Axes.WheelInput("#area", {
 * 		scale: 1
 * });
 *
 * // Connect 'something' axis when the mousewheel is moved.
 * axes.connect("something", wheel);
 * ```
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.WheelInput module <ko>eg.Axes.WheelInput 모듈을 사용할 엘리먼트</ko>
 * @param {WheelInputOption} [options] The option object of the eg.Axes.WheelInput module<ko>eg.Axes.WheelInput 모듈의 옵션 객체</ko>
 */
export class WheelInput implements InputType {
  public options: WheelInputOption;
  public axes: string[] = [];
  public element: HTMLElement = null;
  private _observer: InputTypeObserver;
  private _enabled = false;
  private _holding = false;
  private _timer: NodeJS.Timeout = null;

  /**
   *
   */
  public constructor(el, options?: WheelInputOption) {
    this.element = $(el);
    this.options = {
      ...{
        scale: 1,
        releaseDelay: 300,
        useNormalized: true,
      },
      ...options,
    };
    this._onWheel = this._onWheel.bind(this);
  }

  public mapAxes(axes: string[]) {
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
    if (!this._enabled) {
      return;
    }
    event.preventDefault();

    if (event.deltaY === 0) {
      return;
    }

    if (!this._holding) {
      this._observer.hold(this, event);
      this._holding = true;
    }
    const offset =
      (event.deltaY > 0 ? -1 : 1) *
      this.options.scale *
      (this.options.useNormalized ? 1 : Math.abs(event.deltaY));
    this._observer.change(this, event, toAxis(this.axes, [offset]), true);
    clearTimeout(this._timer);

    this._timer = setTimeout(() => {
      if (this._holding) {
        this._holding = false;
        this._observer.release(this, event, [0]);
      }
    }, this.options.releaseDelay);
  }

  private _attachEvent(observer: InputTypeObserver) {
    this._observer = observer;
    this.element.addEventListener("wheel", this._onWheel);
    this._enabled = true;
  }

  private _detachEvent() {
    this.element.removeEventListener("wheel", this._onWheel);
    this._enabled = false;
    this._observer = null;

    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }
}

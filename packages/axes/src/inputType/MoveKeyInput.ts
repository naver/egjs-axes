/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ElementType } from "../types";
import { $ } from "../utils";

import { toAxis, InputType, InputTypeObserver } from "./InputType";

export const KEY_LEFT_ARROW = 37;
export const KEY_A = 65;
export const KEY_UP_ARROW = 38;
export const KEY_W = 87;
export const KEY_RIGHT_ARROW = 39;
export const KEY_D = 68;
export const KEY_DOWN_ARROW = 40;
export const KEY_S = 83;

/* eslint-disable */
const DIRECTION_REVERSE = -1;
const DIRECTION_FORWARD = 1;
const DIRECTION_HORIZONTAL = -1;
const DIRECTION_VERTICAL = 1;
const DELAY = 80;
/* eslint-enable */

export interface MoveKeyInputOption {
  scale?: number[];
}

/**
 * @typedef {Object} MoveKeyInputOption The option object of the eg.Axes.MoveKeyInput module
 * @ko eg.Axes.MoveKeyInput 모듈의 옵션 객체
 * @param {Array<Number>} [scale] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @param {Number} [scale[0]=1] Coordinate scale for the first axis<ko>첫번째 축의 배율</ko>
 * @param {Number} [scale[1]=1] Coordinate scale for the decond axis<ko>두번째 축의 배율</ko>
 **/

/**
 * A module that passes the amount of change to eg.Axes when the move key stroke is occured. use two axis.
 * @ko 이동키 입력이 발생했을 때의 변화량을 eg.Axes에 전달하는 모듈. 두 개 의 축을 사용한다.
 *
 * @example
 * ```js
 * const moveKey = new eg.Axes.MoveKeyInput("#area", {
 *     scale: [1, 1]
 * });
 *
 * // Connect 'x', 'y' axes when the moveKey is pressed.
 * axes.connect(["x", "y"], moveKey);
 * ```
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.MoveKeyInput module <ko>eg.Axes.MoveKeyInput 모듈을 사용할 엘리먼트</ko>
 * @param {MoveKeyInputOption} [options] The option object of the eg.Axes.MoveKeyInput module<ko>eg.Axes.MoveKeyInput 모듈의 옵션 객체</ko>
 */
export class MoveKeyInput implements InputType {
  public options: MoveKeyInputOption;
  public axes: string[] = [];
  public element: HTMLElement = null;
  private _observer: InputTypeObserver;
  private _enabled = false;
  private _holding = false;
  private _timer: NodeJS.Timeout = null;

  /**
   *
   */
  public constructor(el: ElementType, options?: MoveKeyInputOption) {
    this.element = $(el);
    this.options = {
      ...{
        scale: [1, 1],
      },
      ...options,
    };
    this._onKeydown = this._onKeydown.bind(this);
    this._onKeyup = this._onKeyup.bind(this);
  }

  public mapAxes(axes: string[]) {
    this.axes = axes;
  }

  public connect(observer: InputTypeObserver): InputType {
    this._detachEvent();

    // add tabindex="0" to the container for making it focusable
    if (this.element.getAttribute("tabindex") !== "0") {
      this.element.setAttribute("tabindex", "0");
    }

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
   * @return {MoveKeyInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */
  public enable() {
    this._enabled = true;
    return this;
  }

  /**
   * Disables input devices
   * @ko 입력 장치를 사용할 수 없게 한다.
   * @return {MoveKeyInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
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

  private _onKeydown(event: KeyboardEvent) {
    if (!this._enabled) {
      return;
    }

    let isMoveKey = true;
    let direction = DIRECTION_FORWARD;
    let move = DIRECTION_HORIZONTAL;

    switch (event.keyCode) {
      case KEY_LEFT_ARROW:
      case KEY_A:
        direction = DIRECTION_REVERSE;
        break;
      case KEY_RIGHT_ARROW:
      case KEY_D:
        break;
      case KEY_DOWN_ARROW:
      case KEY_S:
        direction = DIRECTION_REVERSE;
        move = DIRECTION_VERTICAL;
        break;
      case KEY_UP_ARROW:
      case KEY_W:
        move = DIRECTION_VERTICAL;
        break;
      default:
        isMoveKey = false;
    }
    if (
      (move === DIRECTION_HORIZONTAL && !this.axes[0]) ||
      (move === DIRECTION_VERTICAL && !this.axes[1])
    ) {
      isMoveKey = false;
    }
    if (!isMoveKey) {
      return;
    }
    event.preventDefault();
    const offsets =
      move === DIRECTION_HORIZONTAL
        ? [+this.options.scale[0] * direction, 0]
        : [0, +this.options.scale[1] * direction];

    if (!this._holding) {
      this._observer.hold(this, event);
      this._holding = true;
    }
    clearTimeout(this._timer);
    this._observer.change(this, event, toAxis(this.axes, offsets));
  }

  private _onKeyup(event: KeyboardEvent) {
    if (!this._holding) {
      return;
    }
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this._observer.release(this, event, [0, 0]);
      this._holding = false;
    }, DELAY);
  }

  private _attachEvent(observer: InputTypeObserver) {
    const element = this.element;
    if (!element) {
      throw new Error("Element to connect input does not exist.");
    }
    this._observer = observer;
    element.addEventListener("keydown", this._onKeydown, false);
    element.addEventListener("keypress", this._onKeydown, false);
    element.addEventListener("keyup", this._onKeyup, false);
    this._enabled = true;
  }

  private _detachEvent() {
    const element = this.element;
    if (element) {
      element.removeEventListener("keydown", this._onKeydown, false);
      element.removeEventListener("keypress", this._onKeydown, false);
      element.removeEventListener("keyup", this._onKeyup, false);
    }
    this._enabled = false;
    this._observer = null;
  }
}

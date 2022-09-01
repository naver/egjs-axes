/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { $, isCssPropsFromAxes, setCssProps, revertCssProps } from "../utils";
import { ActiveEvent, ElementType, InputEventType } from "../types";
import { DIRECTION_ALL } from "../const";

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
  touchAction?: string;
}

/**
 * @typedef {Object} PinchInputOption The option object of the eg.Axes.PinchInput module
 * @ko eg.Axes.PinchInput 모듈의 옵션 객체
 * @param {Number} [scale=1] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @param {Number} [threshold=0] Minimal scale before recognizing <ko>사용자의 Pinch 동작을 인식하기 위해산 최소한의 배율</ko>
 * @param {String[]} [inputType=["touch", "pointer"]] Types of input devices
 * - touch: Touch screen
 * - pointer: Mouse and touch <ko>입력 장치 종류
 * - touch: 터치 입력 장치
 * - pointer: 마우스 및 터치</ko>
 * @param {String} [touchAction="none"] Value that overrides the element's "touch-action" css property. It is set to "none" to prevent scrolling during touch. <ko>엘리먼트의 "touch-action" CSS 속성을 덮어쓰는 값. 터치 도중 스크롤을 방지하기 위해 "none" 으로 설정되어 있다.</ko>
 **/

/**
 * A module that passes the amount of change to eg.Axes when two pointers are moving toward (zoom-in) or away from each other (zoom-out). use one axis.
 * @ko 2개의 pointer를 이용하여 zoom-in하거나 zoom-out 하는 동작의 변화량을 eg.Axes에 전달하는 모듈. 한 개 의 축을 사용한다.
 * @example
 * ```js
 * const pinch = new eg.Axes.PinchInput("#area", {
 *   scale: 1
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
  private _activeEvent: ActiveEvent = null;
  private _baseValue: number;
  private _isOverThreshold = false;

  /**
   *
   */
  public constructor(el: ElementType, options?: PinchInputOption) {
    this.element = $(el);
    this.options = {
      scale: 1,
      threshold: 0,
      inputType: ["touch", "pointer"],
      touchAction: "none",
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
    if (this._activeEvent) {
      this._detachEvent();
    }
    this._attachEvent(observer);
    this._originalCssProps = setCssProps(
      this.element,
      this.options,
      DIRECTION_ALL
    );
    return this;
  }

  public disconnect() {
    this._detachEvent();
    if (!isCssPropsFromAxes(this._originalCssProps)) {
      revertCssProps(this.element, this._originalCssProps);
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
    const activeEvent = this._activeEvent;
    const pinchEvent = activeEvent.onEventStart(event);
    if (!pinchEvent || !this._enabled || activeEvent.getTouches(event) !== 2) {
      return;
    }

    this._baseValue = this._observer.get(this)[this.axes[0]];
    this._observer.hold(this, event);
    this._pinchFlag = true;
    this._isOverThreshold = false;
    activeEvent.prevEvent = pinchEvent;
  }

  private _onPinchMove(event: InputEventType) {
    const threshold = this.options.threshold;
    const activeEvent = this._activeEvent;
    const pinchEvent = activeEvent.onEventMove(event);
    if (
      !pinchEvent ||
      !this._pinchFlag ||
      !this._enabled ||
      activeEvent.getTouches(event) !== 2
    ) {
      return;
    }

    const distance = this._getDistance(pinchEvent.scale);
    const offset = this._getOffset(
      pinchEvent.scale,
      activeEvent.prevEvent.scale
    );

    if (this._isOverThreshold || distance >= threshold) {
      this._isOverThreshold = true;
      this._observer.change(this, event, toAxis(this.axes, [offset]));
    }
    activeEvent.prevEvent = pinchEvent;
  }

  private _onPinchEnd(event: InputEventType) {
    const activeEvent = this._activeEvent;
    activeEvent.onEventEnd(event);
    if (
      !this._pinchFlag ||
      !this._enabled ||
      activeEvent.getTouches(event) >= 2
    ) {
      return;
    }

    activeEvent.onRelease();
    this._observer.release(this, event, [0], 0);
    this._baseValue = null;
    this._pinchFlag = false;
  }

  private _attachEvent(observer: InputTypeObserver) {
    const activeEvent = convertInputType(this.options.inputType);
    const element = this.element;
    if (!activeEvent) {
      return;
    }
    if (!element) {
      throw new Error("Element to connect input does not exist.");
    }
    this._observer = observer;
    this._enabled = true;
    this._activeEvent = activeEvent;
    activeEvent.start.forEach((event) => {
      element.addEventListener(event, this._onPinchStart, false);
    });
    activeEvent.move.forEach((event) => {
      element.addEventListener(event, this._onPinchMove, false);
    });
    activeEvent.end.forEach((event) => {
      element.addEventListener(event, this._onPinchEnd, false);
    });
  }

  private _detachEvent() {
    const activeEvent = this._activeEvent;
    const element = this.element;
    if (element) {
      activeEvent?.start.forEach((event) => {
        element.removeEventListener(event, this._onPinchStart, false);
      });
      activeEvent?.move.forEach((event) => {
        element.removeEventListener(event, this._onPinchMove, false);
      });
      activeEvent?.end.forEach((event) => {
        element.removeEventListener(event, this._onPinchEnd, false);
      });
    }
    this._enabled = false;
    this._observer = null;
  }

  private _getOffset(pinchScale: number, prev: number = 1): number {
    return this._baseValue * (pinchScale - prev) * this.options.scale;
  }

  private _getDistance(pinchScale: number): number {
    return Math.abs(pinchScale - 1);
  }
}

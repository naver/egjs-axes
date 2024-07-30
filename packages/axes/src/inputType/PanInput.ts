/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable @typescript-eslint/no-empty-function */

import {
  $,
  isCssPropsFromAxes,
  setCssProps,
  revertCssProps,
  useDirection,
  getDirection,
} from "../utils";
import {
  IS_IOS_SAFARI,
  IOS_EDGE_THRESHOLD,
  DIRECTION_NONE,
  DIRECTION_VERTICAL,
  DIRECTION_HORIZONTAL,
  MOUSE_LEFT,
  ANY,
} from "../const";
import { ActiveEvent, ElementType, InputEventType } from "../types";

import {
  convertInputType,
  getAddEventOptions,
  InputType,
  InputTypeObserver,
  toAxis,
} from "./InputType";

export interface PanInputOption {
  inputType?: string[];
  inputKey?: string[];
  inputButton?: string[];
  scale?: number[];
  thresholdAngle?: number;
  threshold?: number;
  preventClickOnDrag?: boolean;
  preventDefaultOnDrag?: boolean;
  iOSEdgeSwipeThreshold?: number;
  releaseOnScroll?: boolean;
  touchAction?: string;
}

// get user's direction
export const getDirectionByAngle = (
  angle: number,
  thresholdAngle: number
): number => {
  if (thresholdAngle < 0 || thresholdAngle > 90) {
    return DIRECTION_NONE;
  }
  const toAngle = Math.abs(angle);

  return toAngle > thresholdAngle && toAngle < 180 - thresholdAngle
    ? DIRECTION_VERTICAL
    : DIRECTION_HORIZONTAL;
};

/**
 * @typedef {Object} PanInputOption The option object of the eg.Axes.PanInput module.
 * @ko eg.Axes.PanInput 모듈의 옵션 객체
 * @param {String[]} [inputType=["touch", "mouse", "pointer"]] Types of input devices
 * - touch: Touch screen
 * - mouse: Mouse
 * - pointer: Mouse and touch <ko>입력 장치 종류
 * - touch: 터치 입력 장치
 * - mouse: 마우스
 * - pointer: 마우스 및 터치</ko>
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
 * @param {String[]} [inputButton=["left"]] List of buttons to allow input
 * - left: Left mouse button and normal touch
 * - middle: Mouse wheel press
 * - right: Right mouse button <ko>입력을 허용할 버튼 목록
 * - left: 마우스 왼쪽 버튼
 * - middle: 마우스 휠 눌림
 * - right: 마우스 오른쪽 버튼 </ko>
 * @param {Number[]} [scale] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @param {Number} [scale[0]=1] horizontal axis scale <ko>수평축 배율</ko>
 * @param {Number} [scale[1]=1] vertical axis scale <ko>수직축 배율</ko>
 * @param {Number} [thresholdAngle=45] The threshold value that determines whether user action is horizontal or vertical (0~90) <ko>사용자의 동작이 가로 방향인지 세로 방향인지 판단하는 기준 각도(0~90)</ko>
 * @param {Number} [threshold=0] Minimal pan distance required before recognizing <ko>사용자의 Pan 동작을 인식하기 위해산 최소한의 거리</ko>
 * @param {Boolean} [preventClickOnDrag=false] Whether to cancel the {@link https://developer.mozilla.org/en/docs/Web/API/Element/click_event click} event when the user finishes dragging more than 1 pixel <ko>사용자가 1픽셀 이상 드래그를 마쳤을 때 {@link https://developer.mozilla.org/ko/docs/Web/API/Element/click_event click} 이벤트 취소 여부</ko>
 * @param {Boolean} [preventDefaultOnDrag=false] Whether to use the {@link https://developer.mozilla.org/ko/docs/Web/API/Event/preventDefault preventDefault} when the user starts dragging <ko>사용자가 드래그를 시작할 때 {@link https://developer.mozilla.org/ko/docs/Web/API/Event/preventDefault preventDefault} 실행 여부</ko>
 * @param {Number} [iOSEdgeSwipeThreshold=30] Area (px) that can go to the next page when swiping the right edge in iOS safari <ko>iOS Safari에서 오른쪽 엣지를 스와이프 하는 경우 다음 페이지로 넘어갈 수 있는 영역(px)</ko>
 * @param {String} [touchAction=null] Value that overrides the element's "touch-action" css property. If set to null, it is automatically set to prevent scrolling in the direction of the connected axis. <ko>엘리먼트의 "touch-action" CSS 속성을 덮어쓰는 값. 만약 null로 설정된 경우, 연결된 축 방향으로의 스크롤을 방지하게끔 자동으로 설정된다.</ko>
 **/
/**
 * A module that passes the amount of change to eg.Axes when the mouse or touchscreen is down and moved. use less than two axes.
 * @ko 마우스나 터치 스크린을 누르고 움직일때의 변화량을 eg.Axes에 전달하는 모듈. 두개 이하의 축을 사용한다.
 *
 * @example
 * ```js
 * const pan = new eg.Axes.PanInput("#area", {
 *     inputType: ["touch"],
 *     scale: [1, 1.3],
 * });
 *
 * // Connect the 'something2' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.
 * // Connect the 'somethingN' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.
 * axes.connect(["something2", "somethingN"], pan); // or axes.connect("something2 somethingN", pan);
 *
 * // Connect only one 'something1' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.
 * axes.connect(["something1"], pan); // or axes.connect("something1", pan);
 *
 * // Connect only one 'something2' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.
 * axes.connect(["", "something2"], pan); // or axes.connect(" something2", pan);
 * ```
 * @param {String|HTMLElement|Ref<HTMLElement>|jQuery} element An element to use the eg.Axes.PanInput module <ko>eg.Axes.PanInput 모듈을 사용할 엘리먼트</ko>
 * @param {PanInputOption} [options={}] The option object of the eg.Axes.PanInput module<ko>eg.Axes.PanInput 모듈의 옵션 객체</ko>
 */
export class PanInput implements InputType {
  public options: PanInputOption;
  public axes: string[] = [];
  public element: HTMLElement = null;
  protected _observer: InputTypeObserver;
  protected _direction: number;
  protected _enabled = false;
  protected _activeEvent: ActiveEvent = null;
  private _originalCssProps: { [key: string]: string };
  private _atRightEdge = false;
  private _rightEdgeTimer = 0;
  private _dragged = false;
  private _isOverThreshold = false;

  /**
   *
   */
  public constructor(el: ElementType, options?: PanInputOption) {
    this.element = $(el);
    this.options = {
      inputType: ["touch", "mouse", "pointer"],
      inputKey: [ANY],
      inputButton: [MOUSE_LEFT],
      scale: [1, 1],
      thresholdAngle: 45,
      threshold: 0,
      preventClickOnDrag: false,
      preventDefaultOnDrag: false,
      iOSEdgeSwipeThreshold: IOS_EDGE_THRESHOLD,
      releaseOnScroll: false,
      touchAction: null,
      ...options,
    };
    this._onPanstart = this._onPanstart.bind(this);
    this._onPanmove = this._onPanmove.bind(this);
    this._onPanend = this._onPanend.bind(this);
  }

  public mapAxes(axes: string[]) {
    this._direction = getDirection(!!axes[0], !!axes[1]);
    this.axes = axes;
  }

  public connect(observer: InputTypeObserver): InputType {
    if (this._activeEvent) {
      this._detachElementEvent();
      this._detachWindowEvent(this._activeEvent);
    }
    this._attachElementEvent(observer);
    return this;
  }

  public disconnect() {
    this._detachElementEvent();
    this._detachWindowEvent(this._activeEvent);
    this._direction = DIRECTION_NONE;
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
   * @return {PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */
  public enable() {
    if (!this._enabled) {
      this._enabled = true;
      this._originalCssProps = setCssProps(
        this.element,
        this.options,
        this._direction
      );
    }
    return this;
  }

  /**
   * Disables input devices
   * @ko 입력 장치를 사용할 수 없게 한다.
   * @return {PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */
  public disable() {
    if (this._enabled) {
      this._enabled = false;
      if (!isCssPropsFromAxes(this._originalCssProps)) {
        revertCssProps(this.element, this._originalCssProps);
      }
    }
    return this;
  }

  /**
   * Returns whether to use an input device
   * @ko 입력 장치 사용 여부를 반환한다.
   * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
   */
  public isEnabled() {
    return this._enabled;
  }

  /**
   * Releases current user input.
   * @ko 사용자의 입력을 강제로 중단시킨다.
   * @return {PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */
  public release() {
    const activeEvent = this._activeEvent;
    const prevEvent = activeEvent.prevEvent;
    activeEvent.onRelease();
    this._observer.release(this, prevEvent, [0, 0]);
    this._detachWindowEvent(activeEvent);
    return this;
  }

  protected _onPanstart(event: InputEventType) {
    const { inputKey, inputButton, preventDefaultOnDrag } = this.options;
    const activeEvent = this._activeEvent;
    const panEvent = activeEvent.onEventStart(event, inputKey, inputButton);
    if (
      !panEvent ||
      !this._enabled ||
      activeEvent.getTouches(event, inputButton) > 1
    ) {
      return;
    }
    if (panEvent.srcEvent.cancelable !== false) {
      const edgeThreshold = this.options.iOSEdgeSwipeThreshold;

      this._dragged = false;
      this._isOverThreshold = false;
      this._observer.hold(this, panEvent);
      this._atRightEdge =
        IS_IOS_SAFARI && panEvent.center.x > window.innerWidth - edgeThreshold;
      this._attachWindowEvent(activeEvent);
      (preventDefaultOnDrag && panEvent.srcEvent.type !== "touchstart") && panEvent.srcEvent.preventDefault();
      activeEvent.prevEvent = panEvent;
    }
  }

  protected _onPanmove(event: InputEventType) {
    const {
      iOSEdgeSwipeThreshold,
      preventClickOnDrag,
      releaseOnScroll,
      inputKey,
      inputButton,
      threshold,
      thresholdAngle,
    } = this.options;
    const activeEvent = this._activeEvent;
    const panEvent = activeEvent.onEventMove(event, inputKey, inputButton);
    const touches = activeEvent.getTouches(event, inputButton);

    if (
      touches === 0 ||
      (releaseOnScroll && panEvent && !panEvent.srcEvent.cancelable)
    ) {
      this._onPanend(event);
      return;
    }

    if (!panEvent || !this._enabled || touches > 1) {
      return;
    }

    const userDirection = getDirectionByAngle(panEvent.angle, thresholdAngle);
    const useHorizontal = useDirection(
      DIRECTION_HORIZONTAL,
      this._direction,
      userDirection
    );
    const useVertical = useDirection(
      DIRECTION_VERTICAL,
      this._direction,
      userDirection
    );

    if (activeEvent.prevEvent && IS_IOS_SAFARI) {
      const swipeLeftToRight = panEvent.center.x < 0;

      if (swipeLeftToRight) {
        // iOS swipe left => right
        this.release();
        return;
      } else if (this._atRightEdge) {
        clearTimeout(this._rightEdgeTimer);

        // - is right to left
        const swipeRightToLeft = panEvent.deltaX < -iOSEdgeSwipeThreshold;

        if (swipeRightToLeft) {
          this._atRightEdge = false;
        } else {
          // iOS swipe right => left
          this._rightEdgeTimer = window.setTimeout(() => this.release(), 100);
        }
      }
    }
    const distance = this._getDistance(
      [panEvent.deltaX, panEvent.deltaY],
      [useHorizontal, useVertical]
    );
    const offset = this._getOffset(
      [panEvent.offsetX, panEvent.offsetY],
      [useHorizontal, useVertical]
    );
    const prevent = offset.some((v) => v !== 0);

    if (prevent) {
      if (panEvent.srcEvent.cancelable !== false) {
        panEvent.srcEvent.preventDefault();
      }
      panEvent.srcEvent.stopPropagation();
    }
    panEvent.preventSystemEvent = prevent;
    if (prevent && (this._isOverThreshold || distance >= threshold)) {
      this._dragged = preventClickOnDrag;
      this._isOverThreshold = true;
      this._observer.change(this, panEvent, toAxis(this.axes, offset));
    }
    activeEvent.prevEvent = panEvent;
  }

  protected _onPanend(event: InputEventType) {
    const inputButton = this.options.inputButton;
    const activeEvent = this._activeEvent;
    activeEvent.onEventEnd(event);
    if (!this._enabled || activeEvent.getTouches(event, inputButton) !== 0) {
      return;
    }
    this._detachWindowEvent(activeEvent);
    clearTimeout(this._rightEdgeTimer);
    const prevEvent = activeEvent.prevEvent;
    const velocity = this._isOverThreshold ? this._getOffset(
      [
        Math.abs(prevEvent.velocityX) * (prevEvent.offsetX < 0 ? -1 : 1),
        Math.abs(prevEvent.velocityY) * (prevEvent.offsetY < 0 ? -1 : 1),
      ],
      [
        useDirection(DIRECTION_HORIZONTAL, this._direction),
        useDirection(DIRECTION_VERTICAL, this._direction),
      ]
    ) : [0, 0];
    activeEvent.onRelease();
    this._observer.release(this, prevEvent, velocity);
  }

  protected _attachWindowEvent(activeEvent: ActiveEvent) {
    activeEvent?.move.forEach((event) => {
      window.addEventListener(event, this._onPanmove, getAddEventOptions(event));
    });
    activeEvent?.end.forEach((event) => {
      window.addEventListener(event, this._onPanend, getAddEventOptions(event));
    });
  }

  protected _detachWindowEvent(activeEvent: ActiveEvent) {
    activeEvent?.move.forEach((event) => {
      window.removeEventListener(event, this._onPanmove);
    });
    activeEvent?.end.forEach((event) => {
      window.removeEventListener(event, this._onPanend);
    });
  }

  protected _getOffset(properties: number[], direction: boolean[]): number[] {
    const scale = this.options.scale;
    return [
      direction[0] ? properties[0] * scale[0] : 0,
      direction[1] ? properties[1] * scale[1] : 0,
    ];
  }

  private _getDistance(delta: number[], direction: boolean[]): number {
    return Math.sqrt(
      Number(direction[0]) * Math.pow(delta[0], 2) +
        Number(direction[1]) * Math.pow(delta[1], 2)
    );
  }

  private _attachElementEvent(observer: InputTypeObserver) {
    const activeEvent = convertInputType(this.options.inputType);
    const element = this.element;
    if (!activeEvent) {
      return;
    }
    if (!element) {
      throw new Error("Element to connect input does not exist.");
    }
    this._observer = observer;
    this.enable();
    this._activeEvent = activeEvent;
    element.addEventListener("click", this._preventClickWhenDragged, true);
    activeEvent.start.forEach((event) => {
      element.addEventListener(event, this._onPanstart);
    });
    // adding event listener to element prevents invalid behavior in iOS Safari
    activeEvent.move.forEach((event) => {
      element.addEventListener(event, this._voidFunction);
    });
  }

  private _detachElementEvent() {
    const activeEvent = this._activeEvent;
    const element = this.element;
    if (element) {
      element.removeEventListener("click", this._preventClickWhenDragged, true);
      activeEvent?.start.forEach((event) => {
        element.removeEventListener(event, this._onPanstart);
      });
      activeEvent?.move.forEach((event) => {
        element.removeEventListener(event, this._voidFunction);
      });
    }
    this.disable();
    this._observer = null;
  }

  private _preventClickWhenDragged = (e: PointerEvent | MouseEvent) => {
    if (this._dragged) {
      e.preventDefault();
      e.stopPropagation();
    }
    this._dragged = false;
  };

  private _voidFunction = () => {};
}

import { $, setCssProps } from "../utils";
import {
  IS_IOS_SAFARI,
  IOS_EDGE_THRESHOLD,
  DIRECTION_NONE,
  DIRECTION_VERTICAL,
  DIRECTION_HORIZONTAL,
  DIRECTION_ALL,
  PREVENT_SCROLL_CSSPROPS,
} from "../const";
import { ActiveInput, InputEventType } from "../types";

import {
  convertInputType,
  InputType,
  InputTypeObserver,
  toAxis,
} from "./InputType";

export interface PanInputOption {
  inputType?: string[];
  scale?: number[];
  thresholdAngle?: number;
  threshold?: number;
  iOSEdgeSwipeThreshold?: number;
  releaseOnScroll?: boolean;
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

export const useDirection = (checkType, direction, userDirection?): boolean => {
  if (userDirection) {
    return !!(
      direction === DIRECTION_ALL ||
      (direction & checkType && userDirection & checkType)
    );
  } else {
    return !!(direction & checkType);
  }
};

/**
 * @typedef {Object} PanInputOption The option object of the eg.Axes.PanInput module.
 * @ko eg.Axes.PanInput 모듈의 옵션 객체
 * @param {String[]} [inputType=["touch","mouse", "pointer"]] Types of input devices.
 * - touch: Touch screen
 * - mouse: Mouse <ko>입력 장치 종류.
 * - touch: 터치 입력 장치
 * - mouse: 마우스</ko>
 * @param {Number[]} [scale] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @param {Number} [scale[0]=1] horizontal axis scale <ko>수평축 배율</ko>
 * @param {Number} [scale[1]=1] vertical axis scale <ko>수직축 배율</ko>
 * @param {Number} [thresholdAngle=45] The threshold value that determines whether user action is horizontal or vertical (0~90) <ko>사용자의 동작이 가로 방향인지 세로 방향인지 판단하는 기준 각도(0~90)</ko>
 * @param {Number} [threshold=0] Minimal pan distance required before recognizing <ko>사용자의 Pan 동작을 인식하기 위해산 최소한의 거리</ko>
 * @param {Number} [iOSEdgeSwipeThreshold=30] Area (px) that can go to the next page when swiping the right edge in iOS safari <ko>iOS Safari에서 오른쪽 엣지를 스와이프 하는 경우 다음 페이지로 넘어갈 수 있는 영역(px)</ko>
 **/
/**
 * A module that passes the amount of change to eg.Axes when the mouse or touchscreen is down and moved. use less than two axes.
 * @ko 마우스나 터치 스크린을 누르고 움직일때의 변화량을 eg.Axes에 전달하는 모듈. 두개 이하의 축을 사용한다.
 *
 * @example
 * ```js
 * const pan = new eg.Axes.PanInput("#area", {
 * 		inputType: ["touch"],
 * 		scale: [1, 1.3],
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
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.PanInput module <ko>eg.Axes.PanInput 모듈을 사용할 엘리먼트</ko>
 * @param {PanInputOption} [options={}] The option object of the eg.Axes.PanInput module<ko>eg.Axes.PanInput 모듈의 옵션 객체</ko>
 */
export class PanInput implements InputType {
  public options: PanInputOption;
  public axes: string[] = [];
  public element: HTMLElement = null;
  protected _observer: InputTypeObserver;
  protected _direction;
  protected _panFlag = false;
  protected _enabled = false;
  protected _activeInput: ActiveInput = null;
  private _originalCssProps: { [key: string]: string };
  private _atRightEdge = false;
  private _rightEdgeTimer = 0;

  /**
   *
   */
  public constructor(el: string | HTMLElement, options?: PanInputOption) {
    this.element = $(el);
    this.options = {
      inputType: ["touch", "mouse", "pointer"],
      scale: [1, 1],
      thresholdAngle: 45,
      threshold: 0,
      iOSEdgeSwipeThreshold: IOS_EDGE_THRESHOLD,
      releaseOnScroll: false,
      ...options,
    };
    this._onPanstart = this._onPanstart.bind(this);
    this._onPanmove = this._onPanmove.bind(this);
    this._onPanend = this._onPanend.bind(this);
  }

  public mapAxes(axes: string[]) {
    const useHorizontal = !!axes[0];
    const useVertical = !!axes[1];
    if (useHorizontal && useVertical) {
      this._direction = DIRECTION_ALL;
    } else if (useHorizontal) {
      this._direction = DIRECTION_HORIZONTAL;
    } else if (useVertical) {
      this._direction = DIRECTION_VERTICAL;
    } else {
      this._direction = DIRECTION_NONE;
    }
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
    this._enabled = true;
    return this;
  }

  /**
   * Disables input devices
   * @ko 입력 장치를 사용할 수 없게 한다.
   * @return {PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
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

  protected _onPanstart(event: InputEventType) {
    this._activeInput.onEventStart(event);
    if (!this._enabled || this._activeInput.getTouches(event) > 1) {
      return;
    }

    const panEvent = this._activeInput.extendEvent(event);
    this._panFlag = false;

    if (panEvent.srcEvent.cancelable !== false) {
      const edgeThreshold = this.options.iOSEdgeSwipeThreshold;

      this._observer.hold(this, panEvent);
      this._atRightEdge =
        IS_IOS_SAFARI && panEvent.center.x > window.innerWidth - edgeThreshold;
      this._panFlag = true;
      this._activeInput.prevEvent = panEvent;
    }
  }

  protected _onPanmove(event: InputEventType) {
    this._activeInput.onEventMove(event);
    if (
      !this._panFlag ||
      !this._enabled ||
      this._activeInput.getTouches(event) > 1
    ) {
      return;
    }

    const panEvent = this._activeInput.extendEvent(event);
    const { iOSEdgeSwipeThreshold, releaseOnScroll } = this.options;
    const userDirection = getDirectionByAngle(
      panEvent.angle,
      this.options.thresholdAngle
    );

    if (releaseOnScroll && !panEvent.srcEvent.cancelable) {
      this._onPanend(event);
      return;
    }

    if (this._activeInput.prevEvent && IS_IOS_SAFARI) {
      const swipeLeftToRight = panEvent.center.x < 0;

      if (swipeLeftToRight) {
        // iOS swipe left => right
        this._observer.release(this, this._activeInput.prevEvent, [0, 0]);
        return;
      } else if (this._atRightEdge) {
        clearTimeout(this._rightEdgeTimer);

        // - is right to left
        const swipeRightToLeft = panEvent.deltaX < -iOSEdgeSwipeThreshold;

        if (swipeRightToLeft) {
          this._atRightEdge = false;
        } else {
          // iOS swipe right => left
          this._rightEdgeTimer = window.setTimeout(() => {
            this._observer.release(this, this._activeInput.prevEvent, [0, 0]);
          }, 100);
        }
      }
    }
    const offset: number[] = this._getOffset(
      [panEvent.offsetX, panEvent.offsetY],
      [
        useDirection(DIRECTION_HORIZONTAL, this._direction, userDirection),
        useDirection(DIRECTION_VERTICAL, this._direction, userDirection),
      ]
    );
    const prevent = offset.some((v) => v !== 0);

    if (prevent) {
      if (panEvent.srcEvent.cancelable !== false) {
        panEvent.srcEvent.preventDefault();
      }
      panEvent.srcEvent.stopPropagation();
    }
    panEvent.preventSystemEvent = prevent;
    if (prevent) {
      this._observer.change(this, panEvent, toAxis(this.axes, offset));
    }
    this._activeInput.prevEvent = panEvent;
  }

  protected _onPanend(event: InputEventType) {
    this._activeInput.onEventEnd(event);
    if (
      !this._panFlag ||
      !this._enabled ||
      this._activeInput.getTouches(event) !== 0
    ) {
      return;
    }
    this._panFlag = false;
    clearTimeout(this._rightEdgeTimer);
    const prevEvent = this._activeInput.prevEvent;
    const velocity = this._getOffset(
      [
        Math.abs(prevEvent.velocityX) * (prevEvent.offsetX < 0 ? -1 : 1),
        Math.abs(prevEvent.velocityY) * (prevEvent.offsetY < 0 ? -1 : 1),
      ],
      [
        useDirection(DIRECTION_HORIZONTAL, this._direction),
        useDirection(DIRECTION_VERTICAL, this._direction),
      ]
    );
    this._observer.release(this, prevEvent, velocity);
  }

  private _attachEvent(observer: InputTypeObserver) {
    const activeInput = convertInputType(this.options.inputType);
    this._observer = observer;
    this._enabled = true;
    this._activeInput = activeInput;
    activeInput?.start.forEach((event) => {
      this.element.addEventListener(event, this._onPanstart, false);
    });
    activeInput?.move.forEach((event) => {
      window.addEventListener(event, this._onPanmove, false);
    });
    activeInput?.end.forEach((event) => {
      window.addEventListener(event, this._onPanend, false);
    });
  }

  private _detachEvent() {
    const activeInput = this._activeInput;
    activeInput?.start.forEach((event) => {
      this.element.removeEventListener(event, this._onPanstart, false);
    });
    activeInput?.move.forEach((event) => {
      window.removeEventListener(event, this._onPanmove, false);
    });
    activeInput?.end.forEach((event) => {
      window.removeEventListener(event, this._onPanend, false);
    });
    this._enabled = false;
    this._observer = null;
  }

  private _getOffset(properties: number[], direction: boolean[]): number[] {
    const offset: number[] = [0, 0];
    const scale = this.options.scale;

    if (direction[0]) {
      offset[0] = properties[0] * scale[0];
    }
    if (direction[1]) {
      offset[1] = properties[1] * scale[1];
    }
    return offset;
  }
}

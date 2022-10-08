/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Axes from "../Axes";
import { ElementType, ExtendedEvent } from "../types";
import { getAngle } from "../utils";

import { toAxis } from "./InputType";
import { PanInput, PanInputOption } from "./PanInput";

/**
 * A module that passes the angle moved by touch to Axes and uses one axis of rotation.
 * [Details](https://github.com/naver/egjs-axes/wiki/RotatePanInput)
 * @ko 터치에 의해 움직인 각도를 Axes 에 전달하며 1개의 회전축만 사용한다.
 * [상세내용](https://github.com/naver/egjs-axes/wiki/RotatePanInput-%7C-%ED%95%9C%EA%B5%AD%EC%96%B4)
 *
 * @example
 * ```js
 * const input = new eg.Axes.RotatePanInput("#area");
 *
 * var axes = new eg.Axes({
 *	// property name('angle') could be anything you want (eg. x, y, z...)
 * 	angle: {
 * 		range: [-180, 180] // from -180deg to 180deg
 * 	}
 * });
 *
 * axes.connect("angle", input)
 * ```
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.RotatePanInput module <ko>eg.Axes.RotatePanInput 모듈을 사용할 엘리먼트</ko>
 * @param {PanInputOption} [options] The option object of the eg.Axes.PanInput module<ko>eg.Axes.PanInput 모듈의 옵션 객체</ko>
 * @extends PanInput
 */
export class RotatePanInput extends PanInput {
  private _rotateOrigin: number[];
  private _prevAngle: number;
  private _prevQuadrant: number = null;
  private _lastDiff = 0;
  private _coefficientForDistanceToAngle: number;

  /**
   *
   */
  public constructor(el: ElementType, options?: PanInputOption) {
    super(el, options);
  }

  public mapAxes(axes: string[]) {
    this._direction = Axes.DIRECTION_ALL;
    this.axes = axes;
  }

  protected _onPanstart(event: MouseEvent) {
    const { inputKey, inputButton } = this.options;
    const activeEvent = this._activeEvent;
    const panEvent = activeEvent.onEventStart(event, inputKey, inputButton);
    if (!panEvent || !this.isEnabled()) {
      return;
    }

    const rect = this.element.getBoundingClientRect();

    this._observer.hold(this, panEvent);
    this._attachWindowEvent(activeEvent);
    // TODO: how to do if element is ellipse not circle.
    this._coefficientForDistanceToAngle = 360 / (rect.width * Math.PI); // from 2*pi*r * x / 360
    // TODO: provide a way to set origin like https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
    this._rotateOrigin = [
      rect.left + (rect.width - 1) / 2,
      rect.top + (rect.height - 1) / 2,
    ];

    // init angle.
    this._prevAngle = null;

    this._triggerChange(panEvent);
    activeEvent.prevEvent = panEvent;
  }

  protected _onPanmove(event: MouseEvent) {
    const { inputKey, inputButton } = this.options;
    const activeEvent = this._activeEvent;
    const panEvent = activeEvent.onEventMove(event, inputKey, inputButton);
    if (!panEvent || !this.isEnabled()) {
      return;
    }

    if (panEvent.srcEvent.cancelable !== false) {
      panEvent.srcEvent.preventDefault();
    }
    panEvent.srcEvent.stopPropagation();
    this._triggerChange(panEvent);
    activeEvent.prevEvent = panEvent;
  }

  protected _onPanend(event: MouseEvent) {
    const activeEvent = this._activeEvent;
    activeEvent.onEventEnd(event);
    if (!this.isEnabled()) {
      return;
    }
    const prevEvent = activeEvent.prevEvent;
    this._triggerChange(prevEvent);
    const vx = prevEvent.velocityX;
    const vy = prevEvent.velocityY;
    const velocity =
      Math.sqrt(vx * vx + vy * vy) * (this._lastDiff > 0 ? -1 : 1); // clockwise
    activeEvent.onRelease();
    this._observer.release(this, prevEvent, [
      velocity * this._coefficientForDistanceToAngle,
    ]);
    this._detachWindowEvent(activeEvent);
  }

  private _triggerChange(event: ExtendedEvent) {
    const { x, y } = this._getPosFromOrigin(event.center.x, event.center.y);
    const angle = getAngle(x, y);
    const positiveAngle = angle < 0 ? 360 + angle : angle;
    const quadrant = this._getQuadrant(event.center.x, event.center.y);
    const diff = this._getDifference(
      this._prevAngle,
      positiveAngle,
      this._prevQuadrant,
      quadrant
    );

    this._prevAngle = positiveAngle;
    this._prevQuadrant = quadrant;

    if (diff === 0) {
      return;
    }

    this._lastDiff = diff;
    this._observer.change(this, event, toAxis(this.axes, [-diff])); // minus for clockwise
  }

  private _getDifference(
    prevAngle: number,
    angle: number,
    prevQuadrant: number,
    quadrant: number
  ) {
    let diff: number;

    if (prevAngle === null) {
      diff = 0;
    } else if (prevQuadrant === 1 && quadrant === 4) {
      diff = -prevAngle - (360 - angle);
    } else if (prevQuadrant === 4 && quadrant === 1) {
      diff = 360 - prevAngle + angle;
    } else {
      diff = angle - prevAngle;
    }

    return diff;
  }

  private _getPosFromOrigin(posX: number, posY: number) {
    return {
      x: posX - this._rotateOrigin[0],
      y: this._rotateOrigin[1] - posY,
    };
  }

  private _getQuadrant(posX: number, posY: number) {
    /**
     * Quadrant
     *       y(+)
     *       |
     *   2   |    1
     * --------------->x(+)
     *   3   |    4
     *       |
     */
    const { x, y } = this._getPosFromOrigin(posX, posY);
    let q = 0;

    if (x >= 0 && y >= 0) {
      q = 1;
    } else if (x < 0 && y >= 0) {
      q = 2;
    } else if (x < 0 && y < 0) {
      q = 3;
    } else if (x >= 0 && y < 0) {
      q = 4;
    }
    return q;
  }
}

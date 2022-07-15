/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { InputEventType, ExtendedEvent } from "../types";

import { EventInput } from "./EventInput";

export class TouchMouseEventInput extends EventInput {
  public readonly start = ["mousedown", "touchstart"];
  public readonly move = ["mousemove", "touchmove"];
  public readonly end = ["mouseup", "touchend", "touchcancel"];

  private _baseTouches: TouchList;

  public onEventStart(
    event: InputEventType,
    inputButton?: string[]
  ): ExtendedEvent {
    const button = this._getButton(event);
    if (this._isTouchEvent(event)) {
      this._baseTouches = event.touches;
    }
    if (inputButton && !this._isValidButton(button, inputButton)) {
      return null;
    }
    this._preventMouseButton(event, button);
    return this.extendEvent(event);
  }

  public onEventMove(
    event: InputEventType,
    inputButton?: string[]
  ): ExtendedEvent {
    if (
      inputButton &&
      !this._isValidButton(this._getButton(event), inputButton)
    ) {
      return null;
    }
    return this.extendEvent(event);
  }

  public onEventEnd(event: InputEventType): void {
    if (this._isTouchEvent(event)) {
      this._baseTouches = event.touches;
    }
    return;
  }

  public onRelease(): void {
    this.prevEvent = null;
    this._baseTouches = null;
    return;
  }

  public getTouches(event: InputEventType): number {
    return this._isTouchEvent(event) ? event.touches.length : 0;
  }

  protected _getScale(event: MouseEvent | TouchEvent): number {
    if (this._isTouchEvent(event)) {
      if (event.touches.length !== 2 || this._baseTouches.length < 2) {
        return 1; // TODO: consider calculating non-pinch gesture scale
      }
      return (
        this._getDistance(event.touches[0], event.touches[1]) /
        this._getDistance(this._baseTouches[0], this._baseTouches[1])
      );
    }
    return this.prevEvent.scale;
  }

  protected _getCenter(event: MouseEvent | TouchEvent): {
    x: number;
    y: number;
  } {
    if (this._isTouchEvent(event)) {
      return {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    }
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  protected _getMovement(event: MouseEvent | TouchEvent): {
    x: number;
    y: number;
  } {
    const prev = this.prevEvent.srcEvent;
    const [nextSpot, prevSpot] = [event, prev].map((e) => {
      if (this._isTouchEvent(e)) {
        return {
          id: e.touches[0].identifier,
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
      return {
        id: null,
        x: e.clientX,
        y: e.clientY,
      };
    });
    return nextSpot.id === prevSpot.id
      ? { x: nextSpot.x - prevSpot.x, y: nextSpot.y - prevSpot.y }
      : { x: 0, y: 0 };
  }
}

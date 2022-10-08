/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { InputEventType, ExtendedEvent } from "../types";

import { EventInput } from "./EventInput";

export class TouchEventInput extends EventInput {
  public readonly start = ["touchstart"];
  public readonly move = ["touchmove"];
  public readonly end = ["touchend", "touchcancel"];

  private _baseTouches: TouchList;

  public onEventStart(
    event: InputEventType,
    inputKey?: string[]
  ): ExtendedEvent {
    this._baseTouches = (event as TouchEvent).touches;
    if (!this._isValidEvent(event, inputKey)) {
      return null;
    }
    return this.extendEvent(event);
  }

  public onEventMove(
    event: InputEventType,
    inputKey?: string[]
  ): ExtendedEvent {
    if (!this._isValidEvent(event, inputKey)) {
      return null;
    }
    return this.extendEvent(event);
  }

  public onEventEnd(event: InputEventType): void {
    this._baseTouches = (event as TouchEvent).touches;
    return;
  }

  public onRelease(): void {
    this.prevEvent = null;
    this._baseTouches = null;
    return;
  }

  public getTouches(event: InputEventType): number {
    return (event as TouchEvent).touches.length;
  }

  protected _getScale(event: TouchEvent): number {
    if (event.touches.length !== 2 || this._baseTouches.length < 2) {
      return null; // TODO: consider calculating non-pinch gesture scale
    }
    return (
      this._getDistance(event.touches[0], event.touches[1]) /
      this._getDistance(this._baseTouches[0], this._baseTouches[1])
    );
  }

  protected _getCenter(event: TouchEvent): { x: number; y: number } {
    return {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }

  protected _getMovement(event: TouchEvent): { x: number; y: number } {
    const prev = this.prevEvent.srcEvent as TouchEvent;
    if (event.touches[0].identifier !== prev.touches[0].identifier) {
      return {
        x: 0,
        y: 0,
      };
    }
    return {
      x: event.touches[0].clientX - prev.touches[0].clientX,
      y: event.touches[0].clientY - prev.touches[0].clientY,
    };
  }
}

import { InputEventType, ExtendedEvent } from "../types";

import { EventInput } from "./EventInput";

export class TouchMouseEventInput extends EventInput {
  public readonly start = ["mousedown", "touchstart"];
  public readonly move = ["mousemove", "touchmove"];
  public readonly end = ["mouseup", "touchend", "touchcancel"];

  private _firstTouch: TouchEvent;

  public onEventStart(event: InputEventType): ExtendedEvent {
    this._firstTouch = event.hasOwnProperty("touches")
      ? (event as TouchEvent)
      : null;
    return this.extendEvent(event);
  }

  public onEventMove(event: InputEventType): ExtendedEvent {
    return this.extendEvent(event);
  }

  public onEventEnd(): void {
    return;
  }

  public getTouches(event: InputEventType): number {
    return this._isTouchEvent(event) ? (event as TouchEvent).touches.length : 0;
  }

  protected _getScale(event: MouseEvent | TouchEvent): number {
    if (
      !this._firstTouch ||
      (this._isTouchEvent(event) && (event as TouchEvent).touches.length !== 2)
    ) {
      return 1; // TODO: consider calculating non-pinch gesture scale
    }
    if (this._isTouchEvent(event)) {
      return (
        this._getDistance(
          (event as TouchEvent).touches[0],
          (event as TouchEvent).touches[1]
        ) /
        this._getDistance(
          this._firstTouch.touches[0],
          this._firstTouch.touches[1]
        )
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
        x: (event as TouchEvent).touches[0].clientX,
        y: (event as TouchEvent).touches[0].clientY,
      };
    }
    return {
      x: (event as MouseEvent).clientX,
      y: (event as MouseEvent).clientY,
    };
  }

  protected _getMovement(event: MouseEvent | TouchEvent): {
    x: number;
    y: number;
  } {
    const prev = this.prevEvent.srcEvent;
    const [nextSpot, prevSpot] = [event, prev].map((e) => {
      if (this._isTouchEvent(event)) {
        return {
          id: (e as TouchEvent).touches[0].identifier,
          x: (e as TouchEvent).touches[0].pageX,
          y: (e as TouchEvent).touches[0].pageY,
        };
      }
      return {
        id: null,
        x: (e as MouseEvent).pageX,
        y: (e as MouseEvent).pageY,
      };
    });
    return nextSpot.id === prevSpot.id
      ? { x: nextSpot.x - prevSpot.x, y: nextSpot.y - prevSpot.y }
      : { x: 0, y: 0 };
  }

  private _isTouchEvent(event: InputEventType): boolean {
    return event.hasOwnProperty("touches");
  }
}

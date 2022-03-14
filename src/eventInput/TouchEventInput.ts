import { InputEventType, ExtendedEvent } from "../types";

import { EventInput } from "./EventInput";

export class TouchEventInput extends EventInput {
  public readonly start = ["touchstart"];
  public readonly move = ["touchmove"];
  public readonly end = ["touchend", "touchcancel"];

  private _firstTouch: TouchEvent;

  public onEventStart(event: InputEventType): ExtendedEvent {
    this._firstTouch = event as TouchEvent;
    return this.extendEvent(event);
  }

  public onEventMove(event: InputEventType): ExtendedEvent {
    return this.extendEvent(event);
  }

  public onEventEnd(): void {
    return;
  }

  public getTouches(event: InputEventType): number {
    return (event as TouchEvent).touches.length;
  }

  protected _getScale(event: TouchEvent): number {
    if (event.touches.length !== 2) {
      return null; // TODO: consider calculating non-pinch gesture scale
    }
    return (
      this._getDistance(event.touches[0], event.touches[1]) /
      this._getDistance(
        this._firstTouch.touches[0],
        this._firstTouch.touches[1]
      )
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
      x: event.touches[0].pageX - prev.touches[0].pageX,
      y: event.touches[0].pageY - prev.touches[0].pageY,
    };
  }
}

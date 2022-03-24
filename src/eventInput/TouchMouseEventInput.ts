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
    return event.hasOwnProperty("touches")
      ? (event as TouchEvent).touches.length
      : 0;
  }

  protected _getScale(event: MouseEvent | TouchEvent): number {
    if (
      !this._firstTouch ||
      (event.hasOwnProperty("touches") &&
        (event as TouchEvent).touches.length !== 2)
    ) {
      return 1; // TODO: consider calculating non-pinch gesture scale
    }
    if (event.hasOwnProperty("touches")) {
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
    if (event.hasOwnProperty("touches")) {
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
      return {
        id: e.hasOwnProperty("touches")
          ? (e as TouchEvent).touches[0].identifier
          : null,
        x: e.hasOwnProperty("touches")
          ? (e as TouchEvent).touches[0].pageX
          : (e as MouseEvent).pageX,
        y: e.hasOwnProperty("touches")
          ? (e as TouchEvent).touches[0].pageY
          : (e as MouseEvent).pageY,
      };
    });
    return nextSpot.id === prevSpot.id
      ? { x: nextSpot.x - prevSpot.x, y: nextSpot.y - prevSpot.y }
      : { x: 0, y: 0 };
  }
}

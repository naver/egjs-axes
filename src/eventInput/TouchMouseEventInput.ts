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
    const button = this._getButton(event as PointerEvent);
    if (inputButton && !this._isValidButton(button, inputButton)) {
      return null;
    }
    if (this._isTouchEvent(event)) {
      this._baseTouches = (event as TouchEvent).touches;
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
      this._baseTouches = (event as TouchEvent).touches;
    }
    return;
  }

  public getTouches(event: InputEventType): number {
    return this._isTouchEvent(event) ? (event as TouchEvent).touches.length : 0;
  }

  protected _getButton(event: InputEventType): string {
    if (this._isTouchEvent(event)) {
      return "left";
    }
    switch ((event as MouseEvent).buttons) {
      case 1:
        return "left";
      case 2:
        return "right";
      case 4:
        return "middle";
      default:
        return "left";
    }
  }

  protected _getScale(event: MouseEvent | TouchEvent): number {
    if (this._isTouchEvent(event)) {
      if (
        (event as TouchEvent).touches.length !== 2 ||
        this._baseTouches.length < 2
      ) {
        return 1; // TODO: consider calculating non-pinch gesture scale
      }
      return (
        this._getDistance(
          (event as TouchEvent).touches[0],
          (event as TouchEvent).touches[1]
        ) / this._getDistance(this._baseTouches[0], this._baseTouches[1])
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
    return event.type.includes("touch");
  }
}

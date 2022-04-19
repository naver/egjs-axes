import { ExtendedEvent, InputEventType } from "../types";
import { getAngle } from "../utils";
import { window } from "../browser";

export const SUPPORT_TOUCH = "ontouchstart" in window;
export const SUPPORT_POINTER = "PointerEvent" in window;
export const SUPPORT_MSPOINTER = "MSPointerEvent" in window;
export const SUPPORT_POINTER_EVENTS = SUPPORT_POINTER || SUPPORT_MSPOINTER;

export abstract class EventInput {
  public prevEvent: ExtendedEvent;

  public abstract onEventStart(
    event: InputEventType,
    inputButton?: string[]
  ): ExtendedEvent;

  public abstract onEventMove(
    event: InputEventType,
    inputButton?: string[]
  ): ExtendedEvent;

  public abstract onEventEnd(event: InputEventType): void;

  public abstract getTouches(event: InputEventType): number;

  protected abstract _getButton(event: InputEventType): string;

  protected abstract _getScale(event: InputEventType): number;

  protected abstract _getCenter(event: InputEventType): {
    x: number;
    y: number;
  };

  protected abstract _getMovement(event: InputEventType): {
    x: number;
    y: number;
  };

  public extendEvent(event: InputEventType): ExtendedEvent {
    const prevEvent = this.prevEvent;
    const center = this._getCenter(event);
    const movement = prevEvent ? this._getMovement(event) : { x: 0, y: 0 };
    const scale = prevEvent ? this._getScale(event) : 1;
    const angle = prevEvent
      ? getAngle(center.x - prevEvent.center.x, center.y - prevEvent.center.y)
      : 0;
    const deltaX = prevEvent ? prevEvent.deltaX + movement.x : movement.x;
    const deltaY = prevEvent ? prevEvent.deltaY + movement.y : movement.y;
    const offsetX = prevEvent ? deltaX - prevEvent.deltaX : 0;
    const offsetY = prevEvent ? deltaY - prevEvent.deltaY : 0;
    const deltaTime = prevEvent
      ? event.timeStamp - prevEvent.srcEvent.timeStamp
      : 0;
    const velocityX = prevEvent && deltaTime !== 0 ? offsetX / deltaTime : 0;
    const velocityY = prevEvent && deltaTime !== 0 ? offsetY / deltaTime : 0;
    return {
      srcEvent: event,
      scale,
      angle,
      center,
      deltaX,
      deltaY,
      offsetX,
      offsetY,
      velocityX,
      velocityY,
      preventSystemEvent: true,
    };
  }

  protected _getDistance(
    start: Touch | PointerEvent,
    end: Touch | PointerEvent
  ): number {
    const x = end.clientX - start.clientX;
    const y = end.clientY - start.clientY;
    return Math.sqrt(x * x + y * y);
  }

  protected _isValidButton(button: string, inputButton: string[]): boolean {
    return inputButton.includes(button);
  }

  protected _preventMouseButton(event: InputEventType, button: string): void {
    if (button === "right") {
      window.addEventListener("contextmenu", this._stopContextMenu);
    } else if (button === "middle") {
      event.preventDefault();
    }
  }

  private _stopContextMenu = (event: InputEventType) => {
    event.preventDefault();
    window.removeEventListener("contextmenu", this._stopContextMenu);
  };
}

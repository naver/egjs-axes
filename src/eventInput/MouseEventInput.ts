import { InputEventType, ExtendedEvent } from "../types";

import { EventInput } from "./EventInput";

export class MouseEventInput extends EventInput {
  public readonly start = ["mousedown"];
  public readonly move = ["mousemove"];
  public readonly end = ["mouseup"];

  public onEventStart(event: InputEventType): ExtendedEvent {
    return this.extendEvent(event);
  }

  public onEventMove(event: InputEventType): ExtendedEvent {
    return this.extendEvent(event);
  }

  public onEventEnd(): void {
    return;
  }

  public getTouches(): number {
    return 0;
  }

  protected _getScale(): number {
    return 1;
  }

  protected _getCenter(event: MouseEvent): { x: number; y: number } {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  protected _getMovement(event: MouseEvent): { x: number; y: number } {
    const prev = this.prevEvent.srcEvent as MouseEvent;
    return {
      x: event.pageX - prev.pageX,
      y: event.pageY - prev.pageY,
    };
  }
}

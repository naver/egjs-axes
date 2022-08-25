/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { InputEventType, ExtendedEvent } from "../types";
import { MOUSE_LEFT, MOUSE_MIDDLE, MOUSE_RIGHT } from "../const";

import { EventInput } from "./EventInput";

export class MouseEventInput extends EventInput {
  public readonly start = ["mousedown"];
  public readonly move = ["mousemove"];
  public readonly end = ["mouseup"];

  public onEventStart(
    event: InputEventType,
    inputButton?: string[]
  ): ExtendedEvent {
    const button = this._getButton(event);
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

  public onEventEnd(): void {
    return;
  }

  public onRelease(): void {
    this.prevEvent = null;
    return;
  }

  public getTouches(event: InputEventType, inputButton?: string[]): number {
    if (inputButton) {
      const buttonCodeMap = { 1: MOUSE_LEFT, 2: MOUSE_MIDDLE, 3: MOUSE_RIGHT };
      return this._isValidButton(buttonCodeMap[event.which], inputButton) &&
        this.end.indexOf(event.type) === -1
        ? 1
        : 0;
    }
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
      x: event.clientX - prev.clientX,
      y: event.clientY - prev.clientY,
    };
  }
}

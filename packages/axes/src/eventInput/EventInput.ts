/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ExtendedEvent, InputEventType, LatestInterval } from "../types";
import { getAngle } from "../utils";
import { window } from "../browser";
import {
  ALT,
  ANY,
  CTRL,
  META,
  MOUSE_LEFT,
  MOUSE_MIDDLE,
  MOUSE_RIGHT,
  NONE,
  SHIFT,
  VELOCITY_INTERVAL,
} from "../const";

export const SUPPORT_TOUCH = "ontouchstart" in window;
export const SUPPORT_POINTER = "PointerEvent" in window;
export const SUPPORT_MSPOINTER = "MSPointerEvent" in window;
export const SUPPORT_POINTER_EVENTS = SUPPORT_POINTER || SUPPORT_MSPOINTER;

export const isValidKey = (
  event: InputEventType | WheelEvent,
  inputKey?: string[]
): boolean => {
  if (
    !inputKey ||
    inputKey.indexOf(ANY) > -1 ||
    (inputKey.indexOf(NONE) > -1 &&
      !event.shiftKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey) ||
    (inputKey.indexOf(SHIFT) > -1 && event.shiftKey) ||
    (inputKey.indexOf(CTRL) > -1 && event.ctrlKey) ||
    (inputKey.indexOf(ALT) > -1 && event.altKey) ||
    (inputKey.indexOf(META) > -1 && event.metaKey)
  ) {
    return true;
  }
  return false;
};

export abstract class EventInput {
  public prevEvent: ExtendedEvent;
  private _latestInterval: LatestInterval;

  public abstract onEventStart(
    event: InputEventType,
    inputButton?: string[]
  ): ExtendedEvent;

  public abstract onEventMove(
    event: InputEventType,
    inputButton?: string[]
  ): ExtendedEvent;

  public abstract onEventEnd(event: InputEventType): void;

  public abstract onRelease(event: InputEventType): void;

  public abstract getTouches(
    event: InputEventType,
    inputKey?: string[],
    inputButton?: string[]
  ): number;

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
    const offsetX = movement.x;
    const offsetY = movement.y;
    const latestInterval = this._latestInterval;
    const timeStamp = Date.now();
    const deltaTime = latestInterval ? timeStamp - latestInterval.timestamp : 0;
    let velocityX = prevEvent ? prevEvent.velocityX : 0;
    let velocityY = prevEvent ? prevEvent.velocityY : 0;
    if (!latestInterval || deltaTime >= VELOCITY_INTERVAL) {
      if (latestInterval) {
        [velocityX, velocityY] = [
          (deltaX - latestInterval.deltaX) / deltaTime,
          (deltaY - latestInterval.deltaY) / deltaTime,
        ];
      }
      this._latestInterval = {
        timestamp: timeStamp,
        deltaX,
        deltaY,
      };
    }
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

  protected _getButton(event: InputEventType): string {
    const buttonCodeMap = { 1: MOUSE_LEFT, 2: MOUSE_RIGHT, 4: MOUSE_MIDDLE };
    const button = this._isTouchEvent(event)
      ? MOUSE_LEFT
      : buttonCodeMap[event.buttons];
    return button ? button : null;
  }

  protected _isTouchEvent(event: InputEventType): event is TouchEvent {
    return event.type && event.type.indexOf("touch") > -1;
  }

  protected _isValidButton(button: string, inputButton: string[]): boolean {
    return inputButton.indexOf(button) > -1;
  }

  protected _isValidEvent(
    event: InputEventType,
    inputKey?: string[],
    inputButton?: string[]
  ): boolean {
    return (
      (!inputKey || isValidKey(event, inputKey)) &&
      (!inputButton || this._isValidButton(this._getButton(event), inputButton))
    );
  }

  protected _preventMouseButton(event: InputEventType, button: string): void {
    if (button === MOUSE_RIGHT) {
      window.addEventListener("contextmenu", this._stopContextMenu);
    } else if (button === MOUSE_MIDDLE) {
      event.preventDefault();
    }
  }

  private _stopContextMenu = (event: InputEventType) => {
    event.preventDefault();
    window.removeEventListener("contextmenu", this._stopContextMenu);
  };
}

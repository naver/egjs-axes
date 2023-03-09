/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { Axis } from "../AxisManager";
import { AxesOption } from "../Axes";
import { ActiveEvent } from "../types";
import { MouseEventInput } from "../eventInput/MouseEventInput";
import { TouchEventInput } from "../eventInput/TouchEventInput";
import { PointerEventInput } from "../eventInput/PointerEventInput";
import { TouchMouseEventInput } from "../eventInput/TouchMouseEventInput";
import {
  SUPPORT_POINTER_EVENTS,
  SUPPORT_TOUCH,
} from "../eventInput/EventInput";

export interface InputType {
  axes: string[];
  element: HTMLElement;
  mapAxes(axes: string[]);
  connect(observer: InputTypeObserver): InputType;
  disconnect();
  destroy();
  enable?();
  disable?();
  isEnable?(): boolean;
}

export interface InputTypeObserver {
  options: AxesOption;
  get(inputType: InputType): Axis;
  change(inputType: InputType, event, offset: Axis, useAnimation?: boolean);
  hold(inputType: InputType, event);
  release(
    inputType: InputType,
    event,
    velocity: number[],
    inputDuration?: number
  );
}

export const toAxis = (source: string[], offset: number[]): Axis => {
  return offset.reduce((acc, v, i) => {
    if (source[i]) {
      acc[source[i]] = v;
    }
    return acc;
  }, {});
};

export const convertInputType = (inputType: string[] = []): ActiveEvent => {
  let hasTouch = false;
  let hasMouse = false;
  let hasPointer = false;

  inputType.forEach((v) => {
    switch (v) {
      case "mouse":
        hasMouse = true;
        break;
      case "touch":
        hasTouch = SUPPORT_TOUCH;
        break;
      case "pointer":
        hasPointer = SUPPORT_POINTER_EVENTS;
      // no default
    }
  });
  if (hasPointer) {
    return new PointerEventInput();
  } else if (hasTouch && hasMouse) {
    return new TouchMouseEventInput();
  } else if (hasTouch) {
    return new TouchEventInput();
  } else if (hasMouse) {
    return new MouseEventInput();
  }
  return null;
};

export function getAddEventOptions(eventName: string) {
  // The passive default value of the touch event is true.
  // If not a touch event, return false to support ie11
  return eventName.indexOf("touch") > -1 ? { passive: false } : false;
}

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { window } from "./browser";
import { PREVENT_DRAG_CSSPROPS } from "./const";
import { PanInputOption } from "./inputType/PanInput";
import { PinchInputOption } from "./inputType/PinchInput";
import { ObjectInterface } from "./types";
import {
  DIRECTION_NONE,
  DIRECTION_VERTICAL,
  DIRECTION_HORIZONTAL,
  DIRECTION_ALL,
} from "./const";

declare let jQuery: any;

export const toArray = (nodes: NodeList): HTMLElement[] => {
  // const el = Array.prototype.slice.call(nodes);
  // for IE8
  const el = [];
  for (let i = 0, len = nodes.length; i < len; i++) {
    el.push(nodes[i]);
  }
  return el;
};

export const $ = (param, multi = false) => {
  let el;
  if (typeof param === "string") {
    // String (HTML, Selector)
    // check if string is HTML tag format
    const match = param.match(/^<([a-z]+)\s*([^>]*)>/);

    // creating element
    if (match) {
      // HTML
      const dummy = document.createElement("div");

      dummy.innerHTML = param;
      el = toArray(dummy.childNodes);
    } else {
      // Selector
      el = toArray(document.querySelectorAll(param));
    }
    if (!multi) {
      el = el.length >= 1 ? el[0] : undefined;
    }
  } else if (param === window) {
    // window
    el = param;
  } else if ("value" in param || "current" in param) {
    el = param.value! || param.current!;
  } else if (param.nodeName && (param.nodeType === 1 || param.nodeType === 9)) {
    // HTMLElement, Document
    el = param;
  } else if (
    ("jQuery" in window && param instanceof jQuery) ||
    param.constructor.prototype.jquery
  ) {
    // jQuery
    el = multi ? param.toArray() : param.get(0);
  } else if (Array.isArray(param)) {
    el = param.map((v) => $(v));
    if (!multi) {
      el = el.length >= 1 ? el[0] : undefined;
    }
  }
  return el;
};

let raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
let caf = window.cancelAnimationFrame || window.webkitCancelAnimationFrame;
if (raf && !caf) {
  const keyInfo = {};
  const oldraf = raf;
  raf = (callback: FrameRequestCallback) => {
    const wrapCallback = (timestamp: number) => {
      if (keyInfo[key]) {
        callback(timestamp);
      }
    };
    const key = oldraf(wrapCallback);
    keyInfo[key] = true;
    return key;
  };
  caf = (key: number) => {
    delete keyInfo[key];
  };
} else if (!(raf && caf)) {
  raf = (callback: FrameRequestCallback) => {
    return window.setTimeout(() => {
      callback(
        ((window.performance &&
          window.performance.now &&
          window.performance.now()) as number) || new Date().getTime()
      );
    }, 16);
  };
  caf = window.clearTimeout;
}

/**
 * A polyfill for the window.requestAnimationFrame() method.
 * @see  https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 * @private
 */
export const requestAnimationFrame = (fp) => {
  return raf(fp);
};
/**
 * A polyfill for the window.cancelAnimationFrame() method. It cancels an animation executed through a call to the requestAnimationFrame() method.
 * @param {Number} key −  The ID value returned through a call to the requestAnimationFrame() method. <ko>requestAnimationFrame() 메서드가 반환한 아이디 값</ko>
 * @see  https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame
 * @private
 */
export const cancelAnimationFrame = (key) => {
  caf(key);
};

export const map = <T, U>(
  obj: ObjectInterface<T>,
  callback: (value: T, key: string) => U
): ObjectInterface<U> => {
  const tranformed: ObjectInterface<U> = {};

  for (const k in obj) {
    if (k) {
      tranformed[k] = callback(obj[k], k);
    }
  }
  return tranformed;
};

export const filter = <T>(
  obj: ObjectInterface<T>,
  callback: (value: T, key: string) => boolean
): ObjectInterface<T> => {
  const filtered: ObjectInterface<T> = {};

  for (const k in obj) {
    if (k && callback(obj[k], k)) {
      filtered[k] = obj[k];
    }
  }
  return filtered;
};
export const every = <T>(
  obj: ObjectInterface<T>,
  callback: (value: T, key: string) => boolean
) => {
  for (const k in obj) {
    if (k && !callback(obj[k], k)) {
      return false;
    }
  }
  return true;
};
export const equal = (
  target: ObjectInterface,
  base: ObjectInterface
): boolean => {
  return every(target, (v, k) => v === base[k]);
};

const roundNumFunc = {};

export const roundNumber = (num: number, roundUnit: number) => {
  // Cache for performance
  if (!roundNumFunc[roundUnit]) {
    roundNumFunc[roundUnit] = getRoundFunc(roundUnit);
  }

  return roundNumFunc[roundUnit](num);
};

export const roundNumbers = (
  num: ObjectInterface<number>,
  roundUnit: ObjectInterface<number> | number
): ObjectInterface<number> => {
  if (!num || !roundUnit) {
    return num;
  }
  return map(num, (value, key) =>
    roundNumber(
      value,
      typeof roundUnit === "number" ? roundUnit : roundUnit[key]
    )
  );
};

export const getDecimalPlace = (val: number): number => {
  if (!isFinite(val)) {
    return 0;
  }

  const v = `${val}`;

  if (v.indexOf("e") >= 0) {
    // Exponential Format
    // 1e-10, 1e-12
    let p = 0;
    let e = 1;

    while (Math.round(val * e) / e !== val) {
      e *= 10;
      p++;
    }

    return p;
  }

  // In general, following has performance benefit.
  // https://jsperf.com/precision-calculation
  return v.indexOf(".") >= 0 ? v.length - v.indexOf(".") - 1 : 0;
};

export const inversePow = (n: number) => {
  // replace Math.pow(10, -n) to solve floating point issue.
  // eg. Math.pow(10, -4) => 0.00009999999999999999
  return 1 / Math.pow(10, n);
};

export const getRoundFunc = (v: number) => {
  const p = v < 1 ? Math.pow(10, getDecimalPlace(v)) : 1;

  return (n: number) => {
    if (v === 0) {
      return 0;
    }

    return Math.round(Math.round(n / v) * v * p) / p;
  };
};

export const getAngle = (posX: number, posY: number) => {
  return (Math.atan2(posY, posX) * 180) / Math.PI;
};

export const isCssPropsFromAxes = (originalCssProps: {
  [key: string]: string;
}) => {
  let same = true;
  Object.keys(PREVENT_DRAG_CSSPROPS).forEach((prop) => {
    if (
      !originalCssProps ||
      originalCssProps[prop] !== PREVENT_DRAG_CSSPROPS[prop]
    ) {
      same = false;
    }
  });
  return same;
};

export const getDirection = (
  useHorizontal: boolean,
  useVertical: boolean
): number => {
  if (useHorizontal && useVertical) {
    return DIRECTION_ALL;
  } else if (useHorizontal) {
    return DIRECTION_HORIZONTAL;
  } else if (useVertical) {
    return DIRECTION_VERTICAL;
  } else {
    return DIRECTION_NONE;
  }
};

export const useDirection = (
  checkType: number,
  direction: number,
  userDirection?: number
): boolean => {
  if (userDirection) {
    return !!(
      direction === DIRECTION_ALL ||
      (direction & checkType && userDirection & checkType)
    );
  } else {
    return !!(direction & checkType);
  }
};

export const setCssProps = (
  element: HTMLElement,
  option: PanInputOption | PinchInputOption,
  direction: number
): { [key: string]: string } => {
  const touchActionMap = {
    [DIRECTION_NONE]: "auto",
    [DIRECTION_ALL]: "none",
    [DIRECTION_VERTICAL]: "pan-x",
    [DIRECTION_HORIZONTAL]: "pan-y",
  };
  const oldCssProps = {};
  if (element && element.style) {
    const touchAction = option.touchAction
      ? option.touchAction
      : touchActionMap[direction];
    const newCssProps = {
      ...PREVENT_DRAG_CSSPROPS,
      "touch-action":
        element.style["touch-action"] === "none" ? "none" : touchAction,
    };
    Object.keys(newCssProps).forEach((prop) => {
      oldCssProps[prop] = element.style[prop];
    });
    // Old style props like user-select can be corrupted if you change the style directly in the logic above.
    Object.keys(newCssProps).forEach((prop) => {
      element.style[prop] = newCssProps[prop];
    });
  }
  return oldCssProps;
};

export const revertCssProps = (
  element: HTMLElement,
  originalCssProps: { [key: string]: string }
): { [key: string]: string } => {
  if (element && element.style && originalCssProps) {
    Object.keys(originalCssProps).forEach((prop) => {
      element.style[prop] = originalCssProps[prop];
    });
  }
  return;
};

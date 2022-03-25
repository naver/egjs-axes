/*
Copyright (c) 2015 NAVER Corp.
name: @egjs/axes
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-axes
version: 3.0.0
*/
import getAgent from '@egjs/agent';
import Component, { ComponentEvent } from '@egjs/component';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var getInsidePosition = function (destPos, range, circular, bounce) {
  var toDestPos = destPos;
  var targetRange = [circular[0] ? range[0] : bounce ? range[0] - bounce[0] : range[0], circular[1] ? range[1] : bounce ? range[1] + bounce[1] : range[1]];
  toDestPos = Math.max(targetRange[0], toDestPos);
  toDestPos = Math.min(targetRange[1], toDestPos);
  return toDestPos;
}; // determine outside

var isOutside = function (pos, range) {
  return pos < range[0] || pos > range[1];
};
var getDuration = function (distance, deceleration) {
  var duration = Math.sqrt(distance / deceleration * 2); // when duration is under 100, then value is zero

  return duration < 100 ? 0 : duration;
};
var isCircularable = function (destPos, range, circular) {
  return circular[1] && destPos > range[1] || circular[0] && destPos < range[0];
};
var getCirculatedPos = function (pos, range, circular) {
  var toPos = pos;
  var min = range[0];
  var max = range[1];
  var length = max - min;

  if (circular[1] && pos > max) {
    // right
    toPos = (toPos - max) % length + min;
  }

  if (circular[0] && pos < min) {
    // left
    toPos = (toPos - min) % length + max;
  }

  return toPos;
};

/* eslint-disable no-new-func, no-nested-ternary */
var win;

if (typeof window === "undefined") {
  // window is undefined in node.js
  win = {
    navigator: {
      userAgent: ""
    }
  };
} else {
  win = window;
}

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_HORIZONTAL = 2 | 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;
var DIRECTION_VERTICAL = 8 | 16;
var DIRECTION_ALL = 2 | 4 | 8 | 16;
var IOS_EDGE_THRESHOLD = 30;
var IS_IOS_SAFARI = "ontouchstart" in win && getAgent().browser.name === "safari";
var TRANSFORM = function () {
  if (typeof document === "undefined") {
    return "";
  }

  var bodyStyle = (document.head || document.getElementsByTagName("head")[0]).style;
  var target = ["transform", "webkitTransform", "msTransform", "mozTransform"];

  for (var i = 0, len = target.length; i < len; i++) {
    if (target[i] in bodyStyle) {
      return target[i];
    }
  }

  return "";
}();
var PREVENT_SCROLL_CSSPROPS = {
  "touch-action": "none",
  "user-select": "none",
  "-webkit-user-drag": "none"
};

var toArray = function (nodes) {
  // const el = Array.prototype.slice.call(nodes);
  // for IE8
  var el = [];

  for (var i = 0, len = nodes.length; i < len; i++) {
    el.push(nodes[i]);
  }

  return el;
};
var $ = function (param, multi) {
  if (multi === void 0) {
    multi = false;
  }

  var el;

  if (typeof param === "string") {
    // String (HTML, Selector)
    // check if string is HTML tag format
    var match = param.match(/^<([a-z]+)\s*([^>]*)>/); // creating element

    if (match) {
      // HTML
      var dummy = document.createElement("div");
      dummy.innerHTML = param;
      el = toArray(dummy.childNodes);
    } else {
      // Selector
      el = toArray(document.querySelectorAll(param));
    }

    if (!multi) {
      el = el.length >= 1 ? el[0] : undefined;
    }
  } else if (param === win) {
    // window
    el = param;
  } else if (param.nodeName && (param.nodeType === 1 || param.nodeType === 9)) {
    // HTMLElement, Document
    el = param;
  } else if ("jQuery" in win && param instanceof jQuery || param.constructor.prototype.jquery) {
    // jQuery
    el = multi ? param.toArray() : param.get(0);
  } else if (Array.isArray(param)) {
    el = param.map(function (v) {
      return $(v);
    });

    if (!multi) {
      el = el.length >= 1 ? el[0] : undefined;
    }
  }

  return el;
};
var raf = win.requestAnimationFrame || win.webkitRequestAnimationFrame;
var caf = win.cancelAnimationFrame || win.webkitCancelAnimationFrame;

if (raf && !caf) {
  var keyInfo_1 = {};
  var oldraf_1 = raf;

  raf = function (callback) {
    var wrapCallback = function (timestamp) {
      if (keyInfo_1[key]) {
        callback(timestamp);
      }
    };

    var key = oldraf_1(wrapCallback);
    keyInfo_1[key] = true;
    return key;
  };

  caf = function (key) {
    delete keyInfo_1[key];
  };
} else if (!(raf && caf)) {
  raf = function (callback) {
    return win.setTimeout(function () {
      callback(win.performance && win.performance.now && win.performance.now() || new Date().getTime());
    }, 16);
  };

  caf = win.clearTimeout;
}
/**
 * A polyfill for the window.requestAnimationFrame() method.
 * @see  https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 * @private
 */


var requestAnimationFrame = function (fp) {
  return raf(fp);
};
/**
 * A polyfill for the window.cancelAnimationFrame() method. It cancels an animation executed through a call to the requestAnimationFrame() method.
 * @param {Number} key −	The ID value returned through a call to the requestAnimationFrame() method. <ko>requestAnimationFrame() 메서드가 반환한 아이디 값</ko>
 * @see  https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame
 * @private
 */

var cancelAnimationFrame = function (key) {
  caf(key);
};
var map = function (obj, callback) {
  var tranformed = {};

  for (var k in obj) {
    if (k) {
      tranformed[k] = callback(obj[k], k);
    }
  }

  return tranformed;
};
var filter = function (obj, callback) {
  var filtered = {};

  for (var k in obj) {
    if (k && callback(obj[k], k)) {
      filtered[k] = obj[k];
    }
  }

  return filtered;
};
var every = function (obj, callback) {
  for (var k in obj) {
    if (k && !callback(obj[k], k)) {
      return false;
    }
  }

  return true;
};
var equal = function (target, base) {
  return every(target, function (v, k) {
    return v === base[k];
  });
};
var roundNumFunc = {};
var roundNumber = function (num, roundUnit) {
  // Cache for performance
  if (!roundNumFunc[roundUnit]) {
    roundNumFunc[roundUnit] = getRoundFunc(roundUnit);
  }

  return roundNumFunc[roundUnit](num);
};
var roundNumbers = function (num, roundUnit) {
  if (!num || !roundUnit) {
    return num;
  }

  return map(num, function (value, key) {
    return roundNumber(value, typeof roundUnit === "number" ? roundUnit : roundUnit[key]);
  });
};
var getDecimalPlace = function (val) {
  if (!isFinite(val)) {
    return 0;
  }

  var v = "" + val;

  if (v.indexOf("e") >= 0) {
    // Exponential Format
    // 1e-10, 1e-12
    var p = 0;
    var e = 1;

    while (Math.round(val * e) / e !== val) {
      e *= 10;
      p++;
    }

    return p;
  } // In general, following has performance benefit.
  // https://jsperf.com/precision-calculation


  return v.indexOf(".") >= 0 ? v.length - v.indexOf(".") - 1 : 0;
};
var inversePow = function (n) {
  // replace Math.pow(10, -n) to solve floating point issue.
  // eg. Math.pow(10, -4) => 0.00009999999999999999
  return 1 / Math.pow(10, n);
};
var getRoundFunc = function (v) {
  var p = v < 1 ? Math.pow(10, getDecimalPlace(v)) : 1;
  return function (n) {
    if (v === 0) {
      return 0;
    }

    return Math.round(Math.round(n / v) * v * p) / p;
  };
};
var getAngle = function (posX, posY) {
  return Math.atan2(posY, posX) * 180 / Math.PI;
};
var setCssProps = function (element, originalCssProps) {
  var oldCssProps = {};

  if (element.style) {
    var newCssProps_1 = originalCssProps ? originalCssProps : PREVENT_SCROLL_CSSPROPS;
    Object.keys(newCssProps_1).forEach(function (prop) {
      oldCssProps[prop] = element.style[prop];
      element.style[prop] = newCssProps_1[prop];
    });
  }

  return oldCssProps;
};

var clamp = function (value, min, max) {
  return Math.max(Math.min(value, max), min);
};

var AnimationManager =
/*#__PURE__*/
function () {
  function AnimationManager(_a) {
    var options = _a.options,
        interruptManager = _a.interruptManager,
        eventManager = _a.eventManager,
        axisManager = _a.axisManager;
    this._options = options;
    this.interruptManager = interruptManager;
    this.eventManager = eventManager;
    this.axisManager = axisManager;
    this.animationEnd = this.animationEnd.bind(this);
  }

  var __proto = AnimationManager.prototype;

  __proto.getDuration = function (depaPos, destPos, wishDuration) {
    var _this = this;

    var duration;

    if (typeof wishDuration !== "undefined") {
      duration = wishDuration;
    } else {
      var durations_1 = map(destPos, function (v, k) {
        return getDuration(Math.abs(v - depaPos[k]), _this._options.deceleration);
      });
      duration = Object.keys(durations_1).reduce(function (max, v) {
        return Math.max(max, durations_1[v]);
      }, -Infinity);
    }

    return clamp(duration, this._options.minimumDuration, this._options.maximumDuration);
  };

  __proto.getDisplacement = function (velocity) {
    var totalVelocity = Math.pow(velocity.reduce(function (total, v) {
      return total + v * v;
    }, 0), 1 / velocity.length);
    var duration = Math.abs(totalVelocity / -this._options.deceleration);
    return velocity.map(function (v) {
      return v / 2 * duration;
    });
  };

  __proto.interpolate = function (displacement, threshold) {
    var initSlope = this.easing(0.00001) / 0.00001;
    return this.easing(displacement / (threshold * initSlope)) * threshold;
  };

  __proto.stopAnimation = function (axes, option) {
    if (this._animateParam && axes.length) {
      var orgPos_1 = this.axisManager.get(axes);
      var pos = this.axisManager.map(orgPos_1, function (v, opt) {
        return getCirculatedPos(v, opt.range, opt.circular);
      });

      if (!every(pos, function (v, k) {
        return orgPos_1[k] === v;
      })) {
        this.eventManager.triggerChange(pos, false, orgPos_1, option, !!option);
      }

      this._animateParam = null;

      if (this._raf) {
        cancelAnimationFrame(this._raf);
      }

      this._raf = null;
      this.eventManager.triggerAnimationEnd(!!(option === null || option === void 0 ? void 0 : option.event));
    }
  };

  __proto.getEventInfo = function () {
    if (this._animateParam && this._animateParam.input && this._animateParam.inputEvent) {
      return {
        input: this._animateParam.input,
        event: this._animateParam.inputEvent
      };
    } else {
      return null;
    }
  };

  __proto.restore = function (option) {
    var pos = this.axisManager.get();
    var destPos = this.axisManager.map(pos, function (v, opt) {
      return Math.min(opt.range[1], Math.max(opt.range[0], v));
    });
    this.stopAnimation(Object.keys(this.axisManager.get()));
    this.animateTo(destPos, this.getDuration(pos, destPos), option);
  };

  __proto.animationEnd = function () {
    var beforeParam = this.getEventInfo();
    this._animateParam = null; // for Circular

    var circularTargets = this.axisManager.filter(this.axisManager.get(), function (v, opt) {
      return isCircularable(v, opt.range, opt.circular);
    });

    if (Object.keys(circularTargets).length > 0) {
      this.setTo(this.axisManager.map(circularTargets, function (v, opt) {
        return getCirculatedPos(v, opt.range, opt.circular);
      }));
    }

    this.interruptManager.setInterrupt(false);
    this.eventManager.triggerAnimationEnd(!!beforeParam);

    if (this.axisManager.isOutside()) {
      this.restore(beforeParam);
    } else {
      this.finish(!!beforeParam);
    }
  };

  __proto.finish = function (isTrusted) {
    this._animateParam = null;
    this.interruptManager.setInterrupt(false);
    this.eventManager.triggerFinish(isTrusted);
  };

  __proto.getUserControl = function (param) {
    var userWish = param.setTo();
    userWish.destPos = this.axisManager.get(userWish.destPos);
    userWish.duration = clamp(userWish.duration, this._options.minimumDuration, this._options.maximumDuration);
    return userWish;
  };

  __proto.animateTo = function (destPos, duration, option) {
    var _this = this;

    var param = this._createAnimationParam(destPos, duration, option);

    var depaPos = __assign({}, param.depaPos);

    var retTrigger = this.eventManager.triggerAnimationStart(param); // to control

    var userWish = this.getUserControl(param); // You can't stop the 'animationStart' event when 'circular' is true.

    if (!retTrigger && this.axisManager.every(userWish.destPos, function (v, opt) {
      return isCircularable(v, opt.range, opt.circular);
    })) {
      console.warn("You can't stop the 'animation' event when 'circular' is true.");
    }

    if (retTrigger && !equal(userWish.destPos, depaPos)) {
      var inputEvent = (option === null || option === void 0 ? void 0 : option.event) || null;

      this._animateLoop({
        depaPos: depaPos,
        destPos: userWish.destPos,
        duration: userWish.duration,
        delta: this.axisManager.getDelta(depaPos, userWish.destPos),
        isTrusted: !!inputEvent,
        inputEvent: inputEvent,
        input: (option === null || option === void 0 ? void 0 : option.input) || null
      }, function () {
        return _this.animationEnd();
      });
    }
  };

  __proto.easing = function (p) {
    return p > 1 ? 1 : this._options.easing(p);
  };

  __proto.setTo = function (pos, duration) {
    if (duration === void 0) {
      duration = 0;
    }

    var axes = Object.keys(pos);
    this.stopAnimation(axes);
    var orgPos = this.axisManager.get(axes);

    if (equal(pos, orgPos)) {
      return this;
    }

    this.interruptManager.setInterrupt(true);
    var movedPos = filter(pos, function (v, k) {
      return orgPos[k] !== v;
    });

    if (!Object.keys(movedPos).length) {
      return this;
    }

    movedPos = this.axisManager.map(movedPos, function (v, opt) {
      var range = opt.range,
          circular = opt.circular;

      if (circular && (circular[0] || circular[1])) {
        return v;
      } else {
        return getInsidePosition(v, range, circular);
      }
    });

    if (equal(movedPos, orgPos)) {
      return this;
    }

    if (duration > 0) {
      this.animateTo(movedPos, duration);
    } else {
      this.eventManager.triggerChange(movedPos);
      this.finish(false);
    }

    return this;
  };

  __proto.setBy = function (pos, duration) {
    if (duration === void 0) {
      duration = 0;
    }

    return this.setTo(map(this.axisManager.get(Object.keys(pos)), function (v, k) {
      return v + pos[k];
    }), duration);
  };

  __proto.updateAnimation = function (options) {
    var animateParam = this._animateParam;

    if (!animateParam) {
      return;
    }

    var diffTime = new Date().getTime() - animateParam.startTime;
    var pos = (options === null || options === void 0 ? void 0 : options.destPos) || animateParam.destPos;
    var duration = (options === null || options === void 0 ? void 0 : options.duration) || animateParam.duration;

    if ((options === null || options === void 0 ? void 0 : options.restart) || duration <= diffTime) {
      this.setTo(pos, duration - diffTime);
      return;
    }

    if (options === null || options === void 0 ? void 0 : options.destPos) {
      var currentPos = this.axisManager.get(); // When destination is changed, new delta should be calculated as remaining percent.
      // For example, moving x:0, y:0 to x:200, y:200 and it has current easing percent of 92%. coordinate is x:184 and y:184
      // If destination changes to x:300, y:300. xdelta:200, ydelta:200 changes to xdelta:116, ydelta:116 and use remaining easingPer as 100%, not 8% as previous.
      // Therefore, original easingPer by time is kept. And divided by (1 - self._initialEasingPer) which means new total easing percent. Like calculating 8% as 100%.

      this._initialEasingPer = this._prevEasingPer;
      animateParam.delta = this.axisManager.getDelta(currentPos, pos);
      animateParam.destPos = pos;
    }

    if (options === null || options === void 0 ? void 0 : options.duration) {
      var ratio = (diffTime + this._durationOffset) / animateParam.duration; // Use durationOffset for keeping animation ratio after duration is changed.
      // newRatio = (diffTime + newDurationOffset) / newDuration = oldRatio
      // newDurationOffset = oldRatio * newDuration - diffTime

      this._durationOffset = ratio * duration - diffTime;
      animateParam.duration = duration;
    }
  };

  __proto._createAnimationParam = function (pos, duration, option) {
    var depaPos = this.axisManager.get();
    var destPos = pos;
    var inputEvent = (option === null || option === void 0 ? void 0 : option.event) || null;
    return {
      depaPos: depaPos,
      destPos: destPos,
      duration: clamp(duration, this._options.minimumDuration, this._options.maximumDuration),
      delta: this.axisManager.getDelta(depaPos, destPos),
      inputEvent: inputEvent,
      input: (option === null || option === void 0 ? void 0 : option.input) || null,
      isTrusted: !!inputEvent,
      done: this.animationEnd
    };
  };

  __proto._animateLoop = function (param, complete) {
    var _this = this;

    if (param.duration) {
      var prevPos_1 = param.depaPos;
      this._initialEasingPer = 0;
      this._prevEasingPer = 0;
      this._durationOffset = 0;
      this._animateParam = __assign(__assign({}, param), {
        startTime: new Date().getTime()
      });
      var directions_1 = map(prevPos_1, function (value, key) {
        return value <= param.destPos[key] ? 1 : -1;
      });
      var originalIntendedPos_1 = map(param.destPos, function (v) {
        return v;
      });

      var loop_1 = function () {
        var animateParam = _this._animateParam;
        var diffTime = new Date().getTime() - animateParam.startTime;
        var ratio = (diffTime + _this._durationOffset) / animateParam.duration;

        var easingPer = _this.easing(ratio);

        _this._raf = null;

        var toPos = _this.axisManager.map(prevPos_1, function (pos, options, key) {
          var nextPos = ratio >= 1 ? animateParam.destPos[key] : pos + animateParam.delta[key] * (easingPer - _this._prevEasingPer) / (1 - _this._initialEasingPer); // Subtract distance from distance already moved.
          // Recalculate the remaining distance.
          // Fix the bouncing phenomenon by changing the range.

          var circulatedPos = getCirculatedPos(nextPos, options.range, options.circular);

          if (nextPos !== circulatedPos) {
            // circular
            var rangeOffset = directions_1[key] * (options.range[1] - options.range[0]);
            animateParam.destPos[key] -= rangeOffset;
            prevPos_1[key] -= rangeOffset;
          }

          return circulatedPos;
        });

        var isCanceled = !_this.eventManager.triggerChange(toPos, false, prevPos_1);
        prevPos_1 = toPos;
        _this._prevEasingPer = easingPer;

        if (easingPer >= 1) {
          animateParam.destPos = _this._getFinalPos(animateParam.destPos, originalIntendedPos_1);

          if (!equal(animateParam.destPos, _this.axisManager.get(Object.keys(animateParam.destPos)))) {
            _this.eventManager.triggerChange(animateParam.destPos, true, prevPos_1);
          }

          complete();
          return;
        } else if (isCanceled) {
          _this.finish(false);
        } else {
          // animationEnd
          _this._raf = requestAnimationFrame(loop_1);
        }
      };

      loop_1();
    } else {
      this.eventManager.triggerChange(param.destPos, true);
      complete();
    }
  };
  /**
   * Get estimated final value.
   *
   * If destPos is within the 'error range' of the original intended position, the initial intended position is returned.
   *   - eg. original intended pos: 100, destPos: 100.0000000004 ==> return 100;
   * If dest Pos is outside the 'range of error' compared to the originally intended pos, it is returned rounded based on the originally intended pos.
   *   - eg. original intended pos: 100.123 destPos: 50.12345 => return 50.123
   * @param originalIntendedPos
   * @param destPos
   */


  __proto._getFinalPos = function (destPos, originalIntendedPos) {
    var _this = this; // compare destPos and originalIntendedPos
    // eslint-disable-next-line @typescript-eslint/naming-convention


    var ERROR_LIMIT = 0.000001;
    var finalPos = map(destPos, function (value, key) {
      if (value >= originalIntendedPos[key] - ERROR_LIMIT && value <= originalIntendedPos[key] + ERROR_LIMIT) {
        // In error range, return original intended
        return originalIntendedPos[key];
      } else {
        // Out of error range, return rounded pos.
        var roundUnit = _this._getRoundUnit(value, key);

        var result = roundNumber(value, roundUnit);
        return result;
      }
    });
    return finalPos;
  };

  __proto._getRoundUnit = function (val, key) {
    var roundUnit = this._options.round; // manual mode

    var minRoundUnit = null; // auto mode
    // auto mode

    if (!roundUnit) {
      // Get minimum round unit
      var options = this.axisManager.getAxisOptions(key);
      minRoundUnit = inversePow(Math.max(getDecimalPlace(options.range[0]), getDecimalPlace(options.range[1]), getDecimalPlace(val)));
    }

    return minRoundUnit || roundUnit;
  };

  return AnimationManager;
}();

var EventManager =
/*#__PURE__*/
function () {
  function EventManager(_axes) {
    this._axes = _axes;
  }
  /**
   * This event is fired when a user holds an element on the screen of the device.
   * @ko 사용자가 기기의 화면에 손을 대고 있을 때 발생하는 이벤트
   * @event Axes#hold
   * @type {object}
   * @property {Object.<string, number>} pos coordinate <ko>좌표 정보</ko>
   * @property {Object} input The instance of inputType where the event occurred<ko>이벤트가 발생한 inputType 인스턴스</ko>
   * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   *
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("hold", function(event) {
   *   // event.pos
   *   // event.input
   *   // event.inputEvent
   *   // isTrusted
   * });
   * ```
   */


  var __proto = EventManager.prototype;

  __proto.hold = function (pos, option) {
    var roundPos = this._getRoundPos(pos).roundPos;

    this._axes.trigger(new ComponentEvent("hold", {
      pos: roundPos,
      input: option.input || null,
      inputEvent: option.event || null,
      isTrusted: true
    }));
  };
  /**
   * Specifies the coordinates to move after the 'change' event. It works when the holding value of the change event is true.
   * @ko 'change' 이벤트 이후 이동할 좌표를 지정한다. change이벤트의 holding 값이 true일 경우에 동작한다
   * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("change", function(event) {
   *   event.holding && event.set({x: 10});
   * });
   * ```
   */

  /** Specifies the animation coordinates to move after the 'release' or 'animationStart' events.
   * @ko 'release' 또는 'animationStart' 이벤트 이후 이동할 좌표를 지정한다.
   * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
   * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("animationStart", function(event) {
   *   event.setTo({x: 10}, 2000);
   * });
   * ```
   */

  /**
   * This event is fired when a user release an element on the screen of the device.
   * @ko 사용자가 기기의 화면에서 손을 뗐을 때 발생하는 이벤트
   * @event Axes#release
   * @type {object}
   * @property {Object.<string, number>} depaPos The coordinates when releasing an element<ko>손을 뗐을 때의 좌표 </ko>
   * @property {Object.<string, number>} destPos The coordinates to move to after releasing an element<ko>손을 뗀 뒤에 이동할 좌표</ko>
   * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
   * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
   * @property {Object} input The instance of inputType where the event occurred<ko>이벤트가 발생한 inputType 인스턴스</ko>
   * @property {setTo} setTo Specifies the animation coordinates to move after the event <ko>이벤트 이후 이동할 애니메이션 좌표를 지정한다</ko>
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   *
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("release", function(event) {
   *   // event.depaPos
   *   // event.destPos
   *   // event.delta
   *   // event.input
   *   // event.inputEvent
   *   // event.setTo
   *   // event.isTrusted
   *
   *   // if you want to change the animation coordinates to move after the 'release' event.
   *   event.setTo({x: 10}, 2000);
   * });
   * ```
   */


  __proto.triggerRelease = function (param) {
    var _a = this._getRoundPos(param.destPos, param.depaPos),
        roundPos = _a.roundPos,
        roundDepa = _a.roundDepa;

    param.destPos = roundPos;
    param.depaPos = roundDepa;
    param.setTo = this._createUserControll(param.destPos, param.duration);

    this._axes.trigger(new ComponentEvent("release", __assign(__assign({}, param), {
      bounceRatio: this._getBounceRatio(roundPos)
    })));
  };
  /**
   * This event is fired when coordinate changes.
   * @ko 좌표가 변경됐을 때 발생하는 이벤트
   * @event Axes#change
   * @type {object}
   * @property {Object.<string, number>} pos  The coordinate <ko>좌표</ko>
   * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
   * @property {Boolean} holding Indicates whether a user holds an element on the screen of the device.<ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
   * @property {Object} input The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.<ko>이벤트가 발생한 inputType 인스턴스. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
   * @property {Object} inputEvent The event object received from inputType. If the value is changed by animation, it returns 'null'.<ko>inputType으로 부터 받은 이벤트 객체. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
   * @property {set} set Specifies the coordinates to move after the event. It works when the holding value is true <ko>이벤트 이후 이동할 좌표를 지정한다. holding 값이 true일 경우에 동작한다.</ko>
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   *
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("change", function(event) {
   *   // event.pos
   *   // event.delta
   *   // event.input
   *   // event.inputEvent
   *   // event.holding
   *   // event.set
   *   // event.isTrusted
   *
   *   // if you want to change the coordinates to move after the 'change' event.
   *   // it works when the holding value of the change event is true.
   *   event.holding && event.set({x: 10});
   * });
   * ```
   */


  __proto.triggerChange = function (pos, isAccurate, depaPos, option, holding) {
    if (holding === void 0) {
      holding = false;
    }

    var animationManager = this.animationManager;
    var axisManager = animationManager.axisManager;
    var eventInfo = animationManager.getEventInfo();

    var _a = this._getRoundPos(pos, depaPos),
        roundPos = _a.roundPos,
        roundDepa = _a.roundDepa;

    var moveTo = axisManager.moveTo(roundPos, roundDepa);
    var inputEvent = (option === null || option === void 0 ? void 0 : option.event) || (eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.event) || null;
    var param = {
      pos: moveTo.pos,
      delta: moveTo.delta,
      bounceRatio: this._getBounceRatio(moveTo.pos),
      holding: holding,
      inputEvent: inputEvent,
      isTrusted: !!inputEvent,
      input: (option === null || option === void 0 ? void 0 : option.input) || (eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.input) || null,
      set: inputEvent ? this._createUserControll(moveTo.pos) : function () {}
    };

    var result = this._axes.trigger(new ComponentEvent("change", param));

    if (inputEvent) {
      axisManager.set(param.set().destPos);
    }

    return result;
  };
  /**
   * This event is fired when animation starts.
   * @ko 에니메이션이 시작할 때 발생한다.
   * @event Axes#animationStart
   * @type {object}
   * @property {Object.<string, number>} depaPos The coordinates when animation starts<ko>애니메이션이 시작 되었을 때의 좌표 </ko>
   * @property {Object.<string, number>} destPos The coordinates to move to. If you change this value, you can run the animation<ko>이동할 좌표. 이값을 변경하여 애니메이션을 동작시킬수 있다</ko>
   * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
   * @property {Number} duration Duration of the animation (unit: ms). If you change this value, you can control the animation duration time.<ko>애니메이션 진행 시간(단위: ms). 이값을 변경하여 애니메이션의 이동시간을 조절할 수 있다.</ko>
   * @property {Object} input The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.<ko>이벤트가 발생한 inputType 인스턴스. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
   * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
   * @property {setTo} setTo Specifies the animation coordinates to move after the event <ko>이벤트 이후 이동할 애니메이션 좌표를 지정한다</ko>
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   *
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("release", function(event) {
   *   // event.depaPos
   *   // event.destPos
   *   // event.delta
   *   // event.input
   *   // event.inputEvent
   *   // event.setTo
   *   // event.isTrusted
   *
   *   // if you want to change the animation coordinates to move after the 'animationStart' event.
   *   event.setTo({x: 10}, 2000);
   * });
   * ```
   */


  __proto.triggerAnimationStart = function (param) {
    var _a = this._getRoundPos(param.destPos, param.depaPos),
        roundPos = _a.roundPos,
        roundDepa = _a.roundDepa;

    param.destPos = roundPos;
    param.depaPos = roundDepa;
    param.setTo = this._createUserControll(param.destPos, param.duration);
    return this._axes.trigger(new ComponentEvent("animationStart", param));
  };
  /**
   * This event is fired when animation ends.
   * @ko 에니메이션이 끝났을 때 발생한다.
   * @event Axes#animationEnd
   * @type {object}
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   *
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("animationEnd", function(event) {
   *   // event.isTrusted
   * });
   * ```
   */


  __proto.triggerAnimationEnd = function (isTrusted) {
    if (isTrusted === void 0) {
      isTrusted = false;
    }

    this._axes.trigger(new ComponentEvent("animationEnd", {
      isTrusted: isTrusted
    }));
  };
  /**
   * This event is fired when all actions have been completed.
   * @ko 에니메이션이 끝났을 때 발생한다.
   * @event Axes#finish
   * @type {object}
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   *
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("finish", function(event) {
   *   // event.isTrusted
   * });
   * ```
   */


  __proto.triggerFinish = function (isTrusted) {
    if (isTrusted === void 0) {
      isTrusted = false;
    }

    this._axes.trigger(new ComponentEvent("finish", {
      isTrusted: isTrusted
    }));
  };

  __proto.setAnimationManager = function (animationManager) {
    this.animationManager = animationManager;
  };

  __proto.destroy = function () {
    this._axes.off();
  };

  __proto._createUserControll = function (pos, duration) {
    if (duration === void 0) {
      duration = 0;
    } // to controll


    var userControl = {
      destPos: __assign({}, pos),
      duration: duration
    };
    return function (toPos, userDuration) {
      if (toPos) {
        userControl.destPos = __assign({}, toPos);
      }

      if (userDuration !== undefined) {
        userControl.duration = userDuration;
      }

      return userControl;
    };
  };

  __proto._getRoundPos = function (pos, depaPos) {
    // round value if round exist
    var roundUnit = this._axes.options.round; // if (round == null) {
    // 	return {pos, depaPos}; // undefined, undefined
    // }

    return {
      roundPos: roundNumbers(pos, roundUnit),
      roundDepa: roundNumbers(depaPos, roundUnit)
    };
  };

  __proto._getBounceRatio = function (pos) {
    return this._axes.axisManager.map(pos, function (v, opt) {
      if (v < opt.range[0] && opt.bounce[0] !== 0) {
        return (opt.range[0] - v) / opt.bounce[0];
      } else if (v > opt.range[1] && opt.bounce[1] !== 0) {
        return (v - opt.range[1]) / opt.bounce[1];
      } else {
        return 0;
      }
    });
  };

  return EventManager;
}();

var InterruptManager =
/*#__PURE__*/
function () {
  function InterruptManager(_options) {
    this._options = _options;
    this._prevented = false; //  check whether the animation event was prevented
  }

  var __proto = InterruptManager.prototype;

  __proto.isInterrupting = function () {
    // when interruptable is 'true', return value is always 'true'.
    return this._options.interruptable || this._prevented;
  };

  __proto.isInterrupted = function () {
    return !this._options.interruptable && this._prevented;
  };

  __proto.setInterrupt = function (prevented) {
    if (!this._options.interruptable) {
      this._prevented = prevented;
    }
  };

  return InterruptManager;
}();

var AxisManager =
/*#__PURE__*/
function () {
  function AxisManager(_axis) {
    var _this = this;

    this._axis = _axis;

    this._complementOptions();

    this._pos = Object.keys(this._axis).reduce(function (acc, v) {
      acc[v] = _this._axis[v].range[0];
      return acc;
    }, {});
  }

  var __proto = AxisManager.prototype;

  __proto.getDelta = function (depaPos, destPos) {
    var fullDepaPos = this.get(depaPos);
    return map(this.get(destPos), function (v, k) {
      return v - fullDepaPos[k];
    });
  };

  __proto.get = function (axes) {
    var _this = this;

    if (axes && Array.isArray(axes)) {
      return axes.reduce(function (acc, v) {
        if (v && v in _this._pos) {
          acc[v] = _this._pos[v];
        }

        return acc;
      }, {});
    } else {
      return __assign(__assign({}, this._pos), axes || {});
    }
  };

  __proto.moveTo = function (pos, depaPos) {
    if (depaPos === void 0) {
      depaPos = this._pos;
    }

    var delta = map(this._pos, function (v, key) {
      return key in pos && key in depaPos ? pos[key] - depaPos[key] : 0;
    });
    this.set(this.map(pos, function (v, opt) {
      return opt ? getCirculatedPos(v, opt.range, opt.circular) : 0;
    }));
    return {
      pos: __assign({}, this._pos),
      delta: delta
    };
  };

  __proto.set = function (pos) {
    for (var k in pos) {
      if (k && k in this._pos) {
        this._pos[k] = pos[k];
      }
    }
  };

  __proto.every = function (pos, callback) {
    var axisOptions = this._axis;
    return every(pos, function (value, key) {
      return callback(value, axisOptions[key], key);
    });
  };

  __proto.filter = function (pos, callback) {
    var axisOptions = this._axis;
    return filter(pos, function (value, key) {
      return callback(value, axisOptions[key], key);
    });
  };

  __proto.map = function (pos, callback) {
    var axisOptions = this._axis;
    return map(pos, function (value, key) {
      return callback(value, axisOptions[key], key);
    });
  };

  __proto.isOutside = function (axes) {
    return !this.every(axes ? this.get(axes) : this._pos, function (v, opt) {
      return !isOutside(v, opt.range);
    });
  };

  __proto.getAxisOptions = function (key) {
    return this._axis[key];
  };
  /**
   * set up 'css' expression
   * @private
   */


  __proto._complementOptions = function () {
    var _this = this;

    Object.keys(this._axis).forEach(function (axis) {
      _this._axis[axis] = __assign({
        range: [0, 100],
        bounce: [0, 0],
        circular: [false, false]
      }, _this._axis[axis]);
      ["bounce", "circular"].forEach(function (v) {
        var axisOption = _this._axis;
        var key = axisOption[axis][v];

        if (/string|number|boolean/.test(typeof key)) {
          axisOption[axis][v] = [key, key];
        }
      });
    });
  };

  return AxisManager;
}();

var SUPPORT_TOUCH = ("ontouchstart" in win);
var SUPPORT_POINTER = ("PointerEvent" in win);
var SUPPORT_MSPOINTER = ("MSPointerEvent" in win);
var SUPPORT_POINTER_EVENTS = SUPPORT_POINTER || SUPPORT_MSPOINTER;

var EventInput =
/*#__PURE__*/
function () {
  function EventInput() {}

  var __proto = EventInput.prototype;

  __proto.extendEvent = function (event) {
    var prevEvent = this.prevEvent;

    var center = this._getCenter(event);

    var movement = prevEvent ? this._getMovement(event) : {
      x: 0,
      y: 0
    };
    var scale = prevEvent ? this._getScale(event) : 1;
    var angle = prevEvent ? getAngle(center.x - prevEvent.center.x, center.y - prevEvent.center.y) : 0;
    var deltaX = prevEvent ? prevEvent.deltaX + movement.x : movement.x;
    var deltaY = prevEvent ? prevEvent.deltaY + movement.y : movement.y;
    var offsetX = prevEvent ? deltaX - prevEvent.deltaX : 0;
    var offsetY = prevEvent ? deltaY - prevEvent.deltaY : 0;
    var deltaTime = prevEvent ? event.timeStamp - prevEvent.srcEvent.timeStamp : 0;
    var velocityX = prevEvent && deltaTime !== 0 ? offsetX / deltaTime : 0;
    var velocityY = prevEvent && deltaTime !== 0 ? offsetY / deltaTime : 0;
    return {
      srcEvent: event,
      scale: scale,
      angle: angle,
      center: center,
      deltaX: deltaX,
      deltaY: deltaY,
      offsetX: offsetX,
      offsetY: offsetY,
      velocityX: velocityX,
      velocityY: velocityY,
      preventSystemEvent: true
    };
  };

  __proto._getDistance = function (start, end) {
    var x = end.clientX - start.clientX;
    var y = end.clientY - start.clientY;
    return Math.sqrt(x * x + y * y);
  };

  return EventInput;
}();

var MouseEventInput =
/*#__PURE__*/
function (_super) {
  __extends(MouseEventInput, _super);

  function MouseEventInput() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.start = ["mousedown"];
    _this.move = ["mousemove"];
    _this.end = ["mouseup"];
    return _this;
  }

  var __proto = MouseEventInput.prototype;

  __proto.onEventStart = function (event) {
    return this.extendEvent(event);
  };

  __proto.onEventMove = function (event) {
    return this.extendEvent(event);
  };

  __proto.onEventEnd = function () {
    return;
  };

  __proto.getTouches = function () {
    return 0;
  };

  __proto._getScale = function () {
    return 1;
  };

  __proto._getCenter = function (event) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  };

  __proto._getMovement = function (event) {
    var prev = this.prevEvent.srcEvent;
    return {
      x: event.pageX - prev.pageX,
      y: event.pageY - prev.pageY
    };
  };

  return MouseEventInput;
}(EventInput);

var TouchEventInput =
/*#__PURE__*/
function (_super) {
  __extends(TouchEventInput, _super);

  function TouchEventInput() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.start = ["touchstart"];
    _this.move = ["touchmove"];
    _this.end = ["touchend", "touchcancel"];
    return _this;
  }

  var __proto = TouchEventInput.prototype;

  __proto.onEventStart = function (event) {
    this._firstTouch = event;
    return this.extendEvent(event);
  };

  __proto.onEventMove = function (event) {
    return this.extendEvent(event);
  };

  __proto.onEventEnd = function () {
    return;
  };

  __proto.getTouches = function (event) {
    return event.touches.length;
  };

  __proto._getScale = function (event) {
    if (event.touches.length !== 2) {
      return null; // TODO: consider calculating non-pinch gesture scale
    }

    return this._getDistance(event.touches[0], event.touches[1]) / this._getDistance(this._firstTouch.touches[0], this._firstTouch.touches[1]);
  };

  __proto._getCenter = function (event) {
    return {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY
    };
  };

  __proto._getMovement = function (event) {
    var prev = this.prevEvent.srcEvent;

    if (event.touches[0].identifier !== prev.touches[0].identifier) {
      return {
        x: 0,
        y: 0
      };
    }

    return {
      x: event.touches[0].pageX - prev.touches[0].pageX,
      y: event.touches[0].pageY - prev.touches[0].pageY
    };
  };

  return TouchEventInput;
}(EventInput);

var PointerEventInput =
/*#__PURE__*/
function (_super) {
  __extends(PointerEventInput, _super);

  function PointerEventInput() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.start = SUPPORT_POINTER ? ["pointerdown"] : ["MSPointerDown"];
    _this.move = SUPPORT_POINTER ? ["pointermove"] : ["MSPointerMove"];
    _this.end = SUPPORT_POINTER ? ["pointerup", "pointercancel"] : ["MSPointerUp", "MSPointerCancel"]; // store first, recent inputs for each event id

    _this._firstInputs = [];
    _this._recentInputs = [];
    return _this;
  }

  var __proto = PointerEventInput.prototype;

  __proto.onEventStart = function (event) {
    this._updatePointerEvent(event);

    return this.extendEvent(event);
  };

  __proto.onEventMove = function (event) {
    this._updatePointerEvent(event);

    return this.extendEvent(event);
  };

  __proto.onEventEnd = function (event) {
    this._removePointerEvent(event);
  };

  __proto.getTouches = function () {
    return this._recentInputs.length;
  };

  __proto._getScale = function () {
    if (this._recentInputs.length !== 2) {
      return null; // TODO: consider calculating non-pinch gesture scale
    }

    return this._getDistance(this._recentInputs[0], this._recentInputs[1]) / this._getDistance(this._firstInputs[0], this._firstInputs[1]);
  };

  __proto._getCenter = function (event) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  };

  __proto._getMovement = function (event) {
    var prev = this.prevEvent.srcEvent;

    if (event.pointerId !== prev.pointerId) {
      return {
        x: 0,
        y: 0
      };
    }

    return {
      x: event.pageX - prev.pageX,
      y: event.pageY - prev.pageY
    };
  };

  __proto._updatePointerEvent = function (event) {
    var _this = this;

    var addFlag = false;

    this._recentInputs.forEach(function (e, i) {
      if (e.pointerId === event.pointerId) {
        addFlag = true;
        _this._recentInputs[i] = event;
      }
    });

    if (!addFlag) {
      this._firstInputs.push(event);

      this._recentInputs.push(event);
    }
  };

  __proto._removePointerEvent = function (event) {
    this._firstInputs = this._firstInputs.filter(function (x) {
      return x.pointerId !== event.pointerId;
    });
    this._recentInputs = this._recentInputs.filter(function (x) {
      return x.pointerId !== event.pointerId;
    });
  };

  return PointerEventInput;
}(EventInput);

var TouchMouseEventInput =
/*#__PURE__*/
function (_super) {
  __extends(TouchMouseEventInput, _super);

  function TouchMouseEventInput() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.start = ["mousedown", "touchstart"];
    _this.move = ["mousemove", "touchmove"];
    _this.end = ["mouseup", "touchend", "touchcancel"];
    return _this;
  }

  var __proto = TouchMouseEventInput.prototype;

  __proto.onEventStart = function (event) {
    this._firstTouch = event.hasOwnProperty("touches") ? event : null;
    return this.extendEvent(event);
  };

  __proto.onEventMove = function (event) {
    return this.extendEvent(event);
  };

  __proto.onEventEnd = function () {
    return;
  };

  __proto.getTouches = function (event) {
    return this._isTouchEvent(event) ? event.touches.length : 0;
  };

  __proto._getScale = function (event) {
    if (!this._firstTouch || this._isTouchEvent(event) && event.touches.length !== 2) {
      return 1; // TODO: consider calculating non-pinch gesture scale
    }

    if (this._isTouchEvent(event)) {
      return this._getDistance(event.touches[0], event.touches[1]) / this._getDistance(this._firstTouch.touches[0], this._firstTouch.touches[1]);
    }

    return this.prevEvent.scale;
  };

  __proto._getCenter = function (event) {
    if (this._isTouchEvent(event)) {
      return {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
    }

    return {
      x: event.clientX,
      y: event.clientY
    };
  };

  __proto._getMovement = function (event) {
    var _this = this;

    var prev = this.prevEvent.srcEvent;

    var _a = [event, prev].map(function (e) {
      if (_this._isTouchEvent(event)) {
        return {
          id: e.touches[0].identifier,
          x: e.touches[0].pageX,
          y: e.touches[0].pageY
        };
      }

      return {
        id: null,
        x: e.pageX,
        y: e.pageY
      };
    }),
        nextSpot = _a[0],
        prevSpot = _a[1];

    return nextSpot.id === prevSpot.id ? {
      x: nextSpot.x - prevSpot.x,
      y: nextSpot.y - prevSpot.y
    } : {
      x: 0,
      y: 0
    };
  };

  __proto._isTouchEvent = function (event) {
    return event.hasOwnProperty("touches");
  };

  return TouchMouseEventInput;
}(EventInput);

var toAxis = function (source, offset) {
  return offset.reduce(function (acc, v, i) {
    if (source[i]) {
      acc[source[i]] = v;
    }

    return acc;
  }, {});
};
var convertInputType = function (inputType) {
  if (inputType === void 0) {
    inputType = [];
  }

  var hasTouch = false;
  var hasMouse = false;
  var hasPointer = false;
  inputType.forEach(function (v) {
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

var InputObserver =
/*#__PURE__*/
function () {
  function InputObserver(_a) {
    var options = _a.options,
        interruptManager = _a.interruptManager,
        eventManager = _a.eventManager,
        axisManager = _a.axisManager,
        animationManager = _a.animationManager;
    this._isOutside = false;
    this._moveDistance = null;
    this._isStopped = false;
    this.options = options;
    this._interruptManager = interruptManager;
    this._eventManager = eventManager;
    this._axisManager = axisManager;
    this._animationManager = animationManager;
  }

  var __proto = InputObserver.prototype;

  __proto.get = function (input) {
    return this._axisManager.get(input.axes);
  };

  __proto.hold = function (input, event) {
    if (this._interruptManager.isInterrupted() || !input.axes.length) {
      return;
    }

    var changeOption = {
      input: input,
      event: event
    };
    this._isStopped = false;

    this._interruptManager.setInterrupt(true);

    this._animationManager.stopAnimation(input.axes, changeOption);

    if (!this._moveDistance) {
      this._eventManager.hold(this._axisManager.get(), changeOption);
    }

    this._isOutside = this._axisManager.isOutside(input.axes);
    this._moveDistance = this._axisManager.get(input.axes);
  };

  __proto.change = function (input, event, offset, useDuration) {
    if (this._isStopped || !this._interruptManager.isInterrupting() || this._axisManager.every(offset, function (v) {
      return v === 0;
    })) {
      return;
    }

    var depaPos = this._moveDistance || this._axisManager.get(input.axes);

    var destPos; // for outside logic

    destPos = map(depaPos, function (v, k) {
      return v + (offset[k] || 0);
    });

    if (this._moveDistance) {
      this._moveDistance = this._axisManager.map(destPos, function (v, _a) {
        var circular = _a.circular,
            range = _a.range;
        return circular && (circular[0] || circular[1]) ? getCirculatedPos(v, range, circular) : v;
      });
    } // from outside to inside


    if (this._isOutside && this._axisManager.every(depaPos, function (v, opt) {
      return !isOutside(v, opt.range);
    })) {
      this._isOutside = false;
    }

    depaPos = this._atOutside(depaPos);
    destPos = this._atOutside(destPos);
    var changeOption = {
      input: input,
      event: event
    };

    if (useDuration) {
      var duration = this._animationManager.getDuration(destPos, depaPos);

      this._animationManager.stopAnimation(input.axes, changeOption);

      this._animationManager.animateTo(destPos, duration, changeOption);
    } else {
      var isCanceled = !this._eventManager.triggerChange(destPos, false, depaPos, changeOption, true);

      if (isCanceled) {
        this._isStopped = true;
        this._moveDistance = null;

        this._animationManager.finish(false);
      }
    }
  };

  __proto.release = function (input, event, velocity, inputDuration) {
    if (this._isStopped || !this._interruptManager.isInterrupting() || !this._moveDistance) {
      return;
    }

    var pos = this._axisManager.get(input.axes);

    var depaPos = this._axisManager.get();

    var displacement = this._animationManager.getDisplacement(velocity);

    var offset = toAxis(input.axes, displacement);

    var destPos = this._axisManager.get(this._axisManager.map(offset, function (v, opt, k) {
      if (opt.circular && (opt.circular[0] || opt.circular[1])) {
        return pos[k] + v;
      } else {
        return getInsidePosition(pos[k] + v, opt.range, opt.circular, opt.bounce);
      }
    }));

    var duration = this._animationManager.getDuration(destPos, pos, inputDuration); // prepare params


    var param = {
      depaPos: depaPos,
      destPos: destPos,
      duration: duration,
      delta: this._axisManager.getDelta(depaPos, destPos),
      inputEvent: event,
      input: input,
      isTrusted: true
    };

    this._eventManager.triggerRelease(param);

    this._moveDistance = null; // to contol

    var userWish = this._animationManager.getUserControl(param);

    var isEqual = equal(userWish.destPos, depaPos);
    var changeOption = {
      input: input,
      event: event
    };

    if (isEqual || userWish.duration === 0) {
      if (!isEqual) {
        this._eventManager.triggerChange(userWish.destPos, false, depaPos, changeOption, true);
      }

      this._interruptManager.setInterrupt(false);

      if (this._axisManager.isOutside()) {
        this._animationManager.restore(changeOption);
      } else {
        this._eventManager.triggerFinish(true);
      }
    } else {
      this._animationManager.animateTo(userWish.destPos, userWish.duration, changeOption);
    }
  }; // when move pointer is held in outside


  __proto._atOutside = function (pos) {
    var _this = this;

    if (this._isOutside) {
      return this._axisManager.map(pos, function (v, opt) {
        var tn = opt.range[0] - opt.bounce[0];
        var tx = opt.range[1] + opt.bounce[1];
        return v > tx ? tx : v < tn ? tn : v;
      });
    } else {
      return this._axisManager.map(pos, function (v, opt) {
        var min = opt.range[0];
        var max = opt.range[1];
        var out = opt.bounce;
        var circular = opt.circular;

        if (circular && (circular[0] || circular[1])) {
          return v;
        } else if (v < min) {
          // left
          return min - _this._animationManager.interpolate(min - v, out[0]);
        } else if (v > max) {
          // right
          return max + _this._animationManager.interpolate(v - max, out[1]);
        }

        return v;
      });
    }
  };

  return InputObserver;
}();

/**
 * @typedef {Object} AxisOption The Axis information. The key of the axis specifies the name to use as the logical virtual coordinate system.
 * @ko 축 정보. 축의 키는 논리적인 가상 좌표계로 사용할 이름을 지정한다.
 * @param {Number[]} [range] The coordinate of range <ko>좌표 범위</ko>
 * @param {Number} [range[0]=0] The coordinate of the minimum <ko>최소 좌표</ko>
 * @param {Number} [range[1]=0] The coordinate of the maximum <ko>최대 좌표</ko>
 * @param {Number[]} [bounce] The size of bouncing area. The coordinates can exceed the coordinate area as much as the bouncing area based on user action. If the coordinates does not exceed the bouncing area when an element is dragged, the coordinates where bouncing effects are applied are retuned back into the coordinate area<ko>바운스 영역의 크기. 사용자의 동작에 따라 좌표가 좌표 영역을 넘어 바운스 영역의 크기만큼 더 이동할 수 있다. 사용자가 끌어다 놓는 동작을 했을 때 좌표가 바운스 영역에 있으면, 바운스 효과가 적용된 좌표가 다시 좌표 영역 안으로 들어온다</ko>
 * @param {Number} [bounce[0]=0] The size of coordinate of the minimum area <ko>최소 좌표 바운스 영역의 크기</ko>
 * @param {Number} [bounce[1]=0] The size of coordinate of the maximum area <ko>최대 좌표 바운스 영역의 크기</ko>
 * @param {Boolean[]} [circular] Indicates whether a circular element is available. If it is set to "true" and an element is dragged outside the coordinate area, the element will appear on the other side.<ko>순환 여부. 'true'로 설정한 방향의 좌표 영역 밖으로 엘리먼트가 이동하면 반대 방향에서 엘리먼트가 나타난다</ko>
 * @param {Boolean} [circular[0]=false] Indicates whether to circulate to the coordinate of the minimum <ko>최소 좌표 방향의 순환 여부</ko>
 * @param {Boolean} [circular[1]=false] Indicates whether to circulate to the coordinate of the maximum <ko>최대 좌표 방향의 순환 여부</ko>
 **/

/**
 * @typedef {Object} AxesOption The option object of the eg.Axes module
 * @ko eg.Axes 모듈의 옵션 객체
 * @param {Function} [easing=easing.easeOutCubic] The easing function to apply to an animation <ko>애니메이션에 적용할 easing 함수</ko>
 * @param {Number} [maximumDuration=Infinity] Maximum duration of the animation <ko>가속도에 의해 애니메이션이 동작할 때의 최대 좌표 이동 시간</ko>
 * @param {Number} [minimumDuration=0] Minimum duration of the animation <ko>가속도에 의해 애니메이션이 동작할 때의 최소 좌표 이동 시간</ko>
 * @param {Number} [deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time. <ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다</ko>
 * @param {Boolean} [interruptable=true] Indicates whether an animation is interruptible.
 * - true: It can be paused or stopped by user action or the API.
 * - false: It cannot be paused or stopped by user action or the API while it is running.
 * <ko>진행 중인 애니메이션 중지 가능 여부.
 * - true: 사용자의 동작이나 API로 애니메이션을 중지할 수 있다.
 * - false: 애니메이션이 진행 중일 때는 사용자의 동작이나 API가 적용되지 않는다</ko>
 * @param {Number} [round=null] Rounding unit. For example, 0.1 rounds to 0.1 decimal point(6.1234 => 6.1), 5 rounds to 5 (93 => 95)
 * [Details](https://github.com/naver/egjs-axes/wiki/round-option)<ko>반올림 단위. 예를 들어 0.1 은 소숫점 0.1 까지 반올림(6.1234 => 6.1), 5 는 5 단위로 반올림(93 => 95).
 * [상세내용](https://github.com/naver/egjs-axes/wiki/round-option)</ko>
 **/

/**
 * A module used to change the information of user action entered by various input devices such as touch screen or mouse into the logical virtual coordinates. You can easily create a UI that responds to user actions.
 * @ko 터치 입력 장치나 마우스와 같은 다양한 입력 장치를 통해 전달 받은 사용자의 동작을 논리적인 가상 좌표로 변경하는 모듈이다. 사용자 동작에 반응하는 UI를 손쉽게 만들수 있다.
 * @extends eg.Component
 *
 * @param {Object.<string, AxisOption>} axis Axis information managed by eg.Axes. The key of the axis specifies the name to use as the logical virtual coordinate system.  <ko>eg.Axes가 관리하는 축 정보. 축의 키는 논리적인 가상 좌표계로 사용할 이름을 지정한다.</ko>
 * @param {AxesOption} [options={}] The option object of the eg.Axes module<ko>eg.Axes 모듈의 옵션 객체</ko>
 * @param {Object.<string, number>} [startPos=null] The coordinates to be moved when creating an instance. not triggering change event.<ko>인스턴스 생성시 이동할 좌표, change 이벤트는 발생하지 않음.</ko>
 *
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 * @example
 * ```js
 * // 1. Initialize eg.Axes
 * const axes = new eg.Axes({
 *	something1: {
 *		range: [0, 150],
 *		bounce: 50
 *	},
 *	something2: {
 *		range: [0, 200],
 *		bounce: 100
 *	},
 *	somethingN: {
 *		range: [1, 10],
 *	}
 * }, {
 *  deceleration : 0.0024
 * });
 *
 * // 2. attach event handler
 * axes.on({
 *	"hold" : function(evt) {
 *	},
 *	"release" : function(evt) {
 *	},
 *	"animationStart" : function(evt) {
 *	},
 *	"animationEnd" : function(evt) {
 *	},
 *	"change" : function(evt) {
 *	}
 * });
 *
 * // 3. Initialize inputTypes
 * const panInputArea = new eg.Axes.PanInput("#area", {
 *	scale: [0.5, 1]
 * });
 * const panInputHmove = new eg.Axes.PanInput("#hmove");
 * const panInputVmove = new eg.Axes.PanInput("#vmove");
 * const pinchInputArea = new eg.Axes.PinchInput("#area", {
 *	scale: 1.5
 * });
 *
 * // 4. Connect eg.Axes and InputTypes
 * // [PanInput] When the mouse or touchscreen is down and moved.
 * // Connect the 'something2' axis to the mouse or touchscreen x position and
 * // connect the 'somethingN' axis to the mouse or touchscreen y position.
 * axes.connect(["something2", "somethingN"], panInputArea); // or axes.connect("something2 somethingN", panInputArea);
 *
 * // Connect only one 'something1' axis to the mouse or touchscreen x position.
 * axes.connect(["something1"], panInputHmove); // or axes.connect("something1", panInputHmove);
 *
 * // Connect only one 'something2' axis to the mouse or touchscreen y position.
 * axes.connect(["", "something2"], panInputVmove); // or axes.connect(" something2", panInputVmove);
 *
 * // [PinchInput] Connect 'something2' axis when two pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * axes.connect("something2", pinchInputArea);
 * ```
 */

var Axes =
/*#__PURE__*/
function (_super) {
  __extends(Axes, _super);
  /**
   *
   */


  function Axes(axis, options, startPos) {
    if (axis === void 0) {
      axis = {};
    }

    if (options === void 0) {
      options = {};
    }

    if (startPos === void 0) {
      startPos = null;
    }

    var _this = _super.call(this) || this;

    _this.axis = axis;
    _this._inputs = [];
    _this.options = __assign({
      easing: function (x) {
        return 1 - Math.pow(1 - x, 3);
      },
      interruptable: true,
      maximumDuration: Infinity,
      minimumDuration: 0,
      deceleration: 0.0006,
      round: null
    }, options);
    _this.interruptManager = new InterruptManager(_this.options);
    _this.axisManager = new AxisManager(_this.axis);
    _this.eventManager = new EventManager(_this);
    _this.animationManager = new AnimationManager(_this);
    _this.inputObserver = new InputObserver(_this);

    _this.eventManager.setAnimationManager(_this.animationManager);

    if (startPos) {
      _this.eventManager.triggerChange(startPos);
    }

    return _this;
  }
  /**
   * Connect the axis of eg.Axes to the inputType.
   * @ko eg.Axes의 축과 inputType을 연결한다
   * @param {(String[]|String)} axes The name of the axis to associate with inputType <ko>inputType과 연결할 축의 이름</ko>
   * @param {Object} inputType The inputType instance to associate with the axis of eg.Axes <ko>eg.Axes의 축과 연결할 inputType 인스턴스</ko>
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   }
   * });
   *
   * axes.connect("x", new eg.Axes.PanInput("#area1"))
   *    .connect("x xOther", new eg.Axes.PanInput("#area2"))
   *    .connect(" xOther", new eg.Axes.PanInput("#area3"))
   *    .connect(["x"], new eg.Axes.PanInput("#area4"))
   *    .connect(["xOther", "x"], new eg.Axes.PanInput("#area5"))
   *    .connect(["", "xOther"], new eg.Axes.PanInput("#area6"));
   * ```
   */


  var __proto = Axes.prototype;

  __proto.connect = function (axes, inputType) {
    var mapped;

    if (typeof axes === "string") {
      mapped = axes.split(" ");
    } else {
      mapped = axes.concat();
    } // check same instance


    if (~this._inputs.indexOf(inputType)) {
      this.disconnect(inputType);
    }

    inputType.mapAxes(mapped);
    inputType.connect(this.inputObserver);

    this._inputs.push(inputType);

    return this;
  };
  /**
   * Disconnect the axis of eg.Axes from the inputType.
   * @ko eg.Axes의 축과 inputType의 연결을 끊는다.
   * @param {Object} [inputType] An inputType instance associated with the axis of eg.Axes <ko>eg.Axes의 축과 연결한 inputType 인스턴스</ko>
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   }
   * });
   *
   * const input1 = new eg.Axes.PanInput("#area1");
   * const input2 = new eg.Axes.PanInput("#area2");
   * const input3 = new eg.Axes.PanInput("#area3");
   *
   * axes.connect("x", input1);
   *    .connect("x xOther", input2)
   *    .connect(["xOther", "x"], input3);
   *
   * axes.disconnect(input1); // disconnects input1
   * axes.disconnect(); // disconnects all of them
   * ```
   */


  __proto.disconnect = function (inputType) {
    if (inputType) {
      var index = this._inputs.indexOf(inputType);

      if (index >= 0) {
        this._inputs[index].disconnect();

        this._inputs.splice(index, 1);
      }
    } else {
      this._inputs.forEach(function (v) {
        return v.disconnect();
      });

      this._inputs = [];
    }

    return this;
  };
  /**
   * Returns the current position of the coordinates.
   * @ko 좌표의 현재 위치를 반환한다
   * @param {Object} [axes] The names of the axis <ko>축 이름들</ko>
   * @return {Object.<string, number>} Axis coordinate information <ko>축 좌표 정보</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   },
   * 	 "zoom": {
   *      range: [50, 30]
   *   }
   * });
   *
   * axes.get(); // {"x": 0, "xOther": -100, "zoom": 50}
   * axes.get(["x", "zoom"]); // {"x": 0, "zoom": 50}
   * ```
   */


  __proto.get = function (axes) {
    return this.axisManager.get(axes);
  };
  /**
   * Moves an axis to specific coordinates.
   * @ko 좌표를 이동한다.
   * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
   * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   },
   * 	 "zoom": {
   *      range: [50, 30]
   *   }
   * });
   *
   * axes.setTo({"x": 30, "zoom": 60});
   * axes.get(); // {"x": 30, "xOther": -100, "zoom": 60}
   *
   * axes.setTo({"x": 100, "xOther": 60}, 1000); // animatation
   *
   * // after 1000 ms
   * axes.get(); // {"x": 100, "xOther": 60, "zoom": 60}
   * ```
   */


  __proto.setTo = function (pos, duration) {
    if (duration === void 0) {
      duration = 0;
    }

    this.animationManager.setTo(pos, duration);
    return this;
  };
  /**
   * Moves an axis from the current coordinates to specific coordinates.
   * @ko 현재 좌표를 기준으로 좌표를 이동한다.
   * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
   * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   },
   * 	 "zoom": {
   *      range: [50, 30]
   *   }
   * });
   *
   * axes.setBy({"x": 30, "zoom": 10});
   * axes.get(); // {"x": 30, "xOther": -100, "zoom": 60}
   *
   * axes.setBy({"x": 70, "xOther": 60}, 1000); // animatation
   *
   * // after 1000 ms
   * axes.get(); // {"x": 100, "xOther": -40, "zoom": 60}
   * ```
   */


  __proto.setBy = function (pos, duration) {
    if (duration === void 0) {
      duration = 0;
    }

    this.animationManager.setBy(pos, duration);
    return this;
  };
  /**
   * Stop an animation in progress.
   * @ko 재생 중인 애니메이션을 정지한다.
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   * });
   *
   * axes.setTo({"x": 10}, 1000); // start animatation
   *
   * // after 500 ms
   * axes.stopAnimation(); // stop animation during movement.
   * ```
   */


  __proto.stopAnimation = function () {
    this.animationManager.stopAnimation(Object.keys(this.axisManager.get()));
    return this;
  };
  /**
   * Change the destination of an animation in progress.
   * @ko 재생 중인 애니메이션의 목적지와 진행 시간을 변경한다.
   * @param {UpdateAnimationOption} pos The coordinate to move to <ko>이동할 좌표</ko>
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 200]
   *   },
   *   "y": {
   *      range: [0, 200]
   *   }
   * });
   *
   * axes.setTo({"x": 50, "y": 50}, 1000); // trigger animation by setTo
   *
   * // after 500 ms
   * axes.updateAnimation({destPos: {"x": 100, "y": 100}}); // animation will end after 500 ms, at {"x": 100, "y": 100}
   *
   * // after 500 ms
   * axes.setTo({"x": 50, "y": 50}, 1000); // trigger animation by setTo
   *
   * // after 700 ms
   * axes.updateAnimation({destPos: {"x": 100, "y": 100}, duration: 1500, restart: true}); // this works same as axes.setTo({"x": 100, "y": 100}, 800) since restart is true.
   * ```
   */


  __proto.updateAnimation = function (options) {
    this.animationManager.updateAnimation(options);
    return this;
  };
  /**
   * Returns whether there is a coordinate in the bounce area of ​​the target axis.
   * @ko 대상 축 중 bounce영역에 좌표가 존재하는지를 반환한다
   * @param {Object} [axes] The names of the axis <ko>축 이름들</ko>
   * @return {Boolen} Whether the bounce area exists. <ko>bounce 영역 존재 여부</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   },
   * 	 "zoom": {
   *      range: [50, 30]
   *   }
   * });
   *
   * axes.isBounceArea(["x"]);
   * axes.isBounceArea(["x", "zoom"]);
   * axes.isBounceArea();
   * ```
   */


  __proto.isBounceArea = function (axes) {
    return this.axisManager.isOutside(axes);
  };
  /**
   * Destroys properties, and events used in a module and disconnect all connections to inputTypes.
   * @ko 모듈에 사용한 속성, 이벤트를 해제한다. 모든 inputType과의 연결을 끊는다.
   */


  __proto.destroy = function () {
    this.disconnect();
    this.eventManager.destroy();
  };
  /**
   * @name VERSION
   * @desc Version info string
   * @ko 버전정보 문자열
   *
   * @constant
   * @type {String}
   * @example
   * ```js
   * eg.Axes.VERSION;  // ex) 3.3.3
   * ```
   */


  Axes.VERSION = "3.0.0";
  /* eslint-enable */

  /**
   * @name TRANSFORM
   * @desc Returns the transform attribute with CSS vendor prefixes.
   * @ko CSS vendor prefixes를 붙인 transform 속성을 반환한다.
   *
   * @constant
   * @type {String}
   * @example
   * ```js
   * eg.Axes.TRANSFORM; // "transform" or "webkitTransform"
   * ```
   */

  Axes.TRANSFORM = TRANSFORM;
  /**
   * @name DIRECTION_NONE
   * @constant
   * @type {Number}
   */

  Axes.DIRECTION_NONE = DIRECTION_NONE;
  /**
   * @name DIRECTION_LEFT
   * @constant
   * @type {Number}
   */

  Axes.DIRECTION_LEFT = DIRECTION_LEFT;
  /**
   * @name DIRECTION_RIGHT
   * @constant
   * @type {Number}
   */

  Axes.DIRECTION_RIGHT = DIRECTION_RIGHT;
  /**
   * @name DIRECTION_UP
   * @constant
   * @type {Number}
   */

  Axes.DIRECTION_UP = DIRECTION_UP;
  /**
   * @name DIRECTION_DOWN
   * @constant
   * @type {Number}
   */

  Axes.DIRECTION_DOWN = DIRECTION_DOWN;
  /**
   * @name DIRECTION_HORIZONTAL
   * @constant
   * @type {Number}
   */

  Axes.DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL;
  /**
   * @name DIRECTION_VERTICAL
   * @constant
   * @type {Number}
   */

  Axes.DIRECTION_VERTICAL = DIRECTION_VERTICAL;
  /**
   * @name DIRECTION_ALL
   * @constant
   * @type {Number}
   */

  Axes.DIRECTION_ALL = DIRECTION_ALL;
  return Axes;
}(Component);

var getDirectionByAngle = function (angle, thresholdAngle) {
  if (thresholdAngle < 0 || thresholdAngle > 90) {
    return DIRECTION_NONE;
  }

  var toAngle = Math.abs(angle);
  return toAngle > thresholdAngle && toAngle < 180 - thresholdAngle ? DIRECTION_VERTICAL : DIRECTION_HORIZONTAL;
};
var useDirection = function (checkType, direction, userDirection) {
  if (userDirection) {
    return !!(direction === DIRECTION_ALL || direction & checkType && userDirection & checkType);
  } else {
    return !!(direction & checkType);
  }
};
/**
 * @typedef {Object} PanInputOption The option object of the eg.Axes.PanInput module.
 * @ko eg.Axes.PanInput 모듈의 옵션 객체
 * @param {String[]} [inputType=["touch","mouse", "pointer"]] Types of input devices.
 * - touch: Touch screen
 * - mouse: Mouse <ko>입력 장치 종류.
 * - touch: 터치 입력 장치
 * - mouse: 마우스</ko>
 * @param {Number[]} [scale] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @param {Number} [scale[0]=1] horizontal axis scale <ko>수평축 배율</ko>
 * @param {Number} [scale[1]=1] vertical axis scale <ko>수직축 배율</ko>
 * @param {Number} [thresholdAngle=45] The threshold value that determines whether user action is horizontal or vertical (0~90) <ko>사용자의 동작이 가로 방향인지 세로 방향인지 판단하는 기준 각도(0~90)</ko>
 * @param {Number} [threshold=0] Minimal pan distance required before recognizing <ko>사용자의 Pan 동작을 인식하기 위해산 최소한의 거리</ko>
 * @param {Number} [iOSEdgeSwipeThreshold=30] Area (px) that can go to the next page when swiping the right edge in iOS safari <ko>iOS Safari에서 오른쪽 엣지를 스와이프 하는 경우 다음 페이지로 넘어갈 수 있는 영역(px)</ko>
 **/

/**
 * A module that passes the amount of change to eg.Axes when the mouse or touchscreen is down and moved. use less than two axes.
 * @ko 마우스나 터치 스크린을 누르고 움직일때의 변화량을 eg.Axes에 전달하는 모듈. 두개 이하의 축을 사용한다.
 *
 * @example
 * ```js
 * const pan = new eg.Axes.PanInput("#area", {
 * 		inputType: ["touch"],
 * 		scale: [1, 1.3],
 * });
 *
 * // Connect the 'something2' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.
 * // Connect the 'somethingN' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.
 * axes.connect(["something2", "somethingN"], pan); // or axes.connect("something2 somethingN", pan);
 *
 * // Connect only one 'something1' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.
 * axes.connect(["something1"], pan); // or axes.connect("something1", pan);
 *
 * // Connect only one 'something2' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.
 * axes.connect(["", "something2"], pan); // or axes.connect(" something2", pan);
 * ```
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.PanInput module <ko>eg.Axes.PanInput 모듈을 사용할 엘리먼트</ko>
 * @param {PanInputOption} [options={}] The option object of the eg.Axes.PanInput module<ko>eg.Axes.PanInput 모듈의 옵션 객체</ko>
 */

var PanInput =
/*#__PURE__*/
function () {
  /**
   *
   */
  function PanInput(el, options) {
    this.axes = [];
    this.element = null;
    this._panFlag = false;
    this._enabled = false;
    this._activeInput = null;
    this._atRightEdge = false;
    this._rightEdgeTimer = 0;
    this.element = $(el);
    this.options = __assign({
      inputType: ["touch", "mouse", "pointer"],
      scale: [1, 1],
      thresholdAngle: 45,
      threshold: 0,
      iOSEdgeSwipeThreshold: IOS_EDGE_THRESHOLD,
      releaseOnScroll: false
    }, options);
    this._onPanstart = this._onPanstart.bind(this);
    this._onPanmove = this._onPanmove.bind(this);
    this._onPanend = this._onPanend.bind(this);
  }

  var __proto = PanInput.prototype;

  __proto.mapAxes = function (axes) {
    var useHorizontal = !!axes[0];
    var useVertical = !!axes[1];

    if (useHorizontal && useVertical) {
      this._direction = DIRECTION_ALL;
    } else if (useHorizontal) {
      this._direction = DIRECTION_HORIZONTAL;
    } else if (useVertical) {
      this._direction = DIRECTION_VERTICAL;
    } else {
      this._direction = DIRECTION_NONE;
    }

    this.axes = axes;
  };

  __proto.connect = function (observer) {
    if (this._activeInput) {
      this._detachEvent();
    }

    this._attachEvent(observer);

    this._originalCssProps = setCssProps(this.element);
    return this;
  };

  __proto.disconnect = function () {
    this._detachEvent();

    if (this._originalCssProps !== PREVENT_SCROLL_CSSPROPS) {
      setCssProps(this.element, this._originalCssProps);
    }

    this._direction = DIRECTION_NONE;
    return this;
  };
  /**
   * Destroys elements, properties, and events used in a module.
   * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
   */


  __proto.destroy = function () {
    this.disconnect();
    this.element = null;
  };
  /**
   * Enables input devices
   * @ko 입력 장치를 사용할 수 있게 한다
   * @return {PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */


  __proto.enable = function () {
    this._enabled = true;
    return this;
  };
  /**
   * Disables input devices
   * @ko 입력 장치를 사용할 수 없게 한다.
   * @return {PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */


  __proto.disable = function () {
    this._enabled = false;
    return this;
  };
  /**
   * Returns whether to use an input device
   * @ko 입력 장치를 사용 여부를 반환한다.
   * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
   */


  __proto.isEnabled = function () {
    return this._enabled;
  };

  __proto._onPanstart = function (event) {
    this._activeInput.onEventStart(event);

    if (!this._enabled || this._activeInput.getTouches(event) > 1) {
      return;
    }

    var panEvent = this._activeInput.extendEvent(event);

    this._panFlag = false;

    if (panEvent.srcEvent.cancelable !== false) {
      var edgeThreshold = this.options.iOSEdgeSwipeThreshold;

      this._observer.hold(this, panEvent);

      this._atRightEdge = IS_IOS_SAFARI && panEvent.center.x > window.innerWidth - edgeThreshold;
      this._panFlag = true;
      this._activeInput.prevEvent = panEvent;
    }
  };

  __proto._onPanmove = function (event) {
    var _this = this;

    this._activeInput.onEventMove(event);

    if (!this._panFlag || !this._enabled || this._activeInput.getTouches(event) > 1) {
      return;
    }

    var panEvent = this._activeInput.extendEvent(event);

    var _a = this.options,
        iOSEdgeSwipeThreshold = _a.iOSEdgeSwipeThreshold,
        releaseOnScroll = _a.releaseOnScroll;
    var userDirection = getDirectionByAngle(panEvent.angle, this.options.thresholdAngle);

    if (releaseOnScroll && !panEvent.srcEvent.cancelable) {
      this._onPanend(event);

      return;
    }

    if (this._activeInput.prevEvent && IS_IOS_SAFARI) {
      var swipeLeftToRight = panEvent.center.x < 0;

      if (swipeLeftToRight) {
        // iOS swipe left => right
        this._observer.release(this, this._activeInput.prevEvent, [0, 0]);

        return;
      } else if (this._atRightEdge) {
        clearTimeout(this._rightEdgeTimer); // - is right to left

        var swipeRightToLeft = panEvent.deltaX < -iOSEdgeSwipeThreshold;

        if (swipeRightToLeft) {
          this._atRightEdge = false;
        } else {
          // iOS swipe right => left
          this._rightEdgeTimer = window.setTimeout(function () {
            _this._observer.release(_this, _this._activeInput.prevEvent, [0, 0]);
          }, 100);
        }
      }
    }

    var offset = this._getOffset([panEvent.offsetX, panEvent.offsetY], [useDirection(DIRECTION_HORIZONTAL, this._direction, userDirection), useDirection(DIRECTION_VERTICAL, this._direction, userDirection)]);

    var prevent = offset.some(function (v) {
      return v !== 0;
    });

    if (prevent) {
      if (panEvent.srcEvent.cancelable !== false) {
        panEvent.srcEvent.preventDefault();
      }

      panEvent.srcEvent.stopPropagation();
    }

    panEvent.preventSystemEvent = prevent;

    if (prevent) {
      this._observer.change(this, panEvent, toAxis(this.axes, offset));
    }

    this._activeInput.prevEvent = panEvent;
  };

  __proto._onPanend = function (event) {
    this._activeInput.onEventEnd(event);

    if (!this._panFlag || !this._enabled || this._activeInput.getTouches(event) !== 0) {
      return;
    }

    this._panFlag = false;
    clearTimeout(this._rightEdgeTimer);
    var prevEvent = this._activeInput.prevEvent;

    var velocity = this._getOffset([Math.abs(prevEvent.velocityX) * (prevEvent.offsetX < 0 ? -1 : 1), Math.abs(prevEvent.velocityY) * (prevEvent.offsetY < 0 ? -1 : 1)], [useDirection(DIRECTION_HORIZONTAL, this._direction), useDirection(DIRECTION_VERTICAL, this._direction)]);

    this._observer.release(this, prevEvent, velocity);
  };

  __proto._attachEvent = function (observer) {
    var _this = this;

    var activeInput = convertInputType(this.options.inputType);
    this._observer = observer;
    this._enabled = true;
    this._activeInput = activeInput;
    activeInput === null || activeInput === void 0 ? void 0 : activeInput.start.forEach(function (event) {
      _this.element.addEventListener(event, _this._onPanstart, false);
    });
    activeInput === null || activeInput === void 0 ? void 0 : activeInput.move.forEach(function (event) {
      window.addEventListener(event, _this._onPanmove, false);
    });
    activeInput === null || activeInput === void 0 ? void 0 : activeInput.end.forEach(function (event) {
      window.addEventListener(event, _this._onPanend, false);
    });
  };

  __proto._detachEvent = function () {
    var _this = this;

    var activeInput = this._activeInput;
    activeInput === null || activeInput === void 0 ? void 0 : activeInput.start.forEach(function (event) {
      _this.element.removeEventListener(event, _this._onPanstart, false);
    });
    activeInput === null || activeInput === void 0 ? void 0 : activeInput.move.forEach(function (event) {
      window.removeEventListener(event, _this._onPanmove, false);
    });
    activeInput === null || activeInput === void 0 ? void 0 : activeInput.end.forEach(function (event) {
      window.removeEventListener(event, _this._onPanend, false);
    });
    this._enabled = false;
    this._observer = null;
  };

  __proto._getOffset = function (properties, direction) {
    var offset = [0, 0];
    var scale = this.options.scale;

    if (direction[0]) {
      offset[0] = properties[0] * scale[0];
    }

    if (direction[1]) {
      offset[1] = properties[1] * scale[1];
    }

    return offset;
  };

  return PanInput;
}();

/**
 * A module that passes the angle moved by touch to Axes and uses one axis of rotation.
 * [Details](https://github.com/naver/egjs-axes/wiki/RotatePanInput)
 * @ko 터치에 의해 움직인 각도를 Axes 에 전달하며 1개의 회전축만 사용한다.
 * [상세내용](https://github.com/naver/egjs-axes/wiki/RotatePanInput-%7C-%ED%95%9C%EA%B5%AD%EC%96%B4)
 *
 * @example
 * ```js
 * const input = new eg.Axes.RotatePanInput("#area");
 *
 * var axes = new eg.Axes({
 *	// property name('angle') could be anything you want (eg. x, y, z...)
 * 	angle: {
 * 		range: [-180, 180] // from -180deg to 180deg
 * 	}
 * });
 *
 * axes.connect("angle", input)
 * ```
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.RotatePanInput module <ko>eg.Axes.RotatePanInput 모듈을 사용할 엘리먼트</ko>
 * @param {PanInputOption} [options] The option object of the eg.Axes.PanInput module<ko>eg.Axes.PanInput 모듈의 옵션 객체</ko>
 * @extends PanInput
 */

var RotatePanInput =
/*#__PURE__*/
function (_super) {
  __extends(RotatePanInput, _super);
  /**
   *
   */


  function RotatePanInput(el, options) {
    var _this = _super.call(this, el, options) || this;

    _this._prevQuadrant = null;
    _this._lastDiff = 0;
    return _this;
  }

  var __proto = RotatePanInput.prototype;

  __proto.mapAxes = function (axes) {
    this._direction = Axes.DIRECTION_ALL;
    this.axes = axes;
  };

  __proto._onPanstart = function (event) {
    this._activeInput.onEventStart(event);

    if (!this.isEnabled) {
      return;
    }

    var rect = this.element.getBoundingClientRect();

    var panEvent = this._activeInput.extendEvent(event);

    this._observer.hold(this, panEvent);

    this._panFlag = true; // TODO: how to do if element is ellipse not circle.

    this._coefficientForDistanceToAngle = 360 / (rect.width * Math.PI); // from 2*pi*r * x / 360
    // TODO: provide a way to set origin like https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin

    this._rotateOrigin = [rect.left + (rect.width - 1) / 2, rect.top + (rect.height - 1) / 2]; // init angle.

    this._prevAngle = null;

    this._triggerChange(panEvent);

    this._activeInput.prevEvent = panEvent;
  };

  __proto._onPanmove = function (event) {
    this._activeInput.onEventMove(event);

    if (!this._panFlag || !this.isEnabled) {
      return;
    }

    var panEvent = this._activeInput.extendEvent(event);

    if (panEvent.srcEvent.cancelable !== false) {
      panEvent.srcEvent.preventDefault();
    }

    panEvent.srcEvent.stopPropagation();

    this._triggerChange(panEvent);

    this._activeInput.prevEvent = panEvent;
  };

  __proto._onPanend = function (event) {
    this._activeInput.onEventEnd(event);

    if (!this._panFlag || !this.isEnabled) {
      return;
    }

    var prevEvent = this._activeInput.prevEvent;

    this._triggerChange(prevEvent);

    var vx = prevEvent.velocityX;
    var vy = prevEvent.velocityY;
    var velocity = Math.sqrt(vx * vx + vy * vy) * (this._lastDiff > 0 ? -1 : 1); // clockwise

    this._observer.release(this, prevEvent, [velocity * this._coefficientForDistanceToAngle]);

    this._panFlag = false;
  };

  __proto._triggerChange = function (event) {
    var _a = this._getPosFromOrigin(event.center.x, event.center.y),
        x = _a.x,
        y = _a.y;

    var angle = getAngle(x, y);
    var positiveAngle = angle < 0 ? 360 + angle : angle;

    var quadrant = this._getQuadrant(event.center.x, event.center.y);

    var diff = this._getDifference(this._prevAngle, positiveAngle, this._prevQuadrant, quadrant);

    this._prevAngle = positiveAngle;
    this._prevQuadrant = quadrant;

    if (diff === 0) {
      return;
    }

    this._lastDiff = diff;

    this._observer.change(this, event, toAxis(this.axes, [-diff])); // minus for clockwise

  };

  __proto._getDifference = function (prevAngle, angle, prevQuadrant, quadrant) {
    var diff;

    if (prevAngle === null) {
      diff = 0;
    } else if (prevQuadrant === 1 && quadrant === 4) {
      diff = -prevAngle - (360 - angle);
    } else if (prevQuadrant === 4 && quadrant === 1) {
      diff = 360 - prevAngle + angle;
    } else {
      diff = angle - prevAngle;
    }

    return diff;
  };

  __proto._getPosFromOrigin = function (posX, posY) {
    return {
      x: posX - this._rotateOrigin[0],
      y: this._rotateOrigin[1] - posY
    };
  };

  __proto._getQuadrant = function (posX, posY) {
    /**
     * Quadrant
     *       y(+)
     *       |
     *   2   |    1
     * --------------->x(+)
     *   3   |    4
     *       |
     */
    var _a = this._getPosFromOrigin(posX, posY),
        x = _a.x,
        y = _a.y;

    var q = 0;

    if (x >= 0 && y >= 0) {
      q = 1;
    } else if (x < 0 && y >= 0) {
      q = 2;
    } else if (x < 0 && y < 0) {
      q = 3;
    } else if (x >= 0 && y < 0) {
      q = 4;
    }

    return q;
  };

  return RotatePanInput;
}(PanInput);

/**
 * @typedef {Object} PinchInputOption The option object of the eg.Axes.PinchInput module
 * @ko eg.Axes.PinchInput 모듈의 옵션 객체
 * @param {Number} [scale=1] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @param {Number} [threshold=0] Minimal scale before recognizing <ko>사용자의 Pinch 동작을 인식하기 위해산 최소한의 배율</ko>
 **/

/**
 * A module that passes the amount of change to eg.Axes when two pointers are moving toward (zoom-in) or away from each other (zoom-out). use one axis.
 * @ko 2개의 pointer를 이용하여 zoom-in하거나 zoom-out 하는 동작의 변화량을 eg.Axes에 전달하는 모듈. 한 개 의 축을 사용한다.
 * @example
 * ```js
 * const pinch = new eg.Axes.PinchInput("#area", {
 * 		scale: 1
 * });
 *
 * // Connect 'something' axis when two pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * axes.connect("something", pinch);
 * ```
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.PinchInput module <ko>eg.Axes.PinchInput 모듈을 사용할 엘리먼트</ko>
 * @param {PinchInputOption} [options] The option object of the eg.Axes.PinchInput module<ko>eg.Axes.PinchInput 모듈의 옵션 객체</ko>
 */

var PinchInput =
/*#__PURE__*/
function () {
  /**
   *
   */
  function PinchInput(el, options) {
    this.axes = [];
    this.element = null;
    this._pinchFlag = false;
    this._enabled = false;
    this._activeInput = null;
    this.element = $(el);
    this.options = __assign({
      scale: 1,
      threshold: 0,
      inputType: ["touch", "pointer"]
    }, options);
    this._onPinchStart = this._onPinchStart.bind(this);
    this._onPinchMove = this._onPinchMove.bind(this);
    this._onPinchEnd = this._onPinchEnd.bind(this);
  }

  var __proto = PinchInput.prototype;

  __proto.mapAxes = function (axes) {
    this.axes = axes;
  };

  __proto.connect = function (observer) {
    if (this._activeInput) {
      this._detachEvent();
    }

    this._attachEvent(observer);

    this._originalCssProps = setCssProps(this.element);
    return this;
  };

  __proto.disconnect = function () {
    this._detachEvent();

    if (this._originalCssProps !== PREVENT_SCROLL_CSSPROPS) {
      setCssProps(this.element, this._originalCssProps);
    }

    return this;
  };
  /**
   * Destroys elements, properties, and events used in a module.
   * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
   */


  __proto.destroy = function () {
    this.disconnect();
    this.element = null;
  };
  /**
   * Enables input devices
   * @ko 입력 장치를 사용할 수 있게 한다
   * @return {PinchInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */


  __proto.enable = function () {
    this._enabled = true;
    return this;
  };
  /**
   * Disables input devices
   * @ko 입력 장치를 사용할 수 없게 한다.
   * @return {PinchInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */


  __proto.disable = function () {
    this._enabled = false;
    return this;
  };
  /**
   * Returns whether to use an input device
   * @ko 입력 장치를 사용 여부를 반환한다.
   * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
   */


  __proto.isEnabled = function () {
    return this._enabled;
  };

  __proto._onPinchStart = function (event) {
    this._activeInput.onEventStart(event);

    if (!this._enabled || this._activeInput.getTouches(event) !== 2) {
      return;
    }

    this._baseValue = this._observer.get(this)[this.axes[0]];

    this._observer.hold(this, event);

    this._pinchFlag = true;

    var pinchEvent = this._activeInput.extendEvent(event);

    this._activeInput.prevEvent = pinchEvent;
  };

  __proto._onPinchMove = function (event) {
    this._activeInput.onEventMove(event);

    if (!this._pinchFlag || !this._enabled || this._activeInput.getTouches(event) !== 2) {
      return;
    }

    var pinchEvent = this._activeInput.extendEvent(event);

    var offset = this._getOffset(pinchEvent.scale, this._activeInput.prevEvent.scale);

    this._observer.change(this, event, toAxis(this.axes, [offset]));

    this._activeInput.prevEvent = pinchEvent;
  };

  __proto._onPinchEnd = function (event) {
    this._activeInput.onEventEnd(event);

    if (!this._pinchFlag || !this._enabled || this._activeInput.getTouches(event) > 2) {
      return;
    }

    this._observer.release(this, event, [0], 0);

    this._baseValue = null;
    this._pinchFlag = false;
    this._activeInput.prevEvent = null;
  };

  __proto._attachEvent = function (observer) {
    var _this = this;

    var activeInput = convertInputType(this.options.inputType);
    this._observer = observer;
    this._enabled = true;
    this._activeInput = activeInput;
    activeInput === null || activeInput === void 0 ? void 0 : activeInput.start.forEach(function (event) {
      _this.element.addEventListener(event, _this._onPinchStart, false);
    });
    activeInput === null || activeInput === void 0 ? void 0 : activeInput.move.forEach(function (event) {
      _this.element.addEventListener(event, _this._onPinchMove, false);
    });
    activeInput === null || activeInput === void 0 ? void 0 : activeInput.end.forEach(function (event) {
      _this.element.addEventListener(event, _this._onPinchEnd, false);
    });
  };

  __proto._detachEvent = function () {
    var _this = this;

    var activeInput = this._activeInput;
    activeInput === null || activeInput === void 0 ? void 0 : activeInput.start.forEach(function (event) {
      _this.element.removeEventListener(event, _this._onPinchStart, false);
    });
    activeInput === null || activeInput === void 0 ? void 0 : activeInput.move.forEach(function (event) {
      _this.element.removeEventListener(event, _this._onPinchMove, false);
    });
    activeInput === null || activeInput === void 0 ? void 0 : activeInput.end.forEach(function (event) {
      _this.element.removeEventListener(event, _this._onPinchEnd, false);
    });
    this._enabled = false;
    this._observer = null;
  };

  __proto._getOffset = function (pinchScale, prev) {
    if (prev === void 0) {
      prev = 1;
    }

    return this._baseValue * (pinchScale - prev) * this.options.scale;
  };

  return PinchInput;
}();

/**
 * @typedef {Object} WheelInputOption The option object of the eg.Axes.WheelInput module
 * @ko eg.Axes.WheelInput 모듈의 옵션 객체
 * @param {Number} [scale=1] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @param {Number} [releaseDelay=300] Millisecond that trigger release event after last input<ko>마지막 입력 이후 release 이벤트가 트리거되기까지의 밀리초</ko>
 **/

/**
 * A module that passes the amount of change to eg.Axes when the mouse wheel is moved. use one axis.
 * @ko 마우스 휠이 움직일때의 변화량을 eg.Axes에 전달하는 모듈. 한 개 의 축을 사용한다.
 *
 * @example
 * ```js
 * const wheel = new eg.Axes.WheelInput("#area", {
 * 		scale: 1
 * });
 *
 * // Connect 'something' axis when the mousewheel is moved.
 * axes.connect("something", wheel);
 * ```
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.WheelInput module <ko>eg.Axes.WheelInput 모듈을 사용할 엘리먼트</ko>
 * @param {WheelInputOption} [options] The option object of the eg.Axes.WheelInput module<ko>eg.Axes.WheelInput 모듈의 옵션 객체</ko>
 */

var WheelInput =
/*#__PURE__*/
function () {
  /**
   *
   */
  function WheelInput(el, options) {
    this.axes = [];
    this.element = null;
    this._enabled = false;
    this._holding = false;
    this._timer = null;
    this.element = $(el);
    this.options = __assign({
      scale: 1,
      releaseDelay: 300,
      useNormalized: true
    }, options);
    this._onWheel = this._onWheel.bind(this);
  }

  var __proto = WheelInput.prototype;

  __proto.mapAxes = function (axes) {
    this.axes = axes;
  };

  __proto.connect = function (observer) {
    this._detachEvent();

    this._attachEvent(observer);

    return this;
  };

  __proto.disconnect = function () {
    this._detachEvent();

    return this;
  };
  /**
   * Destroys elements, properties, and events used in a module.
   * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
   */


  __proto.destroy = function () {
    this.disconnect();
    this.element = null;
  };
  /**
   * Enables input devices
   * @ko 입력 장치를 사용할 수 있게 한다
   * @return {WheelInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */


  __proto.enable = function () {
    this._enabled = true;
    return this;
  };
  /**
   * Disables input devices
   * @ko 입력 장치를 사용할 수 없게 한다.
   * @return {WheelInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */


  __proto.disable = function () {
    this._enabled = false;
    return this;
  };
  /**
   * Returns whether to use an input device
   * @ko 입력 장치를 사용 여부를 반환한다.
   * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
   */


  __proto.isEnabled = function () {
    return this._enabled;
  };

  __proto._onWheel = function (event) {
    var _this = this;

    if (!this._enabled) {
      return;
    }

    event.preventDefault();

    if (event.deltaY === 0) {
      return;
    }

    if (!this._holding) {
      this._observer.hold(this, event);

      this._holding = true;
    }

    var offset = (event.deltaY > 0 ? -1 : 1) * this.options.scale * (this.options.useNormalized ? 1 : Math.abs(event.deltaY));

    this._observer.change(this, event, toAxis(this.axes, [offset]), true);

    clearTimeout(this._timer);
    this._timer = setTimeout(function () {
      if (_this._holding) {
        _this._holding = false;

        _this._observer.release(_this, event, [0]);
      }
    }, this.options.releaseDelay);
  };

  __proto._attachEvent = function (observer) {
    this._observer = observer;
    this.element.addEventListener("wheel", this._onWheel);
    this._enabled = true;
  };

  __proto._detachEvent = function () {
    this.element.removeEventListener("wheel", this._onWheel);
    this._enabled = false;
    this._observer = null;

    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  };

  return WheelInput;
}();

var KEY_LEFT_ARROW = 37;
var KEY_A = 65;
var KEY_UP_ARROW = 38;
var KEY_W = 87;
var KEY_RIGHT_ARROW = 39;
var KEY_D = 68;
var KEY_DOWN_ARROW = 40;
var KEY_S = 83;
/* eslint-disable */

var DIRECTION_REVERSE = -1;
var DIRECTION_FORWARD = 1;
var DIRECTION_HORIZONTAL$1 = -1;
var DIRECTION_VERTICAL$1 = 1;
var DELAY = 80;
/**
 * @typedef {Object} MoveKeyInputOption The option object of the eg.Axes.MoveKeyInput module
 * @ko eg.Axes.MoveKeyInput 모듈의 옵션 객체
 * @param {Array<Number>} [scale] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @param {Number} [scale[0]=1] Coordinate scale for the first axis<ko>첫번째 축의 배율</ko>
 * @param {Number} [scale[1]=1] Coordinate scale for the decond axis<ko>두번째 축의 배율</ko>
 **/

/**
 * A module that passes the amount of change to eg.Axes when the move key stroke is occured. use two axis.
 * @ko 이동키 입력이 발생했을 때의 변화량을 eg.Axes에 전달하는 모듈. 두 개 의 축을 사용한다.
 *
 * @example
 * ```js
 * const moveKey = new eg.Axes.MoveKeyInput("#area", {
 * 		scale: [1, 1]
 * });
 *
 * // Connect 'x', 'y' axes when the moveKey is pressed.
 * axes.connect(["x", "y"], moveKey);
 * ```
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.MoveKeyInput module <ko>eg.Axes.MoveKeyInput 모듈을 사용할 엘리먼트</ko>
 * @param {MoveKeyInputOption} [options] The option object of the eg.Axes.MoveKeyInput module<ko>eg.Axes.MoveKeyInput 모듈의 옵션 객체</ko>
 */

var MoveKeyInput =
/*#__PURE__*/
function () {
  /**
   *
   */
  function MoveKeyInput(el, options) {
    this.axes = [];
    this.element = null;
    this._enabled = false;
    this._holding = false;
    this._timer = null;
    this.element = $(el);
    this.options = __assign({
      scale: [1, 1]
    }, options);
    this._onKeydown = this._onKeydown.bind(this);
    this._onKeyup = this._onKeyup.bind(this);
  }

  var __proto = MoveKeyInput.prototype;

  __proto.mapAxes = function (axes) {
    this.axes = axes;
  };

  __proto.connect = function (observer) {
    this._detachEvent(); // add tabindex="0" to the container for making it focusable


    if (this.element.getAttribute("tabindex") !== "0") {
      this.element.setAttribute("tabindex", "0");
    }

    this._attachEvent(observer);

    return this;
  };

  __proto.disconnect = function () {
    this._detachEvent();

    return this;
  };
  /**
   * Destroys elements, properties, and events used in a module.
   * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
   */


  __proto.destroy = function () {
    this.disconnect();
    this.element = null;
  };
  /**
   * Enables input devices
   * @ko 입력 장치를 사용할 수 있게 한다
   * @return {MoveKeyInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */


  __proto.enable = function () {
    this._enabled = true;
    return this;
  };
  /**
   * Disables input devices
   * @ko 입력 장치를 사용할 수 없게 한다.
   * @return {MoveKeyInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */


  __proto.disable = function () {
    this._enabled = false;
    return this;
  };
  /**
   * Returns whether to use an input device
   * @ko 입력 장치를 사용 여부를 반환한다.
   * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
   */


  __proto.isEnabled = function () {
    return this._enabled;
  };

  __proto._onKeydown = function (event) {
    if (!this._enabled) {
      return;
    }

    var isMoveKey = true;
    var direction = DIRECTION_FORWARD;
    var move = DIRECTION_HORIZONTAL$1;

    switch (event.keyCode) {
      case KEY_LEFT_ARROW:
      case KEY_A:
        direction = DIRECTION_REVERSE;
        break;

      case KEY_RIGHT_ARROW:
      case KEY_D:
        break;

      case KEY_DOWN_ARROW:
      case KEY_S:
        direction = DIRECTION_REVERSE;
        move = DIRECTION_VERTICAL$1;
        break;

      case KEY_UP_ARROW:
      case KEY_W:
        move = DIRECTION_VERTICAL$1;
        break;

      default:
        isMoveKey = false;
    }

    if (move === DIRECTION_HORIZONTAL$1 && !this.axes[0] || move === DIRECTION_VERTICAL$1 && !this.axes[1]) {
      isMoveKey = false;
    }

    if (!isMoveKey) {
      return;
    }

    event.preventDefault();
    var offsets = move === DIRECTION_HORIZONTAL$1 ? [+this.options.scale[0] * direction, 0] : [0, +this.options.scale[1] * direction];

    if (!this._holding) {
      this._observer.hold(this, event);

      this._holding = true;
    }

    clearTimeout(this._timer);

    this._observer.change(this, event, toAxis(this.axes, offsets));
  };

  __proto._onKeyup = function (event) {
    var _this = this;

    if (!this._holding) {
      return;
    }

    clearTimeout(this._timer);
    this._timer = setTimeout(function () {
      _this._observer.release(_this, event, [0, 0]);

      _this._holding = false;
    }, DELAY);
  };

  __proto._attachEvent = function (observer) {
    this._observer = observer;
    this.element.addEventListener("keydown", this._onKeydown, false);
    this.element.addEventListener("keypress", this._onKeydown, false);
    this.element.addEventListener("keyup", this._onKeyup, false);
    this._enabled = true;
  };

  __proto._detachEvent = function () {
    this.element.removeEventListener("keydown", this._onKeydown, false);
    this.element.removeEventListener("keypress", this._onKeydown, false);
    this.element.removeEventListener("keyup", this._onKeyup, false);
    this._enabled = false;
    this._observer = null;
  };

  return MoveKeyInput;
}();

export default Axes;
export { PanInput, RotatePanInput, PinchInput, WheelInput, MoveKeyInput };
//# sourceMappingURL=axes.esm.js.map
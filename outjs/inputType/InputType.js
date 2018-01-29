"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var Hammer = require("hammerjs");
exports.SUPPORT_POINTER_EVENTS = "PointerEvent" in window || "MSPointerEvent" in window;
exports.SUPPORT_TOUCH = "ontouchstart" in window;
exports.UNIQUEKEY = "_EGJS_AXES_INPUTTYPE_";
function toAxis(source, offset) {
    return offset.reduce(function (acc, v, i) {
        if (source[i]) {
            acc[source[i]] = v;
        }
        return acc;
    }, {});
}
exports.toAxis = toAxis;
;
function createHammer(element, options) {
    try {
        // create Hammer
        return new Hammer.Manager(element, __assign({}, options));
    }
    catch (e) {
        return null;
    }
}
exports.createHammer = createHammer;
;
function convertInputType(inputType) {
    if (inputType === void 0) { inputType = []; }
    var hasTouch = false;
    var hasMouse = false;
    var hasPointer = false;
    inputType.forEach(function (v) {
        switch (v) {
            case "mouse":
                hasMouse = true;
                break;
            case "touch":
                hasTouch = exports.SUPPORT_TOUCH;
                break;
            case "pointer": hasPointer = exports.SUPPORT_POINTER_EVENTS;
        }
    });
    if (hasPointer) {
        return Hammer.PointerEventInput;
    }
    else if (hasTouch && hasMouse) {
        return Hammer.TouchMouseInput;
    }
    else if (hasTouch) {
        return Hammer.TouchInput;
    }
    else if (hasMouse) {
        return Hammer.MouseInput;
    }
    return null;
}
exports.convertInputType = convertInputType;

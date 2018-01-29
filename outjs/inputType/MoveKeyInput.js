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
var utils_1 = require("../utils");
var InputType_1 = require("./InputType");
exports.KEYMAP = {
    LEFT_ARROW: 37,
    A: 65,
    UP_ARROW: 38,
    W: 87,
    RIGHT_ARROW: 39,
    D: 68,
    DOWN_ARROW: 40,
    S: 83
};
var DIRECTION_REVERSE = -1;
var DIRECTION_FORWARD = 1;
var DELAY = 80;
var MoveKeyInput = (function () {
    function MoveKeyInput(el, options) {
        this.axes = [];
        this.element = null;
        this._isEnabled = false;
        this._isHolded = false;
        this._timer = null;
        this.element = utils_1.$(el);
        this.options = __assign({
            scale: [1, 1]
        }, options);
        this.onKeydown = this.onKeydown.bind(this);
        this.onKeyup = this.onKeyup.bind(this);
    }
    MoveKeyInput.prototype.mapAxes = function (axes) {
        this.axes = axes;
    };
    MoveKeyInput.prototype.connect = function (observer) {
        this.dettachEvent();
        if (this.element.getAttribute("tabindex") !== "0") {
            this.element.setAttribute("tabindex", "0");
        }
        this.attachEvent(observer);
        return this;
    };
    MoveKeyInput.prototype.disconnect = function () {
        this.dettachEvent();
        return this;
    };
    MoveKeyInput.prototype.destroy = function () {
        this.disconnect();
        this.element = null;
    };
    MoveKeyInput.prototype.onKeydown = function (e) {
        if (!this._isEnabled) {
            return;
        }
        var isMoveKey = true;
        var direction = DIRECTION_FORWARD;
        var offsets;
        switch (e.keyCode) {
            case exports.KEYMAP.LEFT_ARROW:
            case exports.KEYMAP.A:
                direction = DIRECTION_REVERSE;
            case exports.KEYMAP.RIGHT_ARROW:
            case exports.KEYMAP.D:
                if (!this.axes[0]) {
                    isMoveKey = false;
                    break;
                }
                offsets = [+this.options.scale[0] * direction, 0];
                break;
            case exports.KEYMAP.DOWN_ARROW:
            case exports.KEYMAP.S:
                direction = DIRECTION_REVERSE;
            case exports.KEYMAP.UP_ARROW:
            case exports.KEYMAP.W:
                if (!this.axes[1]) {
                    isMoveKey = false;
                    break;
                }
                offsets = [0, +this.options.scale[1] * direction];
                break;
            default:
                isMoveKey = false;
        }
        if (!isMoveKey) {
            return;
        }
        if (!this._isHolded) {
            this.observer.hold(this, event);
            this._isHolded = true;
        }
        clearTimeout(this._timer);
        this.observer.change(this, event, InputType_1.toAxis(this.axes, offsets));
    };
    MoveKeyInput.prototype.onKeyup = function (e) {
        var _this = this;
        if (!this._isHolded) {
            return;
        }
        clearTimeout(this._timer);
        this._timer = setTimeout(function () {
            _this.observer.release(_this, e, InputType_1.toAxis(_this.axes, [0, 0]));
            _this._isHolded = false;
        }, DELAY);
    };
    MoveKeyInput.prototype.attachEvent = function (observer) {
        this.observer = observer;
        this.element.addEventListener("keydown", this.onKeydown, false);
        this.element.addEventListener("keypress", this.onKeydown, false);
        this.element.addEventListener("keyup", this.onKeyup, false);
        this._isEnabled = true;
    };
    MoveKeyInput.prototype.dettachEvent = function () {
        this.element.removeEventListener("keydown", this.onKeydown, false);
        this.element.removeEventListener("keypress", this.onKeydown, false);
        this.element.removeEventListener("keyup", this.onKeyup, false);
        this._isEnabled = false;
        this.observer = null;
    };
    MoveKeyInput.prototype.enable = function () {
        this._isEnabled = true;
        return this;
    };
    MoveKeyInput.prototype.disable = function () {
        this._isEnabled = false;
        return this;
    };
    MoveKeyInput.prototype.isEnable = function () {
        return this._isEnabled;
    };
    return MoveKeyInput;
}());
exports.MoveKeyInput = MoveKeyInput;
;

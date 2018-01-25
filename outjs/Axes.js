"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var Component = require("@egjs/component");
var AnimationManager_1 = require("./AnimationManager");
var EventManager_1 = require("./EventManager");
var InterruptManager_1 = require("./InterruptManager");
var AxisManager_1 = require("./AxisManager");
var InputObserver_1 = require("./InputObserver");
var const_1 = require("./const");
var Axes = (function (_super) {
    __extends(Axes, _super);
    function Axes(axis, options, startPos) {
        if (axis === void 0) { axis = {}; }
        var _this = _super.call(this) || this;
        _this.axis = axis;
        _this._inputs = [];
        _this.options = __assign({
            easing: function easeOutCubic(x) {
                return 1 - Math.pow(1 - x, 3);
            },
            interruptable: true,
            maximumDuration: Infinity,
            minimumDuration: 0,
            deceleration: 0.0006
        }, options);
        _this.itm = new InterruptManager_1.InterruptManager(_this.options);
        _this.axm = new AxisManager_1.AxisManager(_this.axis, _this.options);
        _this.em = new EventManager_1.EventManager(_this);
        _this.am = new AnimationManager_1.AnimationManager(_this);
        _this.io = new InputObserver_1.InputObserver(_this);
        _this.em.setAnimationManager(_this.am);
        startPos && _this.em.triggerChange(startPos);
        return _this;
    }
    Axes.prototype.connect = function (axes, inputType) {
        var mapped;
        if (typeof axes === "string") {
            mapped = axes.split(" ");
        }
        else {
            mapped = axes.concat();
        }
        if (~this._inputs.indexOf(inputType)) {
            this.disconnect(inputType);
        }
        if ("hammer" in inputType) {
            var targets = this._inputs.filter(function (v) { return v.hammer && v.element === inputType.element; });
            if (targets.length) {
                inputType.hammer = targets[0].hammer;
            }
        }
        inputType.mapAxes(mapped);
        inputType.connect(this.io);
        this._inputs.push(inputType);
        return this;
    };
    Axes.prototype.disconnect = function (inputType) {
        if (inputType) {
            var index = this._inputs.indexOf(inputType);
            if (index >= 0) {
                this._inputs[index].disconnect();
                this._inputs.splice(index, 1);
            }
        }
        else {
            this._inputs.forEach(function (v) { return v.disconnect(); });
            this._inputs = [];
        }
        return this;
    };
    Axes.prototype.get = function (axes) {
        return this.axm.get(axes);
    };
    Axes.prototype.setTo = function (pos, duration) {
        if (duration === void 0) { duration = 0; }
        this.am.setTo(pos, duration);
        return this;
    };
    Axes.prototype.setBy = function (pos, duration) {
        if (duration === void 0) { duration = 0; }
        this.am.setBy(pos, duration);
        return this;
    };
    Axes.prototype.isBounceArea = function (axes) {
        return this.axm.isOutside(axes);
    };
    Axes.prototype.destroy = function () {
        this.disconnect();
        this.em.destroy();
    };
    Axes.VERSION = "#__VERSION__#";
    Axes.TRANSFORM = const_1.TRANSFORM;
    Axes.DIRECTION_NONE = const_1.DIRECTION.DIRECTION_NONE;
    Axes.DIRECTION_LEFT = const_1.DIRECTION.DIRECTION_LEFT;
    Axes.DIRECTION_RIGHT = const_1.DIRECTION.DIRECTION_RIGHT;
    Axes.DIRECTION_UP = const_1.DIRECTION.DIRECTION_UP;
    Axes.DIRECTION_DOWN = const_1.DIRECTION.DIRECTION_DOWN;
    Axes.DIRECTION_HORIZONTAL = const_1.DIRECTION.DIRECTION_HORIZONTAL;
    Axes.DIRECTION_VERTICAL = const_1.DIRECTION.DIRECTION_VERTICAL;
    Axes.DIRECTION_ALL = const_1.DIRECTION.DIRECTION_ALL;
    return Axes;
}(Component));
exports["default"] = Axes;
;

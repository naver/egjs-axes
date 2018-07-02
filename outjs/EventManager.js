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
var EventManager = (function () {
    function EventManager(axes) {
        this.axes = axes;
    }
    EventManager.prototype.triggerHold = function (pos, option) {
        this.axes.trigger("hold", {
            pos: pos,
            input: option.input || null,
            inputEvent: option.event || null,
            isTrusted: true
        });
    };
    EventManager.prototype.triggerRelease = function (param) {
        param.setTo = this.createUserControll(param.destPos, param.duration);
        this.axes.trigger("release", param);
    };
    EventManager.prototype.triggerChange = function (pos, option, holding) {
        if (option === void 0) { option = null; }
        if (holding === void 0) { holding = false; }
        var eventInfo = this.am.getEventInfo();
        var moveTo = this.am.axm.moveTo(pos);
        var inputEvent = option && option.event || eventInfo && eventInfo.event || null;
        var param = {
            pos: moveTo.pos,
            delta: moveTo.delta,
            holding: holding,
            inputEvent: inputEvent,
            isTrusted: !!inputEvent,
            input: option && option.input || eventInfo && eventInfo.input || null,
            set: inputEvent ? this.createUserControll(moveTo.pos) : function () { }
        };
        this.axes.trigger("change", param);
        inputEvent && this.am.axm.set(param.set()["destPos"]);
    };
    EventManager.prototype.triggerAnimationStart = function (param) {
        param.setTo = this.createUserControll(param.destPos, param.duration);
        return this.axes.trigger("animationStart", param);
    };
    EventManager.prototype.triggerAnimationEnd = function (isTrusted) {
        if (isTrusted === void 0) { isTrusted = false; }
        this.axes.trigger("animationEnd", {
            isTrusted: isTrusted
        });
    };
    EventManager.prototype.triggerFinish = function (isTrusted) {
        if (isTrusted === void 0) { isTrusted = false; }
        this.axes.trigger("finish", {
            isTrusted: isTrusted
        });
    };
    EventManager.prototype.createUserControll = function (pos, duration) {
        if (duration === void 0) { duration = 0; }
        var userControl = {
            destPos: __assign({}, pos),
            duration: duration
        };
        return function (toPos, userDuration) {
            toPos && (userControl.destPos = __assign({}, toPos));
            (userDuration !== undefined) && (userControl.duration = userDuration);
            return userControl;
        };
    };
    EventManager.prototype.setAnimationManager = function (am) {
        this.am = am;
    };
    EventManager.prototype.destroy = function () {
        this.axes.off();
    };
    return EventManager;
}());
exports.EventManager = EventManager;
;

"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Coordinate_1 = __importDefault(require("./Coordinate"));
var AxisManager_1 = require("./AxisManager");
var utils_1 = require("./utils");
var AnimationManager = (function () {
    function AnimationManager(_a) {
        var options = _a.options, itm = _a.itm, em = _a.em, axm = _a.axm;
        this.options = options;
        this.itm = itm;
        this.em = em;
        this.axm = axm;
        this.animationEnd = this.animationEnd.bind(this);
    }
    AnimationManager.getDuration = function (duration, min, max) {
        return Math.max(Math.min(duration, max), min);
    };
    AnimationManager.prototype.getDuration = function (depaPos, destPos, wishDuration) {
        var _this = this;
        var duration;
        if (typeof wishDuration !== "undefined") {
            duration = wishDuration;
        }
        else {
            var durations_1 = this.axm.map(destPos, function (v, k) { return Coordinate_1["default"].getDuration(Math.abs(Math.abs(v) - Math.abs(depaPos[k])), _this.options.deceleration); });
            duration = Object.keys(durations_1).reduce(function (max, v) { return Math.max(max, durations_1[v]); }, -Infinity);
        }
        return AnimationManager.getDuration(duration, this.options.minimumDuration, this.options.maximumDuration);
    };
    AnimationManager.prototype.createAnimationParam = function (pos, duration, option) {
        var depaPos = this.axm.get();
        var destPos = pos;
        var inputEvent = option && option.event || null;
        return {
            depaPos: depaPos,
            destPos: destPos,
            duration: AnimationManager.getDuration(duration, this.options.minimumDuration, this.options.maximumDuration),
            delta: this.axm.getDelta(depaPos, destPos),
            inputEvent: inputEvent,
            input: option && option.input || null,
            isTrusted: !!inputEvent,
            done: this.animationEnd
        };
    };
    AnimationManager.prototype.grab = function (axes, option) {
        if (this._animateParam && axes.length) {
            var orgPos_1 = this.axm.get(axes);
            var pos = this.axm.map(orgPos_1, function (v, k, opt) { return Coordinate_1["default"].getCirculatedPos(v, opt.range, opt.circular); });
            if (!this.axm.every(pos, function (v, k) { return orgPos_1[k] === v; })) {
                this.em.triggerChange(pos, option, !!option);
            }
            this._animateParam = null;
            this._raf && utils_1.cancelAnimationFrame(this._raf);
            this._raf = null;
            this.em.triggerAnimationEnd(!!(option && option.event));
        }
    };
    AnimationManager.prototype.getEventInfo = function () {
        if (this._animateParam && this._animateParam.input && this._animateParam.inputEvent) {
            return {
                input: this._animateParam.input,
                event: this._animateParam.inputEvent
            };
        }
        else {
            return null;
        }
    };
    AnimationManager.prototype.restore = function (option) {
        var pos = this.axm.get();
        var destPos = this.axm.map(pos, function (v, k, opt) { return Math.min(opt.range[1], Math.max(opt.range[0], v)); });
        this.animateTo(destPos, this.getDuration(pos, destPos), option);
    };
    AnimationManager.prototype.animationEnd = function () {
        var beforeParam = this.getEventInfo();
        this._animateParam = null;
        var circularTargets = this.axm.filter(this.axm.get(), function (v, k, opt) { return Coordinate_1["default"].isCircularable(v, opt.range, opt.circular); });
        Object.keys(circularTargets).length > 0 && this.setTo(this.axm.map(circularTargets, function (v, k, opt) { return Coordinate_1["default"].getCirculatedPos(v, opt.range, opt.circular); }));
        this.itm.setInterrupt(false);
        this.em.triggerAnimationEnd(!!beforeParam);
        if (this.axm.isOutside()) {
            this.restore(beforeParam);
        }
        else {
            this.em.triggerFinish(!!beforeParam);
        }
    };
    AnimationManager.prototype.animateLoop = function (param, complete) {
        this._animateParam = __assign({}, param);
        this._animateParam.startTime = new Date().getTime();
        if (param.duration) {
            var info_1 = this._animateParam;
            var self_1 = this;
            (function loop() {
                self_1._raf = null;
                if (self_1.frame(info_1) >= 1) {
                    if (!AxisManager_1.AxisManager.equal(param.destPos, self_1.axm.get(Object.keys(param.destPos)))) {
                        self_1.em.triggerChange(param.destPos);
                    }
                    complete();
                    return;
                }
                self_1._raf = utils_1.requestAnimationFrame(loop);
            })();
        }
        else {
            this.em.triggerChange(param.destPos);
            complete();
        }
    };
    AnimationManager.prototype.getUserControll = function (param) {
        var userWish = param.setTo();
        userWish.destPos = this.axm.get(userWish.destPos);
        userWish.duration = AnimationManager.getDuration(userWish.duration, this.options.minimumDuration, this.options.maximumDuration);
        return userWish;
    };
    AnimationManager.prototype.animateTo = function (destPos, duration, option) {
        var _this = this;
        var param = this.createAnimationParam(destPos, duration, option);
        var depaPos = __assign({}, param.depaPos);
        var retTrigger = this.em.triggerAnimationStart(param);
        var userWish = this.getUserControll(param);
        if (!retTrigger && this.axm.every(userWish.destPos, function (v, k, opt) { return Coordinate_1["default"].isCircularable(v, opt.range, opt.circular); })) {
            console.warn("You can't stop the 'animation' event when 'circular' is true.");
        }
        if (retTrigger && !AxisManager_1.AxisManager.equal(userWish.destPos, depaPos)) {
            var inputEvent = option && option.event || null;
            this.animateLoop({
                depaPos: depaPos,
                destPos: userWish.destPos,
                duration: userWish.duration,
                delta: this.axm.getDelta(depaPos, userWish.destPos),
                isTrusted: !!inputEvent,
                inputEvent: inputEvent,
                input: option && option.input || null
            }, function () { return _this.animationEnd(); });
        }
    };
    AnimationManager.prototype.frame = function (param) {
        var curTime = new Date().getTime() - param.startTime;
        var easingPer = this.easing(curTime / param.duration);
        var toPos = param.depaPos;
        toPos = this.axm.map(toPos, function (v, k, opt) {
            v += param.delta[k] * easingPer;
            return Coordinate_1["default"].getCirculatedPos(v, opt.range, opt.circular);
        });
        this.em.triggerChange(toPos);
        return easingPer;
    };
    AnimationManager.prototype.easing = function (p) {
        return p > 1 ? 1 : this.options.easing(p);
    };
    AnimationManager.prototype.setTo = function (pos, duration) {
        if (duration === void 0) { duration = 0; }
        var axes = Object.keys(pos);
        this.grab(axes);
        var orgPos = this.axm.get(axes);
        if (AxisManager_1.AxisManager.equal(pos, orgPos)) {
            return this;
        }
        this.itm.setInterrupt(true);
        var movedPos = this.axm.filter(pos, function (v, k) { return orgPos[k] !== v; });
        if (!Object.keys(movedPos).length) {
            return this;
        }
        movedPos = this.axm.map(movedPos, function (v, k, opt) {
            if (opt.circular && (opt.circular[0] || opt.circular[1])) {
                return duration > 0 ? v : Coordinate_1["default"].getCirculatedPos(v, opt.range, opt.circular);
            }
            else {
                return Coordinate_1["default"].getInsidePosition(v, opt.range, opt.circular);
            }
        });
        if (AxisManager_1.AxisManager.equal(movedPos, orgPos)) {
            return this;
        }
        if (duration > 0) {
            this.animateTo(movedPos, duration);
        }
        else {
            this.em.triggerChange(movedPos);
            this.itm.setInterrupt(false);
        }
        return this;
    };
    AnimationManager.prototype.setBy = function (pos, duration) {
        if (duration === void 0) { duration = 0; }
        return this.setTo(this.axm.map(this.axm.get(Object.keys(pos)), function (v, k) { return v + pos[k]; }), duration);
    };
    return AnimationManager;
}());
exports.AnimationManager = AnimationManager;
;

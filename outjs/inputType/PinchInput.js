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
var utils_1 = require("../utils");
var InputType_1 = require("./InputType");
/**
 * @typedef {Object} PinchInputOption The option object of the eg.Axes.PinchInput module
 * @ko eg.Axes.PinchInput 모듈의 옵션 객체
 * @property {Number} [scale=1] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @property {Number} [threshold=0] Minimal scale before recognizing <ko>사용자의 Pinch 동작을 인식하기 위해산 최소한의 배율</ko>
 * @property {Object} [hammerManagerOptions={cssProps: {userSelect: "none",touchSelect: "none",touchCallout: "none",userDrag: "none"}] Options of Hammer.Manager <ko>Hammer.Manager의 옵션</ko>
**/
/**
 * @class eg.Axes.PinchInput
 * @classdesc A module that passes the amount of change to eg.Axes when two pointers are moving toward (zoom-in) or away from each other (zoom-out). use one axis.
 * @ko 2개의 pointer를 이용하여 zoom-in하거나 zoom-out 하는 동작의 변화량을 eg.Axes에 전달하는 모듈. 한 개 의 축을 사용한다.
 * @example
 * const pinch = new eg.Axes.PinchInput("#area", {
 * 		scale: 1
 * });
 *
 * // Connect 'something' axis when two pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * axes.connect("something", pinch);
 *
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.PinchInput module <ko>eg.Axes.PinchInput 모듈을 사용할 엘리먼트</ko>
 * @param {PinchInputOption} [options] The option object of the eg.Axes.PinchInput module<ko>eg.Axes.PinchInput 모듈의 옵션 객체</ko>
 */
var PinchInput = /** @class */ (function () {
    function PinchInput(el, options) {
        this.axes = [];
        this.hammer = null;
        this.element = null;
        this._base = null;
        this._prev = null;
        /**
         * Hammer helps you add support for touch gestures to your page
         *
         * @external Hammer
         * @see {@link http://hammerjs.github.io|Hammer.JS}
         * @see {@link http://hammerjs.github.io/jsdoc/Hammer.html|Hammer.JS API documents}
         * @see Hammer.JS applies specific CSS properties by {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html|default} when creating an instance. The eg.Axes module removes all default CSS properties provided by Hammer.JS
         */
        if (typeof Hammer === "undefined") {
            throw new Error("The Hammerjs must be loaded before eg.Axes.PinchInput.\nhttp://hammerjs.github.io/");
        }
        this.element = utils_1.$(el);
        this.options = __assign({
            scale: 1,
            threshold: 0,
            hammerManagerOptions: {
                // css properties were removed due to usablility issue
                // http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html
                cssProps: {
                    userSelect: "none",
                    touchSelect: "none",
                    touchCallout: "none",
                    userDrag: "none"
                }
            }
        }, options);
        this.onPinchStart = this.onPinchStart.bind(this);
        this.onPinchMove = this.onPinchMove.bind(this);
        this.onPinchEnd = this.onPinchEnd.bind(this);
    }
    PinchInput.prototype.mapAxes = function (axes) {
        this.axes = axes;
    };
    PinchInput.prototype.connect = function (observer) {
        var hammerOption = {
            threshold: this.options.threshold
        };
        if (this.hammer) {
            this.dettachEvent();
            // hammer remove previous PinchRecognizer.
            this.hammer.add(new Hammer.Pinch(hammerOption));
        }
        else {
            var keyValue = this.element[InputType_1.UNIQUEKEY];
            if (keyValue) {
                this.hammer.destroy();
            }
            else {
                keyValue = String(Math.round(Math.random() * new Date().getTime()));
            }
            this.hammer = InputType_1.createHammer(this.element, __assign({
                recognizers: [
                    [Hammer.Pinch, hammerOption],
                ],
                inputClass: Hammer.TouchInput
            }, this.options.hammerManagerOptions));
            this.element[InputType_1.UNIQUEKEY] = keyValue;
        }
        this.attachEvent(observer);
        return this;
    };
    PinchInput.prototype.disconnect = function () {
        if (this.hammer) {
            this.dettachEvent();
        }
        return this;
    };
    /**
    * Destroys elements, properties, and events used in a module.
    * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
    * @method eg.Axes.PinchInput#destroy
    */
    PinchInput.prototype.destroy = function () {
        this.disconnect();
        if (this.hammer) {
            this.hammer.destroy();
        }
        delete this.element[InputType_1.UNIQUEKEY];
        this.element = null;
        this.hammer = null;
    };
    PinchInput.prototype.onPinchStart = function (event) {
        this._base = this.observer.get(this)[this.axes[0]];
        var offset = this.getOffset(event.scale);
        this.observer.hold(this, event);
        this.observer.change(this, event, InputType_1.toAxis(this.axes, [offset]));
        this._prev = event.scale;
    };
    PinchInput.prototype.onPinchMove = function (event) {
        var offset = this.getOffset(event.scale, this._prev);
        this.observer.change(this, event, InputType_1.toAxis(this.axes, [offset]));
        this._prev = event.scale;
    };
    PinchInput.prototype.onPinchEnd = function (event) {
        var offset = this.getOffset(event.scale, this._prev);
        this.observer.change(this, event, InputType_1.toAxis(this.axes, [offset]));
        this.observer.release(this, event, InputType_1.toAxis(this.axes, [0]), 0);
        this._base = null;
        this._prev = null;
    };
    PinchInput.prototype.getOffset = function (pinchScale, prev) {
        if (prev === void 0) { prev = 1; }
        return this._base * (pinchScale - prev) * this.options.scale;
    };
    PinchInput.prototype.attachEvent = function (observer) {
        this.observer = observer;
        this.hammer.on("pinchstart", this.onPinchStart)
            .on("pinchmove", this.onPinchMove)
            .on("pinchend", this.onPinchEnd);
    };
    PinchInput.prototype.dettachEvent = function () {
        this.hammer.off("pinchstart", this.onPinchStart)
            .off("pinchmove", this.onPinchMove)
            .off("pinchend", this.onPinchEnd);
        this.observer = null;
        this._prev = null;
    };
    /**
     * Enables input devices
     * @ko 입력 장치를 사용할 수 있게 한다
     * @method eg.Axes.PinchInput#enable
     * @return {eg.Axes.PinchInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */
    PinchInput.prototype.enable = function () {
        this.hammer && (this.hammer.get("pinch").options.enable = true);
        return this;
    };
    /**
     * Disables input devices
     * @ko 입력 장치를 사용할 수 없게 한다.
     * @method eg.Axes.PinchInput#disable
     * @return {eg.Axes.PinchInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */
    PinchInput.prototype.disable = function () {
        this.hammer && (this.hammer.get("pinch").options.enable = false);
        return this;
    };
    /**
     * Returns whether to use an input device
     * @ko 입력 장치를 사용 여부를 반환한다.
     * @method eg.Axes.PinchInput#isEnable
     * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
     */
    PinchInput.prototype.isEnable = function () {
        return !!(this.hammer && this.hammer.get("pinch").options.enable);
    };
    return PinchInput;
}());
exports.PinchInput = PinchInput;

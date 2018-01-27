"use strict";
exports.__esModule = true;
var InterruptManager = /** @class */ (function () {
    function InterruptManager(options) {
        this.options = options;
        this._prevented = false; //  check whether the animation event was prevented
    }
    InterruptManager.prototype.isInterrupting = function () {
        // when interruptable is 'true', return value is always 'true'.
        return this.options.interruptable || this._prevented;
    };
    InterruptManager.prototype.isInterrupted = function () {
        return !this.options.interruptable && this._prevented;
    };
    InterruptManager.prototype.setInterrupt = function (prevented) {
        !this.options.interruptable && (this._prevented = prevented);
    };
    return InterruptManager;
}());
exports.InterruptManager = InterruptManager;
;

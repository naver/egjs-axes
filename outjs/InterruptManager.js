"use strict";
exports.__esModule = true;
var InterruptManager = (function () {
    function InterruptManager(options) {
        this.options = options;
        this._prevented = false;
    }
    InterruptManager.prototype.isInterrupting = function () {
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

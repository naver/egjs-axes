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
;
var AxisManager = (function () {
    function AxisManager(axis, options) {
        var _this = this;
        this.axis = axis;
        this.options = options;
        this._complementOptions();
        this._pos = Object.keys(this.axis).reduce(function (acc, v) {
            acc[v] = _this.axis[v].range[0];
            return acc;
        }, {});
    }
    AxisManager.equal = function (target, base) {
        for (var k in target) {
            if (target[k] !== base[k]) {
                return false;
            }
        }
        return true;
    };
    AxisManager.prototype._complementOptions = function () {
        var _this = this;
        Object.keys(this.axis).forEach(function (axis) {
            _this.axis[axis] = __assign({
                range: [0, 100],
                bounce: [0, 0],
                circular: [false, false]
            }, _this.axis[axis]);
            ["bounce", "circular"].forEach(function (v) {
                var axisOption = _this.axis;
                var key = axisOption[axis][v];
                if (/string|number|boolean/.test(typeof key)) {
                    axisOption[axis][v] = [key, key];
                }
            });
        });
    };
    AxisManager.prototype.getDelta = function (depaPos, destPos) {
        var fullDepaPos = this.get(depaPos);
        return this.map(this.get(destPos), function (v, k) { return v - fullDepaPos[k]; });
    };
    AxisManager.prototype.get = function (axes) {
        var _this = this;
        if (axes && Array.isArray(axes)) {
            return axes.reduce(function (acc, v) {
                if (v && (v in _this._pos)) {
                    acc[v] = _this._pos[v];
                }
                return acc;
            }, {});
        }
        else {
            return __assign({}, this._pos, (axes || {}));
        }
    };
    AxisManager.prototype.moveTo = function (pos) {
        var _this = this;
        var delta = this.map(this._pos, function (v, key) {
            return pos[key] ? pos[key] - _this._pos[key] : 0;
        });
        this.set(pos);
        return {
            pos: __assign({}, this._pos),
            delta: delta
        };
    };
    AxisManager.prototype.set = function (pos) {
        for (var k in pos) {
            if (k && (k in this._pos)) {
                this._pos[k] = pos[k];
            }
        }
    };
    AxisManager.prototype.every = function (pos, callback) {
        var axisOptions = this.axis;
        for (var k in pos) {
            if (k) {
                if (!callback(pos[k], k, axisOptions[k])) {
                    return false;
                }
            }
        }
        return true;
    };
    AxisManager.prototype.filter = function (pos, callback) {
        var filtered = {};
        var axisOptions = this.axis;
        for (var k in pos) {
            if (k) {
                callback(pos[k], k, axisOptions[k]) && (filtered[k] = pos[k]);
            }
        }
        return filtered;
    };
    AxisManager.prototype.map = function (pos, callback) {
        var tranformed = {};
        var axisOptions = this.axis;
        for (var k in pos) {
            if (k) {
                tranformed[k] = callback(pos[k], k, axisOptions[k]);
            }
        }
        return tranformed;
    };
    AxisManager.prototype.isOutside = function (axes) {
        return !this.every(axes ? this.get(axes) : this._pos, function (v, k, opt) { return !Coordinate_1["default"].isOutside(v, opt.range); });
    };
    return AxisManager;
}());
exports.AxisManager = AxisManager;
;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelInput = exports.PinchInput = exports.MoveKeyInput = exports.PanInput = exports.InputType = undefined;

var _Axes = require("./Axes");

var _Axes2 = _interopRequireDefault(_Axes);

var _InputType = require("./inputTypes/InputType");

var _InputType2 = _interopRequireDefault(_InputType);

var _PanInput = require("./inputTypes/PanInput");

var _PanInput2 = _interopRequireDefault(_PanInput);

var _PinchInput = require("./inputTypes/PinchInput");

var _PinchInput2 = _interopRequireDefault(_PinchInput);

var _MoveKeyInput = require("./inputTypes/MoveKeyInput");

var _MoveKeyInput2 = _interopRequireDefault(_MoveKeyInput);

var _WheelInput = require("./inputTypes/WheelInput");

var _WheelInput2 = _interopRequireDefault(_WheelInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.InputType = _InputType2.default;
exports.PanInput = _PanInput2.default;
exports.MoveKeyInput = _MoveKeyInput2.default;
exports.PinchInput = _PinchInput2.default;
exports.WheelInput = _WheelInput2.default;
exports.default = _Axes2.default;
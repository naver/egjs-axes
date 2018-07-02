"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Axes_1 = __importDefault(require("./Axes"));
var PanInput_1 = require("./inputType/PanInput");
var PinchInput_1 = require("./inputType/PinchInput");
var WheelInput_1 = require("./inputType/WheelInput");
var MoveKeyInput_1 = require("./inputType/MoveKeyInput");
Axes_1["default"].PanInput = PanInput_1.PanInput;
Axes_1["default"].PinchInput = PinchInput_1.PinchInput;
Axes_1["default"].WheelInput = WheelInput_1.WheelInput;
Axes_1["default"].MoveKeyInput = MoveKeyInput_1.MoveKeyInput;
module.exports = Axes_1["default"];

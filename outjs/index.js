"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Axes_1 = __importDefault(require("./Axes"));
var PanInput_1 = require("./inputType/PanInput");
exports.PanInput = PanInput_1.PanInput;
var PinchInput_1 = require("./inputType/PinchInput");
exports.PinchInput = PinchInput_1.PinchInput;
var WheelInput_1 = require("./inputType/WheelInput");
exports.WheelInput = WheelInput_1.WheelInput;
var MoveKeyInput_1 = require("./inputType/MoveKeyInput");
exports.MoveKeyInput = MoveKeyInput_1.MoveKeyInput;
exports["default"] = Axes_1["default"];

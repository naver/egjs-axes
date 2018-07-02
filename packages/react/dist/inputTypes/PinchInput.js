"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _InputType = require("./InputType");

var _InputType2 = _interopRequireDefault(_InputType);

var _axes = require("@egjs/axes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _InputType2.default.makeType(_axes.PinchInput);
module.exports = exports["default"];
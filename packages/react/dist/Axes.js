"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _axes = require("@egjs/axes");

var _axes2 = _interopRequireDefault(_axes);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function toZeroAxis(axis) {
    var value = {};

    for (var name in axis) {
        value[name] = 0;
    }
    return value;
}

var Axes = function (_Component) {
    _inherits(Axes, _Component);

    function Axes(props) {
        _classCallCheck(this, Axes);

        var _this = _possibleConstructorReturn(this, (Axes.__proto__ || Object.getPrototypeOf(Axes)).call(this, props));

        var events = {};
        var options = {};
        var axis = {};

        for (var name in props) {
            if (name in Axes.propTypes) {
                continue;
            } else if (name in Axes.optionsTypes) {
                options[name] = props[name];
            } else if (~name.search(/^on/)) {
                events[name.replace("on", "").toLowerCase()] = props[name];
            }
        }

        var propsAxis = _this.props.axis;

        for (var _name in propsAxis) {
            if (Array.isArray(propsAxis[_name])) {
                axis[_name] = {
                    range: propsAxis[_name]
                };
            } else {
                axis[_name] = propsAxis[_name];
            }
        }
        _this.axes = new _axes2.default(axis, options);
        for (var _name2 in events) {
            _this.axes.on(_name2, events[_name2]);
        }
        _this.axes.on("change", _this.onChange.bind(_this));
        _this.axes.on("hold", _this.onHold.bind(_this));
        _this.axes.on("release", _this.onRelease.bind(_this));
        var pos = _this.axes.get();

        _this.state = {
            pos: pos,
            delta: toZeroAxis(_this.axes.axis),
            holding: false,
            isTrusted: false
        };
        return _this;
    }

    _createClass(Axes, [{
        key: "onChange",
        value: function onChange(e) {
            this.setState(e);
        }
    }, {
        key: "onHold",
        value: function onHold(e) {
            this.onChange(_extends({}, e, {
                delta: toZeroAxis(this.axes.axis),
                holding: true
            }));
        }
    }, {
        key: "onRelease",
        value: function onRelease(e) {
            this.onChange(_extends({}, e, {
                pos: this.axes.get(),
                delta: toZeroAxis(this.axes.axis),
                holding: false
            }));
        }
    }, {
        key: "render",
        value: function render() {
            return this.props.children(this.state);
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this.axes.axis.axis = this.props.axis;
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var element = _reactDom2.default.findDOMNode(this);

            if (!element) {
                return;
            }
            var inputs = Array.isArray(this.props.inputs) ? this.props.inputs : [this.props.inputs];

            inputs.forEach(function (input) {
                var inst = input.$$typeof ? new input.type(input.props) : input;
                var props = inst.props;
                var type = props.type,
                    axis = props.axis,
                    options = props.options;


                _this2.axes.connect(axis, new type(element, options));
            });
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.axes.destroy();
        }
    }]);

    return Axes;
}(_react.Component);

Axes.propTypes = {
    axis: _propTypes2.default.object,
    inputs: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object])
};
Axes.optionsTypes = {
    easing: _propTypes2.default.func,
    maximumDuration: _propTypes2.default.number,
    minimumDuration: _propTypes2.default.number,
    deceleration: _propTypes2.default.number,
    interruptable: _propTypes2.default.boolean
};
exports.default = Axes;
module.exports = exports["default"];
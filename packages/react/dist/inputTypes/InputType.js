'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputType = function () {
    _createClass(InputType, null, [{
        key: 'makeType',
        value: function makeType(type) {
            return function (_InputType) {
                _inherits(Type, _InputType);

                function Type(props) {
                    _classCallCheck(this, Type);

                    return _possibleConstructorReturn(this, (Type.__proto__ || Object.getPrototypeOf(Type)).call(this, _extends({}, props, {
                        type: type
                    })));
                }

                return Type;
            }(InputType);
        }
    }]);

    function InputType(props) {
        _classCallCheck(this, InputType);

        var options = {};

        for (var name in props) {
            if (name in InputType.propTypes) {
                continue;
            }
            options[name] = props[name];
        }
        this.props = {
            type: props.type,
            axis: props.axis,
            options: options
        };
    }

    return InputType;
}();

InputType.propTypes = {
    type: _propTypes2.default.func,
    axis: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array])
};
exports.default = InputType;
module.exports = exports['default'];
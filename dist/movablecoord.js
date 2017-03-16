/*!
 * Copyright (c) 2017 NAVER corp
 * @egjs/movablecoord projects are licensed under the MIT <https://naver.github.io/egjs/license.txt> license
 * 
 * @egjs/movablecoord JavaScript library
 * https://github.com/naver/egjs-movablecoord
 * 
 * @version 2.0.0-beta
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@egjs/component"), require("hammerjs"));
	else if(typeof define === 'function' && define.amd)
		define(["@egjs/component", "hammerjs"], factory);
	else if(typeof exports === 'object')
		exports["MovableCoord"] = factory(require("@egjs/component"), require("hammerjs"));
	else
		root["eg"] = root["eg"] || {}, root["eg"]["MovableCoord"] = factory(root["eg"]["Component"], root["Hammer"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUPPORT_TOUCH = exports.UNIQUEKEY = exports.DIRECTION = undefined;

var _browser = __webpack_require__(1);

/**
 * @name eg.MovableCoord.DIRECTION_NONE
 * @constant
 * @type {Number}
 */
/**
 * @name eg.MovableCoord.DIRECTION_LEFT
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_RIGHT
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_UP
 * @constant
 * @type {Number}
 */
/**
 * @name eg.MovableCoord.DIRECTION_DOWN
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_HORIZONTAL
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_VERTICAL
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_ALL
 * @constant
 * @type {Number}
*/
var direction = {
  DIRECTION_NONE: 1,
  DIRECTION_LEFT: 2,
  DIRECTION_RIGHT: 4,
  DIRECTION_UP: 8,
  DIRECTION_DOWN: 16,
  DIRECTION_HORIZONTAL: 2 | 4,
  DIRECTION_VERTICAL: 8 | 16
};

direction.DIRECTION_ALL = direction.DIRECTION_HORIZONTAL | direction.DIRECTION_VERTICAL;
var DIRECTION = exports.DIRECTION = direction;
var UNIQUEKEY = exports.UNIQUEKEY = "__MOVABLECOORD__";
var SUPPORT_TOUCH = exports.SUPPORT_TOUCH = "ontouchstart" in _browser.window;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-new-func, no-nested-ternary */
var win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
/* eslint-enable no-new-func, no-nested-ternary */

exports.window = win;
var document = exports.document = win.document;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _consts = __webpack_require__(0);

var Coordinate = {
	// get user's direction
	getDirectionByAngle: function getDirectionByAngle(angle, thresholdAngle) {
		if (thresholdAngle < 0 || thresholdAngle > 90) {
			return _consts.DIRECTION.DIRECTION_NONE;
		}
		var toAngle = Math.abs(angle);

		return toAngle > thresholdAngle && toAngle < 180 - thresholdAngle ? _consts.DIRECTION.DIRECTION_VERTICAL : _consts.DIRECTION.DIRECTION_HORIZONTAL;
	},
	isHorizontal: function isHorizontal(direction, userDirection) {
		return direction === _consts.DIRECTION.DIRECTION_ALL || direction & _consts.DIRECTION.DIRECTION_HORIZONTAL && userDirection & _consts.DIRECTION.DIRECTION_HORIZONTAL;
	},
	isVertical: function isVertical(direction, userDirection) {
		return direction === _consts.DIRECTION.DIRECTION_ALL || direction & _consts.DIRECTION.DIRECTION_VERTICAL && userDirection & _consts.DIRECTION.DIRECTION_VERTICAL;
	},
	getPointOfIntersection: function getPointOfIntersection(depaPos, destPos, min, max, circular, bounce) {
		var boxLT = [min[0] - bounce[3], min[1] - bounce[0]];
		var boxRB = [max[0] + bounce[1], max[1] + bounce[2]];
		var toDestPos = destPos.concat();

		var xd = destPos[0] - depaPos[0];
		var yd = destPos[1] - depaPos[1];

		if (!circular[3]) {
			toDestPos[0] = Math.max(boxLT[0], toDestPos[0]);
		} // left
		if (!circular[1]) {
			toDestPos[0] = Math.min(boxRB[0], toDestPos[0]);
		} // right
		toDestPos[1] = xd ? depaPos[1] + yd / xd * (toDestPos[0] - depaPos[0]) : toDestPos[1];

		if (!circular[0]) {
			toDestPos[1] = Math.max(boxLT[1], toDestPos[1]);
		} // up
		if (!circular[2]) {
			toDestPos[1] = Math.min(boxRB[1], toDestPos[1]);
		} // down
		toDestPos[0] = yd ? depaPos[0] + xd / yd * (toDestPos[1] - depaPos[1]) : toDestPos[0];
		return [Math.min(max[0], Math.max(min[0], toDestPos[0])), Math.min(max[1], Math.max(min[1], toDestPos[1]))];
	},

	// determine outside
	isOutside: function isOutside(pos, min, max) {
		return pos[0] < min[0] || pos[1] < min[1] || pos[0] > max[0] || pos[1] > max[1];
	},

	// from outside to outside
	isOutToOut: function isOutToOut(pos, destPos, min, max) {
		return (pos[0] < min[0] || pos[0] > max[0] || pos[1] < min[1] || pos[1] > max[1]) && (destPos[0] < min[0] || destPos[0] > max[0] || destPos[1] < min[1] || destPos[1] > max[1]);
	},
	getNextOffsetPos: function getNextOffsetPos(speeds, deceleration) {
		var normalSpeed = Math.sqrt(speeds[0] * speeds[0] + speeds[1] * speeds[1]);
		var duration = Math.abs(normalSpeed / -deceleration);

		return [speeds[0] / 2 * duration, speeds[1] / 2 * duration];
	},
	getDurationFromPos: function getDurationFromPos(pos, deceleration) {
		var normalPos = Math.sqrt(pos[0] * pos[0] + pos[1] * pos[1]);
		var duration = Math.sqrt(normalPos / deceleration * 2);

		// when duration is under 100, then value is zero
		return duration < 100 ? 0 : duration;
	},
	isCircular: function isCircular(destPos, min, max, circular) {
		return circular[0] && destPos[1] < min[1] || circular[1] && destPos[0] > max[0] || circular[2] && destPos[1] > max[1] || circular[3] && destPos[0] < min[0];
	},
	getCircularPos: function getCircularPos(pos, min, max, circular) {
		var toPos = pos.concat();

		if (circular[0] && toPos[1] < min[1]) {
			// up
			toPos[1] = (toPos[1] - min[1]) % (max[1] - min[1] + 1) + max[1];
		}
		if (circular[1] && toPos[0] > max[0]) {
			// right
			toPos[0] = (toPos[0] - min[0]) % (max[0] - min[0] + 1) + min[0];
		}
		if (circular[2] && toPos[1] > max[1]) {
			// down
			toPos[1] = (toPos[1] - min[1]) % (max[1] - min[1] + 1) + min[1];
		}
		if (circular[3] && toPos[0] < min[0]) {
			// left
			toPos[0] = (toPos[0] - min[0]) % (max[0] - min[0] + 1) + max[0];
		}

		toPos[0] = +toPos[0].toFixed(5);
		toPos[1] = +toPos[1].toFixed(5);
		return toPos;
	}
};

exports.default = Coordinate;
module.exports = exports["default"];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.utils = exports.Mixin = undefined;

var _browser = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = {
	getElement: function getElement(el) {
		if (typeof el === "string") {
			return _browser.document.querySelector(el);
		} else if (_browser.window.jQuery && el instanceof jQuery) {
			// if you were using jQuery
			return el.length > 0 ? el[0] : null;
		} else {
			return el;
		}
	}
};

var MixinBuilder = function () {
	function MixinBuilder(superclass) {
		_classCallCheck(this, MixinBuilder);

		this.superclass = superclass || function () {
			function _class() {
				_classCallCheck(this, _class);
			}

			return _class;
		}();
	}

	MixinBuilder.prototype.with = function _with() {
		for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
			mixins[_key] = arguments[_key];
		}

		return mixins.reduce(function (c, m) {
			return m(c);
		}, this.superclass);
	};

	return MixinBuilder;
}();

var Mixin = function Mixin(superclass) {
	return new MixinBuilder(superclass);
};

exports.Mixin = Mixin;
exports.utils = utils;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _component = __webpack_require__(8);

var _component2 = _interopRequireDefault(_component);

var _hammerManager = __webpack_require__(7);

var _hammerManager2 = _interopRequireDefault(_hammerManager);

var _eventHandler = __webpack_require__(6);

var _eventHandler2 = _interopRequireDefault(_eventHandler);

var _animationHandler = __webpack_require__(5);

var _animationHandler2 = _interopRequireDefault(_animationHandler);

var _consts = __webpack_require__(0);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A module used to change the information of user action entered by various input devices such as touch screen or mouse into logical coordinates within the virtual coordinate system. The coordinate information sorted by time events occurred is provided if animations are made by user actions. You can implement a user interface by applying the logical coordinates provided. For more information on the eg.MovableCoord module, see demos.
 * @ko 터치 입력 장치나 마우스와 같은 다양한 입력 장치로 전달 받은 사용자의 동작을 가상 좌표계의 논리적 좌표로 변경하는 모듈. 사용자의 동작으로 애니메이션이 일어나면 시간순으로 변경되는 좌표 정보도 제공한다. 변경된 논리적 좌표를 반영해 UI를 구현할 수 있다. eg.MovableCoord 모듈의 자세한 작동 방식은 데모를 참고한다.
 * @class
 * @name eg.MovableCoord
 * @extends eg.Component
 *
 * @param {Object} options The option object of the eg.MovableCoord module<ko>eg.MovableCoord 모듈의 옵션 객체</ko>
 * @param {Array} options.min The minimum value of X and Y coordinates <ko>좌표계의 최솟값</ko>
 * @param {Number} [options.min.0=0] The X coordinate of the minimum <ko>최소 x좌표</ko>
 * @param {Number} [options.min.1=0] The Y coordinate of the minimum <ko>최소 y좌표</ko>
 *
 * @param {Array} options.max The maximum value of X and Y coordinates <ko>좌표계의 최댓값</ko>
 * @param {Number} [options.max.0=100] The X coordinate of the maximum<ko>최대 x좌표</ko>
 * @param {Number} [options.max.1=100] The Y coordinate of the maximum<ko>최대 y좌표</ko>
 *
 * @param {Array} options.bounce The size of bouncing area. The coordinates can exceed the coordinate area as much as the bouncing area based on user action. If the coordinates does not exceed the bouncing area when an element is dragged, the coordinates where bouncing effects are applied are retuned back into the coordinate area<ko>바운스 영역의 크기. 사용자의 동작에 따라 좌표가 좌표 영역을 넘어 바운스 영역의 크기만큼 더 이동할 수 있다. 사용자가 끌어다 놓는 동작을 했을 때 좌표가 바운스 영역에 있으면, 바운스 효과가 적용된 좌표가 다시 좌표 영역 안으로 들어온다</ko>
 * @param {Boolean} [options.bounce.0=10] The size of top area <ko>위쪽 바운스 영역의 크기</ko>
 * @param {Boolean} [options.bounce.1=10] The size of right area <ko>오른쪽 바운스 영역의 크기</ko>
 * @param {Boolean} [options.bounce.2=10] The size of bottom area <ko>아래쪽 바운스 영역의 크기</ko>
 * @param {Boolean} [options.bounce.3=10] The size of left area <ko>왼쪽 바운스 영역의 크기</ko>
 *
 * @param {Array} options.margin The size of accessible space outside the coordinate area. If an element is dragged outside the coordinate area and then dropped, the coordinates of the element are returned back into the coordinate area. The size of margins that can be exceeded <ko>−	좌표 영역을 넘어 이동할 수 있는 바깥 영역의 크기. 사용자가 좌표를 바깥 영역까지 끌었다가 놓으면 좌표가 좌표 영역 안으로 들어온다.</ko>
 * @param {Boolean} [options.margin.0=0] The size of top margin <ko>위쪽 바깥 영역의 크기</ko>
 * @param {Boolean} [options.margin.1=0] The size of right margin <ko>오른쪽 바깥 영역의 크기</ko>
 * @param {Boolean} [options.margin.2=0] The size of bottom margin <ko>아래쪽 바깥 영역의 크기</ko>
 * @param {Boolean} [options.margin.3=0] The size of left margin <ko>왼쪽 바깥 영역의 크기</ko>
 * @param {Array} options.circular Indicates whether a circular element is available. If it is set to "true" and an element is dragged outside the coordinate area, the element will appear on the other side.<ko>순환 여부. 'true'로 설정한 방향의 좌표 영역 밖으로 엘리먼트가 이동하면 반대 방향에서 엘리먼트가 나타난다</ko>
 * @param {Boolean} [options.circular.0=false] Indicates whether to circulate to top <ko>위로 순환 여부</ko>
 * @param {Boolean} [options.circular.1=false] Indicates whether to circulate to right <ko>오른쪽으로 순환 여부</ko>
 * @param {Boolean} [options.circular.2=false] Indicates whether to circulate to bottom  <ko>아래로 순환 여부</ko>
 * @param {Boolean} [options.circular.3=false] Indicates whether to circulate to left  <ko>왼쪽으로 순환 여부</ko>
 *
 * @param {Function} [options.easing=easing.easeOutCubic] The easing function to apply to an animation <ko>애니메이션에 적용할 easing 함수</ko>
 * @param {Number} [options.maximumDuration=Infinity] Maximum duration of the animation <ko>가속도에 의해 애니메이션이 동작할 때의 최대 좌표 이동 시간</ko>
 * @param {Number} [options.deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time. <ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다</ko>
 * @see HammerJS {@link http://hammerjs.github.io}
 * @see • Hammer.JS applies specific CSS properties by default when creating an instance (See {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html}). The eg.MovableCoord module removes all default CSS properties provided by Hammer.JS <ko>Hammer.JS는 인스턴스를 생성할 때 기본으로 특정 CSS 속성을 적용한다(참고: @link{http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html}). 특정한 상황에서는 Hammer.JS의 속성 때문에 사용성에 문제가 있을 수 있다. eg.MovableCoord 모듈은 Hammer.JS의 기본 CSS 속성을 모두 제거했다</ko>
 *
 * @codepen {"id":"jPPqeR", "ko":"MovableCoord Cube 예제", "en":"MovableCoord Cube example", "collectionId":"AKpkGW", "height": 403}
 *
 * @see Easing Functions Cheat Sheet {@link http://easings.net/}
 * @see If you want to try a different easing function, use the jQuery easing plugin ({@link http://gsgd.co.uk/sandbox/jquery/easing}) or the jQuery UI easing library ({@link https://jqueryui.com/easing}) <ko>다른 easing 함수를 사용하려면 jQuery easing 플러그인({@link http://gsgd.co.uk/sandbox/jquery/easing})이나, jQuery UI easing 라이브러리({@lin https://jqueryui.com/easing})를 사용한다</ko>
 *
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 */
var MovableCoord = function (_Mixin$with) {
	_inherits(MovableCoord, _Mixin$with);

	function MovableCoord(options) {
		_classCallCheck(this, MovableCoord);

		var _this = _possibleConstructorReturn(this, _Mixin$with.call(this));

		Object.assign(_this.options = {
			min: [0, 0],
			max: [100, 100],
			bounce: [10, 10, 10, 10],
			margin: [0, 0, 0, 0],
			circular: [false, false, false, false],
			easing: function easeOutCubic(x) {
				return 1 - Math.pow(1 - x, 3);
			},
			maximumDuration: Infinity,
			deceleration: 0.0006
		}, options);
		_this._reviseOptions();
		_this._hammerManager = new _hammerManager2.default();
		_this._pos = _this.options.min.concat();
		return _this;
	}

	/**
  * Registers an element to use the eg.MovableCoord module.
  * @ko eg.MovableCoord 모듈을 사용할 엘리먼트를 등록한다
  * @method eg.MovableCoord#bind
  * @param {HTMLElement|String|jQuery} element An element to use the eg.MovableCoord module<ko>−	eg.MovableCoord 모듈을 사용할 엘리먼트</ko>
  * @param {Object} options The option object of the bind() method <ko>bind() 메서드의 옵션 객체</ko>
  * @param {Number} [options.direction=eg.MovableCoord.DIRECTION_ALL] Coordinate direction that a user can move<br>- eg.MovableCoord.DIRECTION_ALL: All directions available.<br>- eg.MovableCoord.DIRECTION_HORIZONTAL: Horizontal direction only.<br>- eg.MovableCoord.DIRECTION_VERTICAL: Vertical direction only<ko>사용자의 동작으로 움직일 수 있는 좌표의 방향.<br>- eg.MovableCoord.DIRECTION_ALL: 모든 방향으로 움직일 수 있다.<br>- eg.MovableCoord.DIRECTION_HORIZONTAL: 가로 방향으로만 움직일 수 있다.<br>- eg.MovableCoord.DIRECTION_VERTICAL: 세로 방향으로만 움직일 수 있다.</ko>
  * @param {Array} options.scale Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
  * @param {Number} [options.scale.0=1] X-axis scale <ko>x축 배율</ko>
  * @param {Number} [options.scale.1=1] Y-axis scale <ko>y축 배율</ko>
  * @param {Number} [options.thresholdAngle=45] The threshold value that determines whether user action is horizontal or vertical (0~90) <ko>사용자의 동작이 가로 방향인지 세로 방향인지 판단하는 기준 각도(0~90)</ko>
  * @param {Number} [options.interruptable=true] Indicates whether an animation is interruptible.<br>- true: It can be paused or stopped by user action or the API.<br>- false: It cannot be paused or stopped by user action or the API while it is running.<ko>진행 중인 애니메이션 중지 가능 여부.<br>- true: 사용자의 동작이나 API로 애니메이션을 중지할 수 있다.<br>- false: 애니메이션이 진행 중일 때는 사용자의 동작이나 API가 적용되지 않는다</ko>
  * @param {Array} [options.inputType] Types of input devices. (default: ["touch", "mouse"])<br>- touch: Touch screen<br>- mouse: Mouse <ko>입력 장치 종류.(기본값: ["touch", "mouse"])<br>- touch: 터치 입력 장치<br>- mouse: 마우스</ko>
  *
  * @return {eg.MovableCoord} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
  */


	MovableCoord.prototype.bind = function bind(element, options) {
		this._hammerManager.add(element, options, this);
		return this;
	};
	/**
  * Detaches an element using the eg.MovableCoord module.
  * @ko eg.MovableCoord 모듈을 사용하는 엘리먼트를 해제한다
  * @method eg.MovableCoord#unbind
  * @param {HTMLElement|String|jQuery} element An element from which the eg.MovableCoord module is detached<ko>eg.MovableCoord 모듈을 해제할 엘리먼트</ko>
  * @return {eg.MovableCoord} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  */


	MovableCoord.prototype.unbind = function unbind(element) {
		this._hammerManager.remove(element);
		return this;
	};

	/**
  * get a hammer instance from elements using the eg.MovableCoord module.
  * @ko eg.MovableCoord 모듈을 사용하는 엘리먼트에서 hammer 객체를 얻는다
  * @method eg.MovableCoord#getHammer
  * @param {HTMLElement|String|jQuery} element An element from which the eg.MovableCoord module is using<ko>eg.MovableCoord 모듈을 사용하는 엘리먼트</ko>
  * @return {Hammer|null} An instance of Hammer.JS<ko>Hammer.JS의 인스턴스</ko>
  */


	MovableCoord.prototype.getHammer = function getHammer(element) {
		return this._hammerManager.getHammer(element);
	};

	/**
  * Enables input devices
  * @ko 입력 장치를 사용할 수 있게 한다
  * @method eg.MovableCoord#enableInput
  * @param {HTMLElement|String|jQuery} [element] An element from which the eg.MovableCoord module is using (if the element parameter is not present, it applies to all binded elements)<ko>eg.MovableCoord 모듈을 	사용하는 엘리먼트 (element 파라미터가 존재하지 않을 경우, 바인드된 모든 엘리먼트에 적용된다)</ko>
  * @return {eg.MovableCoord} An instance of a module itself <ko>자신의 인스턴스</ko>
 */


	MovableCoord.prototype.enableInput = function enableInput(element) {
		return this._hammerManager.inputControl(true, element);
	};

	/**
  * Disables input devices
  * @ko 입력 장치를 사용할 수 없게 한다.
  * @method eg.MovableCoord#disableInput
  * @param {HTMLElement|String|jQuery} [element] An element from which the eg.MovableCoord module is using (if the element parameter is not present, it applies to all binded elements)<<ko>eg.MovableCoord 모듈을 	사용하는 엘리먼트 (element 파라미터가 존재하지 않을 경우, 바인드된 모든 엘리먼트에 적용된다)</ko>
  * @return {eg.MovableCoord} An instance of a module itself <ko>자신의 인스턴스</ko>
  */


	MovableCoord.prototype.disableInput = function disableInput(element) {
		return this._hammerManager.inputControl(false, element);
	};

	// set up 'css' expression


	MovableCoord.prototype._reviseOptions = function _reviseOptions() {
		var _this2 = this;

		var key = void 0;

		["bounce", "margin", "circular"].forEach(function (v) {
			key = _this2.options[v];
			if (key != null) {
				if (key.constructor === Array) {
					_this2.options[v] = key.length === 2 ? key.concat(key) : key.concat();
				} else if (/string|number|boolean/.test(typeof key === "undefined" ? "undefined" : _typeof(key))) {
					_this2.options[v] = [key, key, key, key];
				} else {
					_this2.options[v] = null;
				}
			}
		});
	};

	/**
  * Returns the current position of the logical coordinates.
  * @ko 논리적 좌표의 현재 위치를 반환한다
  * @method eg.MovableCoord#get
  * @return {Array} pos <ko>좌표</ko>
  * @return {Number} pos.0 The X coordinate <ko>x 좌표</ko>
  * @return {Number} pos.1 The Y coordinate <ko>y 좌표</ko>
  */


	MovableCoord.prototype.get = function get() {
		return this._pos.concat();
	};

	/**
  * Destroys elements, properties, and events used in a module.
  * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
  * @method eg.MovableCoord#destroy
  */


	MovableCoord.prototype.destroy = function destroy() {
		this.off();
		this._hammerManager.destroy();
	};

	return MovableCoord;
}((0, _utils.Mixin)(_component2.default).with(_eventHandler2.default, _animationHandler2.default));

Object.assign(MovableCoord, _consts.DIRECTION);
MovableCoord.VERSION = "2.0.0-beta";
exports.default = MovableCoord;
module.exports = exports["default"];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _coordinate = __webpack_require__(2);

var _coordinate2 = _interopRequireDefault(_coordinate);

var _browser = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (superclass) {
	return function (_superclass) {
		_inherits(_class, _superclass);

		function _class() {
			_classCallCheck(this, _class);

			var _this = _possibleConstructorReturn(this, _superclass.call(this));

			_this._raf = null;
			_this._animateParam = null;
			_this._animationEnd = _this._animationEnd.bind(_this); // for caching
			_this._restore = _this._restore.bind(_this); // for caching
			return _this;
		}

		_class.prototype._grab = function _grab(min, max, circular) {
			if (this._animateParam) {
				this.trigger("animationEnd");
				var orgPos = this.get();

				var pos = _coordinate2.default.getCircularPos(this.get(), min, max, circular);

				if (pos[0] !== orgPos[0] || pos[1] !== orgPos[1]) {
					this._setPosAndTriggerChange(pos, true);
				}
				this._animateParam = null;
				this._raf && _browser.window.cancelAnimationFrame(this._raf);
				this._raf = null;
			}
		};

		_class.prototype._prepareParam = function _prepareParam(absPos, duration, hammerEvent) {
			var pos = this.get();
			var min = this.options.min;
			var max = this.options.max;
			var circular = this.options.circular;
			var maximumDuration = this.options.maximumDuration;
			var destPos = _coordinate2.default.getPointOfIntersection(pos, absPos, min, max, circular, this.options.bounce);

			destPos = _coordinate2.default.isOutToOut(pos, destPos, min, max) ? pos : destPos;

			var distance = [Math.abs(destPos[0] - pos[0]), Math.abs(destPos[1] - pos[1])];
			var newDuration = duration == null ? _coordinate2.default.getDurationFromPos(distance, this.options.deceleration) : duration;

			newDuration = maximumDuration > newDuration ? newDuration : maximumDuration;
			return {
				depaPos: pos.concat(),
				destPos: destPos.concat(),
				isBounce: _coordinate2.default.isOutside(destPos, min, max),
				isCircular: _coordinate2.default.isCircular(absPos, min, max, circular),
				duration: newDuration,
				distance: distance,
				hammerEvent: hammerEvent || null,
				done: this._animationEnd
			};
		};

		_class.prototype._restore = function _restore(complete, hammerEvent) {
			var pos = this.get();
			var min = this.options.min;
			var max = this.options.max;

			this._animate(this._prepareParam([Math.min(max[0], Math.max(min[0], pos[0])), Math.min(max[1], Math.max(min[1], pos[1]))], null, hammerEvent), complete);
		};

		_class.prototype._animationEnd = function _animationEnd() {
			this._animateParam = null;
			var orgPos = this.get();
			var nextPos = _coordinate2.default.getCircularPos([Math.round(orgPos[0]), Math.round(orgPos[1])], this.options.min, this.options.max, this.options.circular);

			this.setTo.apply(this, nextPos);
			this._setInterrupt(false);
			/**
    * This event is fired when animation ends.
    * @ko 에니메이션이 끝났을 때 발생한다.
    * @name eg.MovableCoord#animationEnd
    * @event
    */
			this.trigger("animationEnd");
		};

		_class.prototype._animate = function _animate(param, complete) {
			this._animateParam = Object.assign({}, param);
			this._animateParam.startTime = new Date().getTime();
			if (param.duration) {
				var info = this._animateParam;
				var self = this;

				(function loop() {
					/* eslint-disable no-underscore-dangle */
					self._raf = null;
					if (self._frame(info) >= 1) {
						// deferred.resolve();
						complete();
						return;
					} // animationEnd
					self._raf = _browser.window.requestAnimationFrame(loop);
					/* eslint-enable no-underscore-dangle */
				})();
			} else {
				this._setPosAndTriggerChange(param.destPos, false);
				complete();
			}
		};

		_class.prototype._animateTo = function _animateTo(absPos, duration, hammerEvent) {
			var _this2 = this;

			var param = this._prepareParam(absPos, duration, hammerEvent);
			var retTrigger = this.trigger("animationStart", param);

			// You can't stop the 'animationStart' event when 'circular' is true.
			if (param.isCircular && !retTrigger) {
				throw new Error("You can't stop the 'animation' event when 'circular' is true.");
			}

			if (retTrigger) {
				var queue = [];
				var dequeue = function dequeue() {
					var task = queue.shift();

					task && task.call(this);
				};

				if (param.depaPos[0] !== param.destPos[0] || param.depaPos[1] !== param.destPos[1]) {
					queue.push(function () {
						return _this2._animate(param, dequeue);
					});
				}
				if (_coordinate2.default.isOutside(param.destPos, this.options.min, this.options.max)) {
					queue.push(function () {
						return _this2._restore(dequeue, hammerEvent);
					});
				}
				queue.push(function () {
					return _this2._animationEnd();
				});
				dequeue();
			}
		};

		// animation frame (0~1)


		_class.prototype._frame = function _frame(param) {
			var curTime = new Date() - param.startTime;
			var easingPer = this._easing(curTime / param.duration);
			var pos = [param.depaPos[0], param.depaPos[1]];

			for (var i = 0; i < 2; i++) {
				pos[i] !== param.destPos[i] && (pos[i] += (param.destPos[i] - pos[i]) * easingPer);
			}
			pos = _coordinate2.default.getCircularPos(pos, this.options.min, this.options.max, this.options.circular);
			this._setPosAndTriggerChange(pos, false);
			return easingPer;
		};

		// trigger 'change' event


		_class.prototype._setPosAndTriggerChange = function _setPosAndTriggerChange(position, holding, e) {
			/**
    * This event is fired when coordinate changes.
    * @ko 좌표가 변경됐을 때 발생하는 이벤트
    * @name eg.MovableCoord#change
    * @event
    *
    * @param {Object} param The object of data to be sent when the event is fired <ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
    * @param {Array} param.position departure coordinate  <ko>좌표</ko>
    * @param {Number} param.position.0 The X coordinate <ko>x 좌표</ko>
    * @param {Number} param.pos.1 The Y coordinate <ko>y 좌표</ko>
    * @param {Boolean} param.holding Indicates whether a user holds an element on the screen of the device.<ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
    * @param {Object} param.hammerEvent The event information of Hammer.JS. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>Hammer.JS의 이벤트 정보. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다.</ko>
    *
    */
			this._pos = position.concat();
			this.trigger("change", {
				pos: position.concat(),
				holding: holding,
				hammerEvent: e || null
			});
		};

		_class.prototype._easing = function _easing(p) {
			return p > 1 ? 1 : this.options.easing(p);
		};

		/**
   * Moves an element to specific coordinates.
   * @ko 좌표를 이동한다.
   * @method eg.MovableCoord#setTo
   * @param {Number} x The X coordinate to move to <ko>이동할 x좌표</ko>
   * @param {Number} y The Y coordinate to move to  <ko>이동할 y좌표</ko>
   * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
   * @return {eg.MovableCoord} An instance of a module itself <ko>자신의 인스턴스</ko>
   */


		_class.prototype.setTo = function setTo(x, y) {
			var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

			var toX = x;
			var toY = y;
			var min = this.options.min;
			var max = this.options.max;
			var circular = this.options.circular;

			this._grab(min, max, circular);
			var pos = this.get();

			if (x === pos[0] && y === pos[1]) {
				return this;
			}

			this._setInterrupt(true);
			if (x !== pos[0]) {
				if (!circular[3]) {
					toX = Math.max(min[0], toX);
				}
				if (!circular[1]) {
					toX = Math.min(max[0], toX);
				}
			}
			if (y !== pos[1]) {
				if (!circular[0]) {
					toY = Math.max(min[1], toY);
				}
				if (!circular[2]) {
					toY = Math.min(max[1], toY);
				}
			}
			if (duration) {
				this._animateTo([toX, toY], duration);
			} else {
				this._pos = _coordinate2.default.getCircularPos([toX, toY], min, max, circular);
				this._setPosAndTriggerChange(this._pos, false);
				this._setInterrupt(false);
			}
			return this;
		};

		/**
   * Moves an element from the current coordinates to specific coordinates. The change event is fired when the method is executed.
   * @ko 현재 좌표를 기준으로 좌표를 이동한다. 메서드가 실행되면 change 이벤트가 발생한다
   * @method eg.MovableCoord#setBy
   * @param {Number} x The X coordinate to move to <ko>이동할 x좌표</ko>
   * @param {Number} y The Y coordinate to move to <ko>이동할 y좌표</ko>
   * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
   * @return {eg.MovableCoord} An instance of a module itself <ko>자신의 인스턴스</ko>
   */


		_class.prototype.setBy = function setBy(x, y) {
			var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

			return this.setTo(x != null ? this._pos[0] + x : this._pos[0], y != null ? this._pos[1] + y : this._pos[1], duration);
		};

		return _class;
	}(superclass);
};

module.exports = exports["default"];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _coordinate = __webpack_require__(2);

var _coordinate2 = _interopRequireDefault(_coordinate);

var _consts = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (superclass) {
	return function (_superclass) {
		_inherits(_class, _superclass);

		function _class() {
			_classCallCheck(this, _class);

			var _this = _possibleConstructorReturn(this, _superclass.call(this));

			_this._status = {
				grabOutside: false, // check whether user's action started on outside
				currentHammer: null, // current hammer instance
				currentOptions: {}, // current bind options
				moveDistance: null, // a position of the first user's action
				prevented: false //  check whether the animation event was prevented
			};
			return _this;
		}

		_class.prototype._setCurrentTarget = function _setCurrentTarget(hammer, options) {
			this._status.currentOptions = options;
			this._status.currentHanmmer = hammer;
		};

		// panstart event handler


		_class.prototype._start = function _start(e) {
			if (!this._status.currentOptions.interruptable && this._status.prevented) {
				return;
			}
			var pos = this.get();
			var min = this.options.min;
			var max = this.options.max;

			this._setInterrupt(true);
			this._grab(min, max, this.options.circular);
			/**
    * This event is fired when a user holds an element on the screen of the device.
    * @ko 사용자가 기기의 화면에 손을 대고 있을 때 발생하는 이벤트
    * @name eg.MovableCoord#hold
    * @event
    * @param {Object} param The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
    * @param {Array} param.pos coordinate <ko>좌표 정보</ko>
    * @param {Number} param.pos.0 The X coordinate<ko>x 좌표</ko>
    * @param {Number} param.pos.1 The Y coordinate<ko>y 좌표</ko>
    * @param {Object} param.hammerEvent The event information of Hammer.JS. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>Hammer.JS의 이벤트 정보. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다.</ko>
    *
    */
			this.trigger("hold", {
				pos: pos.concat(),
				hammerEvent: e
			});

			this._status.moveDistance = pos.concat();
			this._status.grabOutside = _coordinate2.default.isOutside(pos, min, max);
		};

		// panmove event handler


		_class.prototype._move = function _move(e) {
			if (!this._isInterrupting() || !this._status.moveDistance) {
				return;
			}
			var pos = this.get(true);
			var min = this.options.min;
			var max = this.options.max;
			var bounce = this.options.bounce;
			var margin = this.options.margin;
			var currentOptions = this._status.currentOptions;
			var direction = currentOptions.direction;
			var scale = currentOptions.scale;
			var userDirection = _coordinate2.default.getDirectionByAngle(e.angle, currentOptions.thresholdAngle);
			var out = [margin[0] + bounce[0], margin[1] + bounce[1], margin[2] + bounce[2], margin[3] + bounce[3]];
			var prevent = false;

			// not support offset properties in Hammerjs - start
			var prevInput = this._status.currentHanmmer.session.prevInput;

			/* eslint-disable no-param-reassign */
			if (prevInput) {
				e.offsetX = e.deltaX - prevInput.deltaX;
				e.offsetY = e.deltaY - prevInput.deltaY;
			} else {
				e.offsetX = 0;
				e.offsetY = 0;
			}

			// not support offset properties in Hammerjs - end
			if (_coordinate2.default.isHorizontal(direction, userDirection)) {
				this._status.moveDistance[0] += e.offsetX * scale[0];
				prevent = true;
			}
			if (_coordinate2.default.isVertical(direction, userDirection)) {
				this._status.moveDistance[1] += e.offsetY * scale[1];
				prevent = true;
			}
			if (prevent) {
				e.srcEvent.preventDefault();
				e.srcEvent.stopPropagation();
			}
			e.preventSystemEvent = prevent;
			/* eslint-enable no-param-reassign */

			pos[0] = this._status.moveDistance[0];
			pos[1] = this._status.moveDistance[1];
			pos = _coordinate2.default.getCircularPos(pos, min, max, this.options.circular);

			// from outside to inside
			if (this._status.grabOutside && !_coordinate2.default.isOutside(pos, min, max)) {
				this._status.grabOutside = false;
			}

			// when move pointer is held in outside
			var tv = void 0;
			var tn = void 0;
			var tx = void 0;

			if (this._status.grabOutside) {
				tn = min[0] - out[3];
				tx = max[0] + out[1];
				tv = pos[0];
				/* eslint-disable no-nested-ternary */
				pos[0] = tv > tx ? tx : tv < tn ? tn : tv;
				tn = min[1] - out[0];
				tx = max[1] + out[2];
				tv = pos[1];
				pos[1] = tv > tx ? tx : tv < tn ? tn : tv;
				/* eslint-enable no-nested-ternary */
			} else {
				// when start pointer is held in inside
				// get a initialization slope value to prevent smooth animation.
				var initSlope = this._easing(0.00001) / 0.00001;

				if (pos[1] < min[1]) {
					// up
					tv = (min[1] - pos[1]) / (out[0] * initSlope);
					pos[1] = min[1] - this._easing(tv) * out[0];
				} else if (pos[1] > max[1]) {
					// down
					tv = (pos[1] - max[1]) / (out[2] * initSlope);
					pos[1] = max[1] + this._easing(tv) * out[2];
				}
				if (pos[0] < min[0]) {
					// left
					tv = (min[0] - pos[0]) / (out[3] * initSlope);
					pos[0] = min[0] - this._easing(tv) * out[3];
				} else if (pos[0] > max[0]) {
					// right
					tv = (pos[0] - max[0]) / (out[1] * initSlope);
					pos[0] = max[0] + this._easing(tv) * out[1];
				}
			}
			this._setPosAndTriggerChange(pos, true, e);
		};

		// panend event handler


		_class.prototype._end = function _end(e) {
			var pos = this.get();

			if (!this._isInterrupting() || !this._status.moveDistance) {
				return;
			}

			// Abort the animating post process when "tap" occurs
			if (e.distance === 0 /* e.type === "tap" */) {
					this._setInterrupt(false);
					this.trigger("release", {
						depaPos: pos.concat(),
						destPos: pos.concat(),
						hammerEvent: e || null
					});
				} else {
				var direction = this._status.currentOptions.direction;
				var scale = this._status.currentOptions.scale;
				var vX = Math.abs(e.velocityX);
				var vY = Math.abs(e.velocityY);

				!(direction & _consts.DIRECTION.DIRECTION_HORIZONTAL) && (vX = 0);
				!(direction & _consts.DIRECTION.DIRECTION_VERTICAL) && (vY = 0);

				var offset = _coordinate2.default.getNextOffsetPos([vX * (e.deltaX < 0 ? -1 : 1) * scale[0], vY * (e.deltaY < 0 ? -1 : 1) * scale[1]], this.options.deceleration);
				var destPos = [pos[0] + offset[0], pos[1] + offset[1]];

				destPos = _coordinate2.default.getPointOfIntersection(pos, destPos, this.options.min, this.options.max, this.options.circular, this.options.bounce);
				/**
     * This event is fired when a user release an element on the screen of the device.
     * @ko 사용자가 기기의 화면에서 손을 뗐을 때 발생하는 이벤트
     * @name eg.MovableCoord#release
     * @event
     *
     * @param {Object} param The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
     * @param {Array} param.depaPos The coordinates when releasing an element<ko>손을 뗐을 때의 좌표현재 </ko>
     * @param {Number} param.depaPos.0 The X coordinate <ko> x 좌표</ko>
     * @param {Number} param.depaPos.1 The Y coordinate <ko> y 좌표</ko>
     * @param {Array} param.destPos The coordinates to move to after releasing an element<ko>손을 뗀 뒤에 이동할 좌표</ko>
     * @param {Number} param.destPos.0 The X coordinate <ko>x 좌표</ko>
     * @param {Number} param.destPos.1 The Y coordinate <ko>y 좌표</ko>
     * @param {Object} param.hammerEvent The event information of Hammer.JS. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>Hammer.JS의 이벤트 정보. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다</ko>
     *
     */
				this.trigger("release", {
					depaPos: pos.concat(),
					destPos: destPos,
					hammerEvent: e || null
				});
				if (pos[0] !== destPos[0] || pos[1] !== destPos[1]) {
					this._animateTo(destPos, null, e || null);
				} else {
					this._setInterrupt(false);
				}
			}
			this._status.moveDistance = null;
		};

		_class.prototype._isInterrupting = function _isInterrupting() {
			// when interruptable is 'true', return value is always 'true'.
			return this._status.currentOptions.interruptable || this._status.prevented;
		};

		_class.prototype._setInterrupt = function _setInterrupt(prevented) {
			!this._status.currentOptions.interruptable && (this._status.prevented = prevented);
		};

		return _class;
	}(superclass);
};

module.exports = exports["default"];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _hammerjs = __webpack_require__(9);

var _hammerjs2 = _interopRequireDefault(_hammerjs);

var _utils = __webpack_require__(3);

var _consts = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (typeof _hammerjs2.default === "undefined") {
	throw new Error("The Hammerjs must be loaded before eg.MovableCoord.\nhttp://hammerjs.github.io/");
}

var HammerManager = function () {
	function HammerManager() {
		_classCallCheck(this, HammerManager);

		this._hammers = {};
	}

	HammerManager.prototype._createHammer = function _createHammer(el, bindOptions, inputClass, handler) {
		try {
			// create Hammer
			return this._attachHammerEvents(new _hammerjs2.default.Manager(el, {
				recognizers: [[_hammerjs2.default.Pan, {
					direction: bindOptions.direction,
					threshold: 0
				}]],

				// css properties were removed due to usablility issue
				// http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html
				cssProps: {
					userSelect: "none",
					touchSelect: "none",
					touchCallout: "none",
					userDrag: "none"
				},
				inputClass: inputClass
			}), bindOptions, handler);
		} catch (e) {
			return null;
		}
	};

	HammerManager.prototype.add = function add(element, options, handler) {
		var el = _utils.utils.getElement(element);
		var keyValue = el.getAttribute(_consts.UNIQUEKEY);
		var bindOptions = Object.assign({
			direction: _consts.DIRECTION.DIRECTION_ALL,
			scale: [1, 1],
			thresholdAngle: 45,
			interruptable: true,
			inputType: ["touch", "mouse"]
		}, options);
		var inputClass = this.convertInputType(bindOptions.inputType);

		if (!inputClass) {
			return;
		}

		if (keyValue) {
			this._hammers[keyValue].hammer.destroy();
		} else {
			keyValue = Math.round(Math.random() * new Date().getTime());
		}
		this._hammers[keyValue] = {
			hammer: this._createHammer(el, bindOptions, inputClass, handler),
			el: el,
			options: bindOptions
		};
		el.setAttribute(_consts.UNIQUEKEY, keyValue);
	};

	HammerManager.prototype.remove = function remove(element) {
		var el = _utils.utils.getElement(element);
		var key = el.getAttribute(_consts.UNIQUEKEY);

		if (key) {
			this._hammers[key].hammer.destroy();
			delete this._hammers[key];
			el.removeAttribute(_consts.UNIQUEKEY);
		}
	};

	HammerManager.prototype.getHammer = function getHammer(element) {
		var data = this.get(element);

		return data ? data.hammer : null;
	};

	HammerManager.prototype.get = function get(element) {
		var el = _utils.utils.getElement(element);
		var key = el ? el.getAttribute(_consts.UNIQUEKEY) : null;

		if (key && this._hammers[key]) {
			return this._hammers[key];
		} else {
			return null;
		}
	};

	HammerManager.prototype._attachHammerEvents = function _attachHammerEvents(hammer, options, handler) {
		var enable = hammer.get("pan").options.enable;

		/* eslint-disable no-underscore-dangle */
		return hammer.on("hammer.input", function (e) {
			if (e.isFirst) {
				// apply options each
				handler._setCurrentTarget(hammer, options);
				enable && handler._start(e);
			} else if (e.isFinal) {
				// substitute .on("panend tap", this._panend); Because it(tap, panend) cannot catch vertical(horizontal) movement on HORIZONTAL(VERTICAL) mode.
				enable && handler._end(e);
			}
		}).on("panstart panmove", function (e) {
			return handler._move(e);
		});
		/* eslint-enable no-underscore-dangle */
	};

	HammerManager.prototype._detachHammerEvents = function _detachHammerEvents(hammer) {
		hammer.off("hammer.input panstart panmove panend");
	};

	HammerManager.prototype.convertInputType = function convertInputType() {
		var inputType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

		var hasTouch = false;
		var hasMouse = false;
		var inputs = inputType || [];

		inputs.forEach(function (v) {
			switch (v) {
				case "mouse":
					hasMouse = true;break;
				case "touch":
					hasTouch = _consts.SUPPORT_TOUCH;
				// no default
			}
		});
		return hasTouch && _hammerjs2.default.TouchInput || hasMouse && _hammerjs2.default.MouseInput || null;
	};

	HammerManager.prototype.inputControl = function inputControl(isEnable, element) {
		var option = {
			enable: isEnable
		};

		if (element) {
			var hammer = this.getHammer(element);

			hammer && hammer.get("pan").set(option);
		} else {
			// for multi
			for (var p in this._hammers) {
				this._hammers[p].hammer.get("pan").set(option);
			}
		}
		return this;
	};

	HammerManager.prototype.destroy = function destroy() {
		for (var p in this._hammers) {
			this._hammers[p].hammer.destroy();
			this._hammers[p].el.removeAttribute(_consts.UNIQUEKEY);
			delete this._hammers[p];
		}
		this._hammers = {};
	};

	return HammerManager;
}();

exports.default = HammerManager;
module.exports = exports["default"];

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _movableCoord = __webpack_require__(4);

var _movableCoord2 = _interopRequireDefault(_movableCoord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _movableCoord2.default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4ZGNhNDhkNzFjNjlhNzM5MDViZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RzLmpzIiwid2VicGFjazovLy8uL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb29yZGluYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92YWJsZUNvb3JkLmpzIiwid2VicGFjazovLy8uL3NyYy9hbmltYXRpb25IYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9ldmVudEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hhbW1lck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJAZWdqcy9jb21wb25lbnRcIixcImNvbW1vbmpzMlwiOlwiQGVnanMvY29tcG9uZW50XCIsXCJhbWRcIjpcIkBlZ2pzL2NvbXBvbmVudFwiLFwicm9vdFwiOltcImVnXCIsXCJDb21wb25lbnRcIl19Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiaGFtbWVyanNcIixcImNvbW1vbmpzMlwiOlwiaGFtbWVyanNcIixcImFtZFwiOlwiaGFtbWVyanNcIixcInJvb3RcIjpcIkhhbW1lclwifSIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiZGlyZWN0aW9uIiwiRElSRUNUSU9OX05PTkUiLCJESVJFQ1RJT05fTEVGVCIsIkRJUkVDVElPTl9SSUdIVCIsIkRJUkVDVElPTl9VUCIsIkRJUkVDVElPTl9ET1dOIiwiRElSRUNUSU9OX0hPUklaT05UQUwiLCJESVJFQ1RJT05fVkVSVElDQUwiLCJESVJFQ1RJT05fQUxMIiwiRElSRUNUSU9OIiwiVU5JUVVFS0VZIiwiU1VQUE9SVF9UT1VDSCIsIndpbiIsIndpbmRvdyIsIk1hdGgiLCJzZWxmIiwiRnVuY3Rpb24iLCJkb2N1bWVudCIsIkNvb3JkaW5hdGUiLCJnZXREaXJlY3Rpb25CeUFuZ2xlIiwiYW5nbGUiLCJ0aHJlc2hvbGRBbmdsZSIsInRvQW5nbGUiLCJhYnMiLCJpc0hvcml6b250YWwiLCJ1c2VyRGlyZWN0aW9uIiwiaXNWZXJ0aWNhbCIsImdldFBvaW50T2ZJbnRlcnNlY3Rpb24iLCJkZXBhUG9zIiwiZGVzdFBvcyIsIm1pbiIsIm1heCIsImNpcmN1bGFyIiwiYm91bmNlIiwiYm94TFQiLCJib3hSQiIsInRvRGVzdFBvcyIsImNvbmNhdCIsInhkIiwieWQiLCJpc091dHNpZGUiLCJwb3MiLCJpc091dFRvT3V0IiwiZ2V0TmV4dE9mZnNldFBvcyIsInNwZWVkcyIsImRlY2VsZXJhdGlvbiIsIm5vcm1hbFNwZWVkIiwic3FydCIsImR1cmF0aW9uIiwiZ2V0RHVyYXRpb25Gcm9tUG9zIiwibm9ybWFsUG9zIiwiaXNDaXJjdWxhciIsImdldENpcmN1bGFyUG9zIiwidG9Qb3MiLCJ0b0ZpeGVkIiwidXRpbHMiLCJnZXRFbGVtZW50IiwiZWwiLCJxdWVyeVNlbGVjdG9yIiwialF1ZXJ5IiwibGVuZ3RoIiwiTWl4aW5CdWlsZGVyIiwic3VwZXJjbGFzcyIsIndpdGgiLCJtaXhpbnMiLCJyZWR1Y2UiLCJjIiwibSIsIk1peGluIiwiTW92YWJsZUNvb3JkIiwib3B0aW9ucyIsIk9iamVjdCIsImFzc2lnbiIsIm1hcmdpbiIsImVhc2luZyIsImVhc2VPdXRDdWJpYyIsIngiLCJwb3ciLCJtYXhpbXVtRHVyYXRpb24iLCJJbmZpbml0eSIsIl9yZXZpc2VPcHRpb25zIiwiX2hhbW1lck1hbmFnZXIiLCJfcG9zIiwiYmluZCIsImVsZW1lbnQiLCJhZGQiLCJ1bmJpbmQiLCJyZW1vdmUiLCJnZXRIYW1tZXIiLCJlbmFibGVJbnB1dCIsImlucHV0Q29udHJvbCIsImRpc2FibGVJbnB1dCIsImtleSIsImZvckVhY2giLCJ2IiwiY29uc3RydWN0b3IiLCJBcnJheSIsInRlc3QiLCJnZXQiLCJkZXN0cm95Iiwib2ZmIiwiVkVSU0lPTiIsIl9yYWYiLCJfYW5pbWF0ZVBhcmFtIiwiX2FuaW1hdGlvbkVuZCIsIl9yZXN0b3JlIiwiX2dyYWIiLCJ0cmlnZ2VyIiwib3JnUG9zIiwiX3NldFBvc0FuZFRyaWdnZXJDaGFuZ2UiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIl9wcmVwYXJlUGFyYW0iLCJhYnNQb3MiLCJoYW1tZXJFdmVudCIsImRpc3RhbmNlIiwibmV3RHVyYXRpb24iLCJpc0JvdW5jZSIsImRvbmUiLCJjb21wbGV0ZSIsIl9hbmltYXRlIiwibmV4dFBvcyIsInJvdW5kIiwic2V0VG8iLCJfc2V0SW50ZXJydXB0IiwicGFyYW0iLCJzdGFydFRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsImluZm8iLCJsb29wIiwiX2ZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiX2FuaW1hdGVUbyIsInJldFRyaWdnZXIiLCJFcnJvciIsInF1ZXVlIiwiZGVxdWV1ZSIsInRhc2siLCJzaGlmdCIsImNhbGwiLCJwdXNoIiwiY3VyVGltZSIsImVhc2luZ1BlciIsIl9lYXNpbmciLCJpIiwicG9zaXRpb24iLCJob2xkaW5nIiwiZSIsInAiLCJ5IiwidG9YIiwidG9ZIiwic2V0QnkiLCJfc3RhdHVzIiwiZ3JhYk91dHNpZGUiLCJjdXJyZW50SGFtbWVyIiwiY3VycmVudE9wdGlvbnMiLCJtb3ZlRGlzdGFuY2UiLCJwcmV2ZW50ZWQiLCJfc2V0Q3VycmVudFRhcmdldCIsImhhbW1lciIsImN1cnJlbnRIYW5tbWVyIiwiX3N0YXJ0IiwiaW50ZXJydXB0YWJsZSIsIl9tb3ZlIiwiX2lzSW50ZXJydXB0aW5nIiwic2NhbGUiLCJvdXQiLCJwcmV2ZW50IiwicHJldklucHV0Iiwic2Vzc2lvbiIsIm9mZnNldFgiLCJkZWx0YVgiLCJvZmZzZXRZIiwiZGVsdGFZIiwic3JjRXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnRTeXN0ZW1FdmVudCIsInR2IiwidG4iLCJ0eCIsImluaXRTbG9wZSIsIl9lbmQiLCJ2WCIsInZlbG9jaXR5WCIsInZZIiwidmVsb2NpdHlZIiwib2Zmc2V0IiwiSGFtbWVyTWFuYWdlciIsIl9oYW1tZXJzIiwiX2NyZWF0ZUhhbW1lciIsImJpbmRPcHRpb25zIiwiaW5wdXRDbGFzcyIsImhhbmRsZXIiLCJfYXR0YWNoSGFtbWVyRXZlbnRzIiwiTWFuYWdlciIsInJlY29nbml6ZXJzIiwiUGFuIiwidGhyZXNob2xkIiwiY3NzUHJvcHMiLCJ1c2VyU2VsZWN0IiwidG91Y2hTZWxlY3QiLCJ0b3VjaENhbGxvdXQiLCJ1c2VyRHJhZyIsImtleVZhbHVlIiwiZ2V0QXR0cmlidXRlIiwiaW5wdXRUeXBlIiwiY29udmVydElucHV0VHlwZSIsInJhbmRvbSIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImRhdGEiLCJlbmFibGUiLCJvbiIsImlzRmlyc3QiLCJpc0ZpbmFsIiwiX2RldGFjaEhhbW1lckV2ZW50cyIsImhhc1RvdWNoIiwiaGFzTW91c2UiLCJpbnB1dHMiLCJUb3VjaElucHV0IiwiTW91c2VJbnB1dCIsImlzRW5hYmxlIiwib3B0aW9uIiwic2V0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQixDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFB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LGFBQVVBLE9BQU85RCxHQUFQLENBQVcsS0FBWCxFQUFrQitILEdBQWxCLENBQXNCRCxNQUF0QixDQUFWO0FBQ0EsR0FKRCxNQUlPO0FBQUU7QUFDUixRQUFLLElBQU01RSxDQUFYLElBQWdCLEtBQUswQyxRQUFyQixFQUErQjtBQUM5QixTQUFLQSxRQUFMLENBQWMxQyxDQUFkLEVBQWlCWSxNQUFqQixDQUF3QjlELEdBQXhCLENBQTRCLEtBQTVCLEVBQW1DK0gsR0FBbkMsQ0FBdUNELE1BQXZDO0FBQ0E7QUFDRDtBQUNELFNBQU8sSUFBUDtBQUNBLEU7O3lCQUVEN0gsTyxzQkFBVTtBQUNULE9BQUssSUFBTWlELENBQVgsSUFBZ0IsS0FBSzBDLFFBQXJCLEVBQStCO0FBQzlCLFFBQUtBLFFBQUwsQ0FBYzFDLENBQWQsRUFBaUJZLE1BQWpCLENBQXdCN0QsT0FBeEI7QUFDQSxRQUFLMkYsUUFBTCxDQUFjMUMsQ0FBZCxFQUFpQjNGLEVBQWpCLENBQW9CMEosZUFBcEI7QUFDQSxVQUFPLEtBQUtyQixRQUFMLENBQWMxQyxDQUFkLENBQVA7QUFDQTtBQUNELE9BQUswQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsRTs7Ozs7a0JBN0ptQkQsYTs7Ozs7OztBQ1JyQiwrQzs7Ozs7O0FDQUEsK0M7Ozs7Ozs7OztBQ0FBOzs7Ozs7QUFFQXFDLE9BQU9DLE9BQVAsMEIiLCJmaWxlIjoibW92YWJsZWNvb3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiQGVnanMvY29tcG9uZW50XCIpLCByZXF1aXJlKFwiaGFtbWVyanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiQGVnanMvY29tcG9uZW50XCIsIFwiaGFtbWVyanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiTW92YWJsZUNvb3JkXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiQGVnanMvY29tcG9uZW50XCIpLCByZXF1aXJlKFwiaGFtbWVyanNcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImVnXCJdID0gcm9vdFtcImVnXCJdIHx8IHt9LCByb290W1wiZWdcIl1bXCJNb3ZhYmxlQ29vcmRcIl0gPSBmYWN0b3J5KHJvb3RbXCJlZ1wiXVtcIkNvbXBvbmVudFwiXSwgcm9vdFtcIkhhbW1lclwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzhfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV85X18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDhkY2E0OGQ3MWM2OWE3MzkwNWJlIiwiaW1wb3J0IHt3aW5kb3d9IGZyb20gXCIuL2Jyb3dzZXJcIjtcblxuLyoqXG4gKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX05PTkVcbiAqIEBjb25zdGFudFxuICogQHR5cGUge051bWJlcn1cbiAqL1xuLyoqXG4gKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX0xFRlRcbiAqIEBjb25zdGFudFxuICogQHR5cGUge051bWJlcn1cbiovXG4vKipcbiAqIEBuYW1lIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fUklHSFRcbiAqIEBjb25zdGFudFxuICogQHR5cGUge051bWJlcn1cbiovXG4vKipcbiAqIEBuYW1lIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fVVBcbiAqIEBjb25zdGFudFxuICogQHR5cGUge051bWJlcn1cbiAqL1xuLyoqXG4gKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX0RPV05cbiAqIEBjb25zdGFudFxuICogQHR5cGUge051bWJlcn1cbiovXG4vKipcbiAqIEBuYW1lIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fSE9SSVpPTlRBTFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7TnVtYmVyfVxuKi9cbi8qKlxuICogQG5hbWUgZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9WRVJUSUNBTFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7TnVtYmVyfVxuKi9cbi8qKlxuICogQG5hbWUgZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9BTExcbiAqIEBjb25zdGFudFxuICogQHR5cGUge051bWJlcn1cbiovXG5jb25zdCBkaXJlY3Rpb24gPSB7XG5cdERJUkVDVElPTl9OT05FOiAxLFxuXHRESVJFQ1RJT05fTEVGVDogMixcblx0RElSRUNUSU9OX1JJR0hUOiA0LFxuXHRESVJFQ1RJT05fVVA6IDgsXG5cdERJUkVDVElPTl9ET1dOOiAxNixcblx0RElSRUNUSU9OX0hPUklaT05UQUw6IDIgfCA0LFxuXHRESVJFQ1RJT05fVkVSVElDQUw6IDggfCAxNlxufTtcblxuZGlyZWN0aW9uLkRJUkVDVElPTl9BTEwgPSBkaXJlY3Rpb24uRElSRUNUSU9OX0hPUklaT05UQUwgfFxuXHRkaXJlY3Rpb24uRElSRUNUSU9OX1ZFUlRJQ0FMO1xuZXhwb3J0IGNvbnN0IERJUkVDVElPTiA9IGRpcmVjdGlvbjtcbmV4cG9ydCBjb25zdCBVTklRVUVLRVkgPSBcIl9fTU9WQUJMRUNPT1JEX19cIjtcbmV4cG9ydCBjb25zdCBTVVBQT1JUX1RPVUNIID0gXCJvbnRvdWNoc3RhcnRcIiBpbiB3aW5kb3c7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25zdHMuanMiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYywgbm8tbmVzdGVkLXRlcm5hcnkgKi9cbmNvbnN0IHdpbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93Lk1hdGggPT09IE1hdGggPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLk1hdGggPT09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xuLyogZXNsaW50LWVuYWJsZSBuby1uZXctZnVuYywgbm8tbmVzdGVkLXRlcm5hcnkgKi9cblxuZXhwb3J0IHt3aW4gYXMgd2luZG93fTtcbmV4cG9ydCBjb25zdCBkb2N1bWVudCA9IHdpbi5kb2N1bWVudDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9icm93c2VyLmpzIiwiaW1wb3J0IHtESVJFQ1RJT059IGZyb20gXCIuL2NvbnN0c1wiO1xuXG5jb25zdCBDb29yZGluYXRlID0ge1xuXHQvLyBnZXQgdXNlcidzIGRpcmVjdGlvblxuXHRnZXREaXJlY3Rpb25CeUFuZ2xlKGFuZ2xlLCB0aHJlc2hvbGRBbmdsZSkge1xuXHRcdGlmICh0aHJlc2hvbGRBbmdsZSA8IDAgfHwgdGhyZXNob2xkQW5nbGUgPiA5MCkge1xuXHRcdFx0cmV0dXJuIERJUkVDVElPTi5ESVJFQ1RJT05fTk9ORTtcblx0XHR9XG5cdFx0Y29uc3QgdG9BbmdsZSA9IE1hdGguYWJzKGFuZ2xlKTtcblxuXHRcdHJldHVybiB0b0FuZ2xlID4gdGhyZXNob2xkQW5nbGUgJiYgdG9BbmdsZSA8IDE4MCAtIHRocmVzaG9sZEFuZ2xlID9cblx0XHRcdFx0RElSRUNUSU9OLkRJUkVDVElPTl9WRVJUSUNBTCA6IERJUkVDVElPTi5ESVJFQ1RJT05fSE9SSVpPTlRBTDtcblx0fSxcblx0aXNIb3Jpem9udGFsKGRpcmVjdGlvbiwgdXNlckRpcmVjdGlvbikge1xuXHRcdHJldHVybiBkaXJlY3Rpb24gPT09IERJUkVDVElPTi5ESVJFQ1RJT05fQUxMIHx8XG5cdFx0XHQoZGlyZWN0aW9uICYgRElSRUNUSU9OLkRJUkVDVElPTl9IT1JJWk9OVEFMICYmXG5cdFx0XHR1c2VyRGlyZWN0aW9uICYgRElSRUNUSU9OLkRJUkVDVElPTl9IT1JJWk9OVEFMKTtcblx0fSxcblx0aXNWZXJ0aWNhbChkaXJlY3Rpb24sIHVzZXJEaXJlY3Rpb24pIHtcblx0XHRyZXR1cm4gZGlyZWN0aW9uID09PSBESVJFQ1RJT04uRElSRUNUSU9OX0FMTCB8fFxuXHRcdFx0KGRpcmVjdGlvbiAmIERJUkVDVElPTi5ESVJFQ1RJT05fVkVSVElDQUwgJiZcblx0XHRcdHVzZXJEaXJlY3Rpb24gJiBESVJFQ1RJT04uRElSRUNUSU9OX1ZFUlRJQ0FMKTtcblx0fSxcblx0Z2V0UG9pbnRPZkludGVyc2VjdGlvbihkZXBhUG9zLCBkZXN0UG9zLCBtaW4sIG1heCwgY2lyY3VsYXIsIGJvdW5jZSkge1xuXHRcdGNvbnN0IGJveExUID0gW21pblswXSAtIGJvdW5jZVszXSwgbWluWzFdIC0gYm91bmNlWzBdXTtcblx0XHRjb25zdCBib3hSQiA9IFttYXhbMF0gKyBib3VuY2VbMV0sIG1heFsxXSArIGJvdW5jZVsyXV07XG5cdFx0Y29uc3QgdG9EZXN0UG9zID0gZGVzdFBvcy5jb25jYXQoKTtcblxuXHRcdGNvbnN0IHhkID0gZGVzdFBvc1swXSAtIGRlcGFQb3NbMF07XG5cdFx0Y29uc3QgeWQgPSBkZXN0UG9zWzFdIC0gZGVwYVBvc1sxXTtcblxuXHRcdGlmICghY2lyY3VsYXJbM10pIHtcblx0XHRcdHRvRGVzdFBvc1swXSA9IE1hdGgubWF4KGJveExUWzBdLCB0b0Rlc3RQb3NbMF0pO1xuXHRcdH0gLy8gbGVmdFxuXHRcdGlmICghY2lyY3VsYXJbMV0pIHtcblx0XHRcdHRvRGVzdFBvc1swXSA9IE1hdGgubWluKGJveFJCWzBdLCB0b0Rlc3RQb3NbMF0pO1xuXHRcdH0gLy8gcmlnaHRcblx0XHR0b0Rlc3RQb3NbMV0gPSB4ZCA/IGRlcGFQb3NbMV0gKyB5ZCAvIHhkICogKHRvRGVzdFBvc1swXSAtIGRlcGFQb3NbMF0pIDpcblx0XHRcdFx0XHRcdHRvRGVzdFBvc1sxXTtcblxuXHRcdGlmICghY2lyY3VsYXJbMF0pIHtcblx0XHRcdHRvRGVzdFBvc1sxXSA9IE1hdGgubWF4KGJveExUWzFdLCB0b0Rlc3RQb3NbMV0pO1xuXHRcdH0gLy8gdXBcblx0XHRpZiAoIWNpcmN1bGFyWzJdKSB7XG5cdFx0XHR0b0Rlc3RQb3NbMV0gPSBNYXRoLm1pbihib3hSQlsxXSwgdG9EZXN0UG9zWzFdKTtcblx0XHR9IC8vIGRvd25cblx0XHR0b0Rlc3RQb3NbMF0gPSB5ZCA/IGRlcGFQb3NbMF0gKyB4ZCAvIHlkICogKHRvRGVzdFBvc1sxXSAtIGRlcGFQb3NbMV0pIDpcblx0XHRcdFx0XHRcdHRvRGVzdFBvc1swXTtcblx0XHRyZXR1cm4gW1xuXHRcdFx0TWF0aC5taW4obWF4WzBdLCBNYXRoLm1heChtaW5bMF0sIHRvRGVzdFBvc1swXSkpLFxuXHRcdFx0TWF0aC5taW4obWF4WzFdLCBNYXRoLm1heChtaW5bMV0sIHRvRGVzdFBvc1sxXSkpXG5cdFx0XTtcblx0fSxcblx0Ly8gZGV0ZXJtaW5lIG91dHNpZGVcblx0aXNPdXRzaWRlKHBvcywgbWluLCBtYXgpIHtcblx0XHRyZXR1cm4gcG9zWzBdIDwgbWluWzBdIHx8IHBvc1sxXSA8IG1pblsxXSB8fFxuXHRcdFx0cG9zWzBdID4gbWF4WzBdIHx8IHBvc1sxXSA+IG1heFsxXTtcblx0fSxcblx0Ly8gZnJvbSBvdXRzaWRlIHRvIG91dHNpZGVcblx0aXNPdXRUb091dChwb3MsIGRlc3RQb3MsIG1pbiwgbWF4KSB7XG5cdFx0cmV0dXJuIChwb3NbMF0gPCBtaW5bMF0gfHwgcG9zWzBdID4gbWF4WzBdIHx8XG5cdFx0XHRwb3NbMV0gPCBtaW5bMV0gfHwgcG9zWzFdID4gbWF4WzFdKSAmJlxuXHRcdFx0KGRlc3RQb3NbMF0gPCBtaW5bMF0gfHwgZGVzdFBvc1swXSA+IG1heFswXSB8fFxuXHRcdFx0ZGVzdFBvc1sxXSA8IG1pblsxXSB8fCBkZXN0UG9zWzFdID4gbWF4WzFdKTtcblx0fSxcblx0Z2V0TmV4dE9mZnNldFBvcyhzcGVlZHMsIGRlY2VsZXJhdGlvbikge1xuXHRcdGNvbnN0IG5vcm1hbFNwZWVkID0gTWF0aC5zcXJ0KFxuXHRcdFx0c3BlZWRzWzBdICogc3BlZWRzWzBdICsgc3BlZWRzWzFdICogc3BlZWRzWzFdXG5cdFx0KTtcblx0XHRjb25zdCBkdXJhdGlvbiA9IE1hdGguYWJzKG5vcm1hbFNwZWVkIC8gLWRlY2VsZXJhdGlvbik7XG5cblx0XHRyZXR1cm4gW1xuXHRcdFx0c3BlZWRzWzBdIC8gMiAqIGR1cmF0aW9uLFxuXHRcdFx0c3BlZWRzWzFdIC8gMiAqIGR1cmF0aW9uXG5cdFx0XTtcblx0fSxcblx0Z2V0RHVyYXRpb25Gcm9tUG9zKHBvcywgZGVjZWxlcmF0aW9uKSB7XG5cdFx0Y29uc3Qgbm9ybWFsUG9zID0gTWF0aC5zcXJ0KHBvc1swXSAqIHBvc1swXSArIHBvc1sxXSAqIHBvc1sxXSk7XG5cdFx0Y29uc3QgZHVyYXRpb24gPSBNYXRoLnNxcnQoXG5cdFx0XHRub3JtYWxQb3MgLyBkZWNlbGVyYXRpb24gKiAyXG5cdFx0KTtcblxuXHRcdC8vIHdoZW4gZHVyYXRpb24gaXMgdW5kZXIgMTAwLCB0aGVuIHZhbHVlIGlzIHplcm9cblx0XHRyZXR1cm4gZHVyYXRpb24gPCAxMDAgPyAwIDogZHVyYXRpb247XG5cdH0sXG5cdGlzQ2lyY3VsYXIoZGVzdFBvcywgbWluLCBtYXgsIGNpcmN1bGFyKSB7XG5cdFx0cmV0dXJuIChjaXJjdWxhclswXSAmJiBkZXN0UG9zWzFdIDwgbWluWzFdKSB8fFxuXHRcdFx0XHQoY2lyY3VsYXJbMV0gJiYgZGVzdFBvc1swXSA+IG1heFswXSkgfHxcblx0XHRcdFx0KGNpcmN1bGFyWzJdICYmIGRlc3RQb3NbMV0gPiBtYXhbMV0pIHx8XG5cdFx0XHRcdChjaXJjdWxhclszXSAmJiBkZXN0UG9zWzBdIDwgbWluWzBdKTtcblx0fSxcblx0Z2V0Q2lyY3VsYXJQb3MocG9zLCBtaW4sIG1heCwgY2lyY3VsYXIpIHtcblx0XHRjb25zdCB0b1BvcyA9IHBvcy5jb25jYXQoKTtcblxuXHRcdGlmIChjaXJjdWxhclswXSAmJiB0b1Bvc1sxXSA8IG1pblsxXSkgeyAvLyB1cFxuXHRcdFx0dG9Qb3NbMV0gPSAodG9Qb3NbMV0gLSBtaW5bMV0pICUgKG1heFsxXSAtIG1pblsxXSArIDEpICsgbWF4WzFdO1xuXHRcdH1cblx0XHRpZiAoY2lyY3VsYXJbMV0gJiYgdG9Qb3NbMF0gPiBtYXhbMF0pIHsgLy8gcmlnaHRcblx0XHRcdHRvUG9zWzBdID0gKHRvUG9zWzBdIC0gbWluWzBdKSAlIChtYXhbMF0gLSBtaW5bMF0gKyAxKSArIG1pblswXTtcblx0XHR9XG5cdFx0aWYgKGNpcmN1bGFyWzJdICYmIHRvUG9zWzFdID4gbWF4WzFdKSB7IC8vIGRvd25cblx0XHRcdHRvUG9zWzFdID0gKHRvUG9zWzFdIC0gbWluWzFdKSAlIChtYXhbMV0gLSBtaW5bMV0gKyAxKSArIG1pblsxXTtcblx0XHR9XG5cdFx0aWYgKGNpcmN1bGFyWzNdICYmIHRvUG9zWzBdIDwgbWluWzBdKSB7IC8vIGxlZnRcblx0XHRcdHRvUG9zWzBdID0gKHRvUG9zWzBdIC0gbWluWzBdKSAlIChtYXhbMF0gLSBtaW5bMF0gKyAxKSArIG1heFswXTtcblx0XHR9XG5cblx0XHR0b1Bvc1swXSA9ICt0b1Bvc1swXS50b0ZpeGVkKDUpO1xuXHRcdHRvUG9zWzFdID0gK3RvUG9zWzFdLnRvRml4ZWQoNSk7XG5cdFx0cmV0dXJuIHRvUG9zO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb29yZGluYXRlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Nvb3JkaW5hdGUuanMiLCJpbXBvcnQge3dpbmRvdywgZG9jdW1lbnR9IGZyb20gXCIuL2Jyb3dzZXJcIjtcblxuY29uc3QgdXRpbHMgPSB7XG5cdGdldEVsZW1lbnQoZWwpIHtcblx0XHRpZiAodHlwZW9mIGVsID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XG5cdFx0fSBlbHNlIGlmICh3aW5kb3cualF1ZXJ5ICYmIChlbCBpbnN0YW5jZW9mIGpRdWVyeSkpIHtcblx0XHRcdC8vIGlmIHlvdSB3ZXJlIHVzaW5nIGpRdWVyeVxuXHRcdFx0cmV0dXJuIGVsLmxlbmd0aCA+IDAgPyBlbFswXSA6IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBlbDtcblx0XHR9XG5cdH1cbn07XG5cbmNsYXNzIE1peGluQnVpbGRlciB7XG5cdGNvbnN0cnVjdG9yKHN1cGVyY2xhc3MpIHtcblx0XHR0aGlzLnN1cGVyY2xhc3MgPSBzdXBlcmNsYXNzIHx8IGNsYXNzIHt9O1xuXHR9XG5cdHdpdGgoLi4ubWl4aW5zKSB7XG5cdFx0cmV0dXJuIG1peGlucy5yZWR1Y2UoKGMsIG0pID0+IG0oYyksIHRoaXMuc3VwZXJjbGFzcyk7XG5cdH1cbn1cblxuY29uc3QgTWl4aW4gPSBzdXBlcmNsYXNzID0+IG5ldyBNaXhpbkJ1aWxkZXIoc3VwZXJjbGFzcyk7XG5cbmV4cG9ydCB7TWl4aW4sIHV0aWxzfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy5qcyIsImltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBlZ2pzL2NvbXBvbmVudFwiO1xuaW1wb3J0IEhhbW1lck1hbmFnZXIgZnJvbSBcIi4vaGFtbWVyTWFuYWdlclwiO1xuaW1wb3J0IEV2ZW50SGFuZGxlciBmcm9tIFwiLi9ldmVudEhhbmRsZXJcIjtcbmltcG9ydCBBbmltYXRpb25IYW5kbGVyIGZyb20gXCIuL2FuaW1hdGlvbkhhbmRsZXJcIjtcbmltcG9ydCB7RElSRUNUSU9OfSBmcm9tIFwiLi9jb25zdHNcIjtcbmltcG9ydCB7TWl4aW59IGZyb20gXCIuL3V0aWxzXCI7XG5cbi8qKlxuICogQSBtb2R1bGUgdXNlZCB0byBjaGFuZ2UgdGhlIGluZm9ybWF0aW9uIG9mIHVzZXIgYWN0aW9uIGVudGVyZWQgYnkgdmFyaW91cyBpbnB1dCBkZXZpY2VzIHN1Y2ggYXMgdG91Y2ggc2NyZWVuIG9yIG1vdXNlIGludG8gbG9naWNhbCBjb29yZGluYXRlcyB3aXRoaW4gdGhlIHZpcnR1YWwgY29vcmRpbmF0ZSBzeXN0ZW0uIFRoZSBjb29yZGluYXRlIGluZm9ybWF0aW9uIHNvcnRlZCBieSB0aW1lIGV2ZW50cyBvY2N1cnJlZCBpcyBwcm92aWRlZCBpZiBhbmltYXRpb25zIGFyZSBtYWRlIGJ5IHVzZXIgYWN0aW9ucy4gWW91IGNhbiBpbXBsZW1lbnQgYSB1c2VyIGludGVyZmFjZSBieSBhcHBseWluZyB0aGUgbG9naWNhbCBjb29yZGluYXRlcyBwcm92aWRlZC4gRm9yIG1vcmUgaW5mb3JtYXRpb24gb24gdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUsIHNlZSBkZW1vcy5cbiAqIEBrbyDthLDsuZgg7J6F66ClIOyepey5mOuCmCDrp4jsmrDsiqTsmYAg6rCZ7J2AIOuLpOyWke2VnCDsnoXroKUg7J6l7LmY66GcIOyghOuLrCDrsJvsnYAg7IKs7Jqp7J6Q7J2YIOuPmeyekeydhCDqsIDsg4Eg7KKM7ZGc6rOE7J2YIOuFvOumrOyggSDsooztkZzroZwg67OA6rK97ZWY64qUIOuqqOuTiC4g7IKs7Jqp7J6Q7J2YIOuPmeyekeycvOuhnCDslaDri4jrqZTsnbTshZjsnbQg7J287Ja064KY66m0IOyLnOqwhOyInOycvOuhnCDrs4Dqsr3rkJjripQg7KKM7ZGcIOygleuztOuPhCDsoJzqs7XtlZzri6QuIOuzgOqyveuQnCDrhbzrpqzsoIEg7KKM7ZGc66W8IOuwmOyYge2VtCBVSeulvCDqtaztmITtlaAg7IiYIOyeiOuLpC4gZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydmCDsnpDshLjtlZwg7J6R64+ZIOuwqeyLneydgCDrjbDrqqjrpbwg7LC46rOg7ZWc64ukLlxuICogQGNsYXNzXG4gKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmRcbiAqIEBleHRlbmRzIGVnLkNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFRoZSBvcHRpb24gb2JqZWN0IG9mIHRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlPGtvPmVnLk1vdmFibGVDb29yZCDrqqjrk4jsnZgg7Ji17IWYIOqwneyytDwva28+XG4gKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLm1pbiBUaGUgbWluaW11bSB2YWx1ZSBvZiBYIGFuZCBZIGNvb3JkaW5hdGVzIDxrbz7sooztkZzqs4TsnZgg7LWc7Iaf6rCSPC9rbz5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5taW4uMD0wXSBUaGUgWCBjb29yZGluYXRlIG9mIHRoZSBtaW5pbXVtIDxrbz7stZzshowgeOyijO2RnDwva28+XG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWluLjE9MF0gVGhlIFkgY29vcmRpbmF0ZSBvZiB0aGUgbWluaW11bSA8a28+7LWc7IaMIHnsooztkZw8L2tvPlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMubWF4IFRoZSBtYXhpbXVtIHZhbHVlIG9mIFggYW5kIFkgY29vcmRpbmF0ZXMgPGtvPuyijO2RnOqzhOydmCDstZzrjJPqsJI8L2tvPlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heC4wPTEwMF0gVGhlIFggY29vcmRpbmF0ZSBvZiB0aGUgbWF4aW11bTxrbz7stZzrjIAgeOyijO2RnDwva28+XG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4LjE9MTAwXSBUaGUgWSBjb29yZGluYXRlIG9mIHRoZSBtYXhpbXVtPGtvPuy1nOuMgCB57KKM7ZGcPC9rbz5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLmJvdW5jZSBUaGUgc2l6ZSBvZiBib3VuY2luZyBhcmVhLiBUaGUgY29vcmRpbmF0ZXMgY2FuIGV4Y2VlZCB0aGUgY29vcmRpbmF0ZSBhcmVhIGFzIG11Y2ggYXMgdGhlIGJvdW5jaW5nIGFyZWEgYmFzZWQgb24gdXNlciBhY3Rpb24uIElmIHRoZSBjb29yZGluYXRlcyBkb2VzIG5vdCBleGNlZWQgdGhlIGJvdW5jaW5nIGFyZWEgd2hlbiBhbiBlbGVtZW50IGlzIGRyYWdnZWQsIHRoZSBjb29yZGluYXRlcyB3aGVyZSBib3VuY2luZyBlZmZlY3RzIGFyZSBhcHBsaWVkIGFyZSByZXR1bmVkIGJhY2sgaW50byB0aGUgY29vcmRpbmF0ZSBhcmVhPGtvPuuwlOyatOyKpCDsmIHsl63snZgg7YGs6riwLiDsgqzsmqnsnpDsnZgg64+Z7J6R7JeQIOuUsOudvCDsooztkZzqsIAg7KKM7ZGcIOyYgeyXreydhCDrhJjslrQg67CU7Jq07IqkIOyYgeyXreydmCDtgazquLDrp4ztgbwg642UIOydtOuPme2VoCDsiJgg7J6I64ukLiDsgqzsmqnsnpDqsIAg64GM7Ja064ukIOuGk+uKlCDrj5nsnpHsnYQg7ZaI7J2EIOuVjCDsooztkZzqsIAg67CU7Jq07IqkIOyYgeyXreyXkCDsnojsnLzrqbQsIOuwlOyatOyKpCDtmqjqs7zqsIAg7KCB7Jqp65CcIOyijO2RnOqwgCDri6Tsi5wg7KKM7ZGcIOyYgeyXrSDslYjsnLzroZwg65Ok7Ja07Jio64ukPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYm91bmNlLjA9MTBdIFRoZSBzaXplIG9mIHRvcCBhcmVhIDxrbz7snITsqr0g67CU7Jq07IqkIOyYgeyXreydmCDtgazquLA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ib3VuY2UuMT0xMF0gVGhlIHNpemUgb2YgcmlnaHQgYXJlYSA8a28+7Jik66W47Kq9IOuwlOyatOyKpCDsmIHsl63snZgg7YGs6riwPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYm91bmNlLjI9MTBdIFRoZSBzaXplIG9mIGJvdHRvbSBhcmVhIDxrbz7slYTrnpjsqr0g67CU7Jq07IqkIOyYgeyXreydmCDtgazquLA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ib3VuY2UuMz0xMF0gVGhlIHNpemUgb2YgbGVmdCBhcmVhIDxrbz7smbzsqr0g67CU7Jq07IqkIOyYgeyXreydmCDtgazquLA8L2tvPlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMubWFyZ2luIFRoZSBzaXplIG9mIGFjY2Vzc2libGUgc3BhY2Ugb3V0c2lkZSB0aGUgY29vcmRpbmF0ZSBhcmVhLiBJZiBhbiBlbGVtZW50IGlzIGRyYWdnZWQgb3V0c2lkZSB0aGUgY29vcmRpbmF0ZSBhcmVhIGFuZCB0aGVuIGRyb3BwZWQsIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgZWxlbWVudCBhcmUgcmV0dXJuZWQgYmFjayBpbnRvIHRoZSBjb29yZGluYXRlIGFyZWEuIFRoZSBzaXplIG9mIG1hcmdpbnMgdGhhdCBjYW4gYmUgZXhjZWVkZWQgPGtvPuKIklx07KKM7ZGcIOyYgeyXreydhCDrhJjslrQg7J2064+Z7ZWgIOyImCDsnojripQg67CU6rmlIOyYgeyXreydmCDtgazquLAuIOyCrOyaqeyekOqwgCDsooztkZzrpbwg67CU6rmlIOyYgeyXreq5jOyngCDrgYzsl4jri6TqsIAg64aT7Jy866m0IOyijO2RnOqwgCDsooztkZwg7JiB7JetIOyViOycvOuhnCDrk6TslrTsmKjri6QuPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWFyZ2luLjA9MF0gVGhlIHNpemUgb2YgdG9wIG1hcmdpbiA8a28+7JyE7Kq9IOuwlOq5pSDsmIHsl63snZgg7YGs6riwPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWFyZ2luLjE9MF0gVGhlIHNpemUgb2YgcmlnaHQgbWFyZ2luIDxrbz7smKTrpbjsqr0g67CU6rmlIOyYgeyXreydmCDtgazquLA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tYXJnaW4uMj0wXSBUaGUgc2l6ZSBvZiBib3R0b20gbWFyZ2luIDxrbz7slYTrnpjsqr0g67CU6rmlIOyYgeyXreydmCDtgazquLA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tYXJnaW4uMz0wXSBUaGUgc2l6ZSBvZiBsZWZ0IG1hcmdpbiA8a28+7Jm87Kq9IOuwlOq5pSDsmIHsl63snZgg7YGs6riwPC9rbz5cbiAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuY2lyY3VsYXIgSW5kaWNhdGVzIHdoZXRoZXIgYSBjaXJjdWxhciBlbGVtZW50IGlzIGF2YWlsYWJsZS4gSWYgaXQgaXMgc2V0IHRvIFwidHJ1ZVwiIGFuZCBhbiBlbGVtZW50IGlzIGRyYWdnZWQgb3V0c2lkZSB0aGUgY29vcmRpbmF0ZSBhcmVhLCB0aGUgZWxlbWVudCB3aWxsIGFwcGVhciBvbiB0aGUgb3RoZXIgc2lkZS48a28+7Iic7ZmYIOyXrOu2gC4gJ3RydWUn66GcIOyEpOygle2VnCDrsKntlqXsnZgg7KKM7ZGcIOyYgeyXrSDrsJbsnLzroZwg7JeY66as66i87Yq46rCAIOydtOuPme2VmOuptCDrsJjrjIAg67Cp7Zal7JeQ7IScIOyXmOumrOuovO2KuOqwgCDrgpjtg4Drgpzri6Q8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jaXJjdWxhci4wPWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciB0byBjaXJjdWxhdGUgdG8gdG9wIDxrbz7snITroZwg7Iic7ZmYIOyXrOu2gDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNpcmN1bGFyLjE9ZmFsc2VdIEluZGljYXRlcyB3aGV0aGVyIHRvIGNpcmN1bGF0ZSB0byByaWdodCA8a28+7Jik66W47Kq97Jy866GcIOyInO2ZmCDsl6zrtoA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jaXJjdWxhci4yPWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciB0byBjaXJjdWxhdGUgdG8gYm90dG9tICA8a28+7JWE656Y66GcIOyInO2ZmCDsl6zrtoA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jaXJjdWxhci4zPWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciB0byBjaXJjdWxhdGUgdG8gbGVmdCAgPGtvPuyZvOyqveycvOuhnCDsiJztmZgg7Jes67aAPC9rbz5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5lYXNpbmc9ZWFzaW5nLmVhc2VPdXRDdWJpY10gVGhlIGVhc2luZyBmdW5jdGlvbiB0byBhcHBseSB0byBhbiBhbmltYXRpb24gPGtvPuyVoOuLiOuplOydtOyFmOyXkCDsoIHsmqntlaAgZWFzaW5nIO2VqOyImDwva28+XG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4aW11bUR1cmF0aW9uPUluZmluaXR5XSBNYXhpbXVtIGR1cmF0aW9uIG9mIHRoZSBhbmltYXRpb24gPGtvPuqwgOyGjeuPhOyXkCDsnZjtlbQg7JWg64uI66mU7J207IWY7J20IOuPmeyeke2VoCDrlYzsnZgg7LWc64yAIOyijO2RnCDsnbTrj5kg7Iuc6rCEPC9rbz5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kZWNlbGVyYXRpb249MC4wMDA2XSBEZWNlbGVyYXRpb24gb2YgdGhlIGFuaW1hdGlvbiB3aGVyZSBhY2NlbGVyYXRpb24gaXMgbWFudWFsbHkgZW5hYmxlZCBieSB1c2VyLiBBIGhpZ2hlciB2YWx1ZSBpbmRpY2F0ZXMgc2hvcnRlciBydW5uaW5nIHRpbWUuIDxrbz7sgqzsmqnsnpDsnZgg64+Z7J6R7Jy866GcIOqwgOyGjeuPhOqwgCDsoIHsmqnrkJwg7JWg64uI66mU7J207IWY7J2YIOqwkOyGjeuPhC4g6rCS7J20IOuGkuydhOyImOuhnSDslaDri4jrqZTsnbTshZgg7Iuk7ZaJIOyLnOqwhOydtCDsp6fslYTsp4Tri6Q8L2tvPlxuICogQHNlZSBIYW1tZXJKUyB7QGxpbmsgaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pb31cbiAqIEBzZWUg4oCiIEhhbW1lci5KUyBhcHBsaWVzIHNwZWNpZmljIENTUyBwcm9wZXJ0aWVzIGJ5IGRlZmF1bHQgd2hlbiBjcmVhdGluZyBhbiBpbnN0YW5jZSAoU2VlIHtAbGluayBodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL2pzZG9jL0hhbW1lci5kZWZhdWx0cy5jc3NQcm9wcy5odG1sfSkuIFRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlIHJlbW92ZXMgYWxsIGRlZmF1bHQgQ1NTIHByb3BlcnRpZXMgcHJvdmlkZWQgYnkgSGFtbWVyLkpTIDxrbz5IYW1tZXIuSlPripQg7J247Iqk7YS07Iqk66W8IOyDneyEse2VoCDrlYwg6riw67O47Jy866GcIO2KueyglSBDU1Mg7IaN7ISx7J2EIOyggeyaqe2VnOuLpCjssLjqs6A6IEBsaW5re2h0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vanNkb2MvSGFtbWVyLmRlZmF1bHRzLmNzc1Byb3BzLmh0bWx9KS4g7Yq57KCV7ZWcIOyDge2ZqeyXkOyEnOuKlCBIYW1tZXIuSlPsnZgg7IaN7ISxIOuVjOusuOyXkCDsgqzsmqnshLHsl5Ag66y47KCc6rCAIOyeiOydhCDsiJgg7J6I64ukLiBlZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2AIEhhbW1lci5KU+ydmCDquLDrs7ggQ1NTIOyGjeyEseydhCDrqqjrkZAg7KCc6rGw7ZaI64ukPC9rbz5cbiAqXG4gKiBAY29kZXBlbiB7XCJpZFwiOlwialBQcWVSXCIsIFwia29cIjpcIk1vdmFibGVDb29yZCBDdWJlIOyYiOygnFwiLCBcImVuXCI6XCJNb3ZhYmxlQ29vcmQgQ3ViZSBleGFtcGxlXCIsIFwiY29sbGVjdGlvbklkXCI6XCJBS3BrR1dcIiwgXCJoZWlnaHRcIjogNDAzfVxuICpcbiAqIEBzZWUgRWFzaW5nIEZ1bmN0aW9ucyBDaGVhdCBTaGVldCB7QGxpbmsgaHR0cDovL2Vhc2luZ3MubmV0L31cbiAqIEBzZWUgSWYgeW91IHdhbnQgdG8gdHJ5IGEgZGlmZmVyZW50IGVhc2luZyBmdW5jdGlvbiwgdXNlIHRoZSBqUXVlcnkgZWFzaW5nIHBsdWdpbiAoe0BsaW5rIGh0dHA6Ly9nc2dkLmNvLnVrL3NhbmRib3gvanF1ZXJ5L2Vhc2luZ30pIG9yIHRoZSBqUXVlcnkgVUkgZWFzaW5nIGxpYnJhcnkgKHtAbGluayBodHRwczovL2pxdWVyeXVpLmNvbS9lYXNpbmd9KSA8a28+64uk66W4IGVhc2luZyDtlajsiJjrpbwg7IKs7Jqp7ZWY66Ck66m0IGpRdWVyeSBlYXNpbmcg7ZSM65+s6re47J24KHtAbGluayBodHRwOi8vZ3NnZC5jby51ay9zYW5kYm94L2pxdWVyeS9lYXNpbmd9KeydtOuCmCwgalF1ZXJ5IFVJIGVhc2luZyDrnbzsnbTruIzrn6zrpqwoe0BsaW4gaHR0cHM6Ly9qcXVlcnl1aS5jb20vZWFzaW5nfSnrpbwg7IKs7Jqp7ZWc64ukPC9rbz5cbiAqXG4gKiBAc3VwcG9ydCB7XCJpZVwiOiBcIjEwK1wiLCBcImNoXCIgOiBcImxhdGVzdFwiLCBcImZmXCIgOiBcImxhdGVzdFwiLCAgXCJzZlwiIDogXCJsYXRlc3RcIiwgXCJlZGdlXCIgOiBcImxhdGVzdFwiLCBcImlvc1wiIDogXCI3K1wiLCBcImFuXCIgOiBcIjIuMysgKGV4Y2VwdCAzLngpXCJ9XG4gKi9cbmNvbnN0IE1vdmFibGVDb29yZCA9IGNsYXNzIE1vdmFibGVDb29yZFxuZXh0ZW5kcyBNaXhpbihDb21wb25lbnQpLndpdGgoRXZlbnRIYW5kbGVyLCBBbmltYXRpb25IYW5kbGVyKSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcigpO1xuXHRcdE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zID0ge1xuXHRcdFx0bWluOiBbMCwgMF0sXG5cdFx0XHRtYXg6IFsxMDAsIDEwMF0sXG5cdFx0XHRib3VuY2U6IFsxMCwgMTAsIDEwLCAxMF0sXG5cdFx0XHRtYXJnaW46IFswLCAwLCAwLCAwXSxcblx0XHRcdGNpcmN1bGFyOiBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuXHRcdFx0ZWFzaW5nOiBmdW5jdGlvbiBlYXNlT3V0Q3ViaWMoeCkge1xuXHRcdFx0XHRyZXR1cm4gMSAtIE1hdGgucG93KDEgLSB4LCAzKTtcblx0XHRcdH0sXG5cdFx0XHRtYXhpbXVtRHVyYXRpb246IEluZmluaXR5LFxuXHRcdFx0ZGVjZWxlcmF0aW9uOiAwLjAwMDZcblx0XHR9LCBvcHRpb25zKTtcblx0XHR0aGlzLl9yZXZpc2VPcHRpb25zKCk7XG5cdFx0dGhpcy5faGFtbWVyTWFuYWdlciA9IG5ldyBIYW1tZXJNYW5hZ2VyKCk7XG5cdFx0dGhpcy5fcG9zID0gdGhpcy5vcHRpb25zLm1pbi5jb25jYXQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZWdpc3RlcnMgYW4gZWxlbWVudCB0byB1c2UgdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUuXG5cdCAqIEBrbyBlZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2EIOyCrOyaqe2VoCDsl5jrpqzrqLztirjrpbwg65Ox66Gd7ZWc64ukXG5cdCAqIEBtZXRob2QgZWcuTW92YWJsZUNvb3JkI2JpbmRcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd8alF1ZXJ5fSBlbGVtZW50IEFuIGVsZW1lbnQgdG8gdXNlIHRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlPGtvPuKIklx0ZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydhCDsgqzsmqntlaAg7JeY66as66i87Yq4PC9rbz5cblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIG9wdGlvbiBvYmplY3Qgb2YgdGhlIGJpbmQoKSBtZXRob2QgPGtvPmJpbmQoKSDrqZTshJzrk5zsnZgg7Ji17IWYIOqwneyytDwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kaXJlY3Rpb249ZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9BTExdIENvb3JkaW5hdGUgZGlyZWN0aW9uIHRoYXQgYSB1c2VyIGNhbiBtb3ZlPGJyPi0gZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9BTEw6IEFsbCBkaXJlY3Rpb25zIGF2YWlsYWJsZS48YnI+LSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX0hPUklaT05UQUw6IEhvcml6b250YWwgZGlyZWN0aW9uIG9ubHkuPGJyPi0gZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9WRVJUSUNBTDogVmVydGljYWwgZGlyZWN0aW9uIG9ubHk8a28+7IKs7Jqp7J6Q7J2YIOuPmeyekeycvOuhnCDsm4Dsp4Hsnbwg7IiYIOyeiOuKlCDsooztkZzsnZgg67Cp7ZalLjxicj4tIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fQUxMOiDrqqjrk6Ag67Cp7Zal7Jy866GcIOybgOyngeydvCDsiJgg7J6I64ukLjxicj4tIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fSE9SSVpPTlRBTDog6rCA66GcIOuwqe2WpeycvOuhnOunjCDsm4Dsp4Hsnbwg7IiYIOyeiOuLpC48YnI+LSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX1ZFUlRJQ0FMOiDshLjroZwg67Cp7Zal7Jy866Gc66eMIOybgOyngeydvCDsiJgg7J6I64ukLjwva28+XG5cdCAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuc2NhbGUgQ29vcmRpbmF0ZSBzY2FsZSB0aGF0IGEgdXNlciBjYW4gbW92ZTxrbz7sgqzsmqnsnpDsnZgg64+Z7J6R7Jy866GcIOydtOuPme2VmOuKlCDsooztkZzsnZgg67Cw7JyoPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnNjYWxlLjA9MV0gWC1heGlzIHNjYWxlIDxrbz547LaVIOuwsOycqDwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zY2FsZS4xPTFdIFktYXhpcyBzY2FsZSA8a28+eey2lSDrsLDsnKg8L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMudGhyZXNob2xkQW5nbGU9NDVdIFRoZSB0aHJlc2hvbGQgdmFsdWUgdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXIgdXNlciBhY3Rpb24gaXMgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCAoMH45MCkgPGtvPuyCrOyaqeyekOydmCDrj5nsnpHsnbQg6rCA66GcIOuwqe2WpeyduOyngCDshLjroZwg67Cp7Zal7J247KeAIO2MkOuLqO2VmOuKlCDquLDspIAg6rCB64+EKDB+OTApPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmludGVycnVwdGFibGU9dHJ1ZV0gSW5kaWNhdGVzIHdoZXRoZXIgYW4gYW5pbWF0aW9uIGlzIGludGVycnVwdGlibGUuPGJyPi0gdHJ1ZTogSXQgY2FuIGJlIHBhdXNlZCBvciBzdG9wcGVkIGJ5IHVzZXIgYWN0aW9uIG9yIHRoZSBBUEkuPGJyPi0gZmFsc2U6IEl0IGNhbm5vdCBiZSBwYXVzZWQgb3Igc3RvcHBlZCBieSB1c2VyIGFjdGlvbiBvciB0aGUgQVBJIHdoaWxlIGl0IGlzIHJ1bm5pbmcuPGtvPuynhO2WiSDspJHsnbgg7JWg64uI66mU7J207IWYIOykkeyngCDqsIDriqUg7Jes67aALjxicj4tIHRydWU6IOyCrOyaqeyekOydmCDrj5nsnpHsnbTrgpggQVBJ66GcIOyVoOuLiOuplOydtOyFmOydhCDspJHsp4DtlaAg7IiYIOyeiOuLpC48YnI+LSBmYWxzZTog7JWg64uI66mU7J207IWY7J20IOynhO2WiSDspJHsnbwg65WM64qUIOyCrOyaqeyekOydmCDrj5nsnpHsnbTrgpggQVBJ6rCAIOyggeyaqeuQmOyngCDslYrripTri6Q8L2tvPlxuXHQgKiBAcGFyYW0ge0FycmF5fSBbb3B0aW9ucy5pbnB1dFR5cGVdIFR5cGVzIG9mIGlucHV0IGRldmljZXMuIChkZWZhdWx0OiBbXCJ0b3VjaFwiLCBcIm1vdXNlXCJdKTxicj4tIHRvdWNoOiBUb3VjaCBzY3JlZW48YnI+LSBtb3VzZTogTW91c2UgPGtvPuyeheugpSDsnqXsuZgg7KKF66WYLijquLDrs7jqsJI6IFtcInRvdWNoXCIsIFwibW91c2VcIl0pPGJyPi0gdG91Y2g6IO2EsOy5mCDsnoXroKUg7J6l7LmYPGJyPi0gbW91c2U6IOuniOyasOyKpDwva28+XG5cdCAqXG5cdCAqIEByZXR1cm4ge2VnLk1vdmFibGVDb29yZH0gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmIDxrbz7rqqjrk4gg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqL1xuXHRiaW5kKGVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHR0aGlzLl9oYW1tZXJNYW5hZ2VyLmFkZChlbGVtZW50LCBvcHRpb25zLCB0aGlzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHQvKipcblx0ICogRGV0YWNoZXMgYW4gZWxlbWVudCB1c2luZyB0aGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZS5cblx0ICogQGtvIGVnLk1vdmFibGVDb29yZCDrqqjrk4jsnYQg7IKs7Jqp7ZWY64qUIOyXmOumrOuovO2KuOulvCDtlbTsoJztlZzri6Rcblx0ICogQG1ldGhvZCBlZy5Nb3ZhYmxlQ29vcmQjdW5iaW5kXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8U3RyaW5nfGpRdWVyeX0gZWxlbWVudCBBbiBlbGVtZW50IGZyb20gd2hpY2ggdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUgaXMgZGV0YWNoZWQ8a28+ZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydhCDtlbTsoJztlaAg7JeY66as66i87Yq4PC9rbz5cblx0ICogQHJldHVybiB7ZWcuTW92YWJsZUNvb3JkfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGY8a28+66qo65OIIOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKi9cblx0dW5iaW5kKGVsZW1lbnQpIHtcblx0XHR0aGlzLl9oYW1tZXJNYW5hZ2VyLnJlbW92ZShlbGVtZW50KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBnZXQgYSBoYW1tZXIgaW5zdGFuY2UgZnJvbSBlbGVtZW50cyB1c2luZyB0aGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZS5cblx0ICogQGtvIGVnLk1vdmFibGVDb29yZCDrqqjrk4jsnYQg7IKs7Jqp7ZWY64qUIOyXmOumrOuovO2KuOyXkOyEnCBoYW1tZXIg6rCd7LK066W8IOyWu+uKlOuLpFxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNnZXRIYW1tZXJcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd8alF1ZXJ5fSBlbGVtZW50IEFuIGVsZW1lbnQgZnJvbSB3aGljaCB0aGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZSBpcyB1c2luZzxrbz5lZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2EIOyCrOyaqe2VmOuKlCDsl5jrpqzrqLztirg8L2tvPlxuXHQgKiBAcmV0dXJuIHtIYW1tZXJ8bnVsbH0gQW4gaW5zdGFuY2Ugb2YgSGFtbWVyLkpTPGtvPkhhbW1lci5KU+ydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKi9cblx0Z2V0SGFtbWVyKGVsZW1lbnQpIHtcblx0XHRyZXR1cm4gdGhpcy5faGFtbWVyTWFuYWdlci5nZXRIYW1tZXIoZWxlbWVudCk7XG5cdH1cblxuXHQvKipcblx0ICogRW5hYmxlcyBpbnB1dCBkZXZpY2VzXG5cdCAqIEBrbyDsnoXroKUg7J6l7LmY66W8IOyCrOyaqe2VoCDsiJgg7J6I6rKMIO2VnOuLpFxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNlbmFibGVJbnB1dFxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ3xqUXVlcnl9IFtlbGVtZW50XSBBbiBlbGVtZW50IGZyb20gd2hpY2ggdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUgaXMgdXNpbmcgKGlmIHRoZSBlbGVtZW50IHBhcmFtZXRlciBpcyBub3QgcHJlc2VudCwgaXQgYXBwbGllcyB0byBhbGwgYmluZGVkIGVsZW1lbnRzKTxrbz5lZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2EIFx07IKs7Jqp7ZWY64qUIOyXmOumrOuovO2KuCAoZWxlbWVudCDtjIzrnbzrr7jthLDqsIAg7KG07J6s7ZWY7KeAIOyViuydhCDqsr3smrAsIOuwlOyduOuTnOuQnCDrqqjrk6Ag7JeY66as66i87Yq47JeQIOyggeyaqeuQnOuLpCk8L2tvPlxuXHQgKiBAcmV0dXJuIHtlZy5Nb3ZhYmxlQ29vcmR9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZiA8a28+7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCovXG5cdGVuYWJsZUlucHV0KGVsZW1lbnQpIHtcblx0XHRyZXR1cm4gdGhpcy5faGFtbWVyTWFuYWdlci5pbnB1dENvbnRyb2wodHJ1ZSwgZWxlbWVudCk7XG5cdH1cblxuXHQvKipcblx0ICogRGlzYWJsZXMgaW5wdXQgZGV2aWNlc1xuXHQgKiBAa28g7J6F66ClIOyepey5mOulvCDsgqzsmqntlaAg7IiYIOyXhuqyjCDtlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuTW92YWJsZUNvb3JkI2Rpc2FibGVJbnB1dFxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ3xqUXVlcnl9IFtlbGVtZW50XSBBbiBlbGVtZW50IGZyb20gd2hpY2ggdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUgaXMgdXNpbmcgKGlmIHRoZSBlbGVtZW50IHBhcmFtZXRlciBpcyBub3QgcHJlc2VudCwgaXQgYXBwbGllcyB0byBhbGwgYmluZGVkIGVsZW1lbnRzKTw8a28+ZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydhCBcdOyCrOyaqe2VmOuKlCDsl5jrpqzrqLztirggKGVsZW1lbnQg7YyM652866+47YSw6rCAIOyhtOyerO2VmOyngCDslYrsnYQg6rK97JqwLCDrsJTsnbjrk5zrkJwg66qo65OgIOyXmOumrOuovO2KuOyXkCDsoIHsmqnrkJzri6QpPC9rbz5cblx0ICogQHJldHVybiB7ZWcuTW92YWJsZUNvb3JkfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGYgPGtvPuyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKi9cblx0ZGlzYWJsZUlucHV0KGVsZW1lbnQpIHtcblx0XHRyZXR1cm4gdGhpcy5faGFtbWVyTWFuYWdlci5pbnB1dENvbnRyb2woZmFsc2UsIGVsZW1lbnQpO1xuXHR9XG5cblx0Ly8gc2V0IHVwICdjc3MnIGV4cHJlc3Npb25cblx0X3JldmlzZU9wdGlvbnMoKSB7XG5cdFx0bGV0IGtleTtcblxuXHRcdFtcImJvdW5jZVwiLCBcIm1hcmdpblwiLCBcImNpcmN1bGFyXCJdLmZvckVhY2godiA9PiB7XG5cdFx0XHRrZXkgPSB0aGlzLm9wdGlvbnNbdl07XG5cdFx0XHRpZiAoa2V5ICE9IG51bGwpIHtcblx0XHRcdFx0aWYgKGtleS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcblx0XHRcdFx0XHR0aGlzLm9wdGlvbnNbdl0gPSBrZXkubGVuZ3RoID09PSAyID9cblx0XHRcdFx0XHRcdGtleS5jb25jYXQoa2V5KSA6IGtleS5jb25jYXQoKTtcblx0XHRcdFx0fSBlbHNlIGlmICgvc3RyaW5nfG51bWJlcnxib29sZWFuLy50ZXN0KHR5cGVvZiBrZXkpKSB7XG5cdFx0XHRcdFx0dGhpcy5vcHRpb25zW3ZdID0gW2tleSwga2V5LCBrZXksIGtleV07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5vcHRpb25zW3ZdID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIGxvZ2ljYWwgY29vcmRpbmF0ZXMuXG5cdCAqIEBrbyDrhbzrpqzsoIEg7KKM7ZGc7J2YIO2YhOyerCDsnITsuZjrpbwg67CY7ZmY7ZWc64ukXG5cdCAqIEBtZXRob2QgZWcuTW92YWJsZUNvb3JkI2dldFxuXHQgKiBAcmV0dXJuIHtBcnJheX0gcG9zIDxrbz7sooztkZw8L2tvPlxuXHQgKiBAcmV0dXJuIHtOdW1iZXJ9IHBvcy4wIFRoZSBYIGNvb3JkaW5hdGUgPGtvPngg7KKM7ZGcPC9rbz5cblx0ICogQHJldHVybiB7TnVtYmVyfSBwb3MuMSBUaGUgWSBjb29yZGluYXRlIDxrbz55IOyijO2RnDwva28+XG5cdCAqL1xuXHRnZXQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3Bvcy5jb25jYXQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXN0cm95cyBlbGVtZW50cywgcHJvcGVydGllcywgYW5kIGV2ZW50cyB1c2VkIGluIGEgbW9kdWxlLlxuXHQgKiBAa28g66qo65OI7JeQIOyCrOyaqe2VnCDsl5jrpqzrqLztirjsmYAg7IaN7ISxLCDsnbTrsqTtirjrpbwg7ZW07KCc7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNkZXN0cm95XG5cdCAqL1xuXHRkZXN0cm95KCkge1xuXHRcdHRoaXMub2ZmKCk7XG5cdFx0dGhpcy5faGFtbWVyTWFuYWdlci5kZXN0cm95KCk7XG5cdH1cbn07XG5cbk9iamVjdC5hc3NpZ24oTW92YWJsZUNvb3JkLCBESVJFQ1RJT04pO1xuTW92YWJsZUNvb3JkLlZFUlNJT04gPSBcIjIuMC4wLWJldGFcIjtcbmV4cG9ydCBkZWZhdWx0IE1vdmFibGVDb29yZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb3ZhYmxlQ29vcmQuanMiLCJpbXBvcnQgQ29vcmRpbmF0ZSBmcm9tIFwiLi9jb29yZGluYXRlXCI7XG5pbXBvcnQge3dpbmRvd30gZnJvbSBcIi4vYnJvd3NlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBzdXBlcmNsYXNzID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5fcmFmID0gbnVsbDtcblx0XHR0aGlzLl9hbmltYXRlUGFyYW0gPSBudWxsO1xuXHRcdHRoaXMuX2FuaW1hdGlvbkVuZCA9IHRoaXMuX2FuaW1hdGlvbkVuZC5iaW5kKHRoaXMpO1x0Ly8gZm9yIGNhY2hpbmdcblx0XHR0aGlzLl9yZXN0b3JlID0gdGhpcy5fcmVzdG9yZS5iaW5kKHRoaXMpO1x0Ly8gZm9yIGNhY2hpbmdcblx0fVxuXG5cdF9ncmFiKG1pbiwgbWF4LCBjaXJjdWxhcikge1xuXHRcdGlmICh0aGlzLl9hbmltYXRlUGFyYW0pIHtcblx0XHRcdHRoaXMudHJpZ2dlcihcImFuaW1hdGlvbkVuZFwiKTtcblx0XHRcdGNvbnN0IG9yZ1BvcyA9IHRoaXMuZ2V0KCk7XG5cblx0XHRcdGNvbnN0IHBvcyA9IENvb3JkaW5hdGUuZ2V0Q2lyY3VsYXJQb3ModGhpcy5nZXQoKSwgbWluLCBtYXgsIGNpcmN1bGFyKTtcblxuXHRcdFx0aWYgKHBvc1swXSAhPT0gb3JnUG9zWzBdIHx8IHBvc1sxXSAhPT0gb3JnUG9zWzFdKSB7XG5cdFx0XHRcdHRoaXMuX3NldFBvc0FuZFRyaWdnZXJDaGFuZ2UocG9zLCB0cnVlKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2FuaW1hdGVQYXJhbSA9IG51bGw7XG5cdFx0XHR0aGlzLl9yYWYgJiYgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX3JhZik7XG5cdFx0XHR0aGlzLl9yYWYgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdF9wcmVwYXJlUGFyYW0oYWJzUG9zLCBkdXJhdGlvbiwgaGFtbWVyRXZlbnQpIHtcblx0XHRjb25zdCBwb3MgPSB0aGlzLmdldCgpO1xuXHRcdGNvbnN0IG1pbiA9IHRoaXMub3B0aW9ucy5taW47XG5cdFx0Y29uc3QgbWF4ID0gdGhpcy5vcHRpb25zLm1heDtcblx0XHRjb25zdCBjaXJjdWxhciA9IHRoaXMub3B0aW9ucy5jaXJjdWxhcjtcblx0XHRjb25zdCBtYXhpbXVtRHVyYXRpb24gPSB0aGlzLm9wdGlvbnMubWF4aW11bUR1cmF0aW9uO1xuXHRcdGxldCBkZXN0UG9zID0gQ29vcmRpbmF0ZS5nZXRQb2ludE9mSW50ZXJzZWN0aW9uKFxuXHRcdFx0cG9zLCBhYnNQb3MsIG1pbiwgbWF4LCBjaXJjdWxhciwgdGhpcy5vcHRpb25zLmJvdW5jZSk7XG5cblx0XHRkZXN0UG9zID0gQ29vcmRpbmF0ZS5pc091dFRvT3V0KHBvcywgZGVzdFBvcywgbWluLCBtYXgpID8gcG9zIDogZGVzdFBvcztcblxuXHRcdGNvbnN0IGRpc3RhbmNlID0gW1xuXHRcdFx0TWF0aC5hYnMoZGVzdFBvc1swXSAtIHBvc1swXSksXG5cdFx0XHRNYXRoLmFicyhkZXN0UG9zWzFdIC0gcG9zWzFdKVxuXHRcdF07XG5cdFx0bGV0IG5ld0R1cmF0aW9uID0gZHVyYXRpb24gPT0gbnVsbCA/IENvb3JkaW5hdGUuZ2V0RHVyYXRpb25Gcm9tUG9zKFxuXHRcdFx0ZGlzdGFuY2UsIHRoaXMub3B0aW9ucy5kZWNlbGVyYXRpb24pIDogZHVyYXRpb247XG5cblx0XHRuZXdEdXJhdGlvbiA9IG1heGltdW1EdXJhdGlvbiA+IG5ld0R1cmF0aW9uID8gbmV3RHVyYXRpb24gOiBtYXhpbXVtRHVyYXRpb247XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRlcGFQb3M6IHBvcy5jb25jYXQoKSxcblx0XHRcdGRlc3RQb3M6IGRlc3RQb3MuY29uY2F0KCksXG5cdFx0XHRpc0JvdW5jZTogQ29vcmRpbmF0ZS5pc091dHNpZGUoZGVzdFBvcywgbWluLCBtYXgpLFxuXHRcdFx0aXNDaXJjdWxhcjogQ29vcmRpbmF0ZS5pc0NpcmN1bGFyKGFic1BvcywgbWluLCBtYXgsIGNpcmN1bGFyKSxcblx0XHRcdGR1cmF0aW9uOiBuZXdEdXJhdGlvbixcblx0XHRcdGRpc3RhbmNlLFxuXHRcdFx0aGFtbWVyRXZlbnQ6IGhhbW1lckV2ZW50IHx8IG51bGwsXG5cdFx0XHRkb25lOiB0aGlzLl9hbmltYXRpb25FbmRcblx0XHR9O1xuXHR9XG5cblx0X3Jlc3RvcmUoY29tcGxldGUsIGhhbW1lckV2ZW50KSB7XG5cdFx0Y29uc3QgcG9zID0gdGhpcy5nZXQoKTtcblx0XHRjb25zdCBtaW4gPSB0aGlzLm9wdGlvbnMubWluO1xuXHRcdGNvbnN0IG1heCA9IHRoaXMub3B0aW9ucy5tYXg7XG5cblx0XHR0aGlzLl9hbmltYXRlKHRoaXMuX3ByZXBhcmVQYXJhbShbXG5cdFx0XHRNYXRoLm1pbihtYXhbMF0sIE1hdGgubWF4KG1pblswXSwgcG9zWzBdKSksXG5cdFx0XHRNYXRoLm1pbihtYXhbMV0sIE1hdGgubWF4KG1pblsxXSwgcG9zWzFdKSlcblx0XHRdLCBudWxsLCBoYW1tZXJFdmVudCksIGNvbXBsZXRlKTtcblx0fVxuXG5cdF9hbmltYXRpb25FbmQoKSB7XG5cdFx0dGhpcy5fYW5pbWF0ZVBhcmFtID0gbnVsbDtcblx0XHRjb25zdCBvcmdQb3MgPSB0aGlzLmdldCgpO1xuXHRcdGNvbnN0IG5leHRQb3MgPSBDb29yZGluYXRlLmdldENpcmN1bGFyUG9zKFtcblx0XHRcdE1hdGgucm91bmQob3JnUG9zWzBdKSxcblx0XHRcdE1hdGgucm91bmQob3JnUG9zWzFdKVxuXHRcdF0sIHRoaXMub3B0aW9ucy5taW4sIHRoaXMub3B0aW9ucy5tYXgsIHRoaXMub3B0aW9ucy5jaXJjdWxhcik7XG5cblx0XHR0aGlzLnNldFRvKC4uLm5leHRQb3MpO1xuXHRcdHRoaXMuX3NldEludGVycnVwdChmYWxzZSk7XG5cdFx0LyoqXG5cdFx0ICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIGFuaW1hdGlvbiBlbmRzLlxuXHRcdCAqIEBrbyDsl5Dri4jrqZTsnbTshZjsnbQg64Gd64Ks7J2EIOuVjCDrsJzsg53tlZzri6QuXG5cdFx0ICogQG5hbWUgZWcuTW92YWJsZUNvb3JkI2FuaW1hdGlvbkVuZFxuXHRcdCAqIEBldmVudFxuXHRcdCAqL1xuXHRcdHRoaXMudHJpZ2dlcihcImFuaW1hdGlvbkVuZFwiKTtcblx0fVxuXG5cdF9hbmltYXRlKHBhcmFtLCBjb21wbGV0ZSkge1xuXHRcdHRoaXMuX2FuaW1hdGVQYXJhbSA9IE9iamVjdC5hc3NpZ24oe30sIHBhcmFtKTtcblx0XHR0aGlzLl9hbmltYXRlUGFyYW0uc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cdFx0aWYgKHBhcmFtLmR1cmF0aW9uKSB7XG5cdFx0XHRjb25zdCBpbmZvID0gdGhpcy5fYW5pbWF0ZVBhcmFtO1xuXHRcdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cblx0XHRcdChmdW5jdGlvbiBsb29wKCkge1xuXHRcdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuXHRcdFx0XHRzZWxmLl9yYWYgPSBudWxsO1xuXHRcdFx0XHRpZiAoc2VsZi5fZnJhbWUoaW5mbykgPj0gMSkge1xuXHRcdFx0XHRcdC8vIGRlZmVycmVkLnJlc29sdmUoKTtcblx0XHRcdFx0XHRjb21wbGV0ZSgpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fSAvLyBhbmltYXRpb25FbmRcblx0XHRcdFx0c2VsZi5fcmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcblx0XHRcdFx0LyogZXNsaW50LWVuYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuXHRcdFx0fSkoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fc2V0UG9zQW5kVHJpZ2dlckNoYW5nZShwYXJhbS5kZXN0UG9zLCBmYWxzZSk7XG5cdFx0XHRjb21wbGV0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdF9hbmltYXRlVG8oYWJzUG9zLCBkdXJhdGlvbiwgaGFtbWVyRXZlbnQpIHtcblx0XHRjb25zdCBwYXJhbSA9IHRoaXMuX3ByZXBhcmVQYXJhbShhYnNQb3MsIGR1cmF0aW9uLCBoYW1tZXJFdmVudCk7XG5cdFx0Y29uc3QgcmV0VHJpZ2dlciA9IHRoaXMudHJpZ2dlcihcImFuaW1hdGlvblN0YXJ0XCIsIHBhcmFtKTtcblxuXHRcdC8vIFlvdSBjYW4ndCBzdG9wIHRoZSAnYW5pbWF0aW9uU3RhcnQnIGV2ZW50IHdoZW4gJ2NpcmN1bGFyJyBpcyB0cnVlLlxuXHRcdGlmIChwYXJhbS5pc0NpcmN1bGFyICYmICFyZXRUcmlnZ2VyKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFwiWW91IGNhbid0IHN0b3AgdGhlICdhbmltYXRpb24nIGV2ZW50IHdoZW4gJ2NpcmN1bGFyJyBpcyB0cnVlLlwiXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChyZXRUcmlnZ2VyKSB7XG5cdFx0XHRjb25zdCBxdWV1ZSA9IFtdO1xuXHRcdFx0Y29uc3QgZGVxdWV1ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjb25zdCB0YXNrID0gcXVldWUuc2hpZnQoKTtcblxuXHRcdFx0XHR0YXNrICYmIHRhc2suY2FsbCh0aGlzKTtcblx0XHRcdH07XG5cblx0XHRcdGlmIChwYXJhbS5kZXBhUG9zWzBdICE9PSBwYXJhbS5kZXN0UG9zWzBdIHx8XG5cdFx0XHRcdHBhcmFtLmRlcGFQb3NbMV0gIT09IHBhcmFtLmRlc3RQb3NbMV0pIHtcblx0XHRcdFx0cXVldWUucHVzaCgoKSA9PiB0aGlzLl9hbmltYXRlKHBhcmFtLCBkZXF1ZXVlKSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoQ29vcmRpbmF0ZS5pc091dHNpZGUoXG5cdFx0XHRcdHBhcmFtLmRlc3RQb3MsIHRoaXMub3B0aW9ucy5taW4sIHRoaXMub3B0aW9ucy5tYXgpKSB7XG5cdFx0XHRcdHF1ZXVlLnB1c2goKCkgPT4gdGhpcy5fcmVzdG9yZShkZXF1ZXVlLCBoYW1tZXJFdmVudCkpO1xuXHRcdFx0fVxuXHRcdFx0cXVldWUucHVzaCgoKSA9PiB0aGlzLl9hbmltYXRpb25FbmQoKSk7XG5cdFx0XHRkZXF1ZXVlKCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gYW5pbWF0aW9uIGZyYW1lICgwfjEpXG5cdF9mcmFtZShwYXJhbSkge1xuXHRcdGNvbnN0IGN1clRpbWUgPSBuZXcgRGF0ZSgpIC0gcGFyYW0uc3RhcnRUaW1lO1xuXHRcdGNvbnN0IGVhc2luZ1BlciA9IHRoaXMuX2Vhc2luZyhjdXJUaW1lIC8gcGFyYW0uZHVyYXRpb24pO1xuXHRcdGxldCBwb3MgPSBbcGFyYW0uZGVwYVBvc1swXSwgcGFyYW0uZGVwYVBvc1sxXV07XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IDI7IGkrKykge1xuXHRcdFx0KHBvc1tpXSAhPT0gcGFyYW0uZGVzdFBvc1tpXSkgJiZcblx0XHRcdChwb3NbaV0gKz0gKHBhcmFtLmRlc3RQb3NbaV0gLSBwb3NbaV0pICogZWFzaW5nUGVyKTtcblx0XHR9XG5cdFx0cG9zID0gQ29vcmRpbmF0ZS5nZXRDaXJjdWxhclBvcyhcblx0XHRcdHBvcywgdGhpcy5vcHRpb25zLm1pbiwgdGhpcy5vcHRpb25zLm1heCwgdGhpcy5vcHRpb25zLmNpcmN1bGFyKTtcblx0XHR0aGlzLl9zZXRQb3NBbmRUcmlnZ2VyQ2hhbmdlKHBvcywgZmFsc2UpO1xuXHRcdHJldHVybiBlYXNpbmdQZXI7XG5cdH1cblxuXHQvLyB0cmlnZ2VyICdjaGFuZ2UnIGV2ZW50XG5cdF9zZXRQb3NBbmRUcmlnZ2VyQ2hhbmdlKHBvc2l0aW9uLCBob2xkaW5nLCBlKSB7XG5cdFx0LyoqXG5cdFx0ICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIGNvb3JkaW5hdGUgY2hhbmdlcy5cblx0XHQgKiBAa28g7KKM7ZGc6rCAIOuzgOqyveuQkOydhCDrlYwg67Cc7IOd7ZWY64qUIOydtOuypO2KuFxuXHRcdCAqIEBuYW1lIGVnLk1vdmFibGVDb29yZCNjaGFuZ2Vcblx0XHQgKiBAZXZlbnRcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbSBUaGUgb2JqZWN0IG9mIGRhdGEgdG8gYmUgc2VudCB3aGVuIHRoZSBldmVudCBpcyBmaXJlZCA8a28+7J2067Kk7Yq46rCAIOuwnOyDne2VoCDrlYwg7KCE64us65CY64qUIOuNsOydtO2EsCDqsJ3ssrQ8L2tvPlxuXHRcdCAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtLnBvc2l0aW9uIGRlcGFydHVyZSBjb29yZGluYXRlICA8a28+7KKM7ZGcPC9rbz5cblx0XHQgKiBAcGFyYW0ge051bWJlcn0gcGFyYW0ucG9zaXRpb24uMCBUaGUgWCBjb29yZGluYXRlIDxrbz54IOyijO2RnDwva28+XG5cdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtLnBvcy4xIFRoZSBZIGNvb3JkaW5hdGUgPGtvPnkg7KKM7ZGcPC9rbz5cblx0XHQgKiBAcGFyYW0ge0Jvb2xlYW59IHBhcmFtLmhvbGRpbmcgSW5kaWNhdGVzIHdoZXRoZXIgYSB1c2VyIGhvbGRzIGFuIGVsZW1lbnQgb24gdGhlIHNjcmVlbiBvZiB0aGUgZGV2aWNlLjxrbz7sgqzsmqnsnpDqsIAg6riw6riw7J2YIO2ZlOuptOydhCDriITrpbTqs6Ag7J6I64qU7KeAIOyXrOu2gDwva28+XG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IHBhcmFtLmhhbW1lckV2ZW50IFRoZSBldmVudCBpbmZvcm1hdGlvbiBvZiBIYW1tZXIuSlMuIEl0IHJldHVybnMgbnVsbCBpZiB0aGUgZXZlbnQgaXMgZmlyZWQgdGhyb3VnaCBhIGNhbGwgdG8gdGhlIHNldFRvKCkgb3Igc2V0QnkoKSBtZXRob2QuPGtvPkhhbW1lci5KU+ydmCDsnbTrsqTtirgg7KCV67O0LiBzZXRUbygpIOuplOyEnOuTnOuCmCBzZXRCeSgpIOuplOyEnOuTnOulvCDtmLjstpztlbQg7J2067Kk7Yq46rCAIOuwnOyDne2WiOydhCDrlYzripQgJ251bGwn7J2EIOuwmO2ZmO2VnOuLpC48L2tvPlxuXHRcdCAqXG5cdFx0ICovXG5cdFx0dGhpcy5fcG9zID0gcG9zaXRpb24uY29uY2F0KCk7XG5cdFx0dGhpcy50cmlnZ2VyKFwiY2hhbmdlXCIsIHtcblx0XHRcdHBvczogcG9zaXRpb24uY29uY2F0KCksXG5cdFx0XHRob2xkaW5nLFxuXHRcdFx0aGFtbWVyRXZlbnQ6IGUgfHwgbnVsbFxuXHRcdH0pO1xuXHR9XG5cblx0X2Vhc2luZyhwKSB7XG5cdFx0cmV0dXJuIHAgPiAxID8gMSA6IHRoaXMub3B0aW9ucy5lYXNpbmcocCk7XG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgYW4gZWxlbWVudCB0byBzcGVjaWZpYyBjb29yZGluYXRlcy5cblx0ICogQGtvIOyijO2RnOulvCDsnbTrj5ntlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuTW92YWJsZUNvb3JkI3NldFRvXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB4IFRoZSBYIGNvb3JkaW5hdGUgdG8gbW92ZSB0byA8a28+7J2064+Z7ZWgIHjsooztkZw8L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0geSBUaGUgWSBjb29yZGluYXRlIHRvIG1vdmUgdG8gIDxrbz7snbTrj5ntlaAgeeyijO2RnDwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbZHVyYXRpb249MF0gRHVyYXRpb24gb2YgdGhlIGFuaW1hdGlvbiAodW5pdDogbXMpIDxrbz7slaDri4jrqZTsnbTshZgg7KeE7ZaJIOyLnOqwhCjri6jsnIQ6IG1zKTwva28+XG5cdCAqIEByZXR1cm4ge2VnLk1vdmFibGVDb29yZH0gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmIDxrbz7snpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICovXG5cdHNldFRvKHgsIHksIGR1cmF0aW9uID0gMCkge1xuXHRcdGxldCB0b1ggPSB4O1xuXHRcdGxldCB0b1kgPSB5O1xuXHRcdGNvbnN0IG1pbiA9IHRoaXMub3B0aW9ucy5taW47XG5cdFx0Y29uc3QgbWF4ID0gdGhpcy5vcHRpb25zLm1heDtcblx0XHRjb25zdCBjaXJjdWxhciA9IHRoaXMub3B0aW9ucy5jaXJjdWxhcjtcblxuXHRcdHRoaXMuX2dyYWIobWluLCBtYXgsIGNpcmN1bGFyKTtcblx0XHRjb25zdCBwb3MgPSB0aGlzLmdldCgpO1xuXG5cdFx0aWYgKHggPT09IHBvc1swXSAmJiB5ID09PSBwb3NbMV0pIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHRoaXMuX3NldEludGVycnVwdCh0cnVlKTtcblx0XHRpZiAoeCAhPT0gcG9zWzBdKSB7XG5cdFx0XHRpZiAoIWNpcmN1bGFyWzNdKSB7XG5cdFx0XHRcdHRvWCA9IE1hdGgubWF4KG1pblswXSwgdG9YKTtcblx0XHRcdH1cblx0XHRcdGlmICghY2lyY3VsYXJbMV0pIHtcblx0XHRcdFx0dG9YID0gTWF0aC5taW4obWF4WzBdLCB0b1gpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoeSAhPT0gcG9zWzFdKSB7XG5cdFx0XHRpZiAoIWNpcmN1bGFyWzBdKSB7XG5cdFx0XHRcdHRvWSA9IE1hdGgubWF4KG1pblsxXSwgdG9ZKTtcblx0XHRcdH1cblx0XHRcdGlmICghY2lyY3VsYXJbMl0pIHtcblx0XHRcdFx0dG9ZID0gTWF0aC5taW4obWF4WzFdLCB0b1kpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoZHVyYXRpb24pIHtcblx0XHRcdHRoaXMuX2FuaW1hdGVUbyhbdG9YLCB0b1ldLCBkdXJhdGlvbik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3BvcyA9IENvb3JkaW5hdGUuZ2V0Q2lyY3VsYXJQb3MoW3RvWCwgdG9ZXSwgbWluLCBtYXgsIGNpcmN1bGFyKTtcblx0XHRcdHRoaXMuX3NldFBvc0FuZFRyaWdnZXJDaGFuZ2UodGhpcy5fcG9zLCBmYWxzZSk7XG5cdFx0XHR0aGlzLl9zZXRJbnRlcnJ1cHQoZmFsc2UpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIGN1cnJlbnQgY29vcmRpbmF0ZXMgdG8gc3BlY2lmaWMgY29vcmRpbmF0ZXMuIFRoZSBjaGFuZ2UgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgbWV0aG9kIGlzIGV4ZWN1dGVkLlxuXHQgKiBAa28g7ZiE7J6sIOyijO2RnOulvCDquLDspIDsnLzroZwg7KKM7ZGc66W8IOydtOuPme2VnOuLpC4g66mU7ISc65Oc6rCAIOyLpO2WieuQmOuptCBjaGFuZ2Ug7J2067Kk7Yq46rCAIOuwnOyDne2VnOuLpFxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNzZXRCeVxuXHQgKiBAcGFyYW0ge051bWJlcn0geCBUaGUgWCBjb29yZGluYXRlIHRvIG1vdmUgdG8gPGtvPuydtOuPme2VoCB47KKM7ZGcPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IHkgVGhlIFkgY29vcmRpbmF0ZSB0byBtb3ZlIHRvIDxrbz7snbTrj5ntlaAgeeyijO2RnDwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbZHVyYXRpb249MF0gRHVyYXRpb24gb2YgdGhlIGFuaW1hdGlvbiAodW5pdDogbXMpIDxrbz7slaDri4jrqZTsnbTshZgg7KeE7ZaJIOyLnOqwhCjri6jsnIQ6IG1zKTwva28+XG5cdCAqIEByZXR1cm4ge2VnLk1vdmFibGVDb29yZH0gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmIDxrbz7snpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICovXG5cdHNldEJ5KHgsIHksIGR1cmF0aW9uID0gMCkge1xuXHRcdHJldHVybiB0aGlzLnNldFRvKFxuXHRcdFx0eCAhPSBudWxsID8gdGhpcy5fcG9zWzBdICsgeCA6IHRoaXMuX3Bvc1swXSxcblx0XHRcdHkgIT0gbnVsbCA/IHRoaXMuX3Bvc1sxXSArIHkgOiB0aGlzLl9wb3NbMV0sXG5cdFx0XHRkdXJhdGlvblxuXHRcdCk7XG5cdH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYW5pbWF0aW9uSGFuZGxlci5qcyIsImltcG9ydCBDb29yZGluYXRlIGZyb20gXCIuL2Nvb3JkaW5hdGVcIjtcbmltcG9ydCB7RElSRUNUSU9OfSBmcm9tIFwiLi9jb25zdHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgc3VwZXJjbGFzcyA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX3N0YXR1cyA9IHtcblx0XHRcdGdyYWJPdXRzaWRlOiBmYWxzZSxcdFx0Ly8gY2hlY2sgd2hldGhlciB1c2VyJ3MgYWN0aW9uIHN0YXJ0ZWQgb24gb3V0c2lkZVxuXHRcdFx0Y3VycmVudEhhbW1lcjogbnVsbCxcdFx0Ly8gY3VycmVudCBoYW1tZXIgaW5zdGFuY2Vcblx0XHRcdGN1cnJlbnRPcHRpb25zOiB7fSxcdFx0Ly8gY3VycmVudCBiaW5kIG9wdGlvbnNcblx0XHRcdG1vdmVEaXN0YW5jZTogbnVsbCxcdFx0Ly8gYSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgdXNlcidzIGFjdGlvblxuXHRcdFx0cHJldmVudGVkOiBmYWxzZVx0XHQvLyAgY2hlY2sgd2hldGhlciB0aGUgYW5pbWF0aW9uIGV2ZW50IHdhcyBwcmV2ZW50ZWRcblx0XHR9O1xuXHR9XG5cblx0X3NldEN1cnJlbnRUYXJnZXQoaGFtbWVyLCBvcHRpb25zKSB7XG5cdFx0dGhpcy5fc3RhdHVzLmN1cnJlbnRPcHRpb25zID0gb3B0aW9ucztcblx0XHR0aGlzLl9zdGF0dXMuY3VycmVudEhhbm1tZXIgPSBoYW1tZXI7XG5cdH1cblxuXHQvLyBwYW5zdGFydCBldmVudCBoYW5kbGVyXG5cdF9zdGFydChlKSB7XG5cdFx0aWYgKCF0aGlzLl9zdGF0dXMuY3VycmVudE9wdGlvbnMuaW50ZXJydXB0YWJsZSAmJiB0aGlzLl9zdGF0dXMucHJldmVudGVkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNvbnN0IHBvcyA9IHRoaXMuZ2V0KCk7XG5cdFx0Y29uc3QgbWluID0gdGhpcy5vcHRpb25zLm1pbjtcblx0XHRjb25zdCBtYXggPSB0aGlzLm9wdGlvbnMubWF4O1xuXG5cdFx0dGhpcy5fc2V0SW50ZXJydXB0KHRydWUpO1xuXHRcdHRoaXMuX2dyYWIobWluLCBtYXgsIHRoaXMub3B0aW9ucy5jaXJjdWxhcik7XG5cdFx0LyoqXG5cdFx0ICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIGEgdXNlciBob2xkcyBhbiBlbGVtZW50IG9uIHRoZSBzY3JlZW4gb2YgdGhlIGRldmljZS5cblx0XHQgKiBAa28g7IKs7Jqp7J6Q6rCAIOq4sOq4sOydmCDtmZTrqbTsl5Ag7IaQ7J2EIOuMgOqzoCDsnojsnYQg65WMIOuwnOyDne2VmOuKlCDsnbTrsqTtirhcblx0XHQgKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQjaG9sZFxuXHRcdCAqIEBldmVudFxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbSBUaGUgb2JqZWN0IG9mIGRhdGEgdG8gYmUgc2VudCB3aGVuIHRoZSBldmVudCBpcyBmaXJlZDxrbz7snbTrsqTtirjqsIAg67Cc7IOd7ZWgIOuVjCDsoITri6zrkJjripQg642w7J207YSwIOqwneyytDwva28+XG5cdFx0ICogQHBhcmFtIHtBcnJheX0gcGFyYW0ucG9zIGNvb3JkaW5hdGUgPGtvPuyijO2RnCDsoJXrs7Q8L2tvPlxuXHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBwYXJhbS5wb3MuMCBUaGUgWCBjb29yZGluYXRlPGtvPngg7KKM7ZGcPC9rbz5cblx0XHQgKiBAcGFyYW0ge051bWJlcn0gcGFyYW0ucG9zLjEgVGhlIFkgY29vcmRpbmF0ZTxrbz55IOyijO2RnDwva28+XG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IHBhcmFtLmhhbW1lckV2ZW50IFRoZSBldmVudCBpbmZvcm1hdGlvbiBvZiBIYW1tZXIuSlMuIEl0IHJldHVybnMgbnVsbCBpZiB0aGUgZXZlbnQgaXMgZmlyZWQgdGhyb3VnaCBhIGNhbGwgdG8gdGhlIHNldFRvKCkgb3Igc2V0QnkoKSBtZXRob2QuPGtvPkhhbW1lci5KU+ydmCDsnbTrsqTtirgg7KCV67O0LiBzZXRUbygpIOuplOyEnOuTnOuCmCBzZXRCeSgpIOuplOyEnOuTnOulvCDtmLjstpztlbQg7J2067Kk7Yq46rCAIOuwnOyDne2WiOydhCDrlYzripQgJ251bGwn7J2EIOuwmO2ZmO2VnOuLpC48L2tvPlxuXHRcdCAqXG5cdFx0ICovXG5cdFx0dGhpcy50cmlnZ2VyKFwiaG9sZFwiLCB7XG5cdFx0XHRwb3M6IHBvcy5jb25jYXQoKSxcblx0XHRcdGhhbW1lckV2ZW50OiBlXG5cdFx0fSk7XG5cblx0XHR0aGlzLl9zdGF0dXMubW92ZURpc3RhbmNlID0gcG9zLmNvbmNhdCgpO1xuXHRcdHRoaXMuX3N0YXR1cy5ncmFiT3V0c2lkZSA9IENvb3JkaW5hdGUuaXNPdXRzaWRlKHBvcywgbWluLCBtYXgpO1xuXHR9XG5cblx0Ly8gcGFubW92ZSBldmVudCBoYW5kbGVyXG5cdF9tb3ZlKGUpIHtcblx0XHRpZiAoIXRoaXMuX2lzSW50ZXJydXB0aW5nKCkgfHwgIXRoaXMuX3N0YXR1cy5tb3ZlRGlzdGFuY2UpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGV0IHBvcyA9IHRoaXMuZ2V0KHRydWUpO1xuXHRcdGNvbnN0IG1pbiA9IHRoaXMub3B0aW9ucy5taW47XG5cdFx0Y29uc3QgbWF4ID0gdGhpcy5vcHRpb25zLm1heDtcblx0XHRjb25zdCBib3VuY2UgPSB0aGlzLm9wdGlvbnMuYm91bmNlO1xuXHRcdGNvbnN0IG1hcmdpbiA9IHRoaXMub3B0aW9ucy5tYXJnaW47XG5cdFx0Y29uc3QgY3VycmVudE9wdGlvbnMgPSB0aGlzLl9zdGF0dXMuY3VycmVudE9wdGlvbnM7XG5cdFx0Y29uc3QgZGlyZWN0aW9uID0gY3VycmVudE9wdGlvbnMuZGlyZWN0aW9uO1xuXHRcdGNvbnN0IHNjYWxlID0gY3VycmVudE9wdGlvbnMuc2NhbGU7XG5cdFx0Y29uc3QgdXNlckRpcmVjdGlvbiA9IENvb3JkaW5hdGUuZ2V0RGlyZWN0aW9uQnlBbmdsZShcblx0XHRcdGUuYW5nbGUsIGN1cnJlbnRPcHRpb25zLnRocmVzaG9sZEFuZ2xlKTtcblx0XHRjb25zdCBvdXQgPSBbXG5cdFx0XHRtYXJnaW5bMF0gKyBib3VuY2VbMF0sXG5cdFx0XHRtYXJnaW5bMV0gKyBib3VuY2VbMV0sXG5cdFx0XHRtYXJnaW5bMl0gKyBib3VuY2VbMl0sXG5cdFx0XHRtYXJnaW5bM10gKyBib3VuY2VbM11cblx0XHRdO1xuXHRcdGxldCBwcmV2ZW50ID0gZmFsc2U7XG5cblx0XHQvLyBub3Qgc3VwcG9ydCBvZmZzZXQgcHJvcGVydGllcyBpbiBIYW1tZXJqcyAtIHN0YXJ0XG5cdFx0Y29uc3QgcHJldklucHV0ID0gdGhpcy5fc3RhdHVzLmN1cnJlbnRIYW5tbWVyLnNlc3Npb24ucHJldklucHV0O1xuXG5cdFx0LyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cblx0XHRpZiAocHJldklucHV0KSB7XG5cdFx0XHRlLm9mZnNldFggPSBlLmRlbHRhWCAtIHByZXZJbnB1dC5kZWx0YVg7XG5cdFx0XHRlLm9mZnNldFkgPSBlLmRlbHRhWSAtIHByZXZJbnB1dC5kZWx0YVk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGUub2Zmc2V0WCA9IDA7XG5cdFx0XHRlLm9mZnNldFkgPSAwO1xuXHRcdH1cblxuXHRcdC8vIG5vdCBzdXBwb3J0IG9mZnNldCBwcm9wZXJ0aWVzIGluIEhhbW1lcmpzIC0gZW5kXG5cdFx0aWYgKENvb3JkaW5hdGUuaXNIb3Jpem9udGFsKGRpcmVjdGlvbiwgdXNlckRpcmVjdGlvbikpIHtcblx0XHRcdHRoaXMuX3N0YXR1cy5tb3ZlRGlzdGFuY2VbMF0gKz0gKGUub2Zmc2V0WCAqIHNjYWxlWzBdKTtcblx0XHRcdHByZXZlbnQgPSB0cnVlO1xuXHRcdH1cblx0XHRpZiAoQ29vcmRpbmF0ZS5pc1ZlcnRpY2FsKGRpcmVjdGlvbiwgdXNlckRpcmVjdGlvbikpIHtcblx0XHRcdHRoaXMuX3N0YXR1cy5tb3ZlRGlzdGFuY2VbMV0gKz0gKGUub2Zmc2V0WSAqIHNjYWxlWzFdKTtcblx0XHRcdHByZXZlbnQgPSB0cnVlO1xuXHRcdH1cblx0XHRpZiAocHJldmVudCkge1xuXHRcdFx0ZS5zcmNFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZS5zcmNFdmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cdFx0ZS5wcmV2ZW50U3lzdGVtRXZlbnQgPSBwcmV2ZW50O1xuXHRcdC8qIGVzbGludC1lbmFibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cblxuXHRcdHBvc1swXSA9IHRoaXMuX3N0YXR1cy5tb3ZlRGlzdGFuY2VbMF07XG5cdFx0cG9zWzFdID0gdGhpcy5fc3RhdHVzLm1vdmVEaXN0YW5jZVsxXTtcblx0XHRwb3MgPSBDb29yZGluYXRlLmdldENpcmN1bGFyUG9zKHBvcywgbWluLCBtYXgsIHRoaXMub3B0aW9ucy5jaXJjdWxhcik7XG5cblx0XHQvLyBmcm9tIG91dHNpZGUgdG8gaW5zaWRlXG5cdFx0aWYgKHRoaXMuX3N0YXR1cy5ncmFiT3V0c2lkZSAmJiAhQ29vcmRpbmF0ZS5pc091dHNpZGUocG9zLCBtaW4sIG1heCkpIHtcblx0XHRcdHRoaXMuX3N0YXR1cy5ncmFiT3V0c2lkZSA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIHdoZW4gbW92ZSBwb2ludGVyIGlzIGhlbGQgaW4gb3V0c2lkZVxuXHRcdGxldCB0djtcblx0XHRsZXQgdG47XG5cdFx0bGV0IHR4O1xuXG5cdFx0aWYgKHRoaXMuX3N0YXR1cy5ncmFiT3V0c2lkZSkge1xuXHRcdFx0dG4gPSBtaW5bMF0gLSBvdXRbM107XG5cdFx0XHR0eCA9IG1heFswXSArIG91dFsxXTtcblx0XHRcdHR2ID0gcG9zWzBdO1xuXHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tbmVzdGVkLXRlcm5hcnkgKi9cblx0XHRcdHBvc1swXSA9IHR2ID4gdHggPyB0eCA6ICh0diA8IHRuID8gdG4gOiB0dik7XG5cdFx0XHR0biA9IG1pblsxXSAtIG91dFswXTtcblx0XHRcdHR4ID0gbWF4WzFdICsgb3V0WzJdO1xuXHRcdFx0dHYgPSBwb3NbMV07XG5cdFx0XHRwb3NbMV0gPSB0diA+IHR4ID8gdHggOiAodHYgPCB0biA/IHRuIDogdHYpO1xuXHRcdFx0LyogZXNsaW50LWVuYWJsZSBuby1uZXN0ZWQtdGVybmFyeSAqL1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyB3aGVuIHN0YXJ0IHBvaW50ZXIgaXMgaGVsZCBpbiBpbnNpZGVcblx0XHRcdC8vIGdldCBhIGluaXRpYWxpemF0aW9uIHNsb3BlIHZhbHVlIHRvIHByZXZlbnQgc21vb3RoIGFuaW1hdGlvbi5cblx0XHRcdGNvbnN0IGluaXRTbG9wZSA9IHRoaXMuX2Vhc2luZygwLjAwMDAxKSAvIDAuMDAwMDE7XG5cblx0XHRcdGlmIChwb3NbMV0gPCBtaW5bMV0pIHsgLy8gdXBcblx0XHRcdFx0dHYgPSAobWluWzFdIC0gcG9zWzFdKSAvIChvdXRbMF0gKiBpbml0U2xvcGUpO1xuXHRcdFx0XHRwb3NbMV0gPSBtaW5bMV0gLSB0aGlzLl9lYXNpbmcodHYpICogb3V0WzBdO1xuXHRcdFx0fSBlbHNlIGlmIChwb3NbMV0gPiBtYXhbMV0pIHsgLy8gZG93blxuXHRcdFx0XHR0diA9IChwb3NbMV0gLSBtYXhbMV0pIC8gKG91dFsyXSAqIGluaXRTbG9wZSk7XG5cdFx0XHRcdHBvc1sxXSA9IG1heFsxXSArIHRoaXMuX2Vhc2luZyh0dikgKiBvdXRbMl07XG5cdFx0XHR9XG5cdFx0XHRpZiAocG9zWzBdIDwgbWluWzBdKSB7IC8vIGxlZnRcblx0XHRcdFx0dHYgPSAobWluWzBdIC0gcG9zWzBdKSAvIChvdXRbM10gKiBpbml0U2xvcGUpO1xuXHRcdFx0XHRwb3NbMF0gPSBtaW5bMF0gLSB0aGlzLl9lYXNpbmcodHYpICogb3V0WzNdO1xuXHRcdFx0fSBlbHNlIGlmIChwb3NbMF0gPiBtYXhbMF0pIHsgLy8gcmlnaHRcblx0XHRcdFx0dHYgPSAocG9zWzBdIC0gbWF4WzBdKSAvIChvdXRbMV0gKiBpbml0U2xvcGUpO1xuXHRcdFx0XHRwb3NbMF0gPSBtYXhbMF0gKyB0aGlzLl9lYXNpbmcodHYpICogb3V0WzFdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9zZXRQb3NBbmRUcmlnZ2VyQ2hhbmdlKHBvcywgdHJ1ZSwgZSk7XG5cdH1cblxuXHQvLyBwYW5lbmQgZXZlbnQgaGFuZGxlclxuXHRfZW5kKGUpIHtcblx0XHRjb25zdCBwb3MgPSB0aGlzLmdldCgpO1xuXG5cdFx0aWYgKCF0aGlzLl9pc0ludGVycnVwdGluZygpIHx8ICF0aGlzLl9zdGF0dXMubW92ZURpc3RhbmNlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gQWJvcnQgdGhlIGFuaW1hdGluZyBwb3N0IHByb2Nlc3Mgd2hlbiBcInRhcFwiIG9jY3Vyc1xuXHRcdGlmIChlLmRpc3RhbmNlID09PSAwIC8qIGUudHlwZSA9PT0gXCJ0YXBcIiAqLykge1xuXHRcdFx0dGhpcy5fc2V0SW50ZXJydXB0KGZhbHNlKTtcblx0XHRcdHRoaXMudHJpZ2dlcihcInJlbGVhc2VcIiwge1xuXHRcdFx0XHRkZXBhUG9zOiBwb3MuY29uY2F0KCksXG5cdFx0XHRcdGRlc3RQb3M6IHBvcy5jb25jYXQoKSxcblx0XHRcdFx0aGFtbWVyRXZlbnQ6IGUgfHwgbnVsbFxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuX3N0YXR1cy5jdXJyZW50T3B0aW9ucy5kaXJlY3Rpb247XG5cdFx0XHRjb25zdCBzY2FsZSA9IHRoaXMuX3N0YXR1cy5jdXJyZW50T3B0aW9ucy5zY2FsZTtcblx0XHRcdGxldCB2WCA9IE1hdGguYWJzKGUudmVsb2NpdHlYKTtcblx0XHRcdGxldCB2WSA9IE1hdGguYWJzKGUudmVsb2NpdHlZKTtcblxuXHRcdFx0IShkaXJlY3Rpb24gJiBESVJFQ1RJT04uRElSRUNUSU9OX0hPUklaT05UQUwpICYmICh2WCA9IDApO1xuXHRcdFx0IShkaXJlY3Rpb24gJiBESVJFQ1RJT04uRElSRUNUSU9OX1ZFUlRJQ0FMKSAmJiAodlkgPSAwKTtcblxuXHRcdFx0Y29uc3Qgb2Zmc2V0ID0gQ29vcmRpbmF0ZS5nZXROZXh0T2Zmc2V0UG9zKFtcblx0XHRcdFx0dlggKiAoZS5kZWx0YVggPCAwID8gLTEgOiAxKSAqIHNjYWxlWzBdLFxuXHRcdFx0XHR2WSAqIChlLmRlbHRhWSA8IDAgPyAtMSA6IDEpICogc2NhbGVbMV1cblx0XHRcdF0sIHRoaXMub3B0aW9ucy5kZWNlbGVyYXRpb24pO1xuXHRcdFx0bGV0IGRlc3RQb3MgPSBbcG9zWzBdICsgb2Zmc2V0WzBdLCBwb3NbMV0gKyBvZmZzZXRbMV1dO1xuXG5cdFx0XHRkZXN0UG9zID0gQ29vcmRpbmF0ZS5nZXRQb2ludE9mSW50ZXJzZWN0aW9uKHBvcywgZGVzdFBvcyxcblx0XHRcdFx0dGhpcy5vcHRpb25zLm1pbiwgdGhpcy5vcHRpb25zLm1heCxcblx0XHRcdFx0dGhpcy5vcHRpb25zLmNpcmN1bGFyLCB0aGlzLm9wdGlvbnMuYm91bmNlKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIGEgdXNlciByZWxlYXNlIGFuIGVsZW1lbnQgb24gdGhlIHNjcmVlbiBvZiB0aGUgZGV2aWNlLlxuXHRcdFx0ICogQGtvIOyCrOyaqeyekOqwgCDquLDquLDsnZgg7ZmU66m07JeQ7IScIOyGkOydhCDrl5DsnYQg65WMIOuwnOyDne2VmOuKlCDsnbTrsqTtirhcblx0XHRcdCAqIEBuYW1lIGVnLk1vdmFibGVDb29yZCNyZWxlYXNlXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gcGFyYW0gVGhlIG9iamVjdCBvZiBkYXRhIHRvIGJlIHNlbnQgd2hlbiB0aGUgZXZlbnQgaXMgZmlyZWQ8a28+7J2067Kk7Yq46rCAIOuwnOyDne2VoCDrlYwg7KCE64us65CY64qUIOuNsOydtO2EsCDqsJ3ssrQ8L2tvPlxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gcGFyYW0uZGVwYVBvcyBUaGUgY29vcmRpbmF0ZXMgd2hlbiByZWxlYXNpbmcgYW4gZWxlbWVudDxrbz7shpDsnYQg65eQ7J2EIOuVjOydmCDsooztkZztmITsnqwgPC9rbz5cblx0XHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBwYXJhbS5kZXBhUG9zLjAgVGhlIFggY29vcmRpbmF0ZSA8a28+IHgg7KKM7ZGcPC9rbz5cblx0XHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBwYXJhbS5kZXBhUG9zLjEgVGhlIFkgY29vcmRpbmF0ZSA8a28+IHkg7KKM7ZGcPC9rbz5cblx0XHRcdCAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtLmRlc3RQb3MgVGhlIGNvb3JkaW5hdGVzIHRvIG1vdmUgdG8gYWZ0ZXIgcmVsZWFzaW5nIGFuIGVsZW1lbnQ8a28+7IaQ7J2EIOuXgCDrkqTsl5Ag7J2064+Z7ZWgIOyijO2RnDwva28+XG5cdFx0XHQgKiBAcGFyYW0ge051bWJlcn0gcGFyYW0uZGVzdFBvcy4wIFRoZSBYIGNvb3JkaW5hdGUgPGtvPngg7KKM7ZGcPC9rbz5cblx0XHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBwYXJhbS5kZXN0UG9zLjEgVGhlIFkgY29vcmRpbmF0ZSA8a28+eSDsooztkZw8L2tvPlxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IHBhcmFtLmhhbW1lckV2ZW50IFRoZSBldmVudCBpbmZvcm1hdGlvbiBvZiBIYW1tZXIuSlMuIEl0IHJldHVybnMgbnVsbCBpZiB0aGUgZXZlbnQgaXMgZmlyZWQgdGhyb3VnaCBhIGNhbGwgdG8gdGhlIHNldFRvKCkgb3Igc2V0QnkoKSBtZXRob2QuPGtvPkhhbW1lci5KU+ydmCDsnbTrsqTtirgg7KCV67O0LiBzZXRUbygpIOuplOyEnOuTnOuCmCBzZXRCeSgpIOuplOyEnOuTnOulvCDtmLjstpztlbQg7J2067Kk7Yq46rCAIOuwnOyDne2WiOydhCDrlYzripQgJ251bGwn7J2EIOuwmO2ZmO2VnOuLpDwva28+XG5cdFx0XHQgKlxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJyZWxlYXNlXCIsIHtcblx0XHRcdFx0ZGVwYVBvczogcG9zLmNvbmNhdCgpLFxuXHRcdFx0XHRkZXN0UG9zLFxuXHRcdFx0XHRoYW1tZXJFdmVudDogZSB8fCBudWxsXG5cdFx0XHR9KTtcblx0XHRcdGlmIChwb3NbMF0gIT09IGRlc3RQb3NbMF0gfHwgcG9zWzFdICE9PSBkZXN0UG9zWzFdKSB7XG5cdFx0XHRcdHRoaXMuX2FuaW1hdGVUbyhkZXN0UG9zLCBudWxsLCBlIHx8IG51bGwpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fc2V0SW50ZXJydXB0KGZhbHNlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fc3RhdHVzLm1vdmVEaXN0YW5jZSA9IG51bGw7XG5cdH1cblxuXHRfaXNJbnRlcnJ1cHRpbmcoKSB7XG5cdFx0Ly8gd2hlbiBpbnRlcnJ1cHRhYmxlIGlzICd0cnVlJywgcmV0dXJuIHZhbHVlIGlzIGFsd2F5cyAndHJ1ZScuXG5cdFx0cmV0dXJuIHRoaXMuX3N0YXR1cy5jdXJyZW50T3B0aW9ucy5pbnRlcnJ1cHRhYmxlIHx8IHRoaXMuX3N0YXR1cy5wcmV2ZW50ZWQ7XG5cdH1cblxuXHRfc2V0SW50ZXJydXB0KHByZXZlbnRlZCkge1xuXHRcdCF0aGlzLl9zdGF0dXMuY3VycmVudE9wdGlvbnMuaW50ZXJydXB0YWJsZSAmJlxuXHRcdCh0aGlzLl9zdGF0dXMucHJldmVudGVkID0gcHJldmVudGVkKTtcblx0fVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldmVudEhhbmRsZXIuanMiLCJpbXBvcnQgSGFtbWVyIGZyb20gXCJoYW1tZXJqc1wiO1xuaW1wb3J0IHt1dGlsc30gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7RElSRUNUSU9OLCBVTklRVUVLRVksIFNVUFBPUlRfVE9VQ0h9IGZyb20gXCIuL2NvbnN0c1wiO1xuXG5pZiAodHlwZW9mIEhhbW1lciA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHR0aHJvdyBuZXcgRXJyb3IoYFRoZSBIYW1tZXJqcyBtdXN0IGJlIGxvYWRlZCBiZWZvcmUgZWcuTW92YWJsZUNvb3JkLlxcbmh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vYCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhbW1lck1hbmFnZXIge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLl9oYW1tZXJzID0ge307XG5cdH1cblxuXHRfY3JlYXRlSGFtbWVyKGVsLCBiaW5kT3B0aW9ucywgaW5wdXRDbGFzcywgaGFuZGxlcikge1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBjcmVhdGUgSGFtbWVyXG5cdFx0XHRyZXR1cm4gdGhpcy5fYXR0YWNoSGFtbWVyRXZlbnRzKG5ldyBIYW1tZXIuTWFuYWdlcihlbCwge1xuXHRcdFx0XHRyZWNvZ25pemVyczogW1xuXHRcdFx0XHRcdFtcblx0XHRcdFx0XHRcdEhhbW1lci5QYW4sIHtcblx0XHRcdFx0XHRcdFx0ZGlyZWN0aW9uOiBiaW5kT3B0aW9ucy5kaXJlY3Rpb24sXG5cdFx0XHRcdFx0XHRcdHRocmVzaG9sZDogMFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0XSxcblxuXHRcdFx0XHQvLyBjc3MgcHJvcGVydGllcyB3ZXJlIHJlbW92ZWQgZHVlIHRvIHVzYWJsaWxpdHkgaXNzdWVcblx0XHRcdFx0Ly8gaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby9qc2RvYy9IYW1tZXIuZGVmYXVsdHMuY3NzUHJvcHMuaHRtbFxuXHRcdFx0XHRjc3NQcm9wczoge1xuXHRcdFx0XHRcdHVzZXJTZWxlY3Q6IFwibm9uZVwiLFxuXHRcdFx0XHRcdHRvdWNoU2VsZWN0OiBcIm5vbmVcIixcblx0XHRcdFx0XHR0b3VjaENhbGxvdXQ6IFwibm9uZVwiLFxuXHRcdFx0XHRcdHVzZXJEcmFnOiBcIm5vbmVcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHRpbnB1dENsYXNzXG5cdFx0XHR9KSwgYmluZE9wdGlvbnMsIGhhbmRsZXIpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdGFkZChlbGVtZW50LCBvcHRpb25zLCBoYW5kbGVyKSB7XG5cdFx0Y29uc3QgZWwgPSB1dGlscy5nZXRFbGVtZW50KGVsZW1lbnQpO1xuXHRcdGxldCBrZXlWYWx1ZSA9IGVsLmdldEF0dHJpYnV0ZShVTklRVUVLRVkpO1xuXHRcdGNvbnN0IGJpbmRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0XHRkaXJlY3Rpb246IERJUkVDVElPTi5ESVJFQ1RJT05fQUxMLFxuXHRcdFx0c2NhbGU6IFsxLCAxXSxcblx0XHRcdHRocmVzaG9sZEFuZ2xlOiA0NSxcblx0XHRcdGludGVycnVwdGFibGU6IHRydWUsXG5cdFx0XHRpbnB1dFR5cGU6IFtcInRvdWNoXCIsIFwibW91c2VcIl1cblx0XHR9LCBvcHRpb25zKTtcblx0XHRjb25zdCBpbnB1dENsYXNzID0gdGhpcy5jb252ZXJ0SW5wdXRUeXBlKGJpbmRPcHRpb25zLmlucHV0VHlwZSk7XG5cblx0XHRpZiAoIWlucHV0Q2xhc3MpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoa2V5VmFsdWUpIHtcblx0XHRcdHRoaXMuX2hhbW1lcnNba2V5VmFsdWVdLmhhbW1lci5kZXN0cm95KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGtleVZhbHVlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogbmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuXHRcdH1cblx0XHR0aGlzLl9oYW1tZXJzW2tleVZhbHVlXSA9IHtcblx0XHRcdGhhbW1lcjogdGhpcy5fY3JlYXRlSGFtbWVyKFxuXHRcdFx0XHRlbCxcblx0XHRcdFx0YmluZE9wdGlvbnMsXG5cdFx0XHRcdGlucHV0Q2xhc3MsXG5cdFx0XHRcdGhhbmRsZXJcblx0XHRcdCksXG5cdFx0XHRlbCxcblx0XHRcdG9wdGlvbnM6IGJpbmRPcHRpb25zXG5cdFx0fTtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoVU5JUVVFS0VZLCBrZXlWYWx1ZSk7XG5cdH1cblxuXHRyZW1vdmUoZWxlbWVudCkge1xuXHRcdGNvbnN0IGVsID0gdXRpbHMuZ2V0RWxlbWVudChlbGVtZW50KTtcblx0XHRjb25zdCBrZXkgPSBlbC5nZXRBdHRyaWJ1dGUoVU5JUVVFS0VZKTtcblxuXHRcdGlmIChrZXkpIHtcblx0XHRcdHRoaXMuX2hhbW1lcnNba2V5XS5oYW1tZXIuZGVzdHJveSgpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuX2hhbW1lcnNba2V5XTtcblx0XHRcdGVsLnJlbW92ZUF0dHJpYnV0ZShVTklRVUVLRVkpO1xuXHRcdH1cblx0fVxuXG5cdGdldEhhbW1lcihlbGVtZW50KSB7XG5cdFx0Y29uc3QgZGF0YSA9IHRoaXMuZ2V0KGVsZW1lbnQpO1xuXG5cdFx0cmV0dXJuIGRhdGEgPyBkYXRhLmhhbW1lciA6IG51bGw7XG5cdH1cblxuXHRnZXQoZWxlbWVudCkge1xuXHRcdGNvbnN0IGVsID0gdXRpbHMuZ2V0RWxlbWVudChlbGVtZW50KTtcblx0XHRjb25zdCBrZXkgPSBlbCA/IGVsLmdldEF0dHJpYnV0ZShVTklRVUVLRVkpIDogbnVsbDtcblxuXHRcdGlmIChrZXkgJiYgdGhpcy5faGFtbWVyc1trZXldKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5faGFtbWVyc1trZXldO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRfYXR0YWNoSGFtbWVyRXZlbnRzKGhhbW1lciwgb3B0aW9ucywgaGFuZGxlcikge1xuXHRcdGNvbnN0IGVuYWJsZSA9IGhhbW1lci5nZXQoXCJwYW5cIikub3B0aW9ucy5lbmFibGU7XG5cblx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuXHRcdHJldHVybiBoYW1tZXJcblx0XHRcdC5vbihcImhhbW1lci5pbnB1dFwiLCBlID0+IHtcblx0XHRcdFx0aWYgKGUuaXNGaXJzdCkge1xuXHRcdFx0XHRcdC8vIGFwcGx5IG9wdGlvbnMgZWFjaFxuXHRcdFx0XHRcdGhhbmRsZXIuX3NldEN1cnJlbnRUYXJnZXQoaGFtbWVyLCBvcHRpb25zKTtcblx0XHRcdFx0XHRlbmFibGUgJiYgaGFuZGxlci5fc3RhcnQoZSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZS5pc0ZpbmFsKSB7XG5cdFx0XHRcdFx0Ly8gc3Vic3RpdHV0ZSAub24oXCJwYW5lbmQgdGFwXCIsIHRoaXMuX3BhbmVuZCk7IEJlY2F1c2UgaXQodGFwLCBwYW5lbmQpIGNhbm5vdCBjYXRjaCB2ZXJ0aWNhbChob3Jpem9udGFsKSBtb3ZlbWVudCBvbiBIT1JJWk9OVEFMKFZFUlRJQ0FMKSBtb2RlLlxuXHRcdFx0XHRcdGVuYWJsZSAmJiBoYW5kbGVyLl9lbmQoZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pLm9uKFwicGFuc3RhcnQgcGFubW92ZVwiLCBlID0+IGhhbmRsZXIuX21vdmUoZSkpO1xuXHRcdC8qIGVzbGludC1lbmFibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cblx0fVxuXG5cdF9kZXRhY2hIYW1tZXJFdmVudHMoaGFtbWVyKSB7XG5cdFx0aGFtbWVyLm9mZihcImhhbW1lci5pbnB1dCBwYW5zdGFydCBwYW5tb3ZlIHBhbmVuZFwiKTtcblx0fVxuXG5cdGNvbnZlcnRJbnB1dFR5cGUoaW5wdXRUeXBlID0gW10pIHtcblx0XHRsZXQgaGFzVG91Y2ggPSBmYWxzZTtcblx0XHRsZXQgaGFzTW91c2UgPSBmYWxzZTtcblx0XHRjb25zdCBpbnB1dHMgPSBpbnB1dFR5cGUgfHwgW107XG5cblx0XHRpbnB1dHMuZm9yRWFjaCh2ID0+IHtcblx0XHRcdHN3aXRjaCAodikge1xuXHRcdFx0XHRjYXNlIFwibW91c2VcIiA6IGhhc01vdXNlID0gdHJ1ZTsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJ0b3VjaFwiIDogaGFzVG91Y2ggPSBTVVBQT1JUX1RPVUNIO1xuXHRcdFx0XHQvLyBubyBkZWZhdWx0XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIChoYXNUb3VjaCAmJiBIYW1tZXIuVG91Y2hJbnB1dCkgfHxcblx0XHRcdChoYXNNb3VzZSAmJiBIYW1tZXIuTW91c2VJbnB1dCkgfHwgbnVsbDtcblx0fVxuXG5cdGlucHV0Q29udHJvbChpc0VuYWJsZSwgZWxlbWVudCkge1xuXHRcdGNvbnN0IG9wdGlvbiA9IHtcblx0XHRcdGVuYWJsZTogaXNFbmFibGVcblx0XHR9O1xuXG5cdFx0aWYgKGVsZW1lbnQpIHtcblx0XHRcdGNvbnN0IGhhbW1lciA9IHRoaXMuZ2V0SGFtbWVyKGVsZW1lbnQpO1xuXG5cdFx0XHRoYW1tZXIgJiYgaGFtbWVyLmdldChcInBhblwiKS5zZXQob3B0aW9uKTtcblx0XHR9IGVsc2UgeyAvLyBmb3IgbXVsdGlcblx0XHRcdGZvciAoY29uc3QgcCBpbiB0aGlzLl9oYW1tZXJzKSB7XG5cdFx0XHRcdHRoaXMuX2hhbW1lcnNbcF0uaGFtbWVyLmdldChcInBhblwiKS5zZXQob3B0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRkZXN0cm95KCkge1xuXHRcdGZvciAoY29uc3QgcCBpbiB0aGlzLl9oYW1tZXJzKSB7XG5cdFx0XHR0aGlzLl9oYW1tZXJzW3BdLmhhbW1lci5kZXN0cm95KCk7XG5cdFx0XHR0aGlzLl9oYW1tZXJzW3BdLmVsLnJlbW92ZUF0dHJpYnV0ZShVTklRVUVLRVkpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuX2hhbW1lcnNbcF07XG5cdFx0fVxuXHRcdHRoaXMuX2hhbW1lcnMgPSB7fTtcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2hhbW1lck1hbmFnZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOF9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJAZWdqcy9jb21wb25lbnRcIixcImNvbW1vbmpzMlwiOlwiQGVnanMvY29tcG9uZW50XCIsXCJhbWRcIjpcIkBlZ2pzL2NvbXBvbmVudFwiLFwicm9vdFwiOltcImVnXCIsXCJDb21wb25lbnRcIl19XG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwiaGFtbWVyanNcIixcImNvbW1vbmpzMlwiOlwiaGFtbWVyanNcIixcImFtZFwiOlwiaGFtbWVyanNcIixcInJvb3RcIjpcIkhhbW1lclwifVxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCBNb3ZhYmxlQ29vcmQgZnJvbSBcIi4vbW92YWJsZUNvb3JkXCI7XG5cbm1vZHVsZS5leHBvcnRzID0gTW92YWJsZUNvb3JkO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==
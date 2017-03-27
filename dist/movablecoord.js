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
})(this, function(__WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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

var _component = __webpack_require__(9);

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
				prevented: false };
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

var _hammerjs = __webpack_require__(10);

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

	HammerManager.createHammer = function createHammer(el, bindOptions, inputClass, handler) {
		try {
			// create Hammer
			return HammerManager.attachHammerEvents(new _hammerjs2.default.Manager(el, {
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

	HammerManager.attachHammerEvents = function attachHammerEvents(hammer, options, handler) {
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

	HammerManager.detachHammerEvents = function detachHammerEvents(hammer) {
		hammer.off("hammer.input panstart panmove panend");
	};

	HammerManager.convertInputType = function convertInputType() {
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
			hammer: HammerManager.createHammer(el, bindOptions, inputClass, handler),
			el: el,
			options: bindOptions
		};
		el.setAttribute(_consts.UNIQUEKEY, keyValue);
	};

	HammerManager.prototype.remove = function remove(element) {
		var el = _utils.utils.getElement(element);
		var key = el.getAttribute(_consts.UNIQUEKEY);

		if (key) {
			var hammer = this._hammers[key].hammer;

			HammerManager.detachHammerEvents(hammer);
			hammer.destroy();
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
			this.remove(this._hammers[p].el);
		}
		this._hammers = {};
	};

	return HammerManager;
}();

exports.default = HammerManager;
module.exports = exports["default"];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _movableCoord = __webpack_require__(4);

var _movableCoord2 = _interopRequireDefault(_movableCoord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _movableCoord2.default;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhMzM0Yzg0NmU2NDdhZmNmM2U0ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RzLmpzIiwid2VicGFjazovLy8uL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb29yZGluYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92YWJsZUNvb3JkLmpzIiwid2VicGFjazovLy8uL3NyYy9hbmltYXRpb25IYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9ldmVudEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hhbW1lck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiQGVnanMvY29tcG9uZW50XCIsXCJjb21tb25qczJcIjpcIkBlZ2pzL2NvbXBvbmVudFwiLFwiYW1kXCI6XCJAZWdqcy9jb21wb25lbnRcIixcInJvb3RcIjpbXCJlZ1wiLFwiQ29tcG9uZW50XCJdfSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImhhbW1lcmpzXCIsXCJjb21tb25qczJcIjpcImhhbW1lcmpzXCIsXCJhbWRcIjpcImhhbW1lcmpzXCIsXCJyb290XCI6XCJIYW1tZXJcIn0iXSwibmFtZXMiOlsiZGlyZWN0aW9uIiwiRElSRUNUSU9OX05PTkUiLCJESVJFQ1RJT05fTEVGVCIsIkRJUkVDVElPTl9SSUdIVCIsIkRJUkVDVElPTl9VUCIsIkRJUkVDVElPTl9ET1dOIiwiRElSRUNUSU9OX0hPUklaT05UQUwiLCJESVJFQ1RJT05fVkVSVElDQUwiLCJESVJFQ1RJT05fQUxMIiwiRElSRUNUSU9OIiwiVU5JUVVFS0VZIiwiU1VQUE9SVF9UT1VDSCIsIndpbiIsIndpbmRvdyIsIk1hdGgiLCJzZWxmIiwiRnVuY3Rpb24iLCJkb2N1bWVudCIsIkNvb3JkaW5hdGUiLCJnZXREaXJlY3Rpb25CeUFuZ2xlIiwiYW5nbGUiLCJ0aHJlc2hvbGRBbmdsZSIsInRvQW5nbGUiLCJhYnMiLCJpc0hvcml6b250YWwiLCJ1c2VyRGlyZWN0aW9uIiwiaXNWZXJ0aWNhbCIsImdldFBvaW50T2ZJbnRlcnNlY3Rpb24iLCJkZXBhUG9zIiwiZGVzdFBvcyIsIm1pbiIsIm1heCIsImNpcmN1bGFyIiwiYm91bmNlIiwiYm94TFQiLCJib3hSQiIsInRvRGVzdFBvcyIsImNvbmNhdCIsInhkIiwieWQiLCJpc091dHNpZGUiLCJwb3MiLCJpc091dFRvT3V0IiwiZ2V0TmV4dE9mZnNldFBvcyIsInNwZWVkcyIsImRlY2VsZXJhdGlvbiIsIm5vcm1hbFNwZWVkIiwic3FydCIsImR1cmF0aW9uIiwiZ2V0RHVyYXRpb25Gcm9tUG9zIiwibm9ybWFsUG9zIiwiaXNDaXJjdWxhciIsImdldENpcmN1bGFyUG9zIiwidG9Qb3MiLCJ0b0ZpeGVkIiwidXRpbHMiLCJnZXRFbGVtZW50IiwiZWwiLCJxdWVyeVNlbGVjdG9yIiwialF1ZXJ5IiwibGVuZ3RoIiwiTWl4aW5CdWlsZGVyIiwic3VwZXJjbGFzcyIsIndpdGgiLCJtaXhpbnMiLCJyZWR1Y2UiLCJjIiwibSIsIk1peGluIiwiTW92YWJsZUNvb3JkIiwib3B0aW9ucyIsIk9iamVjdCIsImFzc2lnbiIsIm1hcmdpbiIsImVhc2luZyIsImVhc2VPdXRDdWJpYyIsIngiLCJwb3ciLCJtYXhpbXVtRHVyYXRpb24iLCJJbmZpbml0eSIsIl9yZXZpc2VPcHRpb25zIiwiX2hhbW1lck1hbmFnZXIiLCJfcG9zIiwiYmluZCIsImVsZW1lbnQiLCJhZGQiLCJ1bmJpbmQiLCJyZW1vdmUiLCJnZXRIYW1tZXIiLCJlbmFibGVJbnB1dCIsImlucHV0Q29udHJvbCIsImRpc2FibGVJbnB1dCIsImtleSIsImZvckVhY2giLCJ2IiwiY29uc3RydWN0b3IiLCJBcnJheSIsInRlc3QiLCJnZXQiLCJkZXN0cm95Iiwib2ZmIiwiVkVSU0lPTiIsIl9yYWYiLCJfYW5pbWF0ZVBhcmFtIiwiX2FuaW1hdGlvbkVuZCIsIl9yZXN0b3JlIiwiX2dyYWIiLCJ0cmlnZ2VyIiwib3JnUG9zIiwiX3NldFBvc0FuZFRyaWdnZXJDaGFuZ2UiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIl9wcmVwYXJlUGFyYW0iLCJhYnNQb3MiLCJoYW1tZXJFdmVudCIsImRpc3RhbmNlIiwibmV3RHVyYXRpb24iLCJpc0JvdW5jZSIsImRvbmUiLCJjb21wbGV0ZSIsIl9hbmltYXRlIiwibmV4dFBvcyIsInJvdW5kIiwic2V0VG8iLCJfc2V0SW50ZXJydXB0IiwicGFyYW0iLCJzdGFydFRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsImluZm8iLCJsb29wIiwiX2ZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiX2FuaW1hdGVUbyIsInJldFRyaWdnZXIiLCJFcnJvciIsInF1ZXVlIiwiZGVxdWV1ZSIsInRhc2siLCJzaGlmdCIsImNhbGwiLCJwdXNoIiwiY3VyVGltZSIsImVhc2luZ1BlciIsIl9lYXNpbmciLCJpIiwicG9zaXRpb24iLCJob2xkaW5nIiwiZSIsInAiLCJ5IiwidG9YIiwidG9ZIiwic2V0QnkiLCJfc3RhdHVzIiwiZ3JhYk91dHNpZGUiLCJjdXJyZW50SGFtbWVyIiwiY3VycmVudE9wdGlvbnMiLCJtb3ZlRGlzdGFuY2UiLCJwcmV2ZW50ZWQiLCJfc2V0Q3VycmVudFRhcmdldCIsImhhbW1lciIsImN1cnJlbnRIYW5tbWVyIiwiX3N0YXJ0IiwiaW50ZXJydXB0YWJsZSIsIl9tb3ZlIiwiX2lzSW50ZXJydXB0aW5nIiwic2NhbGUiLCJvdXQiLCJwcmV2ZW50IiwicHJldklucHV0Iiwic2Vzc2lvbiIsIm9mZnNldFgiLCJkZWx0YVgiLCJvZmZzZXRZIiwiZGVsdGFZIiwic3JjRXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnRTeXN0ZW1FdmVudCIsInR2IiwidG4iLCJ0eCIsImluaXRTbG9wZSIsIl9lbmQiLCJ2WCIsInZlbG9jaXR5WCIsInZZIiwidmVsb2NpdHlZIiwib2Zmc2V0IiwiSGFtbWVyTWFuYWdlciIsIl9oYW1tZXJzIiwiY3JlYXRlSGFtbWVyIiwiYmluZE9wdGlvbnMiLCJpbnB1dENsYXNzIiwiaGFuZGxlciIsImF0dGFjaEhhbW1lckV2ZW50cyIsIk1hbmFnZXIiLCJyZWNvZ25pemVycyIsIlBhbiIsInRocmVzaG9sZCIsImNzc1Byb3BzIiwidXNlclNlbGVjdCIsInRvdWNoU2VsZWN0IiwidG91Y2hDYWxsb3V0IiwidXNlckRyYWciLCJlbmFibGUiLCJvbiIsImlzRmlyc3QiLCJpc0ZpbmFsIiwiZGV0YWNoSGFtbWVyRXZlbnRzIiwiY29udmVydElucHV0VHlwZSIsImlucHV0VHlwZSIsImhhc1RvdWNoIiwiaGFzTW91c2UiLCJpbnB1dHMiLCJUb3VjaElucHV0IiwiTW91c2VJbnB1dCIsImtleVZhbHVlIiwiZ2V0QXR0cmlidXRlIiwicmFuZG9tIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiZGF0YSIsImlzRW5hYmxlIiwib3B0aW9uIiwic2V0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQixDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtB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LFNBQVMsS0FBS3hFLFNBQUwsQ0FBZUosT0FBZixDQUFmOztBQUVBNEUsYUFBVUEsT0FBTzlELEdBQVAsQ0FBVyxLQUFYLEVBQWtCK0gsR0FBbEIsQ0FBc0JELE1BQXRCLENBQVY7QUFDQSxHQUpELE1BSU87QUFBRTtBQUNSLFFBQUssSUFBTTVFLENBQVgsSUFBZ0IsS0FBSzBDLFFBQXJCLEVBQStCO0FBQzlCLFNBQUtBLFFBQUwsQ0FBYzFDLENBQWQsRUFBaUJZLE1BQWpCLENBQXdCOUQsR0FBeEIsQ0FBNEIsS0FBNUIsRUFBbUMrSCxHQUFuQyxDQUF1Q0QsTUFBdkM7QUFDQTtBQUNEO0FBQ0QsU0FBTyxJQUFQO0FBQ0EsRTs7eUJBRUQ3SCxPLHNCQUFVO0FBQ1QsT0FBSyxJQUFNaUQsQ0FBWCxJQUFnQixLQUFLMEMsUUFBckIsRUFBK0I7QUFDOUIsUUFBS3ZHLE1BQUwsQ0FBWSxLQUFLdUcsUUFBTCxDQUFjMUMsQ0FBZCxFQUFpQjNGLEVBQTdCO0FBQ0E7QUFDRCxPQUFLcUksUUFBTCxHQUFnQixFQUFoQjtBQUNBLEU7Ozs7O2tCQTlKbUJELGE7Ozs7Ozs7Ozs7QUNSckI7Ozs7OztBQUVBcUMsT0FBT0MsT0FBUCwwQjs7Ozs7O0FDRkEsK0M7Ozs7OztBQ0FBLGdEIiwiZmlsZSI6Im1vdmFibGVjb29yZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIkBlZ2pzL2NvbXBvbmVudFwiKSwgcmVxdWlyZShcImhhbW1lcmpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcIkBlZ2pzL2NvbXBvbmVudFwiLCBcImhhbW1lcmpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIk1vdmFibGVDb29yZFwiXSA9IGZhY3RvcnkocmVxdWlyZShcIkBlZ2pzL2NvbXBvbmVudFwiKSwgcmVxdWlyZShcImhhbW1lcmpzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJlZ1wiXSA9IHJvb3RbXCJlZ1wiXSB8fCB7fSwgcm9vdFtcImVnXCJdW1wiTW92YWJsZUNvb3JkXCJdID0gZmFjdG9yeShyb290W1wiZWdcIl1bXCJDb21wb25lbnRcIl0sIHJvb3RbXCJIYW1tZXJcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV85X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTBfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhMzM0Yzg0NmU2NDdhZmNmM2U0ZSIsImltcG9ydCB7d2luZG93fSBmcm9tIFwiLi9icm93c2VyXCI7XG5cbi8qKlxuICogQG5hbWUgZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9OT05FXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKi9cbi8qKlxuICogQG5hbWUgZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9MRUZUXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4qL1xuLyoqXG4gKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX1JJR0hUXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4qL1xuLyoqXG4gKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX1VQXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKi9cbi8qKlxuICogQG5hbWUgZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9ET1dOXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4qL1xuLyoqXG4gKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX0hPUklaT05UQUxcbiAqIEBjb25zdGFudFxuICogQHR5cGUge051bWJlcn1cbiovXG4vKipcbiAqIEBuYW1lIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fVkVSVElDQUxcbiAqIEBjb25zdGFudFxuICogQHR5cGUge051bWJlcn1cbiovXG4vKipcbiAqIEBuYW1lIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fQUxMXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4qL1xuY29uc3QgZGlyZWN0aW9uID0ge1xuXHRESVJFQ1RJT05fTk9ORTogMSxcblx0RElSRUNUSU9OX0xFRlQ6IDIsXG5cdERJUkVDVElPTl9SSUdIVDogNCxcblx0RElSRUNUSU9OX1VQOiA4LFxuXHRESVJFQ1RJT05fRE9XTjogMTYsXG5cdERJUkVDVElPTl9IT1JJWk9OVEFMOiAyIHwgNCxcblx0RElSRUNUSU9OX1ZFUlRJQ0FMOiA4IHwgMTYsXG59O1xuXG5kaXJlY3Rpb24uRElSRUNUSU9OX0FMTCA9IGRpcmVjdGlvbi5ESVJFQ1RJT05fSE9SSVpPTlRBTCB8XG5cdGRpcmVjdGlvbi5ESVJFQ1RJT05fVkVSVElDQUw7XG5leHBvcnQgY29uc3QgRElSRUNUSU9OID0gZGlyZWN0aW9uO1xuZXhwb3J0IGNvbnN0IFVOSVFVRUtFWSA9IFwiX19NT1ZBQkxFQ09PUkRfX1wiO1xuZXhwb3J0IGNvbnN0IFNVUFBPUlRfVE9VQ0ggPSBcIm9udG91Y2hzdGFydFwiIGluIHdpbmRvdztcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnN0cy5qcyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jLCBuby1uZXN0ZWQtdGVybmFyeSAqL1xuY29uc3Qgd2luID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuTWF0aCA9PT0gTWF0aCA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuTWF0aCA9PT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLW5ldy1mdW5jLCBuby1uZXN0ZWQtdGVybmFyeSAqL1xuXG5leHBvcnQge3dpbiBhcyB3aW5kb3d9O1xuZXhwb3J0IGNvbnN0IGRvY3VtZW50ID0gd2luLmRvY3VtZW50O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Jyb3dzZXIuanMiLCJpbXBvcnQge0RJUkVDVElPTn0gZnJvbSBcIi4vY29uc3RzXCI7XG5cbmNvbnN0IENvb3JkaW5hdGUgPSB7XG5cdC8vIGdldCB1c2VyJ3MgZGlyZWN0aW9uXG5cdGdldERpcmVjdGlvbkJ5QW5nbGUoYW5nbGUsIHRocmVzaG9sZEFuZ2xlKSB7XG5cdFx0aWYgKHRocmVzaG9sZEFuZ2xlIDwgMCB8fCB0aHJlc2hvbGRBbmdsZSA+IDkwKSB7XG5cdFx0XHRyZXR1cm4gRElSRUNUSU9OLkRJUkVDVElPTl9OT05FO1xuXHRcdH1cblx0XHRjb25zdCB0b0FuZ2xlID0gTWF0aC5hYnMoYW5nbGUpO1xuXG5cdFx0cmV0dXJuIHRvQW5nbGUgPiB0aHJlc2hvbGRBbmdsZSAmJiB0b0FuZ2xlIDwgMTgwIC0gdGhyZXNob2xkQW5nbGUgP1xuXHRcdFx0XHRESVJFQ1RJT04uRElSRUNUSU9OX1ZFUlRJQ0FMIDogRElSRUNUSU9OLkRJUkVDVElPTl9IT1JJWk9OVEFMO1xuXHR9LFxuXHRpc0hvcml6b250YWwoZGlyZWN0aW9uLCB1c2VyRGlyZWN0aW9uKSB7XG5cdFx0cmV0dXJuIGRpcmVjdGlvbiA9PT0gRElSRUNUSU9OLkRJUkVDVElPTl9BTEwgfHxcblx0XHRcdChkaXJlY3Rpb24gJiBESVJFQ1RJT04uRElSRUNUSU9OX0hPUklaT05UQUwgJiZcblx0XHRcdHVzZXJEaXJlY3Rpb24gJiBESVJFQ1RJT04uRElSRUNUSU9OX0hPUklaT05UQUwpO1xuXHR9LFxuXHRpc1ZlcnRpY2FsKGRpcmVjdGlvbiwgdXNlckRpcmVjdGlvbikge1xuXHRcdHJldHVybiBkaXJlY3Rpb24gPT09IERJUkVDVElPTi5ESVJFQ1RJT05fQUxMIHx8XG5cdFx0XHQoZGlyZWN0aW9uICYgRElSRUNUSU9OLkRJUkVDVElPTl9WRVJUSUNBTCAmJlxuXHRcdFx0dXNlckRpcmVjdGlvbiAmIERJUkVDVElPTi5ESVJFQ1RJT05fVkVSVElDQUwpO1xuXHR9LFxuXHRnZXRQb2ludE9mSW50ZXJzZWN0aW9uKGRlcGFQb3MsIGRlc3RQb3MsIG1pbiwgbWF4LCBjaXJjdWxhciwgYm91bmNlKSB7XG5cdFx0Y29uc3QgYm94TFQgPSBbbWluWzBdIC0gYm91bmNlWzNdLCBtaW5bMV0gLSBib3VuY2VbMF1dO1xuXHRcdGNvbnN0IGJveFJCID0gW21heFswXSArIGJvdW5jZVsxXSwgbWF4WzFdICsgYm91bmNlWzJdXTtcblx0XHRjb25zdCB0b0Rlc3RQb3MgPSBkZXN0UG9zLmNvbmNhdCgpO1xuXG5cdFx0Y29uc3QgeGQgPSBkZXN0UG9zWzBdIC0gZGVwYVBvc1swXTtcblx0XHRjb25zdCB5ZCA9IGRlc3RQb3NbMV0gLSBkZXBhUG9zWzFdO1xuXG5cdFx0aWYgKCFjaXJjdWxhclszXSkge1xuXHRcdFx0dG9EZXN0UG9zWzBdID0gTWF0aC5tYXgoYm94TFRbMF0sIHRvRGVzdFBvc1swXSk7XG5cdFx0fSAvLyBsZWZ0XG5cdFx0aWYgKCFjaXJjdWxhclsxXSkge1xuXHRcdFx0dG9EZXN0UG9zWzBdID0gTWF0aC5taW4oYm94UkJbMF0sIHRvRGVzdFBvc1swXSk7XG5cdFx0fSAvLyByaWdodFxuXHRcdHRvRGVzdFBvc1sxXSA9IHhkID8gZGVwYVBvc1sxXSArIHlkIC8geGQgKiAodG9EZXN0UG9zWzBdIC0gZGVwYVBvc1swXSkgOlxuXHRcdFx0XHRcdFx0dG9EZXN0UG9zWzFdO1xuXG5cdFx0aWYgKCFjaXJjdWxhclswXSkge1xuXHRcdFx0dG9EZXN0UG9zWzFdID0gTWF0aC5tYXgoYm94TFRbMV0sIHRvRGVzdFBvc1sxXSk7XG5cdFx0fSAvLyB1cFxuXHRcdGlmICghY2lyY3VsYXJbMl0pIHtcblx0XHRcdHRvRGVzdFBvc1sxXSA9IE1hdGgubWluKGJveFJCWzFdLCB0b0Rlc3RQb3NbMV0pO1xuXHRcdH0gLy8gZG93blxuXHRcdHRvRGVzdFBvc1swXSA9IHlkID8gZGVwYVBvc1swXSArIHhkIC8geWQgKiAodG9EZXN0UG9zWzFdIC0gZGVwYVBvc1sxXSkgOlxuXHRcdFx0XHRcdFx0dG9EZXN0UG9zWzBdO1xuXHRcdHJldHVybiBbXG5cdFx0XHRNYXRoLm1pbihtYXhbMF0sIE1hdGgubWF4KG1pblswXSwgdG9EZXN0UG9zWzBdKSksXG5cdFx0XHRNYXRoLm1pbihtYXhbMV0sIE1hdGgubWF4KG1pblsxXSwgdG9EZXN0UG9zWzFdKSksXG5cdFx0XTtcblx0fSxcblx0Ly8gZGV0ZXJtaW5lIG91dHNpZGVcblx0aXNPdXRzaWRlKHBvcywgbWluLCBtYXgpIHtcblx0XHRyZXR1cm4gcG9zWzBdIDwgbWluWzBdIHx8IHBvc1sxXSA8IG1pblsxXSB8fFxuXHRcdFx0cG9zWzBdID4gbWF4WzBdIHx8IHBvc1sxXSA+IG1heFsxXTtcblx0fSxcblx0Ly8gZnJvbSBvdXRzaWRlIHRvIG91dHNpZGVcblx0aXNPdXRUb091dChwb3MsIGRlc3RQb3MsIG1pbiwgbWF4KSB7XG5cdFx0cmV0dXJuIChwb3NbMF0gPCBtaW5bMF0gfHwgcG9zWzBdID4gbWF4WzBdIHx8XG5cdFx0XHRwb3NbMV0gPCBtaW5bMV0gfHwgcG9zWzFdID4gbWF4WzFdKSAmJlxuXHRcdFx0KGRlc3RQb3NbMF0gPCBtaW5bMF0gfHwgZGVzdFBvc1swXSA+IG1heFswXSB8fFxuXHRcdFx0ZGVzdFBvc1sxXSA8IG1pblsxXSB8fCBkZXN0UG9zWzFdID4gbWF4WzFdKTtcblx0fSxcblx0Z2V0TmV4dE9mZnNldFBvcyhzcGVlZHMsIGRlY2VsZXJhdGlvbikge1xuXHRcdGNvbnN0IG5vcm1hbFNwZWVkID0gTWF0aC5zcXJ0KFxuXHRcdFx0c3BlZWRzWzBdICogc3BlZWRzWzBdICsgc3BlZWRzWzFdICogc3BlZWRzWzFdLFxuXHRcdCk7XG5cdFx0Y29uc3QgZHVyYXRpb24gPSBNYXRoLmFicyhub3JtYWxTcGVlZCAvIC1kZWNlbGVyYXRpb24pO1xuXG5cdFx0cmV0dXJuIFtcblx0XHRcdHNwZWVkc1swXSAvIDIgKiBkdXJhdGlvbixcblx0XHRcdHNwZWVkc1sxXSAvIDIgKiBkdXJhdGlvbixcblx0XHRdO1xuXHR9LFxuXHRnZXREdXJhdGlvbkZyb21Qb3MocG9zLCBkZWNlbGVyYXRpb24pIHtcblx0XHRjb25zdCBub3JtYWxQb3MgPSBNYXRoLnNxcnQocG9zWzBdICogcG9zWzBdICsgcG9zWzFdICogcG9zWzFdKTtcblx0XHRjb25zdCBkdXJhdGlvbiA9IE1hdGguc3FydChcblx0XHRcdG5vcm1hbFBvcyAvIGRlY2VsZXJhdGlvbiAqIDIsXG5cdFx0KTtcblxuXHRcdC8vIHdoZW4gZHVyYXRpb24gaXMgdW5kZXIgMTAwLCB0aGVuIHZhbHVlIGlzIHplcm9cblx0XHRyZXR1cm4gZHVyYXRpb24gPCAxMDAgPyAwIDogZHVyYXRpb247XG5cdH0sXG5cdGlzQ2lyY3VsYXIoZGVzdFBvcywgbWluLCBtYXgsIGNpcmN1bGFyKSB7XG5cdFx0cmV0dXJuIChjaXJjdWxhclswXSAmJiBkZXN0UG9zWzFdIDwgbWluWzFdKSB8fFxuXHRcdFx0XHQoY2lyY3VsYXJbMV0gJiYgZGVzdFBvc1swXSA+IG1heFswXSkgfHxcblx0XHRcdFx0KGNpcmN1bGFyWzJdICYmIGRlc3RQb3NbMV0gPiBtYXhbMV0pIHx8XG5cdFx0XHRcdChjaXJjdWxhclszXSAmJiBkZXN0UG9zWzBdIDwgbWluWzBdKTtcblx0fSxcblx0Z2V0Q2lyY3VsYXJQb3MocG9zLCBtaW4sIG1heCwgY2lyY3VsYXIpIHtcblx0XHRjb25zdCB0b1BvcyA9IHBvcy5jb25jYXQoKTtcblxuXHRcdGlmIChjaXJjdWxhclswXSAmJiB0b1Bvc1sxXSA8IG1pblsxXSkgeyAvLyB1cFxuXHRcdFx0dG9Qb3NbMV0gPSAodG9Qb3NbMV0gLSBtaW5bMV0pICUgKG1heFsxXSAtIG1pblsxXSArIDEpICsgbWF4WzFdO1xuXHRcdH1cblx0XHRpZiAoY2lyY3VsYXJbMV0gJiYgdG9Qb3NbMF0gPiBtYXhbMF0pIHsgLy8gcmlnaHRcblx0XHRcdHRvUG9zWzBdID0gKHRvUG9zWzBdIC0gbWluWzBdKSAlIChtYXhbMF0gLSBtaW5bMF0gKyAxKSArIG1pblswXTtcblx0XHR9XG5cdFx0aWYgKGNpcmN1bGFyWzJdICYmIHRvUG9zWzFdID4gbWF4WzFdKSB7IC8vIGRvd25cblx0XHRcdHRvUG9zWzFdID0gKHRvUG9zWzFdIC0gbWluWzFdKSAlIChtYXhbMV0gLSBtaW5bMV0gKyAxKSArIG1pblsxXTtcblx0XHR9XG5cdFx0aWYgKGNpcmN1bGFyWzNdICYmIHRvUG9zWzBdIDwgbWluWzBdKSB7IC8vIGxlZnRcblx0XHRcdHRvUG9zWzBdID0gKHRvUG9zWzBdIC0gbWluWzBdKSAlIChtYXhbMF0gLSBtaW5bMF0gKyAxKSArIG1heFswXTtcblx0XHR9XG5cblx0XHR0b1Bvc1swXSA9ICt0b1Bvc1swXS50b0ZpeGVkKDUpO1xuXHRcdHRvUG9zWzFdID0gK3RvUG9zWzFdLnRvRml4ZWQoNSk7XG5cdFx0cmV0dXJuIHRvUG9zO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29vcmRpbmF0ZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb29yZGluYXRlLmpzIiwiaW1wb3J0IHt3aW5kb3csIGRvY3VtZW50fSBmcm9tIFwiLi9icm93c2VyXCI7XG5cbmNvbnN0IHV0aWxzID0ge1xuXHRnZXRFbGVtZW50KGVsKSB7XG5cdFx0aWYgKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuXHRcdH0gZWxzZSBpZiAod2luZG93LmpRdWVyeSAmJiAoZWwgaW5zdGFuY2VvZiBqUXVlcnkpKSB7XG5cdFx0XHQvLyBpZiB5b3Ugd2VyZSB1c2luZyBqUXVlcnlcblx0XHRcdHJldHVybiBlbC5sZW5ndGggPiAwID8gZWxbMF0gOiBudWxsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fVxuXHR9LFxufTtcblxuY2xhc3MgTWl4aW5CdWlsZGVyIHtcblx0Y29uc3RydWN0b3Ioc3VwZXJjbGFzcykge1xuXHRcdHRoaXMuc3VwZXJjbGFzcyA9IHN1cGVyY2xhc3MgfHwgY2xhc3Mge307XG5cdH1cblx0d2l0aCguLi5taXhpbnMpIHtcblx0XHRyZXR1cm4gbWl4aW5zLnJlZHVjZSgoYywgbSkgPT4gbShjKSwgdGhpcy5zdXBlcmNsYXNzKTtcblx0fVxufVxuXG5jb25zdCBNaXhpbiA9IHN1cGVyY2xhc3MgPT4gbmV3IE1peGluQnVpbGRlcihzdXBlcmNsYXNzKTtcblxuZXhwb3J0IHtNaXhpbiwgdXRpbHN9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzLmpzIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQGVnanMvY29tcG9uZW50XCI7XG5pbXBvcnQgSGFtbWVyTWFuYWdlciBmcm9tIFwiLi9oYW1tZXJNYW5hZ2VyXCI7XG5pbXBvcnQgRXZlbnRIYW5kbGVyIGZyb20gXCIuL2V2ZW50SGFuZGxlclwiO1xuaW1wb3J0IEFuaW1hdGlvbkhhbmRsZXIgZnJvbSBcIi4vYW5pbWF0aW9uSGFuZGxlclwiO1xuaW1wb3J0IHtESVJFQ1RJT059IGZyb20gXCIuL2NvbnN0c1wiO1xuaW1wb3J0IHtNaXhpbn0gZnJvbSBcIi4vdXRpbHNcIjtcblxuLyoqXG4gKiBBIG1vZHVsZSB1c2VkIHRvIGNoYW5nZSB0aGUgaW5mb3JtYXRpb24gb2YgdXNlciBhY3Rpb24gZW50ZXJlZCBieSB2YXJpb3VzIGlucHV0IGRldmljZXMgc3VjaCBhcyB0b3VjaCBzY3JlZW4gb3IgbW91c2UgaW50byBsb2dpY2FsIGNvb3JkaW5hdGVzIHdpdGhpbiB0aGUgdmlydHVhbCBjb29yZGluYXRlIHN5c3RlbS4gVGhlIGNvb3JkaW5hdGUgaW5mb3JtYXRpb24gc29ydGVkIGJ5IHRpbWUgZXZlbnRzIG9jY3VycmVkIGlzIHByb3ZpZGVkIGlmIGFuaW1hdGlvbnMgYXJlIG1hZGUgYnkgdXNlciBhY3Rpb25zLiBZb3UgY2FuIGltcGxlbWVudCBhIHVzZXIgaW50ZXJmYWNlIGJ5IGFwcGx5aW5nIHRoZSBsb2dpY2FsIGNvb3JkaW5hdGVzIHByb3ZpZGVkLiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiB0aGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZSwgc2VlIGRlbW9zLlxuICogQGtvIO2EsOy5mCDsnoXroKUg7J6l7LmY64KYIOuniOyasOyKpOyZgCDqsJnsnYAg64uk7JaR7ZWcIOyeheugpSDsnqXsuZjroZwg7KCE64usIOuwm+ydgCDsgqzsmqnsnpDsnZgg64+Z7J6R7J2EIOqwgOyDgSDsooztkZzqs4TsnZgg64W866as7KCBIOyijO2RnOuhnCDrs4Dqsr3tlZjripQg66qo65OILiDsgqzsmqnsnpDsnZgg64+Z7J6R7Jy866GcIOyVoOuLiOuplOydtOyFmOydtCDsnbzslrTrgpjrqbQg7Iuc6rCE7Iic7Jy866GcIOuzgOqyveuQmOuKlCDsooztkZwg7KCV67O064+EIOygnOqzte2VnOuLpC4g67OA6rK965CcIOuFvOumrOyggSDsooztkZzrpbwg67CY7JiB7ZW0IFVJ66W8IOq1rO2YhO2VoCDsiJgg7J6I64ukLiBlZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2YIOyekOyEuO2VnCDsnpHrj5kg67Cp7Iud7J2AIOuNsOuqqOulvCDssLjqs6DtlZzri6QuXG4gKiBAY2xhc3NcbiAqIEBuYW1lIGVnLk1vdmFibGVDb29yZFxuICogQGV4dGVuZHMgZWcuQ29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIG9wdGlvbiBvYmplY3Qgb2YgdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGU8a28+ZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydmCDsmLXshZgg6rCd7LK0PC9rbz5cbiAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMubWluIFRoZSBtaW5pbXVtIHZhbHVlIG9mIFggYW5kIFkgY29vcmRpbmF0ZXMgPGtvPuyijO2RnOqzhOydmCDstZzshp/qsJI8L2tvPlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1pbi4wPTBdIFRoZSBYIGNvb3JkaW5hdGUgb2YgdGhlIG1pbmltdW0gPGtvPuy1nOyGjCB47KKM7ZGcPC9rbz5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5taW4uMT0wXSBUaGUgWSBjb29yZGluYXRlIG9mIHRoZSBtaW5pbXVtIDxrbz7stZzshowgeeyijO2RnDwva28+XG4gKlxuICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5tYXggVGhlIG1heGltdW0gdmFsdWUgb2YgWCBhbmQgWSBjb29yZGluYXRlcyA8a28+7KKM7ZGc6rOE7J2YIOy1nOuMk+qwkjwva28+XG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4LjA9MTAwXSBUaGUgWCBjb29yZGluYXRlIG9mIHRoZSBtYXhpbXVtPGtvPuy1nOuMgCB47KKM7ZGcPC9rbz5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5tYXguMT0xMDBdIFRoZSBZIGNvb3JkaW5hdGUgb2YgdGhlIG1heGltdW08a28+7LWc64yAIHnsooztkZw8L2tvPlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuYm91bmNlIFRoZSBzaXplIG9mIGJvdW5jaW5nIGFyZWEuIFRoZSBjb29yZGluYXRlcyBjYW4gZXhjZWVkIHRoZSBjb29yZGluYXRlIGFyZWEgYXMgbXVjaCBhcyB0aGUgYm91bmNpbmcgYXJlYSBiYXNlZCBvbiB1c2VyIGFjdGlvbi4gSWYgdGhlIGNvb3JkaW5hdGVzIGRvZXMgbm90IGV4Y2VlZCB0aGUgYm91bmNpbmcgYXJlYSB3aGVuIGFuIGVsZW1lbnQgaXMgZHJhZ2dlZCwgdGhlIGNvb3JkaW5hdGVzIHdoZXJlIGJvdW5jaW5nIGVmZmVjdHMgYXJlIGFwcGxpZWQgYXJlIHJldHVuZWQgYmFjayBpbnRvIHRoZSBjb29yZGluYXRlIGFyZWE8a28+67CU7Jq07IqkIOyYgeyXreydmCDtgazquLAuIOyCrOyaqeyekOydmCDrj5nsnpHsl5Ag65Sw6528IOyijO2RnOqwgCDsooztkZwg7JiB7Jet7J2EIOuEmOyWtCDrsJTsmrTsiqQg7JiB7Jet7J2YIO2BrOq4sOunjO2BvCDrjZQg7J2064+Z7ZWgIOyImCDsnojri6QuIOyCrOyaqeyekOqwgCDrgYzslrTri6Qg64aT64qUIOuPmeyekeydhCDtlojsnYQg65WMIOyijO2RnOqwgCDrsJTsmrTsiqQg7JiB7Jet7JeQIOyeiOycvOuptCwg67CU7Jq07IqkIO2aqOqzvOqwgCDsoIHsmqnrkJwg7KKM7ZGc6rCAIOuLpOyLnCDsooztkZwg7JiB7JetIOyViOycvOuhnCDrk6TslrTsmKjri6Q8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ib3VuY2UuMD0xMF0gVGhlIHNpemUgb2YgdG9wIGFyZWEgPGtvPuychOyqvSDrsJTsmrTsiqQg7JiB7Jet7J2YIO2BrOq4sDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmJvdW5jZS4xPTEwXSBUaGUgc2l6ZSBvZiByaWdodCBhcmVhIDxrbz7smKTrpbjsqr0g67CU7Jq07IqkIOyYgeyXreydmCDtgazquLA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ib3VuY2UuMj0xMF0gVGhlIHNpemUgb2YgYm90dG9tIGFyZWEgPGtvPuyVhOuemOyqvSDrsJTsmrTsiqQg7JiB7Jet7J2YIO2BrOq4sDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmJvdW5jZS4zPTEwXSBUaGUgc2l6ZSBvZiBsZWZ0IGFyZWEgPGtvPuyZvOyqvSDrsJTsmrTsiqQg7JiB7Jet7J2YIO2BrOq4sDwva28+XG4gKlxuICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5tYXJnaW4gVGhlIHNpemUgb2YgYWNjZXNzaWJsZSBzcGFjZSBvdXRzaWRlIHRoZSBjb29yZGluYXRlIGFyZWEuIElmIGFuIGVsZW1lbnQgaXMgZHJhZ2dlZCBvdXRzaWRlIHRoZSBjb29yZGluYXRlIGFyZWEgYW5kIHRoZW4gZHJvcHBlZCwgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBlbGVtZW50IGFyZSByZXR1cm5lZCBiYWNrIGludG8gdGhlIGNvb3JkaW5hdGUgYXJlYS4gVGhlIHNpemUgb2YgbWFyZ2lucyB0aGF0IGNhbiBiZSBleGNlZWRlZCA8a28+4oiSXHTsooztkZwg7JiB7Jet7J2EIOuEmOyWtCDsnbTrj5ntlaAg7IiYIOyeiOuKlCDrsJTquaUg7JiB7Jet7J2YIO2BrOq4sC4g7IKs7Jqp7J6Q6rCAIOyijO2RnOulvCDrsJTquaUg7JiB7Jet6rmM7KeAIOuBjOyXiOuLpOqwgCDrhpPsnLzrqbQg7KKM7ZGc6rCAIOyijO2RnCDsmIHsl60g7JWI7Jy866GcIOuTpOyWtOyYqOuLpC48L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tYXJnaW4uMD0wXSBUaGUgc2l6ZSBvZiB0b3AgbWFyZ2luIDxrbz7snITsqr0g67CU6rmlIOyYgeyXreydmCDtgazquLA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tYXJnaW4uMT0wXSBUaGUgc2l6ZSBvZiByaWdodCBtYXJnaW4gPGtvPuyYpOuluOyqvSDrsJTquaUg7JiB7Jet7J2YIO2BrOq4sDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1hcmdpbi4yPTBdIFRoZSBzaXplIG9mIGJvdHRvbSBtYXJnaW4gPGtvPuyVhOuemOyqvSDrsJTquaUg7JiB7Jet7J2YIO2BrOq4sDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1hcmdpbi4zPTBdIFRoZSBzaXplIG9mIGxlZnQgbWFyZ2luIDxrbz7smbzsqr0g67CU6rmlIOyYgeyXreydmCDtgazquLA8L2tvPlxuICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5jaXJjdWxhciBJbmRpY2F0ZXMgd2hldGhlciBhIGNpcmN1bGFyIGVsZW1lbnQgaXMgYXZhaWxhYmxlLiBJZiBpdCBpcyBzZXQgdG8gXCJ0cnVlXCIgYW5kIGFuIGVsZW1lbnQgaXMgZHJhZ2dlZCBvdXRzaWRlIHRoZSBjb29yZGluYXRlIGFyZWEsIHRoZSBlbGVtZW50IHdpbGwgYXBwZWFyIG9uIHRoZSBvdGhlciBzaWRlLjxrbz7siJztmZgg7Jes67aALiAndHJ1ZSfroZwg7ISk7KCV7ZWcIOuwqe2WpeydmCDsooztkZwg7JiB7JetIOuwluycvOuhnCDsl5jrpqzrqLztirjqsIAg7J2064+Z7ZWY66m0IOuwmOuMgCDrsKntlqXsl5DshJwg7JeY66as66i87Yq46rCAIOuCmO2DgOuCnOuLpDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNpcmN1bGFyLjA9ZmFsc2VdIEluZGljYXRlcyB3aGV0aGVyIHRvIGNpcmN1bGF0ZSB0byB0b3AgPGtvPuychOuhnCDsiJztmZgg7Jes67aAPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2lyY3VsYXIuMT1mYWxzZV0gSW5kaWNhdGVzIHdoZXRoZXIgdG8gY2lyY3VsYXRlIHRvIHJpZ2h0IDxrbz7smKTrpbjsqr3snLzroZwg7Iic7ZmYIOyXrOu2gDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNpcmN1bGFyLjI9ZmFsc2VdIEluZGljYXRlcyB3aGV0aGVyIHRvIGNpcmN1bGF0ZSB0byBib3R0b20gIDxrbz7slYTrnpjroZwg7Iic7ZmYIOyXrOu2gDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNpcmN1bGFyLjM9ZmFsc2VdIEluZGljYXRlcyB3aGV0aGVyIHRvIGNpcmN1bGF0ZSB0byBsZWZ0ICA8a28+7Jm87Kq97Jy866GcIOyInO2ZmCDsl6zrtoA8L2tvPlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmVhc2luZz1lYXNpbmcuZWFzZU91dEN1YmljXSBUaGUgZWFzaW5nIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGFuIGFuaW1hdGlvbiA8a28+7JWg64uI66mU7J207IWY7JeQIOyggeyaqe2VoCBlYXNpbmcg7ZWo7IiYPC9rbz5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5tYXhpbXVtRHVyYXRpb249SW5maW5pdHldIE1heGltdW0gZHVyYXRpb24gb2YgdGhlIGFuaW1hdGlvbiA8a28+6rCA7IaN64+E7JeQIOydmO2VtCDslaDri4jrqZTsnbTshZjsnbQg64+Z7J6R7ZWgIOuVjOydmCDstZzrjIAg7KKM7ZGcIOydtOuPmSDsi5zqsIQ8L2tvPlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmRlY2VsZXJhdGlvbj0wLjAwMDZdIERlY2VsZXJhdGlvbiBvZiB0aGUgYW5pbWF0aW9uIHdoZXJlIGFjY2VsZXJhdGlvbiBpcyBtYW51YWxseSBlbmFibGVkIGJ5IHVzZXIuIEEgaGlnaGVyIHZhbHVlIGluZGljYXRlcyBzaG9ydGVyIHJ1bm5pbmcgdGltZS4gPGtvPuyCrOyaqeyekOydmCDrj5nsnpHsnLzroZwg6rCA7IaN64+E6rCAIOyggeyaqeuQnCDslaDri4jrqZTsnbTshZjsnZgg6rCQ7IaN64+ELiDqsJLsnbQg64aS7J2E7IiY66GdIOyVoOuLiOuplOydtOyFmCDsi6Ttlokg7Iuc6rCE7J20IOynp+yVhOynhOuLpDwva28+XG4gKiBAc2VlIEhhbW1lckpTIHtAbGluayBodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvfVxuICogQHNlZSDigKIgSGFtbWVyLkpTIGFwcGxpZXMgc3BlY2lmaWMgQ1NTIHByb3BlcnRpZXMgYnkgZGVmYXVsdCB3aGVuIGNyZWF0aW5nIGFuIGluc3RhbmNlIChTZWUge0BsaW5rIGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vanNkb2MvSGFtbWVyLmRlZmF1bHRzLmNzc1Byb3BzLmh0bWx9KS4gVGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUgcmVtb3ZlcyBhbGwgZGVmYXVsdCBDU1MgcHJvcGVydGllcyBwcm92aWRlZCBieSBIYW1tZXIuSlMgPGtvPkhhbW1lci5KU+uKlCDsnbjsiqTthLTsiqTrpbwg7IOd7ISx7ZWgIOuVjCDquLDrs7jsnLzroZwg7Yq57KCVIENTUyDsho3shLHsnYQg7KCB7Jqp7ZWc64ukKOywuOqzoDogQGxpbmt7aHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby9qc2RvYy9IYW1tZXIuZGVmYXVsdHMuY3NzUHJvcHMuaHRtbH0pLiDtirnsoJXtlZwg7IOB7Zmp7JeQ7ISc64qUIEhhbW1lci5KU+ydmCDsho3shLEg65WM66y47JeQIOyCrOyaqeyEseyXkCDrrLjsoJzqsIAg7J6I7J2EIOyImCDsnojri6QuIGVnLk1vdmFibGVDb29yZCDrqqjrk4jsnYAgSGFtbWVyLkpT7J2YIOq4sOuzuCBDU1Mg7IaN7ISx7J2EIOuqqOuRkCDsoJzqsbDtlojri6Q8L2tvPlxuICpcbiAqIEBjb2RlcGVuIHtcImlkXCI6XCJqUFBxZVJcIiwgXCJrb1wiOlwiTW92YWJsZUNvb3JkIEN1YmUg7JiI7KCcXCIsIFwiZW5cIjpcIk1vdmFibGVDb29yZCBDdWJlIGV4YW1wbGVcIiwgXCJjb2xsZWN0aW9uSWRcIjpcIkFLcGtHV1wiLCBcImhlaWdodFwiOiA0MDN9XG4gKlxuICogQHNlZSBFYXNpbmcgRnVuY3Rpb25zIENoZWF0IFNoZWV0IHtAbGluayBodHRwOi8vZWFzaW5ncy5uZXQvfVxuICogQHNlZSBJZiB5b3Ugd2FudCB0byB0cnkgYSBkaWZmZXJlbnQgZWFzaW5nIGZ1bmN0aW9uLCB1c2UgdGhlIGpRdWVyeSBlYXNpbmcgcGx1Z2luICh7QGxpbmsgaHR0cDovL2dzZ2QuY28udWsvc2FuZGJveC9qcXVlcnkvZWFzaW5nfSkgb3IgdGhlIGpRdWVyeSBVSSBlYXNpbmcgbGlicmFyeSAoe0BsaW5rIGh0dHBzOi8vanF1ZXJ5dWkuY29tL2Vhc2luZ30pIDxrbz7ri6TrpbggZWFzaW5nIO2VqOyImOulvCDsgqzsmqntlZjroKTrqbQgalF1ZXJ5IGVhc2luZyDtlIzrn6zqt7jsnbgoe0BsaW5rIGh0dHA6Ly9nc2dkLmNvLnVrL3NhbmRib3gvanF1ZXJ5L2Vhc2luZ30p7J2064KYLCBqUXVlcnkgVUkgZWFzaW5nIOudvOydtOu4jOufrOumrCh7QGxpbiBodHRwczovL2pxdWVyeXVpLmNvbS9lYXNpbmd9KeulvCDsgqzsmqntlZzri6Q8L2tvPlxuICpcbiAqIEBzdXBwb3J0IHtcImllXCI6IFwiMTArXCIsIFwiY2hcIiA6IFwibGF0ZXN0XCIsIFwiZmZcIiA6IFwibGF0ZXN0XCIsICBcInNmXCIgOiBcImxhdGVzdFwiLCBcImVkZ2VcIiA6IFwibGF0ZXN0XCIsIFwiaW9zXCIgOiBcIjcrXCIsIFwiYW5cIiA6IFwiMi4zKyAoZXhjZXB0IDMueClcIn1cbiAqL1xuY29uc3QgTW92YWJsZUNvb3JkID0gY2xhc3MgTW92YWJsZUNvb3JkXG5leHRlbmRzIE1peGluKENvbXBvbmVudCkud2l0aChFdmVudEhhbmRsZXIsIEFuaW1hdGlvbkhhbmRsZXIpIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKCk7XG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbnMgPSB7XG5cdFx0XHRtaW46IFswLCAwXSxcblx0XHRcdG1heDogWzEwMCwgMTAwXSxcblx0XHRcdGJvdW5jZTogWzEwLCAxMCwgMTAsIDEwXSxcblx0XHRcdG1hcmdpbjogWzAsIDAsIDAsIDBdLFxuXHRcdFx0Y2lyY3VsYXI6IFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG5cdFx0XHRlYXNpbmc6IGZ1bmN0aW9uIGVhc2VPdXRDdWJpYyh4KSB7XG5cdFx0XHRcdHJldHVybiAxIC0gTWF0aC5wb3coMSAtIHgsIDMpO1xuXHRcdFx0fSxcblx0XHRcdG1heGltdW1EdXJhdGlvbjogSW5maW5pdHksXG5cdFx0XHRkZWNlbGVyYXRpb246IDAuMDAwNixcblx0XHR9LCBvcHRpb25zKTtcblx0XHR0aGlzLl9yZXZpc2VPcHRpb25zKCk7XG5cdFx0dGhpcy5faGFtbWVyTWFuYWdlciA9IG5ldyBIYW1tZXJNYW5hZ2VyKCk7XG5cdFx0dGhpcy5fcG9zID0gdGhpcy5vcHRpb25zLm1pbi5jb25jYXQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZWdpc3RlcnMgYW4gZWxlbWVudCB0byB1c2UgdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUuXG5cdCAqIEBrbyBlZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2EIOyCrOyaqe2VoCDsl5jrpqzrqLztirjrpbwg65Ox66Gd7ZWc64ukXG5cdCAqIEBtZXRob2QgZWcuTW92YWJsZUNvb3JkI2JpbmRcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd8alF1ZXJ5fSBlbGVtZW50IEFuIGVsZW1lbnQgdG8gdXNlIHRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlPGtvPuKIklx0ZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydhCDsgqzsmqntlaAg7JeY66as66i87Yq4PC9rbz5cblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIG9wdGlvbiBvYmplY3Qgb2YgdGhlIGJpbmQoKSBtZXRob2QgPGtvPmJpbmQoKSDrqZTshJzrk5zsnZgg7Ji17IWYIOqwneyytDwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kaXJlY3Rpb249ZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9BTExdIENvb3JkaW5hdGUgZGlyZWN0aW9uIHRoYXQgYSB1c2VyIGNhbiBtb3ZlPGJyPi0gZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9BTEw6IEFsbCBkaXJlY3Rpb25zIGF2YWlsYWJsZS48YnI+LSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX0hPUklaT05UQUw6IEhvcml6b250YWwgZGlyZWN0aW9uIG9ubHkuPGJyPi0gZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9WRVJUSUNBTDogVmVydGljYWwgZGlyZWN0aW9uIG9ubHk8a28+7IKs7Jqp7J6Q7J2YIOuPmeyekeycvOuhnCDsm4Dsp4Hsnbwg7IiYIOyeiOuKlCDsooztkZzsnZgg67Cp7ZalLjxicj4tIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fQUxMOiDrqqjrk6Ag67Cp7Zal7Jy866GcIOybgOyngeydvCDsiJgg7J6I64ukLjxicj4tIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fSE9SSVpPTlRBTDog6rCA66GcIOuwqe2WpeycvOuhnOunjCDsm4Dsp4Hsnbwg7IiYIOyeiOuLpC48YnI+LSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX1ZFUlRJQ0FMOiDshLjroZwg67Cp7Zal7Jy866Gc66eMIOybgOyngeydvCDsiJgg7J6I64ukLjwva28+XG5cdCAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuc2NhbGUgQ29vcmRpbmF0ZSBzY2FsZSB0aGF0IGEgdXNlciBjYW4gbW92ZTxrbz7sgqzsmqnsnpDsnZgg64+Z7J6R7Jy866GcIOydtOuPme2VmOuKlCDsooztkZzsnZgg67Cw7JyoPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnNjYWxlLjA9MV0gWC1heGlzIHNjYWxlIDxrbz547LaVIOuwsOycqDwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zY2FsZS4xPTFdIFktYXhpcyBzY2FsZSA8a28+eey2lSDrsLDsnKg8L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMudGhyZXNob2xkQW5nbGU9NDVdIFRoZSB0aHJlc2hvbGQgdmFsdWUgdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXIgdXNlciBhY3Rpb24gaXMgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCAoMH45MCkgPGtvPuyCrOyaqeyekOydmCDrj5nsnpHsnbQg6rCA66GcIOuwqe2WpeyduOyngCDshLjroZwg67Cp7Zal7J247KeAIO2MkOuLqO2VmOuKlCDquLDspIAg6rCB64+EKDB+OTApPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmludGVycnVwdGFibGU9dHJ1ZV0gSW5kaWNhdGVzIHdoZXRoZXIgYW4gYW5pbWF0aW9uIGlzIGludGVycnVwdGlibGUuPGJyPi0gdHJ1ZTogSXQgY2FuIGJlIHBhdXNlZCBvciBzdG9wcGVkIGJ5IHVzZXIgYWN0aW9uIG9yIHRoZSBBUEkuPGJyPi0gZmFsc2U6IEl0IGNhbm5vdCBiZSBwYXVzZWQgb3Igc3RvcHBlZCBieSB1c2VyIGFjdGlvbiBvciB0aGUgQVBJIHdoaWxlIGl0IGlzIHJ1bm5pbmcuPGtvPuynhO2WiSDspJHsnbgg7JWg64uI66mU7J207IWYIOykkeyngCDqsIDriqUg7Jes67aALjxicj4tIHRydWU6IOyCrOyaqeyekOydmCDrj5nsnpHsnbTrgpggQVBJ66GcIOyVoOuLiOuplOydtOyFmOydhCDspJHsp4DtlaAg7IiYIOyeiOuLpC48YnI+LSBmYWxzZTog7JWg64uI66mU7J207IWY7J20IOynhO2WiSDspJHsnbwg65WM64qUIOyCrOyaqeyekOydmCDrj5nsnpHsnbTrgpggQVBJ6rCAIOyggeyaqeuQmOyngCDslYrripTri6Q8L2tvPlxuXHQgKiBAcGFyYW0ge0FycmF5fSBbb3B0aW9ucy5pbnB1dFR5cGVdIFR5cGVzIG9mIGlucHV0IGRldmljZXMuIChkZWZhdWx0OiBbXCJ0b3VjaFwiLCBcIm1vdXNlXCJdKTxicj4tIHRvdWNoOiBUb3VjaCBzY3JlZW48YnI+LSBtb3VzZTogTW91c2UgPGtvPuyeheugpSDsnqXsuZgg7KKF66WYLijquLDrs7jqsJI6IFtcInRvdWNoXCIsIFwibW91c2VcIl0pPGJyPi0gdG91Y2g6IO2EsOy5mCDsnoXroKUg7J6l7LmYPGJyPi0gbW91c2U6IOuniOyasOyKpDwva28+XG5cdCAqXG5cdCAqIEByZXR1cm4ge2VnLk1vdmFibGVDb29yZH0gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmIDxrbz7rqqjrk4gg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqL1xuXHRiaW5kKGVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHR0aGlzLl9oYW1tZXJNYW5hZ2VyLmFkZChlbGVtZW50LCBvcHRpb25zLCB0aGlzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHQvKipcblx0ICogRGV0YWNoZXMgYW4gZWxlbWVudCB1c2luZyB0aGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZS5cblx0ICogQGtvIGVnLk1vdmFibGVDb29yZCDrqqjrk4jsnYQg7IKs7Jqp7ZWY64qUIOyXmOumrOuovO2KuOulvCDtlbTsoJztlZzri6Rcblx0ICogQG1ldGhvZCBlZy5Nb3ZhYmxlQ29vcmQjdW5iaW5kXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8U3RyaW5nfGpRdWVyeX0gZWxlbWVudCBBbiBlbGVtZW50IGZyb20gd2hpY2ggdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUgaXMgZGV0YWNoZWQ8a28+ZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydhCDtlbTsoJztlaAg7JeY66as66i87Yq4PC9rbz5cblx0ICogQHJldHVybiB7ZWcuTW92YWJsZUNvb3JkfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGY8a28+66qo65OIIOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKi9cblx0dW5iaW5kKGVsZW1lbnQpIHtcblx0XHR0aGlzLl9oYW1tZXJNYW5hZ2VyLnJlbW92ZShlbGVtZW50KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBnZXQgYSBoYW1tZXIgaW5zdGFuY2UgZnJvbSBlbGVtZW50cyB1c2luZyB0aGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZS5cblx0ICogQGtvIGVnLk1vdmFibGVDb29yZCDrqqjrk4jsnYQg7IKs7Jqp7ZWY64qUIOyXmOumrOuovO2KuOyXkOyEnCBoYW1tZXIg6rCd7LK066W8IOyWu+uKlOuLpFxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNnZXRIYW1tZXJcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd8alF1ZXJ5fSBlbGVtZW50IEFuIGVsZW1lbnQgZnJvbSB3aGljaCB0aGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZSBpcyB1c2luZzxrbz5lZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2EIOyCrOyaqe2VmOuKlCDsl5jrpqzrqLztirg8L2tvPlxuXHQgKiBAcmV0dXJuIHtIYW1tZXJ8bnVsbH0gQW4gaW5zdGFuY2Ugb2YgSGFtbWVyLkpTPGtvPkhhbW1lci5KU+ydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKi9cblx0Z2V0SGFtbWVyKGVsZW1lbnQpIHtcblx0XHRyZXR1cm4gdGhpcy5faGFtbWVyTWFuYWdlci5nZXRIYW1tZXIoZWxlbWVudCk7XG5cdH1cblxuXHQvKipcblx0ICogRW5hYmxlcyBpbnB1dCBkZXZpY2VzXG5cdCAqIEBrbyDsnoXroKUg7J6l7LmY66W8IOyCrOyaqe2VoCDsiJgg7J6I6rKMIO2VnOuLpFxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNlbmFibGVJbnB1dFxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ3xqUXVlcnl9IFtlbGVtZW50XSBBbiBlbGVtZW50IGZyb20gd2hpY2ggdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUgaXMgdXNpbmcgKGlmIHRoZSBlbGVtZW50IHBhcmFtZXRlciBpcyBub3QgcHJlc2VudCwgaXQgYXBwbGllcyB0byBhbGwgYmluZGVkIGVsZW1lbnRzKTxrbz5lZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2EIFx07IKs7Jqp7ZWY64qUIOyXmOumrOuovO2KuCAoZWxlbWVudCDtjIzrnbzrr7jthLDqsIAg7KG07J6s7ZWY7KeAIOyViuydhCDqsr3smrAsIOuwlOyduOuTnOuQnCDrqqjrk6Ag7JeY66as66i87Yq47JeQIOyggeyaqeuQnOuLpCk8L2tvPlxuXHQgKiBAcmV0dXJuIHtlZy5Nb3ZhYmxlQ29vcmR9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZiA8a28+7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCovXG5cdGVuYWJsZUlucHV0KGVsZW1lbnQpIHtcblx0XHRyZXR1cm4gdGhpcy5faGFtbWVyTWFuYWdlci5pbnB1dENvbnRyb2wodHJ1ZSwgZWxlbWVudCk7XG5cdH1cblxuXHQvKipcblx0ICogRGlzYWJsZXMgaW5wdXQgZGV2aWNlc1xuXHQgKiBAa28g7J6F66ClIOyepey5mOulvCDsgqzsmqntlaAg7IiYIOyXhuqyjCDtlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuTW92YWJsZUNvb3JkI2Rpc2FibGVJbnB1dFxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ3xqUXVlcnl9IFtlbGVtZW50XSBBbiBlbGVtZW50IGZyb20gd2hpY2ggdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUgaXMgdXNpbmcgKGlmIHRoZSBlbGVtZW50IHBhcmFtZXRlciBpcyBub3QgcHJlc2VudCwgaXQgYXBwbGllcyB0byBhbGwgYmluZGVkIGVsZW1lbnRzKTw8a28+ZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydhCBcdOyCrOyaqe2VmOuKlCDsl5jrpqzrqLztirggKGVsZW1lbnQg7YyM652866+47YSw6rCAIOyhtOyerO2VmOyngCDslYrsnYQg6rK97JqwLCDrsJTsnbjrk5zrkJwg66qo65OgIOyXmOumrOuovO2KuOyXkCDsoIHsmqnrkJzri6QpPC9rbz5cblx0ICogQHJldHVybiB7ZWcuTW92YWJsZUNvb3JkfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGYgPGtvPuyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKi9cblx0ZGlzYWJsZUlucHV0KGVsZW1lbnQpIHtcblx0XHRyZXR1cm4gdGhpcy5faGFtbWVyTWFuYWdlci5pbnB1dENvbnRyb2woZmFsc2UsIGVsZW1lbnQpO1xuXHR9XG5cblx0Ly8gc2V0IHVwICdjc3MnIGV4cHJlc3Npb25cblx0X3JldmlzZU9wdGlvbnMoKSB7XG5cdFx0bGV0IGtleTtcblxuXHRcdFtcImJvdW5jZVwiLCBcIm1hcmdpblwiLCBcImNpcmN1bGFyXCJdLmZvckVhY2godiA9PiB7XG5cdFx0XHRrZXkgPSB0aGlzLm9wdGlvbnNbdl07XG5cdFx0XHRpZiAoa2V5ICE9IG51bGwpIHtcblx0XHRcdFx0aWYgKGtleS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcblx0XHRcdFx0XHR0aGlzLm9wdGlvbnNbdl0gPSBrZXkubGVuZ3RoID09PSAyID9cblx0XHRcdFx0XHRcdGtleS5jb25jYXQoa2V5KSA6IGtleS5jb25jYXQoKTtcblx0XHRcdFx0fSBlbHNlIGlmICgvc3RyaW5nfG51bWJlcnxib29sZWFuLy50ZXN0KHR5cGVvZiBrZXkpKSB7XG5cdFx0XHRcdFx0dGhpcy5vcHRpb25zW3ZdID0gW2tleSwga2V5LCBrZXksIGtleV07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5vcHRpb25zW3ZdID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIGxvZ2ljYWwgY29vcmRpbmF0ZXMuXG5cdCAqIEBrbyDrhbzrpqzsoIEg7KKM7ZGc7J2YIO2YhOyerCDsnITsuZjrpbwg67CY7ZmY7ZWc64ukXG5cdCAqIEBtZXRob2QgZWcuTW92YWJsZUNvb3JkI2dldFxuXHQgKiBAcmV0dXJuIHtBcnJheX0gcG9zIDxrbz7sooztkZw8L2tvPlxuXHQgKiBAcmV0dXJuIHtOdW1iZXJ9IHBvcy4wIFRoZSBYIGNvb3JkaW5hdGUgPGtvPngg7KKM7ZGcPC9rbz5cblx0ICogQHJldHVybiB7TnVtYmVyfSBwb3MuMSBUaGUgWSBjb29yZGluYXRlIDxrbz55IOyijO2RnDwva28+XG5cdCAqL1xuXHRnZXQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3Bvcy5jb25jYXQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXN0cm95cyBlbGVtZW50cywgcHJvcGVydGllcywgYW5kIGV2ZW50cyB1c2VkIGluIGEgbW9kdWxlLlxuXHQgKiBAa28g66qo65OI7JeQIOyCrOyaqe2VnCDsl5jrpqzrqLztirjsmYAg7IaN7ISxLCDsnbTrsqTtirjrpbwg7ZW07KCc7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNkZXN0cm95XG5cdCAqL1xuXHRkZXN0cm95KCkge1xuXHRcdHRoaXMub2ZmKCk7XG5cdFx0dGhpcy5faGFtbWVyTWFuYWdlci5kZXN0cm95KCk7XG5cdH1cbn07XG5cbk9iamVjdC5hc3NpZ24oTW92YWJsZUNvb3JkLCBESVJFQ1RJT04pO1xuTW92YWJsZUNvb3JkLlZFUlNJT04gPSBcIjIuMC4wLWJldGFcIjtcbmV4cG9ydCBkZWZhdWx0IE1vdmFibGVDb29yZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb3ZhYmxlQ29vcmQuanMiLCJpbXBvcnQgQ29vcmRpbmF0ZSBmcm9tIFwiLi9jb29yZGluYXRlXCI7XG5pbXBvcnQge3dpbmRvd30gZnJvbSBcIi4vYnJvd3NlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBzdXBlcmNsYXNzID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5fcmFmID0gbnVsbDtcblx0XHR0aGlzLl9hbmltYXRlUGFyYW0gPSBudWxsO1xuXHRcdHRoaXMuX2FuaW1hdGlvbkVuZCA9IHRoaXMuX2FuaW1hdGlvbkVuZC5iaW5kKHRoaXMpO1x0Ly8gZm9yIGNhY2hpbmdcblx0XHR0aGlzLl9yZXN0b3JlID0gdGhpcy5fcmVzdG9yZS5iaW5kKHRoaXMpO1x0Ly8gZm9yIGNhY2hpbmdcblx0fVxuXG5cdF9ncmFiKG1pbiwgbWF4LCBjaXJjdWxhcikge1xuXHRcdGlmICh0aGlzLl9hbmltYXRlUGFyYW0pIHtcblx0XHRcdHRoaXMudHJpZ2dlcihcImFuaW1hdGlvbkVuZFwiKTtcblx0XHRcdGNvbnN0IG9yZ1BvcyA9IHRoaXMuZ2V0KCk7XG5cblx0XHRcdGNvbnN0IHBvcyA9IENvb3JkaW5hdGUuZ2V0Q2lyY3VsYXJQb3ModGhpcy5nZXQoKSwgbWluLCBtYXgsIGNpcmN1bGFyKTtcblxuXHRcdFx0aWYgKHBvc1swXSAhPT0gb3JnUG9zWzBdIHx8IHBvc1sxXSAhPT0gb3JnUG9zWzFdKSB7XG5cdFx0XHRcdHRoaXMuX3NldFBvc0FuZFRyaWdnZXJDaGFuZ2UocG9zLCB0cnVlKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2FuaW1hdGVQYXJhbSA9IG51bGw7XG5cdFx0XHR0aGlzLl9yYWYgJiYgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX3JhZik7XG5cdFx0XHR0aGlzLl9yYWYgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdF9wcmVwYXJlUGFyYW0oYWJzUG9zLCBkdXJhdGlvbiwgaGFtbWVyRXZlbnQpIHtcblx0XHRjb25zdCBwb3MgPSB0aGlzLmdldCgpO1xuXHRcdGNvbnN0IG1pbiA9IHRoaXMub3B0aW9ucy5taW47XG5cdFx0Y29uc3QgbWF4ID0gdGhpcy5vcHRpb25zLm1heDtcblx0XHRjb25zdCBjaXJjdWxhciA9IHRoaXMub3B0aW9ucy5jaXJjdWxhcjtcblx0XHRjb25zdCBtYXhpbXVtRHVyYXRpb24gPSB0aGlzLm9wdGlvbnMubWF4aW11bUR1cmF0aW9uO1xuXHRcdGxldCBkZXN0UG9zID0gQ29vcmRpbmF0ZS5nZXRQb2ludE9mSW50ZXJzZWN0aW9uKFxuXHRcdFx0cG9zLCBhYnNQb3MsIG1pbiwgbWF4LCBjaXJjdWxhciwgdGhpcy5vcHRpb25zLmJvdW5jZSk7XG5cblx0XHRkZXN0UG9zID0gQ29vcmRpbmF0ZS5pc091dFRvT3V0KHBvcywgZGVzdFBvcywgbWluLCBtYXgpID8gcG9zIDogZGVzdFBvcztcblxuXHRcdGNvbnN0IGRpc3RhbmNlID0gW1xuXHRcdFx0TWF0aC5hYnMoZGVzdFBvc1swXSAtIHBvc1swXSksXG5cdFx0XHRNYXRoLmFicyhkZXN0UG9zWzFdIC0gcG9zWzFdKSxcblx0XHRdO1xuXHRcdGxldCBuZXdEdXJhdGlvbiA9IGR1cmF0aW9uID09IG51bGwgPyBDb29yZGluYXRlLmdldER1cmF0aW9uRnJvbVBvcyhcblx0XHRcdGRpc3RhbmNlLCB0aGlzLm9wdGlvbnMuZGVjZWxlcmF0aW9uKSA6IGR1cmF0aW9uO1xuXG5cdFx0bmV3RHVyYXRpb24gPSBtYXhpbXVtRHVyYXRpb24gPiBuZXdEdXJhdGlvbiA/IG5ld0R1cmF0aW9uIDogbWF4aW11bUR1cmF0aW9uO1xuXHRcdHJldHVybiB7XG5cdFx0XHRkZXBhUG9zOiBwb3MuY29uY2F0KCksXG5cdFx0XHRkZXN0UG9zOiBkZXN0UG9zLmNvbmNhdCgpLFxuXHRcdFx0aXNCb3VuY2U6IENvb3JkaW5hdGUuaXNPdXRzaWRlKGRlc3RQb3MsIG1pbiwgbWF4KSxcblx0XHRcdGlzQ2lyY3VsYXI6IENvb3JkaW5hdGUuaXNDaXJjdWxhcihhYnNQb3MsIG1pbiwgbWF4LCBjaXJjdWxhciksXG5cdFx0XHRkdXJhdGlvbjogbmV3RHVyYXRpb24sXG5cdFx0XHRkaXN0YW5jZSxcblx0XHRcdGhhbW1lckV2ZW50OiBoYW1tZXJFdmVudCB8fCBudWxsLFxuXHRcdFx0ZG9uZTogdGhpcy5fYW5pbWF0aW9uRW5kLFxuXHRcdH07XG5cdH1cblxuXHRfcmVzdG9yZShjb21wbGV0ZSwgaGFtbWVyRXZlbnQpIHtcblx0XHRjb25zdCBwb3MgPSB0aGlzLmdldCgpO1xuXHRcdGNvbnN0IG1pbiA9IHRoaXMub3B0aW9ucy5taW47XG5cdFx0Y29uc3QgbWF4ID0gdGhpcy5vcHRpb25zLm1heDtcblxuXHRcdHRoaXMuX2FuaW1hdGUodGhpcy5fcHJlcGFyZVBhcmFtKFtcblx0XHRcdE1hdGgubWluKG1heFswXSwgTWF0aC5tYXgobWluWzBdLCBwb3NbMF0pKSxcblx0XHRcdE1hdGgubWluKG1heFsxXSwgTWF0aC5tYXgobWluWzFdLCBwb3NbMV0pKSxcblx0XHRdLCBudWxsLCBoYW1tZXJFdmVudCksIGNvbXBsZXRlKTtcblx0fVxuXG5cdF9hbmltYXRpb25FbmQoKSB7XG5cdFx0dGhpcy5fYW5pbWF0ZVBhcmFtID0gbnVsbDtcblx0XHRjb25zdCBvcmdQb3MgPSB0aGlzLmdldCgpO1xuXHRcdGNvbnN0IG5leHRQb3MgPSBDb29yZGluYXRlLmdldENpcmN1bGFyUG9zKFtcblx0XHRcdE1hdGgucm91bmQob3JnUG9zWzBdKSxcblx0XHRcdE1hdGgucm91bmQob3JnUG9zWzFdKSxcblx0XHRdLCB0aGlzLm9wdGlvbnMubWluLCB0aGlzLm9wdGlvbnMubWF4LCB0aGlzLm9wdGlvbnMuY2lyY3VsYXIpO1xuXG5cdFx0dGhpcy5zZXRUbyguLi5uZXh0UG9zKTtcblx0XHR0aGlzLl9zZXRJbnRlcnJ1cHQoZmFsc2UpO1xuXHRcdC8qKlxuXHRcdCAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBhbmltYXRpb24gZW5kcy5cblx0XHQgKiBAa28g7JeQ64uI66mU7J207IWY7J20IOuBneuCrOydhCDrlYwg67Cc7IOd7ZWc64ukLlxuXHRcdCAqIEBuYW1lIGVnLk1vdmFibGVDb29yZCNhbmltYXRpb25FbmRcblx0XHQgKiBAZXZlbnRcblx0XHQgKi9cblx0XHR0aGlzLnRyaWdnZXIoXCJhbmltYXRpb25FbmRcIik7XG5cdH1cblxuXHRfYW5pbWF0ZShwYXJhbSwgY29tcGxldGUpIHtcblx0XHR0aGlzLl9hbmltYXRlUGFyYW0gPSBPYmplY3QuYXNzaWduKHt9LCBwYXJhbSk7XG5cdFx0dGhpcy5fYW5pbWF0ZVBhcmFtLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHRcdGlmIChwYXJhbS5kdXJhdGlvbikge1xuXHRcdFx0Y29uc3QgaW5mbyA9IHRoaXMuX2FuaW1hdGVQYXJhbTtcblx0XHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0XHQoZnVuY3Rpb24gbG9vcCgpIHtcblx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cblx0XHRcdFx0c2VsZi5fcmFmID0gbnVsbDtcblx0XHRcdFx0aWYgKHNlbGYuX2ZyYW1lKGluZm8pID49IDEpIHtcblx0XHRcdFx0XHQvLyBkZWZlcnJlZC5yZXNvbHZlKCk7XG5cdFx0XHRcdFx0Y29tcGxldGUoKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH0gLy8gYW5pbWF0aW9uRW5kXG5cdFx0XHRcdHNlbGYuX3JhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG5cdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cblx0XHRcdH0pKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3NldFBvc0FuZFRyaWdnZXJDaGFuZ2UocGFyYW0uZGVzdFBvcywgZmFsc2UpO1xuXHRcdFx0Y29tcGxldGUoKTtcblx0XHR9XG5cdH1cblxuXHRfYW5pbWF0ZVRvKGFic1BvcywgZHVyYXRpb24sIGhhbW1lckV2ZW50KSB7XG5cdFx0Y29uc3QgcGFyYW0gPSB0aGlzLl9wcmVwYXJlUGFyYW0oYWJzUG9zLCBkdXJhdGlvbiwgaGFtbWVyRXZlbnQpO1xuXHRcdGNvbnN0IHJldFRyaWdnZXIgPSB0aGlzLnRyaWdnZXIoXCJhbmltYXRpb25TdGFydFwiLCBwYXJhbSk7XG5cblx0XHQvLyBZb3UgY2FuJ3Qgc3RvcCB0aGUgJ2FuaW1hdGlvblN0YXJ0JyBldmVudCB3aGVuICdjaXJjdWxhcicgaXMgdHJ1ZS5cblx0XHRpZiAocGFyYW0uaXNDaXJjdWxhciAmJiAhcmV0VHJpZ2dlcikge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcIllvdSBjYW4ndCBzdG9wIHRoZSAnYW5pbWF0aW9uJyBldmVudCB3aGVuICdjaXJjdWxhcicgaXMgdHJ1ZS5cIixcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKHJldFRyaWdnZXIpIHtcblx0XHRcdGNvbnN0IHF1ZXVlID0gW107XG5cdFx0XHRjb25zdCBkZXF1ZXVlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNvbnN0IHRhc2sgPSBxdWV1ZS5zaGlmdCgpO1xuXG5cdFx0XHRcdHRhc2sgJiYgdGFzay5jYWxsKHRoaXMpO1xuXHRcdFx0fTtcblxuXHRcdFx0aWYgKHBhcmFtLmRlcGFQb3NbMF0gIT09IHBhcmFtLmRlc3RQb3NbMF0gfHxcblx0XHRcdFx0cGFyYW0uZGVwYVBvc1sxXSAhPT0gcGFyYW0uZGVzdFBvc1sxXSkge1xuXHRcdFx0XHRxdWV1ZS5wdXNoKCgpID0+IHRoaXMuX2FuaW1hdGUocGFyYW0sIGRlcXVldWUpKTtcblx0XHRcdH1cblx0XHRcdGlmIChDb29yZGluYXRlLmlzT3V0c2lkZShcblx0XHRcdFx0cGFyYW0uZGVzdFBvcywgdGhpcy5vcHRpb25zLm1pbiwgdGhpcy5vcHRpb25zLm1heCkpIHtcblx0XHRcdFx0cXVldWUucHVzaCgoKSA9PiB0aGlzLl9yZXN0b3JlKGRlcXVldWUsIGhhbW1lckV2ZW50KSk7XG5cdFx0XHR9XG5cdFx0XHRxdWV1ZS5wdXNoKCgpID0+IHRoaXMuX2FuaW1hdGlvbkVuZCgpKTtcblx0XHRcdGRlcXVldWUoKTtcblx0XHR9XG5cdH1cblxuXHQvLyBhbmltYXRpb24gZnJhbWUgKDB+MSlcblx0X2ZyYW1lKHBhcmFtKSB7XG5cdFx0Y29uc3QgY3VyVGltZSA9IG5ldyBEYXRlKCkgLSBwYXJhbS5zdGFydFRpbWU7XG5cdFx0Y29uc3QgZWFzaW5nUGVyID0gdGhpcy5fZWFzaW5nKGN1clRpbWUgLyBwYXJhbS5kdXJhdGlvbik7XG5cdFx0bGV0IHBvcyA9IFtwYXJhbS5kZXBhUG9zWzBdLCBwYXJhbS5kZXBhUG9zWzFdXTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgMjsgaSsrKSB7XG5cdFx0XHQocG9zW2ldICE9PSBwYXJhbS5kZXN0UG9zW2ldKSAmJlxuXHRcdFx0KHBvc1tpXSArPSAocGFyYW0uZGVzdFBvc1tpXSAtIHBvc1tpXSkgKiBlYXNpbmdQZXIpO1xuXHRcdH1cblx0XHRwb3MgPSBDb29yZGluYXRlLmdldENpcmN1bGFyUG9zKFxuXHRcdFx0cG9zLCB0aGlzLm9wdGlvbnMubWluLCB0aGlzLm9wdGlvbnMubWF4LCB0aGlzLm9wdGlvbnMuY2lyY3VsYXIpO1xuXHRcdHRoaXMuX3NldFBvc0FuZFRyaWdnZXJDaGFuZ2UocG9zLCBmYWxzZSk7XG5cdFx0cmV0dXJuIGVhc2luZ1Blcjtcblx0fVxuXG5cdC8vIHRyaWdnZXIgJ2NoYW5nZScgZXZlbnRcblx0X3NldFBvc0FuZFRyaWdnZXJDaGFuZ2UocG9zaXRpb24sIGhvbGRpbmcsIGUpIHtcblx0XHQvKipcblx0XHQgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gY29vcmRpbmF0ZSBjaGFuZ2VzLlxuXHRcdCAqIEBrbyDsooztkZzqsIAg67OA6rK965CQ7J2EIOuVjCDrsJzsg53tlZjripQg7J2067Kk7Yq4XG5cdFx0ICogQG5hbWUgZWcuTW92YWJsZUNvb3JkI2NoYW5nZVxuXHRcdCAqIEBldmVudFxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IHBhcmFtIFRoZSBvYmplY3Qgb2YgZGF0YSB0byBiZSBzZW50IHdoZW4gdGhlIGV2ZW50IGlzIGZpcmVkIDxrbz7snbTrsqTtirjqsIAg67Cc7IOd7ZWgIOuVjCDsoITri6zrkJjripQg642w7J207YSwIOqwneyytDwva28+XG5cdFx0ICogQHBhcmFtIHtBcnJheX0gcGFyYW0ucG9zaXRpb24gZGVwYXJ0dXJlIGNvb3JkaW5hdGUgIDxrbz7sooztkZw8L2tvPlxuXHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBwYXJhbS5wb3NpdGlvbi4wIFRoZSBYIGNvb3JkaW5hdGUgPGtvPngg7KKM7ZGcPC9rbz5cblx0XHQgKiBAcGFyYW0ge051bWJlcn0gcGFyYW0ucG9zLjEgVGhlIFkgY29vcmRpbmF0ZSA8a28+eSDsooztkZw8L2tvPlxuXHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gcGFyYW0uaG9sZGluZyBJbmRpY2F0ZXMgd2hldGhlciBhIHVzZXIgaG9sZHMgYW4gZWxlbWVudCBvbiB0aGUgc2NyZWVuIG9mIHRoZSBkZXZpY2UuPGtvPuyCrOyaqeyekOqwgCDquLDquLDsnZgg7ZmU66m07J2EIOuIhOultOqzoCDsnojripTsp4Ag7Jes67aAPC9rbz5cblx0XHQgKiBAcGFyYW0ge09iamVjdH0gcGFyYW0uaGFtbWVyRXZlbnQgVGhlIGV2ZW50IGluZm9ybWF0aW9uIG9mIEhhbW1lci5KUy4gSXQgcmV0dXJucyBudWxsIGlmIHRoZSBldmVudCBpcyBmaXJlZCB0aHJvdWdoIGEgY2FsbCB0byB0aGUgc2V0VG8oKSBvciBzZXRCeSgpIG1ldGhvZC48a28+SGFtbWVyLkpT7J2YIOydtOuypO2KuCDsoJXrs7QuIHNldFRvKCkg66mU7ISc65Oc64KYIHNldEJ5KCkg66mU7ISc65Oc66W8IO2YuOy2nO2VtCDsnbTrsqTtirjqsIAg67Cc7IOd7ZaI7J2EIOuVjOuKlCAnbnVsbCfsnYQg67CY7ZmY7ZWc64ukLjwva28+XG5cdFx0ICpcblx0XHQgKi9cblx0XHR0aGlzLl9wb3MgPSBwb3NpdGlvbi5jb25jYXQoKTtcblx0XHR0aGlzLnRyaWdnZXIoXCJjaGFuZ2VcIiwge1xuXHRcdFx0cG9zOiBwb3NpdGlvbi5jb25jYXQoKSxcblx0XHRcdGhvbGRpbmcsXG5cdFx0XHRoYW1tZXJFdmVudDogZSB8fCBudWxsLFxuXHRcdH0pO1xuXHR9XG5cblx0X2Vhc2luZyhwKSB7XG5cdFx0cmV0dXJuIHAgPiAxID8gMSA6IHRoaXMub3B0aW9ucy5lYXNpbmcocCk7XG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgYW4gZWxlbWVudCB0byBzcGVjaWZpYyBjb29yZGluYXRlcy5cblx0ICogQGtvIOyijO2RnOulvCDsnbTrj5ntlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuTW92YWJsZUNvb3JkI3NldFRvXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB4IFRoZSBYIGNvb3JkaW5hdGUgdG8gbW92ZSB0byA8a28+7J2064+Z7ZWgIHjsooztkZw8L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0geSBUaGUgWSBjb29yZGluYXRlIHRvIG1vdmUgdG8gIDxrbz7snbTrj5ntlaAgeeyijO2RnDwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbZHVyYXRpb249MF0gRHVyYXRpb24gb2YgdGhlIGFuaW1hdGlvbiAodW5pdDogbXMpIDxrbz7slaDri4jrqZTsnbTshZgg7KeE7ZaJIOyLnOqwhCjri6jsnIQ6IG1zKTwva28+XG5cdCAqIEByZXR1cm4ge2VnLk1vdmFibGVDb29yZH0gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmIDxrbz7snpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICovXG5cdHNldFRvKHgsIHksIGR1cmF0aW9uID0gMCkge1xuXHRcdGxldCB0b1ggPSB4O1xuXHRcdGxldCB0b1kgPSB5O1xuXHRcdGNvbnN0IG1pbiA9IHRoaXMub3B0aW9ucy5taW47XG5cdFx0Y29uc3QgbWF4ID0gdGhpcy5vcHRpb25zLm1heDtcblx0XHRjb25zdCBjaXJjdWxhciA9IHRoaXMub3B0aW9ucy5jaXJjdWxhcjtcblxuXHRcdHRoaXMuX2dyYWIobWluLCBtYXgsIGNpcmN1bGFyKTtcblx0XHRjb25zdCBwb3MgPSB0aGlzLmdldCgpO1xuXG5cdFx0aWYgKHggPT09IHBvc1swXSAmJiB5ID09PSBwb3NbMV0pIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHRoaXMuX3NldEludGVycnVwdCh0cnVlKTtcblx0XHRpZiAoeCAhPT0gcG9zWzBdKSB7XG5cdFx0XHRpZiAoIWNpcmN1bGFyWzNdKSB7XG5cdFx0XHRcdHRvWCA9IE1hdGgubWF4KG1pblswXSwgdG9YKTtcblx0XHRcdH1cblx0XHRcdGlmICghY2lyY3VsYXJbMV0pIHtcblx0XHRcdFx0dG9YID0gTWF0aC5taW4obWF4WzBdLCB0b1gpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoeSAhPT0gcG9zWzFdKSB7XG5cdFx0XHRpZiAoIWNpcmN1bGFyWzBdKSB7XG5cdFx0XHRcdHRvWSA9IE1hdGgubWF4KG1pblsxXSwgdG9ZKTtcblx0XHRcdH1cblx0XHRcdGlmICghY2lyY3VsYXJbMl0pIHtcblx0XHRcdFx0dG9ZID0gTWF0aC5taW4obWF4WzFdLCB0b1kpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoZHVyYXRpb24pIHtcblx0XHRcdHRoaXMuX2FuaW1hdGVUbyhbdG9YLCB0b1ldLCBkdXJhdGlvbik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3BvcyA9IENvb3JkaW5hdGUuZ2V0Q2lyY3VsYXJQb3MoW3RvWCwgdG9ZXSwgbWluLCBtYXgsIGNpcmN1bGFyKTtcblx0XHRcdHRoaXMuX3NldFBvc0FuZFRyaWdnZXJDaGFuZ2UodGhpcy5fcG9zLCBmYWxzZSk7XG5cdFx0XHR0aGlzLl9zZXRJbnRlcnJ1cHQoZmFsc2UpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIGN1cnJlbnQgY29vcmRpbmF0ZXMgdG8gc3BlY2lmaWMgY29vcmRpbmF0ZXMuIFRoZSBjaGFuZ2UgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgbWV0aG9kIGlzIGV4ZWN1dGVkLlxuXHQgKiBAa28g7ZiE7J6sIOyijO2RnOulvCDquLDspIDsnLzroZwg7KKM7ZGc66W8IOydtOuPme2VnOuLpC4g66mU7ISc65Oc6rCAIOyLpO2WieuQmOuptCBjaGFuZ2Ug7J2067Kk7Yq46rCAIOuwnOyDne2VnOuLpFxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNzZXRCeVxuXHQgKiBAcGFyYW0ge051bWJlcn0geCBUaGUgWCBjb29yZGluYXRlIHRvIG1vdmUgdG8gPGtvPuydtOuPme2VoCB47KKM7ZGcPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IHkgVGhlIFkgY29vcmRpbmF0ZSB0byBtb3ZlIHRvIDxrbz7snbTrj5ntlaAgeeyijO2RnDwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbZHVyYXRpb249MF0gRHVyYXRpb24gb2YgdGhlIGFuaW1hdGlvbiAodW5pdDogbXMpIDxrbz7slaDri4jrqZTsnbTshZgg7KeE7ZaJIOyLnOqwhCjri6jsnIQ6IG1zKTwva28+XG5cdCAqIEByZXR1cm4ge2VnLk1vdmFibGVDb29yZH0gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmIDxrbz7snpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICovXG5cdHNldEJ5KHgsIHksIGR1cmF0aW9uID0gMCkge1xuXHRcdHJldHVybiB0aGlzLnNldFRvKFxuXHRcdFx0eCAhPSBudWxsID8gdGhpcy5fcG9zWzBdICsgeCA6IHRoaXMuX3Bvc1swXSxcblx0XHRcdHkgIT0gbnVsbCA/IHRoaXMuX3Bvc1sxXSArIHkgOiB0aGlzLl9wb3NbMV0sXG5cdFx0XHRkdXJhdGlvbixcblx0XHQpO1xuXHR9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FuaW1hdGlvbkhhbmRsZXIuanMiLCJpbXBvcnQgQ29vcmRpbmF0ZSBmcm9tIFwiLi9jb29yZGluYXRlXCI7XG5pbXBvcnQge0RJUkVDVElPTn0gZnJvbSBcIi4vY29uc3RzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHN1cGVyY2xhc3MgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLl9zdGF0dXMgPSB7XG5cdFx0XHRncmFiT3V0c2lkZTogZmFsc2UsXHRcdC8vIGNoZWNrIHdoZXRoZXIgdXNlcidzIGFjdGlvbiBzdGFydGVkIG9uIG91dHNpZGVcblx0XHRcdGN1cnJlbnRIYW1tZXI6IG51bGwsXHRcdC8vIGN1cnJlbnQgaGFtbWVyIGluc3RhbmNlXG5cdFx0XHRjdXJyZW50T3B0aW9uczoge30sXHRcdC8vIGN1cnJlbnQgYmluZCBvcHRpb25zXG5cdFx0XHRtb3ZlRGlzdGFuY2U6IG51bGwsXHRcdC8vIGEgcG9zaXRpb24gb2YgdGhlIGZpcnN0IHVzZXIncyBhY3Rpb25cblx0XHRcdHByZXZlbnRlZDogZmFsc2UsXHRcdC8vICBjaGVjayB3aGV0aGVyIHRoZSBhbmltYXRpb24gZXZlbnQgd2FzIHByZXZlbnRlZFxuXHRcdH07XG5cdH1cblxuXHRfc2V0Q3VycmVudFRhcmdldChoYW1tZXIsIG9wdGlvbnMpIHtcblx0XHR0aGlzLl9zdGF0dXMuY3VycmVudE9wdGlvbnMgPSBvcHRpb25zO1xuXHRcdHRoaXMuX3N0YXR1cy5jdXJyZW50SGFubW1lciA9IGhhbW1lcjtcblx0fVxuXG5cdC8vIHBhbnN0YXJ0IGV2ZW50IGhhbmRsZXJcblx0X3N0YXJ0KGUpIHtcblx0XHRpZiAoIXRoaXMuX3N0YXR1cy5jdXJyZW50T3B0aW9ucy5pbnRlcnJ1cHRhYmxlICYmIHRoaXMuX3N0YXR1cy5wcmV2ZW50ZWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3QgcG9zID0gdGhpcy5nZXQoKTtcblx0XHRjb25zdCBtaW4gPSB0aGlzLm9wdGlvbnMubWluO1xuXHRcdGNvbnN0IG1heCA9IHRoaXMub3B0aW9ucy5tYXg7XG5cblx0XHR0aGlzLl9zZXRJbnRlcnJ1cHQodHJ1ZSk7XG5cdFx0dGhpcy5fZ3JhYihtaW4sIG1heCwgdGhpcy5vcHRpb25zLmNpcmN1bGFyKTtcblx0XHQvKipcblx0XHQgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gYSB1c2VyIGhvbGRzIGFuIGVsZW1lbnQgb24gdGhlIHNjcmVlbiBvZiB0aGUgZGV2aWNlLlxuXHRcdCAqIEBrbyDsgqzsmqnsnpDqsIAg6riw6riw7J2YIO2ZlOuptOyXkCDshpDsnYQg64yA6rOgIOyeiOydhCDrlYwg67Cc7IOd7ZWY64qUIOydtOuypO2KuFxuXHRcdCAqIEBuYW1lIGVnLk1vdmFibGVDb29yZCNob2xkXG5cdFx0ICogQGV2ZW50XG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IHBhcmFtIFRoZSBvYmplY3Qgb2YgZGF0YSB0byBiZSBzZW50IHdoZW4gdGhlIGV2ZW50IGlzIGZpcmVkPGtvPuydtOuypO2KuOqwgCDrsJzsg53tlaAg65WMIOyghOuLrOuQmOuKlCDrjbDsnbTthLAg6rCd7LK0PC9rbz5cblx0XHQgKiBAcGFyYW0ge0FycmF5fSBwYXJhbS5wb3MgY29vcmRpbmF0ZSA8a28+7KKM7ZGcIOygleuztDwva28+XG5cdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtLnBvcy4wIFRoZSBYIGNvb3JkaW5hdGU8a28+eCDsooztkZw8L2tvPlxuXHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBwYXJhbS5wb3MuMSBUaGUgWSBjb29yZGluYXRlPGtvPnkg7KKM7ZGcPC9rbz5cblx0XHQgKiBAcGFyYW0ge09iamVjdH0gcGFyYW0uaGFtbWVyRXZlbnQgVGhlIGV2ZW50IGluZm9ybWF0aW9uIG9mIEhhbW1lci5KUy4gSXQgcmV0dXJucyBudWxsIGlmIHRoZSBldmVudCBpcyBmaXJlZCB0aHJvdWdoIGEgY2FsbCB0byB0aGUgc2V0VG8oKSBvciBzZXRCeSgpIG1ldGhvZC48a28+SGFtbWVyLkpT7J2YIOydtOuypO2KuCDsoJXrs7QuIHNldFRvKCkg66mU7ISc65Oc64KYIHNldEJ5KCkg66mU7ISc65Oc66W8IO2YuOy2nO2VtCDsnbTrsqTtirjqsIAg67Cc7IOd7ZaI7J2EIOuVjOuKlCAnbnVsbCfsnYQg67CY7ZmY7ZWc64ukLjwva28+XG5cdFx0ICpcblx0XHQgKi9cblx0XHR0aGlzLnRyaWdnZXIoXCJob2xkXCIsIHtcblx0XHRcdHBvczogcG9zLmNvbmNhdCgpLFxuXHRcdFx0aGFtbWVyRXZlbnQ6IGUsXG5cdFx0fSk7XG5cblx0XHR0aGlzLl9zdGF0dXMubW92ZURpc3RhbmNlID0gcG9zLmNvbmNhdCgpO1xuXHRcdHRoaXMuX3N0YXR1cy5ncmFiT3V0c2lkZSA9IENvb3JkaW5hdGUuaXNPdXRzaWRlKHBvcywgbWluLCBtYXgpO1xuXHR9XG5cblx0Ly8gcGFubW92ZSBldmVudCBoYW5kbGVyXG5cdF9tb3ZlKGUpIHtcblx0XHRpZiAoIXRoaXMuX2lzSW50ZXJydXB0aW5nKCkgfHwgIXRoaXMuX3N0YXR1cy5tb3ZlRGlzdGFuY2UpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGV0IHBvcyA9IHRoaXMuZ2V0KHRydWUpO1xuXHRcdGNvbnN0IG1pbiA9IHRoaXMub3B0aW9ucy5taW47XG5cdFx0Y29uc3QgbWF4ID0gdGhpcy5vcHRpb25zLm1heDtcblx0XHRjb25zdCBib3VuY2UgPSB0aGlzLm9wdGlvbnMuYm91bmNlO1xuXHRcdGNvbnN0IG1hcmdpbiA9IHRoaXMub3B0aW9ucy5tYXJnaW47XG5cdFx0Y29uc3QgY3VycmVudE9wdGlvbnMgPSB0aGlzLl9zdGF0dXMuY3VycmVudE9wdGlvbnM7XG5cdFx0Y29uc3QgZGlyZWN0aW9uID0gY3VycmVudE9wdGlvbnMuZGlyZWN0aW9uO1xuXHRcdGNvbnN0IHNjYWxlID0gY3VycmVudE9wdGlvbnMuc2NhbGU7XG5cdFx0Y29uc3QgdXNlckRpcmVjdGlvbiA9IENvb3JkaW5hdGUuZ2V0RGlyZWN0aW9uQnlBbmdsZShcblx0XHRcdGUuYW5nbGUsIGN1cnJlbnRPcHRpb25zLnRocmVzaG9sZEFuZ2xlKTtcblx0XHRjb25zdCBvdXQgPSBbXG5cdFx0XHRtYXJnaW5bMF0gKyBib3VuY2VbMF0sXG5cdFx0XHRtYXJnaW5bMV0gKyBib3VuY2VbMV0sXG5cdFx0XHRtYXJnaW5bMl0gKyBib3VuY2VbMl0sXG5cdFx0XHRtYXJnaW5bM10gKyBib3VuY2VbM10sXG5cdFx0XTtcblx0XHRsZXQgcHJldmVudCA9IGZhbHNlO1xuXG5cdFx0Ly8gbm90IHN1cHBvcnQgb2Zmc2V0IHByb3BlcnRpZXMgaW4gSGFtbWVyanMgLSBzdGFydFxuXHRcdGNvbnN0IHByZXZJbnB1dCA9IHRoaXMuX3N0YXR1cy5jdXJyZW50SGFubW1lci5zZXNzaW9uLnByZXZJbnB1dDtcblxuXHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5cdFx0aWYgKHByZXZJbnB1dCkge1xuXHRcdFx0ZS5vZmZzZXRYID0gZS5kZWx0YVggLSBwcmV2SW5wdXQuZGVsdGFYO1xuXHRcdFx0ZS5vZmZzZXRZID0gZS5kZWx0YVkgLSBwcmV2SW5wdXQuZGVsdGFZO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlLm9mZnNldFggPSAwO1xuXHRcdFx0ZS5vZmZzZXRZID0gMDtcblx0XHR9XG5cblx0XHQvLyBub3Qgc3VwcG9ydCBvZmZzZXQgcHJvcGVydGllcyBpbiBIYW1tZXJqcyAtIGVuZFxuXHRcdGlmIChDb29yZGluYXRlLmlzSG9yaXpvbnRhbChkaXJlY3Rpb24sIHVzZXJEaXJlY3Rpb24pKSB7XG5cdFx0XHR0aGlzLl9zdGF0dXMubW92ZURpc3RhbmNlWzBdICs9IChlLm9mZnNldFggKiBzY2FsZVswXSk7XG5cdFx0XHRwcmV2ZW50ID0gdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKENvb3JkaW5hdGUuaXNWZXJ0aWNhbChkaXJlY3Rpb24sIHVzZXJEaXJlY3Rpb24pKSB7XG5cdFx0XHR0aGlzLl9zdGF0dXMubW92ZURpc3RhbmNlWzFdICs9IChlLm9mZnNldFkgKiBzY2FsZVsxXSk7XG5cdFx0XHRwcmV2ZW50ID0gdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKHByZXZlbnQpIHtcblx0XHRcdGUuc3JjRXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGUuc3JjRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fVxuXHRcdGUucHJldmVudFN5c3RlbUV2ZW50ID0gcHJldmVudDtcblx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5cblx0XHRwb3NbMF0gPSB0aGlzLl9zdGF0dXMubW92ZURpc3RhbmNlWzBdO1xuXHRcdHBvc1sxXSA9IHRoaXMuX3N0YXR1cy5tb3ZlRGlzdGFuY2VbMV07XG5cdFx0cG9zID0gQ29vcmRpbmF0ZS5nZXRDaXJjdWxhclBvcyhwb3MsIG1pbiwgbWF4LCB0aGlzLm9wdGlvbnMuY2lyY3VsYXIpO1xuXG5cdFx0Ly8gZnJvbSBvdXRzaWRlIHRvIGluc2lkZVxuXHRcdGlmICh0aGlzLl9zdGF0dXMuZ3JhYk91dHNpZGUgJiYgIUNvb3JkaW5hdGUuaXNPdXRzaWRlKHBvcywgbWluLCBtYXgpKSB7XG5cdFx0XHR0aGlzLl9zdGF0dXMuZ3JhYk91dHNpZGUgPSBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyB3aGVuIG1vdmUgcG9pbnRlciBpcyBoZWxkIGluIG91dHNpZGVcblx0XHRsZXQgdHY7XG5cdFx0bGV0IHRuO1xuXHRcdGxldCB0eDtcblxuXHRcdGlmICh0aGlzLl9zdGF0dXMuZ3JhYk91dHNpZGUpIHtcblx0XHRcdHRuID0gbWluWzBdIC0gb3V0WzNdO1xuXHRcdFx0dHggPSBtYXhbMF0gKyBvdXRbMV07XG5cdFx0XHR0diA9IHBvc1swXTtcblx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5cdFx0XHRwb3NbMF0gPSB0diA+IHR4ID8gdHggOiAodHYgPCB0biA/IHRuIDogdHYpO1xuXHRcdFx0dG4gPSBtaW5bMV0gLSBvdXRbMF07XG5cdFx0XHR0eCA9IG1heFsxXSArIG91dFsyXTtcblx0XHRcdHR2ID0gcG9zWzFdO1xuXHRcdFx0cG9zWzFdID0gdHYgPiB0eCA/IHR4IDogKHR2IDwgdG4gPyB0biA6IHR2KTtcblx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8tbmVzdGVkLXRlcm5hcnkgKi9cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gd2hlbiBzdGFydCBwb2ludGVyIGlzIGhlbGQgaW4gaW5zaWRlXG5cdFx0XHQvLyBnZXQgYSBpbml0aWFsaXphdGlvbiBzbG9wZSB2YWx1ZSB0byBwcmV2ZW50IHNtb290aCBhbmltYXRpb24uXG5cdFx0XHRjb25zdCBpbml0U2xvcGUgPSB0aGlzLl9lYXNpbmcoMC4wMDAwMSkgLyAwLjAwMDAxO1xuXG5cdFx0XHRpZiAocG9zWzFdIDwgbWluWzFdKSB7IC8vIHVwXG5cdFx0XHRcdHR2ID0gKG1pblsxXSAtIHBvc1sxXSkgLyAob3V0WzBdICogaW5pdFNsb3BlKTtcblx0XHRcdFx0cG9zWzFdID0gbWluWzFdIC0gdGhpcy5fZWFzaW5nKHR2KSAqIG91dFswXTtcblx0XHRcdH0gZWxzZSBpZiAocG9zWzFdID4gbWF4WzFdKSB7IC8vIGRvd25cblx0XHRcdFx0dHYgPSAocG9zWzFdIC0gbWF4WzFdKSAvIChvdXRbMl0gKiBpbml0U2xvcGUpO1xuXHRcdFx0XHRwb3NbMV0gPSBtYXhbMV0gKyB0aGlzLl9lYXNpbmcodHYpICogb3V0WzJdO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBvc1swXSA8IG1pblswXSkgeyAvLyBsZWZ0XG5cdFx0XHRcdHR2ID0gKG1pblswXSAtIHBvc1swXSkgLyAob3V0WzNdICogaW5pdFNsb3BlKTtcblx0XHRcdFx0cG9zWzBdID0gbWluWzBdIC0gdGhpcy5fZWFzaW5nKHR2KSAqIG91dFszXTtcblx0XHRcdH0gZWxzZSBpZiAocG9zWzBdID4gbWF4WzBdKSB7IC8vIHJpZ2h0XG5cdFx0XHRcdHR2ID0gKHBvc1swXSAtIG1heFswXSkgLyAob3V0WzFdICogaW5pdFNsb3BlKTtcblx0XHRcdFx0cG9zWzBdID0gbWF4WzBdICsgdGhpcy5fZWFzaW5nKHR2KSAqIG91dFsxXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fc2V0UG9zQW5kVHJpZ2dlckNoYW5nZShwb3MsIHRydWUsIGUpO1xuXHR9XG5cblx0Ly8gcGFuZW5kIGV2ZW50IGhhbmRsZXJcblx0X2VuZChlKSB7XG5cdFx0Y29uc3QgcG9zID0gdGhpcy5nZXQoKTtcblxuXHRcdGlmICghdGhpcy5faXNJbnRlcnJ1cHRpbmcoKSB8fCAhdGhpcy5fc3RhdHVzLm1vdmVEaXN0YW5jZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIEFib3J0IHRoZSBhbmltYXRpbmcgcG9zdCBwcm9jZXNzIHdoZW4gXCJ0YXBcIiBvY2N1cnNcblx0XHRpZiAoZS5kaXN0YW5jZSA9PT0gMCAvKiBlLnR5cGUgPT09IFwidGFwXCIgKi8pIHtcblx0XHRcdHRoaXMuX3NldEludGVycnVwdChmYWxzZSk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJyZWxlYXNlXCIsIHtcblx0XHRcdFx0ZGVwYVBvczogcG9zLmNvbmNhdCgpLFxuXHRcdFx0XHRkZXN0UG9zOiBwb3MuY29uY2F0KCksXG5cdFx0XHRcdGhhbW1lckV2ZW50OiBlIHx8IG51bGwsXG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgZGlyZWN0aW9uID0gdGhpcy5fc3RhdHVzLmN1cnJlbnRPcHRpb25zLmRpcmVjdGlvbjtcblx0XHRcdGNvbnN0IHNjYWxlID0gdGhpcy5fc3RhdHVzLmN1cnJlbnRPcHRpb25zLnNjYWxlO1xuXHRcdFx0bGV0IHZYID0gTWF0aC5hYnMoZS52ZWxvY2l0eVgpO1xuXHRcdFx0bGV0IHZZID0gTWF0aC5hYnMoZS52ZWxvY2l0eVkpO1xuXG5cdFx0XHQhKGRpcmVjdGlvbiAmIERJUkVDVElPTi5ESVJFQ1RJT05fSE9SSVpPTlRBTCkgJiYgKHZYID0gMCk7XG5cdFx0XHQhKGRpcmVjdGlvbiAmIERJUkVDVElPTi5ESVJFQ1RJT05fVkVSVElDQUwpICYmICh2WSA9IDApO1xuXG5cdFx0XHRjb25zdCBvZmZzZXQgPSBDb29yZGluYXRlLmdldE5leHRPZmZzZXRQb3MoW1xuXHRcdFx0XHR2WCAqIChlLmRlbHRhWCA8IDAgPyAtMSA6IDEpICogc2NhbGVbMF0sXG5cdFx0XHRcdHZZICogKGUuZGVsdGFZIDwgMCA/IC0xIDogMSkgKiBzY2FsZVsxXSxcblx0XHRcdF0sIHRoaXMub3B0aW9ucy5kZWNlbGVyYXRpb24pO1xuXHRcdFx0bGV0IGRlc3RQb3MgPSBbcG9zWzBdICsgb2Zmc2V0WzBdLCBwb3NbMV0gKyBvZmZzZXRbMV1dO1xuXG5cdFx0XHRkZXN0UG9zID0gQ29vcmRpbmF0ZS5nZXRQb2ludE9mSW50ZXJzZWN0aW9uKHBvcywgZGVzdFBvcyxcblx0XHRcdFx0dGhpcy5vcHRpb25zLm1pbiwgdGhpcy5vcHRpb25zLm1heCxcblx0XHRcdFx0dGhpcy5vcHRpb25zLmNpcmN1bGFyLCB0aGlzLm9wdGlvbnMuYm91bmNlKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIGEgdXNlciByZWxlYXNlIGFuIGVsZW1lbnQgb24gdGhlIHNjcmVlbiBvZiB0aGUgZGV2aWNlLlxuXHRcdFx0ICogQGtvIOyCrOyaqeyekOqwgCDquLDquLDsnZgg7ZmU66m07JeQ7IScIOyGkOydhCDrl5DsnYQg65WMIOuwnOyDne2VmOuKlCDsnbTrsqTtirhcblx0XHRcdCAqIEBuYW1lIGVnLk1vdmFibGVDb29yZCNyZWxlYXNlXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gcGFyYW0gVGhlIG9iamVjdCBvZiBkYXRhIHRvIGJlIHNlbnQgd2hlbiB0aGUgZXZlbnQgaXMgZmlyZWQ8a28+7J2067Kk7Yq46rCAIOuwnOyDne2VoCDrlYwg7KCE64us65CY64qUIOuNsOydtO2EsCDqsJ3ssrQ8L2tvPlxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gcGFyYW0uZGVwYVBvcyBUaGUgY29vcmRpbmF0ZXMgd2hlbiByZWxlYXNpbmcgYW4gZWxlbWVudDxrbz7shpDsnYQg65eQ7J2EIOuVjOydmCDsooztkZztmITsnqwgPC9rbz5cblx0XHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBwYXJhbS5kZXBhUG9zLjAgVGhlIFggY29vcmRpbmF0ZSA8a28+IHgg7KKM7ZGcPC9rbz5cblx0XHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBwYXJhbS5kZXBhUG9zLjEgVGhlIFkgY29vcmRpbmF0ZSA8a28+IHkg7KKM7ZGcPC9rbz5cblx0XHRcdCAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtLmRlc3RQb3MgVGhlIGNvb3JkaW5hdGVzIHRvIG1vdmUgdG8gYWZ0ZXIgcmVsZWFzaW5nIGFuIGVsZW1lbnQ8a28+7IaQ7J2EIOuXgCDrkqTsl5Ag7J2064+Z7ZWgIOyijO2RnDwva28+XG5cdFx0XHQgKiBAcGFyYW0ge051bWJlcn0gcGFyYW0uZGVzdFBvcy4wIFRoZSBYIGNvb3JkaW5hdGUgPGtvPngg7KKM7ZGcPC9rbz5cblx0XHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBwYXJhbS5kZXN0UG9zLjEgVGhlIFkgY29vcmRpbmF0ZSA8a28+eSDsooztkZw8L2tvPlxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IHBhcmFtLmhhbW1lckV2ZW50IFRoZSBldmVudCBpbmZvcm1hdGlvbiBvZiBIYW1tZXIuSlMuIEl0IHJldHVybnMgbnVsbCBpZiB0aGUgZXZlbnQgaXMgZmlyZWQgdGhyb3VnaCBhIGNhbGwgdG8gdGhlIHNldFRvKCkgb3Igc2V0QnkoKSBtZXRob2QuPGtvPkhhbW1lci5KU+ydmCDsnbTrsqTtirgg7KCV67O0LiBzZXRUbygpIOuplOyEnOuTnOuCmCBzZXRCeSgpIOuplOyEnOuTnOulvCDtmLjstpztlbQg7J2067Kk7Yq46rCAIOuwnOyDne2WiOydhCDrlYzripQgJ251bGwn7J2EIOuwmO2ZmO2VnOuLpDwva28+XG5cdFx0XHQgKlxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJyZWxlYXNlXCIsIHtcblx0XHRcdFx0ZGVwYVBvczogcG9zLmNvbmNhdCgpLFxuXHRcdFx0XHRkZXN0UG9zLFxuXHRcdFx0XHRoYW1tZXJFdmVudDogZSB8fCBudWxsLFxuXHRcdFx0fSk7XG5cdFx0XHRpZiAocG9zWzBdICE9PSBkZXN0UG9zWzBdIHx8IHBvc1sxXSAhPT0gZGVzdFBvc1sxXSkge1xuXHRcdFx0XHR0aGlzLl9hbmltYXRlVG8oZGVzdFBvcywgbnVsbCwgZSB8fCBudWxsKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX3NldEludGVycnVwdChmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3N0YXR1cy5tb3ZlRGlzdGFuY2UgPSBudWxsO1xuXHR9XG5cblx0X2lzSW50ZXJydXB0aW5nKCkge1xuXHRcdC8vIHdoZW4gaW50ZXJydXB0YWJsZSBpcyAndHJ1ZScsIHJldHVybiB2YWx1ZSBpcyBhbHdheXMgJ3RydWUnLlxuXHRcdHJldHVybiB0aGlzLl9zdGF0dXMuY3VycmVudE9wdGlvbnMuaW50ZXJydXB0YWJsZSB8fCB0aGlzLl9zdGF0dXMucHJldmVudGVkO1xuXHR9XG5cblx0X3NldEludGVycnVwdChwcmV2ZW50ZWQpIHtcblx0XHQhdGhpcy5fc3RhdHVzLmN1cnJlbnRPcHRpb25zLmludGVycnVwdGFibGUgJiZcblx0XHQodGhpcy5fc3RhdHVzLnByZXZlbnRlZCA9IHByZXZlbnRlZCk7XG5cdH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXZlbnRIYW5kbGVyLmpzIiwiaW1wb3J0IEhhbW1lciBmcm9tIFwiaGFtbWVyanNcIjtcbmltcG9ydCB7dXRpbHN9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQge0RJUkVDVElPTiwgVU5JUVVFS0VZLCBTVVBQT1JUX1RPVUNIfSBmcm9tIFwiLi9jb25zdHNcIjtcblxuaWYgKHR5cGVvZiBIYW1tZXIgPT09IFwidW5kZWZpbmVkXCIpIHtcblx0dGhyb3cgbmV3IEVycm9yKGBUaGUgSGFtbWVyanMgbXVzdCBiZSBsb2FkZWQgYmVmb3JlIGVnLk1vdmFibGVDb29yZC5cXG5odHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL2ApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYW1tZXJNYW5hZ2VyIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5faGFtbWVycyA9IHt9O1xuXHR9XG5cblx0c3RhdGljIGNyZWF0ZUhhbW1lcihlbCwgYmluZE9wdGlvbnMsIGlucHV0Q2xhc3MsIGhhbmRsZXIpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gY3JlYXRlIEhhbW1lclxuXHRcdFx0cmV0dXJuIEhhbW1lck1hbmFnZXIuYXR0YWNoSGFtbWVyRXZlbnRzKG5ldyBIYW1tZXIuTWFuYWdlcihlbCwge1xuXHRcdFx0XHRyZWNvZ25pemVyczogW1xuXHRcdFx0XHRcdFtcblx0XHRcdFx0XHRcdEhhbW1lci5QYW4sIHtcblx0XHRcdFx0XHRcdFx0ZGlyZWN0aW9uOiBiaW5kT3B0aW9ucy5kaXJlY3Rpb24sXG5cdFx0XHRcdFx0XHRcdHRocmVzaG9sZDogMCxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0XSxcblxuXHRcdFx0XHQvLyBjc3MgcHJvcGVydGllcyB3ZXJlIHJlbW92ZWQgZHVlIHRvIHVzYWJsaWxpdHkgaXNzdWVcblx0XHRcdFx0Ly8gaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby9qc2RvYy9IYW1tZXIuZGVmYXVsdHMuY3NzUHJvcHMuaHRtbFxuXHRcdFx0XHRjc3NQcm9wczoge1xuXHRcdFx0XHRcdHVzZXJTZWxlY3Q6IFwibm9uZVwiLFxuXHRcdFx0XHRcdHRvdWNoU2VsZWN0OiBcIm5vbmVcIixcblx0XHRcdFx0XHR0b3VjaENhbGxvdXQ6IFwibm9uZVwiLFxuXHRcdFx0XHRcdHVzZXJEcmFnOiBcIm5vbmVcIixcblx0XHRcdFx0fSxcblx0XHRcdFx0aW5wdXRDbGFzcyxcblx0XHRcdH0pLCBiaW5kT3B0aW9ucywgaGFuZGxlcik7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGF0dGFjaEhhbW1lckV2ZW50cyhoYW1tZXIsIG9wdGlvbnMsIGhhbmRsZXIpIHtcblx0XHRjb25zdCBlbmFibGUgPSBoYW1tZXIuZ2V0KFwicGFuXCIpLm9wdGlvbnMuZW5hYmxlO1xuXG5cdFx0LyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cblx0XHRyZXR1cm4gaGFtbWVyXG5cdFx0XHQub24oXCJoYW1tZXIuaW5wdXRcIiwgZSA9PiB7XG5cdFx0XHRcdGlmIChlLmlzRmlyc3QpIHtcblx0XHRcdFx0XHQvLyBhcHBseSBvcHRpb25zIGVhY2hcblx0XHRcdFx0XHRoYW5kbGVyLl9zZXRDdXJyZW50VGFyZ2V0KGhhbW1lciwgb3B0aW9ucyk7XG5cdFx0XHRcdFx0ZW5hYmxlICYmIGhhbmRsZXIuX3N0YXJ0KGUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGUuaXNGaW5hbCkge1xuXHRcdFx0XHRcdC8vIHN1YnN0aXR1dGUgLm9uKFwicGFuZW5kIHRhcFwiLCB0aGlzLl9wYW5lbmQpOyBCZWNhdXNlIGl0KHRhcCwgcGFuZW5kKSBjYW5ub3QgY2F0Y2ggdmVydGljYWwoaG9yaXpvbnRhbCkgbW92ZW1lbnQgb24gSE9SSVpPTlRBTChWRVJUSUNBTCkgbW9kZS5cblx0XHRcdFx0XHRlbmFibGUgJiYgaGFuZGxlci5fZW5kKGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KS5vbihcInBhbnN0YXJ0IHBhbm1vdmVcIiwgZSA9PiBoYW5kbGVyLl9tb3ZlKGUpKTtcblx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5cdH1cblxuXHRzdGF0aWMgZGV0YWNoSGFtbWVyRXZlbnRzKGhhbW1lcikge1xuXHRcdGhhbW1lci5vZmYoXCJoYW1tZXIuaW5wdXQgcGFuc3RhcnQgcGFubW92ZSBwYW5lbmRcIik7XG5cdH1cblxuXHRzdGF0aWMgY29udmVydElucHV0VHlwZShpbnB1dFR5cGUgPSBbXSkge1xuXHRcdGxldCBoYXNUb3VjaCA9IGZhbHNlO1xuXHRcdGxldCBoYXNNb3VzZSA9IGZhbHNlO1xuXHRcdGNvbnN0IGlucHV0cyA9IGlucHV0VHlwZSB8fCBbXTtcblxuXHRcdGlucHV0cy5mb3JFYWNoKHYgPT4ge1xuXHRcdFx0c3dpdGNoICh2KSB7XG5cdFx0XHRcdGNhc2UgXCJtb3VzZVwiIDogaGFzTW91c2UgPSB0cnVlOyBicmVhaztcblx0XHRcdFx0Y2FzZSBcInRvdWNoXCIgOiBoYXNUb3VjaCA9IFNVUFBPUlRfVE9VQ0g7XG5cdFx0XHRcdC8vIG5vIGRlZmF1bHRcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gKGhhc1RvdWNoICYmIEhhbW1lci5Ub3VjaElucHV0KSB8fFxuXHRcdFx0KGhhc01vdXNlICYmIEhhbW1lci5Nb3VzZUlucHV0KSB8fCBudWxsO1xuXHR9XG5cblx0YWRkKGVsZW1lbnQsIG9wdGlvbnMsIGhhbmRsZXIpIHtcblx0XHRjb25zdCBlbCA9IHV0aWxzLmdldEVsZW1lbnQoZWxlbWVudCk7XG5cdFx0bGV0IGtleVZhbHVlID0gZWwuZ2V0QXR0cmlidXRlKFVOSVFVRUtFWSk7XG5cdFx0Y29uc3QgYmluZE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRcdGRpcmVjdGlvbjogRElSRUNUSU9OLkRJUkVDVElPTl9BTEwsXG5cdFx0XHRzY2FsZTogWzEsIDFdLFxuXHRcdFx0dGhyZXNob2xkQW5nbGU6IDQ1LFxuXHRcdFx0aW50ZXJydXB0YWJsZTogdHJ1ZSxcblx0XHRcdGlucHV0VHlwZTogW1widG91Y2hcIiwgXCJtb3VzZVwiXSxcblx0XHR9LCBvcHRpb25zKTtcblx0XHRjb25zdCBpbnB1dENsYXNzID0gdGhpcy5jb252ZXJ0SW5wdXRUeXBlKGJpbmRPcHRpb25zLmlucHV0VHlwZSk7XG5cblx0XHRpZiAoIWlucHV0Q2xhc3MpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoa2V5VmFsdWUpIHtcblx0XHRcdHRoaXMuX2hhbW1lcnNba2V5VmFsdWVdLmhhbW1lci5kZXN0cm95KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGtleVZhbHVlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogbmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuXHRcdH1cblx0XHR0aGlzLl9oYW1tZXJzW2tleVZhbHVlXSA9IHtcblx0XHRcdGhhbW1lcjogSGFtbWVyTWFuYWdlci5jcmVhdGVIYW1tZXIoXG5cdFx0XHRcdGVsLFxuXHRcdFx0XHRiaW5kT3B0aW9ucyxcblx0XHRcdFx0aW5wdXRDbGFzcyxcblx0XHRcdFx0aGFuZGxlcixcblx0XHRcdCksXG5cdFx0XHRlbCxcblx0XHRcdG9wdGlvbnM6IGJpbmRPcHRpb25zLFxuXHRcdH07XG5cdFx0ZWwuc2V0QXR0cmlidXRlKFVOSVFVRUtFWSwga2V5VmFsdWUpO1xuXHR9XG5cblx0cmVtb3ZlKGVsZW1lbnQpIHtcblx0XHRjb25zdCBlbCA9IHV0aWxzLmdldEVsZW1lbnQoZWxlbWVudCk7XG5cdFx0Y29uc3Qga2V5ID0gZWwuZ2V0QXR0cmlidXRlKFVOSVFVRUtFWSk7XG5cblx0XHRpZiAoa2V5KSB7XG5cdFx0XHRjb25zdCBoYW1tZXIgPSB0aGlzLl9oYW1tZXJzW2tleV0uaGFtbWVyO1xuXG5cdFx0XHRIYW1tZXJNYW5hZ2VyLmRldGFjaEhhbW1lckV2ZW50cyhoYW1tZXIpO1xuXHRcdFx0aGFtbWVyLmRlc3Ryb3koKTtcblx0XHRcdGRlbGV0ZSB0aGlzLl9oYW1tZXJzW2tleV07XG5cdFx0XHRlbC5yZW1vdmVBdHRyaWJ1dGUoVU5JUVVFS0VZKTtcblx0XHR9XG5cdH1cblxuXHRnZXRIYW1tZXIoZWxlbWVudCkge1xuXHRcdGNvbnN0IGRhdGEgPSB0aGlzLmdldChlbGVtZW50KTtcblxuXHRcdHJldHVybiBkYXRhID8gZGF0YS5oYW1tZXIgOiBudWxsO1xuXHR9XG5cblx0Z2V0KGVsZW1lbnQpIHtcblx0XHRjb25zdCBlbCA9IHV0aWxzLmdldEVsZW1lbnQoZWxlbWVudCk7XG5cdFx0Y29uc3Qga2V5ID0gZWwgPyBlbC5nZXRBdHRyaWJ1dGUoVU5JUVVFS0VZKSA6IG51bGw7XG5cblx0XHRpZiAoa2V5ICYmIHRoaXMuX2hhbW1lcnNba2V5XSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2hhbW1lcnNba2V5XTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0aW5wdXRDb250cm9sKGlzRW5hYmxlLCBlbGVtZW50KSB7XG5cdFx0Y29uc3Qgb3B0aW9uID0ge1xuXHRcdFx0ZW5hYmxlOiBpc0VuYWJsZSxcblx0XHR9O1xuXG5cdFx0aWYgKGVsZW1lbnQpIHtcblx0XHRcdGNvbnN0IGhhbW1lciA9IHRoaXMuZ2V0SGFtbWVyKGVsZW1lbnQpO1xuXG5cdFx0XHRoYW1tZXIgJiYgaGFtbWVyLmdldChcInBhblwiKS5zZXQob3B0aW9uKTtcblx0XHR9IGVsc2UgeyAvLyBmb3IgbXVsdGlcblx0XHRcdGZvciAoY29uc3QgcCBpbiB0aGlzLl9oYW1tZXJzKSB7XG5cdFx0XHRcdHRoaXMuX2hhbW1lcnNbcF0uaGFtbWVyLmdldChcInBhblwiKS5zZXQob3B0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRkZXN0cm95KCkge1xuXHRcdGZvciAoY29uc3QgcCBpbiB0aGlzLl9oYW1tZXJzKSB7XG5cdFx0XHR0aGlzLnJlbW92ZSh0aGlzLl9oYW1tZXJzW3BdLmVsKTtcblx0XHR9XG5cdFx0dGhpcy5faGFtbWVycyA9IHt9O1xuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaGFtbWVyTWFuYWdlci5qcyIsImltcG9ydCBNb3ZhYmxlQ29vcmQgZnJvbSBcIi4vbW92YWJsZUNvb3JkXCI7XG5cbm1vZHVsZS5leHBvcnRzID0gTW92YWJsZUNvb3JkO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwiQGVnanMvY29tcG9uZW50XCIsXCJjb21tb25qczJcIjpcIkBlZ2pzL2NvbXBvbmVudFwiLFwiYW1kXCI6XCJAZWdqcy9jb21wb25lbnRcIixcInJvb3RcIjpbXCJlZ1wiLFwiQ29tcG9uZW50XCJdfVxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xMF9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJoYW1tZXJqc1wiLFwiY29tbW9uanMyXCI6XCJoYW1tZXJqc1wiLFwiYW1kXCI6XCJoYW1tZXJqc1wiLFwicm9vdFwiOlwiSGFtbWVyXCJ9XG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSJdLCJzb3VyY2VSb290IjoiIn0=
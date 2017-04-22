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
		define("MovableCoord", ["@egjs/component", "hammerjs"], factory);
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


exports.__esModule = true;
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


exports.__esModule = true;
/* eslint-disable no-new-func, no-nested-ternary */
var win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
/* eslint-enable no-new-func, no-nested-ternary */

exports.window = win;
var document = exports.document = win.document;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

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
		var length = [max[0] - min[0], max[1] - min[1]];

		if (circular[0] && toPos[1] < min[1]) {
			// up
			toPos[1] = (toPos[1] - min[1]) % length[1] + max[1];
		}
		if (circular[1] && toPos[0] > max[0]) {
			// right
			toPos[0] = (toPos[0] - max[0]) % length[0] + min[0];
		}
		if (circular[2] && toPos[1] > max[1]) {
			// down
			toPos[1] = (toPos[1] - max[1]) % length[1] + min[1];
		}
		if (circular[3] && toPos[0] < min[0]) {
			// left
			toPos[0] = (toPos[0] - min[0]) % length[0] + max[0];
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


exports.__esModule = true;
exports.$ = exports.Mixin = undefined;

var _browser = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Select or create element
 * @param {String|HTMLElement|jQuery} param
 *  when string given is as HTML tag, then create element
 *  otherwise it returns selected elements
 * @param {Boolean} multi
 * @returns {HTMLElement}
 */
function $(param) {
	var multi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	var el = void 0;

	if (typeof param === "string") {
		// String (HTML, Selector)
		// check if string is HTML tag format
		var match = param.match(/^<([a-z]+)\s*([^>]*)>/);

		// creating element
		if (match) {
			// HTML
			var dummy = _browser.document.createElement("div");

			dummy.innerHTML = param;
			el = Array.prototype.slice.call(dummy.childNodes);
		} else {
			// Selector
			el = Array.prototype.slice.call(_browser.document.querySelectorAll(param));
		}
		if (!multi) {
			el = el.length >= 1 ? el[0] : undefined;
		}
	} else if (param.nodeName && param.nodeType === 1) {
		// HTMLElement
		el = param;
	} else if (_browser.window.jQuery && param instanceof jQuery) {
		// jQuery
		el = multi ? param.toArray() : param.get(0);
	}

	return el;
}

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
exports.$ = $;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

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


exports.__esModule = true;

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


exports.__esModule = true;

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


exports.__esModule = true;

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
		var el = (0, _utils.$)(element);
		var keyValue = el.getAttribute(_consts.UNIQUEKEY);
		var bindOptions = Object.assign({
			direction: _consts.DIRECTION.DIRECTION_ALL,
			scale: [1, 1],
			thresholdAngle: 45,
			interruptable: true,
			inputType: ["touch", "mouse"]
		}, options);
		var inputClass = HammerManager.convertInputType(bindOptions.inputType);

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
		var el = (0, _utils.$)(element);
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
		var el = (0, _utils.$)(element);
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
//# sourceMappingURL=movablecoord.js.map
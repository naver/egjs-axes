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
		module.exports = factory(require("Hammer"), require("eg.component"));
	else if(typeof define === 'function' && define.amd)
		define(["Hammer", "eg.component"], factory);
	else if(typeof exports === 'object')
		exports["MovableCoord"] = factory(require("Hammer"), require("eg.component"));
	else
		root["eg"] = root["eg"] || {}, root["eg"]["MovableCoord"] = factory(root["Hammer"], root["eg"]["Component"]);
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

var _hammerjs = __webpack_require__(8);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1Mzk0ZDRhNThlYTg1NTg4ZTc0YSIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RzLmpzIiwid2VicGFjazovLy8uL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb29yZGluYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92YWJsZUNvb3JkLmpzIiwid2VicGFjazovLy8uL3NyYy9hbmltYXRpb25IYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9ldmVudEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hhbW1lck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiSGFtbWVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJlZy5jb21wb25lbnRcIixcImNvbW1vbmpzMlwiOlwiZWcuY29tcG9uZW50XCIsXCJhbWRcIjpcImVnLmNvbXBvbmVudFwiLFwicm9vdFwiOltcImVnXCIsXCJDb21wb25lbnRcIl19Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkaXJlY3Rpb24iLCJESVJFQ1RJT05fTk9ORSIsIkRJUkVDVElPTl9MRUZUIiwiRElSRUNUSU9OX1JJR0hUIiwiRElSRUNUSU9OX1VQIiwiRElSRUNUSU9OX0RPV04iLCJESVJFQ1RJT05fSE9SSVpPTlRBTCIsIkRJUkVDVElPTl9WRVJUSUNBTCIsIkRJUkVDVElPTl9BTEwiLCJESVJFQ1RJT04iLCJVTklRVUVLRVkiLCJTVVBQT1JUX1RPVUNIIiwid2luIiwid2luZG93IiwiTWF0aCIsInNlbGYiLCJGdW5jdGlvbiIsImRvY3VtZW50IiwiQ29vcmRpbmF0ZSIsImdldERpcmVjdGlvbkJ5QW5nbGUiLCJhbmdsZSIsInRocmVzaG9sZEFuZ2xlIiwidG9BbmdsZSIsImFicyIsImlzSG9yaXpvbnRhbCIsInVzZXJEaXJlY3Rpb24iLCJpc1ZlcnRpY2FsIiwiZ2V0UG9pbnRPZkludGVyc2VjdGlvbiIsImRlcGFQb3MiLCJkZXN0UG9zIiwibWluIiwibWF4IiwiY2lyY3VsYXIiLCJib3VuY2UiLCJib3hMVCIsImJveFJCIiwidG9EZXN0UG9zIiwiY29uY2F0IiwieGQiLCJ5ZCIsImlzT3V0c2lkZSIsInBvcyIsImlzT3V0VG9PdXQiLCJnZXROZXh0T2Zmc2V0UG9zIiwic3BlZWRzIiwiZGVjZWxlcmF0aW9uIiwibm9ybWFsU3BlZWQiLCJzcXJ0IiwiZHVyYXRpb24iLCJnZXREdXJhdGlvbkZyb21Qb3MiLCJub3JtYWxQb3MiLCJpc0NpcmN1bGFyIiwiZ2V0Q2lyY3VsYXJQb3MiLCJ0b1BvcyIsInRvRml4ZWQiLCJ1dGlscyIsImdldEVsZW1lbnQiLCJlbCIsInF1ZXJ5U2VsZWN0b3IiLCJqUXVlcnkiLCJsZW5ndGgiLCJNaXhpbkJ1aWxkZXIiLCJzdXBlcmNsYXNzIiwid2l0aCIsIm1peGlucyIsInJlZHVjZSIsImMiLCJtIiwiTWl4aW4iLCJNb3ZhYmxlQ29vcmQiLCJvcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwibWFyZ2luIiwiZWFzaW5nIiwiZWFzZU91dEN1YmljIiwieCIsInBvdyIsIm1heGltdW1EdXJhdGlvbiIsIkluZmluaXR5IiwiX3JldmlzZU9wdGlvbnMiLCJfaGFtbWVyTWFuYWdlciIsIl9wb3MiLCJiaW5kIiwiZWxlbWVudCIsImFkZCIsInVuYmluZCIsInJlbW92ZSIsImdldEhhbW1lciIsImVuYWJsZUlucHV0IiwiaW5wdXRDb250cm9sIiwiZGlzYWJsZUlucHV0Iiwia2V5IiwiZm9yRWFjaCIsInYiLCJjb25zdHJ1Y3RvciIsIkFycmF5IiwidGVzdCIsImdldCIsImRlc3Ryb3kiLCJvZmYiLCJWRVJTSU9OIiwiX3JhZiIsIl9hbmltYXRlUGFyYW0iLCJfYW5pbWF0aW9uRW5kIiwiX3Jlc3RvcmUiLCJfZ3JhYiIsInRyaWdnZXIiLCJvcmdQb3MiLCJfc2V0UG9zQW5kVHJpZ2dlckNoYW5nZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiX3ByZXBhcmVQYXJhbSIsImFic1BvcyIsImhhbW1lckV2ZW50IiwiZGlzdGFuY2UiLCJuZXdEdXJhdGlvbiIsImlzQm91bmNlIiwiZG9uZSIsImNvbXBsZXRlIiwiX2FuaW1hdGUiLCJuZXh0UG9zIiwicm91bmQiLCJzZXRUbyIsIl9zZXRJbnRlcnJ1cHQiLCJwYXJhbSIsInN0YXJ0VGltZSIsIkRhdGUiLCJnZXRUaW1lIiwiaW5mbyIsImxvb3AiLCJfZnJhbWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJfYW5pbWF0ZVRvIiwicmV0VHJpZ2dlciIsIkVycm9yIiwicXVldWUiLCJkZXF1ZXVlIiwidGFzayIsInNoaWZ0IiwiY2FsbCIsInB1c2giLCJjdXJUaW1lIiwiZWFzaW5nUGVyIiwiX2Vhc2luZyIsImkiLCJwb3NpdGlvbiIsImhvbGRpbmciLCJlIiwicCIsInkiLCJ0b1giLCJ0b1kiLCJzZXRCeSIsIl9zdGF0dXMiLCJncmFiT3V0c2lkZSIsImN1cnJlbnRIYW1tZXIiLCJjdXJyZW50T3B0aW9ucyIsIm1vdmVEaXN0YW5jZSIsInByZXZlbnRlZCIsIl9zZXRDdXJyZW50VGFyZ2V0IiwiaGFtbWVyIiwiY3VycmVudEhhbm1tZXIiLCJfc3RhcnQiLCJpbnRlcnJ1cHRhYmxlIiwiX21vdmUiLCJfaXNJbnRlcnJ1cHRpbmciLCJzY2FsZSIsIm91dCIsInByZXZlbnQiLCJwcmV2SW5wdXQiLCJzZXNzaW9uIiwib2Zmc2V0WCIsImRlbHRhWCIsIm9mZnNldFkiLCJkZWx0YVkiLCJzcmNFdmVudCIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwicHJldmVudFN5c3RlbUV2ZW50IiwidHYiLCJ0biIsInR4IiwiaW5pdFNsb3BlIiwiX2VuZCIsInZYIiwidmVsb2NpdHlYIiwidlkiLCJ2ZWxvY2l0eVkiLCJvZmZzZXQiLCJIYW1tZXJNYW5hZ2VyIiwiX2hhbW1lcnMiLCJfY3JlYXRlSGFtbWVyIiwiYmluZE9wdGlvbnMiLCJpbnB1dENsYXNzIiwiaGFuZGxlciIsIl9hdHRhY2hIYW1tZXJFdmVudHMiLCJNYW5hZ2VyIiwicmVjb2duaXplcnMiLCJQYW4iLCJ0aHJlc2hvbGQiLCJjc3NQcm9wcyIsInVzZXJTZWxlY3QiLCJ0b3VjaFNlbGVjdCIsInRvdWNoQ2FsbG91dCIsInVzZXJEcmFnIiwia2V5VmFsdWUiLCJnZXRBdHRyaWJ1dGUiLCJpbnB1dFR5cGUiLCJjb252ZXJ0SW5wdXRUeXBlIiwicmFuZG9tIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiZGF0YSIsImVuYWJsZSIsIm9uIiwiaXNGaXJzdCIsImlzRmluYWwiLCJfZGV0YWNoSGFtbWVyRXZlbnRzIiwiaGFzVG91Y2giLCJoYXNNb3VzZSIsImlucHV0cyIsIlRvdWNoSW5wdXQiLCJNb3VzZUlucHV0IiwiaXNFbmFibGUiLCJvcHRpb24iLCJzZXQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDaEVBOztBQUVBOzs7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TTVFLENBQVgsSUFBZ0IsS0FBSzBDLFFBQXJCLEVBQStCO0FBQzlCLFNBQUtBLFFBQUwsQ0FBYzFDLENBQWQsRUFBaUJZLE1BQWpCLENBQXdCOUQsR0FBeEIsQ0FBNEIsS0FBNUIsRUFBbUMrSCxHQUFuQyxDQUF1Q0QsTUFBdkM7QUFDQTtBQUNEO0FBQ0QsU0FBTyxJQUFQO0FBQ0EsRTs7eUJBRUQ3SCxPLHNCQUFVO0FBQ1QsT0FBSyxJQUFNaUQsQ0FBWCxJQUFnQixLQUFLMEMsUUFBckIsRUFBK0I7QUFDOUIsUUFBS0EsUUFBTCxDQUFjMUMsQ0FBZCxFQUFpQlksTUFBakIsQ0FBd0I3RCxPQUF4QjtBQUNBLFFBQUsyRixRQUFMLENBQWMxQyxDQUFkLEVBQWlCM0YsRUFBakIsQ0FBb0IwSixlQUFwQjtBQUNBLFVBQU8sS0FBS3JCLFFBQUwsQ0FBYzFDLENBQWQsQ0FBUDtBQUNBO0FBQ0QsT0FBSzBDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxFOzs7OztrQkE3Sm1CRCxhOzs7Ozs7O0FDUnJCLCtDOzs7Ozs7QUNBQSwrQzs7Ozs7Ozs7O0FDQUE7Ozs7OztBQUVBcUMsT0FBT0MsT0FBUCwwQiIsImZpbGUiOiJtb3ZhYmxlY29vcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJIYW1tZXJcIiksIHJlcXVpcmUoXCJlZy5jb21wb25lbnRcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiSGFtbWVyXCIsIFwiZWcuY29tcG9uZW50XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIk1vdmFibGVDb29yZFwiXSA9IGZhY3RvcnkocmVxdWlyZShcIkhhbW1lclwiKSwgcmVxdWlyZShcImVnLmNvbXBvbmVudFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiZWdcIl0gPSByb290W1wiZWdcIl0gfHwge30sIHJvb3RbXCJlZ1wiXVtcIk1vdmFibGVDb29yZFwiXSA9IGZhY3Rvcnkocm9vdFtcIkhhbW1lclwiXSwgcm9vdFtcImVnXCJdW1wiQ29tcG9uZW50XCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNTM5NGQ0YTU4ZWE4NTU4OGU3NGEiLCJpbXBvcnQge3dpbmRvd30gZnJvbSBcIi4vYnJvd3NlclwiO1xuXG4vKipcbiAqIEBuYW1lIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fTk9ORVxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7TnVtYmVyfVxuICovXG4vKipcbiAqIEBuYW1lIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fTEVGVFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7TnVtYmVyfVxuKi9cbi8qKlxuICogQG5hbWUgZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9SSUdIVFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7TnVtYmVyfVxuKi9cbi8qKlxuICogQG5hbWUgZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9VUFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7TnVtYmVyfVxuICovXG4vKipcbiAqIEBuYW1lIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fRE9XTlxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7TnVtYmVyfVxuKi9cbi8qKlxuICogQG5hbWUgZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9IT1JJWk9OVEFMXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4qL1xuLyoqXG4gKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX1ZFUlRJQ0FMXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4qL1xuLyoqXG4gKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX0FMTFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7TnVtYmVyfVxuKi9cbmNvbnN0IGRpcmVjdGlvbiA9IHtcblx0RElSRUNUSU9OX05PTkU6IDEsXG5cdERJUkVDVElPTl9MRUZUOiAyLFxuXHRESVJFQ1RJT05fUklHSFQ6IDQsXG5cdERJUkVDVElPTl9VUDogOCxcblx0RElSRUNUSU9OX0RPV046IDE2LFxuXHRESVJFQ1RJT05fSE9SSVpPTlRBTDogMiB8IDQsXG5cdERJUkVDVElPTl9WRVJUSUNBTDogOCB8IDE2XG59O1xuXG5kaXJlY3Rpb24uRElSRUNUSU9OX0FMTCA9IGRpcmVjdGlvbi5ESVJFQ1RJT05fSE9SSVpPTlRBTCB8XG5cdGRpcmVjdGlvbi5ESVJFQ1RJT05fVkVSVElDQUw7XG5leHBvcnQgY29uc3QgRElSRUNUSU9OID0gZGlyZWN0aW9uO1xuZXhwb3J0IGNvbnN0IFVOSVFVRUtFWSA9IFwiX19NT1ZBQkxFQ09PUkRfX1wiO1xuZXhwb3J0IGNvbnN0IFNVUFBPUlRfVE9VQ0ggPSBcIm9udG91Y2hzdGFydFwiIGluIHdpbmRvdztcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnN0cy5qcyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jLCBuby1uZXN0ZWQtdGVybmFyeSAqL1xuY29uc3Qgd2luID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuTWF0aCA9PT0gTWF0aCA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuTWF0aCA9PT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLW5ldy1mdW5jLCBuby1uZXN0ZWQtdGVybmFyeSAqL1xuXG5leHBvcnQge3dpbiBhcyB3aW5kb3d9O1xuZXhwb3J0IGNvbnN0IGRvY3VtZW50ID0gd2luLmRvY3VtZW50O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Jyb3dzZXIuanMiLCJpbXBvcnQge0RJUkVDVElPTn0gZnJvbSBcIi4vY29uc3RzXCI7XG5cbmNvbnN0IENvb3JkaW5hdGUgPSB7XG5cdC8vIGdldCB1c2VyJ3MgZGlyZWN0aW9uXG5cdGdldERpcmVjdGlvbkJ5QW5nbGUoYW5nbGUsIHRocmVzaG9sZEFuZ2xlKSB7XG5cdFx0aWYgKHRocmVzaG9sZEFuZ2xlIDwgMCB8fCB0aHJlc2hvbGRBbmdsZSA+IDkwKSB7XG5cdFx0XHRyZXR1cm4gRElSRUNUSU9OLkRJUkVDVElPTl9OT05FO1xuXHRcdH1cblx0XHRjb25zdCB0b0FuZ2xlID0gTWF0aC5hYnMoYW5nbGUpO1xuXG5cdFx0cmV0dXJuIHRvQW5nbGUgPiB0aHJlc2hvbGRBbmdsZSAmJiB0b0FuZ2xlIDwgMTgwIC0gdGhyZXNob2xkQW5nbGUgP1xuXHRcdFx0XHRESVJFQ1RJT04uRElSRUNUSU9OX1ZFUlRJQ0FMIDogRElSRUNUSU9OLkRJUkVDVElPTl9IT1JJWk9OVEFMO1xuXHR9LFxuXHRpc0hvcml6b250YWwoZGlyZWN0aW9uLCB1c2VyRGlyZWN0aW9uKSB7XG5cdFx0cmV0dXJuIGRpcmVjdGlvbiA9PT0gRElSRUNUSU9OLkRJUkVDVElPTl9BTEwgfHxcblx0XHRcdChkaXJlY3Rpb24gJiBESVJFQ1RJT04uRElSRUNUSU9OX0hPUklaT05UQUwgJiZcblx0XHRcdHVzZXJEaXJlY3Rpb24gJiBESVJFQ1RJT04uRElSRUNUSU9OX0hPUklaT05UQUwpO1xuXHR9LFxuXHRpc1ZlcnRpY2FsKGRpcmVjdGlvbiwgdXNlckRpcmVjdGlvbikge1xuXHRcdHJldHVybiBkaXJlY3Rpb24gPT09IERJUkVDVElPTi5ESVJFQ1RJT05fQUxMIHx8XG5cdFx0XHQoZGlyZWN0aW9uICYgRElSRUNUSU9OLkRJUkVDVElPTl9WRVJUSUNBTCAmJlxuXHRcdFx0dXNlckRpcmVjdGlvbiAmIERJUkVDVElPTi5ESVJFQ1RJT05fVkVSVElDQUwpO1xuXHR9LFxuXHRnZXRQb2ludE9mSW50ZXJzZWN0aW9uKGRlcGFQb3MsIGRlc3RQb3MsIG1pbiwgbWF4LCBjaXJjdWxhciwgYm91bmNlKSB7XG5cdFx0Y29uc3QgYm94TFQgPSBbbWluWzBdIC0gYm91bmNlWzNdLCBtaW5bMV0gLSBib3VuY2VbMF1dO1xuXHRcdGNvbnN0IGJveFJCID0gW21heFswXSArIGJvdW5jZVsxXSwgbWF4WzFdICsgYm91bmNlWzJdXTtcblx0XHRjb25zdCB0b0Rlc3RQb3MgPSBkZXN0UG9zLmNvbmNhdCgpO1xuXG5cdFx0Y29uc3QgeGQgPSBkZXN0UG9zWzBdIC0gZGVwYVBvc1swXTtcblx0XHRjb25zdCB5ZCA9IGRlc3RQb3NbMV0gLSBkZXBhUG9zWzFdO1xuXG5cdFx0aWYgKCFjaXJjdWxhclszXSkge1xuXHRcdFx0dG9EZXN0UG9zWzBdID0gTWF0aC5tYXgoYm94TFRbMF0sIHRvRGVzdFBvc1swXSk7XG5cdFx0fSAvLyBsZWZ0XG5cdFx0aWYgKCFjaXJjdWxhclsxXSkge1xuXHRcdFx0dG9EZXN0UG9zWzBdID0gTWF0aC5taW4oYm94UkJbMF0sIHRvRGVzdFBvc1swXSk7XG5cdFx0fSAvLyByaWdodFxuXHRcdHRvRGVzdFBvc1sxXSA9IHhkID8gZGVwYVBvc1sxXSArIHlkIC8geGQgKiAodG9EZXN0UG9zWzBdIC0gZGVwYVBvc1swXSkgOlxuXHRcdFx0XHRcdFx0dG9EZXN0UG9zWzFdO1xuXG5cdFx0aWYgKCFjaXJjdWxhclswXSkge1xuXHRcdFx0dG9EZXN0UG9zWzFdID0gTWF0aC5tYXgoYm94TFRbMV0sIHRvRGVzdFBvc1sxXSk7XG5cdFx0fSAvLyB1cFxuXHRcdGlmICghY2lyY3VsYXJbMl0pIHtcblx0XHRcdHRvRGVzdFBvc1sxXSA9IE1hdGgubWluKGJveFJCWzFdLCB0b0Rlc3RQb3NbMV0pO1xuXHRcdH0gLy8gZG93blxuXHRcdHRvRGVzdFBvc1swXSA9IHlkID8gZGVwYVBvc1swXSArIHhkIC8geWQgKiAodG9EZXN0UG9zWzFdIC0gZGVwYVBvc1sxXSkgOlxuXHRcdFx0XHRcdFx0dG9EZXN0UG9zWzBdO1xuXHRcdHJldHVybiBbXG5cdFx0XHRNYXRoLm1pbihtYXhbMF0sIE1hdGgubWF4KG1pblswXSwgdG9EZXN0UG9zWzBdKSksXG5cdFx0XHRNYXRoLm1pbihtYXhbMV0sIE1hdGgubWF4KG1pblsxXSwgdG9EZXN0UG9zWzFdKSlcblx0XHRdO1xuXHR9LFxuXHQvLyBkZXRlcm1pbmUgb3V0c2lkZVxuXHRpc091dHNpZGUocG9zLCBtaW4sIG1heCkge1xuXHRcdHJldHVybiBwb3NbMF0gPCBtaW5bMF0gfHwgcG9zWzFdIDwgbWluWzFdIHx8XG5cdFx0XHRwb3NbMF0gPiBtYXhbMF0gfHwgcG9zWzFdID4gbWF4WzFdO1xuXHR9LFxuXHQvLyBmcm9tIG91dHNpZGUgdG8gb3V0c2lkZVxuXHRpc091dFRvT3V0KHBvcywgZGVzdFBvcywgbWluLCBtYXgpIHtcblx0XHRyZXR1cm4gKHBvc1swXSA8IG1pblswXSB8fCBwb3NbMF0gPiBtYXhbMF0gfHxcblx0XHRcdHBvc1sxXSA8IG1pblsxXSB8fCBwb3NbMV0gPiBtYXhbMV0pICYmXG5cdFx0XHQoZGVzdFBvc1swXSA8IG1pblswXSB8fCBkZXN0UG9zWzBdID4gbWF4WzBdIHx8XG5cdFx0XHRkZXN0UG9zWzFdIDwgbWluWzFdIHx8IGRlc3RQb3NbMV0gPiBtYXhbMV0pO1xuXHR9LFxuXHRnZXROZXh0T2Zmc2V0UG9zKHNwZWVkcywgZGVjZWxlcmF0aW9uKSB7XG5cdFx0Y29uc3Qgbm9ybWFsU3BlZWQgPSBNYXRoLnNxcnQoXG5cdFx0XHRzcGVlZHNbMF0gKiBzcGVlZHNbMF0gKyBzcGVlZHNbMV0gKiBzcGVlZHNbMV1cblx0XHQpO1xuXHRcdGNvbnN0IGR1cmF0aW9uID0gTWF0aC5hYnMobm9ybWFsU3BlZWQgLyAtZGVjZWxlcmF0aW9uKTtcblxuXHRcdHJldHVybiBbXG5cdFx0XHRzcGVlZHNbMF0gLyAyICogZHVyYXRpb24sXG5cdFx0XHRzcGVlZHNbMV0gLyAyICogZHVyYXRpb25cblx0XHRdO1xuXHR9LFxuXHRnZXREdXJhdGlvbkZyb21Qb3MocG9zLCBkZWNlbGVyYXRpb24pIHtcblx0XHRjb25zdCBub3JtYWxQb3MgPSBNYXRoLnNxcnQocG9zWzBdICogcG9zWzBdICsgcG9zWzFdICogcG9zWzFdKTtcblx0XHRjb25zdCBkdXJhdGlvbiA9IE1hdGguc3FydChcblx0XHRcdG5vcm1hbFBvcyAvIGRlY2VsZXJhdGlvbiAqIDJcblx0XHQpO1xuXG5cdFx0Ly8gd2hlbiBkdXJhdGlvbiBpcyB1bmRlciAxMDAsIHRoZW4gdmFsdWUgaXMgemVyb1xuXHRcdHJldHVybiBkdXJhdGlvbiA8IDEwMCA/IDAgOiBkdXJhdGlvbjtcblx0fSxcblx0aXNDaXJjdWxhcihkZXN0UG9zLCBtaW4sIG1heCwgY2lyY3VsYXIpIHtcblx0XHRyZXR1cm4gKGNpcmN1bGFyWzBdICYmIGRlc3RQb3NbMV0gPCBtaW5bMV0pIHx8XG5cdFx0XHRcdChjaXJjdWxhclsxXSAmJiBkZXN0UG9zWzBdID4gbWF4WzBdKSB8fFxuXHRcdFx0XHQoY2lyY3VsYXJbMl0gJiYgZGVzdFBvc1sxXSA+IG1heFsxXSkgfHxcblx0XHRcdFx0KGNpcmN1bGFyWzNdICYmIGRlc3RQb3NbMF0gPCBtaW5bMF0pO1xuXHR9LFxuXHRnZXRDaXJjdWxhclBvcyhwb3MsIG1pbiwgbWF4LCBjaXJjdWxhcikge1xuXHRcdGNvbnN0IHRvUG9zID0gcG9zLmNvbmNhdCgpO1xuXG5cdFx0aWYgKGNpcmN1bGFyWzBdICYmIHRvUG9zWzFdIDwgbWluWzFdKSB7IC8vIHVwXG5cdFx0XHR0b1Bvc1sxXSA9ICh0b1Bvc1sxXSAtIG1pblsxXSkgJSAobWF4WzFdIC0gbWluWzFdICsgMSkgKyBtYXhbMV07XG5cdFx0fVxuXHRcdGlmIChjaXJjdWxhclsxXSAmJiB0b1Bvc1swXSA+IG1heFswXSkgeyAvLyByaWdodFxuXHRcdFx0dG9Qb3NbMF0gPSAodG9Qb3NbMF0gLSBtaW5bMF0pICUgKG1heFswXSAtIG1pblswXSArIDEpICsgbWluWzBdO1xuXHRcdH1cblx0XHRpZiAoY2lyY3VsYXJbMl0gJiYgdG9Qb3NbMV0gPiBtYXhbMV0pIHsgLy8gZG93blxuXHRcdFx0dG9Qb3NbMV0gPSAodG9Qb3NbMV0gLSBtaW5bMV0pICUgKG1heFsxXSAtIG1pblsxXSArIDEpICsgbWluWzFdO1xuXHRcdH1cblx0XHRpZiAoY2lyY3VsYXJbM10gJiYgdG9Qb3NbMF0gPCBtaW5bMF0pIHsgLy8gbGVmdFxuXHRcdFx0dG9Qb3NbMF0gPSAodG9Qb3NbMF0gLSBtaW5bMF0pICUgKG1heFswXSAtIG1pblswXSArIDEpICsgbWF4WzBdO1xuXHRcdH1cblxuXHRcdHRvUG9zWzBdID0gK3RvUG9zWzBdLnRvRml4ZWQoNSk7XG5cdFx0dG9Qb3NbMV0gPSArdG9Qb3NbMV0udG9GaXhlZCg1KTtcblx0XHRyZXR1cm4gdG9Qb3M7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvb3JkaW5hdGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29vcmRpbmF0ZS5qcyIsImltcG9ydCB7d2luZG93LCBkb2N1bWVudH0gZnJvbSBcIi4vYnJvd3NlclwiO1xuXG5jb25zdCB1dGlscyA9IHtcblx0Z2V0RWxlbWVudChlbCkge1xuXHRcdGlmICh0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcblx0XHR9IGVsc2UgaWYgKHdpbmRvdy5qUXVlcnkgJiYgKGVsIGluc3RhbmNlb2YgalF1ZXJ5KSkge1xuXHRcdFx0Ly8gaWYgeW91IHdlcmUgdXNpbmcgalF1ZXJ5XG5cdFx0XHRyZXR1cm4gZWwubGVuZ3RoID4gMCA/IGVsWzBdIDogbnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH1cblx0fVxufTtcblxuY2xhc3MgTWl4aW5CdWlsZGVyIHtcblx0Y29uc3RydWN0b3Ioc3VwZXJjbGFzcykge1xuXHRcdHRoaXMuc3VwZXJjbGFzcyA9IHN1cGVyY2xhc3MgfHwgY2xhc3Mge307XG5cdH1cblx0d2l0aCguLi5taXhpbnMpIHtcblx0XHRyZXR1cm4gbWl4aW5zLnJlZHVjZSgoYywgbSkgPT4gbShjKSwgdGhpcy5zdXBlcmNsYXNzKTtcblx0fVxufVxuXG5jb25zdCBNaXhpbiA9IHN1cGVyY2xhc3MgPT4gbmV3IE1peGluQnVpbGRlcihzdXBlcmNsYXNzKTtcblxuZXhwb3J0IHtNaXhpbiwgdXRpbHN9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzLmpzIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQGVnanMvY29tcG9uZW50XCI7XG5pbXBvcnQgSGFtbWVyTWFuYWdlciBmcm9tIFwiLi9oYW1tZXJNYW5hZ2VyXCI7XG5pbXBvcnQgRXZlbnRIYW5kbGVyIGZyb20gXCIuL2V2ZW50SGFuZGxlclwiO1xuaW1wb3J0IEFuaW1hdGlvbkhhbmRsZXIgZnJvbSBcIi4vYW5pbWF0aW9uSGFuZGxlclwiO1xuaW1wb3J0IHtESVJFQ1RJT059IGZyb20gXCIuL2NvbnN0c1wiO1xuaW1wb3J0IHtNaXhpbn0gZnJvbSBcIi4vdXRpbHNcIjtcblxuLyoqXG4gKiBBIG1vZHVsZSB1c2VkIHRvIGNoYW5nZSB0aGUgaW5mb3JtYXRpb24gb2YgdXNlciBhY3Rpb24gZW50ZXJlZCBieSB2YXJpb3VzIGlucHV0IGRldmljZXMgc3VjaCBhcyB0b3VjaCBzY3JlZW4gb3IgbW91c2UgaW50byBsb2dpY2FsIGNvb3JkaW5hdGVzIHdpdGhpbiB0aGUgdmlydHVhbCBjb29yZGluYXRlIHN5c3RlbS4gVGhlIGNvb3JkaW5hdGUgaW5mb3JtYXRpb24gc29ydGVkIGJ5IHRpbWUgZXZlbnRzIG9jY3VycmVkIGlzIHByb3ZpZGVkIGlmIGFuaW1hdGlvbnMgYXJlIG1hZGUgYnkgdXNlciBhY3Rpb25zLiBZb3UgY2FuIGltcGxlbWVudCBhIHVzZXIgaW50ZXJmYWNlIGJ5IGFwcGx5aW5nIHRoZSBsb2dpY2FsIGNvb3JkaW5hdGVzIHByb3ZpZGVkLiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiB0aGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZSwgc2VlIGRlbW9zLlxuICogQGtvIO2EsOy5mCDsnoXroKUg7J6l7LmY64KYIOuniOyasOyKpOyZgCDqsJnsnYAg64uk7JaR7ZWcIOyeheugpSDsnqXsuZjroZwg7KCE64usIOuwm+ydgCDsgqzsmqnsnpDsnZgg64+Z7J6R7J2EIOqwgOyDgSDsooztkZzqs4TsnZgg64W866as7KCBIOyijO2RnOuhnCDrs4Dqsr3tlZjripQg66qo65OILiDsgqzsmqnsnpDsnZgg64+Z7J6R7Jy866GcIOyVoOuLiOuplOydtOyFmOydtCDsnbzslrTrgpjrqbQg7Iuc6rCE7Iic7Jy866GcIOuzgOqyveuQmOuKlCDsooztkZwg7KCV67O064+EIOygnOqzte2VnOuLpC4g67OA6rK965CcIOuFvOumrOyggSDsooztkZzrpbwg67CY7JiB7ZW0IFVJ66W8IOq1rO2YhO2VoCDsiJgg7J6I64ukLiBlZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2YIOyekOyEuO2VnCDsnpHrj5kg67Cp7Iud7J2AIOuNsOuqqOulvCDssLjqs6DtlZzri6QuXG4gKiBAY2xhc3NcbiAqIEBuYW1lIGVnLk1vdmFibGVDb29yZFxuICogQGV4dGVuZHMgZWcuQ29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIG9wdGlvbiBvYmplY3Qgb2YgdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGU8a28+ZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydmCDsmLXshZgg6rCd7LK0PC9rbz5cbiAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMubWluIFRoZSBtaW5pbXVtIHZhbHVlIG9mIFggYW5kIFkgY29vcmRpbmF0ZXMgPGtvPuyijO2RnOqzhOydmCDstZzshp/qsJI8L2tvPlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1pbi4wPTBdIFRoZSBYIGNvb3JkaW5hdGUgb2YgdGhlIG1pbmltdW0gPGtvPuy1nOyGjCB47KKM7ZGcPC9rbz5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5taW4uMT0wXSBUaGUgWSBjb29yZGluYXRlIG9mIHRoZSBtaW5pbXVtIDxrbz7stZzshowgeeyijO2RnDwva28+XG4gKlxuICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5tYXggVGhlIG1heGltdW0gdmFsdWUgb2YgWCBhbmQgWSBjb29yZGluYXRlcyA8a28+7KKM7ZGc6rOE7J2YIOy1nOuMk+qwkjwva28+XG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4LjA9MTAwXSBUaGUgWCBjb29yZGluYXRlIG9mIHRoZSBtYXhpbXVtPGtvPuy1nOuMgCB47KKM7ZGcPC9rbz5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5tYXguMT0xMDBdIFRoZSBZIGNvb3JkaW5hdGUgb2YgdGhlIG1heGltdW08a28+7LWc64yAIHnsooztkZw8L2tvPlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuYm91bmNlIFRoZSBzaXplIG9mIGJvdW5jaW5nIGFyZWEuIFRoZSBjb29yZGluYXRlcyBjYW4gZXhjZWVkIHRoZSBjb29yZGluYXRlIGFyZWEgYXMgbXVjaCBhcyB0aGUgYm91bmNpbmcgYXJlYSBiYXNlZCBvbiB1c2VyIGFjdGlvbi4gSWYgdGhlIGNvb3JkaW5hdGVzIGRvZXMgbm90IGV4Y2VlZCB0aGUgYm91bmNpbmcgYXJlYSB3aGVuIGFuIGVsZW1lbnQgaXMgZHJhZ2dlZCwgdGhlIGNvb3JkaW5hdGVzIHdoZXJlIGJvdW5jaW5nIGVmZmVjdHMgYXJlIGFwcGxpZWQgYXJlIHJldHVuZWQgYmFjayBpbnRvIHRoZSBjb29yZGluYXRlIGFyZWE8a28+67CU7Jq07IqkIOyYgeyXreydmCDtgazquLAuIOyCrOyaqeyekOydmCDrj5nsnpHsl5Ag65Sw6528IOyijO2RnOqwgCDsooztkZwg7JiB7Jet7J2EIOuEmOyWtCDrsJTsmrTsiqQg7JiB7Jet7J2YIO2BrOq4sOunjO2BvCDrjZQg7J2064+Z7ZWgIOyImCDsnojri6QuIOyCrOyaqeyekOqwgCDrgYzslrTri6Qg64aT64qUIOuPmeyekeydhCDtlojsnYQg65WMIOyijO2RnOqwgCDrsJTsmrTsiqQg7JiB7Jet7JeQIOyeiOycvOuptCwg67CU7Jq07IqkIO2aqOqzvOqwgCDsoIHsmqnrkJwg7KKM7ZGc6rCAIOuLpOyLnCDsooztkZwg7JiB7JetIOyViOycvOuhnCDrk6TslrTsmKjri6Q8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ib3VuY2UuMD0xMF0gVGhlIHNpemUgb2YgdG9wIGFyZWEgPGtvPuychOyqvSDrsJTsmrTsiqQg7JiB7Jet7J2YIO2BrOq4sDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmJvdW5jZS4xPTEwXSBUaGUgc2l6ZSBvZiByaWdodCBhcmVhIDxrbz7smKTrpbjsqr0g67CU7Jq07IqkIOyYgeyXreydmCDtgazquLA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ib3VuY2UuMj0xMF0gVGhlIHNpemUgb2YgYm90dG9tIGFyZWEgPGtvPuyVhOuemOyqvSDrsJTsmrTsiqQg7JiB7Jet7J2YIO2BrOq4sDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmJvdW5jZS4zPTEwXSBUaGUgc2l6ZSBvZiBsZWZ0IGFyZWEgPGtvPuyZvOyqvSDrsJTsmrTsiqQg7JiB7Jet7J2YIO2BrOq4sDwva28+XG4gKlxuICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5tYXJnaW4gVGhlIHNpemUgb2YgYWNjZXNzaWJsZSBzcGFjZSBvdXRzaWRlIHRoZSBjb29yZGluYXRlIGFyZWEuIElmIGFuIGVsZW1lbnQgaXMgZHJhZ2dlZCBvdXRzaWRlIHRoZSBjb29yZGluYXRlIGFyZWEgYW5kIHRoZW4gZHJvcHBlZCwgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBlbGVtZW50IGFyZSByZXR1cm5lZCBiYWNrIGludG8gdGhlIGNvb3JkaW5hdGUgYXJlYS4gVGhlIHNpemUgb2YgbWFyZ2lucyB0aGF0IGNhbiBiZSBleGNlZWRlZCA8a28+4oiSXHTsooztkZwg7JiB7Jet7J2EIOuEmOyWtCDsnbTrj5ntlaAg7IiYIOyeiOuKlCDrsJTquaUg7JiB7Jet7J2YIO2BrOq4sC4g7IKs7Jqp7J6Q6rCAIOyijO2RnOulvCDrsJTquaUg7JiB7Jet6rmM7KeAIOuBjOyXiOuLpOqwgCDrhpPsnLzrqbQg7KKM7ZGc6rCAIOyijO2RnCDsmIHsl60g7JWI7Jy866GcIOuTpOyWtOyYqOuLpC48L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tYXJnaW4uMD0wXSBUaGUgc2l6ZSBvZiB0b3AgbWFyZ2luIDxrbz7snITsqr0g67CU6rmlIOyYgeyXreydmCDtgazquLA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tYXJnaW4uMT0wXSBUaGUgc2l6ZSBvZiByaWdodCBtYXJnaW4gPGtvPuyYpOuluOyqvSDrsJTquaUg7JiB7Jet7J2YIO2BrOq4sDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1hcmdpbi4yPTBdIFRoZSBzaXplIG9mIGJvdHRvbSBtYXJnaW4gPGtvPuyVhOuemOyqvSDrsJTquaUg7JiB7Jet7J2YIO2BrOq4sDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1hcmdpbi4zPTBdIFRoZSBzaXplIG9mIGxlZnQgbWFyZ2luIDxrbz7smbzsqr0g67CU6rmlIOyYgeyXreydmCDtgazquLA8L2tvPlxuICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5jaXJjdWxhciBJbmRpY2F0ZXMgd2hldGhlciBhIGNpcmN1bGFyIGVsZW1lbnQgaXMgYXZhaWxhYmxlLiBJZiBpdCBpcyBzZXQgdG8gXCJ0cnVlXCIgYW5kIGFuIGVsZW1lbnQgaXMgZHJhZ2dlZCBvdXRzaWRlIHRoZSBjb29yZGluYXRlIGFyZWEsIHRoZSBlbGVtZW50IHdpbGwgYXBwZWFyIG9uIHRoZSBvdGhlciBzaWRlLjxrbz7siJztmZgg7Jes67aALiAndHJ1ZSfroZwg7ISk7KCV7ZWcIOuwqe2WpeydmCDsooztkZwg7JiB7JetIOuwluycvOuhnCDsl5jrpqzrqLztirjqsIAg7J2064+Z7ZWY66m0IOuwmOuMgCDrsKntlqXsl5DshJwg7JeY66as66i87Yq46rCAIOuCmO2DgOuCnOuLpDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNpcmN1bGFyLjA9ZmFsc2VdIEluZGljYXRlcyB3aGV0aGVyIHRvIGNpcmN1bGF0ZSB0byB0b3AgPGtvPuychOuhnCDsiJztmZgg7Jes67aAPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2lyY3VsYXIuMT1mYWxzZV0gSW5kaWNhdGVzIHdoZXRoZXIgdG8gY2lyY3VsYXRlIHRvIHJpZ2h0IDxrbz7smKTrpbjsqr3snLzroZwg7Iic7ZmYIOyXrOu2gDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNpcmN1bGFyLjI9ZmFsc2VdIEluZGljYXRlcyB3aGV0aGVyIHRvIGNpcmN1bGF0ZSB0byBib3R0b20gIDxrbz7slYTrnpjroZwg7Iic7ZmYIOyXrOu2gDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNpcmN1bGFyLjM9ZmFsc2VdIEluZGljYXRlcyB3aGV0aGVyIHRvIGNpcmN1bGF0ZSB0byBsZWZ0ICA8a28+7Jm87Kq97Jy866GcIOyInO2ZmCDsl6zrtoA8L2tvPlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmVhc2luZz1lYXNpbmcuZWFzZU91dEN1YmljXSBUaGUgZWFzaW5nIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGFuIGFuaW1hdGlvbiA8a28+7JWg64uI66mU7J207IWY7JeQIOyggeyaqe2VoCBlYXNpbmcg7ZWo7IiYPC9rbz5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5tYXhpbXVtRHVyYXRpb249SW5maW5pdHldIE1heGltdW0gZHVyYXRpb24gb2YgdGhlIGFuaW1hdGlvbiA8a28+6rCA7IaN64+E7JeQIOydmO2VtCDslaDri4jrqZTsnbTshZjsnbQg64+Z7J6R7ZWgIOuVjOydmCDstZzrjIAg7KKM7ZGcIOydtOuPmSDsi5zqsIQ8L2tvPlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmRlY2VsZXJhdGlvbj0wLjAwMDZdIERlY2VsZXJhdGlvbiBvZiB0aGUgYW5pbWF0aW9uIHdoZXJlIGFjY2VsZXJhdGlvbiBpcyBtYW51YWxseSBlbmFibGVkIGJ5IHVzZXIuIEEgaGlnaGVyIHZhbHVlIGluZGljYXRlcyBzaG9ydGVyIHJ1bm5pbmcgdGltZS4gPGtvPuyCrOyaqeyekOydmCDrj5nsnpHsnLzroZwg6rCA7IaN64+E6rCAIOyggeyaqeuQnCDslaDri4jrqZTsnbTshZjsnZgg6rCQ7IaN64+ELiDqsJLsnbQg64aS7J2E7IiY66GdIOyVoOuLiOuplOydtOyFmCDsi6Ttlokg7Iuc6rCE7J20IOynp+yVhOynhOuLpDwva28+XG4gKiBAc2VlIEhhbW1lckpTIHtAbGluayBodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvfVxuICogQHNlZSDigKIgSGFtbWVyLkpTIGFwcGxpZXMgc3BlY2lmaWMgQ1NTIHByb3BlcnRpZXMgYnkgZGVmYXVsdCB3aGVuIGNyZWF0aW5nIGFuIGluc3RhbmNlIChTZWUge0BsaW5rIGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vanNkb2MvSGFtbWVyLmRlZmF1bHRzLmNzc1Byb3BzLmh0bWx9KS4gVGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUgcmVtb3ZlcyBhbGwgZGVmYXVsdCBDU1MgcHJvcGVydGllcyBwcm92aWRlZCBieSBIYW1tZXIuSlMgPGtvPkhhbW1lci5KU+uKlCDsnbjsiqTthLTsiqTrpbwg7IOd7ISx7ZWgIOuVjCDquLDrs7jsnLzroZwg7Yq57KCVIENTUyDsho3shLHsnYQg7KCB7Jqp7ZWc64ukKOywuOqzoDogQGxpbmt7aHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby9qc2RvYy9IYW1tZXIuZGVmYXVsdHMuY3NzUHJvcHMuaHRtbH0pLiDtirnsoJXtlZwg7IOB7Zmp7JeQ7ISc64qUIEhhbW1lci5KU+ydmCDsho3shLEg65WM66y47JeQIOyCrOyaqeyEseyXkCDrrLjsoJzqsIAg7J6I7J2EIOyImCDsnojri6QuIGVnLk1vdmFibGVDb29yZCDrqqjrk4jsnYAgSGFtbWVyLkpT7J2YIOq4sOuzuCBDU1Mg7IaN7ISx7J2EIOuqqOuRkCDsoJzqsbDtlojri6Q8L2tvPlxuICpcbiAqIEBjb2RlcGVuIHtcImlkXCI6XCJqUFBxZVJcIiwgXCJrb1wiOlwiTW92YWJsZUNvb3JkIEN1YmUg7JiI7KCcXCIsIFwiZW5cIjpcIk1vdmFibGVDb29yZCBDdWJlIGV4YW1wbGVcIiwgXCJjb2xsZWN0aW9uSWRcIjpcIkFLcGtHV1wiLCBcImhlaWdodFwiOiA0MDN9XG4gKlxuICogQHNlZSBFYXNpbmcgRnVuY3Rpb25zIENoZWF0IFNoZWV0IHtAbGluayBodHRwOi8vZWFzaW5ncy5uZXQvfVxuICogQHNlZSBJZiB5b3Ugd2FudCB0byB0cnkgYSBkaWZmZXJlbnQgZWFzaW5nIGZ1bmN0aW9uLCB1c2UgdGhlIGpRdWVyeSBlYXNpbmcgcGx1Z2luICh7QGxpbmsgaHR0cDovL2dzZ2QuY28udWsvc2FuZGJveC9qcXVlcnkvZWFzaW5nfSkgb3IgdGhlIGpRdWVyeSBVSSBlYXNpbmcgbGlicmFyeSAoe0BsaW5rIGh0dHBzOi8vanF1ZXJ5dWkuY29tL2Vhc2luZ30pIDxrbz7ri6TrpbggZWFzaW5nIO2VqOyImOulvCDsgqzsmqntlZjroKTrqbQgalF1ZXJ5IGVhc2luZyDtlIzrn6zqt7jsnbgoe0BsaW5rIGh0dHA6Ly9nc2dkLmNvLnVrL3NhbmRib3gvanF1ZXJ5L2Vhc2luZ30p7J2064KYLCBqUXVlcnkgVUkgZWFzaW5nIOudvOydtOu4jOufrOumrCh7QGxpbiBodHRwczovL2pxdWVyeXVpLmNvbS9lYXNpbmd9KeulvCDsgqzsmqntlZzri6Q8L2tvPlxuICpcbiAqIEBzdXBwb3J0IHtcImllXCI6IFwiMTArXCIsIFwiY2hcIiA6IFwibGF0ZXN0XCIsIFwiZmZcIiA6IFwibGF0ZXN0XCIsICBcInNmXCIgOiBcImxhdGVzdFwiLCBcImVkZ2VcIiA6IFwibGF0ZXN0XCIsIFwiaW9zXCIgOiBcIjcrXCIsIFwiYW5cIiA6IFwiMi4zKyAoZXhjZXB0IDMueClcIn1cbiAqL1xuY29uc3QgTW92YWJsZUNvb3JkID0gY2xhc3MgTW92YWJsZUNvb3JkXG5leHRlbmRzIE1peGluKENvbXBvbmVudCkud2l0aChFdmVudEhhbmRsZXIsIEFuaW1hdGlvbkhhbmRsZXIpIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKCk7XG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbnMgPSB7XG5cdFx0XHRtaW46IFswLCAwXSxcblx0XHRcdG1heDogWzEwMCwgMTAwXSxcblx0XHRcdGJvdW5jZTogWzEwLCAxMCwgMTAsIDEwXSxcblx0XHRcdG1hcmdpbjogWzAsIDAsIDAsIDBdLFxuXHRcdFx0Y2lyY3VsYXI6IFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG5cdFx0XHRlYXNpbmc6IGZ1bmN0aW9uIGVhc2VPdXRDdWJpYyh4KSB7XG5cdFx0XHRcdHJldHVybiAxIC0gTWF0aC5wb3coMSAtIHgsIDMpO1xuXHRcdFx0fSxcblx0XHRcdG1heGltdW1EdXJhdGlvbjogSW5maW5pdHksXG5cdFx0XHRkZWNlbGVyYXRpb246IDAuMDAwNlxuXHRcdH0sIG9wdGlvbnMpO1xuXHRcdHRoaXMuX3JldmlzZU9wdGlvbnMoKTtcblx0XHR0aGlzLl9oYW1tZXJNYW5hZ2VyID0gbmV3IEhhbW1lck1hbmFnZXIoKTtcblx0XHR0aGlzLl9wb3MgPSB0aGlzLm9wdGlvbnMubWluLmNvbmNhdCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlZ2lzdGVycyBhbiBlbGVtZW50IHRvIHVzZSB0aGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZS5cblx0ICogQGtvIGVnLk1vdmFibGVDb29yZCDrqqjrk4jsnYQg7IKs7Jqp7ZWgIOyXmOumrOuovO2KuOulvCDrk7HroZ3tlZzri6Rcblx0ICogQG1ldGhvZCBlZy5Nb3ZhYmxlQ29vcmQjYmluZFxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ3xqUXVlcnl9IGVsZW1lbnQgQW4gZWxlbWVudCB0byB1c2UgdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGU8a28+4oiSXHRlZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2EIOyCrOyaqe2VoCDsl5jrpqzrqLztirg8L2tvPlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUaGUgb3B0aW9uIG9iamVjdCBvZiB0aGUgYmluZCgpIG1ldGhvZCA8a28+YmluZCgpIOuplOyEnOuTnOydmCDsmLXshZgg6rCd7LK0PC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmRpcmVjdGlvbj1lZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX0FMTF0gQ29vcmRpbmF0ZSBkaXJlY3Rpb24gdGhhdCBhIHVzZXIgY2FuIG1vdmU8YnI+LSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX0FMTDogQWxsIGRpcmVjdGlvbnMgYXZhaWxhYmxlLjxicj4tIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fSE9SSVpPTlRBTDogSG9yaXpvbnRhbCBkaXJlY3Rpb24gb25seS48YnI+LSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX1ZFUlRJQ0FMOiBWZXJ0aWNhbCBkaXJlY3Rpb24gb25seTxrbz7sgqzsmqnsnpDsnZgg64+Z7J6R7Jy866GcIOybgOyngeydvCDsiJgg7J6I64qUIOyijO2RnOydmCDrsKntlqUuPGJyPi0gZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9BTEw6IOuqqOuToCDrsKntlqXsnLzroZwg7JuA7KeB7J28IOyImCDsnojri6QuPGJyPi0gZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9IT1JJWk9OVEFMOiDqsIDroZwg67Cp7Zal7Jy866Gc66eMIOybgOyngeydvCDsiJgg7J6I64ukLjxicj4tIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fVkVSVElDQUw6IOyEuOuhnCDrsKntlqXsnLzroZzrp4wg7JuA7KeB7J28IOyImCDsnojri6QuPC9rbz5cblx0ICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5zY2FsZSBDb29yZGluYXRlIHNjYWxlIHRoYXQgYSB1c2VyIGNhbiBtb3ZlPGtvPuyCrOyaqeyekOydmCDrj5nsnpHsnLzroZwg7J2064+Z7ZWY64qUIOyijO2RnOydmCDrsLDsnKg8L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuc2NhbGUuMD0xXSBYLWF4aXMgc2NhbGUgPGtvPnjstpUg67Cw7JyoPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnNjYWxlLjE9MV0gWS1heGlzIHNjYWxlIDxrbz557LaVIOuwsOycqDwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy50aHJlc2hvbGRBbmdsZT00NV0gVGhlIHRocmVzaG9sZCB2YWx1ZSB0aGF0IGRldGVybWluZXMgd2hldGhlciB1c2VyIGFjdGlvbiBpcyBob3Jpem9udGFsIG9yIHZlcnRpY2FsICgwfjkwKSA8a28+7IKs7Jqp7J6Q7J2YIOuPmeyekeydtCDqsIDroZwg67Cp7Zal7J247KeAIOyEuOuhnCDrsKntlqXsnbjsp4Ag7YyQ64uo7ZWY64qUIOq4sOykgCDqsIHrj4QoMH45MCk8L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuaW50ZXJydXB0YWJsZT10cnVlXSBJbmRpY2F0ZXMgd2hldGhlciBhbiBhbmltYXRpb24gaXMgaW50ZXJydXB0aWJsZS48YnI+LSB0cnVlOiBJdCBjYW4gYmUgcGF1c2VkIG9yIHN0b3BwZWQgYnkgdXNlciBhY3Rpb24gb3IgdGhlIEFQSS48YnI+LSBmYWxzZTogSXQgY2Fubm90IGJlIHBhdXNlZCBvciBzdG9wcGVkIGJ5IHVzZXIgYWN0aW9uIG9yIHRoZSBBUEkgd2hpbGUgaXQgaXMgcnVubmluZy48a28+7KeE7ZaJIOykkeyduCDslaDri4jrqZTsnbTshZgg7KSR7KeAIOqwgOuKpSDsl6zrtoAuPGJyPi0gdHJ1ZTog7IKs7Jqp7J6Q7J2YIOuPmeyekeydtOuCmCBBUEnroZwg7JWg64uI66mU7J207IWY7J2EIOykkeyngO2VoCDsiJgg7J6I64ukLjxicj4tIGZhbHNlOiDslaDri4jrqZTsnbTshZjsnbQg7KeE7ZaJIOykkeydvCDrlYzripQg7IKs7Jqp7J6Q7J2YIOuPmeyekeydtOuCmCBBUEnqsIAg7KCB7Jqp65CY7KeAIOyViuuKlOuLpDwva28+XG5cdCAqIEBwYXJhbSB7QXJyYXl9IFtvcHRpb25zLmlucHV0VHlwZV0gVHlwZXMgb2YgaW5wdXQgZGV2aWNlcy4gKGRlZmF1bHQ6IFtcInRvdWNoXCIsIFwibW91c2VcIl0pPGJyPi0gdG91Y2g6IFRvdWNoIHNjcmVlbjxicj4tIG1vdXNlOiBNb3VzZSA8a28+7J6F66ClIOyepey5mCDsooXrpZguKOq4sOuzuOqwkjogW1widG91Y2hcIiwgXCJtb3VzZVwiXSk8YnI+LSB0b3VjaDog7YSw7LmYIOyeheugpSDsnqXsuZg8YnI+LSBtb3VzZTog66eI7Jqw7IqkPC9rbz5cblx0ICpcblx0ICogQHJldHVybiB7ZWcuTW92YWJsZUNvb3JkfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGYgPGtvPuuqqOuTiCDsnpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICovXG5cdGJpbmQoZWxlbWVudCwgb3B0aW9ucykge1xuXHRcdHRoaXMuX2hhbW1lck1hbmFnZXIuYWRkKGVsZW1lbnQsIG9wdGlvbnMsIHRoaXMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdC8qKlxuXHQgKiBEZXRhY2hlcyBhbiBlbGVtZW50IHVzaW5nIHRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlLlxuXHQgKiBAa28gZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydhCDsgqzsmqntlZjripQg7JeY66as66i87Yq466W8IO2VtOygnO2VnOuLpFxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCN1bmJpbmRcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd8alF1ZXJ5fSBlbGVtZW50IEFuIGVsZW1lbnQgZnJvbSB3aGljaCB0aGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZSBpcyBkZXRhY2hlZDxrbz5lZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2EIO2VtOygnO2VoCDsl5jrpqzrqLztirg8L2tvPlxuXHQgKiBAcmV0dXJuIHtlZy5Nb3ZhYmxlQ29vcmR9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZjxrbz7rqqjrk4gg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqL1xuXHR1bmJpbmQoZWxlbWVudCkge1xuXHRcdHRoaXMuX2hhbW1lck1hbmFnZXIucmVtb3ZlKGVsZW1lbnQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIGdldCBhIGhhbW1lciBpbnN0YW5jZSBmcm9tIGVsZW1lbnRzIHVzaW5nIHRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlLlxuXHQgKiBAa28gZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydhCDsgqzsmqntlZjripQg7JeY66as66i87Yq47JeQ7IScIGhhbW1lciDqsJ3ssrTrpbwg7Ja764qU64ukXG5cdCAqIEBtZXRob2QgZWcuTW92YWJsZUNvb3JkI2dldEhhbW1lclxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ3xqUXVlcnl9IGVsZW1lbnQgQW4gZWxlbWVudCBmcm9tIHdoaWNoIHRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlIGlzIHVzaW5nPGtvPmVnLk1vdmFibGVDb29yZCDrqqjrk4jsnYQg7IKs7Jqp7ZWY64qUIOyXmOumrOuovO2KuDwva28+XG5cdCAqIEByZXR1cm4ge0hhbW1lcnxudWxsfSBBbiBpbnN0YW5jZSBvZiBIYW1tZXIuSlM8a28+SGFtbWVyLkpT7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqL1xuXHRnZXRIYW1tZXIoZWxlbWVudCkge1xuXHRcdHJldHVybiB0aGlzLl9oYW1tZXJNYW5hZ2VyLmdldEhhbW1lcihlbGVtZW50KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFbmFibGVzIGlucHV0IGRldmljZXNcblx0ICogQGtvIOyeheugpSDsnqXsuZjrpbwg7IKs7Jqp7ZWgIOyImCDsnojqsowg7ZWc64ukXG5cdCAqIEBtZXRob2QgZWcuTW92YWJsZUNvb3JkI2VuYWJsZUlucHV0XG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8U3RyaW5nfGpRdWVyeX0gW2VsZW1lbnRdIEFuIGVsZW1lbnQgZnJvbSB3aGljaCB0aGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZSBpcyB1c2luZyAoaWYgdGhlIGVsZW1lbnQgcGFyYW1ldGVyIGlzIG5vdCBwcmVzZW50LCBpdCBhcHBsaWVzIHRvIGFsbCBiaW5kZWQgZWxlbWVudHMpPGtvPmVnLk1vdmFibGVDb29yZCDrqqjrk4jsnYQgXHTsgqzsmqntlZjripQg7JeY66as66i87Yq4IChlbGVtZW50IO2MjOudvOuvuO2EsOqwgCDsobTsnqztlZjsp4Ag7JWK7J2EIOqyveyasCwg67CU7J2465Oc65CcIOuqqOuToCDsl5jrpqzrqLztirjsl5Ag7KCB7Jqp65Cc64ukKTwva28+XG5cdCAqIEByZXR1cm4ge2VnLk1vdmFibGVDb29yZH0gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmIDxrbz7snpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0Ki9cblx0ZW5hYmxlSW5wdXQoZWxlbWVudCkge1xuXHRcdHJldHVybiB0aGlzLl9oYW1tZXJNYW5hZ2VyLmlucHV0Q29udHJvbCh0cnVlLCBlbGVtZW50KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEaXNhYmxlcyBpbnB1dCBkZXZpY2VzXG5cdCAqIEBrbyDsnoXroKUg7J6l7LmY66W8IOyCrOyaqe2VoCDsiJgg7JeG6rKMIO2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5Nb3ZhYmxlQ29vcmQjZGlzYWJsZUlucHV0XG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8U3RyaW5nfGpRdWVyeX0gW2VsZW1lbnRdIEFuIGVsZW1lbnQgZnJvbSB3aGljaCB0aGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZSBpcyB1c2luZyAoaWYgdGhlIGVsZW1lbnQgcGFyYW1ldGVyIGlzIG5vdCBwcmVzZW50LCBpdCBhcHBsaWVzIHRvIGFsbCBiaW5kZWQgZWxlbWVudHMpPDxrbz5lZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2EIFx07IKs7Jqp7ZWY64qUIOyXmOumrOuovO2KuCAoZWxlbWVudCDtjIzrnbzrr7jthLDqsIAg7KG07J6s7ZWY7KeAIOyViuydhCDqsr3smrAsIOuwlOyduOuTnOuQnCDrqqjrk6Ag7JeY66as66i87Yq47JeQIOyggeyaqeuQnOuLpCk8L2tvPlxuXHQgKiBAcmV0dXJuIHtlZy5Nb3ZhYmxlQ29vcmR9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZiA8a28+7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqL1xuXHRkaXNhYmxlSW5wdXQoZWxlbWVudCkge1xuXHRcdHJldHVybiB0aGlzLl9oYW1tZXJNYW5hZ2VyLmlucHV0Q29udHJvbChmYWxzZSwgZWxlbWVudCk7XG5cdH1cblxuXHQvLyBzZXQgdXAgJ2NzcycgZXhwcmVzc2lvblxuXHRfcmV2aXNlT3B0aW9ucygpIHtcblx0XHRsZXQga2V5O1xuXG5cdFx0W1wiYm91bmNlXCIsIFwibWFyZ2luXCIsIFwiY2lyY3VsYXJcIl0uZm9yRWFjaCh2ID0+IHtcblx0XHRcdGtleSA9IHRoaXMub3B0aW9uc1t2XTtcblx0XHRcdGlmIChrZXkgIT0gbnVsbCkge1xuXHRcdFx0XHRpZiAoa2V5LmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xuXHRcdFx0XHRcdHRoaXMub3B0aW9uc1t2XSA9IGtleS5sZW5ndGggPT09IDIgP1xuXHRcdFx0XHRcdFx0a2V5LmNvbmNhdChrZXkpIDoga2V5LmNvbmNhdCgpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKC9zdHJpbmd8bnVtYmVyfGJvb2xlYW4vLnRlc3QodHlwZW9mIGtleSkpIHtcblx0XHRcdFx0XHR0aGlzLm9wdGlvbnNbdl0gPSBba2V5LCBrZXksIGtleSwga2V5XTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLm9wdGlvbnNbdl0gPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgY3VycmVudCBwb3NpdGlvbiBvZiB0aGUgbG9naWNhbCBjb29yZGluYXRlcy5cblx0ICogQGtvIOuFvOumrOyggSDsooztkZzsnZgg7ZiE7J6sIOychOy5mOulvCDrsJjtmZjtlZzri6Rcblx0ICogQG1ldGhvZCBlZy5Nb3ZhYmxlQ29vcmQjZ2V0XG5cdCAqIEByZXR1cm4ge0FycmF5fSBwb3MgPGtvPuyijO2RnDwva28+XG5cdCAqIEByZXR1cm4ge051bWJlcn0gcG9zLjAgVGhlIFggY29vcmRpbmF0ZSA8a28+eCDsooztkZw8L2tvPlxuXHQgKiBAcmV0dXJuIHtOdW1iZXJ9IHBvcy4xIFRoZSBZIGNvb3JkaW5hdGUgPGtvPnkg7KKM7ZGcPC9rbz5cblx0ICovXG5cdGdldCgpIHtcblx0XHRyZXR1cm4gdGhpcy5fcG9zLmNvbmNhdCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlc3Ryb3lzIGVsZW1lbnRzLCBwcm9wZXJ0aWVzLCBhbmQgZXZlbnRzIHVzZWQgaW4gYSBtb2R1bGUuXG5cdCAqIEBrbyDrqqjrk4jsl5Ag7IKs7Jqp7ZWcIOyXmOumrOuovO2KuOyZgCDsho3shLEsIOydtOuypO2KuOulvCDtlbTsoJztlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuTW92YWJsZUNvb3JkI2Rlc3Ryb3lcblx0ICovXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5vZmYoKTtcblx0XHR0aGlzLl9oYW1tZXJNYW5hZ2VyLmRlc3Ryb3koKTtcblx0fVxufTtcblxuT2JqZWN0LmFzc2lnbihNb3ZhYmxlQ29vcmQsIERJUkVDVElPTik7XG5Nb3ZhYmxlQ29vcmQuVkVSU0lPTiA9IFwiMi4wLjAtYmV0YVwiO1xuZXhwb3J0IGRlZmF1bHQgTW92YWJsZUNvb3JkO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vdmFibGVDb29yZC5qcyIsImltcG9ydCBDb29yZGluYXRlIGZyb20gXCIuL2Nvb3JkaW5hdGVcIjtcbmltcG9ydCB7d2luZG93fSBmcm9tIFwiLi9icm93c2VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHN1cGVyY2xhc3MgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLl9yYWYgPSBudWxsO1xuXHRcdHRoaXMuX2FuaW1hdGVQYXJhbSA9IG51bGw7XG5cdFx0dGhpcy5fYW5pbWF0aW9uRW5kID0gdGhpcy5fYW5pbWF0aW9uRW5kLmJpbmQodGhpcyk7XHQvLyBmb3IgY2FjaGluZ1xuXHRcdHRoaXMuX3Jlc3RvcmUgPSB0aGlzLl9yZXN0b3JlLmJpbmQodGhpcyk7XHQvLyBmb3IgY2FjaGluZ1xuXHR9XG5cblx0X2dyYWIobWluLCBtYXgsIGNpcmN1bGFyKSB7XG5cdFx0aWYgKHRoaXMuX2FuaW1hdGVQYXJhbSkge1xuXHRcdFx0dGhpcy50cmlnZ2VyKFwiYW5pbWF0aW9uRW5kXCIpO1xuXHRcdFx0Y29uc3Qgb3JnUG9zID0gdGhpcy5nZXQoKTtcblxuXHRcdFx0Y29uc3QgcG9zID0gQ29vcmRpbmF0ZS5nZXRDaXJjdWxhclBvcyh0aGlzLmdldCgpLCBtaW4sIG1heCwgY2lyY3VsYXIpO1xuXG5cdFx0XHRpZiAocG9zWzBdICE9PSBvcmdQb3NbMF0gfHwgcG9zWzFdICE9PSBvcmdQb3NbMV0pIHtcblx0XHRcdFx0dGhpcy5fc2V0UG9zQW5kVHJpZ2dlckNoYW5nZShwb3MsIHRydWUpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fYW5pbWF0ZVBhcmFtID0gbnVsbDtcblx0XHRcdHRoaXMuX3JhZiAmJiB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5fcmFmKTtcblx0XHRcdHRoaXMuX3JhZiA9IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0X3ByZXBhcmVQYXJhbShhYnNQb3MsIGR1cmF0aW9uLCBoYW1tZXJFdmVudCkge1xuXHRcdGNvbnN0IHBvcyA9IHRoaXMuZ2V0KCk7XG5cdFx0Y29uc3QgbWluID0gdGhpcy5vcHRpb25zLm1pbjtcblx0XHRjb25zdCBtYXggPSB0aGlzLm9wdGlvbnMubWF4O1xuXHRcdGNvbnN0IGNpcmN1bGFyID0gdGhpcy5vcHRpb25zLmNpcmN1bGFyO1xuXHRcdGNvbnN0IG1heGltdW1EdXJhdGlvbiA9IHRoaXMub3B0aW9ucy5tYXhpbXVtRHVyYXRpb247XG5cdFx0bGV0IGRlc3RQb3MgPSBDb29yZGluYXRlLmdldFBvaW50T2ZJbnRlcnNlY3Rpb24oXG5cdFx0XHRwb3MsIGFic1BvcywgbWluLCBtYXgsIGNpcmN1bGFyLCB0aGlzLm9wdGlvbnMuYm91bmNlKTtcblxuXHRcdGRlc3RQb3MgPSBDb29yZGluYXRlLmlzT3V0VG9PdXQocG9zLCBkZXN0UG9zLCBtaW4sIG1heCkgPyBwb3MgOiBkZXN0UG9zO1xuXG5cdFx0Y29uc3QgZGlzdGFuY2UgPSBbXG5cdFx0XHRNYXRoLmFicyhkZXN0UG9zWzBdIC0gcG9zWzBdKSxcblx0XHRcdE1hdGguYWJzKGRlc3RQb3NbMV0gLSBwb3NbMV0pXG5cdFx0XTtcblx0XHRsZXQgbmV3RHVyYXRpb24gPSBkdXJhdGlvbiA9PSBudWxsID8gQ29vcmRpbmF0ZS5nZXREdXJhdGlvbkZyb21Qb3MoXG5cdFx0XHRkaXN0YW5jZSwgdGhpcy5vcHRpb25zLmRlY2VsZXJhdGlvbikgOiBkdXJhdGlvbjtcblxuXHRcdG5ld0R1cmF0aW9uID0gbWF4aW11bUR1cmF0aW9uID4gbmV3RHVyYXRpb24gPyBuZXdEdXJhdGlvbiA6IG1heGltdW1EdXJhdGlvbjtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZGVwYVBvczogcG9zLmNvbmNhdCgpLFxuXHRcdFx0ZGVzdFBvczogZGVzdFBvcy5jb25jYXQoKSxcblx0XHRcdGlzQm91bmNlOiBDb29yZGluYXRlLmlzT3V0c2lkZShkZXN0UG9zLCBtaW4sIG1heCksXG5cdFx0XHRpc0NpcmN1bGFyOiBDb29yZGluYXRlLmlzQ2lyY3VsYXIoYWJzUG9zLCBtaW4sIG1heCwgY2lyY3VsYXIpLFxuXHRcdFx0ZHVyYXRpb246IG5ld0R1cmF0aW9uLFxuXHRcdFx0ZGlzdGFuY2UsXG5cdFx0XHRoYW1tZXJFdmVudDogaGFtbWVyRXZlbnQgfHwgbnVsbCxcblx0XHRcdGRvbmU6IHRoaXMuX2FuaW1hdGlvbkVuZFxuXHRcdH07XG5cdH1cblxuXHRfcmVzdG9yZShjb21wbGV0ZSwgaGFtbWVyRXZlbnQpIHtcblx0XHRjb25zdCBwb3MgPSB0aGlzLmdldCgpO1xuXHRcdGNvbnN0IG1pbiA9IHRoaXMub3B0aW9ucy5taW47XG5cdFx0Y29uc3QgbWF4ID0gdGhpcy5vcHRpb25zLm1heDtcblxuXHRcdHRoaXMuX2FuaW1hdGUodGhpcy5fcHJlcGFyZVBhcmFtKFtcblx0XHRcdE1hdGgubWluKG1heFswXSwgTWF0aC5tYXgobWluWzBdLCBwb3NbMF0pKSxcblx0XHRcdE1hdGgubWluKG1heFsxXSwgTWF0aC5tYXgobWluWzFdLCBwb3NbMV0pKVxuXHRcdF0sIG51bGwsIGhhbW1lckV2ZW50KSwgY29tcGxldGUpO1xuXHR9XG5cblx0X2FuaW1hdGlvbkVuZCgpIHtcblx0XHR0aGlzLl9hbmltYXRlUGFyYW0gPSBudWxsO1xuXHRcdGNvbnN0IG9yZ1BvcyA9IHRoaXMuZ2V0KCk7XG5cdFx0Y29uc3QgbmV4dFBvcyA9IENvb3JkaW5hdGUuZ2V0Q2lyY3VsYXJQb3MoW1xuXHRcdFx0TWF0aC5yb3VuZChvcmdQb3NbMF0pLFxuXHRcdFx0TWF0aC5yb3VuZChvcmdQb3NbMV0pXG5cdFx0XSwgdGhpcy5vcHRpb25zLm1pbiwgdGhpcy5vcHRpb25zLm1heCwgdGhpcy5vcHRpb25zLmNpcmN1bGFyKTtcblxuXHRcdHRoaXMuc2V0VG8oLi4ubmV4dFBvcyk7XG5cdFx0dGhpcy5fc2V0SW50ZXJydXB0KGZhbHNlKTtcblx0XHQvKipcblx0XHQgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gYW5pbWF0aW9uIGVuZHMuXG5cdFx0ICogQGtvIOyXkOuLiOuplOydtOyFmOydtCDrgZ3rgqzsnYQg65WMIOuwnOyDne2VnOuLpC5cblx0XHQgKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQjYW5pbWF0aW9uRW5kXG5cdFx0ICogQGV2ZW50XG5cdFx0ICovXG5cdFx0dGhpcy50cmlnZ2VyKFwiYW5pbWF0aW9uRW5kXCIpO1xuXHR9XG5cblx0X2FuaW1hdGUocGFyYW0sIGNvbXBsZXRlKSB7XG5cdFx0dGhpcy5fYW5pbWF0ZVBhcmFtID0gT2JqZWN0LmFzc2lnbih7fSwgcGFyYW0pO1xuXHRcdHRoaXMuX2FuaW1hdGVQYXJhbS5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblx0XHRpZiAocGFyYW0uZHVyYXRpb24pIHtcblx0XHRcdGNvbnN0IGluZm8gPSB0aGlzLl9hbmltYXRlUGFyYW07XG5cdFx0XHRjb25zdCBzZWxmID0gdGhpcztcblxuXHRcdFx0KGZ1bmN0aW9uIGxvb3AoKSB7XG5cdFx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5cdFx0XHRcdHNlbGYuX3JhZiA9IG51bGw7XG5cdFx0XHRcdGlmIChzZWxmLl9mcmFtZShpbmZvKSA+PSAxKSB7XG5cdFx0XHRcdFx0Ly8gZGVmZXJyZWQucmVzb2x2ZSgpO1xuXHRcdFx0XHRcdGNvbXBsZXRlKCk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9IC8vIGFuaW1hdGlvbkVuZFxuXHRcdFx0XHRzZWxmLl9yYWYgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuXHRcdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5cdFx0XHR9KSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9zZXRQb3NBbmRUcmlnZ2VyQ2hhbmdlKHBhcmFtLmRlc3RQb3MsIGZhbHNlKTtcblx0XHRcdGNvbXBsZXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0X2FuaW1hdGVUbyhhYnNQb3MsIGR1cmF0aW9uLCBoYW1tZXJFdmVudCkge1xuXHRcdGNvbnN0IHBhcmFtID0gdGhpcy5fcHJlcGFyZVBhcmFtKGFic1BvcywgZHVyYXRpb24sIGhhbW1lckV2ZW50KTtcblx0XHRjb25zdCByZXRUcmlnZ2VyID0gdGhpcy50cmlnZ2VyKFwiYW5pbWF0aW9uU3RhcnRcIiwgcGFyYW0pO1xuXG5cdFx0Ly8gWW91IGNhbid0IHN0b3AgdGhlICdhbmltYXRpb25TdGFydCcgZXZlbnQgd2hlbiAnY2lyY3VsYXInIGlzIHRydWUuXG5cdFx0aWYgKHBhcmFtLmlzQ2lyY3VsYXIgJiYgIXJldFRyaWdnZXIpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XCJZb3UgY2FuJ3Qgc3RvcCB0aGUgJ2FuaW1hdGlvbicgZXZlbnQgd2hlbiAnY2lyY3VsYXInIGlzIHRydWUuXCJcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKHJldFRyaWdnZXIpIHtcblx0XHRcdGNvbnN0IHF1ZXVlID0gW107XG5cdFx0XHRjb25zdCBkZXF1ZXVlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNvbnN0IHRhc2sgPSBxdWV1ZS5zaGlmdCgpO1xuXG5cdFx0XHRcdHRhc2sgJiYgdGFzay5jYWxsKHRoaXMpO1xuXHRcdFx0fTtcblxuXHRcdFx0aWYgKHBhcmFtLmRlcGFQb3NbMF0gIT09IHBhcmFtLmRlc3RQb3NbMF0gfHxcblx0XHRcdFx0cGFyYW0uZGVwYVBvc1sxXSAhPT0gcGFyYW0uZGVzdFBvc1sxXSkge1xuXHRcdFx0XHRxdWV1ZS5wdXNoKCgpID0+IHRoaXMuX2FuaW1hdGUocGFyYW0sIGRlcXVldWUpKTtcblx0XHRcdH1cblx0XHRcdGlmIChDb29yZGluYXRlLmlzT3V0c2lkZShcblx0XHRcdFx0cGFyYW0uZGVzdFBvcywgdGhpcy5vcHRpb25zLm1pbiwgdGhpcy5vcHRpb25zLm1heCkpIHtcblx0XHRcdFx0cXVldWUucHVzaCgoKSA9PiB0aGlzLl9yZXN0b3JlKGRlcXVldWUsIGhhbW1lckV2ZW50KSk7XG5cdFx0XHR9XG5cdFx0XHRxdWV1ZS5wdXNoKCgpID0+IHRoaXMuX2FuaW1hdGlvbkVuZCgpKTtcblx0XHRcdGRlcXVldWUoKTtcblx0XHR9XG5cdH1cblxuXHQvLyBhbmltYXRpb24gZnJhbWUgKDB+MSlcblx0X2ZyYW1lKHBhcmFtKSB7XG5cdFx0Y29uc3QgY3VyVGltZSA9IG5ldyBEYXRlKCkgLSBwYXJhbS5zdGFydFRpbWU7XG5cdFx0Y29uc3QgZWFzaW5nUGVyID0gdGhpcy5fZWFzaW5nKGN1clRpbWUgLyBwYXJhbS5kdXJhdGlvbik7XG5cdFx0bGV0IHBvcyA9IFtwYXJhbS5kZXBhUG9zWzBdLCBwYXJhbS5kZXBhUG9zWzFdXTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgMjsgaSsrKSB7XG5cdFx0XHQocG9zW2ldICE9PSBwYXJhbS5kZXN0UG9zW2ldKSAmJlxuXHRcdFx0KHBvc1tpXSArPSAocGFyYW0uZGVzdFBvc1tpXSAtIHBvc1tpXSkgKiBlYXNpbmdQZXIpO1xuXHRcdH1cblx0XHRwb3MgPSBDb29yZGluYXRlLmdldENpcmN1bGFyUG9zKFxuXHRcdFx0cG9zLCB0aGlzLm9wdGlvbnMubWluLCB0aGlzLm9wdGlvbnMubWF4LCB0aGlzLm9wdGlvbnMuY2lyY3VsYXIpO1xuXHRcdHRoaXMuX3NldFBvc0FuZFRyaWdnZXJDaGFuZ2UocG9zLCBmYWxzZSk7XG5cdFx0cmV0dXJuIGVhc2luZ1Blcjtcblx0fVxuXG5cdC8vIHRyaWdnZXIgJ2NoYW5nZScgZXZlbnRcblx0X3NldFBvc0FuZFRyaWdnZXJDaGFuZ2UocG9zaXRpb24sIGhvbGRpbmcsIGUpIHtcblx0XHQvKipcblx0XHQgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gY29vcmRpbmF0ZSBjaGFuZ2VzLlxuXHRcdCAqIEBrbyDsooztkZzqsIAg67OA6rK965CQ7J2EIOuVjCDrsJzsg53tlZjripQg7J2067Kk7Yq4XG5cdFx0ICogQG5hbWUgZWcuTW92YWJsZUNvb3JkI2NoYW5nZVxuXHRcdCAqIEBldmVudFxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IHBhcmFtIFRoZSBvYmplY3Qgb2YgZGF0YSB0byBiZSBzZW50IHdoZW4gdGhlIGV2ZW50IGlzIGZpcmVkIDxrbz7snbTrsqTtirjqsIAg67Cc7IOd7ZWgIOuVjCDsoITri6zrkJjripQg642w7J207YSwIOqwneyytDwva28+XG5cdFx0ICogQHBhcmFtIHtBcnJheX0gcGFyYW0ucG9zaXRpb24gZGVwYXJ0dXJlIGNvb3JkaW5hdGUgIDxrbz7sooztkZw8L2tvPlxuXHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBwYXJhbS5wb3NpdGlvbi4wIFRoZSBYIGNvb3JkaW5hdGUgPGtvPngg7KKM7ZGcPC9rbz5cblx0XHQgKiBAcGFyYW0ge051bWJlcn0gcGFyYW0ucG9zLjEgVGhlIFkgY29vcmRpbmF0ZSA8a28+eSDsooztkZw8L2tvPlxuXHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gcGFyYW0uaG9sZGluZyBJbmRpY2F0ZXMgd2hldGhlciBhIHVzZXIgaG9sZHMgYW4gZWxlbWVudCBvbiB0aGUgc2NyZWVuIG9mIHRoZSBkZXZpY2UuPGtvPuyCrOyaqeyekOqwgCDquLDquLDsnZgg7ZmU66m07J2EIOuIhOultOqzoCDsnojripTsp4Ag7Jes67aAPC9rbz5cblx0XHQgKiBAcGFyYW0ge09iamVjdH0gcGFyYW0uaGFtbWVyRXZlbnQgVGhlIGV2ZW50IGluZm9ybWF0aW9uIG9mIEhhbW1lci5KUy4gSXQgcmV0dXJucyBudWxsIGlmIHRoZSBldmVudCBpcyBmaXJlZCB0aHJvdWdoIGEgY2FsbCB0byB0aGUgc2V0VG8oKSBvciBzZXRCeSgpIG1ldGhvZC48a28+SGFtbWVyLkpT7J2YIOydtOuypO2KuCDsoJXrs7QuIHNldFRvKCkg66mU7ISc65Oc64KYIHNldEJ5KCkg66mU7ISc65Oc66W8IO2YuOy2nO2VtCDsnbTrsqTtirjqsIAg67Cc7IOd7ZaI7J2EIOuVjOuKlCAnbnVsbCfsnYQg67CY7ZmY7ZWc64ukLjwva28+XG5cdFx0ICpcblx0XHQgKi9cblx0XHR0aGlzLl9wb3MgPSBwb3NpdGlvbi5jb25jYXQoKTtcblx0XHR0aGlzLnRyaWdnZXIoXCJjaGFuZ2VcIiwge1xuXHRcdFx0cG9zOiBwb3NpdGlvbi5jb25jYXQoKSxcblx0XHRcdGhvbGRpbmcsXG5cdFx0XHRoYW1tZXJFdmVudDogZSB8fCBudWxsXG5cdFx0fSk7XG5cdH1cblxuXHRfZWFzaW5nKHApIHtcblx0XHRyZXR1cm4gcCA+IDEgPyAxIDogdGhpcy5vcHRpb25zLmVhc2luZyhwKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyBhbiBlbGVtZW50IHRvIHNwZWNpZmljIGNvb3JkaW5hdGVzLlxuXHQgKiBAa28g7KKM7ZGc66W8IOydtOuPme2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5Nb3ZhYmxlQ29vcmQjc2V0VG9cblx0ICogQHBhcmFtIHtOdW1iZXJ9IHggVGhlIFggY29vcmRpbmF0ZSB0byBtb3ZlIHRvIDxrbz7snbTrj5ntlaAgeOyijO2RnDwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB5IFRoZSBZIGNvb3JkaW5hdGUgdG8gbW92ZSB0byAgPGtvPuydtOuPme2VoCB57KKM7ZGcPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtkdXJhdGlvbj0wXSBEdXJhdGlvbiBvZiB0aGUgYW5pbWF0aW9uICh1bml0OiBtcykgPGtvPuyVoOuLiOuplOydtOyFmCDsp4Ttlokg7Iuc6rCEKOuLqOychDogbXMpPC9rbz5cblx0ICogQHJldHVybiB7ZWcuTW92YWJsZUNvb3JkfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGYgPGtvPuyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKi9cblx0c2V0VG8oeCwgeSwgZHVyYXRpb24gPSAwKSB7XG5cdFx0bGV0IHRvWCA9IHg7XG5cdFx0bGV0IHRvWSA9IHk7XG5cdFx0Y29uc3QgbWluID0gdGhpcy5vcHRpb25zLm1pbjtcblx0XHRjb25zdCBtYXggPSB0aGlzLm9wdGlvbnMubWF4O1xuXHRcdGNvbnN0IGNpcmN1bGFyID0gdGhpcy5vcHRpb25zLmNpcmN1bGFyO1xuXG5cdFx0dGhpcy5fZ3JhYihtaW4sIG1heCwgY2lyY3VsYXIpO1xuXHRcdGNvbnN0IHBvcyA9IHRoaXMuZ2V0KCk7XG5cblx0XHRpZiAoeCA9PT0gcG9zWzBdICYmIHkgPT09IHBvc1sxXSkge1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0dGhpcy5fc2V0SW50ZXJydXB0KHRydWUpO1xuXHRcdGlmICh4ICE9PSBwb3NbMF0pIHtcblx0XHRcdGlmICghY2lyY3VsYXJbM10pIHtcblx0XHRcdFx0dG9YID0gTWF0aC5tYXgobWluWzBdLCB0b1gpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFjaXJjdWxhclsxXSkge1xuXHRcdFx0XHR0b1ggPSBNYXRoLm1pbihtYXhbMF0sIHRvWCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh5ICE9PSBwb3NbMV0pIHtcblx0XHRcdGlmICghY2lyY3VsYXJbMF0pIHtcblx0XHRcdFx0dG9ZID0gTWF0aC5tYXgobWluWzFdLCB0b1kpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFjaXJjdWxhclsyXSkge1xuXHRcdFx0XHR0b1kgPSBNYXRoLm1pbihtYXhbMV0sIHRvWSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChkdXJhdGlvbikge1xuXHRcdFx0dGhpcy5fYW5pbWF0ZVRvKFt0b1gsIHRvWV0sIGR1cmF0aW9uKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fcG9zID0gQ29vcmRpbmF0ZS5nZXRDaXJjdWxhclBvcyhbdG9YLCB0b1ldLCBtaW4sIG1heCwgY2lyY3VsYXIpO1xuXHRcdFx0dGhpcy5fc2V0UG9zQW5kVHJpZ2dlckNoYW5nZSh0aGlzLl9wb3MsIGZhbHNlKTtcblx0XHRcdHRoaXMuX3NldEludGVycnVwdChmYWxzZSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgY3VycmVudCBjb29yZGluYXRlcyB0byBzcGVjaWZpYyBjb29yZGluYXRlcy4gVGhlIGNoYW5nZSBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBtZXRob2QgaXMgZXhlY3V0ZWQuXG5cdCAqIEBrbyDtmITsnqwg7KKM7ZGc66W8IOq4sOykgOycvOuhnCDsooztkZzrpbwg7J2064+Z7ZWc64ukLiDrqZTshJzrk5zqsIAg7Iuk7ZaJ65CY66m0IGNoYW5nZSDsnbTrsqTtirjqsIAg67Cc7IOd7ZWc64ukXG5cdCAqIEBtZXRob2QgZWcuTW92YWJsZUNvb3JkI3NldEJ5XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB4IFRoZSBYIGNvb3JkaW5hdGUgdG8gbW92ZSB0byA8a28+7J2064+Z7ZWgIHjsooztkZw8L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0geSBUaGUgWSBjb29yZGluYXRlIHRvIG1vdmUgdG8gPGtvPuydtOuPme2VoCB57KKM7ZGcPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtkdXJhdGlvbj0wXSBEdXJhdGlvbiBvZiB0aGUgYW5pbWF0aW9uICh1bml0OiBtcykgPGtvPuyVoOuLiOuplOydtOyFmCDsp4Ttlokg7Iuc6rCEKOuLqOychDogbXMpPC9rbz5cblx0ICogQHJldHVybiB7ZWcuTW92YWJsZUNvb3JkfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGYgPGtvPuyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKi9cblx0c2V0QnkoeCwgeSwgZHVyYXRpb24gPSAwKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0VG8oXG5cdFx0XHR4ICE9IG51bGwgPyB0aGlzLl9wb3NbMF0gKyB4IDogdGhpcy5fcG9zWzBdLFxuXHRcdFx0eSAhPSBudWxsID8gdGhpcy5fcG9zWzFdICsgeSA6IHRoaXMuX3Bvc1sxXSxcblx0XHRcdGR1cmF0aW9uXG5cdFx0KTtcblx0fVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hbmltYXRpb25IYW5kbGVyLmpzIiwiaW1wb3J0IENvb3JkaW5hdGUgZnJvbSBcIi4vY29vcmRpbmF0ZVwiO1xuaW1wb3J0IHtESVJFQ1RJT059IGZyb20gXCIuL2NvbnN0c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBzdXBlcmNsYXNzID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5fc3RhdHVzID0ge1xuXHRcdFx0Z3JhYk91dHNpZGU6IGZhbHNlLFx0XHQvLyBjaGVjayB3aGV0aGVyIHVzZXIncyBhY3Rpb24gc3RhcnRlZCBvbiBvdXRzaWRlXG5cdFx0XHRjdXJyZW50SGFtbWVyOiBudWxsLFx0XHQvLyBjdXJyZW50IGhhbW1lciBpbnN0YW5jZVxuXHRcdFx0Y3VycmVudE9wdGlvbnM6IHt9LFx0XHQvLyBjdXJyZW50IGJpbmQgb3B0aW9uc1xuXHRcdFx0bW92ZURpc3RhbmNlOiBudWxsLFx0XHQvLyBhIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCB1c2VyJ3MgYWN0aW9uXG5cdFx0XHRwcmV2ZW50ZWQ6IGZhbHNlXHRcdC8vICBjaGVjayB3aGV0aGVyIHRoZSBhbmltYXRpb24gZXZlbnQgd2FzIHByZXZlbnRlZFxuXHRcdH07XG5cdH1cblxuXHRfc2V0Q3VycmVudFRhcmdldChoYW1tZXIsIG9wdGlvbnMpIHtcblx0XHR0aGlzLl9zdGF0dXMuY3VycmVudE9wdGlvbnMgPSBvcHRpb25zO1xuXHRcdHRoaXMuX3N0YXR1cy5jdXJyZW50SGFubW1lciA9IGhhbW1lcjtcblx0fVxuXG5cdC8vIHBhbnN0YXJ0IGV2ZW50IGhhbmRsZXJcblx0X3N0YXJ0KGUpIHtcblx0XHRpZiAoIXRoaXMuX3N0YXR1cy5jdXJyZW50T3B0aW9ucy5pbnRlcnJ1cHRhYmxlICYmIHRoaXMuX3N0YXR1cy5wcmV2ZW50ZWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3QgcG9zID0gdGhpcy5nZXQoKTtcblx0XHRjb25zdCBtaW4gPSB0aGlzLm9wdGlvbnMubWluO1xuXHRcdGNvbnN0IG1heCA9IHRoaXMub3B0aW9ucy5tYXg7XG5cblx0XHR0aGlzLl9zZXRJbnRlcnJ1cHQodHJ1ZSk7XG5cdFx0dGhpcy5fZ3JhYihtaW4sIG1heCwgdGhpcy5vcHRpb25zLmNpcmN1bGFyKTtcblx0XHQvKipcblx0XHQgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gYSB1c2VyIGhvbGRzIGFuIGVsZW1lbnQgb24gdGhlIHNjcmVlbiBvZiB0aGUgZGV2aWNlLlxuXHRcdCAqIEBrbyDsgqzsmqnsnpDqsIAg6riw6riw7J2YIO2ZlOuptOyXkCDshpDsnYQg64yA6rOgIOyeiOydhCDrlYwg67Cc7IOd7ZWY64qUIOydtOuypO2KuFxuXHRcdCAqIEBuYW1lIGVnLk1vdmFibGVDb29yZCNob2xkXG5cdFx0ICogQGV2ZW50XG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IHBhcmFtIFRoZSBvYmplY3Qgb2YgZGF0YSB0byBiZSBzZW50IHdoZW4gdGhlIGV2ZW50IGlzIGZpcmVkPGtvPuydtOuypO2KuOqwgCDrsJzsg53tlaAg65WMIOyghOuLrOuQmOuKlCDrjbDsnbTthLAg6rCd7LK0PC9rbz5cblx0XHQgKiBAcGFyYW0ge0FycmF5fSBwYXJhbS5wb3MgY29vcmRpbmF0ZSA8a28+7KKM7ZGcIOygleuztDwva28+XG5cdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtLnBvcy4wIFRoZSBYIGNvb3JkaW5hdGU8a28+eCDsooztkZw8L2tvPlxuXHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBwYXJhbS5wb3MuMSBUaGUgWSBjb29yZGluYXRlPGtvPnkg7KKM7ZGcPC9rbz5cblx0XHQgKiBAcGFyYW0ge09iamVjdH0gcGFyYW0uaGFtbWVyRXZlbnQgVGhlIGV2ZW50IGluZm9ybWF0aW9uIG9mIEhhbW1lci5KUy4gSXQgcmV0dXJucyBudWxsIGlmIHRoZSBldmVudCBpcyBmaXJlZCB0aHJvdWdoIGEgY2FsbCB0byB0aGUgc2V0VG8oKSBvciBzZXRCeSgpIG1ldGhvZC48a28+SGFtbWVyLkpT7J2YIOydtOuypO2KuCDsoJXrs7QuIHNldFRvKCkg66mU7ISc65Oc64KYIHNldEJ5KCkg66mU7ISc65Oc66W8IO2YuOy2nO2VtCDsnbTrsqTtirjqsIAg67Cc7IOd7ZaI7J2EIOuVjOuKlCAnbnVsbCfsnYQg67CY7ZmY7ZWc64ukLjwva28+XG5cdFx0ICpcblx0XHQgKi9cblx0XHR0aGlzLnRyaWdnZXIoXCJob2xkXCIsIHtcblx0XHRcdHBvczogcG9zLmNvbmNhdCgpLFxuXHRcdFx0aGFtbWVyRXZlbnQ6IGVcblx0XHR9KTtcblxuXHRcdHRoaXMuX3N0YXR1cy5tb3ZlRGlzdGFuY2UgPSBwb3MuY29uY2F0KCk7XG5cdFx0dGhpcy5fc3RhdHVzLmdyYWJPdXRzaWRlID0gQ29vcmRpbmF0ZS5pc091dHNpZGUocG9zLCBtaW4sIG1heCk7XG5cdH1cblxuXHQvLyBwYW5tb3ZlIGV2ZW50IGhhbmRsZXJcblx0X21vdmUoZSkge1xuXHRcdGlmICghdGhpcy5faXNJbnRlcnJ1cHRpbmcoKSB8fCAhdGhpcy5fc3RhdHVzLm1vdmVEaXN0YW5jZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRsZXQgcG9zID0gdGhpcy5nZXQodHJ1ZSk7XG5cdFx0Y29uc3QgbWluID0gdGhpcy5vcHRpb25zLm1pbjtcblx0XHRjb25zdCBtYXggPSB0aGlzLm9wdGlvbnMubWF4O1xuXHRcdGNvbnN0IGJvdW5jZSA9IHRoaXMub3B0aW9ucy5ib3VuY2U7XG5cdFx0Y29uc3QgbWFyZ2luID0gdGhpcy5vcHRpb25zLm1hcmdpbjtcblx0XHRjb25zdCBjdXJyZW50T3B0aW9ucyA9IHRoaXMuX3N0YXR1cy5jdXJyZW50T3B0aW9ucztcblx0XHRjb25zdCBkaXJlY3Rpb24gPSBjdXJyZW50T3B0aW9ucy5kaXJlY3Rpb247XG5cdFx0Y29uc3Qgc2NhbGUgPSBjdXJyZW50T3B0aW9ucy5zY2FsZTtcblx0XHRjb25zdCB1c2VyRGlyZWN0aW9uID0gQ29vcmRpbmF0ZS5nZXREaXJlY3Rpb25CeUFuZ2xlKFxuXHRcdFx0ZS5hbmdsZSwgY3VycmVudE9wdGlvbnMudGhyZXNob2xkQW5nbGUpO1xuXHRcdGNvbnN0IG91dCA9IFtcblx0XHRcdG1hcmdpblswXSArIGJvdW5jZVswXSxcblx0XHRcdG1hcmdpblsxXSArIGJvdW5jZVsxXSxcblx0XHRcdG1hcmdpblsyXSArIGJvdW5jZVsyXSxcblx0XHRcdG1hcmdpblszXSArIGJvdW5jZVszXVxuXHRcdF07XG5cdFx0bGV0IHByZXZlbnQgPSBmYWxzZTtcblxuXHRcdC8vIG5vdCBzdXBwb3J0IG9mZnNldCBwcm9wZXJ0aWVzIGluIEhhbW1lcmpzIC0gc3RhcnRcblx0XHRjb25zdCBwcmV2SW5wdXQgPSB0aGlzLl9zdGF0dXMuY3VycmVudEhhbm1tZXIuc2Vzc2lvbi5wcmV2SW5wdXQ7XG5cblx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuXHRcdGlmIChwcmV2SW5wdXQpIHtcblx0XHRcdGUub2Zmc2V0WCA9IGUuZGVsdGFYIC0gcHJldklucHV0LmRlbHRhWDtcblx0XHRcdGUub2Zmc2V0WSA9IGUuZGVsdGFZIC0gcHJldklucHV0LmRlbHRhWTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZS5vZmZzZXRYID0gMDtcblx0XHRcdGUub2Zmc2V0WSA9IDA7XG5cdFx0fVxuXG5cdFx0Ly8gbm90IHN1cHBvcnQgb2Zmc2V0IHByb3BlcnRpZXMgaW4gSGFtbWVyanMgLSBlbmRcblx0XHRpZiAoQ29vcmRpbmF0ZS5pc0hvcml6b250YWwoZGlyZWN0aW9uLCB1c2VyRGlyZWN0aW9uKSkge1xuXHRcdFx0dGhpcy5fc3RhdHVzLm1vdmVEaXN0YW5jZVswXSArPSAoZS5vZmZzZXRYICogc2NhbGVbMF0pO1xuXHRcdFx0cHJldmVudCA9IHRydWU7XG5cdFx0fVxuXHRcdGlmIChDb29yZGluYXRlLmlzVmVydGljYWwoZGlyZWN0aW9uLCB1c2VyRGlyZWN0aW9uKSkge1xuXHRcdFx0dGhpcy5fc3RhdHVzLm1vdmVEaXN0YW5jZVsxXSArPSAoZS5vZmZzZXRZICogc2NhbGVbMV0pO1xuXHRcdFx0cHJldmVudCA9IHRydWU7XG5cdFx0fVxuXHRcdGlmIChwcmV2ZW50KSB7XG5cdFx0XHRlLnNyY0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRlLnNyY0V2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1cblx0XHRlLnByZXZlbnRTeXN0ZW1FdmVudCA9IHByZXZlbnQ7XG5cdFx0LyogZXNsaW50LWVuYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuXG5cdFx0cG9zWzBdID0gdGhpcy5fc3RhdHVzLm1vdmVEaXN0YW5jZVswXTtcblx0XHRwb3NbMV0gPSB0aGlzLl9zdGF0dXMubW92ZURpc3RhbmNlWzFdO1xuXHRcdHBvcyA9IENvb3JkaW5hdGUuZ2V0Q2lyY3VsYXJQb3MocG9zLCBtaW4sIG1heCwgdGhpcy5vcHRpb25zLmNpcmN1bGFyKTtcblxuXHRcdC8vIGZyb20gb3V0c2lkZSB0byBpbnNpZGVcblx0XHRpZiAodGhpcy5fc3RhdHVzLmdyYWJPdXRzaWRlICYmICFDb29yZGluYXRlLmlzT3V0c2lkZShwb3MsIG1pbiwgbWF4KSkge1xuXHRcdFx0dGhpcy5fc3RhdHVzLmdyYWJPdXRzaWRlID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gd2hlbiBtb3ZlIHBvaW50ZXIgaXMgaGVsZCBpbiBvdXRzaWRlXG5cdFx0bGV0IHR2O1xuXHRcdGxldCB0bjtcblx0XHRsZXQgdHg7XG5cblx0XHRpZiAodGhpcy5fc3RhdHVzLmdyYWJPdXRzaWRlKSB7XG5cdFx0XHR0biA9IG1pblswXSAtIG91dFszXTtcblx0XHRcdHR4ID0gbWF4WzBdICsgb3V0WzFdO1xuXHRcdFx0dHYgPSBwb3NbMF07XG5cdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXN0ZWQtdGVybmFyeSAqL1xuXHRcdFx0cG9zWzBdID0gdHYgPiB0eCA/IHR4IDogKHR2IDwgdG4gPyB0biA6IHR2KTtcblx0XHRcdHRuID0gbWluWzFdIC0gb3V0WzBdO1xuXHRcdFx0dHggPSBtYXhbMV0gKyBvdXRbMl07XG5cdFx0XHR0diA9IHBvc1sxXTtcblx0XHRcdHBvc1sxXSA9IHR2ID4gdHggPyB0eCA6ICh0diA8IHRuID8gdG4gOiB0dik7XG5cdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHdoZW4gc3RhcnQgcG9pbnRlciBpcyBoZWxkIGluIGluc2lkZVxuXHRcdFx0Ly8gZ2V0IGEgaW5pdGlhbGl6YXRpb24gc2xvcGUgdmFsdWUgdG8gcHJldmVudCBzbW9vdGggYW5pbWF0aW9uLlxuXHRcdFx0Y29uc3QgaW5pdFNsb3BlID0gdGhpcy5fZWFzaW5nKDAuMDAwMDEpIC8gMC4wMDAwMTtcblxuXHRcdFx0aWYgKHBvc1sxXSA8IG1pblsxXSkgeyAvLyB1cFxuXHRcdFx0XHR0diA9IChtaW5bMV0gLSBwb3NbMV0pIC8gKG91dFswXSAqIGluaXRTbG9wZSk7XG5cdFx0XHRcdHBvc1sxXSA9IG1pblsxXSAtIHRoaXMuX2Vhc2luZyh0dikgKiBvdXRbMF07XG5cdFx0XHR9IGVsc2UgaWYgKHBvc1sxXSA+IG1heFsxXSkgeyAvLyBkb3duXG5cdFx0XHRcdHR2ID0gKHBvc1sxXSAtIG1heFsxXSkgLyAob3V0WzJdICogaW5pdFNsb3BlKTtcblx0XHRcdFx0cG9zWzFdID0gbWF4WzFdICsgdGhpcy5fZWFzaW5nKHR2KSAqIG91dFsyXTtcblx0XHRcdH1cblx0XHRcdGlmIChwb3NbMF0gPCBtaW5bMF0pIHsgLy8gbGVmdFxuXHRcdFx0XHR0diA9IChtaW5bMF0gLSBwb3NbMF0pIC8gKG91dFszXSAqIGluaXRTbG9wZSk7XG5cdFx0XHRcdHBvc1swXSA9IG1pblswXSAtIHRoaXMuX2Vhc2luZyh0dikgKiBvdXRbM107XG5cdFx0XHR9IGVsc2UgaWYgKHBvc1swXSA+IG1heFswXSkgeyAvLyByaWdodFxuXHRcdFx0XHR0diA9IChwb3NbMF0gLSBtYXhbMF0pIC8gKG91dFsxXSAqIGluaXRTbG9wZSk7XG5cdFx0XHRcdHBvc1swXSA9IG1heFswXSArIHRoaXMuX2Vhc2luZyh0dikgKiBvdXRbMV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3NldFBvc0FuZFRyaWdnZXJDaGFuZ2UocG9zLCB0cnVlLCBlKTtcblx0fVxuXG5cdC8vIHBhbmVuZCBldmVudCBoYW5kbGVyXG5cdF9lbmQoZSkge1xuXHRcdGNvbnN0IHBvcyA9IHRoaXMuZ2V0KCk7XG5cblx0XHRpZiAoIXRoaXMuX2lzSW50ZXJydXB0aW5nKCkgfHwgIXRoaXMuX3N0YXR1cy5tb3ZlRGlzdGFuY2UpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBBYm9ydCB0aGUgYW5pbWF0aW5nIHBvc3QgcHJvY2VzcyB3aGVuIFwidGFwXCIgb2NjdXJzXG5cdFx0aWYgKGUuZGlzdGFuY2UgPT09IDAgLyogZS50eXBlID09PSBcInRhcFwiICovKSB7XG5cdFx0XHR0aGlzLl9zZXRJbnRlcnJ1cHQoZmFsc2UpO1xuXHRcdFx0dGhpcy50cmlnZ2VyKFwicmVsZWFzZVwiLCB7XG5cdFx0XHRcdGRlcGFQb3M6IHBvcy5jb25jYXQoKSxcblx0XHRcdFx0ZGVzdFBvczogcG9zLmNvbmNhdCgpLFxuXHRcdFx0XHRoYW1tZXJFdmVudDogZSB8fCBudWxsXG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgZGlyZWN0aW9uID0gdGhpcy5fc3RhdHVzLmN1cnJlbnRPcHRpb25zLmRpcmVjdGlvbjtcblx0XHRcdGNvbnN0IHNjYWxlID0gdGhpcy5fc3RhdHVzLmN1cnJlbnRPcHRpb25zLnNjYWxlO1xuXHRcdFx0bGV0IHZYID0gTWF0aC5hYnMoZS52ZWxvY2l0eVgpO1xuXHRcdFx0bGV0IHZZID0gTWF0aC5hYnMoZS52ZWxvY2l0eVkpO1xuXG5cdFx0XHQhKGRpcmVjdGlvbiAmIERJUkVDVElPTi5ESVJFQ1RJT05fSE9SSVpPTlRBTCkgJiYgKHZYID0gMCk7XG5cdFx0XHQhKGRpcmVjdGlvbiAmIERJUkVDVElPTi5ESVJFQ1RJT05fVkVSVElDQUwpICYmICh2WSA9IDApO1xuXG5cdFx0XHRjb25zdCBvZmZzZXQgPSBDb29yZGluYXRlLmdldE5leHRPZmZzZXRQb3MoW1xuXHRcdFx0XHR2WCAqIChlLmRlbHRhWCA8IDAgPyAtMSA6IDEpICogc2NhbGVbMF0sXG5cdFx0XHRcdHZZICogKGUuZGVsdGFZIDwgMCA/IC0xIDogMSkgKiBzY2FsZVsxXVxuXHRcdFx0XSwgdGhpcy5vcHRpb25zLmRlY2VsZXJhdGlvbik7XG5cdFx0XHRsZXQgZGVzdFBvcyA9IFtwb3NbMF0gKyBvZmZzZXRbMF0sIHBvc1sxXSArIG9mZnNldFsxXV07XG5cblx0XHRcdGRlc3RQb3MgPSBDb29yZGluYXRlLmdldFBvaW50T2ZJbnRlcnNlY3Rpb24ocG9zLCBkZXN0UG9zLFxuXHRcdFx0XHR0aGlzLm9wdGlvbnMubWluLCB0aGlzLm9wdGlvbnMubWF4LFxuXHRcdFx0XHR0aGlzLm9wdGlvbnMuY2lyY3VsYXIsIHRoaXMub3B0aW9ucy5ib3VuY2UpO1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gYSB1c2VyIHJlbGVhc2UgYW4gZWxlbWVudCBvbiB0aGUgc2NyZWVuIG9mIHRoZSBkZXZpY2UuXG5cdFx0XHQgKiBAa28g7IKs7Jqp7J6Q6rCAIOq4sOq4sOydmCDtmZTrqbTsl5DshJwg7IaQ7J2EIOuXkOydhCDrlYwg67Cc7IOd7ZWY64qUIOydtOuypO2KuFxuXHRcdFx0ICogQG5hbWUgZWcuTW92YWJsZUNvb3JkI3JlbGVhc2Vcblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbSBUaGUgb2JqZWN0IG9mIGRhdGEgdG8gYmUgc2VudCB3aGVuIHRoZSBldmVudCBpcyBmaXJlZDxrbz7snbTrsqTtirjqsIAg67Cc7IOd7ZWgIOuVjCDsoITri6zrkJjripQg642w7J207YSwIOqwneyytDwva28+XG5cdFx0XHQgKiBAcGFyYW0ge0FycmF5fSBwYXJhbS5kZXBhUG9zIFRoZSBjb29yZGluYXRlcyB3aGVuIHJlbGVhc2luZyBhbiBlbGVtZW50PGtvPuyGkOydhCDrl5DsnYQg65WM7J2YIOyijO2RnO2YhOyerCA8L2tvPlxuXHRcdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtLmRlcGFQb3MuMCBUaGUgWCBjb29yZGluYXRlIDxrbz4geCDsooztkZw8L2tvPlxuXHRcdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtLmRlcGFQb3MuMSBUaGUgWSBjb29yZGluYXRlIDxrbz4geSDsooztkZw8L2tvPlxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gcGFyYW0uZGVzdFBvcyBUaGUgY29vcmRpbmF0ZXMgdG8gbW92ZSB0byBhZnRlciByZWxlYXNpbmcgYW4gZWxlbWVudDxrbz7shpDsnYQg65eAIOuSpOyXkCDsnbTrj5ntlaAg7KKM7ZGcPC9rbz5cblx0XHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBwYXJhbS5kZXN0UG9zLjAgVGhlIFggY29vcmRpbmF0ZSA8a28+eCDsooztkZw8L2tvPlxuXHRcdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtLmRlc3RQb3MuMSBUaGUgWSBjb29yZGluYXRlIDxrbz55IOyijO2RnDwva28+XG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gcGFyYW0uaGFtbWVyRXZlbnQgVGhlIGV2ZW50IGluZm9ybWF0aW9uIG9mIEhhbW1lci5KUy4gSXQgcmV0dXJucyBudWxsIGlmIHRoZSBldmVudCBpcyBmaXJlZCB0aHJvdWdoIGEgY2FsbCB0byB0aGUgc2V0VG8oKSBvciBzZXRCeSgpIG1ldGhvZC48a28+SGFtbWVyLkpT7J2YIOydtOuypO2KuCDsoJXrs7QuIHNldFRvKCkg66mU7ISc65Oc64KYIHNldEJ5KCkg66mU7ISc65Oc66W8IO2YuOy2nO2VtCDsnbTrsqTtirjqsIAg67Cc7IOd7ZaI7J2EIOuVjOuKlCAnbnVsbCfsnYQg67CY7ZmY7ZWc64ukPC9rbz5cblx0XHRcdCAqXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcihcInJlbGVhc2VcIiwge1xuXHRcdFx0XHRkZXBhUG9zOiBwb3MuY29uY2F0KCksXG5cdFx0XHRcdGRlc3RQb3MsXG5cdFx0XHRcdGhhbW1lckV2ZW50OiBlIHx8IG51bGxcblx0XHRcdH0pO1xuXHRcdFx0aWYgKHBvc1swXSAhPT0gZGVzdFBvc1swXSB8fCBwb3NbMV0gIT09IGRlc3RQb3NbMV0pIHtcblx0XHRcdFx0dGhpcy5fYW5pbWF0ZVRvKGRlc3RQb3MsIG51bGwsIGUgfHwgbnVsbCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9zZXRJbnRlcnJ1cHQoZmFsc2UpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9zdGF0dXMubW92ZURpc3RhbmNlID0gbnVsbDtcblx0fVxuXG5cdF9pc0ludGVycnVwdGluZygpIHtcblx0XHQvLyB3aGVuIGludGVycnVwdGFibGUgaXMgJ3RydWUnLCByZXR1cm4gdmFsdWUgaXMgYWx3YXlzICd0cnVlJy5cblx0XHRyZXR1cm4gdGhpcy5fc3RhdHVzLmN1cnJlbnRPcHRpb25zLmludGVycnVwdGFibGUgfHwgdGhpcy5fc3RhdHVzLnByZXZlbnRlZDtcblx0fVxuXG5cdF9zZXRJbnRlcnJ1cHQocHJldmVudGVkKSB7XG5cdFx0IXRoaXMuX3N0YXR1cy5jdXJyZW50T3B0aW9ucy5pbnRlcnJ1cHRhYmxlICYmXG5cdFx0KHRoaXMuX3N0YXR1cy5wcmV2ZW50ZWQgPSBwcmV2ZW50ZWQpO1xuXHR9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V2ZW50SGFuZGxlci5qcyIsImltcG9ydCBIYW1tZXIgZnJvbSBcImhhbW1lcmpzXCI7XG5pbXBvcnQge3V0aWxzfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHtESVJFQ1RJT04sIFVOSVFVRUtFWSwgU1VQUE9SVF9UT1VDSH0gZnJvbSBcIi4vY29uc3RzXCI7XG5cbmlmICh0eXBlb2YgSGFtbWVyID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdHRocm93IG5ldyBFcnJvcihgVGhlIEhhbW1lcmpzIG11c3QgYmUgbG9hZGVkIGJlZm9yZSBlZy5Nb3ZhYmxlQ29vcmQuXFxuaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby9gKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFtbWVyTWFuYWdlciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX2hhbW1lcnMgPSB7fTtcblx0fVxuXG5cdF9jcmVhdGVIYW1tZXIoZWwsIGJpbmRPcHRpb25zLCBpbnB1dENsYXNzLCBoYW5kbGVyKSB7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIGNyZWF0ZSBIYW1tZXJcblx0XHRcdHJldHVybiB0aGlzLl9hdHRhY2hIYW1tZXJFdmVudHMobmV3IEhhbW1lci5NYW5hZ2VyKGVsLCB7XG5cdFx0XHRcdHJlY29nbml6ZXJzOiBbXG5cdFx0XHRcdFx0W1xuXHRcdFx0XHRcdFx0SGFtbWVyLlBhbiwge1xuXHRcdFx0XHRcdFx0XHRkaXJlY3Rpb246IGJpbmRPcHRpb25zLmRpcmVjdGlvbixcblx0XHRcdFx0XHRcdFx0dGhyZXNob2xkOiAwXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHRdLFxuXG5cdFx0XHRcdC8vIGNzcyBwcm9wZXJ0aWVzIHdlcmUgcmVtb3ZlZCBkdWUgdG8gdXNhYmxpbGl0eSBpc3N1ZVxuXHRcdFx0XHQvLyBodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL2pzZG9jL0hhbW1lci5kZWZhdWx0cy5jc3NQcm9wcy5odG1sXG5cdFx0XHRcdGNzc1Byb3BzOiB7XG5cdFx0XHRcdFx0dXNlclNlbGVjdDogXCJub25lXCIsXG5cdFx0XHRcdFx0dG91Y2hTZWxlY3Q6IFwibm9uZVwiLFxuXHRcdFx0XHRcdHRvdWNoQ2FsbG91dDogXCJub25lXCIsXG5cdFx0XHRcdFx0dXNlckRyYWc6IFwibm9uZVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGlucHV0Q2xhc3Ncblx0XHRcdH0pLCBiaW5kT3B0aW9ucywgaGFuZGxlcik7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0YWRkKGVsZW1lbnQsIG9wdGlvbnMsIGhhbmRsZXIpIHtcblx0XHRjb25zdCBlbCA9IHV0aWxzLmdldEVsZW1lbnQoZWxlbWVudCk7XG5cdFx0bGV0IGtleVZhbHVlID0gZWwuZ2V0QXR0cmlidXRlKFVOSVFVRUtFWSk7XG5cdFx0Y29uc3QgYmluZE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRcdGRpcmVjdGlvbjogRElSRUNUSU9OLkRJUkVDVElPTl9BTEwsXG5cdFx0XHRzY2FsZTogWzEsIDFdLFxuXHRcdFx0dGhyZXNob2xkQW5nbGU6IDQ1LFxuXHRcdFx0aW50ZXJydXB0YWJsZTogdHJ1ZSxcblx0XHRcdGlucHV0VHlwZTogW1widG91Y2hcIiwgXCJtb3VzZVwiXVxuXHRcdH0sIG9wdGlvbnMpO1xuXHRcdGNvbnN0IGlucHV0Q2xhc3MgPSB0aGlzLmNvbnZlcnRJbnB1dFR5cGUoYmluZE9wdGlvbnMuaW5wdXRUeXBlKTtcblxuXHRcdGlmICghaW5wdXRDbGFzcykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChrZXlWYWx1ZSkge1xuXHRcdFx0dGhpcy5faGFtbWVyc1trZXlWYWx1ZV0uaGFtbWVyLmRlc3Ryb3koKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0a2V5VmFsdWUgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG5cdFx0fVxuXHRcdHRoaXMuX2hhbW1lcnNba2V5VmFsdWVdID0ge1xuXHRcdFx0aGFtbWVyOiB0aGlzLl9jcmVhdGVIYW1tZXIoXG5cdFx0XHRcdGVsLFxuXHRcdFx0XHRiaW5kT3B0aW9ucyxcblx0XHRcdFx0aW5wdXRDbGFzcyxcblx0XHRcdFx0aGFuZGxlclxuXHRcdFx0KSxcblx0XHRcdGVsLFxuXHRcdFx0b3B0aW9uczogYmluZE9wdGlvbnNcblx0XHR9O1xuXHRcdGVsLnNldEF0dHJpYnV0ZShVTklRVUVLRVksIGtleVZhbHVlKTtcblx0fVxuXG5cdHJlbW92ZShlbGVtZW50KSB7XG5cdFx0Y29uc3QgZWwgPSB1dGlscy5nZXRFbGVtZW50KGVsZW1lbnQpO1xuXHRcdGNvbnN0IGtleSA9IGVsLmdldEF0dHJpYnV0ZShVTklRVUVLRVkpO1xuXG5cdFx0aWYgKGtleSkge1xuXHRcdFx0dGhpcy5faGFtbWVyc1trZXldLmhhbW1lci5kZXN0cm95KCk7XG5cdFx0XHRkZWxldGUgdGhpcy5faGFtbWVyc1trZXldO1xuXHRcdFx0ZWwucmVtb3ZlQXR0cmlidXRlKFVOSVFVRUtFWSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0SGFtbWVyKGVsZW1lbnQpIHtcblx0XHRjb25zdCBkYXRhID0gdGhpcy5nZXQoZWxlbWVudCk7XG5cblx0XHRyZXR1cm4gZGF0YSA/IGRhdGEuaGFtbWVyIDogbnVsbDtcblx0fVxuXG5cdGdldChlbGVtZW50KSB7XG5cdFx0Y29uc3QgZWwgPSB1dGlscy5nZXRFbGVtZW50KGVsZW1lbnQpO1xuXHRcdGNvbnN0IGtleSA9IGVsID8gZWwuZ2V0QXR0cmlidXRlKFVOSVFVRUtFWSkgOiBudWxsO1xuXG5cdFx0aWYgKGtleSAmJiB0aGlzLl9oYW1tZXJzW2tleV0pIHtcblx0XHRcdHJldHVybiB0aGlzLl9oYW1tZXJzW2tleV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdF9hdHRhY2hIYW1tZXJFdmVudHMoaGFtbWVyLCBvcHRpb25zLCBoYW5kbGVyKSB7XG5cdFx0Y29uc3QgZW5hYmxlID0gaGFtbWVyLmdldChcInBhblwiKS5vcHRpb25zLmVuYWJsZTtcblxuXHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5cdFx0cmV0dXJuIGhhbW1lclxuXHRcdFx0Lm9uKFwiaGFtbWVyLmlucHV0XCIsIGUgPT4ge1xuXHRcdFx0XHRpZiAoZS5pc0ZpcnN0KSB7XG5cdFx0XHRcdFx0Ly8gYXBwbHkgb3B0aW9ucyBlYWNoXG5cdFx0XHRcdFx0aGFuZGxlci5fc2V0Q3VycmVudFRhcmdldChoYW1tZXIsIG9wdGlvbnMpO1xuXHRcdFx0XHRcdGVuYWJsZSAmJiBoYW5kbGVyLl9zdGFydChlKTtcblx0XHRcdFx0fSBlbHNlIGlmIChlLmlzRmluYWwpIHtcblx0XHRcdFx0XHQvLyBzdWJzdGl0dXRlIC5vbihcInBhbmVuZCB0YXBcIiwgdGhpcy5fcGFuZW5kKTsgQmVjYXVzZSBpdCh0YXAsIHBhbmVuZCkgY2Fubm90IGNhdGNoIHZlcnRpY2FsKGhvcml6b250YWwpIG1vdmVtZW50IG9uIEhPUklaT05UQUwoVkVSVElDQUwpIG1vZGUuXG5cdFx0XHRcdFx0ZW5hYmxlICYmIGhhbmRsZXIuX2VuZChlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSkub24oXCJwYW5zdGFydCBwYW5tb3ZlXCIsIGUgPT4gaGFuZGxlci5fbW92ZShlKSk7XG5cdFx0LyogZXNsaW50LWVuYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuXHR9XG5cblx0X2RldGFjaEhhbW1lckV2ZW50cyhoYW1tZXIpIHtcblx0XHRoYW1tZXIub2ZmKFwiaGFtbWVyLmlucHV0IHBhbnN0YXJ0IHBhbm1vdmUgcGFuZW5kXCIpO1xuXHR9XG5cblx0Y29udmVydElucHV0VHlwZShpbnB1dFR5cGUgPSBbXSkge1xuXHRcdGxldCBoYXNUb3VjaCA9IGZhbHNlO1xuXHRcdGxldCBoYXNNb3VzZSA9IGZhbHNlO1xuXHRcdGNvbnN0IGlucHV0cyA9IGlucHV0VHlwZSB8fCBbXTtcblxuXHRcdGlucHV0cy5mb3JFYWNoKHYgPT4ge1xuXHRcdFx0c3dpdGNoICh2KSB7XG5cdFx0XHRcdGNhc2UgXCJtb3VzZVwiIDogaGFzTW91c2UgPSB0cnVlOyBicmVhaztcblx0XHRcdFx0Y2FzZSBcInRvdWNoXCIgOiBoYXNUb3VjaCA9IFNVUFBPUlRfVE9VQ0g7XG5cdFx0XHRcdC8vIG5vIGRlZmF1bHRcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gKGhhc1RvdWNoICYmIEhhbW1lci5Ub3VjaElucHV0KSB8fFxuXHRcdFx0KGhhc01vdXNlICYmIEhhbW1lci5Nb3VzZUlucHV0KSB8fCBudWxsO1xuXHR9XG5cblx0aW5wdXRDb250cm9sKGlzRW5hYmxlLCBlbGVtZW50KSB7XG5cdFx0Y29uc3Qgb3B0aW9uID0ge1xuXHRcdFx0ZW5hYmxlOiBpc0VuYWJsZVxuXHRcdH07XG5cblx0XHRpZiAoZWxlbWVudCkge1xuXHRcdFx0Y29uc3QgaGFtbWVyID0gdGhpcy5nZXRIYW1tZXIoZWxlbWVudCk7XG5cblx0XHRcdGhhbW1lciAmJiBoYW1tZXIuZ2V0KFwicGFuXCIpLnNldChvcHRpb24pO1xuXHRcdH0gZWxzZSB7IC8vIGZvciBtdWx0aVxuXHRcdFx0Zm9yIChjb25zdCBwIGluIHRoaXMuX2hhbW1lcnMpIHtcblx0XHRcdFx0dGhpcy5faGFtbWVyc1twXS5oYW1tZXIuZ2V0KFwicGFuXCIpLnNldChvcHRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0Zm9yIChjb25zdCBwIGluIHRoaXMuX2hhbW1lcnMpIHtcblx0XHRcdHRoaXMuX2hhbW1lcnNbcF0uaGFtbWVyLmRlc3Ryb3koKTtcblx0XHRcdHRoaXMuX2hhbW1lcnNbcF0uZWwucmVtb3ZlQXR0cmlidXRlKFVOSVFVRUtFWSk7XG5cdFx0XHRkZWxldGUgdGhpcy5faGFtbWVyc1twXTtcblx0XHR9XG5cdFx0dGhpcy5faGFtbWVycyA9IHt9O1xuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaGFtbWVyTWFuYWdlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJIYW1tZXJcIlxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV85X187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImVnLmNvbXBvbmVudFwiLFwiY29tbW9uanMyXCI6XCJlZy5jb21wb25lbnRcIixcImFtZFwiOlwiZWcuY29tcG9uZW50XCIsXCJyb290XCI6W1wiZWdcIixcIkNvbXBvbmVudFwiXX1cbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJpbXBvcnQgTW92YWJsZUNvb3JkIGZyb20gXCIuL21vdmFibGVDb29yZFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vdmFibGVDb29yZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=
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
		module.exports = factory(require("Hammer"));
	else if(typeof define === 'function' && define.amd)
		define(["Hammer"], factory);
	else if(typeof exports === 'object')
		exports["MovableCoord"] = factory(require("Hammer"));
	else
		root["eg"] = root["eg"] || {}, root["eg"]["MovableCoord"] = factory(root["Hammer"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_9__) {
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
/* eslint-disable no-new-func */
var win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
/* eslint-enable no-new-func */

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
				e.offsetX = e.offsetY = 0;
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
				pos[0] = tv > tx ? tx : tv < tn ? tn : tv;
				tn = min[1] - out[0];
				tx = max[1] + out[2];
				tv = pos[1];
				pos[1] = tv > tx ? tx : tv < tn ? tn : tv;
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
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Component"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Component"] = factory();
})(this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * A class used to manage events and options in a component
 * @class
 * @group egjs
 * @name eg.Component
 * @ko 컴포넌트의 이벤트와 옵션을 관리할 수 있게 하는 클래스
 *
 * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
 */
var Component = exports.Component = function () {
	function Component() {
		_classCallCheck(this, Component);

		this._eventHandler = {};
		this._options = {};
	}
	/**
  * Sets options in a component or returns them.
  * @ko 컴포넌트에 옵션을 설정하거나 옵션을 반환한다
  * @method eg.Component#option
  * @param {String} key The key of the option<ko>옵션의 키</ko>
  * @param {Object} [value] The option value that corresponds to a given key <ko>키에 해당하는 옵션값</ko>
  * @return {eg.Component|Object} An instance, an option value, or an option object of a component itself.<br>- If both key and value are used to set an option, it returns an instance of a component itself.<br>- If only a key is specified for the parameter, it returns the option value corresponding to a given key.<br>- If nothing is specified, it returns an option object. <ko>컴포넌트 자신의 인스턴스나 옵션값, 옵션 객체.<br>- 키와 값으로 옵션을 설정하면 컴포넌트 자신의 인스턴스를 반환한다.<br>- 파라미터에 키만 설정하면 키에 해당하는 옵션값을 반환한다.<br>- 파라미터에 아무것도 설정하지 않으면 옵션 객체를 반환한다.</ko>
  * @example
 	 class Some extends eg.Component{
 		}
 	 const some = new Some({
 		"foo": 1,
 		"bar": 2
 	});
 	 some.option("foo"); // return 1
  some.option("foo",3); // return some instance
  some.option(); // return options object.
  some.option({
 		"foo" : 10,
 		"bar" : 20,
 		"baz" : 30
 	}); // return some instance.
  */


	_createClass(Component, [{
		key: "option",
		value: function option() {
			if (arguments.length >= 2) {
				var _key = arguments.length <= 0 ? undefined : arguments[0];
				var value = arguments.length <= 1 ? undefined : arguments[1];
				this._options[_key] = value;
				return this;
			}

			var key = arguments.length <= 0 ? undefined : arguments[0];
			if (typeof key === "string") {
				return this._options[key];
			}

			if (arguments.length === 0) {
				return this._options;
			}

			var options = key;
			this._options = options;

			return this;
		}
		/**
   * Triggers a custom event.
   * @ko 커스텀 이벤트를 발생시킨다
   * @method eg.Component#trigger
   * @param {String} eventName The name of the custom event to be triggered <ko>발생할 커스텀 이벤트의 이름</ko>
   * @param {Object} customEvent Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
   * @return {Boolean} Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <ko>이벤트 발생 여부. 커스텀 이벤트 핸들러에서 stop() 메서드를 호출하면 'false'를 반환하고 이벤트 발생을 중단한다.</ko>
   * @example
   class Some extends eg.Component{
  		some(){
  			this.trigger("hi");// fire hi event.
  		}
  	}
   */

	}, {
		key: "trigger",
		value: function trigger(eventName) {
			var customEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			var handlerList = this._eventHandler[eventName] || [];
			var hasHandlerList = handlerList.length > 0;

			if (!hasHandlerList) {
				return true;
			}

			// If detach method call in handler in first time then handeler list calls.
			handlerList = handlerList.concat();

			customEvent.eventType = eventName;

			var isCanceled = false;
			var arg = [customEvent];
			var i = void 0;

			customEvent.stop = function () {
				return isCanceled = true;
			};

			for (var _len = arguments.length, restParam = Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
				restParam[_key2 - 2] = arguments[_key2];
			}

			if (restParam.length >= 1) {
				arg = arg.concat(restParam);
			}

			for (i in handlerList) {
				handlerList[i].apply(this, arg);
			}

			return !isCanceled;
		}
		/**
   * Executed event just one time.
   * @ko 이벤트가 한번만 실행된다.
   * @method eg.Component#once
   * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
   * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
   * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   class Some extends eg.Component{
  		hi(){
  			alert("hi");
  		}
  		thing(){
  			this.once("hi", this.hi);
  		}
  	}
  	 var some = new Some();
   some.thing();
   some.trigger("hi");
   // fire alert("hi");
   some.trigger("hi");
   // Nothing happens
   */

	}, {
		key: "once",
		value: function once(eventName, handlerToAttach) {
			var _this = this;

			if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object" && typeof handlerToAttach === "undefined") {
				var eventHash = eventName;
				var i = void 0;
				for (i in eventHash) {
					this.once(i, eventHash[i]);
				}
				return this;
			} else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
				(function () {
					var self = _this;
					_this.on(eventName, function listener() {
						for (var _len2 = arguments.length, arg = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
							arg[_key3] = arguments[_key3];
						}

						handlerToAttach.apply(self, arg);
						self.off(eventName, listener);
					});
				})();
			}

			return this;
		}

		/**
   * Checks whether an event has been attached to a component.
   * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
   * @method eg.Component#hasOn
   * @param {String} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
   * @return {Boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
   * @example
   class Some extends eg.Component{
  		some(){
  			this.hasOn("hi");// check hi event.
  		}
  	}
   */

	}, {
		key: "hasOn",
		value: function hasOn(eventName) {
			return !!this._eventHandler[eventName];
		}

		/**
   * Attaches an event to a component.
   * @ko 컴포넌트에 이벤트를 등록한다.
   * @method eg.Component#on
   * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
   * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
   * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   class Some extends eg.Component{
   		hi(){
  			console.log("hi");
   		}
  		some(){
  			this.on("hi",this.hi); //attach event
  		}
  	}
   */

	}, {
		key: "on",
		value: function on(eventName, handlerToAttach) {
			if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object" && typeof handlerToAttach === "undefined") {
				var eventHash = eventName;
				var name = void 0;
				for (name in eventHash) {
					this.on(name, eventHash[name]);
				}
				return this;
			} else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
				var handlerList = this._eventHandler[eventName];

				if (typeof handlerList === "undefined") {
					handlerList = this._eventHandler[eventName] = [];
				}

				handlerList.push(handlerToAttach);
			}

			return this;
		}
		/**
   * Detaches an event from the component.
   * @ko 컴포넌트에 등록된 이벤트를 해제한다
   * @method eg.Component#off
   * @param {eventName} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
   * @param {Function} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
   * @return {eg.Component} An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   class Some extends eg.Component{
   		hi(){
  			console.log("hi");
   		}
  		some(){
  			this.off("hi",this.hi); //detach event
  		}
  	}
   */

	}, {
		key: "off",
		value: function off(eventName, handlerToDetach) {
			// All event detach.
			if (typeof eventName === "undefined") {
				this._eventHandler = {};
				return this;
			}

			// All handler of specific event detach.
			if (typeof handlerToDetach === "undefined") {
				if (typeof eventName === "string") {
					this._eventHandler[eventName] = undefined;
					return this;
				} else {
					var eventHash = eventName;
					var name = void 0;
					for (name in eventHash) {
						this.off(name, eventHash[name]);
					}
					return this;
				}
			}

			// The handler of specific event detach.
			var handlerList = this._eventHandler[eventName];
			if (handlerList) {
				var k = void 0;
				var handlerFunction = void 0;
				for (k = 0, handlerFunction; handlerFunction = handlerList[k]; k++) {
					if (handlerFunction === handlerToDetach) {
						handlerList = handlerList.splice(k, 1);
						break;
					}
				}
			}

			return this;
		}
	}]);

	return Component;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _component = __webpack_require__(0);

module.exports = _component.Component;

/***/ })
/******/ ]);
});
//# sourceMappingURL=component.js.map

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzMjcxMDY2M2ZkM2RmMzZmZWI5OSIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RzLmpzIiwid2VicGFjazovLy8uL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb29yZGluYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92YWJsZUNvb3JkLmpzIiwid2VicGFjazovLy8uL3NyYy9hbmltYXRpb25IYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9ldmVudEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hhbW1lck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9AZWdqcy9jb21wb25lbnQvZGlzdC9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiSGFtbWVyXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImRpcmVjdGlvbiIsIkRJUkVDVElPTl9OT05FIiwiRElSRUNUSU9OX0xFRlQiLCJESVJFQ1RJT05fUklHSFQiLCJESVJFQ1RJT05fVVAiLCJESVJFQ1RJT05fRE9XTiIsIkRJUkVDVElPTl9IT1JJWk9OVEFMIiwiRElSRUNUSU9OX1ZFUlRJQ0FMIiwiRElSRUNUSU9OX0FMTCIsIkRJUkVDVElPTiIsIlVOSVFVRUtFWSIsIlNVUFBPUlRfVE9VQ0giLCJ3aW4iLCJ3aW5kb3ciLCJNYXRoIiwic2VsZiIsIkZ1bmN0aW9uIiwiZG9jdW1lbnQiLCJDb29yZGluYXRlIiwiZ2V0RGlyZWN0aW9uQnlBbmdsZSIsImFuZ2xlIiwidGhyZXNob2xkQW5nbGUiLCJ0b0FuZ2xlIiwiYWJzIiwiaXNIb3Jpem9udGFsIiwidXNlckRpcmVjdGlvbiIsImlzVmVydGljYWwiLCJnZXRQb2ludE9mSW50ZXJzZWN0aW9uIiwiZGVwYVBvcyIsImRlc3RQb3MiLCJtaW4iLCJtYXgiLCJjaXJjdWxhciIsImJvdW5jZSIsImJveExUIiwiYm94UkIiLCJ0b0Rlc3RQb3MiLCJjb25jYXQiLCJ4ZCIsInlkIiwiaXNPdXRzaWRlIiwicG9zIiwiaXNPdXRUb091dCIsImdldE5leHRPZmZzZXRQb3MiLCJzcGVlZHMiLCJkZWNlbGVyYXRpb24iLCJub3JtYWxTcGVlZCIsInNxcnQiLCJkdXJhdGlvbiIsImdldER1cmF0aW9uRnJvbVBvcyIsIm5vcm1hbFBvcyIsImlzQ2lyY3VsYXIiLCJnZXRDaXJjdWxhclBvcyIsInRvUG9zIiwidG9GaXhlZCIsInV0aWxzIiwiZ2V0RWxlbWVudCIsImVsIiwicXVlcnlTZWxlY3RvciIsImpRdWVyeSIsImxlbmd0aCIsIk1peGluQnVpbGRlciIsInN1cGVyY2xhc3MiLCJ3aXRoIiwibWl4aW5zIiwicmVkdWNlIiwiYyIsIm0iLCJNaXhpbiIsIk1vdmFibGVDb29yZCIsIm9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iLCJtYXJnaW4iLCJlYXNpbmciLCJlYXNlT3V0Q3ViaWMiLCJ4IiwicG93IiwibWF4aW11bUR1cmF0aW9uIiwiSW5maW5pdHkiLCJfcmV2aXNlT3B0aW9ucyIsIl9oYW1tZXJNYW5hZ2VyIiwiX3BvcyIsImJpbmQiLCJlbGVtZW50IiwiYWRkIiwidW5iaW5kIiwicmVtb3ZlIiwiZ2V0SGFtbWVyIiwiZW5hYmxlSW5wdXQiLCJpbnB1dENvbnRyb2wiLCJkaXNhYmxlSW5wdXQiLCJrZXkiLCJmb3JFYWNoIiwidiIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJ0ZXN0IiwiZ2V0IiwiZGVzdHJveSIsIm9mZiIsIlZFUlNJT04iLCJfcmFmIiwiX2FuaW1hdGVQYXJhbSIsIl9hbmltYXRpb25FbmQiLCJfcmVzdG9yZSIsIl9ncmFiIiwidHJpZ2dlciIsIm9yZ1BvcyIsIl9zZXRQb3NBbmRUcmlnZ2VyQ2hhbmdlIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJfcHJlcGFyZVBhcmFtIiwiYWJzUG9zIiwiaGFtbWVyRXZlbnQiLCJkaXN0YW5jZSIsIm5ld0R1cmF0aW9uIiwiaXNCb3VuY2UiLCJkb25lIiwiY29tcGxldGUiLCJfYW5pbWF0ZSIsIm5leHRQb3MiLCJyb3VuZCIsInNldFRvIiwiX3NldEludGVycnVwdCIsInBhcmFtIiwic3RhcnRUaW1lIiwiRGF0ZSIsImdldFRpbWUiLCJpbmZvIiwibG9vcCIsIl9mcmFtZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIl9hbmltYXRlVG8iLCJyZXRUcmlnZ2VyIiwiRXJyb3IiLCJxdWV1ZSIsImRlcXVldWUiLCJ0YXNrIiwic2hpZnQiLCJjYWxsIiwicHVzaCIsImN1clRpbWUiLCJlYXNpbmdQZXIiLCJfZWFzaW5nIiwiaSIsInBvc2l0aW9uIiwiaG9sZGluZyIsImUiLCJwIiwieSIsInRvWCIsInRvWSIsInNldEJ5IiwiX3N0YXR1cyIsImdyYWJPdXRzaWRlIiwiY3VycmVudEhhbW1lciIsImN1cnJlbnRPcHRpb25zIiwibW92ZURpc3RhbmNlIiwicHJldmVudGVkIiwiX3NldEN1cnJlbnRUYXJnZXQiLCJoYW1tZXIiLCJjdXJyZW50SGFubW1lciIsIl9zdGFydCIsImludGVycnVwdGFibGUiLCJfbW92ZSIsIl9pc0ludGVycnVwdGluZyIsInNjYWxlIiwib3V0IiwicHJldmVudCIsInByZXZJbnB1dCIsInNlc3Npb24iLCJvZmZzZXRYIiwiZGVsdGFYIiwib2Zmc2V0WSIsImRlbHRhWSIsInNyY0V2ZW50IiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50U3lzdGVtRXZlbnQiLCJ0diIsInRuIiwidHgiLCJpbml0U2xvcGUiLCJfZW5kIiwidlgiLCJ2ZWxvY2l0eVgiLCJ2WSIsInZlbG9jaXR5WSIsIm9mZnNldCIsIkhhbW1lck1hbmFnZXIiLCJfaGFtbWVycyIsIl9jcmVhdGVIYW1tZXIiLCJiaW5kT3B0aW9ucyIsImlucHV0Q2xhc3MiLCJoYW5kbGVyIiwiX2F0dGFjaEhhbW1lckV2ZW50cyIsIk1hbmFnZXIiLCJyZWNvZ25pemVycyIsIlBhbiIsInRocmVzaG9sZCIsImNzc1Byb3BzIiwidXNlclNlbGVjdCIsInRvdWNoU2VsZWN0IiwidG91Y2hDYWxsb3V0IiwidXNlckRyYWciLCJrZXlWYWx1ZSIsImdldEF0dHJpYnV0ZSIsImlucHV0VHlwZSIsImNvbnZlcnRJbnB1dFR5cGUiLCJyYW5kb20iLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJkYXRhIiwiZW5hYmxlIiwib24iLCJpc0ZpcnN0IiwiaXNGaW5hbCIsIl9kZXRhY2hIYW1tZXJFdmVudHMiLCJoYXNUb3VjaCIsImhhc01vdXNlIiwiaW5wdXRzIiwiVG91Y2hJbnB1dCIsIk1vdXNlSW5wdXQiLCJpc0VuYWJsZSIsIm9wdGlvbiIsInNldCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0IsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNoRUE7O0FBRUE7Ozs7O0FBS0E7Ozs7O0FBS0E7Ozs7O0FBS0E7Ozs7O0FBS0E7Ozs7O0FBS0E7Ozs7O0FBS0E7Ozs7O0FBS0E7Ozs7O0FBS0EsSUFBTUEsWUFBWTtBQUNqQkMsa0JB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QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0EsQ0FBQzs7QUFFRCxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7O0FBRUE7O0FBRUEsT0FBTztBQUNQO0FBQ0EsQ0FBQztBQUNELHFDOzs7Ozs7QUN4WkEsK0M7Ozs7Ozs7OztBQ0FBOzs7Ozs7QUFFQXFDLE9BQU9DLE9BQVAsMEIiLCJmaWxlIjoibW92YWJsZWNvb3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiSGFtbWVyXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcIkhhbW1lclwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJNb3ZhYmxlQ29vcmRcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJIYW1tZXJcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImVnXCJdID0gcm9vdFtcImVnXCJdIHx8IHt9LCByb290W1wiZWdcIl1bXCJNb3ZhYmxlQ29vcmRcIl0gPSBmYWN0b3J5KHJvb3RbXCJIYW1tZXJcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV85X18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDMyNzEwNjYzZmQzZGYzNmZlYjk5IiwiaW1wb3J0IHt3aW5kb3d9IGZyb20gXCIuL2Jyb3dzZXJcIjtcblxuLyoqXG4gKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX05PTkVcbiAqIEBjb25zdGFudFxuICogQHR5cGUge051bWJlcn1cbiAqL1xuLyoqXG4gKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX0xFRlRcbiAqIEBjb25zdGFudFxuICogQHR5cGUge051bWJlcn1cbiovXG4vKipcbiAqIEBuYW1lIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fUklHSFRcbiAqIEBjb25zdGFudFxuICogQHR5cGUge051bWJlcn1cbiovXG4vKipcbiAqIEBuYW1lIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fVVBcbiAqIEBjb25zdGFudFxuICogQHR5cGUge051bWJlcn1cbiAqL1xuLyoqXG4gKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX0RPV05cbiAqIEBjb25zdGFudFxuICogQHR5cGUge051bWJlcn1cbiovXG4vKipcbiAqIEBuYW1lIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fSE9SSVpPTlRBTFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7TnVtYmVyfVxuKi9cbi8qKlxuICogQG5hbWUgZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9WRVJUSUNBTFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7TnVtYmVyfVxuKi9cbi8qKlxuICogQG5hbWUgZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9BTExcbiAqIEBjb25zdGFudFxuICogQHR5cGUge051bWJlcn1cbiovXG5jb25zdCBkaXJlY3Rpb24gPSB7XG5cdERJUkVDVElPTl9OT05FOiAxLFxuXHRESVJFQ1RJT05fTEVGVDogMixcblx0RElSRUNUSU9OX1JJR0hUOiA0LFxuXHRESVJFQ1RJT05fVVA6IDgsXG5cdERJUkVDVElPTl9ET1dOOiAxNixcblx0RElSRUNUSU9OX0hPUklaT05UQUw6IDIgfCA0LFxuXHRESVJFQ1RJT05fVkVSVElDQUw6IDggfCAxNlxufTtcblxuZGlyZWN0aW9uLkRJUkVDVElPTl9BTEwgPSBkaXJlY3Rpb24uRElSRUNUSU9OX0hPUklaT05UQUwgfFxuXHRkaXJlY3Rpb24uRElSRUNUSU9OX1ZFUlRJQ0FMO1xuZXhwb3J0IGNvbnN0IERJUkVDVElPTiA9IGRpcmVjdGlvbjtcbmV4cG9ydCBjb25zdCBVTklRVUVLRVkgPSBcIl9fTU9WQUJMRUNPT1JEX19cIjtcbmV4cG9ydCBjb25zdCBTVVBQT1JUX1RPVUNIID0gXCJvbnRvdWNoc3RhcnRcIiBpbiB3aW5kb3c7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25zdHMuanMiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYyAqL1xuY29uc3Qgd2luID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuTWF0aCA9PT0gTWF0aCA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuTWF0aCA9PT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLW5ldy1mdW5jICovXG5cbmV4cG9ydCB7d2luIGFzIHdpbmRvd307XG5leHBvcnQgY29uc3QgZG9jdW1lbnQgPSB3aW4uZG9jdW1lbnQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYnJvd3Nlci5qcyIsImltcG9ydCB7RElSRUNUSU9OfSBmcm9tIFwiLi9jb25zdHNcIjtcblxuY29uc3QgQ29vcmRpbmF0ZSA9IHtcblx0Ly8gZ2V0IHVzZXIncyBkaXJlY3Rpb25cblx0Z2V0RGlyZWN0aW9uQnlBbmdsZShhbmdsZSwgdGhyZXNob2xkQW5nbGUpIHtcblx0XHRpZiAodGhyZXNob2xkQW5nbGUgPCAwIHx8IHRocmVzaG9sZEFuZ2xlID4gOTApIHtcblx0XHRcdHJldHVybiBESVJFQ1RJT04uRElSRUNUSU9OX05PTkU7XG5cdFx0fVxuXHRcdGNvbnN0IHRvQW5nbGUgPSBNYXRoLmFicyhhbmdsZSk7XG5cblx0XHRyZXR1cm4gdG9BbmdsZSA+IHRocmVzaG9sZEFuZ2xlICYmIHRvQW5nbGUgPCAxODAgLSB0aHJlc2hvbGRBbmdsZSA/XG5cdFx0XHRcdERJUkVDVElPTi5ESVJFQ1RJT05fVkVSVElDQUwgOiBESVJFQ1RJT04uRElSRUNUSU9OX0hPUklaT05UQUw7XG5cdH0sXG5cdGlzSG9yaXpvbnRhbChkaXJlY3Rpb24sIHVzZXJEaXJlY3Rpb24pIHtcblx0XHRyZXR1cm4gZGlyZWN0aW9uID09PSBESVJFQ1RJT04uRElSRUNUSU9OX0FMTCB8fFxuXHRcdFx0KGRpcmVjdGlvbiAmIERJUkVDVElPTi5ESVJFQ1RJT05fSE9SSVpPTlRBTCAmJlxuXHRcdFx0dXNlckRpcmVjdGlvbiAmIERJUkVDVElPTi5ESVJFQ1RJT05fSE9SSVpPTlRBTCk7XG5cdH0sXG5cdGlzVmVydGljYWwoZGlyZWN0aW9uLCB1c2VyRGlyZWN0aW9uKSB7XG5cdFx0cmV0dXJuIGRpcmVjdGlvbiA9PT0gRElSRUNUSU9OLkRJUkVDVElPTl9BTEwgfHxcblx0XHRcdChkaXJlY3Rpb24gJiBESVJFQ1RJT04uRElSRUNUSU9OX1ZFUlRJQ0FMICYmXG5cdFx0XHR1c2VyRGlyZWN0aW9uICYgRElSRUNUSU9OLkRJUkVDVElPTl9WRVJUSUNBTCk7XG5cdH0sXG5cdGdldFBvaW50T2ZJbnRlcnNlY3Rpb24oZGVwYVBvcywgZGVzdFBvcywgbWluLCBtYXgsIGNpcmN1bGFyLCBib3VuY2UpIHtcblx0XHRjb25zdCBib3hMVCA9IFttaW5bMF0gLSBib3VuY2VbM10sIG1pblsxXSAtIGJvdW5jZVswXV07XG5cdFx0Y29uc3QgYm94UkIgPSBbbWF4WzBdICsgYm91bmNlWzFdLCBtYXhbMV0gKyBib3VuY2VbMl1dO1xuXHRcdGNvbnN0IHRvRGVzdFBvcyA9IGRlc3RQb3MuY29uY2F0KCk7XG5cblx0XHRjb25zdCB4ZCA9IGRlc3RQb3NbMF0gLSBkZXBhUG9zWzBdO1xuXHRcdGNvbnN0IHlkID0gZGVzdFBvc1sxXSAtIGRlcGFQb3NbMV07XG5cblx0XHRpZiAoIWNpcmN1bGFyWzNdKSB7XG5cdFx0XHR0b0Rlc3RQb3NbMF0gPSBNYXRoLm1heChib3hMVFswXSwgdG9EZXN0UG9zWzBdKTtcblx0XHR9IC8vIGxlZnRcblx0XHRpZiAoIWNpcmN1bGFyWzFdKSB7XG5cdFx0XHR0b0Rlc3RQb3NbMF0gPSBNYXRoLm1pbihib3hSQlswXSwgdG9EZXN0UG9zWzBdKTtcblx0XHR9IC8vIHJpZ2h0XG5cdFx0dG9EZXN0UG9zWzFdID0geGQgPyBkZXBhUG9zWzFdICsgeWQgLyB4ZCAqICh0b0Rlc3RQb3NbMF0gLSBkZXBhUG9zWzBdKSA6XG5cdFx0XHRcdFx0XHR0b0Rlc3RQb3NbMV07XG5cblx0XHRpZiAoIWNpcmN1bGFyWzBdKSB7XG5cdFx0XHR0b0Rlc3RQb3NbMV0gPSBNYXRoLm1heChib3hMVFsxXSwgdG9EZXN0UG9zWzFdKTtcblx0XHR9IC8vIHVwXG5cdFx0aWYgKCFjaXJjdWxhclsyXSkge1xuXHRcdFx0dG9EZXN0UG9zWzFdID0gTWF0aC5taW4oYm94UkJbMV0sIHRvRGVzdFBvc1sxXSk7XG5cdFx0fSAvLyBkb3duXG5cdFx0dG9EZXN0UG9zWzBdID0geWQgPyBkZXBhUG9zWzBdICsgeGQgLyB5ZCAqICh0b0Rlc3RQb3NbMV0gLSBkZXBhUG9zWzFdKSA6XG5cdFx0XHRcdFx0XHR0b0Rlc3RQb3NbMF07XG5cdFx0cmV0dXJuIFtcblx0XHRcdE1hdGgubWluKG1heFswXSwgTWF0aC5tYXgobWluWzBdLCB0b0Rlc3RQb3NbMF0pKSxcblx0XHRcdE1hdGgubWluKG1heFsxXSwgTWF0aC5tYXgobWluWzFdLCB0b0Rlc3RQb3NbMV0pKVxuXHRcdF07XG5cdH0sXG5cdC8vIGRldGVybWluZSBvdXRzaWRlXG5cdGlzT3V0c2lkZShwb3MsIG1pbiwgbWF4KSB7XG5cdFx0cmV0dXJuIHBvc1swXSA8IG1pblswXSB8fCBwb3NbMV0gPCBtaW5bMV0gfHxcblx0XHRcdHBvc1swXSA+IG1heFswXSB8fCBwb3NbMV0gPiBtYXhbMV07XG5cdH0sXG5cdC8vIGZyb20gb3V0c2lkZSB0byBvdXRzaWRlXG5cdGlzT3V0VG9PdXQocG9zLCBkZXN0UG9zLCBtaW4sIG1heCkge1xuXHRcdHJldHVybiAocG9zWzBdIDwgbWluWzBdIHx8IHBvc1swXSA+IG1heFswXSB8fFxuXHRcdFx0cG9zWzFdIDwgbWluWzFdIHx8IHBvc1sxXSA+IG1heFsxXSkgJiZcblx0XHRcdChkZXN0UG9zWzBdIDwgbWluWzBdIHx8IGRlc3RQb3NbMF0gPiBtYXhbMF0gfHxcblx0XHRcdGRlc3RQb3NbMV0gPCBtaW5bMV0gfHwgZGVzdFBvc1sxXSA+IG1heFsxXSk7XG5cdH0sXG5cdGdldE5leHRPZmZzZXRQb3Moc3BlZWRzLCBkZWNlbGVyYXRpb24pIHtcblx0XHRjb25zdCBub3JtYWxTcGVlZCA9IE1hdGguc3FydChcblx0XHRcdHNwZWVkc1swXSAqIHNwZWVkc1swXSArIHNwZWVkc1sxXSAqIHNwZWVkc1sxXVxuXHRcdCk7XG5cdFx0Y29uc3QgZHVyYXRpb24gPSBNYXRoLmFicyhub3JtYWxTcGVlZCAvIC1kZWNlbGVyYXRpb24pO1xuXG5cdFx0cmV0dXJuIFtcblx0XHRcdHNwZWVkc1swXSAvIDIgKiBkdXJhdGlvbixcblx0XHRcdHNwZWVkc1sxXSAvIDIgKiBkdXJhdGlvblxuXHRcdF07XG5cdH0sXG5cdGdldER1cmF0aW9uRnJvbVBvcyhwb3MsIGRlY2VsZXJhdGlvbikge1xuXHRcdGNvbnN0IG5vcm1hbFBvcyA9IE1hdGguc3FydChwb3NbMF0gKiBwb3NbMF0gKyBwb3NbMV0gKiBwb3NbMV0pO1xuXHRcdGNvbnN0IGR1cmF0aW9uID0gTWF0aC5zcXJ0KFxuXHRcdFx0bm9ybWFsUG9zIC8gZGVjZWxlcmF0aW9uICogMlxuXHRcdCk7XG5cblx0XHQvLyB3aGVuIGR1cmF0aW9uIGlzIHVuZGVyIDEwMCwgdGhlbiB2YWx1ZSBpcyB6ZXJvXG5cdFx0cmV0dXJuIGR1cmF0aW9uIDwgMTAwID8gMCA6IGR1cmF0aW9uO1xuXHR9LFxuXHRpc0NpcmN1bGFyKGRlc3RQb3MsIG1pbiwgbWF4LCBjaXJjdWxhcikge1xuXHRcdHJldHVybiAoY2lyY3VsYXJbMF0gJiYgZGVzdFBvc1sxXSA8IG1pblsxXSkgfHxcblx0XHRcdFx0KGNpcmN1bGFyWzFdICYmIGRlc3RQb3NbMF0gPiBtYXhbMF0pIHx8XG5cdFx0XHRcdChjaXJjdWxhclsyXSAmJiBkZXN0UG9zWzFdID4gbWF4WzFdKSB8fFxuXHRcdFx0XHQoY2lyY3VsYXJbM10gJiYgZGVzdFBvc1swXSA8IG1pblswXSk7XG5cdH0sXG5cdGdldENpcmN1bGFyUG9zKHBvcywgbWluLCBtYXgsIGNpcmN1bGFyKSB7XG5cdFx0Y29uc3QgdG9Qb3MgPSBwb3MuY29uY2F0KCk7XG5cblx0XHRpZiAoY2lyY3VsYXJbMF0gJiYgdG9Qb3NbMV0gPCBtaW5bMV0pIHsgLy8gdXBcblx0XHRcdHRvUG9zWzFdID0gKHRvUG9zWzFdIC0gbWluWzFdKSAlIChtYXhbMV0gLSBtaW5bMV0gKyAxKSArIG1heFsxXTtcblx0XHR9XG5cdFx0aWYgKGNpcmN1bGFyWzFdICYmIHRvUG9zWzBdID4gbWF4WzBdKSB7IC8vIHJpZ2h0XG5cdFx0XHR0b1Bvc1swXSA9ICh0b1Bvc1swXSAtIG1pblswXSkgJSAobWF4WzBdIC0gbWluWzBdICsgMSkgKyBtaW5bMF07XG5cdFx0fVxuXHRcdGlmIChjaXJjdWxhclsyXSAmJiB0b1Bvc1sxXSA+IG1heFsxXSkgeyAvLyBkb3duXG5cdFx0XHR0b1Bvc1sxXSA9ICh0b1Bvc1sxXSAtIG1pblsxXSkgJSAobWF4WzFdIC0gbWluWzFdICsgMSkgKyBtaW5bMV07XG5cdFx0fVxuXHRcdGlmIChjaXJjdWxhclszXSAmJiB0b1Bvc1swXSA8IG1pblswXSkgeyAvLyBsZWZ0XG5cdFx0XHR0b1Bvc1swXSA9ICh0b1Bvc1swXSAtIG1pblswXSkgJSAobWF4WzBdIC0gbWluWzBdICsgMSkgKyBtYXhbMF07XG5cdFx0fVxuXG5cdFx0dG9Qb3NbMF0gPSArdG9Qb3NbMF0udG9GaXhlZCg1KTtcblx0XHR0b1Bvc1sxXSA9ICt0b1Bvc1sxXS50b0ZpeGVkKDUpO1xuXHRcdHJldHVybiB0b1Bvcztcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29vcmRpbmF0ZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb29yZGluYXRlLmpzIiwiaW1wb3J0IHt3aW5kb3csIGRvY3VtZW50fSBmcm9tIFwiLi9icm93c2VyXCI7XG5cbmNvbnN0IHV0aWxzID0ge1xuXHRnZXRFbGVtZW50KGVsKSB7XG5cdFx0aWYgKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuXHRcdH0gZWxzZSBpZiAod2luZG93LmpRdWVyeSAmJiAoZWwgaW5zdGFuY2VvZiBqUXVlcnkpKSB7XG5cdFx0XHQvLyBpZiB5b3Ugd2VyZSB1c2luZyBqUXVlcnlcblx0XHRcdHJldHVybiBlbC5sZW5ndGggPiAwID8gZWxbMF0gOiBudWxsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fVxuXHR9XG59O1xuXG5jbGFzcyBNaXhpbkJ1aWxkZXIge1xuXHRjb25zdHJ1Y3RvcihzdXBlcmNsYXNzKSB7XG5cdFx0dGhpcy5zdXBlcmNsYXNzID0gc3VwZXJjbGFzcyB8fCBjbGFzcyB7fTtcblx0fVxuXHR3aXRoKC4uLm1peGlucykge1xuXHRcdHJldHVybiBtaXhpbnMucmVkdWNlKChjLCBtKSA9PiBtKGMpLCB0aGlzLnN1cGVyY2xhc3MpO1xuXHR9XG59XG5cbmNvbnN0IE1peGluID0gc3VwZXJjbGFzcyA9PiBuZXcgTWl4aW5CdWlsZGVyKHN1cGVyY2xhc3MpO1xuXG5leHBvcnQge01peGluLCB1dGlsc307XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMuanMiLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZWdqcy9jb21wb25lbnRcIjtcbmltcG9ydCBIYW1tZXJNYW5hZ2VyIGZyb20gXCIuL2hhbW1lck1hbmFnZXJcIjtcbmltcG9ydCBFdmVudEhhbmRsZXIgZnJvbSBcIi4vZXZlbnRIYW5kbGVyXCI7XG5pbXBvcnQgQW5pbWF0aW9uSGFuZGxlciBmcm9tIFwiLi9hbmltYXRpb25IYW5kbGVyXCI7XG5pbXBvcnQge0RJUkVDVElPTn0gZnJvbSBcIi4vY29uc3RzXCI7XG5pbXBvcnQge01peGlufSBmcm9tIFwiLi91dGlsc1wiO1xuXG4vKipcbiAqIEEgbW9kdWxlIHVzZWQgdG8gY2hhbmdlIHRoZSBpbmZvcm1hdGlvbiBvZiB1c2VyIGFjdGlvbiBlbnRlcmVkIGJ5IHZhcmlvdXMgaW5wdXQgZGV2aWNlcyBzdWNoIGFzIHRvdWNoIHNjcmVlbiBvciBtb3VzZSBpbnRvIGxvZ2ljYWwgY29vcmRpbmF0ZXMgd2l0aGluIHRoZSB2aXJ0dWFsIGNvb3JkaW5hdGUgc3lzdGVtLiBUaGUgY29vcmRpbmF0ZSBpbmZvcm1hdGlvbiBzb3J0ZWQgYnkgdGltZSBldmVudHMgb2NjdXJyZWQgaXMgcHJvdmlkZWQgaWYgYW5pbWF0aW9ucyBhcmUgbWFkZSBieSB1c2VyIGFjdGlvbnMuIFlvdSBjYW4gaW1wbGVtZW50IGEgdXNlciBpbnRlcmZhY2UgYnkgYXBwbHlpbmcgdGhlIGxvZ2ljYWwgY29vcmRpbmF0ZXMgcHJvdmlkZWQuIEZvciBtb3JlIGluZm9ybWF0aW9uIG9uIHRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlLCBzZWUgZGVtb3MuXG4gKiBAa28g7YSw7LmYIOyeheugpSDsnqXsuZjrgpgg66eI7Jqw7Iqk7JmAIOqwmeydgCDri6TslpHtlZwg7J6F66ClIOyepey5mOuhnCDsoITri6wg67Cb7J2AIOyCrOyaqeyekOydmCDrj5nsnpHsnYQg6rCA7IOBIOyijO2RnOqzhOydmCDrhbzrpqzsoIEg7KKM7ZGc66GcIOuzgOqyve2VmOuKlCDrqqjrk4guIOyCrOyaqeyekOydmCDrj5nsnpHsnLzroZwg7JWg64uI66mU7J207IWY7J20IOydvOyWtOuCmOuptCDsi5zqsITsiJzsnLzroZwg67OA6rK965CY64qUIOyijO2RnCDsoJXrs7Trj4Qg7KCc6rO17ZWc64ukLiDrs4Dqsr3rkJwg64W866as7KCBIOyijO2RnOulvCDrsJjsmIHtlbQgVUnrpbwg6rWs7ZiE7ZWgIOyImCDsnojri6QuIGVnLk1vdmFibGVDb29yZCDrqqjrk4jsnZgg7J6Q7IS47ZWcIOyekeuPmSDrsKnsi53snYAg642w66qo66W8IOywuOqzoO2VnOuLpC5cbiAqIEBjbGFzc1xuICogQG5hbWUgZWcuTW92YWJsZUNvb3JkXG4gKiBAZXh0ZW5kcyBlZy5Db21wb25lbnRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUaGUgb3B0aW9uIG9iamVjdCBvZiB0aGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZTxrbz5lZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2YIOyYteyFmCDqsJ3ssrQ8L2tvPlxuICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5taW4gVGhlIG1pbmltdW0gdmFsdWUgb2YgWCBhbmQgWSBjb29yZGluYXRlcyA8a28+7KKM7ZGc6rOE7J2YIOy1nOyGn+qwkjwva28+XG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWluLjA9MF0gVGhlIFggY29vcmRpbmF0ZSBvZiB0aGUgbWluaW11bSA8a28+7LWc7IaMIHjsooztkZw8L2tvPlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1pbi4xPTBdIFRoZSBZIGNvb3JkaW5hdGUgb2YgdGhlIG1pbmltdW0gPGtvPuy1nOyGjCB57KKM7ZGcPC9rbz5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLm1heCBUaGUgbWF4aW11bSB2YWx1ZSBvZiBYIGFuZCBZIGNvb3JkaW5hdGVzIDxrbz7sooztkZzqs4TsnZgg7LWc64yT6rCSPC9rbz5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5tYXguMD0xMDBdIFRoZSBYIGNvb3JkaW5hdGUgb2YgdGhlIG1heGltdW08a28+7LWc64yAIHjsooztkZw8L2tvPlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heC4xPTEwMF0gVGhlIFkgY29vcmRpbmF0ZSBvZiB0aGUgbWF4aW11bTxrbz7stZzrjIAgeeyijO2RnDwva28+XG4gKlxuICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5ib3VuY2UgVGhlIHNpemUgb2YgYm91bmNpbmcgYXJlYS4gVGhlIGNvb3JkaW5hdGVzIGNhbiBleGNlZWQgdGhlIGNvb3JkaW5hdGUgYXJlYSBhcyBtdWNoIGFzIHRoZSBib3VuY2luZyBhcmVhIGJhc2VkIG9uIHVzZXIgYWN0aW9uLiBJZiB0aGUgY29vcmRpbmF0ZXMgZG9lcyBub3QgZXhjZWVkIHRoZSBib3VuY2luZyBhcmVhIHdoZW4gYW4gZWxlbWVudCBpcyBkcmFnZ2VkLCB0aGUgY29vcmRpbmF0ZXMgd2hlcmUgYm91bmNpbmcgZWZmZWN0cyBhcmUgYXBwbGllZCBhcmUgcmV0dW5lZCBiYWNrIGludG8gdGhlIGNvb3JkaW5hdGUgYXJlYTxrbz7rsJTsmrTsiqQg7JiB7Jet7J2YIO2BrOq4sC4g7IKs7Jqp7J6Q7J2YIOuPmeyekeyXkCDrlLDrnbwg7KKM7ZGc6rCAIOyijO2RnCDsmIHsl63snYQg64SY7Ja0IOuwlOyatOyKpCDsmIHsl63snZgg7YGs6riw66eM7YG8IOuNlCDsnbTrj5ntlaAg7IiYIOyeiOuLpC4g7IKs7Jqp7J6Q6rCAIOuBjOyWtOuLpCDrhpPripQg64+Z7J6R7J2EIO2WiOydhCDrlYwg7KKM7ZGc6rCAIOuwlOyatOyKpCDsmIHsl63sl5Ag7J6I7Jy866m0LCDrsJTsmrTsiqQg7Zqo6rO86rCAIOyggeyaqeuQnCDsooztkZzqsIAg64uk7IucIOyijO2RnCDsmIHsl60g7JWI7Jy866GcIOuTpOyWtOyYqOuLpDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmJvdW5jZS4wPTEwXSBUaGUgc2l6ZSBvZiB0b3AgYXJlYSA8a28+7JyE7Kq9IOuwlOyatOyKpCDsmIHsl63snZgg7YGs6riwPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYm91bmNlLjE9MTBdIFRoZSBzaXplIG9mIHJpZ2h0IGFyZWEgPGtvPuyYpOuluOyqvSDrsJTsmrTsiqQg7JiB7Jet7J2YIO2BrOq4sDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmJvdW5jZS4yPTEwXSBUaGUgc2l6ZSBvZiBib3R0b20gYXJlYSA8a28+7JWE656Y7Kq9IOuwlOyatOyKpCDsmIHsl63snZgg7YGs6riwPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYm91bmNlLjM9MTBdIFRoZSBzaXplIG9mIGxlZnQgYXJlYSA8a28+7Jm87Kq9IOuwlOyatOyKpCDsmIHsl63snZgg7YGs6riwPC9rbz5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLm1hcmdpbiBUaGUgc2l6ZSBvZiBhY2Nlc3NpYmxlIHNwYWNlIG91dHNpZGUgdGhlIGNvb3JkaW5hdGUgYXJlYS4gSWYgYW4gZWxlbWVudCBpcyBkcmFnZ2VkIG91dHNpZGUgdGhlIGNvb3JkaW5hdGUgYXJlYSBhbmQgdGhlbiBkcm9wcGVkLCB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIGVsZW1lbnQgYXJlIHJldHVybmVkIGJhY2sgaW50byB0aGUgY29vcmRpbmF0ZSBhcmVhLiBUaGUgc2l6ZSBvZiBtYXJnaW5zIHRoYXQgY2FuIGJlIGV4Y2VlZGVkIDxrbz7iiJJcdOyijO2RnCDsmIHsl63snYQg64SY7Ja0IOydtOuPme2VoCDsiJgg7J6I64qUIOuwlOq5pSDsmIHsl63snZgg7YGs6riwLiDsgqzsmqnsnpDqsIAg7KKM7ZGc66W8IOuwlOq5pSDsmIHsl63quYzsp4Ag64GM7JeI64uk6rCAIOuGk+ycvOuptCDsooztkZzqsIAg7KKM7ZGcIOyYgeyXrSDslYjsnLzroZwg65Ok7Ja07Jio64ukLjwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1hcmdpbi4wPTBdIFRoZSBzaXplIG9mIHRvcCBtYXJnaW4gPGtvPuychOyqvSDrsJTquaUg7JiB7Jet7J2YIO2BrOq4sDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1hcmdpbi4xPTBdIFRoZSBzaXplIG9mIHJpZ2h0IG1hcmdpbiA8a28+7Jik66W47Kq9IOuwlOq5pSDsmIHsl63snZgg7YGs6riwPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWFyZ2luLjI9MF0gVGhlIHNpemUgb2YgYm90dG9tIG1hcmdpbiA8a28+7JWE656Y7Kq9IOuwlOq5pSDsmIHsl63snZgg7YGs6riwPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWFyZ2luLjM9MF0gVGhlIHNpemUgb2YgbGVmdCBtYXJnaW4gPGtvPuyZvOyqvSDrsJTquaUg7JiB7Jet7J2YIO2BrOq4sDwva28+XG4gKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLmNpcmN1bGFyIEluZGljYXRlcyB3aGV0aGVyIGEgY2lyY3VsYXIgZWxlbWVudCBpcyBhdmFpbGFibGUuIElmIGl0IGlzIHNldCB0byBcInRydWVcIiBhbmQgYW4gZWxlbWVudCBpcyBkcmFnZ2VkIG91dHNpZGUgdGhlIGNvb3JkaW5hdGUgYXJlYSwgdGhlIGVsZW1lbnQgd2lsbCBhcHBlYXIgb24gdGhlIG90aGVyIHNpZGUuPGtvPuyInO2ZmCDsl6zrtoAuICd0cnVlJ+uhnCDshKTsoJXtlZwg67Cp7Zal7J2YIOyijO2RnCDsmIHsl60g67CW7Jy866GcIOyXmOumrOuovO2KuOqwgCDsnbTrj5ntlZjrqbQg67CY64yAIOuwqe2WpeyXkOyEnCDsl5jrpqzrqLztirjqsIAg64KY7YOA64Kc64ukPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2lyY3VsYXIuMD1mYWxzZV0gSW5kaWNhdGVzIHdoZXRoZXIgdG8gY2lyY3VsYXRlIHRvIHRvcCA8a28+7JyE66GcIOyInO2ZmCDsl6zrtoA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jaXJjdWxhci4xPWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciB0byBjaXJjdWxhdGUgdG8gcmlnaHQgPGtvPuyYpOuluOyqveycvOuhnCDsiJztmZgg7Jes67aAPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2lyY3VsYXIuMj1mYWxzZV0gSW5kaWNhdGVzIHdoZXRoZXIgdG8gY2lyY3VsYXRlIHRvIGJvdHRvbSAgPGtvPuyVhOuemOuhnCDsiJztmZgg7Jes67aAPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2lyY3VsYXIuMz1mYWxzZV0gSW5kaWNhdGVzIHdoZXRoZXIgdG8gY2lyY3VsYXRlIHRvIGxlZnQgIDxrbz7smbzsqr3snLzroZwg7Iic7ZmYIOyXrOu2gDwva28+XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuZWFzaW5nPWVhc2luZy5lYXNlT3V0Q3ViaWNdIFRoZSBlYXNpbmcgZnVuY3Rpb24gdG8gYXBwbHkgdG8gYW4gYW5pbWF0aW9uIDxrbz7slaDri4jrqZTsnbTshZjsl5Ag7KCB7Jqp7ZWgIGVhc2luZyDtlajsiJg8L2tvPlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heGltdW1EdXJhdGlvbj1JbmZpbml0eV0gTWF4aW11bSBkdXJhdGlvbiBvZiB0aGUgYW5pbWF0aW9uIDxrbz7qsIDsho3rj4Tsl5Ag7J2Y7ZW0IOyVoOuLiOuplOydtOyFmOydtCDrj5nsnpHtlaAg65WM7J2YIOy1nOuMgCDsooztkZwg7J2064+ZIOyLnOqwhDwva28+XG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZGVjZWxlcmF0aW9uPTAuMDAwNl0gRGVjZWxlcmF0aW9uIG9mIHRoZSBhbmltYXRpb24gd2hlcmUgYWNjZWxlcmF0aW9uIGlzIG1hbnVhbGx5IGVuYWJsZWQgYnkgdXNlci4gQSBoaWdoZXIgdmFsdWUgaW5kaWNhdGVzIHNob3J0ZXIgcnVubmluZyB0aW1lLiA8a28+7IKs7Jqp7J6Q7J2YIOuPmeyekeycvOuhnCDqsIDsho3rj4TqsIAg7KCB7Jqp65CcIOyVoOuLiOuplOydtOyFmOydmCDqsJDsho3rj4QuIOqwkuydtCDrhpLsnYTsiJjroZ0g7JWg64uI66mU7J207IWYIOyLpO2WiSDsi5zqsITsnbQg7Ken7JWE7KeE64ukPC9rbz5cbiAqIEBzZWUgSGFtbWVySlMge0BsaW5rIGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW99XG4gKiBAc2VlIOKAoiBIYW1tZXIuSlMgYXBwbGllcyBzcGVjaWZpYyBDU1MgcHJvcGVydGllcyBieSBkZWZhdWx0IHdoZW4gY3JlYXRpbmcgYW4gaW5zdGFuY2UgKFNlZSB7QGxpbmsgaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby9qc2RvYy9IYW1tZXIuZGVmYXVsdHMuY3NzUHJvcHMuaHRtbH0pLiBUaGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZSByZW1vdmVzIGFsbCBkZWZhdWx0IENTUyBwcm9wZXJ0aWVzIHByb3ZpZGVkIGJ5IEhhbW1lci5KUyA8a28+SGFtbWVyLkpT64qUIOyduOyKpO2EtOyKpOulvCDsg53shLHtlaAg65WMIOq4sOuzuOycvOuhnCDtirnsoJUgQ1NTIOyGjeyEseydhCDsoIHsmqntlZzri6Qo7LC46rOgOiBAbGlua3todHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL2pzZG9jL0hhbW1lci5kZWZhdWx0cy5jc3NQcm9wcy5odG1sfSkuIO2Kueygle2VnCDsg4Htmansl5DshJzripQgSGFtbWVyLkpT7J2YIOyGjeyEsSDrlYzrrLjsl5Ag7IKs7Jqp7ISx7JeQIOusuOygnOqwgCDsnojsnYQg7IiYIOyeiOuLpC4gZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydgCBIYW1tZXIuSlPsnZgg6riw67O4IENTUyDsho3shLHsnYQg66qo65GQIOygnOqxsO2WiOuLpDwva28+XG4gKlxuICogQGNvZGVwZW4ge1wiaWRcIjpcImpQUHFlUlwiLCBcImtvXCI6XCJNb3ZhYmxlQ29vcmQgQ3ViZSDsmIjsoJxcIiwgXCJlblwiOlwiTW92YWJsZUNvb3JkIEN1YmUgZXhhbXBsZVwiLCBcImNvbGxlY3Rpb25JZFwiOlwiQUtwa0dXXCIsIFwiaGVpZ2h0XCI6IDQwM31cbiAqXG4gKiBAc2VlIEVhc2luZyBGdW5jdGlvbnMgQ2hlYXQgU2hlZXQge0BsaW5rIGh0dHA6Ly9lYXNpbmdzLm5ldC99XG4gKiBAc2VlIElmIHlvdSB3YW50IHRvIHRyeSBhIGRpZmZlcmVudCBlYXNpbmcgZnVuY3Rpb24sIHVzZSB0aGUgalF1ZXJ5IGVhc2luZyBwbHVnaW4gKHtAbGluayBodHRwOi8vZ3NnZC5jby51ay9zYW5kYm94L2pxdWVyeS9lYXNpbmd9KSBvciB0aGUgalF1ZXJ5IFVJIGVhc2luZyBsaWJyYXJ5ICh7QGxpbmsgaHR0cHM6Ly9qcXVlcnl1aS5jb20vZWFzaW5nfSkgPGtvPuuLpOuluCBlYXNpbmcg7ZWo7IiY66W8IOyCrOyaqe2VmOugpOuptCBqUXVlcnkgZWFzaW5nIO2UjOufrOq3uOyduCh7QGxpbmsgaHR0cDovL2dzZ2QuY28udWsvc2FuZGJveC9qcXVlcnkvZWFzaW5nfSnsnbTrgpgsIGpRdWVyeSBVSSBlYXNpbmcg65287J2067iM65+s66asKHtAbGluIGh0dHBzOi8vanF1ZXJ5dWkuY29tL2Vhc2luZ30p66W8IOyCrOyaqe2VnOuLpDwva28+XG4gKlxuICogQHN1cHBvcnQge1wiaWVcIjogXCIxMCtcIiwgXCJjaFwiIDogXCJsYXRlc3RcIiwgXCJmZlwiIDogXCJsYXRlc3RcIiwgIFwic2ZcIiA6IFwibGF0ZXN0XCIsIFwiZWRnZVwiIDogXCJsYXRlc3RcIiwgXCJpb3NcIiA6IFwiNytcIiwgXCJhblwiIDogXCIyLjMrIChleGNlcHQgMy54KVwifVxuICovXG5jb25zdCBNb3ZhYmxlQ29vcmQgPSBjbGFzcyBNb3ZhYmxlQ29vcmRcbmV4dGVuZHMgTWl4aW4oQ29tcG9uZW50KS53aXRoKEV2ZW50SGFuZGxlciwgQW5pbWF0aW9uSGFuZGxlcikge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucyA9IHtcblx0XHRcdG1pbjogWzAsIDBdLFxuXHRcdFx0bWF4OiBbMTAwLCAxMDBdLFxuXHRcdFx0Ym91bmNlOiBbMTAsIDEwLCAxMCwgMTBdLFxuXHRcdFx0bWFyZ2luOiBbMCwgMCwgMCwgMF0sXG5cdFx0XHRjaXJjdWxhcjogW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcblx0XHRcdGVhc2luZzogZnVuY3Rpb24gZWFzZU91dEN1YmljKHgpIHtcblx0XHRcdFx0cmV0dXJuIDEgLSBNYXRoLnBvdygxIC0geCwgMyk7XG5cdFx0XHR9LFxuXHRcdFx0bWF4aW11bUR1cmF0aW9uOiBJbmZpbml0eSxcblx0XHRcdGRlY2VsZXJhdGlvbjogMC4wMDA2XG5cdFx0fSwgb3B0aW9ucyk7XG5cdFx0dGhpcy5fcmV2aXNlT3B0aW9ucygpO1xuXHRcdHRoaXMuX2hhbW1lck1hbmFnZXIgPSBuZXcgSGFtbWVyTWFuYWdlcigpO1xuXHRcdHRoaXMuX3BvcyA9IHRoaXMub3B0aW9ucy5taW4uY29uY2F0KCk7XG5cdH1cblxuXHQvKipcblx0ICogUmVnaXN0ZXJzIGFuIGVsZW1lbnQgdG8gdXNlIHRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlLlxuXHQgKiBAa28gZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydhCDsgqzsmqntlaAg7JeY66as66i87Yq466W8IOuTseuhne2VnOuLpFxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNiaW5kXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8U3RyaW5nfGpRdWVyeX0gZWxlbWVudCBBbiBlbGVtZW50IHRvIHVzZSB0aGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZTxrbz7iiJJcdGVnLk1vdmFibGVDb29yZCDrqqjrk4jsnYQg7IKs7Jqp7ZWgIOyXmOumrOuovO2KuDwva28+XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFRoZSBvcHRpb24gb2JqZWN0IG9mIHRoZSBiaW5kKCkgbWV0aG9kIDxrbz5iaW5kKCkg66mU7ISc65Oc7J2YIOyYteyFmCDqsJ3ssrQ8L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZGlyZWN0aW9uPWVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fQUxMXSBDb29yZGluYXRlIGRpcmVjdGlvbiB0aGF0IGEgdXNlciBjYW4gbW92ZTxicj4tIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fQUxMOiBBbGwgZGlyZWN0aW9ucyBhdmFpbGFibGUuPGJyPi0gZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9IT1JJWk9OVEFMOiBIb3Jpem9udGFsIGRpcmVjdGlvbiBvbmx5Ljxicj4tIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fVkVSVElDQUw6IFZlcnRpY2FsIGRpcmVjdGlvbiBvbmx5PGtvPuyCrOyaqeyekOydmCDrj5nsnpHsnLzroZwg7JuA7KeB7J28IOyImCDsnojripQg7KKM7ZGc7J2YIOuwqe2WpS48YnI+LSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX0FMTDog66qo65OgIOuwqe2WpeycvOuhnCDsm4Dsp4Hsnbwg7IiYIOyeiOuLpC48YnI+LSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX0hPUklaT05UQUw6IOqwgOuhnCDrsKntlqXsnLzroZzrp4wg7JuA7KeB7J28IOyImCDsnojri6QuPGJyPi0gZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9WRVJUSUNBTDog7IS466GcIOuwqe2WpeycvOuhnOunjCDsm4Dsp4Hsnbwg7IiYIOyeiOuLpC48L2tvPlxuXHQgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnNjYWxlIENvb3JkaW5hdGUgc2NhbGUgdGhhdCBhIHVzZXIgY2FuIG1vdmU8a28+7IKs7Jqp7J6Q7J2YIOuPmeyekeycvOuhnCDsnbTrj5ntlZjripQg7KKM7ZGc7J2YIOuwsOycqDwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zY2FsZS4wPTFdIFgtYXhpcyBzY2FsZSA8a28+eOy2lSDrsLDsnKg8L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuc2NhbGUuMT0xXSBZLWF4aXMgc2NhbGUgPGtvPnnstpUg67Cw7JyoPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnRocmVzaG9sZEFuZ2xlPTQ1XSBUaGUgdGhyZXNob2xkIHZhbHVlIHRoYXQgZGV0ZXJtaW5lcyB3aGV0aGVyIHVzZXIgYWN0aW9uIGlzIGhvcml6b250YWwgb3IgdmVydGljYWwgKDB+OTApIDxrbz7sgqzsmqnsnpDsnZgg64+Z7J6R7J20IOqwgOuhnCDrsKntlqXsnbjsp4Ag7IS466GcIOuwqe2WpeyduOyngCDtjJDri6jtlZjripQg6riw7KSAIOqwgeuPhCgwfjkwKTwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5pbnRlcnJ1cHRhYmxlPXRydWVdIEluZGljYXRlcyB3aGV0aGVyIGFuIGFuaW1hdGlvbiBpcyBpbnRlcnJ1cHRpYmxlLjxicj4tIHRydWU6IEl0IGNhbiBiZSBwYXVzZWQgb3Igc3RvcHBlZCBieSB1c2VyIGFjdGlvbiBvciB0aGUgQVBJLjxicj4tIGZhbHNlOiBJdCBjYW5ub3QgYmUgcGF1c2VkIG9yIHN0b3BwZWQgYnkgdXNlciBhY3Rpb24gb3IgdGhlIEFQSSB3aGlsZSBpdCBpcyBydW5uaW5nLjxrbz7sp4Ttlokg7KSR7J24IOyVoOuLiOuplOydtOyFmCDspJHsp4Ag6rCA64qlIOyXrOu2gC48YnI+LSB0cnVlOiDsgqzsmqnsnpDsnZgg64+Z7J6R7J2064KYIEFQSeuhnCDslaDri4jrqZTsnbTshZjsnYQg7KSR7KeA7ZWgIOyImCDsnojri6QuPGJyPi0gZmFsc2U6IOyVoOuLiOuplOydtOyFmOydtCDsp4Ttlokg7KSR7J28IOuVjOuKlCDsgqzsmqnsnpDsnZgg64+Z7J6R7J2064KYIEFQSeqwgCDsoIHsmqnrkJjsp4Ag7JWK64qU64ukPC9rbz5cblx0ICogQHBhcmFtIHtBcnJheX0gW29wdGlvbnMuaW5wdXRUeXBlXSBUeXBlcyBvZiBpbnB1dCBkZXZpY2VzLiAoZGVmYXVsdDogW1widG91Y2hcIiwgXCJtb3VzZVwiXSk8YnI+LSB0b3VjaDogVG91Y2ggc2NyZWVuPGJyPi0gbW91c2U6IE1vdXNlIDxrbz7snoXroKUg7J6l7LmYIOyiheulmC4o6riw67O46rCSOiBbXCJ0b3VjaFwiLCBcIm1vdXNlXCJdKTxicj4tIHRvdWNoOiDthLDsuZgg7J6F66ClIOyepey5mDxicj4tIG1vdXNlOiDrp4jsmrDsiqQ8L2tvPlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtlZy5Nb3ZhYmxlQ29vcmR9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZiA8a28+66qo65OIIOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKi9cblx0YmluZChlbGVtZW50LCBvcHRpb25zKSB7XG5cdFx0dGhpcy5faGFtbWVyTWFuYWdlci5hZGQoZWxlbWVudCwgb3B0aW9ucywgdGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0LyoqXG5cdCAqIERldGFjaGVzIGFuIGVsZW1lbnQgdXNpbmcgdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUuXG5cdCAqIEBrbyBlZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2EIOyCrOyaqe2VmOuKlCDsl5jrpqzrqLztirjrpbwg7ZW07KCc7ZWc64ukXG5cdCAqIEBtZXRob2QgZWcuTW92YWJsZUNvb3JkI3VuYmluZFxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ3xqUXVlcnl9IGVsZW1lbnQgQW4gZWxlbWVudCBmcm9tIHdoaWNoIHRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlIGlzIGRldGFjaGVkPGtvPmVnLk1vdmFibGVDb29yZCDrqqjrk4jsnYQg7ZW07KCc7ZWgIOyXmOumrOuovO2KuDwva28+XG5cdCAqIEByZXR1cm4ge2VnLk1vdmFibGVDb29yZH0gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmPGtvPuuqqOuTiCDsnpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICovXG5cdHVuYmluZChlbGVtZW50KSB7XG5cdFx0dGhpcy5faGFtbWVyTWFuYWdlci5yZW1vdmUoZWxlbWVudCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogZ2V0IGEgaGFtbWVyIGluc3RhbmNlIGZyb20gZWxlbWVudHMgdXNpbmcgdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUuXG5cdCAqIEBrbyBlZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2EIOyCrOyaqe2VmOuKlCDsl5jrpqzrqLztirjsl5DshJwgaGFtbWVyIOqwneyytOulvCDslrvripTri6Rcblx0ICogQG1ldGhvZCBlZy5Nb3ZhYmxlQ29vcmQjZ2V0SGFtbWVyXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8U3RyaW5nfGpRdWVyeX0gZWxlbWVudCBBbiBlbGVtZW50IGZyb20gd2hpY2ggdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUgaXMgdXNpbmc8a28+ZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydhCDsgqzsmqntlZjripQg7JeY66as66i87Yq4PC9rbz5cblx0ICogQHJldHVybiB7SGFtbWVyfG51bGx9IEFuIGluc3RhbmNlIG9mIEhhbW1lci5KUzxrbz5IYW1tZXIuSlPsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICovXG5cdGdldEhhbW1lcihlbGVtZW50KSB7XG5cdFx0cmV0dXJuIHRoaXMuX2hhbW1lck1hbmFnZXIuZ2V0SGFtbWVyKGVsZW1lbnQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEVuYWJsZXMgaW5wdXQgZGV2aWNlc1xuXHQgKiBAa28g7J6F66ClIOyepey5mOulvCDsgqzsmqntlaAg7IiYIOyeiOqyjCDtlZzri6Rcblx0ICogQG1ldGhvZCBlZy5Nb3ZhYmxlQ29vcmQjZW5hYmxlSW5wdXRcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd8alF1ZXJ5fSBbZWxlbWVudF0gQW4gZWxlbWVudCBmcm9tIHdoaWNoIHRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlIGlzIHVzaW5nIChpZiB0aGUgZWxlbWVudCBwYXJhbWV0ZXIgaXMgbm90IHByZXNlbnQsIGl0IGFwcGxpZXMgdG8gYWxsIGJpbmRlZCBlbGVtZW50cyk8a28+ZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydhCBcdOyCrOyaqe2VmOuKlCDsl5jrpqzrqLztirggKGVsZW1lbnQg7YyM652866+47YSw6rCAIOyhtOyerO2VmOyngCDslYrsnYQg6rK97JqwLCDrsJTsnbjrk5zrkJwg66qo65OgIOyXmOumrOuovO2KuOyXkCDsoIHsmqnrkJzri6QpPC9rbz5cblx0ICogQHJldHVybiB7ZWcuTW92YWJsZUNvb3JkfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGYgPGtvPuyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQqL1xuXHRlbmFibGVJbnB1dChlbGVtZW50KSB7XG5cdFx0cmV0dXJuIHRoaXMuX2hhbW1lck1hbmFnZXIuaW5wdXRDb250cm9sKHRydWUsIGVsZW1lbnQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERpc2FibGVzIGlucHV0IGRldmljZXNcblx0ICogQGtvIOyeheugpSDsnqXsuZjrpbwg7IKs7Jqp7ZWgIOyImCDsl4bqsowg7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNkaXNhYmxlSW5wdXRcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd8alF1ZXJ5fSBbZWxlbWVudF0gQW4gZWxlbWVudCBmcm9tIHdoaWNoIHRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlIGlzIHVzaW5nIChpZiB0aGUgZWxlbWVudCBwYXJhbWV0ZXIgaXMgbm90IHByZXNlbnQsIGl0IGFwcGxpZXMgdG8gYWxsIGJpbmRlZCBlbGVtZW50cyk8PGtvPmVnLk1vdmFibGVDb29yZCDrqqjrk4jsnYQgXHTsgqzsmqntlZjripQg7JeY66as66i87Yq4IChlbGVtZW50IO2MjOudvOuvuO2EsOqwgCDsobTsnqztlZjsp4Ag7JWK7J2EIOqyveyasCwg67CU7J2465Oc65CcIOuqqOuToCDsl5jrpqzrqLztirjsl5Ag7KCB7Jqp65Cc64ukKTwva28+XG5cdCAqIEByZXR1cm4ge2VnLk1vdmFibGVDb29yZH0gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmIDxrbz7snpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICovXG5cdGRpc2FibGVJbnB1dChlbGVtZW50KSB7XG5cdFx0cmV0dXJuIHRoaXMuX2hhbW1lck1hbmFnZXIuaW5wdXRDb250cm9sKGZhbHNlLCBlbGVtZW50KTtcblx0fVxuXG5cdC8vIHNldCB1cCAnY3NzJyBleHByZXNzaW9uXG5cdF9yZXZpc2VPcHRpb25zKCkge1xuXHRcdGxldCBrZXk7XG5cblx0XHRbXCJib3VuY2VcIiwgXCJtYXJnaW5cIiwgXCJjaXJjdWxhclwiXS5mb3JFYWNoKHYgPT4ge1xuXHRcdFx0a2V5ID0gdGhpcy5vcHRpb25zW3ZdO1xuXHRcdFx0aWYgKGtleSAhPSBudWxsKSB7XG5cdFx0XHRcdGlmIChrZXkuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XG5cdFx0XHRcdFx0dGhpcy5vcHRpb25zW3ZdID0ga2V5Lmxlbmd0aCA9PT0gMiA/XG5cdFx0XHRcdFx0XHRrZXkuY29uY2F0KGtleSkgOiBrZXkuY29uY2F0KCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoL3N0cmluZ3xudW1iZXJ8Ym9vbGVhbi8udGVzdCh0eXBlb2Yga2V5KSkge1xuXHRcdFx0XHRcdHRoaXMub3B0aW9uc1t2XSA9IFtrZXksIGtleSwga2V5LCBrZXldO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMub3B0aW9uc1t2XSA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBsb2dpY2FsIGNvb3JkaW5hdGVzLlxuXHQgKiBAa28g64W866as7KCBIOyijO2RnOydmCDtmITsnqwg7JyE7LmY66W8IOuwmO2ZmO2VnOuLpFxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNnZXRcblx0ICogQHJldHVybiB7QXJyYXl9IHBvcyA8a28+7KKM7ZGcPC9rbz5cblx0ICogQHJldHVybiB7TnVtYmVyfSBwb3MuMCBUaGUgWCBjb29yZGluYXRlIDxrbz54IOyijO2RnDwva28+XG5cdCAqIEByZXR1cm4ge051bWJlcn0gcG9zLjEgVGhlIFkgY29vcmRpbmF0ZSA8a28+eSDsooztkZw8L2tvPlxuXHQgKi9cblx0Z2V0KCkge1xuXHRcdHJldHVybiB0aGlzLl9wb3MuY29uY2F0KCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVzdHJveXMgZWxlbWVudHMsIHByb3BlcnRpZXMsIGFuZCBldmVudHMgdXNlZCBpbiBhIG1vZHVsZS5cblx0ICogQGtvIOuqqOuTiOyXkCDsgqzsmqntlZwg7JeY66as66i87Yq47JmAIOyGjeyEsSwg7J2067Kk7Yq466W8IO2VtOygnO2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5Nb3ZhYmxlQ29vcmQjZGVzdHJveVxuXHQgKi9cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLm9mZigpO1xuXHRcdHRoaXMuX2hhbW1lck1hbmFnZXIuZGVzdHJveSgpO1xuXHR9XG59O1xuXG5PYmplY3QuYXNzaWduKE1vdmFibGVDb29yZCwgRElSRUNUSU9OKTtcbk1vdmFibGVDb29yZC5WRVJTSU9OID0gXCIyLjAuMC1iZXRhXCI7XG5leHBvcnQgZGVmYXVsdCBNb3ZhYmxlQ29vcmQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW92YWJsZUNvb3JkLmpzIiwiaW1wb3J0IENvb3JkaW5hdGUgZnJvbSBcIi4vY29vcmRpbmF0ZVwiO1xuaW1wb3J0IHt3aW5kb3d9IGZyb20gXCIuL2Jyb3dzZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgc3VwZXJjbGFzcyA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX3JhZiA9IG51bGw7XG5cdFx0dGhpcy5fYW5pbWF0ZVBhcmFtID0gbnVsbDtcblx0XHR0aGlzLl9hbmltYXRpb25FbmQgPSB0aGlzLl9hbmltYXRpb25FbmQuYmluZCh0aGlzKTtcdC8vIGZvciBjYWNoaW5nXG5cdFx0dGhpcy5fcmVzdG9yZSA9IHRoaXMuX3Jlc3RvcmUuYmluZCh0aGlzKTtcdC8vIGZvciBjYWNoaW5nXG5cdH1cblxuXHRfZ3JhYihtaW4sIG1heCwgY2lyY3VsYXIpIHtcblx0XHRpZiAodGhpcy5fYW5pbWF0ZVBhcmFtKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJhbmltYXRpb25FbmRcIik7XG5cdFx0XHRjb25zdCBvcmdQb3MgPSB0aGlzLmdldCgpO1xuXG5cdFx0XHRjb25zdCBwb3MgPSBDb29yZGluYXRlLmdldENpcmN1bGFyUG9zKHRoaXMuZ2V0KCksIG1pbiwgbWF4LCBjaXJjdWxhcik7XG5cblx0XHRcdGlmIChwb3NbMF0gIT09IG9yZ1Bvc1swXSB8fCBwb3NbMV0gIT09IG9yZ1Bvc1sxXSkge1xuXHRcdFx0XHR0aGlzLl9zZXRQb3NBbmRUcmlnZ2VyQ2hhbmdlKHBvcywgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9hbmltYXRlUGFyYW0gPSBudWxsO1xuXHRcdFx0dGhpcy5fcmFmICYmIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9yYWYpO1xuXHRcdFx0dGhpcy5fcmFmID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRfcHJlcGFyZVBhcmFtKGFic1BvcywgZHVyYXRpb24sIGhhbW1lckV2ZW50KSB7XG5cdFx0Y29uc3QgcG9zID0gdGhpcy5nZXQoKTtcblx0XHRjb25zdCBtaW4gPSB0aGlzLm9wdGlvbnMubWluO1xuXHRcdGNvbnN0IG1heCA9IHRoaXMub3B0aW9ucy5tYXg7XG5cdFx0Y29uc3QgY2lyY3VsYXIgPSB0aGlzLm9wdGlvbnMuY2lyY3VsYXI7XG5cdFx0Y29uc3QgbWF4aW11bUR1cmF0aW9uID0gdGhpcy5vcHRpb25zLm1heGltdW1EdXJhdGlvbjtcblx0XHRsZXQgZGVzdFBvcyA9IENvb3JkaW5hdGUuZ2V0UG9pbnRPZkludGVyc2VjdGlvbihcblx0XHRcdHBvcywgYWJzUG9zLCBtaW4sIG1heCwgY2lyY3VsYXIsIHRoaXMub3B0aW9ucy5ib3VuY2UpO1xuXG5cdFx0ZGVzdFBvcyA9IENvb3JkaW5hdGUuaXNPdXRUb091dChwb3MsIGRlc3RQb3MsIG1pbiwgbWF4KSA/IHBvcyA6IGRlc3RQb3M7XG5cblx0XHRjb25zdCBkaXN0YW5jZSA9IFtcblx0XHRcdE1hdGguYWJzKGRlc3RQb3NbMF0gLSBwb3NbMF0pLFxuXHRcdFx0TWF0aC5hYnMoZGVzdFBvc1sxXSAtIHBvc1sxXSlcblx0XHRdO1xuXHRcdGxldCBuZXdEdXJhdGlvbiA9IGR1cmF0aW9uID09IG51bGwgPyBDb29yZGluYXRlLmdldER1cmF0aW9uRnJvbVBvcyhcblx0XHRcdGRpc3RhbmNlLCB0aGlzLm9wdGlvbnMuZGVjZWxlcmF0aW9uKSA6IGR1cmF0aW9uO1xuXG5cdFx0bmV3RHVyYXRpb24gPSBtYXhpbXVtRHVyYXRpb24gPiBuZXdEdXJhdGlvbiA/IG5ld0R1cmF0aW9uIDogbWF4aW11bUR1cmF0aW9uO1xuXHRcdHJldHVybiB7XG5cdFx0XHRkZXBhUG9zOiBwb3MuY29uY2F0KCksXG5cdFx0XHRkZXN0UG9zOiBkZXN0UG9zLmNvbmNhdCgpLFxuXHRcdFx0aXNCb3VuY2U6IENvb3JkaW5hdGUuaXNPdXRzaWRlKGRlc3RQb3MsIG1pbiwgbWF4KSxcblx0XHRcdGlzQ2lyY3VsYXI6IENvb3JkaW5hdGUuaXNDaXJjdWxhcihhYnNQb3MsIG1pbiwgbWF4LCBjaXJjdWxhciksXG5cdFx0XHRkdXJhdGlvbjogbmV3RHVyYXRpb24sXG5cdFx0XHRkaXN0YW5jZSxcblx0XHRcdGhhbW1lckV2ZW50OiBoYW1tZXJFdmVudCB8fCBudWxsLFxuXHRcdFx0ZG9uZTogdGhpcy5fYW5pbWF0aW9uRW5kXG5cdFx0fTtcblx0fVxuXG5cdF9yZXN0b3JlKGNvbXBsZXRlLCBoYW1tZXJFdmVudCkge1xuXHRcdGNvbnN0IHBvcyA9IHRoaXMuZ2V0KCk7XG5cdFx0Y29uc3QgbWluID0gdGhpcy5vcHRpb25zLm1pbjtcblx0XHRjb25zdCBtYXggPSB0aGlzLm9wdGlvbnMubWF4O1xuXG5cdFx0dGhpcy5fYW5pbWF0ZSh0aGlzLl9wcmVwYXJlUGFyYW0oW1xuXHRcdFx0TWF0aC5taW4obWF4WzBdLCBNYXRoLm1heChtaW5bMF0sIHBvc1swXSkpLFxuXHRcdFx0TWF0aC5taW4obWF4WzFdLCBNYXRoLm1heChtaW5bMV0sIHBvc1sxXSkpXG5cdFx0XSwgbnVsbCwgaGFtbWVyRXZlbnQpLCBjb21wbGV0ZSk7XG5cdH1cblxuXHRfYW5pbWF0aW9uRW5kKCkge1xuXHRcdHRoaXMuX2FuaW1hdGVQYXJhbSA9IG51bGw7XG5cdFx0Y29uc3Qgb3JnUG9zID0gdGhpcy5nZXQoKTtcblx0XHRjb25zdCBuZXh0UG9zID0gQ29vcmRpbmF0ZS5nZXRDaXJjdWxhclBvcyhbXG5cdFx0XHRNYXRoLnJvdW5kKG9yZ1Bvc1swXSksXG5cdFx0XHRNYXRoLnJvdW5kKG9yZ1Bvc1sxXSlcblx0XHRdLCB0aGlzLm9wdGlvbnMubWluLCB0aGlzLm9wdGlvbnMubWF4LCB0aGlzLm9wdGlvbnMuY2lyY3VsYXIpO1xuXG5cdFx0dGhpcy5zZXRUbyguLi5uZXh0UG9zKTtcblx0XHR0aGlzLl9zZXRJbnRlcnJ1cHQoZmFsc2UpO1xuXHRcdC8qKlxuXHRcdCAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBhbmltYXRpb24gZW5kcy5cblx0XHQgKiBAa28g7JeQ64uI66mU7J207IWY7J20IOuBneuCrOydhCDrlYwg67Cc7IOd7ZWc64ukLlxuXHRcdCAqIEBuYW1lIGVnLk1vdmFibGVDb29yZCNhbmltYXRpb25FbmRcblx0XHQgKiBAZXZlbnRcblx0XHQgKi9cblx0XHR0aGlzLnRyaWdnZXIoXCJhbmltYXRpb25FbmRcIik7XG5cdH1cblxuXHRfYW5pbWF0ZShwYXJhbSwgY29tcGxldGUpIHtcblx0XHR0aGlzLl9hbmltYXRlUGFyYW0gPSBPYmplY3QuYXNzaWduKHt9LCBwYXJhbSk7XG5cdFx0dGhpcy5fYW5pbWF0ZVBhcmFtLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHRcdGlmIChwYXJhbS5kdXJhdGlvbikge1xuXHRcdFx0Y29uc3QgaW5mbyA9IHRoaXMuX2FuaW1hdGVQYXJhbTtcblx0XHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0XHQoZnVuY3Rpb24gbG9vcCgpIHtcblx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cblx0XHRcdFx0c2VsZi5fcmFmID0gbnVsbDtcblx0XHRcdFx0aWYgKHNlbGYuX2ZyYW1lKGluZm8pID49IDEpIHtcblx0XHRcdFx0XHQvLyBkZWZlcnJlZC5yZXNvbHZlKCk7XG5cdFx0XHRcdFx0Y29tcGxldGUoKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH0gLy8gYW5pbWF0aW9uRW5kXG5cdFx0XHRcdHNlbGYuX3JhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG5cdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cblx0XHRcdH0pKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3NldFBvc0FuZFRyaWdnZXJDaGFuZ2UocGFyYW0uZGVzdFBvcywgZmFsc2UpO1xuXHRcdFx0Y29tcGxldGUoKTtcblx0XHR9XG5cdH1cblxuXHRfYW5pbWF0ZVRvKGFic1BvcywgZHVyYXRpb24sIGhhbW1lckV2ZW50KSB7XG5cdFx0Y29uc3QgcGFyYW0gPSB0aGlzLl9wcmVwYXJlUGFyYW0oYWJzUG9zLCBkdXJhdGlvbiwgaGFtbWVyRXZlbnQpO1xuXHRcdGNvbnN0IHJldFRyaWdnZXIgPSB0aGlzLnRyaWdnZXIoXCJhbmltYXRpb25TdGFydFwiLCBwYXJhbSk7XG5cblx0XHQvLyBZb3UgY2FuJ3Qgc3RvcCB0aGUgJ2FuaW1hdGlvblN0YXJ0JyBldmVudCB3aGVuICdjaXJjdWxhcicgaXMgdHJ1ZS5cblx0XHRpZiAocGFyYW0uaXNDaXJjdWxhciAmJiAhcmV0VHJpZ2dlcikge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcIllvdSBjYW4ndCBzdG9wIHRoZSAnYW5pbWF0aW9uJyBldmVudCB3aGVuICdjaXJjdWxhcicgaXMgdHJ1ZS5cIlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAocmV0VHJpZ2dlcikge1xuXHRcdFx0Y29uc3QgcXVldWUgPSBbXTtcblx0XHRcdGNvbnN0IGRlcXVldWUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y29uc3QgdGFzayA9IHF1ZXVlLnNoaWZ0KCk7XG5cblx0XHRcdFx0dGFzayAmJiB0YXNrLmNhbGwodGhpcyk7XG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAocGFyYW0uZGVwYVBvc1swXSAhPT0gcGFyYW0uZGVzdFBvc1swXSB8fFxuXHRcdFx0XHRwYXJhbS5kZXBhUG9zWzFdICE9PSBwYXJhbS5kZXN0UG9zWzFdKSB7XG5cdFx0XHRcdHF1ZXVlLnB1c2goKCkgPT4gdGhpcy5fYW5pbWF0ZShwYXJhbSwgZGVxdWV1ZSkpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKENvb3JkaW5hdGUuaXNPdXRzaWRlKFxuXHRcdFx0XHRwYXJhbS5kZXN0UG9zLCB0aGlzLm9wdGlvbnMubWluLCB0aGlzLm9wdGlvbnMubWF4KSkge1xuXHRcdFx0XHRxdWV1ZS5wdXNoKCgpID0+IHRoaXMuX3Jlc3RvcmUoZGVxdWV1ZSwgaGFtbWVyRXZlbnQpKTtcblx0XHRcdH1cblx0XHRcdHF1ZXVlLnB1c2goKCkgPT4gdGhpcy5fYW5pbWF0aW9uRW5kKCkpO1xuXHRcdFx0ZGVxdWV1ZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8vIGFuaW1hdGlvbiBmcmFtZSAoMH4xKVxuXHRfZnJhbWUocGFyYW0pIHtcblx0XHRjb25zdCBjdXJUaW1lID0gbmV3IERhdGUoKSAtIHBhcmFtLnN0YXJ0VGltZTtcblx0XHRjb25zdCBlYXNpbmdQZXIgPSB0aGlzLl9lYXNpbmcoY3VyVGltZSAvIHBhcmFtLmR1cmF0aW9uKTtcblx0XHRsZXQgcG9zID0gW3BhcmFtLmRlcGFQb3NbMF0sIHBhcmFtLmRlcGFQb3NbMV1dO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpKyspIHtcblx0XHRcdChwb3NbaV0gIT09IHBhcmFtLmRlc3RQb3NbaV0pICYmXG5cdFx0XHQocG9zW2ldICs9IChwYXJhbS5kZXN0UG9zW2ldIC0gcG9zW2ldKSAqIGVhc2luZ1Blcik7XG5cdFx0fVxuXHRcdHBvcyA9IENvb3JkaW5hdGUuZ2V0Q2lyY3VsYXJQb3MoXG5cdFx0XHRwb3MsIHRoaXMub3B0aW9ucy5taW4sIHRoaXMub3B0aW9ucy5tYXgsIHRoaXMub3B0aW9ucy5jaXJjdWxhcik7XG5cdFx0dGhpcy5fc2V0UG9zQW5kVHJpZ2dlckNoYW5nZShwb3MsIGZhbHNlKTtcblx0XHRyZXR1cm4gZWFzaW5nUGVyO1xuXHR9XG5cblx0Ly8gdHJpZ2dlciAnY2hhbmdlJyBldmVudFxuXHRfc2V0UG9zQW5kVHJpZ2dlckNoYW5nZShwb3NpdGlvbiwgaG9sZGluZywgZSkge1xuXHRcdC8qKlxuXHRcdCAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBjb29yZGluYXRlIGNoYW5nZXMuXG5cdFx0ICogQGtvIOyijO2RnOqwgCDrs4Dqsr3rkJDsnYQg65WMIOuwnOyDne2VmOuKlCDsnbTrsqTtirhcblx0XHQgKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQjY2hhbmdlXG5cdFx0ICogQGV2ZW50XG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gcGFyYW0gVGhlIG9iamVjdCBvZiBkYXRhIHRvIGJlIHNlbnQgd2hlbiB0aGUgZXZlbnQgaXMgZmlyZWQgPGtvPuydtOuypO2KuOqwgCDrsJzsg53tlaAg65WMIOyghOuLrOuQmOuKlCDrjbDsnbTthLAg6rCd7LK0PC9rbz5cblx0XHQgKiBAcGFyYW0ge0FycmF5fSBwYXJhbS5wb3NpdGlvbiBkZXBhcnR1cmUgY29vcmRpbmF0ZSAgPGtvPuyijO2RnDwva28+XG5cdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtLnBvc2l0aW9uLjAgVGhlIFggY29vcmRpbmF0ZSA8a28+eCDsooztkZw8L2tvPlxuXHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBwYXJhbS5wb3MuMSBUaGUgWSBjb29yZGluYXRlIDxrbz55IOyijO2RnDwva28+XG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSBwYXJhbS5ob2xkaW5nIEluZGljYXRlcyB3aGV0aGVyIGEgdXNlciBob2xkcyBhbiBlbGVtZW50IG9uIHRoZSBzY3JlZW4gb2YgdGhlIGRldmljZS48a28+7IKs7Jqp7J6Q6rCAIOq4sOq4sOydmCDtmZTrqbTsnYQg64iE66W06rOgIOyeiOuKlOyngCDsl6zrtoA8L2tvPlxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbS5oYW1tZXJFdmVudCBUaGUgZXZlbnQgaW5mb3JtYXRpb24gb2YgSGFtbWVyLkpTLiBJdCByZXR1cm5zIG51bGwgaWYgdGhlIGV2ZW50IGlzIGZpcmVkIHRocm91Z2ggYSBjYWxsIHRvIHRoZSBzZXRUbygpIG9yIHNldEJ5KCkgbWV0aG9kLjxrbz5IYW1tZXIuSlPsnZgg7J2067Kk7Yq4IOygleuztC4gc2V0VG8oKSDrqZTshJzrk5zrgpggc2V0QnkoKSDrqZTshJzrk5zrpbwg7Zi47Lac7ZW0IOydtOuypO2KuOqwgCDrsJzsg53tlojsnYQg65WM64qUICdudWxsJ+ydhCDrsJjtmZjtlZzri6QuPC9rbz5cblx0XHQgKlxuXHRcdCAqL1xuXHRcdHRoaXMuX3BvcyA9IHBvc2l0aW9uLmNvbmNhdCgpO1xuXHRcdHRoaXMudHJpZ2dlcihcImNoYW5nZVwiLCB7XG5cdFx0XHRwb3M6IHBvc2l0aW9uLmNvbmNhdCgpLFxuXHRcdFx0aG9sZGluZyxcblx0XHRcdGhhbW1lckV2ZW50OiBlIHx8IG51bGxcblx0XHR9KTtcblx0fVxuXG5cdF9lYXNpbmcocCkge1xuXHRcdHJldHVybiBwID4gMSA/IDEgOiB0aGlzLm9wdGlvbnMuZWFzaW5nKHApO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmVzIGFuIGVsZW1lbnQgdG8gc3BlY2lmaWMgY29vcmRpbmF0ZXMuXG5cdCAqIEBrbyDsooztkZzrpbwg7J2064+Z7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNzZXRUb1xuXHQgKiBAcGFyYW0ge051bWJlcn0geCBUaGUgWCBjb29yZGluYXRlIHRvIG1vdmUgdG8gPGtvPuydtOuPme2VoCB47KKM7ZGcPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IHkgVGhlIFkgY29vcmRpbmF0ZSB0byBtb3ZlIHRvICA8a28+7J2064+Z7ZWgIHnsooztkZw8L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW2R1cmF0aW9uPTBdIER1cmF0aW9uIG9mIHRoZSBhbmltYXRpb24gKHVuaXQ6IG1zKSA8a28+7JWg64uI66mU7J207IWYIOynhO2WiSDsi5zqsIQo64uo7JyEOiBtcyk8L2tvPlxuXHQgKiBAcmV0dXJuIHtlZy5Nb3ZhYmxlQ29vcmR9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZiA8a28+7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqL1xuXHRzZXRUbyh4LCB5LCBkdXJhdGlvbiA9IDApIHtcblx0XHRsZXQgdG9YID0geDtcblx0XHRsZXQgdG9ZID0geTtcblx0XHRjb25zdCBtaW4gPSB0aGlzLm9wdGlvbnMubWluO1xuXHRcdGNvbnN0IG1heCA9IHRoaXMub3B0aW9ucy5tYXg7XG5cdFx0Y29uc3QgY2lyY3VsYXIgPSB0aGlzLm9wdGlvbnMuY2lyY3VsYXI7XG5cblx0XHR0aGlzLl9ncmFiKG1pbiwgbWF4LCBjaXJjdWxhcik7XG5cdFx0Y29uc3QgcG9zID0gdGhpcy5nZXQoKTtcblxuXHRcdGlmICh4ID09PSBwb3NbMF0gJiYgeSA9PT0gcG9zWzFdKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHR0aGlzLl9zZXRJbnRlcnJ1cHQodHJ1ZSk7XG5cdFx0aWYgKHggIT09IHBvc1swXSkge1xuXHRcdFx0aWYgKCFjaXJjdWxhclszXSkge1xuXHRcdFx0XHR0b1ggPSBNYXRoLm1heChtaW5bMF0sIHRvWCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIWNpcmN1bGFyWzFdKSB7XG5cdFx0XHRcdHRvWCA9IE1hdGgubWluKG1heFswXSwgdG9YKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHkgIT09IHBvc1sxXSkge1xuXHRcdFx0aWYgKCFjaXJjdWxhclswXSkge1xuXHRcdFx0XHR0b1kgPSBNYXRoLm1heChtaW5bMV0sIHRvWSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIWNpcmN1bGFyWzJdKSB7XG5cdFx0XHRcdHRvWSA9IE1hdGgubWluKG1heFsxXSwgdG9ZKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKGR1cmF0aW9uKSB7XG5cdFx0XHR0aGlzLl9hbmltYXRlVG8oW3RvWCwgdG9ZXSwgZHVyYXRpb24pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9wb3MgPSBDb29yZGluYXRlLmdldENpcmN1bGFyUG9zKFt0b1gsIHRvWV0sIG1pbiwgbWF4LCBjaXJjdWxhcik7XG5cdFx0XHR0aGlzLl9zZXRQb3NBbmRUcmlnZ2VyQ2hhbmdlKHRoaXMuX3BvcywgZmFsc2UpO1xuXHRcdFx0dGhpcy5fc2V0SW50ZXJydXB0KGZhbHNlKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBjdXJyZW50IGNvb3JkaW5hdGVzIHRvIHNwZWNpZmljIGNvb3JkaW5hdGVzLiBUaGUgY2hhbmdlIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIG1ldGhvZCBpcyBleGVjdXRlZC5cblx0ICogQGtvIO2YhOyerCDsooztkZzrpbwg6riw7KSA7Jy866GcIOyijO2RnOulvCDsnbTrj5ntlZzri6QuIOuplOyEnOuTnOqwgCDsi6TtlonrkJjrqbQgY2hhbmdlIOydtOuypO2KuOqwgCDrsJzsg53tlZzri6Rcblx0ICogQG1ldGhvZCBlZy5Nb3ZhYmxlQ29vcmQjc2V0Qnlcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHggVGhlIFggY29vcmRpbmF0ZSB0byBtb3ZlIHRvIDxrbz7snbTrj5ntlaAgeOyijO2RnDwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB5IFRoZSBZIGNvb3JkaW5hdGUgdG8gbW92ZSB0byA8a28+7J2064+Z7ZWgIHnsooztkZw8L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW2R1cmF0aW9uPTBdIER1cmF0aW9uIG9mIHRoZSBhbmltYXRpb24gKHVuaXQ6IG1zKSA8a28+7JWg64uI66mU7J207IWYIOynhO2WiSDsi5zqsIQo64uo7JyEOiBtcyk8L2tvPlxuXHQgKiBAcmV0dXJuIHtlZy5Nb3ZhYmxlQ29vcmR9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZiA8a28+7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqL1xuXHRzZXRCeSh4LCB5LCBkdXJhdGlvbiA9IDApIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRUbyhcblx0XHRcdHggIT0gbnVsbCA/IHRoaXMuX3Bvc1swXSArIHggOiB0aGlzLl9wb3NbMF0sXG5cdFx0XHR5ICE9IG51bGwgPyB0aGlzLl9wb3NbMV0gKyB5IDogdGhpcy5fcG9zWzFdLFxuXHRcdFx0ZHVyYXRpb25cblx0XHQpO1xuXHR9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FuaW1hdGlvbkhhbmRsZXIuanMiLCJpbXBvcnQgQ29vcmRpbmF0ZSBmcm9tIFwiLi9jb29yZGluYXRlXCI7XG5pbXBvcnQge0RJUkVDVElPTn0gZnJvbSBcIi4vY29uc3RzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHN1cGVyY2xhc3MgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLl9zdGF0dXMgPSB7XG5cdFx0XHRncmFiT3V0c2lkZTogZmFsc2UsXHRcdC8vIGNoZWNrIHdoZXRoZXIgdXNlcidzIGFjdGlvbiBzdGFydGVkIG9uIG91dHNpZGVcblx0XHRcdGN1cnJlbnRIYW1tZXI6IG51bGwsXHRcdC8vIGN1cnJlbnQgaGFtbWVyIGluc3RhbmNlXG5cdFx0XHRjdXJyZW50T3B0aW9uczoge30sXHRcdC8vIGN1cnJlbnQgYmluZCBvcHRpb25zXG5cdFx0XHRtb3ZlRGlzdGFuY2U6IG51bGwsXHRcdC8vIGEgcG9zaXRpb24gb2YgdGhlIGZpcnN0IHVzZXIncyBhY3Rpb25cblx0XHRcdHByZXZlbnRlZDogZmFsc2VcdFx0Ly8gIGNoZWNrIHdoZXRoZXIgdGhlIGFuaW1hdGlvbiBldmVudCB3YXMgcHJldmVudGVkXG5cdFx0fTtcblx0fVxuXG5cdF9zZXRDdXJyZW50VGFyZ2V0KGhhbW1lciwgb3B0aW9ucykge1xuXHRcdHRoaXMuX3N0YXR1cy5jdXJyZW50T3B0aW9ucyA9IG9wdGlvbnM7XG5cdFx0dGhpcy5fc3RhdHVzLmN1cnJlbnRIYW5tbWVyID0gaGFtbWVyO1xuXHR9XG5cblx0Ly8gcGFuc3RhcnQgZXZlbnQgaGFuZGxlclxuXHRfc3RhcnQoZSkge1xuXHRcdGlmICghdGhpcy5fc3RhdHVzLmN1cnJlbnRPcHRpb25zLmludGVycnVwdGFibGUgJiYgdGhpcy5fc3RhdHVzLnByZXZlbnRlZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBwb3MgPSB0aGlzLmdldCgpO1xuXHRcdGNvbnN0IG1pbiA9IHRoaXMub3B0aW9ucy5taW47XG5cdFx0Y29uc3QgbWF4ID0gdGhpcy5vcHRpb25zLm1heDtcblxuXHRcdHRoaXMuX3NldEludGVycnVwdCh0cnVlKTtcblx0XHR0aGlzLl9ncmFiKG1pbiwgbWF4LCB0aGlzLm9wdGlvbnMuY2lyY3VsYXIpO1xuXHRcdC8qKlxuXHRcdCAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBhIHVzZXIgaG9sZHMgYW4gZWxlbWVudCBvbiB0aGUgc2NyZWVuIG9mIHRoZSBkZXZpY2UuXG5cdFx0ICogQGtvIOyCrOyaqeyekOqwgCDquLDquLDsnZgg7ZmU66m07JeQIOyGkOydhCDrjIDqs6Ag7J6I7J2EIOuVjCDrsJzsg53tlZjripQg7J2067Kk7Yq4XG5cdFx0ICogQG5hbWUgZWcuTW92YWJsZUNvb3JkI2hvbGRcblx0XHQgKiBAZXZlbnRcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gcGFyYW0gVGhlIG9iamVjdCBvZiBkYXRhIHRvIGJlIHNlbnQgd2hlbiB0aGUgZXZlbnQgaXMgZmlyZWQ8a28+7J2067Kk7Yq46rCAIOuwnOyDne2VoCDrlYwg7KCE64us65CY64qUIOuNsOydtO2EsCDqsJ3ssrQ8L2tvPlxuXHRcdCAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtLnBvcyBjb29yZGluYXRlIDxrbz7sooztkZwg7KCV67O0PC9rbz5cblx0XHQgKiBAcGFyYW0ge051bWJlcn0gcGFyYW0ucG9zLjAgVGhlIFggY29vcmRpbmF0ZTxrbz54IOyijO2RnDwva28+XG5cdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtLnBvcy4xIFRoZSBZIGNvb3JkaW5hdGU8a28+eSDsooztkZw8L2tvPlxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbS5oYW1tZXJFdmVudCBUaGUgZXZlbnQgaW5mb3JtYXRpb24gb2YgSGFtbWVyLkpTLiBJdCByZXR1cm5zIG51bGwgaWYgdGhlIGV2ZW50IGlzIGZpcmVkIHRocm91Z2ggYSBjYWxsIHRvIHRoZSBzZXRUbygpIG9yIHNldEJ5KCkgbWV0aG9kLjxrbz5IYW1tZXIuSlPsnZgg7J2067Kk7Yq4IOygleuztC4gc2V0VG8oKSDrqZTshJzrk5zrgpggc2V0QnkoKSDrqZTshJzrk5zrpbwg7Zi47Lac7ZW0IOydtOuypO2KuOqwgCDrsJzsg53tlojsnYQg65WM64qUICdudWxsJ+ydhCDrsJjtmZjtlZzri6QuPC9rbz5cblx0XHQgKlxuXHRcdCAqL1xuXHRcdHRoaXMudHJpZ2dlcihcImhvbGRcIiwge1xuXHRcdFx0cG9zOiBwb3MuY29uY2F0KCksXG5cdFx0XHRoYW1tZXJFdmVudDogZVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5fc3RhdHVzLm1vdmVEaXN0YW5jZSA9IHBvcy5jb25jYXQoKTtcblx0XHR0aGlzLl9zdGF0dXMuZ3JhYk91dHNpZGUgPSBDb29yZGluYXRlLmlzT3V0c2lkZShwb3MsIG1pbiwgbWF4KTtcblx0fVxuXG5cdC8vIHBhbm1vdmUgZXZlbnQgaGFuZGxlclxuXHRfbW92ZShlKSB7XG5cdFx0aWYgKCF0aGlzLl9pc0ludGVycnVwdGluZygpIHx8ICF0aGlzLl9zdGF0dXMubW92ZURpc3RhbmNlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGxldCBwb3MgPSB0aGlzLmdldCh0cnVlKTtcblx0XHRjb25zdCBtaW4gPSB0aGlzLm9wdGlvbnMubWluO1xuXHRcdGNvbnN0IG1heCA9IHRoaXMub3B0aW9ucy5tYXg7XG5cdFx0Y29uc3QgYm91bmNlID0gdGhpcy5vcHRpb25zLmJvdW5jZTtcblx0XHRjb25zdCBtYXJnaW4gPSB0aGlzLm9wdGlvbnMubWFyZ2luO1xuXHRcdGNvbnN0IGN1cnJlbnRPcHRpb25zID0gdGhpcy5fc3RhdHVzLmN1cnJlbnRPcHRpb25zO1xuXHRcdGNvbnN0IGRpcmVjdGlvbiA9IGN1cnJlbnRPcHRpb25zLmRpcmVjdGlvbjtcblx0XHRjb25zdCBzY2FsZSA9IGN1cnJlbnRPcHRpb25zLnNjYWxlO1xuXHRcdGNvbnN0IHVzZXJEaXJlY3Rpb24gPSBDb29yZGluYXRlLmdldERpcmVjdGlvbkJ5QW5nbGUoXG5cdFx0XHRlLmFuZ2xlLCBjdXJyZW50T3B0aW9ucy50aHJlc2hvbGRBbmdsZSk7XG5cdFx0Y29uc3Qgb3V0ID0gW1xuXHRcdFx0bWFyZ2luWzBdICsgYm91bmNlWzBdLFxuXHRcdFx0bWFyZ2luWzFdICsgYm91bmNlWzFdLFxuXHRcdFx0bWFyZ2luWzJdICsgYm91bmNlWzJdLFxuXHRcdFx0bWFyZ2luWzNdICsgYm91bmNlWzNdXG5cdFx0XTtcblx0XHRsZXQgcHJldmVudCA9IGZhbHNlO1xuXG5cdFx0Ly8gbm90IHN1cHBvcnQgb2Zmc2V0IHByb3BlcnRpZXMgaW4gSGFtbWVyanMgLSBzdGFydFxuXHRcdGNvbnN0IHByZXZJbnB1dCA9IHRoaXMuX3N0YXR1cy5jdXJyZW50SGFubW1lci5zZXNzaW9uLnByZXZJbnB1dDtcblxuXHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5cdFx0aWYgKHByZXZJbnB1dCkge1xuXHRcdFx0ZS5vZmZzZXRYID0gZS5kZWx0YVggLSBwcmV2SW5wdXQuZGVsdGFYO1xuXHRcdFx0ZS5vZmZzZXRZID0gZS5kZWx0YVkgLSBwcmV2SW5wdXQuZGVsdGFZO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlLm9mZnNldFggPSBlLm9mZnNldFkgPSAwO1xuXHRcdH1cblxuXHRcdC8vIG5vdCBzdXBwb3J0IG9mZnNldCBwcm9wZXJ0aWVzIGluIEhhbW1lcmpzIC0gZW5kXG5cdFx0aWYgKENvb3JkaW5hdGUuaXNIb3Jpem9udGFsKGRpcmVjdGlvbiwgdXNlckRpcmVjdGlvbikpIHtcblx0XHRcdHRoaXMuX3N0YXR1cy5tb3ZlRGlzdGFuY2VbMF0gKz0gKGUub2Zmc2V0WCAqIHNjYWxlWzBdKTtcblx0XHRcdHByZXZlbnQgPSB0cnVlO1xuXHRcdH1cblx0XHRpZiAoQ29vcmRpbmF0ZS5pc1ZlcnRpY2FsKGRpcmVjdGlvbiwgdXNlckRpcmVjdGlvbikpIHtcblx0XHRcdHRoaXMuX3N0YXR1cy5tb3ZlRGlzdGFuY2VbMV0gKz0gKGUub2Zmc2V0WSAqIHNjYWxlWzFdKTtcblx0XHRcdHByZXZlbnQgPSB0cnVlO1xuXHRcdH1cblx0XHRpZiAocHJldmVudCkge1xuXHRcdFx0ZS5zcmNFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZS5zcmNFdmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cdFx0ZS5wcmV2ZW50U3lzdGVtRXZlbnQgPSBwcmV2ZW50O1xuXHRcdC8qIGVzbGludC1lbmFibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cblxuXHRcdHBvc1swXSA9IHRoaXMuX3N0YXR1cy5tb3ZlRGlzdGFuY2VbMF07XG5cdFx0cG9zWzFdID0gdGhpcy5fc3RhdHVzLm1vdmVEaXN0YW5jZVsxXTtcblx0XHRwb3MgPSBDb29yZGluYXRlLmdldENpcmN1bGFyUG9zKHBvcywgbWluLCBtYXgsIHRoaXMub3B0aW9ucy5jaXJjdWxhcik7XG5cblx0XHQvLyBmcm9tIG91dHNpZGUgdG8gaW5zaWRlXG5cdFx0aWYgKHRoaXMuX3N0YXR1cy5ncmFiT3V0c2lkZSAmJiAhQ29vcmRpbmF0ZS5pc091dHNpZGUocG9zLCBtaW4sIG1heCkpIHtcblx0XHRcdHRoaXMuX3N0YXR1cy5ncmFiT3V0c2lkZSA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIHdoZW4gbW92ZSBwb2ludGVyIGlzIGhlbGQgaW4gb3V0c2lkZVxuXHRcdGxldCB0djtcblx0XHRsZXQgdG47XG5cdFx0bGV0IHR4O1xuXG5cdFx0aWYgKHRoaXMuX3N0YXR1cy5ncmFiT3V0c2lkZSkge1xuXHRcdFx0dG4gPSBtaW5bMF0gLSBvdXRbM107XG5cdFx0XHR0eCA9IG1heFswXSArIG91dFsxXTtcblx0XHRcdHR2ID0gcG9zWzBdO1xuXHRcdFx0cG9zWzBdID0gdHYgPiB0eCA/IHR4IDogKHR2IDwgdG4gPyB0biA6IHR2KTtcblx0XHRcdHRuID0gbWluWzFdIC0gb3V0WzBdO1xuXHRcdFx0dHggPSBtYXhbMV0gKyBvdXRbMl07XG5cdFx0XHR0diA9IHBvc1sxXTtcblx0XHRcdHBvc1sxXSA9IHR2ID4gdHggPyB0eCA6ICh0diA8IHRuID8gdG4gOiB0dik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHdoZW4gc3RhcnQgcG9pbnRlciBpcyBoZWxkIGluIGluc2lkZVxuXHRcdFx0Ly8gZ2V0IGEgaW5pdGlhbGl6YXRpb24gc2xvcGUgdmFsdWUgdG8gcHJldmVudCBzbW9vdGggYW5pbWF0aW9uLlxuXHRcdFx0Y29uc3QgaW5pdFNsb3BlID0gdGhpcy5fZWFzaW5nKDAuMDAwMDEpIC8gMC4wMDAwMTtcblxuXHRcdFx0aWYgKHBvc1sxXSA8IG1pblsxXSkgeyAvLyB1cFxuXHRcdFx0XHR0diA9IChtaW5bMV0gLSBwb3NbMV0pIC8gKG91dFswXSAqIGluaXRTbG9wZSk7XG5cdFx0XHRcdHBvc1sxXSA9IG1pblsxXSAtIHRoaXMuX2Vhc2luZyh0dikgKiBvdXRbMF07XG5cdFx0XHR9IGVsc2UgaWYgKHBvc1sxXSA+IG1heFsxXSkgeyAvLyBkb3duXG5cdFx0XHRcdHR2ID0gKHBvc1sxXSAtIG1heFsxXSkgLyAob3V0WzJdICogaW5pdFNsb3BlKTtcblx0XHRcdFx0cG9zWzFdID0gbWF4WzFdICsgdGhpcy5fZWFzaW5nKHR2KSAqIG91dFsyXTtcblx0XHRcdH1cblx0XHRcdGlmIChwb3NbMF0gPCBtaW5bMF0pIHsgLy8gbGVmdFxuXHRcdFx0XHR0diA9IChtaW5bMF0gLSBwb3NbMF0pIC8gKG91dFszXSAqIGluaXRTbG9wZSk7XG5cdFx0XHRcdHBvc1swXSA9IG1pblswXSAtIHRoaXMuX2Vhc2luZyh0dikgKiBvdXRbM107XG5cdFx0XHR9IGVsc2UgaWYgKHBvc1swXSA+IG1heFswXSkgeyAvLyByaWdodFxuXHRcdFx0XHR0diA9IChwb3NbMF0gLSBtYXhbMF0pIC8gKG91dFsxXSAqIGluaXRTbG9wZSk7XG5cdFx0XHRcdHBvc1swXSA9IG1heFswXSArIHRoaXMuX2Vhc2luZyh0dikgKiBvdXRbMV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3NldFBvc0FuZFRyaWdnZXJDaGFuZ2UocG9zLCB0cnVlLCBlKTtcblx0fVxuXG5cdC8vIHBhbmVuZCBldmVudCBoYW5kbGVyXG5cdF9lbmQoZSkge1xuXHRcdGNvbnN0IHBvcyA9IHRoaXMuZ2V0KCk7XG5cblx0XHRpZiAoIXRoaXMuX2lzSW50ZXJydXB0aW5nKCkgfHwgIXRoaXMuX3N0YXR1cy5tb3ZlRGlzdGFuY2UpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBBYm9ydCB0aGUgYW5pbWF0aW5nIHBvc3QgcHJvY2VzcyB3aGVuIFwidGFwXCIgb2NjdXJzXG5cdFx0aWYgKGUuZGlzdGFuY2UgPT09IDAgLyogZS50eXBlID09PSBcInRhcFwiICovKSB7XG5cdFx0XHR0aGlzLl9zZXRJbnRlcnJ1cHQoZmFsc2UpO1xuXHRcdFx0dGhpcy50cmlnZ2VyKFwicmVsZWFzZVwiLCB7XG5cdFx0XHRcdGRlcGFQb3M6IHBvcy5jb25jYXQoKSxcblx0XHRcdFx0ZGVzdFBvczogcG9zLmNvbmNhdCgpLFxuXHRcdFx0XHRoYW1tZXJFdmVudDogZSB8fCBudWxsXG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgZGlyZWN0aW9uID0gdGhpcy5fc3RhdHVzLmN1cnJlbnRPcHRpb25zLmRpcmVjdGlvbjtcblx0XHRcdGNvbnN0IHNjYWxlID0gdGhpcy5fc3RhdHVzLmN1cnJlbnRPcHRpb25zLnNjYWxlO1xuXHRcdFx0bGV0IHZYID0gTWF0aC5hYnMoZS52ZWxvY2l0eVgpO1xuXHRcdFx0bGV0IHZZID0gTWF0aC5hYnMoZS52ZWxvY2l0eVkpO1xuXG5cdFx0XHQhKGRpcmVjdGlvbiAmIERJUkVDVElPTi5ESVJFQ1RJT05fSE9SSVpPTlRBTCkgJiYgKHZYID0gMCk7XG5cdFx0XHQhKGRpcmVjdGlvbiAmIERJUkVDVElPTi5ESVJFQ1RJT05fVkVSVElDQUwpICYmICh2WSA9IDApO1xuXG5cdFx0XHRjb25zdCBvZmZzZXQgPSBDb29yZGluYXRlLmdldE5leHRPZmZzZXRQb3MoW1xuXHRcdFx0XHR2WCAqIChlLmRlbHRhWCA8IDAgPyAtMSA6IDEpICogc2NhbGVbMF0sXG5cdFx0XHRcdHZZICogKGUuZGVsdGFZIDwgMCA/IC0xIDogMSkgKiBzY2FsZVsxXVxuXHRcdFx0XSwgdGhpcy5vcHRpb25zLmRlY2VsZXJhdGlvbik7XG5cdFx0XHRsZXQgZGVzdFBvcyA9IFtwb3NbMF0gKyBvZmZzZXRbMF0sIHBvc1sxXSArIG9mZnNldFsxXV07XG5cblx0XHRcdGRlc3RQb3MgPSBDb29yZGluYXRlLmdldFBvaW50T2ZJbnRlcnNlY3Rpb24ocG9zLCBkZXN0UG9zLFxuXHRcdFx0XHR0aGlzLm9wdGlvbnMubWluLCB0aGlzLm9wdGlvbnMubWF4LFxuXHRcdFx0XHR0aGlzLm9wdGlvbnMuY2lyY3VsYXIsIHRoaXMub3B0aW9ucy5ib3VuY2UpO1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gYSB1c2VyIHJlbGVhc2UgYW4gZWxlbWVudCBvbiB0aGUgc2NyZWVuIG9mIHRoZSBkZXZpY2UuXG5cdFx0XHQgKiBAa28g7IKs7Jqp7J6Q6rCAIOq4sOq4sOydmCDtmZTrqbTsl5DshJwg7IaQ7J2EIOuXkOydhCDrlYwg67Cc7IOd7ZWY64qUIOydtOuypO2KuFxuXHRcdFx0ICogQG5hbWUgZWcuTW92YWJsZUNvb3JkI3JlbGVhc2Vcblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbSBUaGUgb2JqZWN0IG9mIGRhdGEgdG8gYmUgc2VudCB3aGVuIHRoZSBldmVudCBpcyBmaXJlZDxrbz7snbTrsqTtirjqsIAg67Cc7IOd7ZWgIOuVjCDsoITri6zrkJjripQg642w7J207YSwIOqwneyytDwva28+XG5cdFx0XHQgKiBAcGFyYW0ge0FycmF5fSBwYXJhbS5kZXBhUG9zIFRoZSBjb29yZGluYXRlcyB3aGVuIHJlbGVhc2luZyBhbiBlbGVtZW50PGtvPuyGkOydhCDrl5DsnYQg65WM7J2YIOyijO2RnO2YhOyerCA8L2tvPlxuXHRcdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtLmRlcGFQb3MuMCBUaGUgWCBjb29yZGluYXRlIDxrbz4geCDsooztkZw8L2tvPlxuXHRcdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtLmRlcGFQb3MuMSBUaGUgWSBjb29yZGluYXRlIDxrbz4geSDsooztkZw8L2tvPlxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gcGFyYW0uZGVzdFBvcyBUaGUgY29vcmRpbmF0ZXMgdG8gbW92ZSB0byBhZnRlciByZWxlYXNpbmcgYW4gZWxlbWVudDxrbz7shpDsnYQg65eAIOuSpOyXkCDsnbTrj5ntlaAg7KKM7ZGcPC9rbz5cblx0XHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBwYXJhbS5kZXN0UG9zLjAgVGhlIFggY29vcmRpbmF0ZSA8a28+eCDsooztkZw8L2tvPlxuXHRcdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtLmRlc3RQb3MuMSBUaGUgWSBjb29yZGluYXRlIDxrbz55IOyijO2RnDwva28+XG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gcGFyYW0uaGFtbWVyRXZlbnQgVGhlIGV2ZW50IGluZm9ybWF0aW9uIG9mIEhhbW1lci5KUy4gSXQgcmV0dXJucyBudWxsIGlmIHRoZSBldmVudCBpcyBmaXJlZCB0aHJvdWdoIGEgY2FsbCB0byB0aGUgc2V0VG8oKSBvciBzZXRCeSgpIG1ldGhvZC48a28+SGFtbWVyLkpT7J2YIOydtOuypO2KuCDsoJXrs7QuIHNldFRvKCkg66mU7ISc65Oc64KYIHNldEJ5KCkg66mU7ISc65Oc66W8IO2YuOy2nO2VtCDsnbTrsqTtirjqsIAg67Cc7IOd7ZaI7J2EIOuVjOuKlCAnbnVsbCfsnYQg67CY7ZmY7ZWc64ukPC9rbz5cblx0XHRcdCAqXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcihcInJlbGVhc2VcIiwge1xuXHRcdFx0XHRkZXBhUG9zOiBwb3MuY29uY2F0KCksXG5cdFx0XHRcdGRlc3RQb3MsXG5cdFx0XHRcdGhhbW1lckV2ZW50OiBlIHx8IG51bGxcblx0XHRcdH0pO1xuXHRcdFx0aWYgKHBvc1swXSAhPT0gZGVzdFBvc1swXSB8fCBwb3NbMV0gIT09IGRlc3RQb3NbMV0pIHtcblx0XHRcdFx0dGhpcy5fYW5pbWF0ZVRvKGRlc3RQb3MsIG51bGwsIGUgfHwgbnVsbCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9zZXRJbnRlcnJ1cHQoZmFsc2UpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9zdGF0dXMubW92ZURpc3RhbmNlID0gbnVsbDtcblx0fVxuXG5cdF9pc0ludGVycnVwdGluZygpIHtcblx0XHQvLyB3aGVuIGludGVycnVwdGFibGUgaXMgJ3RydWUnLCByZXR1cm4gdmFsdWUgaXMgYWx3YXlzICd0cnVlJy5cblx0XHRyZXR1cm4gdGhpcy5fc3RhdHVzLmN1cnJlbnRPcHRpb25zLmludGVycnVwdGFibGUgfHwgdGhpcy5fc3RhdHVzLnByZXZlbnRlZDtcblx0fVxuXG5cdF9zZXRJbnRlcnJ1cHQocHJldmVudGVkKSB7XG5cdFx0IXRoaXMuX3N0YXR1cy5jdXJyZW50T3B0aW9ucy5pbnRlcnJ1cHRhYmxlICYmXG5cdFx0KHRoaXMuX3N0YXR1cy5wcmV2ZW50ZWQgPSBwcmV2ZW50ZWQpO1xuXHR9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V2ZW50SGFuZGxlci5qcyIsImltcG9ydCBIYW1tZXIgZnJvbSBcImhhbW1lcmpzXCI7XG5pbXBvcnQge3V0aWxzfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHtESVJFQ1RJT04sIFVOSVFVRUtFWSwgU1VQUE9SVF9UT1VDSH0gZnJvbSBcIi4vY29uc3RzXCI7XG5cbmlmICh0eXBlb2YgSGFtbWVyID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdHRocm93IG5ldyBFcnJvcihgVGhlIEhhbW1lcmpzIG11c3QgYmUgbG9hZGVkIGJlZm9yZSBlZy5Nb3ZhYmxlQ29vcmQuXFxuaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby9gKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFtbWVyTWFuYWdlciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX2hhbW1lcnMgPSB7fTtcblx0fVxuXG5cdF9jcmVhdGVIYW1tZXIoZWwsIGJpbmRPcHRpb25zLCBpbnB1dENsYXNzLCBoYW5kbGVyKSB7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIGNyZWF0ZSBIYW1tZXJcblx0XHRcdHJldHVybiB0aGlzLl9hdHRhY2hIYW1tZXJFdmVudHMobmV3IEhhbW1lci5NYW5hZ2VyKGVsLCB7XG5cdFx0XHRcdHJlY29nbml6ZXJzOiBbXG5cdFx0XHRcdFx0W1xuXHRcdFx0XHRcdFx0SGFtbWVyLlBhbiwge1xuXHRcdFx0XHRcdFx0XHRkaXJlY3Rpb246IGJpbmRPcHRpb25zLmRpcmVjdGlvbixcblx0XHRcdFx0XHRcdFx0dGhyZXNob2xkOiAwXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHRdLFxuXG5cdFx0XHRcdC8vIGNzcyBwcm9wZXJ0aWVzIHdlcmUgcmVtb3ZlZCBkdWUgdG8gdXNhYmxpbGl0eSBpc3N1ZVxuXHRcdFx0XHQvLyBodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL2pzZG9jL0hhbW1lci5kZWZhdWx0cy5jc3NQcm9wcy5odG1sXG5cdFx0XHRcdGNzc1Byb3BzOiB7XG5cdFx0XHRcdFx0dXNlclNlbGVjdDogXCJub25lXCIsXG5cdFx0XHRcdFx0dG91Y2hTZWxlY3Q6IFwibm9uZVwiLFxuXHRcdFx0XHRcdHRvdWNoQ2FsbG91dDogXCJub25lXCIsXG5cdFx0XHRcdFx0dXNlckRyYWc6IFwibm9uZVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGlucHV0Q2xhc3Ncblx0XHRcdH0pLCBiaW5kT3B0aW9ucywgaGFuZGxlcik7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0YWRkKGVsZW1lbnQsIG9wdGlvbnMsIGhhbmRsZXIpIHtcblx0XHRjb25zdCBlbCA9IHV0aWxzLmdldEVsZW1lbnQoZWxlbWVudCk7XG5cdFx0bGV0IGtleVZhbHVlID0gZWwuZ2V0QXR0cmlidXRlKFVOSVFVRUtFWSk7XG5cdFx0Y29uc3QgYmluZE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRcdGRpcmVjdGlvbjogRElSRUNUSU9OLkRJUkVDVElPTl9BTEwsXG5cdFx0XHRzY2FsZTogWzEsIDFdLFxuXHRcdFx0dGhyZXNob2xkQW5nbGU6IDQ1LFxuXHRcdFx0aW50ZXJydXB0YWJsZTogdHJ1ZSxcblx0XHRcdGlucHV0VHlwZTogW1widG91Y2hcIiwgXCJtb3VzZVwiXVxuXHRcdH0sIG9wdGlvbnMpO1xuXHRcdGNvbnN0IGlucHV0Q2xhc3MgPSB0aGlzLmNvbnZlcnRJbnB1dFR5cGUoYmluZE9wdGlvbnMuaW5wdXRUeXBlKTtcblxuXHRcdGlmICghaW5wdXRDbGFzcykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChrZXlWYWx1ZSkge1xuXHRcdFx0dGhpcy5faGFtbWVyc1trZXlWYWx1ZV0uaGFtbWVyLmRlc3Ryb3koKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0a2V5VmFsdWUgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG5cdFx0fVxuXHRcdHRoaXMuX2hhbW1lcnNba2V5VmFsdWVdID0ge1xuXHRcdFx0aGFtbWVyOiB0aGlzLl9jcmVhdGVIYW1tZXIoXG5cdFx0XHRcdGVsLFxuXHRcdFx0XHRiaW5kT3B0aW9ucyxcblx0XHRcdFx0aW5wdXRDbGFzcyxcblx0XHRcdFx0aGFuZGxlclxuXHRcdFx0KSxcblx0XHRcdGVsLFxuXHRcdFx0b3B0aW9uczogYmluZE9wdGlvbnNcblx0XHR9O1xuXHRcdGVsLnNldEF0dHJpYnV0ZShVTklRVUVLRVksIGtleVZhbHVlKTtcblx0fVxuXG5cdHJlbW92ZShlbGVtZW50KSB7XG5cdFx0Y29uc3QgZWwgPSB1dGlscy5nZXRFbGVtZW50KGVsZW1lbnQpO1xuXHRcdGNvbnN0IGtleSA9IGVsLmdldEF0dHJpYnV0ZShVTklRVUVLRVkpO1xuXG5cdFx0aWYgKGtleSkge1xuXHRcdFx0dGhpcy5faGFtbWVyc1trZXldLmhhbW1lci5kZXN0cm95KCk7XG5cdFx0XHRkZWxldGUgdGhpcy5faGFtbWVyc1trZXldO1xuXHRcdFx0ZWwucmVtb3ZlQXR0cmlidXRlKFVOSVFVRUtFWSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0SGFtbWVyKGVsZW1lbnQpIHtcblx0XHRjb25zdCBkYXRhID0gdGhpcy5nZXQoZWxlbWVudCk7XG5cblx0XHRyZXR1cm4gZGF0YSA/IGRhdGEuaGFtbWVyIDogbnVsbDtcblx0fVxuXG5cdGdldChlbGVtZW50KSB7XG5cdFx0Y29uc3QgZWwgPSB1dGlscy5nZXRFbGVtZW50KGVsZW1lbnQpO1xuXHRcdGNvbnN0IGtleSA9IGVsID8gZWwuZ2V0QXR0cmlidXRlKFVOSVFVRUtFWSkgOiBudWxsO1xuXG5cdFx0aWYgKGtleSAmJiB0aGlzLl9oYW1tZXJzW2tleV0pIHtcblx0XHRcdHJldHVybiB0aGlzLl9oYW1tZXJzW2tleV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdF9hdHRhY2hIYW1tZXJFdmVudHMoaGFtbWVyLCBvcHRpb25zLCBoYW5kbGVyKSB7XG5cdFx0Y29uc3QgZW5hYmxlID0gaGFtbWVyLmdldChcInBhblwiKS5vcHRpb25zLmVuYWJsZTtcblxuXHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5cdFx0cmV0dXJuIGhhbW1lclxuXHRcdFx0Lm9uKFwiaGFtbWVyLmlucHV0XCIsIGUgPT4ge1xuXHRcdFx0XHRpZiAoZS5pc0ZpcnN0KSB7XG5cdFx0XHRcdFx0Ly8gYXBwbHkgb3B0aW9ucyBlYWNoXG5cdFx0XHRcdFx0aGFuZGxlci5fc2V0Q3VycmVudFRhcmdldChoYW1tZXIsIG9wdGlvbnMpO1xuXHRcdFx0XHRcdGVuYWJsZSAmJiBoYW5kbGVyLl9zdGFydChlKTtcblx0XHRcdFx0fSBlbHNlIGlmIChlLmlzRmluYWwpIHtcblx0XHRcdFx0XHQvLyBzdWJzdGl0dXRlIC5vbihcInBhbmVuZCB0YXBcIiwgdGhpcy5fcGFuZW5kKTsgQmVjYXVzZSBpdCh0YXAsIHBhbmVuZCkgY2Fubm90IGNhdGNoIHZlcnRpY2FsKGhvcml6b250YWwpIG1vdmVtZW50IG9uIEhPUklaT05UQUwoVkVSVElDQUwpIG1vZGUuXG5cdFx0XHRcdFx0ZW5hYmxlICYmIGhhbmRsZXIuX2VuZChlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSkub24oXCJwYW5zdGFydCBwYW5tb3ZlXCIsIGUgPT4gaGFuZGxlci5fbW92ZShlKSk7XG5cdFx0LyogZXNsaW50LWVuYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuXHR9XG5cblx0X2RldGFjaEhhbW1lckV2ZW50cyhoYW1tZXIpIHtcblx0XHRoYW1tZXIub2ZmKFwiaGFtbWVyLmlucHV0IHBhbnN0YXJ0IHBhbm1vdmUgcGFuZW5kXCIpO1xuXHR9XG5cblx0Y29udmVydElucHV0VHlwZShpbnB1dFR5cGUgPSBbXSkge1xuXHRcdGxldCBoYXNUb3VjaCA9IGZhbHNlO1xuXHRcdGxldCBoYXNNb3VzZSA9IGZhbHNlO1xuXHRcdGNvbnN0IGlucHV0cyA9IGlucHV0VHlwZSB8fCBbXTtcblxuXHRcdGlucHV0cy5mb3JFYWNoKHYgPT4ge1xuXHRcdFx0c3dpdGNoICh2KSB7XG5cdFx0XHRcdGNhc2UgXCJtb3VzZVwiIDogaGFzTW91c2UgPSB0cnVlOyBicmVhaztcblx0XHRcdFx0Y2FzZSBcInRvdWNoXCIgOiBoYXNUb3VjaCA9IFNVUFBPUlRfVE9VQ0g7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gaGFzVG91Y2ggJiYgSGFtbWVyLlRvdWNoSW5wdXQgfHwgaGFzTW91c2UgJiYgSGFtbWVyLk1vdXNlSW5wdXQgfHwgbnVsbDtcblx0fVxuXG5cdGlucHV0Q29udHJvbChpc0VuYWJsZSwgZWxlbWVudCkge1xuXHRcdGNvbnN0IG9wdGlvbiA9IHtcblx0XHRcdGVuYWJsZTogaXNFbmFibGVcblx0XHR9O1xuXG5cdFx0aWYgKGVsZW1lbnQpIHtcblx0XHRcdGNvbnN0IGhhbW1lciA9IHRoaXMuZ2V0SGFtbWVyKGVsZW1lbnQpO1xuXG5cdFx0XHRoYW1tZXIgJiYgaGFtbWVyLmdldChcInBhblwiKS5zZXQob3B0aW9uKTtcblx0XHR9IGVsc2UgeyAvLyBmb3IgbXVsdGlcblx0XHRcdGZvciAoY29uc3QgcCBpbiB0aGlzLl9oYW1tZXJzKSB7XG5cdFx0XHRcdHRoaXMuX2hhbW1lcnNbcF0uaGFtbWVyLmdldChcInBhblwiKS5zZXQob3B0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRkZXN0cm95KCkge1xuXHRcdGZvciAoY29uc3QgcCBpbiB0aGlzLl9oYW1tZXJzKSB7XG5cdFx0XHR0aGlzLl9oYW1tZXJzW3BdLmhhbW1lci5kZXN0cm95KCk7XG5cdFx0XHR0aGlzLl9oYW1tZXJzW3BdLmVsLnJlbW92ZUF0dHJpYnV0ZShVTklRVUVLRVkpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuX2hhbW1lcnNbcF07XG5cdFx0fVxuXHRcdHRoaXMuX2hhbW1lcnMgPSB7fTtcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2hhbW1lck1hbmFnZXIuanMiLCIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJDb21wb25lbnRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZWdcIl0gPSByb290W1wiZWdcIl0gfHwge30sIHJvb3RbXCJlZ1wiXVtcIkNvbXBvbmVudFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGk6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bDogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi9cbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4vKioqKioqLyBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbi8qKioqKiovIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbi8qKioqKiovIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbi8qKioqKiovIFx0XHRcdH0pO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuLyoqKioqKi8gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuLyoqKioqKi8gXHRcdHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxNSBOQVZFUiBDb3JwLlxuICogZWdqcyBwcm9qZWN0cyBhcmUgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cblxuLyoqXG4gKiBBIGNsYXNzIHVzZWQgdG8gbWFuYWdlIGV2ZW50cyBhbmQgb3B0aW9ucyBpbiBhIGNvbXBvbmVudFxuICogQGNsYXNzXG4gKiBAZ3JvdXAgZWdqc1xuICogQG5hbWUgZWcuQ29tcG9uZW50XG4gKiBAa28g7Lu07Y+s64SM7Yq47J2YIOydtOuypO2KuOyZgCDsmLXshZjsnYQg6rSA66as7ZWgIOyImCDsnojqsowg7ZWY64qUIO2BtOuemOyKpFxuICpcbiAqIEBzdXBwb3J0IHtcImllXCI6IFwiNytcIiwgXCJjaFwiIDogXCJsYXRlc3RcIiwgXCJmZlwiIDogXCJsYXRlc3RcIiwgIFwic2ZcIiA6IFwibGF0ZXN0XCIsIFwiZWRnZVwiIDogXCJsYXRlc3RcIiwgXCJpb3NcIiA6IFwiNytcIiwgXCJhblwiIDogXCIyLjErIChleGNlcHQgMy54KVwifVxuICovXG52YXIgQ29tcG9uZW50ID0gZXhwb3J0cy5Db21wb25lbnQgPSBmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIENvbXBvbmVudCgpIHtcblx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29tcG9uZW50KTtcblxuXHRcdHRoaXMuX2V2ZW50SGFuZGxlciA9IHt9O1xuXHRcdHRoaXMuX29wdGlvbnMgPSB7fTtcblx0fVxuXHQvKipcbiAgKiBTZXRzIG9wdGlvbnMgaW4gYSBjb21wb25lbnQgb3IgcmV0dXJucyB0aGVtLlxuICAqIEBrbyDsu7Ttj6zrhIztirjsl5Ag7Ji17IWY7J2EIOyEpOygle2VmOqxsOuCmCDsmLXshZjsnYQg67CY7ZmY7ZWc64ukXG4gICogQG1ldGhvZCBlZy5Db21wb25lbnQjb3B0aW9uXG4gICogQHBhcmFtIHtTdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBvcHRpb248a28+7Ji17IWY7J2YIO2CpDwva28+XG4gICogQHBhcmFtIHtPYmplY3R9IFt2YWx1ZV0gVGhlIG9wdGlvbiB2YWx1ZSB0aGF0IGNvcnJlc3BvbmRzIHRvIGEgZ2l2ZW4ga2V5IDxrbz7tgqTsl5Ag7ZW064u57ZWY64qUIOyYteyFmOqwkjwva28+XG4gICogQHJldHVybiB7ZWcuQ29tcG9uZW50fE9iamVjdH0gQW4gaW5zdGFuY2UsIGFuIG9wdGlvbiB2YWx1ZSwgb3IgYW4gb3B0aW9uIG9iamVjdCBvZiBhIGNvbXBvbmVudCBpdHNlbGYuPGJyPi0gSWYgYm90aCBrZXkgYW5kIHZhbHVlIGFyZSB1c2VkIHRvIHNldCBhbiBvcHRpb24sIGl0IHJldHVybnMgYW4gaW5zdGFuY2Ugb2YgYSBjb21wb25lbnQgaXRzZWxmLjxicj4tIElmIG9ubHkgYSBrZXkgaXMgc3BlY2lmaWVkIGZvciB0aGUgcGFyYW1ldGVyLCBpdCByZXR1cm5zIHRoZSBvcHRpb24gdmFsdWUgY29ycmVzcG9uZGluZyB0byBhIGdpdmVuIGtleS48YnI+LSBJZiBub3RoaW5nIGlzIHNwZWNpZmllZCwgaXQgcmV0dXJucyBhbiBvcHRpb24gb2JqZWN0LiA8a28+7Lu07Y+s64SM7Yq4IOyekOyLoOydmCDsnbjsiqTthLTsiqTrgpgg7Ji17IWY6rCSLCDsmLXshZgg6rCd7LK0Ljxicj4tIO2CpOyZgCDqsJLsnLzroZwg7Ji17IWY7J2EIOyEpOygle2VmOuptCDsu7Ttj6zrhIztirgg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpOulvCDrsJjtmZjtlZzri6QuPGJyPi0g7YyM652866+47YSw7JeQIO2CpOunjCDshKTsoJXtlZjrqbQg7YKk7JeQIO2VtOuLue2VmOuKlCDsmLXshZjqsJLsnYQg67CY7ZmY7ZWc64ukLjxicj4tIO2MjOudvOuvuO2EsOyXkCDslYTrrLTqsoPrj4Qg7ISk7KCV7ZWY7KeAIOyViuycvOuptCDsmLXshZgg6rCd7LK066W8IOuwmO2ZmO2VnOuLpC48L2tvPlxuICAqIEBleGFtcGxlXG4gXHQgY2xhc3MgU29tZSBleHRlbmRzIGVnLkNvbXBvbmVudHtcbiBcdFx0fVxuIFx0IGNvbnN0IHNvbWUgPSBuZXcgU29tZSh7XG4gXHRcdFwiZm9vXCI6IDEsXG4gXHRcdFwiYmFyXCI6IDJcbiBcdH0pO1xuIFx0IHNvbWUub3B0aW9uKFwiZm9vXCIpOyAvLyByZXR1cm4gMVxuICBzb21lLm9wdGlvbihcImZvb1wiLDMpOyAvLyByZXR1cm4gc29tZSBpbnN0YW5jZVxuICBzb21lLm9wdGlvbigpOyAvLyByZXR1cm4gb3B0aW9ucyBvYmplY3QuXG4gIHNvbWUub3B0aW9uKHtcbiBcdFx0XCJmb29cIiA6IDEwLFxuIFx0XHRcImJhclwiIDogMjAsXG4gXHRcdFwiYmF6XCIgOiAzMFxuIFx0fSk7IC8vIHJldHVybiBzb21lIGluc3RhbmNlLlxuICAqL1xuXG5cblx0X2NyZWF0ZUNsYXNzKENvbXBvbmVudCwgW3tcblx0XHRrZXk6IFwib3B0aW9uXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIG9wdGlvbigpIHtcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID49IDIpIHtcblx0XHRcdFx0dmFyIF9rZXkgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbMF07XG5cdFx0XHRcdHZhciB2YWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1sxXTtcblx0XHRcdFx0dGhpcy5fb3B0aW9uc1tfa2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblxuXHRcdFx0dmFyIGtleSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1swXTtcblx0XHRcdGlmICh0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9vcHRpb25zW2tleV07XG5cdFx0XHR9XG5cblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9vcHRpb25zO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgb3B0aW9ucyA9IGtleTtcblx0XHRcdHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cdFx0LyoqXG4gICAqIFRyaWdnZXJzIGEgY3VzdG9tIGV2ZW50LlxuICAgKiBAa28g7Luk7Iqk7YWAIOydtOuypO2KuOulvCDrsJzsg53si5ztgqjri6RcbiAgICogQG1ldGhvZCBlZy5Db21wb25lbnQjdHJpZ2dlclxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBjdXN0b20gZXZlbnQgdG8gYmUgdHJpZ2dlcmVkIDxrbz7rsJzsg53tlaAg7Luk7Iqk7YWAIOydtOuypO2KuOydmCDsnbTrpoQ8L2tvPlxuICAgKiBAcGFyYW0ge09iamVjdH0gY3VzdG9tRXZlbnQgRXZlbnQgZGF0YSB0byBiZSBzZW50IHdoZW4gdHJpZ2dlcmluZyBhIGN1c3RvbSBldmVudCA8a28+7Luk7Iqk7YWAIOydtOuypO2KuOqwgCDrsJzsg53tlaAg65WMIOyghOuLrO2VoCDrjbDsnbTthLA8L2tvPlxuICAgKiBAcmV0dXJuIHtCb29sZWFufSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgZXZlbnQgaGFzIG9jY3VycmVkLiBJZiB0aGUgc3RvcCgpIG1ldGhvZCBpcyBjYWxsZWQgYnkgYSBjdXN0b20gZXZlbnQgaGFuZGxlciwgaXQgd2lsbCByZXR1cm4gZmFsc2UgYW5kIHByZXZlbnQgdGhlIGV2ZW50IGZyb20gb2NjdXJyaW5nLiA8a28+7J2067Kk7Yq4IOuwnOyDnSDsl6zrtoAuIOy7pOyKpO2FgCDsnbTrsqTtirgg7ZW465Ok65+s7JeQ7IScIHN0b3AoKSDrqZTshJzrk5zrpbwg7Zi47Lac7ZWY66m0ICdmYWxzZSfrpbwg67CY7ZmY7ZWY6rOgIOydtOuypO2KuCDrsJzsg53snYQg7KSR64uo7ZWc64ukLjwva28+XG4gICAqIEBleGFtcGxlXG4gICBjbGFzcyBTb21lIGV4dGVuZHMgZWcuQ29tcG9uZW50e1xuICBcdFx0c29tZSgpe1xuICBcdFx0XHR0aGlzLnRyaWdnZXIoXCJoaVwiKTsvLyBmaXJlIGhpIGV2ZW50LlxuICBcdFx0fVxuICBcdH1cbiAgICovXG5cblx0fSwge1xuXHRcdGtleTogXCJ0cmlnZ2VyXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHRyaWdnZXIoZXZlbnROYW1lKSB7XG5cdFx0XHR2YXIgY3VzdG9tRXZlbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG5cdFx0XHR2YXIgaGFuZGxlckxpc3QgPSB0aGlzLl9ldmVudEhhbmRsZXJbZXZlbnROYW1lXSB8fCBbXTtcblx0XHRcdHZhciBoYXNIYW5kbGVyTGlzdCA9IGhhbmRsZXJMaXN0Lmxlbmd0aCA+IDA7XG5cblx0XHRcdGlmICghaGFzSGFuZGxlckxpc3QpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGRldGFjaCBtZXRob2QgY2FsbCBpbiBoYW5kbGVyIGluIGZpcnN0IHRpbWUgdGhlbiBoYW5kZWxlciBsaXN0IGNhbGxzLlxuXHRcdFx0aGFuZGxlckxpc3QgPSBoYW5kbGVyTGlzdC5jb25jYXQoKTtcblxuXHRcdFx0Y3VzdG9tRXZlbnQuZXZlbnRUeXBlID0gZXZlbnROYW1lO1xuXG5cdFx0XHR2YXIgaXNDYW5jZWxlZCA9IGZhbHNlO1xuXHRcdFx0dmFyIGFyZyA9IFtjdXN0b21FdmVudF07XG5cdFx0XHR2YXIgaSA9IHZvaWQgMDtcblxuXHRcdFx0Y3VzdG9tRXZlbnQuc3RvcCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIGlzQ2FuY2VsZWQgPSB0cnVlO1xuXHRcdFx0fTtcblxuXHRcdFx0Zm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHJlc3RQYXJhbSA9IEFycmF5KF9sZW4gPiAyID8gX2xlbiAtIDIgOiAwKSwgX2tleTIgPSAyOyBfa2V5MiA8IF9sZW47IF9rZXkyKyspIHtcblx0XHRcdFx0cmVzdFBhcmFtW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocmVzdFBhcmFtLmxlbmd0aCA+PSAxKSB7XG5cdFx0XHRcdGFyZyA9IGFyZy5jb25jYXQocmVzdFBhcmFtKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChpIGluIGhhbmRsZXJMaXN0KSB7XG5cdFx0XHRcdGhhbmRsZXJMaXN0W2ldLmFwcGx5KHRoaXMsIGFyZyk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAhaXNDYW5jZWxlZDtcblx0XHR9XG5cdFx0LyoqXG4gICAqIEV4ZWN1dGVkIGV2ZW50IGp1c3Qgb25lIHRpbWUuXG4gICAqIEBrbyDsnbTrsqTtirjqsIAg7ZWc67KI66eMIOyLpO2WieuQnOuLpC5cbiAgICogQG1ldGhvZCBlZy5Db21wb25lbnQjb25jZVxuICAgKiBAcGFyYW0ge2V2ZW50TmFtZX0gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBiZSBhdHRhY2hlZCA8a28+65Ox66Gd7ZWgIOydtOuypO2KuOydmCDsnbTrpoQ8L2tvPlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyVG9BdHRhY2ggVGhlIGhhbmRsZXIgZnVuY3Rpb24gb2YgdGhlIGV2ZW50IHRvIGJlIGF0dGFjaGVkIDxrbz7rk7HroZ3tlaAg7J2067Kk7Yq47J2YIO2VuOuTpOufrCDtlajsiJg8L2tvPlxuICAgKiBAcmV0dXJuIHtlZy5Db21wb25lbnR9IEFuIGluc3RhbmNlIG9mIGEgY29tcG9uZW50IGl0c2VsZjxrbz7su7Ttj6zrhIztirgg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG4gICAqIEBleGFtcGxlXG4gICBjbGFzcyBTb21lIGV4dGVuZHMgZWcuQ29tcG9uZW50e1xuICBcdFx0aGkoKXtcbiAgXHRcdFx0YWxlcnQoXCJoaVwiKTtcbiAgXHRcdH1cbiAgXHRcdHRoaW5nKCl7XG4gIFx0XHRcdHRoaXMub25jZShcImhpXCIsIHRoaXMuaGkpO1xuICBcdFx0fVxuICBcdH1cbiAgXHQgdmFyIHNvbWUgPSBuZXcgU29tZSgpO1xuICAgc29tZS50aGluZygpO1xuICAgc29tZS50cmlnZ2VyKFwiaGlcIik7XG4gICAvLyBmaXJlIGFsZXJ0KFwiaGlcIik7XG4gICBzb21lLnRyaWdnZXIoXCJoaVwiKTtcbiAgIC8vIE5vdGhpbmcgaGFwcGVuc1xuICAgKi9cblxuXHR9LCB7XG5cdFx0a2V5OiBcIm9uY2VcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gb25jZShldmVudE5hbWUsIGhhbmRsZXJUb0F0dGFjaCkge1xuXHRcdFx0dmFyIF90aGlzID0gdGhpcztcblxuXHRcdFx0aWYgKCh0eXBlb2YgZXZlbnROYW1lID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoZXZlbnROYW1lKSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGhhbmRsZXJUb0F0dGFjaCA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgZXZlbnRIYXNoID0gZXZlbnROYW1lO1xuXHRcdFx0XHR2YXIgaSA9IHZvaWQgMDtcblx0XHRcdFx0Zm9yIChpIGluIGV2ZW50SGFzaCkge1xuXHRcdFx0XHRcdHRoaXMub25jZShpLCBldmVudEhhc2hbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgZXZlbnROYW1lID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBoYW5kbGVyVG9BdHRhY2ggPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHZhciBzZWxmID0gX3RoaXM7XG5cdFx0XHRcdFx0X3RoaXMub24oZXZlbnROYW1lLCBmdW5jdGlvbiBsaXN0ZW5lcigpIHtcblx0XHRcdFx0XHRcdGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJnID0gQXJyYXkoX2xlbjIpLCBfa2V5MyA9IDA7IF9rZXkzIDwgX2xlbjI7IF9rZXkzKyspIHtcblx0XHRcdFx0XHRcdFx0YXJnW19rZXkzXSA9IGFyZ3VtZW50c1tfa2V5M107XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGhhbmRsZXJUb0F0dGFjaC5hcHBseShzZWxmLCBhcmcpO1xuXHRcdFx0XHRcdFx0c2VsZi5vZmYoZXZlbnROYW1lLCBsaXN0ZW5lcik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pKCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBhbiBldmVudCBoYXMgYmVlbiBhdHRhY2hlZCB0byBhIGNvbXBvbmVudC5cbiAgICogQGtvIOy7tO2PrOuEjO2KuOyXkCDsnbTrsqTtirjqsIAg65Ox66Gd65CQ64qU7KeAIO2ZleyduO2VnOuLpC5cbiAgICogQG1ldGhvZCBlZy5Db21wb25lbnQjaGFzT25cbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gYmUgYXR0YWNoZWQgPGtvPuuTseuhnSDsl6zrtoDrpbwg7ZmV7J247ZWgIOydtOuypO2KuOydmCDsnbTrpoQ8L2tvPlxuICAgKiBAcmV0dXJuIHtCb29sZWFufSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgZXZlbnQgaXMgYXR0YWNoZWQuIDxrbz7snbTrsqTtirgg65Ox66GdIOyXrOu2gDwva28+XG4gICAqIEBleGFtcGxlXG4gICBjbGFzcyBTb21lIGV4dGVuZHMgZWcuQ29tcG9uZW50e1xuICBcdFx0c29tZSgpe1xuICBcdFx0XHR0aGlzLmhhc09uKFwiaGlcIik7Ly8gY2hlY2sgaGkgZXZlbnQuXG4gIFx0XHR9XG4gIFx0fVxuICAgKi9cblxuXHR9LCB7XG5cdFx0a2V5OiBcImhhc09uXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhc09uKGV2ZW50TmFtZSkge1xuXHRcdFx0cmV0dXJuICEhdGhpcy5fZXZlbnRIYW5kbGVyW2V2ZW50TmFtZV07XG5cdFx0fVxuXG5cdFx0LyoqXG4gICAqIEF0dGFjaGVzIGFuIGV2ZW50IHRvIGEgY29tcG9uZW50LlxuICAgKiBAa28g7Lu07Y+s64SM7Yq47JeQIOydtOuypO2KuOulvCDrk7HroZ3tlZzri6QuXG4gICAqIEBtZXRob2QgZWcuQ29tcG9uZW50I29uXG4gICAqIEBwYXJhbSB7ZXZlbnROYW1lfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGJlIGF0dGFjaGVkIDxrbz7rk7HroZ3tlaAg7J2067Kk7Yq47J2YIOydtOumhDwva28+XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJUb0F0dGFjaCBUaGUgaGFuZGxlciBmdW5jdGlvbiBvZiB0aGUgZXZlbnQgdG8gYmUgYXR0YWNoZWQgPGtvPuuTseuhne2VoCDsnbTrsqTtirjsnZgg7ZW465Ok65+sIO2VqOyImDwva28+XG4gICAqIEByZXR1cm4ge2VnLkNvbXBvbmVudH0gQW4gaW5zdGFuY2Ugb2YgYSBjb21wb25lbnQgaXRzZWxmPGtvPuy7tO2PrOuEjO2KuCDsnpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cbiAgICogQGV4YW1wbGVcbiAgIGNsYXNzIFNvbWUgZXh0ZW5kcyBlZy5Db21wb25lbnR7XG4gICBcdFx0aGkoKXtcbiAgXHRcdFx0Y29uc29sZS5sb2coXCJoaVwiKTtcbiAgIFx0XHR9XG4gIFx0XHRzb21lKCl7XG4gIFx0XHRcdHRoaXMub24oXCJoaVwiLHRoaXMuaGkpOyAvL2F0dGFjaCBldmVudFxuICBcdFx0fVxuICBcdH1cbiAgICovXG5cblx0fSwge1xuXHRcdGtleTogXCJvblwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBvbihldmVudE5hbWUsIGhhbmRsZXJUb0F0dGFjaCkge1xuXHRcdFx0aWYgKCh0eXBlb2YgZXZlbnROYW1lID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoZXZlbnROYW1lKSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGhhbmRsZXJUb0F0dGFjaCA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgZXZlbnRIYXNoID0gZXZlbnROYW1lO1xuXHRcdFx0XHR2YXIgbmFtZSA9IHZvaWQgMDtcblx0XHRcdFx0Zm9yIChuYW1lIGluIGV2ZW50SGFzaCkge1xuXHRcdFx0XHRcdHRoaXMub24obmFtZSwgZXZlbnRIYXNoW25hbWVdKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGV2ZW50TmFtZSA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgaGFuZGxlclRvQXR0YWNoID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0dmFyIGhhbmRsZXJMaXN0ID0gdGhpcy5fZXZlbnRIYW5kbGVyW2V2ZW50TmFtZV07XG5cblx0XHRcdFx0aWYgKHR5cGVvZiBoYW5kbGVyTGlzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHRcdGhhbmRsZXJMaXN0ID0gdGhpcy5fZXZlbnRIYW5kbGVyW2V2ZW50TmFtZV0gPSBbXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGhhbmRsZXJMaXN0LnB1c2goaGFuZGxlclRvQXR0YWNoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdC8qKlxuICAgKiBEZXRhY2hlcyBhbiBldmVudCBmcm9tIHRoZSBjb21wb25lbnQuXG4gICAqIEBrbyDsu7Ttj6zrhIztirjsl5Ag65Ox66Gd65CcIOydtOuypO2KuOulvCDtlbTsoJztlZzri6RcbiAgICogQG1ldGhvZCBlZy5Db21wb25lbnQjb2ZmXG4gICAqIEBwYXJhbSB7ZXZlbnROYW1lfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGJlIGRldGFjaGVkIDxrbz7tlbTsoJztlaAg7J2067Kk7Yq47J2YIOydtOumhDwva28+XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJUb0RldGFjaCBUaGUgaGFuZGxlciBmdW5jdGlvbiBvZiB0aGUgZXZlbnQgdG8gYmUgZGV0YWNoZWQgPGtvPu2VtOygnO2VoCDsnbTrsqTtirjsnZgg7ZW465Ok65+sIO2VqOyImDwva28+XG4gICAqIEByZXR1cm4ge2VnLkNvbXBvbmVudH0gQW4gaW5zdGFuY2Ugb2YgYSBjb21wb25lbnQgaXRzZWxmIDxrbz7su7Ttj6zrhIztirgg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG4gICAqIEBleGFtcGxlXG4gICBjbGFzcyBTb21lIGV4dGVuZHMgZWcuQ29tcG9uZW50e1xuICAgXHRcdGhpKCl7XG4gIFx0XHRcdGNvbnNvbGUubG9nKFwiaGlcIik7XG4gICBcdFx0fVxuICBcdFx0c29tZSgpe1xuICBcdFx0XHR0aGlzLm9mZihcImhpXCIsdGhpcy5oaSk7IC8vZGV0YWNoIGV2ZW50XG4gIFx0XHR9XG4gIFx0fVxuICAgKi9cblxuXHR9LCB7XG5cdFx0a2V5OiBcIm9mZlwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBvZmYoZXZlbnROYW1lLCBoYW5kbGVyVG9EZXRhY2gpIHtcblx0XHRcdC8vIEFsbCBldmVudCBkZXRhY2guXG5cdFx0XHRpZiAodHlwZW9mIGV2ZW50TmFtZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR0aGlzLl9ldmVudEhhbmRsZXIgPSB7fTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFsbCBoYW5kbGVyIG9mIHNwZWNpZmljIGV2ZW50IGRldGFjaC5cblx0XHRcdGlmICh0eXBlb2YgaGFuZGxlclRvRGV0YWNoID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZXZlbnROYW1lID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0dGhpcy5fZXZlbnRIYW5kbGVyW2V2ZW50TmFtZV0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIGV2ZW50SGFzaCA9IGV2ZW50TmFtZTtcblx0XHRcdFx0XHR2YXIgbmFtZSA9IHZvaWQgMDtcblx0XHRcdFx0XHRmb3IgKG5hbWUgaW4gZXZlbnRIYXNoKSB7XG5cdFx0XHRcdFx0XHR0aGlzLm9mZihuYW1lLCBldmVudEhhc2hbbmFtZV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBUaGUgaGFuZGxlciBvZiBzcGVjaWZpYyBldmVudCBkZXRhY2guXG5cdFx0XHR2YXIgaGFuZGxlckxpc3QgPSB0aGlzLl9ldmVudEhhbmRsZXJbZXZlbnROYW1lXTtcblx0XHRcdGlmIChoYW5kbGVyTGlzdCkge1xuXHRcdFx0XHR2YXIgayA9IHZvaWQgMDtcblx0XHRcdFx0dmFyIGhhbmRsZXJGdW5jdGlvbiA9IHZvaWQgMDtcblx0XHRcdFx0Zm9yIChrID0gMCwgaGFuZGxlckZ1bmN0aW9uOyBoYW5kbGVyRnVuY3Rpb24gPSBoYW5kbGVyTGlzdFtrXTsgaysrKSB7XG5cdFx0XHRcdFx0aWYgKGhhbmRsZXJGdW5jdGlvbiA9PT0gaGFuZGxlclRvRGV0YWNoKSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVyTGlzdCA9IGhhbmRsZXJMaXN0LnNwbGljZShrLCAxKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cdH1dKTtcblxuXHRyZXR1cm4gQ29tcG9uZW50O1xufSgpO1xuXG4vKioqLyB9KSxcbi8qIDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIF9jb21wb25lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9jb21wb25lbnQuQ29tcG9uZW50O1xuXG4vKioqLyB9KVxuLyoqKioqKi8gXSk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbXBvbmVudC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vQGVnanMvY29tcG9uZW50L2Rpc3QvY29tcG9uZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIkhhbW1lclwiXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0IE1vdmFibGVDb29yZCBmcm9tIFwiLi9tb3ZhYmxlQ29vcmRcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBNb3ZhYmxlQ29vcmQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9
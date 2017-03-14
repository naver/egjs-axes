/*!
 * All-in-one packaged file for ease use of '@egjs/movablecoord' with below dependencies.
 * NOTE: This is not an official distribution file and is only for user convenience.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MovableCoord"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["MovableCoord"] = factory();
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
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
        return Hammer;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiZTM3NDUxMmEyYjU4MDUwZGQ3ZiIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RzLmpzIiwid2VicGFjazovLy8uL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb29yZGluYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92YWJsZUNvb3JkLmpzIiwid2VicGFjazovLy8uL3NyYy9hbmltYXRpb25IYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9ldmVudEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hhbW1lck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9AZWdqcy9jb21wb25lbnQvZGlzdC9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9oYW1tZXJqcy9oYW1tZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImRpcmVjdGlvbiIsIkRJUkVDVElPTl9OT05FIiwiRElSRUNUSU9OX0xFRlQiLCJESVJFQ1RJT05fUklHSFQiLCJESVJFQ1RJT05fVVAiLCJESVJFQ1RJT05fRE9XTiIsIkRJUkVDVElPTl9IT1JJWk9OVEFMIiwiRElSRUNUSU9OX1ZFUlRJQ0FMIiwiRElSRUNUSU9OX0FMTCIsIkRJUkVDVElPTiIsIlVOSVFVRUtFWSIsIlNVUFBPUlRfVE9VQ0giLCJ3aW4iLCJ3aW5kb3ciLCJNYXRoIiwic2VsZiIsIkZ1bmN0aW9uIiwiZG9jdW1lbnQiLCJDb29yZGluYXRlIiwiZ2V0RGlyZWN0aW9uQnlBbmdsZSIsImFuZ2xlIiwidGhyZXNob2xkQW5nbGUiLCJ0b0FuZ2xlIiwiYWJzIiwiaXNIb3Jpem9udGFsIiwidXNlckRpcmVjdGlvbiIsImlzVmVydGljYWwiLCJnZXRQb2ludE9mSW50ZXJzZWN0aW9uIiwiZGVwYVBvcyIsImRlc3RQb3MiLCJtaW4iLCJtYXgiLCJjaXJjdWxhciIsImJvdW5jZSIsImJveExUIiwiYm94UkIiLCJ0b0Rlc3RQb3MiLCJjb25jYXQiLCJ4ZCIsInlkIiwiaXNPdXRzaWRlIiwicG9zIiwiaXNPdXRUb091dCIsImdldE5leHRPZmZzZXRQb3MiLCJzcGVlZHMiLCJkZWNlbGVyYXRpb24iLCJub3JtYWxTcGVlZCIsInNxcnQiLCJkdXJhdGlvbiIsImdldER1cmF0aW9uRnJvbVBvcyIsIm5vcm1hbFBvcyIsImlzQ2lyY3VsYXIiLCJnZXRDaXJjdWxhclBvcyIsInRvUG9zIiwidG9GaXhlZCIsInV0aWxzIiwiZ2V0RWxlbWVudCIsImVsIiwicXVlcnlTZWxlY3RvciIsImpRdWVyeSIsImxlbmd0aCIsIk1peGluQnVpbGRlciIsInN1cGVyY2xhc3MiLCJ3aXRoIiwibWl4aW5zIiwicmVkdWNlIiwiYyIsIm0iLCJNaXhpbiIsIk1vdmFibGVDb29yZCIsIm9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iLCJtYXJnaW4iLCJlYXNpbmciLCJlYXNlT3V0Q3ViaWMiLCJ4IiwicG93IiwibWF4aW11bUR1cmF0aW9uIiwiSW5maW5pdHkiLCJfcmV2aXNlT3B0aW9ucyIsIl9oYW1tZXJNYW5hZ2VyIiwiX3BvcyIsImJpbmQiLCJlbGVtZW50IiwiYWRkIiwidW5iaW5kIiwicmVtb3ZlIiwiZ2V0SGFtbWVyIiwiZW5hYmxlSW5wdXQiLCJpbnB1dENvbnRyb2wiLCJkaXNhYmxlSW5wdXQiLCJrZXkiLCJmb3JFYWNoIiwidiIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJ0ZXN0IiwiZ2V0IiwiZGVzdHJveSIsIm9mZiIsIlZFUlNJT04iLCJfcmFmIiwiX2FuaW1hdGVQYXJhbSIsIl9hbmltYXRpb25FbmQiLCJfcmVzdG9yZSIsIl9ncmFiIiwidHJpZ2dlciIsIm9yZ1BvcyIsIl9zZXRQb3NBbmRUcmlnZ2VyQ2hhbmdlIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJfcHJlcGFyZVBhcmFtIiwiYWJzUG9zIiwiaGFtbWVyRXZlbnQiLCJkaXN0YW5jZSIsIm5ld0R1cmF0aW9uIiwiaXNCb3VuY2UiLCJkb25lIiwiY29tcGxldGUiLCJfYW5pbWF0ZSIsIm5leHRQb3MiLCJyb3VuZCIsInNldFRvIiwiX3NldEludGVycnVwdCIsInBhcmFtIiwic3RhcnRUaW1lIiwiRGF0ZSIsImdldFRpbWUiLCJpbmZvIiwibG9vcCIsIl9mcmFtZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIl9hbmltYXRlVG8iLCJyZXRUcmlnZ2VyIiwiRXJyb3IiLCJxdWV1ZSIsImRlcXVldWUiLCJ0YXNrIiwic2hpZnQiLCJjYWxsIiwicHVzaCIsImN1clRpbWUiLCJlYXNpbmdQZXIiLCJfZWFzaW5nIiwiaSIsInBvc2l0aW9uIiwiaG9sZGluZyIsImUiLCJwIiwieSIsInRvWCIsInRvWSIsInNldEJ5IiwiX3N0YXR1cyIsImdyYWJPdXRzaWRlIiwiY3VycmVudEhhbW1lciIsImN1cnJlbnRPcHRpb25zIiwibW92ZURpc3RhbmNlIiwicHJldmVudGVkIiwiX3NldEN1cnJlbnRUYXJnZXQiLCJoYW1tZXIiLCJjdXJyZW50SGFubW1lciIsIl9zdGFydCIsImludGVycnVwdGFibGUiLCJfbW92ZSIsIl9pc0ludGVycnVwdGluZyIsInNjYWxlIiwib3V0IiwicHJldmVudCIsInByZXZJbnB1dCIsInNlc3Npb24iLCJvZmZzZXRYIiwiZGVsdGFYIiwib2Zmc2V0WSIsImRlbHRhWSIsInNyY0V2ZW50IiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50U3lzdGVtRXZlbnQiLCJ0diIsInRuIiwidHgiLCJpbml0U2xvcGUiLCJfZW5kIiwidlgiLCJ2ZWxvY2l0eVgiLCJ2WSIsInZlbG9jaXR5WSIsIm9mZnNldCIsIkhhbW1lck1hbmFnZXIiLCJfaGFtbWVycyIsIl9jcmVhdGVIYW1tZXIiLCJiaW5kT3B0aW9ucyIsImlucHV0Q2xhc3MiLCJoYW5kbGVyIiwiX2F0dGFjaEhhbW1lckV2ZW50cyIsIk1hbmFnZXIiLCJyZWNvZ25pemVycyIsIlBhbiIsInRocmVzaG9sZCIsImNzc1Byb3BzIiwidXNlclNlbGVjdCIsInRvdWNoU2VsZWN0IiwidG91Y2hDYWxsb3V0IiwidXNlckRyYWciLCJrZXlWYWx1ZSIsImdldEF0dHJpYnV0ZSIsImlucHV0VHlwZSIsImNvbnZlcnRJbnB1dFR5cGUiLCJyYW5kb20iLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJkYXRhIiwiZW5hYmxlIiwib24iLCJpc0ZpcnN0IiwiaXNGaW5hbCIsIl9kZXRhY2hIYW1tZXJFdmVudHMiLCJoYXNUb3VjaCIsImhhc01vdXNlIiwiaW5wdXRzIiwiVG91Y2hJbnB1dCIsIk1vdXNlSW5wdXQiLCJpc0VuYWJsZSIsIm9wdGlvbiIsInNldCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQixDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2hFQTs7QUFFQTs7Ozs7QUFLQTs7Ozs7QUFLQTs7Ozs7QUFLQTs7Ozs7QUFLQTs7Ozs7QUFLQTs7Ozs7QUFLQTs7Ozs7QUFLQTs7Ozs7QUFLQSxJQUFNQSxZQUFZO0FBQ2pCQyxrQkFBZ0IsQ0FEQztBQUVqQkMsa0JBQWdCLENBRkM7QUFHakJDLG1CQUFpQixDQUhBO0FBSWpCQyxnQkFBYyxDQUpHO0FBS2pCQyxrQkFBZ0IsRUFMQztBQU1qQkMsd0JBQXNCLElBQUksQ0FOVDtBQU9qQkMsc0JBQW9CLElBQUk7QUFQUCxDQUFsQjs7QUFVQVAsVUFBVVEsYUFBVixHQUEwQlIsVUFBVU0sb0JBQVYsR0FDekJOLFVBQVVPLGtCQURYO0FBRU8sSUFBTUUsZ0NBQVlULFNBQWxCO0FBQ0EsSUFBTVUsZ0NBQVksa0JBQWxCO0FBQ0EsSUFBTUMsd0NBQWdCLGlDQUF0QixDOzs7Ozs7Ozs7Ozs7QUN4RFA7QUFDQSxJQUFNQyxNQUFNLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUNBLE9BQU9DLElBQVAsS0FBZ0JBLElBQWpELEdBQXdERCxNQUF4RCxHQUFpRSxPQUFPRSxJQUFQLEtBQWdCLFdBQWhCLElBQStCQSxLQUFLRCxJQUFMLEtBQWNBLElBQTdDLEdBQW9EQyxJQUFwRCxHQUEyREMsU0FBUyxhQUFULEdBQXhJO0FBQ0E7O1FBRWVILE0sR0FBUEQsRztBQUNELElBQU1LLDhCQUFXTCxJQUFJSyxRQUFyQixDOzs7Ozs7Ozs7Ozs7O0FDTFA7O0FBRUEsSUFBTUMsYUFBYTtBQUNsQjtBQUNBQyxvQkFGa0IsK0JBRUVDLEtBRkYsRUFFU0MsY0FGVCxFQUV5QjtBQUMxQyxNQUFJQSxpQkFBaUIsQ0FBakIsSUFBc0JBLGlCQUFpQixFQUEzQyxFQUErQztBQUM5QyxVQUFPLGtCQUFVcEIsY0FBakI7QUFDQTtBQUNELE1BQU1xQixVQUFVUixLQUFLUyxHQUFMLENBQVNILEtBQVQsQ0FBaEI7O0FBRUEsU0FBT0UsVUFBVUQsY0FBVixJQUE0QkMsVUFBVSxNQUFNRCxjQUE1QyxHQUNMLGtCQUFVZCxrQkFETCxHQUMwQixrQkFBVUQsb0JBRDNDO0FBRUEsRUFWaUI7QUFXbEJrQixhQVhrQix3QkFXTHhCLFNBWEssRUFXTXlCLGFBWE4sRUFXcUI7QUFDdEMsU0FBT3pCLGNBQWMsa0JBQVVRLGFBQXhCLElBQ0xSLFlBQVksa0JBQVVNLG9CQUF0QixJQUNEbUIsZ0JBQWdCLGtCQUFVbkIsb0JBRjNCO0FBR0EsRUFmaUI7QUFnQmxCb0IsV0FoQmtCLHNCQWdCUDFCLFNBaEJPLEVBZ0JJeUIsYUFoQkosRUFnQm1CO0FBQ3BDLFNBQU96QixjQUFjLGtCQUFVUSxhQUF4QixJQUNMUixZQUFZLGtCQUFVTyxrQkFBdEIsSUFDRGtCLGdCQUFnQixrQkFBVWxCLGtCQUYzQjtBQUdBLEVBcEJpQjtBQXFCbEJvQix1QkFyQmtCLGtDQXFCS0MsT0FyQkwsRUFxQmNDLE9BckJkLEVBcUJ1QkMsR0FyQnZCLEVBcUI0QkMsR0FyQjVCLEVBcUJpQ0MsUUFyQmpDLEVBcUIyQ0MsTUFyQjNDLEVBcUJtRDtBQUNwRSxNQUFNQyxRQUFRLENBQUNKLElBQUksQ0FBSixJQUFTRyxPQUFPLENBQVAsQ0FBVixFQUFxQkgsSUFBSSxDQUFKLElBQVNHLE9BQU8sQ0FBUCxDQUE5QixDQUFkO0FBQ0EsTUFBTUUsUUFBUSxDQUFDSixJQUFJLENBQUosSUFBU0UsT0FBTyxDQUFQLENBQVYsRUFBcUJGLElBQUksQ0FBSixJQUFTRSxPQUFPLENBQVAsQ0FBOUIsQ0FBZDtBQUNBLE1BQU1HLFlBQVlQLFFBQVFRLE1BQVIsRUFBbEI7O0FBRUEsTUFBTUMsS0FBS1QsUUFBUSxDQUFSLElBQWFELFFBQVEsQ0FBUixDQUF4QjtBQUNBLE1BQU1XLEtBQUtWLFFBQVEsQ0FBUixJQUFhRCxRQUFRLENBQVIsQ0FBeEI7O0FBRUEsTUFBSSxDQUFDSSxTQUFTLENBQVQsQ0FBTCxFQUFrQjtBQUNqQkksYUFBVSxDQUFWLElBQWV0QixLQUFLaUIsR0FBTCxDQUFTRyxNQUFNLENBQU4sQ0FBVCxFQUFtQkUsVUFBVSxDQUFWLENBQW5CLENBQWY7QUFDQSxHQVZtRSxDQVVsRTtBQUNGLE1BQUksQ0FBQ0osU0FBUyxDQUFULENBQUwsRUFBa0I7QUFDakJJLGFBQVUsQ0FBVixJQUFldEIsS0FBS2dCLEdBQUwsQ0FBU0ssTUFBTSxDQUFOLENBQVQsRUFBbUJDLFVBQVUsQ0FBVixDQUFuQixDQUFmO0FBQ0EsR0FibUUsQ0FhbEU7QUFDRkEsWUFBVSxDQUFWLElBQWVFLEtBQUtWLFFBQVEsQ0FBUixJQUFhVyxLQUFLRCxFQUFMLElBQVdGLFVBQVUsQ0FBVixJQUFlUixRQUFRLENBQVIsQ0FBMUIsQ0FBbEIsR0FDWFEsVUFBVSxDQUFWLENBREo7O0FBR0EsTUFBSSxDQUFDSixTQUFTLENBQVQsQ0FBTCxFQUFrQjtBQUNqQkksYUFBVSxDQUFWLElBQWV0QixLQUFLaUIsR0FBTCxDQUFTRyxNQUFNLENBQU4sQ0FBVCxFQUFtQkUsVUFBVSxDQUFWLENBQW5CLENBQWY7QUFDQSxHQW5CbUUsQ0FtQmxFO0FBQ0YsTUFBSSxDQUFDSixTQUFTLENBQVQsQ0FBTCxFQUFrQjtBQUNqQkksYUFBVSxDQUFWLElBQWV0QixLQUFLZ0IsR0FBTCxDQUFTSyxNQUFNLENBQU4sQ0FBVCxFQUFtQkMsVUFBVSxDQUFWLENBQW5CLENBQWY7QUFDQSxHQXRCbUUsQ0FzQmxFO0FBQ0ZBLFlBQVUsQ0FBVixJQUFlRyxLQUFLWCxRQUFRLENBQVIsSUFBYVUsS0FBS0MsRUFBTCxJQUFXSCxVQUFVLENBQVYsSUFBZVIsUUFBUSxDQUFSLENBQTFCLENBQWxCLEdBQ1hRLFVBQVUsQ0FBVixDQURKO0FBRUEsU0FBTyxDQUNOdEIsS0FBS2dCLEdBQUwsQ0FBU0MsSUFBSSxDQUFKLENBQVQsRUFBaUJqQixLQUFLaUIsR0FBTCxDQUFTRCxJQUFJLENBQUosQ0FBVCxFQUFpQk0sVUFBVSxDQUFWLENBQWpCLENBQWpCLENBRE0sRUFFTnRCLEtBQUtnQixHQUFMLENBQVNDLElBQUksQ0FBSixDQUFULEVBQWlCakIsS0FBS2lCLEdBQUwsQ0FBU0QsSUFBSSxDQUFKLENBQVQsRUFBaUJNLFVBQVUsQ0FBVixDQUFqQixDQUFqQixDQUZNLENBQVA7QUFJQSxFQWxEaUI7O0FBbURsQjtBQUNBSSxVQXBEa0IscUJBb0RSQyxHQXBEUSxFQW9ESFgsR0FwREcsRUFvREVDLEdBcERGLEVBb0RPO0FBQ3hCLFNBQU9VLElBQUksQ0FBSixJQUFTWCxJQUFJLENBQUosQ0FBVCxJQUFtQlcsSUFBSSxDQUFKLElBQVNYLElBQUksQ0FBSixDQUE1QixJQUNOVyxJQUFJLENBQUosSUFBU1YsSUFBSSxDQUFKLENBREgsSUFDYVUsSUFBSSxDQUFKLElBQVNWLElBQUksQ0FBSixDQUQ3QjtBQUVBLEVBdkRpQjs7QUF3RGxCO0FBQ0FXLFdBekRrQixzQkF5RFBELEdBekRPLEVBeURGWixPQXpERSxFQXlET0MsR0F6RFAsRUF5RFlDLEdBekRaLEVBeURpQjtBQUNsQyxTQUFPLENBQUNVLElBQUksQ0FBSixJQUFTWCxJQUFJLENBQUosQ0FBVCxJQUFtQlcsSUFBSSxDQUFKLElBQVNWLElBQUksQ0FBSixDQUE1QixJQUNQVSxJQUFJLENBQUosSUFBU1gsSUFBSSxDQUFKLENBREYsSUFDWVcsSUFBSSxDQUFKLElBQVNWLElBQUksQ0FBSixDQUR0QixNQUVMRixRQUFRLENBQVIsSUFBYUMsSUFBSSxDQUFKLENBQWIsSUFBdUJELFFBQVEsQ0FBUixJQUFhRSxJQUFJLENBQUosQ0FBcEMsSUFDREYsUUFBUSxDQUFSLElBQWFDLElBQUksQ0FBSixDQURaLElBQ3NCRCxRQUFRLENBQVIsSUFBYUUsSUFBSSxDQUFKLENBSDlCLENBQVA7QUFJQSxFQTlEaUI7QUErRGxCWSxpQkEvRGtCLDRCQStEREMsTUEvREMsRUErRE9DLFlBL0RQLEVBK0RxQjtBQUN0QyxNQUFNQyxjQUFjaEMsS0FBS2lDLElBQUwsQ0FDbkJILE9BQU8sQ0FBUCxJQUFZQSxPQUFPLENBQVAsQ0FBWixHQUF3QkEsT0FBTyxDQUFQLElBQVlBLE9BQU8sQ0FBUCxDQURqQixDQUFwQjtBQUdBLE1BQU1JLFdBQVdsQyxLQUFLUyxHQUFMLENBQVN1QixjQUFjLENBQUNELFlBQXhCLENBQWpCOztBQUVBLFNBQU8sQ0FDTkQsT0FBTyxDQUFQLElBQVksQ0FBWixHQUFnQkksUUFEVixFQUVOSixPQUFPLENBQVAsSUFBWSxDQUFaLEdBQWdCSSxRQUZWLENBQVA7QUFJQSxFQXpFaUI7QUEwRWxCQyxtQkExRWtCLDhCQTBFQ1IsR0ExRUQsRUEwRU1JLFlBMUVOLEVBMEVvQjtBQUNyQyxNQUFNSyxZQUFZcEMsS0FBS2lDLElBQUwsQ0FBVU4sSUFBSSxDQUFKLElBQVNBLElBQUksQ0FBSixDQUFULEdBQWtCQSxJQUFJLENBQUosSUFBU0EsSUFBSSxDQUFKLENBQXJDLENBQWxCO0FBQ0EsTUFBTU8sV0FBV2xDLEtBQUtpQyxJQUFMLENBQ2hCRyxZQUFZTCxZQUFaLEdBQTJCLENBRFgsQ0FBakI7O0FBSUE7QUFDQSxTQUFPRyxXQUFXLEdBQVgsR0FBaUIsQ0FBakIsR0FBcUJBLFFBQTVCO0FBQ0EsRUFsRmlCO0FBbUZsQkcsV0FuRmtCLHNCQW1GUHRCLE9BbkZPLEVBbUZFQyxHQW5GRixFQW1GT0MsR0FuRlAsRUFtRllDLFFBbkZaLEVBbUZzQjtBQUN2QyxTQUFRQSxTQUFTLENBQVQsS0FBZUgsUUFBUSxDQUFSLElBQWFDLElBQUksQ0FBSixDQUE3QixJQUNKRSxTQUFTLENBQVQsS0FBZUgsUUFBUSxDQUFSLElBQWFFLElBQUksQ0FBSixDQUR4QixJQUVKQyxTQUFTLENBQVQsS0FBZUgsUUFBUSxDQUFSLElBQWFFLElBQUksQ0FBSixDQUZ4QixJQUdKQyxTQUFTLENBQVQsS0FBZUgsUUFBUSxDQUFSLElBQWFDLElBQUksQ0FBSixDQUgvQjtBQUlBLEVBeEZpQjtBQXlGbEJzQixlQXpGa0IsMEJBeUZIWCxHQXpGRyxFQXlGRVgsR0F6RkYsRUF5Rk9DLEdBekZQLEVBeUZZQyxRQXpGWixFQXlGc0I7QUFDdkMsTUFBTXFCLFFBQVFaLElBQUlKLE1BQUosRUFBZDs7QUFFQSxNQUFJTCxTQUFTLENBQVQsS0FBZXFCLE1BQU0sQ0FBTixJQUFXdkIsSUFBSSxDQUFKLENBQTlCLEVBQXNDO0FBQUU7QUFDdkN1QixTQUFNLENBQU4sSUFBVyxDQUFDQSxNQUFNLENBQU4sSUFBV3ZCLElBQUksQ0FBSixDQUFaLEtBQXVCQyxJQUFJLENBQUosSUFBU0QsSUFBSSxDQUFKLENBQVQsR0FBa0IsQ0FBekMsSUFBOENDLElBQUksQ0FBSixDQUF6RDtBQUNBO0FBQ0QsTUFBSUMsU0FBUyxDQUFULEtBQWVxQixNQUFNLENBQU4sSUFBV3RCLElBQUksQ0FBSixDQUE5QixFQUFzQztBQUFFO0FBQ3ZDc0IsU0FBTSxDQUFOLElBQVcsQ0FBQ0EsTUFBTSxDQUFOLElBQVd2QixJQUFJLENBQUosQ0FBWixLQUF1QkMsSUFBSSxDQUFKLElBQVNELElBQUksQ0FBSixDQUFULEdBQWtCLENBQXpDLElBQThDQSxJQUFJLENBQUosQ0FBekQ7QUFDQTtBQUNELE1BQUlFLFNBQVMsQ0FBVCxLQUFlcUIsTUFBTSxDQUFOLElBQVd0QixJQUFJLENBQUosQ0FBOUIsRUFBc0M7QUFBRTtBQUN2Q3NCLFNBQU0sQ0FBTixJQUFXLENBQUNBLE1BQU0sQ0FBTixJQUFXdkIsSUFBSSxDQUFKLENBQVosS0FBdUJDLElBQUksQ0FBSixJQUFTRCxJQUFJLENBQUosQ0FBVCxHQUFrQixDQUF6QyxJQUE4Q0EsSUFBSSxDQUFKLENBQXpEO0FBQ0E7QUFDRCxNQUFJRSxTQUFTLENBQVQsS0FBZXFCLE1BQU0sQ0FBTixJQUFXdkIsSUFBSSxDQUFKLENBQTlCLEVBQXNDO0FBQUU7QUFDdkN1QixTQUFNLENBQU4sSUFBVyxDQUFDQSxNQUFNLENBQU4sSUFBV3ZCLElBQUksQ0FBSixDQUFaLEtBQXVCQyxJQUFJLENBQUosSUFBU0QsSUFBSSxDQUFKLENBQVQsR0FBa0IsQ0FBekMsSUFBOENDLElBQUksQ0FBSixDQUF6RDtBQUNBOztBQUVEc0IsUUFBTSxDQUFOLElBQVcsQ0FBQ0EsTUFBTSxDQUFOLEVBQVNDLE9BQVQsQ0FBaUIsQ0FBakIsQ0FBWjtBQUNBRCxRQUFNLENBQU4sSUFBVyxDQUFDQSxNQUFNLENBQU4sRUFBU0MsT0FBVCxDQUFpQixDQUFqQixDQUFaO0FBQ0EsU0FBT0QsS0FBUDtBQUNBO0FBNUdpQixDQUFuQjs7a0JBK0dlbkMsVTs7Ozs7Ozs7Ozs7Ozs7O0FDakhmOzs7O0FBRUEsSUFBTXFDLFFBQVE7QUFDYkMsV0FEYSxzQkFDRkMsRUFERSxFQUNFO0FBQ2QsTUFBSSxPQUFPQSxFQUFQLEtBQWMsUUFBbEIsRUFBNEI7QUFDM0IsVUFBTyxrQkFBU0MsYUFBVCxDQUF1QkQsRUFBdkIsQ0FBUDtBQUNBLEdBRkQsTUFFTyxJQUFJLGdCQUFPRSxNQUFQLElBQWtCRixjQUFjRSxNQUFwQyxFQUE2QztBQUNuRDtBQUNBLFVBQU9GLEdBQUdHLE1BQUgsR0FBWSxDQUFaLEdBQWdCSCxHQUFHLENBQUgsQ0FBaEIsR0FBd0IsSUFBL0I7QUFDQSxHQUhNLE1BR0E7QUFDTixVQUFPQSxFQUFQO0FBQ0E7QUFDRDtBQVZZLENBQWQ7O0lBYU1JLFk7QUFDTCx1QkFBWUMsVUFBWixFQUF3QjtBQUFBOztBQUN2QixPQUFLQSxVQUFMLEdBQWtCQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLEtBQWxCO0FBQ0E7O3dCQUNEQyxJLG9CQUFnQjtBQUFBLG9DQUFSQyxNQUFRO0FBQVJBLFNBQVE7QUFBQTs7QUFDZixTQUFPQSxPQUFPQyxNQUFQLENBQWMsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsVUFBVUEsRUFBRUQsQ0FBRixDQUFWO0FBQUEsR0FBZCxFQUE4QixLQUFLSixVQUFuQyxDQUFQO0FBQ0EsRTs7Ozs7QUFHRixJQUFNTSxRQUFRLFNBQVJBLEtBQVE7QUFBQSxRQUFjLElBQUlQLFlBQUosQ0FBaUJDLFVBQWpCLENBQWQ7QUFBQSxDQUFkOztRQUVRTSxLLEdBQUFBLEs7UUFBT2IsSyxHQUFBQSxLOzs7Ozs7Ozs7Ozs7Ozs7QUMxQmY7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOENBLElBQU1jO0FBQUE7O0FBRUwsdUJBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFBQSwrQ0FDcEIsc0JBRG9COztBQUVwQkMsU0FBT0MsTUFBUCxDQUFjLE1BQUtGLE9BQUwsR0FBZTtBQUM1QnhDLFFBQUssQ0FBQyxDQUFELEVBQUksQ0FBSixDQUR1QjtBQUU1QkMsUUFBSyxDQUFDLEdBQUQsRUFBTSxHQUFOLENBRnVCO0FBRzVCRSxXQUFRLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixDQUhvQjtBQUk1QndDLFdBQVEsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLENBSm9CO0FBSzVCekMsYUFBVSxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsS0FBZixFQUFzQixLQUF0QixDQUxrQjtBQU01QjBDLFdBQVEsU0FBU0MsWUFBVCxDQUFzQkMsQ0FBdEIsRUFBeUI7QUFDaEMsV0FBTyxJQUFJOUQsS0FBSytELEdBQUwsQ0FBUyxJQUFJRCxDQUFiLEVBQWdCLENBQWhCLENBQVg7QUFDQSxJQVIyQjtBQVM1QkUsb0JBQWlCQyxRQVRXO0FBVTVCbEMsaUJBQWM7QUFWYyxHQUE3QixFQVdHeUIsT0FYSDtBQVlBLFFBQUtVLGNBQUw7QUFDQSxRQUFLQyxjQUFMLEdBQXNCLDZCQUF0QjtBQUNBLFFBQUtDLElBQUwsR0FBWSxNQUFLWixPQUFMLENBQWF4QyxHQUFiLENBQWlCTyxNQUFqQixFQUFaO0FBaEJvQjtBQWlCcEI7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXJCSyx3QkFxQ0w4QyxJQXJDSyxpQkFxQ0FDLE9BckNBLEVBcUNTZCxPQXJDVCxFQXFDa0I7QUFDdEIsT0FBS1csY0FBTCxDQUFvQkksR0FBcEIsQ0FBd0JELE9BQXhCLEVBQWlDZCxPQUFqQyxFQUEwQyxJQUExQztBQUNBLFNBQU8sSUFBUDtBQUNBLEVBeENJO0FBeUNMOzs7Ozs7Ozs7QUF6Q0ssd0JBZ0RMZ0IsTUFoREssbUJBZ0RFRixPQWhERixFQWdEVztBQUNmLE9BQUtILGNBQUwsQ0FBb0JNLE1BQXBCLENBQTJCSCxPQUEzQjtBQUNBLFNBQU8sSUFBUDtBQUNBLEVBbkRJOztBQXFETDs7Ozs7Ozs7O0FBckRLLHdCQTRETEksU0E1REssc0JBNERLSixPQTVETCxFQTREYztBQUNsQixTQUFPLEtBQUtILGNBQUwsQ0FBb0JPLFNBQXBCLENBQThCSixPQUE5QixDQUFQO0FBQ0EsRUE5REk7O0FBZ0VMOzs7Ozs7Ozs7QUFoRUssd0JBdUVMSyxXQXZFSyx3QkF1RU9MLE9BdkVQLEVBdUVnQjtBQUNwQixTQUFPLEtBQUtILGNBQUwsQ0FBb0JTLFlBQXBCLENBQWlDLElBQWpDLEVBQXVDTixPQUF2QyxDQUFQO0FBQ0EsRUF6RUk7O0FBMkVMOzs7Ozs7Ozs7QUEzRUssd0JBa0ZMTyxZQWxGSyx5QkFrRlFQLE9BbEZSLEVBa0ZpQjtBQUNyQixTQUFPLEtBQUtILGNBQUwsQ0FBb0JTLFlBQXBCLENBQWlDLEtBQWpDLEVBQXdDTixPQUF4QyxDQUFQO0FBQ0EsRUFwRkk7O0FBc0ZMOzs7QUF0Rkssd0JBdUZMSixjQXZGSyw2QkF1Rlk7QUFBQTs7QUFDaEIsTUFBSVksWUFBSjs7QUFFQSxHQUFDLFFBQUQsRUFBVyxRQUFYLEVBQXFCLFVBQXJCLEVBQWlDQyxPQUFqQyxDQUF5QyxhQUFLO0FBQzdDRCxTQUFNLE9BQUt0QixPQUFMLENBQWF3QixDQUFiLENBQU47QUFDQSxPQUFJRixPQUFPLElBQVgsRUFBaUI7QUFDaEIsUUFBSUEsSUFBSUcsV0FBSixLQUFvQkMsS0FBeEIsRUFBK0I7QUFDOUIsWUFBSzFCLE9BQUwsQ0FBYXdCLENBQWIsSUFBa0JGLElBQUloQyxNQUFKLEtBQWUsQ0FBZixHQUNqQmdDLElBQUl2RCxNQUFKLENBQVd1RCxHQUFYLENBRGlCLEdBQ0NBLElBQUl2RCxNQUFKLEVBRG5CO0FBRUEsS0FIRCxNQUdPLElBQUksd0JBQXdCNEQsSUFBeEIsUUFBb0NMLEdBQXBDLHlDQUFvQ0EsR0FBcEMsRUFBSixFQUE4QztBQUNwRCxZQUFLdEIsT0FBTCxDQUFhd0IsQ0FBYixJQUFrQixDQUFDRixHQUFELEVBQU1BLEdBQU4sRUFBV0EsR0FBWCxFQUFnQkEsR0FBaEIsQ0FBbEI7QUFDQSxLQUZNLE1BRUE7QUFDTixZQUFLdEIsT0FBTCxDQUFhd0IsQ0FBYixJQUFrQixJQUFsQjtBQUNBO0FBQ0Q7QUFDRCxHQVpEO0FBYUEsRUF2R0k7O0FBeUdMOzs7Ozs7Ozs7O0FBekdLLHdCQWlITEksR0FqSEssa0JBaUhDO0FBQ0wsU0FBTyxLQUFLaEIsSUFBTCxDQUFVN0MsTUFBVixFQUFQO0FBQ0EsRUFuSEk7O0FBcUhMOzs7Ozs7O0FBckhLLHdCQTBITDhELE9BMUhLLHNCQTBISztBQUNULE9BQUtDLEdBQUw7QUFDQSxPQUFLbkIsY0FBTCxDQUFvQmtCLE9BQXBCO0FBQ0EsRUE3SEk7O0FBQUE7QUFBQSxFQUNFLHVDQUFpQnBDLElBQWpCLG9EQURGLENBQU47O0FBZ0lBUSxPQUFPQyxNQUFQLENBQWNILFlBQWQ7QUFDQUEsYUFBYWdDLE9BQWIsR0FBdUIsWUFBdkI7a0JBQ2VoQyxZOzs7Ozs7Ozs7Ozs7OztBQ3ZMZjs7OztBQUNBOzs7Ozs7Ozs7O2tCQUVlO0FBQUE7QUFBQTs7QUFDZCxvQkFBYztBQUFBOztBQUFBLGdEQUNiLHNCQURhOztBQUViLFNBQUtpQyxJQUFMLEdBQVksSUFBWjtBQUNBLFNBQUtDLGFBQUwsR0FBcUIsSUFBckI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLE1BQUtBLGFBQUwsQ0FBbUJyQixJQUFuQixPQUFyQixDQUphLENBSXVDO0FBQ3BELFNBQUtzQixRQUFMLEdBQWdCLE1BQUtBLFFBQUwsQ0FBY3RCLElBQWQsT0FBaEIsQ0FMYSxDQUs2QjtBQUw3QjtBQU1iOztBQVBhLG1CQVNkdUIsS0FUYyxrQkFTUjVFLEdBVFEsRUFTSEMsR0FURyxFQVNFQyxRQVRGLEVBU1k7QUFDekIsT0FBSSxLQUFLdUUsYUFBVCxFQUF3QjtBQUN2QixTQUFLSSxPQUFMLENBQWEsY0FBYjtBQUNBLFFBQU1DLFNBQVMsS0FBS1YsR0FBTCxFQUFmOztBQUVBLFFBQU16RCxNQUFNLHFCQUFXVyxjQUFYLENBQTBCLEtBQUs4QyxHQUFMLEVBQTFCLEVBQXNDcEUsR0FBdEMsRUFBMkNDLEdBQTNDLEVBQWdEQyxRQUFoRCxDQUFaOztBQUVBLFFBQUlTLElBQUksQ0FBSixNQUFXbUUsT0FBTyxDQUFQLENBQVgsSUFBd0JuRSxJQUFJLENBQUosTUFBV21FLE9BQU8sQ0FBUCxDQUF2QyxFQUFrRDtBQUNqRCxVQUFLQyx1QkFBTCxDQUE2QnBFLEdBQTdCLEVBQWtDLElBQWxDO0FBQ0E7QUFDRCxTQUFLOEQsYUFBTCxHQUFxQixJQUFyQjtBQUNBLFNBQUtELElBQUwsSUFBYSxnQkFBT1Esb0JBQVAsQ0FBNEIsS0FBS1IsSUFBakMsQ0FBYjtBQUNBLFNBQUtBLElBQUwsR0FBWSxJQUFaO0FBQ0E7QUFDRCxHQXZCYTs7QUFBQSxtQkF5QmRTLGFBekJjLDBCQXlCQUMsTUF6QkEsRUF5QlFoRSxRQXpCUixFQXlCa0JpRSxXQXpCbEIsRUF5QitCO0FBQzVDLE9BQU14RSxNQUFNLEtBQUt5RCxHQUFMLEVBQVo7QUFDQSxPQUFNcEUsTUFBTSxLQUFLd0MsT0FBTCxDQUFheEMsR0FBekI7QUFDQSxPQUFNQyxNQUFNLEtBQUt1QyxPQUFMLENBQWF2QyxHQUF6QjtBQUNBLE9BQU1DLFdBQVcsS0FBS3NDLE9BQUwsQ0FBYXRDLFFBQTlCO0FBQ0EsT0FBTThDLGtCQUFrQixLQUFLUixPQUFMLENBQWFRLGVBQXJDO0FBQ0EsT0FBSWpELFVBQVUscUJBQVdGLHNCQUFYLENBQ2JjLEdBRGEsRUFDUnVFLE1BRFEsRUFDQWxGLEdBREEsRUFDS0MsR0FETCxFQUNVQyxRQURWLEVBQ29CLEtBQUtzQyxPQUFMLENBQWFyQyxNQURqQyxDQUFkOztBQUdBSixhQUFVLHFCQUFXYSxVQUFYLENBQXNCRCxHQUF0QixFQUEyQlosT0FBM0IsRUFBb0NDLEdBQXBDLEVBQXlDQyxHQUF6QyxJQUFnRFUsR0FBaEQsR0FBc0RaLE9BQWhFOztBQUVBLE9BQU1xRixXQUFXLENBQ2hCcEcsS0FBS1MsR0FBTCxDQUFTTSxRQUFRLENBQVIsSUFBYVksSUFBSSxDQUFKLENBQXRCLENBRGdCLEVBRWhCM0IsS0FBS1MsR0FBTCxDQUFTTSxRQUFRLENBQVIsSUFBYVksSUFBSSxDQUFKLENBQXRCLENBRmdCLENBQWpCO0FBSUEsT0FBSTBFLGNBQWNuRSxZQUFZLElBQVosR0FBbUIscUJBQVdDLGtCQUFYLENBQ3BDaUUsUUFEb0MsRUFDMUIsS0FBSzVDLE9BQUwsQ0FBYXpCLFlBRGEsQ0FBbkIsR0FDc0JHLFFBRHhDOztBQUdBbUUsaUJBQWNyQyxrQkFBa0JxQyxXQUFsQixHQUFnQ0EsV0FBaEMsR0FBOENyQyxlQUE1RDtBQUNBLFVBQU87QUFDTmxELGFBQVNhLElBQUlKLE1BQUosRUFESDtBQUVOUixhQUFTQSxRQUFRUSxNQUFSLEVBRkg7QUFHTitFLGNBQVUscUJBQVc1RSxTQUFYLENBQXFCWCxPQUFyQixFQUE4QkMsR0FBOUIsRUFBbUNDLEdBQW5DLENBSEo7QUFJTm9CLGdCQUFZLHFCQUFXQSxVQUFYLENBQXNCNkQsTUFBdEIsRUFBOEJsRixHQUE5QixFQUFtQ0MsR0FBbkMsRUFBd0NDLFFBQXhDLENBSk47QUFLTmdCLGNBQVVtRSxXQUxKO0FBTU5ELHNCQU5NO0FBT05ELGlCQUFhQSxlQUFlLElBUHRCO0FBUU5JLFVBQU0sS0FBS2I7QUFSTCxJQUFQO0FBVUEsR0F0RGE7O0FBQUEsbUJBd0RkQyxRQXhEYyxxQkF3RExhLFFBeERLLEVBd0RLTCxXQXhETCxFQXdEa0I7QUFDL0IsT0FBTXhFLE1BQU0sS0FBS3lELEdBQUwsRUFBWjtBQUNBLE9BQU1wRSxNQUFNLEtBQUt3QyxPQUFMLENBQWF4QyxHQUF6QjtBQUNBLE9BQU1DLE1BQU0sS0FBS3VDLE9BQUwsQ0FBYXZDLEdBQXpCOztBQUVBLFFBQUt3RixRQUFMLENBQWMsS0FBS1IsYUFBTCxDQUFtQixDQUNoQ2pHLEtBQUtnQixHQUFMLENBQVNDLElBQUksQ0FBSixDQUFULEVBQWlCakIsS0FBS2lCLEdBQUwsQ0FBU0QsSUFBSSxDQUFKLENBQVQsRUFBaUJXLElBQUksQ0FBSixDQUFqQixDQUFqQixDQURnQyxFQUVoQzNCLEtBQUtnQixHQUFMLENBQVNDLElBQUksQ0FBSixDQUFULEVBQWlCakIsS0FBS2lCLEdBQUwsQ0FBU0QsSUFBSSxDQUFKLENBQVQsRUFBaUJXLElBQUksQ0FBSixDQUFqQixDQUFqQixDQUZnQyxDQUFuQixFQUdYLElBSFcsRUFHTHdFLFdBSEssQ0FBZCxFQUd1QkssUUFIdkI7QUFJQSxHQWpFYTs7QUFBQSxtQkFtRWRkLGFBbkVjLDRCQW1FRTtBQUNmLFFBQUtELGFBQUwsR0FBcUIsSUFBckI7QUFDQSxPQUFNSyxTQUFTLEtBQUtWLEdBQUwsRUFBZjtBQUNBLE9BQU1zQixVQUFVLHFCQUFXcEUsY0FBWCxDQUEwQixDQUN6Q3RDLEtBQUsyRyxLQUFMLENBQVdiLE9BQU8sQ0FBUCxDQUFYLENBRHlDLEVBRXpDOUYsS0FBSzJHLEtBQUwsQ0FBV2IsT0FBTyxDQUFQLENBQVgsQ0FGeUMsQ0FBMUIsRUFHYixLQUFLdEMsT0FBTCxDQUFheEMsR0FIQSxFQUdLLEtBQUt3QyxPQUFMLENBQWF2QyxHQUhsQixFQUd1QixLQUFLdUMsT0FBTCxDQUFhdEMsUUFIcEMsQ0FBaEI7O0FBS0EsUUFBSzBGLEtBQUwsYUFBY0YsT0FBZDtBQUNBLFFBQUtHLGFBQUwsQ0FBbUIsS0FBbkI7QUFDQTs7Ozs7O0FBTUEsUUFBS2hCLE9BQUwsQ0FBYSxjQUFiO0FBQ0EsR0FwRmE7O0FBQUEsbUJBc0ZkWSxRQXRGYyxxQkFzRkxLLEtBdEZLLEVBc0ZFTixRQXRGRixFQXNGWTtBQUN6QixRQUFLZixhQUFMLEdBQXFCaEMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JvRCxLQUFsQixDQUFyQjtBQUNBLFFBQUtyQixhQUFMLENBQW1Cc0IsU0FBbkIsR0FBK0IsSUFBSUMsSUFBSixHQUFXQyxPQUFYLEVBQS9CO0FBQ0EsT0FBSUgsTUFBTTVFLFFBQVYsRUFBb0I7QUFDbkIsUUFBTWdGLE9BQU8sS0FBS3pCLGFBQWxCO0FBQ0EsUUFBTXhGLE9BQU8sSUFBYjs7QUFFQSxLQUFDLFNBQVNrSCxJQUFULEdBQWdCO0FBQ2hCO0FBQ0FsSCxVQUFLdUYsSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFJdkYsS0FBS21ILE1BQUwsQ0FBWUYsSUFBWixLQUFxQixDQUF6QixFQUE0QjtBQUMzQjtBQUNBVjtBQUNBO0FBQ0EsTUFQZSxDQU9kO0FBQ0Z2RyxVQUFLdUYsSUFBTCxHQUFZLGdCQUFPNkIscUJBQVAsQ0FBNkJGLElBQTdCLENBQVo7QUFDQTtBQUNBLEtBVkQ7QUFXQSxJQWZELE1BZU87QUFDTixTQUFLcEIsdUJBQUwsQ0FBNkJlLE1BQU0vRixPQUFuQyxFQUE0QyxLQUE1QztBQUNBeUY7QUFDQTtBQUNELEdBNUdhOztBQUFBLG1CQThHZGMsVUE5R2MsdUJBOEdIcEIsTUE5R0csRUE4R0toRSxRQTlHTCxFQThHZWlFLFdBOUdmLEVBOEc0QjtBQUFBOztBQUN6QyxPQUFNVyxRQUFRLEtBQUtiLGFBQUwsQ0FBbUJDLE1BQW5CLEVBQTJCaEUsUUFBM0IsRUFBcUNpRSxXQUFyQyxDQUFkO0FBQ0EsT0FBTW9CLGFBQWEsS0FBSzFCLE9BQUwsQ0FBYSxnQkFBYixFQUErQmlCLEtBQS9CLENBQW5COztBQUVBO0FBQ0EsT0FBSUEsTUFBTXpFLFVBQU4sSUFBb0IsQ0FBQ2tGLFVBQXpCLEVBQXFDO0FBQ3BDLFVBQU0sSUFBSUMsS0FBSixDQUNMLCtEQURLLENBQU47QUFHQTs7QUFFRCxPQUFJRCxVQUFKLEVBQWdCO0FBQ2YsUUFBTUUsUUFBUSxFQUFkO0FBQ0EsUUFBTUMsVUFBVSxTQUFWQSxPQUFVLEdBQVc7QUFDMUIsU0FBTUMsT0FBT0YsTUFBTUcsS0FBTixFQUFiOztBQUVBRCxhQUFRQSxLQUFLRSxJQUFMLENBQVUsSUFBVixDQUFSO0FBQ0EsS0FKRDs7QUFNQSxRQUFJZixNQUFNaEcsT0FBTixDQUFjLENBQWQsTUFBcUJnRyxNQUFNL0YsT0FBTixDQUFjLENBQWQsQ0FBckIsSUFDSCtGLE1BQU1oRyxPQUFOLENBQWMsQ0FBZCxNQUFxQmdHLE1BQU0vRixPQUFOLENBQWMsQ0FBZCxDQUR0QixFQUN3QztBQUN2QzBHLFdBQU1LLElBQU4sQ0FBVztBQUFBLGFBQU0sT0FBS3JCLFFBQUwsQ0FBY0ssS0FBZCxFQUFxQlksT0FBckIsQ0FBTjtBQUFBLE1BQVg7QUFDQTtBQUNELFFBQUkscUJBQVdoRyxTQUFYLENBQ0hvRixNQUFNL0YsT0FESCxFQUNZLEtBQUt5QyxPQUFMLENBQWF4QyxHQUR6QixFQUM4QixLQUFLd0MsT0FBTCxDQUFhdkMsR0FEM0MsQ0FBSixFQUNxRDtBQUNwRHdHLFdBQU1LLElBQU4sQ0FBVztBQUFBLGFBQU0sT0FBS25DLFFBQUwsQ0FBYytCLE9BQWQsRUFBdUJ2QixXQUF2QixDQUFOO0FBQUEsTUFBWDtBQUNBO0FBQ0RzQixVQUFNSyxJQUFOLENBQVc7QUFBQSxZQUFNLE9BQUtwQyxhQUFMLEVBQU47QUFBQSxLQUFYO0FBQ0FnQztBQUNBO0FBQ0QsR0E1SWE7O0FBOElkOzs7QUE5SWMsbUJBK0lkTixNQS9JYyxtQkErSVBOLEtBL0lPLEVBK0lBO0FBQ2IsT0FBTWlCLFVBQVUsSUFBSWYsSUFBSixLQUFhRixNQUFNQyxTQUFuQztBQUNBLE9BQU1pQixZQUFZLEtBQUtDLE9BQUwsQ0FBYUYsVUFBVWpCLE1BQU01RSxRQUE3QixDQUFsQjtBQUNBLE9BQUlQLE1BQU0sQ0FBQ21GLE1BQU1oRyxPQUFOLENBQWMsQ0FBZCxDQUFELEVBQW1CZ0csTUFBTWhHLE9BQU4sQ0FBYyxDQUFkLENBQW5CLENBQVY7O0FBRUEsUUFBSyxJQUFJb0gsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLENBQXBCLEVBQXVCQSxHQUF2QixFQUE0QjtBQUMxQnZHLFFBQUl1RyxDQUFKLE1BQVdwQixNQUFNL0YsT0FBTixDQUFjbUgsQ0FBZCxDQUFaLEtBQ0N2RyxJQUFJdUcsQ0FBSixLQUFVLENBQUNwQixNQUFNL0YsT0FBTixDQUFjbUgsQ0FBZCxJQUFtQnZHLElBQUl1RyxDQUFKLENBQXBCLElBQThCRixTQUR6QztBQUVBO0FBQ0RyRyxTQUFNLHFCQUFXVyxjQUFYLENBQ0xYLEdBREssRUFDQSxLQUFLNkIsT0FBTCxDQUFheEMsR0FEYixFQUNrQixLQUFLd0MsT0FBTCxDQUFhdkMsR0FEL0IsRUFDb0MsS0FBS3VDLE9BQUwsQ0FBYXRDLFFBRGpELENBQU47QUFFQSxRQUFLNkUsdUJBQUwsQ0FBNkJwRSxHQUE3QixFQUFrQyxLQUFsQztBQUNBLFVBQU9xRyxTQUFQO0FBQ0EsR0E1SmE7O0FBOEpkOzs7QUE5SmMsbUJBK0pkakMsdUJBL0pjLG9DQStKVW9DLFFBL0pWLEVBK0pvQkMsT0EvSnBCLEVBK0o2QkMsQ0EvSjdCLEVBK0pnQztBQUM3Qzs7Ozs7Ozs7Ozs7Ozs7QUFjQSxRQUFLakUsSUFBTCxHQUFZK0QsU0FBUzVHLE1BQVQsRUFBWjtBQUNBLFFBQUtzRSxPQUFMLENBQWEsUUFBYixFQUF1QjtBQUN0QmxFLFNBQUt3RyxTQUFTNUcsTUFBVCxFQURpQjtBQUV0QjZHLG9CQUZzQjtBQUd0QmpDLGlCQUFha0MsS0FBSztBQUhJLElBQXZCO0FBS0EsR0FwTGE7O0FBQUEsbUJBc0xkSixPQXRMYyxvQkFzTE5LLENBdExNLEVBc0xIO0FBQ1YsVUFBT0EsSUFBSSxDQUFKLEdBQVEsQ0FBUixHQUFZLEtBQUs5RSxPQUFMLENBQWFJLE1BQWIsQ0FBb0IwRSxDQUFwQixDQUFuQjtBQUNBLEdBeExhOztBQTBMZDs7Ozs7Ozs7Ozs7QUExTGMsbUJBbU1kMUIsS0FuTWMsa0JBbU1SOUMsQ0FuTVEsRUFtTUx5RSxDQW5NSyxFQW1NWTtBQUFBLE9BQWRyRyxRQUFjLHVFQUFILENBQUc7O0FBQ3pCLE9BQUlzRyxNQUFNMUUsQ0FBVjtBQUNBLE9BQUkyRSxNQUFNRixDQUFWO0FBQ0EsT0FBTXZILE1BQU0sS0FBS3dDLE9BQUwsQ0FBYXhDLEdBQXpCO0FBQ0EsT0FBTUMsTUFBTSxLQUFLdUMsT0FBTCxDQUFhdkMsR0FBekI7QUFDQSxPQUFNQyxXQUFXLEtBQUtzQyxPQUFMLENBQWF0QyxRQUE5Qjs7QUFFQSxRQUFLMEUsS0FBTCxDQUFXNUUsR0FBWCxFQUFnQkMsR0FBaEIsRUFBcUJDLFFBQXJCO0FBQ0EsT0FBTVMsTUFBTSxLQUFLeUQsR0FBTCxFQUFaOztBQUVBLE9BQUl0QixNQUFNbkMsSUFBSSxDQUFKLENBQU4sSUFBZ0I0RyxNQUFNNUcsSUFBSSxDQUFKLENBQTFCLEVBQWtDO0FBQ2pDLFdBQU8sSUFBUDtBQUNBOztBQUVELFFBQUtrRixhQUFMLENBQW1CLElBQW5CO0FBQ0EsT0FBSS9DLE1BQU1uQyxJQUFJLENBQUosQ0FBVixFQUFrQjtBQUNqQixRQUFJLENBQUNULFNBQVMsQ0FBVCxDQUFMLEVBQWtCO0FBQ2pCc0gsV0FBTXhJLEtBQUtpQixHQUFMLENBQVNELElBQUksQ0FBSixDQUFULEVBQWlCd0gsR0FBakIsQ0FBTjtBQUNBO0FBQ0QsUUFBSSxDQUFDdEgsU0FBUyxDQUFULENBQUwsRUFBa0I7QUFDakJzSCxXQUFNeEksS0FBS2dCLEdBQUwsQ0FBU0MsSUFBSSxDQUFKLENBQVQsRUFBaUJ1SCxHQUFqQixDQUFOO0FBQ0E7QUFDRDtBQUNELE9BQUlELE1BQU01RyxJQUFJLENBQUosQ0FBVixFQUFrQjtBQUNqQixRQUFJLENBQUNULFNBQVMsQ0FBVCxDQUFMLEVBQWtCO0FBQ2pCdUgsV0FBTXpJLEtBQUtpQixHQUFMLENBQVNELElBQUksQ0FBSixDQUFULEVBQWlCeUgsR0FBakIsQ0FBTjtBQUNBO0FBQ0QsUUFBSSxDQUFDdkgsU0FBUyxDQUFULENBQUwsRUFBa0I7QUFDakJ1SCxXQUFNekksS0FBS2dCLEdBQUwsQ0FBU0MsSUFBSSxDQUFKLENBQVQsRUFBaUJ3SCxHQUFqQixDQUFOO0FBQ0E7QUFDRDtBQUNELE9BQUl2RyxRQUFKLEVBQWM7QUFDYixTQUFLb0YsVUFBTCxDQUFnQixDQUFDa0IsR0FBRCxFQUFNQyxHQUFOLENBQWhCLEVBQTRCdkcsUUFBNUI7QUFDQSxJQUZELE1BRU87QUFDTixTQUFLa0MsSUFBTCxHQUFZLHFCQUFXOUIsY0FBWCxDQUEwQixDQUFDa0csR0FBRCxFQUFNQyxHQUFOLENBQTFCLEVBQXNDekgsR0FBdEMsRUFBMkNDLEdBQTNDLEVBQWdEQyxRQUFoRCxDQUFaO0FBQ0EsU0FBSzZFLHVCQUFMLENBQTZCLEtBQUszQixJQUFsQyxFQUF3QyxLQUF4QztBQUNBLFNBQUt5QyxhQUFMLENBQW1CLEtBQW5CO0FBQ0E7QUFDRCxVQUFPLElBQVA7QUFDQSxHQTFPYTs7QUE0T2Q7Ozs7Ozs7Ozs7O0FBNU9jLG1CQXFQZDZCLEtBclBjLGtCQXFQUjVFLENBclBRLEVBcVBMeUUsQ0FyUEssRUFxUFk7QUFBQSxPQUFkckcsUUFBYyx1RUFBSCxDQUFHOztBQUN6QixVQUFPLEtBQUswRSxLQUFMLENBQ045QyxLQUFLLElBQUwsR0FBWSxLQUFLTSxJQUFMLENBQVUsQ0FBVixJQUFlTixDQUEzQixHQUErQixLQUFLTSxJQUFMLENBQVUsQ0FBVixDQUR6QixFQUVObUUsS0FBSyxJQUFMLEdBQVksS0FBS25FLElBQUwsQ0FBVSxDQUFWLElBQWVtRSxDQUEzQixHQUErQixLQUFLbkUsSUFBTCxDQUFVLENBQVYsQ0FGekIsRUFHTmxDLFFBSE0sQ0FBUDtBQUtBLEdBM1BhOztBQUFBO0FBQUEsR0FBNEJjLFVBQTVCO0FBQUEsQzs7Ozs7Ozs7Ozs7Ozs7O0FDSGY7Ozs7QUFDQTs7Ozs7Ozs7OztrQkFFZTtBQUFBO0FBQUE7O0FBQ2Qsb0JBQWM7QUFBQTs7QUFBQSxnREFDYixzQkFEYTs7QUFFYixTQUFLMkYsT0FBTCxHQUFlO0FBQ2RDLGlCQUFhLEtBREMsRUFDTztBQUNyQkMsbUJBQWUsSUFGRCxFQUVRO0FBQ3RCQyxvQkFBZ0IsRUFIRixFQUdPO0FBQ3JCQyxrQkFBYyxJQUpBLEVBSU87QUFDckJDLGVBQVcsS0FMRyxDQUtJO0FBTEosSUFBZjtBQUZhO0FBU2I7O0FBVmEsbUJBWWRDLGlCQVpjLDhCQVlJQyxNQVpKLEVBWVkxRixPQVpaLEVBWXFCO0FBQ2xDLFFBQUttRixPQUFMLENBQWFHLGNBQWIsR0FBOEJ0RixPQUE5QjtBQUNBLFFBQUttRixPQUFMLENBQWFRLGNBQWIsR0FBOEJELE1BQTlCO0FBQ0EsR0FmYTs7QUFpQmQ7OztBQWpCYyxtQkFrQmRFLE1BbEJjLG1CQWtCUGYsQ0FsQk8sRUFrQko7QUFDVCxPQUFJLENBQUMsS0FBS00sT0FBTCxDQUFhRyxjQUFiLENBQTRCTyxhQUE3QixJQUE4QyxLQUFLVixPQUFMLENBQWFLLFNBQS9ELEVBQTBFO0FBQ3pFO0FBQ0E7QUFDRCxPQUFNckgsTUFBTSxLQUFLeUQsR0FBTCxFQUFaO0FBQ0EsT0FBTXBFLE1BQU0sS0FBS3dDLE9BQUwsQ0FBYXhDLEdBQXpCO0FBQ0EsT0FBTUMsTUFBTSxLQUFLdUMsT0FBTCxDQUFhdkMsR0FBekI7O0FBRUEsUUFBSzRGLGFBQUwsQ0FBbUIsSUFBbkI7QUFDQSxRQUFLakIsS0FBTCxDQUFXNUUsR0FBWCxFQUFnQkMsR0FBaEIsRUFBcUIsS0FBS3VDLE9BQUwsQ0FBYXRDLFFBQWxDO0FBQ0E7Ozs7Ozs7Ozs7OztBQVlBLFFBQUsyRSxPQUFMLENBQWEsTUFBYixFQUFxQjtBQUNwQmxFLFNBQUtBLElBQUlKLE1BQUosRUFEZTtBQUVwQjRFLGlCQUFha0M7QUFGTyxJQUFyQjs7QUFLQSxRQUFLTSxPQUFMLENBQWFJLFlBQWIsR0FBNEJwSCxJQUFJSixNQUFKLEVBQTVCO0FBQ0EsUUFBS29ILE9BQUwsQ0FBYUMsV0FBYixHQUEyQixxQkFBV2xILFNBQVgsQ0FBcUJDLEdBQXJCLEVBQTBCWCxHQUExQixFQUErQkMsR0FBL0IsQ0FBM0I7QUFDQSxHQS9DYTs7QUFpRGQ7OztBQWpEYyxtQkFrRGRxSSxLQWxEYyxrQkFrRFJqQixDQWxEUSxFQWtETDtBQUNSLE9BQUksQ0FBQyxLQUFLa0IsZUFBTCxFQUFELElBQTJCLENBQUMsS0FBS1osT0FBTCxDQUFhSSxZQUE3QyxFQUEyRDtBQUMxRDtBQUNBO0FBQ0QsT0FBSXBILE1BQU0sS0FBS3lELEdBQUwsQ0FBUyxJQUFULENBQVY7QUFDQSxPQUFNcEUsTUFBTSxLQUFLd0MsT0FBTCxDQUFheEMsR0FBekI7QUFDQSxPQUFNQyxNQUFNLEtBQUt1QyxPQUFMLENBQWF2QyxHQUF6QjtBQUNBLE9BQU1FLFNBQVMsS0FBS3FDLE9BQUwsQ0FBYXJDLE1BQTVCO0FBQ0EsT0FBTXdDLFNBQVMsS0FBS0gsT0FBTCxDQUFhRyxNQUE1QjtBQUNBLE9BQU1tRixpQkFBaUIsS0FBS0gsT0FBTCxDQUFhRyxjQUFwQztBQUNBLE9BQU01SixZQUFZNEosZUFBZTVKLFNBQWpDO0FBQ0EsT0FBTXNLLFFBQVFWLGVBQWVVLEtBQTdCO0FBQ0EsT0FBTTdJLGdCQUFnQixxQkFBV04sbUJBQVgsQ0FDckJnSSxFQUFFL0gsS0FEbUIsRUFDWndJLGVBQWV2SSxjQURILENBQXRCO0FBRUEsT0FBTWtKLE1BQU0sQ0FDWDlGLE9BQU8sQ0FBUCxJQUFZeEMsT0FBTyxDQUFQLENBREQsRUFFWHdDLE9BQU8sQ0FBUCxJQUFZeEMsT0FBTyxDQUFQLENBRkQsRUFHWHdDLE9BQU8sQ0FBUCxJQUFZeEMsT0FBTyxDQUFQLENBSEQsRUFJWHdDLE9BQU8sQ0FBUCxJQUFZeEMsT0FBTyxDQUFQLENBSkQsQ0FBWjtBQU1BLE9BQUl1SSxVQUFVLEtBQWQ7O0FBRUE7QUFDQSxPQUFNQyxZQUFZLEtBQUtoQixPQUFMLENBQWFRLGNBQWIsQ0FBNEJTLE9BQTVCLENBQW9DRCxTQUF0RDs7QUFFQTtBQUNBLE9BQUlBLFNBQUosRUFBZTtBQUNkdEIsTUFBRXdCLE9BQUYsR0FBWXhCLEVBQUV5QixNQUFGLEdBQVdILFVBQVVHLE1BQWpDO0FBQ0F6QixNQUFFMEIsT0FBRixHQUFZMUIsRUFBRTJCLE1BQUYsR0FBV0wsVUFBVUssTUFBakM7QUFDQSxJQUhELE1BR087QUFDTjNCLE1BQUV3QixPQUFGLEdBQVksQ0FBWjtBQUNBeEIsTUFBRTBCLE9BQUYsR0FBWSxDQUFaO0FBQ0E7O0FBRUQ7QUFDQSxPQUFJLHFCQUFXckosWUFBWCxDQUF3QnhCLFNBQXhCLEVBQW1DeUIsYUFBbkMsQ0FBSixFQUF1RDtBQUN0RCxTQUFLZ0ksT0FBTCxDQUFhSSxZQUFiLENBQTBCLENBQTFCLEtBQWlDVixFQUFFd0IsT0FBRixHQUFZTCxNQUFNLENBQU4sQ0FBN0M7QUFDQUUsY0FBVSxJQUFWO0FBQ0E7QUFDRCxPQUFJLHFCQUFXOUksVUFBWCxDQUFzQjFCLFNBQXRCLEVBQWlDeUIsYUFBakMsQ0FBSixFQUFxRDtBQUNwRCxTQUFLZ0ksT0FBTCxDQUFhSSxZQUFiLENBQTBCLENBQTFCLEtBQWlDVixFQUFFMEIsT0FBRixHQUFZUCxNQUFNLENBQU4sQ0FBN0M7QUFDQUUsY0FBVSxJQUFWO0FBQ0E7QUFDRCxPQUFJQSxPQUFKLEVBQWE7QUFDWnJCLE1BQUU0QixRQUFGLENBQVdDLGNBQVg7QUFDQTdCLE1BQUU0QixRQUFGLENBQVdFLGVBQVg7QUFDQTtBQUNEOUIsS0FBRStCLGtCQUFGLEdBQXVCVixPQUF2QjtBQUNBOztBQUVBL0gsT0FBSSxDQUFKLElBQVMsS0FBS2dILE9BQUwsQ0FBYUksWUFBYixDQUEwQixDQUExQixDQUFUO0FBQ0FwSCxPQUFJLENBQUosSUFBUyxLQUFLZ0gsT0FBTCxDQUFhSSxZQUFiLENBQTBCLENBQTFCLENBQVQ7QUFDQXBILFNBQU0scUJBQVdXLGNBQVgsQ0FBMEJYLEdBQTFCLEVBQStCWCxHQUEvQixFQUFvQ0MsR0FBcEMsRUFBeUMsS0FBS3VDLE9BQUwsQ0FBYXRDLFFBQXRELENBQU47O0FBRUE7QUFDQSxPQUFJLEtBQUt5SCxPQUFMLENBQWFDLFdBQWIsSUFBNEIsQ0FBQyxxQkFBV2xILFNBQVgsQ0FBcUJDLEdBQXJCLEVBQTBCWCxHQUExQixFQUErQkMsR0FBL0IsQ0FBakMsRUFBc0U7QUFDckUsU0FBSzBILE9BQUwsQ0FBYUMsV0FBYixHQUEyQixLQUEzQjtBQUNBOztBQUVEO0FBQ0EsT0FBSXlCLFdBQUo7QUFDQSxPQUFJQyxXQUFKO0FBQ0EsT0FBSUMsV0FBSjs7QUFFQSxPQUFJLEtBQUs1QixPQUFMLENBQWFDLFdBQWpCLEVBQThCO0FBQzdCMEIsU0FBS3RKLElBQUksQ0FBSixJQUFTeUksSUFBSSxDQUFKLENBQWQ7QUFDQWMsU0FBS3RKLElBQUksQ0FBSixJQUFTd0ksSUFBSSxDQUFKLENBQWQ7QUFDQVksU0FBSzFJLElBQUksQ0FBSixDQUFMO0FBQ0E7QUFDQUEsUUFBSSxDQUFKLElBQVMwSSxLQUFLRSxFQUFMLEdBQVVBLEVBQVYsR0FBZ0JGLEtBQUtDLEVBQUwsR0FBVUEsRUFBVixHQUFlRCxFQUF4QztBQUNBQyxTQUFLdEosSUFBSSxDQUFKLElBQVN5SSxJQUFJLENBQUosQ0FBZDtBQUNBYyxTQUFLdEosSUFBSSxDQUFKLElBQVN3SSxJQUFJLENBQUosQ0FBZDtBQUNBWSxTQUFLMUksSUFBSSxDQUFKLENBQUw7QUFDQUEsUUFBSSxDQUFKLElBQVMwSSxLQUFLRSxFQUFMLEdBQVVBLEVBQVYsR0FBZ0JGLEtBQUtDLEVBQUwsR0FBVUEsRUFBVixHQUFlRCxFQUF4QztBQUNBO0FBQ0EsSUFYRCxNQVdPO0FBQ047QUFDQTtBQUNBLFFBQU1HLFlBQVksS0FBS3ZDLE9BQUwsQ0FBYSxPQUFiLElBQXdCLE9BQTFDOztBQUVBLFFBQUl0RyxJQUFJLENBQUosSUFBU1gsSUFBSSxDQUFKLENBQWIsRUFBcUI7QUFBRTtBQUN0QnFKLFVBQUssQ0FBQ3JKLElBQUksQ0FBSixJQUFTVyxJQUFJLENBQUosQ0FBVixLQUFxQjhILElBQUksQ0FBSixJQUFTZSxTQUE5QixDQUFMO0FBQ0E3SSxTQUFJLENBQUosSUFBU1gsSUFBSSxDQUFKLElBQVMsS0FBS2lILE9BQUwsQ0FBYW9DLEVBQWIsSUFBbUJaLElBQUksQ0FBSixDQUFyQztBQUNBLEtBSEQsTUFHTyxJQUFJOUgsSUFBSSxDQUFKLElBQVNWLElBQUksQ0FBSixDQUFiLEVBQXFCO0FBQUU7QUFDN0JvSixVQUFLLENBQUMxSSxJQUFJLENBQUosSUFBU1YsSUFBSSxDQUFKLENBQVYsS0FBcUJ3SSxJQUFJLENBQUosSUFBU2UsU0FBOUIsQ0FBTDtBQUNBN0ksU0FBSSxDQUFKLElBQVNWLElBQUksQ0FBSixJQUFTLEtBQUtnSCxPQUFMLENBQWFvQyxFQUFiLElBQW1CWixJQUFJLENBQUosQ0FBckM7QUFDQTtBQUNELFFBQUk5SCxJQUFJLENBQUosSUFBU1gsSUFBSSxDQUFKLENBQWIsRUFBcUI7QUFBRTtBQUN0QnFKLFVBQUssQ0FBQ3JKLElBQUksQ0FBSixJQUFTVyxJQUFJLENBQUosQ0FBVixLQUFxQjhILElBQUksQ0FBSixJQUFTZSxTQUE5QixDQUFMO0FBQ0E3SSxTQUFJLENBQUosSUFBU1gsSUFBSSxDQUFKLElBQVMsS0FBS2lILE9BQUwsQ0FBYW9DLEVBQWIsSUFBbUJaLElBQUksQ0FBSixDQUFyQztBQUNBLEtBSEQsTUFHTyxJQUFJOUgsSUFBSSxDQUFKLElBQVNWLElBQUksQ0FBSixDQUFiLEVBQXFCO0FBQUU7QUFDN0JvSixVQUFLLENBQUMxSSxJQUFJLENBQUosSUFBU1YsSUFBSSxDQUFKLENBQVYsS0FBcUJ3SSxJQUFJLENBQUosSUFBU2UsU0FBOUIsQ0FBTDtBQUNBN0ksU0FBSSxDQUFKLElBQVNWLElBQUksQ0FBSixJQUFTLEtBQUtnSCxPQUFMLENBQWFvQyxFQUFiLElBQW1CWixJQUFJLENBQUosQ0FBckM7QUFDQTtBQUNEO0FBQ0QsUUFBSzFELHVCQUFMLENBQTZCcEUsR0FBN0IsRUFBa0MsSUFBbEMsRUFBd0MwRyxDQUF4QztBQUNBLEdBbEphOztBQW9KZDs7O0FBcEpjLG1CQXFKZG9DLElBckpjLGlCQXFKVHBDLENBckpTLEVBcUpOO0FBQ1AsT0FBTTFHLE1BQU0sS0FBS3lELEdBQUwsRUFBWjs7QUFFQSxPQUFJLENBQUMsS0FBS21FLGVBQUwsRUFBRCxJQUEyQixDQUFDLEtBQUtaLE9BQUwsQ0FBYUksWUFBN0MsRUFBMkQ7QUFDMUQ7QUFDQTs7QUFFRDtBQUNBLE9BQUlWLEVBQUVqQyxRQUFGLEtBQWUsQ0FBbkIsQ0FBcUIsc0JBQXJCLEVBQTZDO0FBQzVDLFVBQUtTLGFBQUwsQ0FBbUIsS0FBbkI7QUFDQSxVQUFLaEIsT0FBTCxDQUFhLFNBQWIsRUFBd0I7QUFDdkIvRSxlQUFTYSxJQUFJSixNQUFKLEVBRGM7QUFFdkJSLGVBQVNZLElBQUlKLE1BQUosRUFGYztBQUd2QjRFLG1CQUFha0MsS0FBSztBQUhLLE1BQXhCO0FBS0EsS0FQRCxNQU9PO0FBQ04sUUFBTW5KLFlBQVksS0FBS3lKLE9BQUwsQ0FBYUcsY0FBYixDQUE0QjVKLFNBQTlDO0FBQ0EsUUFBTXNLLFFBQVEsS0FBS2IsT0FBTCxDQUFhRyxjQUFiLENBQTRCVSxLQUExQztBQUNBLFFBQUlrQixLQUFLMUssS0FBS1MsR0FBTCxDQUFTNEgsRUFBRXNDLFNBQVgsQ0FBVDtBQUNBLFFBQUlDLEtBQUs1SyxLQUFLUyxHQUFMLENBQVM0SCxFQUFFd0MsU0FBWCxDQUFUOztBQUVBLE1BQUUzTCxZQUFZLGtCQUFVTSxvQkFBeEIsTUFBa0RrTCxLQUFLLENBQXZEO0FBQ0EsTUFBRXhMLFlBQVksa0JBQVVPLGtCQUF4QixNQUFnRG1MLEtBQUssQ0FBckQ7O0FBRUEsUUFBTUUsU0FBUyxxQkFBV2pKLGdCQUFYLENBQTRCLENBQzFDNkksTUFBTXJDLEVBQUV5QixNQUFGLEdBQVcsQ0FBWCxHQUFlLENBQUMsQ0FBaEIsR0FBb0IsQ0FBMUIsSUFBK0JOLE1BQU0sQ0FBTixDQURXLEVBRTFDb0IsTUFBTXZDLEVBQUUyQixNQUFGLEdBQVcsQ0FBWCxHQUFlLENBQUMsQ0FBaEIsR0FBb0IsQ0FBMUIsSUFBK0JSLE1BQU0sQ0FBTixDQUZXLENBQTVCLEVBR1osS0FBS2hHLE9BQUwsQ0FBYXpCLFlBSEQsQ0FBZjtBQUlBLFFBQUloQixVQUFVLENBQUNZLElBQUksQ0FBSixJQUFTbUosT0FBTyxDQUFQLENBQVYsRUFBcUJuSixJQUFJLENBQUosSUFBU21KLE9BQU8sQ0FBUCxDQUE5QixDQUFkOztBQUVBL0osY0FBVSxxQkFBV0Ysc0JBQVgsQ0FBa0NjLEdBQWxDLEVBQXVDWixPQUF2QyxFQUNULEtBQUt5QyxPQUFMLENBQWF4QyxHQURKLEVBQ1MsS0FBS3dDLE9BQUwsQ0FBYXZDLEdBRHRCLEVBRVQsS0FBS3VDLE9BQUwsQ0FBYXRDLFFBRkosRUFFYyxLQUFLc0MsT0FBTCxDQUFhckMsTUFGM0IsQ0FBVjtBQUdBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBLFNBQUswRSxPQUFMLENBQWEsU0FBYixFQUF3QjtBQUN2Qi9FLGNBQVNhLElBQUlKLE1BQUosRUFEYztBQUV2QlIscUJBRnVCO0FBR3ZCb0Ysa0JBQWFrQyxLQUFLO0FBSEssS0FBeEI7QUFLQSxRQUFJMUcsSUFBSSxDQUFKLE1BQVdaLFFBQVEsQ0FBUixDQUFYLElBQXlCWSxJQUFJLENBQUosTUFBV1osUUFBUSxDQUFSLENBQXhDLEVBQW9EO0FBQ25ELFVBQUt1RyxVQUFMLENBQWdCdkcsT0FBaEIsRUFBeUIsSUFBekIsRUFBK0JzSCxLQUFLLElBQXBDO0FBQ0EsS0FGRCxNQUVPO0FBQ04sVUFBS3hCLGFBQUwsQ0FBbUIsS0FBbkI7QUFDQTtBQUNEO0FBQ0QsUUFBSzhCLE9BQUwsQ0FBYUksWUFBYixHQUE0QixJQUE1QjtBQUNBLEdBbE5hOztBQUFBLG1CQW9OZFEsZUFwTmMsOEJBb05JO0FBQ2pCO0FBQ0EsVUFBTyxLQUFLWixPQUFMLENBQWFHLGNBQWIsQ0FBNEJPLGFBQTVCLElBQTZDLEtBQUtWLE9BQUwsQ0FBYUssU0FBakU7QUFDQSxHQXZOYTs7QUFBQSxtQkF5TmRuQyxhQXpOYywwQkF5TkFtQyxTQXpOQSxFQXlOVztBQUN4QixJQUFDLEtBQUtMLE9BQUwsQ0FBYUcsY0FBYixDQUE0Qk8sYUFBN0IsS0FDQyxLQUFLVixPQUFMLENBQWFLLFNBQWIsR0FBeUJBLFNBRDFCO0FBRUEsR0E1TmE7O0FBQUE7QUFBQSxHQUE0QmhHLFVBQTVCO0FBQUEsQzs7Ozs7Ozs7Ozs7Ozs7O0FDSGY7Ozs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBSSw4QkFBa0IsV0FBdEIsRUFBbUM7QUFDbEMsT0FBTSxJQUFJd0UsS0FBSixtRkFBTjtBQUNBOztJQUVvQnVELGE7QUFDcEIsMEJBQWM7QUFBQTs7QUFDYixPQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0E7O3lCQUVEQyxhLDBCQUFjdEksRSxFQUFJdUksVyxFQUFhQyxVLEVBQVlDLE8sRUFBUztBQUNuRCxNQUFJO0FBQ0g7QUFDQSxVQUFPLEtBQUtDLG1CQUFMLENBQXlCLElBQUksbUJBQU9DLE9BQVgsQ0FBbUIzSSxFQUFuQixFQUF1QjtBQUN0RDRJLGlCQUFhLENBQ1osQ0FDQyxtQkFBT0MsR0FEUixFQUNhO0FBQ1h0TSxnQkFBV2dNLFlBQVloTSxTQURaO0FBRVh1TSxnQkFBVztBQUZBLEtBRGIsQ0FEWSxDQUR5Qzs7QUFVdEQ7QUFDQTtBQUNBQyxjQUFVO0FBQ1RDLGlCQUFZLE1BREg7QUFFVEMsa0JBQWEsTUFGSjtBQUdUQyxtQkFBYyxNQUhMO0FBSVRDLGVBQVU7QUFKRCxLQVo0QztBQWtCdERYO0FBbEJzRCxJQUF2QixDQUF6QixFQW1CSEQsV0FuQkcsRUFtQlVFLE9BbkJWLENBQVA7QUFvQkEsR0F0QkQsQ0FzQkUsT0FBTy9DLENBQVAsRUFBVTtBQUNYLFVBQU8sSUFBUDtBQUNBO0FBQ0QsRTs7eUJBRUQ5RCxHLGdCQUFJRCxPLEVBQVNkLE8sRUFBUzRILE8sRUFBUztBQUM5QixNQUFNekksS0FBSyxhQUFNRCxVQUFOLENBQWlCNEIsT0FBakIsQ0FBWDtBQUNBLE1BQUl5SCxXQUFXcEosR0FBR3FKLFlBQUgsbUJBQWY7QUFDQSxNQUFNZCxjQUFjekgsT0FBT0MsTUFBUCxDQUFjO0FBQ2pDeEUsY0FBVyxrQkFBVVEsYUFEWTtBQUVqQzhKLFVBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQUYwQjtBQUdqQ2pKLG1CQUFnQixFQUhpQjtBQUlqQzhJLGtCQUFlLElBSmtCO0FBS2pDNEMsY0FBVyxDQUFDLE9BQUQsRUFBVSxPQUFWO0FBTHNCLEdBQWQsRUFNakJ6SSxPQU5pQixDQUFwQjtBQU9BLE1BQU0ySCxhQUFhLEtBQUtlLGdCQUFMLENBQXNCaEIsWUFBWWUsU0FBbEMsQ0FBbkI7O0FBRUEsTUFBSSxDQUFDZCxVQUFMLEVBQWlCO0FBQ2hCO0FBQ0E7O0FBRUQsTUFBSVksUUFBSixFQUFjO0FBQ2IsUUFBS2YsUUFBTCxDQUFjZSxRQUFkLEVBQXdCN0MsTUFBeEIsQ0FBK0I3RCxPQUEvQjtBQUNBLEdBRkQsTUFFTztBQUNOMEcsY0FBVy9MLEtBQUsyRyxLQUFMLENBQVczRyxLQUFLbU0sTUFBTCxLQUFnQixJQUFJbkYsSUFBSixHQUFXQyxPQUFYLEVBQTNCLENBQVg7QUFDQTtBQUNELE9BQUsrRCxRQUFMLENBQWNlLFFBQWQsSUFBMEI7QUFDekI3QyxXQUFRLEtBQUsrQixhQUFMLENBQ1B0SSxFQURPLEVBRVB1SSxXQUZPLEVBR1BDLFVBSE8sRUFJUEMsT0FKTyxDQURpQjtBQU96QnpJLFNBUHlCO0FBUXpCYSxZQUFTMEg7QUFSZ0IsR0FBMUI7QUFVQXZJLEtBQUd5SixZQUFILG9CQUEyQkwsUUFBM0I7QUFDQSxFOzt5QkFFRHRILE0sbUJBQU9ILE8sRUFBUztBQUNmLE1BQU0zQixLQUFLLGFBQU1ELFVBQU4sQ0FBaUI0QixPQUFqQixDQUFYO0FBQ0EsTUFBTVEsTUFBTW5DLEdBQUdxSixZQUFILG1CQUFaOztBQUVBLE1BQUlsSCxHQUFKLEVBQVM7QUFDUixRQUFLa0csUUFBTCxDQUFjbEcsR0FBZCxFQUFtQm9FLE1BQW5CLENBQTBCN0QsT0FBMUI7QUFDQSxVQUFPLEtBQUsyRixRQUFMLENBQWNsRyxHQUFkLENBQVA7QUFDQW5DLE1BQUcwSixlQUFIO0FBQ0E7QUFDRCxFOzt5QkFFRDNILFMsc0JBQVVKLE8sRUFBUztBQUNsQixNQUFNZ0ksT0FBTyxLQUFLbEgsR0FBTCxDQUFTZCxPQUFULENBQWI7O0FBRUEsU0FBT2dJLE9BQU9BLEtBQUtwRCxNQUFaLEdBQXFCLElBQTVCO0FBQ0EsRTs7eUJBRUQ5RCxHLGdCQUFJZCxPLEVBQVM7QUFDWixNQUFNM0IsS0FBSyxhQUFNRCxVQUFOLENBQWlCNEIsT0FBakIsQ0FBWDtBQUNBLE1BQU1RLE1BQU1uQyxLQUFLQSxHQUFHcUosWUFBSCxtQkFBTCxHQUFrQyxJQUE5Qzs7QUFFQSxNQUFJbEgsT0FBTyxLQUFLa0csUUFBTCxDQUFjbEcsR0FBZCxDQUFYLEVBQStCO0FBQzlCLFVBQU8sS0FBS2tHLFFBQUwsQ0FBY2xHLEdBQWQsQ0FBUDtBQUNBLEdBRkQsTUFFTztBQUNOLFVBQU8sSUFBUDtBQUNBO0FBQ0QsRTs7eUJBRUR1RyxtQixnQ0FBb0JuQyxNLEVBQVExRixPLEVBQVM0SCxPLEVBQVM7QUFDN0MsTUFBTW1CLFNBQVNyRCxPQUFPOUQsR0FBUCxDQUFXLEtBQVgsRUFBa0I1QixPQUFsQixDQUEwQitJLE1BQXpDOztBQUVBO0FBQ0EsU0FBT3JELE9BQ0xzRCxFQURLLENBQ0YsY0FERSxFQUNjLGFBQUs7QUFDeEIsT0FBSW5FLEVBQUVvRSxPQUFOLEVBQWU7QUFDZDtBQUNBckIsWUFBUW5DLGlCQUFSLENBQTBCQyxNQUExQixFQUFrQzFGLE9BQWxDO0FBQ0ErSSxjQUFVbkIsUUFBUWhDLE1BQVIsQ0FBZWYsQ0FBZixDQUFWO0FBQ0EsSUFKRCxNQUlPLElBQUlBLEVBQUVxRSxPQUFOLEVBQWU7QUFDckI7QUFDQUgsY0FBVW5CLFFBQVFYLElBQVIsQ0FBYXBDLENBQWIsQ0FBVjtBQUNBO0FBQ0QsR0FWSyxFQVVIbUUsRUFWRyxDQVVBLGtCQVZBLEVBVW9CO0FBQUEsVUFBS3BCLFFBQVE5QixLQUFSLENBQWNqQixDQUFkLENBQUw7QUFBQSxHQVZwQixDQUFQO0FBV0E7QUFDQSxFOzt5QkFFRHNFLG1CLGdDQUFvQnpELE0sRUFBUTtBQUMzQkEsU0FBTzVELEdBQVAsQ0FBVyxzQ0FBWDtBQUNBLEU7O3lCQUVENEcsZ0IsK0JBQWlDO0FBQUEsTUFBaEJELFNBQWdCLHVFQUFKLEVBQUk7O0FBQ2hDLE1BQUlXLFdBQVcsS0FBZjtBQUNBLE1BQUlDLFdBQVcsS0FBZjtBQUNBLE1BQU1DLFNBQVNiLGFBQWEsRUFBNUI7O0FBRUFhLFNBQU8vSCxPQUFQLENBQWUsYUFBSztBQUNuQixXQUFRQyxDQUFSO0FBQ0MsU0FBSyxPQUFMO0FBQWU2SCxnQkFBVyxJQUFYLENBQWlCO0FBQ2hDLFNBQUssT0FBTDtBQUFlRDtBQUNmO0FBSEQ7QUFLQSxHQU5EO0FBT0EsU0FBUUEsWUFBWSxtQkFBT0csVUFBcEIsSUFDTEYsWUFBWSxtQkFBT0csVUFEZCxJQUM2QixJQURwQztBQUVBLEU7O3lCQUVEcEksWSx5QkFBYXFJLFEsRUFBVTNJLE8sRUFBUztBQUMvQixNQUFNNEksU0FBUztBQUNkWCxXQUFRVTtBQURNLEdBQWY7O0FBSUEsTUFBSTNJLE9BQUosRUFBYTtBQUNaLE9BQU00RSxTQUFTLEtBQUt4RSxTQUFMLENBQWVKLE9BQWYsQ0FBZjs7QUFFQTRFLGFBQVVBLE9BQU85RCxHQUFQLENBQVcsS0FBWCxFQUFrQitILEdBQWxCLENBQXNCRCxNQUF0QixDQUFWO0FBQ0EsR0FKRCxNQUlPO0FBQUU7QUFDUixRQUFLLElBQU01RSxDQUFYLElBQWdCLEtBQUswQyxRQUFyQixFQUErQjtBQUM5QixTQUFLQSxRQUFMLENBQWMxQyxDQUFkLEVBQWlCWSxNQUFqQixDQUF3QjlELEdBQXhCLENBQTRCLEtBQTVCLEVBQW1DK0gsR0FBbkMsQ0FBdUNELE1BQXZDO0FBQ0E7QUFDRDtBQUNELFNBQU8sSUFBUDtBQUNBLEU7O3lCQUVEN0gsTyxzQkFBVTtBQUNULE9BQUssSUFBTWlELENBQVgsSUFBZ0IsS0FBSzBDLFFBQXJCLEVBQStCO0FBQzlCLFFBQUtBLFFBQUwsQ0FBYzFDLENBQWQsRUFBaUJZLE1BQWpCLENBQXdCN0QsT0FBeEI7QUFDQSxRQUFLMkYsUUFBTCxDQUFjMUMsQ0FBZCxFQUFpQjNGLEVBQWpCLENBQW9CMEosZUFBcEI7QUFDQSxVQUFPLEtBQUtyQixRQUFMLENBQWMxQyxDQUFkLENBQVA7QUFDQTtBQUNELE9BQUswQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsRTs7Ozs7a0JBN0ptQkQsYTs7Ozs7OztBQ1JyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLENBQUM7QUFDRCxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxjQUFjO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDBCQUEwQixFQUFFO0FBQy9ELHlDQUF5QyxlQUFlO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsK0RBQStEO0FBQzdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsb0dBQW9HLG1CQUFtQixFQUFFLG1CQUFtQiw4SEFBOEg7O0FBRTFRLGdDQUFnQywyQ0FBMkMsZ0JBQWdCLGtCQUFrQixPQUFPLDJCQUEyQix3REFBd0QsZ0NBQWdDLHVEQUF1RCwyREFBMkQsRUFBRSxFQUFFLHlEQUF5RCxxRUFBcUUsNkRBQTZELG9CQUFvQixHQUFHLEVBQUU7O0FBRWpqQixpREFBaUQsMENBQTBDLDBEQUEwRCxFQUFFOztBQUV2SjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLE9BQU87QUFDbkIsYUFBYSxvQkFBb0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILHNCQUFzQjtBQUN0Qix1QkFBdUI7QUFDdkIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxFQUFFO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGNBQWMsUUFBUTtBQUN0QjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDJGQUEyRixjQUFjO0FBQ3pHO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkIsYUFBYSxTQUFTO0FBQ3RCLGNBQWMsYUFBYTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLHVFQUF1RSxlQUFlO0FBQ3RGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixjQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkIsYUFBYSxTQUFTO0FBQ3RCLGNBQWMsYUFBYTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxVQUFVO0FBQ3ZCLGFBQWEsU0FBUztBQUN0QixjQUFjLGFBQWE7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msa0NBQWtDO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBLENBQUM7O0FBRUQsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBOztBQUVBLE9BQU87QUFDUDtBQUNBLENBQUM7QUFDRCxxQzs7Ozs7O0FDeFpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsU0FBUztBQUNwQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELFVBQVU7O0FBRS9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFVBQVU7QUFDckIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCLDBCQUEwQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsaUJBQWlCO0FBQzVCLFdBQVcsTUFBTTtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLFdBQVcsRUFBRTtBQUNiLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxZQUFZO0FBQ3ZCLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLFdBQVcsWUFBWTtBQUN2QixXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsWUFBWTtBQUN2QixXQUFXLFlBQVk7QUFDdkIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsWUFBWSxlQUFlO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU0sT0FBTyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7QUFDM0MsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsUUFBUTtBQUNuQixhQUFhLE1BQU0sR0FBRyxLQUFLLEVBQUUsS0FBSztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsaUJBQWlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxZQUFZO0FBQ3ZCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxTQUFTO0FBQ3BCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsRUFBRTs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTyxLQUFLO0FBQ3ZCLFdBQVcsT0FBTyxLQUFLO0FBQ3ZCLFdBQVcsTUFBTTtBQUNqQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE1BQU07QUFDakIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsTUFBTTtBQUNqQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsTUFBTTtBQUNqQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCOztBQUV6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLENBQUM7O0FBRUQ7QUFDQSxVQUFVO0FBQ1YsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLGdCQUFnQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxDQUFDOztBQUVEO0FBQ0EsVUFBVTtBQUNWLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxnQkFBZ0I7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQiw2QkFBNkI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBLDRCQUE0Qiw4QkFBOEI7O0FBRTFEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBLGdCQUFnQjs7QUFFaEI7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLGVBQWUsV0FBVztBQUMxQixpQkFBaUIsV0FBVztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsZUFBZSxXQUFXO0FBQzFCLGlCQUFpQixXQUFXO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsZUFBZSxXQUFXO0FBQzFCLGlCQUFpQixXQUFXO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxlQUFlLFdBQVc7QUFDMUIsaUJBQWlCLFdBQVc7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsZUFBZSxXQUFXO0FBQzFCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDOztBQUVqQyxvQ0FBb0M7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixpQkFBaUIsTUFBTTtBQUN2QjtBQUNBLGtDQUFrQyxFQUFFOztBQUVwQztBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxnQ0FBZ0MsRUFBRTs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxrQkFBa0I7QUFDN0IsV0FBVyxXQUFXO0FBQ3RCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixpQkFBaUIsRUFBRTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FB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LFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsbUdBQW1HLEdBQUc7QUFDdEc7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUFBO0FBQ0wsQ0FBQztBQUNEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7OztBQ2xsRkQ7Ozs7OztBQUVBcUMsT0FBT0MsT0FBUCwwQiIsImZpbGUiOiJtb3ZhYmxlY29vcmQucGtnZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIk1vdmFibGVDb29yZFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJlZ1wiXSA9IHJvb3RbXCJlZ1wiXSB8fCB7fSwgcm9vdFtcImVnXCJdW1wiTW92YWJsZUNvb3JkXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiZTM3NDUxMmEyYjU4MDUwZGQ3ZiIsImltcG9ydCB7d2luZG93fSBmcm9tIFwiLi9icm93c2VyXCI7XG5cbi8qKlxuICogQG5hbWUgZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9OT05FXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKi9cbi8qKlxuICogQG5hbWUgZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9MRUZUXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4qL1xuLyoqXG4gKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX1JJR0hUXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4qL1xuLyoqXG4gKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX1VQXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKi9cbi8qKlxuICogQG5hbWUgZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9ET1dOXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4qL1xuLyoqXG4gKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX0hPUklaT05UQUxcbiAqIEBjb25zdGFudFxuICogQHR5cGUge051bWJlcn1cbiovXG4vKipcbiAqIEBuYW1lIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fVkVSVElDQUxcbiAqIEBjb25zdGFudFxuICogQHR5cGUge051bWJlcn1cbiovXG4vKipcbiAqIEBuYW1lIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fQUxMXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4qL1xuY29uc3QgZGlyZWN0aW9uID0ge1xuXHRESVJFQ1RJT05fTk9ORTogMSxcblx0RElSRUNUSU9OX0xFRlQ6IDIsXG5cdERJUkVDVElPTl9SSUdIVDogNCxcblx0RElSRUNUSU9OX1VQOiA4LFxuXHRESVJFQ1RJT05fRE9XTjogMTYsXG5cdERJUkVDVElPTl9IT1JJWk9OVEFMOiAyIHwgNCxcblx0RElSRUNUSU9OX1ZFUlRJQ0FMOiA4IHwgMTZcbn07XG5cbmRpcmVjdGlvbi5ESVJFQ1RJT05fQUxMID0gZGlyZWN0aW9uLkRJUkVDVElPTl9IT1JJWk9OVEFMIHxcblx0ZGlyZWN0aW9uLkRJUkVDVElPTl9WRVJUSUNBTDtcbmV4cG9ydCBjb25zdCBESVJFQ1RJT04gPSBkaXJlY3Rpb247XG5leHBvcnQgY29uc3QgVU5JUVVFS0VZID0gXCJfX01PVkFCTEVDT09SRF9fXCI7XG5leHBvcnQgY29uc3QgU1VQUE9SVF9UT1VDSCA9IFwib250b3VjaHN0YXJ0XCIgaW4gd2luZG93O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29uc3RzLmpzIiwiLyogZXNsaW50LWRpc2FibGUgbm8tbmV3LWZ1bmMsIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5jb25zdCB3aW4gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5NYXRoID09PSBNYXRoID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5NYXRoID09PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbi8qIGVzbGludC1lbmFibGUgbm8tbmV3LWZ1bmMsIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5cbmV4cG9ydCB7d2luIGFzIHdpbmRvd307XG5leHBvcnQgY29uc3QgZG9jdW1lbnQgPSB3aW4uZG9jdW1lbnQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYnJvd3Nlci5qcyIsImltcG9ydCB7RElSRUNUSU9OfSBmcm9tIFwiLi9jb25zdHNcIjtcblxuY29uc3QgQ29vcmRpbmF0ZSA9IHtcblx0Ly8gZ2V0IHVzZXIncyBkaXJlY3Rpb25cblx0Z2V0RGlyZWN0aW9uQnlBbmdsZShhbmdsZSwgdGhyZXNob2xkQW5nbGUpIHtcblx0XHRpZiAodGhyZXNob2xkQW5nbGUgPCAwIHx8IHRocmVzaG9sZEFuZ2xlID4gOTApIHtcblx0XHRcdHJldHVybiBESVJFQ1RJT04uRElSRUNUSU9OX05PTkU7XG5cdFx0fVxuXHRcdGNvbnN0IHRvQW5nbGUgPSBNYXRoLmFicyhhbmdsZSk7XG5cblx0XHRyZXR1cm4gdG9BbmdsZSA+IHRocmVzaG9sZEFuZ2xlICYmIHRvQW5nbGUgPCAxODAgLSB0aHJlc2hvbGRBbmdsZSA/XG5cdFx0XHRcdERJUkVDVElPTi5ESVJFQ1RJT05fVkVSVElDQUwgOiBESVJFQ1RJT04uRElSRUNUSU9OX0hPUklaT05UQUw7XG5cdH0sXG5cdGlzSG9yaXpvbnRhbChkaXJlY3Rpb24sIHVzZXJEaXJlY3Rpb24pIHtcblx0XHRyZXR1cm4gZGlyZWN0aW9uID09PSBESVJFQ1RJT04uRElSRUNUSU9OX0FMTCB8fFxuXHRcdFx0KGRpcmVjdGlvbiAmIERJUkVDVElPTi5ESVJFQ1RJT05fSE9SSVpPTlRBTCAmJlxuXHRcdFx0dXNlckRpcmVjdGlvbiAmIERJUkVDVElPTi5ESVJFQ1RJT05fSE9SSVpPTlRBTCk7XG5cdH0sXG5cdGlzVmVydGljYWwoZGlyZWN0aW9uLCB1c2VyRGlyZWN0aW9uKSB7XG5cdFx0cmV0dXJuIGRpcmVjdGlvbiA9PT0gRElSRUNUSU9OLkRJUkVDVElPTl9BTEwgfHxcblx0XHRcdChkaXJlY3Rpb24gJiBESVJFQ1RJT04uRElSRUNUSU9OX1ZFUlRJQ0FMICYmXG5cdFx0XHR1c2VyRGlyZWN0aW9uICYgRElSRUNUSU9OLkRJUkVDVElPTl9WRVJUSUNBTCk7XG5cdH0sXG5cdGdldFBvaW50T2ZJbnRlcnNlY3Rpb24oZGVwYVBvcywgZGVzdFBvcywgbWluLCBtYXgsIGNpcmN1bGFyLCBib3VuY2UpIHtcblx0XHRjb25zdCBib3hMVCA9IFttaW5bMF0gLSBib3VuY2VbM10sIG1pblsxXSAtIGJvdW5jZVswXV07XG5cdFx0Y29uc3QgYm94UkIgPSBbbWF4WzBdICsgYm91bmNlWzFdLCBtYXhbMV0gKyBib3VuY2VbMl1dO1xuXHRcdGNvbnN0IHRvRGVzdFBvcyA9IGRlc3RQb3MuY29uY2F0KCk7XG5cblx0XHRjb25zdCB4ZCA9IGRlc3RQb3NbMF0gLSBkZXBhUG9zWzBdO1xuXHRcdGNvbnN0IHlkID0gZGVzdFBvc1sxXSAtIGRlcGFQb3NbMV07XG5cblx0XHRpZiAoIWNpcmN1bGFyWzNdKSB7XG5cdFx0XHR0b0Rlc3RQb3NbMF0gPSBNYXRoLm1heChib3hMVFswXSwgdG9EZXN0UG9zWzBdKTtcblx0XHR9IC8vIGxlZnRcblx0XHRpZiAoIWNpcmN1bGFyWzFdKSB7XG5cdFx0XHR0b0Rlc3RQb3NbMF0gPSBNYXRoLm1pbihib3hSQlswXSwgdG9EZXN0UG9zWzBdKTtcblx0XHR9IC8vIHJpZ2h0XG5cdFx0dG9EZXN0UG9zWzFdID0geGQgPyBkZXBhUG9zWzFdICsgeWQgLyB4ZCAqICh0b0Rlc3RQb3NbMF0gLSBkZXBhUG9zWzBdKSA6XG5cdFx0XHRcdFx0XHR0b0Rlc3RQb3NbMV07XG5cblx0XHRpZiAoIWNpcmN1bGFyWzBdKSB7XG5cdFx0XHR0b0Rlc3RQb3NbMV0gPSBNYXRoLm1heChib3hMVFsxXSwgdG9EZXN0UG9zWzFdKTtcblx0XHR9IC8vIHVwXG5cdFx0aWYgKCFjaXJjdWxhclsyXSkge1xuXHRcdFx0dG9EZXN0UG9zWzFdID0gTWF0aC5taW4oYm94UkJbMV0sIHRvRGVzdFBvc1sxXSk7XG5cdFx0fSAvLyBkb3duXG5cdFx0dG9EZXN0UG9zWzBdID0geWQgPyBkZXBhUG9zWzBdICsgeGQgLyB5ZCAqICh0b0Rlc3RQb3NbMV0gLSBkZXBhUG9zWzFdKSA6XG5cdFx0XHRcdFx0XHR0b0Rlc3RQb3NbMF07XG5cdFx0cmV0dXJuIFtcblx0XHRcdE1hdGgubWluKG1heFswXSwgTWF0aC5tYXgobWluWzBdLCB0b0Rlc3RQb3NbMF0pKSxcblx0XHRcdE1hdGgubWluKG1heFsxXSwgTWF0aC5tYXgobWluWzFdLCB0b0Rlc3RQb3NbMV0pKVxuXHRcdF07XG5cdH0sXG5cdC8vIGRldGVybWluZSBvdXRzaWRlXG5cdGlzT3V0c2lkZShwb3MsIG1pbiwgbWF4KSB7XG5cdFx0cmV0dXJuIHBvc1swXSA8IG1pblswXSB8fCBwb3NbMV0gPCBtaW5bMV0gfHxcblx0XHRcdHBvc1swXSA+IG1heFswXSB8fCBwb3NbMV0gPiBtYXhbMV07XG5cdH0sXG5cdC8vIGZyb20gb3V0c2lkZSB0byBvdXRzaWRlXG5cdGlzT3V0VG9PdXQocG9zLCBkZXN0UG9zLCBtaW4sIG1heCkge1xuXHRcdHJldHVybiAocG9zWzBdIDwgbWluWzBdIHx8IHBvc1swXSA+IG1heFswXSB8fFxuXHRcdFx0cG9zWzFdIDwgbWluWzFdIHx8IHBvc1sxXSA+IG1heFsxXSkgJiZcblx0XHRcdChkZXN0UG9zWzBdIDwgbWluWzBdIHx8IGRlc3RQb3NbMF0gPiBtYXhbMF0gfHxcblx0XHRcdGRlc3RQb3NbMV0gPCBtaW5bMV0gfHwgZGVzdFBvc1sxXSA+IG1heFsxXSk7XG5cdH0sXG5cdGdldE5leHRPZmZzZXRQb3Moc3BlZWRzLCBkZWNlbGVyYXRpb24pIHtcblx0XHRjb25zdCBub3JtYWxTcGVlZCA9IE1hdGguc3FydChcblx0XHRcdHNwZWVkc1swXSAqIHNwZWVkc1swXSArIHNwZWVkc1sxXSAqIHNwZWVkc1sxXVxuXHRcdCk7XG5cdFx0Y29uc3QgZHVyYXRpb24gPSBNYXRoLmFicyhub3JtYWxTcGVlZCAvIC1kZWNlbGVyYXRpb24pO1xuXG5cdFx0cmV0dXJuIFtcblx0XHRcdHNwZWVkc1swXSAvIDIgKiBkdXJhdGlvbixcblx0XHRcdHNwZWVkc1sxXSAvIDIgKiBkdXJhdGlvblxuXHRcdF07XG5cdH0sXG5cdGdldER1cmF0aW9uRnJvbVBvcyhwb3MsIGRlY2VsZXJhdGlvbikge1xuXHRcdGNvbnN0IG5vcm1hbFBvcyA9IE1hdGguc3FydChwb3NbMF0gKiBwb3NbMF0gKyBwb3NbMV0gKiBwb3NbMV0pO1xuXHRcdGNvbnN0IGR1cmF0aW9uID0gTWF0aC5zcXJ0KFxuXHRcdFx0bm9ybWFsUG9zIC8gZGVjZWxlcmF0aW9uICogMlxuXHRcdCk7XG5cblx0XHQvLyB3aGVuIGR1cmF0aW9uIGlzIHVuZGVyIDEwMCwgdGhlbiB2YWx1ZSBpcyB6ZXJvXG5cdFx0cmV0dXJuIGR1cmF0aW9uIDwgMTAwID8gMCA6IGR1cmF0aW9uO1xuXHR9LFxuXHRpc0NpcmN1bGFyKGRlc3RQb3MsIG1pbiwgbWF4LCBjaXJjdWxhcikge1xuXHRcdHJldHVybiAoY2lyY3VsYXJbMF0gJiYgZGVzdFBvc1sxXSA8IG1pblsxXSkgfHxcblx0XHRcdFx0KGNpcmN1bGFyWzFdICYmIGRlc3RQb3NbMF0gPiBtYXhbMF0pIHx8XG5cdFx0XHRcdChjaXJjdWxhclsyXSAmJiBkZXN0UG9zWzFdID4gbWF4WzFdKSB8fFxuXHRcdFx0XHQoY2lyY3VsYXJbM10gJiYgZGVzdFBvc1swXSA8IG1pblswXSk7XG5cdH0sXG5cdGdldENpcmN1bGFyUG9zKHBvcywgbWluLCBtYXgsIGNpcmN1bGFyKSB7XG5cdFx0Y29uc3QgdG9Qb3MgPSBwb3MuY29uY2F0KCk7XG5cblx0XHRpZiAoY2lyY3VsYXJbMF0gJiYgdG9Qb3NbMV0gPCBtaW5bMV0pIHsgLy8gdXBcblx0XHRcdHRvUG9zWzFdID0gKHRvUG9zWzFdIC0gbWluWzFdKSAlIChtYXhbMV0gLSBtaW5bMV0gKyAxKSArIG1heFsxXTtcblx0XHR9XG5cdFx0aWYgKGNpcmN1bGFyWzFdICYmIHRvUG9zWzBdID4gbWF4WzBdKSB7IC8vIHJpZ2h0XG5cdFx0XHR0b1Bvc1swXSA9ICh0b1Bvc1swXSAtIG1pblswXSkgJSAobWF4WzBdIC0gbWluWzBdICsgMSkgKyBtaW5bMF07XG5cdFx0fVxuXHRcdGlmIChjaXJjdWxhclsyXSAmJiB0b1Bvc1sxXSA+IG1heFsxXSkgeyAvLyBkb3duXG5cdFx0XHR0b1Bvc1sxXSA9ICh0b1Bvc1sxXSAtIG1pblsxXSkgJSAobWF4WzFdIC0gbWluWzFdICsgMSkgKyBtaW5bMV07XG5cdFx0fVxuXHRcdGlmIChjaXJjdWxhclszXSAmJiB0b1Bvc1swXSA8IG1pblswXSkgeyAvLyBsZWZ0XG5cdFx0XHR0b1Bvc1swXSA9ICh0b1Bvc1swXSAtIG1pblswXSkgJSAobWF4WzBdIC0gbWluWzBdICsgMSkgKyBtYXhbMF07XG5cdFx0fVxuXG5cdFx0dG9Qb3NbMF0gPSArdG9Qb3NbMF0udG9GaXhlZCg1KTtcblx0XHR0b1Bvc1sxXSA9ICt0b1Bvc1sxXS50b0ZpeGVkKDUpO1xuXHRcdHJldHVybiB0b1Bvcztcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29vcmRpbmF0ZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb29yZGluYXRlLmpzIiwiaW1wb3J0IHt3aW5kb3csIGRvY3VtZW50fSBmcm9tIFwiLi9icm93c2VyXCI7XG5cbmNvbnN0IHV0aWxzID0ge1xuXHRnZXRFbGVtZW50KGVsKSB7XG5cdFx0aWYgKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuXHRcdH0gZWxzZSBpZiAod2luZG93LmpRdWVyeSAmJiAoZWwgaW5zdGFuY2VvZiBqUXVlcnkpKSB7XG5cdFx0XHQvLyBpZiB5b3Ugd2VyZSB1c2luZyBqUXVlcnlcblx0XHRcdHJldHVybiBlbC5sZW5ndGggPiAwID8gZWxbMF0gOiBudWxsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fVxuXHR9XG59O1xuXG5jbGFzcyBNaXhpbkJ1aWxkZXIge1xuXHRjb25zdHJ1Y3RvcihzdXBlcmNsYXNzKSB7XG5cdFx0dGhpcy5zdXBlcmNsYXNzID0gc3VwZXJjbGFzcyB8fCBjbGFzcyB7fTtcblx0fVxuXHR3aXRoKC4uLm1peGlucykge1xuXHRcdHJldHVybiBtaXhpbnMucmVkdWNlKChjLCBtKSA9PiBtKGMpLCB0aGlzLnN1cGVyY2xhc3MpO1xuXHR9XG59XG5cbmNvbnN0IE1peGluID0gc3VwZXJjbGFzcyA9PiBuZXcgTWl4aW5CdWlsZGVyKHN1cGVyY2xhc3MpO1xuXG5leHBvcnQge01peGluLCB1dGlsc307XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMuanMiLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZWdqcy9jb21wb25lbnRcIjtcbmltcG9ydCBIYW1tZXJNYW5hZ2VyIGZyb20gXCIuL2hhbW1lck1hbmFnZXJcIjtcbmltcG9ydCBFdmVudEhhbmRsZXIgZnJvbSBcIi4vZXZlbnRIYW5kbGVyXCI7XG5pbXBvcnQgQW5pbWF0aW9uSGFuZGxlciBmcm9tIFwiLi9hbmltYXRpb25IYW5kbGVyXCI7XG5pbXBvcnQge0RJUkVDVElPTn0gZnJvbSBcIi4vY29uc3RzXCI7XG5pbXBvcnQge01peGlufSBmcm9tIFwiLi91dGlsc1wiO1xuXG4vKipcbiAqIEEgbW9kdWxlIHVzZWQgdG8gY2hhbmdlIHRoZSBpbmZvcm1hdGlvbiBvZiB1c2VyIGFjdGlvbiBlbnRlcmVkIGJ5IHZhcmlvdXMgaW5wdXQgZGV2aWNlcyBzdWNoIGFzIHRvdWNoIHNjcmVlbiBvciBtb3VzZSBpbnRvIGxvZ2ljYWwgY29vcmRpbmF0ZXMgd2l0aGluIHRoZSB2aXJ0dWFsIGNvb3JkaW5hdGUgc3lzdGVtLiBUaGUgY29vcmRpbmF0ZSBpbmZvcm1hdGlvbiBzb3J0ZWQgYnkgdGltZSBldmVudHMgb2NjdXJyZWQgaXMgcHJvdmlkZWQgaWYgYW5pbWF0aW9ucyBhcmUgbWFkZSBieSB1c2VyIGFjdGlvbnMuIFlvdSBjYW4gaW1wbGVtZW50IGEgdXNlciBpbnRlcmZhY2UgYnkgYXBwbHlpbmcgdGhlIGxvZ2ljYWwgY29vcmRpbmF0ZXMgcHJvdmlkZWQuIEZvciBtb3JlIGluZm9ybWF0aW9uIG9uIHRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlLCBzZWUgZGVtb3MuXG4gKiBAa28g7YSw7LmYIOyeheugpSDsnqXsuZjrgpgg66eI7Jqw7Iqk7JmAIOqwmeydgCDri6TslpHtlZwg7J6F66ClIOyepey5mOuhnCDsoITri6wg67Cb7J2AIOyCrOyaqeyekOydmCDrj5nsnpHsnYQg6rCA7IOBIOyijO2RnOqzhOydmCDrhbzrpqzsoIEg7KKM7ZGc66GcIOuzgOqyve2VmOuKlCDrqqjrk4guIOyCrOyaqeyekOydmCDrj5nsnpHsnLzroZwg7JWg64uI66mU7J207IWY7J20IOydvOyWtOuCmOuptCDsi5zqsITsiJzsnLzroZwg67OA6rK965CY64qUIOyijO2RnCDsoJXrs7Trj4Qg7KCc6rO17ZWc64ukLiDrs4Dqsr3rkJwg64W866as7KCBIOyijO2RnOulvCDrsJjsmIHtlbQgVUnrpbwg6rWs7ZiE7ZWgIOyImCDsnojri6QuIGVnLk1vdmFibGVDb29yZCDrqqjrk4jsnZgg7J6Q7IS47ZWcIOyekeuPmSDrsKnsi53snYAg642w66qo66W8IOywuOqzoO2VnOuLpC5cbiAqIEBjbGFzc1xuICogQG5hbWUgZWcuTW92YWJsZUNvb3JkXG4gKiBAZXh0ZW5kcyBlZy5Db21wb25lbnRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUaGUgb3B0aW9uIG9iamVjdCBvZiB0aGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZTxrbz5lZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2YIOyYteyFmCDqsJ3ssrQ8L2tvPlxuICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5taW4gVGhlIG1pbmltdW0gdmFsdWUgb2YgWCBhbmQgWSBjb29yZGluYXRlcyA8a28+7KKM7ZGc6rOE7J2YIOy1nOyGn+qwkjwva28+XG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWluLjA9MF0gVGhlIFggY29vcmRpbmF0ZSBvZiB0aGUgbWluaW11bSA8a28+7LWc7IaMIHjsooztkZw8L2tvPlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1pbi4xPTBdIFRoZSBZIGNvb3JkaW5hdGUgb2YgdGhlIG1pbmltdW0gPGtvPuy1nOyGjCB57KKM7ZGcPC9rbz5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLm1heCBUaGUgbWF4aW11bSB2YWx1ZSBvZiBYIGFuZCBZIGNvb3JkaW5hdGVzIDxrbz7sooztkZzqs4TsnZgg7LWc64yT6rCSPC9rbz5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5tYXguMD0xMDBdIFRoZSBYIGNvb3JkaW5hdGUgb2YgdGhlIG1heGltdW08a28+7LWc64yAIHjsooztkZw8L2tvPlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heC4xPTEwMF0gVGhlIFkgY29vcmRpbmF0ZSBvZiB0aGUgbWF4aW11bTxrbz7stZzrjIAgeeyijO2RnDwva28+XG4gKlxuICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5ib3VuY2UgVGhlIHNpemUgb2YgYm91bmNpbmcgYXJlYS4gVGhlIGNvb3JkaW5hdGVzIGNhbiBleGNlZWQgdGhlIGNvb3JkaW5hdGUgYXJlYSBhcyBtdWNoIGFzIHRoZSBib3VuY2luZyBhcmVhIGJhc2VkIG9uIHVzZXIgYWN0aW9uLiBJZiB0aGUgY29vcmRpbmF0ZXMgZG9lcyBub3QgZXhjZWVkIHRoZSBib3VuY2luZyBhcmVhIHdoZW4gYW4gZWxlbWVudCBpcyBkcmFnZ2VkLCB0aGUgY29vcmRpbmF0ZXMgd2hlcmUgYm91bmNpbmcgZWZmZWN0cyBhcmUgYXBwbGllZCBhcmUgcmV0dW5lZCBiYWNrIGludG8gdGhlIGNvb3JkaW5hdGUgYXJlYTxrbz7rsJTsmrTsiqQg7JiB7Jet7J2YIO2BrOq4sC4g7IKs7Jqp7J6Q7J2YIOuPmeyekeyXkCDrlLDrnbwg7KKM7ZGc6rCAIOyijO2RnCDsmIHsl63snYQg64SY7Ja0IOuwlOyatOyKpCDsmIHsl63snZgg7YGs6riw66eM7YG8IOuNlCDsnbTrj5ntlaAg7IiYIOyeiOuLpC4g7IKs7Jqp7J6Q6rCAIOuBjOyWtOuLpCDrhpPripQg64+Z7J6R7J2EIO2WiOydhCDrlYwg7KKM7ZGc6rCAIOuwlOyatOyKpCDsmIHsl63sl5Ag7J6I7Jy866m0LCDrsJTsmrTsiqQg7Zqo6rO86rCAIOyggeyaqeuQnCDsooztkZzqsIAg64uk7IucIOyijO2RnCDsmIHsl60g7JWI7Jy866GcIOuTpOyWtOyYqOuLpDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmJvdW5jZS4wPTEwXSBUaGUgc2l6ZSBvZiB0b3AgYXJlYSA8a28+7JyE7Kq9IOuwlOyatOyKpCDsmIHsl63snZgg7YGs6riwPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYm91bmNlLjE9MTBdIFRoZSBzaXplIG9mIHJpZ2h0IGFyZWEgPGtvPuyYpOuluOyqvSDrsJTsmrTsiqQg7JiB7Jet7J2YIO2BrOq4sDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmJvdW5jZS4yPTEwXSBUaGUgc2l6ZSBvZiBib3R0b20gYXJlYSA8a28+7JWE656Y7Kq9IOuwlOyatOyKpCDsmIHsl63snZgg7YGs6riwPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYm91bmNlLjM9MTBdIFRoZSBzaXplIG9mIGxlZnQgYXJlYSA8a28+7Jm87Kq9IOuwlOyatOyKpCDsmIHsl63snZgg7YGs6riwPC9rbz5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLm1hcmdpbiBUaGUgc2l6ZSBvZiBhY2Nlc3NpYmxlIHNwYWNlIG91dHNpZGUgdGhlIGNvb3JkaW5hdGUgYXJlYS4gSWYgYW4gZWxlbWVudCBpcyBkcmFnZ2VkIG91dHNpZGUgdGhlIGNvb3JkaW5hdGUgYXJlYSBhbmQgdGhlbiBkcm9wcGVkLCB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIGVsZW1lbnQgYXJlIHJldHVybmVkIGJhY2sgaW50byB0aGUgY29vcmRpbmF0ZSBhcmVhLiBUaGUgc2l6ZSBvZiBtYXJnaW5zIHRoYXQgY2FuIGJlIGV4Y2VlZGVkIDxrbz7iiJJcdOyijO2RnCDsmIHsl63snYQg64SY7Ja0IOydtOuPme2VoCDsiJgg7J6I64qUIOuwlOq5pSDsmIHsl63snZgg7YGs6riwLiDsgqzsmqnsnpDqsIAg7KKM7ZGc66W8IOuwlOq5pSDsmIHsl63quYzsp4Ag64GM7JeI64uk6rCAIOuGk+ycvOuptCDsooztkZzqsIAg7KKM7ZGcIOyYgeyXrSDslYjsnLzroZwg65Ok7Ja07Jio64ukLjwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1hcmdpbi4wPTBdIFRoZSBzaXplIG9mIHRvcCBtYXJnaW4gPGtvPuychOyqvSDrsJTquaUg7JiB7Jet7J2YIO2BrOq4sDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1hcmdpbi4xPTBdIFRoZSBzaXplIG9mIHJpZ2h0IG1hcmdpbiA8a28+7Jik66W47Kq9IOuwlOq5pSDsmIHsl63snZgg7YGs6riwPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWFyZ2luLjI9MF0gVGhlIHNpemUgb2YgYm90dG9tIG1hcmdpbiA8a28+7JWE656Y7Kq9IOuwlOq5pSDsmIHsl63snZgg7YGs6riwPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWFyZ2luLjM9MF0gVGhlIHNpemUgb2YgbGVmdCBtYXJnaW4gPGtvPuyZvOyqvSDrsJTquaUg7JiB7Jet7J2YIO2BrOq4sDwva28+XG4gKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLmNpcmN1bGFyIEluZGljYXRlcyB3aGV0aGVyIGEgY2lyY3VsYXIgZWxlbWVudCBpcyBhdmFpbGFibGUuIElmIGl0IGlzIHNldCB0byBcInRydWVcIiBhbmQgYW4gZWxlbWVudCBpcyBkcmFnZ2VkIG91dHNpZGUgdGhlIGNvb3JkaW5hdGUgYXJlYSwgdGhlIGVsZW1lbnQgd2lsbCBhcHBlYXIgb24gdGhlIG90aGVyIHNpZGUuPGtvPuyInO2ZmCDsl6zrtoAuICd0cnVlJ+uhnCDshKTsoJXtlZwg67Cp7Zal7J2YIOyijO2RnCDsmIHsl60g67CW7Jy866GcIOyXmOumrOuovO2KuOqwgCDsnbTrj5ntlZjrqbQg67CY64yAIOuwqe2WpeyXkOyEnCDsl5jrpqzrqLztirjqsIAg64KY7YOA64Kc64ukPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2lyY3VsYXIuMD1mYWxzZV0gSW5kaWNhdGVzIHdoZXRoZXIgdG8gY2lyY3VsYXRlIHRvIHRvcCA8a28+7JyE66GcIOyInO2ZmCDsl6zrtoA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jaXJjdWxhci4xPWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciB0byBjaXJjdWxhdGUgdG8gcmlnaHQgPGtvPuyYpOuluOyqveycvOuhnCDsiJztmZgg7Jes67aAPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2lyY3VsYXIuMj1mYWxzZV0gSW5kaWNhdGVzIHdoZXRoZXIgdG8gY2lyY3VsYXRlIHRvIGJvdHRvbSAgPGtvPuyVhOuemOuhnCDsiJztmZgg7Jes67aAPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2lyY3VsYXIuMz1mYWxzZV0gSW5kaWNhdGVzIHdoZXRoZXIgdG8gY2lyY3VsYXRlIHRvIGxlZnQgIDxrbz7smbzsqr3snLzroZwg7Iic7ZmYIOyXrOu2gDwva28+XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuZWFzaW5nPWVhc2luZy5lYXNlT3V0Q3ViaWNdIFRoZSBlYXNpbmcgZnVuY3Rpb24gdG8gYXBwbHkgdG8gYW4gYW5pbWF0aW9uIDxrbz7slaDri4jrqZTsnbTshZjsl5Ag7KCB7Jqp7ZWgIGVhc2luZyDtlajsiJg8L2tvPlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heGltdW1EdXJhdGlvbj1JbmZpbml0eV0gTWF4aW11bSBkdXJhdGlvbiBvZiB0aGUgYW5pbWF0aW9uIDxrbz7qsIDsho3rj4Tsl5Ag7J2Y7ZW0IOyVoOuLiOuplOydtOyFmOydtCDrj5nsnpHtlaAg65WM7J2YIOy1nOuMgCDsooztkZwg7J2064+ZIOyLnOqwhDwva28+XG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZGVjZWxlcmF0aW9uPTAuMDAwNl0gRGVjZWxlcmF0aW9uIG9mIHRoZSBhbmltYXRpb24gd2hlcmUgYWNjZWxlcmF0aW9uIGlzIG1hbnVhbGx5IGVuYWJsZWQgYnkgdXNlci4gQSBoaWdoZXIgdmFsdWUgaW5kaWNhdGVzIHNob3J0ZXIgcnVubmluZyB0aW1lLiA8a28+7IKs7Jqp7J6Q7J2YIOuPmeyekeycvOuhnCDqsIDsho3rj4TqsIAg7KCB7Jqp65CcIOyVoOuLiOuplOydtOyFmOydmCDqsJDsho3rj4QuIOqwkuydtCDrhpLsnYTsiJjroZ0g7JWg64uI66mU7J207IWYIOyLpO2WiSDsi5zqsITsnbQg7Ken7JWE7KeE64ukPC9rbz5cbiAqIEBzZWUgSGFtbWVySlMge0BsaW5rIGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW99XG4gKiBAc2VlIOKAoiBIYW1tZXIuSlMgYXBwbGllcyBzcGVjaWZpYyBDU1MgcHJvcGVydGllcyBieSBkZWZhdWx0IHdoZW4gY3JlYXRpbmcgYW4gaW5zdGFuY2UgKFNlZSB7QGxpbmsgaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby9qc2RvYy9IYW1tZXIuZGVmYXVsdHMuY3NzUHJvcHMuaHRtbH0pLiBUaGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZSByZW1vdmVzIGFsbCBkZWZhdWx0IENTUyBwcm9wZXJ0aWVzIHByb3ZpZGVkIGJ5IEhhbW1lci5KUyA8a28+SGFtbWVyLkpT64qUIOyduOyKpO2EtOyKpOulvCDsg53shLHtlaAg65WMIOq4sOuzuOycvOuhnCDtirnsoJUgQ1NTIOyGjeyEseydhCDsoIHsmqntlZzri6Qo7LC46rOgOiBAbGlua3todHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL2pzZG9jL0hhbW1lci5kZWZhdWx0cy5jc3NQcm9wcy5odG1sfSkuIO2Kueygle2VnCDsg4Htmansl5DshJzripQgSGFtbWVyLkpT7J2YIOyGjeyEsSDrlYzrrLjsl5Ag7IKs7Jqp7ISx7JeQIOusuOygnOqwgCDsnojsnYQg7IiYIOyeiOuLpC4gZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydgCBIYW1tZXIuSlPsnZgg6riw67O4IENTUyDsho3shLHsnYQg66qo65GQIOygnOqxsO2WiOuLpDwva28+XG4gKlxuICogQGNvZGVwZW4ge1wiaWRcIjpcImpQUHFlUlwiLCBcImtvXCI6XCJNb3ZhYmxlQ29vcmQgQ3ViZSDsmIjsoJxcIiwgXCJlblwiOlwiTW92YWJsZUNvb3JkIEN1YmUgZXhhbXBsZVwiLCBcImNvbGxlY3Rpb25JZFwiOlwiQUtwa0dXXCIsIFwiaGVpZ2h0XCI6IDQwM31cbiAqXG4gKiBAc2VlIEVhc2luZyBGdW5jdGlvbnMgQ2hlYXQgU2hlZXQge0BsaW5rIGh0dHA6Ly9lYXNpbmdzLm5ldC99XG4gKiBAc2VlIElmIHlvdSB3YW50IHRvIHRyeSBhIGRpZmZlcmVudCBlYXNpbmcgZnVuY3Rpb24sIHVzZSB0aGUgalF1ZXJ5IGVhc2luZyBwbHVnaW4gKHtAbGluayBodHRwOi8vZ3NnZC5jby51ay9zYW5kYm94L2pxdWVyeS9lYXNpbmd9KSBvciB0aGUgalF1ZXJ5IFVJIGVhc2luZyBsaWJyYXJ5ICh7QGxpbmsgaHR0cHM6Ly9qcXVlcnl1aS5jb20vZWFzaW5nfSkgPGtvPuuLpOuluCBlYXNpbmcg7ZWo7IiY66W8IOyCrOyaqe2VmOugpOuptCBqUXVlcnkgZWFzaW5nIO2UjOufrOq3uOyduCh7QGxpbmsgaHR0cDovL2dzZ2QuY28udWsvc2FuZGJveC9qcXVlcnkvZWFzaW5nfSnsnbTrgpgsIGpRdWVyeSBVSSBlYXNpbmcg65287J2067iM65+s66asKHtAbGluIGh0dHBzOi8vanF1ZXJ5dWkuY29tL2Vhc2luZ30p66W8IOyCrOyaqe2VnOuLpDwva28+XG4gKlxuICogQHN1cHBvcnQge1wiaWVcIjogXCIxMCtcIiwgXCJjaFwiIDogXCJsYXRlc3RcIiwgXCJmZlwiIDogXCJsYXRlc3RcIiwgIFwic2ZcIiA6IFwibGF0ZXN0XCIsIFwiZWRnZVwiIDogXCJsYXRlc3RcIiwgXCJpb3NcIiA6IFwiNytcIiwgXCJhblwiIDogXCIyLjMrIChleGNlcHQgMy54KVwifVxuICovXG5jb25zdCBNb3ZhYmxlQ29vcmQgPSBjbGFzcyBNb3ZhYmxlQ29vcmRcbmV4dGVuZHMgTWl4aW4oQ29tcG9uZW50KS53aXRoKEV2ZW50SGFuZGxlciwgQW5pbWF0aW9uSGFuZGxlcikge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucyA9IHtcblx0XHRcdG1pbjogWzAsIDBdLFxuXHRcdFx0bWF4OiBbMTAwLCAxMDBdLFxuXHRcdFx0Ym91bmNlOiBbMTAsIDEwLCAxMCwgMTBdLFxuXHRcdFx0bWFyZ2luOiBbMCwgMCwgMCwgMF0sXG5cdFx0XHRjaXJjdWxhcjogW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcblx0XHRcdGVhc2luZzogZnVuY3Rpb24gZWFzZU91dEN1YmljKHgpIHtcblx0XHRcdFx0cmV0dXJuIDEgLSBNYXRoLnBvdygxIC0geCwgMyk7XG5cdFx0XHR9LFxuXHRcdFx0bWF4aW11bUR1cmF0aW9uOiBJbmZpbml0eSxcblx0XHRcdGRlY2VsZXJhdGlvbjogMC4wMDA2XG5cdFx0fSwgb3B0aW9ucyk7XG5cdFx0dGhpcy5fcmV2aXNlT3B0aW9ucygpO1xuXHRcdHRoaXMuX2hhbW1lck1hbmFnZXIgPSBuZXcgSGFtbWVyTWFuYWdlcigpO1xuXHRcdHRoaXMuX3BvcyA9IHRoaXMub3B0aW9ucy5taW4uY29uY2F0KCk7XG5cdH1cblxuXHQvKipcblx0ICogUmVnaXN0ZXJzIGFuIGVsZW1lbnQgdG8gdXNlIHRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlLlxuXHQgKiBAa28gZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydhCDsgqzsmqntlaAg7JeY66as66i87Yq466W8IOuTseuhne2VnOuLpFxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNiaW5kXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8U3RyaW5nfGpRdWVyeX0gZWxlbWVudCBBbiBlbGVtZW50IHRvIHVzZSB0aGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZTxrbz7iiJJcdGVnLk1vdmFibGVDb29yZCDrqqjrk4jsnYQg7IKs7Jqp7ZWgIOyXmOumrOuovO2KuDwva28+XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFRoZSBvcHRpb24gb2JqZWN0IG9mIHRoZSBiaW5kKCkgbWV0aG9kIDxrbz5iaW5kKCkg66mU7ISc65Oc7J2YIOyYteyFmCDqsJ3ssrQ8L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZGlyZWN0aW9uPWVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fQUxMXSBDb29yZGluYXRlIGRpcmVjdGlvbiB0aGF0IGEgdXNlciBjYW4gbW92ZTxicj4tIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fQUxMOiBBbGwgZGlyZWN0aW9ucyBhdmFpbGFibGUuPGJyPi0gZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9IT1JJWk9OVEFMOiBIb3Jpem9udGFsIGRpcmVjdGlvbiBvbmx5Ljxicj4tIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fVkVSVElDQUw6IFZlcnRpY2FsIGRpcmVjdGlvbiBvbmx5PGtvPuyCrOyaqeyekOydmCDrj5nsnpHsnLzroZwg7JuA7KeB7J28IOyImCDsnojripQg7KKM7ZGc7J2YIOuwqe2WpS48YnI+LSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX0FMTDog66qo65OgIOuwqe2WpeycvOuhnCDsm4Dsp4Hsnbwg7IiYIOyeiOuLpC48YnI+LSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX0hPUklaT05UQUw6IOqwgOuhnCDrsKntlqXsnLzroZzrp4wg7JuA7KeB7J28IOyImCDsnojri6QuPGJyPi0gZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9WRVJUSUNBTDog7IS466GcIOuwqe2WpeycvOuhnOunjCDsm4Dsp4Hsnbwg7IiYIOyeiOuLpC48L2tvPlxuXHQgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnNjYWxlIENvb3JkaW5hdGUgc2NhbGUgdGhhdCBhIHVzZXIgY2FuIG1vdmU8a28+7IKs7Jqp7J6Q7J2YIOuPmeyekeycvOuhnCDsnbTrj5ntlZjripQg7KKM7ZGc7J2YIOuwsOycqDwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zY2FsZS4wPTFdIFgtYXhpcyBzY2FsZSA8a28+eOy2lSDrsLDsnKg8L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuc2NhbGUuMT0xXSBZLWF4aXMgc2NhbGUgPGtvPnnstpUg67Cw7JyoPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnRocmVzaG9sZEFuZ2xlPTQ1XSBUaGUgdGhyZXNob2xkIHZhbHVlIHRoYXQgZGV0ZXJtaW5lcyB3aGV0aGVyIHVzZXIgYWN0aW9uIGlzIGhvcml6b250YWwgb3IgdmVydGljYWwgKDB+OTApIDxrbz7sgqzsmqnsnpDsnZgg64+Z7J6R7J20IOqwgOuhnCDrsKntlqXsnbjsp4Ag7IS466GcIOuwqe2WpeyduOyngCDtjJDri6jtlZjripQg6riw7KSAIOqwgeuPhCgwfjkwKTwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5pbnRlcnJ1cHRhYmxlPXRydWVdIEluZGljYXRlcyB3aGV0aGVyIGFuIGFuaW1hdGlvbiBpcyBpbnRlcnJ1cHRpYmxlLjxicj4tIHRydWU6IEl0IGNhbiBiZSBwYXVzZWQgb3Igc3RvcHBlZCBieSB1c2VyIGFjdGlvbiBvciB0aGUgQVBJLjxicj4tIGZhbHNlOiBJdCBjYW5ub3QgYmUgcGF1c2VkIG9yIHN0b3BwZWQgYnkgdXNlciBhY3Rpb24gb3IgdGhlIEFQSSB3aGlsZSBpdCBpcyBydW5uaW5nLjxrbz7sp4Ttlokg7KSR7J24IOyVoOuLiOuplOydtOyFmCDspJHsp4Ag6rCA64qlIOyXrOu2gC48YnI+LSB0cnVlOiDsgqzsmqnsnpDsnZgg64+Z7J6R7J2064KYIEFQSeuhnCDslaDri4jrqZTsnbTshZjsnYQg7KSR7KeA7ZWgIOyImCDsnojri6QuPGJyPi0gZmFsc2U6IOyVoOuLiOuplOydtOyFmOydtCDsp4Ttlokg7KSR7J28IOuVjOuKlCDsgqzsmqnsnpDsnZgg64+Z7J6R7J2064KYIEFQSeqwgCDsoIHsmqnrkJjsp4Ag7JWK64qU64ukPC9rbz5cblx0ICogQHBhcmFtIHtBcnJheX0gW29wdGlvbnMuaW5wdXRUeXBlXSBUeXBlcyBvZiBpbnB1dCBkZXZpY2VzLiAoZGVmYXVsdDogW1widG91Y2hcIiwgXCJtb3VzZVwiXSk8YnI+LSB0b3VjaDogVG91Y2ggc2NyZWVuPGJyPi0gbW91c2U6IE1vdXNlIDxrbz7snoXroKUg7J6l7LmYIOyiheulmC4o6riw67O46rCSOiBbXCJ0b3VjaFwiLCBcIm1vdXNlXCJdKTxicj4tIHRvdWNoOiDthLDsuZgg7J6F66ClIOyepey5mDxicj4tIG1vdXNlOiDrp4jsmrDsiqQ8L2tvPlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtlZy5Nb3ZhYmxlQ29vcmR9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZiA8a28+66qo65OIIOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKi9cblx0YmluZChlbGVtZW50LCBvcHRpb25zKSB7XG5cdFx0dGhpcy5faGFtbWVyTWFuYWdlci5hZGQoZWxlbWVudCwgb3B0aW9ucywgdGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0LyoqXG5cdCAqIERldGFjaGVzIGFuIGVsZW1lbnQgdXNpbmcgdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUuXG5cdCAqIEBrbyBlZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2EIOyCrOyaqe2VmOuKlCDsl5jrpqzrqLztirjrpbwg7ZW07KCc7ZWc64ukXG5cdCAqIEBtZXRob2QgZWcuTW92YWJsZUNvb3JkI3VuYmluZFxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ3xqUXVlcnl9IGVsZW1lbnQgQW4gZWxlbWVudCBmcm9tIHdoaWNoIHRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlIGlzIGRldGFjaGVkPGtvPmVnLk1vdmFibGVDb29yZCDrqqjrk4jsnYQg7ZW07KCc7ZWgIOyXmOumrOuovO2KuDwva28+XG5cdCAqIEByZXR1cm4ge2VnLk1vdmFibGVDb29yZH0gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmPGtvPuuqqOuTiCDsnpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICovXG5cdHVuYmluZChlbGVtZW50KSB7XG5cdFx0dGhpcy5faGFtbWVyTWFuYWdlci5yZW1vdmUoZWxlbWVudCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogZ2V0IGEgaGFtbWVyIGluc3RhbmNlIGZyb20gZWxlbWVudHMgdXNpbmcgdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUuXG5cdCAqIEBrbyBlZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2EIOyCrOyaqe2VmOuKlCDsl5jrpqzrqLztirjsl5DshJwgaGFtbWVyIOqwneyytOulvCDslrvripTri6Rcblx0ICogQG1ldGhvZCBlZy5Nb3ZhYmxlQ29vcmQjZ2V0SGFtbWVyXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8U3RyaW5nfGpRdWVyeX0gZWxlbWVudCBBbiBlbGVtZW50IGZyb20gd2hpY2ggdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUgaXMgdXNpbmc8a28+ZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydhCDsgqzsmqntlZjripQg7JeY66as66i87Yq4PC9rbz5cblx0ICogQHJldHVybiB7SGFtbWVyfG51bGx9IEFuIGluc3RhbmNlIG9mIEhhbW1lci5KUzxrbz5IYW1tZXIuSlPsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICovXG5cdGdldEhhbW1lcihlbGVtZW50KSB7XG5cdFx0cmV0dXJuIHRoaXMuX2hhbW1lck1hbmFnZXIuZ2V0SGFtbWVyKGVsZW1lbnQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEVuYWJsZXMgaW5wdXQgZGV2aWNlc1xuXHQgKiBAa28g7J6F66ClIOyepey5mOulvCDsgqzsmqntlaAg7IiYIOyeiOqyjCDtlZzri6Rcblx0ICogQG1ldGhvZCBlZy5Nb3ZhYmxlQ29vcmQjZW5hYmxlSW5wdXRcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd8alF1ZXJ5fSBbZWxlbWVudF0gQW4gZWxlbWVudCBmcm9tIHdoaWNoIHRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlIGlzIHVzaW5nIChpZiB0aGUgZWxlbWVudCBwYXJhbWV0ZXIgaXMgbm90IHByZXNlbnQsIGl0IGFwcGxpZXMgdG8gYWxsIGJpbmRlZCBlbGVtZW50cyk8a28+ZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydhCBcdOyCrOyaqe2VmOuKlCDsl5jrpqzrqLztirggKGVsZW1lbnQg7YyM652866+47YSw6rCAIOyhtOyerO2VmOyngCDslYrsnYQg6rK97JqwLCDrsJTsnbjrk5zrkJwg66qo65OgIOyXmOumrOuovO2KuOyXkCDsoIHsmqnrkJzri6QpPC9rbz5cblx0ICogQHJldHVybiB7ZWcuTW92YWJsZUNvb3JkfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGYgPGtvPuyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQqL1xuXHRlbmFibGVJbnB1dChlbGVtZW50KSB7XG5cdFx0cmV0dXJuIHRoaXMuX2hhbW1lck1hbmFnZXIuaW5wdXRDb250cm9sKHRydWUsIGVsZW1lbnQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERpc2FibGVzIGlucHV0IGRldmljZXNcblx0ICogQGtvIOyeheugpSDsnqXsuZjrpbwg7IKs7Jqp7ZWgIOyImCDsl4bqsowg7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNkaXNhYmxlSW5wdXRcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd8alF1ZXJ5fSBbZWxlbWVudF0gQW4gZWxlbWVudCBmcm9tIHdoaWNoIHRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlIGlzIHVzaW5nIChpZiB0aGUgZWxlbWVudCBwYXJhbWV0ZXIgaXMgbm90IHByZXNlbnQsIGl0IGFwcGxpZXMgdG8gYWxsIGJpbmRlZCBlbGVtZW50cyk8PGtvPmVnLk1vdmFibGVDb29yZCDrqqjrk4jsnYQgXHTsgqzsmqntlZjripQg7JeY66as66i87Yq4IChlbGVtZW50IO2MjOudvOuvuO2EsOqwgCDsobTsnqztlZjsp4Ag7JWK7J2EIOqyveyasCwg67CU7J2465Oc65CcIOuqqOuToCDsl5jrpqzrqLztirjsl5Ag7KCB7Jqp65Cc64ukKTwva28+XG5cdCAqIEByZXR1cm4ge2VnLk1vdmFibGVDb29yZH0gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmIDxrbz7snpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICovXG5cdGRpc2FibGVJbnB1dChlbGVtZW50KSB7XG5cdFx0cmV0dXJuIHRoaXMuX2hhbW1lck1hbmFnZXIuaW5wdXRDb250cm9sKGZhbHNlLCBlbGVtZW50KTtcblx0fVxuXG5cdC8vIHNldCB1cCAnY3NzJyBleHByZXNzaW9uXG5cdF9yZXZpc2VPcHRpb25zKCkge1xuXHRcdGxldCBrZXk7XG5cblx0XHRbXCJib3VuY2VcIiwgXCJtYXJnaW5cIiwgXCJjaXJjdWxhclwiXS5mb3JFYWNoKHYgPT4ge1xuXHRcdFx0a2V5ID0gdGhpcy5vcHRpb25zW3ZdO1xuXHRcdFx0aWYgKGtleSAhPSBudWxsKSB7XG5cdFx0XHRcdGlmIChrZXkuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XG5cdFx0XHRcdFx0dGhpcy5vcHRpb25zW3ZdID0ga2V5Lmxlbmd0aCA9PT0gMiA/XG5cdFx0XHRcdFx0XHRrZXkuY29uY2F0KGtleSkgOiBrZXkuY29uY2F0KCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoL3N0cmluZ3xudW1iZXJ8Ym9vbGVhbi8udGVzdCh0eXBlb2Yga2V5KSkge1xuXHRcdFx0XHRcdHRoaXMub3B0aW9uc1t2XSA9IFtrZXksIGtleSwga2V5LCBrZXldO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMub3B0aW9uc1t2XSA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBsb2dpY2FsIGNvb3JkaW5hdGVzLlxuXHQgKiBAa28g64W866as7KCBIOyijO2RnOydmCDtmITsnqwg7JyE7LmY66W8IOuwmO2ZmO2VnOuLpFxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNnZXRcblx0ICogQHJldHVybiB7QXJyYXl9IHBvcyA8a28+7KKM7ZGcPC9rbz5cblx0ICogQHJldHVybiB7TnVtYmVyfSBwb3MuMCBUaGUgWCBjb29yZGluYXRlIDxrbz54IOyijO2RnDwva28+XG5cdCAqIEByZXR1cm4ge051bWJlcn0gcG9zLjEgVGhlIFkgY29vcmRpbmF0ZSA8a28+eSDsooztkZw8L2tvPlxuXHQgKi9cblx0Z2V0KCkge1xuXHRcdHJldHVybiB0aGlzLl9wb3MuY29uY2F0KCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVzdHJveXMgZWxlbWVudHMsIHByb3BlcnRpZXMsIGFuZCBldmVudHMgdXNlZCBpbiBhIG1vZHVsZS5cblx0ICogQGtvIOuqqOuTiOyXkCDsgqzsmqntlZwg7JeY66as66i87Yq47JmAIOyGjeyEsSwg7J2067Kk7Yq466W8IO2VtOygnO2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5Nb3ZhYmxlQ29vcmQjZGVzdHJveVxuXHQgKi9cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLm9mZigpO1xuXHRcdHRoaXMuX2hhbW1lck1hbmFnZXIuZGVzdHJveSgpO1xuXHR9XG59O1xuXG5PYmplY3QuYXNzaWduKE1vdmFibGVDb29yZCwgRElSRUNUSU9OKTtcbk1vdmFibGVDb29yZC5WRVJTSU9OID0gXCIyLjAuMC1iZXRhXCI7XG5leHBvcnQgZGVmYXVsdCBNb3ZhYmxlQ29vcmQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW92YWJsZUNvb3JkLmpzIiwiaW1wb3J0IENvb3JkaW5hdGUgZnJvbSBcIi4vY29vcmRpbmF0ZVwiO1xuaW1wb3J0IHt3aW5kb3d9IGZyb20gXCIuL2Jyb3dzZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgc3VwZXJjbGFzcyA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX3JhZiA9IG51bGw7XG5cdFx0dGhpcy5fYW5pbWF0ZVBhcmFtID0gbnVsbDtcblx0XHR0aGlzLl9hbmltYXRpb25FbmQgPSB0aGlzLl9hbmltYXRpb25FbmQuYmluZCh0aGlzKTtcdC8vIGZvciBjYWNoaW5nXG5cdFx0dGhpcy5fcmVzdG9yZSA9IHRoaXMuX3Jlc3RvcmUuYmluZCh0aGlzKTtcdC8vIGZvciBjYWNoaW5nXG5cdH1cblxuXHRfZ3JhYihtaW4sIG1heCwgY2lyY3VsYXIpIHtcblx0XHRpZiAodGhpcy5fYW5pbWF0ZVBhcmFtKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJhbmltYXRpb25FbmRcIik7XG5cdFx0XHRjb25zdCBvcmdQb3MgPSB0aGlzLmdldCgpO1xuXG5cdFx0XHRjb25zdCBwb3MgPSBDb29yZGluYXRlLmdldENpcmN1bGFyUG9zKHRoaXMuZ2V0KCksIG1pbiwgbWF4LCBjaXJjdWxhcik7XG5cblx0XHRcdGlmIChwb3NbMF0gIT09IG9yZ1Bvc1swXSB8fCBwb3NbMV0gIT09IG9yZ1Bvc1sxXSkge1xuXHRcdFx0XHR0aGlzLl9zZXRQb3NBbmRUcmlnZ2VyQ2hhbmdlKHBvcywgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9hbmltYXRlUGFyYW0gPSBudWxsO1xuXHRcdFx0dGhpcy5fcmFmICYmIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9yYWYpO1xuXHRcdFx0dGhpcy5fcmFmID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRfcHJlcGFyZVBhcmFtKGFic1BvcywgZHVyYXRpb24sIGhhbW1lckV2ZW50KSB7XG5cdFx0Y29uc3QgcG9zID0gdGhpcy5nZXQoKTtcblx0XHRjb25zdCBtaW4gPSB0aGlzLm9wdGlvbnMubWluO1xuXHRcdGNvbnN0IG1heCA9IHRoaXMub3B0aW9ucy5tYXg7XG5cdFx0Y29uc3QgY2lyY3VsYXIgPSB0aGlzLm9wdGlvbnMuY2lyY3VsYXI7XG5cdFx0Y29uc3QgbWF4aW11bUR1cmF0aW9uID0gdGhpcy5vcHRpb25zLm1heGltdW1EdXJhdGlvbjtcblx0XHRsZXQgZGVzdFBvcyA9IENvb3JkaW5hdGUuZ2V0UG9pbnRPZkludGVyc2VjdGlvbihcblx0XHRcdHBvcywgYWJzUG9zLCBtaW4sIG1heCwgY2lyY3VsYXIsIHRoaXMub3B0aW9ucy5ib3VuY2UpO1xuXG5cdFx0ZGVzdFBvcyA9IENvb3JkaW5hdGUuaXNPdXRUb091dChwb3MsIGRlc3RQb3MsIG1pbiwgbWF4KSA/IHBvcyA6IGRlc3RQb3M7XG5cblx0XHRjb25zdCBkaXN0YW5jZSA9IFtcblx0XHRcdE1hdGguYWJzKGRlc3RQb3NbMF0gLSBwb3NbMF0pLFxuXHRcdFx0TWF0aC5hYnMoZGVzdFBvc1sxXSAtIHBvc1sxXSlcblx0XHRdO1xuXHRcdGxldCBuZXdEdXJhdGlvbiA9IGR1cmF0aW9uID09IG51bGwgPyBDb29yZGluYXRlLmdldER1cmF0aW9uRnJvbVBvcyhcblx0XHRcdGRpc3RhbmNlLCB0aGlzLm9wdGlvbnMuZGVjZWxlcmF0aW9uKSA6IGR1cmF0aW9uO1xuXG5cdFx0bmV3RHVyYXRpb24gPSBtYXhpbXVtRHVyYXRpb24gPiBuZXdEdXJhdGlvbiA/IG5ld0R1cmF0aW9uIDogbWF4aW11bUR1cmF0aW9uO1xuXHRcdHJldHVybiB7XG5cdFx0XHRkZXBhUG9zOiBwb3MuY29uY2F0KCksXG5cdFx0XHRkZXN0UG9zOiBkZXN0UG9zLmNvbmNhdCgpLFxuXHRcdFx0aXNCb3VuY2U6IENvb3JkaW5hdGUuaXNPdXRzaWRlKGRlc3RQb3MsIG1pbiwgbWF4KSxcblx0XHRcdGlzQ2lyY3VsYXI6IENvb3JkaW5hdGUuaXNDaXJjdWxhcihhYnNQb3MsIG1pbiwgbWF4LCBjaXJjdWxhciksXG5cdFx0XHRkdXJhdGlvbjogbmV3RHVyYXRpb24sXG5cdFx0XHRkaXN0YW5jZSxcblx0XHRcdGhhbW1lckV2ZW50OiBoYW1tZXJFdmVudCB8fCBudWxsLFxuXHRcdFx0ZG9uZTogdGhpcy5fYW5pbWF0aW9uRW5kXG5cdFx0fTtcblx0fVxuXG5cdF9yZXN0b3JlKGNvbXBsZXRlLCBoYW1tZXJFdmVudCkge1xuXHRcdGNvbnN0IHBvcyA9IHRoaXMuZ2V0KCk7XG5cdFx0Y29uc3QgbWluID0gdGhpcy5vcHRpb25zLm1pbjtcblx0XHRjb25zdCBtYXggPSB0aGlzLm9wdGlvbnMubWF4O1xuXG5cdFx0dGhpcy5fYW5pbWF0ZSh0aGlzLl9wcmVwYXJlUGFyYW0oW1xuXHRcdFx0TWF0aC5taW4obWF4WzBdLCBNYXRoLm1heChtaW5bMF0sIHBvc1swXSkpLFxuXHRcdFx0TWF0aC5taW4obWF4WzFdLCBNYXRoLm1heChtaW5bMV0sIHBvc1sxXSkpXG5cdFx0XSwgbnVsbCwgaGFtbWVyRXZlbnQpLCBjb21wbGV0ZSk7XG5cdH1cblxuXHRfYW5pbWF0aW9uRW5kKCkge1xuXHRcdHRoaXMuX2FuaW1hdGVQYXJhbSA9IG51bGw7XG5cdFx0Y29uc3Qgb3JnUG9zID0gdGhpcy5nZXQoKTtcblx0XHRjb25zdCBuZXh0UG9zID0gQ29vcmRpbmF0ZS5nZXRDaXJjdWxhclBvcyhbXG5cdFx0XHRNYXRoLnJvdW5kKG9yZ1Bvc1swXSksXG5cdFx0XHRNYXRoLnJvdW5kKG9yZ1Bvc1sxXSlcblx0XHRdLCB0aGlzLm9wdGlvbnMubWluLCB0aGlzLm9wdGlvbnMubWF4LCB0aGlzLm9wdGlvbnMuY2lyY3VsYXIpO1xuXG5cdFx0dGhpcy5zZXRUbyguLi5uZXh0UG9zKTtcblx0XHR0aGlzLl9zZXRJbnRlcnJ1cHQoZmFsc2UpO1xuXHRcdC8qKlxuXHRcdCAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBhbmltYXRpb24gZW5kcy5cblx0XHQgKiBAa28g7JeQ64uI66mU7J207IWY7J20IOuBneuCrOydhCDrlYwg67Cc7IOd7ZWc64ukLlxuXHRcdCAqIEBuYW1lIGVnLk1vdmFibGVDb29yZCNhbmltYXRpb25FbmRcblx0XHQgKiBAZXZlbnRcblx0XHQgKi9cblx0XHR0aGlzLnRyaWdnZXIoXCJhbmltYXRpb25FbmRcIik7XG5cdH1cblxuXHRfYW5pbWF0ZShwYXJhbSwgY29tcGxldGUpIHtcblx0XHR0aGlzLl9hbmltYXRlUGFyYW0gPSBPYmplY3QuYXNzaWduKHt9LCBwYXJhbSk7XG5cdFx0dGhpcy5fYW5pbWF0ZVBhcmFtLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHRcdGlmIChwYXJhbS5kdXJhdGlvbikge1xuXHRcdFx0Y29uc3QgaW5mbyA9IHRoaXMuX2FuaW1hdGVQYXJhbTtcblx0XHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0XHQoZnVuY3Rpb24gbG9vcCgpIHtcblx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cblx0XHRcdFx0c2VsZi5fcmFmID0gbnVsbDtcblx0XHRcdFx0aWYgKHNlbGYuX2ZyYW1lKGluZm8pID49IDEpIHtcblx0XHRcdFx0XHQvLyBkZWZlcnJlZC5yZXNvbHZlKCk7XG5cdFx0XHRcdFx0Y29tcGxldGUoKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH0gLy8gYW5pbWF0aW9uRW5kXG5cdFx0XHRcdHNlbGYuX3JhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG5cdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cblx0XHRcdH0pKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3NldFBvc0FuZFRyaWdnZXJDaGFuZ2UocGFyYW0uZGVzdFBvcywgZmFsc2UpO1xuXHRcdFx0Y29tcGxldGUoKTtcblx0XHR9XG5cdH1cblxuXHRfYW5pbWF0ZVRvKGFic1BvcywgZHVyYXRpb24sIGhhbW1lckV2ZW50KSB7XG5cdFx0Y29uc3QgcGFyYW0gPSB0aGlzLl9wcmVwYXJlUGFyYW0oYWJzUG9zLCBkdXJhdGlvbiwgaGFtbWVyRXZlbnQpO1xuXHRcdGNvbnN0IHJldFRyaWdnZXIgPSB0aGlzLnRyaWdnZXIoXCJhbmltYXRpb25TdGFydFwiLCBwYXJhbSk7XG5cblx0XHQvLyBZb3UgY2FuJ3Qgc3RvcCB0aGUgJ2FuaW1hdGlvblN0YXJ0JyBldmVudCB3aGVuICdjaXJjdWxhcicgaXMgdHJ1ZS5cblx0XHRpZiAocGFyYW0uaXNDaXJjdWxhciAmJiAhcmV0VHJpZ2dlcikge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcIllvdSBjYW4ndCBzdG9wIHRoZSAnYW5pbWF0aW9uJyBldmVudCB3aGVuICdjaXJjdWxhcicgaXMgdHJ1ZS5cIlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAocmV0VHJpZ2dlcikge1xuXHRcdFx0Y29uc3QgcXVldWUgPSBbXTtcblx0XHRcdGNvbnN0IGRlcXVldWUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y29uc3QgdGFzayA9IHF1ZXVlLnNoaWZ0KCk7XG5cblx0XHRcdFx0dGFzayAmJiB0YXNrLmNhbGwodGhpcyk7XG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAocGFyYW0uZGVwYVBvc1swXSAhPT0gcGFyYW0uZGVzdFBvc1swXSB8fFxuXHRcdFx0XHRwYXJhbS5kZXBhUG9zWzFdICE9PSBwYXJhbS5kZXN0UG9zWzFdKSB7XG5cdFx0XHRcdHF1ZXVlLnB1c2goKCkgPT4gdGhpcy5fYW5pbWF0ZShwYXJhbSwgZGVxdWV1ZSkpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKENvb3JkaW5hdGUuaXNPdXRzaWRlKFxuXHRcdFx0XHRwYXJhbS5kZXN0UG9zLCB0aGlzLm9wdGlvbnMubWluLCB0aGlzLm9wdGlvbnMubWF4KSkge1xuXHRcdFx0XHRxdWV1ZS5wdXNoKCgpID0+IHRoaXMuX3Jlc3RvcmUoZGVxdWV1ZSwgaGFtbWVyRXZlbnQpKTtcblx0XHRcdH1cblx0XHRcdHF1ZXVlLnB1c2goKCkgPT4gdGhpcy5fYW5pbWF0aW9uRW5kKCkpO1xuXHRcdFx0ZGVxdWV1ZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8vIGFuaW1hdGlvbiBmcmFtZSAoMH4xKVxuXHRfZnJhbWUocGFyYW0pIHtcblx0XHRjb25zdCBjdXJUaW1lID0gbmV3IERhdGUoKSAtIHBhcmFtLnN0YXJ0VGltZTtcblx0XHRjb25zdCBlYXNpbmdQZXIgPSB0aGlzLl9lYXNpbmcoY3VyVGltZSAvIHBhcmFtLmR1cmF0aW9uKTtcblx0XHRsZXQgcG9zID0gW3BhcmFtLmRlcGFQb3NbMF0sIHBhcmFtLmRlcGFQb3NbMV1dO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpKyspIHtcblx0XHRcdChwb3NbaV0gIT09IHBhcmFtLmRlc3RQb3NbaV0pICYmXG5cdFx0XHQocG9zW2ldICs9IChwYXJhbS5kZXN0UG9zW2ldIC0gcG9zW2ldKSAqIGVhc2luZ1Blcik7XG5cdFx0fVxuXHRcdHBvcyA9IENvb3JkaW5hdGUuZ2V0Q2lyY3VsYXJQb3MoXG5cdFx0XHRwb3MsIHRoaXMub3B0aW9ucy5taW4sIHRoaXMub3B0aW9ucy5tYXgsIHRoaXMub3B0aW9ucy5jaXJjdWxhcik7XG5cdFx0dGhpcy5fc2V0UG9zQW5kVHJpZ2dlckNoYW5nZShwb3MsIGZhbHNlKTtcblx0XHRyZXR1cm4gZWFzaW5nUGVyO1xuXHR9XG5cblx0Ly8gdHJpZ2dlciAnY2hhbmdlJyBldmVudFxuXHRfc2V0UG9zQW5kVHJpZ2dlckNoYW5nZShwb3NpdGlvbiwgaG9sZGluZywgZSkge1xuXHRcdC8qKlxuXHRcdCAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBjb29yZGluYXRlIGNoYW5nZXMuXG5cdFx0ICogQGtvIOyijO2RnOqwgCDrs4Dqsr3rkJDsnYQg65WMIOuwnOyDne2VmOuKlCDsnbTrsqTtirhcblx0XHQgKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQjY2hhbmdlXG5cdFx0ICogQGV2ZW50XG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gcGFyYW0gVGhlIG9iamVjdCBvZiBkYXRhIHRvIGJlIHNlbnQgd2hlbiB0aGUgZXZlbnQgaXMgZmlyZWQgPGtvPuydtOuypO2KuOqwgCDrsJzsg53tlaAg65WMIOyghOuLrOuQmOuKlCDrjbDsnbTthLAg6rCd7LK0PC9rbz5cblx0XHQgKiBAcGFyYW0ge0FycmF5fSBwYXJhbS5wb3NpdGlvbiBkZXBhcnR1cmUgY29vcmRpbmF0ZSAgPGtvPuyijO2RnDwva28+XG5cdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtLnBvc2l0aW9uLjAgVGhlIFggY29vcmRpbmF0ZSA8a28+eCDsooztkZw8L2tvPlxuXHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBwYXJhbS5wb3MuMSBUaGUgWSBjb29yZGluYXRlIDxrbz55IOyijO2RnDwva28+XG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSBwYXJhbS5ob2xkaW5nIEluZGljYXRlcyB3aGV0aGVyIGEgdXNlciBob2xkcyBhbiBlbGVtZW50IG9uIHRoZSBzY3JlZW4gb2YgdGhlIGRldmljZS48a28+7IKs7Jqp7J6Q6rCAIOq4sOq4sOydmCDtmZTrqbTsnYQg64iE66W06rOgIOyeiOuKlOyngCDsl6zrtoA8L2tvPlxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbS5oYW1tZXJFdmVudCBUaGUgZXZlbnQgaW5mb3JtYXRpb24gb2YgSGFtbWVyLkpTLiBJdCByZXR1cm5zIG51bGwgaWYgdGhlIGV2ZW50IGlzIGZpcmVkIHRocm91Z2ggYSBjYWxsIHRvIHRoZSBzZXRUbygpIG9yIHNldEJ5KCkgbWV0aG9kLjxrbz5IYW1tZXIuSlPsnZgg7J2067Kk7Yq4IOygleuztC4gc2V0VG8oKSDrqZTshJzrk5zrgpggc2V0QnkoKSDrqZTshJzrk5zrpbwg7Zi47Lac7ZW0IOydtOuypO2KuOqwgCDrsJzsg53tlojsnYQg65WM64qUICdudWxsJ+ydhCDrsJjtmZjtlZzri6QuPC9rbz5cblx0XHQgKlxuXHRcdCAqL1xuXHRcdHRoaXMuX3BvcyA9IHBvc2l0aW9uLmNvbmNhdCgpO1xuXHRcdHRoaXMudHJpZ2dlcihcImNoYW5nZVwiLCB7XG5cdFx0XHRwb3M6IHBvc2l0aW9uLmNvbmNhdCgpLFxuXHRcdFx0aG9sZGluZyxcblx0XHRcdGhhbW1lckV2ZW50OiBlIHx8IG51bGxcblx0XHR9KTtcblx0fVxuXG5cdF9lYXNpbmcocCkge1xuXHRcdHJldHVybiBwID4gMSA/IDEgOiB0aGlzLm9wdGlvbnMuZWFzaW5nKHApO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmVzIGFuIGVsZW1lbnQgdG8gc3BlY2lmaWMgY29vcmRpbmF0ZXMuXG5cdCAqIEBrbyDsooztkZzrpbwg7J2064+Z7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNzZXRUb1xuXHQgKiBAcGFyYW0ge051bWJlcn0geCBUaGUgWCBjb29yZGluYXRlIHRvIG1vdmUgdG8gPGtvPuydtOuPme2VoCB47KKM7ZGcPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IHkgVGhlIFkgY29vcmRpbmF0ZSB0byBtb3ZlIHRvICA8a28+7J2064+Z7ZWgIHnsooztkZw8L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW2R1cmF0aW9uPTBdIER1cmF0aW9uIG9mIHRoZSBhbmltYXRpb24gKHVuaXQ6IG1zKSA8a28+7JWg64uI66mU7J207IWYIOynhO2WiSDsi5zqsIQo64uo7JyEOiBtcyk8L2tvPlxuXHQgKiBAcmV0dXJuIHtlZy5Nb3ZhYmxlQ29vcmR9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZiA8a28+7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqL1xuXHRzZXRUbyh4LCB5LCBkdXJhdGlvbiA9IDApIHtcblx0XHRsZXQgdG9YID0geDtcblx0XHRsZXQgdG9ZID0geTtcblx0XHRjb25zdCBtaW4gPSB0aGlzLm9wdGlvbnMubWluO1xuXHRcdGNvbnN0IG1heCA9IHRoaXMub3B0aW9ucy5tYXg7XG5cdFx0Y29uc3QgY2lyY3VsYXIgPSB0aGlzLm9wdGlvbnMuY2lyY3VsYXI7XG5cblx0XHR0aGlzLl9ncmFiKG1pbiwgbWF4LCBjaXJjdWxhcik7XG5cdFx0Y29uc3QgcG9zID0gdGhpcy5nZXQoKTtcblxuXHRcdGlmICh4ID09PSBwb3NbMF0gJiYgeSA9PT0gcG9zWzFdKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHR0aGlzLl9zZXRJbnRlcnJ1cHQodHJ1ZSk7XG5cdFx0aWYgKHggIT09IHBvc1swXSkge1xuXHRcdFx0aWYgKCFjaXJjdWxhclszXSkge1xuXHRcdFx0XHR0b1ggPSBNYXRoLm1heChtaW5bMF0sIHRvWCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIWNpcmN1bGFyWzFdKSB7XG5cdFx0XHRcdHRvWCA9IE1hdGgubWluKG1heFswXSwgdG9YKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHkgIT09IHBvc1sxXSkge1xuXHRcdFx0aWYgKCFjaXJjdWxhclswXSkge1xuXHRcdFx0XHR0b1kgPSBNYXRoLm1heChtaW5bMV0sIHRvWSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIWNpcmN1bGFyWzJdKSB7XG5cdFx0XHRcdHRvWSA9IE1hdGgubWluKG1heFsxXSwgdG9ZKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKGR1cmF0aW9uKSB7XG5cdFx0XHR0aGlzLl9hbmltYXRlVG8oW3RvWCwgdG9ZXSwgZHVyYXRpb24pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9wb3MgPSBDb29yZGluYXRlLmdldENpcmN1bGFyUG9zKFt0b1gsIHRvWV0sIG1pbiwgbWF4LCBjaXJjdWxhcik7XG5cdFx0XHR0aGlzLl9zZXRQb3NBbmRUcmlnZ2VyQ2hhbmdlKHRoaXMuX3BvcywgZmFsc2UpO1xuXHRcdFx0dGhpcy5fc2V0SW50ZXJydXB0KGZhbHNlKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBjdXJyZW50IGNvb3JkaW5hdGVzIHRvIHNwZWNpZmljIGNvb3JkaW5hdGVzLiBUaGUgY2hhbmdlIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIG1ldGhvZCBpcyBleGVjdXRlZC5cblx0ICogQGtvIO2YhOyerCDsooztkZzrpbwg6riw7KSA7Jy866GcIOyijO2RnOulvCDsnbTrj5ntlZzri6QuIOuplOyEnOuTnOqwgCDsi6TtlonrkJjrqbQgY2hhbmdlIOydtOuypO2KuOqwgCDrsJzsg53tlZzri6Rcblx0ICogQG1ldGhvZCBlZy5Nb3ZhYmxlQ29vcmQjc2V0Qnlcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHggVGhlIFggY29vcmRpbmF0ZSB0byBtb3ZlIHRvIDxrbz7snbTrj5ntlaAgeOyijO2RnDwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB5IFRoZSBZIGNvb3JkaW5hdGUgdG8gbW92ZSB0byA8a28+7J2064+Z7ZWgIHnsooztkZw8L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW2R1cmF0aW9uPTBdIER1cmF0aW9uIG9mIHRoZSBhbmltYXRpb24gKHVuaXQ6IG1zKSA8a28+7JWg64uI66mU7J207IWYIOynhO2WiSDsi5zqsIQo64uo7JyEOiBtcyk8L2tvPlxuXHQgKiBAcmV0dXJuIHtlZy5Nb3ZhYmxlQ29vcmR9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZiA8a28+7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqL1xuXHRzZXRCeSh4LCB5LCBkdXJhdGlvbiA9IDApIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRUbyhcblx0XHRcdHggIT0gbnVsbCA/IHRoaXMuX3Bvc1swXSArIHggOiB0aGlzLl9wb3NbMF0sXG5cdFx0XHR5ICE9IG51bGwgPyB0aGlzLl9wb3NbMV0gKyB5IDogdGhpcy5fcG9zWzFdLFxuXHRcdFx0ZHVyYXRpb25cblx0XHQpO1xuXHR9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FuaW1hdGlvbkhhbmRsZXIuanMiLCJpbXBvcnQgQ29vcmRpbmF0ZSBmcm9tIFwiLi9jb29yZGluYXRlXCI7XG5pbXBvcnQge0RJUkVDVElPTn0gZnJvbSBcIi4vY29uc3RzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHN1cGVyY2xhc3MgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLl9zdGF0dXMgPSB7XG5cdFx0XHRncmFiT3V0c2lkZTogZmFsc2UsXHRcdC8vIGNoZWNrIHdoZXRoZXIgdXNlcidzIGFjdGlvbiBzdGFydGVkIG9uIG91dHNpZGVcblx0XHRcdGN1cnJlbnRIYW1tZXI6IG51bGwsXHRcdC8vIGN1cnJlbnQgaGFtbWVyIGluc3RhbmNlXG5cdFx0XHRjdXJyZW50T3B0aW9uczoge30sXHRcdC8vIGN1cnJlbnQgYmluZCBvcHRpb25zXG5cdFx0XHRtb3ZlRGlzdGFuY2U6IG51bGwsXHRcdC8vIGEgcG9zaXRpb24gb2YgdGhlIGZpcnN0IHVzZXIncyBhY3Rpb25cblx0XHRcdHByZXZlbnRlZDogZmFsc2VcdFx0Ly8gIGNoZWNrIHdoZXRoZXIgdGhlIGFuaW1hdGlvbiBldmVudCB3YXMgcHJldmVudGVkXG5cdFx0fTtcblx0fVxuXG5cdF9zZXRDdXJyZW50VGFyZ2V0KGhhbW1lciwgb3B0aW9ucykge1xuXHRcdHRoaXMuX3N0YXR1cy5jdXJyZW50T3B0aW9ucyA9IG9wdGlvbnM7XG5cdFx0dGhpcy5fc3RhdHVzLmN1cnJlbnRIYW5tbWVyID0gaGFtbWVyO1xuXHR9XG5cblx0Ly8gcGFuc3RhcnQgZXZlbnQgaGFuZGxlclxuXHRfc3RhcnQoZSkge1xuXHRcdGlmICghdGhpcy5fc3RhdHVzLmN1cnJlbnRPcHRpb25zLmludGVycnVwdGFibGUgJiYgdGhpcy5fc3RhdHVzLnByZXZlbnRlZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBwb3MgPSB0aGlzLmdldCgpO1xuXHRcdGNvbnN0IG1pbiA9IHRoaXMub3B0aW9ucy5taW47XG5cdFx0Y29uc3QgbWF4ID0gdGhpcy5vcHRpb25zLm1heDtcblxuXHRcdHRoaXMuX3NldEludGVycnVwdCh0cnVlKTtcblx0XHR0aGlzLl9ncmFiKG1pbiwgbWF4LCB0aGlzLm9wdGlvbnMuY2lyY3VsYXIpO1xuXHRcdC8qKlxuXHRcdCAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBhIHVzZXIgaG9sZHMgYW4gZWxlbWVudCBvbiB0aGUgc2NyZWVuIG9mIHRoZSBkZXZpY2UuXG5cdFx0ICogQGtvIOyCrOyaqeyekOqwgCDquLDquLDsnZgg7ZmU66m07JeQIOyGkOydhCDrjIDqs6Ag7J6I7J2EIOuVjCDrsJzsg53tlZjripQg7J2067Kk7Yq4XG5cdFx0ICogQG5hbWUgZWcuTW92YWJsZUNvb3JkI2hvbGRcblx0XHQgKiBAZXZlbnRcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gcGFyYW0gVGhlIG9iamVjdCBvZiBkYXRhIHRvIGJlIHNlbnQgd2hlbiB0aGUgZXZlbnQgaXMgZmlyZWQ8a28+7J2067Kk7Yq46rCAIOuwnOyDne2VoCDrlYwg7KCE64us65CY64qUIOuNsOydtO2EsCDqsJ3ssrQ8L2tvPlxuXHRcdCAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtLnBvcyBjb29yZGluYXRlIDxrbz7sooztkZwg7KCV67O0PC9rbz5cblx0XHQgKiBAcGFyYW0ge051bWJlcn0gcGFyYW0ucG9zLjAgVGhlIFggY29vcmRpbmF0ZTxrbz54IOyijO2RnDwva28+XG5cdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtLnBvcy4xIFRoZSBZIGNvb3JkaW5hdGU8a28+eSDsooztkZw8L2tvPlxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbS5oYW1tZXJFdmVudCBUaGUgZXZlbnQgaW5mb3JtYXRpb24gb2YgSGFtbWVyLkpTLiBJdCByZXR1cm5zIG51bGwgaWYgdGhlIGV2ZW50IGlzIGZpcmVkIHRocm91Z2ggYSBjYWxsIHRvIHRoZSBzZXRUbygpIG9yIHNldEJ5KCkgbWV0aG9kLjxrbz5IYW1tZXIuSlPsnZgg7J2067Kk7Yq4IOygleuztC4gc2V0VG8oKSDrqZTshJzrk5zrgpggc2V0QnkoKSDrqZTshJzrk5zrpbwg7Zi47Lac7ZW0IOydtOuypO2KuOqwgCDrsJzsg53tlojsnYQg65WM64qUICdudWxsJ+ydhCDrsJjtmZjtlZzri6QuPC9rbz5cblx0XHQgKlxuXHRcdCAqL1xuXHRcdHRoaXMudHJpZ2dlcihcImhvbGRcIiwge1xuXHRcdFx0cG9zOiBwb3MuY29uY2F0KCksXG5cdFx0XHRoYW1tZXJFdmVudDogZVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5fc3RhdHVzLm1vdmVEaXN0YW5jZSA9IHBvcy5jb25jYXQoKTtcblx0XHR0aGlzLl9zdGF0dXMuZ3JhYk91dHNpZGUgPSBDb29yZGluYXRlLmlzT3V0c2lkZShwb3MsIG1pbiwgbWF4KTtcblx0fVxuXG5cdC8vIHBhbm1vdmUgZXZlbnQgaGFuZGxlclxuXHRfbW92ZShlKSB7XG5cdFx0aWYgKCF0aGlzLl9pc0ludGVycnVwdGluZygpIHx8ICF0aGlzLl9zdGF0dXMubW92ZURpc3RhbmNlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGxldCBwb3MgPSB0aGlzLmdldCh0cnVlKTtcblx0XHRjb25zdCBtaW4gPSB0aGlzLm9wdGlvbnMubWluO1xuXHRcdGNvbnN0IG1heCA9IHRoaXMub3B0aW9ucy5tYXg7XG5cdFx0Y29uc3QgYm91bmNlID0gdGhpcy5vcHRpb25zLmJvdW5jZTtcblx0XHRjb25zdCBtYXJnaW4gPSB0aGlzLm9wdGlvbnMubWFyZ2luO1xuXHRcdGNvbnN0IGN1cnJlbnRPcHRpb25zID0gdGhpcy5fc3RhdHVzLmN1cnJlbnRPcHRpb25zO1xuXHRcdGNvbnN0IGRpcmVjdGlvbiA9IGN1cnJlbnRPcHRpb25zLmRpcmVjdGlvbjtcblx0XHRjb25zdCBzY2FsZSA9IGN1cnJlbnRPcHRpb25zLnNjYWxlO1xuXHRcdGNvbnN0IHVzZXJEaXJlY3Rpb24gPSBDb29yZGluYXRlLmdldERpcmVjdGlvbkJ5QW5nbGUoXG5cdFx0XHRlLmFuZ2xlLCBjdXJyZW50T3B0aW9ucy50aHJlc2hvbGRBbmdsZSk7XG5cdFx0Y29uc3Qgb3V0ID0gW1xuXHRcdFx0bWFyZ2luWzBdICsgYm91bmNlWzBdLFxuXHRcdFx0bWFyZ2luWzFdICsgYm91bmNlWzFdLFxuXHRcdFx0bWFyZ2luWzJdICsgYm91bmNlWzJdLFxuXHRcdFx0bWFyZ2luWzNdICsgYm91bmNlWzNdXG5cdFx0XTtcblx0XHRsZXQgcHJldmVudCA9IGZhbHNlO1xuXG5cdFx0Ly8gbm90IHN1cHBvcnQgb2Zmc2V0IHByb3BlcnRpZXMgaW4gSGFtbWVyanMgLSBzdGFydFxuXHRcdGNvbnN0IHByZXZJbnB1dCA9IHRoaXMuX3N0YXR1cy5jdXJyZW50SGFubW1lci5zZXNzaW9uLnByZXZJbnB1dDtcblxuXHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5cdFx0aWYgKHByZXZJbnB1dCkge1xuXHRcdFx0ZS5vZmZzZXRYID0gZS5kZWx0YVggLSBwcmV2SW5wdXQuZGVsdGFYO1xuXHRcdFx0ZS5vZmZzZXRZID0gZS5kZWx0YVkgLSBwcmV2SW5wdXQuZGVsdGFZO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlLm9mZnNldFggPSAwO1xuXHRcdFx0ZS5vZmZzZXRZID0gMDtcblx0XHR9XG5cblx0XHQvLyBub3Qgc3VwcG9ydCBvZmZzZXQgcHJvcGVydGllcyBpbiBIYW1tZXJqcyAtIGVuZFxuXHRcdGlmIChDb29yZGluYXRlLmlzSG9yaXpvbnRhbChkaXJlY3Rpb24sIHVzZXJEaXJlY3Rpb24pKSB7XG5cdFx0XHR0aGlzLl9zdGF0dXMubW92ZURpc3RhbmNlWzBdICs9IChlLm9mZnNldFggKiBzY2FsZVswXSk7XG5cdFx0XHRwcmV2ZW50ID0gdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKENvb3JkaW5hdGUuaXNWZXJ0aWNhbChkaXJlY3Rpb24sIHVzZXJEaXJlY3Rpb24pKSB7XG5cdFx0XHR0aGlzLl9zdGF0dXMubW92ZURpc3RhbmNlWzFdICs9IChlLm9mZnNldFkgKiBzY2FsZVsxXSk7XG5cdFx0XHRwcmV2ZW50ID0gdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKHByZXZlbnQpIHtcblx0XHRcdGUuc3JjRXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGUuc3JjRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fVxuXHRcdGUucHJldmVudFN5c3RlbUV2ZW50ID0gcHJldmVudDtcblx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5cblx0XHRwb3NbMF0gPSB0aGlzLl9zdGF0dXMubW92ZURpc3RhbmNlWzBdO1xuXHRcdHBvc1sxXSA9IHRoaXMuX3N0YXR1cy5tb3ZlRGlzdGFuY2VbMV07XG5cdFx0cG9zID0gQ29vcmRpbmF0ZS5nZXRDaXJjdWxhclBvcyhwb3MsIG1pbiwgbWF4LCB0aGlzLm9wdGlvbnMuY2lyY3VsYXIpO1xuXG5cdFx0Ly8gZnJvbSBvdXRzaWRlIHRvIGluc2lkZVxuXHRcdGlmICh0aGlzLl9zdGF0dXMuZ3JhYk91dHNpZGUgJiYgIUNvb3JkaW5hdGUuaXNPdXRzaWRlKHBvcywgbWluLCBtYXgpKSB7XG5cdFx0XHR0aGlzLl9zdGF0dXMuZ3JhYk91dHNpZGUgPSBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyB3aGVuIG1vdmUgcG9pbnRlciBpcyBoZWxkIGluIG91dHNpZGVcblx0XHRsZXQgdHY7XG5cdFx0bGV0IHRuO1xuXHRcdGxldCB0eDtcblxuXHRcdGlmICh0aGlzLl9zdGF0dXMuZ3JhYk91dHNpZGUpIHtcblx0XHRcdHRuID0gbWluWzBdIC0gb3V0WzNdO1xuXHRcdFx0dHggPSBtYXhbMF0gKyBvdXRbMV07XG5cdFx0XHR0diA9IHBvc1swXTtcblx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5cdFx0XHRwb3NbMF0gPSB0diA+IHR4ID8gdHggOiAodHYgPCB0biA/IHRuIDogdHYpO1xuXHRcdFx0dG4gPSBtaW5bMV0gLSBvdXRbMF07XG5cdFx0XHR0eCA9IG1heFsxXSArIG91dFsyXTtcblx0XHRcdHR2ID0gcG9zWzFdO1xuXHRcdFx0cG9zWzFdID0gdHYgPiB0eCA/IHR4IDogKHR2IDwgdG4gPyB0biA6IHR2KTtcblx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8tbmVzdGVkLXRlcm5hcnkgKi9cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gd2hlbiBzdGFydCBwb2ludGVyIGlzIGhlbGQgaW4gaW5zaWRlXG5cdFx0XHQvLyBnZXQgYSBpbml0aWFsaXphdGlvbiBzbG9wZSB2YWx1ZSB0byBwcmV2ZW50IHNtb290aCBhbmltYXRpb24uXG5cdFx0XHRjb25zdCBpbml0U2xvcGUgPSB0aGlzLl9lYXNpbmcoMC4wMDAwMSkgLyAwLjAwMDAxO1xuXG5cdFx0XHRpZiAocG9zWzFdIDwgbWluWzFdKSB7IC8vIHVwXG5cdFx0XHRcdHR2ID0gKG1pblsxXSAtIHBvc1sxXSkgLyAob3V0WzBdICogaW5pdFNsb3BlKTtcblx0XHRcdFx0cG9zWzFdID0gbWluWzFdIC0gdGhpcy5fZWFzaW5nKHR2KSAqIG91dFswXTtcblx0XHRcdH0gZWxzZSBpZiAocG9zWzFdID4gbWF4WzFdKSB7IC8vIGRvd25cblx0XHRcdFx0dHYgPSAocG9zWzFdIC0gbWF4WzFdKSAvIChvdXRbMl0gKiBpbml0U2xvcGUpO1xuXHRcdFx0XHRwb3NbMV0gPSBtYXhbMV0gKyB0aGlzLl9lYXNpbmcodHYpICogb3V0WzJdO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBvc1swXSA8IG1pblswXSkgeyAvLyBsZWZ0XG5cdFx0XHRcdHR2ID0gKG1pblswXSAtIHBvc1swXSkgLyAob3V0WzNdICogaW5pdFNsb3BlKTtcblx0XHRcdFx0cG9zWzBdID0gbWluWzBdIC0gdGhpcy5fZWFzaW5nKHR2KSAqIG91dFszXTtcblx0XHRcdH0gZWxzZSBpZiAocG9zWzBdID4gbWF4WzBdKSB7IC8vIHJpZ2h0XG5cdFx0XHRcdHR2ID0gKHBvc1swXSAtIG1heFswXSkgLyAob3V0WzFdICogaW5pdFNsb3BlKTtcblx0XHRcdFx0cG9zWzBdID0gbWF4WzBdICsgdGhpcy5fZWFzaW5nKHR2KSAqIG91dFsxXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fc2V0UG9zQW5kVHJpZ2dlckNoYW5nZShwb3MsIHRydWUsIGUpO1xuXHR9XG5cblx0Ly8gcGFuZW5kIGV2ZW50IGhhbmRsZXJcblx0X2VuZChlKSB7XG5cdFx0Y29uc3QgcG9zID0gdGhpcy5nZXQoKTtcblxuXHRcdGlmICghdGhpcy5faXNJbnRlcnJ1cHRpbmcoKSB8fCAhdGhpcy5fc3RhdHVzLm1vdmVEaXN0YW5jZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIEFib3J0IHRoZSBhbmltYXRpbmcgcG9zdCBwcm9jZXNzIHdoZW4gXCJ0YXBcIiBvY2N1cnNcblx0XHRpZiAoZS5kaXN0YW5jZSA9PT0gMCAvKiBlLnR5cGUgPT09IFwidGFwXCIgKi8pIHtcblx0XHRcdHRoaXMuX3NldEludGVycnVwdChmYWxzZSk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJyZWxlYXNlXCIsIHtcblx0XHRcdFx0ZGVwYVBvczogcG9zLmNvbmNhdCgpLFxuXHRcdFx0XHRkZXN0UG9zOiBwb3MuY29uY2F0KCksXG5cdFx0XHRcdGhhbW1lckV2ZW50OiBlIHx8IG51bGxcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBkaXJlY3Rpb24gPSB0aGlzLl9zdGF0dXMuY3VycmVudE9wdGlvbnMuZGlyZWN0aW9uO1xuXHRcdFx0Y29uc3Qgc2NhbGUgPSB0aGlzLl9zdGF0dXMuY3VycmVudE9wdGlvbnMuc2NhbGU7XG5cdFx0XHRsZXQgdlggPSBNYXRoLmFicyhlLnZlbG9jaXR5WCk7XG5cdFx0XHRsZXQgdlkgPSBNYXRoLmFicyhlLnZlbG9jaXR5WSk7XG5cblx0XHRcdCEoZGlyZWN0aW9uICYgRElSRUNUSU9OLkRJUkVDVElPTl9IT1JJWk9OVEFMKSAmJiAodlggPSAwKTtcblx0XHRcdCEoZGlyZWN0aW9uICYgRElSRUNUSU9OLkRJUkVDVElPTl9WRVJUSUNBTCkgJiYgKHZZID0gMCk7XG5cblx0XHRcdGNvbnN0IG9mZnNldCA9IENvb3JkaW5hdGUuZ2V0TmV4dE9mZnNldFBvcyhbXG5cdFx0XHRcdHZYICogKGUuZGVsdGFYIDwgMCA/IC0xIDogMSkgKiBzY2FsZVswXSxcblx0XHRcdFx0dlkgKiAoZS5kZWx0YVkgPCAwID8gLTEgOiAxKSAqIHNjYWxlWzFdXG5cdFx0XHRdLCB0aGlzLm9wdGlvbnMuZGVjZWxlcmF0aW9uKTtcblx0XHRcdGxldCBkZXN0UG9zID0gW3Bvc1swXSArIG9mZnNldFswXSwgcG9zWzFdICsgb2Zmc2V0WzFdXTtcblxuXHRcdFx0ZGVzdFBvcyA9IENvb3JkaW5hdGUuZ2V0UG9pbnRPZkludGVyc2VjdGlvbihwb3MsIGRlc3RQb3MsXG5cdFx0XHRcdHRoaXMub3B0aW9ucy5taW4sIHRoaXMub3B0aW9ucy5tYXgsXG5cdFx0XHRcdHRoaXMub3B0aW9ucy5jaXJjdWxhciwgdGhpcy5vcHRpb25zLmJvdW5jZSk7XG5cdFx0XHQvKipcblx0XHRcdCAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBhIHVzZXIgcmVsZWFzZSBhbiBlbGVtZW50IG9uIHRoZSBzY3JlZW4gb2YgdGhlIGRldmljZS5cblx0XHRcdCAqIEBrbyDsgqzsmqnsnpDqsIAg6riw6riw7J2YIO2ZlOuptOyXkOyEnCDshpDsnYQg65eQ7J2EIOuVjCDrsJzsg53tlZjripQg7J2067Kk7Yq4XG5cdFx0XHQgKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQjcmVsZWFzZVxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IHBhcmFtIFRoZSBvYmplY3Qgb2YgZGF0YSB0byBiZSBzZW50IHdoZW4gdGhlIGV2ZW50IGlzIGZpcmVkPGtvPuydtOuypO2KuOqwgCDrsJzsg53tlaAg65WMIOyghOuLrOuQmOuKlCDrjbDsnbTthLAg6rCd7LK0PC9rbz5cblx0XHRcdCAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtLmRlcGFQb3MgVGhlIGNvb3JkaW5hdGVzIHdoZW4gcmVsZWFzaW5nIGFuIGVsZW1lbnQ8a28+7IaQ7J2EIOuXkOydhCDrlYzsnZgg7KKM7ZGc7ZiE7J6sIDwva28+XG5cdFx0XHQgKiBAcGFyYW0ge051bWJlcn0gcGFyYW0uZGVwYVBvcy4wIFRoZSBYIGNvb3JkaW5hdGUgPGtvPiB4IOyijO2RnDwva28+XG5cdFx0XHQgKiBAcGFyYW0ge051bWJlcn0gcGFyYW0uZGVwYVBvcy4xIFRoZSBZIGNvb3JkaW5hdGUgPGtvPiB5IOyijO2RnDwva28+XG5cdFx0XHQgKiBAcGFyYW0ge0FycmF5fSBwYXJhbS5kZXN0UG9zIFRoZSBjb29yZGluYXRlcyB0byBtb3ZlIHRvIGFmdGVyIHJlbGVhc2luZyBhbiBlbGVtZW50PGtvPuyGkOydhCDrl4Ag65Kk7JeQIOydtOuPme2VoCDsooztkZw8L2tvPlxuXHRcdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtLmRlc3RQb3MuMCBUaGUgWCBjb29yZGluYXRlIDxrbz54IOyijO2RnDwva28+XG5cdFx0XHQgKiBAcGFyYW0ge051bWJlcn0gcGFyYW0uZGVzdFBvcy4xIFRoZSBZIGNvb3JkaW5hdGUgPGtvPnkg7KKM7ZGcPC9rbz5cblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbS5oYW1tZXJFdmVudCBUaGUgZXZlbnQgaW5mb3JtYXRpb24gb2YgSGFtbWVyLkpTLiBJdCByZXR1cm5zIG51bGwgaWYgdGhlIGV2ZW50IGlzIGZpcmVkIHRocm91Z2ggYSBjYWxsIHRvIHRoZSBzZXRUbygpIG9yIHNldEJ5KCkgbWV0aG9kLjxrbz5IYW1tZXIuSlPsnZgg7J2067Kk7Yq4IOygleuztC4gc2V0VG8oKSDrqZTshJzrk5zrgpggc2V0QnkoKSDrqZTshJzrk5zrpbwg7Zi47Lac7ZW0IOydtOuypO2KuOqwgCDrsJzsg53tlojsnYQg65WM64qUICdudWxsJ+ydhCDrsJjtmZjtlZzri6Q8L2tvPlxuXHRcdFx0ICpcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKFwicmVsZWFzZVwiLCB7XG5cdFx0XHRcdGRlcGFQb3M6IHBvcy5jb25jYXQoKSxcblx0XHRcdFx0ZGVzdFBvcyxcblx0XHRcdFx0aGFtbWVyRXZlbnQ6IGUgfHwgbnVsbFxuXHRcdFx0fSk7XG5cdFx0XHRpZiAocG9zWzBdICE9PSBkZXN0UG9zWzBdIHx8IHBvc1sxXSAhPT0gZGVzdFBvc1sxXSkge1xuXHRcdFx0XHR0aGlzLl9hbmltYXRlVG8oZGVzdFBvcywgbnVsbCwgZSB8fCBudWxsKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX3NldEludGVycnVwdChmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3N0YXR1cy5tb3ZlRGlzdGFuY2UgPSBudWxsO1xuXHR9XG5cblx0X2lzSW50ZXJydXB0aW5nKCkge1xuXHRcdC8vIHdoZW4gaW50ZXJydXB0YWJsZSBpcyAndHJ1ZScsIHJldHVybiB2YWx1ZSBpcyBhbHdheXMgJ3RydWUnLlxuXHRcdHJldHVybiB0aGlzLl9zdGF0dXMuY3VycmVudE9wdGlvbnMuaW50ZXJydXB0YWJsZSB8fCB0aGlzLl9zdGF0dXMucHJldmVudGVkO1xuXHR9XG5cblx0X3NldEludGVycnVwdChwcmV2ZW50ZWQpIHtcblx0XHQhdGhpcy5fc3RhdHVzLmN1cnJlbnRPcHRpb25zLmludGVycnVwdGFibGUgJiZcblx0XHQodGhpcy5fc3RhdHVzLnByZXZlbnRlZCA9IHByZXZlbnRlZCk7XG5cdH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXZlbnRIYW5kbGVyLmpzIiwiaW1wb3J0IEhhbW1lciBmcm9tIFwiaGFtbWVyanNcIjtcbmltcG9ydCB7dXRpbHN9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQge0RJUkVDVElPTiwgVU5JUVVFS0VZLCBTVVBQT1JUX1RPVUNIfSBmcm9tIFwiLi9jb25zdHNcIjtcblxuaWYgKHR5cGVvZiBIYW1tZXIgPT09IFwidW5kZWZpbmVkXCIpIHtcblx0dGhyb3cgbmV3IEVycm9yKGBUaGUgSGFtbWVyanMgbXVzdCBiZSBsb2FkZWQgYmVmb3JlIGVnLk1vdmFibGVDb29yZC5cXG5odHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL2ApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYW1tZXJNYW5hZ2VyIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5faGFtbWVycyA9IHt9O1xuXHR9XG5cblx0X2NyZWF0ZUhhbW1lcihlbCwgYmluZE9wdGlvbnMsIGlucHV0Q2xhc3MsIGhhbmRsZXIpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gY3JlYXRlIEhhbW1lclxuXHRcdFx0cmV0dXJuIHRoaXMuX2F0dGFjaEhhbW1lckV2ZW50cyhuZXcgSGFtbWVyLk1hbmFnZXIoZWwsIHtcblx0XHRcdFx0cmVjb2duaXplcnM6IFtcblx0XHRcdFx0XHRbXG5cdFx0XHRcdFx0XHRIYW1tZXIuUGFuLCB7XG5cdFx0XHRcdFx0XHRcdGRpcmVjdGlvbjogYmluZE9wdGlvbnMuZGlyZWN0aW9uLFxuXHRcdFx0XHRcdFx0XHR0aHJlc2hvbGQ6IDBcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdF0sXG5cblx0XHRcdFx0Ly8gY3NzIHByb3BlcnRpZXMgd2VyZSByZW1vdmVkIGR1ZSB0byB1c2FibGlsaXR5IGlzc3VlXG5cdFx0XHRcdC8vIGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vanNkb2MvSGFtbWVyLmRlZmF1bHRzLmNzc1Byb3BzLmh0bWxcblx0XHRcdFx0Y3NzUHJvcHM6IHtcblx0XHRcdFx0XHR1c2VyU2VsZWN0OiBcIm5vbmVcIixcblx0XHRcdFx0XHR0b3VjaFNlbGVjdDogXCJub25lXCIsXG5cdFx0XHRcdFx0dG91Y2hDYWxsb3V0OiBcIm5vbmVcIixcblx0XHRcdFx0XHR1c2VyRHJhZzogXCJub25lXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0aW5wdXRDbGFzc1xuXHRcdFx0fSksIGJpbmRPcHRpb25zLCBoYW5kbGVyKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRhZGQoZWxlbWVudCwgb3B0aW9ucywgaGFuZGxlcikge1xuXHRcdGNvbnN0IGVsID0gdXRpbHMuZ2V0RWxlbWVudChlbGVtZW50KTtcblx0XHRsZXQga2V5VmFsdWUgPSBlbC5nZXRBdHRyaWJ1dGUoVU5JUVVFS0VZKTtcblx0XHRjb25zdCBiaW5kT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdFx0ZGlyZWN0aW9uOiBESVJFQ1RJT04uRElSRUNUSU9OX0FMTCxcblx0XHRcdHNjYWxlOiBbMSwgMV0sXG5cdFx0XHR0aHJlc2hvbGRBbmdsZTogNDUsXG5cdFx0XHRpbnRlcnJ1cHRhYmxlOiB0cnVlLFxuXHRcdFx0aW5wdXRUeXBlOiBbXCJ0b3VjaFwiLCBcIm1vdXNlXCJdXG5cdFx0fSwgb3B0aW9ucyk7XG5cdFx0Y29uc3QgaW5wdXRDbGFzcyA9IHRoaXMuY29udmVydElucHV0VHlwZShiaW5kT3B0aW9ucy5pbnB1dFR5cGUpO1xuXG5cdFx0aWYgKCFpbnB1dENsYXNzKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKGtleVZhbHVlKSB7XG5cdFx0XHR0aGlzLl9oYW1tZXJzW2tleVZhbHVlXS5oYW1tZXIuZGVzdHJveSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRrZXlWYWx1ZSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcblx0XHR9XG5cdFx0dGhpcy5faGFtbWVyc1trZXlWYWx1ZV0gPSB7XG5cdFx0XHRoYW1tZXI6IHRoaXMuX2NyZWF0ZUhhbW1lcihcblx0XHRcdFx0ZWwsXG5cdFx0XHRcdGJpbmRPcHRpb25zLFxuXHRcdFx0XHRpbnB1dENsYXNzLFxuXHRcdFx0XHRoYW5kbGVyXG5cdFx0XHQpLFxuXHRcdFx0ZWwsXG5cdFx0XHRvcHRpb25zOiBiaW5kT3B0aW9uc1xuXHRcdH07XG5cdFx0ZWwuc2V0QXR0cmlidXRlKFVOSVFVRUtFWSwga2V5VmFsdWUpO1xuXHR9XG5cblx0cmVtb3ZlKGVsZW1lbnQpIHtcblx0XHRjb25zdCBlbCA9IHV0aWxzLmdldEVsZW1lbnQoZWxlbWVudCk7XG5cdFx0Y29uc3Qga2V5ID0gZWwuZ2V0QXR0cmlidXRlKFVOSVFVRUtFWSk7XG5cblx0XHRpZiAoa2V5KSB7XG5cdFx0XHR0aGlzLl9oYW1tZXJzW2tleV0uaGFtbWVyLmRlc3Ryb3koKTtcblx0XHRcdGRlbGV0ZSB0aGlzLl9oYW1tZXJzW2tleV07XG5cdFx0XHRlbC5yZW1vdmVBdHRyaWJ1dGUoVU5JUVVFS0VZKTtcblx0XHR9XG5cdH1cblxuXHRnZXRIYW1tZXIoZWxlbWVudCkge1xuXHRcdGNvbnN0IGRhdGEgPSB0aGlzLmdldChlbGVtZW50KTtcblxuXHRcdHJldHVybiBkYXRhID8gZGF0YS5oYW1tZXIgOiBudWxsO1xuXHR9XG5cblx0Z2V0KGVsZW1lbnQpIHtcblx0XHRjb25zdCBlbCA9IHV0aWxzLmdldEVsZW1lbnQoZWxlbWVudCk7XG5cdFx0Y29uc3Qga2V5ID0gZWwgPyBlbC5nZXRBdHRyaWJ1dGUoVU5JUVVFS0VZKSA6IG51bGw7XG5cblx0XHRpZiAoa2V5ICYmIHRoaXMuX2hhbW1lcnNba2V5XSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2hhbW1lcnNba2V5XTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0X2F0dGFjaEhhbW1lckV2ZW50cyhoYW1tZXIsIG9wdGlvbnMsIGhhbmRsZXIpIHtcblx0XHRjb25zdCBlbmFibGUgPSBoYW1tZXIuZ2V0KFwicGFuXCIpLm9wdGlvbnMuZW5hYmxlO1xuXG5cdFx0LyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cblx0XHRyZXR1cm4gaGFtbWVyXG5cdFx0XHQub24oXCJoYW1tZXIuaW5wdXRcIiwgZSA9PiB7XG5cdFx0XHRcdGlmIChlLmlzRmlyc3QpIHtcblx0XHRcdFx0XHQvLyBhcHBseSBvcHRpb25zIGVhY2hcblx0XHRcdFx0XHRoYW5kbGVyLl9zZXRDdXJyZW50VGFyZ2V0KGhhbW1lciwgb3B0aW9ucyk7XG5cdFx0XHRcdFx0ZW5hYmxlICYmIGhhbmRsZXIuX3N0YXJ0KGUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGUuaXNGaW5hbCkge1xuXHRcdFx0XHRcdC8vIHN1YnN0aXR1dGUgLm9uKFwicGFuZW5kIHRhcFwiLCB0aGlzLl9wYW5lbmQpOyBCZWNhdXNlIGl0KHRhcCwgcGFuZW5kKSBjYW5ub3QgY2F0Y2ggdmVydGljYWwoaG9yaXpvbnRhbCkgbW92ZW1lbnQgb24gSE9SSVpPTlRBTChWRVJUSUNBTCkgbW9kZS5cblx0XHRcdFx0XHRlbmFibGUgJiYgaGFuZGxlci5fZW5kKGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KS5vbihcInBhbnN0YXJ0IHBhbm1vdmVcIiwgZSA9PiBoYW5kbGVyLl9tb3ZlKGUpKTtcblx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5cdH1cblxuXHRfZGV0YWNoSGFtbWVyRXZlbnRzKGhhbW1lcikge1xuXHRcdGhhbW1lci5vZmYoXCJoYW1tZXIuaW5wdXQgcGFuc3RhcnQgcGFubW92ZSBwYW5lbmRcIik7XG5cdH1cblxuXHRjb252ZXJ0SW5wdXRUeXBlKGlucHV0VHlwZSA9IFtdKSB7XG5cdFx0bGV0IGhhc1RvdWNoID0gZmFsc2U7XG5cdFx0bGV0IGhhc01vdXNlID0gZmFsc2U7XG5cdFx0Y29uc3QgaW5wdXRzID0gaW5wdXRUeXBlIHx8IFtdO1xuXG5cdFx0aW5wdXRzLmZvckVhY2godiA9PiB7XG5cdFx0XHRzd2l0Y2ggKHYpIHtcblx0XHRcdFx0Y2FzZSBcIm1vdXNlXCIgOiBoYXNNb3VzZSA9IHRydWU7IGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwidG91Y2hcIiA6IGhhc1RvdWNoID0gU1VQUE9SVF9UT1VDSDtcblx0XHRcdFx0Ly8gbm8gZGVmYXVsdFxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiAoaGFzVG91Y2ggJiYgSGFtbWVyLlRvdWNoSW5wdXQpIHx8XG5cdFx0XHQoaGFzTW91c2UgJiYgSGFtbWVyLk1vdXNlSW5wdXQpIHx8IG51bGw7XG5cdH1cblxuXHRpbnB1dENvbnRyb2woaXNFbmFibGUsIGVsZW1lbnQpIHtcblx0XHRjb25zdCBvcHRpb24gPSB7XG5cdFx0XHRlbmFibGU6IGlzRW5hYmxlXG5cdFx0fTtcblxuXHRcdGlmIChlbGVtZW50KSB7XG5cdFx0XHRjb25zdCBoYW1tZXIgPSB0aGlzLmdldEhhbW1lcihlbGVtZW50KTtcblxuXHRcdFx0aGFtbWVyICYmIGhhbW1lci5nZXQoXCJwYW5cIikuc2V0KG9wdGlvbik7XG5cdFx0fSBlbHNlIHsgLy8gZm9yIG11bHRpXG5cdFx0XHRmb3IgKGNvbnN0IHAgaW4gdGhpcy5faGFtbWVycykge1xuXHRcdFx0XHR0aGlzLl9oYW1tZXJzW3BdLmhhbW1lci5nZXQoXCJwYW5cIikuc2V0KG9wdGlvbik7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0ZGVzdHJveSgpIHtcblx0XHRmb3IgKGNvbnN0IHAgaW4gdGhpcy5faGFtbWVycykge1xuXHRcdFx0dGhpcy5faGFtbWVyc1twXS5oYW1tZXIuZGVzdHJveSgpO1xuXHRcdFx0dGhpcy5faGFtbWVyc1twXS5lbC5yZW1vdmVBdHRyaWJ1dGUoVU5JUVVFS0VZKTtcblx0XHRcdGRlbGV0ZSB0aGlzLl9oYW1tZXJzW3BdO1xuXHRcdH1cblx0XHR0aGlzLl9oYW1tZXJzID0ge307XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9oYW1tZXJNYW5hZ2VyLmpzIiwiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiQ29tcG9uZW50XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImVnXCJdID0gcm9vdFtcImVnXCJdIHx8IHt9LCByb290W1wiZWdcIl1bXCJDb21wb25lbnRcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuLyoqKioqKi8gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4vKioqKioqLyBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4vKioqKioqLyBcdFx0XHRcdGdldDogZ2V0dGVyXG4vKioqKioqLyBcdFx0XHR9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovIFx0XHRyZXR1cm4gZ2V0dGVyO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgTkFWRVIgQ29ycC5cbiAqIGVnanMgcHJvamVjdHMgYXJlIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5cbi8qKlxuICogQSBjbGFzcyB1c2VkIHRvIG1hbmFnZSBldmVudHMgYW5kIG9wdGlvbnMgaW4gYSBjb21wb25lbnRcbiAqIEBjbGFzc1xuICogQGdyb3VwIGVnanNcbiAqIEBuYW1lIGVnLkNvbXBvbmVudFxuICogQGtvIOy7tO2PrOuEjO2KuOydmCDsnbTrsqTtirjsmYAg7Ji17IWY7J2EIOq0gOumrO2VoCDsiJgg7J6I6rKMIO2VmOuKlCDtgbTrnpjsiqRcbiAqXG4gKiBAc3VwcG9ydCB7XCJpZVwiOiBcIjcrXCIsIFwiY2hcIiA6IFwibGF0ZXN0XCIsIFwiZmZcIiA6IFwibGF0ZXN0XCIsICBcInNmXCIgOiBcImxhdGVzdFwiLCBcImVkZ2VcIiA6IFwibGF0ZXN0XCIsIFwiaW9zXCIgOiBcIjcrXCIsIFwiYW5cIiA6IFwiMi4xKyAoZXhjZXB0IDMueClcIn1cbiAqL1xudmFyIENvbXBvbmVudCA9IGV4cG9ydHMuQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBDb21wb25lbnQoKSB7XG5cdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbXBvbmVudCk7XG5cblx0XHR0aGlzLl9ldmVudEhhbmRsZXIgPSB7fTtcblx0XHR0aGlzLl9vcHRpb25zID0ge307XG5cdH1cblx0LyoqXG4gICogU2V0cyBvcHRpb25zIGluIGEgY29tcG9uZW50IG9yIHJldHVybnMgdGhlbS5cbiAgKiBAa28g7Lu07Y+s64SM7Yq47JeQIOyYteyFmOydhCDshKTsoJXtlZjqsbDrgpgg7Ji17IWY7J2EIOuwmO2ZmO2VnOuLpFxuICAqIEBtZXRob2QgZWcuQ29tcG9uZW50I29wdGlvblxuICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgb3B0aW9uPGtvPuyYteyFmOydmCDtgqQ8L2tvPlxuICAqIEBwYXJhbSB7T2JqZWN0fSBbdmFsdWVdIFRoZSBvcHRpb24gdmFsdWUgdGhhdCBjb3JyZXNwb25kcyB0byBhIGdpdmVuIGtleSA8a28+7YKk7JeQIO2VtOuLue2VmOuKlCDsmLXshZjqsJI8L2tvPlxuICAqIEByZXR1cm4ge2VnLkNvbXBvbmVudHxPYmplY3R9IEFuIGluc3RhbmNlLCBhbiBvcHRpb24gdmFsdWUsIG9yIGFuIG9wdGlvbiBvYmplY3Qgb2YgYSBjb21wb25lbnQgaXRzZWxmLjxicj4tIElmIGJvdGgga2V5IGFuZCB2YWx1ZSBhcmUgdXNlZCB0byBzZXQgYW4gb3B0aW9uLCBpdCByZXR1cm5zIGFuIGluc3RhbmNlIG9mIGEgY29tcG9uZW50IGl0c2VsZi48YnI+LSBJZiBvbmx5IGEga2V5IGlzIHNwZWNpZmllZCBmb3IgdGhlIHBhcmFtZXRlciwgaXQgcmV0dXJucyB0aGUgb3B0aW9uIHZhbHVlIGNvcnJlc3BvbmRpbmcgdG8gYSBnaXZlbiBrZXkuPGJyPi0gSWYgbm90aGluZyBpcyBzcGVjaWZpZWQsIGl0IHJldHVybnMgYW4gb3B0aW9uIG9iamVjdC4gPGtvPuy7tO2PrOuEjO2KuCDsnpDsi6DsnZgg7J247Iqk7YS07Iqk64KYIOyYteyFmOqwkiwg7Ji17IWYIOqwneyytC48YnI+LSDtgqTsmYAg6rCS7Jy866GcIOyYteyFmOydhCDshKTsoJXtlZjrqbQg7Lu07Y+s64SM7Yq4IOyekOyLoOydmCDsnbjsiqTthLTsiqTrpbwg67CY7ZmY7ZWc64ukLjxicj4tIO2MjOudvOuvuO2EsOyXkCDtgqTrp4wg7ISk7KCV7ZWY66m0IO2CpOyXkCDtlbTri7ntlZjripQg7Ji17IWY6rCS7J2EIOuwmO2ZmO2VnOuLpC48YnI+LSDtjIzrnbzrr7jthLDsl5Ag7JWE66y06rKD64+EIOyEpOygle2VmOyngCDslYrsnLzrqbQg7Ji17IWYIOqwneyytOulvCDrsJjtmZjtlZzri6QuPC9rbz5cbiAgKiBAZXhhbXBsZVxuIFx0IGNsYXNzIFNvbWUgZXh0ZW5kcyBlZy5Db21wb25lbnR7XG4gXHRcdH1cbiBcdCBjb25zdCBzb21lID0gbmV3IFNvbWUoe1xuIFx0XHRcImZvb1wiOiAxLFxuIFx0XHRcImJhclwiOiAyXG4gXHR9KTtcbiBcdCBzb21lLm9wdGlvbihcImZvb1wiKTsgLy8gcmV0dXJuIDFcbiAgc29tZS5vcHRpb24oXCJmb29cIiwzKTsgLy8gcmV0dXJuIHNvbWUgaW5zdGFuY2VcbiAgc29tZS5vcHRpb24oKTsgLy8gcmV0dXJuIG9wdGlvbnMgb2JqZWN0LlxuICBzb21lLm9wdGlvbih7XG4gXHRcdFwiZm9vXCIgOiAxMCxcbiBcdFx0XCJiYXJcIiA6IDIwLFxuIFx0XHRcImJhelwiIDogMzBcbiBcdH0pOyAvLyByZXR1cm4gc29tZSBpbnN0YW5jZS5cbiAgKi9cblxuXG5cdF9jcmVhdGVDbGFzcyhDb21wb25lbnQsIFt7XG5cdFx0a2V5OiBcIm9wdGlvblwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBvcHRpb24oKSB7XG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSB7XG5cdFx0XHRcdHZhciBfa2V5ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzBdO1xuXHRcdFx0XHR2YXIgdmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbMV07XG5cdFx0XHRcdHRoaXMuX29wdGlvbnNbX2tleV0gPSB2YWx1ZTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBrZXkgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbMF07XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fb3B0aW9uc1trZXldO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fb3B0aW9ucztcblx0XHRcdH1cblxuXHRcdFx0dmFyIG9wdGlvbnMgPSBrZXk7XG5cdFx0XHR0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdC8qKlxuICAgKiBUcmlnZ2VycyBhIGN1c3RvbSBldmVudC5cbiAgICogQGtvIOy7pOyKpO2FgCDsnbTrsqTtirjrpbwg67Cc7IOd7Iuc7YKo64ukXG4gICAqIEBtZXRob2QgZWcuQ29tcG9uZW50I3RyaWdnZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZSBUaGUgbmFtZSBvZiB0aGUgY3VzdG9tIGV2ZW50IHRvIGJlIHRyaWdnZXJlZCA8a28+67Cc7IOd7ZWgIOy7pOyKpO2FgCDsnbTrsqTtirjsnZgg7J2066aEPC9rbz5cbiAgICogQHBhcmFtIHtPYmplY3R9IGN1c3RvbUV2ZW50IEV2ZW50IGRhdGEgdG8gYmUgc2VudCB3aGVuIHRyaWdnZXJpbmcgYSBjdXN0b20gZXZlbnQgPGtvPuy7pOyKpO2FgCDsnbTrsqTtirjqsIAg67Cc7IOd7ZWgIOuVjCDsoITri6ztlaAg642w7J207YSwPC9rbz5cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGV2ZW50IGhhcyBvY2N1cnJlZC4gSWYgdGhlIHN0b3AoKSBtZXRob2QgaXMgY2FsbGVkIGJ5IGEgY3VzdG9tIGV2ZW50IGhhbmRsZXIsIGl0IHdpbGwgcmV0dXJuIGZhbHNlIGFuZCBwcmV2ZW50IHRoZSBldmVudCBmcm9tIG9jY3VycmluZy4gPGtvPuydtOuypO2KuCDrsJzsg50g7Jes67aALiDsu6TsiqTthYAg7J2067Kk7Yq4IO2VuOuTpOufrOyXkOyEnCBzdG9wKCkg66mU7ISc65Oc66W8IO2YuOy2nO2VmOuptCAnZmFsc2Un66W8IOuwmO2ZmO2VmOqzoCDsnbTrsqTtirgg67Cc7IOd7J2EIOykkeuLqO2VnOuLpC48L2tvPlxuICAgKiBAZXhhbXBsZVxuICAgY2xhc3MgU29tZSBleHRlbmRzIGVnLkNvbXBvbmVudHtcbiAgXHRcdHNvbWUoKXtcbiAgXHRcdFx0dGhpcy50cmlnZ2VyKFwiaGlcIik7Ly8gZmlyZSBoaSBldmVudC5cbiAgXHRcdH1cbiAgXHR9XG4gICAqL1xuXG5cdH0sIHtcblx0XHRrZXk6IFwidHJpZ2dlclwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiB0cmlnZ2VyKGV2ZW50TmFtZSkge1xuXHRcdFx0dmFyIGN1c3RvbUV2ZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuXHRcdFx0dmFyIGhhbmRsZXJMaXN0ID0gdGhpcy5fZXZlbnRIYW5kbGVyW2V2ZW50TmFtZV0gfHwgW107XG5cdFx0XHR2YXIgaGFzSGFuZGxlckxpc3QgPSBoYW5kbGVyTGlzdC5sZW5ndGggPiAwO1xuXG5cdFx0XHRpZiAoIWhhc0hhbmRsZXJMaXN0KSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBkZXRhY2ggbWV0aG9kIGNhbGwgaW4gaGFuZGxlciBpbiBmaXJzdCB0aW1lIHRoZW4gaGFuZGVsZXIgbGlzdCBjYWxscy5cblx0XHRcdGhhbmRsZXJMaXN0ID0gaGFuZGxlckxpc3QuY29uY2F0KCk7XG5cblx0XHRcdGN1c3RvbUV2ZW50LmV2ZW50VHlwZSA9IGV2ZW50TmFtZTtcblxuXHRcdFx0dmFyIGlzQ2FuY2VsZWQgPSBmYWxzZTtcblx0XHRcdHZhciBhcmcgPSBbY3VzdG9tRXZlbnRdO1xuXHRcdFx0dmFyIGkgPSB2b2lkIDA7XG5cblx0XHRcdGN1c3RvbUV2ZW50LnN0b3AgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBpc0NhbmNlbGVkID0gdHJ1ZTtcblx0XHRcdH07XG5cblx0XHRcdGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCByZXN0UGFyYW0gPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkyID0gMjsgX2tleTIgPCBfbGVuOyBfa2V5MisrKSB7XG5cdFx0XHRcdHJlc3RQYXJhbVtfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHJlc3RQYXJhbS5sZW5ndGggPj0gMSkge1xuXHRcdFx0XHRhcmcgPSBhcmcuY29uY2F0KHJlc3RQYXJhbSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoaSBpbiBoYW5kbGVyTGlzdCkge1xuXHRcdFx0XHRoYW5kbGVyTGlzdFtpXS5hcHBseSh0aGlzLCBhcmcpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gIWlzQ2FuY2VsZWQ7XG5cdFx0fVxuXHRcdC8qKlxuICAgKiBFeGVjdXRlZCBldmVudCBqdXN0IG9uZSB0aW1lLlxuICAgKiBAa28g7J2067Kk7Yq46rCAIO2VnOuyiOunjCDsi6TtlonrkJzri6QuXG4gICAqIEBtZXRob2QgZWcuQ29tcG9uZW50I29uY2VcbiAgICogQHBhcmFtIHtldmVudE5hbWV9IGV2ZW50TmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gYmUgYXR0YWNoZWQgPGtvPuuTseuhne2VoCDsnbTrsqTtirjsnZgg7J2066aEPC9rbz5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclRvQXR0YWNoIFRoZSBoYW5kbGVyIGZ1bmN0aW9uIG9mIHRoZSBldmVudCB0byBiZSBhdHRhY2hlZCA8a28+65Ox66Gd7ZWgIOydtOuypO2KuOydmCDtlbjrk6Trn6wg7ZWo7IiYPC9rbz5cbiAgICogQHJldHVybiB7ZWcuQ29tcG9uZW50fSBBbiBpbnN0YW5jZSBvZiBhIGNvbXBvbmVudCBpdHNlbGY8a28+7Lu07Y+s64SM7Yq4IOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuICAgKiBAZXhhbXBsZVxuICAgY2xhc3MgU29tZSBleHRlbmRzIGVnLkNvbXBvbmVudHtcbiAgXHRcdGhpKCl7XG4gIFx0XHRcdGFsZXJ0KFwiaGlcIik7XG4gIFx0XHR9XG4gIFx0XHR0aGluZygpe1xuICBcdFx0XHR0aGlzLm9uY2UoXCJoaVwiLCB0aGlzLmhpKTtcbiAgXHRcdH1cbiAgXHR9XG4gIFx0IHZhciBzb21lID0gbmV3IFNvbWUoKTtcbiAgIHNvbWUudGhpbmcoKTtcbiAgIHNvbWUudHJpZ2dlcihcImhpXCIpO1xuICAgLy8gZmlyZSBhbGVydChcImhpXCIpO1xuICAgc29tZS50cmlnZ2VyKFwiaGlcIik7XG4gICAvLyBOb3RoaW5nIGhhcHBlbnNcbiAgICovXG5cblx0fSwge1xuXHRcdGtleTogXCJvbmNlXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIG9uY2UoZXZlbnROYW1lLCBoYW5kbGVyVG9BdHRhY2gpIHtcblx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cblx0XHRcdGlmICgodHlwZW9mIGV2ZW50TmFtZSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGV2ZW50TmFtZSkpID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBoYW5kbGVyVG9BdHRhY2ggPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0dmFyIGV2ZW50SGFzaCA9IGV2ZW50TmFtZTtcblx0XHRcdFx0dmFyIGkgPSB2b2lkIDA7XG5cdFx0XHRcdGZvciAoaSBpbiBldmVudEhhc2gpIHtcblx0XHRcdFx0XHR0aGlzLm9uY2UoaSwgZXZlbnRIYXNoW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGV2ZW50TmFtZSA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgaGFuZGxlclRvQXR0YWNoID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgc2VsZiA9IF90aGlzO1xuXHRcdFx0XHRcdF90aGlzLm9uKGV2ZW50TmFtZSwgZnVuY3Rpb24gbGlzdGVuZXIoKSB7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZyA9IEFycmF5KF9sZW4yKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4yOyBfa2V5MysrKSB7XG5cdFx0XHRcdFx0XHRcdGFyZ1tfa2V5M10gPSBhcmd1bWVudHNbX2tleTNdO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRoYW5kbGVyVG9BdHRhY2guYXBwbHkoc2VsZiwgYXJnKTtcblx0XHRcdFx0XHRcdHNlbGYub2ZmKGV2ZW50TmFtZSwgbGlzdGVuZXIpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHQvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgYW4gZXZlbnQgaGFzIGJlZW4gYXR0YWNoZWQgdG8gYSBjb21wb25lbnQuXG4gICAqIEBrbyDsu7Ttj6zrhIztirjsl5Ag7J2067Kk7Yq46rCAIOuTseuhneuQkOuKlOyngCDtmZXsnbjtlZzri6QuXG4gICAqIEBtZXRob2QgZWcuQ29tcG9uZW50I2hhc09uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGJlIGF0dGFjaGVkIDxrbz7rk7HroZ0g7Jes67aA66W8IO2ZleyduO2VoCDsnbTrsqTtirjsnZgg7J2066aEPC9rbz5cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGV2ZW50IGlzIGF0dGFjaGVkLiA8a28+7J2067Kk7Yq4IOuTseuhnSDsl6zrtoA8L2tvPlxuICAgKiBAZXhhbXBsZVxuICAgY2xhc3MgU29tZSBleHRlbmRzIGVnLkNvbXBvbmVudHtcbiAgXHRcdHNvbWUoKXtcbiAgXHRcdFx0dGhpcy5oYXNPbihcImhpXCIpOy8vIGNoZWNrIGhpIGV2ZW50LlxuICBcdFx0fVxuICBcdH1cbiAgICovXG5cblx0fSwge1xuXHRcdGtleTogXCJoYXNPblwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYXNPbihldmVudE5hbWUpIHtcblx0XHRcdHJldHVybiAhIXRoaXMuX2V2ZW50SGFuZGxlcltldmVudE5hbWVdO1xuXHRcdH1cblxuXHRcdC8qKlxuICAgKiBBdHRhY2hlcyBhbiBldmVudCB0byBhIGNvbXBvbmVudC5cbiAgICogQGtvIOy7tO2PrOuEjO2KuOyXkCDsnbTrsqTtirjrpbwg65Ox66Gd7ZWc64ukLlxuICAgKiBAbWV0aG9kIGVnLkNvbXBvbmVudCNvblxuICAgKiBAcGFyYW0ge2V2ZW50TmFtZX0gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBiZSBhdHRhY2hlZCA8a28+65Ox66Gd7ZWgIOydtOuypO2KuOydmCDsnbTrpoQ8L2tvPlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyVG9BdHRhY2ggVGhlIGhhbmRsZXIgZnVuY3Rpb24gb2YgdGhlIGV2ZW50IHRvIGJlIGF0dGFjaGVkIDxrbz7rk7HroZ3tlaAg7J2067Kk7Yq47J2YIO2VuOuTpOufrCDtlajsiJg8L2tvPlxuICAgKiBAcmV0dXJuIHtlZy5Db21wb25lbnR9IEFuIGluc3RhbmNlIG9mIGEgY29tcG9uZW50IGl0c2VsZjxrbz7su7Ttj6zrhIztirgg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG4gICAqIEBleGFtcGxlXG4gICBjbGFzcyBTb21lIGV4dGVuZHMgZWcuQ29tcG9uZW50e1xuICAgXHRcdGhpKCl7XG4gIFx0XHRcdGNvbnNvbGUubG9nKFwiaGlcIik7XG4gICBcdFx0fVxuICBcdFx0c29tZSgpe1xuICBcdFx0XHR0aGlzLm9uKFwiaGlcIix0aGlzLmhpKTsgLy9hdHRhY2ggZXZlbnRcbiAgXHRcdH1cbiAgXHR9XG4gICAqL1xuXG5cdH0sIHtcblx0XHRrZXk6IFwib25cIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gb24oZXZlbnROYW1lLCBoYW5kbGVyVG9BdHRhY2gpIHtcblx0XHRcdGlmICgodHlwZW9mIGV2ZW50TmFtZSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGV2ZW50TmFtZSkpID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBoYW5kbGVyVG9BdHRhY2ggPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0dmFyIGV2ZW50SGFzaCA9IGV2ZW50TmFtZTtcblx0XHRcdFx0dmFyIG5hbWUgPSB2b2lkIDA7XG5cdFx0XHRcdGZvciAobmFtZSBpbiBldmVudEhhc2gpIHtcblx0XHRcdFx0XHR0aGlzLm9uKG5hbWUsIGV2ZW50SGFzaFtuYW1lXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBldmVudE5hbWUgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIGhhbmRsZXJUb0F0dGFjaCA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdHZhciBoYW5kbGVyTGlzdCA9IHRoaXMuX2V2ZW50SGFuZGxlcltldmVudE5hbWVdO1xuXG5cdFx0XHRcdGlmICh0eXBlb2YgaGFuZGxlckxpc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0XHRoYW5kbGVyTGlzdCA9IHRoaXMuX2V2ZW50SGFuZGxlcltldmVudE5hbWVdID0gW107XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRoYW5kbGVyTGlzdC5wdXNoKGhhbmRsZXJUb0F0dGFjaCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHQvKipcbiAgICogRGV0YWNoZXMgYW4gZXZlbnQgZnJvbSB0aGUgY29tcG9uZW50LlxuICAgKiBAa28g7Lu07Y+s64SM7Yq47JeQIOuTseuhneuQnCDsnbTrsqTtirjrpbwg7ZW07KCc7ZWc64ukXG4gICAqIEBtZXRob2QgZWcuQ29tcG9uZW50I29mZlxuICAgKiBAcGFyYW0ge2V2ZW50TmFtZX0gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBiZSBkZXRhY2hlZCA8a28+7ZW07KCc7ZWgIOydtOuypO2KuOydmCDsnbTrpoQ8L2tvPlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyVG9EZXRhY2ggVGhlIGhhbmRsZXIgZnVuY3Rpb24gb2YgdGhlIGV2ZW50IHRvIGJlIGRldGFjaGVkIDxrbz7tlbTsoJztlaAg7J2067Kk7Yq47J2YIO2VuOuTpOufrCDtlajsiJg8L2tvPlxuICAgKiBAcmV0dXJuIHtlZy5Db21wb25lbnR9IEFuIGluc3RhbmNlIG9mIGEgY29tcG9uZW50IGl0c2VsZiA8a28+7Lu07Y+s64SM7Yq4IOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuICAgKiBAZXhhbXBsZVxuICAgY2xhc3MgU29tZSBleHRlbmRzIGVnLkNvbXBvbmVudHtcbiAgIFx0XHRoaSgpe1xuICBcdFx0XHRjb25zb2xlLmxvZyhcImhpXCIpO1xuICAgXHRcdH1cbiAgXHRcdHNvbWUoKXtcbiAgXHRcdFx0dGhpcy5vZmYoXCJoaVwiLHRoaXMuaGkpOyAvL2RldGFjaCBldmVudFxuICBcdFx0fVxuICBcdH1cbiAgICovXG5cblx0fSwge1xuXHRcdGtleTogXCJvZmZcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gb2ZmKGV2ZW50TmFtZSwgaGFuZGxlclRvRGV0YWNoKSB7XG5cdFx0XHQvLyBBbGwgZXZlbnQgZGV0YWNoLlxuXHRcdFx0aWYgKHR5cGVvZiBldmVudE5hbWUgPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0dGhpcy5fZXZlbnRIYW5kbGVyID0ge307XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBbGwgaGFuZGxlciBvZiBzcGVjaWZpYyBldmVudCBkZXRhY2guXG5cdFx0XHRpZiAodHlwZW9mIGhhbmRsZXJUb0RldGFjaCA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHRpZiAodHlwZW9mIGV2ZW50TmFtZSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRcdHRoaXMuX2V2ZW50SGFuZGxlcltldmVudE5hbWVdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhciBldmVudEhhc2ggPSBldmVudE5hbWU7XG5cdFx0XHRcdFx0dmFyIG5hbWUgPSB2b2lkIDA7XG5cdFx0XHRcdFx0Zm9yIChuYW1lIGluIGV2ZW50SGFzaCkge1xuXHRcdFx0XHRcdFx0dGhpcy5vZmYobmFtZSwgZXZlbnRIYXNoW25hbWVdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVGhlIGhhbmRsZXIgb2Ygc3BlY2lmaWMgZXZlbnQgZGV0YWNoLlxuXHRcdFx0dmFyIGhhbmRsZXJMaXN0ID0gdGhpcy5fZXZlbnRIYW5kbGVyW2V2ZW50TmFtZV07XG5cdFx0XHRpZiAoaGFuZGxlckxpc3QpIHtcblx0XHRcdFx0dmFyIGsgPSB2b2lkIDA7XG5cdFx0XHRcdHZhciBoYW5kbGVyRnVuY3Rpb24gPSB2b2lkIDA7XG5cdFx0XHRcdGZvciAoayA9IDAsIGhhbmRsZXJGdW5jdGlvbjsgaGFuZGxlckZ1bmN0aW9uID0gaGFuZGxlckxpc3Rba107IGsrKykge1xuXHRcdFx0XHRcdGlmIChoYW5kbGVyRnVuY3Rpb24gPT09IGhhbmRsZXJUb0RldGFjaCkge1xuXHRcdFx0XHRcdFx0aGFuZGxlckxpc3QgPSBoYW5kbGVyTGlzdC5zcGxpY2UoaywgMSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHR9XSk7XG5cblx0cmV0dXJuIENvbXBvbmVudDtcbn0oKTtcblxuLyoqKi8gfSksXG4vKiAxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBfY29tcG9uZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxubW9kdWxlLmV4cG9ydHMgPSBfY29tcG9uZW50LkNvbXBvbmVudDtcblxuLyoqKi8gfSlcbi8qKioqKiovIF0pO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21wb25lbnQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L0BlZ2pzL2NvbXBvbmVudC9kaXN0L2NvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qISBIYW1tZXIuSlMgLSB2Mi4wLjcgLSAyMDE2LTA0LTIyXG4gKiBodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNiBKb3JpayBUYW5nZWxkZXI7XG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgKi9cbihmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50LCBleHBvcnROYW1lLCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG52YXIgVkVORE9SX1BSRUZJWEVTID0gWycnLCAnd2Via2l0JywgJ01veicsICdNUycsICdtcycsICdvJ107XG52YXIgVEVTVF9FTEVNRU5UID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbnZhciBUWVBFX0ZVTkNUSU9OID0gJ2Z1bmN0aW9uJztcblxudmFyIHJvdW5kID0gTWF0aC5yb3VuZDtcbnZhciBhYnMgPSBNYXRoLmFicztcbnZhciBub3cgPSBEYXRlLm5vdztcblxuLyoqXG4gKiBzZXQgYSB0aW1lb3V0IHdpdGggYSBnaXZlbiBzY29wZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lb3V0XG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gc2V0VGltZW91dENvbnRleHQoZm4sIHRpbWVvdXQsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gc2V0VGltZW91dChiaW5kRm4oZm4sIGNvbnRleHQpLCB0aW1lb3V0KTtcbn1cblxuLyoqXG4gKiBpZiB0aGUgYXJndW1lbnQgaXMgYW4gYXJyYXksIHdlIHdhbnQgdG8gZXhlY3V0ZSB0aGUgZm4gb24gZWFjaCBlbnRyeVxuICogaWYgaXQgYWludCBhbiBhcnJheSB3ZSBkb24ndCB3YW50IHRvIGRvIGEgdGhpbmcuXG4gKiB0aGlzIGlzIHVzZWQgYnkgYWxsIHRoZSBtZXRob2RzIHRoYXQgYWNjZXB0IGEgc2luZ2xlIGFuZCBhcnJheSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7KnxBcnJheX0gYXJnXG4gKiBAcGFyYW0ge1N0cmluZ30gZm5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGV4dF1cbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpbnZva2VBcnJheUFyZyhhcmcsIGZuLCBjb250ZXh0KSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuICAgICAgICBlYWNoKGFyZywgY29udGV4dFtmbl0sIGNvbnRleHQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIHdhbGsgb2JqZWN0cyBhbmQgYXJyYXlzXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRvclxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAqL1xuZnVuY3Rpb24gZWFjaChvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgdmFyIGk7XG5cbiAgICBpZiAoIW9iaikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG9iai5mb3JFYWNoKSB7XG4gICAgICAgIG9iai5mb3JFYWNoKGl0ZXJhdG9yLCBjb250ZXh0KTtcbiAgICB9IGVsc2UgaWYgKG9iai5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBvYmoubGVuZ3RoKSB7XG4gICAgICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoaSBpbiBvYmopIHtcbiAgICAgICAgICAgIG9iai5oYXNPd25Qcm9wZXJ0eShpKSAmJiBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiB3cmFwIGEgbWV0aG9kIHdpdGggYSBkZXByZWNhdGlvbiB3YXJuaW5nIGFuZCBzdGFjayB0cmFjZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gd3JhcHBpbmcgdGhlIHN1cHBsaWVkIG1ldGhvZC5cbiAqL1xuZnVuY3Rpb24gZGVwcmVjYXRlKG1ldGhvZCwgbmFtZSwgbWVzc2FnZSkge1xuICAgIHZhciBkZXByZWNhdGlvbk1lc3NhZ2UgPSAnREVQUkVDQVRFRCBNRVRIT0Q6ICcgKyBuYW1lICsgJ1xcbicgKyBtZXNzYWdlICsgJyBBVCBcXG4nO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IoJ2dldC1zdGFjay10cmFjZScpO1xuICAgICAgICB2YXIgc3RhY2sgPSBlICYmIGUuc3RhY2sgPyBlLnN0YWNrLnJlcGxhY2UoL15bXlxcKF0rP1tcXG4kXS9nbSwgJycpXG4gICAgICAgICAgICAucmVwbGFjZSgvXlxccythdFxccysvZ20sICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL15PYmplY3QuPGFub255bW91cz5cXHMqXFwoL2dtLCAne2Fub255bW91c30oKUAnKSA6ICdVbmtub3duIFN0YWNrIFRyYWNlJztcblxuICAgICAgICB2YXIgbG9nID0gd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLndhcm4gfHwgd2luZG93LmNvbnNvbGUubG9nKTtcbiAgICAgICAgaWYgKGxvZykge1xuICAgICAgICAgICAgbG9nLmNhbGwod2luZG93LmNvbnNvbGUsIGRlcHJlY2F0aW9uTWVzc2FnZSwgc3RhY2spO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuXG4vKipcbiAqIGV4dGVuZCBvYmplY3QuXG4gKiBtZWFucyB0aGF0IHByb3BlcnRpZXMgaW4gZGVzdCB3aWxsIGJlIG92ZXJ3cml0dGVuIGJ5IHRoZSBvbmVzIGluIHNyYy5cbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBvYmplY3RzX3RvX2Fzc2lnblxuICogQHJldHVybnMge09iamVjdH0gdGFyZ2V0XG4gKi9cbnZhciBhc3NpZ247XG5pZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gIT09ICdmdW5jdGlvbicpIHtcbiAgICBhc3NpZ24gPSBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0KSB7XG4gICAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG91dHB1dCA9IE9iamVjdCh0YXJnZXQpO1xuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF07XG4gICAgICAgICAgICBpZiAoc291cmNlICE9PSB1bmRlZmluZWQgJiYgc291cmNlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmV4dEtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShuZXh0S2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0W25leHRLZXldID0gc291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcbn0gZWxzZSB7XG4gICAgYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcbn1cblxuLyoqXG4gKiBleHRlbmQgb2JqZWN0LlxuICogbWVhbnMgdGhhdCBwcm9wZXJ0aWVzIGluIGRlc3Qgd2lsbCBiZSBvdmVyd3JpdHRlbiBieSB0aGUgb25lcyBpbiBzcmMuXG4gKiBAcGFyYW0ge09iamVjdH0gZGVzdFxuICogQHBhcmFtIHtPYmplY3R9IHNyY1xuICogQHBhcmFtIHtCb29sZWFufSBbbWVyZ2U9ZmFsc2VdXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBkZXN0XG4gKi9cbnZhciBleHRlbmQgPSBkZXByZWNhdGUoZnVuY3Rpb24gZXh0ZW5kKGRlc3QsIHNyYywgbWVyZ2UpIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHNyYyk7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwga2V5cy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCFtZXJnZSB8fCAobWVyZ2UgJiYgZGVzdFtrZXlzW2ldXSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgZGVzdFtrZXlzW2ldXSA9IHNyY1trZXlzW2ldXTtcbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiBkZXN0O1xufSwgJ2V4dGVuZCcsICdVc2UgYGFzc2lnbmAuJyk7XG5cbi8qKlxuICogbWVyZ2UgdGhlIHZhbHVlcyBmcm9tIHNyYyBpbiB0aGUgZGVzdC5cbiAqIG1lYW5zIHRoYXQgcHJvcGVydGllcyB0aGF0IGV4aXN0IGluIGRlc3Qgd2lsbCBub3QgYmUgb3ZlcndyaXR0ZW4gYnkgc3JjXG4gKiBAcGFyYW0ge09iamVjdH0gZGVzdFxuICogQHBhcmFtIHtPYmplY3R9IHNyY1xuICogQHJldHVybnMge09iamVjdH0gZGVzdFxuICovXG52YXIgbWVyZ2UgPSBkZXByZWNhdGUoZnVuY3Rpb24gbWVyZ2UoZGVzdCwgc3JjKSB7XG4gICAgcmV0dXJuIGV4dGVuZChkZXN0LCBzcmMsIHRydWUpO1xufSwgJ21lcmdlJywgJ1VzZSBgYXNzaWduYC4nKTtcblxuLyoqXG4gKiBzaW1wbGUgY2xhc3MgaW5oZXJpdGFuY2VcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNoaWxkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBiYXNlXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXNdXG4gKi9cbmZ1bmN0aW9uIGluaGVyaXQoY2hpbGQsIGJhc2UsIHByb3BlcnRpZXMpIHtcbiAgICB2YXIgYmFzZVAgPSBiYXNlLnByb3RvdHlwZSxcbiAgICAgICAgY2hpbGRQO1xuXG4gICAgY2hpbGRQID0gY2hpbGQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShiYXNlUCk7XG4gICAgY2hpbGRQLmNvbnN0cnVjdG9yID0gY2hpbGQ7XG4gICAgY2hpbGRQLl9zdXBlciA9IGJhc2VQO1xuXG4gICAgaWYgKHByb3BlcnRpZXMpIHtcbiAgICAgICAgYXNzaWduKGNoaWxkUCwgcHJvcGVydGllcyk7XG4gICAgfVxufVxuXG4vKipcbiAqIHNpbXBsZSBmdW5jdGlvbiBiaW5kXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gYmluZEZuKGZuLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGJvdW5kRm4oKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbi8qKlxuICogbGV0IGEgYm9vbGVhbiB2YWx1ZSBhbHNvIGJlIGEgZnVuY3Rpb24gdGhhdCBtdXN0IHJldHVybiBhIGJvb2xlYW5cbiAqIHRoaXMgZmlyc3QgaXRlbSBpbiBhcmdzIHdpbGwgYmUgdXNlZCBhcyB0aGUgY29udGV4dFxuICogQHBhcmFtIHtCb29sZWFufEZ1bmN0aW9ufSB2YWxcbiAqIEBwYXJhbSB7QXJyYXl9IFthcmdzXVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGJvb2xPckZuKHZhbCwgYXJncykge1xuICAgIGlmICh0eXBlb2YgdmFsID09IFRZUEVfRlVOQ1RJT04pIHtcbiAgICAgICAgcmV0dXJuIHZhbC5hcHBseShhcmdzID8gYXJnc1swXSB8fCB1bmRlZmluZWQgOiB1bmRlZmluZWQsIGFyZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xufVxuXG4vKipcbiAqIHVzZSB0aGUgdmFsMiB3aGVuIHZhbDEgaXMgdW5kZWZpbmVkXG4gKiBAcGFyYW0geyp9IHZhbDFcbiAqIEBwYXJhbSB7Kn0gdmFsMlxuICogQHJldHVybnMgeyp9XG4gKi9cbmZ1bmN0aW9uIGlmVW5kZWZpbmVkKHZhbDEsIHZhbDIpIHtcbiAgICByZXR1cm4gKHZhbDEgPT09IHVuZGVmaW5lZCkgPyB2YWwyIDogdmFsMTtcbn1cblxuLyoqXG4gKiBhZGRFdmVudExpc3RlbmVyIHdpdGggbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2VcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IHRhcmdldFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gKi9cbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKHRhcmdldCwgdHlwZXMsIGhhbmRsZXIpIHtcbiAgICBlYWNoKHNwbGl0U3RyKHR5cGVzKSwgZnVuY3Rpb24odHlwZSkge1xuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogcmVtb3ZlRXZlbnRMaXN0ZW5lciB3aXRoIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICovXG5mdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycyh0YXJnZXQsIHR5cGVzLCBoYW5kbGVyKSB7XG4gICAgZWFjaChzcGxpdFN0cih0eXBlcyksIGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIGZpbmQgaWYgYSBub2RlIGlzIGluIHRoZSBnaXZlbiBwYXJlbnRcbiAqIEBtZXRob2QgaGFzUGFyZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwYXJlbnRcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGZvdW5kXG4gKi9cbmZ1bmN0aW9uIGhhc1BhcmVudChub2RlLCBwYXJlbnQpIHtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBpZiAobm9kZSA9PSBwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBzbWFsbCBpbmRleE9mIHdyYXBwZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaW5kXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gZm91bmRcbiAqL1xuZnVuY3Rpb24gaW5TdHIoc3RyLCBmaW5kKSB7XG4gICAgcmV0dXJuIHN0ci5pbmRleE9mKGZpbmQpID4gLTE7XG59XG5cbi8qKlxuICogc3BsaXQgc3RyaW5nIG9uIHdoaXRlc3BhY2VcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtBcnJheX0gd29yZHNcbiAqL1xuZnVuY3Rpb24gc3BsaXRTdHIoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci50cmltKCkuc3BsaXQoL1xccysvZyk7XG59XG5cbi8qKlxuICogZmluZCBpZiBhIGFycmF5IGNvbnRhaW5zIHRoZSBvYmplY3QgdXNpbmcgaW5kZXhPZiBvciBhIHNpbXBsZSBwb2x5RmlsbFxuICogQHBhcmFtIHtBcnJheX0gc3JjXG4gKiBAcGFyYW0ge1N0cmluZ30gZmluZFxuICogQHBhcmFtIHtTdHJpbmd9IFtmaW5kQnlLZXldXG4gKiBAcmV0dXJuIHtCb29sZWFufE51bWJlcn0gZmFsc2Ugd2hlbiBub3QgZm91bmQsIG9yIHRoZSBpbmRleFxuICovXG5mdW5jdGlvbiBpbkFycmF5KHNyYywgZmluZCwgZmluZEJ5S2V5KSB7XG4gICAgaWYgKHNyYy5pbmRleE9mICYmICFmaW5kQnlLZXkpIHtcbiAgICAgICAgcmV0dXJuIHNyYy5pbmRleE9mKGZpbmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBzcmMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoKGZpbmRCeUtleSAmJiBzcmNbaV1bZmluZEJ5S2V5XSA9PSBmaW5kKSB8fCAoIWZpbmRCeUtleSAmJiBzcmNbaV0gPT09IGZpbmQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbn1cblxuLyoqXG4gKiBjb252ZXJ0IGFycmF5LWxpa2Ugb2JqZWN0cyB0byByZWFsIGFycmF5c1xuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybnMge0FycmF5fVxuICovXG5mdW5jdGlvbiB0b0FycmF5KG9iaikge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChvYmosIDApO1xufVxuXG4vKipcbiAqIHVuaXF1ZSBhcnJheSB3aXRoIG9iamVjdHMgYmFzZWQgb24gYSBrZXkgKGxpa2UgJ2lkJykgb3IganVzdCBieSB0aGUgYXJyYXkncyB2YWx1ZVxuICogQHBhcmFtIHtBcnJheX0gc3JjIFt7aWQ6MX0se2lkOjJ9LHtpZDoxfV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBba2V5XVxuICogQHBhcmFtIHtCb29sZWFufSBbc29ydD1GYWxzZV1cbiAqIEByZXR1cm5zIHtBcnJheX0gW3tpZDoxfSx7aWQ6Mn1dXG4gKi9cbmZ1bmN0aW9uIHVuaXF1ZUFycmF5KHNyYywga2V5LCBzb3J0KSB7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgdmFyIGkgPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBzcmMubGVuZ3RoKSB7XG4gICAgICAgIHZhciB2YWwgPSBrZXkgPyBzcmNbaV1ba2V5XSA6IHNyY1tpXTtcbiAgICAgICAgaWYgKGluQXJyYXkodmFsdWVzLCB2YWwpIDwgMCkge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHNyY1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWVzW2ldID0gdmFsO1xuICAgICAgICBpKys7XG4gICAgfVxuXG4gICAgaWYgKHNvcnQpIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLnNvcnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLnNvcnQoZnVuY3Rpb24gc29ydFVuaXF1ZUFycmF5KGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYVtrZXldID4gYltrZXldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbn1cblxuLyoqXG4gKiBnZXQgdGhlIHByZWZpeGVkIHByb3BlcnR5XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAqIEByZXR1cm5zIHtTdHJpbmd8VW5kZWZpbmVkfSBwcmVmaXhlZFxuICovXG5mdW5jdGlvbiBwcmVmaXhlZChvYmosIHByb3BlcnR5KSB7XG4gICAgdmFyIHByZWZpeCwgcHJvcDtcbiAgICB2YXIgY2FtZWxQcm9wID0gcHJvcGVydHlbMF0udG9VcHBlckNhc2UoKSArIHByb3BlcnR5LnNsaWNlKDEpO1xuXG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgVkVORE9SX1BSRUZJWEVTLmxlbmd0aCkge1xuICAgICAgICBwcmVmaXggPSBWRU5ET1JfUFJFRklYRVNbaV07XG4gICAgICAgIHByb3AgPSAocHJlZml4KSA/IHByZWZpeCArIGNhbWVsUHJvcCA6IHByb3BlcnR5O1xuXG4gICAgICAgIGlmIChwcm9wIGluIG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIHByb3A7XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIGdldCBhIHVuaXF1ZSBpZFxuICogQHJldHVybnMge251bWJlcn0gdW5pcXVlSWRcbiAqL1xudmFyIF91bmlxdWVJZCA9IDE7XG5mdW5jdGlvbiB1bmlxdWVJZCgpIHtcbiAgICByZXR1cm4gX3VuaXF1ZUlkKys7XG59XG5cbi8qKlxuICogZ2V0IHRoZSB3aW5kb3cgb2JqZWN0IG9mIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtEb2N1bWVudFZpZXd8V2luZG93fVxuICovXG5mdW5jdGlvbiBnZXRXaW5kb3dGb3JFbGVtZW50KGVsZW1lbnQpIHtcbiAgICB2YXIgZG9jID0gZWxlbWVudC5vd25lckRvY3VtZW50IHx8IGVsZW1lbnQ7XG4gICAgcmV0dXJuIChkb2MuZGVmYXVsdFZpZXcgfHwgZG9jLnBhcmVudFdpbmRvdyB8fCB3aW5kb3cpO1xufVxuXG52YXIgTU9CSUxFX1JFR0VYID0gL21vYmlsZXx0YWJsZXR8aXAoYWR8aG9uZXxvZCl8YW5kcm9pZC9pO1xuXG52YXIgU1VQUE9SVF9UT1VDSCA9ICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpO1xudmFyIFNVUFBPUlRfUE9JTlRFUl9FVkVOVFMgPSBwcmVmaXhlZCh3aW5kb3csICdQb2ludGVyRXZlbnQnKSAhPT0gdW5kZWZpbmVkO1xudmFyIFNVUFBPUlRfT05MWV9UT1VDSCA9IFNVUFBPUlRfVE9VQ0ggJiYgTU9CSUxFX1JFR0VYLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbnZhciBJTlBVVF9UWVBFX1RPVUNIID0gJ3RvdWNoJztcbnZhciBJTlBVVF9UWVBFX1BFTiA9ICdwZW4nO1xudmFyIElOUFVUX1RZUEVfTU9VU0UgPSAnbW91c2UnO1xudmFyIElOUFVUX1RZUEVfS0lORUNUID0gJ2tpbmVjdCc7XG5cbnZhciBDT01QVVRFX0lOVEVSVkFMID0gMjU7XG5cbnZhciBJTlBVVF9TVEFSVCA9IDE7XG52YXIgSU5QVVRfTU9WRSA9IDI7XG52YXIgSU5QVVRfRU5EID0gNDtcbnZhciBJTlBVVF9DQU5DRUwgPSA4O1xuXG52YXIgRElSRUNUSU9OX05PTkUgPSAxO1xudmFyIERJUkVDVElPTl9MRUZUID0gMjtcbnZhciBESVJFQ1RJT05fUklHSFQgPSA0O1xudmFyIERJUkVDVElPTl9VUCA9IDg7XG52YXIgRElSRUNUSU9OX0RPV04gPSAxNjtcblxudmFyIERJUkVDVElPTl9IT1JJWk9OVEFMID0gRElSRUNUSU9OX0xFRlQgfCBESVJFQ1RJT05fUklHSFQ7XG52YXIgRElSRUNUSU9OX1ZFUlRJQ0FMID0gRElSRUNUSU9OX1VQIHwgRElSRUNUSU9OX0RPV047XG52YXIgRElSRUNUSU9OX0FMTCA9IERJUkVDVElPTl9IT1JJWk9OVEFMIHwgRElSRUNUSU9OX1ZFUlRJQ0FMO1xuXG52YXIgUFJPUFNfWFkgPSBbJ3gnLCAneSddO1xudmFyIFBST1BTX0NMSUVOVF9YWSA9IFsnY2xpZW50WCcsICdjbGllbnRZJ107XG5cbi8qKlxuICogY3JlYXRlIG5ldyBpbnB1dCB0eXBlIG1hbmFnZXJcbiAqIEBwYXJhbSB7TWFuYWdlcn0gbWFuYWdlclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtJbnB1dH1cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBJbnB1dChtYW5hZ2VyLCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB0aGlzLmVsZW1lbnQgPSBtYW5hZ2VyLmVsZW1lbnQ7XG4gICAgdGhpcy50YXJnZXQgPSBtYW5hZ2VyLm9wdGlvbnMuaW5wdXRUYXJnZXQ7XG5cbiAgICAvLyBzbWFsbGVyIHdyYXBwZXIgYXJvdW5kIHRoZSBoYW5kbGVyLCBmb3IgdGhlIHNjb3BlIGFuZCB0aGUgZW5hYmxlZCBzdGF0ZSBvZiB0aGUgbWFuYWdlcixcbiAgICAvLyBzbyB3aGVuIGRpc2FibGVkIHRoZSBpbnB1dCBldmVudHMgYXJlIGNvbXBsZXRlbHkgYnlwYXNzZWQuXG4gICAgdGhpcy5kb21IYW5kbGVyID0gZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgaWYgKGJvb2xPckZuKG1hbmFnZXIub3B0aW9ucy5lbmFibGUsIFttYW5hZ2VyXSkpIHtcbiAgICAgICAgICAgIHNlbGYuaGFuZGxlcihldik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbn1cblxuSW5wdXQucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIHNob3VsZCBoYW5kbGUgdGhlIGlucHV0RXZlbnQgZGF0YSBhbmQgdHJpZ2dlciB0aGUgY2FsbGJhY2tcbiAgICAgKiBAdmlydHVhbFxuICAgICAqL1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkgeyB9LFxuXG4gICAgLyoqXG4gICAgICogYmluZCB0aGUgZXZlbnRzXG4gICAgICovXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZXZFbCAmJiBhZGRFdmVudExpc3RlbmVycyh0aGlzLmVsZW1lbnQsIHRoaXMuZXZFbCwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldlRhcmdldCAmJiBhZGRFdmVudExpc3RlbmVycyh0aGlzLnRhcmdldCwgdGhpcy5ldlRhcmdldCwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldldpbiAmJiBhZGRFdmVudExpc3RlbmVycyhnZXRXaW5kb3dGb3JFbGVtZW50KHRoaXMuZWxlbWVudCksIHRoaXMuZXZXaW4sIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHVuYmluZCB0aGUgZXZlbnRzXG4gICAgICovXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZXZFbCAmJiByZW1vdmVFdmVudExpc3RlbmVycyh0aGlzLmVsZW1lbnQsIHRoaXMuZXZFbCwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldlRhcmdldCAmJiByZW1vdmVFdmVudExpc3RlbmVycyh0aGlzLnRhcmdldCwgdGhpcy5ldlRhcmdldCwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldldpbiAmJiByZW1vdmVFdmVudExpc3RlbmVycyhnZXRXaW5kb3dGb3JFbGVtZW50KHRoaXMuZWxlbWVudCksIHRoaXMuZXZXaW4sIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgfVxufTtcblxuLyoqXG4gKiBjcmVhdGUgbmV3IGlucHV0IHR5cGUgbWFuYWdlclxuICogY2FsbGVkIGJ5IHRoZSBNYW5hZ2VyIGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0hhbW1lcn0gbWFuYWdlclxuICogQHJldHVybnMge0lucHV0fVxuICovXG5mdW5jdGlvbiBjcmVhdGVJbnB1dEluc3RhbmNlKG1hbmFnZXIpIHtcbiAgICB2YXIgVHlwZTtcbiAgICB2YXIgaW5wdXRDbGFzcyA9IG1hbmFnZXIub3B0aW9ucy5pbnB1dENsYXNzO1xuXG4gICAgaWYgKGlucHV0Q2xhc3MpIHtcbiAgICAgICAgVHlwZSA9IGlucHV0Q2xhc3M7XG4gICAgfSBlbHNlIGlmIChTVVBQT1JUX1BPSU5URVJfRVZFTlRTKSB7XG4gICAgICAgIFR5cGUgPSBQb2ludGVyRXZlbnRJbnB1dDtcbiAgICB9IGVsc2UgaWYgKFNVUFBPUlRfT05MWV9UT1VDSCkge1xuICAgICAgICBUeXBlID0gVG91Y2hJbnB1dDtcbiAgICB9IGVsc2UgaWYgKCFTVVBQT1JUX1RPVUNIKSB7XG4gICAgICAgIFR5cGUgPSBNb3VzZUlucHV0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIFR5cGUgPSBUb3VjaE1vdXNlSW5wdXQ7XG4gICAgfVxuICAgIHJldHVybiBuZXcgKFR5cGUpKG1hbmFnZXIsIGlucHV0SGFuZGxlcik7XG59XG5cbi8qKlxuICogaGFuZGxlIGlucHV0IGV2ZW50c1xuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqL1xuZnVuY3Rpb24gaW5wdXRIYW5kbGVyKG1hbmFnZXIsIGV2ZW50VHlwZSwgaW5wdXQpIHtcbiAgICB2YXIgcG9pbnRlcnNMZW4gPSBpbnB1dC5wb2ludGVycy5sZW5ndGg7XG4gICAgdmFyIGNoYW5nZWRQb2ludGVyc0xlbiA9IGlucHV0LmNoYW5nZWRQb2ludGVycy5sZW5ndGg7XG4gICAgdmFyIGlzRmlyc3QgPSAoZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQgJiYgKHBvaW50ZXJzTGVuIC0gY2hhbmdlZFBvaW50ZXJzTGVuID09PSAwKSk7XG4gICAgdmFyIGlzRmluYWwgPSAoZXZlbnRUeXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkgJiYgKHBvaW50ZXJzTGVuIC0gY2hhbmdlZFBvaW50ZXJzTGVuID09PSAwKSk7XG5cbiAgICBpbnB1dC5pc0ZpcnN0ID0gISFpc0ZpcnN0O1xuICAgIGlucHV0LmlzRmluYWwgPSAhIWlzRmluYWw7XG5cbiAgICBpZiAoaXNGaXJzdCkge1xuICAgICAgICBtYW5hZ2VyLnNlc3Npb24gPSB7fTtcbiAgICB9XG5cbiAgICAvLyBzb3VyY2UgZXZlbnQgaXMgdGhlIG5vcm1hbGl6ZWQgdmFsdWUgb2YgdGhlIGRvbUV2ZW50c1xuICAgIC8vIGxpa2UgJ3RvdWNoc3RhcnQsIG1vdXNldXAsIHBvaW50ZXJkb3duJ1xuICAgIGlucHV0LmV2ZW50VHlwZSA9IGV2ZW50VHlwZTtcblxuICAgIC8vIGNvbXB1dGUgc2NhbGUsIHJvdGF0aW9uIGV0Y1xuICAgIGNvbXB1dGVJbnB1dERhdGEobWFuYWdlciwgaW5wdXQpO1xuXG4gICAgLy8gZW1pdCBzZWNyZXQgZXZlbnRcbiAgICBtYW5hZ2VyLmVtaXQoJ2hhbW1lci5pbnB1dCcsIGlucHV0KTtcblxuICAgIG1hbmFnZXIucmVjb2duaXplKGlucHV0KTtcbiAgICBtYW5hZ2VyLnNlc3Npb24ucHJldklucHV0ID0gaW5wdXQ7XG59XG5cbi8qKlxuICogZXh0ZW5kIHRoZSBkYXRhIHdpdGggc29tZSB1c2FibGUgcHJvcGVydGllcyBsaWtlIHNjYWxlLCByb3RhdGUsIHZlbG9jaXR5IGV0Y1xuICogQHBhcmFtIHtPYmplY3R9IG1hbmFnZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICovXG5mdW5jdGlvbiBjb21wdXRlSW5wdXREYXRhKG1hbmFnZXIsIGlucHV0KSB7XG4gICAgdmFyIHNlc3Npb24gPSBtYW5hZ2VyLnNlc3Npb247XG4gICAgdmFyIHBvaW50ZXJzID0gaW5wdXQucG9pbnRlcnM7XG4gICAgdmFyIHBvaW50ZXJzTGVuZ3RoID0gcG9pbnRlcnMubGVuZ3RoO1xuXG4gICAgLy8gc3RvcmUgdGhlIGZpcnN0IGlucHV0IHRvIGNhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgYW5kIGRpcmVjdGlvblxuICAgIGlmICghc2Vzc2lvbi5maXJzdElucHV0KSB7XG4gICAgICAgIHNlc3Npb24uZmlyc3RJbnB1dCA9IHNpbXBsZUNsb25lSW5wdXREYXRhKGlucHV0KTtcbiAgICB9XG5cbiAgICAvLyB0byBjb21wdXRlIHNjYWxlIGFuZCByb3RhdGlvbiB3ZSBuZWVkIHRvIHN0b3JlIHRoZSBtdWx0aXBsZSB0b3VjaGVzXG4gICAgaWYgKHBvaW50ZXJzTGVuZ3RoID4gMSAmJiAhc2Vzc2lvbi5maXJzdE11bHRpcGxlKSB7XG4gICAgICAgIHNlc3Npb24uZmlyc3RNdWx0aXBsZSA9IHNpbXBsZUNsb25lSW5wdXREYXRhKGlucHV0KTtcbiAgICB9IGVsc2UgaWYgKHBvaW50ZXJzTGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHNlc3Npb24uZmlyc3RNdWx0aXBsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBmaXJzdElucHV0ID0gc2Vzc2lvbi5maXJzdElucHV0O1xuICAgIHZhciBmaXJzdE11bHRpcGxlID0gc2Vzc2lvbi5maXJzdE11bHRpcGxlO1xuICAgIHZhciBvZmZzZXRDZW50ZXIgPSBmaXJzdE11bHRpcGxlID8gZmlyc3RNdWx0aXBsZS5jZW50ZXIgOiBmaXJzdElucHV0LmNlbnRlcjtcblxuICAgIHZhciBjZW50ZXIgPSBpbnB1dC5jZW50ZXIgPSBnZXRDZW50ZXIocG9pbnRlcnMpO1xuICAgIGlucHV0LnRpbWVTdGFtcCA9IG5vdygpO1xuICAgIGlucHV0LmRlbHRhVGltZSA9IGlucHV0LnRpbWVTdGFtcCAtIGZpcnN0SW5wdXQudGltZVN0YW1wO1xuXG4gICAgaW5wdXQuYW5nbGUgPSBnZXRBbmdsZShvZmZzZXRDZW50ZXIsIGNlbnRlcik7XG4gICAgaW5wdXQuZGlzdGFuY2UgPSBnZXREaXN0YW5jZShvZmZzZXRDZW50ZXIsIGNlbnRlcik7XG5cbiAgICBjb21wdXRlRGVsdGFYWShzZXNzaW9uLCBpbnB1dCk7XG4gICAgaW5wdXQub2Zmc2V0RGlyZWN0aW9uID0gZ2V0RGlyZWN0aW9uKGlucHV0LmRlbHRhWCwgaW5wdXQuZGVsdGFZKTtcblxuICAgIHZhciBvdmVyYWxsVmVsb2NpdHkgPSBnZXRWZWxvY2l0eShpbnB1dC5kZWx0YVRpbWUsIGlucHV0LmRlbHRhWCwgaW5wdXQuZGVsdGFZKTtcbiAgICBpbnB1dC5vdmVyYWxsVmVsb2NpdHlYID0gb3ZlcmFsbFZlbG9jaXR5Lng7XG4gICAgaW5wdXQub3ZlcmFsbFZlbG9jaXR5WSA9IG92ZXJhbGxWZWxvY2l0eS55O1xuICAgIGlucHV0Lm92ZXJhbGxWZWxvY2l0eSA9IChhYnMob3ZlcmFsbFZlbG9jaXR5LngpID4gYWJzKG92ZXJhbGxWZWxvY2l0eS55KSkgPyBvdmVyYWxsVmVsb2NpdHkueCA6IG92ZXJhbGxWZWxvY2l0eS55O1xuXG4gICAgaW5wdXQuc2NhbGUgPSBmaXJzdE11bHRpcGxlID8gZ2V0U2NhbGUoZmlyc3RNdWx0aXBsZS5wb2ludGVycywgcG9pbnRlcnMpIDogMTtcbiAgICBpbnB1dC5yb3RhdGlvbiA9IGZpcnN0TXVsdGlwbGUgPyBnZXRSb3RhdGlvbihmaXJzdE11bHRpcGxlLnBvaW50ZXJzLCBwb2ludGVycykgOiAwO1xuXG4gICAgaW5wdXQubWF4UG9pbnRlcnMgPSAhc2Vzc2lvbi5wcmV2SW5wdXQgPyBpbnB1dC5wb2ludGVycy5sZW5ndGggOiAoKGlucHV0LnBvaW50ZXJzLmxlbmd0aCA+XG4gICAgICAgIHNlc3Npb24ucHJldklucHV0Lm1heFBvaW50ZXJzKSA/IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA6IHNlc3Npb24ucHJldklucHV0Lm1heFBvaW50ZXJzKTtcblxuICAgIGNvbXB1dGVJbnRlcnZhbElucHV0RGF0YShzZXNzaW9uLCBpbnB1dCk7XG5cbiAgICAvLyBmaW5kIHRoZSBjb3JyZWN0IHRhcmdldFxuICAgIHZhciB0YXJnZXQgPSBtYW5hZ2VyLmVsZW1lbnQ7XG4gICAgaWYgKGhhc1BhcmVudChpbnB1dC5zcmNFdmVudC50YXJnZXQsIHRhcmdldCkpIHtcbiAgICAgICAgdGFyZ2V0ID0gaW5wdXQuc3JjRXZlbnQudGFyZ2V0O1xuICAgIH1cbiAgICBpbnB1dC50YXJnZXQgPSB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVEZWx0YVhZKHNlc3Npb24sIGlucHV0KSB7XG4gICAgdmFyIGNlbnRlciA9IGlucHV0LmNlbnRlcjtcbiAgICB2YXIgb2Zmc2V0ID0gc2Vzc2lvbi5vZmZzZXREZWx0YSB8fCB7fTtcbiAgICB2YXIgcHJldkRlbHRhID0gc2Vzc2lvbi5wcmV2RGVsdGEgfHwge307XG4gICAgdmFyIHByZXZJbnB1dCA9IHNlc3Npb24ucHJldklucHV0IHx8IHt9O1xuXG4gICAgaWYgKGlucHV0LmV2ZW50VHlwZSA9PT0gSU5QVVRfU1RBUlQgfHwgcHJldklucHV0LmV2ZW50VHlwZSA9PT0gSU5QVVRfRU5EKSB7XG4gICAgICAgIHByZXZEZWx0YSA9IHNlc3Npb24ucHJldkRlbHRhID0ge1xuICAgICAgICAgICAgeDogcHJldklucHV0LmRlbHRhWCB8fCAwLFxuICAgICAgICAgICAgeTogcHJldklucHV0LmRlbHRhWSB8fCAwXG4gICAgICAgIH07XG5cbiAgICAgICAgb2Zmc2V0ID0gc2Vzc2lvbi5vZmZzZXREZWx0YSA9IHtcbiAgICAgICAgICAgIHg6IGNlbnRlci54LFxuICAgICAgICAgICAgeTogY2VudGVyLnlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpbnB1dC5kZWx0YVggPSBwcmV2RGVsdGEueCArIChjZW50ZXIueCAtIG9mZnNldC54KTtcbiAgICBpbnB1dC5kZWx0YVkgPSBwcmV2RGVsdGEueSArIChjZW50ZXIueSAtIG9mZnNldC55KTtcbn1cblxuLyoqXG4gKiB2ZWxvY2l0eSBpcyBjYWxjdWxhdGVkIGV2ZXJ5IHggbXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXNzaW9uXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqL1xuZnVuY3Rpb24gY29tcHV0ZUludGVydmFsSW5wdXREYXRhKHNlc3Npb24sIGlucHV0KSB7XG4gICAgdmFyIGxhc3QgPSBzZXNzaW9uLmxhc3RJbnRlcnZhbCB8fCBpbnB1dCxcbiAgICAgICAgZGVsdGFUaW1lID0gaW5wdXQudGltZVN0YW1wIC0gbGFzdC50aW1lU3RhbXAsXG4gICAgICAgIHZlbG9jaXR5LCB2ZWxvY2l0eVgsIHZlbG9jaXR5WSwgZGlyZWN0aW9uO1xuXG4gICAgaWYgKGlucHV0LmV2ZW50VHlwZSAhPSBJTlBVVF9DQU5DRUwgJiYgKGRlbHRhVGltZSA+IENPTVBVVEVfSU5URVJWQUwgfHwgbGFzdC52ZWxvY2l0eSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICB2YXIgZGVsdGFYID0gaW5wdXQuZGVsdGFYIC0gbGFzdC5kZWx0YVg7XG4gICAgICAgIHZhciBkZWx0YVkgPSBpbnB1dC5kZWx0YVkgLSBsYXN0LmRlbHRhWTtcblxuICAgICAgICB2YXIgdiA9IGdldFZlbG9jaXR5KGRlbHRhVGltZSwgZGVsdGFYLCBkZWx0YVkpO1xuICAgICAgICB2ZWxvY2l0eVggPSB2Lng7XG4gICAgICAgIHZlbG9jaXR5WSA9IHYueTtcbiAgICAgICAgdmVsb2NpdHkgPSAoYWJzKHYueCkgPiBhYnModi55KSkgPyB2LnggOiB2Lnk7XG4gICAgICAgIGRpcmVjdGlvbiA9IGdldERpcmVjdGlvbihkZWx0YVgsIGRlbHRhWSk7XG5cbiAgICAgICAgc2Vzc2lvbi5sYXN0SW50ZXJ2YWwgPSBpbnB1dDtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB1c2UgbGF0ZXN0IHZlbG9jaXR5IGluZm8gaWYgaXQgZG9lc24ndCBvdmVydGFrZSBhIG1pbmltdW0gcGVyaW9kXG4gICAgICAgIHZlbG9jaXR5ID0gbGFzdC52ZWxvY2l0eTtcbiAgICAgICAgdmVsb2NpdHlYID0gbGFzdC52ZWxvY2l0eVg7XG4gICAgICAgIHZlbG9jaXR5WSA9IGxhc3QudmVsb2NpdHlZO1xuICAgICAgICBkaXJlY3Rpb24gPSBsYXN0LmRpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBpbnB1dC52ZWxvY2l0eSA9IHZlbG9jaXR5O1xuICAgIGlucHV0LnZlbG9jaXR5WCA9IHZlbG9jaXR5WDtcbiAgICBpbnB1dC52ZWxvY2l0eVkgPSB2ZWxvY2l0eVk7XG4gICAgaW5wdXQuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xufVxuXG4vKipcbiAqIGNyZWF0ZSBhIHNpbXBsZSBjbG9uZSBmcm9tIHRoZSBpbnB1dCB1c2VkIGZvciBzdG9yYWdlIG9mIGZpcnN0SW5wdXQgYW5kIGZpcnN0TXVsdGlwbGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICogQHJldHVybnMge09iamVjdH0gY2xvbmVkSW5wdXREYXRhXG4gKi9cbmZ1bmN0aW9uIHNpbXBsZUNsb25lSW5wdXREYXRhKGlucHV0KSB7XG4gICAgLy8gbWFrZSBhIHNpbXBsZSBjb3B5IG9mIHRoZSBwb2ludGVycyBiZWNhdXNlIHdlIHdpbGwgZ2V0IGEgcmVmZXJlbmNlIGlmIHdlIGRvbid0XG4gICAgLy8gd2Ugb25seSBuZWVkIGNsaWVudFhZIGZvciB0aGUgY2FsY3VsYXRpb25zXG4gICAgdmFyIHBvaW50ZXJzID0gW107XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgaW5wdXQucG9pbnRlcnMubGVuZ3RoKSB7XG4gICAgICAgIHBvaW50ZXJzW2ldID0ge1xuICAgICAgICAgICAgY2xpZW50WDogcm91bmQoaW5wdXQucG9pbnRlcnNbaV0uY2xpZW50WCksXG4gICAgICAgICAgICBjbGllbnRZOiByb3VuZChpbnB1dC5wb2ludGVyc1tpXS5jbGllbnRZKVxuICAgICAgICB9O1xuICAgICAgICBpKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGltZVN0YW1wOiBub3coKSxcbiAgICAgICAgcG9pbnRlcnM6IHBvaW50ZXJzLFxuICAgICAgICBjZW50ZXI6IGdldENlbnRlcihwb2ludGVycyksXG4gICAgICAgIGRlbHRhWDogaW5wdXQuZGVsdGFYLFxuICAgICAgICBkZWx0YVk6IGlucHV0LmRlbHRhWVxuICAgIH07XG59XG5cbi8qKlxuICogZ2V0IHRoZSBjZW50ZXIgb2YgYWxsIHRoZSBwb2ludGVyc1xuICogQHBhcmFtIHtBcnJheX0gcG9pbnRlcnNcbiAqIEByZXR1cm4ge09iamVjdH0gY2VudGVyIGNvbnRhaW5zIGB4YCBhbmQgYHlgIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gZ2V0Q2VudGVyKHBvaW50ZXJzKSB7XG4gICAgdmFyIHBvaW50ZXJzTGVuZ3RoID0gcG9pbnRlcnMubGVuZ3RoO1xuXG4gICAgLy8gbm8gbmVlZCB0byBsb29wIHdoZW4gb25seSBvbmUgdG91Y2hcbiAgICBpZiAocG9pbnRlcnNMZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHJvdW5kKHBvaW50ZXJzWzBdLmNsaWVudFgpLFxuICAgICAgICAgICAgeTogcm91bmQocG9pbnRlcnNbMF0uY2xpZW50WSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgeCA9IDAsIHkgPSAwLCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IHBvaW50ZXJzTGVuZ3RoKSB7XG4gICAgICAgIHggKz0gcG9pbnRlcnNbaV0uY2xpZW50WDtcbiAgICAgICAgeSArPSBwb2ludGVyc1tpXS5jbGllbnRZO1xuICAgICAgICBpKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogcm91bmQoeCAvIHBvaW50ZXJzTGVuZ3RoKSxcbiAgICAgICAgeTogcm91bmQoeSAvIHBvaW50ZXJzTGVuZ3RoKVxuICAgIH07XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSB2ZWxvY2l0eSBiZXR3ZWVuIHR3byBwb2ludHMuIHVuaXQgaXMgaW4gcHggcGVyIG1zLlxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhVGltZVxuICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gKiBAcmV0dXJuIHtPYmplY3R9IHZlbG9jaXR5IGB4YCBhbmQgYHlgXG4gKi9cbmZ1bmN0aW9uIGdldFZlbG9jaXR5KGRlbHRhVGltZSwgeCwgeSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHg6IHggLyBkZWx0YVRpbWUgfHwgMCxcbiAgICAgICAgeTogeSAvIGRlbHRhVGltZSB8fCAwXG4gICAgfTtcbn1cblxuLyoqXG4gKiBnZXQgdGhlIGRpcmVjdGlvbiBiZXR3ZWVuIHR3byBwb2ludHNcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gKiBAcGFyYW0ge051bWJlcn0geVxuICogQHJldHVybiB7TnVtYmVyfSBkaXJlY3Rpb25cbiAqL1xuZnVuY3Rpb24gZ2V0RGlyZWN0aW9uKHgsIHkpIHtcbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgICByZXR1cm4gRElSRUNUSU9OX05PTkU7XG4gICAgfVxuXG4gICAgaWYgKGFicyh4KSA+PSBhYnMoeSkpIHtcbiAgICAgICAgcmV0dXJuIHggPCAwID8gRElSRUNUSU9OX0xFRlQgOiBESVJFQ1RJT05fUklHSFQ7XG4gICAgfVxuICAgIHJldHVybiB5IDwgMCA/IERJUkVDVElPTl9VUCA6IERJUkVDVElPTl9ET1dOO1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgYWJzb2x1dGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gcG9pbnRzXG4gKiBAcGFyYW0ge09iamVjdH0gcDEge3gsIHl9XG4gKiBAcGFyYW0ge09iamVjdH0gcDIge3gsIHl9XG4gKiBAcGFyYW0ge0FycmF5fSBbcHJvcHNdIGNvbnRhaW5pbmcgeCBhbmQgeSBrZXlzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IGRpc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIGdldERpc3RhbmNlKHAxLCBwMiwgcHJvcHMpIHtcbiAgICBpZiAoIXByb3BzKSB7XG4gICAgICAgIHByb3BzID0gUFJPUFNfWFk7XG4gICAgfVxuICAgIHZhciB4ID0gcDJbcHJvcHNbMF1dIC0gcDFbcHJvcHNbMF1dLFxuICAgICAgICB5ID0gcDJbcHJvcHNbMV1dIC0gcDFbcHJvcHNbMV1dO1xuXG4gICAgcmV0dXJuIE1hdGguc3FydCgoeCAqIHgpICsgKHkgKiB5KSk7XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSBhbmdsZSBiZXR3ZWVuIHR3byBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHAxXG4gKiBAcGFyYW0ge09iamVjdH0gcDJcbiAqIEBwYXJhbSB7QXJyYXl9IFtwcm9wc10gY29udGFpbmluZyB4IGFuZCB5IGtleXNcbiAqIEByZXR1cm4ge051bWJlcn0gYW5nbGVcbiAqL1xuZnVuY3Rpb24gZ2V0QW5nbGUocDEsIHAyLCBwcm9wcykge1xuICAgIGlmICghcHJvcHMpIHtcbiAgICAgICAgcHJvcHMgPSBQUk9QU19YWTtcbiAgICB9XG4gICAgdmFyIHggPSBwMltwcm9wc1swXV0gLSBwMVtwcm9wc1swXV0sXG4gICAgICAgIHkgPSBwMltwcm9wc1sxXV0gLSBwMVtwcm9wc1sxXV07XG4gICAgcmV0dXJuIE1hdGguYXRhbjIoeSwgeCkgKiAxODAgLyBNYXRoLlBJO1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgcm90YXRpb24gZGVncmVlcyBiZXR3ZWVuIHR3byBwb2ludGVyc2V0c1xuICogQHBhcmFtIHtBcnJheX0gc3RhcnQgYXJyYXkgb2YgcG9pbnRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IGVuZCBhcnJheSBvZiBwb2ludGVyc1xuICogQHJldHVybiB7TnVtYmVyfSByb3RhdGlvblxuICovXG5mdW5jdGlvbiBnZXRSb3RhdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGdldEFuZ2xlKGVuZFsxXSwgZW5kWzBdLCBQUk9QU19DTElFTlRfWFkpICsgZ2V0QW5nbGUoc3RhcnRbMV0sIHN0YXJ0WzBdLCBQUk9QU19DTElFTlRfWFkpO1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgc2NhbGUgZmFjdG9yIGJldHdlZW4gdHdvIHBvaW50ZXJzZXRzXG4gKiBubyBzY2FsZSBpcyAxLCBhbmQgZ29lcyBkb3duIHRvIDAgd2hlbiBwaW5jaGVkIHRvZ2V0aGVyLCBhbmQgYmlnZ2VyIHdoZW4gcGluY2hlZCBvdXRcbiAqIEBwYXJhbSB7QXJyYXl9IHN0YXJ0IGFycmF5IG9mIHBvaW50ZXJzXG4gKiBAcGFyYW0ge0FycmF5fSBlbmQgYXJyYXkgb2YgcG9pbnRlcnNcbiAqIEByZXR1cm4ge051bWJlcn0gc2NhbGVcbiAqL1xuZnVuY3Rpb24gZ2V0U2NhbGUoc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBnZXREaXN0YW5jZShlbmRbMF0sIGVuZFsxXSwgUFJPUFNfQ0xJRU5UX1hZKSAvIGdldERpc3RhbmNlKHN0YXJ0WzBdLCBzdGFydFsxXSwgUFJPUFNfQ0xJRU5UX1hZKTtcbn1cblxudmFyIE1PVVNFX0lOUFVUX01BUCA9IHtcbiAgICBtb3VzZWRvd246IElOUFVUX1NUQVJULFxuICAgIG1vdXNlbW92ZTogSU5QVVRfTU9WRSxcbiAgICBtb3VzZXVwOiBJTlBVVF9FTkRcbn07XG5cbnZhciBNT1VTRV9FTEVNRU5UX0VWRU5UUyA9ICdtb3VzZWRvd24nO1xudmFyIE1PVVNFX1dJTkRPV19FVkVOVFMgPSAnbW91c2Vtb3ZlIG1vdXNldXAnO1xuXG4vKipcbiAqIE1vdXNlIGV2ZW50cyBpbnB1dFxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5mdW5jdGlvbiBNb3VzZUlucHV0KCkge1xuICAgIHRoaXMuZXZFbCA9IE1PVVNFX0VMRU1FTlRfRVZFTlRTO1xuICAgIHRoaXMuZXZXaW4gPSBNT1VTRV9XSU5ET1dfRVZFTlRTO1xuXG4gICAgdGhpcy5wcmVzc2VkID0gZmFsc2U7IC8vIG1vdXNlZG93biBzdGF0ZVxuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChNb3VzZUlucHV0LCBJbnB1dCwge1xuICAgIC8qKlxuICAgICAqIGhhbmRsZSBtb3VzZSBldmVudHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZcbiAgICAgKi9cbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBNRWhhbmRsZXIoZXYpIHtcbiAgICAgICAgdmFyIGV2ZW50VHlwZSA9IE1PVVNFX0lOUFVUX01BUFtldi50eXBlXTtcblxuICAgICAgICAvLyBvbiBzdGFydCB3ZSB3YW50IHRvIGhhdmUgdGhlIGxlZnQgbW91c2UgYnV0dG9uIGRvd25cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX1NUQVJUICYmIGV2LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9NT1ZFICYmIGV2LndoaWNoICE9PSAxKSB7XG4gICAgICAgICAgICBldmVudFR5cGUgPSBJTlBVVF9FTkQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtb3VzZSBtdXN0IGJlIGRvd25cbiAgICAgICAgaWYgKCF0aGlzLnByZXNzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9FTkQpIHtcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsIGV2ZW50VHlwZSwge1xuICAgICAgICAgICAgcG9pbnRlcnM6IFtldl0sXG4gICAgICAgICAgICBjaGFuZ2VkUG9pbnRlcnM6IFtldl0sXG4gICAgICAgICAgICBwb2ludGVyVHlwZTogSU5QVVRfVFlQRV9NT1VTRSxcbiAgICAgICAgICAgIHNyY0V2ZW50OiBldlxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxudmFyIFBPSU5URVJfSU5QVVRfTUFQID0ge1xuICAgIHBvaW50ZXJkb3duOiBJTlBVVF9TVEFSVCxcbiAgICBwb2ludGVybW92ZTogSU5QVVRfTU9WRSxcbiAgICBwb2ludGVydXA6IElOUFVUX0VORCxcbiAgICBwb2ludGVyY2FuY2VsOiBJTlBVVF9DQU5DRUwsXG4gICAgcG9pbnRlcm91dDogSU5QVVRfQ0FOQ0VMXG59O1xuXG4vLyBpbiBJRTEwIHRoZSBwb2ludGVyIHR5cGVzIGlzIGRlZmluZWQgYXMgYW4gZW51bVxudmFyIElFMTBfUE9JTlRFUl9UWVBFX0VOVU0gPSB7XG4gICAgMjogSU5QVVRfVFlQRV9UT1VDSCxcbiAgICAzOiBJTlBVVF9UWVBFX1BFTixcbiAgICA0OiBJTlBVVF9UWVBFX01PVVNFLFxuICAgIDU6IElOUFVUX1RZUEVfS0lORUNUIC8vIHNlZSBodHRwczovL3R3aXR0ZXIuY29tL2phY29icm9zc2kvc3RhdHVzLzQ4MDU5NjQzODQ4OTg5MDgxNlxufTtcblxudmFyIFBPSU5URVJfRUxFTUVOVF9FVkVOVFMgPSAncG9pbnRlcmRvd24nO1xudmFyIFBPSU5URVJfV0lORE9XX0VWRU5UUyA9ICdwb2ludGVybW92ZSBwb2ludGVydXAgcG9pbnRlcmNhbmNlbCc7XG5cbi8vIElFMTAgaGFzIHByZWZpeGVkIHN1cHBvcnQsIGFuZCBjYXNlLXNlbnNpdGl2ZVxuaWYgKHdpbmRvdy5NU1BvaW50ZXJFdmVudCAmJiAhd2luZG93LlBvaW50ZXJFdmVudCkge1xuICAgIFBPSU5URVJfRUxFTUVOVF9FVkVOVFMgPSAnTVNQb2ludGVyRG93bic7XG4gICAgUE9JTlRFUl9XSU5ET1dfRVZFTlRTID0gJ01TUG9pbnRlck1vdmUgTVNQb2ludGVyVXAgTVNQb2ludGVyQ2FuY2VsJztcbn1cblxuLyoqXG4gKiBQb2ludGVyIGV2ZW50cyBpbnB1dFxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5mdW5jdGlvbiBQb2ludGVyRXZlbnRJbnB1dCgpIHtcbiAgICB0aGlzLmV2RWwgPSBQT0lOVEVSX0VMRU1FTlRfRVZFTlRTO1xuICAgIHRoaXMuZXZXaW4gPSBQT0lOVEVSX1dJTkRPV19FVkVOVFM7XG5cbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5zdG9yZSA9ICh0aGlzLm1hbmFnZXIuc2Vzc2lvbi5wb2ludGVyRXZlbnRzID0gW10pO1xufVxuXG5pbmhlcml0KFBvaW50ZXJFdmVudElucHV0LCBJbnB1dCwge1xuICAgIC8qKlxuICAgICAqIGhhbmRsZSBtb3VzZSBldmVudHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZcbiAgICAgKi9cbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBQRWhhbmRsZXIoZXYpIHtcbiAgICAgICAgdmFyIHN0b3JlID0gdGhpcy5zdG9yZTtcbiAgICAgICAgdmFyIHJlbW92ZVBvaW50ZXIgPSBmYWxzZTtcblxuICAgICAgICB2YXIgZXZlbnRUeXBlTm9ybWFsaXplZCA9IGV2LnR5cGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCdtcycsICcnKTtcbiAgICAgICAgdmFyIGV2ZW50VHlwZSA9IFBPSU5URVJfSU5QVVRfTUFQW2V2ZW50VHlwZU5vcm1hbGl6ZWRdO1xuICAgICAgICB2YXIgcG9pbnRlclR5cGUgPSBJRTEwX1BPSU5URVJfVFlQRV9FTlVNW2V2LnBvaW50ZXJUeXBlXSB8fCBldi5wb2ludGVyVHlwZTtcblxuICAgICAgICB2YXIgaXNUb3VjaCA9IChwb2ludGVyVHlwZSA9PSBJTlBVVF9UWVBFX1RPVUNIKTtcblxuICAgICAgICAvLyBnZXQgaW5kZXggb2YgdGhlIGV2ZW50IGluIHRoZSBzdG9yZVxuICAgICAgICB2YXIgc3RvcmVJbmRleCA9IGluQXJyYXkoc3RvcmUsIGV2LnBvaW50ZXJJZCwgJ3BvaW50ZXJJZCcpO1xuXG4gICAgICAgIC8vIHN0YXJ0IGFuZCBtb3VzZSBtdXN0IGJlIGRvd25cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX1NUQVJUICYmIChldi5idXR0b24gPT09IDAgfHwgaXNUb3VjaCkpIHtcbiAgICAgICAgICAgIGlmIChzdG9yZUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHN0b3JlLnB1c2goZXYpO1xuICAgICAgICAgICAgICAgIHN0b3JlSW5kZXggPSBzdG9yZS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50VHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKSB7XG4gICAgICAgICAgICByZW1vdmVQb2ludGVyID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGl0IG5vdCBmb3VuZCwgc28gdGhlIHBvaW50ZXIgaGFzbid0IGJlZW4gZG93biAoc28gaXQncyBwcm9iYWJseSBhIGhvdmVyKVxuICAgICAgICBpZiAoc3RvcmVJbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZXZlbnQgaW4gdGhlIHN0b3JlXG4gICAgICAgIHN0b3JlW3N0b3JlSW5kZXhdID0gZXY7XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsIGV2ZW50VHlwZSwge1xuICAgICAgICAgICAgcG9pbnRlcnM6IHN0b3JlLFxuICAgICAgICAgICAgY2hhbmdlZFBvaW50ZXJzOiBbZXZdLFxuICAgICAgICAgICAgcG9pbnRlclR5cGU6IHBvaW50ZXJUeXBlLFxuICAgICAgICAgICAgc3JjRXZlbnQ6IGV2XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZW1vdmVQb2ludGVyKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgZnJvbSB0aGUgc3RvcmVcbiAgICAgICAgICAgIHN0b3JlLnNwbGljZShzdG9yZUluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG52YXIgU0lOR0xFX1RPVUNIX0lOUFVUX01BUCA9IHtcbiAgICB0b3VjaHN0YXJ0OiBJTlBVVF9TVEFSVCxcbiAgICB0b3VjaG1vdmU6IElOUFVUX01PVkUsXG4gICAgdG91Y2hlbmQ6IElOUFVUX0VORCxcbiAgICB0b3VjaGNhbmNlbDogSU5QVVRfQ0FOQ0VMXG59O1xuXG52YXIgU0lOR0xFX1RPVUNIX1RBUkdFVF9FVkVOVFMgPSAndG91Y2hzdGFydCc7XG52YXIgU0lOR0xFX1RPVUNIX1dJTkRPV19FVkVOVFMgPSAndG91Y2hzdGFydCB0b3VjaG1vdmUgdG91Y2hlbmQgdG91Y2hjYW5jZWwnO1xuXG4vKipcbiAqIFRvdWNoIGV2ZW50cyBpbnB1dFxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5mdW5jdGlvbiBTaW5nbGVUb3VjaElucHV0KCkge1xuICAgIHRoaXMuZXZUYXJnZXQgPSBTSU5HTEVfVE9VQ0hfVEFSR0VUX0VWRU5UUztcbiAgICB0aGlzLmV2V2luID0gU0lOR0xFX1RPVUNIX1dJTkRPV19FVkVOVFM7XG4gICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG5cbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFNpbmdsZVRvdWNoSW5wdXQsIElucHV0LCB7XG4gICAgaGFuZGxlcjogZnVuY3Rpb24gVEVoYW5kbGVyKGV2KSB7XG4gICAgICAgIHZhciB0eXBlID0gU0lOR0xFX1RPVUNIX0lOUFVUX01BUFtldi50eXBlXTtcblxuICAgICAgICAvLyBzaG91bGQgd2UgaGFuZGxlIHRoZSB0b3VjaCBldmVudHM/XG4gICAgICAgIGlmICh0eXBlID09PSBJTlBVVF9TVEFSVCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG91Y2hlcyA9IG5vcm1hbGl6ZVNpbmdsZVRvdWNoZXMuY2FsbCh0aGlzLCBldiwgdHlwZSk7XG5cbiAgICAgICAgLy8gd2hlbiBkb25lLCByZXNldCB0aGUgc3RhcnRlZCBzdGF0ZVxuICAgICAgICBpZiAodHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpICYmIHRvdWNoZXNbMF0ubGVuZ3RoIC0gdG91Y2hlc1sxXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsIHR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzOiB0b3VjaGVzWzBdLFxuICAgICAgICAgICAgY2hhbmdlZFBvaW50ZXJzOiB0b3VjaGVzWzFdLFxuICAgICAgICAgICAgcG9pbnRlclR5cGU6IElOUFVUX1RZUEVfVE9VQ0gsXG4gICAgICAgICAgICBzcmNFdmVudDogZXZcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQHRoaXMge1RvdWNoSW5wdXR9XG4gKiBAcGFyYW0ge09iamVjdH0gZXZcbiAqIEBwYXJhbSB7TnVtYmVyfSB0eXBlIGZsYWdcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR8QXJyYXl9IFthbGwsIGNoYW5nZWRdXG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZVNpbmdsZVRvdWNoZXMoZXYsIHR5cGUpIHtcbiAgICB2YXIgYWxsID0gdG9BcnJheShldi50b3VjaGVzKTtcbiAgICB2YXIgY2hhbmdlZCA9IHRvQXJyYXkoZXYuY2hhbmdlZFRvdWNoZXMpO1xuXG4gICAgaWYgKHR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSkge1xuICAgICAgICBhbGwgPSB1bmlxdWVBcnJheShhbGwuY29uY2F0KGNoYW5nZWQpLCAnaWRlbnRpZmllcicsIHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiBbYWxsLCBjaGFuZ2VkXTtcbn1cblxudmFyIFRPVUNIX0lOUFVUX01BUCA9IHtcbiAgICB0b3VjaHN0YXJ0OiBJTlBVVF9TVEFSVCxcbiAgICB0b3VjaG1vdmU6IElOUFVUX01PVkUsXG4gICAgdG91Y2hlbmQ6IElOUFVUX0VORCxcbiAgICB0b3VjaGNhbmNlbDogSU5QVVRfQ0FOQ0VMXG59O1xuXG52YXIgVE9VQ0hfVEFSR0VUX0VWRU5UUyA9ICd0b3VjaHN0YXJ0IHRvdWNobW92ZSB0b3VjaGVuZCB0b3VjaGNhbmNlbCc7XG5cbi8qKlxuICogTXVsdGktdXNlciB0b3VjaCBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gVG91Y2hJbnB1dCgpIHtcbiAgICB0aGlzLmV2VGFyZ2V0ID0gVE9VQ0hfVEFSR0VUX0VWRU5UUztcbiAgICB0aGlzLnRhcmdldElkcyA9IHt9O1xuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChUb3VjaElucHV0LCBJbnB1dCwge1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIE1URWhhbmRsZXIoZXYpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBUT1VDSF9JTlBVVF9NQVBbZXYudHlwZV07XG4gICAgICAgIHZhciB0b3VjaGVzID0gZ2V0VG91Y2hlcy5jYWxsKHRoaXMsIGV2LCB0eXBlKTtcbiAgICAgICAgaWYgKCF0b3VjaGVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlciwgdHlwZSwge1xuICAgICAgICAgICAgcG9pbnRlcnM6IHRvdWNoZXNbMF0sXG4gICAgICAgICAgICBjaGFuZ2VkUG9pbnRlcnM6IHRvdWNoZXNbMV0sXG4gICAgICAgICAgICBwb2ludGVyVHlwZTogSU5QVVRfVFlQRV9UT1VDSCxcbiAgICAgICAgICAgIHNyY0V2ZW50OiBldlxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBAdGhpcyB7VG91Y2hJbnB1dH1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldlxuICogQHBhcmFtIHtOdW1iZXJ9IHR5cGUgZmxhZ1xuICogQHJldHVybnMge3VuZGVmaW5lZHxBcnJheX0gW2FsbCwgY2hhbmdlZF1cbiAqL1xuZnVuY3Rpb24gZ2V0VG91Y2hlcyhldiwgdHlwZSkge1xuICAgIHZhciBhbGxUb3VjaGVzID0gdG9BcnJheShldi50b3VjaGVzKTtcbiAgICB2YXIgdGFyZ2V0SWRzID0gdGhpcy50YXJnZXRJZHM7XG5cbiAgICAvLyB3aGVuIHRoZXJlIGlzIG9ubHkgb25lIHRvdWNoLCB0aGUgcHJvY2VzcyBjYW4gYmUgc2ltcGxpZmllZFxuICAgIGlmICh0eXBlICYgKElOUFVUX1NUQVJUIHwgSU5QVVRfTU9WRSkgJiYgYWxsVG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdGFyZ2V0SWRzW2FsbFRvdWNoZXNbMF0uaWRlbnRpZmllcl0gPSB0cnVlO1xuICAgICAgICByZXR1cm4gW2FsbFRvdWNoZXMsIGFsbFRvdWNoZXNdO1xuICAgIH1cblxuICAgIHZhciBpLFxuICAgICAgICB0YXJnZXRUb3VjaGVzLFxuICAgICAgICBjaGFuZ2VkVG91Y2hlcyA9IHRvQXJyYXkoZXYuY2hhbmdlZFRvdWNoZXMpLFxuICAgICAgICBjaGFuZ2VkVGFyZ2V0VG91Y2hlcyA9IFtdLFxuICAgICAgICB0YXJnZXQgPSB0aGlzLnRhcmdldDtcblxuICAgIC8vIGdldCB0YXJnZXQgdG91Y2hlcyBmcm9tIHRvdWNoZXNcbiAgICB0YXJnZXRUb3VjaGVzID0gYWxsVG91Y2hlcy5maWx0ZXIoZnVuY3Rpb24odG91Y2gpIHtcbiAgICAgICAgcmV0dXJuIGhhc1BhcmVudCh0b3VjaC50YXJnZXQsIHRhcmdldCk7XG4gICAgfSk7XG5cbiAgICAvLyBjb2xsZWN0IHRvdWNoZXNcbiAgICBpZiAodHlwZSA9PT0gSU5QVVRfU1RBUlQpIHtcbiAgICAgICAgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgdGFyZ2V0VG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRhcmdldElkc1t0YXJnZXRUb3VjaGVzW2ldLmlkZW50aWZpZXJdID0gdHJ1ZTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZpbHRlciBjaGFuZ2VkIHRvdWNoZXMgdG8gb25seSBjb250YWluIHRvdWNoZXMgdGhhdCBleGlzdCBpbiB0aGUgY29sbGVjdGVkIHRhcmdldCBpZHNcbiAgICBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGNoYW5nZWRUb3VjaGVzLmxlbmd0aCkge1xuICAgICAgICBpZiAodGFyZ2V0SWRzW2NoYW5nZWRUb3VjaGVzW2ldLmlkZW50aWZpZXJdKSB7XG4gICAgICAgICAgICBjaGFuZ2VkVGFyZ2V0VG91Y2hlcy5wdXNoKGNoYW5nZWRUb3VjaGVzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNsZWFudXAgcmVtb3ZlZCB0b3VjaGVzXG4gICAgICAgIGlmICh0eXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0YXJnZXRJZHNbY2hhbmdlZFRvdWNoZXNbaV0uaWRlbnRpZmllcl07XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIGlmICghY2hhbmdlZFRhcmdldFRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gW1xuICAgICAgICAvLyBtZXJnZSB0YXJnZXRUb3VjaGVzIHdpdGggY2hhbmdlZFRhcmdldFRvdWNoZXMgc28gaXQgY29udGFpbnMgQUxMIHRvdWNoZXMsIGluY2x1ZGluZyAnZW5kJyBhbmQgJ2NhbmNlbCdcbiAgICAgICAgdW5pcXVlQXJyYXkodGFyZ2V0VG91Y2hlcy5jb25jYXQoY2hhbmdlZFRhcmdldFRvdWNoZXMpLCAnaWRlbnRpZmllcicsIHRydWUpLFxuICAgICAgICBjaGFuZ2VkVGFyZ2V0VG91Y2hlc1xuICAgIF07XG59XG5cbi8qKlxuICogQ29tYmluZWQgdG91Y2ggYW5kIG1vdXNlIGlucHV0XG4gKlxuICogVG91Y2ggaGFzIGEgaGlnaGVyIHByaW9yaXR5IHRoZW4gbW91c2UsIGFuZCB3aGlsZSB0b3VjaGluZyBubyBtb3VzZSBldmVudHMgYXJlIGFsbG93ZWQuXG4gKiBUaGlzIGJlY2F1c2UgdG91Y2ggZGV2aWNlcyBhbHNvIGVtaXQgbW91c2UgZXZlbnRzIHdoaWxlIGRvaW5nIGEgdG91Y2guXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5cbnZhciBERURVUF9USU1FT1VUID0gMjUwMDtcbnZhciBERURVUF9ESVNUQU5DRSA9IDI1O1xuXG5mdW5jdGlvbiBUb3VjaE1vdXNlSW5wdXQoKSB7XG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHZhciBoYW5kbGVyID0gYmluZEZuKHRoaXMuaGFuZGxlciwgdGhpcyk7XG4gICAgdGhpcy50b3VjaCA9IG5ldyBUb3VjaElucHV0KHRoaXMubWFuYWdlciwgaGFuZGxlcik7XG4gICAgdGhpcy5tb3VzZSA9IG5ldyBNb3VzZUlucHV0KHRoaXMubWFuYWdlciwgaGFuZGxlcik7XG5cbiAgICB0aGlzLnByaW1hcnlUb3VjaCA9IG51bGw7XG4gICAgdGhpcy5sYXN0VG91Y2hlcyA9IFtdO1xufVxuXG5pbmhlcml0KFRvdWNoTW91c2VJbnB1dCwgSW5wdXQsIHtcbiAgICAvKipcbiAgICAgKiBoYW5kbGUgbW91c2UgYW5kIHRvdWNoIGV2ZW50c1xuICAgICAqIEBwYXJhbSB7SGFtbWVyfSBtYW5hZ2VyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlucHV0RXZlbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhXG4gICAgICovXG4gICAgaGFuZGxlcjogZnVuY3Rpb24gVE1FaGFuZGxlcihtYW5hZ2VyLCBpbnB1dEV2ZW50LCBpbnB1dERhdGEpIHtcbiAgICAgICAgdmFyIGlzVG91Y2ggPSAoaW5wdXREYXRhLnBvaW50ZXJUeXBlID09IElOUFVUX1RZUEVfVE9VQ0gpLFxuICAgICAgICAgICAgaXNNb3VzZSA9IChpbnB1dERhdGEucG9pbnRlclR5cGUgPT0gSU5QVVRfVFlQRV9NT1VTRSk7XG5cbiAgICAgICAgaWYgKGlzTW91c2UgJiYgaW5wdXREYXRhLnNvdXJjZUNhcGFiaWxpdGllcyAmJiBpbnB1dERhdGEuc291cmNlQ2FwYWJpbGl0aWVzLmZpcmVzVG91Y2hFdmVudHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdoZW4gd2UncmUgaW4gYSB0b3VjaCBldmVudCwgcmVjb3JkIHRvdWNoZXMgdG8gIGRlLWR1cGUgc3ludGhldGljIG1vdXNlIGV2ZW50XG4gICAgICAgIGlmIChpc1RvdWNoKSB7XG4gICAgICAgICAgICByZWNvcmRUb3VjaGVzLmNhbGwodGhpcywgaW5wdXRFdmVudCwgaW5wdXREYXRhKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc01vdXNlICYmIGlzU3ludGhldGljRXZlbnQuY2FsbCh0aGlzLCBpbnB1dERhdGEpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrKG1hbmFnZXIsIGlucHV0RXZlbnQsIGlucHV0RGF0YSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJlbW92ZSB0aGUgZXZlbnQgbGlzdGVuZXJzXG4gICAgICovXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50b3VjaC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMubW91c2UuZGVzdHJveSgpO1xuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiByZWNvcmRUb3VjaGVzKGV2ZW50VHlwZSwgZXZlbnREYXRhKSB7XG4gICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX1NUQVJUKSB7XG4gICAgICAgIHRoaXMucHJpbWFyeVRvdWNoID0gZXZlbnREYXRhLmNoYW5nZWRQb2ludGVyc1swXS5pZGVudGlmaWVyO1xuICAgICAgICBzZXRMYXN0VG91Y2guY2FsbCh0aGlzLCBldmVudERhdGEpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnRUeXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkpIHtcbiAgICAgICAgc2V0TGFzdFRvdWNoLmNhbGwodGhpcywgZXZlbnREYXRhKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldExhc3RUb3VjaChldmVudERhdGEpIHtcbiAgICB2YXIgdG91Y2ggPSBldmVudERhdGEuY2hhbmdlZFBvaW50ZXJzWzBdO1xuXG4gICAgaWYgKHRvdWNoLmlkZW50aWZpZXIgPT09IHRoaXMucHJpbWFyeVRvdWNoKSB7XG4gICAgICAgIHZhciBsYXN0VG91Y2ggPSB7eDogdG91Y2guY2xpZW50WCwgeTogdG91Y2guY2xpZW50WX07XG4gICAgICAgIHRoaXMubGFzdFRvdWNoZXMucHVzaChsYXN0VG91Y2gpO1xuICAgICAgICB2YXIgbHRzID0gdGhpcy5sYXN0VG91Y2hlcztcbiAgICAgICAgdmFyIHJlbW92ZUxhc3RUb3VjaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGkgPSBsdHMuaW5kZXhPZihsYXN0VG91Y2gpO1xuICAgICAgICAgICAgaWYgKGkgPiAtMSkge1xuICAgICAgICAgICAgICAgIGx0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHNldFRpbWVvdXQocmVtb3ZlTGFzdFRvdWNoLCBERURVUF9USU1FT1VUKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzU3ludGhldGljRXZlbnQoZXZlbnREYXRhKSB7XG4gICAgdmFyIHggPSBldmVudERhdGEuc3JjRXZlbnQuY2xpZW50WCwgeSA9IGV2ZW50RGF0YS5zcmNFdmVudC5jbGllbnRZO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sYXN0VG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdCA9IHRoaXMubGFzdFRvdWNoZXNbaV07XG4gICAgICAgIHZhciBkeCA9IE1hdGguYWJzKHggLSB0LngpLCBkeSA9IE1hdGguYWJzKHkgLSB0LnkpO1xuICAgICAgICBpZiAoZHggPD0gREVEVVBfRElTVEFOQ0UgJiYgZHkgPD0gREVEVVBfRElTVEFOQ0UpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxudmFyIFBSRUZJWEVEX1RPVUNIX0FDVElPTiA9IHByZWZpeGVkKFRFU1RfRUxFTUVOVC5zdHlsZSwgJ3RvdWNoQWN0aW9uJyk7XG52YXIgTkFUSVZFX1RPVUNIX0FDVElPTiA9IFBSRUZJWEVEX1RPVUNIX0FDVElPTiAhPT0gdW5kZWZpbmVkO1xuXG4vLyBtYWdpY2FsIHRvdWNoQWN0aW9uIHZhbHVlXG52YXIgVE9VQ0hfQUNUSU9OX0NPTVBVVEUgPSAnY29tcHV0ZSc7XG52YXIgVE9VQ0hfQUNUSU9OX0FVVE8gPSAnYXV0byc7XG52YXIgVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTiA9ICdtYW5pcHVsYXRpb24nOyAvLyBub3QgaW1wbGVtZW50ZWRcbnZhciBUT1VDSF9BQ1RJT05fTk9ORSA9ICdub25lJztcbnZhciBUT1VDSF9BQ1RJT05fUEFOX1ggPSAncGFuLXgnO1xudmFyIFRPVUNIX0FDVElPTl9QQU5fWSA9ICdwYW4teSc7XG52YXIgVE9VQ0hfQUNUSU9OX01BUCA9IGdldFRvdWNoQWN0aW9uUHJvcHMoKTtcblxuLyoqXG4gKiBUb3VjaCBBY3Rpb25cbiAqIHNldHMgdGhlIHRvdWNoQWN0aW9uIHByb3BlcnR5IG9yIHVzZXMgdGhlIGpzIGFsdGVybmF0aXZlXG4gKiBAcGFyYW0ge01hbmFnZXJ9IG1hbmFnZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFRvdWNoQWN0aW9uKG1hbmFnZXIsIHZhbHVlKSB7XG4gICAgdGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcbiAgICB0aGlzLnNldCh2YWx1ZSk7XG59XG5cblRvdWNoQWN0aW9uLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBzZXQgdGhlIHRvdWNoQWN0aW9uIHZhbHVlIG9uIHRoZSBlbGVtZW50IG9yIGVuYWJsZSB0aGUgcG9seWZpbGxcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIC8vIGZpbmQgb3V0IHRoZSB0b3VjaC1hY3Rpb24gYnkgdGhlIGV2ZW50IGhhbmRsZXJzXG4gICAgICAgIGlmICh2YWx1ZSA9PSBUT1VDSF9BQ1RJT05fQ09NUFVURSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmNvbXB1dGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChOQVRJVkVfVE9VQ0hfQUNUSU9OICYmIHRoaXMubWFuYWdlci5lbGVtZW50LnN0eWxlICYmIFRPVUNIX0FDVElPTl9NQVBbdmFsdWVdKSB7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZWxlbWVudC5zdHlsZVtQUkVGSVhFRF9UT1VDSF9BQ1RJT05dID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hY3Rpb25zID0gdmFsdWUudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGp1c3QgcmUtc2V0IHRoZSB0b3VjaEFjdGlvbiB2YWx1ZVxuICAgICAqL1xuICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0KHRoaXMubWFuYWdlci5vcHRpb25zLnRvdWNoQWN0aW9uKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogY29tcHV0ZSB0aGUgdmFsdWUgZm9yIHRoZSB0b3VjaEFjdGlvbiBwcm9wZXJ0eSBiYXNlZCBvbiB0aGUgcmVjb2duaXplcidzIHNldHRpbmdzXG4gICAgICogQHJldHVybnMge1N0cmluZ30gdmFsdWVcbiAgICAgKi9cbiAgICBjb21wdXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSBbXTtcbiAgICAgICAgZWFjaCh0aGlzLm1hbmFnZXIucmVjb2duaXplcnMsIGZ1bmN0aW9uKHJlY29nbml6ZXIpIHtcbiAgICAgICAgICAgIGlmIChib29sT3JGbihyZWNvZ25pemVyLm9wdGlvbnMuZW5hYmxlLCBbcmVjb2duaXplcl0pKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9ucyA9IGFjdGlvbnMuY29uY2F0KHJlY29nbml6ZXIuZ2V0VG91Y2hBY3Rpb24oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2xlYW5Ub3VjaEFjdGlvbnMoYWN0aW9ucy5qb2luKCcgJykpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB0aGlzIG1ldGhvZCBpcyBjYWxsZWQgb24gZWFjaCBpbnB1dCBjeWNsZSBhbmQgcHJvdmlkZXMgdGhlIHByZXZlbnRpbmcgb2YgdGhlIGJyb3dzZXIgYmVoYXZpb3JcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKi9cbiAgICBwcmV2ZW50RGVmYXVsdHM6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBzcmNFdmVudCA9IGlucHV0LnNyY0V2ZW50O1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gaW5wdXQub2Zmc2V0RGlyZWN0aW9uO1xuXG4gICAgICAgIC8vIGlmIHRoZSB0b3VjaCBhY3Rpb24gZGlkIHByZXZlbnRlZCBvbmNlIHRoaXMgc2Vzc2lvblxuICAgICAgICBpZiAodGhpcy5tYW5hZ2VyLnNlc3Npb24ucHJldmVudGVkKSB7XG4gICAgICAgICAgICBzcmNFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFjdGlvbnMgPSB0aGlzLmFjdGlvbnM7XG4gICAgICAgIHZhciBoYXNOb25lID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX05PTkUpICYmICFUT1VDSF9BQ1RJT05fTUFQW1RPVUNIX0FDVElPTl9OT05FXTtcbiAgICAgICAgdmFyIGhhc1BhblkgPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fUEFOX1kpICYmICFUT1VDSF9BQ1RJT05fTUFQW1RPVUNIX0FDVElPTl9QQU5fWV07XG4gICAgICAgIHZhciBoYXNQYW5YID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX1BBTl9YKSAmJiAhVE9VQ0hfQUNUSU9OX01BUFtUT1VDSF9BQ1RJT05fUEFOX1hdO1xuXG4gICAgICAgIGlmIChoYXNOb25lKSB7XG4gICAgICAgICAgICAvL2RvIG5vdCBwcmV2ZW50IGRlZmF1bHRzIGlmIHRoaXMgaXMgYSB0YXAgZ2VzdHVyZVxuXG4gICAgICAgICAgICB2YXIgaXNUYXBQb2ludGVyID0gaW5wdXQucG9pbnRlcnMubGVuZ3RoID09PSAxO1xuICAgICAgICAgICAgdmFyIGlzVGFwTW92ZW1lbnQgPSBpbnB1dC5kaXN0YW5jZSA8IDI7XG4gICAgICAgICAgICB2YXIgaXNUYXBUb3VjaFRpbWUgPSBpbnB1dC5kZWx0YVRpbWUgPCAyNTA7XG5cbiAgICAgICAgICAgIGlmIChpc1RhcFBvaW50ZXIgJiYgaXNUYXBNb3ZlbWVudCAmJiBpc1RhcFRvdWNoVGltZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNQYW5YICYmIGhhc1BhblkpIHtcbiAgICAgICAgICAgIC8vIGBwYW4teCBwYW4teWAgbWVhbnMgYnJvd3NlciBoYW5kbGVzIGFsbCBzY3JvbGxpbmcvcGFubmluZywgZG8gbm90IHByZXZlbnRcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNOb25lIHx8XG4gICAgICAgICAgICAoaGFzUGFuWSAmJiBkaXJlY3Rpb24gJiBESVJFQ1RJT05fSE9SSVpPTlRBTCkgfHxcbiAgICAgICAgICAgIChoYXNQYW5YICYmIGRpcmVjdGlvbiAmIERJUkVDVElPTl9WRVJUSUNBTCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZlbnRTcmMoc3JjRXZlbnQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNhbGwgcHJldmVudERlZmF1bHQgdG8gcHJldmVudCB0aGUgYnJvd3NlcidzIGRlZmF1bHQgYmVoYXZpb3IgKHNjcm9sbGluZyBpbiBtb3N0IGNhc2VzKVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzcmNFdmVudFxuICAgICAqL1xuICAgIHByZXZlbnRTcmM6IGZ1bmN0aW9uKHNyY0V2ZW50KSB7XG4gICAgICAgIHRoaXMubWFuYWdlci5zZXNzaW9uLnByZXZlbnRlZCA9IHRydWU7XG4gICAgICAgIHNyY0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufTtcblxuLyoqXG4gKiB3aGVuIHRoZSB0b3VjaEFjdGlvbnMgYXJlIGNvbGxlY3RlZCB0aGV5IGFyZSBub3QgYSB2YWxpZCB2YWx1ZSwgc28gd2UgbmVlZCB0byBjbGVhbiB0aGluZ3MgdXAuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gY2xlYW5Ub3VjaEFjdGlvbnMoYWN0aW9ucykge1xuICAgIC8vIG5vbmVcbiAgICBpZiAoaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX05PTkUpKSB7XG4gICAgICAgIHJldHVybiBUT1VDSF9BQ1RJT05fTk9ORTtcbiAgICB9XG5cbiAgICB2YXIgaGFzUGFuWCA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9QQU5fWCk7XG4gICAgdmFyIGhhc1BhblkgPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fUEFOX1kpO1xuXG4gICAgLy8gaWYgYm90aCBwYW4teCBhbmQgcGFuLXkgYXJlIHNldCAoZGlmZmVyZW50IHJlY29nbml6ZXJzXG4gICAgLy8gZm9yIGRpZmZlcmVudCBkaXJlY3Rpb25zLCBlLmcuIGhvcml6b250YWwgcGFuIGJ1dCB2ZXJ0aWNhbCBzd2lwZT8pXG4gICAgLy8gd2UgbmVlZCBub25lIChhcyBvdGhlcndpc2Ugd2l0aCBwYW4teCBwYW4teSBjb21iaW5lZCBub25lIG9mIHRoZXNlXG4gICAgLy8gcmVjb2duaXplcnMgd2lsbCB3b3JrLCBzaW5jZSB0aGUgYnJvd3NlciB3b3VsZCBoYW5kbGUgYWxsIHBhbm5pbmdcbiAgICBpZiAoaGFzUGFuWCAmJiBoYXNQYW5ZKSB7XG4gICAgICAgIHJldHVybiBUT1VDSF9BQ1RJT05fTk9ORTtcbiAgICB9XG5cbiAgICAvLyBwYW4teCBPUiBwYW4teVxuICAgIGlmIChoYXNQYW5YIHx8IGhhc1BhblkpIHtcbiAgICAgICAgcmV0dXJuIGhhc1BhblggPyBUT1VDSF9BQ1RJT05fUEFOX1ggOiBUT1VDSF9BQ1RJT05fUEFOX1k7XG4gICAgfVxuXG4gICAgLy8gbWFuaXB1bGF0aW9uXG4gICAgaWYgKGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9NQU5JUFVMQVRJT04pKSB7XG4gICAgICAgIHJldHVybiBUT1VDSF9BQ1RJT05fTUFOSVBVTEFUSU9OO1xuICAgIH1cblxuICAgIHJldHVybiBUT1VDSF9BQ1RJT05fQVVUTztcbn1cblxuZnVuY3Rpb24gZ2V0VG91Y2hBY3Rpb25Qcm9wcygpIHtcbiAgICBpZiAoIU5BVElWRV9UT1VDSF9BQ1RJT04pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgdG91Y2hNYXAgPSB7fTtcbiAgICB2YXIgY3NzU3VwcG9ydHMgPSB3aW5kb3cuQ1NTICYmIHdpbmRvdy5DU1Muc3VwcG9ydHM7XG4gICAgWydhdXRvJywgJ21hbmlwdWxhdGlvbicsICdwYW4teScsICdwYW4teCcsICdwYW4teCBwYW4teScsICdub25lJ10uZm9yRWFjaChmdW5jdGlvbih2YWwpIHtcblxuICAgICAgICAvLyBJZiBjc3Muc3VwcG9ydHMgaXMgbm90IHN1cHBvcnRlZCBidXQgdGhlcmUgaXMgbmF0aXZlIHRvdWNoLWFjdGlvbiBhc3N1bWUgaXQgc3VwcG9ydHNcbiAgICAgICAgLy8gYWxsIHZhbHVlcy4gVGhpcyBpcyB0aGUgY2FzZSBmb3IgSUUgMTAgYW5kIDExLlxuICAgICAgICB0b3VjaE1hcFt2YWxdID0gY3NzU3VwcG9ydHMgPyB3aW5kb3cuQ1NTLnN1cHBvcnRzKCd0b3VjaC1hY3Rpb24nLCB2YWwpIDogdHJ1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gdG91Y2hNYXA7XG59XG5cbi8qKlxuICogUmVjb2duaXplciBmbG93IGV4cGxhaW5lZDsgKlxuICogQWxsIHJlY29nbml6ZXJzIGhhdmUgdGhlIGluaXRpYWwgc3RhdGUgb2YgUE9TU0lCTEUgd2hlbiBhIGlucHV0IHNlc3Npb24gc3RhcnRzLlxuICogVGhlIGRlZmluaXRpb24gb2YgYSBpbnB1dCBzZXNzaW9uIGlzIGZyb20gdGhlIGZpcnN0IGlucHV0IHVudGlsIHRoZSBsYXN0IGlucHV0LCB3aXRoIGFsbCBpdCdzIG1vdmVtZW50IGluIGl0LiAqXG4gKiBFeGFtcGxlIHNlc3Npb24gZm9yIG1vdXNlLWlucHV0OiBtb3VzZWRvd24gLT4gbW91c2Vtb3ZlIC0+IG1vdXNldXBcbiAqXG4gKiBPbiBlYWNoIHJlY29nbml6aW5nIGN5Y2xlIChzZWUgTWFuYWdlci5yZWNvZ25pemUpIHRoZSAucmVjb2duaXplKCkgbWV0aG9kIGlzIGV4ZWN1dGVkXG4gKiB3aGljaCBkZXRlcm1pbmVzIHdpdGggc3RhdGUgaXQgc2hvdWxkIGJlLlxuICpcbiAqIElmIHRoZSByZWNvZ25pemVyIGhhcyB0aGUgc3RhdGUgRkFJTEVELCBDQU5DRUxMRUQgb3IgUkVDT0dOSVpFRCAoZXF1YWxzIEVOREVEKSwgaXQgaXMgcmVzZXQgdG9cbiAqIFBPU1NJQkxFIHRvIGdpdmUgaXQgYW5vdGhlciBjaGFuZ2Ugb24gdGhlIG5leHQgY3ljbGUuXG4gKlxuICogICAgICAgICAgICAgICBQb3NzaWJsZVxuICogICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICstLS0tLSstLS0tLS0tLS0tLS0tLS0rXG4gKiAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICstLS0tLSstLS0tLSsgICAgICAgICAgICAgICB8XG4gKiAgICAgIHwgICAgICAgICAgIHwgICAgICAgICAgICAgICB8XG4gKiAgIEZhaWxlZCAgICAgIENhbmNlbGxlZCAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgKy0tLS0tLS0rLS0tLS0tK1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICAgIFJlY29nbml6ZWQgICAgICAgQmVnYW5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2hhbmdlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuZGVkL1JlY29nbml6ZWRcbiAqL1xudmFyIFNUQVRFX1BPU1NJQkxFID0gMTtcbnZhciBTVEFURV9CRUdBTiA9IDI7XG52YXIgU1RBVEVfQ0hBTkdFRCA9IDQ7XG52YXIgU1RBVEVfRU5ERUQgPSA4O1xudmFyIFNUQVRFX1JFQ09HTklaRUQgPSBTVEFURV9FTkRFRDtcbnZhciBTVEFURV9DQU5DRUxMRUQgPSAxNjtcbnZhciBTVEFURV9GQUlMRUQgPSAzMjtcblxuLyoqXG4gKiBSZWNvZ25pemVyXG4gKiBFdmVyeSByZWNvZ25pemVyIG5lZWRzIHRvIGV4dGVuZCBmcm9tIHRoaXMgY2xhc3MuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIFJlY29nbml6ZXIob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IGFzc2lnbih7fSwgdGhpcy5kZWZhdWx0cywgb3B0aW9ucyB8fCB7fSk7XG5cbiAgICB0aGlzLmlkID0gdW5pcXVlSWQoKTtcblxuICAgIHRoaXMubWFuYWdlciA9IG51bGw7XG5cbiAgICAvLyBkZWZhdWx0IGlzIGVuYWJsZSB0cnVlXG4gICAgdGhpcy5vcHRpb25zLmVuYWJsZSA9IGlmVW5kZWZpbmVkKHRoaXMub3B0aW9ucy5lbmFibGUsIHRydWUpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1BPU1NJQkxFO1xuXG4gICAgdGhpcy5zaW11bHRhbmVvdXMgPSB7fTtcbiAgICB0aGlzLnJlcXVpcmVGYWlsID0gW107XG59XG5cblJlY29nbml6ZXIucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICBkZWZhdWx0czoge30sXG5cbiAgICAvKipcbiAgICAgKiBzZXQgb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7UmVjb2duaXplcn1cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgYXNzaWduKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgICAgLy8gYWxzbyB1cGRhdGUgdGhlIHRvdWNoQWN0aW9uLCBpbiBjYXNlIHNvbWV0aGluZyBjaGFuZ2VkIGFib3V0IHRoZSBkaXJlY3Rpb25zL2VuYWJsZWQgc3RhdGVcbiAgICAgICAgdGhpcy5tYW5hZ2VyICYmIHRoaXMubWFuYWdlci50b3VjaEFjdGlvbi51cGRhdGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJlY29nbml6ZSBzaW11bHRhbmVvdXMgd2l0aCBhbiBvdGhlciByZWNvZ25pemVyLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICByZWNvZ25pemVXaXRoOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKG90aGVyUmVjb2duaXplciwgJ3JlY29nbml6ZVdpdGgnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2ltdWx0YW5lb3VzID0gdGhpcy5zaW11bHRhbmVvdXM7XG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgaWYgKCFzaW11bHRhbmVvdXNbb3RoZXJSZWNvZ25pemVyLmlkXSkge1xuICAgICAgICAgICAgc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF0gPSBvdGhlclJlY29nbml6ZXI7XG4gICAgICAgICAgICBvdGhlclJlY29nbml6ZXIucmVjb2duaXplV2l0aCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZHJvcCB0aGUgc2ltdWx0YW5lb3VzIGxpbmsuIGl0IGRvZXNudCByZW1vdmUgdGhlIGxpbmsgb24gdGhlIG90aGVyIHJlY29nbml6ZXIuXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcn0gdGhpc1xuICAgICAqL1xuICAgIGRyb3BSZWNvZ25pemVXaXRoOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKG90aGVyUmVjb2duaXplciwgJ2Ryb3BSZWNvZ25pemVXaXRoJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgb3RoZXJSZWNvZ25pemVyID0gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHRoaXMpO1xuICAgICAgICBkZWxldGUgdGhpcy5zaW11bHRhbmVvdXNbb3RoZXJSZWNvZ25pemVyLmlkXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJlY29nbml6ZXIgY2FuIG9ubHkgcnVuIHdoZW4gYW4gb3RoZXIgaXMgZmFpbGluZ1xuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICByZXF1aXJlRmFpbHVyZTogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhvdGhlclJlY29nbml6ZXIsICdyZXF1aXJlRmFpbHVyZScsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXF1aXJlRmFpbCA9IHRoaXMucmVxdWlyZUZhaWw7XG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgaWYgKGluQXJyYXkocmVxdWlyZUZhaWwsIG90aGVyUmVjb2duaXplcikgPT09IC0xKSB7XG4gICAgICAgICAgICByZXF1aXJlRmFpbC5wdXNoKG90aGVyUmVjb2duaXplcik7XG4gICAgICAgICAgICBvdGhlclJlY29nbml6ZXIucmVxdWlyZUZhaWx1cmUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGRyb3AgdGhlIHJlcXVpcmVGYWlsdXJlIGxpbmsuIGl0IGRvZXMgbm90IHJlbW92ZSB0aGUgbGluayBvbiB0aGUgb3RoZXIgcmVjb2duaXplci5cbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfSB0aGlzXG4gICAgICovXG4gICAgZHJvcFJlcXVpcmVGYWlsdXJlOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKG90aGVyUmVjb2duaXplciwgJ2Ryb3BSZXF1aXJlRmFpbHVyZScsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgdmFyIGluZGV4ID0gaW5BcnJheSh0aGlzLnJlcXVpcmVGYWlsLCBvdGhlclJlY29nbml6ZXIpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5yZXF1aXJlRmFpbC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBoYXMgcmVxdWlyZSBmYWlsdXJlcyBib29sZWFuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaGFzUmVxdWlyZUZhaWx1cmVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWlyZUZhaWwubGVuZ3RoID4gMDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogaWYgdGhlIHJlY29nbml6ZXIgY2FuIHJlY29nbml6ZSBzaW11bHRhbmVvdXMgd2l0aCBhbiBvdGhlciByZWNvZ25pemVyXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBjYW5SZWNvZ25pemVXaXRoOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zaW11bHRhbmVvdXNbb3RoZXJSZWNvZ25pemVyLmlkXTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogWW91IHNob3VsZCB1c2UgYHRyeUVtaXRgIGluc3RlYWQgb2YgYGVtaXRgIGRpcmVjdGx5IHRvIGNoZWNrXG4gICAgICogdGhhdCBhbGwgdGhlIG5lZWRlZCByZWNvZ25pemVycyBoYXMgZmFpbGVkIGJlZm9yZSBlbWl0dGluZy5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKi9cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgZnVuY3Rpb24gZW1pdChldmVudCkge1xuICAgICAgICAgICAgc2VsZi5tYW5hZ2VyLmVtaXQoZXZlbnQsIGlucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICdwYW5zdGFydCcgYW5kICdwYW5tb3ZlJ1xuICAgICAgICBpZiAoc3RhdGUgPCBTVEFURV9FTkRFRCkge1xuICAgICAgICAgICAgZW1pdChzZWxmLm9wdGlvbnMuZXZlbnQgKyBzdGF0ZVN0cihzdGF0ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZW1pdChzZWxmLm9wdGlvbnMuZXZlbnQpOyAvLyBzaW1wbGUgJ2V2ZW50TmFtZScgZXZlbnRzXG5cbiAgICAgICAgaWYgKGlucHV0LmFkZGl0aW9uYWxFdmVudCkgeyAvLyBhZGRpdGlvbmFsIGV2ZW50KHBhbmxlZnQsIHBhbnJpZ2h0LCBwaW5jaGluLCBwaW5jaG91dC4uLilcbiAgICAgICAgICAgIGVtaXQoaW5wdXQuYWRkaXRpb25hbEV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBhbmVuZCBhbmQgcGFuY2FuY2VsXG4gICAgICAgIGlmIChzdGF0ZSA+PSBTVEFURV9FTkRFRCkge1xuICAgICAgICAgICAgZW1pdChzZWxmLm9wdGlvbnMuZXZlbnQgKyBzdGF0ZVN0cihzdGF0ZSkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrIHRoYXQgYWxsIHRoZSByZXF1aXJlIGZhaWx1cmUgcmVjb2duaXplcnMgaGFzIGZhaWxlZCxcbiAgICAgKiBpZiB0cnVlLCBpdCBlbWl0cyBhIGdlc3R1cmUgZXZlbnQsXG4gICAgICogb3RoZXJ3aXNlLCBzZXR1cCB0aGUgc3RhdGUgdG8gRkFJTEVELlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqL1xuICAgIHRyeUVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIGlmICh0aGlzLmNhbkVtaXQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdChpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaXQncyBmYWlsaW5nIGFueXdheVxuICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfRkFJTEVEO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjYW4gd2UgZW1pdD9cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBjYW5FbWl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMucmVxdWlyZUZhaWwubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoISh0aGlzLnJlcXVpcmVGYWlsW2ldLnN0YXRlICYgKFNUQVRFX0ZBSUxFRCB8IFNUQVRFX1BPU1NJQkxFKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHVwZGF0ZSB0aGUgcmVjb2duaXplclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dERhdGFcbiAgICAgKi9cbiAgICByZWNvZ25pemU6IGZ1bmN0aW9uKGlucHV0RGF0YSkge1xuICAgICAgICAvLyBtYWtlIGEgbmV3IGNvcHkgb2YgdGhlIGlucHV0RGF0YVxuICAgICAgICAvLyBzbyB3ZSBjYW4gY2hhbmdlIHRoZSBpbnB1dERhdGEgd2l0aG91dCBtZXNzaW5nIHVwIHRoZSBvdGhlciByZWNvZ25pemVyc1xuICAgICAgICB2YXIgaW5wdXREYXRhQ2xvbmUgPSBhc3NpZ24oe30sIGlucHV0RGF0YSk7XG5cbiAgICAgICAgLy8gaXMgaXMgZW5hYmxlZCBhbmQgYWxsb3cgcmVjb2duaXppbmc/XG4gICAgICAgIGlmICghYm9vbE9yRm4odGhpcy5vcHRpb25zLmVuYWJsZSwgW3RoaXMsIGlucHV0RGF0YUNsb25lXSkpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9GQUlMRUQ7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNldCB3aGVuIHdlJ3ZlIHJlYWNoZWQgdGhlIGVuZFxuICAgICAgICBpZiAodGhpcy5zdGF0ZSAmIChTVEFURV9SRUNPR05JWkVEIHwgU1RBVEVfQ0FOQ0VMTEVEIHwgU1RBVEVfRkFJTEVEKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1BPU1NJQkxFO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMucHJvY2VzcyhpbnB1dERhdGFDbG9uZSk7XG5cbiAgICAgICAgLy8gdGhlIHJlY29nbml6ZXIgaGFzIHJlY29nbml6ZWQgYSBnZXN0dXJlXG4gICAgICAgIC8vIHNvIHRyaWdnZXIgYW4gZXZlbnRcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgJiAoU1RBVEVfQkVHQU4gfCBTVEFURV9DSEFOR0VEIHwgU1RBVEVfRU5ERUQgfCBTVEFURV9DQU5DRUxMRUQpKSB7XG4gICAgICAgICAgICB0aGlzLnRyeUVtaXQoaW5wdXREYXRhQ2xvbmUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJldHVybiB0aGUgc3RhdGUgb2YgdGhlIHJlY29nbml6ZXJcbiAgICAgKiB0aGUgYWN0dWFsIHJlY29nbml6aW5nIGhhcHBlbnMgaW4gdGhpcyBtZXRob2RcbiAgICAgKiBAdmlydHVhbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dERhdGFcbiAgICAgKiBAcmV0dXJucyB7Q29uc3R9IFNUQVRFXG4gICAgICovXG4gICAgcHJvY2VzczogZnVuY3Rpb24oaW5wdXREYXRhKSB7IH0sIC8vIGpzaGludCBpZ25vcmU6bGluZVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJuIHRoZSBwcmVmZXJyZWQgdG91Y2gtYWN0aW9uXG4gICAgICogQHZpcnR1YWxcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICovXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkgeyB9LFxuXG4gICAgLyoqXG4gICAgICogY2FsbGVkIHdoZW4gdGhlIGdlc3R1cmUgaXNuJ3QgYWxsb3dlZCB0byByZWNvZ25pemVcbiAgICAgKiBsaWtlIHdoZW4gYW5vdGhlciBpcyBiZWluZyByZWNvZ25pemVkIG9yIGl0IGlzIGRpc2FibGVkXG4gICAgICogQHZpcnR1YWxcbiAgICAgKi9cbiAgICByZXNldDogZnVuY3Rpb24oKSB7IH1cbn07XG5cbi8qKlxuICogZ2V0IGEgdXNhYmxlIHN0cmluZywgdXNlZCBhcyBldmVudCBwb3N0Zml4XG4gKiBAcGFyYW0ge0NvbnN0fSBzdGF0ZVxuICogQHJldHVybnMge1N0cmluZ30gc3RhdGVcbiAqL1xuZnVuY3Rpb24gc3RhdGVTdHIoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUgJiBTVEFURV9DQU5DRUxMRUQpIHtcbiAgICAgICAgcmV0dXJuICdjYW5jZWwnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUgJiBTVEFURV9FTkRFRCkge1xuICAgICAgICByZXR1cm4gJ2VuZCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSAmIFNUQVRFX0NIQU5HRUQpIHtcbiAgICAgICAgcmV0dXJuICdtb3ZlJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlICYgU1RBVEVfQkVHQU4pIHtcbiAgICAgICAgcmV0dXJuICdzdGFydCc7XG4gICAgfVxuICAgIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBkaXJlY3Rpb24gY29ucyB0byBzdHJpbmdcbiAqIEBwYXJhbSB7Q29uc3R9IGRpcmVjdGlvblxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZGlyZWN0aW9uU3RyKGRpcmVjdGlvbikge1xuICAgIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OX0RPV04pIHtcbiAgICAgICAgcmV0dXJuICdkb3duJztcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fVVApIHtcbiAgICAgICAgcmV0dXJuICd1cCc7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OX0xFRlQpIHtcbiAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fUklHSFQpIHtcbiAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgfVxuICAgIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBnZXQgYSByZWNvZ25pemVyIGJ5IG5hbWUgaWYgaXQgaXMgYm91bmQgdG8gYSBtYW5hZ2VyXG4gKiBAcGFyYW0ge1JlY29nbml6ZXJ8U3RyaW5nfSBvdGhlclJlY29nbml6ZXJcbiAqIEBwYXJhbSB7UmVjb2duaXplcn0gcmVjb2duaXplclxuICogQHJldHVybnMge1JlY29nbml6ZXJ9XG4gKi9cbmZ1bmN0aW9uIGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCByZWNvZ25pemVyKSB7XG4gICAgdmFyIG1hbmFnZXIgPSByZWNvZ25pemVyLm1hbmFnZXI7XG4gICAgaWYgKG1hbmFnZXIpIHtcbiAgICAgICAgcmV0dXJuIG1hbmFnZXIuZ2V0KG90aGVyUmVjb2duaXplcik7XG4gICAgfVxuICAgIHJldHVybiBvdGhlclJlY29nbml6ZXI7XG59XG5cbi8qKlxuICogVGhpcyByZWNvZ25pemVyIGlzIGp1c3QgdXNlZCBhcyBhIGJhc2UgZm9yIHRoZSBzaW1wbGUgYXR0cmlidXRlIHJlY29nbml6ZXJzLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIEF0dHJSZWNvZ25pemVyKCkge1xuICAgIFJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChBdHRyUmVjb2duaXplciwgUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgQXR0clJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGRlZmF1bHQgMVxuICAgICAgICAgKi9cbiAgICAgICAgcG9pbnRlcnM6IDFcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBjaGVjayBpZiBpdCB0aGUgcmVjb2duaXplciByZWNlaXZlcyB2YWxpZCBpbnB1dCwgbGlrZSBpbnB1dC5kaXN0YW5jZSA+IDEwLlxuICAgICAqIEBtZW1iZXJvZiBBdHRyUmVjb2duaXplclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSByZWNvZ25pemVkXG4gICAgICovXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBvcHRpb25Qb2ludGVycyA9IHRoaXMub3B0aW9ucy5wb2ludGVycztcbiAgICAgICAgcmV0dXJuIG9wdGlvblBvaW50ZXJzID09PSAwIHx8IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA9PT0gb3B0aW9uUG9pbnRlcnM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3MgdGhlIGlucHV0IGFuZCByZXR1cm4gdGhlIHN0YXRlIGZvciB0aGUgcmVjb2duaXplclxuICAgICAqIEBtZW1iZXJvZiBBdHRyUmVjb2duaXplclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqIEByZXR1cm5zIHsqfSBTdGF0ZVxuICAgICAqL1xuICAgIHByb2Nlc3M6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIHZhciBldmVudFR5cGUgPSBpbnB1dC5ldmVudFR5cGU7XG5cbiAgICAgICAgdmFyIGlzUmVjb2duaXplZCA9IHN0YXRlICYgKFNUQVRFX0JFR0FOIHwgU1RBVEVfQ0hBTkdFRCk7XG4gICAgICAgIHZhciBpc1ZhbGlkID0gdGhpcy5hdHRyVGVzdChpbnB1dCk7XG5cbiAgICAgICAgLy8gb24gY2FuY2VsIGlucHV0IGFuZCB3ZSd2ZSByZWNvZ25pemVkIGJlZm9yZSwgcmV0dXJuIFNUQVRFX0NBTkNFTExFRFxuICAgICAgICBpZiAoaXNSZWNvZ25pemVkICYmIChldmVudFR5cGUgJiBJTlBVVF9DQU5DRUwgfHwgIWlzVmFsaWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUgfCBTVEFURV9DQU5DRUxMRUQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNSZWNvZ25pemVkIHx8IGlzVmFsaWQpIHtcbiAgICAgICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9FTkQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUgfCBTVEFURV9FTkRFRDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIShzdGF0ZSAmIFNUQVRFX0JFR0FOKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBTVEFURV9CRUdBTjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdGF0ZSB8IFNUQVRFX0NIQU5HRUQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBQYW5cbiAqIFJlY29nbml6ZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBkb3duIGFuZCBtb3ZlZCBpbiB0aGUgYWxsb3dlZCBkaXJlY3Rpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFBhblJlY29nbml6ZXIoKSB7XG4gICAgQXR0clJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucFggPSBudWxsO1xuICAgIHRoaXMucFkgPSBudWxsO1xufVxuXG5pbmhlcml0KFBhblJlY29nbml6ZXIsIEF0dHJSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQYW5SZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdwYW4nLFxuICAgICAgICB0aHJlc2hvbGQ6IDEwLFxuICAgICAgICBwb2ludGVyczogMSxcbiAgICAgICAgZGlyZWN0aW9uOiBESVJFQ1RJT05fQUxMXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb247XG4gICAgICAgIHZhciBhY3Rpb25zID0gW107XG4gICAgICAgIGlmIChkaXJlY3Rpb24gJiBESVJFQ1RJT05fSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKFRPVUNIX0FDVElPTl9QQU5fWSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpcmVjdGlvbiAmIERJUkVDVElPTl9WRVJUSUNBTCkge1xuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKFRPVUNIX0FDVElPTl9QQU5fWCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjdGlvbnM7XG4gICAgfSxcblxuICAgIGRpcmVjdGlvblRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICB2YXIgaGFzTW92ZWQgPSB0cnVlO1xuICAgICAgICB2YXIgZGlzdGFuY2UgPSBpbnB1dC5kaXN0YW5jZTtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGlucHV0LmRpcmVjdGlvbjtcbiAgICAgICAgdmFyIHggPSBpbnB1dC5kZWx0YVg7XG4gICAgICAgIHZhciB5ID0gaW5wdXQuZGVsdGFZO1xuXG4gICAgICAgIC8vIGxvY2sgdG8gYXhpcz9cbiAgICAgICAgaWYgKCEoZGlyZWN0aW9uICYgb3B0aW9ucy5kaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kaXJlY3Rpb24gJiBESVJFQ1RJT05fSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICh4ID09PSAwKSA/IERJUkVDVElPTl9OT05FIDogKHggPCAwKSA/IERJUkVDVElPTl9MRUZUIDogRElSRUNUSU9OX1JJR0hUO1xuICAgICAgICAgICAgICAgIGhhc01vdmVkID0geCAhPSB0aGlzLnBYO1xuICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gTWF0aC5hYnMoaW5wdXQuZGVsdGFYKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gKHkgPT09IDApID8gRElSRUNUSU9OX05PTkUgOiAoeSA8IDApID8gRElSRUNUSU9OX1VQIDogRElSRUNUSU9OX0RPV047XG4gICAgICAgICAgICAgICAgaGFzTW92ZWQgPSB5ICE9IHRoaXMucFk7XG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBNYXRoLmFicyhpbnB1dC5kZWx0YVkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlucHV0LmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgcmV0dXJuIGhhc01vdmVkICYmIGRpc3RhbmNlID4gb3B0aW9ucy50aHJlc2hvbGQgJiYgZGlyZWN0aW9uICYgb3B0aW9ucy5kaXJlY3Rpb247XG4gICAgfSxcblxuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gQXR0clJlY29nbml6ZXIucHJvdG90eXBlLmF0dHJUZXN0LmNhbGwodGhpcywgaW5wdXQpICYmXG4gICAgICAgICAgICAodGhpcy5zdGF0ZSAmIFNUQVRFX0JFR0FOIHx8ICghKHRoaXMuc3RhdGUgJiBTVEFURV9CRUdBTikgJiYgdGhpcy5kaXJlY3Rpb25UZXN0KGlucHV0KSkpO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuXG4gICAgICAgIHRoaXMucFggPSBpbnB1dC5kZWx0YVg7XG4gICAgICAgIHRoaXMucFkgPSBpbnB1dC5kZWx0YVk7XG5cbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGRpcmVjdGlvblN0cihpbnB1dC5kaXJlY3Rpb24pO1xuXG4gICAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGlucHV0LmFkZGl0aW9uYWxFdmVudCA9IHRoaXMub3B0aW9ucy5ldmVudCArIGRpcmVjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdXBlci5lbWl0LmNhbGwodGhpcywgaW5wdXQpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIFBpbmNoXG4gKiBSZWNvZ25pemVkIHdoZW4gdHdvIG9yIG1vcmUgcG9pbnRlcnMgYXJlIG1vdmluZyB0b3dhcmQgKHpvb20taW4pIG9yIGF3YXkgZnJvbSBlYWNoIG90aGVyICh6b29tLW91dCkuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFBpbmNoUmVjb2duaXplcigpIHtcbiAgICBBdHRyUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFBpbmNoUmVjb2duaXplciwgQXR0clJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFBpbmNoUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncGluY2gnLFxuICAgICAgICB0aHJlc2hvbGQ6IDAsXG4gICAgICAgIHBvaW50ZXJzOiAyXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtUT1VDSF9BQ1RJT05fTk9ORV07XG4gICAgfSxcblxuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3VwZXIuYXR0clRlc3QuY2FsbCh0aGlzLCBpbnB1dCkgJiZcbiAgICAgICAgICAgIChNYXRoLmFicyhpbnB1dC5zY2FsZSAtIDEpID4gdGhpcy5vcHRpb25zLnRocmVzaG9sZCB8fCB0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4pO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICBpZiAoaW5wdXQuc2NhbGUgIT09IDEpIHtcbiAgICAgICAgICAgIHZhciBpbk91dCA9IGlucHV0LnNjYWxlIDwgMSA/ICdpbicgOiAnb3V0JztcbiAgICAgICAgICAgIGlucHV0LmFkZGl0aW9uYWxFdmVudCA9IHRoaXMub3B0aW9ucy5ldmVudCArIGluT3V0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N1cGVyLmVtaXQuY2FsbCh0aGlzLCBpbnB1dCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogUHJlc3NcbiAqIFJlY29nbml6ZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBkb3duIGZvciB4IG1zIHdpdGhvdXQgYW55IG1vdmVtZW50LlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFByZXNzUmVjb2duaXplcigpIHtcbiAgICBSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLl90aW1lciA9IG51bGw7XG4gICAgdGhpcy5faW5wdXQgPSBudWxsO1xufVxuXG5pbmhlcml0KFByZXNzUmVjb2duaXplciwgUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUHJlc3NSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdwcmVzcycsXG4gICAgICAgIHBvaW50ZXJzOiAxLFxuICAgICAgICB0aW1lOiAyNTEsIC8vIG1pbmltYWwgdGltZSBvZiB0aGUgcG9pbnRlciB0byBiZSBwcmVzc2VkXG4gICAgICAgIHRocmVzaG9sZDogOSAvLyBhIG1pbmltYWwgbW92ZW1lbnQgaXMgb2ssIGJ1dCBrZWVwIGl0IGxvd1xuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbVE9VQ0hfQUNUSU9OX0FVVE9dO1xuICAgIH0sXG5cbiAgICBwcm9jZXNzOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgdmFyIHZhbGlkUG9pbnRlcnMgPSBpbnB1dC5wb2ludGVycy5sZW5ndGggPT09IG9wdGlvbnMucG9pbnRlcnM7XG4gICAgICAgIHZhciB2YWxpZE1vdmVtZW50ID0gaW5wdXQuZGlzdGFuY2UgPCBvcHRpb25zLnRocmVzaG9sZDtcbiAgICAgICAgdmFyIHZhbGlkVGltZSA9IGlucHV0LmRlbHRhVGltZSA+IG9wdGlvbnMudGltZTtcblxuICAgICAgICB0aGlzLl9pbnB1dCA9IGlucHV0O1xuXG4gICAgICAgIC8vIHdlIG9ubHkgYWxsb3cgbGl0dGxlIG1vdmVtZW50XG4gICAgICAgIC8vIGFuZCB3ZSd2ZSByZWFjaGVkIGFuIGVuZCBldmVudCwgc28gYSB0YXAgaXMgcG9zc2libGVcbiAgICAgICAgaWYgKCF2YWxpZE1vdmVtZW50IHx8ICF2YWxpZFBvaW50ZXJzIHx8IChpbnB1dC5ldmVudFR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSAmJiAhdmFsaWRUaW1lKSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX1NUQVJUKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXRDb250ZXh0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9SRUNPR05JWkVEO1xuICAgICAgICAgICAgICAgIHRoaXMudHJ5RW1pdCgpO1xuICAgICAgICAgICAgfSwgb3B0aW9ucy50aW1lLCB0aGlzKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9FTkQpIHtcbiAgICAgICAgICAgIHJldHVybiBTVEFURV9SRUNPR05JWkVEO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTVEFURV9GQUlMRUQ7XG4gICAgfSxcblxuICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IFNUQVRFX1JFQ09HTklaRUQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnB1dCAmJiAoaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfRU5EKSkge1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50ICsgJ3VwJywgaW5wdXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faW5wdXQudGltZVN0YW1wID0gbm93KCk7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQsIHRoaXMuX2lucHV0KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vKipcbiAqIFJvdGF0ZVxuICogUmVjb2duaXplZCB3aGVuIHR3byBvciBtb3JlIHBvaW50ZXIgYXJlIG1vdmluZyBpbiBhIGNpcmN1bGFyIG1vdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQXR0clJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gUm90YXRlUmVjb2duaXplcigpIHtcbiAgICBBdHRyUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFJvdGF0ZVJlY29nbml6ZXIsIEF0dHJSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBSb3RhdGVSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdyb3RhdGUnLFxuICAgICAgICB0aHJlc2hvbGQ6IDAsXG4gICAgICAgIHBvaW50ZXJzOiAyXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtUT1VDSF9BQ1RJT05fTk9ORV07XG4gICAgfSxcblxuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3VwZXIuYXR0clRlc3QuY2FsbCh0aGlzLCBpbnB1dCkgJiZcbiAgICAgICAgICAgIChNYXRoLmFicyhpbnB1dC5yb3RhdGlvbikgPiB0aGlzLm9wdGlvbnMudGhyZXNob2xkIHx8IHRoaXMuc3RhdGUgJiBTVEFURV9CRUdBTik7XG4gICAgfVxufSk7XG5cbi8qKlxuICogU3dpcGVcbiAqIFJlY29nbml6ZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBtb3ZpbmcgZmFzdCAodmVsb2NpdHkpLCB3aXRoIGVub3VnaCBkaXN0YW5jZSBpbiB0aGUgYWxsb3dlZCBkaXJlY3Rpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFN3aXBlUmVjb2duaXplcigpIHtcbiAgICBBdHRyUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFN3aXBlUmVjb2duaXplciwgQXR0clJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFN3aXBlUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAnc3dpcGUnLFxuICAgICAgICB0aHJlc2hvbGQ6IDEwLFxuICAgICAgICB2ZWxvY2l0eTogMC4zLFxuICAgICAgICBkaXJlY3Rpb246IERJUkVDVElPTl9IT1JJWk9OVEFMIHwgRElSRUNUSU9OX1ZFUlRJQ0FMLFxuICAgICAgICBwb2ludGVyczogMVxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBQYW5SZWNvZ25pemVyLnByb3RvdHlwZS5nZXRUb3VjaEFjdGlvbi5jYWxsKHRoaXMpO1xuICAgIH0sXG5cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb247XG4gICAgICAgIHZhciB2ZWxvY2l0eTtcblxuICAgICAgICBpZiAoZGlyZWN0aW9uICYgKERJUkVDVElPTl9IT1JJWk9OVEFMIHwgRElSRUNUSU9OX1ZFUlRJQ0FMKSkge1xuICAgICAgICAgICAgdmVsb2NpdHkgPSBpbnB1dC5vdmVyYWxsVmVsb2NpdHk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX0hPUklaT05UQUwpIHtcbiAgICAgICAgICAgIHZlbG9jaXR5ID0gaW5wdXQub3ZlcmFsbFZlbG9jaXR5WDtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gJiBESVJFQ1RJT05fVkVSVElDQUwpIHtcbiAgICAgICAgICAgIHZlbG9jaXR5ID0gaW5wdXQub3ZlcmFsbFZlbG9jaXR5WTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9zdXBlci5hdHRyVGVzdC5jYWxsKHRoaXMsIGlucHV0KSAmJlxuICAgICAgICAgICAgZGlyZWN0aW9uICYgaW5wdXQub2Zmc2V0RGlyZWN0aW9uICYmXG4gICAgICAgICAgICBpbnB1dC5kaXN0YW5jZSA+IHRoaXMub3B0aW9ucy50aHJlc2hvbGQgJiZcbiAgICAgICAgICAgIGlucHV0Lm1heFBvaW50ZXJzID09IHRoaXMub3B0aW9ucy5wb2ludGVycyAmJlxuICAgICAgICAgICAgYWJzKHZlbG9jaXR5KSA+IHRoaXMub3B0aW9ucy52ZWxvY2l0eSAmJiBpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9FTkQ7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBkaXJlY3Rpb25TdHIoaW5wdXQub2Zmc2V0RGlyZWN0aW9uKTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50ICsgZGlyZWN0aW9uLCBpbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQsIGlucHV0KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBBIHRhcCBpcyBlY29nbml6ZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBkb2luZyBhIHNtYWxsIHRhcC9jbGljay4gTXVsdGlwbGUgdGFwcyBhcmUgcmVjb2duaXplZCBpZiB0aGV5IG9jY3VyXG4gKiBiZXR3ZWVuIHRoZSBnaXZlbiBpbnRlcnZhbCBhbmQgcG9zaXRpb24uIFRoZSBkZWxheSBvcHRpb24gY2FuIGJlIHVzZWQgdG8gcmVjb2duaXplIG11bHRpLXRhcHMgd2l0aG91dCBmaXJpbmdcbiAqIGEgc2luZ2xlIHRhcC5cbiAqXG4gKiBUaGUgZXZlbnREYXRhIGZyb20gdGhlIGVtaXR0ZWQgZXZlbnQgY29udGFpbnMgdGhlIHByb3BlcnR5IGB0YXBDb3VudGAsIHdoaWNoIGNvbnRhaW5zIHRoZSBhbW91bnQgb2ZcbiAqIG11bHRpLXRhcHMgYmVpbmcgcmVjb2duaXplZC5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBUYXBSZWNvZ25pemVyKCkge1xuICAgIFJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIC8vIHByZXZpb3VzIHRpbWUgYW5kIGNlbnRlcixcbiAgICAvLyB1c2VkIGZvciB0YXAgY291bnRpbmdcbiAgICB0aGlzLnBUaW1lID0gZmFsc2U7XG4gICAgdGhpcy5wQ2VudGVyID0gZmFsc2U7XG5cbiAgICB0aGlzLl90aW1lciA9IG51bGw7XG4gICAgdGhpcy5faW5wdXQgPSBudWxsO1xuICAgIHRoaXMuY291bnQgPSAwO1xufVxuXG5pbmhlcml0KFRhcFJlY29nbml6ZXIsIFJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFBpbmNoUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAndGFwJyxcbiAgICAgICAgcG9pbnRlcnM6IDEsXG4gICAgICAgIHRhcHM6IDEsXG4gICAgICAgIGludGVydmFsOiAzMDAsIC8vIG1heCB0aW1lIGJldHdlZW4gdGhlIG11bHRpLXRhcCB0YXBzXG4gICAgICAgIHRpbWU6IDI1MCwgLy8gbWF4IHRpbWUgb2YgdGhlIHBvaW50ZXIgdG8gYmUgZG93biAobGlrZSBmaW5nZXIgb24gdGhlIHNjcmVlbilcbiAgICAgICAgdGhyZXNob2xkOiA5LCAvLyBhIG1pbmltYWwgbW92ZW1lbnQgaXMgb2ssIGJ1dCBrZWVwIGl0IGxvd1xuICAgICAgICBwb3NUaHJlc2hvbGQ6IDEwIC8vIGEgbXVsdGktdGFwIGNhbiBiZSBhIGJpdCBvZmYgdGhlIGluaXRpYWwgcG9zaXRpb25cbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9NQU5JUFVMQVRJT05dO1xuICAgIH0sXG5cbiAgICBwcm9jZXNzOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICAgICAgICB2YXIgdmFsaWRQb2ludGVycyA9IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA9PT0gb3B0aW9ucy5wb2ludGVycztcbiAgICAgICAgdmFyIHZhbGlkTW92ZW1lbnQgPSBpbnB1dC5kaXN0YW5jZSA8IG9wdGlvbnMudGhyZXNob2xkO1xuICAgICAgICB2YXIgdmFsaWRUb3VjaFRpbWUgPSBpbnB1dC5kZWx0YVRpbWUgPCBvcHRpb25zLnRpbWU7XG5cbiAgICAgICAgdGhpcy5yZXNldCgpO1xuXG4gICAgICAgIGlmICgoaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQpICYmICh0aGlzLmNvdW50ID09PSAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmFpbFRpbWVvdXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdlIG9ubHkgYWxsb3cgbGl0dGxlIG1vdmVtZW50XG4gICAgICAgIC8vIGFuZCB3ZSd2ZSByZWFjaGVkIGFuIGVuZCBldmVudCwgc28gYSB0YXAgaXMgcG9zc2libGVcbiAgICAgICAgaWYgKHZhbGlkTW92ZW1lbnQgJiYgdmFsaWRUb3VjaFRpbWUgJiYgdmFsaWRQb2ludGVycykge1xuICAgICAgICAgICAgaWYgKGlucHV0LmV2ZW50VHlwZSAhPSBJTlBVVF9FTkQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mYWlsVGltZW91dCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdmFsaWRJbnRlcnZhbCA9IHRoaXMucFRpbWUgPyAoaW5wdXQudGltZVN0YW1wIC0gdGhpcy5wVGltZSA8IG9wdGlvbnMuaW50ZXJ2YWwpIDogdHJ1ZTtcbiAgICAgICAgICAgIHZhciB2YWxpZE11bHRpVGFwID0gIXRoaXMucENlbnRlciB8fCBnZXREaXN0YW5jZSh0aGlzLnBDZW50ZXIsIGlucHV0LmNlbnRlcikgPCBvcHRpb25zLnBvc1RocmVzaG9sZDtcblxuICAgICAgICAgICAgdGhpcy5wVGltZSA9IGlucHV0LnRpbWVTdGFtcDtcbiAgICAgICAgICAgIHRoaXMucENlbnRlciA9IGlucHV0LmNlbnRlcjtcblxuICAgICAgICAgICAgaWYgKCF2YWxpZE11bHRpVGFwIHx8ICF2YWxpZEludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudCA9IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnQgKz0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5faW5wdXQgPSBpbnB1dDtcblxuICAgICAgICAgICAgLy8gaWYgdGFwIGNvdW50IG1hdGNoZXMgd2UgaGF2ZSByZWNvZ25pemVkIGl0LFxuICAgICAgICAgICAgLy8gZWxzZSBpdCBoYXMgYmVnYW4gcmVjb2duaXppbmcuLi5cbiAgICAgICAgICAgIHZhciB0YXBDb3VudCA9IHRoaXMuY291bnQgJSBvcHRpb25zLnRhcHM7XG4gICAgICAgICAgICBpZiAodGFwQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBubyBmYWlsaW5nIHJlcXVpcmVtZW50cywgaW1tZWRpYXRlbHkgdHJpZ2dlciB0aGUgdGFwIGV2ZW50XG4gICAgICAgICAgICAgICAgLy8gb3Igd2FpdCBhcyBsb25nIGFzIHRoZSBtdWx0aXRhcCBpbnRlcnZhbCB0byB0cmlnZ2VyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhhc1JlcXVpcmVGYWlsdXJlcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTVEFURV9SRUNPR05JWkVEO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dENvbnRleHQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfUkVDT0dOSVpFRDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5RW1pdCgpO1xuICAgICAgICAgICAgICAgICAgICB9LCBvcHRpb25zLmludGVydmFsLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFNUQVRFX0JFR0FOO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU1RBVEVfRkFJTEVEO1xuICAgIH0sXG5cbiAgICBmYWlsVGltZW91dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dENvbnRleHQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfRkFJTEVEO1xuICAgICAgICB9LCB0aGlzLm9wdGlvbnMuaW50ZXJ2YWwsIHRoaXMpO1xuICAgICAgICByZXR1cm4gU1RBVEVfRkFJTEVEO1xuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSBTVEFURV9SRUNPR05JWkVEKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnB1dC50YXBDb3VudCA9IHRoaXMuY291bnQ7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQsIHRoaXMuX2lucHV0KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vKipcbiAqIFNpbXBsZSB3YXkgdG8gY3JlYXRlIGEgbWFuYWdlciB3aXRoIGEgZGVmYXVsdCBzZXQgb2YgcmVjb2duaXplcnMuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gSGFtbWVyKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLnJlY29nbml6ZXJzID0gaWZVbmRlZmluZWQob3B0aW9ucy5yZWNvZ25pemVycywgSGFtbWVyLmRlZmF1bHRzLnByZXNldCk7XG4gICAgcmV0dXJuIG5ldyBNYW5hZ2VyKGVsZW1lbnQsIG9wdGlvbnMpO1xufVxuXG4vKipcbiAqIEBjb25zdCB7c3RyaW5nfVxuICovXG5IYW1tZXIuVkVSU0lPTiA9ICcyLjAuNyc7XG5cbi8qKlxuICogZGVmYXVsdCBzZXR0aW5nc1xuICogQG5hbWVzcGFjZVxuICovXG5IYW1tZXIuZGVmYXVsdHMgPSB7XG4gICAgLyoqXG4gICAgICogc2V0IGlmIERPTSBldmVudHMgYXJlIGJlaW5nIHRyaWdnZXJlZC5cbiAgICAgKiBCdXQgdGhpcyBpcyBzbG93ZXIgYW5kIHVudXNlZCBieSBzaW1wbGUgaW1wbGVtZW50YXRpb25zLCBzbyBkaXNhYmxlZCBieSBkZWZhdWx0LlxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgZG9tRXZlbnRzOiBmYWxzZSxcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBmb3IgdGhlIHRvdWNoQWN0aW9uIHByb3BlcnR5L2ZhbGxiYWNrLlxuICAgICAqIFdoZW4gc2V0IHRvIGBjb21wdXRlYCBpdCB3aWxsIG1hZ2ljYWxseSBzZXQgdGhlIGNvcnJlY3QgdmFsdWUgYmFzZWQgb24gdGhlIGFkZGVkIHJlY29nbml6ZXJzLlxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICogQGRlZmF1bHQgY29tcHV0ZVxuICAgICAqL1xuICAgIHRvdWNoQWN0aW9uOiBUT1VDSF9BQ1RJT05fQ09NUFVURSxcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBlbmFibGU6IHRydWUsXG5cbiAgICAvKipcbiAgICAgKiBFWFBFUklNRU5UQUwgRkVBVFVSRSAtLSBjYW4gYmUgcmVtb3ZlZC9jaGFuZ2VkXG4gICAgICogQ2hhbmdlIHRoZSBwYXJlbnQgaW5wdXQgdGFyZ2V0IGVsZW1lbnQuXG4gICAgICogSWYgTnVsbCwgdGhlbiBpdCBpcyBiZWluZyBzZXQgdGhlIHRvIG1haW4gZWxlbWVudC5cbiAgICAgKiBAdHlwZSB7TnVsbHxFdmVudFRhcmdldH1cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgaW5wdXRUYXJnZXQ6IG51bGwsXG5cbiAgICAvKipcbiAgICAgKiBmb3JjZSBhbiBpbnB1dCBjbGFzc1xuICAgICAqIEB0eXBlIHtOdWxsfEZ1bmN0aW9ufVxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBpbnB1dENsYXNzOiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCByZWNvZ25pemVyIHNldHVwIHdoZW4gY2FsbGluZyBgSGFtbWVyKClgXG4gICAgICogV2hlbiBjcmVhdGluZyBhIG5ldyBNYW5hZ2VyIHRoZXNlIHdpbGwgYmUgc2tpcHBlZC5cbiAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICovXG4gICAgcHJlc2V0OiBbXG4gICAgICAgIC8vIFJlY29nbml6ZXJDbGFzcywgb3B0aW9ucywgW3JlY29nbml6ZVdpdGgsIC4uLl0sIFtyZXF1aXJlRmFpbHVyZSwgLi4uXVxuICAgICAgICBbUm90YXRlUmVjb2duaXplciwge2VuYWJsZTogZmFsc2V9XSxcbiAgICAgICAgW1BpbmNoUmVjb2duaXplciwge2VuYWJsZTogZmFsc2V9LCBbJ3JvdGF0ZSddXSxcbiAgICAgICAgW1N3aXBlUmVjb2duaXplciwge2RpcmVjdGlvbjogRElSRUNUSU9OX0hPUklaT05UQUx9XSxcbiAgICAgICAgW1BhblJlY29nbml6ZXIsIHtkaXJlY3Rpb246IERJUkVDVElPTl9IT1JJWk9OVEFMfSwgWydzd2lwZSddXSxcbiAgICAgICAgW1RhcFJlY29nbml6ZXJdLFxuICAgICAgICBbVGFwUmVjb2duaXplciwge2V2ZW50OiAnZG91YmxldGFwJywgdGFwczogMn0sIFsndGFwJ11dLFxuICAgICAgICBbUHJlc3NSZWNvZ25pemVyXVxuICAgIF0sXG5cbiAgICAvKipcbiAgICAgKiBTb21lIENTUyBwcm9wZXJ0aWVzIGNhbiBiZSB1c2VkIHRvIGltcHJvdmUgdGhlIHdvcmtpbmcgb2YgSGFtbWVyLlxuICAgICAqIEFkZCB0aGVtIHRvIHRoaXMgbWV0aG9kIGFuZCB0aGV5IHdpbGwgYmUgc2V0IHdoZW4gY3JlYXRpbmcgYSBuZXcgTWFuYWdlci5cbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICovXG4gICAgY3NzUHJvcHM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGVzIHRleHQgc2VsZWN0aW9uIHRvIGltcHJvdmUgdGhlIGRyYWdnaW5nIGdlc3R1cmUuIE1haW5seSBmb3IgZGVza3RvcCBicm93c2Vycy5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGUgdGhlIFdpbmRvd3MgUGhvbmUgZ3JpcHBlcnMgd2hlbiBwcmVzc2luZyBhbiBlbGVtZW50LlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIHRvdWNoU2VsZWN0OiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGVzIHRoZSBkZWZhdWx0IGNhbGxvdXQgc2hvd24gd2hlbiB5b3UgdG91Y2ggYW5kIGhvbGQgYSB0b3VjaCB0YXJnZXQuXG4gICAgICAgICAqIE9uIGlPUywgd2hlbiB5b3UgdG91Y2ggYW5kIGhvbGQgYSB0b3VjaCB0YXJnZXQgc3VjaCBhcyBhIGxpbmssIFNhZmFyaSBkaXNwbGF5c1xuICAgICAgICAgKiBhIGNhbGxvdXQgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgbGluay4gVGhpcyBwcm9wZXJ0eSBhbGxvd3MgeW91IHRvIGRpc2FibGUgdGhhdCBjYWxsb3V0LlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIHRvdWNoQ2FsbG91dDogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZpZXMgd2hldGhlciB6b29taW5nIGlzIGVuYWJsZWQuIFVzZWQgYnkgSUUxMD5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICBjb250ZW50Wm9vbWluZzogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZpZXMgdGhhdCBhbiBlbnRpcmUgZWxlbWVudCBzaG91bGQgYmUgZHJhZ2dhYmxlIGluc3RlYWQgb2YgaXRzIGNvbnRlbnRzLiBNYWlubHkgZm9yIGRlc2t0b3AgYnJvd3NlcnMuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgdXNlckRyYWc6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogT3ZlcnJpZGVzIHRoZSBoaWdobGlnaHQgY29sb3Igc2hvd24gd2hlbiB0aGUgdXNlciB0YXBzIGEgbGluayBvciBhIEphdmFTY3JpcHRcbiAgICAgICAgICogY2xpY2thYmxlIGVsZW1lbnQgaW4gaU9TLiBUaGlzIHByb3BlcnR5IG9iZXlzIHRoZSBhbHBoYSB2YWx1ZSwgaWYgc3BlY2lmaWVkLlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAncmdiYSgwLDAsMCwwKSdcbiAgICAgICAgICovXG4gICAgICAgIHRhcEhpZ2hsaWdodENvbG9yOiAncmdiYSgwLDAsMCwwKSdcbiAgICB9XG59O1xuXG52YXIgU1RPUCA9IDE7XG52YXIgRk9SQ0VEX1NUT1AgPSAyO1xuXG4vKipcbiAqIE1hbmFnZXJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBNYW5hZ2VyKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBhc3NpZ24oe30sIEhhbW1lci5kZWZhdWx0cywgb3B0aW9ucyB8fCB7fSk7XG5cbiAgICB0aGlzLm9wdGlvbnMuaW5wdXRUYXJnZXQgPSB0aGlzLm9wdGlvbnMuaW5wdXRUYXJnZXQgfHwgZWxlbWVudDtcblxuICAgIHRoaXMuaGFuZGxlcnMgPSB7fTtcbiAgICB0aGlzLnNlc3Npb24gPSB7fTtcbiAgICB0aGlzLnJlY29nbml6ZXJzID0gW107XG4gICAgdGhpcy5vbGRDc3NQcm9wcyA9IHt9O1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLmlucHV0ID0gY3JlYXRlSW5wdXRJbnN0YW5jZSh0aGlzKTtcbiAgICB0aGlzLnRvdWNoQWN0aW9uID0gbmV3IFRvdWNoQWN0aW9uKHRoaXMsIHRoaXMub3B0aW9ucy50b3VjaEFjdGlvbik7XG5cbiAgICB0b2dnbGVDc3NQcm9wcyh0aGlzLCB0cnVlKTtcblxuICAgIGVhY2godGhpcy5vcHRpb25zLnJlY29nbml6ZXJzLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHZhciByZWNvZ25pemVyID0gdGhpcy5hZGQobmV3IChpdGVtWzBdKShpdGVtWzFdKSk7XG4gICAgICAgIGl0ZW1bMl0gJiYgcmVjb2duaXplci5yZWNvZ25pemVXaXRoKGl0ZW1bMl0pO1xuICAgICAgICBpdGVtWzNdICYmIHJlY29nbml6ZXIucmVxdWlyZUZhaWx1cmUoaXRlbVszXSk7XG4gICAgfSwgdGhpcyk7XG59XG5cbk1hbmFnZXIucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIHNldCBvcHRpb25zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7TWFuYWdlcn1cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgYXNzaWduKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgICAgLy8gT3B0aW9ucyB0aGF0IG5lZWQgYSBsaXR0bGUgbW9yZSBzZXR1cFxuICAgICAgICBpZiAob3B0aW9ucy50b3VjaEFjdGlvbikge1xuICAgICAgICAgICAgdGhpcy50b3VjaEFjdGlvbi51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5pbnB1dFRhcmdldCkge1xuICAgICAgICAgICAgLy8gQ2xlYW4gdXAgZXhpc3RpbmcgZXZlbnQgbGlzdGVuZXJzIGFuZCByZWluaXRpYWxpemVcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC50YXJnZXQgPSBvcHRpb25zLmlucHV0VGFyZ2V0O1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHN0b3AgcmVjb2duaXppbmcgZm9yIHRoaXMgc2Vzc2lvbi5cbiAgICAgKiBUaGlzIHNlc3Npb24gd2lsbCBiZSBkaXNjYXJkZWQsIHdoZW4gYSBuZXcgW2lucHV0XXN0YXJ0IGV2ZW50IGlzIGZpcmVkLlxuICAgICAqIFdoZW4gZm9yY2VkLCB0aGUgcmVjb2duaXplciBjeWNsZSBpcyBzdG9wcGVkIGltbWVkaWF0ZWx5LlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZvcmNlXVxuICAgICAqL1xuICAgIHN0b3A6IGZ1bmN0aW9uKGZvcmNlKSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbi5zdG9wcGVkID0gZm9yY2UgPyBGT1JDRURfU1RPUCA6IFNUT1A7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJ1biB0aGUgcmVjb2duaXplcnMhXG4gICAgICogY2FsbGVkIGJ5IHRoZSBpbnB1dEhhbmRsZXIgZnVuY3Rpb24gb24gZXZlcnkgbW92ZW1lbnQgb2YgdGhlIHBvaW50ZXJzICh0b3VjaGVzKVxuICAgICAqIGl0IHdhbGtzIHRocm91Z2ggYWxsIHRoZSByZWNvZ25pemVycyBhbmQgdHJpZXMgdG8gZGV0ZWN0IHRoZSBnZXN0dXJlIHRoYXQgaXMgYmVpbmcgbWFkZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dERhdGFcbiAgICAgKi9cbiAgICByZWNvZ25pemU6IGZ1bmN0aW9uKGlucHV0RGF0YSkge1xuICAgICAgICB2YXIgc2Vzc2lvbiA9IHRoaXMuc2Vzc2lvbjtcbiAgICAgICAgaWYgKHNlc3Npb24uc3RvcHBlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcnVuIHRoZSB0b3VjaC1hY3Rpb24gcG9seWZpbGxcbiAgICAgICAgdGhpcy50b3VjaEFjdGlvbi5wcmV2ZW50RGVmYXVsdHMoaW5wdXREYXRhKTtcblxuICAgICAgICB2YXIgcmVjb2duaXplcjtcbiAgICAgICAgdmFyIHJlY29nbml6ZXJzID0gdGhpcy5yZWNvZ25pemVycztcblxuICAgICAgICAvLyB0aGlzIGhvbGRzIHRoZSByZWNvZ25pemVyIHRoYXQgaXMgYmVpbmcgcmVjb2duaXplZC5cbiAgICAgICAgLy8gc28gdGhlIHJlY29nbml6ZXIncyBzdGF0ZSBuZWVkcyB0byBiZSBCRUdBTiwgQ0hBTkdFRCwgRU5ERUQgb3IgUkVDT0dOSVpFRFxuICAgICAgICAvLyBpZiBubyByZWNvZ25pemVyIGlzIGRldGVjdGluZyBhIHRoaW5nLCBpdCBpcyBzZXQgdG8gYG51bGxgXG4gICAgICAgIHZhciBjdXJSZWNvZ25pemVyID0gc2Vzc2lvbi5jdXJSZWNvZ25pemVyO1xuXG4gICAgICAgIC8vIHJlc2V0IHdoZW4gdGhlIGxhc3QgcmVjb2duaXplciBpcyByZWNvZ25pemVkXG4gICAgICAgIC8vIG9yIHdoZW4gd2UncmUgaW4gYSBuZXcgc2Vzc2lvblxuICAgICAgICBpZiAoIWN1clJlY29nbml6ZXIgfHwgKGN1clJlY29nbml6ZXIgJiYgY3VyUmVjb2duaXplci5zdGF0ZSAmIFNUQVRFX1JFQ09HTklaRUQpKSB7XG4gICAgICAgICAgICBjdXJSZWNvZ25pemVyID0gc2Vzc2lvbi5jdXJSZWNvZ25pemVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCByZWNvZ25pemVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlY29nbml6ZXIgPSByZWNvZ25pemVyc1tpXTtcblxuICAgICAgICAgICAgLy8gZmluZCBvdXQgaWYgd2UgYXJlIGFsbG93ZWQgdHJ5IHRvIHJlY29nbml6ZSB0aGUgaW5wdXQgZm9yIHRoaXMgb25lLlxuICAgICAgICAgICAgLy8gMS4gICBhbGxvdyBpZiB0aGUgc2Vzc2lvbiBpcyBOT1QgZm9yY2VkIHN0b3BwZWQgKHNlZSB0aGUgLnN0b3AoKSBtZXRob2QpXG4gICAgICAgICAgICAvLyAyLiAgIGFsbG93IGlmIHdlIHN0aWxsIGhhdmVuJ3QgcmVjb2duaXplZCBhIGdlc3R1cmUgaW4gdGhpcyBzZXNzaW9uLCBvciB0aGUgdGhpcyByZWNvZ25pemVyIGlzIHRoZSBvbmVcbiAgICAgICAgICAgIC8vICAgICAgdGhhdCBpcyBiZWluZyByZWNvZ25pemVkLlxuICAgICAgICAgICAgLy8gMy4gICBhbGxvdyBpZiB0aGUgcmVjb2duaXplciBpcyBhbGxvd2VkIHRvIHJ1biBzaW11bHRhbmVvdXMgd2l0aCB0aGUgY3VycmVudCByZWNvZ25pemVkIHJlY29nbml6ZXIuXG4gICAgICAgICAgICAvLyAgICAgIHRoaXMgY2FuIGJlIHNldHVwIHdpdGggdGhlIGByZWNvZ25pemVXaXRoKClgIG1ldGhvZCBvbiB0aGUgcmVjb2duaXplci5cbiAgICAgICAgICAgIGlmIChzZXNzaW9uLnN0b3BwZWQgIT09IEZPUkNFRF9TVE9QICYmICggLy8gMVxuICAgICAgICAgICAgICAgICAgICAhY3VyUmVjb2duaXplciB8fCByZWNvZ25pemVyID09IGN1clJlY29nbml6ZXIgfHwgLy8gMlxuICAgICAgICAgICAgICAgICAgICByZWNvZ25pemVyLmNhblJlY29nbml6ZVdpdGgoY3VyUmVjb2duaXplcikpKSB7IC8vIDNcbiAgICAgICAgICAgICAgICByZWNvZ25pemVyLnJlY29nbml6ZShpbnB1dERhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWNvZ25pemVyLnJlc2V0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSByZWNvZ25pemVyIGhhcyBiZWVuIHJlY29nbml6aW5nIHRoZSBpbnB1dCBhcyBhIHZhbGlkIGdlc3R1cmUsIHdlIHdhbnQgdG8gc3RvcmUgdGhpcyBvbmUgYXMgdGhlXG4gICAgICAgICAgICAvLyBjdXJyZW50IGFjdGl2ZSByZWNvZ25pemVyLiBidXQgb25seSBpZiB3ZSBkb24ndCBhbHJlYWR5IGhhdmUgYW4gYWN0aXZlIHJlY29nbml6ZXJcbiAgICAgICAgICAgIGlmICghY3VyUmVjb2duaXplciAmJiByZWNvZ25pemVyLnN0YXRlICYgKFNUQVRFX0JFR0FOIHwgU1RBVEVfQ0hBTkdFRCB8IFNUQVRFX0VOREVEKSkge1xuICAgICAgICAgICAgICAgIGN1clJlY29nbml6ZXIgPSBzZXNzaW9uLmN1clJlY29nbml6ZXIgPSByZWNvZ25pemVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGdldCBhIHJlY29nbml6ZXIgYnkgaXRzIGV2ZW50IG5hbWUuXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfFN0cmluZ30gcmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfE51bGx9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbihyZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChyZWNvZ25pemVyIGluc3RhbmNlb2YgUmVjb2duaXplcikge1xuICAgICAgICAgICAgcmV0dXJuIHJlY29nbml6ZXI7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVjb2duaXplcnMgPSB0aGlzLnJlY29nbml6ZXJzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlY29nbml6ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocmVjb2duaXplcnNbaV0ub3B0aW9ucy5ldmVudCA9PSByZWNvZ25pemVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY29nbml6ZXJzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBhZGQgYSByZWNvZ25pemVyIHRvIHRoZSBtYW5hZ2VyXG4gICAgICogZXhpc3RpbmcgcmVjb2duaXplcnMgd2l0aCB0aGUgc2FtZSBldmVudCBuYW1lIHdpbGwgYmUgcmVtb3ZlZFxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gcmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfE1hbmFnZXJ9XG4gICAgICovXG4gICAgYWRkOiBmdW5jdGlvbihyZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhyZWNvZ25pemVyLCAnYWRkJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIGV4aXN0aW5nXG4gICAgICAgIHZhciBleGlzdGluZyA9IHRoaXMuZ2V0KHJlY29nbml6ZXIub3B0aW9ucy5ldmVudCk7XG4gICAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoZXhpc3RpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWNvZ25pemVycy5wdXNoKHJlY29nbml6ZXIpO1xuICAgICAgICByZWNvZ25pemVyLm1hbmFnZXIgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMudG91Y2hBY3Rpb24udXBkYXRlKCk7XG4gICAgICAgIHJldHVybiByZWNvZ25pemVyO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZW1vdmUgYSByZWNvZ25pemVyIGJ5IG5hbWUgb3IgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ8U3RyaW5nfSByZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge01hbmFnZXJ9XG4gICAgICovXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihyZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhyZWNvZ25pemVyLCAncmVtb3ZlJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVjb2duaXplciA9IHRoaXMuZ2V0KHJlY29nbml6ZXIpO1xuXG4gICAgICAgIC8vIGxldCdzIG1ha2Ugc3VyZSB0aGlzIHJlY29nbml6ZXIgZXhpc3RzXG4gICAgICAgIGlmIChyZWNvZ25pemVyKSB7XG4gICAgICAgICAgICB2YXIgcmVjb2duaXplcnMgPSB0aGlzLnJlY29nbml6ZXJzO1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gaW5BcnJheShyZWNvZ25pemVycywgcmVjb2duaXplcik7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZWNvZ25pemVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMudG91Y2hBY3Rpb24udXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogYmluZCBldmVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudHNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gICAgICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gdGhpc1xuICAgICAqL1xuICAgIG9uOiBmdW5jdGlvbihldmVudHMsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5oYW5kbGVycztcbiAgICAgICAgZWFjaChzcGxpdFN0cihldmVudHMpLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaGFuZGxlcnNbZXZlbnRdID0gaGFuZGxlcnNbZXZlbnRdIHx8IFtdO1xuICAgICAgICAgICAgaGFuZGxlcnNbZXZlbnRdLnB1c2goaGFuZGxlcik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdW5iaW5kIGV2ZW50LCBsZWF2ZSBlbWl0IGJsYW5rIHRvIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2hhbmRsZXJdXG4gICAgICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gdGhpc1xuICAgICAqL1xuICAgIG9mZjogZnVuY3Rpb24oZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5oYW5kbGVycztcbiAgICAgICAgZWFjaChzcGxpdFN0cihldmVudHMpLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGhhbmRsZXJzW2V2ZW50XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnNbZXZlbnRdICYmIGhhbmRsZXJzW2V2ZW50XS5zcGxpY2UoaW5BcnJheShoYW5kbGVyc1tldmVudF0sIGhhbmRsZXIpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBlbWl0IGV2ZW50IHRvIHRoZSBsaXN0ZW5lcnNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIGVtaXQ6IGZ1bmN0aW9uKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgIC8vIHdlIGFsc28gd2FudCB0byB0cmlnZ2VyIGRvbSBldmVudHNcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kb21FdmVudHMpIHtcbiAgICAgICAgICAgIHRyaWdnZXJEb21FdmVudChldmVudCwgZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBubyBoYW5kbGVycywgc28gc2tpcCBpdCBhbGxcbiAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5oYW5kbGVyc1tldmVudF0gJiYgdGhpcy5oYW5kbGVyc1tldmVudF0uc2xpY2UoKTtcbiAgICAgICAgaWYgKCFoYW5kbGVycyB8fCAhaGFuZGxlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBkYXRhLnR5cGUgPSBldmVudDtcbiAgICAgICAgZGF0YS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGF0YS5zcmNFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBoYW5kbGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGhhbmRsZXJzW2ldKGRhdGEpO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGRlc3Ryb3kgdGhlIG1hbmFnZXIgYW5kIHVuYmluZHMgYWxsIGV2ZW50c1xuICAgICAqIGl0IGRvZXNuJ3QgdW5iaW5kIGRvbSBldmVudHMsIHRoYXQgaXMgdGhlIHVzZXIgb3duIHJlc3BvbnNpYmlsaXR5XG4gICAgICovXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCAmJiB0b2dnbGVDc3NQcm9wcyh0aGlzLCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVycyA9IHt9O1xuICAgICAgICB0aGlzLnNlc3Npb24gPSB7fTtcbiAgICAgICAgdGhpcy5pbnB1dC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgfVxufTtcblxuLyoqXG4gKiBhZGQvcmVtb3ZlIHRoZSBjc3MgcHJvcGVydGllcyBhcyBkZWZpbmVkIGluIG1hbmFnZXIub3B0aW9ucy5jc3NQcm9wc1xuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGFkZFxuICovXG5mdW5jdGlvbiB0b2dnbGVDc3NQcm9wcyhtYW5hZ2VyLCBhZGQpIHtcbiAgICB2YXIgZWxlbWVudCA9IG1hbmFnZXIuZWxlbWVudDtcbiAgICBpZiAoIWVsZW1lbnQuc3R5bGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcHJvcDtcbiAgICBlYWNoKG1hbmFnZXIub3B0aW9ucy5jc3NQcm9wcywgZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgcHJvcCA9IHByZWZpeGVkKGVsZW1lbnQuc3R5bGUsIG5hbWUpO1xuICAgICAgICBpZiAoYWRkKSB7XG4gICAgICAgICAgICBtYW5hZ2VyLm9sZENzc1Byb3BzW3Byb3BdID0gZWxlbWVudC5zdHlsZVtwcm9wXTtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSBtYW5hZ2VyLm9sZENzc1Byb3BzW3Byb3BdIHx8ICcnO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFhZGQpIHtcbiAgICAgICAgbWFuYWdlci5vbGRDc3NQcm9wcyA9IHt9O1xuICAgIH1cbn1cblxuLyoqXG4gKiB0cmlnZ2VyIGRvbSBldmVudFxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICovXG5mdW5jdGlvbiB0cmlnZ2VyRG9tRXZlbnQoZXZlbnQsIGRhdGEpIHtcbiAgICB2YXIgZ2VzdHVyZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgZ2VzdHVyZUV2ZW50LmluaXRFdmVudChldmVudCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgZ2VzdHVyZUV2ZW50Lmdlc3R1cmUgPSBkYXRhO1xuICAgIGRhdGEudGFyZ2V0LmRpc3BhdGNoRXZlbnQoZ2VzdHVyZUV2ZW50KTtcbn1cblxuYXNzaWduKEhhbW1lciwge1xuICAgIElOUFVUX1NUQVJUOiBJTlBVVF9TVEFSVCxcbiAgICBJTlBVVF9NT1ZFOiBJTlBVVF9NT1ZFLFxuICAgIElOUFVUX0VORDogSU5QVVRfRU5ELFxuICAgIElOUFVUX0NBTkNFTDogSU5QVVRfQ0FOQ0VMLFxuXG4gICAgU1RBVEVfUE9TU0lCTEU6IFNUQVRFX1BPU1NJQkxFLFxuICAgIFNUQVRFX0JFR0FOOiBTVEFURV9CRUdBTixcbiAgICBTVEFURV9DSEFOR0VEOiBTVEFURV9DSEFOR0VELFxuICAgIFNUQVRFX0VOREVEOiBTVEFURV9FTkRFRCxcbiAgICBTVEFURV9SRUNPR05JWkVEOiBTVEFURV9SRUNPR05JWkVELFxuICAgIFNUQVRFX0NBTkNFTExFRDogU1RBVEVfQ0FOQ0VMTEVELFxuICAgIFNUQVRFX0ZBSUxFRDogU1RBVEVfRkFJTEVELFxuXG4gICAgRElSRUNUSU9OX05PTkU6IERJUkVDVElPTl9OT05FLFxuICAgIERJUkVDVElPTl9MRUZUOiBESVJFQ1RJT05fTEVGVCxcbiAgICBESVJFQ1RJT05fUklHSFQ6IERJUkVDVElPTl9SSUdIVCxcbiAgICBESVJFQ1RJT05fVVA6IERJUkVDVElPTl9VUCxcbiAgICBESVJFQ1RJT05fRE9XTjogRElSRUNUSU9OX0RPV04sXG4gICAgRElSRUNUSU9OX0hPUklaT05UQUw6IERJUkVDVElPTl9IT1JJWk9OVEFMLFxuICAgIERJUkVDVElPTl9WRVJUSUNBTDogRElSRUNUSU9OX1ZFUlRJQ0FMLFxuICAgIERJUkVDVElPTl9BTEw6IERJUkVDVElPTl9BTEwsXG5cbiAgICBNYW5hZ2VyOiBNYW5hZ2VyLFxuICAgIElucHV0OiBJbnB1dCxcbiAgICBUb3VjaEFjdGlvbjogVG91Y2hBY3Rpb24sXG5cbiAgICBUb3VjaElucHV0OiBUb3VjaElucHV0LFxuICAgIE1vdXNlSW5wdXQ6IE1vdXNlSW5wdXQsXG4gICAgUG9pbnRlckV2ZW50SW5wdXQ6IFBvaW50ZXJFdmVudElucHV0LFxuICAgIFRvdWNoTW91c2VJbnB1dDogVG91Y2hNb3VzZUlucHV0LFxuICAgIFNpbmdsZVRvdWNoSW5wdXQ6IFNpbmdsZVRvdWNoSW5wdXQsXG5cbiAgICBSZWNvZ25pemVyOiBSZWNvZ25pemVyLFxuICAgIEF0dHJSZWNvZ25pemVyOiBBdHRyUmVjb2duaXplcixcbiAgICBUYXA6IFRhcFJlY29nbml6ZXIsXG4gICAgUGFuOiBQYW5SZWNvZ25pemVyLFxuICAgIFN3aXBlOiBTd2lwZVJlY29nbml6ZXIsXG4gICAgUGluY2g6IFBpbmNoUmVjb2duaXplcixcbiAgICBSb3RhdGU6IFJvdGF0ZVJlY29nbml6ZXIsXG4gICAgUHJlc3M6IFByZXNzUmVjb2duaXplcixcblxuICAgIG9uOiBhZGRFdmVudExpc3RlbmVycyxcbiAgICBvZmY6IHJlbW92ZUV2ZW50TGlzdGVuZXJzLFxuICAgIGVhY2g6IGVhY2gsXG4gICAgbWVyZ2U6IG1lcmdlLFxuICAgIGV4dGVuZDogZXh0ZW5kLFxuICAgIGFzc2lnbjogYXNzaWduLFxuICAgIGluaGVyaXQ6IGluaGVyaXQsXG4gICAgYmluZEZuOiBiaW5kRm4sXG4gICAgcHJlZml4ZWQ6IHByZWZpeGVkXG59KTtcblxuLy8gdGhpcyBwcmV2ZW50cyBlcnJvcnMgd2hlbiBIYW1tZXIgaXMgbG9hZGVkIGluIHRoZSBwcmVzZW5jZSBvZiBhbiBBTURcbi8vICBzdHlsZSBsb2FkZXIgYnV0IGJ5IHNjcmlwdCB0YWcsIG5vdCBieSB0aGUgbG9hZGVyLlxudmFyIGZyZWVHbG9iYWwgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHt9KSk7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuZnJlZUdsb2JhbC5IYW1tZXIgPSBIYW1tZXI7XG5cbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBIYW1tZXI7XG4gICAgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEhhbW1lcjtcbn0gZWxzZSB7XG4gICAgd2luZG93W2V4cG9ydE5hbWVdID0gSGFtbWVyO1xufVxuXG59KSh3aW5kb3csIGRvY3VtZW50LCAnSGFtbWVyJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaGFtbWVyanMvaGFtbWVyLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0IE1vdmFibGVDb29yZCBmcm9tIFwiLi9tb3ZhYmxlQ29vcmRcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBNb3ZhYmxlQ29vcmQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9
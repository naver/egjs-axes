import Component from "eg.component";
import HammerManager from "./hammerManager";
import EventHandler from "./eventHandler";
import AnimationHandler from "./animationHandler";
import Coordinate from "./coordinate";
import { DIRECTION } from "./consts";
import { Mixin } from "./utils";

const pos = Symbol("pos");
const hammerManager = Symbol("hammerManager");

export default class MovableCoord extends Mixin(Component).with(EventHandler, AnimationHandler) {
	constructor(options) {
		super();
		Object.assign(this.options = {
			min: [0, 0],
			max: [100, 100],
			bounce: [10, 10, 10, 10],
			margin: [0,0,0,0],
			circular: [false, false, false, false],
			easing: function easeOutCubic(x) {
				return 1 - Math.pow(1 - x, 3);
			},
			maximumDuration: Infinity,
			deceleration: 0.0006
		}, options);
		this._reviseOptions();
		this[hammerManager] = new HammerManager();
		this[pos] = this.options.min.concat();
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
	bind(element, options) {
		this[hammerManager].add(element, options, this);
		return this;
	}
	
	/**
	 * Detaches an element using the eg.MovableCoord module.
	 * @ko eg.MovableCoord 모듈을 사용하는 엘리먼트를 해제한다
	 * @method eg.MovableCoord#unbind
	 * @param {HTMLElement|String|jQuery} element An element from which the eg.MovableCoord module is detached<ko>eg.MovableCoord 모듈을 해제할 엘리먼트</ko>
	 * @return {eg.MovableCoord} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	unbind(element) {
		this[hammerManager].remove(element);
		return this;
	}

	/**
	 * get a hammer instance from elements using the eg.MovableCoord module.
	 * @ko eg.MovableCoord 모듈을 사용하는 엘리먼트에서 hammer 객체를 얻는다
	 * @method eg.MovableCoord#getHammer
	 * @param {HTMLElement|String|jQuery} element An element from which the eg.MovableCoord module is using<ko>eg.MovableCoord 모듈을 사용하는 엘리먼트</ko>
	 * @return {Hammer|null} An instance of Hammer.JS<ko>Hammer.JS의 인스턴스</ko>
	 */
	getHammer(element) {
		return this[hammerManager].getHammer(element);
	}

	// set up 'css' expression
	_reviseOptions() {
		let key;
		["bounce", "margin", "circular"].forEach( v => {
			key = this.options[v];
			if (key != null) {
				if (key.constructor === Array) {
					this.options[v] = key.length === 2 ?
						key.concat(key) : key.concat();
				} else if (/string|number|boolean/.test(typeof key)) {
					this.options[v] = [ key, key, key, key ];
				} else {
					this.options[v] = null;
				}
			}
		});
	}

	/**
	 * Returns the current position of the logical coordinates.
	 * @ko 논리적 좌표의 현재 위치를 반환한다
	 * @method eg.MovableCoord#get
	 * @return {Array} pos <ko>좌표</ko>
	 * @return {Number} pos.0 The X coordinate <ko>x 좌표</ko>
	 * @return {Number} pos.1 The Y coordinate <ko>y 좌표</ko>
	 */
	get() {
		return this[pos].concat();
	}

	// @todo jsdoc
	set(position) {
		this[pos] = position.concat();
	}

	/**
	 * Moves an element to specific coordinates.
	 * @ko 좌표를 이동한다.
	 * @method eg.MovableCoord#setTo
	 * @param {Number} x The X coordinate to move to <ko>이동할 x좌표</ko>
	 * @param {Number} y The Y coordinate to move to  <ko>이동할 y좌표</ko>
	 * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
	 * @return {eg.MovableCoord} An instance of a module itself <ko>자신의 인스턴스</ko>
	 */
	setTo(x, y, duration) {
		let min = this.options.min;
		let max = this.options.max;
		let circular = this.options.circular;
		this._grab(min, max, circular);
		let pos = this.get();
		if (x === pos[0] && y === pos[1]) {
			return this;
		}
		this._setInterrupt(true);
		if (x !== pos[0]) {
			if (!circular[3]) {
				x = Math.max(min[0], x);
			}
			if (!circular[1]) {
				x = Math.min(max[0], x);
			}
		}
		if (y !== pos[1]) {
			if (!circular[0]) {
				y = Math.max(min[1], y);
			}
			if (!circular[2]) {
				y = Math.min(max[1], y);
			}
		}
		if (duration) {
			this._animateTo([ x, y ], duration);
		} else {
			this[pos] = Direction.getCircularPos([ x, y ], min, max, circular);
			this._setPosAndTriggerChange(this[pos], false);
			this._setInterrupt(false);
		}
		return this;
	}

	/**
	 * Moves an element from the current coordinates to specific coordinates. The change event is fired when the method is executed.
	 * @ko 현재 좌표를 기준으로 좌표를 이동한다. 메서드가 실행되면 change 이벤트가 발생한다
	 * @method eg.MovableCoord#setBy
	 * @param {Number} x The X coordinate to move to <ko>이동할 x좌표</ko>
	 * @param {Number} y The Y coordinate to move to <ko>이동할 y좌표</ko>
	 * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
	 * @return {eg.MovableCoord} An instance of a module itself <ko>자신의 인스턴스</ko>
	 */
	setBy(x, y, duration) {
		return this.setTo(
			x != null ? this[pos][0] + x : this[pos][0],
			y != null ? this[pos][1] + y : this[pos][1],
			duration
		);
	}

	/**
	 * Destroys elements, properties, and events used in a module.
	 * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
	 * @method eg.MovableCoord#destroy
	 */
	destroy() {
		this.off();
		this.hammerManager.destroy();
	}
};

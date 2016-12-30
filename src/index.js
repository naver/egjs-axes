/**
* Copyright (c) 2015 NAVER Corp.
* eg.movableCoord projects are licensed under the MIT license
*/
import Component from "eg.component";
import { window, document } from "./browser";
import { DIRECTION } from "./consts";
import HammerManager from "./hammerManager";
import EventManager from "./events";
import { Direction } from "./direction";

class MovableCoord extends Component {
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
		this.hammerManager = new HammerManager();
		this._pos = this.options.min.concat();
		this._raf = null;
		this._animationEnd = this._animationEnd.bind(this);	// for caching
		this._restore = this._restore.bind(this);	// for caching
		// this._panmove = this._panmove.bind(this);	// for caching
		// this._panend = this._panend.bind(this);	// for caching
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
		this.hammerManager.add(element, options, this);
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
		this.hammerManager.remove(element);
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
		return this.hammerManager.getHammer(element);
	}

	_grab() {
		if (this._status.animationParam) {
			this.trigger("animationEnd");
			let pos = this._getCircularPos(this._pos);
			if (pos[0] !== this._pos[0] || pos[1] !== this._pos[1]) {
				this._pos = pos;
				this._triggerChange(this._pos, true);
			}
			this._status.animationParam = null;
			this._raf && window.cancelAnimationFrame(this._raf);
			this._raf = null;
		}
	}

	_getCircularPos(pos, min, max, circular) {
		min = min || this.options.min;
		max = max || this.options.max;
		circular = circular || this.options.circular;

		if (circular[0] && pos[1] < min[1]) { // up
			pos[1] = (pos[1] - min[1]) % (max[1] - min[1] + 1) + max[1];
		}
		if (circular[1] && pos[0] > max[0]) { // right
			pos[0] = (pos[0] - min[0]) % (max[0] - min[0] + 1) + min[0];
		}
		if (circular[2] && pos[1] > max[1]) { // down
			pos[1] = (pos[1] - min[1]) % (max[1] - min[1] + 1) + min[1];
		}
		if (circular[3] && pos[0] < min[0]) { // left
			pos[0] = (pos[0] - min[0]) % (max[0] - min[0] + 1) + max[0];
		}
		pos[0] = +pos[0].toFixed(5), pos[1] = +pos[1].toFixed(5);

		return pos;
	}

	_getNextOffsetPos(speeds) {
		let normalSpeed = Math.sqrt(
			speeds[0] * speeds[0] + speeds[1] * speeds[1]
		);
		let duration = Math.abs(normalSpeed / -this.options.deceleration);
		return [
			speeds[0] / 2 * duration,
			speeds[1] / 2 * duration
		];
	}

	_getDurationFromPos(pos) {
		let normalPos = Math.sqrt(pos[0] * pos[0] + pos[1] * pos[1]);
		let duration = Math.sqrt(
			normalPos / this.options.deceleration * 2
		);

		// when duration is under 100, then value is zero
		return duration < 100 ? 0 : duration;
	}

	_getPointOfIntersection(depaPos, destPos) {
		let circular = this.options.circular;
		let bounce = this.options.bounce;
		let min = this.options.min;
		let max = this.options.max;
		let boxLT = [ min[0] - bounce[3], min[1] - bounce[0] ];
		let boxRB = [ max[0] + bounce[1], max[1] + bounce[2] ];
		let xd;
		let yd;
		destPos = [destPos[0], destPos[1]];
		xd = destPos[0] - depaPos[0], yd = destPos[1] - depaPos[1];
		if (!circular[3]) {
			destPos[0] = Math.max(boxLT[0], destPos[0]);
		} // left
		if (!circular[1]) {
			destPos[0] = Math.min(boxRB[0], destPos[0]);
		} // right
		destPos[1] = xd ?
						depaPos[1] + yd / xd * (destPos[0] - depaPos[0]) :
						destPos[1];

		if (!circular[0]) {
			destPos[1] = Math.max(boxLT[1], destPos[1]);
		} // up
		if (!circular[2]) {
			destPos[1] = Math.min(boxRB[1], destPos[1]);
		} // down
		destPos[0] = yd ?
						depaPos[0] + xd / yd * (destPos[1] - depaPos[1]) :
						destPos[0];
		return [
			Math.min(max[0], Math.max(min[0], destPos[0])),
			Math.min(max[1], Math.max(min[1], destPos[1]))
		];
	}

	_isCircular(destPos) {
		let circular = this.options.circular;
		let min = this.options.min;
		let max = this.options.max;
		return (circular[0] && destPos[1] < min[1]) ||
				(circular[1] && destPos[0] > max[0]) ||
				(circular[2] && destPos[1] > max[1]) ||
				(circular[3] && destPos[0] < min[0]);
	}

	_prepareParam(absPos, duration, hammerEvent) {
		let pos = this._pos;
		let destPos = this._getPointOfIntersection(pos, absPos);
		destPos = this._isOutToOut(pos, destPos) ? pos : destPos;
		let distance = [
			Math.abs(destPos[0] - pos[0]),
			Math.abs(destPos[1] - pos[1])
		];
		duration = duration == null ? this._getDurationFromPos(distance) : duration;
		duration = this.options.maximumDuration > duration ?
					duration : this.options.maximumDuration;
		return {
			depaPos: pos.concat(),
			destPos: destPos.concat(),
			isBounce: this._isOutside(destPos, this.options.min, this.options.max),
			isCircular: this._isCircular(absPos),
			duration: duration,
			distance: distance,
			hammerEvent: hammerEvent || null,
			done: this._animationEnd
		};
	}

	_restore(complete, hammerEvent) {
		let pos = this._pos;
		let min = this.options.min;
		let max = this.options.max;
		this._animate(this._prepareParam([
			Math.min(max[0], Math.max(min[0], pos[0])),
			Math.min(max[1], Math.max(min[1], pos[1]))
		], null, hammerEvent), complete);
	}

	_animationEnd() {
		this._status.animationParam = null;
		this._pos = this._getCircularPos([
			Math.round(this._pos[0]),
			Math.round(this._pos[1])
		]);
		this._setInterrupt(false);
		/**
		 * This event is fired when animation ends.
		 * @ko 에니메이션이 끝났을 때 발생한다.
		 * @name eg.MovableCoord#animationEnd
		 * @event
		 */
		this.trigger("animationEnd");
	}

	_animate(param, complete) {
		param.startTime = new Date().getTime();
		this._status.animationParam = param;
		if (param.duration) {
			let info = this._status.animationParam;
			let self = this;
			(function loop() {
				self._raf = null;
				if (self._frame(info) >= 1) {
					// deferred.resolve();
					complete();
					return;
				} // animationEnd
				self._raf = window.requestAnimationFrame(loop);
			})();
		} else {
			this._triggerChange(param.destPos, false);
			complete();
		}
	}

	_animateTo(absPos, duration, hammerEvent) {
		let param = this._prepareParam(absPos, duration, hammerEvent);
		let retTrigger = this.trigger("animationStart", param);

		// You can't stop the 'animationStart' event when 'circular' is true.
		if (param.isCircular && !retTrigger) {
			throw new Error(
				"You can't stop the 'animation' event when 'circular' is true."
			);
		}

		if (retTrigger) {
			let self = this;
			let queue = [];
			let dequeue = function() {
				let task = queue.shift();
				task && task.call(this);
			};
			if (param.depaPos[0] !== param.destPos[0] ||
				param.depaPos[1] !== param.destPos[1]) {
				queue.push(function() {
					self._animate(param, dequeue);
				});
			}
			if (this._isOutside(param.destPos, this.options.min, this.options.max)) {
				queue.push(function() {
					self._restore(dequeue, hammerEvent);
				});
			}
			queue.push(function() {
				self._animationEnd();
			});
			dequeue();
		}
	}

	// animation frame (0~1)
	_frame(param) {
		let curTime = new Date() - param.startTime;
		let easingPer = this._easing(curTime / param.duration);
		let pos = [ param.depaPos[0], param.depaPos[1] ];

		for (let i = 0; i < 2 ; i++) {
			(pos[i] !== param.destPos[i]) &&
			(pos[i] += (param.destPos[i] - pos[i]) * easingPer);
		}
		pos = this._getCircularPos(pos);
		this._triggerChange(pos, false);
		return easingPer;
	}

	// set up 'css' expression
	_reviseOptions() {
		let key;
		let self = this;
		(["bounce", "margin", "circular"]).forEach(function(v) {
			key = self.options[v];
			if (key != null) {
				if (key.constructor === Array) {
					self.options[v] = key.length === 2 ?
						key.concat(key) : key.concat();
				} else if (/string|number|boolean/.test(typeof key)) {
					self.options[v] = [ key, key, key, key ];
				} else {
					self.options[v] = null;
				}
			}
		});
	}

	// trigger 'change' event
	_triggerChange(pos, holding, e) {
		/**
		 * This event is fired when coordinate changes.
		 * @ko 좌표가 변경됐을 때 발생하는 이벤트
		 * @name eg.MovableCoord#change
		 * @event
		 *
		 * @param {Object} param The object of data to be sent when the event is fired <ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
		 * @param {Array} param.pos departure coordinate  <ko>좌표</ko>
		 * @param {Number} param.pos.0 The X coordinate <ko>x 좌표</ko>
		 * @param {Number} param.pos.1 The Y coordinate <ko>y 좌표</ko>
		 * @param {Boolean} param.holding Indicates whether a user holds an element on the screen of the device.<ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
		 * @param {Object} param.hammerEvent The event information of Hammer.JS. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>Hammer.JS의 이벤트 정보. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다.</ko>
		 *
		 */
		this._pos = pos.concat();
		this.trigger("change", {
			pos: pos.concat(),
			holding: holding,
			hammerEvent: e || null
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
		return this._pos.concat();
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
		this._grab();
		let pos = this._pos.concat();
		let circular = this.options.circular;
		let min = this.options.min;
		let max = this.options.max;
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
			this._pos = this._getCircularPos([ x, y ]);
			this._triggerChange(this._pos, false);
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
			x != null ? this._pos[0] + x : this._pos[0],
			y != null ? this._pos[1] + y : this._pos[1],
			duration
		);
	}

	_easing(p) {
		return p > 1 ? 1 : this.options.easing(p);
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
Object.assign(MovableCoord.prototype, EventManager.prototype);
export { MovableCoord };
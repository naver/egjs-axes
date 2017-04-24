import Coordinate from "./Coordinate";
import {window} from "./browser";

export default superclass => class extends superclass {
	constructor() {
		super();
		this._raf = null;
		this._animateParam = null;
		this._animationEnd = this._animationEnd.bind(this);	// for caching
		this._restore = this._restore.bind(this);	// for caching
	}

	_grab(min, max, circular) {
		if (this._animateParam) {
			this.trigger("animationEnd");
			const orgPos = this.get();

			const pos = Coordinate.getCircularPos(this.get(), min, max, circular);

			if (pos[0] !== orgPos[0] || pos[1] !== orgPos[1]) {
				this._setPosAndTriggerChange(pos, true);
			}
			this._animateParam = null;
			this._raf && window.cancelAnimationFrame(this._raf);
			this._raf = null;
		}
	}

	_prepareParam(absPos, duration, hammerEvent) {
		const pos = this.get();
		const min = this.options.min;
		const max = this.options.max;
		const circular = this.options.circular;
		const maximumDuration = this.options.maximumDuration;
		let destPos = Coordinate.getPointOfIntersection(
			pos, absPos, min, max, circular, this.options.bounce);

		destPos = Coordinate.isOutToOut(pos, destPos, min, max) ? pos : destPos;

		const distance = [
			Math.abs(destPos[0] - pos[0]),
			Math.abs(destPos[1] - pos[1]),
		];
		let newDuration = duration == null ? Coordinate.getDurationFromPos(
			distance, this.options.deceleration) : duration;

		newDuration = maximumDuration > newDuration ? newDuration : maximumDuration;
		return {
			depaPos: pos.concat(),
			destPos: destPos.concat(),
			isBounce: Coordinate.isOutside(destPos, min, max),
			isCircular: Coordinate.isCircular(absPos, min, max, circular),
			duration: newDuration,
			distance,
			hammerEvent: hammerEvent || null,
			done: this._animationEnd,
		};
	}

	_restore(complete, hammerEvent) {
		const pos = this.get();
		const min = this.options.min;
		const max = this.options.max;

		this._animate(this._prepareParam([
			Math.min(max[0], Math.max(min[0], pos[0])),
			Math.min(max[1], Math.max(min[1], pos[1])),
		], null, hammerEvent), complete);
	}

	_animationEnd() {
		this._animateParam = null;
		const orgPos = this.get();
		const nextPos = Coordinate.getCircularPos([
			Math.round(orgPos[0]),
			Math.round(orgPos[1]),
		], this.options.min, this.options.max, this.options.circular);

		this.setTo(...nextPos);
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
		this._animateParam = Object.assign({}, param);
		this._animateParam.startTime = new Date().getTime();
		if (param.duration) {
			const info = this._animateParam;
			const self = this;

			(function loop() {
				/* eslint-disable no-underscore-dangle */
				self._raf = null;
				if (self._frame(info) >= 1) {
					// deferred.resolve();
					complete();
					return;
				} // animationEnd
				self._raf = window.requestAnimationFrame(loop);
				/* eslint-enable no-underscore-dangle */
			})();
		} else {
			this._setPosAndTriggerChange(param.destPos, false);
			complete();
		}
	}

	_animateTo(absPos, duration, hammerEvent) {
		const param = this._prepareParam(absPos, duration, hammerEvent);
		const retTrigger = this.trigger("animationStart", param);

		// You can't stop the 'animationStart' event when 'circular' is true.
		if (param.isCircular && !retTrigger) {
			throw new Error(
				"You can't stop the 'animation' event when 'circular' is true."
			);
		}

		if (retTrigger) {
			const queue = [];
			const dequeue = function() {
				const task = queue.shift();

				task && task.call(this);
			};

			if (param.depaPos[0] !== param.destPos[0] ||
				param.depaPos[1] !== param.destPos[1]) {
				queue.push(() => this._animate(param, dequeue));
			}
			if (Coordinate.isOutside(
				param.destPos, this.options.min, this.options.max)) {
				queue.push(() => this._restore(dequeue, hammerEvent));
			}
			queue.push(() => this._animationEnd());
			dequeue();
		}
	}

	// animation frame (0~1)
	_frame(param) {
		const curTime = new Date() - param.startTime;
		const easingPer = this._easing(curTime / param.duration);
		let pos = [param.depaPos[0], param.depaPos[1]];

		for (let i = 0; i < 2; i++) {
			(pos[i] !== param.destPos[i]) &&
			(pos[i] += (param.destPos[i] - pos[i]) * easingPer);
		}
		pos = Coordinate.getCircularPos(
			pos, this.options.min, this.options.max, this.options.circular);
		this._setPosAndTriggerChange(pos, false);
		return easingPer;
	}

	// trigger 'change' event
	_setPosAndTriggerChange(position, holding, e) {
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
			holding,
			hammerEvent: e || null,
		});
	}

	_easing(p) {
		return p > 1 ? 1 : this.options.easing(p);
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
	setTo(x, y, duration = 0) {
		let toX = x;
		let toY = y;
		const min = this.options.min;
		const max = this.options.max;
		const circular = this.options.circular;

		this._grab(min, max, circular);
		const pos = this.get();

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
			this._pos = Coordinate.getCircularPos([toX, toY], min, max, circular);
			this._setPosAndTriggerChange(this._pos, false);
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
	setBy(x, y, duration = 0) {
		return this.setTo(
			x != null ? this._pos[0] + x : this._pos[0],
			y != null ? this._pos[1] + y : this._pos[1],
			duration
		);
	}
};

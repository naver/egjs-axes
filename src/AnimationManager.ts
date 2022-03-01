import { getInsidePosition, isCircularable, getCirculatedPos, getDuration } from "./Coordinate";
import { Axis, AxisManager } from "./AxisManager";
import { InterruptManager } from "./InterruptManager";
import { EventManager, ChangeEventOption } from "./EventManager";
import { requestAnimationFrame, cancelAnimationFrame, map, every, filter, equal, roundNumber, getDecimalPlace, inversePow } from "./utils";
import { AxesOption } from "./Axes";
import { AnimationParam, ObjectInterface } from "./types";

function minMax(value: number, min: number, max: number): number {
	return Math.max(Math.min(value, max), min);
}

export class AnimationManager {
	private _raf;
	private _animateParam: AnimationParam;
	private _initialEasingPer: number;
	private _prevEasingPer: number;
	private _durationOffset: number;
	private options: AxesOption;
	public itm: InterruptManager;
	public em: EventManager;
	public axm: AxisManager;

	constructor({ options, itm, em, axm }) {
		this.options = options;
		this.itm = itm;
		this.em = em;
		this.axm = axm;
		this.animationEnd = this.animationEnd.bind(this);
	}
	getDuration(depaPos: Axis, destPos: Axis, wishDuration?: number) {
		let duration;
		if (typeof wishDuration !== "undefined") {
			duration = wishDuration;
		} else {
			const durations: Axis = map(
				destPos,
				(v, k) => getDuration(
					Math.abs(v - depaPos[k]),
					this.options.deceleration),
			);
			duration = Object.keys(durations).reduce((max, v) => Math.max(max, durations[v]), -Infinity);
		}
		return minMax(
			duration,
			this.options.minimumDuration,
			this.options.maximumDuration);
	}

	getDisplacement(velocity: number[]): number[] {
		const totalVelocity = Math.pow(velocity.reduce((total, v) => total + v * v, 0), 1 / (velocity.length));
		const duration = Math.abs(totalVelocity / -this.options.deceleration);
		return velocity.map(v => v / 2 * duration);
	}

	interpolate(displacement: number, threshold: number): number {
		const initSlope = this.easing(0.00001) / 0.00001;
		return this.easing(displacement / (threshold * initSlope)) * threshold;
	}

	private createAnimationParam(pos: Axis, duration: number, option?: ChangeEventOption): AnimationParam {
		const depaPos: Axis = this.axm.get();
		const destPos: Axis = pos;
		const inputEvent = option && option.event || null;
		return {
			depaPos,
			destPos,
			duration: minMax(
				duration,
				this.options.minimumDuration,
				this.options.maximumDuration),
			delta: this.axm.getDelta(depaPos, destPos),
			inputEvent,
			input: option && option.input || null,
			isTrusted: !!inputEvent,
			done: this.animationEnd,
		};
	}

	stop(axes: string[], option?: ChangeEventOption) {
		if (this._animateParam && axes.length) {
			const orgPos: Axis = this.axm.get(axes);
			const pos: Axis = this.axm.map(orgPos,
				(v, opt) => getCirculatedPos(v, opt.range, opt.circular as boolean[]));
			if (!every(pos, (v, k) => orgPos[k] === v)) {
				this.em.triggerChange(pos, false, orgPos, option, !!option);
			}
			this._animateParam = null;
			this._raf && cancelAnimationFrame(this._raf);
			this._raf = null;
			this.em.triggerAnimationEnd(!!(option && option.event));
		}
	}

	getEventInfo(): ChangeEventOption {
		if (this._animateParam && this._animateParam.input && this._animateParam.inputEvent) {
			return {
				input: this._animateParam.input,
				event: this._animateParam.inputEvent,
			};
		} else {
			return null;
		}
	}

	restore(option: ChangeEventOption) {
		const pos: Axis = this.axm.get();
		const destPos: Axis = this.axm.map(pos,
			(v, opt) => Math.min(opt.range[1], Math.max(opt.range[0], v)));
		this.animateTo(destPos, this.getDuration(pos, destPos), option);
	}

	animationEnd() {
		const beforeParam: ChangeEventOption = this.getEventInfo();
		this._animateParam = null;

		// for Circular
		const circularTargets = this.axm.filter(
			this.axm.get(),
			(v, opt) => isCircularable(v, opt.range, opt.circular as boolean[]),
		);
		Object.keys(circularTargets).length > 0 && this.setTo(this.axm.map(
			circularTargets,
			(v, opt) => getCirculatedPos(v, opt.range, opt.circular as boolean[]),
		));
		this.itm.setInterrupt(false);
		this.em.triggerAnimationEnd(!!beforeParam);
		if (this.axm.isOutside()) {
			this.restore(beforeParam);
		} else {
			this.finish(!!beforeParam);
		}
	}
	finish(isTrusted) {
		this._animateParam = null;
		this.itm.setInterrupt(false);
		this.em.triggerFinish(isTrusted);
	}
	private animateLoop(param: AnimationParam, complete: () => void) {
		if (param.duration) {
			let prevPos = param.depaPos;
			this._initialEasingPer = 0;
			this._prevEasingPer = 0;
			this._durationOffset = 0;
			this._animateParam = {
				...param,
				startTime: new Date().getTime(),
			};
			const directions = map(prevPos, (value, key) => {
				return value <= param.destPos[key] ? 1 : -1;
			});
			const originalIntendedPos = map(param.destPos, v => v);
			const self = this;

			(function loop() {
				const animateParam = self._animateParam;
				const diffTime = new Date().getTime() - animateParam.startTime;
				const ratio = (diffTime + self._durationOffset) / animateParam.duration;
				const easingPer = self.easing(ratio);
				self._raf = null;
				const toPos: Axis = self.axm.map(prevPos, (pos, options, key) => {
					const nextPos = ratio >= 1
						? animateParam.destPos[key]
						: pos + animateParam.delta[key] * (easingPer - self._prevEasingPer) / (1 - self._initialEasingPer);

					// Subtract distance from distance already moved.
					// Recalculate the remaining distance.
					// Fix the bouncing phenomenon by changing the range.
					const circulatedPos = getCirculatedPos(nextPos, options.range, options.circular as boolean[]);
					if (nextPos !== circulatedPos) {
						// circular
						const rangeOffset = directions[key] * (options.range[1] - options.range[0]);

						animateParam.destPos[key] -= rangeOffset;
						prevPos[key] -= rangeOffset;
					}
					return circulatedPos;
				});
				const isCanceled = !self.em.triggerChange(toPos, false, prevPos);

				prevPos = toPos;
				self._prevEasingPer = easingPer;
				if (easingPer >= 1) {
					animateParam.destPos = self.getFinalPos(animateParam.destPos, originalIntendedPos);

					if (!equal(animateParam.destPos, self.axm.get(Object.keys(animateParam.destPos)))) {
						self.em.triggerChange(animateParam.destPos, true, prevPos);
					}
					complete();
					return;
				} else if (isCanceled) {
					self.finish(false);
				} else {
					// animationEnd
					self._raf = requestAnimationFrame(loop);
				}
			})();
		} else {
			this.em.triggerChange(param.destPos, true);
			complete();
		}
	}

	/**
	 * Get estimated final value.
	 *
	 * If destPos is within the 'error range' of the original intended position, the initial intended position is returned.
	 *   - eg. original intended pos: 100, destPos: 100.0000000004 ==> return 100;
	 * If dest Pos is outside the 'range of error' compared to the originally intended pos, it is returned rounded based on the originally intended pos.
	 *   - eg. original intended pos: 100.123 destPos: 50.12345 => return 50.123
	 *
	 * @param originalIntendedPos
	 * @param destPos
	 */
	private getFinalPos(destPos: ObjectInterface<number>, originalIntendedPos: ObjectInterface<number>) {
		// compare destPos and originalIntendedPos
		const ERROR_LIMIT = 0.000001;
		const finalPos = map(destPos, (value, key) => {
			if (value >= originalIntendedPos[key] - ERROR_LIMIT && value <= originalIntendedPos[key] + ERROR_LIMIT) {
				// In error range, return original intended
				return originalIntendedPos[key];
			} else {
				// Out of error range, return rounded pos.
				const roundUnit = this.getRoundUnit(value, key);
				const result = roundNumber(value, roundUnit);
				return result;
			}
		});
		return finalPos;
	}

	private getRoundUnit(val: number, key: string) {
		const roundUnit = this.options.round; // manual mode
		let minRoundUnit = null; // auto mode

		// auto mode
		if (!roundUnit) {
			// Get minimum round unit
			const options = this.axm.getAxisOptions(key);
			minRoundUnit = inversePow(Math.max(
				getDecimalPlace(options.range[0]),
				getDecimalPlace(options.range[1]),
				getDecimalPlace(val)));
		}

		return minRoundUnit || roundUnit;
	}

	getUserControll(param: AnimationParam) {
		const userWish = param.setTo();
		userWish.destPos = this.axm.get(userWish.destPos);
		userWish.duration = minMax(
			userWish.duration,
			this.options.minimumDuration,
			this.options.maximumDuration);
		return userWish;
	}

	animateTo(destPos: Axis, duration: number, option?: ChangeEventOption) {
		const param: AnimationParam = this.createAnimationParam(destPos, duration, option);
		const depaPos = { ...param.depaPos };
		const retTrigger = this.em.triggerAnimationStart(param);

		// to control
		const userWish = this.getUserControll(param);

		// You can't stop the 'animationStart' event when 'circular' is true.
		if (!retTrigger && this.axm.every(
			userWish.destPos,
			(v, opt) => isCircularable(v, opt.range, opt.circular as boolean[]))) {
			console.warn("You can't stop the 'animation' event when 'circular' is true.");
		}

		if (retTrigger && !equal(userWish.destPos, depaPos)) {
			const inputEvent = option && option.event || null;
			this.animateLoop({
				depaPos,
				destPos: userWish.destPos,
				duration: userWish.duration,
				delta: this.axm.getDelta(depaPos, userWish.destPos),
				isTrusted: !!inputEvent,
				inputEvent,
				input: option && option.input || null,
			}, () => this.animationEnd());
		}
	}

	easing(p) {
		return p > 1 ? 1 : this.options.easing(p);
	}

	setTo(pos: Axis, duration: number = 0) {
		const axes: string[] = Object.keys(pos);
		this.stop(axes);
		const orgPos: Axis = this.axm.get(axes);

		if (equal(pos, orgPos)) {
			return this;
		}
		this.itm.setInterrupt(true);
		let movedPos = filter(pos, (v, k) => orgPos[k] !== v);
		if (!Object.keys(movedPos).length) {
			return this;
		}

		movedPos = this.axm.map(movedPos, (v, opt) => {
			const { range, circular } = opt;

			if (circular && (circular[0] || circular[1])) {
				return v;
			} else {
				return getInsidePosition(v, range, circular as boolean[]);
			}
		});

		if (equal(movedPos, orgPos)) {
			return this;
		}

		if (duration > 0) {
			this.animateTo(movedPos, duration);
		} else {
			this.em.triggerChange(movedPos);
			this.finish(false);
		}

		return this;
	}

	setBy(pos: Axis, duration = 0) {
		return this.setTo(
			map(this.axm.get(Object.keys(pos)), (v, k) => v + pos[k]),
			duration,
		);
	}

	updateAnimationPos(pos: Axis, restart: boolean) {
		const animateParam = this._animateParam;
		if (!animateParam) {
			return;
		}
		if (restart) {
			this.setTo(pos, animateParam.duration - (new Date().getTime() - animateParam.startTime));
		} else {
			const currentPos = this.axm.get();
			// currently remaining percent as 100%
			//
			this._initialEasingPer = this._prevEasingPer;
			animateParam.delta = this.axm.getDelta(currentPos, pos);
			animateParam.destPos = pos;
		}
	}

	updateAnimationDuration(duration: number,  restart: boolean) {
		const animateParam = this._animateParam;
		if (!animateParam) {
			return;
		}
		if (restart) {
			this.setTo(animateParam.destPos, duration - animateParam.duration);
		} else {
			const diffTime = new Date().getTime() - animateParam.startTime;
			const ratio = (diffTime + this._durationOffset) / animateParam.duration;
			// Use durationOffset for keeping animation ratio after duration is changed.
			// newRatio = (diffTime + newDurationOffset) / newDuration = oldRatio
			// newDurationOffset = oldRatio * newDuration - diffTime
			this._durationOffset = ratio * duration - diffTime;
			animateParam.duration = duration;
		}
	}
}

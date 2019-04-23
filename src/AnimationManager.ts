import { IInputType } from "./inputType/InputType";
import { getInsidePosition, isCircularable, getCirculatedPos, getDuration } from "./Coordinate";
import { Axis, AxisManager } from "./AxisManager";
import { InterruptManager } from "./InterruptManager";
import { EventManager, ChangeEventOption } from "./EventManager";
import { requestAnimationFrame, cancelAnimationFrame, map, every, filter, equal, toFixed, mapToFixed } from "./utils";
import { AxesOption } from "./Axes";

function minMax(value: number, min: number, max: number): number {
	return Math.max(Math.min(value, max), min);
}

export interface AnimationParam {
	depaPos: Axis;
	destPos: Axis;
	duration: number;
	delta: Axis;
	isTrusted?: boolean;
	setTo?: (destPos?: Axis, duration?: number) => { destPos: Axis, duration: number };
	done?: () => void;
	startTime?: number;
	inputEvent?;
	input?: IInputType;
}

export class AnimationManager {
	private _raf;
	private _animateParam: AnimationParam;
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
					Math.abs(Math.abs(v) - Math.abs(depaPos[k])),
					this.options.deceleration),
			);
			duration = Object.keys(durations).reduce((max, v) => Math.max(max, durations[v]), -Infinity);
		}
		return minMax(
			duration,
			this.options.minimumDuration,
			this.options.maximumDuration);
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

	grab(axes: string[], option?: ChangeEventOption) {
		if (this._animateParam && axes.length) {
			const orgPos: Axis = this.axm.get(axes);
			const pos: Axis = this.axm.map(orgPos,
				(v, opt) => getCirculatedPos(v, opt.range, opt.circular as boolean[], false));
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
			(v, opt) => getCirculatedPos(v, opt.range, opt.circular as boolean[], false),
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
			this._animateParam = { ...param };
			const info: AnimationParam = this._animateParam;
			const self = this;
			let prevPos = info.depaPos;
			const directions = map(prevPos, (value, key) => {
				return value <= info.destPos[key] ? 1 : -1;
			});
			let prevTime = new Date().getTime();
			info.startTime = prevTime;

			(function loop() {
				self._raf = null;
				const currentTime = new Date().getTime();
				const prevEasingPer = self.easing((prevTime - info.startTime) / param.duration);
				const easingPer = self.easing((currentTime - info.startTime) / param.duration);
				let toPos: Axis = map(prevPos, (pos, key) => pos + info.delta[key] * (easingPer - prevEasingPer));

				toPos = self.axm.map(toPos, (pos, options, key) => {
					// fix absolute position to relative position
					// fix the bouncing phenomenon by changing the range.
					const nextPos = getCirculatedPos(pos, options.range, options.circular as boolean[], true);
					if (pos !== nextPos) {
						// circular
						param.destPos[key] += -directions[key] * (options.range[1] - options.range[0]);
						prevPos[key] += -directions[key] * (options.range[1] - options.range[0]);
					}
					return nextPos;
				});
				const isCanceled = !self.em.triggerChange(toPos, false, mapToFixed(prevPos));

				prevPos = toPos;
				prevTime = currentTime;
				if (easingPer >= 1) {
					const destPos = param.destPos;

					if (!equal(destPos, self.axm.get(Object.keys(destPos)))) {
						self.em.triggerChange(destPos, true, mapToFixed(prevPos));
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
		this.grab(axes);
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
}

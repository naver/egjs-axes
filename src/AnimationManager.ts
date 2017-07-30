import Coordinate from "./Coordinate";
import { Axis, AxisManager } from "./AxisManager";
import { InterruptManager } from "./InterruptManager";
import { EventManager } from "./EventManager";

export interface AnimationParam {
	depaPos: Axis;
	destPos: Axis;
	duration: number;
	delta: Axis;
	setTo?: (destPos?: Axis, duration?: number) => { destPos: Axis, duration: number };
	done?: () => void;
	startTime?: number;
	inputEvent?;
}

export class AnimationManager {
	private _raf;
	private _animateParam: AnimationParam;

	static getDuration(duration: number, maximum: number): number {
		return maximum > duration ? duration : maximum;
	}

	constructor(
		private options: AxesOption,
		private itm: InterruptManager,
		private em: EventManager,
		private axm: AxisManager
	) {
		this.animationEnd = this.animationEnd.bind(this);
	}
	getDuration(depaPos: Axis, destPos: Axis, wishDuration?: number) {
		let duration;
		if (typeof wishDuration !== "undefined") {
			duration = wishDuration;
		} else {
			const durations: Axis = this.axm.map(
				destPos,
				(v, k) => Coordinate.getDuration(
					Math.abs(Math.abs(v) - Math.abs(depaPos[k])),
					this.options.deceleration)
			);
			duration = Object.keys(durations).reduce((max, v) => Math.max(max, durations[v]), -Infinity);
		}
		return AnimationManager.getDuration(duration, this.options.maximumDuration);
	}

	private createAnimationParam(pos: Axis, duration: number, inputEvent = null): AnimationParam {
		const depaPos: Axis = this.axm.get(Object.keys(pos));
		const destPos: Axis = this.axm.map(pos, (v, k, opt) => {
			return Coordinate.getInsidePosition(
				v,
				opt.range,
				opt.circular,
				opt.bounce,
			);
		});
		const delta: Axis = this.axm.map(destPos, (v, k) => v - depaPos[k]);

		return {
			depaPos,
			destPos,
			duration: AnimationManager.getDuration(duration, this.options.maximumDuration),
			delta,
			inputEvent,
			done: this.animationEnd
		};
	}

	grab(axes: string[], event?) {
		if (this._animateParam && !axes.length) {
			const orgPos: Axis = this.axm.get(axes);
			const pos: Axis = this.axm.map(orgPos,
				(v, k, opt) => Coordinate.getCirculatedPos(v, opt.range, opt.circular));
			if (!this.axm.every(pos, (v, k) => orgPos[k] === v)) {
				this.em.triggerChange(this.axm.moveTo(pos), event);
			}
			this._animateParam = null;
			this._raf && window.cancelAnimationFrame(this._raf);
			this._raf = null;
			this.em.triggerAnimationEnd();
		}
	}

	restore(inputEvent = null) {
		const pos: Axis = this.axm.get();
		const destPos: Axis = this.axm.map(pos,
			(v, k, opt) => Math.min(opt.range[1], Math.max(opt.range[0], v)));
		this.animateTo(destPos, this.getDuration(pos, destPos), inputEvent);
	}

	animationEnd() {
		this._animateParam = null;

		// for Circular
		const circularTargets = this.axm.filter(
			this.axm.get(),
			(v, k, opt) => Coordinate.isCircularable(v, opt.range, opt.circular)
		);
		Object.keys(circularTargets).length > 0 && this.setTo(this.axm.map(
			circularTargets,
			(v, k, opt) => Coordinate.getCirculatedPos(v, opt.range, opt.circular)
		));
		this.itm.setInterrupt(false);
		this.em.triggerAnimationEnd();
		this.axm.isOutside() && this.restore();
	}

	private animateLoop(param: AnimationParam, complete: () => void) {
		this._animateParam = { ...param };
		this._animateParam.startTime = new Date().getTime();
		if (param.duration) {
			const info: AnimationParam = this._animateParam;
			const self = this;

			(function loop() {
				self._raf = null;
				if (self.frame(info) >= 1) {
					complete();
					return;
				} // animationEnd
				self._raf = window.requestAnimationFrame(loop);
			})();
		} else {
			this.em.triggerChange(this.axm.moveTo(param.destPos));
			complete();
		}
	}

	animateTo(destPos: Axis, duration: number, inputEvent = null) {
		const depaPos = this.axm.get();
		const param: AnimationParam = this.createAnimationParam(destPos, duration, inputEvent);
		const retTrigger = this.em.triggerAnimationStart(param);

		// to control
		const userWish = param.setTo();
		userWish.destPos = this.axm.get(userWish.destPos);
		userWish.duration = AnimationManager.getDuration(userWish.duration, this.options.maximumDuration);

		// You can't stop the 'animationStart' event when 'circular' is true.
		if (!retTrigger && this.axm.every(
				userWish.destPos,
				(v, k, opt) => Coordinate.isCircularable(v, opt.range, opt.circular))) {
				console.warn("You can't stop the 'animation' event when 'circular' is true.");
		}

		if (retTrigger && !AxisManager.equal(userWish.destPos, depaPos)) {
			this.animateLoop({
				depaPos,
				destPos: userWish.destPos,
				duration: userWish.duration,
				delta: this.axm.map(userWish.destPos, (v, k) => v - depaPos[k]),
			}, () => this.animationEnd());
		}
	}

	// animation frame (0~1)
	private frame(param: AnimationParam) {
		const curTime = new Date().getTime() - param.startTime;
		const easingPer = this.easing(curTime / param.duration);
		let toPos: Axis = param.depaPos;
		toPos = this.axm.map(toPos, (v, k, opt) => {
			v += (param.destPos[k] - v) * easingPer;
			return Coordinate.getCirculatedPos(v, opt.range, opt.circular);
		});
		this.em.triggerChange(this.axm.moveTo(toPos));
		return easingPer;
	}

	easing(p) {
		return p > 1 ? 1 : this.options.easing(p);
	}

	setTo(pos: Axis, duration: number = 0) {
		const axes: string[] = Object.keys(pos);
		this.grab(axes);
		const orgPos: Axis = this.axm.get(axes);

		if (AxisManager.equal(pos, orgPos)) {
			return this;
		}
		this.itm.setInterrupt(true);
		let movedPos = this.axm.filter(pos, (v, k) => orgPos[k] !== v);
		if (!Object.keys(movedPos).length) {
			return;
		}
		movedPos = this.axm.map(movedPos, (v, k, opt) => {
			v = Coordinate.getInsidePosition(v, opt.range, opt.circular);
			return duration ? v : Coordinate.getCirculatedPos(v, opt.range, opt.circular);
		});
		if (AxisManager.equal(movedPos, orgPos)) {
			return this;
		} else if (duration) {
			this.animateTo(movedPos, duration);
		} else {
			this.em.triggerChange(this.axm.moveTo(movedPos));
			this.itm.setInterrupt(false);
		}
		return this;
	}

	setBy(pos: Axis, duration = 0) {
		return this.setTo(
			this.axm.map(this.axm.get(Object.keys(pos)), (v, k) => v + pos[k]),
			duration
		);
	}
};

import { InterruptManager } from "./InterruptManager";
import { IInputType, IInputTypeObserver } from "./inputType/InputType";
import { EventManager, ChangeEventOption } from "./EventManager";
import { AxisManager, Axis } from "./AxisManager";
import { AnimationManager } from "./AnimationManager";
import { AxesOption } from "./Axes";
import { isOutside, getInsidePosition } from "./Coordinate";
import { map, equal } from "./utils";
import { AnimationParam } from "./types";

export class InputObserver implements IInputTypeObserver {
	public options: AxesOption;
	private itm: InterruptManager;
	private em: EventManager;
	private axm: AxisManager;
	private am: AnimationManager;
	private isOutside = false;
	private moveDistance: Axis = null;
	private isStopped = false;
	constructor({ options, itm, em, axm, am }) {
		this.options = options;
		this.itm = itm;
		this.em = em;
		this.axm = axm;
		this.am = am;
	}

	// when move pointer is held in outside
	private atOutside(pos: Axis) {
		if (this.isOutside) {
			return this.axm.map(pos, (v, opt) => {
				const tn = opt.range[0] - opt.bounce[0];
				const tx = opt.range[1] + opt.bounce[1];
				return v > tx ? tx : (v < tn ? tn : v);
			});
		} else {
			// when start pointer is held in inside
			// get a initialization slope value to prevent smooth animation.
			const initSlope = this.am.easing(0.00001) / 0.00001;
			return this.axm.map(pos, (v, opt) => {
				const min = opt.range[0];
				const max = opt.range[1];
				const out = opt.bounce;
				const circular = opt.circular;

				if (circular && (circular[0] || circular[1])) {
					return v;
				} else if (v < min) { // left
					return min - this.am.easing((min - v) / (out[0] * initSlope)) * out[0];
				} else if (v > max) { // right
					return max + this.am.easing((v - max) / (out[1] * initSlope)) * out[1];
				}
				return v;
			});
		}
	}
	get(input: IInputType): Axis {
		return this.axm.get(input.axes);
	}
	hold(input: IInputType, event) {
		if (this.itm.isInterrupted() || !input.axes.length) {
			return;
		}
		const changeOption: ChangeEventOption = {
			input,
			event,
		};
		this.isStopped = false;
		this.itm.setInterrupt(true);
		this.am.grab(input.axes, changeOption);
		!this.moveDistance && this.em.triggerHold(this.axm.get(), changeOption);
		this.isOutside = this.axm.isOutside(input.axes);
		this.moveDistance = this.axm.get(input.axes);
	}
	change(input: IInputType, event, offset: Axis) {
		if (this.isStopped || !this.itm.isInterrupting() || this.axm.every(offset, v => v === 0)) {
			return;
		}
		let depaPos: Axis = this.moveDistance || this.axm.get(input.axes);
		let destPos: Axis;

		// for outside logic
		destPos = map(depaPos, (v, k) => v + (offset[k] || 0));
		this.moveDistance && (this.moveDistance = destPos);
		// from outside to inside
		if (this.isOutside &&
			this.axm.every(depaPos, (v, opt) => !isOutside(v, opt.range))) {
			this.isOutside = false;
		}
		depaPos = this.atOutside(depaPos);
		destPos = this.atOutside(destPos);

		const isCanceled = !this.em.triggerChange(destPos, false, depaPos, {
			input,
			event,
		}, true);

		if (isCanceled) {
			this.isStopped = true;
			this.moveDistance = null;
			this.am.finish(false);
		}
	}
	release(input: IInputType, event, offset: Axis, inputDuration?: number) {
		if (this.isStopped || !this.itm.isInterrupting() || !this.moveDistance) {
			return;
		}
		const pos: Axis = this.axm.get(input.axes);
		const depaPos: Axis = this.axm.get();
		let destPos: Axis = this.axm.get(this.axm.map(offset, (v, opt, k) => {
			if (opt.circular && (opt.circular[0] || opt.circular[1])) {
				return pos[k] + v;
			} else {
				return getInsidePosition(
					pos[k] + v,
					opt.range,
					opt.circular as boolean[],
					opt.bounce as number[],
				);
			}
		}));
		const duration = this.am.getDuration(destPos, pos, inputDuration);

		if (duration === 0) {
			destPos = { ...depaPos };
		}
		// prepare params
		const param: AnimationParam = {
			depaPos,
			destPos,
			duration,
			delta: this.axm.getDelta(depaPos, destPos),
			inputEvent: event,
			input,
			isTrusted: true,
		};
		this.em.triggerRelease(param);
		this.moveDistance = null;

		// to contol
		const userWish = this.am.getUserControll(param);
		const isEqual = equal(userWish.destPos, depaPos);
		const changeOption: ChangeEventOption = {
			input,
			event,
		};
		if (isEqual || userWish.duration === 0) {
			!isEqual && this.em.triggerChange(userWish.destPos, false, depaPos, changeOption, true);
			this.itm.setInterrupt(false);
			if (this.axm.isOutside()) {
				this.am.restore(changeOption);
			} else {
				this.em.triggerFinish(true);
			}
		} else {
			this.am.animateTo(userWish.destPos, userWish.duration, changeOption);
		}
	}
}

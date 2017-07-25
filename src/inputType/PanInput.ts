import { InputObserver } from "./../InputObserver";
import * as Hammer from "hammerjs";
import { DIRECTION } from "../const";
import { $ } from "../utils";
import { UNIQUEKEY, convertInputType, createHammer, toAxis, IInputType, IInputTypeObserver } from "./InputType";
import { Axis } from "../AxisManager";

export interface PanInputOption {
	inputType?: string[];
	scale?: number[];
	thresholdAngle?: number;
	threshold?: number;
}

export class PanInput implements IInputType {
	options: PanInputOption;
	axes: string[] = [];
	hammer = null;
	element: HTMLElement = null;
	private observer: IInputTypeObserver;
	private _direction: DIRECTION;

	// get user's direction
	static getDirectionByAngle(angle: number, thresholdAngle: number): DIRECTION {
		if (thresholdAngle < 0 || thresholdAngle > 90) {
			return DIRECTION.DIRECTION_NONE;
		}
		const toAngle = Math.abs(angle);

		return toAngle > thresholdAngle && toAngle < 180 - thresholdAngle ?
			DIRECTION.DIRECTION_VERTICAL : DIRECTION.DIRECTION_HORIZONTAL;
	}

	static getNextOffset(speeds: number[], deceleration: number) {
		const normalSpeed = Math.sqrt(
			speeds[0] * speeds[0] + speeds[1] * speeds[1]
		);
		const duration = Math.abs(normalSpeed / -deceleration);
		return [
			speeds[0] / 2 * duration,
			speeds[1] / 2 * duration
		];
	}

	static useDirection(
		checkType: DIRECTION,
		direction: DIRECTION,
		userDirection?: DIRECTION): boolean {
		if (userDirection) {
			return !!((direction === DIRECTION.DIRECTION_ALL) ||
				((direction & checkType) && (userDirection & checkType)));
		} else {
			return !!(direction & checkType);
		}
	}

	constructor(el: string | HTMLElement, options: PanInputOption) {
		/**
		 * Hammer helps you add support for touch gestures to your page
		 *
		 * @external Hammer
		 * @see {@link http://hammerjs.github.io|Hammer.JS}
		 * @see {@link http://hammerjs.github.io/jsdoc/Hammer.html|Hammer.JS API documents}
		 * @see Hammer.JS applies specific CSS properties by {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html|default} when creating an instance. The eg.Axes module removes all default CSS properties provided by Hammer.JS
		 */
		if (typeof Hammer === "undefined") {
			throw new Error(`The Hammerjs must be loaded before eg.Axes.PanInput.\nhttp://hammerjs.github.io/`);
		}
		this.element = $(el);
		this.options = {
			...{
				inputType: ["touch", "mouse"],
				scale: [1, 1],
				thresholdAngle: 45,
				threshold: 0,
			}, ...options
		};
		this.onHammerInput = this.onHammerInput.bind(this);
		this.onPanmove = this.onPanmove.bind(this);
		this.onPanend = this.onPanend.bind(this);
	}

	mapAxes(axes: string[]) {
		const useHorizontal = !!axes[0];
		const useVertical = !!axes[1];
		if (useHorizontal && useVertical) {
			this._direction = DIRECTION.DIRECTION_ALL;
		} else if (useHorizontal) {
			this._direction = DIRECTION.DIRECTION_HORIZONTAL;
		} else if (useVertical) {
			this._direction = DIRECTION.DIRECTION_VERTICAL;
		} else {
			this._direction = DIRECTION.DIRECTION_NONE;
		}
		this.axes = axes;
	}

	connect(observer: IInputTypeObserver): IInputType {
		const hammerOption = {
			direction: this._direction,
			threshold: this.options.threshold,
		};
		if (this.hammer) { // for sharing hammer instance.
			this.dettachEvent();
			// hammer remove previous PanRecognizer.
			this.hammer.add(new Hammer.Pan(hammerOption));
		} else {
			let keyValue: string = this.element[UNIQUEKEY];
			if (keyValue) {
				this.hammer.destroy();
			} else {
				keyValue = String(Math.round(Math.random() * new Date().getTime()));
			}
			const inputClass = convertInputType(this.options.inputType);
			if (!inputClass) {
				throw new Error("Wrong inputType parameter!");
			}
			this.hammer = createHammer(this.element,
				[Hammer.Pan, hammerOption],
				inputClass);
			this.element[UNIQUEKEY] = keyValue;
		}
		this.attachEvent(observer);
		return this;
	}

	disconnect() {
		if (this.hammer) {
			this.dettachEvent();
		}
		this._direction = DIRECTION.DIRECTION_NONE;
		return this;
	}

	destroy() {
		this.disconnect();
		if (this.hammer) {
			this.hammer.destroy();
		}
		delete this.element[UNIQUEKEY];
		this.element = null;
		this.hammer = null;
	}

	enable() {
		this.hammer && (this.hammer.get("pan").options.enable = true);
	}
	disable() {
		this.hammer && (this.hammer.get("pan").options.enable = false);
	}
	isEnable() {
		return !!(this.hammer && this.hammer.get("pan").options.enable);
	}

	private onHammerInput(event) {
		if (this.isEnable() && event.isFirst) {
			this.observer.hold(this, event);
		}
	}

	private onPanmove(event) {
		const userDirection = PanInput.getDirectionByAngle(
			event.angle, this.options.thresholdAngle);

		// not support offset properties in Hammerjs - start
		const prevInput = this.hammer.session.prevInput;

		/* eslint-disable no-param-reassign */
		if (prevInput) {
			event.offsetX = event.deltaX - prevInput.deltaX;
			event.offsetY = event.deltaY - prevInput.deltaY;
		} else {
			event.offsetX = 0;
			event.offsetY = 0;
		}
		const offset: number[] = this.getOffset(
			[event.offsetX, event.offsetY],
			[
				PanInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, this._direction, userDirection),
				PanInput.useDirection(DIRECTION.DIRECTION_VERTICAL, this._direction, userDirection)
			]);
		const prevent = offset.some(v => v !== 0);
		if (prevent) {
			event.srcEvent.preventDefault();
			event.srcEvent.stopPropagation();
		}
		event.preventSystemEvent = prevent;
		prevent && this.observer.change(this, event, toAxis(this.axes, offset));
	}

	private onPanend(event) {
		let offset: number[] = this.getOffset(
			[
				Math.abs(event.velocityX) * (event.deltaX < 0 ? -1 : 1),
				Math.abs(event.velocityY) * (event.deltaY < 0 ? -1 : 1)
			],
			[
				PanInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, this._direction),
				PanInput.useDirection(DIRECTION.DIRECTION_VERTICAL, this._direction)
			]);
		offset = PanInput.getNextOffset(offset, this.observer.options.deceleration);
		this.observer.release(this, event, toAxis(this.axes, offset));
	}

	private attachEvent(observer: IInputTypeObserver) {
		this.observer = observer;
		this.hammer.on("hammer.input", this.onHammerInput)
			.on("panstart panmove", this.onPanmove)
			.on("panend", this.onPanend);
	}

	private dettachEvent() {
		this.hammer.off("hammer.input", this.onHammerInput)
			.off("panstart panmove", this.onPanmove)
			.off("panend", this.onPanend);
		this.observer = null;
	}

	private getOffset(
		properties: number[],
		useDirection: boolean[]): number[] {
		const offset: number[] = [0, 0];
		const scale = this.options.scale;

		if (useDirection[0]) {
			offset[0] = (properties[0] * scale[0]);
		}
		if (useDirection[1]) {
			offset[1] = (properties[1] * scale[1]);
		}
		return offset;
	}
}


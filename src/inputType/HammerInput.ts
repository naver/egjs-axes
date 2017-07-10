import { InputObserver } from "./../InputObserver";
import * as Hammer from "hammerjs";
import { SUPPORT_TOUCH, UNIQUEKEY } from "../const";
import { $ } from "../utils";
import { InputType, IInputTypeObserver } from "./InputType";
import { Axis } from "../AxisManager";

/**
 * Hammer helps you add support for touch gestures to your page
 *
 * @external Hammer
 * @see {@link http://hammerjs.github.io|Hammer.JS}
 * @see {@link http://hammerjs.github.io/jsdoc/Hammer.html|Hammer.JS API documents}
 * @see Hammer.JS applies specific CSS properties by {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html|default} when creating an instance. The eg.MovableCoord module removes all default CSS properties provided by Hammer.JS
 */
if (typeof Hammer === "undefined") {
	throw new Error(`The Hammerjs must be loaded before eg.MovableCoord.\nhttp://hammerjs.github.io/`);
}

enum DIRECTION {
	DIRECTION_NONE = 1,
	DIRECTION_HORIZONTAL = 2 | 4,
	DIRECTION_VERTICAL = 8 | 16,
	DIRECTION_ALL = 2 | 4 | 8 | 16
}

export interface HammerInputOption {
	inputType?: string[];
	scale?: number[];
	thresholdAngle?: number;
	interruptable?: boolean;
}

export class HammerInput extends InputType {
	options: HammerInputOption;
	hammer;
	private _element;
	private _direction: DIRECTION;
	static convertHammerInputType(inputType) {
		let hasTouch = false;
		let hasMouse = false;
		const inputs = inputType || [];

		inputs.forEach(v => {
			switch (v) {
				case "mouse": hasMouse = true; break;
				case "touch": hasTouch = SUPPORT_TOUCH;
				// no default
			}
		});
		return (hasTouch && Hammer.TouchInput) ||
			(hasMouse && Hammer.MouseInput) || null;
	}

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
			return !!(direction & DIRECTION.DIRECTION_ALL ||
				(direction & checkType && userDirection & checkType));
		} else {
			return !!(direction & DIRECTION.DIRECTION_ALL ||
				(direction & checkType));
		}
	}

	constructor(el, options: HammerInputOption) {
		super();
		this._element = $(el);
		this.options = {
			...{
				inputType: ["touch", "mouse"],
				scale: [1, 1],
				thresholdAngle: 45
			}, ...options
		};
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

	create(observer: IInputTypeObserver): InputType {
		const inputClass = HammerInput.convertHammerInputType(this.options.inputType);
		if (!inputClass) {
			throw new Error("Wrong inputType parameter!");
		}

		let keyValue: string = this._element[UNIQUEKEY];
		if (keyValue) {
			this.hammer.destroy();
		} else {
			keyValue = String(Math.round(Math.random() * new Date().getTime()));
		}
		this.hammer = this.createHammer(inputClass)
			.on("hammer.input", event => {
				if (event.isFirst) {
					observer.hold(this, event);
				} else if (event.isFinal) {
					this.onRelease(observer, event);
				}
			}).on("panstart panmove", event => {
				this.onChange(observer, event);
			});
		this._element[UNIQUEKEY] = keyValue;
		return this;
	}

	destroy() {
		if (this._element[UNIQUEKEY]) {
			this.hammer.off("hammer.input panstart panmove panend");
			this.hammer.destroy();
			delete this._element[UNIQUEKEY];
		}
		this.hammer = null;
		this._element = null;
		this.options = {};
		return this;
	}

	private createHammer(inputClass) {
		try {
			// create Hammer
			return new Hammer.Manager(this._element, {
				recognizers: [
					[
						Hammer.Pan, {
							direction: this._direction,
							threshold: 0,
						},
					],
				],
				// css properties were removed due to usablility issue
				// http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html
				cssProps: {
					userSelect: "none",
					touchSelect: "none",
					touchCallout: "none",
					userDrag: "none",
				},
				inputClass,
			});
		} catch (e) {
			return null;
		}
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

	private onChange(observer: IInputTypeObserver, event) {
		const userDirection = HammerInput.getDirectionByAngle(
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
				HammerInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, this._direction, userDirection),
				HammerInput.useDirection(DIRECTION.DIRECTION_VERTICAL, this._direction, userDirection)
			]);
		const prevent = offset.some(v => v !== 0);
		if (prevent) {
			event.srcEvent.preventDefault();
			event.srcEvent.stopPropagation();
		}
		event.preventSystemEvent = prevent;
		prevent && observer.change(this, event, this.toAxis(offset));
	}

	private onRelease(observer: IInputTypeObserver, event) {
		let offset: number[] = this.getOffset(
			[
				Math.abs(event.velocityX) * (event.deltaX < 0 ? -1 : 1),
				Math.abs(event.velocityY) * (event.deltaY < 0 ? -1 : 1)
			],
			[
				HammerInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, this._direction),
				HammerInput.useDirection(DIRECTION.DIRECTION_VERTICAL, this._direction)
			]);
		offset = HammerInput.getNextOffset(offset, observer.options.deceleration);
		observer.release(this, event, this.toAxis(offset));
	}

	private toAxis(offset: number[]): Axis {
		return offset.reduce((acc, v, i) => {
			if (this.axes[i]) {
				acc[this.axes[i]] = v;
			}
			return acc;
		}, {});
	}

	enable() {
		this.hammer && (this.hammer.get("pan").options.enable = true);
	}
	disable() {
		this.hammer && (this.hammer.get("pan").options.enable = false);
	}
	isEnable() {
		return this.hammer && this.hammer.get("pan").options.enable;
	}
}


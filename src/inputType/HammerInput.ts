import { InputObserver } from "./../InputObserver";
import * as Hammer from "hammerjs";
import { SUPPORT_TOUCH, UNIQUEKEY, DIRECTION } from "../const";
import { $ } from "../utils.js";
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

export interface HammerInputOption {
	inputType?: string[];
	direction?: DIRECTION;
	scale?: number[];
	thresholdAngle?: number;
	interruptable?: boolean;
}

export class HammerInput extends InputType {
	options: HammerInputOption;
	private _hammer;
	private _element: HTMLElement;
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

	static createHammer(el, direction, inputClass) {
		try {
			// create Hammer
			return new Hammer.Manager(el, {
				recognizers: [
					[
						Hammer.Pan, {
							direction,
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

	// get user's direction
	static getDirectionByAngle(angle: number, thresholdAngle: number): DIRECTION {
		if (thresholdAngle < 0 || thresholdAngle > 90) {
			return DIRECTION.DIRECTION_NONE;
		}
		const toAngle = Math.abs(angle);

		return toAngle > thresholdAngle && toAngle < 180 - thresholdAngle ?
			DIRECTION.DIRECTION_VERTICAL : DIRECTION.DIRECTION_HORIZONTAL;
	}
	static isHorizontal(direction: DIRECTION, userDirection: DIRECTION): boolean {
		return !!(direction & DIRECTION.DIRECTION_ALL ||
			(direction & DIRECTION.DIRECTION_HORIZONTAL &&
				userDirection & DIRECTION.DIRECTION_HORIZONTAL));
	}
	static isVertical(direction: DIRECTION, userDirection: DIRECTION): boolean {
		return !!(direction === DIRECTION.DIRECTION_ALL ||
			(direction & DIRECTION.DIRECTION_VERTICAL &&
				userDirection & DIRECTION.DIRECTION_VERTICAL));
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

	constructor(el: HTMLElement | string, options: HammerInputOption) {
		super();
		this._element = $(el);
		this.options = {
			...{
				inputType: ["touch", "mouse"],
				direction: DIRECTION.DIRECTION_ALL,
				scale: [1, 1],
				thresholdAngle: 45
			}, ...options
		};
	}
	subscribe(observer: IInputTypeObserver) {
		const inputClass = HammerInput.convertHammerInputType(this.options.inputType);
		if (!inputClass) {
			throw new Error("Wrong inputType parameter!");
		}

		let keyValue: string = this._element[UNIQUEKEY];
		if (keyValue) {
			this._hammer.destroy();
		} else {
			keyValue = String(Math.round(Math.random() * new Date().getTime()));
		}
		this._hammer = HammerInput.createHammer(this._element, this.options.direction, inputClass)
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

	unsubscribe() {
		if (this._element[UNIQUEKEY]) {
			this._hammer.off("hammer.input panstart panmove panend");
			this._hammer.destroy();
			delete this._element[UNIQUEKEY];
		}
		this._hammer = null;
		this._element = null;
		this.options = {};
		return this;
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
		const direction = this.options.direction;
		const userDirection = HammerInput.getDirectionByAngle(
			event.angle, this.options.thresholdAngle);

		// not support offset properties in Hammerjs - start
		const prevInput = this._hammer.session.prevInput;

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
				HammerInput.isHorizontal(direction, userDirection),
				HammerInput.isVertical(direction, userDirection)
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
		const direction = this.options.direction;
		let offset: number[] = this.getOffset(
			[
				Math.abs(event.velocityX) * (event.deltaX < 0 ? -1 : 1),
				Math.abs(event.velocityY) * (event.deltaY < 0 ? -1 : 1)
			],
			[
				!!(direction & DIRECTION.DIRECTION_HORIZONTAL),
				!!(direction & DIRECTION.DIRECTION_VERTICAL)
			]);
		console.warn("realse", offset, event);
		offset = HammerInput.getNextOffset(offset, observer.options.deceleration);
		observer.release(this, event, this.toAxis(offset));
	}

	private toAxis(offset: number[]): Axis {
		return offset.reduce((acc, v, i) => {
			acc[this.axes[i]] = v;
			return acc;
		}, {});
	}

	enable() {
		this._hammer && (this._hammer.get("pan").options.enable = true);
	}
	disable() {
		this._hammer && (this._hammer.get("pan").options.enable = false);
	}
	isEnable() {
		return this._hammer && this._hammer.get("pan").options.enable;
	}
}


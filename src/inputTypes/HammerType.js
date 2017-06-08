import Hammer from "hammerjs";
import Coordinate from "./Coordinate";
import {DIRECTION, SUPPORT_TOUCH} from "./consts";

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

export default class HammerType {
	_init(el, options) {
		this.options = Object.assign(this.options = {
			inputType: ["touch", "mouse"],
			direction: DIRECTION.DIRECTION_ALL,
			scale: [1, 1],
			thresholdAngle: 45,
			interruptable: true,
		}, options);
		const inputClass = HammerType.convertHammerInputType(this.options.inputType);

		if (!inputClass) {
			throw new Error("Wrong inputType parameter!");
		}
		this.hammer = HammerType.createHammer(el, this.options.direction, inputClass);
	}

	subscribe(el, options, observer) {
		this._init(el, options);
		this.hammer.on("hammer.input", event => {
			if (event.isFirst) {
				// apply options each
				// handler._setCurrentTarget(hammer, options);
				observer.onHold(this, event);
			} else if (event.isFinal) {
				observer.onRelease(this, event);
			}
		}).on("panstart panmove", e => {
			observer.onChange(this, event);
		});
		return this;
	}

	unsubscribe() {
		this.hammer.destory();
		this.hammer = null;
		this.options = {};
		return this;
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

	getOffsetOnChange(event) {
		const direction = this.options.direction;
		const userDirection = Coordinate.getDirectionByAngle(
			event.angle, this.options.thresholdAngle);
		const scale = this.options.scale;
		let prevent = false;
		let x = 0;
		let y = 0;

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

		// not support offset properties in Hammerjs - end
		if (Coordinate.isHorizontal(direction, userDirection)) {
			x = (event.offsetX * scale[0]);
			prevent = true;
		}
		if (Coordinate.isVertical(direction, userDirection)) {
			y = (event.offsetY * scale[1]);
			prevent = true;
		}
		if (prevent) {
			event.srcEvent.preventDefault();
			event.srcEvent.stopPropagation();
		}
		event.preventSystemEvent = prevent; // ????? check it!

		return [x, y];
	}
	getOffsetOnRelease(event) {
		if (event.distance === 0 /* e.type === "tap" */) {
			return [0, 0];
		} else {
			const direction = this.options.direction;
			const scale = this.options.scale;
			let vX = Math.abs(event.velocityX);
			let vY = Math.abs(event.velocityY);

			!(direction & DIRECTION.DIRECTION_HORIZONTAL) && (vX = 0);
			!(direction & DIRECTION.DIRECTION_VERTICAL) && (vY = 0);
			return [
				vX * (event.deltaX < 0 ? -1 : 1) * scale[0],
				vY * (event.deltaY < 0 ? -1 : 1) * scale[1],
			];
		}
	}

	static convertHammerInputType(inputType) {
		let hasTouch = false;
		let hasMouse = false;
		const inputs = inputType || [];

		inputs.forEach(v => {
			switch (v) {
				case "mouse" : hasMouse = true; break;
				case "touch" : hasTouch = SUPPORT_TOUCH;
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
}


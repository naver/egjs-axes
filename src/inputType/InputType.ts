import * as Hammer from "hammerjs";
import { Axis } from "../AxisManager";
import { AxesOption } from "../Axes";

export interface IInputType {
	axes: string[];
	element: HTMLElement;
	hammer?;
	mapAxes(axes: string[]);
	connect(observer: IInputTypeObserver): IInputType;
	disconnect();
	destroy();
	enable?();
	disable?();
	isEnable?(): boolean;
}

export interface IInputTypeObserver {
	options: AxesOption;
	get(inputType: IInputType): Axis;
	change(inputType: IInputType, event, offset: Axis);
	hold(inputType: IInputType, event);
	release(inputType: IInputType, event, offset: Axis, duration?: number);
}

export const SUPPORT_TOUCH = "ontouchstart" in window;
export const UNIQUEKEY = "_EGJS_AXES_INPUTTYPE_";
export function toAxis(source: string[], offset: number[]): Axis {
	return offset.reduce((acc, v, i) => {
		if (source[i]) {
			acc[source[i]] = v;
		}
		return acc;
	}, {});
};
export function createHammer(element: HTMLElement, recognizers, inputClass?) {
	try {
		const options = {
			recognizers: [
				recognizers
			],
			// css properties were removed due to usablility issue
			// http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html
			cssProps: {
				userSelect: "none",
				touchSelect: "none",
				touchCallout: "none",
				userDrag: "none",
			}
		};
		inputClass && (options["inputClass"] = inputClass);

		// create Hammer
		return new Hammer.Manager(element, options);
	} catch (e) {
		return null;
	}
};
export function convertInputType(inputType: string[] = []) {
	let hasTouch = false;
	let hasMouse = false;

	inputType.forEach(v => {
		switch (v) {
			case "mouse": hasMouse = true; break;
			case "touch": hasTouch = SUPPORT_TOUCH;
			// no default
		}
	});
	return (hasTouch && Hammer.TouchInput) ||
		(hasMouse && Hammer.MouseInput) || null;
}

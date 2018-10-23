import {Manager, PointerEventInput, TouchMouseInput, TouchInput, MouseInput} from "@egjs/hammerjs";
import { Axis } from "../AxisManager";
import { AxesOption } from "../Axes";
import { window } from "../browser";

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

export const SUPPORT_POINTER_EVENTS = "PointerEvent" in window || "MSPointerEvent" in window;
export const SUPPORT_TOUCH = "ontouchstart" in window;
export const UNIQUEKEY = "_EGJS_AXES_INPUTTYPE_";
export function toAxis(source: string[], offset: number[]): Axis {
	return offset.reduce((acc, v, i) => {
		if (source[i]) {
			acc[source[i]] = v;
		}
		return acc;
	}, {});
}
export function createHammer(element: HTMLElement, options) {
	try {
		// create Hammer
		return new Manager(element, { ...options });
	} catch (e) {
		return null;
	}
}
export function convertInputType(inputType: string[] = []): any {
	let hasTouch = false;
	let hasMouse = false;
	let hasPointer = false;

	inputType.forEach(v => {
		switch (v) {
			case "mouse": hasMouse = true; break;
			case "touch": hasTouch = SUPPORT_TOUCH; break;
			case "pointer": hasPointer = SUPPORT_POINTER_EVENTS;
			// no default
		}
	});
	if (hasPointer) {
		return PointerEventInput;
	} else if (hasTouch && hasMouse) {
		return TouchMouseInput;
	} else if (hasTouch) {
		return TouchInput;
	} else if (hasMouse) {
		return MouseInput;
	}
	return null;
}

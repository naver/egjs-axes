import { Axis } from "../AxisManager";
import { AxesOption } from "../Axes";
import { window } from "../browser";
import { ActiveInput } from "..";

export interface IInputType {
	axes: string[];
	element: HTMLElement;
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
export const SUPPORT_POINTER = "PointerEvent" in window;
export const SUPPORT_MSPOINTER = "MSPointerEvent" in window;
export const SUPPORT_POINTER_EVENTS = SUPPORT_POINTER || SUPPORT_MSPOINTER;
export const UNIQUEKEY = "_EGJS_AXES_INPUTTYPE_";
export function toAxis(source: string[], offset: number[]): Axis {
	return offset.reduce((acc, v, i) => {
		if (source[i]) {
			acc[source[i]] = v;
		}
		return acc;
	}, {});
}

export function convertInputType(inputType: string[] = []): ActiveInput {
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
	if (hasPointer && SUPPORT_POINTER) {
		return {
			start: ["pointerdown"],
			move: ["pointermove"],
			end: ["pointerup", "pointercancel"],
		};
	} else if (hasPointer && SUPPORT_MSPOINTER) {
		return {
			start: ["MSPointerDown"],
			move: ["MSPointerMove"],
			end: ["MSPointerUp", "MSPointerCancel"],
		};
	} else if (hasTouch && hasMouse) {
		return {
			start: ["mousedown", "touchstart"],
			move: ["mousemove", "touchmove"],
			end: ["mouseup", "touchend", "touchcancel"],
		};
	} else if (hasTouch) {
		return {
			start: ["touchstart"],
			move: ["touchmove"],
			end: ["touchend", "touchcancel"],
		};
	} else if (hasMouse) {
		return {
			start: ["mousedown"],
			move: ["mousemove"],
			end: ["mouseup"],
		};
	}
	return {
		start: [],
		move: [],
		end: [],
	};
}

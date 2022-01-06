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

export const SUPPORT_POINTER_EVENTS = "PointerEvent" in window || "MSPointerEvent" in window; // TODO: support pointer events at Pan, Pinch
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

export function convertInputType(inputType: string[] = []): ActiveInput {
	let hasTouch = false;
	let hasMouse = false;

	inputType.forEach(v => {
		switch (v) {
			case "mouse": hasMouse = true; break;
			case "touch": hasTouch = SUPPORT_TOUCH;
			// no default
		}
	});
	if (hasTouch && hasMouse) {
		return "touchmouse";
	} else if (hasTouch) {
		return "touch";
	} else if (hasMouse) {
		return "mouse";
	}
	return null;
}

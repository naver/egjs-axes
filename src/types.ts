import { Axis } from "./AxisManager";
import { MouseEventInput } from "./eventInput/MouseEventInput";
import { TouchEventInput } from "./eventInput/TouchEventInput";
import { PointerEventInput } from "./eventInput/PointerEventInput";
import { TouchMouseEventInput } from "./eventInput/TouchMouseEventInput";

import { IInputType } from "./inputType/InputType";

export type ObjectInterface<T = any> = Record<string | number, T>;

export type InputEventType = PointerEvent | MouseEvent | TouchEvent;

export type ActiveInput = MouseEventInput | TouchEventInput | TouchMouseEventInput | PointerEventInput;

export interface AxesEvents {
	hold: OnHold;
	change: OnChange;
	release: OnRelease;
	animationStart: OnAnimationStart;
	animationEnd: OnAnimationEnd;
	finish: OnFinish;
}

export interface AnimationParam {
	depaPos: Axis;
	destPos: Axis;
	duration: number;
	delta: Axis;
	isTrusted?: boolean;
	stop?: () => void;
	setTo?: (destPos?: Axis, duration?: number) => { destPos: Axis, duration: number };
	done?: () => void;
	startTime?: number;
	inputEvent?;
	input?: IInputType;
}

export interface OnHold {
	pos: Record<string, any>;
	input: IInputType | null;
	inputEvent: any;
	isTrusted: boolean;
}

export interface OnAnimationStart {
	depaPos: Axis;
	destPos: Axis;
	duration: number;
	delta: Axis;
	isTrusted: boolean;
	startTime?: number;
	inputEvent?: any;
	input?: IInputType | null;
	setTo(destPos?: Axis, duration?: number): void;
	done(): void;
	stop(): void;
}

export interface OnChange {
	pos: Axis;
	delta: Axis;
	bounceRatio: Axis;
	holding: boolean;
	inputEvent: any;
	isTrusted: boolean;
	input: IInputType | null;
	set(toPos?: Axis, userDuration?: number): void;
	stop(): void;
}

export interface OnRelease {
	depaPos: Axis;
	destPos: Axis;
	duration: number;
	delta: Axis;
	bounceRatio: Axis;
	isTrusted?: boolean;
	startTime?: number;
	inputEvent?: any;
	input?: IInputType | null;
	setTo(destPos?: Axis, duration?: number): void;
	done(): void;
}
export interface OnAnimationEnd {
	isTrusted: boolean;
}

export interface OnFinish {
	isTrusted: boolean;
}

export interface ExtendedEvent {
	srcEvent: InputEventType;
	angle: number;
	scale: number;
	center: {
		x: number;
		y: number;
	};
	deltaX: number;
	deltaY: number;
	offsetX: number;
	offsetY: number;
	velocityX: number;
	velocityY: number;
	preventSystemEvent: boolean;
}

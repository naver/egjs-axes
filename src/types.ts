import { Axis } from "./AxisManager";
import { IInputType } from "./inputType/InputType";

export type ObjectInterface<T = any> = Record<string | number, T>;

export type AxesEvents = {
	hold: OnHold;
	change: OnChange;
	release: OnRelease;
	animationStart: OnAnimationStart;
	animationEnd: OnAnimationEnd;
	finish: OnFinish;
};
export type AnimationParam = {
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
};

export type OnHold = {
	pos: Record<string, any>;
	input: IInputType | null;
	inputEvent: any;
	isTrusted: boolean;
};

export type OnAnimationStart = {
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
};

export type OnChange = {
	pos: Axis;
	delta: Axis;
	holding: boolean;
	inputEvent: any;
	isTrusted: boolean;
	input: IInputType | null;
	set(toPos?: Axis, userDuration?: number): void;
	stop(): void;
};

export type OnRelease = {
	depaPos: Axis;
	destPos: Axis;
	duration: number;
	delta: Axis;
	isTrusted?: boolean;
	startTime?: number;
	inputEvent?: any;
	input?: IInputType | null;
	setTo(destPos?: Axis, duration?: number): void;
	done(): void;
};
export type OnAnimationEnd = {
	isTrusted: boolean;
};

export type OnFinish = {
	isTrusted: boolean;
};

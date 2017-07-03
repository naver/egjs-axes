import { DIRECTION } from "./const";

export interface HammerTypeOption {
	inputType?: Array<"touch" | "mouse">;
	direction?: DIRECTION;
	scale?: Array<number>;
	thresholdAngle?: number;
	interruptable?: boolean;
}

export interface AxisOption {
  range?: Array<number>;
  bounce?: Array<number>;
  margin?: Array<number>;
  circular?: Array<boolean>;
}
export interface AxesOption {
  easing?: (x:number) => number;
  maximumDuration?: number;
  deceleration?: number;
  axes?: {
    [key: string]: AxisOption
  }
}

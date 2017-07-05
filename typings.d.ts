interface HammerTypeOption {
	inputType?: Array<"touch" | "mouse">;
	// direction?: DIRECTION;
	scale?: Array<number>;
	thresholdAngle?: number;
	interruptable?: boolean;
}

interface AxisOption {
  range?: Array<number>;
  bounce?: Array<number>;
  margin?: Array<number>;
  circular?: Array<boolean>;

}
interface AxesOption {
  easing?: (x:number) => number;
  maximumDuration?: number;
  deceleration?: number;
  axes?: {
    [key: string]: AxisOption
  }
}
